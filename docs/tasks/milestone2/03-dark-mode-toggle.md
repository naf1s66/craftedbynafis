# Task: Add dark mode toggle (dark default)

## Summary
- Introduce a theme toggle that switches between dark and light modes.
- Persist the preference and avoid a flash on first paint.

**Status:** Completed.
**Concurrency:** Depends on the base layout; can pair with milestone 6 light mode work.

## Acceptance Criteria
- [x] Header includes an accessible theme toggle control.
- [x] Theme preference is persisted (localStorage or similar) and applied to `html`.
- [x] Default theme remains dark when no preference is set.

## Notes
- Hydration-safe placeholder avoids UI mismatch before mount.
