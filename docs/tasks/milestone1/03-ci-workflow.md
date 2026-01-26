# Task: Configure CI workflow for lint, typecheck, and build

## Summary
- Add GitHub Actions to run lint, typecheck, and build on main pushes and PRs.
- Use Node 20 with pnpm caching for reliable CI.

**Status:** Completed.

## Acceptance Criteria
- [x] `.github/workflows/ci.yml` runs on push and pull_request to `main`.
- [x] CI uses Node 20 and `pnpm/action-setup` with caching enabled.
- [x] The workflow runs `pnpm lint`, `pnpm typecheck`, and `pnpm build`.

## Notes
- Keep CI aligned with the `make ci` target.
