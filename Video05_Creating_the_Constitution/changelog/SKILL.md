---
name: changelog
description: >-
  Maintains CHANGELOG.md in the project root from git history, with
  ## YYYY-MM-DD headings (newest first). Use when the user runs /changelog,
  asks to update the changelog, generate a changelog, or record what
  changed before merging a branch.
---

# Changelog

Update `CHANGELOG.md` before merging. Do not invent entries; take them from git.

## Steps

1. Run from the **project root** (the directory with `package.json`, not necessarily `.git/`):

```bash
python3 changelog/scripts/changelog.py
```

2. The script:
   - **No `CHANGELOG.md`**: writes one from git history, commits grouped by author date
   - **File exists**: prepends only commits newer than the latest `## YYYY-MM-DD` heading
   - If cwd is inside a git repo but not the git root, only commits that touch this directory are used

3. Read `CHANGELOG.md`. Tighten bullet wording if a subject is noisy; keep dates and grouping.

4. Stage `CHANGELOG.md` with the merge (or the feature commit). Do not commit the changelog as the only change unless the user asked just for a changelog update.

## Format

```markdown
# Changelog

## 2026-09-19

- Implement Phase 1 Hello Hono with shared layout

## 2026-09-18

- Add AgentClinic constitution and Hello Hono spec
```

- One `# Changelog` title
- Headings `## YYYY-MM-DD`, newest first
- One bullet per commit subject

Re-running when nothing is new is a no-op.
