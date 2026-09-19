# Phase 1 Validation — Hello Hono

## Definition of Done

All of the following must be true before this branch is merged.

### 1. TypeScript compiles cleanly

```
npm run typecheck
```

Must exit with code 0 and produce no errors or warnings.

### 2. Server starts

```
npm run dev
```

Must start without errors. The terminal should show the server is listening on port 3000 (or the logged port).

### 3. Route returns an HTML home page

```
curl -s http://localhost:3000
```

HTTP status must be `200 OK`. Response body must be HTML and must contain:

- An `<h1>` element with the text `AgentClinic`
- A tagline (any short descriptive text; exact wording is an implementation choice)
- A `<header>`, a `<main>`, and a `<footer>` (the shared layout)

### 4. Stylesheet is served

```
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/static/style.css
```

Must be `200`. The home page HTML must include a `<link>` to `/static/style.css`.

### 5. Hono version is pinned

`package.json` must list `hono` without a `^` or `~` range prefix. If `@hono/node-server` is present, it is pinned the same way.

### 6. Header, Main, and Footer are separate files

These paths must exist, each exporting one component:

- `src/components/Header.tsx`
- `src/components/Main.tsx`
- `src/components/Footer.tsx`

`src/components/Layout.tsx` must import those three modules. Defining `Header` / `Main` / `Footer` as local functions inside `Layout.tsx` (or `Home.tsx`) does not satisfy this.

### 7. Strict TypeScript is on

`tsconfig.json` must contain `"strict": true`.

## Not Required

- No automated tests for this phase
- No CI pipeline
- No browser rendering check (`curl` is sufficient)
- No extra routes or database
