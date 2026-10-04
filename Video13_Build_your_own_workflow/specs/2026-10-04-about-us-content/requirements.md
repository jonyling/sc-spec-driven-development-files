# Requirements: About Us Page — Content

## Scope

Implement a public About Us page at `/about` that gives AgentClinic a satirical identity through static content: clinic history, founding story, and staff bios. Link the page from the main navigation.

### Included

| Content           | Form                                      | Notes                                      |
|-------------------|-------------------------------------------|--------------------------------------------|
| Clinic history    | Short narrative section                   | How the clinic came to serve AI agents     |
| Founding story    | Short narrative section                   | Origin myth played completely straight     |
| Staff bios        | Named roles with short blurbs (3–5)       | Fictional staff; copy lives in the page    |
| Route             | `GET /about`                              | Server-rendered HTML                       |
| Navigation        | "About" link in `Header`                  | Same pattern as Feedback                   |

### Excluded

- Map embed, address block, or location UI (roadmap Phase 3)
- Database table, migration, or seed for about content
- New npm dependencies
- Client-side JavaScript

### Visibility

The page is publicly readable. Content is hardcoded in the page component for this phase.

## Decisions

- **Single page component** — `src/pages/AboutUs.tsx` holds all copy and section markup; no separate History / FoundingStory / StaffBios components.
- **Route module** — `src/routes/about.tsx` serves `GET /about` and renders `<AboutUs />` inside the existing app registration pattern (`src/app.tsx`).
- **Reuse Layout** — wrap content with `<Layout>` like `Feedback.tsx` and `Home.tsx`.
- **Static copy only** — no markdown renderer, CMS, or DB-backed content.
- **Staff bios are fictional** — invent satirical clinic roles; do not pull therapists or agents from seed data.

## Context

- See `specs/mission.md`: satirical comedy played straight; comedy lives in the content.
- See `specs/tech-stack.md`: Hono JSX SSR, vanilla CSS in `static/style.css`, Vitest; no new dependencies.
- Booth-demo tone: whimsical mock-serious voice, orange/black brand, mobile-first layout already in the stylesheet.
- Existing patterns: `src/pages/Feedback.tsx` for page shape, `src/routes/feedback.tsx` for route wiring, `src/components/Header.tsx` for nav links, `src/app.tsx` for router registration.
- Roadmap Phase 3 will extend this page with a map; keep markup sectioned so a map block can be added later without rewriting the content sections.
