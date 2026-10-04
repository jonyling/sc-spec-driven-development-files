# MVP Plan — Clinic Loop

## Group 1 — Database

1. Add pinned `better-sqlite3` (and its types if typecheck needs them)
2. Add `db/migrations/` with ordered SQL files for `agents`, `ailments`, `agent_ailments`, `therapies`, `ailment_therapies`, and `appointments`
3. Open SQLite from one module and apply pending migrations on startup
4. Keep SQL out of page components

## Group 2 — Seed

5. Add a seed that is safe to run more than once (skip or replace, but do not duplicate rows)
6. Seed at least four agents; ailments "context-window claustrophobia", "prompt fatigue", "hallucination anxiety", and "instruction-following fatigue"; therapies; and the links between them
7. Leave `appointments` empty

## Group 3 — Navigation

8. Add header links: Home, Agents, Ailments, Therapies
9. Keep Header, Main, and Footer in their own files
10. Render every new page inside `Layout` (doctype, viewport, `/static/style.css`, orange/black tokens)

## Group 4 — Agents

11. `GET /agents` lists every agent (name, model type, status)
12. `GET /agents/:id` shows name, model type, status, presenting complaints, linked ailments, and booked visits
13. Unknown id returns HTML **404**

## Group 5 — Ailments and therapies

14. `GET /ailments` lists ailments and which agents have them
15. `GET /therapies` lists therapies and which ailments they are recommended for

## Group 6 — Booking

16. Agent detail includes a form: therapist name and `datetime-local` (with `min` = now)
17. `POST` validates input (required therapist, real future time); invalid input re-renders with all errors kept, fields preserved, and inserts nothing (400)
18. Valid input inserts an appointment with status `booked`, redirects (303) to `/appointments/:id`, and that visit appears on the agent chart

## Group 7 — Verify

19. Vitest: list and detail routes return the seed copy; unknown agent is not 500; invalid booking does not persist; valid booking shows on the confirmation page
20. `npm run typecheck` exits 0
21. `npm test` exits 0
22. Spot-check a phone-width and a desktop-width layout: nav wraps or stays readable, no horizontal scroll on the agent detail form
