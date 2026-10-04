# Tech Stack

AgentClinic is a **server-side TypeScript** brownfield app. The browser receives HTML from Hono JSX. There is no SPA.

## Core (as running today)

| Layer | Choice | Notes |
|---|---|---|
| Language | TypeScript | Mary's requirement |
| Runtime | Node.js | |
| Server | **Hono** `4.12.9` (pinned) | Routes, middleware, JSX |
| Adapter | `@hono/node-server` `1.19.12` (pinned) | |
| UI | Hono JSX + **PicoCSS** (CDN classless) + `static/style.css` | Pico is the real base stylesheet in `Layout.tsx` |
| Database | SQLite via `better-sqlite3` `12.8.0` (pinned) | Plain SQL migrations under `src/db/migrations/` |
| Tests | Vitest `4.1.2` (pinned) | `npm test` |

## CSS

**PicoCSS** (classless, loaded from jsDelivr in `Layout`) provides the default look. `static/style.css` only holds project overrides (font family, focus ring). Do not pretend the stack is "plain CSS only" — that would fight the legacy code.

Mobile-friendly layout comes largely from Pico; keep the viewport meta tag. Prefer small overrides over a second framework.

## Data

- SQLite file opened through `src/db/`
- Migrations: numbered `.sql` files, no ORM
- Seed via `npm run seed` / `src/db/seed.ts`

## Testing & tooling

- `tsx` `4.21.0` (pinned) for `npm run dev`
- `typescript` `5.9.3` (pinned) / `tsc --noEmit` for `npm run typecheck`
- `@types/better-sqlite3` `7.6.13` (pinned)
- `vitest` for `npm test`

## Closed legacy gaps

- **Pins:** `better-sqlite3`, `@types/better-sqlite3`, and `typescript` are exact versions (no `^` / `~`), matching Hono.
- **CSS truth:** PicoCSS + `static/style.css` overrides — not "plain CSS only."
- **Prettier:** not a project dependency; we do not claim it.

## What We Are Not Using

- No React / Vue / Svelte client app
- No ORM
- No Docker (yet)
- No Prettier (unless a later phase adds it on purpose)
