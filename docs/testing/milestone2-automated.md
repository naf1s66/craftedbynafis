# Milestone 2 Automated UI Verification

Use these commands to validate the milestone-2 UI work before opening a PR. The goal is to keep local checks aligned with CI.

## Command matrix
| Area | Command | Notes |
| --- | --- | --- |
| Install deps | `pnpm install` | Run after pulling lockfile or dependency updates. |
| Lint | `pnpm lint` | Runs Next.js ESLint rules. |
| Typecheck | `pnpm typecheck` | Runs `tsc --noEmit`. |
| Build | `pnpm build` | Ensures Next.js can compile for production. |
| Tests | `pnpm test` | Runs the Vitest unit suite. |
| CI dry run | `make ci` | Equivalent of lint + typecheck + build. |

## Recommended workflow
1. `pnpm install`
2. `pnpm lint`
3. `pnpm typecheck`
4. `pnpm build`
5. `pnpm test`

## CI parity
- `.github/workflows/ci.yml` runs lint, typecheck, tests, and build on PRs to `main`.
- Keep local commands aligned with the workflow to avoid CI surprises.

## Troubleshooting tips
- If `pnpm build` fails, re-run `pnpm typecheck` to find the first TypeScript error.
- If ESLint fails, run `pnpm lint` with `-- --fix` only after reviewing the changes.
- If CSS changes do not show, hard refresh the browser or restart `pnpm dev`.
- When adding UI tests later, remember to mock `localStorage` for theme persistence.
