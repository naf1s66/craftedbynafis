# AGENTS — CraftedByNafis

## Roles

- **Product Owner**
  - Keeps focus on impressing backend/full-stack recruiters.
  - Ensures TaskForge is clearly showcased even before deployment.

- **UX / UI Designer**
  - Designs Home, Projects, Project Detail, About, Contact.
  - Ensures dark-mode-first, modern and sleek aesthetic.

- **Frontend Engineer**
  - Implements Next.js pages, components, and simple motion.
  - Wires contact form to Resend via API route.
  - Maintains Makefile and CI pipeline.

- **Content Curator**
  - Writes copy for all pages and project case studies.
  - Keeps `content/projects.ts` in sync with real repos and deployments.

- **DevOps / CI Agent**
  - Owns GitHub Actions workflow (lint/typecheck/build on main).
  - Documents env vars and deployment steps for Netlify.

- **QA Engineer**
  - Defines manual tests for navigation, filters, project pages, contact form.
  - Runs Lighthouse and basic a11y checks.

## Notes on TaskForge Integration

- TaskForge is still being wired for deployment.
- `content/projects.ts` contains placeholder demo/docs URLs.
- `/projects/taskforge` includes a callout explaining this gap.
- Once TaskForge is deployed, the links should be updated and this limitation revised in both UI and ADR docs.
