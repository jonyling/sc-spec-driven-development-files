# Roadmap

Phases are intentionally small — each one is a shippable slice of work, independently reviewable and testable.

---

## Phase 1 — Hello Hono ✅

- Install and configure Hono with a `tsx` dev server
- Single `/` route returning an HTML home page (JSX, shared layout, CSS)
- Confirm TypeScript types work end-to-end
- Vitest suite for `GET /` and layout components; `npm test` is the validation command
- Mobile-first CSS (custom properties, `min-width` breakpoints, viewport meta) — this is the baseline for every later phase

## Phase 2 — Agents & Ailments

The shared layout and mobile-first CSS already shipped in Phase 1. This phase adds persistence and the first domain pages, all rendered inside that layout.

- Nav in the existing header; every new route uses `Layout`
- SQLite + first migrations (`agents`, `ailments`)
- Seed a handful of fictional agents and ailments (e.g. "context-window claustrophobia", "prompt fatigue")
- `/agents` list and `/agents/:id` detail (name, model type, current status, presenting complaints)
- `/ailments` list
- Link agents to one or more ailments

## Phase 3 — Therapies Catalog

- `therapies` table + seed data
- `/therapies` list page
- Map ailments → recommended therapies

## Phase 4 — Appointment Booking

- `appointments` table (agent, therapist, datetime, status)
- Form to book an appointment from an agent's detail page
- Basic validation and confirmation page

## Phase 5 — Staff Dashboard

- `/dashboard` with summary counts: agents, open appointments, ailments in-flight
- Simple table views for staff to manage records
- Mary's dashboard is now real

## Phase 6 — Polish & Accessibility

- Visual polish on top of the mobile-first baseline
- Semantic HTML audit
- Keyboard navigation and focus styles

## Phase 7 — Hardening

- Error pages (404, 500)
- Input sanitization on all forms
- Basic logging middleware

---

Later phases (not yet planned): auth, email notifications, therapist profiles, reporting, and any dedicated surface for the humans who sent the agent in.
