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
- `printQuestionSheets` / `printAnswerSheets`: switches the body into print-only modes for question sheets or answer sheets, then relies on `afterprint` and print media lifecycle hooks to restore the normal page state.
- `APP_VERSION` / `APP_RELEASE_LABEL`: keeps runtime version metadata consistent across the UI, exported backups, and Gist bookkeeping.
- `showToast`: centralizes transient feedback for grading, error-book actions, and print guidance.
- `buildCoveredSection`: guarantees must-cover generator slices for sections where pedagogical diversity matters more than pure random sampling.
- `GenLorik.div`: guarantees Lorik section II includes one whole-number division item plus decimal-dividend, decimal-divisor, and double-decimal division practice.
- `GenKAI.decimalsMult` / `GenKAI.decimalsDiv`: now enforce must-cover decimal subtypes before shuffling the four printed items.
- `getConversions` / `GenKAI.fracEquations`: now guarantee key conversion families and equation archetypes instead of relying on unconstrained random picks.
- `GenLorik.basicMixed`: now guarantees one shortcut-structure item, one order/parentheses item, one distributive item, and one combination item.
- `StorageDB.pullRemoteChanges` / `setupAutoCloudPull`: pulls cloud changes on startup, page focus, visibility return, and a light interval when Gist sync is connected.
- `showSetReview`: renders the current set's wrong/careless items with paper question number, original question, correct answer, and review advice.
- `scripts/validate-runtime.mjs`: runs the module script in a stubbed DOM, checks sets 73-102, validates section counts, catches empty questions/answers, duplicate items, invalid strings, missing knowledge advice, invalid levels, missing focus strip, missing domain coverage, broken domain-signal scoring, error-book replay bridging, Lorik decimal-division coverage, print lifecycle helpers, four printable question sheets, cloud auto-pull helpers, and set-review report output.
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
- Confirm print buttons show the short print hint before the system print dialog opens.
- Confirm KAI decimal multiplication covers place value, tiny decimal, strategy, and mixed whole-number practice in the same set.
- Confirm KAI decimal division covers scale-up, divisor-shift, decimal-quotient, and same-scale decimal division in the same set.
- Confirm KAI conversions cover percent, repeating decimals, benchmark denominators, and exact decimal-to-fraction practice in the same set.
- Confirm KAI equations cover inverse operation, multi-step, special-position unknown, and proportion archetypes in the same set.
- Check Lorik section II and confirm the set includes decimal-dividend, decimal-divisor, and double-decimal division practice.
- Confirm Lorik basic mixed problems cover shortcut structure, order/parentheses, distributive reasoning, and combination splitting each set.

## GitHub Connection

1. Ensure the remote points at `https://github.com/szkailorik/math-mini-challenge`.
2. Push changes to `main`.
3. GitHub Actions deploys the root folder to Pages.
4. Confirm the Pages URL after the workflow completes.
