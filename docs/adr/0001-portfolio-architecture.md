# ADR 0001 – Portfolio Architecture

## Decision

Use Next.js (App Router, TypeScript) as a single frontend application for CraftedByNafis, with TailwindCSS and a component library (shadcn/ui planned) plus Framer Motion for subtle animations.

## Rationale

- Next.js is familiar from TaskForge and widely adopted.
- App Router aligns with modern React patterns and file-based routing.
- Tailwind + shadcn.ui allow fast, consistent UI implementation.
- A single app repo is simpler than a multi-app monorepo for this use case.

## Consequences

- No separate backend service; all logic stays within the Next.js app.
- Easier deployment on Netlify and similar platforms.
