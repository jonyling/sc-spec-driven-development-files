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

### 4. Hono version is pinned

`package.json` must list `hono` without a `^` or `~` range prefix. If `@hono/node-server` is present, it is pinned the same way.

### 5. Strict TypeScript is on

`tsconfig.json` must contain `"strict": true`.

## Not Required

- No automated tests for this phase
- No CI pipeline
- No browser rendering check (`curl` is sufficient)
- No CSS, shared layout, extra routes, or database
