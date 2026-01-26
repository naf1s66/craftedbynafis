# Task: Implement project detail route

## Summary
- Create `/projects/[slug]` that renders project details from `content/projects.ts`.
- Handle missing slugs with a 404 using `notFound()`.

**Status:** New.

## Acceptance Criteria
- [ ] Dynamic route renders name, description, role, timeframe, tech list, and highlights.
- [ ] Missing slugs return a 404 state.
- [ ] Layout matches the portfolio visual style.

## Notes
- Consider `generateStaticParams` for static rendering.
