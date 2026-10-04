---
name: feature-spec
description: >
  Kicks off the next roadmap feature: finds the next incomplete phase in
  specs/roadmap.md, creates a git branch, interviews with AskUserQuestion on
  scope/decisions/context, then writes specs/YYYY-MM-DD-feature-name/ with
  plan.md, requirements.md, and validation.md using mission.md and
  tech-stack.md. Use when the user says feature spec, next phase, start the
  next feature, or runs /feature-spec.
---

# Feature Spec

Run this workflow from the project root that contains `specs/`.

## 1. Find the next phase

Read `specs/roadmap.md`. The next phase is the first incomplete phase (unchecked items, or no completion mark on the heading). Derive a kebab-case feature name from that phase.

## 2. Create the branch

```bash
git checkout -b phase-N-<kebab-name>
```

Use the phase number and kebab name from the roadmap entry.

## 3. Interview before any writes

Call `AskUserQuestion` once with exactly these three questions grouped together:

1. **Scope** — what the feature collects, exposes, or does (fields, behaviour, data shape)
2. **Decisions** — key implementation choices (storage, visibility, validation, UX pattern)
3. **Context** — tone, constraints, or anything else that shapes the spec

Do not create directories or write files until the user has answered all three.

## 4. Read guidance

Read `specs/mission.md` and `specs/tech-stack.md` before drafting the three spec files.

## 5. Write the spec directory

Create `specs/YYYY-MM-DD-<feature-name>/` using today's date, containing:

### `requirements.md`
- Scope: what is included and excluded; field/data table when useful
- Decisions: choices from the interview and why
- Context: tone, stack pointers, existing patterns to follow

### `plan.md`
- Numbered task groups (for example Data → Components → Routes → Navigation → Tests)
- Numbered sub-tasks under each group; groups should be independently implementable

### `validation.md`
- Automated checks (project test and typecheck commands; required assertions)
- Manual walkthrough, behaviour, and edge cases
- Tone check when there is user-facing copy
- Definition of done / merge gate

## Constraints

- Stay within `specs/tech-stack.md`; do not add dependencies without user approval
- Follow conventions already present in the codebase
- Keep the feature focused and independently shippable
