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
- `generateOrLoadSetData`: reuses cached set data so question sheets and answer sheets stay aligned.
- `StorageDB.saveSession`: persists grading results, updates weights, maintains history, and rolls error-book counts forward or backward on resubmission.
- `getKnowledgeTip`: resolves exact knowledge-tag advice first, then family-level advice, then the generic fallback.
- `scripts/validate-runtime.mjs`: runs the module script in a stubbed DOM, checks sets 73-102, validates section counts, catches empty questions/answers, duplicate items, invalid strings, and missing knowledge advice.
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
- Try image export after `html2canvas` has loaded.

## GitHub Connection

1. Ensure the remote points at `https://github.com/szkailorik/math-mini-challenge`.
2. Push changes to `main`.
3. GitHub Actions deploys the root folder to Pages.
4. Confirm the Pages URL after the workflow completes.
