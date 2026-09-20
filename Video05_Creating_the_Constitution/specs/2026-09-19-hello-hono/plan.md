# Phase 1 Plan — Hello Hono

## Group 1 — Package Setup

1. Install `hono` (pin exact version, no `^` or `~` prefix)
2. Install `@hono/node-server` if needed to bind a Node port (pin exact version)
3. Install `tsx` as a dev dependency
4. Install `vitest` as a pinned dev dependency (exact version, no `^` or `~`)
5. Verify `tsconfig.json` has `"strict": true`, JSX set for Hono (`jsxImportSource` / `jsx`), and a sensible `target`/`module` for Node

## Group 2 — Application Entry Point

6. Replace `src/index.ts` placeholder with a minimal Hono app (rename to `src/index.tsx` when JSX lands)
7. Keep the Hono `app` in `src/app.tsx` (exported) so Vitest can call `app.request()` without starting a server; `src/index.tsx` only calls `serve()`
8. Add a single `GET /` route (plain string is fine as a stepping stone; Group 4 replaces it)
9. Call `serve()` (or equivalent) to bind the app to port 3000

## Group 3 — Dev Script

10. Add `"dev": "tsx src/index.ts"` (or `tsx watch` / `src/index.tsx`) to `package.json` scripts
11. Add `"typecheck": "tsc --noEmit"` to `package.json` scripts
12. Add `"test": "vitest run"` to `package.json` scripts

## Group 4 — Home Page

13. Create a Hono JSX home page (`src/pages/Home.tsx`)
14. Page renders an `<h1>` with the text `AgentClinic` and a short tagline that reflects the mission
15. Update `GET /` to return the rendered JSX (HTML), not a plain string
16. Point `dev` at the JSX entry file if it moved to `src/index.tsx`

## Group 5 — Layout Component

17. Create `src/components/Layout.tsx` with a top-level shell (`<html>`, `<head>`, `<body>`). It **imports** `<Header>`, `<Main>`, and `<Footer>` — it does not define them in the same file
18. Create `src/components/Header.tsx`, `src/components/Main.tsx`, and `src/components/Footer.tsx` as **separate files**, one component each. Do not colocate these three in `Layout.tsx`
19. `<head>` links to `/static/style.css` (and any font preconnects the page needs)
20. Create `static/style.css` as **mobile-first**: custom properties for spacing/color, base styles for small screens, `min-width` media queries for larger viewports; serve `static/` via `@hono/node-server/serve-static`. Include the viewport meta tag in `Layout`.
21. Update `src/pages/Home.tsx` to render inside `<Layout>`; page content is the child of `<Main>`

## Group 6 — Verify

22. Add Vitest tests under `tests/` for `GET /` (`app.request()`) and for Header, Main, Footer, and Layout. Assert the viewport meta tag and that `style.css` uses custom properties plus a `min-width` media query.
23. Run `npm run typecheck` — must exit 0 with no errors
24. Run `npm test` — must exit 0 with the suite passing
25. Run `npm run dev` and confirm `curl localhost:3000` returns HTML containing the heading, a `<header>`, a `<main>`, and a `<footer>`
26. Confirm `curl localhost:3000/static/style.css` returns the CSS file
27. Confirm `src/components/Header.tsx`, `src/components/Main.tsx`, and `src/components/Footer.tsx` each exist as their own file, and `Layout.tsx` imports them rather than defining them inline
