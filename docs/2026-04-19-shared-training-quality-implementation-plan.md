# Shared Training Quality Core v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a shared training-quality core that improves both `Advanced` and `Closure` through common quality families, three-level replay logic, and better answer explanations without breaking printing, grading, sync, or stage switching.

**Architecture:** Keep the current single-file runtime and dual-program structure intact. Add a light semantic layer on top of existing question objects (`qualityFamily`, `replayLevel`, `explanationMode`), then route that layer into the first-stage high-value replay slot and the second-stage focus lane before finally upgrading answer-sheet explanation text.

**Tech Stack:** Static HTML/CSS/ES module in `index.html`, localStorage-backed runtime state, `scripts/validate-runtime.mjs` for regression checks, markdown docs in `docs/`, `README.md`, `DEV_SPEC.md`, `PRODUCT_SPEC.md`, and `WORKFLOW.md`.

---

## File Structure

### Primary implementation files

- Modify: `/Users/bianbian/Documents/codex/minichallenge/index.html`
  - Add the shared quality-family map, replay-level helpers, and explanation-template helpers.
  - Route the shared quality signals into `Advanced` and `Closure` generation without changing program structure.
- Modify: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`
  - Add regression checks for quality-family tagging, replay-level progression, and explanation-template output.

### Documentation files

- Modify: `/Users/bianbian/Documents/codex/minichallenge/README.md`
  - Add the new release notes and doc link.
- Modify: `/Users/bianbian/Documents/codex/minichallenge/DEV_SPEC.md`
  - Record runtime responsibilities and validation points.
- Modify: `/Users/bianbian/Documents/codex/minichallenge/PRODUCT_SPEC.md`
  - Record product intent and user-facing quality goals.
- Modify: `/Users/bianbian/Documents/codex/minichallenge/WORKFLOW.md`
  - Record the iteration passes and risks.
- Modify: `/Users/bianbian/Documents/codex/minichallenge/docs/README.md`
  - Add the implementation-plan link.

### Reference spec

- Reference: `/Users/bianbian/Documents/codex/minichallenge/docs/2026-04-19-shared-training-quality-spec.md`

---

### Task 1: Add shared quality-family metadata

**Files:**
- Modify: `/Users/bianbian/Documents/codex/minichallenge/index.html`
- Test: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`

- [ ] **Step 1: Write the failing validation for quality-family coverage**

Add a validation block that expects representative tags from the first rollout to resolve to a non-empty shared family:

```js
const requiredQualityFamilies = [
  ['k_dd_place', 'decimal_division'],
  ['l_div_decimal_divisor', 'decimal_division'],
  ['l_fmix_madd', 'fraction_operation'],
  ['k_conv_1', 'conversion_bridge']
];

for (const [tag, expectedFamily] of requiredQualityFamilies) {
  const actualFamily = runtime.getQualityFamilyForTag(tag);
  assert(actualFamily === expectedFamily, `Expected ${tag} -> ${expectedFamily}, got ${actualFamily}`);
}
```

- [ ] **Step 2: Run validation to verify it fails**

Run: `node scripts/validate-runtime.mjs`

Expected: FAIL with a message showing `getQualityFamilyForTag` is missing or returns `undefined`.

- [ ] **Step 3: Implement the shared quality-family map**

Add a focused helper near the other training metadata helpers in `index.html`:

```js
const QUALITY_FAMILY_MAP = {
  decimal_division: [/k_dd_/, /l_div_/, /c2_speed_mix/],
  fraction_operation: [/k_eq_/, /l_fmix_/, /k_oly_frac/],
  conversion_bridge: [/k_conv_/, /l_conv_/, /c2_bridge_/],
  unit_rate_speed: [/c2_unit_/, /c2_rate_/, /c2_speed_/],
  equation_method: [/k_eq_/, /c2_rate_eq/],
  validation_estimation: [/c2_est_/, /c2_validate_/]
};

function getQualityFamilyForTag(tag = '') {
  for (const [family, patterns] of Object.entries(QUALITY_FAMILY_MAP)) {
    if (patterns.some(pattern => pattern.test(tag))) return family;
  }
  return '';
}
```

- [ ] **Step 4: Attach `qualityFamily` to generated items in the first rollout**

When normalizing generated items, append the family:

```js
function attachQualityMetadata(item) {
  return {
    ...item,
    qualityFamily: item.qualityFamily || getQualityFamilyForTag(item.tag || '')
  };
}
```

Use that helper on the first rollout families:
- decimal division
- fraction operation
- conversion bridge

- [ ] **Step 5: Run validation to verify it passes**

Run: `node scripts/validate-runtime.mjs`

Expected: PASS for the new quality-family assertions.

- [ ] **Step 6: Commit**

```bash
git add /Users/bianbian/Documents/codex/minichallenge/index.html /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs
git commit -m "feat: add shared quality family metadata"
```

### Task 2: Add replay-level progression helpers

**Files:**
- Modify: `/Users/bianbian/Documents/codex/minichallenge/index.html`
- Test: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`

- [ ] **Step 1: Write the failing validation for replay levels**

Add a validation that exercises replay escalation:

```js
const replaySamples = [
  { count: 1, expected: 'L1' },
  { count: 2, expected: 'L2' },
  { count: 4, expected: 'L3' }
];

for (const sample of replaySamples) {
  const actualLevel = runtime.getReplayLevel({ count: sample.count, qualityFamily: 'decimal_division' });
  assert(actualLevel === sample.expected, `Expected replay level ${sample.expected}, got ${actualLevel}`);
}
```

- [ ] **Step 2: Run validation to verify it fails**

Run: `node scripts/validate-runtime.mjs`

Expected: FAIL because `getReplayLevel` is missing.

- [ ] **Step 3: Implement replay-level selection**

Add a minimal progression helper:

```js
function getReplayLevel(entry = {}) {
  const count = Number(entry.count || 0);
  if (count >= 4) return 'L3';
  if (count >= 2) return 'L2';
  return 'L1';
}
```

- [ ] **Step 4: Route replay levels into exact replay and variant paths**

Add a small dispatcher:

```js
function buildReplayMode(entry, buildExact, buildVariant, buildBoundary) {
  const replayLevel = getReplayLevel(entry);
  if (replayLevel === 'L1') return buildExact();
  if (replayLevel === 'L2') return buildVariant();
  return buildBoundary();
}
```

Use it in:
- first-stage error replay injection
- closure focus replay injection

- [ ] **Step 5: Mark the resulting item with `replayLevel`**

```js
nextItem.replayLevel = replayLevel;
```

- [ ] **Step 6: Run validation to verify it passes**

Run: `node scripts/validate-runtime.mjs`

Expected: PASS for replay-level assertions and existing runtime checks.

- [ ] **Step 7: Commit**

```bash
git add /Users/bianbian/Documents/codex/minichallenge/index.html /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs
git commit -m "feat: add replay level progression"
```

### Task 3: Upgrade first-stage high-value replay

**Files:**
- Modify: `/Users/bianbian/Documents/codex/minichallenge/index.html`
- Test: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`

- [ ] **Step 1: Write the failing validation for first-stage replay**

Add a regression check that forces one first-stage profile weakness and expects at least one replay item carrying the new metadata:

```js
const advancedPaper = runtime.generateAdvancedFluencySetWithProfile({
  KAI: {
    errorBook: {
      sample: { tag: 'k_dd_place', count: 3, info: { q: '7.2 ÷ 0.6', a: '12' } }
    }
  }
});

const replayItems = Object.values(advancedPaper).flat().filter(item => item.replayLevel);
assert(replayItems.length >= 1, 'Expected at least one first-stage replay item');
assert(replayItems.some(item => item.qualityFamily === 'decimal_division'), 'Expected decimal_division replay item');
```

- [ ] **Step 2: Run validation to verify it fails**

Run: `node scripts/validate-runtime.mjs`

Expected: FAIL because first-stage replay items do not yet carry the new metadata or route through replay levels.

- [ ] **Step 3: Add one dedicated high-value replay slot to `Advanced`**

Near the current advanced set build, reserve one replay slot:

```js
function injectAdvancedHighValueReplay(student, items) {
  const replayEntry = pickHighValueReplayEntry(student, ['decimal_division', 'fraction_operation', 'conversion_bridge']);
  if (!replayEntry) return items;
  return replaceOneItemWithReplay(items, replayEntry);
}
```

- [ ] **Step 4: Add one lightweight validation/estimation item**

Append one small check item to the targeted first-stage sections:

```js
function buildAdvancedValidationQuickCheck() {
  return {
    tag: 'adv_validate_quick',
    qualityFamily: 'validation_estimation',
    replayLevel: '',
    explanationMode: 'validation',
    q: '6.4 ÷ 0.8 的结果应当比 6.4 大还是小？',
    a: '大',
    step: '除以小于1的数，结果会变大。'
  };
}
```

- [ ] **Step 5: Run validation to verify it passes**

Run: `node scripts/validate-runtime.mjs`

Expected: PASS and at least one first-stage replay item is now tagged with both `qualityFamily` and `replayLevel`.

- [ ] **Step 6: Commit**

```bash
git add /Users/bianbian/Documents/codex/minichallenge/index.html /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs
git commit -m "feat: improve advanced high-value replay"
```

### Task 4: Upgrade closure focus into L1/L2/L3 reinforcement

**Files:**
- Modify: `/Users/bianbian/Documents/codex/minichallenge/index.html`
- Test: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`

- [x] **Step 1: Write the failing validation for closure focus progression**

Add a validation that forces a closure focus family and expects section V to include replay metadata:

```js
const closurePaper = runtime.buildClosureProgramSetWithProfile({
  KAI: {
    errorBook: {
      sample: { tag: 'c2_bridge_pct_frac', count: 4, info: { q: '25% = ?', a: '1/4' } }
    },
    representationGap: 3
  }
});

const closureFocusItems = closurePaper.c_k_focus || [];
assert(closureFocusItems.some(item => item.replayLevel === 'L3'), 'Expected L3 focus replay item');
assert(closureFocusItems.some(item => item.qualityFamily === 'conversion_bridge'), 'Expected conversion bridge focus item');
```

- [x] **Step 2: Run validation to verify it fails**

Run: `node scripts/validate-runtime.mjs`

Expected: FAIL because closure focus does not yet expose replay levels in a deterministic way.

- [x] **Step 3: Route closure focus entries through the new replay builder**

Update the section-V replay injector:

```js
function injectClosureFocusReview(student, focusMeta, focusItems) {
  const entry = chooseClosureReplayEntry(student, focusMeta);
  if (!entry) return focusItems;

  return replaceClosureFocusItem(
    focusItems,
    buildReplayMode(
      entry,
      () => buildExactReplayItem(entry),
      () => buildClosureVariantReplayItem(entry),
      () => buildClosureBoundaryReplayItem(entry)
    )
  );
}
```

- [x] **Step 4: Add first boundary-style closure variants for rollout families**

Implement focused L3 variants for:
- decimal division
- fraction operation
- conversion bridge

```js
function buildClosureBoundaryReplayItem(entry) {
  if (entry.qualityFamily === 'conversion_bridge') {
    return {
      tag: 'c2_bridge_boundary',
      qualityFamily: 'conversion_bridge',
      replayLevel: 'L3',
      explanationMode: 'method',
      q: '0.49、1/2、48% 中，最接近 1/2 的是哪个？',
      a: '1/2',
      step: '先统一到同一表示，再比较和 1/2 的差距。'
    };
  }
  return buildClosureVariantReplayItem(entry);
}
```

- [x] **Step 5: Run validation to verify it passes**

Run: `node scripts/validate-runtime.mjs`

Status note:

- The current runtime now exposes `isClosureFocusReplay`, keeps `qualityFamily` / `replayLevel` on focus-lane items, and uses an explicit chooser that prefers:
  - exact replay for `L1`
  - same-family variant for `L2`
  - stronger focus variants for `L3` before falling back
- The first hardened validation path covers `conversion_bridge` inside the closure focus lane and expects an explicit `L3` replay item.

Expected: PASS and closure focus now emits deterministic replay-level metadata.

- [ ] **Step 6: Commit**

```bash
git add /Users/bianbian/Documents/codex/minichallenge/index.html /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs
git commit -m "feat: deepen closure focus replay levels"
```

### Task 5: Upgrade answer explanations for rollout families

**Files:**
- Modify: `/Users/bianbian/Documents/codex/minichallenge/index.html`
- Test: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`
- Modify: `/Users/bianbian/Documents/codex/minichallenge/README.md`
- Modify: `/Users/bianbian/Documents/codex/minichallenge/DEV_SPEC.md`
- Modify: `/Users/bianbian/Documents/codex/minichallenge/PRODUCT_SPEC.md`
- Modify: `/Users/bianbian/Documents/codex/minichallenge/WORKFLOW.md`
- Modify: `/Users/bianbian/Documents/codex/minichallenge/docs/README.md`

- [ ] **Step 1: Write the failing validation for explanation modes**

Add a validation that expects rollout-family items to expose a valid explanation mode:

```js
const explanationModes = new Set(['rule', 'method', 'validation']);
const sampleItems = runtime.getExplanationSamples();

for (const item of sampleItems) {
  assert(explanationModes.has(item.explanationMode), `Invalid explanation mode on ${item.tag}`);
  assert(typeof item.step === 'string' && item.step.length > 0, `Missing explanation text on ${item.tag}`);
}
```

- [ ] **Step 2: Run validation to verify it fails**

Run: `node scripts/validate-runtime.mjs`

Expected: FAIL because rollout items do not yet carry a structured explanation mode.

- [ ] **Step 3: Add explanation-template helpers**

Implement a small formatter:

```js
function buildExplanationText(mode, body) {
  if (mode === 'rule') return `规则提醒：${body}`;
  if (mode === 'method') return `方法提醒：${body}`;
  return `检验提醒：${body}`;
}
```

Use it for:
- decimal division
- fraction operation
- conversion bridge

- [ ] **Step 4: Attach explanation mode during item normalization**

```js
function attachExplanationMetadata(item) {
  return {
    ...item,
    explanationMode: item.explanationMode || inferExplanationMode(item.qualityFamily, item.tag),
    step: item.step || buildExplanationText(inferExplanationMode(item.qualityFamily, item.tag), getKnowledgeTip(item.tag).advice)
  };
}
```

- [ ] **Step 5: Update docs for the rollout**

Add the new implementation-plan link and a short note describing:
- shared quality families
- replay levels
- explanation templates

- [ ] **Step 6: Run validation and syntax checks**

Run:

```bash
node --check <(sed -n '/<script type="module">/,/<\/script>/p' /Users/bianbian/Documents/codex/minichallenge/index.html | sed '1d;$d')
node /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs
```

Expected:
- no syntax errors
- runtime validation passes, including explanation-mode assertions

- [ ] **Step 7: Commit**

```bash
git add /Users/bianbian/Documents/codex/minichallenge/index.html \
  /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs \
  /Users/bianbian/Documents/codex/minichallenge/README.md \
  /Users/bianbian/Documents/codex/minichallenge/DEV_SPEC.md \
  /Users/bianbian/Documents/codex/minichallenge/PRODUCT_SPEC.md \
  /Users/bianbian/Documents/codex/minichallenge/WORKFLOW.md \
  /Users/bianbian/Documents/codex/minichallenge/docs/README.md
git commit -m "feat: add shared training quality core v1"
```

## Self-Review

### Spec coverage

- Shared quality families: covered by Task 1.
- Three-level replay progression: covered by Task 2.
- `Advanced` high-value replay integration: covered by Task 3.
- `Closure` focus-lane replay upgrade: covered by Task 4.
- Answer explanation upgrade: covered by Task 5.
- Documentation and runtime validation updates: covered by Task 5.

### Placeholder scan

- No `TODO`, `TBD`, or “implement later” placeholders remain.
- Each task includes explicit files, code, commands, and expected outcomes.

### Type consistency

- Shared property names are consistent across tasks:
  - `qualityFamily`
  - `replayLevel`
  - `explanationMode`
- Shared helper names are used consistently:
  - `getQualityFamilyForTag`
  - `getReplayLevel`
  - `buildReplayMode`
  - `buildExplanationText`

## Execution Handoff

Plan complete and saved to `/Users/bianbian/Documents/codex/minichallenge/docs/2026-04-19-shared-training-quality-implementation-plan.md`.

Two execution options:

1. Subagent-Driven (recommended) - I dispatch a fresh subagent per task, review between tasks, fast iteration
2. Inline Execution - Execute tasks in this session using executing-plans, batch execution with checkpoints
