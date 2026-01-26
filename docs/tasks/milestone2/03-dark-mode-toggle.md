# Task: Add dark mode toggle (dark default)

## Summary
- Introduce a theme toggle that switches between dark and light modes.
- Persist the preference and avoid a flash on first paint.

**Status:** New.
**Concurrency:** Depends on the base layout; can pair with milestone 6 light mode work.

## Acceptance Criteria
- [ ] Header includes an accessible theme toggle control.
- [ ] Theme preference is persisted (localStorage or similar) and applied to `html`.
- [ ] Default theme remains dark when no preference is set.

## Notes
- Consider a small client-only hook to avoid hydration mismatches.
