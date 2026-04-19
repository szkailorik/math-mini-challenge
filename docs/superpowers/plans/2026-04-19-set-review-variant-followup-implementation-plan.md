# Set Review Variant Follow-up Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an in-report “variant follow-up” block to the existing Set Review flow so each student can immediately practice a short, high-value set of same-skill variant questions generated from that set’s mistakes, with optional answer-key printing for parents.

**Architecture:** Reuse the existing `report-modal`, `showSetReview`, saved `session.details`, and print-sandbox infrastructure instead of creating a new route or standalone training mode. Add one set-review follow-up generator layer inside `index.html`, render one student-scoped follow-up section below each existing review table, and provide dedicated print actions that print only the follow-up training page or the follow-up page plus answers.

**Tech Stack:** Static HTML/CSS/JS in `index.html`, existing `StorageDB` session history, existing review modal and print sandbox helpers, runtime validation in `scripts/validate-runtime.mjs`, docs in `README.md`, `docs/README.md`, `DEV_SPEC.md`, `PRODUCT_SPEC.md`, and `WORKFLOW.md`.

---

## File Structure

### Existing files to modify

- Modify: `index.html`
  - Add set-review follow-up data shaping helpers
  - Add variant-generation helpers driven by existing session details
  - Add follow-up rendering below each student’s review table
  - Add dedicated print actions for follow-up-only and follow-up-plus-answers
  - Add styles for compact report follow-up blocks and print shells
- Modify: `scripts/validate-runtime.mjs`
  - Assert the new follow-up generator helpers exist
  - Assert Set Review renders the new block
  - Assert both print entrypoints exist
  - Assert answer-key rendering exists
- Modify: `README.md`
  - Add release summary for the new Set Review follow-up feature
- Modify: `docs/README.md`
  - Add implementation-plan link
- Modify: `DEV_SPEC.md`
  - Document how the new block reuses `session.details` and print sandbox
- Modify: `PRODUCT_SPEC.md`
  - Document the learning-design role of immediate same-skill follow-up
- Modify: `WORKFLOW.md`
  - Document the parent flow: grade → report → variant follow-up → print

### Existing files to reference while implementing

- Reference: `docs/superpowers/specs/2026-04-19-set-review-variant-followup-design.md`
- Reference: `index.html` sections around:
  - `buildSetReviewSection`
  - `showSetReview`
  - `submitGrades`
  - `StorageDB.saveSession`
  - `getPrintRoot`
  - `buildPrintSandbox`
  - `printCalculationQuickReview`

### No new runtime files in v1

To stay aligned with the current single-file app architecture, keep the runtime implementation in `index.html`. Do not create new JS modules or routes in this pass.

---

### Task 1: Define the follow-up data model and candidate-selection helpers

**Files:**
- Modify: `index.html`
- Test: `scripts/validate-runtime.mjs`

- [ ] **Step 1: Add a mistake-family normalization helper near the existing replay / quality-family helpers**

Insert a helper block near the existing training-quality metadata so Set Review can group mistakes by reusable family:

```js
function getSetReviewFollowupFamily(tag, info = {}) {
    const qf = getQualityFamilyForTag(tag, info);
    if (qf) return qf;
    if (/div|division|除/.test(tag || '')) return 'decimal_division';
    if (/frac|fraction|分数/.test(tag || '')) return 'fraction_operation';
    if (/conv|percent|compare|互化|百分/.test(tag || '')) return 'conversion_bridge';
    if (/unit|rate|speed|单位|速度|比率/.test(tag || '')) return 'unit_rate_speed';
    if (/eq|equation|方程/.test(tag || '')) return 'equation_method';
    return 'generic_followup';
}
```

- [ ] **Step 2: Add a helper that shapes current-set mistakes into follow-up candidates**

Add a small adapter that reads `session.details` and enriches each mistake with family and severity:

```js
function buildSetReviewFollowupCandidates(session) {
    return (session?.details || []).map((detail, index) => {
        const info = detail.info || {};
        return {
            id: `${detail.uid || detail.tag || 'mistake'}-${index}`,
            uid: detail.uid,
            tag: detail.tag,
            grade: detail.grade,
            info,
            family: getSetReviewFollowupFamily(detail.tag, info),
            severity: detail.grade === 'wrong' ? 2 : 1
        };
    });
}
```

- [ ] **Step 3: Add a helper that collapses repeated same-family mistakes into compact follow-up targets**

Add a grouping helper so the page does not mechanically reissue one follow-up per wrong row:

```js
function buildSetReviewFollowupTargets(session) {
    const byFamily = new Map();
    buildSetReviewFollowupCandidates(session).forEach(candidate => {
        const key = `${candidate.family}:${candidate.grade}`;
        const bucket = byFamily.get(key) || {
            family: candidate.family,
            grade: candidate.grade,
            sourceItems: []
        };
        bucket.sourceItems.push(candidate);
        byFamily.set(key, bucket);
    });
    return Array.from(byFamily.values())
        .sort((a, b) => {
            const sa = a.grade === 'wrong' ? 2 : 1;
            const sb = b.grade === 'wrong' ? 2 : 1;
            return sb - sa || b.sourceItems.length - a.sourceItems.length;
        });
}
```

- [ ] **Step 4: Run a focused syntax/validation check**

Run: `node --check /tmp/minichallenge-module-check.js`

Expected: PASS after extracting the module script as already done in the repo workflow.

- [ ] **Step 5: Extend runtime validation for the new helpers**

Add assertions like:

```js
assertSourceContains('function getSetReviewFollowupFamily(', 'set review follow-up family helper');
assertSourceContains('function buildSetReviewFollowupCandidates(', 'set review follow-up candidate helper');
assertSourceContains('function buildSetReviewFollowupTargets(', 'set review follow-up target helper');
```

- [ ] **Step 6: Run validation**

Run: `node scripts/validate-runtime.mjs`

Expected: PASS with the new helper checks.

- [ ] **Step 7: Commit**

```bash
git add index.html scripts/validate-runtime.mjs
git commit -m "feat: add set review follow-up candidate model"
```

---

### Task 2: Add same-skill variant generation for the first follow-up families

**Files:**
- Modify: `index.html`
- Test: `scripts/validate-runtime.mjs`

- [ ] **Step 1: Add a compact variant generator dispatcher**

Create a generator dispatcher that maps grouped follow-up families to existing or lightweight new variant builders:

```js
function buildSetReviewVariantQuestion(target, student, programId) {
    switch (target.family) {
        case 'decimal_division':
            return buildSetReviewDecimalDivisionVariant(target, student, programId);
        case 'fraction_operation':
            return buildSetReviewFractionVariant(target, student, programId);
        case 'conversion_bridge':
            return buildSetReviewConversionVariant(target, student, programId);
        case 'equation_method':
            return buildSetReviewEquationVariant(target, student, programId);
        case 'unit_rate_speed':
            return buildSetReviewUnitRateVariant(target, student, programId);
        default:
            return buildGenericSetReviewVariant(target, student, programId);
    }
}
```

- [ ] **Step 2: Implement a compact decimal-division variant builder**

Use the existing division patterns and produce new numbers/answers instead of replaying the original prompt:

```js
function buildSetReviewDecimalDivisionVariant(target) {
    const typeRoll = target.grade === 'wrong' ? 2 : 1;
    if (typeRoll === 2) {
        const dividend = pick([4.8, 7.2, 9.6, 12.5, 18.4]);
        const divisor = pick([0.6, 0.8, 1.2, 2.5]);
        const answer = String(Number((dividend / divisor).toFixed(3)).toString());
        return {
            family: 'decimal_division',
            prompt: `${dividend} ÷ ${divisor} =`,
            answer,
            cue: '先判断商比 1 大还是小，再处理小数点。'
        };
    }
    const dividend = pick([3.6, 5.4, 8.4, 14.4]);
    const divisor = pick([0.9, 1.8, 2.4]);
    return {
        family: 'decimal_division',
        prompt: `${dividend} ÷ ${divisor} =`,
        answer: String(Number((dividend / divisor).toFixed(3)).toString()),
        cue: '粗心保温：先估商，再看小数点。'
    };
}
```

- [ ] **Step 3: Implement fraction / conversion / equation / unit-rate compact builders**

Add similarly small builders that keep the same method but change numbers and answers:

```js
function buildSetReviewFractionVariant(target) {
    const left = pick([[3, 4], [5, 6], [7, 8], [2, 3]]);
    const right = pick([[1, 2], [2, 5], [3, 10]]);
    return {
        family: 'fraction_operation',
        prompt: `${left[0]}/${left[1]} ÷ ${right[0]}/${right[1]} =`,
        answer: formatFractionAnswer(left[0] * right[1], left[1] * right[0]),
        cue: '先想是不是要乘倒数，再看能不能约分。'
    };
}

function buildSetReviewConversionVariant(target) {
    const base = pick([0.2, 0.25, 0.4, 0.75, 0.125]);
    return {
        family: 'conversion_bridge',
        prompt: `${base} = (   )% = (   )`,
        answer: buildConversionAnswer(base),
        cue: '先统一形式，再看题目最后要哪一种。'
    };
}
```

- [ ] **Step 4: Add a builder that turns grouped targets into a short 4-8 item follow-up set**

Keep the set compact and severity-aware:

```js
function buildSetReviewFollowupItems(session, student, programId) {
    const targets = buildSetReviewFollowupTargets(session);
    const items = [];
    targets.forEach(target => {
        const quota = target.grade === 'wrong'
            ? Math.min(2, Math.max(1, target.sourceItems.length))
            : 1;
        for (let i = 0; i < quota; i += 1) {
            items.push(buildSetReviewVariantQuestion(target, student, programId));
        }
    });
    return items.slice(0, 8);
}
```

- [ ] **Step 5: Run validation**

Run: `node scripts/validate-runtime.mjs`

Expected: PASS after adding assertions for:

```js
assertSourceContains('function buildSetReviewVariantQuestion(', 'follow-up variant dispatcher');
assertSourceContains('function buildSetReviewFollowupItems(', 'follow-up item builder');
```

- [ ] **Step 6: Commit**

```bash
git add index.html scripts/validate-runtime.mjs
git commit -m "feat: add set review variant generators"
```

---

### Task 3: Render the new follow-up block inside each student’s Set Review section

**Files:**
- Modify: `index.html`
- Test: `scripts/validate-runtime.mjs`

- [ ] **Step 1: Add a helper that renders one student’s follow-up summary and practice sheet**

Create a dedicated renderer:

```js
function buildSetReviewFollowupHTML(student, session) {
    const programId = session?.programId || getCurrentProgramId();
    const items = buildSetReviewFollowupItems(session, student, programId);
    if (!items.length) {
        return `
        <div class="set-review-followup">
            <div class="set-review-followup-head">
                <h4>🧩 本套错题变式跟训</h4>
            </div>
            <div class="set-review-followup-empty">本套没有可追加的错题变式训练，建议直接进入下一套。</div>
        </div>`;
    }
    const wrongCount = (session.details || []).filter(item => item.grade === 'wrong').length;
    const carelessCount = (session.details || []).filter(item => item.grade === 'careless').length;
    const rows = items.map((item, idx) => `
        <div class="followup-item">
            <span class="followup-num">${idx + 1}.</span>
            <span class="followup-q math-row">${item.prompt}</span>
        </div>`).join('');
    return `
    <div class="set-review-followup" data-student="${student}">
        <div class="set-review-followup-head">
            <h4>🧩 本套错题变式跟训</h4>
            <div class="set-review-followup-actions no-print">
                <button class="modal-btn" onclick="window.printSetReviewFollowup('${student}', false)">🖨️ 打印变式训练</button>
                <button class="modal-btn" onclick="window.printSetReviewFollowup('${student}', true)">🖨️ 打印训练+答案</button>
            </div>
        </div>
        <div class="set-review-followup-summary">
            本次跟训共 ${items.length} 题 · 概念错 ${wrongCount} 题优先 · 粗心保温 ${carelessCount} 题轻量补温
        </div>
        <div class="set-review-followup-sheet">${rows}</div>
        ${buildSetReviewFollowupAnswerHTML(items)}
    </div>`;
}
```

- [ ] **Step 2: Add an answer-key renderer**

Keep answers compact and parent-oriented:

```js
function buildSetReviewFollowupAnswerHTML(items) {
    const rows = items.map((item, idx) => `
        <tr>
            <td>${idx + 1}</td>
            <td><div class="math-row">${item.answer}</div></td>
            <td>${item.cue || ''}</td>
        </tr>`).join('');
    return `
    <div class="set-review-followup-answer">
        <h5>参考答案</h5>
        <table class="archive-table">
            <tr><th>#</th><th>答案</th><th>检查提醒</th></tr>
            ${rows}
        </table>
    </div>`;
}
```

- [ ] **Step 3: Append the new block inside `buildSetReviewSection`**

Update the return template so the follow-up block renders below the existing review table:

```js
const followupHTML = buildSetReviewFollowupHTML(student, session);
return `
<div class="report-section" style="${isHighlight ? 'border-color:#dc2626;' : ''}">
    ...
    <div style="padding:15px; max-height:360px; overflow:auto;">
        <table class="archive-table">...</table>
    </div>
    <div class="set-review-followup-wrap">
        ${followupHTML}
    </div>
</div>`;
```

- [ ] **Step 4: Add compact screen styles for the new report block**

Add CSS near the other report styles:

```css
.set-review-followup { border-top: 1px solid #e2e8f0; padding: 16px 15px 0; }
.set-review-followup-head { display:flex; justify-content:space-between; align-items:center; gap:12px; }
.set-review-followup-summary { margin-top:10px; padding:10px 12px; background:#f8fafc; border-radius:10px; font-size:13px; color:#475569; }
.set-review-followup-sheet { margin-top:12px; display:grid; gap:8px; }
.followup-item { display:flex; align-items:flex-start; gap:8px; font-size:16px; }
.followup-num { width:24px; flex:0 0 24px; font-weight:700; color:#0f172a; }
.followup-q { flex:1; }
.set-review-followup-answer { margin-top:14px; }
```

- [ ] **Step 5: Run validation**

Run: `node scripts/validate-runtime.mjs`

Expected: PASS after adding assertions for:

```js
assertSourceContains('function buildSetReviewFollowupHTML(', 'follow-up section renderer');
assertSourceContains('function buildSetReviewFollowupAnswerHTML(', 'follow-up answer renderer');
assertSourceContains('set-review-followup', 'follow-up styles and markup');
```

- [ ] **Step 6: Commit**

```bash
git add index.html scripts/validate-runtime.mjs
git commit -m "feat: render set review follow-up block"
```

---

### Task 4: Add dedicated follow-up printing that excludes the review table

**Files:**
- Modify: `index.html`
- Test: `scripts/validate-runtime.mjs`

- [ ] **Step 1: Add a helper that builds a print-only follow-up shell for one student**

Reuse the report data but print only the new training block:

```js
function buildSetReviewFollowupPrintHTML(student, setNum, includeAnswers = false) {
    const profile = StorageDB.getProfile(student) || {};
    const session = findSetSession(profile, setNum);
    if (!session) return '';
    const items = buildSetReviewFollowupItems(session, student, session.programId || getCurrentProgramId());
    const answerBlock = includeAnswers ? buildSetReviewFollowupAnswerHTML(items) : '';
    const rows = items.map((item, idx) => `
        <div class="followup-print-item">
            <span class="followup-num">${idx + 1}.</span>
            <span class="followup-q math-row">${item.prompt}</span>
        </div>`).join('');
    return `
    <section class="set-review-followup-print-shell">
        <header class="booklet-meta-band">
            <span>${student} · Set ${setNum}</span>
            <span>本套错题变式跟训</span>
        </header>
        <h2 class="sheet-title">错题变式跟训</h2>
        <div class="followup-print-sheet">${rows}</div>
        ${answerBlock}
    </section>`;
}
```

- [ ] **Step 2: Add the public print entrypoint**

```js
window.printSetReviewFollowup = function(student, includeAnswers = false) {
    ensurePrintLifecycleHooks();
    clearPrintMode();
    const root = getPrintRoot();
    const html = buildSetReviewFollowupPrintHTML(student, window.currentSetNumber, includeAnswers);
    if (!html) {
        showToast('这位学生本套还没有可打印的变式训练。', { background: '#b45309' });
        return;
    }
    root.innerHTML = html;
    root.setAttribute('data-print-mode', includeAnswers ? 'set-review-followup-with-answers' : 'set-review-followup');
    window.print();
}
```

- [ ] **Step 3: Add print styles for the follow-up shell**

```css
@media print {
  [data-print-mode="set-review-followup"] .set-review-followup-answer { display:none; }
  .set-review-followup-print-shell { width: 190mm; margin: 0 auto; color:#111827; }
  .followup-print-sheet { display:grid; gap:10px; }
  .followup-print-item { display:flex; gap:8px; font-size:16px; page-break-inside:avoid; }
}
```

- [ ] **Step 4: Run validation**

Run: `node scripts/validate-runtime.mjs`

Expected: PASS after adding assertions for:

```js
assertSourceContains('window.printSetReviewFollowup = function(', 'set review follow-up print entrypoint');
assertSourceContains('function buildSetReviewFollowupPrintHTML(', 'set review follow-up print shell');
assertSourceContains('set-review-followup-print-shell', 'set review follow-up print styles');
```

- [ ] **Step 5: Commit**

```bash
git add index.html scripts/validate-runtime.mjs
git commit -m "feat: add set review follow-up printing"
```

---

### Task 5: Update docs, validate the workflow, and finish the feature slice

**Files:**
- Modify: `README.md`
- Modify: `docs/README.md`
- Modify: `DEV_SPEC.md`
- Modify: `PRODUCT_SPEC.md`
- Modify: `WORKFLOW.md`
- Modify: `scripts/validate-runtime.mjs`

- [ ] **Step 1: Update README with the release summary**

Add a new top release section:

```md
## v23.xx 本套报告错题变式跟训

- 这次在 `本套报告 / Set Review` 里新增了“本套错题变式跟训”。
- 系统会基于本套真实错题，按错误点家族生成一轮短而精的同类变式训练。
- 这不是原题重做，而是保持同知识点、同方法、但更换数字、题面和答案。
- 同时支持：
  - 只打印变式训练
  - 打印变式训练 + 参考答案
```

- [ ] **Step 2: Add the plan link to `docs/README.md`**

```md
- [2026-04-19-set-review-variant-followup-implementation-plan.md](./superpowers/plans/2026-04-19-set-review-variant-followup-implementation-plan.md) · “本套报告错题变式跟训”实施计划，覆盖报告内变式生成、答案区和打印入口
```

- [ ] **Step 3: Update the technical and product docs**

Add short sections covering:

```md
### 本套报告错题变式跟训

- 数据来源：复用 `StorageDB.saveSession()` 中的 `session.details`
- 呈现位置：`buildSetReviewSection()` 下方
- 输出目标：每位学生 4-8 题的短程跟训页
- 打印方式：复用 print sandbox，仅打印跟训页或跟训页+答案
```

- [ ] **Step 4: Run the final verification commands**

Run: `node scripts/validate-runtime.mjs`

Expected: PASS

Run: `node --check /tmp/minichallenge-module-check.js`

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add index.html scripts/validate-runtime.mjs README.md docs/README.md DEV_SPEC.md PRODUCT_SPEC.md WORKFLOW.md
git commit -m "docs: document set review variant follow-up"
```

---

## Self-Review

### Spec coverage

- In-report placement is covered in Task 3.
- Same-skill variant generation is covered in Task 2.
- Compact 4-8 item follow-up behavior is covered in Task 2.
- Parent answer reference is covered in Task 3.
- Follow-up-only vs follow-up-plus-answers printing is covered in Task 4.
- Workflow and documentation updates are covered in Task 5.

### Placeholder scan

- No `TBD`, `TODO`, or “implement later” placeholders remain.
- Every task names exact files and concrete helper names.
- Every code-changing step includes code blocks.

### Type consistency

- `buildSetReviewFollowupCandidates` feeds `buildSetReviewFollowupTargets`.
- `buildSetReviewFollowupTargets` feeds `buildSetReviewFollowupItems`.
- `buildSetReviewFollowupItems` feeds both `buildSetReviewFollowupHTML` and `buildSetReviewFollowupPrintHTML`.
- The same `item` shape (`prompt`, `answer`, `cue`, `family`) is used in screen and print renderers.
