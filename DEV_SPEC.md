# Development Spec

## Architecture

This is a static single-page app. The production artifact is `index.html`; there is no build step.

- UI: HTML, CSS, and an ES module script in `index.html`.
- Persistence: `localStorage` for profiles and cached set snapshots.
- Optional sync: GitHub Gist API using a user-provided PAT with `gist` scope.
- Export: `html2canvas` from CDN for PNG sheet export.
- Deploy: GitHub Pages workflow in `.github/workflows/pages.yml`.
- Program shell: the app now exposes a `TRAINING_PROGRAMS` registry, a persisted `currentProgramId`, program-aware set counters, and a lightweight closure-bootstrap state; `advanced_fluency_v1` remains the default while fully writable `elementary_closure_v1` is enabled, phase-aware, gap-adaptive, focus-replay-aware, manually switchable, and paired with booklet-style question sheets plus aligned answer-booklet presentation in `v23.65`, including separate screen-vs-print layout rules for question density, a normalized inline-math question renderer, a restored single-line in-body answer rendering model, a borderless write-gap after equals signs, neutral equals-sign coloring that matches the surrounding math text, a complexity-aware paper layout that keeps every question on a single line while still targeting a two-page worksheet footprint, explicit `Closure` focus-lane `L1/L2/L3` replay escalation metadata, shared explanation-mode normalization for rollout families, wider quality-family coverage for `k_fcalc_*` and `c2_eq_*`, dedicated boundary-style closure replay items for method-heavy, validation-heavy, speed-heavy, and stability-heavy `L3` reinforcement, a child-facing `Calculation Quick Review` page that now includes explicit usage guidance, stage notes, numbered scan navigation, a prominent `今日先看` focus strip, simplified focus cards, and a topic body reorganized into a single total-principle line, a numbered three-step working flow, and a lighter support block, with the hero area laid out as a lighter two-column cover, the recommendation/focus zone compressed to get the learner into topic content faster, each topic card restructured as a tighter review card that surfaces the memory hook and recall route first, then the numbered working flow, then the support/example layer, and the topic copy itself rewritten into shorter, more child-usable reminder language so the page functions more like recall scaffolding than explanatory reference text, while the compressed floating teacher workbench menu removes long stage descriptions from the shell, keeps only compact phase/status controls, protects short viewports with internal scrolling, packs secondary tutor actions into a denser two-column grid so the lower controls remain reachable, hides the now-redundant program title row, and renders the stage-status area as a lighter in-card status layer instead of a second heavy card block.

## Local Environment

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/`.

Directly opening `index.html` may work for much of the app, but an HTTP server is the recommended path because the script is loaded as a module.

## Repository Layout

```text
.
├── index.html
├── README.md
├── PRODUCT_SPEC.md
├── DEV_SPEC.md
├── WORKFLOW.md
├── AGENTS.md
├── scripts/validate-runtime.mjs
└── .github/workflows/pages.yml
```

## Key Runtime Concepts

- `currentSetNumber`: drives deterministic seeding and set cache keys.
- `TRAINING_PROGRAMS` / `currentProgramId`: switch between the first-stage advanced trainer and the second-stage closure program while keeping the first-stage default path intact.
- `SET_COUNTERS_STORAGE_KEY`: keeps `Advanced` and `Closure` on their own set counters so stage switching does not overwrite the other stage's progress pointer.
- `PROMOTION_STATE_STORAGE_KEY`: now mainly keeps closure bootstrap history and intro-dismiss state for backward compatibility; stage switching itself is manual.
- `renderProgramShell`: updates the control-panel program switcher and stage-status card without affecting printable question-sheet DOM.
- `buildPromotionReadinessSnapshot`: now serves as the first-stage manual workbench snapshot instead of an automatic promotion judge.
- `bootstrapClosureProfiles`: seeds the second-stage profile from first-stage signals on the first manual switch into `Closure`.
- `getSetCacheKey`: namespaces cached set snapshots by program so closure papers do not collide with advanced papers.
- `getClosurePhaseInfo`: maps the second-stage set counter to `收口期 / 收束期 / 毕业判定期`, and provides phase-specific cue text plus section labels.
- `selectClosureFocus`: combines closure signal fields, active closure error-book counts, recent closure mistakes, and phase bias to choose the dominant learner-specific reinforcement lane.
- `buildClosureFocusReplayItem`: chooses an explicit `Closure` focus replay item for section V, preferring exact replay for `L1`, same-family variant for `L2`, and stronger boundary-style focus variants for `L3`.
- `injectClosureFocusReview`: injects one explicit closure-focus replay item into section V when the chosen focus lane has active matching error-book entries.
- `inferExplanationMode` / `buildExplanationText`: map high-value quality families to `rule / method / validation` explanation language.
- `attachExplanationMetadata`: normalizes rollout-family items so their `step` text is wrapped in structured reminder language before answer-sheet rendering.
- `QUALITY_FAMILY_RULES`: now also maps `k_fcalc_*` into `fraction_operation` and `c2_eq_*` into `equation_method`, so both stages feed more consistently into replay and explanation logic.
- `buildClosureBoundaryReplayItem`: supplies dedicated `L3` boundary-style reinforcement questions for closure method, validation, speed, and stability families instead of reusing only the generic same-family variant path.
- `Engine.weightedSelect`: selects problem tags using randomness, weak-topic weights, and spacing bonus.
- `TRAINING_LEVELS` / `inferDifficulty`: assigns L1-L4 levels to generated items and lets the training cycle bias selection.
- `TRAINING_FOCUS_PLAN` / `Engine.getFocusPlan`: maps the seven-set cycle to a visible goal, target level band, and training principle.
- `generateOrLoadSetData`: reuses cached set data so question sheets and answer sheets stay aligned.
- `generateProgramSetData`: isolates advanced and closure generation behind one runtime entry point.
- `buildClosureProgramSet`: assembles the second-stage paper around two simultaneous goals: elementary calculation closure and first-stage skill maintenance, while also shifting emphasis by phase across the monthly arc and by learner-specific focus lane in section V.
- `buildClosureC2Variant`: supplies closure-specific review variants for second-stage bridge, unit, rate, speed, and validation tags when exact replay would duplicate the current paper.
- `StorageDB.saveSession`: persists grading results, updates weights, maintains history, and rolls error-book counts forward or backward on resubmission.
- `getKnowledgeTip`: resolves exact knowledge-tag advice first, then family-level advice, then the generic fallback.
- `KnowledgeDomains` / `getKnowledgeDomain`: groups generated tags into curriculum domains for higher-level coverage and weak-point reporting.
- `getDomainSignal` / `summarizeDomainSignals`: converts domain-level weak tags and active error-book counts into adaptive selection bonuses and reporting priority.
- `getErrorBookSignal` / `buildErrorReplayItem`: bridges active error-book entries back into generated training as capped exact replay or same-tag variation.
- `showKnowledgeMap`: renders current weak tags, domain profile, and knowledge-family coverage.
- `showCalculationQuickReview`: renders the child-facing quick-review page using a stable topic registry, stage-aware emphasis copy, light recommendation chips, a stronger two-topic focus strip, jump-to-topic helpers, and dedicated print markup.
- `getProgramSignalDelta` / `snapshotProgramSignals`: convert second-stage grading into five independent closure-signal buckets without contaminating first-stage weights.
- `printQuestionSheets` / `printAnswerSheets`: stages cloned printable sheets into `#print-root`, switches the body into a print sandbox mode, and relies on `afterprint` and print media lifecycle hooks to restore the normal page state.
- Print output now uses a dedicated print sandbox instead of paginating the live long page directly, reducing browser-specific blank-even-page regressions.
- Question-sheet printing uses a slightly sub-A4 fixed page height in the sandbox to avoid rounding overflow that can make one printed sheet consume two physical pages.
- The no-print shell now separates from the paper more clearly: the control area behaves like a teacher workbench, while printable sheets stay exam-like and closer to Singapore-style math booklet presentation.
- `buildQSection`: now parses the visible Chinese section ordinal and renders it as a dedicated section marker, so large-question structure reads more like a booklet than a dashboard.
- `buildSheetMetaBand`: adds a compact per-page meta strip for program, paper identity, and current focus without changing the adaptive training logic or print root behavior.
- `buildSheetFooter`: adds a compact bottom footer with paper flavor and code so question sheets and answer keys feel like one coherent printed set.
- `getAnsSheetHTML` / `getClosureAnsSheetHTML`: now use the same meta-band and footer language as the question sheets, making answer pages feel like the same booklet rather than a separate utility view.
- Question-sheet blocks now use screen-first `min-height` instead of hard `height`, so longer questions are allowed to fully render on screen instead of being clipped by booklet chrome.
- Print mode now applies a separate compact-density override inside `#print-root`, shrinking item spacing, section chrome, and block minima so the printed four-page flow stays stable even after the screen layout became more flexible.
- `buildQSection` now renders the question number outside the wrapped text body, which prevents multi-line questions from dragging the serial number out of alignment.
- `SET_CACHE_PREFIX`: versioned set-cache namespace; bumping it forces future set numbers to regenerate under new generator rules instead of reusing stale papers from older releases.
- Training-quality passes now also target explanation quality, not only coverage: key generated items should expose a real worked hint instead of relying solely on fallback knowledge advice.
- Question-sheet rendering now intentionally suppresses training metadata such as weakness badges, level badges, and phase strips; only exact error-book replay items may show a tiny non-layout-affecting review marker.
- `normalizeInlineMathMarkup` / `normalizeQuestionPrompt`: normalize legacy block-like math fragments such as fraction markup and blank lines into inline-safe spans, convert trailing `=` prompts into a shared `math-answer-tail`, and avoid appending redundant answer tails to comparison or internal-equation items.
- `normalizeQuestionPrompt` now detects visible internal equals from stripped math text rather than raw HTML, preventing fraction markup attributes such as `class="frac"` from suppressing the trailing answer tail by mistake.
- `buildInlineAnswerHtml`: now renders a minimal in-body `=` plus a borderless write-gap so prompts and suffix text stay inline without adding underline geometry that destabilizes the worksheet layout.
- Conversion/comparison quality work now focuses on benchmark discrimination: comparison items near `1/2`, `5/8`, `3/4`, and `4/5` should force real comparison rather than obvious visual guessing.
- Error-book replay now has two lanes: exact replay of the original item, and targeted same-tag review variants for selected high-value tags such as decimal-division and benchmark-comparison items.
- `getHighValueTrainingSignal`: adds a global priority layer so the engine can spend more of the daily paper on high-value misconception families instead of distributing attention too evenly.
- Targeted review variants now also cover selected KAI decimal-division and equation trap tags, not only Lorik benchmark comparison and division tags.
- `beautifyMathHTML`: normalizes the visual treatment of operators, equality signs, comparison signs, blanks, and circle choices so math layout stays more balanced across generated HTML strings.
- `APP_VERSION` / `APP_RELEASE_LABEL`: keeps runtime version metadata consistent across the UI, exported backups, and Gist bookkeeping.
- `PROGRAM_STORAGE_KEY`: persists the selected training program in `localStorage`, currently normalized back to `advanced_fluency_v1` if an unavailable program is requested.
- `showToast`: centralizes transient feedback for grading, error-book actions, and print guidance.
- `buildCoveredSection`: guarantees must-cover generator slices for sections where pedagogical diversity matters more than pure random sampling.
- `GenLorik.div`: guarantees Lorik section II includes one whole-number division item plus decimal-dividend, decimal-divisor, and double-decimal division practice.
- `GenKAI.decimalsMult` / `GenKAI.decimalsDiv`: now enforce must-cover decimal subtypes before shuffling the four printed items.
- `GenKAI.bigSub` / `GenKAI.olympiad`: now guarantee daily coverage of high-value subtraction and olympiad-structure families instead of relying on fully random subsets.
- `getConversions` / `GenKAI.fracEquations`: now guarantee key conversion families, fraction-calculation structures, and equation archetypes instead of relying on unconstrained random picks.
- `GenLorik.mul` / `GenLorik.sub` / `GenLorik.div`: now guarantee daily coverage of multiplication strategy, subtraction borrow-chain structure, and the full decimal-division trio in Lorik Set B.
- Lorik decimal-division generators now mix both `商>1` and `商<1` scenarios, plus `×10` / `×100` scaling cases and some two-decimal dividends/divisors, so decimal-point placement is practiced as a decision, not a memorized routine.
- `GenLorik.fracMix`: now guarantees the full daily spread of core fraction-operation families instead of leaving that section to pool-level randomness.
- `GenLorik.basicMixed`: now guarantees one shortcut-structure item, one order/parentheses item, one distributive item, and one combination item.
- `StorageDB.pullRemoteChanges` / `setupAutoCloudPull`: pulls cloud changes on startup, page focus, visibility return, and a light interval when Gist sync is connected.
- `showSetReview`: renders the current set's wrong/careless items with paper question number, original question, correct answer, and review advice.
- `scripts/validate-runtime.mjs`: runs the module script in a stubbed DOM, checks sets 73-102 for the advanced trainer, then validates manual program switching, program-aware set counters, closure bootstrap, phase-aware closure generation, adaptive closure focus selection, focus-lane replay injection, isolated profile writes, closure signal updates, and print-sandbox behavior.
- `mergeProfiles`: merges local and cloud profiles without discarding local-only history.

## Data Safety

- The app stores the GitHub token only in the browser's `localStorage`.
- Gist sync is optional; local practice continues if GitHub API calls fail.
- `safeLocalSetItem` retries profile writes after clearing old set snapshots.
- JSON export/import remains the recovery path if a browser profile is lost.

## Testing Checklist

Run these checks before shipping:

1. Syntax check the module script:

```bash
sed -n '/<script type="module">/,/<\/script>/p' index.html | sed '1d;$d' > /tmp/math-mini-challenge-script.mjs
node --check /tmp/math-mini-challenge-script.mjs
node scripts/validate-runtime.mjs
```

2. Start a local server and load the page:

```bash
python3 -m http.server 8080
```

3. Smoke-test:

- Navigate to previous and next set.
- Mark several answers for each learner, submit, and confirm the completed stamp appears.
- Resubmit the same set with different grades and confirm the error-book counts do not duplicate.
- Open the error book, mark an item mastered, then move it back.
- Export JSON and import it in a fresh browser profile.
- Confirm exported backup JSON includes the current app version and export metadata fields.
- Confirm the control panel now shows the program switcher and stage-status card, and that the switcher defaults to `Advanced`.
- Try switching to `Closure` from `Advanced` and confirm the app enters second stage directly without a promotion gate.
- Enter `Closure`, then switch back and forth once to confirm `Advanced` and `Closure` restore their own set counters.
- Confirm `Closure` renders four question sheets plus two writable answer sheets.
- Confirm the `Closure` sheets visibly combine integrated closure topics with explicit old-skill maintenance sections.
- Confirm the top workbench uses direct stage buttons, while the question sheets remain exam-like rather than dashboard-like.
- Confirm each question sheet shows the compact page meta band and clearer section markers without crowding the paper or changing pagination.
- Confirm answer sheets also show the aligned meta band and footer, and that the new answer-section titles remain readable without crowding the page.
- Confirm longer questions are no longer clipped on screen after booklet chrome is added.
- Confirm long multi-line questions keep their sequence numbers aligned in a dedicated left column instead of wrapping together with the question text.
- Confirm print preview still shows four populated question pages after the screen layout switches to `min-height` blocks.
- Confirm `Closure` set 1 shows `收口期`, set 12 shows `收束期`, and set 26 shows `毕业判定期`, with matching cue text on the paper.
- Grade and submit one `Closure` set, then confirm a closure-specific report appears and the first-stage profile remains untouched.
- After creating a clear second-stage weak point, confirm the next `Closure` set turns section V into the matching `重点强化` lane instead of leaving it fixed.
- After creating a clear second-stage weak point, confirm that matching section-V focus lane contains one `错题回炉` or `同类变式` item from that same gap family.
- Try image export after `html2canvas` has loaded.
- Open print preview for `打印AB四页` and confirm only four question pages appear without interleaved blank pages.
- Confirm the print preview no longer alternates content pages with blank pages; the AB set should appear as 4 consecutive populated pages, not 8 pages with empty even-numbered sheets.
- Confirm the live app content is hidden during print and the dedicated print sandbox is the only printable root.
- Confirm print buttons show the short print hint before the system print dialog opens.
- Open print preview after switching to `Closure` and confirm the second-stage question sheets also print as four consecutive populated pages.
- Confirm KAI decimal multiplication covers place value, tiny decimal, strategy, and mixed whole-number practice in the same set.
- Confirm KAI decimal division covers scale-up, divisor-shift, decimal-quotient, and same-scale decimal division in the same set.
- Confirm KAI big subtraction covers cross-borrow, inner-zero, benchmark whole, and six-digit regrouping practice in the same set.
- Confirm KAI conversions cover percent, repeating decimals, benchmark denominators, and exact decimal-to-fraction practice in the same set.
- Confirm KAI fraction calculations cover add/subtract, chained multiply-divide or parentheses, distributive reasoning, cross-canceling, and the decimal-fraction bridge items in the same set.
- Confirm KAI equations cover inverse operation, multi-step, special-position unknown, and proportion archetypes in the same set.
- Confirm KAI olympiad covers distributive/balance structure, telescoping fractions, 12.5 strategy, and fraction application structure in the same set.
- Confirm Lorik multiplication covers core vertical form, decimal multiplication, strategy multiplication, and trailing-zero place-value practice in the same set.
- Check Lorik section II and confirm the set includes decimal-dividend, decimal-divisor, and double-decimal division practice.
- Confirm Lorik section II regularly includes decimal-division cases where the quotient is below 1, so leading-zero decimal quotient placement is practiced.
- Confirm Lorik section II also includes some decimal-division items with two-decimal dividends or divisors, so `×100` scaling is still being exercised.
- Confirm Lorik section II still includes decimal-division cases where the quotient is above 1, so students must estimate the quotient band before placing the decimal point.
- Confirm Lorik subtraction covers cross-borrow, zero-chain, jump-zero, and standard regrouping practice in the same set.
- Confirm Lorik fraction mix covers the full daily spread of add/subtract, multiply/divide, fraction-of-whole, mixed-number, parentheses, triple-product, and decimal-fraction bridge practice.
- Confirm Lorik basic mixed problems cover shortcut structure, order/parentheses, distributive reasoning, and combination splitting each set.
- Confirm no generated explanation still contains placeholder markup like `...`; steps should either be real worked hints or fall back to knowledge advice.
- Confirm the printed question sheets look exam-like: no training-status strip, no level labels, no weakness/domain badges, and only replay items may show a small corner review mark.
- Confirm Lorik comparison items cluster near benchmark decimals rather than using overly broad easy ranges, so students must genuinely compare against 0.5, 0.625, 0.75, and 0.8.
- Confirm conversion items in both KAI and Lorik sections provide answer-sheet steps that explain the benchmark or denominator transformation used.
- Confirm selected error-book review items can appear as same-tag variants rather than only verbatim replay, while still carrying the small review marker without affecting print layout.
- Confirm selected KAI high-value traps such as decimal-division placement and divisor-position equations can reappear as same-skill review variants, not only as exact replays.
- Confirm operators, equality signs, fraction spacing, blanks, and circle choices look visually balanced on both screen and print preview.

## GitHub Connection

1. Ensure the remote points at `https://github.com/szkailorik/math-mini-challenge`.
2. Push changes to `main`.
3. GitHub Actions deploys the root folder to Pages.
4. Confirm the Pages URL after the workflow completes.
