# ADR 0004 – Theme Toggle Implementation

## Decision

Implement a dark/light theme toggle using a lightweight client component and an inline initialization script that runs before hydration. Persist the user's preference in `localStorage` and default to dark when no preference exists.

## Rationale

- A client component keeps the toggle logic isolated while allowing `usePathname` and other client hooks nearby.
- An inline script (via Next.js `Script` with `beforeInteractive`) prevents flashes by setting the `dark` class before paint.
- `localStorage` provides a simple, explicit persistence mechanism without server complexity.

## Consequences

- The initialization script must remain static and must never include user-controlled data.
- When JavaScript is disabled, the UI renders in the light theme until JS runs; the layout remains legible in both modes.
- If `localStorage` is unavailable, the toggle gracefully falls back to the default dark theme.
