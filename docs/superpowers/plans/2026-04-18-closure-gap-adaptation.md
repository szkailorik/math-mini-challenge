# Closure Gap Adaptation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make phase-two `Closure` react to each learner's strongest current gap signal by turning section V into a noticeable focus-reinforcement lane.

**Architecture:** Keep the existing six-section printable paper shape and per-program storage intact. Add a small adaptive-focus selector that reads second-stage signal fields plus active second-stage error-book entries, chooses one dominant gap per learner, and swaps section V content/title/hint to match that gap without disturbing printing or the first-stage flow.

**Tech Stack:** Static `index.html` app, `localStorage` program profiles, runtime validator in `scripts/validate-runtime.mjs`.

---

### Task 1: Lock the adaptive contract in validation

**Files:**
- Modify: `scripts/validate-runtime.mjs`

- [ ] Add a failing assertion that, after second-stage grading creates a clear strongest `representationGap`, the next KAI closure set exposes adaptive focus metadata for that field.
- [ ] Add a failing assertion that the adaptive section title appears on the rendered paper for that next closure set.
- [ ] Run `node scripts/validate-runtime.mjs` and confirm the new assertion fails before implementation.

### Task 2: Add second-stage dominant-gap selection

**Files:**
- Modify: `index.html`

- [ ] Add a helper that combines closure signal fields, active second-stage error-book counts, and phase preference into one dominant-focus decision per learner.
- [ ] Keep the result small and serializable, for example `{ field, label, title, hint, answerLabel }`.
- [ ] Ensure the helper never touches first-stage profiles and falls back to a phase-appropriate default if no second-stage history exists yet.

### Task 3: Generate an adaptive section V

**Files:**
- Modify: `index.html`

- [ ] Add phase-aware focus question pools for `representationGap`, `methodGap`, `stabilityGap`, `speedGap`, and `validationGap`.
- [ ] Reuse existing tags where possible so answer advice and signal accounting continue to work.
- [ ] Update `buildClosureProgramSet` so each learner gets:
  - adaptive focus metadata
  - adaptive section-V content
  - unchanged section counts and print-safe layout

### Task 4: Render adaptive focus in paper and answer sheet

**Files:**
- Modify: `index.html`

- [ ] Change section-V question titles/hints to read from learner-specific focus metadata instead of one fixed closure mix title.
- [ ] Change the answer-sheet section-V title and review label to match the adaptive focus.
- [ ] Optionally surface the current overall dominant closure focus in the stage-status card if it can be done without cluttering the print surface.

### Task 5: Update docs and verify

**Files:**
- Modify: `README.md`
- Modify: `DEV_SPEC.md`
- Modify: `PRODUCT_SPEC.md`
- Modify: `WORKFLOW.md`
- Modify: `index.html`
- Modify: `scripts/validate-runtime.mjs`

- [ ] Bump the app version and release note to describe closure gap adaptation.
- [ ] Document that section V is now a learner-specific reinforcement lane driven by second-stage signals.
- [ ] Run:
  - `node -e "const fs=require('fs'); const html=fs.readFileSync('index.html','utf8'); const m=html.match(/<script type=\"module\">([\\s\\S]*?)<\\/script>/); if(!m) throw new Error('module script not found'); fs.writeFileSync('/tmp/math-mini-challenge-script.mjs', m[1]);"`
  - `node --check /tmp/math-mini-challenge-script.mjs`
  - `node scripts/validate-runtime.mjs`
- [ ] Commit only the relevant files and push to `main`.
