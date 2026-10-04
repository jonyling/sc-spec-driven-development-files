# MVP Requirements — Clinic Loop

## Scope

Ship the smallest AgentClinic a booth visitor can click through: a distressed agent has ailments, those ailments point at therapies, and someone books an appointment. Phase 1 already provides the home page, layout shell, orange-and-black mobile-first CSS, and Vitest. This slice adds persistence and the domain pages.

### In scope

- Header nav so the new pages are reachable from every route
- SQLite via `better-sqlite3` (pinned, no `^` or `~`), plain SQL migration files, no ORM
- Seed data: a handful of fictional agents, ailments, and therapies, plus the links between them
- `/agents` list and `/agents/:id` detail (name, model type, status, presenting complaints, linked ailments)
- `/ailments` list
- `/therapies` list, including which ailments each therapy is for
- Book an appointment from an agent's detail page: therapist name, date and time, status
- Confirmation page after a valid booking
- Server-side validation on the booking form
- Vitest coverage of the new routes and the unhappy booking path
- Every new page rendered inside the existing `Layout` (orange/black, mobile-first, viewport meta)

### Out of scope

- Staff dashboard, counts, and management tables (roadmap Phase 5)
- Accessibility polish pass and visual redesign (roadmap Phase 6)
- Dedicated 404/500 pages, logging middleware, and a general sanitization pass (roadmap Phase 7)
- Auth, email, therapist profile pages, reporting
- A separate page for the humans who sent the agent in
- An ORM, a second database, or Docker

## Data

| Table | Purpose | Columns |
|---|---|---|
| `agents` | Patients | `id`, `name`, `model_type`, `status`, `presenting_complaints` |
| `ailments` | Named problems | `id`, `name`, `description` |
| `agent_ailments` | Many-to-many | `agent_id`, `ailment_id` |
| `therapies` | Treatments | `id`, `name`, `description` |
| `ailment_therapies` | Recommended care | `ailment_id`, `therapy_id` |
| `appointments` | Booked visits | `id`, `agent_id`, `therapist_name`, `scheduled_at`, `status` |

`therapist_name` is plain text. Therapist profiles are not a table and not a page.

`scheduled_at` is stored as ISO-8601. `status` starts as `booked`.

Seed at least:

- Four agents with distinct model types and statuses
- These ailments (four total — the two named ones plus two more): "context-window claustrophobia", "prompt fatigue", "hallucination anxiety", "instruction-following fatigue"
- Therapies mapped to those ailments
- Every seed agent linked to one or more ailments
- No appointments at first seed, so the first booking is visible as new

## Decisions

### SQLite, no ORM

`better-sqlite3` and SQL files under something like `db/migrations/`. The app applies migrations on startup. Queries stay in a small data module; pages do not open the database themselves. No query builder.

### Clinic loop, not the whole roadmap

MVP stops when a visitor can go home → agents → one agent → book → confirmation, and can also open the ailments and therapies lists. Dashboard, polish, and hardening stay on the roadmap.

### Booking lives on the agent

The form is on `/agents/:id`, not a global booking catalog. Routes: `POST /agents/:id/appointments` and confirmation at `GET /appointments/:id` (303 redirect). Unknown agent or appointment IDs return HTML **404**.

The agent chart lists **booked visits** (therapist, time, status) as well as ailments. After a booking, going back to the agent shows that visit.

The time field is `<input type="datetime-local">` with a `min` of the current local time so the browser restricts choices. The server still validates. Stored value is ISO-8601.

Validation:

- Agent must exist (else 404)
- Therapist name is required and not blank
- `scheduled_at` is required, must parse, and must be **in the future**
- Invalid input returns HTML **400**, re-renders the detail page with **all** errors shown at once, keeps the submitted field values, and inserts nothing

### Booth tone

Copy is short and whimsical, in the same voice as the home tagline. Orange and black tokens stay the only brand colors. New pages use the existing layout and `min-width` CSS. Nav labels are plain: Home, Agents, Ailments, Therapies.

### Tests over curl

`npm test` and `npm run typecheck` are the merge gate. Route tests use `app.request()` against the same database as the demo. There is one file, `AGENTCLINIC_DB` (`data/clinic.sqlite`). A booking made by a test is a real row in that file. Do not require a human to curl a live server.

## Context

Roadmap phases 2–4, folded into one MVP. Guided by `specs/mission.md` and `specs/tech-stack.md`. Phase 1 spec: `specs/2026-09-19-hello-hono/`.

- **Stack:** server-rendered Hono JSX, strict TypeScript, Vitest, SQLite, mobile-first plain CSS, `--orange` and `--black`.
- **Mission:** agents check in with ailments, we match therapies, they get an appointment. Staff dashboard is Mary's later win, not this slice.
- **Audience:** a course student or booth visitor should click from the home page to a booked appointment in a few minutes.

## Stakeholder Notes

- **Mary** gets strict TypeScript and a real database. She does not get `/dashboard` yet.
- **Steve** gets the same orange/black, phone-and-desktop layout on every new page.
- **Susan** gets agents, ailments, therapies, and appointments — the four things she asked for.
