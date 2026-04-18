# Calculation Quick Review Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a child-facing “Calculation Quick Review” page to the existing Mini Challenge single-page app so students can rapidly recall key elementary-school calculation rules, techniques, examples, and reminders without turning the feature into a knowledge dump.

**Architecture:** Reuse the existing single-page `index.html` runtime and `report-modal` infrastructure rather than introducing routing. Add one dedicated content registry for the review page, one dedicated render entry (`showCalculationQuickReview`), one print-friendly visual layer, and a small stage-aware hint system that keeps the main content stable while adapting emphasis for `Advanced` vs `Closure`.

**Tech Stack:** Static HTML/CSS/JS in `index.html`, existing modal shell and control panel, existing knowledge metadata (`KnowledgeBase`, `KnowledgeDomains`, `getCurrentProgramId`), runtime validation via `scripts/validate-runtime.mjs`, project docs in `README.md` and `docs/README.md`.

---

## File Structure

### Existing files to modify

- Modify: `index.html`
  - Add a new control-panel entry for the review page
  - Add content registry for the review topics
  - Add render helpers and stage-aware hint helpers
  - Add screen + print styles for the review page
  - Add print action for the review page
- Modify: `scripts/validate-runtime.mjs`
  - Assert the new entrypoint exists
  - Assert the content registry exists
  - Assert the new print-friendly shell exists
  - Assert stage-aware hint copy is wired
- Modify: `README.md`
  - Add release note / feature summary
  - Add plan link
- Modify: `docs/README.md`
  - Add implementation plan link

### Existing files to reference while implementing

- Reference: `docs/superpowers/specs/2026-04-19-calculation-quick-review-design.md`
- Reference: `index.html` sections around:
  - control panel buttons
  - `report-modal`
  - `showKnowledgeMap`
  - knowledge registries
  - print sandbox styles

### No new runtime files in v1

To stay aligned with the existing single-file architecture, keep the v1 runtime implementation inside `index.html`. Do not split content into separate JSON/JS files in this pass.

---

### Task 1: Add the content registry and page data model

**Files:**
- Modify: `index.html`
- Test: `scripts/validate-runtime.mjs`

- [ ] **Step 1: Add a dedicated review-page content registry near the existing knowledge registries**

Insert a new constant block near `KnowledgeBase`, `KnowledgeFamilies`, and `KnowledgeDomains` so the review page has a stable source of truth:

```js
const CALCULATION_QUICK_REVIEW_TOPICS = [
  {
    id: 'integer_ops',
    shortLabel: '整数四则',
    title: '整数四则与简算',
    programEmphasis: {
      advanced_fluency_v1: '先看运算顺序、凑整和分配律，减少低级错。',
      elementary_closure_v1: '先看结构，再决定是凑整、拆分还是补偿。'
    },
    rules: [
      '先乘除，后加减',
      '有括号先算括号',
      '分配律可拆可合'
    ],
    techniques: [
      '能凑整先凑整',
      '99、101 先想补偿',
      '先估大概结果'
    ],
    example: '99 × 37 = 100 × 37 − 37 = 3663',
    pitfalls: [
      '别从左到右一口气全算',
      '别漏掉括号后的整体'
    ],
    pins: ['先看顺序', '能凑先凑']
  },
  {
    id: 'written_algorithms',
    shortLabel: '竖式乘除',
    title: '竖式乘法与竖式除法',
    programEmphasis: {
      advanced_fluency_v1: '重点回想对位、估商、商中间补 0 和小数点。',
      elementary_closure_v1: '重点回想先判断商的范围，再决定小数点落点。'
    },
    rules: [
      '数位要对齐',
      '先估商再下笔',
      '不够除时商写 0'
    ],
    techniques: [
      '先看商大于 1 还是小于 1',
      '添 0 再除要守住数值不变',
      '算完用乘法反查'
    ],
    example: '4.8 ÷ 0.6 = 48 ÷ 6 = 8',
    pitfalls: [
      '商的小数点别乱放',
      '中间不够除时别漏写 0'
    ],
    pins: ['先估商', '不够写 0']
  },
  {
    id: 'decimal_ops',
    shortLabel: '小数计算',
    title: '小数加减乘除',
    programEmphasis: {
      advanced_fluency_v1: '重点回想小数点对齐、位数和数量级。',
      elementary_closure_v1: '重点回想小数和单位、率、结果判断之间的连接。'
    },
    rules: [
      '加减先对齐小数点',
      '乘法先按整数乘',
      '除法先把除数化整'
    ],
    techniques: [
      '先估结果大小',
      '乘完再数小数位',
      '除前先想商的范围'
    ],
    example: '0.24 × 0.3 = 24 × 3 ÷ 1000 = 0.072',
    pitfalls: [
      '积的小数位数别数错',
      '除数化整后别漏同步变化'
    ],
    pins: ['先估大小', '先化整再除']
  },
  {
    id: 'fraction_ops',
    shortLabel: '分数计算',
    title: '分数加减乘除',
    programEmphasis: {
      advanced_fluency_v1: '重点回想通分、约分、倒数和最简结果。',
      elementary_closure_v1: '重点回想分数运算和互化、比较之间的连通。'
    },
    rules: [
      '加减先通分',
      '乘前能约分先约分',
      '除以分数等于乘倒数'
    ],
    techniques: [
      '带分数先化假分数',
      '连乘优先交叉约分',
      '最后化成最简'
    ],
    example: '3/4 ÷ 1/2 = 3/4 × 2 = 3/2',
    pitfalls: [
      '别把除法直接当乘法',
      '结果别忘约成最简'
    ],
    pins: ['先通分', '先约再乘']
  },
  {
    id: 'conversion_compare',
    shortLabel: '互化比较',
    title: '分数、小数、百分数互化与比较',
    programEmphasis: {
      advanced_fluency_v1: '重点回想常见基准值和“先统一形式再比较”。',
      elementary_closure_v1: '重点回想互化后怎样判断谁更接近 1、1/2 或 0。'
    },
    rules: [
      '先统一形式再比',
      '百分数先想每百份',
      '常见分数要会化小数'
    ],
    techniques: [
      '抓 1/2、1/4、3/4、4/5',
      '看离基准值多一点还是少一点',
      '不会比时先互化'
    ],
    example: '0.25 = 25% = 1/4',
    pitfalls: [
      '别只看数字表面大小',
      '互化后别忘题目要什么形式'
    ],
    pins: ['先统一再比', '抓基准值']
  },
  {
    id: 'unit_rate',
    shortLabel: '单位比率',
    title: '单位换算与常见数量关系',
    programEmphasis: {
      advanced_fluency_v1: '重点回想统一单位和基础数量关系式。',
      elementary_closure_v1: '重点回想速度、单价、平均量的综合应用。'
    },
    rules: [
      '先统一单位',
      '总价 = 单价 × 数量',
      '路程 = 速度 × 时间'
    ],
    techniques: [
      '先判断量纲对不对',
      '先找整体量再列式',
      '单位换算后再算'
    ],
    example: '2.4 km = 2400 m',
    pitfalls: [
      '单位不同别直接算',
      '看清谁是单价谁是数量'
    ],
    pins: ['先统一单位', '先看量纲']
  },
  {
    id: 'equation_method',
    shortLabel: '方程逆运算',
    title: '方程与逆运算',
    programEmphasis: {
      advanced_fluency_v1: '重点回想未知数位置和逆运算方向。',
      elementary_closure_v1: '重点回想方程背后的数量关系，而不是只会移项。'
    },
    rules: [
      '先想谁和谁相等',
      '等式两边同时变化',
      '按逆运算一步一步回推'
    ],
    techniques: [
      '未知数在减数要特别慢',
      '未知数在除数先写关系',
      '每次只做一步变化'
    ],
    example: 'x × 25 = 10，先求 10 ÷ 25',
    pitfalls: [
      '别把减数和被减数弄反',
      '别一步跳太多'
    ],
    pins: ['先写关系', '一步一变']
  },
  {
    id: 'estimation_validation',
    shortLabel: '估算检验',
    title: '估算、验算与结果合理性判断',
    programEmphasis: {
      advanced_fluency_v1: '重点回想数量级和商的大致范围。',
      elementary_closure_v1: '重点回想结果是否合理、是否符合情境和单位。'
    },
    rules: [
      '先看结果大概范围',
      '算完再做估算对照',
      '单位和情境要合理'
    ],
    techniques: [
      '先看比 1 大还是小',
      '先抓接近整十整百',
      '结果异常先回查小数点'
    ],
    example: '4.8 ÷ 0.6 的商一定大于 1，不可能是 0.8',
    pitfalls: [
      '只算不检验',
      '数量级不对还继续往下写'
    ],
    pins: ['先看范围', '算完再验']
  }
];
```

- [ ] **Step 2: Add a compact page-shell descriptor so rendering and printing do not hard-code copy**

Add a small metadata object near the new registry:

```js
const CALCULATION_QUICK_REVIEW_PAGE = {
  id: 'calculation_quick_review',
  title: '计算知识总览 / Calculation Quick Review',
  subtitle: '快速回想规则、技巧、例子和注意点，不是背百科。',
  printTitle: 'Calculation Quick Review',
  printSubtitle: '孩子愿意看、老师愿意打的高质量计算复习页'
};
```

- [ ] **Step 3: Add helper functions for stable topic lookup and stage-aware emphasis**

Add these helpers below the new constants:

```js
function getCalculationQuickReviewTopics() {
  return CALCULATION_QUICK_REVIEW_TOPICS;
}

function getCalculationQuickReviewTopic(topicId) {
  return CALCULATION_QUICK_REVIEW_TOPICS.find(topic => topic.id === topicId) || null;
}

function getCalculationQuickReviewEmphasis(topic, programId) {
  if (!topic) return '';
  return topic.programEmphasis?.[programId] || topic.programEmphasis?.advanced_fluency_v1 || '';
}
```

- [ ] **Step 4: Extend runtime validation to assert the new content registry exists**

Add checks near the other runtime helper assertions in `scripts/validate-runtime.mjs`:

```js
if (!html.includes('const CALCULATION_QUICK_REVIEW_TOPICS = [')) {
  throw new Error('Calculation Quick Review topic registry is missing from runtime script');
}
if (!html.includes('function getCalculationQuickReviewTopics')) {
  throw new Error('Calculation Quick Review topic helper is missing from runtime script');
}
if (!html.includes('function getCalculationQuickReviewEmphasis')) {
  throw new Error('Calculation Quick Review emphasis helper is missing from runtime script');
}
```

- [ ] **Step 5: Run validation to confirm the new registry is detectable**

Run: `node scripts/validate-runtime.mjs`  
Expected: exits with code `0`

- [ ] **Step 6: Commit**

```bash
git add index.html scripts/validate-runtime.mjs
git commit -m "feat: add calculation quick review content registry"
```

---

### Task 2: Add the child-facing page entry and modal rendering flow

**Files:**
- Modify: `index.html`
- Test: `scripts/validate-runtime.mjs`

- [ ] **Step 1: Add a new control-panel button near the existing knowledge tools**

Add the new entry directly below the knowledge map button so the teacher can open it quickly:

```html
<button
  class="ctrl-btn"
  style="background:#0f766e; color:white; width:100%; margin-top:6px;"
  onclick="window.showCalculationQuickReview()"
>
  📘 计算知识总览 / Quick Review
</button>
```

- [ ] **Step 2: Add a renderer that reuses `report-modal` but outputs a student-facing page instead of a report**

Add a new function near `window.showKnowledgeMap`:

```js
window.showCalculationQuickReview = function() {
  const programId = getCurrentProgramId();
  document.getElementById('modal-title').innerText = '📘 计算知识总览 / Calculation Quick Review';

  const topics = getCalculationQuickReviewTopics();
  const navHtml = topics.map(topic => `
    <span class="quick-review-nav-chip">${topic.shortLabel}</span>
  `).join('');

  const topicHtml = topics.map(topic => `
    <section class="quick-review-topic">
      <div class="quick-review-topic-head">
        <h3>${topic.title}</h3>
        <p class="quick-review-emphasis">${getCalculationQuickReviewEmphasis(topic, programId)}</p>
      </div>
      <div class="quick-review-grid">
        <div class="quick-review-block">
          <h4>核心规则</h4>
          <ul>${topic.rules.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
        <div class="quick-review-block">
          <h4>计算技巧</h4>
          <ul>${topic.techniques.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
        <div class="quick-review-example">
          <h4>典型例子</h4>
          <div class="quick-review-example-row">${topic.example}</div>
        </div>
        <div class="quick-review-block quick-review-pitfalls">
          <h4>易错提醒</h4>
          <ul>${topic.pitfalls.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
      </div>
    </section>
  `).join('');

  const html = `
    <div class="quick-review-page" data-program="${programId}">
      <div class="quick-review-hero">
        <div class="quick-review-kicker">Calculation Quick Review</div>
        <h2>${CALCULATION_QUICK_REVIEW_PAGE.title}</h2>
        <p>${CALCULATION_QUICK_REVIEW_PAGE.subtitle}</p>
      </div>
      <div class="quick-review-nav">${navHtml}</div>
      <div class="quick-review-topics">${topicHtml}</div>
      <div class="quick-review-footer-pins"></div>
      <div class="modal-btns no-print">
        <button class="modal-btn" onclick="window.printCalculationQuickReview()">🖨️ 打印这页</button>
        <button class="modal-btn confirm" onclick="window.closeReportModal()">关闭</button>
      </div>
    </div>
  `;

  document.getElementById('report-content-area').innerHTML = html;
  document.getElementById('report-modal').style.display = 'block';
};
```

- [ ] **Step 3: Add a bottom “pins” summary builder so the page ends with memory hooks**

Add a helper used by the renderer:

```js
function buildCalculationQuickReviewPins(topics) {
  const seen = new Set();
  const pins = [];
  topics.forEach(topic => {
    (topic.pins || []).forEach(pin => {
      if (!seen.has(pin)) {
        seen.add(pin);
        pins.push(pin);
      }
    });
  });
  return pins.slice(0, 8);
}
```

Update the footer area in `showCalculationQuickReview()` to render those pins:

```js
const pins = buildCalculationQuickReviewPins(topics);
const pinsHtml = pins.map(pin => `<span class="quick-review-pin">${pin}</span>`).join('');
```

- [ ] **Step 4: Add runtime validation for the new entrypoint**

Add checks in `scripts/validate-runtime.mjs`:

```js
if (!html.includes('window.showCalculationQuickReview = function()')) {
  throw new Error('Calculation Quick Review entrypoint is missing from runtime script');
}
if (!html.includes('printCalculationQuickReview')) {
  throw new Error('Calculation Quick Review print action is missing from runtime script');
}
if (!html.includes('📘 计算知识总览 / Quick Review')) {
  throw new Error('Calculation Quick Review control-panel shortcut is missing');
}
```

- [ ] **Step 5: Run validation**

Run: `node scripts/validate-runtime.mjs`  
Expected: exits with code `0`

- [ ] **Step 6: Commit**

```bash
git add index.html scripts/validate-runtime.mjs
git commit -m "feat: add calculation quick review modal entry"
```

---

### Task 3: Apply the approved visual direction and reading hierarchy

**Files:**
- Modify: `index.html`
- Test: `scripts/validate-runtime.mjs`

- [ ] **Step 1: Add dedicated screen styles for the review page**

Add new CSS near the existing report/knowledge styles:

```css
.quick-review-page {
  width: min(980px, 92vw);
  margin: 0 auto;
  background:
    linear-gradient(180deg, rgba(255,255,255,0.98), rgba(250,248,242,0.98)),
    radial-gradient(circle at top right, rgba(15,118,110,0.08), transparent 36%);
  color: #102033;
  font-family: "Avenir Next", "PingFang SC", "Hiragino Sans GB", sans-serif;
}

.quick-review-hero {
  border-bottom: 2px solid #d7e3ea;
  padding: 18px 18px 12px;
}

.quick-review-nav {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  padding: 14px 18px 10px;
}

.quick-review-nav-chip {
  border: 1px solid #bfd4d1;
  background: #f6fbfa;
  border-radius: 999px;
  padding: 6px 10px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
}

.quick-review-topic {
  border-top: 1px solid #dde7ee;
  padding: 14px 18px;
}

.quick-review-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 14px;
}

.quick-review-example-row {
  font-family: "STIX Two Text", "Times New Roman", serif;
  font-size: 18px;
  line-height: 1.5;
}
```

- [ ] **Step 2: Keep the content dense but readable on smaller screens**

Add a responsive rule instead of letting the page collapse awkwardly:

```css
@media (max-width: 780px) {
  .quick-review-nav,
  .quick-review-grid {
    grid-template-columns: 1fr;
  }
  .quick-review-page {
    width: min(94vw, 720px);
  }
}
```

- [ ] **Step 3: Add stage-aware visual cues without turning the page into a dashboard**

Use small text and restrained accents, not data-heavy chips:

```css
.quick-review-emphasis {
  margin: 4px 0 0;
  color: #31586b;
  font-size: 12px;
  line-height: 1.5;
}

.quick-review-page[data-program="elementary_closure_v1"] .quick-review-kicker {
  color: #7c2d12;
}
```

- [ ] **Step 4: Add validation checks for the approved visual shell**

Add checks to `scripts/validate-runtime.mjs`:

```js
if (!html.includes('.quick-review-page')) {
  throw new Error('Calculation Quick Review page styles are missing');
}
if (!html.includes('.quick-review-nav-chip')) {
  throw new Error('Calculation Quick Review navigation chips are missing');
}
if (!html.includes('.quick-review-example-row')) {
  throw new Error('Calculation Quick Review example row styles are missing');
}
```

- [ ] **Step 5: Run validation**

Run: `node scripts/validate-runtime.mjs`  
Expected: exits with code `0`

- [ ] **Step 6: Commit**

```bash
git add index.html scripts/validate-runtime.mjs
git commit -m "feat: style calculation quick review page"
```

---

### Task 4: Add print-ready behavior and stable review-page printing

**Files:**
- Modify: `index.html`
- Test: `scripts/validate-runtime.mjs`

- [ ] **Step 1: Add a dedicated print entry for the review page**

Add a new function close to the existing print helpers:

```js
window.printCalculationQuickReview = function() {
  const modal = document.querySelector('#report-content-area .quick-review-page');
  if (!modal) return;
  const root = ensurePrintRoot();
  root.innerHTML = `
    <div class="quick-review-print-shell">
      ${modal.outerHTML}
    </div>
  `;
  document.body.classList.add('print-quick-review', 'print-sandbox-active');
  window.print();
  armPrintCleanup();
};
```

If the existing print helpers do not expose `ensurePrintRoot()` / `armPrintCleanup()`, factor out the equivalent reusable logic from the current question/answer print flow instead of duplicating one-off cleanup code.

- [ ] **Step 2: Add print CSS that compresses the page into one to two A4 pages**

Add print-specific CSS inside the existing `@media print` block:

```css
body.print-quick-review #print-root .quick-review-page {
  width: 210mm;
  margin: 0 auto;
  padding: 0;
  box-shadow: none;
  background: #fff !important;
  color: #111 !important;
}

body.print-quick-review #print-root .quick-review-topic {
  break-inside: avoid;
  page-break-inside: avoid;
  padding: 10px 12px;
}

body.print-quick-review #print-root .quick-review-nav {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;
}
```

- [ ] **Step 3: Hide non-print controls inside the rendered page**

Ensure the review page’s internal modal button row stays out of print:

```css
body.print-quick-review #print-root .modal-btns {
  display: none !important;
}
```

- [ ] **Step 4: Extend runtime validation with print checks**

Add assertions:

```js
if (!html.includes('window.printCalculationQuickReview = function()')) {
  throw new Error('Calculation Quick Review print function is missing');
}
if (!html.includes('print-quick-review')) {
  throw new Error('Calculation Quick Review print mode styles are missing');
}
if (!html.includes('quick-review-print-shell')) {
  throw new Error('Calculation Quick Review print shell is missing');
}
```

- [ ] **Step 5: Run validation**

Run: `node scripts/validate-runtime.mjs`  
Expected: exits with code `0`

- [ ] **Step 6: Commit**

```bash
git add index.html scripts/validate-runtime.mjs
git commit -m "feat: add calculation quick review print layout"
```

---

### Task 5: Add stage-aware recommendations and teacher-side relevance hooks

**Files:**
- Modify: `index.html`
- Test: `scripts/validate-runtime.mjs`

- [ ] **Step 1: Add a lightweight recommendation helper that does not destabilize the main content**

Use existing signals, but keep the main knowledge page stable:

```js
function getCalculationQuickReviewRecommendations(programId) {
  if (programId === 'elementary_closure_v1') {
    return [
      '这阶段更值得多看：互化与比较',
      '这阶段更值得多看：单位、比率与结果判断'
    ];
  }
  return [
    '这阶段更值得多看：竖式乘除与小数点',
    '这阶段更值得多看：方程逆运算和基础分数规则'
  ];
}
```

- [ ] **Step 2: Render the recommendations in a restrained header strip**

Inside `showCalculationQuickReview()`, add:

```js
const recommendations = getCalculationQuickReviewRecommendations(programId);
const recommendationHtml = recommendations.map(item => `
  <span class="quick-review-recommendation">${item}</span>
`).join('');
```

Render them directly below the subtitle, not scattered throughout the page.

- [ ] **Step 3: Keep the feature cross-stage but avoid cross-stage fragmentation**

Do not fork the topic registry by stage. Only vary:

- emphasis copy
- recommendation strip
- possibly one short stage note in the hero

Do **not** create separate `Advanced` and `Closure` page bodies in v1.

- [ ] **Step 4: Add validation checks for the recommendation strip**

Add:

```js
if (!html.includes('function getCalculationQuickReviewRecommendations')) {
  throw new Error('Calculation Quick Review recommendation helper is missing');
}
if (!html.includes('.quick-review-recommendation')) {
  throw new Error('Calculation Quick Review recommendation strip styles are missing');
}
```

- [ ] **Step 5: Run validation**

Run: `node scripts/validate-runtime.mjs`  
Expected: exits with code `0`

- [ ] **Step 6: Commit**

```bash
git add index.html scripts/validate-runtime.mjs
git commit -m "feat: add stage-aware quick review recommendations"
```

---

### Task 6: Update docs, release notes, and verification guidance

**Files:**
- Modify: `README.md`
- Modify: `docs/README.md`
- Modify: `scripts/validate-runtime.mjs`

- [ ] **Step 1: Add a top-level release note to `README.md`**

Insert a concise feature note near the top:

```md
## 计算知识总览页功能上线

- 新增 `计算知识总览 / Quick Review` 入口
- 面向小朋友快速回想关键计算规则、技巧、例子和易错提醒
- 结构采用“总览 + 分专题展开”
- 屏幕阅读和 A4 打印都做了专门排版
```

- [ ] **Step 2: Add the implementation-plan link to `docs/README.md`**

Append:

```md
- [2026-04-19-calculation-quick-review-implementation-plan.md](./superpowers/plans/2026-04-19-calculation-quick-review-implementation-plan.md) · “计算知识总览页”实施计划，面向小朋友快速复习与打印讲义场景
```

- [ ] **Step 3: Add a manual verification checklist comment block to the plan consumer workflow**

Do not add a new runtime script. Instead, add a short checklist section to `README.md` or the release note:

```md
手动验收建议：
- 打开 `计算知识总览`
- 检查 8 个专题是否完整出现
- 切换第一阶段 / 第二阶段，确认只变强调句，不变主内容
- 点击打印，确认 1 到 2 页内可读、无控制按钮残留
```

- [ ] **Step 4: Run the project verification commands**

Run: `node --check /tmp/minichallenge-module-check.js`  
Expected: exits with code `0`

Run: `node scripts/validate-runtime.mjs`  
Expected: exits with code `0`

If the module-check extraction helper is not already in use for the branch, use the same extraction approach currently used in the project’s existing verification workflow instead of inventing a new checker.

- [ ] **Step 5: Commit**

```bash
git add README.md docs/README.md scripts/validate-runtime.mjs
git commit -m "docs: document calculation quick review rollout"
```

---

## Self-Review

### Spec coverage

- New child-facing review page: covered by Tasks 1 and 2
- High-value, non-encyclopedic content structure: covered by Task 1
- “Overview + expanded topics” layout: covered by Tasks 2 and 3
- Frontend-design-driven visual quality: covered by Task 3
- Fast printing: covered by Task 4
- Cross-stage but stable content: covered by Task 5
- Docs and verification: covered by Task 6

No spec requirement is intentionally left without a task.

### Placeholder scan

- No `TODO`, `TBD`, or “implement later” placeholders remain
- Every task includes exact file paths
- Every task includes exact commands for verification
- All commits have concrete commit messages

### Type consistency

Planned runtime names are consistent across tasks:

- `CALCULATION_QUICK_REVIEW_TOPICS`
- `CALCULATION_QUICK_REVIEW_PAGE`
- `showCalculationQuickReview`
- `printCalculationQuickReview`
- `getCalculationQuickReviewRecommendations`

---

Plan complete and saved to `docs/superpowers/plans/2026-04-19-calculation-quick-review-implementation-plan.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
