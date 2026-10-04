# Plan: About Us Page — Content

## Group 1: Page

1. Create `src/pages/AboutUs.tsx`:
   - Export `AboutUs` wrapped in `<Layout>`
   - Page title heading (e.g. "About Us" / "About AgentClinic")
   - Section for clinic history
   - Section for founding story
   - Section for staff bios (3–5 named roles with short satirical blurbs)
   - Semantic headings (`h1` / `h2`) so Phase 3 can append a map section cleanly

---

## Group 2: Route

2. Create `src/routes/about.tsx`:
   - `GET /` (mounted at `/about`) renders `<AboutUs />`
   - Return HTML with status 200

3. Register the about router in `src/app.tsx` (same pattern as `feedbackRouter`).

---

## Group 3: Navigation

4. Add an "About" link to `src/components/Header.tsx` pointing at `/about`.

---

## Group 4: Tests

5. Add to `tests/app.test.tsx`:
   - `GET /about` returns HTTP 200
   - Response body includes the page heading and at least one staff bio name from the copy

6. Add to `tests/components.test.tsx` (or page-level render test):
   - `AboutUs` renders history, founding story, and staff bios sections

7. Confirm `npm test` and `npm run typecheck` pass.
