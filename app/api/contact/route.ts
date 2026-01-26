import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from './contact-schema';

const resendApiKey = process.env.RESEND_API_KEY;
const toEmail = process.env.CONTACT_TO_EMAIL;
const fromEmail = process.env.CONTACT_FROM_EMAIL;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
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

const getClientIp = (request: Request) => {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }
  return request.headers.get('x-real-ip') || 'unknown';
};

const isRateLimited = (key: string) => {
  const now = Date.now();
  const entry = rateLimit.get(key);
  if (!entry || entry.resetAt <= now) {
    rateLimit.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }
  entry.count += 1;
  return false;
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
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { ok: false, message: 'Too many requests. Please try again later.' },
      { status: 429 },
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
        errors: isProd ? undefined : parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const { name, email, message } = parsed.data;

  const resend = new Resend(resendApiKey);

  try {
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: 'New message from CraftedByNafis',
      replyTo: email,
      text: `From: ${name} <${email}>

${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Resend error', error);
    } else {
      console.error('Resend error');
    }
    return NextResponse.json(
      { ok: false, message: 'Failed to send message.' },
      { status: 500 },
    );
  }
}
