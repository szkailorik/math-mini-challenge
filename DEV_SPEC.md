# Development Spec

## Architecture

This is a static single-page app. The production artifact is `index.html`; there is no build step.

- UI: HTML, CSS, and an ES module script in `index.html`.
- Persistence: `localStorage` for profiles and cached set snapshots.
- Optional sync: GitHub Gist API using a user-provided PAT with `gist` scope.
- Export: `html2canvas` from CDN for PNG sheet export.
- Deploy: GitHub Pages workflow in `.github/workflows/pages.yml`.

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
- `Engine.weightedSelect`: selects problem tags using randomness, weak-topic weights, and spacing bonus.
- `TRAINING_LEVELS` / `inferDifficulty`: assigns L1-L4 levels to generated items and lets the training cycle bias selection.
- `TRAINING_FOCUS_PLAN` / `Engine.getFocusPlan`: maps the seven-set cycle to a visible goal, target level band, and training principle.
- `generateOrLoadSetData`: reuses cached set data so question sheets and answer sheets stay aligned.
- `StorageDB.saveSession`: persists grading results, updates weights, maintains history, and rolls error-book counts forward or backward on resubmission.
- `getKnowledgeTip`: resolves exact knowledge-tag advice first, then family-level advice, then the generic fallback.
- `KnowledgeDomains` / `getKnowledgeDomain`: groups generated tags into curriculum domains for higher-level coverage and weak-point reporting.
- `getDomainSignal` / `summarizeDomainSignals`: converts domain-level weak tags and active error-book counts into adaptive selection bonuses and reporting priority.
- `getErrorBookSignal` / `buildErrorReplayItem`: bridges active error-book entries back into generated training as capped exact replay or same-tag variation.
- `showKnowledgeMap`: renders current weak tags, domain profile, and knowledge-family coverage.
- `printQuestionSheets` / `printAnswerSheets`: stages cloned printable sheets into `#print-root`, switches the body into a print sandbox mode, and relies on `afterprint` and print media lifecycle hooks to restore the normal page state.
- Print output now uses a dedicated print sandbox instead of paginating the live long page directly, reducing browser-specific blank-even-page regressions.
- Question-sheet printing uses a slightly sub-A4 fixed page height in the sandbox to avoid rounding overflow that can make one printed sheet consume two physical pages.
- `SET_CACHE_PREFIX`: versioned set-cache namespace; bumping it forces future set numbers to regenerate under new generator rules instead of reusing stale papers from older releases.
- Training-quality passes now also target explanation quality, not only coverage: key generated items should expose a real worked hint instead of relying solely on fallback knowledge advice.
- Question-sheet rendering now intentionally suppresses training metadata such as weakness badges, level badges, and phase strips; only exact error-book replay items may show a tiny non-layout-affecting review marker.
- Conversion/comparison quality work now focuses on benchmark discrimination: comparison items near `1/2`, `5/8`, `3/4`, and `4/5` should force real comparison rather than obvious visual guessing.
- Error-book replay now has two lanes: exact replay of the original item, and targeted same-tag review variants for selected high-value tags such as decimal-division and benchmark-comparison items.
- `getHighValueTrainingSignal`: adds a global priority layer so the engine can spend more of the daily paper on high-value misconception families instead of distributing attention too evenly.
- Targeted review variants now also cover selected KAI decimal-division and equation trap tags, not only Lorik benchmark comparison and division tags.
- `beautifyMathHTML`: normalizes the visual treatment of operators, equality signs, comparison signs, blanks, and circle choices so math layout stays more balanced across generated HTML strings.
- `APP_VERSION` / `APP_RELEASE_LABEL`: keeps runtime version metadata consistent across the UI, exported backups, and Gist bookkeeping.
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
- `scripts/validate-runtime.mjs`: runs the module script in a stubbed DOM, checks sets 73-102, validates section counts, catches empty questions/answers, duplicate items, invalid strings, missing knowledge advice, invalid levels, missing focus strip, missing domain coverage, broken domain-signal scoring, error-book replay bridging, Lorik decimal-division coverage, print sandbox helpers, four printable question sheets, cloud auto-pull helpers, and set-review report output.
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
- Try image export after `html2canvas` has loaded.
- Open print preview for `打印AB四页` and confirm only four question pages appear without interleaved blank pages.
- Confirm the print preview no longer alternates content pages with blank pages; the AB set should appear as 4 consecutive populated pages, not 8 pages with empty even-numbered sheets.
- Confirm the live app content is hidden during print and the dedicated print sandbox is the only printable root.
- Confirm print buttons show the short print hint before the system print dialog opens.
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
