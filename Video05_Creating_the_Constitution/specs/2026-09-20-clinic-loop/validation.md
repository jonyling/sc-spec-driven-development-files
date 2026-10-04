# MVP Validation — Clinic Loop

## Definition of Done

All of the following must be true before this branch is merged.

### 1. TypeScript compiles cleanly

```
npm run typecheck
```

Must exit 0.

### 2. Tests pass

```
npm test
```

Must exit 0. The suite must assert at least:

- `GET /agents` is HTML 200 and contains a seeded agent name
- `GET /agents/:id` for a seeded id shows model type, status, presenting complaints, a linked ailment, a booked-visits section, and a `datetime-local` input with `min`
- `GET /agents/:id` for an unknown id is **404**
- `GET /ailments` contains "prompt fatigue", "context-window claustrophobia", "hallucination anxiety", and "instruction-following fatigue"
- `GET /therapies` contains a seeded therapy name
- `POST` booking with a blank therapist and an unparseable time does not create a row, returns **400**, shows both errors, and keeps the submitted values
- `POST` booking with a past time does not create a row and returns **400** with a future-time error
- `POST` booking with valid future fields creates one `booked` appointment; the confirmation page shows the agent, therapist, and time; the agent chart lists that visit
- Home still returns `<!DOCTYPE html>`, `<h1>AgentClinic</h1>`, and the stylesheet link

### 3. Schema and seed

- Migrations are plain SQL files and create the six tables in the requirements
- `better-sqlite3` is pinned with no `^` or `~`
- Demo and tests share one database: `AGENTCLINIC_DB` (`data/clinic.sqlite`). Do not use a second temp file.
- After startup, that file contains the seed agents, ailments, therapies, and links. Appointments start empty and stay in this same file when a test or a visitor books.

### 4. Navigation and layout

Every new page's HTML includes the header nav (Home, Agents, Ailments, Therapies), one `<main>`, the existing footer, `width=device-width`, and `/static/style.css`. Styles still define `--orange` and `--black` and a `min-width` media query.

### 5. Manual walkthrough

From `/`:

1. Open Agents and pick one agent. Complaints and ailments are visible.
2. Open Ailments and Therapies from the nav. The names match the seed.
3. Submit the booking form empty. Stay on the agent, see an error, no new appointment.
4. Submit a therapist name and a real date-time. Land on confirmation with those values.
5. Repeat step 4 on a narrow viewport. The form is usable without sideways scrolling.

### 6. Tone

Visible copy stays short and clinic-flavored. No dashboard language, no "lorem ipsum", no framework hello-world text.

## Not Required

- `/dashboard`
- Therapist profile pages
- Auth
- Dedicated 404/500 designs beyond a non-crashing unknown-agent response
- CI
