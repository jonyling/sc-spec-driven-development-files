# Phase 1 Plan — Hello Hono

## Group 1 — Package Setup

1. Install `hono` (pin exact version, no `^` or `~` prefix)
2. Install `@hono/node-server` if needed to bind a Node port (pin exact version)
3. Install `tsx` as a dev dependency
4. Verify `tsconfig.json` has `"strict": true`, JSX set for Hono (`jsxImportSource` / `jsx`), and a sensible `target`/`module` for Node

## Group 2 — Application Entry Point

5. Replace `src/index.ts` placeholder with a minimal Hono app (rename to `src/index.tsx` when JSX lands)
6. Add a single `GET /` route (plain string is fine as a stepping stone; Group 4 replaces it)
7. Call `serve()` (or equivalent) to bind the app to port 3000

## Group 3 — Dev Script

8. Add `"dev": "tsx src/index.ts"` (or `tsx watch` / `src/index.tsx`) to `package.json` scripts
9. Add `"typecheck": "tsc --noEmit"` to `package.json` scripts

## Group 4 — Home Page

10. Create a Hono JSX home page (`src/pages/Home.tsx`)
11. Page renders an `<h1>` with the text `AgentClinic` and a short tagline that reflects the mission
12. Update `GET /` to return the rendered JSX (HTML), not a plain string
13. Point `dev` at the JSX entry file if it moved to `src/index.tsx`

## Group 5 — Layout Component

14. Create `src/components/Layout.tsx` with a top-level shell (`<html>`, `<head>`, `<body>`). It **imports** `<Header>`, `<Main>`, and `<Footer>` — it does not define them in the same file
15. Create `src/components/Header.tsx`, `src/components/Main.tsx`, and `src/components/Footer.tsx` as **separate files**, one component each. Do not colocate these three in `Layout.tsx`
16. `<head>` links to `/static/style.css` (and any font preconnects the page needs)
17. Create `static/style.css` with base styles and custom properties; serve `static/` via `@hono/node-server/serve-static` in `src/index.tsx`
18. Update `src/pages/Home.tsx` to render inside `<Layout>`; page content is the child of `<Main>`

## Group 6 — Verify

19. Run `npm run typecheck` — must exit 0 with no errors
20. Run `npm run dev` and confirm `curl localhost:3000` returns HTML containing the heading, a `<header>`, a `<main>`, and a `<footer>`
21. Confirm `curl localhost:3000/static/style.css` returns the CSS file
22. Confirm `src/components/Header.tsx`, `src/components/Main.tsx`, and `src/components/Footer.tsx` each exist as their own file, and `Layout.tsx` imports them rather than defining them inline
