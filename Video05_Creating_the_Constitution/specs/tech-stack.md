# Tech Stack

AgentClinic is a **server-side TypeScript** application. All rendering happens on the server; the browser receives plain HTML that works well and looks good.

That choice covers Mary's "popular stack based on TypeScript" and Steve's "works well with a modern browser" without a separate frontend build.

## Core

| Layer | Choice | Rationale |
|---|---|---|
| Language | TypeScript | Type safety end-to-end; satisfies Mary's requirement |
| Runtime | Node.js | Stable, well-supported, vast ecosystem |
| Server framework | **Hono** | Lightweight, TypeScript-first, fast, excellent DX; routes and middleware feel natural |
| Templating | Hono JSX (server-side) | JSX without React overhead; components are just functions |
| CSS | Plain CSS + CSS custom properties | No build step; mobile-first responsive layout; Steve gets a modern result on any device |
| Database | **SQLite** | Embedded, zero infrastructure; enough for the clinic and for a booth demo |

## Data

- **SQLite** (via `better-sqlite3`) for local development and early production — simple, file-based, no separate database server
- Migrations via plain SQL files; no ORM to start

## Recommended: Hono

[Hono](https://hono.dev) is the framework. It is chosen over Express, Fastify, and Next.js because:

- First-class TypeScript with zero config
- Built-in JSX renderer for server-side HTML — enough for a staff dashboard without a SPA
- Middleware model is simple and composable
- Runs on Node, Deno, Bun, and edge runtimes without changes
- Small enough that a course demo (or a booth demo) stays readable

Express would work, but the types are bolted on. Next.js would work, but it is more app than we need for server-rendered pages and a dashboard.

## Testing

Validation is **Vitest**, not curl-only checks.

- **Vitest** — fast, TypeScript-native, runs `.ts` / `.tsx` without a separate compile step
- Tests live in a `tests/` directory (or next to source)
- `package.json` script: `"test": "vitest run"` — `npm test` is the automated validation command
- A feature is not done until `npm test` and `npm run typecheck` pass; later CI must run the same commands before merge

## CSS Approach

All CSS is **mobile-first**. Base styles target small screens; `min-width` media queries enhance larger viewports. CSS custom properties hold spacing, color, and sizing tokens so values stay consistent across breakpoints. No CSS framework or extra build step — the browser receives one stylesheet. The layout `<head>` must include `<meta name="viewport" content="width=device-width, initial-scale=1.0">`. Responsive design is never deferred to a later phase.

## Tooling

- `tsx` for development (run TypeScript directly, no build step needed)
- `tsc` for production builds
- `prettier` for formatting

## What We Are Not Using

- No React, Vue, or Svelte — server-side rendering keeps the stack simple
- No ORM — SQL is sufficient at this scale
- No Docker — not yet; that's a later phase concern
