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

## Group 5 — Verify

14. Run `npm run typecheck` — must exit 0 with no errors
15. Run `npm run dev` and confirm `curl localhost:3000` returns HTML containing the `<h1>` and tagline
