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

## Current v23.9 Iteration Notes

### Iteration 1

- What I changed: replaced pure random KAI fraction-calculation selection with must-cover coverage groups, while keeping equation archetype coverage intact.
- Open questions: none.
- Risks: KAI fraction sections are more deliberately scaffolded now, so future new fraction tags should be assigned to a clear structure family instead of appended loosely.
- Next steps: watch whether the `k_fcalc_paren` and `k_fcalc_muldiv` alternation feels balanced enough in daily use.

### Iteration 2

- What I changed: made Lorik fraction mix guarantee the full daily spread of its 12 fraction-operation families instead of sampling randomly from the pool.
- Open questions: none.
- Risks: this raises structural consistency and lowers tag-level randomness, so difficulty tuning should happen inside each family rather than by deleting daily families.
- Next steps: consider a phase-aware rotation only if some family starts to feel over-practiced after longer use.

### Iteration 3

- What I changed: updated runtime validation and product/development docs so the new fraction coverage guarantees are explicit and regression-protected.
- Open questions: none.
- Risks: validator strictness is higher again, so any future fraction-pool refactor must update the expected coverage rules intentionally.
- Next steps: if coverage rules keep growing, move the validator expectations into shared named manifests.

## Previous v23.8 Iteration Notes
### Iteration 1

- What I changed: extended must-cover generation into KAI conversions so each set now includes percent, repeating-decimal, benchmark-denominator, and decimal-to-fraction practice.
- Open questions: none.
- Risks: conversion sections are now more pedagogically stable but slightly less surprising from set to set.
- Next steps: monitor whether one conversion family should rotate by phase rather than appear daily.

### Iteration 2

- What I changed: made KAI equations cover inverse-operation, multi-step, special-position unknown, and proportion forms every set.
- Open questions: none.
- Risks: stronger archetype coverage means the equation block is more intentionally structured, so future tag additions should slot into a clear archetype instead of just enlarging the pool.
- Next steps: consider the same archetype-based approach for fraction calculation subtypes if that section starts drifting.

### Iteration 3

- What I changed: updated runtime validation and docs so conversion/equation coverage is explicit and protected.
- Open questions: none.
- Risks: validator strictness is higher, so future content expansions must update the expectations intentionally.
- Next steps: if the app keeps growing, extract per-section coverage rules into named constants instead of repeating them in validators.

## Previous v23.7 Iteration Notes

### Iteration 1

- What I changed: replaced pure random section selection in KAI decimal multiplication and division with must-cover coverage groups before shuffling.
- Open questions: none.
- Risks: fixed coverage reduces randomness slightly, but the gain in daily diagnostic consistency is worth that tradeoff.
- Next steps: watch whether any one must-cover subtype starts to feel overrepresented after a month of use.

### Iteration 2

- What I changed: made Lorik basic mixed problems cover shortcut structure, operation order, distributive reasoning, and combination splitting every set.
- Open questions: none.
- Risks: stronger structure coverage may expose more misconception clusters at once, so answer tips should stay concise.
- Next steps: if needed, tune weekly phase weights so one category gets lighter during challenge-heavy cycles.

### Iteration 3

- What I changed: updated runtime validation and docs so section-coverage guarantees are explicit and regression-protected.
- Open questions: none.
- Risks: future generator edits must preserve these guarantees or update the validation intentionally.
- Next steps: consider adding similar must-cover scaffolding to KAI conversions if that section starts feeling too random.

## Previous v23.6 Iteration Notes

### Iteration 1

- What I changed: introduced shared runtime version constants so UI labels, Gist metadata, and JSON exports stay on the same app version.
- Open questions: none.
- Risks: static README and release notes still need manual updates each release even though the runtime strings are now centralized.
- Next steps: if releases become more frequent, generate the human-facing changelog from a single source too.

### Iteration 2

- What I changed: upgraded backup export metadata and import success feedback so recovery flows show the source version and context.
- Open questions: none.
- Risks: older backups still restore as `legacy`, which is correct but less precise if users renamed files manually.
- Next steps: consider adding a tiny backup summary panel before import confirmation.

### Iteration 3

- What I changed: added lightweight print preflight hints and unified toast feedback for print, grading, and error-book actions.
- Open questions: none.
- Risks: the print hint intentionally delays dialog opening slightly, so it should stay brief to avoid feeling sluggish.
- Next steps: if families still miss print settings, consider a first-run-only print checklist modal.

## Previous v23.5 Iteration Notes

### Iteration 1

- What I changed: replaced timer-only print cleanup with `afterprint` and print media lifecycle cleanup, and updated print CSS so visible sheets own pagination during print.
- Open questions: none.
- Risks: browser print engines still depend on user scaling and printer hardware margins, so a manual preview check remains part of release confirmation.
- Next steps: if print regressions keep recurring, add browser PDF snapshot checks in CI.

### Iteration 2

- What I changed: guaranteed Lorik section II includes decimal-dividend, decimal-divisor, and double-decimal division practice on every generated set.
- Open questions: none.
- Risks: more decimal division in one section raises local density slightly, so future tuning may rebalance difficulty if Lorik sets feel too narrow.
- Next steps: monitor whether the three-way decimal mix should rotate by phase or remain fixed every set.

### Iteration 3

- What I changed: updated README, product/development docs, and runtime validation for print lifecycle and Lorik decimal-division coverage.
- Open questions: none.
- Risks: validation confirms structure and helper behavior, but native print preview still needs occasional manual verification.
- Next steps: keep the print-preview smoke test in every release checklist that touches layout or print CSS.

## Previous v23.4 Iteration Notes

### Iteration 1

- What I changed: added a current-set review report button to the control panel.
- Open questions: none.
- Risks: reports only show submitted grading records, so unsubmitted learners are clearly marked as pending.
- Next steps: keep the report tied to the paper question number for easy parent-child review.

### Iteration 2

- What I changed: automatically opens the set report after grade submission.
- Open questions: none.
- Risks: the modal adds one more step after submit, but it directly supports paper correction.
- Next steps: consider a print-friendly set-review summary if parents want a separate correction slip.

### Iteration 3

- What I changed: added validation and docs for set-review output including question number, original question, and correct answer.
- Open questions: none.
- Risks: the report depends on `info.num` stored by answer rows; future answer-row changes must preserve it.
- Next steps: include report checks in every runtime validation pass.

## Previous v23.3 Iteration Notes

### Iteration 1

- What I changed: made the local-only status actionable with a visible cloud-connect button.
- Open questions: none.
- Risks: users still need a valid GitHub PAT with gist scope on each device.
- Next steps: keep setup instructions short and visible.

### Iteration 2

- What I changed: made the cloud status line clickable and clarified the not-connected state.
- Open questions: none.
- Risks: status text alone cannot confirm whether the browser has blocked localStorage.
- Next steps: add localStorage diagnostics only if connection problems persist.

### Iteration 3

- What I changed: updated docs for the new sync onboarding flow.
- Open questions: none.
- Risks: GitHub token generation is still an external GitHub step.
- Next steps: consider adding a small illustrated setup checklist later.

## Previous v23.2 Iteration Notes

### Iteration 1

- What I changed: clarified that cloud records live in a private GitHub Gist, while GitHub Pages only serves the app.
- Open questions: none.
- Risks: users must connect the same token on each device; without token the app remains local-only.
- Next steps: keep the data backup modal as the primary sync onboarding surface.

### Iteration 2

- What I changed: added automatic remote pull on page focus, visibility return, and a light interval.
- Open questions: none.
- Risks: GitHub API rate limits are possible with excessive open tabs, so pulls are throttled.
- Next steps: observe whether the interval needs tuning after real family use.

### Iteration 3

- What I changed: improved sync status timestamps and validation coverage for auto-pull helpers.
- Open questions: none.
- Risks: native browser storage can still be cleared by the user, so JSON backup remains recommended.
- Next steps: add a visible cloud conflict log only if sync issues appear in practice.

## Previous v23.1 Iteration Notes

### Iteration 1

- What I changed: added a question-only print mode that hides answers and non-question sheets.
- Open questions: none.
- Risks: browser print dialogs still depend on user printer defaults such as scaling.
- Next steps: recommend default scale or "fit to printable area" if a specific printer clips edges.

### Iteration 2

- What I changed: marked the four AB sheets as `question-sheet` and the fourth as `print-last-question` for stable A4 pagination.
- Open questions: none.
- Risks: if future sections grow taller, the fixed A4 sheet may overflow.
- Next steps: keep runtime and visual checks tied to any future content-density changes.

### Iteration 3

- What I changed: added answer-only printing, docs, and validation that each generated set has exactly four printable question sheets.
- Open questions: none.
- Risks: validation is structural and does not open the native print dialog.
- Next steps: add browser screenshot or PDF export checks if print layout changes often.

## Previous v23.0 Iteration Notes

### Iteration 1

- What I changed: added exact error-book replay scoring and capped replay per section.
- Open questions: none.
- Risks: exact replay should stay limited so students still practice retrieval transfer.
- Next steps: tune replay rate after observing whether repeated misses clear faster.

### Iteration 2

- What I changed: added same-tag variation labels and kept domain transfer as the third bridge layer.
- Open questions: none.
- Risks: variant labels may need tutor explanation the first time students see them.
- Next steps: add short parent-facing copy if the badge vocabulary feels unclear.

### Iteration 3

- What I changed: added the Error-Book Bridge plan to the knowledge map and validation coverage for replay bridging.
- Open questions: none.
- Risks: bridge priority is based on local app data, not a formal mastery scale.
- Next steps: consider a weekly “错题清零” routine view once enough sessions accumulate.

## Previous v22.9 Iteration Notes

### Iteration 1

- What I changed: added domain-level weakness scoring from weights and active error-book counts.
- Open questions: none.
- Risks: domain boosts must stay moderate so one weak area does not monopolize the whole paper.
- Next steps: tune boost size after several graded sessions.

### Iteration 2

- What I changed: connected domain signals to adaptive selection and added a Domain Boost answer badge.
- Open questions: none.
- Risks: the badge explains intent, but students still need tutor guidance to link related tags.
- Next steps: add short domain-specific remediation routines if repeated clusters persist.

### Iteration 3

- What I changed: upgraded the knowledge map priority labels and runtime validation for domain-signal scoring.
- Open questions: none.
- Risks: priority labels are based on app-local data, not standardized mastery scores.
- Next steps: consider historical trend charts once enough sessions accumulate.

## Previous v22.8 Iteration Notes

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
