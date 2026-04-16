# Workflow

## Multi-AG Process

Each change should pass through these lightweight roles. A single developer may perform multiple roles, but the handoff notes should stay explicit.

## Roles

- 产品经理AG: scope, user stories, acceptance criteria.
- 学习科学AG: retrieval practice, spacing, interleaving, misconceptions.
- 设计AG: sheet flow, grading UX, gamification and error-book behavior.
- 架构AG: static app architecture, local-first data, sync and deploy design.
- 开发AG: implementation and self-confirmation.
- 测试AG: smoke tests, edge cases, accessibility checks.
- 审核AG / 质量审核AG: final feasibility and learning alignment review.

## Required Handoff Fields

- What I changed
- Open questions
- Risks
- Next steps

## Iteration Rule

Every substantial release should include at least three passes:

1. Thin slice: keep the app working end to end.
2. Quality pass: fix correctness, persistence, error handling, and adaptive behavior.
3. Polish pass: improve copy, documentation, deployment, and edge cases.

## Current v22.8 Iteration Notes

### Iteration 1

- What I changed: added a visible phase focus plan and capped L4 challenge density outside challenge phases.
- Open questions: none.
- Risks: challenge caps are heuristic and should be tuned after observing several real graded sessions.
- Next steps: compare perceived difficulty across consolidation and challenge days.

### Iteration 2

- What I changed: added curriculum-domain grouping for generated tags and upgraded the knowledge map to show domain coverage and weak-point levels.
- Open questions: none.
- Risks: domains are app-specific learning domains, not a full external curriculum standard.
- Next steps: expand domain descriptors if formal syllabus reporting becomes necessary.

### Iteration 3

- What I changed: updated documentation and runtime validation to check focus strips, level badges, knowledge advice, and domain coverage.
- Open questions: none.
- Risks: validation remains structural; visual overflow still needs browser-based checking when layout changes grow.
- Next steps: consider Playwright screenshots for modal and print layouts.

## Previous v22.7 Iteration Notes

### Iteration 1

- What I changed: added L1-L4 training levels and phase-aware selection bonuses.
- Open questions: none.
- Risks: level inference is tag-based, so exact levels should be tuned as real error data accumulates.
- Next steps: promote high-frequency misses into explicit tag-level difficulty overrides.

### Iteration 2

- What I changed: surfaced level badges on question and answer sheets.
- Open questions: whether printed sheets feel too visually busy.
- Risks: badges use horizontal space in dense sections.
- Next steps: if print density becomes tight, hide level badges in print while keeping them on answer sheets.

### Iteration 3

- What I changed: added a knowledge map modal and runtime level validation.
- Open questions: none.
- Risks: knowledge map currently reflects generated families and active weak tags, not a full curriculum standard.
- Next steps: expand it into a formal grade 3-4 scope map if the app needs curriculum reporting.

## Previous v22.6 Iteration Notes

### Iteration 1

- What I changed: added per-answer misconception tips to the answer sheet.
- Open questions: none.
- Risks: answer sheets are slightly longer because each row now includes feedback text.
- Next steps: watch print density on smaller browser print settings.

### Iteration 2

- What I changed: introduced family-level advice resolution so every generated tag receives targeted feedback.
- Open questions: none.
- Risks: family advice is less precise than exact tag advice, but still much better than a generic fallback.
- Next steps: promote frequently missed family-level tips into exact tag advice over time.

### Iteration 3

- What I changed: expanded runtime validation to fail when generated tags only resolve to the generic fallback.
- Open questions: none.
- Risks: validation still runs in a stubbed DOM, so visual overflow needs separate manual or screenshot review.
- Next steps: add visual regression testing if layout changes continue.

## Previous v22.5 Iteration Notes

### Iteration 1

- What I changed: added two-step equations, reverse distributive shortcuts, unit-fraction application, and parentheses-priority mixed operations.
- Open questions: none.
- Risks: more diagnostic variety may increase perceived difficulty on some days.
- Next steps: watch whether error-book tags cluster around two-step equations or unit fractions.

### Iteration 2

- What I changed: upgraded set cache prefix to v25 so newly generated sets use the expanded pools immediately.
- Open questions: none.
- Risks: previously cached v24 sets remain in local storage but are no longer used for current generation.
- Next steps: keep cache prefix changes tied to generator-pool releases.

### Iteration 3

- What I changed: expanded runtime validation to sets 73-102 and added checks for section counts, empty outputs, duplicate items, and invalid strings.
- Open questions: none.
- Risks: validation is still structural and does not prove every arithmetic answer semantically.
- Next steps: add targeted arithmetic invariants for generator families when they are extracted from the single file.

## Previous v22.4 Iteration Notes

### Iteration 1

- What I changed: expanded misconception tags and fixed answer formatting for conversion and decimal arithmetic items.
- Open questions: none.
- Risks: broader pools make periodic generator sampling more important.
- Next steps: keep the runtime validator in the release checklist.

### Iteration 2

- What I changed: added higher-diagnostic KAI items for tiny decimal products, decimal quotients, unknown divisors, long borrow chains, and compensation shortcuts.
- Open questions: whether future sets should expose per-topic difficulty sliders.
- Risks: advanced KAI items may need manual tuning if daily sessions feel too dense.
- Next steps: watch error-book clustering after several sessions.

### Iteration 3

- What I changed: added Lorik items for near-100 multiplication, 25/scale division, whole-number fraction meaning, and a Node runtime validation script.
- Open questions: none.
- Risks: the stubbed DOM validator is a smoke test, not a visual layout test.
- Next steps: add browser-based screenshot tests if the project later adopts Playwright.

## Previous v22.3 Iteration Notes

### Iteration 1

- What I changed: fixed a decimal-division generator that rounded the dividend and could produce wrong answer keys.
- Open questions: none.
- Risks: generated math still needs periodic sampling because the app has many generators.
- Next steps: keep a generator audit checklist in future releases.

### Iteration 2

- What I changed: made resubmission roll back prior weight adjustments, added safer localStorage writes, and hardened fraction construction against decimal inputs.
- Open questions: whether Gist merge should eventually track per-device conflict metadata.
- Risks: legacy sessions without `weightAdjustments` can only approximate weight rollback for old perfect answers.
- Next steps: retain `weightAdjustments` for all new sessions.

### Iteration 3

- What I changed: updated documentation, clarified GitHub Pages and Gist sync setup, and added product/development specs.
- Open questions: whether to add automated browser tests with Playwright in a future repo structure.
- Risks: the current single-file architecture is convenient but makes unit testing harder.
- Next steps: consider extracting generators and storage into testable modules if the app grows.

## Self-Confirmation Rule

When an error or ambiguity appears, first run a local confirmation: inspect the code, reproduce minimally, or perform a syntax/smoke test. Ask the user only after confirming the decision cannot be made safely from local context.

## Research Alignment

All practice changes must preserve:

- Retrieval before feedback.
- Spaced reappearance of weak or forgotten tags.
- Interleaving across problem forms.
- Feedback that distinguishes careless mistakes from concept errors.
