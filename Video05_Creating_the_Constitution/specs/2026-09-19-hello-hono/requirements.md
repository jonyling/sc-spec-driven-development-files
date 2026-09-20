# Phase 1 Requirements — Hello Hono

## Scope

Install and configure Hono with a `tsx` dev server. Expose a single `GET /` route that renders a **minimal HTML home page** via Hono JSX. Confirm TypeScript types work end-to-end.

This phase exists to prove the baseline: Node runs TypeScript, Hono serves HTML, and the dev loop is functional. It is also the first visible page a student or booth demo sees.

### In scope

- Add `hono` and the Node adapter needed to listen on a port
- Add `tsx` as a dev dependency
- Replace the `src/index.ts` placeholder with a minimal Hono app (`.tsx` once JSX is used)
- One route: `GET /`
- A Hono JSX home page: `<h1>AgentClinic</h1>` plus a short tagline that reflects the mission
- A shared layout: `<html>` / `<head>` / `<body>` wrapping `<Header>`, `<Main>`, and `<Footer>` as three subcomponents, **each in its own file**
- `static/style.css` linked from the layout `<head>` and served as a static file; CSS is mobile-first
- Viewport meta tag in the layout: `width=device-width, initial-scale=1.0`
- `package.json` scripts: `dev`, `typecheck`, and `test` (Vitest)
- `vitest` pinned as a dev dependency (exact version, no `^` or `~`)
- Hono `app` exported from `src/app.tsx` so tests can request routes without listening on a port
- Vitest suite for `GET /` and the layout components (`tests/`)
- `tsconfig.json` remains `"strict": true`, with JSX configured for Hono

### Out of scope

- No extra routes or navigation to pages that do not exist yet
- No SQLite, migrations, or additional routes (Phase 3+)
- No CI/CD pipeline

## Decisions

### Pin Hono version

Record the exact Hono version in `package.json` with no `^` or `~` range prefix (e.g. `"hono": "4.x.y"`). Future phases must not silently upgrade without deliberate review. Pin `@hono/node-server` the same way if we add it.

### Enforce strict TypeScript

`tsconfig.json` must include `"strict": true`. This is non-negotiable from the first commit so the codebase never accumulates loose types.

### Dev loop is `tsx`, check is `tsc --noEmit`, validation is Vitest

- `"dev"` runs the Hono entry via `tsx` (watch mode is fine if it stays one command)
- `"typecheck": "tsc --noEmit"`
- `"test": "vitest run"`
- Default listen port: `3000`

Pin `vitest` the same way as Hono: exact version, no `^` or `~`.

The HTTP app must be importable without calling `serve()`, so Vitest can use `app.request()` (or equivalent) instead of curling a live port.

### Home page is HTML via Hono JSX

`GET /` returns HTML, not a plain string and not JSON. The page must include:

- An `<h1>` whose text is `AgentClinic`
- A short tagline that reflects the mission (exact wording is an implementation choice)

Hono JSX handles the rendering. The document shell lives in a shared `Layout` so later routes can reuse the same header, main, and footer.

### Shared layout and CSS

`GET /` renders inside `Layout`. `static/style.css` is the stylesheet: the layout `<head>` links to `/static/style.css`, and the server serves the `static/` directory. No JS bundler import of CSS — this stack has no frontend build.

### Mobile-first responsive design

This is a product-wide rule, not a later-phase nice-to-have:

- Base CSS targets small screens; larger layouts use `@media (min-width: …)` only
- Spacing, color, and sizing come from CSS custom properties
- The layout includes `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

Do not write desktop-first `max-width` overrides as the primary breakpoint strategy.

### Header, Main, and Footer are separate files

`Header`, `Main`, and `Footer` are three subcomponents of `Layout`, and each **must live in its own file**. They must not be defined inline in `Layout.tsx` (or in `Home.tsx`). Required paths:

- `src/components/Layout.tsx` — document shell; imports the three subcomponents
- `src/components/Header.tsx` — `<header>` only
- `src/components/Main.tsx` — `<main>` only
- `src/components/Footer.tsx` — `<footer>` only

`Layout` composes them. Later pages keep using this split so chrome can change without editing every page.

## Context

Roadmap Phase 1, guided by `specs/mission.md` and `specs/tech-stack.md`.

- **Stack:** server-side TypeScript, Hono, Hono JSX, `tsx` for dev, `tsc` for checks, Vitest for validation. SQLite is the project database; it is not used here.
- **Mission:** the clinic is real enough to open the door. The home page should feel like a clinic, not a framework hello-world.
- **Audience:** a student or booth demo should go from clone → `npm install` → `npm run dev` → a named home page in one sitting.

## Stakeholder Notes

- **Mary** needs TypeScript end-to-end (satisfied by `strict: true` + successful `tsc --noEmit` and `npm test`)
- **Steve** gets a styled, **mobile-first** page that works in a modern browser on a phone and a desktop; header/footer make the clinic feel like a real site
- **Susan** does not get agents/ailments/appointments yet — only the front door
