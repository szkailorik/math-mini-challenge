import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const match = html.match(/<script type="module">([\s\S]*?)<\/script>/);
if (!match) {
  throw new Error('Cannot find module script in index.html');
}
if (!html.includes('id="print-root"')) {
  throw new Error('Dedicated print sandbox root is missing from HTML');
}
if (!html.includes('body.print-sandbox-active > *:not(#print-root)')) {
  throw new Error('Print CSS is missing sandbox isolation for the print root');
}
if (!html.includes('const PRINT_ROOT_ID = \'print-root\';')) {
  throw new Error('Print sandbox constant is missing from runtime script');
}
if (!html.includes('const TRAINING_PROGRAMS = {')) {
  throw new Error('Program registry is missing from runtime script');
}
if (!html.includes('id="program-selector"')) {
  throw new Error('Program selector is missing from control panel');
}
if (!html.includes('id="stage-status-card"')) {
  throw new Error('Stage status card is missing from control panel');
}
if (!html.includes('id="cache-repair-status"')) {
  throw new Error('Cache repair status is missing from control panel');
}
if (!html.includes('window.checkCurrentSetDuplicates')) {
  throw new Error('Manual duplicate-question checker is missing from runtime script');
}
if (!html.includes('检查重复题')) {
  throw new Error('Manual duplicate-question checker is missing from control panel');
}
if (!html.includes('function getErrorBookPracticePolicy')) {
  throw new Error('Phase-aware error-book practice policy is missing from runtime script');
}
if (!html.includes('window.printErrorBookPractice')) {
  throw new Error('Full error-book targeted practice printer is missing from runtime script');
}
if (!html.includes('buildErrorBookPracticePrintHTML')) {
  throw new Error('Error-book targeted practice print builder is missing from runtime script');
}
if (!html.includes('window.openErrorBookPracticeReview') || !html.includes('window.submitErrorBookPractice')) {
  throw new Error('Error-book targeted practice grading workflow is missing from runtime script');
}
if (!html.includes('saveErrorBookPractice')) {
  throw new Error('Error-book targeted practice persistence is missing from storage layer');
}
if (!html.includes("content: '复'") || !html.includes('followup-review-log')) {
  throw new Error('Black-and-white review markers are missing from review/print styles');
}
if (!html.includes('MathEngine_SetCounters')) {
  throw new Error('Program-aware set counter storage key is missing from runtime script');
}
if (!html.includes('MathEngine_PromotionState')) {
  throw new Error('Promotion state storage key is missing from runtime script');
}
if (!html.includes('function beautifyMathHTML')) {
  throw new Error('Math beautification helper is missing from runtime script');
}
if (!html.includes('function normalizeQuestionPrompt')) {
  throw new Error('Question prompt normalization helper is missing from runtime script');
}
if (!html.includes('function normalizeErrorPrompt')) {
  throw new Error('Error prompt normalization helper is missing from runtime script');
}
if (!html.includes('function getQualityFamilyForTag')) {
  throw new Error('Quality family helper is missing from runtime script');
}
if (!html.includes('function getErrorMechanismKey')) {
  throw new Error('Error mechanism helper is missing from runtime script');
}
if (!html.includes('function getReplayLevel')) {
  throw new Error('Replay level helper is missing from runtime script');
}
if (!html.includes('function getSetReviewFollowupFamily')) {
  throw new Error('Set Review follow-up family helper is missing from runtime script');
}
if (!html.includes('function buildSetReviewFollowupCandidates')) {
  throw new Error('Set Review follow-up candidate helper is missing from runtime script');
}
if (!html.includes('function buildSetReviewFollowupTargets')) {
  throw new Error('Set Review follow-up target helper is missing from runtime script');
}
if (!html.includes('function buildSetReviewVariantQuestion')) {
  throw new Error('Set Review follow-up variant dispatcher is missing from runtime script');
}
if (!html.includes('function buildSetReviewFollowupItems')) {
  throw new Error('Set Review follow-up item builder is missing from runtime script');
}
if (!html.includes('function buildSetReviewFollowupGroups')) {
  throw new Error('Set Review follow-up grouping helper is missing from runtime script');
}
if (!html.includes('function getSetReviewFollowupItemShape')) {
  throw new Error('Set Review follow-up item-shape helper is missing from runtime script');
}
if (!html.includes('function getSetReviewFollowupItemDensity')) {
  throw new Error('Set Review follow-up item-density helper is missing from runtime script');
}
if (!html.includes('function getSetReviewFollowupPrintPack')) {
  throw new Error('Set Review follow-up print-pack helper is missing from runtime script');
}
if (!html.includes('function buildSetReviewFollowupHTML')) {
  throw new Error('Set Review follow-up renderer is missing from runtime script');
}
if (!html.includes('function buildSetReviewFollowupAnswerHTML')) {
  throw new Error('Set Review follow-up answer renderer is missing from runtime script');
}
if (!html.includes('function buildSetReviewFollowupPrintHTML')) {
  throw new Error('Set Review follow-up print shell is missing from runtime script');
}
if (!html.includes('window.printSetReviewFollowup = function(')) {
  throw new Error('Set Review follow-up print entrypoint is missing from runtime script');
}
if (!html.includes('set-review-followup')) {
  throw new Error('Set Review follow-up styles or markup are missing from runtime script');
}
if (!html.includes('followup-group')) {
  throw new Error('Set Review follow-up grouped layout is missing from runtime script');
}
if (!html.includes('set-review-followup-overview')) {
  throw new Error('Set Review follow-up overview summary block is missing from runtime script');
}
if (!html.includes("complex_mixed: '复杂混合'")) {
  throw new Error('Set Review follow-up complex mixed label is missing from runtime script');
}
if (!html.includes('function buildSetReviewComplexMixedVariant')) {
  throw new Error('Set Review follow-up complex mixed builder is missing from runtime script');
}
if (!html.includes("/^(c2_mix_|k_oly_|l_bmix_)/")) {
  throw new Error('Complex mixed quality-family routing no longer covers k_oly_ / l_bmix_ tags');
}
if (html.includes('请再做一道同类练习，并特别注意刚才容易错的步骤。')) {
  throw new Error('Set Review follow-up still contains the old non-concrete generic prompt');
}
if (!html.includes('const CALCULATION_QUICK_REVIEW_TOPICS = [')) {
  throw new Error('Calculation Quick Review topic registry is missing from runtime script');
}
if (!html.includes('function getCalculationQuickReviewTopics')) {
  throw new Error('Calculation Quick Review topic helper is missing from runtime script');
}
if (!html.includes('function getCalculationQuickReviewEmphasis')) {
  throw new Error('Calculation Quick Review emphasis helper is missing from runtime script');
}
if (!html.includes('function getCalculationQuickReviewRecommendations')) {
  throw new Error('Calculation Quick Review recommendation helper is missing from runtime script');
}
if (!html.includes('function getCalculationQuickReviewRecommendationTopics')) {
  throw new Error('Calculation Quick Review recommendation-topic helper is missing from runtime script');
}
if (!html.includes('window.jumpToQuickReviewTopic = jumpToQuickReviewTopic;')) {
  throw new Error('Calculation Quick Review topic jump helper is missing from runtime script');
}
if (!html.includes('window.showCalculationQuickReview = function()')) {
  throw new Error('Calculation Quick Review entrypoint is missing from runtime script');
}
if (!html.includes('window.printCalculationQuickReview = function()')) {
  throw new Error('Calculation Quick Review print function is missing from runtime script');
}
if (!html.includes('window.showCalculationQuickReview()') && !html.includes("window.showCalculationQuickReview()")) {
  throw new Error('Calculation Quick Review control-panel shortcut is missing its action binding');
}
if (!html.includes('📘 计算知识总览 / Quick Review') && !html.includes('📘 计算总览')) {
  throw new Error('Calculation Quick Review control-panel shortcut is missing');
}
if (!html.includes('.math-op') || !html.includes('.math-eq') || !html.includes('.math-compare')) {
  throw new Error('Math typography classes are missing from CSS');
}
if (!html.includes('.quick-review-page') || !html.includes('.quick-review-nav-chip') || !html.includes('.quick-review-example-row') || !html.includes('.quick-review-focus-strip') || !html.includes('.quick-review-hook') || !html.includes('.quick-review-flow') || !html.includes('.quick-review-support-grid')) {
  throw new Error('Calculation Quick Review visual shell is missing from CSS');
}
if (!html.includes('print-quick-review') || !html.includes('quick-review-print-shell')) {
  throw new Error('Calculation Quick Review print styles are missing');
}
if (html.includes('<span>...</span><span class="bottom">...</span>')) {
  throw new Error('Pedagogical placeholder fraction step should not remain in HTML');
}
const cachePrefix = html.match(/const SET_CACHE_PREFIX = '([^']+)'/)?.[1] || 'MathSetData_v40';

function getProgramCacheKey(programId, setNumber) {
  return `${cachePrefix}_${programId}_${setNumber}`;
}

const store = new Map();
const localStorage = {
  getItem(key) {
    return store.has(key) ? store.get(key) : null;
  },
  setItem(key, value) {
    store.set(String(key), String(value));
  },
  removeItem(key) {
    store.delete(key);
  },
};

const elements = new Map();
function extractQuestionSheets() {
  const paper = elements.get('paper-container')?.innerHTML || '';
  const starts = [...paper.matchAll(/<div class="sheet question-sheet/g)].map(match => match.index);
  const answerStart = paper.indexOf('<div class="sheet ans-sheet"');
  if (answerStart === -1 || starts.length === 0) return [];
  starts.push(answerStart);
  const sheets = [];
  for (let i = 0; i < starts.length - 1; i += 1) {
    sheets.push(paper.slice(starts[i], starts[i + 1]));
  }
  return sheets;
}
function makeElement(id) {
  const classNames = new Set();
  return {
    id,
    style: {},
    dataset: {},
    disabled: false,
    innerHTML: '',
    innerText: '',
    textContent: '',
    classList: {
      add(...names) {
        names.forEach(name => classNames.add(name));
      },
      remove(...names) {
        names.forEach(name => classNames.delete(name));
      },
      contains(name) {
        return classNames.has(name);
      },
      toString() {
        return [...classNames].join(' ');
      },
    },
    setAttribute() {},
    getAttribute() { return null; },
    closest() { return null; },
    querySelectorAll() { return []; },
    querySelector() { return null; },
    appendChild() {},
    removeChild() {},
    click() {},
  };
}

const listeners = new Map();
function addListener(type, handler) {
  if (!listeners.has(type)) listeners.set(type, new Set());
  listeners.get(type).add(handler);
}
function removeListener(type, handler) {
  listeners.get(type)?.delete(handler);
}
function emit(type, event = {}) {
  for (const handler of listeners.get(type) || []) {
    handler(event);
  }
}

const document = {
  body: makeElement('body'),
  createElement(tag) {
    return makeElement(tag);
  },
  getElementById(id) {
    if (!elements.has(id)) elements.set(id, makeElement(id));
    return elements.get(id);
  },
  querySelector() {
    return null;
  },
  querySelectorAll(selector) {
    if (selector === '.sheet.question-sheet') {
      return extractQuestionSheets().map(outerHTML => ({ outerHTML }));
    }
    if (selector === '.sheet.ans-sheet') {
      const paper = elements.get('paper-container')?.innerHTML || '';
      return Array.from({ length: (paper.match(/class="sheet ans-sheet/g) || []).length }, () => ({
        outerHTML: '<div class="sheet ans-sheet"></div>',
      }));
    }
    return [];
  },
};

const context = {
  console,
  setTimeout,
  clearTimeout,
  requestAnimationFrame(callback) {
    return setTimeout(callback, 0);
  },
  cancelAnimationFrame(handle) {
    clearTimeout(handle);
  },
  Math,
  Date,
  Number,
  String,
  Boolean,
  Object,
  Array,
  JSON,
  Map,
  Set,
  Blob,
  URL,
  encodeURIComponent,
  decodeURIComponent,
  localStorage,
  document,
  navigator: { userAgent: 'math-mini-challenge-validator' },
  addEventListener: addListener,
  removeEventListener: removeListener,
  matchMedia() {
    return {
      matches: false,
      addEventListener(type, handler) {
        addListener(`media:${type}`, handler);
      },
      removeEventListener(type, handler) {
        removeListener(`media:${type}`, handler);
      },
    };
  },
  print() {
    context.__printCalls = (context.__printCalls || 0) + 1;
  },
  alert(message) {
    throw new Error(`Unexpected alert: ${message}`);
  },
  confirm() {
    return true;
  },
  fetch() {
    throw new Error('Network should not be used in runtime validation');
  },
  scrollTo() {},
};
context.window = context;

vm.createContext(context);
vm.runInContext(match[1], context, { filename: 'index.html' });

await new Promise(resolve => setTimeout(resolve, 25));

const programSelector = elements.get('program-selector');
const programTitleLabel = elements.get('program-title-label');
const stageStatusTitle = elements.get('stage-status-title');
const stageStatusInsights = elements.get('stage-status-insights');
if (!programSelector) {
  throw new Error('Program selector element was not initialized');
}
if (programSelector.value !== 'advanced_fluency_v1') {
  throw new Error(`Expected default program to be advanced_fluency_v1, got ${programSelector.value || '(empty)'}`);
}
if (!String(programTitleLabel?.textContent || '').includes('Mini Challenge Advanced')) {
  throw new Error('Program shell did not render the advanced program label');
}
if (!String(stageStatusTitle?.textContent || '').includes('第一阶段')) {
  throw new Error('Stage status card did not render first-stage status text');
}
if (elements.has('stage-status-action') || elements.has('stage-status-body') || elements.has('program-desc-label')) {
  throw new Error('Floating control panel still renders retired long-form stage guidance blocks');
}
if (!String(stageStatusInsights?.innerHTML || '').includes('stage-insight')) {
  throw new Error('Stage status card did not render compact insight pills');
}
if (typeof context.showCalculationQuickReview !== 'function') {
  throw new Error('Calculation Quick Review entrypoint was not exposed on window');
}
context.showCalculationQuickReview();
const reviewModalHtml = String(elements.get('report-content-area')?.innerHTML || '');
const reviewModalTitle = String(elements.get('modal-title')?.innerText || '');
const reviewModalContent = elements.get('report-modal-content');
if (!reviewModalTitle.includes('计算知识总览')) {
  throw new Error('Calculation Quick Review did not update the modal title');
}
if (!reviewModalHtml.includes('quick-review-page') || !reviewModalHtml.includes('整数四则与简算')) {
  throw new Error('Calculation Quick Review did not render the expected page shell or topic content');
}
if (!reviewModalHtml.includes('当前优先看：')) {
  throw new Error('Calculation Quick Review recommendations did not render');
}
if (!reviewModalHtml.includes('今日先看 01') || (!reviewModalHtml.includes('直达这个专题') && !reviewModalHtml.includes('>直达<'))) {
  throw new Error('Calculation Quick Review focus cards or jump shortcuts did not render');
}
if (!reviewModalHtml.includes('先记住')) {
  throw new Error('Calculation Quick Review memory-hook copy did not render');
}
if (!reviewModalHtml.includes('最容易错')) {
  throw new Error('Calculation Quick Review top-mistake copy did not render');
}
if (!reviewModalHtml.includes('先做这一步')) {
  throw new Error('Calculation Quick Review first-move copy did not render');
}
if (!reviewModalHtml.includes('最后检查')) {
  throw new Error('Calculation Quick Review final-check copy did not render');
}
if (!reviewModalHtml.includes('典型例子') || !reviewModalHtml.includes('补充速查') || !reviewModalHtml.includes('回想顺序')) {
  throw new Error('Calculation Quick Review topic blocks are incomplete');
}
if (!reviewModalContent?.classList?.contains('quick-review-modal')) {
  throw new Error('Calculation Quick Review did not switch the modal into quick-review layout mode');
}
if (typeof context.jumpToQuickReviewTopic !== 'function') {
  throw new Error('Calculation Quick Review topic jump helper was not exposed on window');
}
context.printCalculationQuickReview();
await new Promise(resolve => setTimeout(resolve, 260));
if ((context.__printCalls || 0) < 1) {
  throw new Error('Calculation Quick Review print function did not call window.print');
}
const quickReviewPrintRootHtml = String(elements.get('print-root')?.innerHTML || '');
if (!quickReviewPrintRootHtml.includes('quick-review-print-shell') || !quickReviewPrintRootHtml.includes('quick-review-page')) {
  throw new Error('Calculation Quick Review print sandbox did not receive the review page content');
}
context.closeReportModal();
if (reviewModalContent?.classList?.contains('quick-review-modal')) {
  throw new Error('Closing the report modal should clear quick-review layout mode');
}
context.__printCalls = 0;

const normalizedInlineMath = context.beautifyMathHTML('<div class="frac"><span>1</span><span class="bottom">2</span></div> &plus; <div class="blank"></div>');
if (!normalizedInlineMath.includes('<span class="frac">') || normalizedInlineMath.includes('<div class="frac">')) {
  throw new Error('Fraction markup is not normalized into inline-safe span elements');
}
if (!normalizedInlineMath.includes('<span class="blank math-inline-blank"></span>')) {
  throw new Error('Answer blank markup is not normalized into inline answer-slot elements');
}

if (typeof context.normalizeQuestionPrompt !== 'function') {
  throw new Error('normalizeQuestionPrompt was not exposed on window for validation');
}

const fractionPrompt = context.normalizeQuestionPrompt(
  '<div class="frac"><span>3</span><span class="bottom">4</span></div> &times; <span class="paren-l"></span><div class="frac"><span>1</span><span class="bottom">2</span></div> + <div class="frac"><span>1</span><span class="bottom">8</span></div><span class="paren-r"></span> = ',
  'h-frac',
);
if (fractionPrompt.bodyHtml.includes('math-eq')) {
  throw new Error('Trailing equals should be removed from question body before inline answer rendering');
}
if (!fractionPrompt.bodyHtml.includes('math-paren-group')) {
  throw new Error('Parenthesized fraction groups are not normalized into a stable inline wrapper');
}
if (!fractionPrompt.suffixHtml.includes('math-eq') || !fractionPrompt.suffixHtml.includes('math-write-gap')) {
  throw new Error('Inline answer rendering is missing the expected equals and write-gap markup');
}

const fractionNoEqualsPrompt = context.normalizeQuestionPrompt(
  '<div class="frac"><span>2</span><span class="bottom">9</span></div> &times; <div class="frac"><span>1</span><span class="bottom">2</span></div> &divide; <div class="frac"><span>1</span><span class="bottom">2</span></div>',
  'h-frac',
);
if (!fractionNoEqualsPrompt?.suffixHtml.includes('math-eq')) {
  throw new Error('Fraction computation prompts without an explicit trailing equals should still receive an inline answer suffix');
}

const comparisonPrompt = context.normalizeQuestionPrompt(
  '<div class="frac"><span>4</span><span class="bottom">5</span></div><span class="circle-blank"></span>0.8',
  'h-conv',
);
if (comparisonPrompt?.suffixHtml) {
  throw new Error('Comparison prompts with circle blanks should not receive an inline answer suffix');
}

const blankTailPrompt = context.normalizeQuestionPrompt(
  '<div class="frac"><span>9</span><span class="bottom">25</span></div> =<div class="blank"></div>%',
  'h-conv',
);
if (blankTailPrompt.bodyHtml.includes('math-inline-blank')) {
  throw new Error('Inline blank equations should not keep the old blank inside the question body');
}
if (!blankTailPrompt.suffixHtml.includes('math-write-gap') || !blankTailPrompt.suffixHtml.includes('%')) {
  throw new Error('Inline blank equations with unit suffix should keep their suffix in the inline answer suffix');
}

const equationPrompt = context.normalizeQuestionPrompt('3<i class="var">x</i> + 5 = 11', 'h-frac');
if (equationPrompt?.suffixHtml) {
  throw new Error('Internal equations should not receive a second inline answer suffix');
}

function assertPaper(setNumber) {
  const paper = elements.get('paper-container')?.innerHTML || '';
  const setDisplay = String(elements.get('set-num-display')?.innerText || '');
  const sheetCount = (paper.match(/class="sheet/g) || []).length;
  const questionSheetCount = (paper.match(/question-sheet/g) || []).length;

  if (setDisplay !== String(setNumber)) {
    throw new Error(`Expected set ${setNumber}, got ${setDisplay || '(empty)'}`);
  }
  if (sheetCount < 6) {
    throw new Error(`Expected at least 6 sheets for set ${setNumber}, got ${sheetCount}`);
  }
  if (questionSheetCount !== 4 || !paper.includes('print-last-question')) {
    throw new Error(`Expected exactly 4 printable question sheets for set ${setNumber}, got ${questionSheetCount}`);
  }
  if (!paper.includes('Mini Challenge Advanced') || !paper.includes('Detailed Solutions')) {
    throw new Error(`Generated paper for set ${setNumber} is missing challenge or answer sections`);
  }
  const questionOnly = paper.split('class="sheet ans-sheet"')[0] || paper;
  if (questionOnly.includes('focus-strip') || questionOnly.includes('engine-status')) {
    throw new Error(`Generated question paper for set ${setNumber} still includes training-status chrome`);
  }
  if (!questionOnly.includes('math-op') || !questionOnly.includes('math-eq')) {
    throw new Error(`Generated question paper for set ${setNumber} is missing normalized math typography markup`);
  }
  if (questionOnly.includes('level-badge')) {
    throw new Error(`Generated question paper for set ${setNumber} still includes level badges`);
  }
  if (paper.includes('undefined')) {
    throw new Error(`Generated paper for set ${setNumber} contains undefined`);
  }
  assertSetData(setNumber, 'advanced_fluency_v1');
  return sheetCount;
}

function assertClosurePaper(setNumber) {
  const paper = elements.get('paper-container')?.innerHTML || '';
  const questionSheetCount = (paper.match(/question-sheet/g) || []).length;
  const answerSheetCount = (paper.match(/class="sheet ans-sheet/g) || []).length;
  const closureQuestionOnly = paper.split('class="sheet ans-sheet"')[0] || paper;

  if (questionSheetCount !== 4) {
    throw new Error(`Expected exactly 4 closure question sheets for set ${setNumber}, got ${questionSheetCount}`);
  }
  if (answerSheetCount !== 2) {
    throw new Error(`Expected exactly 2 closure answer sheets for set ${setNumber}, got ${answerSheetCount}`);
  }
  if (!paper.includes('Mini Challenge Closure')) {
    throw new Error(`Closure paper for set ${setNumber} is missing the closure title`);
  }
  if (!paper.includes('收束') || !paper.includes('保温')) {
    throw new Error(`Closure paper for set ${setNumber} is missing closure or maintenance guidance`);
  }
  if (!paper.includes('第二阶段') || !paper.includes('写入第二阶段独立画像')) {
    throw new Error(`Closure answer sheet for set ${setNumber} is missing active grading messaging`);
  }
  if (!closureQuestionOnly.includes('综合') && !closureQuestionOnly.includes('桥接')) {
    throw new Error(`Closure question paper for set ${setNumber} is missing integrated-training section framing`);
  }
  assertSetData(setNumber, 'elementary_closure_v1');
}

function assertClosurePhase(setNumber, expectedLabel, expectedCue) {
  const paper = elements.get('paper-container')?.innerHTML || '';
  const raw = store.get(getProgramCacheKey('elementary_closure_v1', setNumber)) || '{}';
  const data = JSON.parse(raw);
  if (data.phaseLabel !== expectedLabel) {
    throw new Error(`Closure set ${setNumber} expected phaseLabel ${expectedLabel}, got ${data.phaseLabel || '(missing)'}`);
  }
  if (!paper.includes(expectedLabel)) {
    throw new Error(`Closure paper for set ${setNumber} is missing expected phase label ${expectedLabel}`);
  }
  if (!paper.includes(expectedCue)) {
    throw new Error(`Closure paper for set ${setNumber} is missing expected phase cue ${expectedCue}`);
  }
}

function stripHtml(value) {
  return String(value || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function getQuestionFingerprint(value) {
  if (typeof context.window.computeQuestionFingerprint === 'function') {
    return context.window.computeQuestionFingerprint(value);
  }
  return stripHtml(value).replace(/\s+/g, '').toLowerCase();
}

function assertNoQuestionFingerprintDuplicates(data, label) {
  const seen = new Map();
  Object.entries(data || {}).forEach(([section, items]) => {
    if (!Array.isArray(items)) return;
    items.forEach((item, index) => {
      const signature = getQuestionFingerprint(item?.q);
      if (!signature) return;
      const location = `${label} ${section}[${index}]`;
      if (seen.has(signature)) {
        throw new Error(`${location} duplicates ${seen.get(signature)} with ${stripHtml(item.q)}`);
      }
      seen.set(signature, location);
    });
  });
}

function extractDivisionParts(question) {
  const parts = String(question || '').split('&divide;');
  return {
    dividend: stripHtml(parts[0] || ''),
    divisor: stripHtml(parts[1] || ''),
  };
}

function decimalPlacesFromText(value) {
  const match = String(value || '').trim().match(/^-?\d+(?:\.(\d+))?$/);
  return match?.[1]?.length || 0;
}

function assertClosureFocusCoverage(tags, focusMeta, studentKey, setNumber) {
  const field = focusMeta?.field || 'legacyMix';
  if (field === 'legacyMix') {
    if (!tags.has('c2_est_product') || !tags.has('c2_speed_mix')) {
      throw new Error(`Closure set ${setNumber} is missing legacy mixed coverage for ${studentKey}`);
    }
    return;
  }
  if (field === 'representationGap') {
    if (!tags.has('c2_bridge_pct_frac') || !tags.has('c2_bridge_ratio_frac')) {
      throw new Error(`Closure set ${setNumber} is missing representation focus coverage for ${studentKey}`);
    }
    return;
  }
  if (field === 'methodGap') {
    const hasUnit = [...tags].some(tag => ['c2_unit_length', 'c2_unit_mass'].includes(tag));
    const hasModel = [...tags].some(tag => ['c2_rate_discount', 'c2_eq_percent'].includes(tag));
    if (!hasUnit || !hasModel) {
      throw new Error(`Closure set ${setNumber} is missing method focus coverage for ${studentKey}`);
    }
    return;
  }
  if (field === 'stabilityGap') {
    const prefix = studentKey === 'KAI' ? ['k_ddiv_', 'k_dmul_', 'k_sub_'] : ['l_div_', 'l_mul_', 'l_sub_'];
    const hasRequired = prefix.every(base => [...tags].some(tag => String(tag || '').startsWith(base)));
    if (!hasRequired) {
      throw new Error(`Closure set ${setNumber} is missing stability focus coverage for ${studentKey}`);
    }
    return;
  }
  if (field === 'speedGap') {
    if (!tags.has('c2_speed_mix')) {
      throw new Error(`Closure set ${setNumber} is missing speed focus coverage for ${studentKey}`);
    }
    return;
  }
  if (field === 'validationGap') {
    if (!tags.has('c2_est_product')) {
      throw new Error(`Closure set ${setNumber} is missing validation focus coverage for ${studentKey}`);
    }
    return;
  }
  throw new Error(`Closure set ${setNumber} has unknown focus field ${field} for ${studentKey}`);
}

function assertSetData(setNumber, programId = 'advanced_fluency_v1') {
  const raw = store.get(getProgramCacheKey(programId, setNumber)) || (
    programId === 'advanced_fluency_v1' ? store.get(`${cachePrefix}_${setNumber}`) : null
  );
  if (!raw) throw new Error(`Missing cached set data for set ${setNumber}`);
  const data = JSON.parse(raw);
  const expectedCounts = {
    k_m: 4, k_d: 4, k_s: 4, k_c: 8, k_f: 12, k_o: 4,
    l_m: 4, l_d: 4, l_s: 4, l_c: 8, l_f: 12, l_o: 4,
  };
  const seen = new Map();
  const getKnowledgeTip = context.window.getKnowledgeTip;
  const getKnowledgeDomain = context.window.getKnowledgeDomain;
  const fallbackName = context.window.FallbackAdvice?.name;
  if (programId === 'elementary_closure_v1') {
    const expectedClosureCounts = {
      c_k_keep: 8,
      c_k_bridge: 6,
      c_k_mix: 4,
      c_k_unit: 8,
      c_k_focus: 4,
      c_l_keep: 8,
      c_l_bridge: 6,
      c_l_mix: 4,
      c_l_unit: 8,
      c_l_focus: 4,
    };
    const closureSections = Object.keys(expectedClosureCounts);
    const kKeepTags = new Set((data.c_k_keep || []).map(item => item?.tag));
    const kBridgeTags = new Set((data.c_k_bridge || []).map(item => item?.tag));
    const kMixTags = new Set((data.c_k_mix || []).map(item => item?.tag));
    const kUnitTags = new Set((data.c_k_unit || []).map(item => item?.tag));
    const kFocusTags = new Set((data.c_k_focus || []).map(item => item?.tag));
    const lKeepTags = new Set((data.c_l_keep || []).map(item => item?.tag));
    const lBridgeTags = new Set((data.c_l_bridge || []).map(item => item?.tag));
    const lMixTags = new Set((data.c_l_mix || []).map(item => item?.tag));
    const lUnitTags = new Set((data.c_l_unit || []).map(item => item?.tag));
    const lFocusTags = new Set((data.c_l_focus || []).map(item => item?.tag));

    if (!kBridgeTags.has('c2_bridge_pct_frac') || !kBridgeTags.has('c2_bridge_ratio_frac')) {
      throw new Error(`Closure set ${setNumber} is missing KAI bridge coverage`);
    }
    if (!lBridgeTags.has('c2_bridge_pct_frac') || !lBridgeTags.has('c2_bridge_ratio_frac')) {
      throw new Error(`Closure set ${setNumber} is missing Lorik bridge coverage`);
    }
    if (![...kMixTags].some(tag => String(tag || '').startsWith('c2_mix_'))) {
      throw new Error(`Closure set ${setNumber} is missing KAI complex-mixed coverage`);
    }
    if (![...lMixTags].some(tag => String(tag || '').startsWith('c2_mix_'))) {
      throw new Error(`Closure set ${setNumber} is missing Lorik complex-mixed coverage`);
    }
    if (![...kUnitTags].some(tag => ['c2_unit_length', 'c2_unit_mass'].includes(tag)) || ![...kUnitTags].some(tag => ['c2_rate_discount', 'c2_eq_percent'].includes(tag))) {
      throw new Error(`Closure set ${setNumber} is missing KAI unit/rate/relation coverage`);
    }
    if (![...lUnitTags].some(tag => ['c2_unit_length', 'c2_unit_mass'].includes(tag)) || ![...lUnitTags].some(tag => ['c2_rate_discount', 'c2_eq_percent'].includes(tag))) {
      throw new Error(`Closure set ${setNumber} is missing Lorik unit/rate/relation coverage`);
    }
    assertClosureFocusCoverage(kFocusTags, data.c_k_focusMeta, 'KAI', setNumber);
    assertClosureFocusCoverage(lFocusTags, data.c_l_focusMeta, 'Lorik', setNumber);
    if (![...kKeepTags].some(tag => String(tag || '').startsWith('k_ddiv_')) || ![...kKeepTags].some(tag => String(tag || '').startsWith('k_dmul_')) || ![...kKeepTags].some(tag => String(tag || '').startsWith('k_sub_'))) {
      throw new Error(`Closure set ${setNumber} is missing KAI keep-warm coverage`);
    }
    if (![...lKeepTags].some(tag => String(tag || '').startsWith('l_div_')) || ![...lKeepTags].some(tag => String(tag || '').startsWith('l_mul_')) || ![...lKeepTags].some(tag => String(tag || '').startsWith('l_sub_'))) {
      throw new Error(`Closure set ${setNumber} is missing Lorik keep-warm coverage`);
    }

    const described = context.window.describeClosureSections?.(data);
    if (!described?.c_k_bridge || described.c_k_bridge.role !== 'representation_core') {
      throw new Error(`Closure set ${setNumber} is missing representation-core section metadata`);
    }
    if (!described?.c_k_mix || described.c_k_mix.role !== 'complex_mixed_core') {
      throw new Error(`Closure set ${setNumber} is missing complex-mixed section metadata`);
    }
    if (!described?.c_k_unit || described.c_k_unit.role !== 'unit_rate_bridge') {
      throw new Error(`Closure set ${setNumber} is missing unit-rate section metadata`);
    }
    if (!described?.c_k_focus || described.c_k_focus.role !== 'targeted_focus') {
      throw new Error(`Closure set ${setNumber} is missing focus section metadata`);
    }

    const kaiAClassItems = context.window.flattenPaperSections?.(data, ['c_k_bridge', 'c_k_mix', 'c_k_focus']) || [];
    if (!kaiAClassItems.some(item => item?.trainingAxis === 'representation_core')) {
      throw new Error(`Closure set ${setNumber} is missing daily representation-core training for KAI`);
    }
    if (!kaiAClassItems.some(item => item?.trainingAxis === 'complex_mixed')) {
      throw new Error(`Closure set ${setNumber} is missing daily complex-mixed training for KAI`);
    }
    if (!kaiAClassItems.some(item => item?.trainingAxis === 'number_sense')) {
      throw new Error(`Closure set ${setNumber} is missing daily number-sense training for KAI`);
    }
    const lorikAClassItems = context.window.flattenPaperSections?.(data, ['c_l_bridge', 'c_l_mix', 'c_l_focus']) || [];
    if (!lorikAClassItems.some(item => item?.trainingAxis === 'representation_core')) {
      throw new Error(`Closure set ${setNumber} is missing daily representation-core training for Lorik`);
    }
    if (!lorikAClassItems.some(item => item?.trainingAxis === 'complex_mixed')) {
      throw new Error(`Closure set ${setNumber} is missing daily complex-mixed training for Lorik`);
    }
    if (!lorikAClassItems.some(item => item?.trainingAxis === 'number_sense')) {
      throw new Error(`Closure set ${setNumber} is missing daily number-sense training for Lorik`);
    }

    const emphasis = data.phaseMeta?.trainingEmphasis || {};
    if (setNumber === 1 && emphasis.complexMixed !== 'light') {
      throw new Error(`Closure set ${setNumber} should keep complex-mixed weight light`);
    }
    if (setNumber === 12 && emphasis.complexMixed !== 'high') {
      throw new Error(`Closure set ${setNumber} should raise complex-mixed weight in integration`);
    }
    if (setNumber === 26 && emphasis.complexMixed !== 'full_structure') {
      throw new Error(`Closure set ${setNumber} should use full-structure complex-mixed weight in graduation`);
    }

    const bridgeLaneEmphasis = data.phaseMeta?.bridgeLaneEmphasis || {};
    if (setNumber === 1 && bridgeLaneEmphasis.conversion !== 'high') {
      throw new Error(`Closure set ${setNumber} should still prioritize direct conversion in Section II`);
    }
    if (setNumber === 12 && bridgeLaneEmphasis.choice !== 'high') {
      throw new Error(`Closure set ${setNumber} should raise representation-choice weight in Section II`);
    }
    if (setNumber === 26 && bridgeLaneEmphasis.postUse !== 'high') {
      throw new Error(`Closure set ${setNumber} should keep post-conversion use high in Section II`);
    }

    const validBridgeLanes = new Set(['representation_conversion', 'baseline_comparison', 'representation_choice', 'post_conversion_use']);
    const kBridgeLanes = new Set((data.c_k_bridge || []).map(item => item?.bridgeLane).filter(Boolean));
    const lBridgeLanes = new Set((data.c_l_bridge || []).map(item => item?.bridgeLane).filter(Boolean));
    if (![...kBridgeLanes, ...lBridgeLanes].every(lane => validBridgeLanes.has(lane))) {
      throw new Error(`Closure set ${setNumber} has an invalid Section II bridge-lane tag`);
    }
    if (setNumber === 1) {
      if (!kBridgeLanes.has('representation_conversion') || !lBridgeLanes.has('representation_conversion')) {
        throw new Error(`Closure set ${setNumber} should expose direct-conversion items for both students in Section II`);
      }
      if (!kBridgeLanes.has('baseline_comparison') || !lBridgeLanes.has('baseline_comparison')) {
        throw new Error(`Closure set ${setNumber} should expose baseline-comparison items for both students in Section II`);
      }
    }
    if (setNumber === 12) {
      if (!kBridgeLanes.has('representation_choice') || !lBridgeLanes.has('representation_choice')) {
        throw new Error(`Closure set ${setNumber} should expose representation-choice items for both students in Section II`);
      }
      if (!kBridgeLanes.has('post_conversion_use') || !lBridgeLanes.has('post_conversion_use')) {
        throw new Error(`Closure set ${setNumber} should expose post-conversion-use items for both students in Section II`);
      }
    }
    if (setNumber === 26) {
      const kBoundary = (data.c_k_bridge || []).some(item => item?.bridgeLane === 'post_conversion_use' && /接近|更接近|更方便|更合理|先化成/.test(stripHtml(item?.q || '') + stripHtml(item?.step || '')));
      const lBoundary = (data.c_l_bridge || []).some(item => item?.bridgeLane === 'post_conversion_use' && /接近|更接近|更方便|更合理|先化成/.test(stripHtml(item?.q || '') + stripHtml(item?.step || '')));
      if (!kBoundary || !lBoundary) {
        throw new Error(`Closure set ${setNumber} should expose higher-order bridge judgement prompts for both students`);
      }
    }

    const closureItems = context.window.flattenPaperSections?.(
      data,
      ['c_k_keep', 'c_k_bridge', 'c_k_mix', 'c_k_unit', 'c_k_focus', 'c_l_keep', 'c_l_bridge', 'c_l_mix', 'c_l_unit', 'c_l_focus']
    ) || [];
    const mixLaneEmphasis = data.phaseMeta?.mixLaneEmphasis || {};
    if (setNumber === 1 && mixLaneEmphasis.method !== 'high') {
      throw new Error(`Closure set ${setNumber} should already prioritize method choice in Section III`);
    }
    if (setNumber === 12 && mixLaneEmphasis.execution !== 'high') {
      throw new Error(`Closure set ${setNumber} should raise complex execution weight in Section III`);
    }
    if (setNumber === 26 && mixLaneEmphasis.judgement !== 'high') {
      throw new Error(`Closure set ${setNumber} should raise result-judgement weight in Section III`);
    }

    const validMixLanes = new Set(['structure_recognition', 'method_choice', 'complex_execution', 'result_judgement']);
    const kMixLanes = new Set((data.c_k_mix || []).map(item => item?.mixLane).filter(Boolean));
    const lMixLanes = new Set((data.c_l_mix || []).map(item => item?.mixLane).filter(Boolean));
    if (![...kMixLanes, ...lMixLanes].every(lane => validMixLanes.has(lane))) {
      throw new Error(`Closure set ${setNumber} has an invalid Section III mix-lane tag`);
    }
    if (setNumber === 1) {
      if (!kMixLanes.has('method_choice') || !lMixLanes.has('method_choice')) {
        throw new Error(`Closure set ${setNumber} should expose method-choice items for both students in Section III`);
      }
      if (!kMixLanes.has('structure_recognition') || !lMixLanes.has('structure_recognition')) {
        throw new Error(`Closure set ${setNumber} should expose structure-recognition items for both students in Section III`);
      }
    }
    if (setNumber === 12) {
      if (!kMixLanes.has('complex_execution') || !lMixLanes.has('complex_execution')) {
        throw new Error(`Closure set ${setNumber} should expose complex-execution items for both students in Section III`);
      }
    }
    if (setNumber === 26) {
      if (!kMixLanes.has('result_judgement') || !lMixLanes.has('result_judgement')) {
        throw new Error(`Closure set ${setNumber} should expose result-judgement items for both students in Section III`);
      }
      const kBracketed = (data.c_k_mix || []).some(item => /[\[\{]/.test(stripHtml(item?.q || '')));
      const lBracketed = (data.c_l_mix || []).some(item => /[\[\{]/.test(stripHtml(item?.q || '')));
      if (!kBracketed || !lBracketed) {
        throw new Error(`Closure set ${setNumber} should expose bracket-bearing complex mixed items for both students`);
      }
    }

    for (const [section, expected] of Object.entries(expectedClosureCounts)) {
      const items = data[section];
      if (!Array.isArray(items) || items.length !== expected) {
        throw new Error(`Closure set ${setNumber} section ${section} expected ${expected}, got ${items?.length ?? 'missing'}`);
      }
    }

    closureSections.forEach(section => {
      (data[section] || []).forEach((item, index) => {
        const location = `closure set ${setNumber} ${section}[${index}]`;
        if (!item || !item.tag) throw new Error(`${location} missing tag`);
        const tip = typeof getKnowledgeTip === 'function' ? getKnowledgeTip(item.tag) : null;
        if (!tip || tip.name === fallbackName) missingAdvice.add(item.tag);
        const domain = typeof getKnowledgeDomain === 'function' ? getKnowledgeDomain(item.tag) : null;
        if (!domain) missingDomain.add(item.tag);
        const level = item.level || context.window.inferDifficulty?.(item.tag);
        if (!Number.isInteger(level) || level < 1 || level > 4) {
          throw new Error(`${location} has invalid level ${level}`);
        }
        observedLevels.add(level);
        if (!stripHtml(item.q)) throw new Error(`${location} missing question`);
        if (!stripHtml(item.a)) throw new Error(`${location} missing answer`);
        const combined = `${item.q} ${item.a} ${item.step || ''}`;
        if (/undefined|NaN|Infinity/.test(combined)) {
          throw new Error(`${location} contains invalid output: ${combined}`);
        }
        const signature = getQuestionFingerprint(item.q);
        if (seen.has(signature)) throw new Error(`${location} duplicates ${seen.get(signature)} with ${stripHtml(item.q)}`);
        seen.set(signature, location);
      });
    });
    context.window.currentProgramId = 'elementary_closure_v1';
    context.window.currentSetNumber = setNumber;
    context.window.renderPaper?.();
    const closurePaperHtml = elements.get('paper-container')?.innerHTML || '';
    if (closurePaperHtml.includes('class="blank math-inline-blank"') || closurePaperHtml.includes('<div class="blank"></div>')) {
      throw new Error(`Closure set ${setNumber} paper still contains legacy underline blanks in question rendering`);
    }
    if (
      closurePaperHtml.includes('class="prompt-en"') ||
      closurePaperHtml.includes('class="ans-prompt-en"') ||
      closurePaperHtml.includes('class="ans-help-en"')
    ) {
      throw new Error(`Closure set ${setNumber} still renders English helper lines`);
    }
    if (closurePaperHtml.includes('WELCOME TO THE ELEMENTARY CLOSURE STAGE')) {
      throw new Error(`Closure set ${setNumber} still renders the old bilingual welcome heading`);
    }
    if (closurePaperHtml.includes('class="review-flag"')) {
      throw new Error(`Closure set ${setNumber} still renders the old overlay review badge`);
    }
    if (closurePaperHtml.includes('>复习题<')) {
      throw new Error(`Closure set ${setNumber} still contains a Chinese-only review label`);
    }
    const reviewItemCount = closureItems.filter(item => item?.isReviewItem).length;
    const renderedReviewItemCount = (closurePaperHtml.match(/class="item[^"]*review-item/g) || []).length;
    if (renderedReviewItemCount !== reviewItemCount) {
      throw new Error(`Closure set ${setNumber} rendered ${renderedReviewItemCount} review-item rows for ${reviewItemCount} review questions`);
    }
    return;
  }
  const kaiMulTags = new Set((data.k_m || []).map(item => item?.tag));
  const kaiDivTags = new Set((data.k_d || []).map(item => item?.tag));
  const kaiSubTags = new Set((data.k_s || []).map(item => item?.tag));
  const kaiConvTags = new Set((data.k_c || []).map(item => item?.tag));
  const kaiFracEqTags = new Set((data.k_f || []).map(item => item?.tag));
  const kaiOlyTags = new Set((data.k_o || []).map(item => item?.tag));
  const lorikMulTags = new Set((data.l_m || []).map(item => item?.tag));
  const lorikDivItems = data.l_d || [];
  const lorikDivTags = new Set((data.l_d || []).map(item => item?.tag));
  const lorikSubTags = new Set((data.l_s || []).map(item => item?.tag));
  const lorikFracTags = new Set((data.l_f || []).map(item => item?.tag));
  const lorikMixedTags = new Set((data.l_o || []).map(item => item?.tag));

  if (![...kaiMulTags].some(tag => ['k_dmul_basic', 'k_dmul_trap0'].includes(tag))) {
    throw new Error(`Set ${setNumber} is missing KAI decimal-place multiplication coverage`);
  }
  if (![...kaiMulTags].some(tag => tag === 'k_dmul_tiny')) {
    throw new Error(`Set ${setNumber} is missing KAI tiny-decimal multiplication coverage`);
  }
  if (![...kaiMulTags].some(tag => ['k_dmul_scale', 'k_dmul_125'].includes(tag))) {
    throw new Error(`Set ${setNumber} is missing KAI multiplication strategy coverage`);
  }
  if (![...kaiMulTags].some(tag => ['k_dmul_end0', 'k_dmul_int'].includes(tag))) {
    throw new Error(`Set ${setNumber} is missing KAI mixed whole-number multiplication coverage`);
  }

  if (![...kaiDivTags].some(tag => ['k_ddiv_basic', 'k_ddiv_unit'].includes(tag))) {
    throw new Error(`Set ${setNumber} is missing KAI decimal-scaling division coverage`);
  }
  if (![...kaiDivTags].some(tag => ['k_ddiv_mid0', 'k_ddiv_int2dec'].includes(tag))) {
    throw new Error(`Set ${setNumber} is missing KAI divisor-shift division coverage`);
  }
  if (![...kaiDivTags].some(tag => ['k_ddiv_shift', 'k_ddiv_decimal_q'].includes(tag))) {
    throw new Error(`Set ${setNumber} is missing KAI decimal-quotient division coverage`);
  }
  if (![...kaiDivTags].some(tag => tag === 'k_ddiv_pure')) {
    throw new Error(`Set ${setNumber} is missing KAI same-scale decimal division coverage`);
  }
  if (![...kaiSubTags].some(tag => tag === 'k_sub_cross')) {
    throw new Error(`Set ${setNumber} is missing KAI cross-borrow subtraction coverage`);
  }
  if (![...kaiSubTags].some(tag => tag === 'k_sub_inner0')) {
    throw new Error(`Set ${setNumber} is missing KAI inner-zero subtraction coverage`);
  }
  if (![...kaiSubTags].some(tag => ['k_sub_100k', 'k_sub_near_million'].includes(tag))) {
    throw new Error(`Set ${setNumber} is missing KAI benchmark whole subtraction coverage`);
  }
  if (![...kaiSubTags].some(tag => tag === 'k_sub_6digit')) {
    throw new Error(`Set ${setNumber} is missing KAI six-digit subtraction coverage`);
  }
  if (![...kaiConvTags].some(tag => ['k_conv_1', 'k_conv_2'].includes(tag))) {
    throw new Error(`Set ${setNumber} is missing KAI percent conversion coverage`);
  }
  if (![...kaiConvTags].some(tag => tag === 'k_conv_3')) {
    throw new Error(`Set ${setNumber} is missing KAI repeating-decimal coverage`);
  }
  if (![...kaiConvTags].some(tag => tag === 'k_conv_4')) {
    throw new Error(`Set ${setNumber} is missing KAI mixed repeating-decimal coverage`);
  }
  if (![...kaiConvTags].some(tag => tag === 'k_conv_5')) {
    throw new Error(`Set ${setNumber} is missing KAI fraction-to-percent coverage`);
  }
  if (![...kaiConvTags].some(tag => ['k_conv_6', 'k_conv_7'].includes(tag))) {
    throw new Error(`Set ${setNumber} is missing KAI decimal-to-fraction coverage`);
  }
  if (![...kaiConvTags].some(tag => tag === 'k_conv_8')) {
    throw new Error(`Set ${setNumber} is missing KAI fortieth benchmark coverage`);
  }
  if (![...kaiConvTags].some(tag => tag === 'k_conv_9')) {
    throw new Error(`Set ${setNumber} is missing KAI sixteenth benchmark coverage`);
  }
  if (![...kaiConvTags].some(tag => tag === 'k_conv_10')) {
    throw new Error(`Set ${setNumber} is missing KAI exact decimal benchmark coverage`);
  }
  if (![...kaiFracEqTags].some(tag => ['k_eq_move', 'k_eq_coeff'].includes(tag))) {
    throw new Error(`Set ${setNumber} is missing KAI core inverse-equation coverage`);
  }
  if (![...kaiFracEqTags].some(tag => ['k_eq_merge', 'k_eq_twostep'].includes(tag))) {
    throw new Error(`Set ${setNumber} is missing KAI multi-step equation coverage`);
  }
  if (![...kaiFracEqTags].some(tag => ['k_eq_sub', 'k_eq_divisor'].includes(tag))) {
    throw new Error(`Set ${setNumber} is missing KAI special-position equation coverage`);
  }
  if (![...kaiFracEqTags].some(tag => tag === 'k_eq_prop')) {
    throw new Error(`Set ${setNumber} is missing KAI proportion equation coverage`);
  }
  if (![...kaiFracEqTags].some(tag => tag === 'k_fcalc_addsub')) {
    throw new Error(`Set ${setNumber} is missing KAI fraction add/subtract coverage`);
  }
  if (![...kaiFracEqTags].some(tag => ['k_fcalc_paren', 'k_fcalc_muldiv'].includes(tag))) {
    throw new Error(`Set ${setNumber} is missing KAI fraction chain-or-parentheses coverage`);
  }
  if (![...kaiFracEqTags].some(tag => tag === 'k_fcalc_dist')) {
    throw new Error(`Set ${setNumber} is missing KAI fraction distributive coverage`);
  }
  if (![...kaiFracEqTags].some(tag => tag === 'k_fcalc_cancel')) {
    throw new Error(`Set ${setNumber} is missing KAI fraction cross-cancel coverage`);
  }
  if (![...kaiFracEqTags].some(tag => tag === 'k_fcalc_fd1')) {
    throw new Error(`Set ${setNumber} is missing KAI decimal-fraction chain coverage`);
  }
  if (![...kaiFracEqTags].some(tag => tag === 'k_fcalc_fd2')) {
    throw new Error(`Set ${setNumber} is missing KAI decimal-times-fraction-sum coverage`);
  }
  if (![...kaiFracEqTags].some(tag => tag === 'k_fcalc_fd3')) {
    throw new Error(`Set ${setNumber} is missing KAI fraction-minus-decimal coverage`);
  }
  if (![...kaiFracEqTags].some(tag => tag === 'k_fcalc_fd4')) {
    throw new Error(`Set ${setNumber} is missing KAI decimal-times-fraction-plus-half coverage`);
  }
  if (![...kaiOlyTags].some(tag => ['k_oly_dist', 'k_oly_balance', 'k_oly_reverse'].includes(tag))) {
    throw new Error(`Set ${setNumber} is missing KAI distributive-balance olympiad coverage`);
  }
  if (![...kaiOlyTags].some(tag => tag === 'k_oly_frac1')) {
    throw new Error(`Set ${setNumber} is missing KAI telescoping-fraction olympiad coverage`);
  }
  if (![...kaiOlyTags].some(tag => tag === 'k_oly_125')) {
    throw new Error(`Set ${setNumber} is missing KAI 12.5 strategy olympiad coverage`);
  }
  if (![...kaiOlyTags].some(tag => ['k_oly_unit_fraction', 'k_oly_frac2'].includes(tag))) {
    throw new Error(`Set ${setNumber} is missing KAI fraction-application olympiad coverage`);
  }

  if (![...lorikMulTags].some(tag => ['l_mul_3x3', 'l_mul_3x20'].includes(tag))) {
    throw new Error(`Set ${setNumber} is missing Lorik core vertical multiplication coverage`);
  }
  if (![...lorikMulTags].some(tag => tag === 'l_mul_dec')) {
    throw new Error(`Set ${setNumber} is missing Lorik decimal multiplication coverage`);
  }
  if (![...lorikMulTags].some(tag => ['l_mul_near100', 'l_mul_25'].includes(tag))) {
    throw new Error(`Set ${setNumber} is missing Lorik multiplication strategy coverage`);
  }
  if (![...lorikMulTags].some(tag => ['l_mul_big0', 'l_mul_end0'].includes(tag))) {
    throw new Error(`Set ${setNumber} is missing Lorik trailing-zero multiplication coverage`);
  }

  if (![...lorikDivTags].some(tag => ['l_div_decimal_dividend', 'l_div_dec1'].includes(tag))) {
    throw new Error(`Set ${setNumber} is missing Lorik decimal-dividend division practice`);
  }
  if (![...lorikDivTags].some(tag => tag === 'l_div_decimal_divisor')) {
    throw new Error(`Set ${setNumber} is missing Lorik decimal-divisor division practice`);
  }
  if (![...lorikDivTags].some(tag => ['l_div_decimal_both', 'l_div_dec2'].includes(tag))) {
    throw new Error(`Set ${setNumber} is missing Lorik double-decimal division practice`);
  }
  const lorikDecimalDivItems = lorikDivItems.filter(item => ['l_div_decimal_dividend', 'l_div_dec1', 'l_div_decimal_divisor', 'l_div_decimal_both', 'l_div_dec2'].includes(item?.tag));
  if (!lorikDecimalDivItems.some(item => Number.parseFloat(stripHtml(item.a)) < 1)) {
    throw new Error(`Set ${setNumber} is missing Lorik decimal-division items with quotient below 1`);
  }
  if (!lorikDecimalDivItems.some(item => Number.parseFloat(stripHtml(item.a)) > 1)) {
    throw new Error(`Set ${setNumber} is missing Lorik decimal-division items with quotient above 1`);
  }
  if (!lorikDecimalDivItems.some(item => decimalPlacesFromText(extractDivisionParts(item.q).dividend) >= 2)) {
    throw new Error(`Set ${setNumber} is missing Lorik decimal-division items with two-decimal dividends`);
  }
  if (!lorikDecimalDivItems.some(item => decimalPlacesFromText(extractDivisionParts(item.q).divisor) >= 2)) {
    throw new Error(`Set ${setNumber} is missing Lorik decimal-division items with two-decimal divisors`);
  }
  if (![...lorikSubTags].some(tag => tag === 'l_sub_cross')) {
    throw new Error(`Set ${setNumber} is missing Lorik cross-borrow subtraction coverage`);
  }
  if (![...lorikSubTags].some(tag => ['l_sub_all0', 'l_sub_100k'].includes(tag))) {
    throw new Error(`Set ${setNumber} is missing Lorik zero-chain subtraction coverage`);
  }
  if (![...lorikSubTags].some(tag => tag === 'l_sub_jump0')) {
    throw new Error(`Set ${setNumber} is missing Lorik jump-zero subtraction coverage`);
  }
  if (![...lorikSubTags].some(tag => tag === 'l_sub_norm')) {
    throw new Error(`Set ${setNumber} is missing Lorik standard regrouping subtraction coverage`);
  }
  if (![...lorikFracTags].some(tag => tag === 'l_fmix_add')) {
    throw new Error(`Set ${setNumber} is missing Lorik same-denominator fraction addition`);
  }
  if (![...lorikFracTags].some(tag => tag === 'l_fmix_sub')) {
    throw new Error(`Set ${setNumber} is missing Lorik unlike-denominator subtraction`);
  }
  if (![...lorikFracTags].some(tag => tag === 'l_fmix_muldiv')) {
    throw new Error(`Set ${setNumber} is missing Lorik fraction multiply-divide coverage`);
  }
  if (![...lorikFracTags].some(tag => tag === 'l_fmix_ofwhole')) {
    throw new Error(`Set ${setNumber} is missing Lorik fraction-of-whole coverage`);
  }
  if (![...lorikFracTags].some(tag => tag === 'l_fmix_seq')) {
    throw new Error(`Set ${setNumber} is missing Lorik sequential divide-multiply coverage`);
  }
  if (![...lorikFracTags].some(tag => tag === 'l_fmix_madd')) {
    throw new Error(`Set ${setNumber} is missing Lorik mixed-number addition coverage`);
  }
  if (![...lorikFracTags].some(tag => tag === 'l_fmix_msub')) {
    throw new Error(`Set ${setNumber} is missing Lorik mixed-number subtraction coverage`);
  }
  if (![...lorikFracTags].some(tag => tag === 'l_fmix_paren1')) {
    throw new Error(`Set ${setNumber} is missing Lorik parentheses division coverage`);
  }
  if (![...lorikFracTags].some(tag => tag === 'l_fmix_paren2')) {
    throw new Error(`Set ${setNumber} is missing Lorik parentheses multiplication coverage`);
  }
  if (![...lorikFracTags].some(tag => tag === 'l_fmix_paren3')) {
    throw new Error(`Set ${setNumber} is missing Lorik parentheses addition coverage`);
  }
  if (![...lorikFracTags].some(tag => tag === 'l_fmix_3mul')) {
    throw new Error(`Set ${setNumber} is missing Lorik triple-multiplication fraction coverage`);
  }
  if (![...lorikFracTags].some(tag => ['l_fmix_fd1', 'l_fmix_fd2'].includes(tag))) {
    throw new Error(`Set ${setNumber} is missing Lorik decimal-fraction bridge coverage`);
  }
  if (![...lorikMixedTags].some(tag => ['l_bmix_125', 'l_bmix_near100'].includes(tag))) {
    throw new Error(`Set ${setNumber} is missing Lorik structure-shortcut mixed practice`);
  }
  if (![...lorikMixedTags].some(tag => ['l_bmix_order', 'l_bmix_paren'].includes(tag))) {
    throw new Error(`Set ${setNumber} is missing Lorik operation-order mixed practice`);
  }
  if (![...lorikMixedTags].some(tag => tag === 'l_bmix_dist')) {
    throw new Error(`Set ${setNumber} is missing Lorik distributive mixed practice`);
  }
  if (![...lorikMixedTags].some(tag => tag === 'l_bmix_comb')) {
    throw new Error(`Set ${setNumber} is missing Lorik combination-strategy mixed practice`);
  }

  for (const [section, expected] of Object.entries(expectedCounts)) {
    const items = data[section];
    if (!Array.isArray(items) || items.length !== expected) {
      throw new Error(`Set ${setNumber} section ${section} expected ${expected}, got ${items?.length ?? 'missing'}`);
    }
    items.forEach((item, index) => {
      const location = `set ${setNumber} ${section}[${index}]`;
      if (!item || !item.tag) throw new Error(`${location} missing tag`);
      const tip = typeof getKnowledgeTip === 'function' ? getKnowledgeTip(item.tag) : null;
      if (!tip || tip.name === fallbackName) missingAdvice.add(item.tag);
      const domain = typeof getKnowledgeDomain === 'function' ? getKnowledgeDomain(item.tag) : null;
      if (!domain) missingDomain.add(item.tag);
      const level = item.level || context.window.inferDifficulty?.(item.tag);
      if (!Number.isInteger(level) || level < 1 || level > 4) {
        throw new Error(`${location} has invalid level ${level}`);
      }
      observedLevels.add(level);
      if (!stripHtml(item.q)) throw new Error(`${location} missing question`);
      if (!stripHtml(item.a)) throw new Error(`${location} missing answer`);
      const combined = `${item.q} ${item.a} ${item.step || ''}`;
      if (/undefined|NaN|Infinity/.test(combined)) {
        throw new Error(`${location} contains invalid output: ${combined}`);
      }
      const signature = getQuestionFingerprint(item.q);
      if (seen.has(signature)) throw new Error(`${location} duplicates ${seen.get(signature)} with ${stripHtml(item.q)}`);
      seen.set(signature, location);
    });
  }
  context.window.currentProgramId = 'advanced_fluency_v1';
  context.window.currentSetNumber = setNumber;
  context.window.renderPaper?.();
  const advancedPaperHtml = elements.get('paper-container')?.innerHTML || '';
  if (advancedPaperHtml.includes('class="blank math-inline-blank"') || advancedPaperHtml.includes('<div class="blank"></div>')) {
    throw new Error(`Advanced set ${setNumber} paper still contains legacy underline blanks in question rendering`);
  }
}

const checked = [];
const missingAdvice = new Set();
const missingDomain = new Set();
const observedLevels = new Set();
const sampleSignal = context.window.getDomainSignal?.(
  { weights: { k_dmul_basic: 2 }, errorBook: { e1: { tag: 'k_dmul_trap0', count: 2, mastered: false } } },
  'k_dmul_scale'
);
if (!sampleSignal || sampleSignal.domain?.id !== 'decimal' || sampleSignal.score <= 0) {
  throw new Error('Domain signal scoring is not available for decimal tags');
}
const sampleSummary = context.window.summarizeDomainSignals?.([
  { weights: { k_fcalc_muldiv: 3 }, errorBook: { e2: { tag: 'l_fmix_sub', count: 1, mastered: false } } }
]);
if (!Array.isArray(sampleSummary) || !sampleSummary.some(item => item.domain.id === 'fraction' && item.score > 0)) {
  throw new Error('Domain signal summary is not reporting fraction weakness');
}
const sampleErrorSignal = context.window.getErrorBookSignal?.(
  { errorBook: { e3: { tag: 'k_dmul_basic', count: 4, mastered: false, info: { q: '2 &times; 3', a: '6' } } } },
  'k_dmul_basic'
);
if (!sampleErrorSignal || sampleErrorSignal.exactCount < 4 || sampleErrorSignal.score <= 0) {
  throw new Error('Error-book signal scoring is not reporting exact active errors');
}
const sampleHighValueSignal = context.window.getHighValueTrainingSignal?.(
  {
    lastSeen: { k_eq_divisor: 96 },
    errorBook: { e5: { tag: 'k_eq_divisor', count: 3, mastered: false, info: { q: '1 &divide; x = 1/2', a: '2' } } },
    weights: { k_eq_divisor: 4 }
  },
  'k_eq_divisor'
);
if (!sampleHighValueSignal || sampleHighValueSignal.tier < 3 || sampleHighValueSignal.score <= 0 || !sampleHighValueSignal.priority) {
  throw new Error('High-value training signal is not prioritising core misconception tags');
}
const requiredQualityFamilies = [
  ['k_ddiv_shift', 'decimal_division'],
  ['l_fmix_madd', 'fraction_operation'],
  ['k_fcalc_addsub', 'fraction_operation'],
  ['k_conv_1', 'conversion_bridge'],
  ['c2_eq_percent', 'equation_method'],
];
for (const [tag, expectedFamily] of requiredQualityFamilies) {
  const actualFamily = context.window.getQualityFamilyForTag?.(tag);
  if (actualFamily !== expectedFamily) {
    throw new Error(`Quality family mapping mismatch for ${tag}: expected ${expectedFamily}, got ${actualFamily}`);
  }
}
const replayLevelSamples = [
  [{ count: 1 }, 'L1'],
  [{ count: 2 }, 'L2'],
  [{ count: 4 }, 'L3'],
];
for (const [entry, expectedLevel] of replayLevelSamples) {
  const actualLevel = context.window.getReplayLevel?.(entry);
  if (actualLevel !== expectedLevel) {
    throw new Error(`Replay level mismatch for count ${entry.count}: expected ${expectedLevel}, got ${actualLevel}`);
  }
}
const sampleReplay = context.window.buildErrorReplayItem?.({
  uid: 'e3',
  tag: 'k_dmul_basic',
  count: 4,
  lastSet: 72,
  info: { q: '2 &times; 3', a: '6', step: '2乘3等于6。' },
});
if (!sampleReplay?.isErrorReplay || !sampleReplay?.isReviewItem || sampleReplay.q !== '2 &times; 3' || !sampleReplay.step.includes('Replay')) {
  throw new Error('Error replay item builder is not producing replay items');
}
if (sampleReplay?.qualityFamily !== '') {
  throw new Error(`Expected non-rollout replay sample to keep empty qualityFamily, got ${sampleReplay?.qualityFamily}`);
}
if (sampleReplay?.replayLevel !== 'L3') {
  throw new Error(`Expected replay sample to be L3, got ${sampleReplay?.replayLevel}`);
}
const sampleVariant = context.window.buildErrorVariantItem?.({
  uid: 'e4',
  tag: 'l_conv_6',
  count: 2,
  lastSet: 91,
  info: { q: '0.49 ? 1/2', a: '&lt;' },
});
if (!sampleVariant?.isErrorVariant || !sampleVariant?.isReviewItem || !sampleVariant.q.includes('circle-blank') || !sampleVariant.step.includes('Review Variant')) {
  throw new Error('Error variant item builder is not producing targeted review variants');
}
if (sampleVariant?.qualityFamily !== 'conversion_bridge') {
  throw new Error(`Expected l_conv_6 variant to map to conversion_bridge, got ${sampleVariant?.qualityFamily}`);
}
if (sampleVariant?.replayLevel !== 'L2') {
  throw new Error(`Expected variant sample to be L2, got ${sampleVariant?.replayLevel}`);
}
const sampleKaiVariant = context.window.buildErrorVariantItem?.({
  uid: 'e6',
  tag: 'k_eq_divisor',
  count: 2,
  lastSet: 99,
  info: { q: '3/2 &divide; x = 3/4', a: 'x = 2' },
});
if (!sampleKaiVariant?.isErrorVariant || !sampleKaiVariant?.q.includes('&divide; <i class="var">x</i>') || !sampleKaiVariant.step.includes('Review Variant')) {
  throw new Error('Error variant item builder is not producing targeted KAI equation review variants');
}
if (sampleKaiVariant?.qualityFamily !== 'equation_method') {
  throw new Error(`Expected k_eq_divisor variant to map to equation_method, got ${sampleKaiVariant?.qualityFamily || '(missing)'}`);
}
if (sampleKaiVariant?.explanationMode !== 'rule') {
  throw new Error(`Expected k_eq_divisor variant to use rule explanation mode, got ${sampleKaiVariant?.explanationMode || '(missing)'}`);
}
if (typeof context.window.generateProgramSetData !== 'function') {
  throw new Error('Program set generator is not exposed for runtime validation');
}
if (typeof context.window.generateOrLoadSetData !== 'function') {
  throw new Error('Cached set loader is not exposed for runtime validation');
}
context.window.currentProgramId = 'advanced_fluency_v1';
context.window.currentSetNumber = 120;
const duplicateCachedSet = {
  programId: 'advanced_fluency_v1',
  stateLabel: 'validator duplicate cache',
  k_m: [
    { tag: 'k_dmul_basic', q: '7 &times; 8', a: '56' },
    { tag: 'k_dmul_basic', q: '7 &times; 8', a: '56' },
    { tag: 'k_dmul_basic', q: '9 &times; 8', a: '72' },
    { tag: 'k_dmul_basic', q: '6 &times; 8', a: '48' },
  ],
};
store.set(getProgramCacheKey('advanced_fluency_v1', 120), JSON.stringify(duplicateCachedSet));
const regeneratedFromDuplicateCache = context.window.generateOrLoadSetData();
assertNoQuestionFingerprintDuplicates(regeneratedFromDuplicateCache, 'regenerated duplicate-cache set');
const regeneratedCacheRaw = store.get(getProgramCacheKey('advanced_fluency_v1', 120)) || '';
if (regeneratedCacheRaw.includes('validator duplicate cache')) {
  throw new Error('Duplicate cached set was returned instead of being regenerated');
}
const cacheRepairRecord = JSON.parse(store.get('MathEngine_LastCacheRepair') || 'null');
if (
  !cacheRepairRecord ||
  cacheRepairRecord.set !== 120 ||
  cacheRepairRecord.programId !== 'advanced_fluency_v1' ||
  !String(cacheRepairRecord.cacheKey || '').includes('advanced_fluency_v1_120') ||
  !cacheRepairRecord.first ||
  !cacheRepairRecord.second
) {
  throw new Error('Duplicate cached set repair was not recorded with set, program, cache key, and duplicate locations');
}
const cacheRepairStatus = elements.get('cache-repair-status');
if (
  !cacheRepairStatus ||
  cacheRepairStatus.style.display !== 'block' ||
  !String(cacheRepairStatus.textContent || '').includes('Set 120') ||
  !String(cacheRepairStatus.title || '').includes('k_m')
) {
  throw new Error('Duplicate cached set repair did not render a visible control-panel status');
}
context.window.currentSetNumber = 121;
store.set(getProgramCacheKey('advanced_fluency_v1', 121), JSON.stringify({
  programId: 'advanced_fluency_v1',
  stateLabel: 'validator manual duplicate cache',
  k_m: [
    { tag: 'k_dmul_basic', q: '11 &times; 11', a: '121' },
    { tag: 'k_dmul_basic', q: '11 &times; 11', a: '121' },
    { tag: 'k_dmul_basic', q: '12 &times; 11', a: '132' },
    { tag: 'k_dmul_basic', q: '13 &times; 11', a: '143' },
  ],
}));
const manualRepairResult = context.window.checkCurrentSetDuplicates?.();
if (manualRepairResult !== true) {
  throw new Error('Manual duplicate-question checker did not report a repair');
}
const manualRepairRaw = store.get(getProgramCacheKey('advanced_fluency_v1', 121)) || '';
if (manualRepairRaw.includes('validator manual duplicate cache')) {
  throw new Error('Manual duplicate-question checker did not replace the duplicate cached set');
}
assertNoQuestionFingerprintDuplicates(JSON.parse(manualRepairRaw), 'manual duplicate-cache repair set');
const manualRepairRecord = JSON.parse(store.get('MathEngine_LastCacheRepair') || 'null');
if (!manualRepairRecord?.manual || manualRepairRecord.set !== 121 || !String(cacheRepairStatus.textContent || '').includes('Set 121')) {
  throw new Error('Manual duplicate-question checker did not update repair record and visible status');
}
context.window.StorageDB.cache.KAI = {
  weights: {},
  lastSeen: {},
  history: [],
  errorBook: {
    hv1: {
      tag: 'k_ddiv_shift',
      count: 3,
      lastSet: 104,
      mastered: false,
      info: { q: '1.7280 &divide; 0.24', a: '7.2', step: '先看商的位置，再把两数同乘100。' }
    }
  },
  programs: {}
};
context.window.StorageDB.cache.Lorik = { weights: {}, lastSeen: {}, history: [], errorBook: {}, programs: {} };
context.window.currentProgramId = 'advanced_fluency_v1';
context.window.currentSetNumber = 107;
const advancedQualityData = context.window.generateProgramSetData('advanced_fluency_v1');
assertNoQuestionFingerprintDuplicates(advancedQualityData, 'advanced high-value replay set');
const advancedReplayItems = [...advancedQualityData.k_d, ...advancedQualityData.k_f, ...advancedQualityData.k_c].filter(item => item?.isAdvancedHighValueReplay);
if (!advancedReplayItems.some(item => item.qualityFamily === 'decimal_division' && item.replayLevel === 'L2')) {
  throw new Error('Advanced high-value replay slot is not injecting a decimal_division L2 review item');
}
context.window.StorageDB.cache.KAI = {
  weights: {},
  lastSeen: {},
  history: [],
  errorBook: {
    hv2: {
      tag: 'k_fcalc_addsub',
      count: 3,
      lastSet: 105,
      mastered: false,
      info: { q: '<div class="frac"><span>1</span><span class="bottom">2</span></div> + <div class="frac"><span>1</span><span class="bottom">3</span></div> &minus; <div class="frac"><span>1</span><span class="bottom">6</span></div>', a: '<div class="frac"><span>2</span><span class="bottom">3</span></div>', step: '先通分，再按顺序加减。' }
    }
  },
  programs: {}
};
context.window.currentSetNumber = 108;
const advancedFractionData = context.window.generateProgramSetData('advanced_fluency_v1');
assertNoQuestionFingerprintDuplicates(advancedFractionData, 'advanced high-value fraction replay set');
const advancedFractionReplayItems = [...advancedFractionData.k_d, ...advancedFractionData.k_f, ...advancedFractionData.k_c].filter(item => item?.isAdvancedHighValueReplay);
if (!advancedFractionReplayItems.some(item => item.qualityFamily === 'fraction_operation' && item.replayLevel === 'L2')) {
  throw new Error('Advanced high-value replay slot is not injecting a fraction_operation L2 review item');
}
if (typeof context.window.printQuestionSheets !== 'function' || typeof context.window.printAnswerSheets !== 'function') {
  throw new Error('Print helper functions are not available');
}
context.window.printQuestionSheets();
await new Promise(resolve => setTimeout(resolve, 260));
const printRootHtml = elements.get('print-root')?.innerHTML || '';
const sourceQuestionSheets = extractQuestionSheets();
if (!context.document.body.classList.contains('print-questions-only') || !context.document.body.classList.contains('print-sandbox-active') || context.__printCalls !== 1) {
  throw new Error('Question-sheet print mode did not activate correctly');
}
if ((printRootHtml.match(/question-sheet/g) || []).length !== 4) {
  throw new Error('Question-sheet print sandbox did not stage exactly four printable question sheets');
}
const sourceItemCount = sourceQuestionSheets.reduce((count, sheet) => count + (sheet.match(/class="item /g) || []).length, 0);
const stagedItemCount = (printRootHtml.match(/class="item /g) || []).length;
if (sourceItemCount !== stagedItemCount || stagedItemCount !== 72) {
  throw new Error(`Question-sheet print sandbox item mismatch: source ${sourceItemCount}, staged ${stagedItemCount}`);
}
emit('afterprint');
if (context.document.body.classList.contains('print-questions-only') || context.document.body.classList.contains('print-answers-only')) {
  throw new Error('Print mode did not clear after afterprint');
}
if ((elements.get('print-root')?.innerHTML || '') !== '') {
  throw new Error('Print sandbox did not clear after afterprint');
}
context.window.printAnswerSheets();
await new Promise(resolve => setTimeout(resolve, 260));
const answerPrintRootHtml = elements.get('print-root')?.innerHTML || '';
if (!context.document.body.classList.contains('print-answers-only') || !context.document.body.classList.contains('print-sandbox-active') || context.__printCalls !== 2) {
  throw new Error('Answer-sheet print mode did not activate correctly');
}
if ((answerPrintRootHtml.match(/class="sheet ans-sheet/g) || []).length !== 2) {
  throw new Error('Answer-sheet print sandbox did not stage exactly two printable answer sheets');
}
if (answerPrintRootHtml.includes('class="blank math-inline-blank"') || answerPrintRootHtml.includes('<div class="blank"></div>')) {
  throw new Error('Answer-sheet print sandbox still contains legacy underline blanks');
}
emit('afterprint');
if (context.document.body.classList.contains('print-questions-only') || context.document.body.classList.contains('print-answers-only')) {
  throw new Error('Answer-sheet print mode did not clear after afterprint');
}
if ((elements.get('print-root')?.innerHTML || '') !== '') {
  throw new Error('Answer-sheet print sandbox did not clear after afterprint');
}
if (typeof context.window.setupAutoCloudPull !== 'function' || typeof context.window.StorageDB?.pullRemoteChanges !== 'function') {
  throw new Error('Automatic cloud pull helpers are not available');
}
if (typeof context.window.showSetReview !== 'function') {
  throw new Error('Set review report helper is not available');
}
context.window.StorageDB.cache.KAI = {
  weights: { k_dmul_basic: 50 },
  lastSeen: {},
  history: [],
  errorBook: {
    replay1: { tag: 'k_dmul_basic', grade: 'wrong', count: 5, lastSet: 72, mastered: false, info: { q: '2 &times; 3', a: '6', step: '2乘3等于6。' } },
  },
};
context.window.currentSetNumber = 105;
context.window.renderPaper();
const replayPaper = elements.get('paper-container')?.innerHTML || '';
if (!stripHtml(replayPaper).includes('2 &times; 3') || !replayPaper.includes('Error Replay')) {
  throw new Error('Active error-book item was not bridged back into generated training');
}
context.window.StorageDB.cache.KAI = {
  weights: {},
  lastSeen: {},
  history: [],
  errorBook: {
    eb1: {
      tag: 'k_conv_1',
      grade: 'wrong',
      count: 3,
      lastSet: 104,
      firstSet: 102,
      firstDate: 'validator',
      lastDate: 'validator',
      mastered: false,
      mechanismKey: 'representation-conversion',
      info: { q: '0.25 = (   )', a: '1/4', step: '先转成分数。' }
    },
    eb2: {
      tag: 'k_conv_2',
      grade: 'wrong',
      count: 2,
      lastSet: 104,
      firstSet: 103,
      firstDate: 'validator',
      lastDate: 'validator',
      mastered: false,
      mechanismKey: 'baseline-comparison',
      info: { q: '比较 0.49 和 1/2', a: '1/2 大', step: '先想 1/2 = 0.5。' }
    }
  },
};
context.window.StorageDB.cache.Lorik = { weights: {}, lastSeen: {}, history: [], errorBook: {} };
context.window.renderErrorBook();
const errorBookHtml = elements.get('paper-container')?.innerHTML || '';
if (!errorBookHtml.includes('高频机制') || !errorBookHtml.includes('representation-conversion')) {
  throw new Error('Error book did not render clickable mechanism summary chips');
}
context.window.setEbMechanism('representation-conversion');
const mechanismFilteredHtml = elements.get('paper-container')?.innerHTML || '';
if (!mechanismFilteredHtml.includes('当前只看') || !mechanismFilteredHtml.includes('0.25 =')) {
  throw new Error('Error book mechanism filtering did not preserve the matching entry');
}
if (mechanismFilteredHtml.includes('比较 0.49 和 1/2')) {
  throw new Error('Error book mechanism filtering still shows entries from other mechanisms');
}
if (!mechanismFilteredHtml.includes('打印当前机制补练')) {
  throw new Error('Error book mechanism filter is missing the printable mechanism follow-up entry point');
}
if (!mechanismFilteredHtml.includes('打印当前机制错题专项卷') || !mechanismFilteredHtml.includes('打印专项卷+答案') || !mechanismFilteredHtml.includes('批改专项卷')) {
  throw new Error('Error book is missing full targeted practice print entry points');
}
const mechanismPrintHtml = context.window.buildErrorBookMechanismPrintHTML?.('KAI', 'representation-conversion', false) || '';
if (!mechanismPrintHtml.includes('机制补练') || !mechanismPrintHtml.includes('0.25')) {
  throw new Error('Error book mechanism print builder did not produce concrete practice content');
}
if (mechanismPrintHtml.includes('class="blank math-inline-blank"') || mechanismPrintHtml.includes('<div class="blank"></div>')) {
  throw new Error('Error book mechanism print HTML still contains legacy underline blanks');
}
const fullErrorBookPracticeHtml = context.window.buildErrorBookPracticePrintHTML?.('KAI', true, {}) || '';
if (!fullErrorBookPracticeHtml.includes('错题专项卷') || !fullErrorBookPracticeHtml.includes('复练记录') || !fullErrorBookPracticeHtml.includes('□ 又错')) {
  throw new Error('Full error-book targeted practice print HTML is missing sheet title or re-error tracking marks');
}
if (!fullErrorBookPracticeHtml.includes('参考答案') || !fullErrorBookPracticeHtml.includes('复练标记')) {
  throw new Error('Full error-book targeted practice answer sheet is missing answer/reference tracking columns');
}
if (fullErrorBookPracticeHtml.includes('class="blank math-inline-blank"') || fullErrorBookPracticeHtml.includes('<div class="blank"></div>')) {
  throw new Error('Full error-book targeted practice print HTML still contains legacy underline blanks');
}
const phaseOnePolicy = context.window.getErrorBookPracticePolicy?.(1, 24);
const phaseThreePolicy = context.window.getErrorBookPracticePolicy?.(3, 24);
if (!phaseOnePolicy || !phaseThreePolicy || phaseOnePolicy.exactReplayQuota >= phaseThreePolicy.exactReplayQuota || phaseThreePolicy.errorLinkedQuota > 10) {
  throw new Error('Error-book practice policy is not phase-aware or is allowing too much exact replay');
}
const reviewHtmlForPractice = context.window.buildErrorBookPracticeReviewHTML?.('KAI', { mechanismKey: 'representation-conversion' }) || '';
if (!reviewHtmlForPractice.includes('错题专项卷批改') || !reviewHtmlForPractice.includes('提交专项批改') || !reviewHtmlForPractice.includes('data-source-uid="eb1"')) {
  throw new Error('Error-book targeted practice grading sheet is missing review rows or submit action');
}
const practiceLog = await context.window.StorageDB.saveErrorBookPractice('KAI', [
  {
    tag: 'k_conv_1',
    grade: 'wrong',
    sourceErrorUid: 'eb1',
    mechanismKey: 'representation-conversion',
    info: { sec: '错题专项卷', num: 1, q: '0.25 = (   )', a: '1/4', step: '先转成分数。' }
  }
], 'advanced_fluency_v1', { mechanismKey: 'representation-conversion' });
const practicedProfile = context.window.StorageDB.getProfile('KAI', 'advanced_fluency_v1');
if (!practiceLog?.results?.length || practicedProfile.errorBook.eb1.lastPracticeGrade !== 'wrong' || !practicedProfile.errorBook.eb1.rewrongCount) {
  throw new Error('Error-book targeted practice did not record wrong-again status');
}
await context.window.StorageDB.saveErrorBookPractice('KAI', [
  {
    tag: 'k_conv_1',
    grade: 'perfect',
    sourceErrorUid: 'eb1',
    mechanismKey: 'representation-conversion',
    info: { sec: '错题专项卷', num: 1, q: '0.25 = (   )', a: '1/4', step: '先转成分数。' }
  }
], 'advanced_fluency_v1', { mechanismKey: 'representation-conversion' });
if (!context.window.StorageDB.getProfile('KAI', 'advanced_fluency_v1').errorBook.eb1.mastered) {
  throw new Error('Error-book targeted practice did not mark mastered items after a perfect review');
}
context.window.setEbMechanism('');
context.window.StorageDB.cache.KAI = { weights: {}, lastSeen: {}, history: [], errorBook: {} };
context.window.StorageDB.cache.KAI.history = [{
  set: 106,
  date: 'validator',
  ts: Date.now(),
  details: [
    { tag: 'k_dmul_basic', grade: 'wrong', uid: 'r1', info: { sec: '复杂乘法', num: 2, q: '2 &times; 3', a: '6', step: '2乘3等于6。' } },
    { tag: 'k_dmul_basic', grade: 'wrong', uid: 'r2', info: { sec: '复杂乘法', num: 3, q: '4 &times; 5', a: '20', step: '4乘5等于20。' } },
  ],
  allGrades: [{ tag: 'k_dmul_basic', grade: 'wrong' }, { tag: 'k_dmul_scale', grade: 'perfect' }],
  weightAdjustments: [],
}];
context.window.showSetReview(106, 'KAI');
const reviewHtml = elements.get('report-content-area')?.innerHTML || '';
if (!reviewHtml.includes('Set 106') || !reviewHtml.includes('复杂乘法') || !reviewHtml.includes('第 2 小题') || !reviewHtml.includes('6')) {
  throw new Error('Set review report is missing set number, location, or answer');
}
if (!reviewHtml.includes('本套错题变式跟训') || !reviewHtml.includes('打印变式训练')) {
  throw new Error('Set review report is missing the in-report variant follow-up block');
}
const sampleFollowupCandidates = context.window.buildSetReviewFollowupCandidates?.(context.window.StorageDB.cache.KAI.history[0]);
if (!Array.isArray(sampleFollowupCandidates) || sampleFollowupCandidates.length !== 2) {
  throw new Error('Set review follow-up candidates are not being built from current-set details');
}
const sampleFollowupTargets = context.window.buildSetReviewFollowupTargets?.(context.window.StorageDB.cache.KAI.history[0]);
if (!Array.isArray(sampleFollowupTargets) || !sampleFollowupTargets.length) {
  throw new Error('Set review follow-up targets are not grouping current-set mistakes');
}
if (sampleFollowupTargets.length < 2) {
  throw new Error('Set review follow-up targets still collapse different same-tag mistakes into one target');
}
const sampleFollowupItems = context.window.buildSetReviewFollowupItems?.(context.window.StorageDB.cache.KAI.history[0], 'KAI', 'advanced_fluency_v1');
if (!Array.isArray(sampleFollowupItems) || !sampleFollowupItems.length || sampleFollowupItems.length > 8) {
  throw new Error('Set review follow-up item builder is not producing a compact follow-up set');
}
if (!sampleFollowupItems.every(item => item.isSetReviewFollowup && item.isReviewItem)) {
  throw new Error('Set review follow-up items are missing review metadata');
}
if (!sampleFollowupItems.every(item => item.followupMechanismKey)) {
  throw new Error('Set review follow-up items are missing followupMechanismKey metadata');
}
const sampleFollowupGroups = context.window.buildSetReviewFollowupGroups?.(sampleFollowupItems);
if (!Array.isArray(sampleFollowupGroups) || !sampleFollowupGroups.length) {
  throw new Error('Set review follow-up grouping helper is not producing grouped practice sections');
}
if (!sampleFollowupGroups.every(group => group.mechanismKey)) {
  throw new Error('Set review follow-up groups are missing mechanismKey metadata');
}
const normalizedUidA = context.window.computeErrorUid?.('l_fmix_sub', '<div class="frac"><span>3</span><span class="bottom">4</span></div> &minus; <div class="frac"><span>1</span><span class="bottom">2</span></div> = <div class="blank"></div>');
const normalizedUidB = context.window.computeErrorUid?.('l_fmix_sub', '<span class="frac"><span>3</span><span class="bottom">4</span></span> &minus; <span class="frac"><span>1</span><span class="bottom">2</span></span> = <span class="blank math-inline-blank"></span>');
if (!normalizedUidA || normalizedUidA !== normalizedUidB) {
  throw new Error('Error UID normalization does not treat equivalent math markup as the same prompt');
}
const sampleFollowupPrintHtml = context.window.buildSetReviewFollowupPrintHTML?.('KAI', 106, true) || '';
if (!sampleFollowupPrintHtml.includes('错题变式训练') || !sampleFollowupPrintHtml.includes('参考答案')) {
  throw new Error('Set review follow-up print shell is missing the training or answer sections');
}
if (sampleFollowupPrintHtml.includes('class="blank math-inline-blank"') || sampleFollowupPrintHtml.includes('<div class="blank"></div>')) {
  throw new Error('Set review follow-up print HTML still contains legacy underline blanks');
}
context.window.StorageDB.cache.KAI = { weights: {}, lastSeen: {}, history: [], errorBook: {}, programs: {} };
context.window.currentProgramId = 'advanced_fluency_v1';
context.window.currentSetNumber = 109;
const makeFakeRow = ({ tag, info, grade = '', submitted = 'false' }) => ({
  getAttribute(name) {
    if (name === 'data-tag') return tag;
    if (name === 'data-info') return encodeURIComponent(JSON.stringify(info));
    if (name === 'data-grade') return grade;
    if (name === 'data-submitted') return submitted;
    return '';
  }
});
const firstInfo = { sec: '复杂乘法', num: 1, q: '12 × 3', a: '36', step: '12乘3等于36。' };
const secondInfo = { sec: '复杂乘法', num: 2, q: '1.2 × 3', a: '3.6', step: '先按整数乘，再点小数点。' };
const thirdInfo = { sec: '互化结果', num: 3, q: '0.25 = （ ）', a: '25%', step: '0.25乘100。' };
const firstPayload = context.window.buildSubmissionPayloadFromRows?.([
  makeFakeRow({ tag: 'k_dmul_basic', info: firstInfo, grade: 'wrong' }),
  makeFakeRow({ tag: 'k_dmul_scale', info: secondInfo }),
  makeFakeRow({ tag: 'k_conv_1', info: thirdInfo }),
], null);
if (!firstPayload || firstPayload.newRecords.length !== 1 || firstPayload.records.length !== 1) {
  throw new Error('Initial partial-submission payload did not keep only newly graded answers');
}
await context.window.StorageDB.saveSession('KAI', firstPayload.records, 109, 'advanced_fluency_v1');
let partialProfile = context.window.StorageDB.getProfile('KAI', 'advanced_fluency_v1');
let partialSession = partialProfile.history.find(session => session.set === 109);
if (!partialSession || partialSession.allGrades.length !== 1 || partialSession.details.length !== 1) {
  throw new Error('Initial partial submission did not persist exactly one graded answer');
}
if (context.window.findSessionGradeEntry?.(partialSession, 'k_dmul_basic', firstInfo)?.grade !== 'wrong') {
  throw new Error('Submitted answer lookup did not preserve the first graded answer');
}
if (context.window.findSessionGradeEntry?.(partialSession, 'k_dmul_scale', secondInfo)) {
  throw new Error('Unsubmitted answer was incorrectly treated as already submitted');
}
const secondPayload = context.window.buildSubmissionPayloadFromRows?.([
  makeFakeRow({ tag: 'k_dmul_basic', info: firstInfo, grade: 'wrong', submitted: 'true' }),
  makeFakeRow({ tag: 'k_dmul_scale', info: secondInfo, grade: 'careless' }),
  makeFakeRow({ tag: 'k_conv_1', info: thirdInfo }),
], partialSession);
if (!secondPayload || secondPayload.newRecords.length !== 1 || secondPayload.records.length !== 2) {
  throw new Error('Incremental payload builder did not merge previous answers with one new answer');
}
await context.window.StorageDB.saveSession('KAI', secondPayload.records, 109, 'advanced_fluency_v1');
partialProfile = context.window.StorageDB.getProfile('KAI', 'advanced_fluency_v1');
partialSession = partialProfile.history.find(session => session.set === 109);
if (!partialSession || partialSession.allGrades.length !== 2) {
  throw new Error('Incremental resubmission did not merge newly graded rows into the same set session');
}
if (!partialSession.allGrades.some(entry => entry.grade === 'wrong') || !partialSession.allGrades.some(entry => entry.grade === 'careless')) {
  throw new Error('Incremental resubmission did not preserve prior grades while adding the new one');
}
if (context.window.findSessionGradeEntry?.(partialSession, 'k_conv_1', thirdInfo)) {
  throw new Error('A still-unsubmitted answer row was incorrectly auto-marked after incremental submission');
}
const progressHtml = context.window.buildAnswerSubmissionSummary?.(
  context.window.getAnswerSubmissionProgress?.([
    { tag: 'k_dmul_basic', q: firstInfo.q, a: firstInfo.a, step: firstInfo.step },
    { tag: 'k_dmul_scale', q: secondInfo.q, a: secondInfo.a, step: secondInfo.step },
    { tag: 'k_conv_1', q: thirdInfo.q, a: thirdInfo.a, step: thirdInfo.step },
  ], partialSession),
  false,
  'KAI'
);
if (!progressHtml || !progressHtml.includes('定位到第一道待补交题')) {
  throw new Error('Answer submission progress note did not expose the pending-answer jump action');
}
if (!progressHtml.includes('只看待补交题')) {
  throw new Error('Answer submission progress note did not expose the pending-only filter action');
}
const progressHtmlWithSections = context.window.buildAnswerSubmissionSummary?.(
  { total: 3, submitted: 1, pending: 2 },
  false,
  'KAI',
  [
    { index: 4, title: '第四大题', pending: 2, total: 3 },
    { index: 6, title: '第六大题', pending: 1, total: 2 }
  ]
);
if (!progressHtmlWithSections || !progressHtmlWithSections.includes('第4大题 还剩 2 题') || !progressHtmlWithSections.includes('第6大题 还剩 1 题')) {
  throw new Error('Answer submission summary did not expose the pending section navigation');
}
context.window.currentSetNumber = 73;
context.window.renderPaper();
const activePresentation = context.window.getSubmitButtonPresentation?.('KAI', 1, 2, 'advanced_fluency_v1');
if (!activePresentation || activePresentation.disabled || !activePresentation.text.includes('本次已批改的 1 题')) {
  throw new Error('Submit button did not announce the current incremental submission count');
}
const pendingPresentation = context.window.getSubmitButtonPresentation?.('KAI', 0, 2, 'advanced_fluency_v1');
if (!pendingPresentation || !pendingPresentation.disabled || !pendingPresentation.text.includes('请先批改')) {
  throw new Error('Submit button did not guide the user back to pending-but-ungraded answers');
}
const completePresentation = context.window.getSubmitButtonPresentation?.('KAI', 0, 0, 'advanced_fluency_v1');
if (!completePresentation || !completePresentation.disabled || !completePresentation.text.includes('这套答案已全部提交')) {
  throw new Error('Submit button did not report the fully submitted state');
}
const filterSheet = context.window.document.getElementById('kai-ans-sheet');
const filterRows = Array.from(filterSheet?.querySelectorAll('.ans-row') || []).slice(0, 2);
if (filterRows.length >= 2) {
  const originalFilterState = filterRows.map(row => row.getAttribute('data-submitted'));
  filterRows[0].setAttribute('data-submitted', 'true');
  filterRows[1].setAttribute('data-submitted', 'false');
  context.window.setAnswerPendingOnly?.('KAI', true);
  if (!filterSheet.classList.contains('pending-only-mode')) {
    throw new Error('Pending-only answer mode did not activate on the answer sheet');
  }
  filterRows.forEach((row, index) => {
    const state = originalFilterState[index];
    if (state === null) row.removeAttribute('data-submitted');
    else row.setAttribute('data-submitted', state);
  });
  context.window.setAnswerPendingOnly?.('KAI', false);
}
const filterSections = Array.from(filterSheet?.querySelectorAll('.ans-section') || []).slice(0, 2);
if (filterSections.length >= 2) {
  const sectionRows = filterSections.map(section => Array.from(section.querySelectorAll('.ans-row')));
  const originalSectionState = sectionRows.map(rows => rows.map(row => row.getAttribute('data-submitted')));
  sectionRows[0].forEach(row => row.setAttribute('data-submitted', 'true'));
  sectionRows[1].forEach((row, index) => row.setAttribute('data-submitted', index === 0 ? 'false' : 'true'));
  context.window.setAnswerPendingOnly?.('KAI', true);
  if (!filterSections[0].className.includes('all-submitted')) {
    throw new Error('Pending-only mode did not collapse fully submitted answer sections');
  }
  if (filterSections[1].className.includes('all-submitted')) {
    throw new Error('Pending-only mode collapsed a section that still contains pending answers');
  }
  sectionRows.forEach((rows, sectionIndex) => {
    rows.forEach((row, rowIndex) => {
      const state = originalSectionState[sectionIndex][rowIndex];
      if (state === null) row.removeAttribute('data-submitted');
      else row.setAttribute('data-submitted', state);
    });
  });
  context.window.setAnswerPendingOnly?.('KAI', false);
}
context.window.StorageDB.cache.KAI = { weights: {}, lastSeen: {}, history: [], errorBook: {} };
for (let setNumber = 73; setNumber <= 102; setNumber += 1) {
  context.window.currentSetNumber = setNumber;
  context.window.renderPaper();
  checked.push(`${setNumber}:${assertPaper(setNumber)}`);
}

function seedAdvancedReadiness(student, setStart) {
  const profile = context.window.StorageDB.getProfile(student, 'advanced_fluency_v1');
  profile.weights = {};
  profile.lastSeen = {
    k_dmul_basic: setStart + 7,
    k_ddiv_basic: setStart + 7,
    k_conv_1: setStart + 7,
    k_eq_move: setStart + 7,
    l_div_decimal_dividend: setStart + 7,
    l_fmix_add: setStart + 7,
  };
  profile.errorBook = {
    [`mastered-${student}`]: {
      tag: student === 'KAI' ? 'k_dmul_basic' : 'l_div_decimal_dividend',
      count: 2,
      firstSet: setStart,
      firstDate: 'validator',
      lastSet: setStart + 2,
      lastDate: 'validator',
      mastered: true,
      masteredDate: 'validator',
      info: { q: '1', a: '1' },
    }
  };
  profile.history = Array.from({ length: 8 }, (_, index) => ({
    set: setStart + index,
    ts: Date.now() + index,
    date: 'validator',
    programId: 'advanced_fluency_v1',
    details: index < 2 ? [{
      tag: student === 'KAI' ? 'k_eq_move' : 'l_div_decimal_dividend',
      grade: 'careless',
      info: { sec: 'validator', num: 1, q: '1', a: '1' },
      uid: `u-${student}-${index}`
    }] : [],
    allGrades: Array.from({ length: 36 }, (_, idx) => ({
      tag: idx % 2 ? (student === 'KAI' ? 'k_dmul_basic' : 'l_div_decimal_dividend') : (student === 'KAI' ? 'k_conv_1' : 'l_fmix_add'),
      grade: idx < 34 ? 'perfect' : 'careless'
    })),
    weightAdjustments: [],
    signalAdjustments: [],
    signalSnapshot: null,
  }));
}

seedAdvancedReadiness('KAI', 95);
seedAdvancedReadiness('Lorik', 95);
const legacyClosureCache = context.window.buildClosureProgramSetForTest?.(103, 'KAI') || {};
store.set(getProgramCacheKey('elementary_closure_v1', 103), JSON.stringify(legacyClosureCache));
context.window.currentSetNumber = 103;
context.window.changeProgram('elementary_closure_v1');
if (programSelector.value !== 'elementary_closure_v1' || context.window.getCurrentProgramId?.() !== 'elementary_closure_v1') {
  throw new Error('Manual stage switch did not enter closure directly');
}
if (!String(programTitleLabel?.textContent || '').includes('小学计算收束阶段')) {
  throw new Error('Program shell did not render the closure program label after manual switch');
}
if (!String(stageStatusTitle?.textContent || '').includes('第二阶段')) {
  throw new Error('Stage status card did not render second-stage status text after manual switch');
}
if (!context.window.promotionState?.closureBootstrapped || !Array.isArray(context.window.promotionState?.promotionHistory) || !context.window.promotionState.promotionHistory.length) {
  throw new Error('Manual switch into closure did not record closure bootstrap history');
}
if (context.window.currentSetNumber !== 1) {
  throw new Error(`Expected closure to open on its own set counter at 1, got ${context.window.currentSetNumber}`);
}
context.window.renderPaper();
assertClosurePaper(1);
context.window.currentSetNumber = 103;
const hydratedClosureData = context.window.generateOrLoadSetData();
context.window.renderPaper();
const hydratedClosurePaperHtml = elements.get('paper-container')?.innerHTML || '';
if (
  hydratedClosurePaperHtml.includes('class="prompt-en"') ||
  hydratedClosurePaperHtml.includes('class="ans-prompt-en"') ||
  hydratedClosurePaperHtml.includes('class="ans-help-en"')
) {
  throw new Error('Hydrated closure cache still rendered English helper lines');
}
if (hydratedClosurePaperHtml.includes('class="review-flag"')) {
  throw new Error('Hydrated closure cache still rendered the old overlay review badge');
}
context.window.currentSetNumber = 1;
context.window.renderPaper();
if (!String(elements.get('paper-container')?.innerHTML || '').includes('欢迎进入小学计算收束阶段')) {
  throw new Error('Closure intro card did not render after promotion');
}
assertClosurePhase(1, '收口期', '先接桥，再打通表示与轻量混合');
context.window.changeSet(2);
if (context.window.currentSetNumber !== 3) {
  throw new Error('Closure set counter did not advance independently');
}
context.window.changeProgram('advanced_fluency_v1');
if (context.window.getCurrentProgramId?.() !== 'advanced_fluency_v1') {
  throw new Error('Switching back to advanced did not succeed');
}
if (context.window.currentSetNumber !== 103) {
  throw new Error('Advanced set counter was not restored after returning from closure');
}
context.window.changeProgram('elementary_closure_v1');
if (context.window.currentSetNumber !== 3) {
  throw new Error('Closure set counter was not restored after switching back into closure');
}
context.window.currentSetNumber = 12;
context.window.renderPaper();
assertClosurePaper(12);
assertClosurePhase(12, '收束期', '主体收束：表示切换、复杂混合、方法选择一起练');
context.window.currentSetNumber = 26;
context.window.renderPaper();
assertClosurePaper(26);
assertClosurePhase(26, '毕业判定期', '毕业判定：看结构、判边界、稳迁移');
context.window.currentSetNumber = 103;
context.window.renderPaper();
assertClosurePaper(103);
context.window.printQuestionSheets();
await new Promise(resolve => setTimeout(resolve, 260));
const closurePrintRootHtml = elements.get('print-root')?.innerHTML || '';
if ((closurePrintRootHtml.match(/question-sheet/g) || []).length !== 4) {
  throw new Error('Closure print sandbox did not stage exactly four printable question sheets');
}
emit('afterprint');
const closureData = JSON.parse(store.get(getProgramCacheKey('elementary_closure_v1', 103)) || '{}');
const advancedBeforeProfile = context.window.StorageDB.getProfile('KAI', 'advanced_fluency_v1');
const advancedBefore = JSON.stringify({
  weights: advancedBeforeProfile.weights,
  lastSeen: advancedBeforeProfile.lastSeen,
  history: advancedBeforeProfile.history,
  errorBook: advancedBeforeProfile.errorBook,
});
await context.window.StorageDB.saveSession('KAI', [
  { tag: 'c2_bridge_pct_frac', grade: 'wrong', info: { sec: '收束桥接', num: 1, q: closureData.c_k_bridge?.[0]?.q, a: closureData.c_k_bridge?.[0]?.a, step: closureData.c_k_bridge?.[0]?.step } },
  { tag: 'c2_bridge_ratio_frac', grade: 'wrong', info: { sec: '收束桥接', num: 1, q: closureData.c_k_bridge?.[1]?.q, a: closureData.c_k_bridge?.[1]?.a, step: closureData.c_k_bridge?.[1]?.step } },
  { tag: 'c2_eq_percent', grade: 'wrong', info: { sec: '关系综合', num: 2, q: closureData.c_k_unit?.find(item => item?.tag === 'c2_eq_percent')?.q, a: closureData.c_k_unit?.find(item => item?.tag === 'c2_eq_percent')?.a, step: closureData.c_k_unit?.find(item => item?.tag === 'c2_eq_percent')?.step } },
  { tag: 'c2_speed_mix', grade: 'careless', info: { sec: '结果判断', num: 3, q: closureData.c_k_mix?.[0]?.q, a: closureData.c_k_mix?.[0]?.a, step: closureData.c_k_mix?.[0]?.step } },
  { tag: closureData.c_k_keep?.[0]?.tag, grade: 'wrong', info: { sec: '核心保温', num: 4, q: closureData.c_k_keep?.[0]?.q, a: closureData.c_k_keep?.[0]?.a, step: closureData.c_k_keep?.[0]?.step } },
], 103);
const advancedAfterProfile = context.window.StorageDB.getProfile('KAI', 'advanced_fluency_v1');
const advancedAfter = JSON.stringify({
  weights: advancedAfterProfile.weights,
  lastSeen: advancedAfterProfile.lastSeen,
  history: advancedAfterProfile.history,
  errorBook: advancedAfterProfile.errorBook,
});
if (advancedBefore !== advancedAfter) {
  throw new Error('Phase-two grading polluted the advanced_fluency_v1 profile');
}
const closureProfile = context.window.StorageDB.getProfile('KAI', 'elementary_closure_v1');
if (!closureProfile || !Array.isArray(closureProfile.history) || !closureProfile.history.some(session => session.set === 103)) {
  throw new Error('Phase-two grading did not create closure history');
}
const closureMechanismDetail = closureProfile.history.find(session => session.set === 103)?.details?.find(detail => detail?.tag === 'c2_bridge_pct_frac');
if (!closureMechanismDetail?.mechanismKey) {
  throw new Error('Saved session details are missing mechanismKey metadata');
}
await context.window.StorageDB.saveSession('KAI', [
  { tag: 'c2_bridge_pct_frac', grade: 'perfect', info: { sec: '收束桥接', num: 1, q: closureData.c_k_bridge?.[0]?.q, a: closureData.c_k_bridge?.[0]?.a, step: closureData.c_k_bridge?.[0]?.step } },
], 99, 'elementary_closure_v1');
if ((closureProfile.lastSeen?.c2_bridge_pct_frac || 0) !== 103) {
  throw new Error('Resubmitting an older set regressed lastSeen for a closure tag');
}
if (!closureProfile.errorBook || Object.keys(closureProfile.errorBook).length < 3) {
  throw new Error('Phase-two grading did not populate the closure error book');
}
if (!Object.values(closureProfile.errorBook).every(entry => entry?.mechanismKey)) {
  throw new Error('Closure error-book entries are missing mechanismKey metadata');
}
Object.values(closureProfile.errorBook).forEach(entry => {
  if (String(entry?.tag || '').startsWith('c2_bridge_')) {
    entry.count = 4;
    entry.lastSet = 103;
    entry.mastered = false;
  }
});
for (const field of ['representationGap', 'methodGap', 'stabilityGap', 'speedGap', 'validationGap']) {
  if (typeof closureProfile[field] !== 'number') {
    throw new Error(`Phase-two profile is missing ${field}`);
  }
}
context.window.currentSetNumber = 104;
context.window.renderPaper();
const closureAdaptiveData = JSON.parse(store.get(getProgramCacheKey('elementary_closure_v1', 104)) || '{}');
if (closureAdaptiveData.c_k_focusMeta?.field !== 'representationGap') {
  throw new Error(`Expected KAI adaptive closure focus to target representationGap, got ${closureAdaptiveData.c_k_focusMeta?.field || '(missing)'}`);
}
const closureFocusReplay = closureAdaptiveData.c_k_focus?.find(item => item?.isClosureFocusReplay);
if (!closureFocusReplay) {
  throw new Error('Adaptive closure focus did not inject an explicit closure focus replay item into the KAI focus lane');
}
if (!String(closureFocusReplay?.tag || '').startsWith('c2_bridge_')) {
  throw new Error(`Expected closure focus replay to target a bridge tag, got ${closureFocusReplay?.tag || '(missing)'}`);
}
if (closureFocusReplay?.qualityFamily !== 'conversion_bridge') {
  throw new Error(`Expected closure focus replay to use conversion_bridge quality family, got ${closureFocusReplay?.qualityFamily || '(missing)'}`);
}
if (closureFocusReplay?.replayLevel !== 'L3') {
  throw new Error(`Expected closure focus replay to escalate to L3, got ${closureFocusReplay?.replayLevel || '(missing)'}`);
}
if (!String(elements.get('paper-container')?.innerHTML || '').includes('重点强化：跨表示桥接')) {
  throw new Error('Adaptive closure focus title did not render on the next KAI closure paper');
}
const explanationModes = new Set(['rule', 'method', 'validation']);
const explanationSamples = [
  ...(closureAdaptiveData.c_k_focus || []),
  ...(closureAdaptiveData.c_k_bridge || []),
  ...(closureAdaptiveData.c_l_focus || []),
  ...(closureAdaptiveData.c_l_bridge || []),
].filter(item => ['decimal_division', 'fraction_operation', 'conversion_bridge'].includes(item?.qualityFamily));
if (explanationSamples.length < 2) {
  throw new Error('Expected rollout-family explanation samples from closure paper generation');
}
for (const item of explanationSamples) {
  if (!explanationModes.has(item?.explanationMode)) {
    throw new Error(`Invalid explanation mode on ${item?.tag || '(missing tag)'}`);
  }
  if (typeof item?.step !== 'string' || !item.step.trim()) {
    throw new Error(`Missing explanation text on ${item?.tag || '(missing tag)'}`);
  }
  if (!/^(规则提醒：|方法提醒：|检验提醒：|\[错题回炉 Replay\] 规则提醒：|\[错题回炉 Replay\] 方法提醒：|\[错题回炉 Replay\] 检验提醒：|\[同类变式 Review Variant\] 规则提醒：|\[同类变式 Review Variant\] 方法提醒：|\[同类变式 Review Variant\] 检验提醒：|\[重点强化 Focus Variant\] 规则提醒：|\[重点强化 Focus Variant\] 方法提醒：|\[重点强化 Focus Variant\] 检验提醒：)/.test(item.step)) {
    throw new Error(`Explanation text is missing a structured prefix on ${item?.tag || '(missing tag)'}`);
  }
}
if (closureProfile.representationGap <= 0 || closureProfile.methodGap <= 0 || closureProfile.stabilityGap <= 0 || closureProfile.speedGap <= 0) {
  throw new Error('Phase-two grading did not update the expected closure gap signals');
}
closureProfile.representationGap = 0;
closureProfile.methodGap = 8;
closureProfile.stabilityGap = 0;
closureProfile.speedGap = 0;
closureProfile.validationGap = 0;
Object.keys(closureProfile.errorBook || {}).forEach(uid => {
  const entry = closureProfile.errorBook[uid];
  if (!entry) return;
  if (entry.tag === 'c2_eq_percent') {
    entry.count = 4;
    entry.lastSet = 104;
    entry.mastered = false;
  } else {
    entry.mastered = true;
  }
});
context.window.currentSetNumber = 105;
context.window.renderPaper();
const closureMethodData = JSON.parse(store.get(getProgramCacheKey('elementary_closure_v1', 105)) || '{}');
if (closureMethodData.c_k_focusMeta?.field !== 'methodGap') {
  throw new Error(`Expected KAI closure focus to retarget methodGap, got ${closureMethodData.c_k_focusMeta?.field || '(missing)'}`);
}
const closureMethodReplay = closureMethodData.c_k_focus?.find(item => item?.isClosureFocusReplay);
if (!closureMethodReplay) {
  throw new Error('Method-gap closure focus did not inject an explicit closure focus replay item');
}
if (closureMethodReplay?.qualityFamily !== 'equation_method') {
  throw new Error(`Expected method-gap closure focus replay to use equation_method, got ${closureMethodReplay?.qualityFamily || '(missing)'}`);
}
if (closureMethodReplay?.replayLevel !== 'L3') {
  throw new Error(`Expected method-gap closure focus replay to escalate to L3, got ${closureMethodReplay?.replayLevel || '(missing)'}`);
}
if (closureMethodReplay?.closureFocusMode !== 'L3_boundary') {
  throw new Error(`Expected method-gap closure focus replay to use L3_boundary mode, got ${closureMethodReplay?.closureFocusMode || '(missing)'}`);
}
if (closureMethodReplay?.explanationMode !== 'rule') {
  throw new Error(`Expected method-gap closure focus replay to use rule explanation mode, got ${closureMethodReplay?.explanationMode || '(missing)'}`);
}
if (!String(closureMethodReplay?.step || '').includes('[重点强化 Boundary]')) {
  throw new Error('Expected method-gap L3 closure focus replay to use a dedicated boundary-style explanation');
}
if (!String(elements.get('paper-container')?.innerHTML || '').includes('重点强化：单位与建模')) {
  throw new Error('Method-gap closure focus title did not render on the next KAI closure paper');
}
closureProfile.representationGap = 0;
closureProfile.methodGap = 0;
closureProfile.stabilityGap = 0;
closureProfile.speedGap = 0;
closureProfile.validationGap = 9;
Object.keys(closureProfile.errorBook || {}).forEach(uid => {
  const entry = closureProfile.errorBook[uid];
  if (!entry) return;
  if (entry.tag === 'c2_est_product') {
    entry.count = 4;
    entry.lastSet = 105;
    entry.mastered = false;
  } else {
    entry.mastered = true;
  }
});
closureProfile.errorBook.validationL3 = {
  tag: 'c2_est_product',
  grade: 'wrong',
  count: 4,
  firstSet: 105,
  lastSet: 105,
  mastered: false,
  info: {
    q: '19.8 &times; 4.9 的结果更接近<div class="blank"></div>',
    a: '100',
    step: '先看数量级，再判断结果范围。'
  }
};
context.window.currentSetNumber = 106;
context.window.renderPaper();
const closureValidationData = JSON.parse(store.get(getProgramCacheKey('elementary_closure_v1', 106)) || '{}');
if (closureValidationData.c_k_focusMeta?.field !== 'validationGap') {
  throw new Error(`Expected KAI closure focus to retarget validationGap, got ${closureValidationData.c_k_focusMeta?.field || '(missing)'}`);
}
const closureValidationReplay = closureValidationData.c_k_focus?.find(item => item?.isClosureFocusReplay);
if (!closureValidationReplay) {
  throw new Error('Validation-gap closure focus did not inject an explicit closure focus replay item');
}
if (closureValidationReplay?.qualityFamily !== 'validation_estimation') {
  throw new Error(`Expected validation-gap closure focus replay to use validation_estimation, got ${closureValidationReplay?.qualityFamily || '(missing)'}`);
}
if (closureValidationReplay?.replayLevel !== 'L3') {
  throw new Error(`Expected validation-gap closure focus replay to escalate to L3, got ${closureValidationReplay?.replayLevel || '(missing)'}`);
}
if (closureValidationReplay?.closureFocusMode !== 'L3_boundary') {
  throw new Error(`Expected validation-gap closure focus replay to use L3_boundary mode, got ${closureValidationReplay?.closureFocusMode || '(missing)'}`);
}
if (closureValidationReplay?.explanationMode !== 'validation') {
  throw new Error(`Expected validation-gap closure focus replay to use validation explanation mode, got ${closureValidationReplay?.explanationMode || '(missing)'}`);
}
if (!String(closureValidationReplay?.step || '').includes('[重点强化 Boundary]')) {
  throw new Error('Expected validation-gap L3 closure focus replay to use a dedicated boundary-style explanation');
}
if (!String(elements.get('paper-container')?.innerHTML || '').includes('重点强化：结果检验')) {
  throw new Error('Validation-gap closure focus title did not render on the next KAI closure paper');
}
closureProfile.representationGap = 0;
closureProfile.methodGap = 0;
closureProfile.stabilityGap = 0;
closureProfile.speedGap = 9;
closureProfile.validationGap = 0;
Object.keys(closureProfile.errorBook || {}).forEach(uid => {
  const entry = closureProfile.errorBook[uid];
  if (!entry) return;
  if (entry.tag === 'c2_speed_mix') {
    entry.count = 4;
    entry.lastSet = 106;
    entry.mastered = false;
  } else {
    entry.mastered = true;
  }
});
closureProfile.errorBook.speedL3 = {
  tag: 'c2_speed_mix',
  grade: 'wrong',
  count: 4,
  firstSet: 106,
  lastSet: 106,
  mastered: false,
  info: {
    q: '125 &times; 24 的结果是<div class="blank"></div>',
    a: '3000',
    step: '先找 125×8=1000 的结构。'
  }
};
context.window.currentSetNumber = 107;
context.window.renderPaper();
const closureSpeedData = JSON.parse(store.get(getProgramCacheKey('elementary_closure_v1', 107)) || '{}');
if (closureSpeedData.c_k_focusMeta?.field !== 'speedGap') {
  throw new Error(`Expected KAI closure focus to retarget speedGap, got ${closureSpeedData.c_k_focusMeta?.field || '(missing)'}`);
}
const closureSpeedReplay = closureSpeedData.c_k_focus?.find(item => item?.isClosureFocusReplay);
if (!closureSpeedReplay) {
  throw new Error('Speed-gap closure focus did not inject an explicit closure focus replay item');
}
if (closureSpeedReplay?.qualityFamily !== 'unit_rate_speed') {
  throw new Error(`Expected speed-gap closure focus replay to use unit_rate_speed, got ${closureSpeedReplay?.qualityFamily || '(missing)'}`);
}
if (closureSpeedReplay?.replayLevel !== 'L3') {
  throw new Error(`Expected speed-gap closure focus replay to escalate to L3, got ${closureSpeedReplay?.replayLevel || '(missing)'}`);
}
if (closureSpeedReplay?.closureFocusMode !== 'L3_boundary') {
  throw new Error(`Expected speed-gap closure focus replay to use L3_boundary mode, got ${closureSpeedReplay?.closureFocusMode || '(missing)'}`);
}
if (closureSpeedReplay?.explanationMode !== 'method') {
  throw new Error(`Expected speed-gap closure focus replay to use method explanation mode, got ${closureSpeedReplay?.explanationMode || '(missing)'}`);
}
if (!String(closureSpeedReplay?.step || '').includes('[重点强化 Boundary]')) {
  throw new Error('Expected speed-gap L3 closure focus replay to use a dedicated boundary-style explanation');
}
if (!String(elements.get('paper-container')?.innerHTML || '').includes('重点强化：速度稳定')) {
  throw new Error('Speed-gap closure focus title did not render on the next KAI closure paper');
}
closureProfile.representationGap = 0;
closureProfile.methodGap = 0;
closureProfile.stabilityGap = 9;
closureProfile.speedGap = 0;
closureProfile.validationGap = 0;
Object.keys(closureProfile.errorBook || {}).forEach(uid => {
  const entry = closureProfile.errorBook[uid];
  if (!entry) return;
  if (entry.tag === 'k_ddiv_decimal_q' || entry.tag === 'k_ddiv_shift') {
    entry.count = 4;
    entry.lastSet = 107;
    entry.mastered = false;
  } else {
    entry.mastered = true;
  }
});
closureProfile.errorBook.stabilityL3 = {
  tag: 'k_ddiv_decimal_q',
  grade: 'wrong',
  count: 4,
  firstSet: 107,
  lastSet: 107,
  mastered: false,
  info: {
    q: '0.84 &divide; 1.2',
    a: '0.7',
    step: '先判断商小于 1，再决定小数点位置。'
  }
};
context.window.currentSetNumber = 108;
context.window.renderPaper();
const closureStabilityData = JSON.parse(store.get(getProgramCacheKey('elementary_closure_v1', 108)) || '{}');
if (closureStabilityData.c_k_focusMeta?.field !== 'stabilityGap') {
  throw new Error(`Expected KAI closure focus to retarget stabilityGap, got ${closureStabilityData.c_k_focusMeta?.field || '(missing)'}`);
}
const closureStabilityReplay = closureStabilityData.c_k_focus?.find(item => item?.isClosureFocusReplay);
if (!closureStabilityReplay) {
  throw new Error('Stability-gap closure focus did not inject an explicit closure focus replay item');
}
if (closureStabilityReplay?.qualityFamily !== 'decimal_division') {
  throw new Error(`Expected stability-gap closure focus replay to use decimal_division, got ${closureStabilityReplay?.qualityFamily || '(missing)'}`);
}
if (closureStabilityReplay?.replayLevel !== 'L3') {
  throw new Error(`Expected stability-gap closure focus replay to escalate to L3, got ${closureStabilityReplay?.replayLevel || '(missing)'}`);
}
if (closureStabilityReplay?.closureFocusMode !== 'L3_boundary') {
  throw new Error(`Expected stability-gap closure focus replay to use L3_boundary mode, got ${closureStabilityReplay?.closureFocusMode || '(missing)'}`);
}
if (closureStabilityReplay?.explanationMode !== 'rule') {
  throw new Error(`Expected stability-gap closure focus replay to use rule explanation mode, got ${closureStabilityReplay?.explanationMode || '(missing)'}`);
}
if (!String(closureStabilityReplay?.step || '').includes('[重点强化 Boundary]')) {
  throw new Error('Expected stability-gap L3 closure focus replay to use a dedicated boundary-style explanation');
}
if (!String(elements.get('paper-container')?.innerHTML || '').includes('重点强化：旧知稳态')) {
  throw new Error('Stability-gap closure focus title did not render on the next KAI closure paper');
}
context.window.showSetReview(103, 'KAI');
const closureReviewHtml = elements.get('report-content-area')?.innerHTML || '';
if (!closureReviewHtml.includes('第二阶段') || !closureReviewHtml.includes('表征切换') || !closureReviewHtml.includes('旧知保温')) {
  throw new Error('Phase-two set review is missing closure-specific reporting');
}
if (missingAdvice.size) {
  throw new Error(`Missing KnowledgeBase advice for tags: ${[...missingAdvice].sort().join(', ')}`);
}
if (missingDomain.size) {
  throw new Error(`Missing KnowledgeDomains coverage for tags: ${[...missingDomain].sort().join(', ')}`);
}
for (const level of [1, 2, 3, 4]) {
  if (!observedLevels.has(level)) {
    throw new Error(`No generated items observed for training level L${level}`);
  }
}

console.log(`Runtime validation passed for sets ${checked.join(', ')}.`);
