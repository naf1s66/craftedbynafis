# CraftedByNafis – PRD

A frontend-only portfolio to showcase backend-first full-stack work, with TaskForge as the flagship project.

## Goals

- Present Nafis as a backend-oriented full-stack engineer.
- Highlight TaskForge with a detailed case study.
- Demonstrate production practices: CI, docs, contact form with real email delivery.
- Stay within a 7-day scope.

## Scope (Phase 1)

- Pages: Home, Projects, Project Detail, About, Contact.
- Dark theme by default with a toggle.
- Project data in TypeScript (see `content/projects.ts`).
- Contact form using Resend via Next.js API route.
- CI (lint, typecheck, build) via GitHub Actions.
- Deployment to Netlify.

## Constraints

- No separate backend; only Next.js routes/server actions.
- No CMS/blog for v1.
- TaskForge is not yet deployed; its demo/docs links are placeholders and called out explicitly in the UI and docs.

## Milestones (7 Days)

See `docs/tasks/` for granular tasks.

- Day 1 – Repo, base stack, layout, Makefile, CI.
- Day 2 – Home hero, navigation, dark mode toggle.
- Day 3 – Projects content system and list.
- Day 4 – Project detail pages (TaskForge highlighted).
- Day 5 – About page and contact form (Resend integration).
- Day 6 – Polish, SEO, accessibility.
- Day 7 – Netlify deployment and documentation sweep.
