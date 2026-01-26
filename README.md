# CraftedByNafis

A modern, dark-mode portfolio built with Next.js to showcase backend-first full-stack work, with TaskForge as the flagship project.

## Tech Stack

- Next.js (App Router, TypeScript)
- TailwindCSS
- shadcn/ui (planned integration for richer components)
- Framer Motion (planned animations)
- Resend (email delivery for the contact form)
- GitHub Actions (CI: lint, typecheck, build)
- Netlify (deployment target)

## Status

- The portfolio itself is in progress.
- TaskForge is not yet deployed; demo/docs URLs in `content/projects.ts` are **placeholders**.
- The `/projects/taskforge` page explicitly documents this shortcoming so reviewers can see what is done and what is still being wired.

## Getting Started

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

## Scripts

- `pnpm dev` – run development server
- `pnpm build` – build for production
- `pnpm start` – start production server
- `pnpm lint` – run ESLint
- `pnpm typecheck` – run TypeScript in noEmit mode
- `pnpm format` – run Prettier

## Environment Variables

Create a `.env.local` (or use your platform's env settings) and set:

- `RESEND_API_KEY` – your Resend API key
- `CONTACT_TO_EMAIL` – the email address that should receive portfolio contact messages
- `CONTACT_FROM_EMAIL` - the verified sender address used when sending via Resend
- `CONTACT_ALLOWED_ORIGIN` - optional allowlist origin for contact form POSTs

Until these are configured, `/api/contact` will return HTTP 501 and the contact form acts as a visual placeholder with a documented limitation.

## Contact Form Security

- In-memory rate limiting (5 requests per minute per IP).
- Optional origin allowlist via `CONTACT_ALLOWED_ORIGIN`.

## Deployment

The project is designed to deploy to Netlify or similar platforms:

- Build command: `pnpm build`
- Output directory: `.next`
- Environment variables: the three Resend-related keys above.

## Documentation

- `docs/PRD.md` – product requirements and 7-day milestone plan
- `docs/AGENTS.md` – roles and responsibilities for automation/Codex
- `docs/adr/` – architecture decision records
- `docs/tasks/` – per-milestone task breakdown, similar to TaskForge
