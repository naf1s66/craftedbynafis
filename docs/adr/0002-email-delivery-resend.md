# ADR 0002 – Email Delivery via Resend

## Decision

Use Resend for sending contact form emails via a Next.js API route.

## Rationale

- Provides a simple API for transactional emails with a generous free tier.
- Can be called from the portfolio without adding a separate backend.
- Keeps secrets in environment variables instead of exposing them to the client.

## Consequences

- Requires `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` env vars.
- Until configured, the `/api/contact` route returns HTTP 501 and the contact form acts as a placeholder.
- This limitation is documented in the UI and README so reviewers understand what is missing.
