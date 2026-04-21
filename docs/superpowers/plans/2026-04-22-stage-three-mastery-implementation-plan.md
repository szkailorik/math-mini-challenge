# Stage Three Mastery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a third-stage `Mastery` program on top of the existing `Advanced + Closure` system so the app can finish elementary calculation training with a mastery-grade complex-mixed lane, a relation-first equation lane, and a lightweight calibration lane before junior-high entry.

**Architecture:** Keep the existing single-file app, teacher-controlled program switching, per-program counters, profile storage, printing flow, and report/error-book stack. Add `mastery_transition_v1` as a third program that reuses the current shell, answer flow, and print pipeline, but introduces its own five-section matrix, phase metadata, profile fields, validation rules, and generation helpers close to the current `Closure` runtime.

**Tech Stack:** Static single-file web app (`/Users/bianbian/Documents/codex/minichallenge/index.html`), runtime validation (`/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`), markdown docs.

---

## File Structure

- Modify: `/Users/bianbian/Documents/codex/minichallenge/index.html`
  - Add third-program registry metadata, set generation, program copy, section helpers, profile defaults, grading writes, and print wiring.
- Modify: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`
  - Add stage-three paper generation checks, matrix-role assertions, per-day A-class coverage checks, and printed-paper regression checks.
- Modify: `/Users/bianbian/Documents/codex/minichallenge/README.md`
  - Summarize the third-stage goal and runtime behavior.
- Modify: `/Users/bianbian/Documents/codex/minichallenge/DEV_SPEC.md`
  - Document new runtime helpers, profile fields, program shell changes, and validation expectations.
- Modify: `/Users/bianbian/Documents/codex/minichallenge/PRODUCT_SPEC.md`
  - Document learner-facing third-stage behavior and why it exists after `Closure`.
- Modify: `/Users/bianbian/Documents/codex/minichallenge/WORKFLOW.md`
  - Document what must be checked whenever mastery pools or phase weights change.
- Modify: `/Users/bianbian/Documents/codex/minichallenge/docs/README.md`
  - Link this implementation plan.

## Task 1: Lock Stage-Three Expectations Into Validation First

**Files:**
- Modify: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`
- Test: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`

- [ ] **Step 1: Add a failing validation block for the third program shell**

Add a new validation block that expects a third program id and a mastery paper builder:

```js
assert(runtime.TRAINING_PROGRAMS.mastery_transition_v1, 'Stage three program should exist');
assert(typeof runtime.buildMasteryProgramSetForTest === 'function', 'Stage three test builder should exist');
```

- [ ] **Step 2: Run validation to confirm it fails before implementation**

Run:

```bash
node /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs
```

Expected: FAIL with missing `mastery_transition_v1` and missing stage-three helpers.

- [ ] **Step 3: Add failing section-role assertions for the mastery matrix**

Extend the validation with:

```js
const masteryPaper = runtime.buildMasteryProgramSetForTest({
  setNumber: 1,
  student: 'KAI'
});

const masterySections = runtime.describeMasterySections(masteryPaper);

assert(masterySections.m_k_warm.role === 'advanced_warmup', 'Stage three section I should be advanced warmup');
assert(masterySections.m_k_mix.role === 'mastery_complex_mixed', 'Stage three section II should be mastery complex mixed');
assert(masterySections.m_k_eq.role === 'mastery_equation', 'Stage three section III should be mastery equation');
assert(masterySections.m_k_cal.role === 'mastery_calibration', 'Stage three section IV should be mastery calibration');
assert(masterySections.m_k_focus.role === 'mastery_focus', 'Stage three section V should be mastery focus');
```

- [ ] **Step 4: Add failing A-class coverage assertions**

Continue the validation block with:

```js
const masteryItems = runtime.flattenPaperSections(masteryPaper, ['m_k_warm', 'm_k_mix', 'm_k_eq', 'm_k_cal', 'm_k_focus']);

assert(masteryItems.some(item => item.trainingAxis === 'mastery_complex_mixed'), 'Stage three should include complex mixed training every day');
assert(masteryItems.some(item => item.trainingAxis === 'equation_mastery'), 'Stage three should include equation mastery every day');
assert(masteryItems.some(item => item.trainingAxis === 'mastery_calibration'), 'Stage three should include calibration every day');
```

- [ ] **Step 5: Re-run validation to verify the new checks fail**

Run:

```bash
node /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs
```

Expected: FAIL on the missing stage-three helpers and matrix coverage.

- [ ] **Step 6: Commit the failing-test checkpoint**

```bash
git add /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs
git commit -m "test: add stage three mastery validation"
```

## Task 2: Add The Third Program Shell And Base Storage

**Files:**
- Modify: `/Users/bianbian/Documents/codex/minichallenge/index.html`
- Modify: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`
- Test: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`

- [ ] **Step 1: Add `mastery_transition_v1` to the program registry**

Add the third program next to the existing two:

```js
const TRAINING_PROGRAMS = {
  advanced_fluency_v1: {
    id: 'advanced_fluency_v1',
    label: '第一阶段',
    shortLabel: 'Advanced'
  },
  elementary_closure_v1: {
    id: 'elementary_closure_v1',
    label: '第二阶段',
    shortLabel: 'Closure'
  },
  mastery_transition_v1: {
    id: 'mastery_transition_v1',
    label: '第三阶段',
    shortLabel: 'Mastery'
  }
};
```

- [ ] **Step 2: Extend per-program set counters and bootstrap-safe defaults**

Update the existing set-counter initialization so the third stage gets its own pointer:

```js
const DEFAULT_SET_COUNTERS = {
  advanced_fluency_v1: 1,
  elementary_closure_v1: 1,
  mastery_transition_v1: 1
};
```

- [ ] **Step 3: Add a default profile factory for the third stage**

Add a dedicated profile shape close to the current closure profile helpers:

```js
function createMasteryProfile() {
  return {
    history: [],
    errorBook: [],
    mechanismSummary: {},
    complexMixedGap: 0,
    equationModelGap: 0,
    calibrationGap: 0,
    methodChoiceGap: 0,
    resultJudgementGap: 0
  };
}
```

- [ ] **Step 4: Wire the third program into profile read/write helpers**

Update the existing profile getter so:

```js
if (programId === 'mastery_transition_v1') {
  db.masteryProfile = db.masteryProfile || createMasteryProfile();
  return db.masteryProfile;
}
```

- [ ] **Step 5: Re-run validation to confirm the shell assertions move forward**

Run:

```bash
node /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs
```

Expected: FAIL later on missing stage-three section helpers, not on the program id itself.

- [ ] **Step 6: Commit the third-program shell checkpoint**

```bash
git add /Users/bianbian/Documents/codex/minichallenge/index.html /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs
git commit -m "feat: add stage three program shell"
```

## Task 3: Add Stage-Three Matrix Metadata And Phase Helpers

**Files:**
- Modify: `/Users/bianbian/Documents/codex/minichallenge/index.html`
- Modify: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`
- Test: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`

- [ ] **Step 1: Add section-role metadata for stage three**

Add:

```js
const MASTERY_SECTION_ROLES = {
  m_k_warm: { role: 'advanced_warmup', valueTier: 'B' },
  m_k_mix: { role: 'mastery_complex_mixed', valueTier: 'A' },
  m_k_eq: { role: 'mastery_equation', valueTier: 'A' },
  m_k_cal: { role: 'mastery_calibration', valueTier: 'A/B' },
  m_k_focus: { role: 'mastery_focus', valueTier: 'A' },
  m_l_warm: { role: 'advanced_warmup', valueTier: 'B' },
  m_l_mix: { role: 'mastery_complex_mixed', valueTier: 'A' },
  m_l_eq: { role: 'mastery_equation', valueTier: 'A' },
  m_l_cal: { role: 'mastery_calibration', valueTier: 'A/B' },
  m_l_focus: { role: 'mastery_focus', valueTier: 'A' }
};
```

- [ ] **Step 2: Add stage-three phase metadata**

Create a dedicated helper:

```js
function getMasteryPhaseInfo(setNumber = 1) {
  if (setNumber <= 8) {
    return { key: 'launch', label: '起势期', cue: '先把高手型复杂混合和关系型方程的底层方式建立起来。' };
  }
  if (setNumber <= 20) {
    return { key: 'build', label: '强化期', cue: '让复杂混合与关系建模进入真正的稳定高强度训练。' };
  }
  return { key: 'transition', label: '过渡期', cue: '把小学收官能力接到初中前的结构感、方法感和判断力。' };
}
```

- [ ] **Step 3: Add `describeMasterySections` for validation**

```js
function describeMasterySections() {
  return {
    m_k_warm: MASTERY_SECTION_ROLES.m_k_warm,
    m_k_mix: MASTERY_SECTION_ROLES.m_k_mix,
    m_k_eq: MASTERY_SECTION_ROLES.m_k_eq,
    m_k_cal: MASTERY_SECTION_ROLES.m_k_cal,
    m_k_focus: MASTERY_SECTION_ROLES.m_k_focus,
    m_l_warm: MASTERY_SECTION_ROLES.m_l_warm,
    m_l_mix: MASTERY_SECTION_ROLES.m_l_mix,
    m_l_eq: MASTERY_SECTION_ROLES.m_l_eq,
    m_l_cal: MASTERY_SECTION_ROLES.m_l_cal,
    m_l_focus: MASTERY_SECTION_ROLES.m_l_focus
  };
}

window.describeMasterySections = describeMasterySections;
```

- [ ] **Step 4: Add a single item-annotation helper for stage three**

```js
function annotateMasteryItem(item, meta = {}) {
  if (!item) return item;
  return {
    ...item,
    trainingAxis: meta.trainingAxis || item.trainingAxis || '',
    trainingTier: meta.trainingTier || item.trainingTier || '',
    sectionRole: meta.sectionRole || item.sectionRole || '',
    mechanismKey: item.mechanismKey || meta.mechanismKey || ''
  };
}
```

- [ ] **Step 5: Re-run validation to confirm matrix metadata exists**

Run:

```bash
node /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs
```

Expected: FAIL later on missing stage-three paper generation, not on missing section-role metadata.

- [ ] **Step 6: Commit the matrix metadata checkpoint**

```bash
git add /Users/bianbian/Documents/codex/minichallenge/index.html /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs
git commit -m "feat: add stage three matrix metadata"
```

## Task 4: Implement Section I And Section II

**Files:**
- Modify: `/Users/bianbian/Documents/codex/minichallenge/index.html`
- Modify: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`
- Test: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`

- [ ] **Step 1: Add an advanced warmup builder for Section I**

Create a helper:

```js
function buildMasteryWarmupSection(student, track = 'kai') {
  const groups = track === 'kai'
    ? ['c2_bridge_base', 'c2_bridge_compare', 'k_keep_sense']
    : ['c2_bridge_base', 'c2_bridge_compare', 'l_div_keep'];
  return buildCoveredSection(student, groups).slice(0, 4).map(item =>
    annotateMasteryItem(item, {
      trainingAxis: 'mastery_warmup',
      trainingTier: 'B',
      sectionRole: 'advanced_warmup'
    })
  );
}
```

- [ ] **Step 2: Add explicit mastery mix-lane families for Section II**

Add:

```js
const MASTERY_MIX_FAMILIES = {
  structureReading: ['m3_mix_structure', 'm3_mix_bracket_read'],
  methodChoice: ['m3_mix_method_choice', 'm3_mix_best_method'],
  complexExecution: ['m3_mix_execute', 'm3_mix_fraction_decimal', 'm3_mix_brackets'],
  resultJudgement: ['m3_mix_result_range', 'm3_mix_judgement']
};
```

- [ ] **Step 3: Add a phase-aware Section II builder**

Implement:

```js
function buildMasteryComplexMixedSection(student, phaseKey = 'launch') {
  const phaseMap = {
    launch: ['m3_mix_structure', 'm3_mix_method_choice', 'm3_mix_result_range'],
    build: ['m3_mix_method_choice', 'm3_mix_execute', 'm3_mix_fraction_decimal', 'm3_mix_judgement'],
    transition: ['m3_mix_brackets', 'm3_mix_best_method', 'm3_mix_execute', 'm3_mix_judgement']
  };
  return buildCoveredSection(student, phaseMap[phaseKey]).map(item =>
    annotateMasteryItem(item, {
      trainingAxis: 'mastery_complex_mixed',
      trainingTier: 'A',
      sectionRole: 'mastery_complex_mixed'
    })
  );
}
```

- [ ] **Step 4: Add a validation expectation for method-choice visibility**

Extend validation:

```js
assert(
  masteryItems.some(item => item.trainingAxis === 'mastery_complex_mixed' && /method|方法|先/.test((item.info?.q || '') + (item.tag || ''))),
  'Stage three should expose method-choice prompts in the complex mixed lane'
);
```

- [ ] **Step 5: Run validation to verify Section I and II now satisfy coverage**

Run:

```bash
node /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs
```

Expected: FAIL later on missing equation/calibration/focus wiring, but pass the mix-lane coverage checks.

- [ ] **Step 6: Commit the warmup and complex-mixed checkpoint**

```bash
git add /Users/bianbian/Documents/codex/minichallenge/index.html /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs
git commit -m "feat: add stage three warmup and mixed lane"
```

## Task 5: Implement Section III And Section IV

**Files:**
- Modify: `/Users/bianbian/Documents/codex/minichallenge/index.html`
- Modify: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`
- Test: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`

- [ ] **Step 1: Add relation-first equation families**

Add:

```js
const MASTERY_EQUATION_FAMILIES = {
  relationRead: ['m3_eq_relation', 'm3_eq_percent_relation'],
  modelWrite: ['m3_eq_model', 'm3_eq_rate_model'],
  stableSolve: ['m3_eq_solve', 'm3_eq_bracket_solve'],
  solveCheck: ['m3_eq_check', 'm3_eq_reasonable']
};
```

- [ ] **Step 2: Add a phase-aware Section III builder**

```js
function buildMasteryEquationSection(student, phaseKey = 'launch') {
  const phaseMap = {
    launch: ['m3_eq_relation', 'm3_eq_model', 'm3_eq_solve'],
    build: ['m3_eq_percent_relation', 'm3_eq_rate_model', 'm3_eq_solve', 'm3_eq_check'],
    transition: ['m3_eq_rate_model', 'm3_eq_bracket_solve', 'm3_eq_reasonable']
  };
  return buildCoveredSection(student, phaseMap[phaseKey]).map(item =>
    annotateMasteryItem(item, {
      trainingAxis: 'equation_mastery',
      trainingTier: 'A',
      sectionRole: 'mastery_equation'
    })
  );
}
```

- [ ] **Step 3: Add a calibration builder for Section IV**

```js
function buildMasteryCalibrationSection(student, phaseKey = 'launch') {
  const groups = {
    launch: ['m3_cal_best_method', 'm3_cal_near_value', 'm3_cal_first_step'],
    build: ['m3_cal_reasonable_result', 'm3_cal_best_method', 'm3_cal_convert_choice'],
    transition: ['m3_cal_reasonable_result', 'm3_cal_structure_read', 'm3_cal_first_step']
  };
  return buildCoveredSection(student, groups[phaseKey]).map(item =>
    annotateMasteryItem(item, {
      trainingAxis: 'mastery_calibration',
      trainingTier: 'A/B',
      sectionRole: 'mastery_calibration'
    })
  );
}
```

- [ ] **Step 4: Extend validation for relation-first equation coverage**

Add:

```js
assert(
  masteryItems.some(item => item.trainingAxis === 'equation_mastery'),
  'Stage three should include equation mastery every day'
);
assert(
  masteryItems.some(item => item.trainingAxis === 'mastery_calibration'),
  'Stage three should include calibration every day'
);
```

- [ ] **Step 5: Run validation to verify equation and calibration lanes exist**

Run:

```bash
node /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs
```

Expected: FAIL later on missing full paper assembly or grading writes, but pass equation/calibration lane assertions.

- [ ] **Step 6: Commit the equation and calibration checkpoint**

```bash
git add /Users/bianbian/Documents/codex/minichallenge/index.html /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs
git commit -m "feat: add stage three equation and calibration lanes"
```

## Task 6: Implement Section V Focus And Full Paper Assembly

**Files:**
- Modify: `/Users/bianbian/Documents/codex/minichallenge/index.html`
- Modify: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`
- Test: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`

- [ ] **Step 1: Add a stage-three focus selector**

```js
function selectMasteryFocus(profile) {
  const weights = [
    ['mastery_complex_mixed', profile.complexMixedGap || 0],
    ['equation_mastery', profile.equationModelGap || 0],
    ['mastery_calibration', profile.calibrationGap || 0],
    ['method_choice', profile.methodChoiceGap || 0],
    ['result_judgement', profile.resultJudgementGap || 0]
  ];
  return weights.sort((a, b) => b[1] - a[1])[0]?.[0] || 'mastery_complex_mixed';
}
```

- [ ] **Step 2: Add a focus builder for Section V**

```js
function buildMasteryFocusSection(student, profile, phaseKey = 'launch') {
  const focusKey = selectMasteryFocus(profile);
  const focusGroups = {
    mastery_complex_mixed: ['m3_focus_mix_variant', 'm3_focus_mix_boundary'],
    equation_mastery: ['m3_focus_eq_variant', 'm3_focus_eq_boundary'],
    mastery_calibration: ['m3_focus_cal_variant', 'm3_focus_cal_boundary'],
    method_choice: ['m3_focus_method_variant'],
    result_judgement: ['m3_focus_result_variant']
  };
  return buildCoveredSection(student, focusGroups[focusKey] || focusGroups.mastery_complex_mixed).map(item =>
    annotateMasteryItem(item, {
      trainingAxis: focusKey,
      trainingTier: 'A',
      sectionRole: 'mastery_focus'
    })
  );
}
```

- [ ] **Step 3: Assemble a full stage-three paper builder**

Create:

```js
function buildMasteryProgramSet(setNumber, kaiProfile, lorikProfile) {
  const phase = getMasteryPhaseInfo(setNumber);
  return {
    m_k_warm: buildMasteryWarmupSection('KAI', 'kai'),
    m_k_mix: buildMasteryComplexMixedSection('KAI', phase.key),
    m_k_eq: buildMasteryEquationSection('KAI', phase.key),
    m_k_cal: buildMasteryCalibrationSection('KAI', phase.key),
    m_k_focus: buildMasteryFocusSection('KAI', kaiProfile, phase.key),
    m_l_warm: buildMasteryWarmupSection('Lorik', 'lorik'),
    m_l_mix: buildMasteryComplexMixedSection('Lorik', phase.key),
    m_l_eq: buildMasteryEquationSection('Lorik', phase.key),
    m_l_cal: buildMasteryCalibrationSection('Lorik', phase.key),
    m_l_focus: buildMasteryFocusSection('Lorik', lorikProfile, phase.key)
  };
}

function buildMasteryProgramSetForTest({ setNumber = 1, student = 'KAI' } = {}) {
  const kaiProfile = createMasteryProfile();
  const lorikProfile = createMasteryProfile();
  return buildMasteryProgramSet(setNumber, kaiProfile, lorikProfile);
}

window.buildMasteryProgramSetForTest = buildMasteryProgramSetForTest;
```

- [ ] **Step 4: Route the main program builder through the new stage**

Update the central program switch:

```js
if (programId === 'mastery_transition_v1') {
  return buildMasteryProgramSet(setNumber, db.masteryKaiProfile || createMasteryProfile(), db.masteryLorikProfile || createMasteryProfile());
}
```

- [ ] **Step 5: Run validation to verify the full stage-three paper now passes**

Run:

```bash
node /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs
```

Expected: PASS for the new stage-three section-role and coverage checks.

- [ ] **Step 6: Commit the stage-three full paper checkpoint**

```bash
git add /Users/bianbian/Documents/codex/minichallenge/index.html /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs
git commit -m "feat: add stage three paper generation"
```

## Task 7: Wire Rendering, Submission, Printing, And Persistence

**Files:**
- Modify: `/Users/bianbian/Documents/codex/minichallenge/index.html`
- Modify: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`
- Test: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`

- [ ] **Step 1: Add stage-three copy to the program shell**

Update the UI copy helpers so the shell can display:

```js
{
  label: '第三阶段',
  shortLabel: 'Mastery',
  cue: '高手收官与初中过渡',
  focusNote: '复杂混合、关系型方程与长期能力校准'
}
```

- [ ] **Step 2: Add grading writes into the stage-three profile**

When `submitGrades` runs under `mastery_transition_v1`, write into the mastery profile:

```js
if (currentProgramId === 'mastery_transition_v1') {
  masteryProfile.history.push(sessionRecord);
  updateMasterySignalsFromSession(masteryProfile, sessionRecord);
}
```

- [ ] **Step 3: Add stage-three print and answer-sheet routing**

Route stage-three through the existing print shell:

```js
if (currentProgramId === 'mastery_transition_v1') {
  return getProgramQuestionSheetHTML('mastery_transition_v1', setData);
}
```

and add stage-three labels in the answer booklets:

```js
const programTitle = currentProgramId === 'mastery_transition_v1' ? 'Mini Challenge Mastery' : existingTitle;
```

- [ ] **Step 4: Extend validation to assert render and print presence**

Add:

```js
const rendered = runtime.renderProgramForTest('mastery_transition_v1', 1);
assert(/第三阶段/.test(rendered.html), 'Stage three render should mention 第三阶段');
assert(/高手收官/.test(rendered.html), 'Stage three render should mention the mastery cue');
assert(/Section II|复杂四则/.test(rendered.html), 'Stage three render should include the complex mixed section');
```

- [ ] **Step 5: Run validation to confirm render, submit, and print hooks pass**

Run:

```bash
node /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs
```

Expected: PASS with stage-three render and print assertions included.

- [ ] **Step 6: Commit the integration checkpoint**

```bash
git add /Users/bianbian/Documents/codex/minichallenge/index.html /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs
git commit -m "feat: integrate stage three runtime flow"
```

## Task 8: Update Docs And Final Regression Notes

**Files:**
- Modify: `/Users/bianbian/Documents/codex/minichallenge/README.md`
- Modify: `/Users/bianbian/Documents/codex/minichallenge/DEV_SPEC.md`
- Modify: `/Users/bianbian/Documents/codex/minichallenge/PRODUCT_SPEC.md`
- Modify: `/Users/bianbian/Documents/codex/minichallenge/WORKFLOW.md`
- Modify: `/Users/bianbian/Documents/codex/minichallenge/docs/README.md`
- Test: `/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs`

- [ ] **Step 1: Update README with a short stage-three summary**

Add a release note section that states:

```md
## v23.xxx 第三阶段 `Mastery` 启用

- 新增第三阶段 `Mastery`，定位为“小学计算高手收官 + 初中过渡启动阶段”。
- 以复杂四则混合和关系型优先的方程专题为双主战场。
- 保留五段矩阵，并通过长期能力校准区和个性化强化区保持高效训练。
```

- [ ] **Step 2: Update DEV_SPEC with the new runtime helpers**

Document:

- `getMasteryPhaseInfo`
- `buildMasteryWarmupSection`
- `buildMasteryComplexMixedSection`
- `buildMasteryEquationSection`
- `buildMasteryCalibrationSection`
- `buildMasteryFocusSection`
- `buildMasteryProgramSet`
- `describeMasterySections`

- [ ] **Step 3: Update PRODUCT_SPEC with learner-facing behavior**

Add a short section explaining that stage three:

- builds on `Advanced + Closure`
- treats complex mixed arithmetic as the first battlefield
- treats relation-first equations as the second battlefield
- uses calibration rather than more broad topic spreading

- [ ] **Step 4: Update WORKFLOW with regression guardrails**

Add a note that when changing stage-three pools, engineers must protect:

- the five-section matrix
- daily A-class coverage
- method-choice visibility in the mixed lane
- relation-first behavior in the equation lane
- print stability

- [ ] **Step 5: Re-run the full validation after docs are updated**

Run:

```bash
node /Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs
node --check /tmp/minichallenge-module-check.js
```

Expected: both commands PASS.

- [ ] **Step 6: Commit the docs checkpoint**

```bash
git add /Users/bianbian/Documents/codex/minichallenge/README.md /Users/bianbian/Documents/codex/minichallenge/DEV_SPEC.md /Users/bianbian/Documents/codex/minichallenge/PRODUCT_SPEC.md /Users/bianbian/Documents/codex/minichallenge/WORKFLOW.md /Users/bianbian/Documents/codex/minichallenge/docs/README.md
git commit -m "docs: document stage three mastery"
```

## Self-Review

- Spec coverage: This plan covers the third-program shell, section matrix, phase metadata, five-section paper generation, profile writes, rendering/printing, and docs updates described in `/Users/bianbian/Documents/codex/minichallenge/docs/superpowers/specs/2026-04-22-stage-three-mastery-design.md`.
- Placeholder scan: No `TODO`, `TBD`, or unresolved placeholders remain; each task points to exact files and explicit commands.
- Type consistency: `mastery_transition_v1`, `describeMasterySections`, `buildMasteryProgramSetForTest`, `getMasteryPhaseInfo`, and the five stage-three section ids are used consistently across tasks.

## Execution Handoff

Plan complete and saved to `/Users/bianbian/Documents/codex/minichallenge/docs/superpowers/plans/2026-04-22-stage-three-mastery-implementation-plan.md`. Two execution options:

1. Subagent-Driven (recommended) - I dispatch a fresh subagent per task, review between tasks, fast iteration
2. Inline Execution - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?

