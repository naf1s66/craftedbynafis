# Production Deployment Checklist

This document outlines critical items that must be addressed before deploying to production.

## Critical: Rate Limiting

### Current Implementation
The contact API route uses an in-memory Map for rate limiting:
```typescript
const rateLimit = new Map<string, { count: number; resetAt: number }>();
```

**⚠️ This is NOT production-ready for serverless environments.**

### Why It's Not Production-Ready
- Serverless functions are ephemeral and restart frequently
- Each cold start creates a new Map instance, resetting all rate limits
- Attackers can bypass rate limits by triggering cold starts
- This could lead to:
  - Email quota exhaustion
  - Increased costs
  - Potential account suspension by Resend

### Production Solution
Before production deployment, replace in-memory rate limiting with a persistent store:

#### Option 1: Vercel KV (Recommended for Vercel deployments)
```typescript
import { kv } from '@vercel/kv';

const checkRateLimit = async (key: string) => {
  const now = Date.now();
  const rlKey = `ratelimit:${key}`;

  const data = await kv.get<{ count: number; resetAt: number }>(rlKey);

  if (!data || data.resetAt <= now) {
    const entry = { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
    await kv.set(rlKey, entry, { px: RATE_LIMIT_WINDOW_MS });
    return { limited: false, remaining: RATE_LIMIT_MAX - 1, resetAt: entry.resetAt };
  }

  if (data.count >= RATE_LIMIT_MAX) {
    return { limited: true, remaining: 0, resetAt: data.resetAt };
  }

  data.count += 1;
  await kv.set(rlKey, data, { pxat: data.resetAt });
  return { limited: false, remaining: RATE_LIMIT_MAX - data.count, resetAt: data.resetAt };
};
```

#### Option 2: Upstash Redis (Platform-agnostic)
```typescript
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Similar implementation to Vercel KV
```

#### Option 3: Netlify Blobs (For Netlify deployments)
```typescript
import { getStore } from '@netlify/blobs';

const store = getStore('rate-limits');
// Use store.get() and store.set() with TTL
```

### Required Environment Variables
Add to your deployment platform:
```
# For Vercel KV
KV_REST_API_URL=...
KV_REST_API_TOKEN=...

# For Upstash Redis
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

### Monitoring
Once in production with persistent rate limiting:
- Monitor rate limit hit rates
- Set up alerts for unusual patterns
- Consider adjusting limits based on usage patterns

## Security Headers

### Content Security Policy (CSP)
Consider adding CSP headers to prevent XSS attacks. This can be done via:
- Next.js middleware
- `next.config.js` headers configuration
- Platform-specific configuration (Netlify headers, Vercel headers)

Example CSP for this site:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self';
```

Note: Adjust based on actual third-party services used.

## Environment Variables Checklist

Ensure all required environment variables are set:

### Required for Contact Form
- `RESEND_API_KEY` - Resend API key
- `CONTACT_TO_EMAIL` - Recipient email address
- `CONTACT_FROM_EMAIL` - Sender email address (must be verified domain in Resend)
- `CONTACT_ALLOWED_ORIGIN` - Comma-separated list of allowed origins (e.g., `https://craftedbynafis.com,https://www.craftedbynafis.com`)

### Required for Production Rate Limiting
- See "Required Environment Variables" section above based on chosen solution

## Deployment Platform Notes

### IP Detection Trust Model
The contact API uses `x-forwarded-for` header for IP-based rate limiting:

```typescript
const forwardedFor = request.headers.get('x-forwarded-for');
if (forwardedFor) {
  return forwardedFor.split(',')[0]?.trim() || 'unknown';
}
```

**This assumes deployment behind a trusted proxy** (Netlify, Vercel, Cloudflare, etc.) that:
1. Strips any existing `x-forwarded-for` headers from client requests
2. Adds its own `x-forwarded-for` with the true client IP

⚠️ Do not deploy this application behind an untrusted proxy or allow direct public access without a reverse proxy, as clients could spoof the `x-forwarded-for` header to bypass rate limiting.

### Supported Platforms
- ✅ Vercel (trusted proxy, provides x-forwarded-for)
- ✅ Netlify (trusted proxy, provides x-forwarded-for)
- ✅ Cloudflare Pages (trusted proxy, provides cf-connecting-ip and x-forwarded-for)
- ⚠️ Self-hosted: Ensure nginx/Apache/Caddy is configured to set x-forwarded-for

## Pre-Deployment Testing

1. Test rate limiting with production-like persistence layer
2. Verify all environment variables are set
3. Test contact form with production email configuration
4. Verify origin validation with production domains
5. Test theme toggle across multiple tabs
6. Run accessibility checks
7. Verify CSP doesn't break functionality

## Post-Deployment Monitoring

1. Monitor contact form submission rates
2. Check for rate limit 429 responses
3. Monitor email delivery success rates via Resend dashboard
4. Set up error tracking (Sentry, etc.) for API route failures
5. Monitor serverless function cold start rates
