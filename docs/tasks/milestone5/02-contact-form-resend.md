# Task: Implement contact form and Resend API route

## Summary
- Build the contact form and submit to `/api/contact`.
- Send mail with Resend when env vars exist, otherwise return 501.

**Status:** Completed.

## Acceptance Criteria
- [x] `app/contact/page.tsx` includes name, email, and message fields with status states.
- [x] `app/api/contact/route.ts` uses Resend and returns 501 when env vars are missing.
- [x] `.env.example` lists Resend-related environment variables.

## Notes
- Keep the placeholder copy explicit about the missing configuration.
