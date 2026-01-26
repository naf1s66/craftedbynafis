# Milestone 2 Manual UI Checklist

Use this checklist to verify the home, navigation, and theme work end-to-end. Mark each item as you go and capture screenshots for the PR when relevant.

## 1. Pre-flight setup
- [ ] Install dependencies: `pnpm install`.
- [ ] Start the dev server: `pnpm dev`.
- [ ] Open `http://localhost:3000`.

## 2. Home hero and CTAs
- [ ] Hero headline renders correctly and matches the intended copy.
- [ ] Supporting paragraph communicates the backend-first full-stack positioning.
- [ ] CTA buttons route to `/projects/taskforge` and `/projects`.

## 3. Global navigation
- [ ] Header includes links for Home, Projects, About, and Contact.
- [ ] Navigation links work and keep styling consistent across pages.
- [ ] Footer renders on every page.

## 4. Theme toggle (when implemented)
- [ ] Toggle is visible, accessible, and keyboard focusable.
- [ ] Default theme is dark when no preference is set.
- [ ] Toggling updates the `html` class and persists on refresh.
- [ ] No noticeable flash of incorrect theme on load.

## 5. Accessibility smoke
- [ ] Tab through primary links and CTAs to confirm visible focus states.
- [ ] Text contrast remains readable in dark mode (and light mode, if enabled).

## 6. Documentation spot-check
- [ ] `docs/tasks/milestone2` reflects any updates made during the milestone.
- [ ] `docs/PRD.md` still aligns with milestone scope.
