# Task: Implement contact form and API route

## Summary
- Build the contact form UI and wire it to a Next.js API route.
- Use Resend for email delivery when env vars are present; return 501 otherwise.

**Status:** Completed.

## Acceptance Criteria
- [x] `app/contact/page.tsx` includes name, email, and message fields plus status states.
- [x] `app/api/contact/route.ts` uses Resend and returns 501 when env vars are missing.
- [x] `.env.example` documents `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`.

## Notes
- Keep placeholder copy explicit about missing configuration.
