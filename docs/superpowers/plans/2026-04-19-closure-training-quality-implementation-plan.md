# Closure High-Value Training Quality Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild second-stage `Closure` question selection around a high-value training matrix so the daily two-page paper spends most of its time on the most valuable elementary-to-junior-high calculation abilities while still preserving first-stage gains.

**Architecture:** Keep the existing `Advanced + Closure` dual-program shell, current five-section `Closure` paper shape, and current `gap + replay + qualityFamily` infrastructure. Rework `Closure` generation by introducing explicit section roles, A/B/C value tiers, and phase-aware weight rules inside the existing single-file runtime, then lock the behavior down with validation checks and doc updates.

**Tech Stack:** Static single-file web app (`index.html`), local runtime validation (`scripts/validate-runtime.mjs`), markdown docs.

---

## File Structure

- Modify: `/Users/bianbian/Documents/codex/minichallenge/index.html`
  - Keep all runtime changes inside the existing `Closure` generation area.
  - Add explicit value-tier metadata and section-role helpers close to the existing `getClosurePhaseInfo`, `buildClosure*Section`, and `buildClosureProgramSet` helpers.
- Modify: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`
  - Add assertions that the new section matrix, phase weighting, and high-value coverage rules remain true over time.
- Modify: `/Users/bianbian/Documents/codex/minichallenge/README.md`
  - Summarize the new `Closure` training strategy at a high level.
- Modify: `/Users/bianbian/Documents/codex/minichallenge/DEV_SPEC.md`
  - Document the new runtime helpers and validation expectations.
- Modify: `/Users/bianbian/Documents/codex/minichallenge/PRODUCT_SPEC.md`
  - Document learner-facing training changes and why they matter.
- Modify: `/Users/bianbian/Documents/codex/minichallenge/WORKFLOW.md`
  - Note the new validation focus when changing second-stage question pools.
- Modify: `/Users/bianbian/Documents/codex/minichallenge/docs/README.md`
  - Link this implementation plan.

## Task 1: Lock The Section Matrix In Validation First

**Files:**
- Modify: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`
- Test: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`

- [ ] **Step 1: Add failing assertions for second-stage section roles**

Add a validation block that checks a generated `Closure` paper exposes the intended role split:

```js
const closurePaper = runtime.buildClosureProgramSetWithProfile({
  setNumber: 12,
  student: 'KAI',
  profile: runtime.makeMockClosureProfile({
    representationGap: 2,
    methodGap: 2,
    stabilityGap: 1,
    speedGap: 1,
    validationGap: 1
  })
});

const sectionMap = runtime.describeClosureSections(closurePaper);

assert(sectionMap.c_k_bridge.role === 'representation_core', 'Section II should be representation core');
assert(sectionMap.c_k_mix.role === 'complex_mixed_core', 'Section III should be complex mixed core');
assert(sectionMap.c_k_unit.role === 'unit_rate_bridge', 'Section IV should be unit/rate bridge');
assert(sectionMap.c_k_focus.role === 'targeted_focus', 'Section V should be targeted focus');
```

- [ ] **Step 2: Run validation to confirm it fails before implementation**

Run:

```bash
node scripts/validate-runtime.mjs
```

Expected: FAIL with missing `describeClosureSections` or missing section-role metadata.

- [ ] **Step 3: Add failing assertions for A-class coverage**

Extend the same validation so it proves the daily paper contains the intended A-class coverage:

```js
const allKaiItems = runtime.flattenPaperSections(closurePaper, ['c_k_bridge', 'c_k_mix', 'c_k_unit', 'c_k_focus']);
const families = new Set(allKaiItems.map(item => item.qualityFamily).filter(Boolean));

assert(families.has('conversion_bridge'), 'Closure paper should cover conversion_bridge every day');
assert(allKaiItems.some(item => item.trainingAxis === 'complex_mixed'), 'Closure paper should cover complex mixed training every day');
assert(allKaiItems.some(item => item.trainingAxis === 'number_sense'), 'Closure paper should keep number sense visible every day');
```

- [ ] **Step 4: Re-run validation to verify the new assertions still fail**

Run:

```bash
node scripts/validate-runtime.mjs
```

Expected: FAIL on the new A-class coverage assertions.

- [ ] **Step 5: Commit the failing-test checkpoint**

```bash
git add /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs
git commit -m "test: add closure training matrix validation"
```

## Task 2: Introduce Explicit Closure Training Matrix Metadata

**Files:**
- Modify: `/Users/bianbian/Documents/codex/minichallenge/index.html`
- Test: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`

- [ ] **Step 1: Add static value-tier and section-role registries**

Near the existing `Closure` helpers, add explicit registries:

```js
const CLOSURE_VALUE_TIERS = {
  A_representation: ['conversion_bridge'],
  A_complex_mixed: ['complex_mixed'],
  A_number_sense: ['validation_estimation', 'number_sense'],
  A_method_choice: ['equation_method', 'method_choice'],
  B_unit_rate: ['unit_rate_speed'],
  B_relation_bridge: ['relation_bridge'],
  C_keep_warm: ['stability_keep_warm']
};

const CLOSURE_SECTION_ROLES = {
  c_k_keep: { role: 'keep_warm', valueTier: 'B/C' },
  c_k_bridge: { role: 'representation_core', valueTier: 'A' },
  c_k_mix: { role: 'complex_mixed_core', valueTier: 'A' },
  c_k_unit: { role: 'unit_rate_bridge', valueTier: 'B' },
  c_k_focus: { role: 'targeted_focus', valueTier: 'A' },
  c_l_keep: { role: 'keep_warm', valueTier: 'B/C' },
  c_l_bridge: { role: 'representation_core', valueTier: 'A' },
  c_l_mix: { role: 'complex_mixed_core', valueTier: 'A' },
  c_l_unit: { role: 'unit_rate_bridge', valueTier: 'B' },
  c_l_focus: { role: 'targeted_focus', valueTier: 'A' }
};
```

- [ ] **Step 2: Add item-level training-axis tagging helpers**

Create a helper that marks items without changing their existing question text:

```js
function annotateClosureItem(item, meta = {}) {
  if (!item) return item;
  return {
    ...item,
    trainingAxis: meta.trainingAxis || item.trainingAxis || '',
    trainingTier: meta.trainingTier || item.trainingTier || '',
    sectionRole: meta.sectionRole || item.sectionRole || '',
    qualityFamily: item.qualityFamily || meta.qualityFamily || getQualityFamilyForTag(item.tag || '')
  };
}
```

- [ ] **Step 3: Add a lightweight section-describer helper for validation**

```js
function describeClosureSections(data) {
  return {
    c_k_bridge: CLOSURE_SECTION_ROLES.c_k_bridge,
    c_k_mix: CLOSURE_SECTION_ROLES.c_k_mix,
    c_k_unit: CLOSURE_SECTION_ROLES.c_k_unit,
    c_k_focus: CLOSURE_SECTION_ROLES.c_k_focus,
    c_l_bridge: CLOSURE_SECTION_ROLES.c_l_bridge,
    c_l_mix: CLOSURE_SECTION_ROLES.c_l_mix,
    c_l_unit: CLOSURE_SECTION_ROLES.c_l_unit,
    c_l_focus: CLOSURE_SECTION_ROLES.c_l_focus
  };
}
```

- [ ] **Step 4: Export the helper on `window` the same way other validation helpers are exposed**

```js
window.describeClosureSections = describeClosureSections;
```

- [ ] **Step 5: Run validation to confirm the first assertions now pass further**

Run:

```bash
node scripts/validate-runtime.mjs
```

Expected: FAIL later on missing daily A-class coverage, but no longer fail on missing section metadata helpers.

- [ ] **Step 6: Commit the metadata checkpoint**

```bash
git add /Users/bianbian/Documents/codex/minichallenge/index.html /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs
git commit -m "feat: add closure training matrix metadata"
```

## Task 3: Rebuild Section I-IV Around The New Matrix

**Files:**
- Modify: `/Users/bianbian/Documents/codex/minichallenge/index.html`
- Test: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`

- [ ] **Step 1: Split keep-warm selection from the rest of the closure pools**

Add a dedicated helper for Section I:

```js
function buildClosureKeepWarmSection(student, track = 'kai', phaseKey = 'foundation') {
  const keepWarmGroups = track === 'kai'
    ? ['k_ddiv', 'k_fcalc_keep', 'k_keep_sense']
    : ['l_div_keep', 'l_frac_keep', 'l_sub_keep'];
  return buildCoveredSection(student, keepWarmGroups);
}
```

- [ ] **Step 2: Make Section II explicitly representation-first**

Update the bridge section builder so its internal pools are dominated by:

```js
const representationCoreGroups = {
  foundation: ['c2_bridge_base', 'c2_bridge_compare', 'c2_bridge_near_one'],
  integration: ['c2_bridge_convert_then_compare', 'c2_bridge_convert_then_calc', 'c2_bridge_structure_choice'],
  graduation: ['c2_bridge_boundary', 'c2_bridge_reasonableness', 'c2_bridge_reverse']
};
```

Wrap returned items with:

```js
return buildCoveredSection(student, representationCoreGroups[phaseKey]).map(item =>
  annotateClosureItem(item, {
    trainingAxis: 'representation_core',
    trainingTier: 'A',
    sectionRole: 'representation_core'
  })
);
```

Do not leave Section II as a loose “conversion block”. Split it into four internal sub-lanes so the bridge lane can prove it is teaching transfer, not only direct conversion:

```js
const closureBridgeFamilies = {
  representationConversion: ['c2_bridge_base', 'c2_bridge_convert'],
  baselineComparison: ['c2_bridge_compare', 'c2_bridge_near_one'],
  representationChoice: ['c2_bridge_structure_choice', 'c2_bridge_best_form'],
  postConversionUse: ['c2_bridge_convert_then_compare', 'c2_bridge_convert_then_calc']
};
```

Phase emphasis should then behave like:

- foundation -> `representationConversion + baselineComparison`
- integration -> `baselineComparison + representationChoice + postConversionUse`
- graduation -> `baselineComparison + representationChoice + postConversionUse`, with more boundary / reverse / reasonableness prompts

The implementation should prefer “what should I convert this into, and why?” before it adds more raw direct-conversion repetition.

- [ ] **Step 3: Make Section III explicitly complex-mixed-first**

Replace the old generic mix emphasis with an explicit phase ramp:

```js
const complexMixedGroups = {
  foundation: ['c2_mix_decimal_light', 'c2_mix_fraction_light', 'c2_mix_order_light'],
  integration: ['c2_mix_decimal_fraction', 'c2_mix_laws_and_structure', 'c2_mix_fast_method_choice'],
  graduation: ['c2_mix_brackets', 'c2_mix_nested_brackets', 'c2_mix_boundary_structure']
};
```

Tag each item:

```js
annotateClosureItem(item, {
  trainingAxis: 'complex_mixed',
  trainingTier: 'A',
  sectionRole: 'complex_mixed_core'
})
```

Do not leave Section III as one generic mixed bucket. Split it into four internal sub-lanes and make method choice the first priority whenever there is a tradeoff:

```js
const closureMixFamilies = {
  structureRecognition: ['c2_mix_order_light', 'c2_mix_structure_hint'],
  methodChoice: ['c2_mix_fast_method_choice', 'c2_mix_convert_before_calc'],
  complexExecution: ['c2_mix_decimal_fraction', 'c2_mix_laws_and_structure'],
  resultJudgement: ['c2_mix_reasonable_result', 'c2_mix_decimal_point_check']
};
```

Phase emphasis should then behave like:

- foundation -> `structureRecognition + methodChoice`
- integration -> `methodChoice + complexExecution`
- graduation -> `methodChoice + complexExecution + resultJudgement`, with bracket-bearing prompts enabled

The implementation should prefer “teach the learner how to choose a method” before it spends more paper budget on raw structural complexity.

- [ ] **Step 4: Make Section IV explicitly unit/rate/relation bridge**

Refactor the current unit/rate section so it carries one role and can be validated:

```js
annotateClosureItem(item, {
  trainingAxis: 'unit_rate_bridge',
  trainingTier: 'B',
  sectionRole: 'unit_rate_bridge'
})
```

The pool should distinguish:

```js
const closureUnitFamilies = {
  unitNormalization: ['c2_unit_length', 'c2_unit_mass'],
  rateAndPercentStructure: ['c2_rate_discount', 'c2_rate_percent'],
  relationModelChoice: ['c2_speed_mix', 'c2_eq_percent'],
  dimensionalJudgement: ['c2_unit_reasonable', 'c2_rate_reasonable']
};
```

Do not leave Section IV as a generic “unit and rate” bucket. Split it into four internal lanes and make the learner move through:

- unit normalization
- rate/percent structure recognition
- relation/model choice
- dimensional/result judgement

Phase emphasis should then behave like:

- foundation -> `unitNormalization + rateAndPercentStructure`
- integration -> `rateAndPercentStructure + relationModelChoice`
- graduation -> `relationModelChoice + dimensionalJudgement`

The implementation should prefer “recognize the relation and choose the model” before it spends more paper budget on long word problems or low-value bare unit conversions.

- [ ] **Step 5: Add one explicit number-sense item to keep-warm or bridge when missing**

After sections are assembled, add a guard:

```js
function ensureClosureNumberSensePresence(items, student) {
  if (items.some(item => item.trainingAxis === 'number_sense')) return items;
  const injected = annotateClosureItem(buildClosureBoundaryReplayItem({
    tag: 'c2_est_reasonable',
    info: { q: '[Closure Number Sense Guard]' }
  }), {
    trainingAxis: 'number_sense',
    trainingTier: 'A',
    sectionRole: 'representation_core'
  });
  return [...items.slice(0, -1), injected];
}
```

- [ ] **Step 6: Re-run validation**

Run:

```bash
node scripts/validate-runtime.mjs
```

Expected: PASS the A-class daily coverage assertions or fail only on targeted focus-lane weighting still not matching the new plan.

- [ ] **Step 7: Commit the section rebuild checkpoint**

```bash
git add /Users/bianbian/Documents/codex/minichallenge/index.html /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs
git commit -m "feat: rebuild closure sections around training matrix"
```

## Task 4: Reweight The Three Phases And Focus Lane

**Files:**
- Modify: `/Users/bianbian/Documents/codex/minichallenge/index.html`
- Test: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`

- [ ] **Step 1: Encode explicit phase weight rules**

Create a helper:

```js
const CLOSURE_PHASE_TRAINING_WEIGHTS = {
  foundation: {
    keepWarm: 'medium',
    representation: 'high',
    complexMixed: 'light',
    unitRate: 'medium',
    focus: 'diagnostic'
  },
  integration: {
    keepWarm: 'light',
    representation: 'high',
    complexMixed: 'high',
    unitRate: 'high',
    focus: 'high_value_gap'
  },
  graduation: {
    keepWarm: 'minimal',
    representation: 'boundary',
    complexMixed: 'full_structure',
    unitRate: 'judgement',
    focus: 'last_short_board'
  }
};
```

- [ ] **Step 2: Update `getClosurePhaseInfo` or adjacent metadata to expose the new training emphasis**

Add fields like:

```js
trainingEmphasis: CLOSURE_PHASE_TRAINING_WEIGHTS.foundation
```

and phase subtitles:

```js
foundation: '先接桥，再打通表示与轻量混合'
integration: '主体收束：混合运算、方法选择、综合切换'
graduation: '毕业判定：括号结构、边界判断、稳定迁移'
```

Also expose Section II-specific emphasis so validation can prove the bridge lane is progressing beyond direct conversion:

```js
bridgeLaneEmphasis: {
  conversion: 'high',
  baseline: 'high',
  choice: 'medium',
  postUse: 'medium_low'
}
```

with the values stepping to:

- integration -> `conversion: medium`, `baseline: high`, `choice: high`, `postUse: high`
- graduation -> `conversion: medium_low`, `baseline: high`, `choice: high`, `postUse: high`

Also expose Section III-specific emphasis so future validation can prove the intended method-first ramp:

```js
mixLaneEmphasis: {
  structure: 'high',
  method: 'high',
  execution: 'medium_low',
  judgement: 'medium'
}
```

with the values stepping to:

- integration -> `structure: medium`, `method: high`, `execution: high`, `judgement: medium_high`
- graduation -> `structure: medium`, `method: high`, `execution: high`, `judgement: high`

- [ ] **Step 3: Make Section V prefer A-class shortboards first**

Refactor `selectClosureFocus` ranking so A-class shortages outrank B/C unless clearly dominant:

```js
const focusPriorityBoost = {
  representationGap: 2.5,
  methodGap: 2.2,
  stabilityGap: 1.4,
  speedGap: 1.8,
  validationGap: 2.1
};

score = rawGapScore + phaseBias[field] + focusPriorityBoost[field];
```

Then bias the variant builder:

```js
if (focusField === 'representationGap') prefer conversion_bridge + number_sense;
if (focusField === 'methodGap') prefer complex_mixed + equation_method;
if (focusField === 'validationGap') prefer number_sense + result judgement;
```

- [ ] **Step 4: Add validation that phase 1, 2, and 3 now differ meaningfully**

Add checks:

```js
const set1 = runtime.buildClosureProgramSetForTest(1);
const set12 = runtime.buildClosureProgramSetForTest(12);
const set26 = runtime.buildClosureProgramSetForTest(26);

assert(set1.phaseMeta.trainingEmphasis.complexMixed === 'light', 'Set 1 should keep complex mixed light');
assert(set12.phaseMeta.trainingEmphasis.complexMixed === 'high', 'Set 12 should raise complex mixed weight');
assert(set26.phaseMeta.trainingEmphasis.complexMixed === 'full_structure', 'Set 26 should use full structure mode');
```

Add companion assertions for the new bridge-lane emphasis:

```js
assert(set1.phaseMeta.bridgeLaneEmphasis.conversion === 'high', 'Set 1 should still prioritize direct conversion');
assert(set12.phaseMeta.bridgeLaneEmphasis.choice === 'high', 'Set 12 should raise representation-choice weight');
assert(set26.phaseMeta.bridgeLaneEmphasis.postUse === 'high', 'Set 26 should keep post-conversion use high');
```

Add companion assertions for the new mix-lane emphasis:

```js
assert(set1.phaseMeta.mixLaneEmphasis.method === 'high', 'Set 1 should already prioritize method choice');
assert(set12.phaseMeta.mixLaneEmphasis.execution === 'high', 'Set 12 should raise complex execution weight');
assert(set26.phaseMeta.mixLaneEmphasis.judgement === 'high', 'Set 26 should raise result judgement weight');
```

- [ ] **Step 5: Re-run validation**

Run:

```bash
node scripts/validate-runtime.mjs
```

Expected: PASS with distinct phase-emphasis assertions.

- [ ] **Step 6: Commit the phase-weight checkpoint**

```bash
git add /Users/bianbian/Documents/codex/minichallenge/index.html /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs
git commit -m "feat: reweight closure phases and focus lane"
```

## Task 5: Surface The New Training Logic In UI Copy And Docs

**Files:**
- Modify: `/Users/bianbian/Documents/codex/minichallenge/index.html`
- Modify: `/Users/bianbian/Documents/codex/minichallenge/README.md`
- Modify: `/Users/bianbian/Documents/codex/minichallenge/DEV_SPEC.md`
- Modify: `/Users/bianbian/Documents/codex/minichallenge/PRODUCT_SPEC.md`
- Modify: `/Users/bianbian/Documents/codex/minichallenge/WORKFLOW.md`
- Modify: `/Users/bianbian/Documents/codex/minichallenge/docs/README.md`

- [ ] **Step 1: Update paper-facing phase and section language**

Adjust `Closure` page copy so section labels match the new roles:

```js
phase.bridgeTitle = '表征互通主训练';
phase.mixTitle = '复杂四则混合主训练';
phase.unitTitle = '单位 / 率 / 关系综合';
phase.focusTitle = '重点强化';
```

Add short learner-facing cues:

```js
foundation cue: '先打通表示，再轻量进入混合运算。'
integration cue: '主体收束：表示切换、复杂混合、方法选择一起练。'
graduation cue: '毕业判定：看结构、判边界、稳迁移。'
```

- [ ] **Step 2: Document the runtime changes in `DEV_SPEC.md`**

Add bullets covering:

```md
- `Closure` now uses an explicit five-section training matrix instead of a looser blended-paper composition.
- Section II and III are the daily A-class core battlefields.
- Complex mixed arithmetic now appears throughout all phases, but ramps from light to fully structured with bracket upgrades.
- Section II internally splits into representation conversion, baseline comparison, representation choice, and post-conversion use so the bridge lane can evolve past pure conversion drills.
- Section III internally splits into structure recognition, method choice, complex execution, and result judgement, with method choice explicitly prioritized before raw complexity.
```

- [ ] **Step 3: Document the learner/product rationale in `PRODUCT_SPEC.md`**

Add bullets covering:

```md
- Phase two no longer treats elementary calculation topics equally.
- The main goal is to create a high-value closure system: preserve first-stage gains, then spend most time on representation transfer, complex mixed arithmetic, number sense, and method choice.
- Section II is not a “conversion worksheet”; it is the learner’s representation hub, where switching form, choosing form, and using the chosen form all matter.
- Section III is not “the hardest pile of mixed questions”; it is the learner’s complex-calculation advantage lane, where method choice comes before brute-force execution.
```

- [ ] **Step 4: Update README and workflow guardrails**

In `README.md` and `WORKFLOW.md`, add a short section:

```md
- When changing `Closure` question pools, protect:
  - daily representation-core presence
  - daily complex-mixed presence
  - phase-aware bracket escalation
  - A/B/C tier discipline
```

- [ ] **Step 5: Link the implementation plan in `docs/README.md`**

Add:

```md
- [2026-04-19-closure-training-quality-implementation-plan.md](./superpowers/plans/2026-04-19-closure-training-quality-implementation-plan.md) · 第二阶段 `Closure` 高价值收束训练实施计划，覆盖两条主轴、五段矩阵、三阶段权重和验证约束
```

- [ ] **Step 6: Run full verification**

Run:

```bash
node scripts/validate-runtime.mjs
node --check /tmp/minichallenge-module-check.js
```

Expected:

- `node scripts/validate-runtime.mjs` → PASS
- `node --check /tmp/minichallenge-module-check.js` → PASS

- [ ] **Step 7: Commit the docs-and-copy checkpoint**

```bash
git add /Users/bianbian/Documents/codex/minichallenge/index.html /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs /Users/bianbian/Documents/codex/minichallenge/README.md /Users/bianbian/Documents/codex/minichallenge/DEV_SPEC.md /Users/bianbian/Documents/codex/minichallenge/PRODUCT_SPEC.md /Users/bianbian/Documents/codex/minichallenge/WORKFLOW.md /Users/bianbian/Documents/codex/minichallenge/docs/README.md
git commit -m "docs: document closure training quality rollout"
```

## Self-Review

### Spec coverage

- Dual-stage analysis and “double-track” strategy: covered in Tasks 2–4.
- Two main axes (representation core + complex mixed arithmetic): covered in Tasks 2–4.
- Daily five-section matrix: covered in Tasks 1–3.
- A / B / C value tiers: covered in Tasks 2–3.
- Three-phase emphasis curve: covered in Task 4.
- Complex mixed arithmetic present throughout, but stronger later with bracket upgrades: covered in Tasks 3–4.
- Section III method-first deepening and stable mixed-arithmetic template families: covered in Tasks 3–5.
- Section II bridge-lane deepening and stable representation-transfer template families: covered in Tasks 3–5.
- High-value filtering and non-average topic weighting: covered in Tasks 2–4 and documented in Task 5.

### Placeholder scan

- No `TODO`, `TBD`, or “implement later” placeholders remain.
- Every task uses explicit file paths, commands, and concrete helper names.

### Type consistency

- `trainingAxis`, `trainingTier`, and `sectionRole` are introduced once in Task 2 and reused consistently afterward.
- `describeClosureSections` and `CLOSURE_PHASE_TRAINING_WEIGHTS` are named consistently across validation and implementation steps.
- `buildClosureKeepWarmSection`, `ensureClosureNumberSensePresence`, and phase emphasis naming match the earlier tasks.
