# ADR 0003 – TaskForge Linking with Placeholders

## Decision

Link to TaskForge from the CraftedByNafis portfolio using placeholder demo/docs URLs until TaskForge is fully deployed.

## Rationale

- TaskForge is the flagship full-stack project but is still being wired for deployment.
- The portfolio should still reference it and explain what exists (code, architecture, CI, etc.).
- Using placeholders allows the portfolio to be shipped while making the deployment gap explicit.

## Consequences

- `content/projects.ts` includes placeholder `demo` and `docs` URLs for TaskForge.
- `/projects/taskforge` displays a note explaining that deployment is in progress.
- Once TaskForge is deployed, these placeholders must be updated and the ADR should be amended to reflect the new state.
