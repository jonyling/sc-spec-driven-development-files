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
- `package.json` scripts: `dev` and `typecheck`
- `tsconfig.json` remains `"strict": true`, with JSX configured for Hono

### Out of scope

- No shared layout, navigation, or CSS (Phase 2)
- No test framework setup (Vitest is in the stack, not this slice)
- No SQLite, migrations, or additional routes (Phase 3+)
- No CI/CD pipeline

## Decisions

### Pin Hono version

Record the exact Hono version in `package.json` with no `^` or `~` range prefix (e.g. `"hono": "4.x.y"`). Future phases must not silently upgrade without deliberate review. Pin `@hono/node-server` the same way if we add it.

### Enforce strict TypeScript

`tsconfig.json` must include `"strict": true`. This is non-negotiable from the first commit so the codebase never accumulates loose types.

### Dev loop is `tsx`, check is `tsc --noEmit`

- `"dev"` runs the Hono entry via `tsx` (watch mode is fine if it stays one command)
- `"typecheck": "tsc --noEmit"`
- Default listen port: `3000`

### Home page is HTML via Hono JSX

`GET /` returns HTML, not a plain string and not JSON. The page must include:

- An `<h1>` whose text is `AgentClinic`
- A short tagline that reflects the mission (exact wording is an implementation choice)

Hono JSX handles the rendering. No CSS and no shared layout in this phase.

## Context

Roadmap Phase 1, guided by `specs/mission.md` and `specs/tech-stack.md`.

- **Stack:** server-side TypeScript, Hono, Hono JSX, `tsx` for dev, `tsc` for checks. SQLite is the project database; it is not used here.
- **Mission:** the clinic is real enough to open the door. The home page should feel like a clinic, not a framework hello-world.
- **Audience:** a student or booth demo should go from clone → `npm install` → `npm run dev` → a named home page in one sitting.

## Stakeholder Notes

- **Mary** needs TypeScript end-to-end (satisfied by `strict: true` + successful `tsc --noEmit`)
- **Steve** still has no visual design requirement; HTML without CSS is enough
- **Susan** does not get agents/ailments/appointments yet — only the front door
