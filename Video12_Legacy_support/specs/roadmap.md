# Roadmap

There is no `TODO.md` in this brownfield tree. Phases below follow what the codebase already ships, then very small follow-ups from stack drift (pins and doc/code honesty). Each phase stays independently reviewable.

---

## Phase 1 — Hello Hono & shell ✅

- Hono + `tsx` dev server
- Shared layout (header / main / footer)
- Home page and static assets

## Phase 2 — Agents & ailments ✅

- SQLite migrations and seed for agents, ailments, links
- `/agents`, `/agents/:id`, `/ailments`
- PicoCSS layout wiring

## Phase 3 — Therapies ✅

- Therapies table, seed, `/therapies`
- Ailment → therapy mapping

## Phase 4 — Appointment booking ✅

- Appointments table
- Book from agent detail; validation and confirmation

## Phase 5 — Staff dashboard ✅

- `/dashboard` counts and staff-facing tables

## Phase 6 — Hardening already in tree ✅

- 404 / 500 pages
- Request logging middleware

## Phase 7 — Pin dependency drift ✅

- Pin `better-sqlite3` and `@types/better-sqlite3` to exact versions
- Pin `typescript` to an exact version
- Confirm `npm run typecheck` and `npm test` still pass

## Phase 8 — Constitution hygiene ✅

- Keep `specs/tech-stack.md` aligned with PicoCSS + pinned deps after Phase 7
- Drop phantom Prettier — do not claim a tool we do not install

---

Later (not planned here): auth, email notifications, therapist profile pages, reporting, Docker.
