import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from './contact-schema';

const resendApiKey = process.env.RESEND_API_KEY;
const toEmail = process.env.CONTACT_TO_EMAIL;
const fromEmail = process.env.CONTACT_FROM_EMAIL;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

/**
 * In-memory rate limit storage.
 * WARNING: This is not production-ready for serverless deployments.
 * Serverless functions are ephemeral and restart frequently, which resets this Map
 * and allows attackers to bypass rate limits by triggering cold starts.
 *
 * Before production deployment, replace with persistent storage:
 * - Vercel KV (@vercel/kv)
 * - Upstash Redis (@upstash/redis)
 * - Netlify Blobs (@netlify/blobs)
 *
 * See docs/PRODUCTION_DEPLOYMENT.md for implementation details.
 */
const rateLimit = new Map<string, { count: number; resetAt: number }>();

const getAllowedOrigins = () => {
  const raw =
    process.env.CONTACT_ALLOWED_ORIGIN ?? process.env.NEXT_PUBLIC_SITE_URL ?? '';
  return raw
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
};

const getRequestOrigin = (request: Request) => {
  const origin = request.headers.get('origin');
  if (origin) return origin;
  const referer = request.headers.get('referer');
  if (!referer) return null;
  try {
    return new URL(referer).origin;
  } catch {
    return null;
  }
};

/**
 * Extracts client IP from request headers.
 *
 * TRUST MODEL: This assumes deployment behind a trusted reverse proxy
 * (Netlify, Vercel, Cloudflare, etc.) that:
 * 1. Strips any client-provided x-forwarded-for headers
 * 2. Adds its own x-forwarded-for with the true client IP
 *
 * The first IP in the x-forwarded-for chain is the original client.
 * Subsequent IPs are intermediate proxies.
 *
 * WARNING: Do not deploy without a trusted proxy, as clients could spoof
 * this header to bypass rate limiting.
 */
const getClientIp = (request: Request) => {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }
  return request.headers.get('x-real-ip') || 'unknown';
};

/**
 * Lazily cleans up a single expired rate limit entry.
 *
 * Strategy: Instead of probabilistic full-map cleanup (which is O(n) in the
 * critical path), we only clean up the specific entry being checked if it's expired.
 * This is O(1) and happens naturally during rate limit checks.
 *
 * Trade-off: Expired entries for IPs that never make another request will remain
 * in memory until the serverless function is recycled. Given typical serverless
 * lifetimes (minutes to hours) and small map sizes, this is acceptable.
 *
 * This is a temporary solution pending production migration to persistent storage
 * (see docs/PRODUCTION_DEPLOYMENT.md).
 */
const cleanupExpiredEntry = (key: string, now: number) => {
  const entry = rateLimit.get(key);
  if (entry && entry.resetAt <= now) {
    rateLimit.delete(key);
  }
};

const checkRateLimit = (key: string) => {
  const now = Date.now();
  cleanupExpiredEntry(key, now);

  let entry = rateLimit.get(key);
  if (!entry || entry.resetAt <= now) {
    entry = { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
    rateLimit.set(key, entry);
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { limited: true, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  return {
    limited: false,
    remaining: Math.max(RATE_LIMIT_MAX - entry.count, 0),
    resetAt: entry.resetAt,
  };
};

/**
 * NOTE:
 * In local dev and before Resend is configured, this route will return 501 and
 * the contact form should be treated as a visual placeholder. Once credentials
 * are available, these env vars should be set and the route will send real mail.
 */
/**
 * Handles contact form submissions and forwards them to Resend.
 */
export async function POST(request: Request) {
  if (!resendApiKey || !toEmail || !fromEmail) {
    return NextResponse.json(
      { ok: false, message: 'Email delivery not yet configured.' },
      { status: 501 },
    );
  }

  const allowedOrigins = getAllowedOrigins();
  const requestOrigin = getRequestOrigin(request);
  if (allowedOrigins.length > 0) {
    if (!requestOrigin || !allowedOrigins.includes(requestOrigin)) {
      return NextResponse.json(
        { ok: false, message: 'Invalid request origin.' },
        { status: 403 },
      );
    }
  }

  const clientIp = getClientIp(request);
  const rateStatus = checkRateLimit(clientIp);
  if (rateStatus.limited) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((rateStatus.resetAt - Date.now()) / 1000),
    );
    return NextResponse.json(
      { ok: false, message: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': retryAfterSeconds.toString(),
          'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': Math.ceil(rateStatus.resetAt / 1000).toString(),
        },
      },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Invalid JSON payload.' },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const isProd = process.env.NODE_ENV === 'production';
    return NextResponse.json(
      {
        ok: false,
        message: 'Invalid contact form payload.',
        // Always include errors field for consistent typing, but null in production
        errors: isProd ? null : parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const { name, email, message } = parsed.data;
  /**
   * Defense-in-depth sanitization to prevent email header injection.
   *
   * Primary defense: The Zod schema (contact-schema.ts:15,22) already validates
   * that name and email contain no newlines via the noNewlines refine function.
   *
   * Secondary defense: These replacements provide an additional layer of protection
   * in case the validation logic changes or is bypassed. This redundancy is intentional.
   *
   * - safeName: Used in email body text, newlines replaced with spaces
   * - safeEmail: Used in reply-to header, newlines stripped entirely
   * - safeMessage: Carriage returns normalized (newlines are allowed in message body)
   */
  const safeName = name.replace(/[\r\n]+/g, ' ').trim();
  const safeEmail = email.replace(/[\r\n]+/g, '').trim();
  const safeMessage = message.replace(/\r/g, '');

  const resend = new Resend(resendApiKey);

  try {
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: 'New message from CraftedByNafis',
      replyTo: safeEmail,
      text: `From: ${safeName} <${safeEmail}>

${safeMessage}`,
    });

    // Build response headers
    const headers: HeadersInit = {
      'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
      'X-RateLimit-Remaining': rateStatus.remaining.toString(),
      'X-RateLimit-Reset': Math.ceil(rateStatus.resetAt / 1000).toString(),
    };

    // Add CORS headers for valid origins
    if (allowedOrigins.length > 0 && requestOrigin && allowedOrigins.includes(requestOrigin)) {
      headers['Access-Control-Allow-Origin'] = requestOrigin;
      headers['Vary'] = 'Origin';
    }

    return NextResponse.json({ ok: true }, { headers });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Resend error:', errorMessage);
    return NextResponse.json(
      { ok: false, message: 'Failed to send message.' },
      { status: 500 },
    );
  }
}
