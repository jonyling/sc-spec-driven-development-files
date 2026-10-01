# Phase 1 Validation — Hello Hono

## Definition of Done

All of the following must be true before this branch is merged.

### 1. TypeScript compiles cleanly

```
npm run typecheck
```

Must exit with code 0 and produce no errors or warnings.

### 2. Vitest is wired up

```
npm test
```

Must exit with code 0. `package.json` must define a `"test"` script that runs Vitest. `vitest` must be listed as a pinned dev dependency (no `^` or `~`).

The suite must cover `GET /` via `app.request()` (status 200, HTML, `<h1>AgentClinic</h1>`, tagline, `<header>` / `<main>` / `<footer>`, stylesheet link, viewport meta) and the Header, Main, Footer, and Layout components. It must also assert that `static/style.css` uses CSS custom properties and at least one `min-width` media query.

The Hono app must be exported from a module that does not call `serve()` (e.g. `src/app.tsx`).

### 3. Server starts

```
npm run dev
```

Must start without errors. The terminal should show the server is listening on port 3000 (or the logged port).

### 4. Route returns an HTML home page

```
curl -s http://localhost:3000
```

HTTP status must be `200 OK`. Response body must be HTML and must contain:

- An `<h1>` element with the text `AgentClinic`
- A tagline (any short descriptive text; exact wording is an implementation choice)
- A `<header>`, a `<main>`, and a `<footer>` (the shared layout)

### 5. Stylesheet is served

```
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/static/style.css
```

Must be `200`. The home page HTML must include a `<link>` to `/static/style.css`.

### 6. Hono version is pinned

`package.json` must list `hono` without a `^` or `~` range prefix. If `@hono/node-server` is present, it is pinned the same way.

### 7. Header, Main, and Footer are separate files

These paths must exist, each exporting one component:

- `src/components/Header.tsx`
- `src/components/Main.tsx`
- `src/components/Footer.tsx`

`src/components/Layout.tsx` must import those three modules. Defining `Header` / `Main` / `Footer` as local functions inside `Layout.tsx` (or `Home.tsx`) does not satisfy this.

### 8. Responsive design is in place

The rendered HTML must contain `<meta name="viewport" content="width=device-width, initial-scale=1.0">`. `static/style.css` must use CSS custom properties and at least one `min-width` media query (mobile-first). Desktop-only `max-width` breakpoints as the primary strategy do not satisfy this. The stylesheet must define `--orange` and `--black` and use them for brand chrome.

### 9. Strict TypeScript is on

`tsconfig.json` must contain `"strict": true`.

## Not Required

- No CI pipeline
- No browser rendering check (`curl` is sufficient)
- No extra routes or database
