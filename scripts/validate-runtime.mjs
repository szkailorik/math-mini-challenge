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
if (!html.includes('body.print-sandbox-active #print-root .ans-sheet .ans-section[data-sec-index="5"]') || !html.includes('page-break-before: always')) {
  throw new Error('Answer print CSS must force a page break before section five');
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
if (!html.includes('function getPracticeMixStats') || !html.includes('今日训练结构')) {
  throw new Error('Visible daily practice mix summary is missing from runtime script');
}
if (!html.includes('window.printErrorBookPractice')) {
  throw new Error('Full error-book targeted practice printer is missing from runtime script');
}
if (!html.includes('buildErrorBookPracticePrintHTML')) {
  throw new Error('Error-book targeted practice print builder is missing from runtime script');
}
if (!html.includes('data-error-book-practice="true"') || !html.includes('.set-review-followup-print-shell[data-error-book-practice="true"] .followup-print-sheet') || !html.includes('.set-review-followup-print-shell[data-error-book-practice="true"] .followup-print-list')) {
  throw new Error('Error-book targeted practice print sheets must use the multi-page-safe block layout');
}
if (!html.includes('max-height: min(42vh, 330px)') || !html.includes('grid-template-columns: repeat(8, minmax(0, 1fr))') || !html.includes('mask-image: linear-gradient(90deg, #000 82%, transparent)')) {
  throw new Error('Floating control panel should stay compact on the home screen');
}
if (!html.includes('window.openErrorBookPracticeReview') || !html.includes('window.submitErrorBookPractice')) {
  throw new Error('Error-book targeted practice grading workflow is missing from runtime script');
}
if (!html.includes('buildErrorBookPracticeResultHTML') || !html.includes('buildErrorBookPracticeLogHTML')) {
  throw new Error('Error-book targeted practice reports are missing from runtime script');
}
if (!html.includes('window.openErrorBookPracticeLog') || !html.includes('window.printCurrentErrorBookPracticeResult') || !html.includes('window.printCurrentErrorBookExplainChecklist') || !html.includes('buildErrorBookPracticeExplainChecklistHTML')) {
  throw new Error('Error-book targeted practice report reopen/print actions are missing from runtime script');
}
if (!html.includes('复错优先卷') || !html.includes('priorityOnly')) {
  throw new Error('Wrong-again priority practice sheet workflow is missing from runtime script');
}
if (!html.includes('saveErrorBookPractice')) {
  throw new Error('Error-book targeted practice persistence is missing from storage layer');
}
if (!html.includes('normalizeSessionMistakeDetails') || !html.includes('buildSetReviewIntegrityHTML')) {
  throw new Error('Set-report mistake integrity repair/check workflow is missing from runtime script');
}
if (!html.includes('showSetReportIntegrityAudit') || !html.includes('错题体检')) {
  throw new Error('Set-report integrity audit panel is missing from runtime script or control panel');
}
if (!html.includes('buildSubmittedAnswerActionsHTML') || !html.includes('提交后对照')) {
  throw new Error('Post-submit set review actions are missing from answer sheets');
}
if (!html.includes('function toggleAnswerQuickMode') || !html.includes('answer-only-mode') || !html.includes('答案速查') || !html.includes('ans-answer-num')) {
  throw new Error('Answer-key quick-scan mode is missing from runtime script or styles');
}
if (!html.includes('handlePostSubmitReviewNavigation') || !html.includes('回到${student}答案页')) {
  throw new Error('Post-submit automatic report navigation is missing from runtime script');
}
if (!html.includes('printCurrentSetReviewReport') || !html.includes('打印当前报告') || !html.includes('只打印${highlightStudent}报告')) {
  throw new Error('Set review report print action is missing from runtime script');
}
if (!html.includes('buildKnowledgeWeakRows') || !html.includes('buildKnowledgeNextStepCards') || !html.includes('buildKnowledgeDomainHeatmap') || !html.includes('printErrorBookDomainPractice') || !html.includes('openErrorBookDomainPracticeReview') || !html.includes('领域专项补练')) {
  throw new Error('Human-readable knowledge map workflow is missing from runtime script');
}
if (!html.includes("content: '复'") || !html.includes('followup-review-log')) {
  throw new Error('Black-and-white review markers are missing from review/print styles');
}
if (!html.includes('function buildSetReviewPaperGradeHTML') || !html.includes('function buildSetReviewPrintActionGuide') || !html.includes('followup-paper-grade') || !html.includes('followup-print-action-guide')) {
  throw new Error('Set review print paper-grading and refill guidance is missing');
}
if (!html.includes('function buildErrorBookPracticeBatchToolsHTML') || !html.includes('window.markErrorBookPracticeBatch') || !html.includes('window.clearErrorBookPracticeBatch') || !html.includes('function updateErrorBookPracticeBatchProgress') || !html.includes('practice-batch-tools')) {
  throw new Error('Error-book practice batch refill workflow is missing');
}
if (!html.includes('function normalizeErrorBookPracticeLimit') || !html.includes('function arrangeErrorBookPracticeEntries') || !html.includes('function getErrorBookPracticeDiversityCaps') || !html.includes('function getErrorBookPracticeMechanismSummaryText') || !html.includes("'representation-conversion': '表示转换'") || !html.includes('computeQuestionFingerprint(built.q)') || !html.includes('function getErrorBookPracticeSeed') || !html.includes('function getErrorBookPracticePackCode') || !html.includes('function getErrorBookPracticeLane') || !html.includes('data-practice-lane') || !html.includes('交错') || !html.includes('结构：') || !html.includes('function refreshErrorBookEntrySchedule') || !html.includes('function getErrorBookMasteryRequirement') || !html.includes('function buildErrorBookReviewQueueHTML') || !html.includes('function buildErrorBookPracticeActionPanel') || !html.includes('needsExplainCount') || !html.includes('masteryPending') || !html.includes('专项需讲解') || !html.includes('专项已会·待巩固') || !html.includes('今日10题（推荐）') || !html.includes('加量20题') || !html.includes('第二天安排') || !html.includes('锁定同一套') || !html.includes('锁定码')) {
  throw new Error('Error-book quick print sizing and locked-pack workflow is missing');
}
if (!html.includes('.export-btn { display: none;') || !html.includes('position: sticky') || !html.includes('width: min(1040px, calc(100vw - 20px))') || !html.includes('max-height: min(42vh, 330px)')) {
  throw new Error('Initial page toolbar layout should avoid floating over the worksheet');
}
if (!html.includes('还有 ${missingRows.length} 题没有回填') || !html.includes('还差 ${items.length} 题未回填') || !html.includes('practice-batch-progress')) {
  throw new Error('Error-book practice complete-refill guard is missing');
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
if (!html.includes('function getSetReviewVariantQuality')) {
  throw new Error('Set Review follow-up quality gate is missing from runtime script');
}
if (!html.includes('function getSetReviewVariantSelectionScore') || !html.includes('function collectSetReviewVariantCandidates')) {
  throw new Error('Set Review follow-up candidate-pool selector is missing from runtime script');
}
if (!html.includes('function getSetReviewStructureSignature')) {
  throw new Error('Set Review follow-up structure signature helper is missing from runtime script');
}
if (!html.includes('function buildSetReviewFollowupItems')) {
  throw new Error('Set Review follow-up item builder is missing from runtime script');
}
if (!html.includes('function getSetReviewFollowupAudit') || !html.includes('变式体检')) {
  throw new Error('Set Review follow-up audit workflow is missing from runtime script');
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
if (!html.includes('function buildSetReviewQualityBadge')) {
  throw new Error('Set Review follow-up quality badge helper is missing from runtime script');
}
if (!html.includes('function getSetReviewFollowupPrintPack')) {
  throw new Error('Set Review follow-up print-pack helper is missing from runtime script');
}
if (!html.includes('function buildSetReviewFollowupHTML')) {
  throw new Error('Set Review follow-up renderer is missing from runtime script');
}
if (
  !html.includes('function buildSetReviewFollowupAnswerPrintHTML') ||
  !html.includes('function buildSetReviewFollowupPracticeReviewHTML') ||
  !html.includes('window.printSetReviewFollowupAnswers') ||
  !html.includes('window.openSetReviewFollowupPracticeReview') ||
  !html.includes('function buildSetReviewBackupBankHTML') ||
  !html.includes('function buildSetReviewBackupAnswerHTML') ||
  !html.includes('function buildSetReviewBackupAnswerPrintHTML') ||
  !html.includes('function buildSetReviewBackupPracticeReviewHTML') ||
  !html.includes('window.printSetReviewBackupAnswers') ||
  !html.includes('window.openSetReviewBackupPracticeReview') ||
  !html.includes('window.printSetReviewBackupFollowup')
) {
  throw new Error('Set Review backup variant bank workflow is missing from runtime script');
}
if (!html.includes('function buildSetReviewFollowupAnswerHTML')) {
  throw new Error('Set Review follow-up answer renderer is missing from runtime script');
}
if (!html.includes('function buildSetReviewFollowupPrintHTML')) {
  throw new Error('Set Review follow-up print shell is missing from runtime script');
}
if (!html.includes('function buildSetReviewFollowupPreviewHTML') || !html.includes('window.openSetReviewFollowupPreview') || !html.includes('window.regenerateSetReviewFollowupPreview') || !html.includes('预览、打印、批改会复用同一套题') || !html.includes('今日变式快速预览')) {
  throw new Error('Set Review follow-up quick preview workflow is missing from runtime script');
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
if (!html.includes("complex_mixed: '复杂混合'") || !html.includes("arithmetic_fluency: '基础运算变式'")) {
  throw new Error('Set Review follow-up family labels are missing from runtime script');
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
if (!html.includes('function getCalculationQuickReviewTopicTier')) {
  throw new Error('Calculation Quick Review topic-tier helper is missing from runtime script');
}
if (!html.includes('function getCalculationQuickReviewTierKey')) {
  throw new Error('Calculation Quick Review tier-key helper is missing from runtime script');
}
if (!html.includes('function getCalculationQuickReviewPriority')) {
  throw new Error('Calculation Quick Review priority helper is missing from runtime script');
}
if (!html.includes('function getCalculationQuickReviewPriorityGroups')) {
  throw new Error('Calculation Quick Review priority-group helper is missing from runtime script');
}
if (!html.includes('function getCalculationQuickReviewRouteGroups')) {
  throw new Error('Calculation Quick Review route-group helper is missing from runtime script');
}
if (!html.includes('function getCalculationQuickReviewCheckpoint')) {
  throw new Error('Calculation Quick Review checkpoint helper is missing from runtime script');
}
if (!html.includes('function getCalculationQuickReviewMicroDrill')) {
  throw new Error('Calculation Quick Review micro-drill helper is missing from runtime script');
}
if (!html.includes('function getCalculationQuickReviewSelfCheck')) {
  throw new Error('Calculation Quick Review self-check helper is missing from runtime script');
}
if (!html.includes('function buildCalculationQuickReviewMicroDrillSheetHTML')) {
  throw new Error('Calculation Quick Review micro-drill sheet builder is missing from runtime script');
}
if (!html.includes('function getCalculationQuickReviewConfusable')) {
  throw new Error('Calculation Quick Review confusable-model helper is missing from runtime script');
}
if (!html.includes('window.jumpToQuickReviewTopic = jumpToQuickReviewTopic;')) {
  throw new Error('Calculation Quick Review topic jump helper is missing from runtime script');
}
if (!html.includes('window.setCalculationQuickReviewModelFilter = setCalculationQuickReviewModelFilter;')) {
  throw new Error('Calculation Quick Review model-filter helper is missing from runtime script');
}
if (!html.includes('window.showCalculationQuickReview = function()')) {
  throw new Error('Calculation Quick Review entrypoint is missing from runtime script');
}
if (!html.includes('window.printCalculationQuickReview = function()')) {
  throw new Error('Calculation Quick Review print function is missing from runtime script');
}
if (!html.includes('window.printCalculationQuickReviewMicroDrillSheet = function()')) {
  throw new Error('Calculation Quick Review micro-drill sheet print function is missing from runtime script');
}
if (!html.includes('window.showCalculationQuickReview()') && !html.includes("window.showCalculationQuickReview()")) {
  throw new Error('Calculation Quick Review control-panel shortcut is missing its action binding');
}
if (!html.includes('📘 计算知识总览 / Quick Review') && !html.includes('📘 计算总览') && !html.includes('📘 名师词典')) {
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

function extractAnswerSheets() {
  const paper = elements.get('paper-container')?.innerHTML || '';
  const starts = [...paper.matchAll(/<div class="sheet ans-sheet/g)].map(match => match.index);
  if (starts.length === 0) return [];
  starts.push(paper.length);
  const sheets = [];
  for (let i = 0; i < starts.length - 1; i += 1) {
    sheets.push(paper.slice(starts[i], starts[i + 1]));
  }
  return sheets;
}

function extractAnswerSectionHtml(sourceHtml, studentId, sectionIndex) {
  const idNeedle = `id="${studentId}-ans-sheet"`;
  const sheetStart = String(sourceHtml || '').indexOf(idNeedle);
  if (sheetStart === -1) return '';
  const nextSheet = String(sourceHtml || '').indexOf('<div class="sheet ans-sheet"', sheetStart + idNeedle.length);
  const sheetHtml = String(sourceHtml || '').slice(sheetStart, nextSheet === -1 ? String(sourceHtml || '').length : nextSheet);
  const startNeedle = `<div class="ans-section" data-sec-index="${sectionIndex}"`;
  const sectionStart = sheetHtml.indexOf(startNeedle);
  if (sectionStart === -1) return '';
  const nextNeedle = `<div class="ans-section" data-sec-index="${sectionIndex + 1}"`;
  const sectionEnd = sheetHtml.indexOf(nextNeedle, sectionStart + startNeedle.length);
  return sheetHtml.slice(sectionStart, sectionEnd === -1 ? sheetHtml.length : sectionEnd);
}

function extractAnswerRecords(sectionHtml) {
  return [...String(sectionHtml || '').matchAll(/<div class="ans-row[^"]*"[^>]*data-tag="([^"]*)"[^>]*data-info="([^"]*)"/g)].map(match => {
    const tag = match[1] || '';
    const info = JSON.parse(decodeURIComponent(match[2] || '%7B%7D'));
    return { tag, info, grade: 'wrong', rowKey: context.window.getAnswerRowKey?.(tag, info) };
  });
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
      return extractAnswerSheets().map(outerHTML => ({ outerHTML }));
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
  open() {
    context.__popupCalls = (context.__popupCalls || 0) + 1;
    return {
      document: {
        open() {},
        write() {},
        close() {},
      },
      focus() {},
      close() {},
    };
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

async function assertSafariSamePagePrint(label, printFn, expectedText = '') {
  emit('afterprint');
  context.__printCalls = 0;
  context.__popupCalls = 0;
  const originalVendor = context.navigator.vendor || '';
  const originalUserAgent = context.navigator.userAgent || '';
  context.navigator.vendor = 'Apple Computer, Inc.';
  context.navigator.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';
  try {
    await printFn();
    await new Promise(resolve => setTimeout(resolve, 280));
    const stagedHtml = String(elements.get('print-root')?.innerHTML || '');
    if ((context.__printCalls || 0) < 1) {
      throw new Error(`${label} did not call same-page window.print`);
    }
    if ((context.__popupCalls || 0) !== 0) {
      throw new Error(`${label} opened an extra popup/blank page`);
    }
    if (!stagedHtml.trim()) {
      throw new Error(`${label} staged an empty print root`);
    }
    if (expectedText && !stagedHtml.includes(expectedText)) {
      throw new Error(`${label} print root is missing expected content: ${expectedText}`);
    }
  } finally {
    context.navigator.vendor = originalVendor;
    context.navigator.userAgent = originalUserAgent;
    emit('afterprint');
  }
}

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
const quickReviewTopics = context.getCalculationQuickReviewTopics?.() || [];
if (!Array.isArray(quickReviewTopics) || quickReviewTopics.length !== 16) {
  throw new Error('Calculation Quick Review should render exactly 16 mental-model topics');
}
if (context.getCalculationQuickReviewTopicTier?.({ id: 'chicken_rabbit_assumption' }) !== '进阶模型' || context.getCalculationQuickReviewTopicTier?.({ id: 'equation_inverse' }) !== '进阶模型' || context.getCalculationQuickReviewTopicTier?.({ id: 'order_first' }) !== '核心模型') {
  throw new Error('Calculation Quick Review should mark core and advanced model tiers');
}
if (context.getCalculationQuickReviewTierKey?.({ id: 'equation_inverse' }) !== 'advanced' || context.getCalculationQuickReviewTierKey?.({ id: 'order_first' }) !== 'core') {
  throw new Error('Calculation Quick Review should expose tier keys for filtering');
}
if (context.getCalculationQuickReviewPriority?.({ id: 'order_first' })?.label !== '高频必练' || context.getCalculationQuickReviewPriority?.({ id: 'make_ten' })?.label !== '每周巩固' || context.getCalculationQuickReviewPriority?.({ id: 'equation_inverse' })?.label !== '进阶拓展') {
  throw new Error('Calculation Quick Review should expose learning-priority labels');
}
const quickReviewPriorityGroups = context.getCalculationQuickReviewPriorityGroups?.() || [];
if (!Array.isArray(quickReviewPriorityGroups) || quickReviewPriorityGroups.length !== 3 || !quickReviewPriorityGroups.some(group => group.label === '高频必练')) {
  throw new Error('Calculation Quick Review should expose three priority groups');
}
if (!context.getCalculationQuickReviewUseWhen?.({ id: 'chicken_rabbit_assumption' })?.includes('总只数') || !context.getCalculationQuickReviewModelSummary?.(quickReviewTopics)?.includes('13 个核心模型')) {
  throw new Error('Calculation Quick Review should explain when to use each model and summarize core/advanced counts');
}
const quickReviewRoutes = context.getCalculationQuickReviewRouteGroups?.() || [];
if (!Array.isArray(quickReviewRoutes) || quickReviewRoutes.length !== 4 || !quickReviewRoutes.some(route => route.label === '已学进阶再处理')) {
  throw new Error('Calculation Quick Review should expose four model-selection route groups');
}
if (!quickReviewRoutes.every(route => route.question) || !quickReviewRoutes.some(route => /小数点/.test(route.question))) {
  throw new Error('Calculation Quick Review route groups should include first-question prompts');
}
if (!context.getCalculationQuickReviewCheckpoint?.({ id: 'equation_inverse' })?.q?.includes('x')) {
  throw new Error('Calculation Quick Review should provide per-model recognition checkpoints');
}
if (!context.getCalculationQuickReviewMicroDrill?.({ id: 'chicken_rabbit_assumption' })?.a?.includes('兔 4 只') || !context.getCalculationQuickReviewMicroDrill?.({ id: 'decimal_scale' })?.q?.includes('0.6') || !context.getCalculationQuickReviewMicroDrill?.({ id: 'equation_inverse' })?.warning?.includes('逆运算')) {
  throw new Error('Calculation Quick Review should provide model-aligned micro drills');
}
if (!context.getCalculationQuickReviewSelfCheck?.({ id: 'division_scale' })?.includes('同倍') || !context.getCalculationQuickReviewSelfCheck?.({ id: 'chicken_rabbit_assumption' })?.includes('全假设')) {
  throw new Error('Calculation Quick Review should provide model-specific self-check cues');
}
const quickReviewDrillSheetHtml = context.buildCalculationQuickReviewMicroDrillSheetHTML?.() || '';
if (!quickReviewDrillSheetHtml.includes('16题模型微练卷') || !quickReviewDrillSheetHtml.includes('参考答案') || !quickReviewDrillSheetHtml.includes('自查：') || !quickReviewDrillSheetHtml.includes('错法提醒')) {
  throw new Error('Calculation Quick Review micro-drill sheet should include questions, answers, and cues');
}
if (!context.getCalculationQuickReviewConfusable?.({ id: 'decimal_scale' })?.includes('小数除法')) {
  throw new Error('Calculation Quick Review should provide per-model confusion cues');
}
if (!reviewModalTitle.includes('16大终极心智模型')) {
  throw new Error('Calculation Quick Review did not update the modal title');
}
if (!reviewModalHtml.includes('quick-review-page') || !reviewModalHtml.includes('01. 先定顺序模型') || !reviewModalHtml.includes('15. 假设差量模型') || !reviewModalHtml.includes('16. 方程逆运算模型') || !reviewModalHtml.includes('鸡兔共 8 只')) {
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
if (!reviewModalHtml.includes('什么时候用') || !reviewModalHtml.includes('本页不是题库摘抄')) {
  throw new Error('Calculation Quick Review use-case and model-summary copy did not render');
}
if (!reviewModalHtml.includes('先看算式结构') || !reviewModalHtml.includes('已学进阶再处理') || !reviewModalHtml.includes('先问自己')) {
  throw new Error('Calculation Quick Review route groups did not render');
}
if (!reviewModalHtml.includes('全部 16 个') || !reviewModalHtml.includes('只看核心 13 个') || !reviewModalHtml.includes('只看进阶 3 个') || !reviewModalHtml.includes('data-model-filter="all"')) {
  throw new Error('Calculation Quick Review model filters did not render');
}
if (!reviewModalHtml.includes('高频必练') || !reviewModalHtml.includes('每周巩固') || !reviewModalHtml.includes('进阶拓展') || !reviewModalHtml.includes('data-priority="daily"')) {
  throw new Error('Calculation Quick Review priority guidance did not render');
}
if (!reviewModalHtml.includes('1题微练') || !reviewModalHtml.includes('做完后看答案') || !reviewModalHtml.includes('错法提醒') || !reviewModalHtml.includes('自查口令') || !reviewModalHtml.includes('马上练：0.6 × 0.08') || !reviewModalHtml.includes('兔 4 只，鸡 6 只')) {
  throw new Error('Calculation Quick Review micro drills did not render');
}
if (!reviewModalHtml.includes('打印16题微练+答案')) {
  throw new Error('Calculation Quick Review micro-drill print shortcut did not render');
}
if (!reviewModalHtml.includes('先判断') || !reviewModalHtml.includes('想好后点开提示') || !reviewModalHtml.includes('应想到：') || !reviewModalHtml.includes('鸡兔同笼总脚数已知')) {
  throw new Error('Calculation Quick Review checkpoints did not render');
}
if (!reviewModalHtml.includes('别混淆') || !reviewModalHtml.includes('加减看对齐')) {
  throw new Error('Calculation Quick Review confusion cues did not render');
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
if (!reviewModalHtml.includes('模型例题') || !reviewModalHtml.includes('补充速查') || !reviewModalHtml.includes('回想顺序')) {
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
if (!quickReviewPrintRootHtml.includes('家长提示：') || !quickReviewPrintRootHtml.includes('quick-review-checkpoint-print-answer')) {
  throw new Error('Calculation Quick Review print sandbox should include parent-facing checkpoint answers');
}
if (!quickReviewPrintRootHtml.includes('微练答案：') || !quickReviewPrintRootHtml.includes('错法提醒') || !quickReviewPrintRootHtml.includes('自查口令') || !quickReviewPrintRootHtml.includes('quick-review-micro-print-answer')) {
  throw new Error('Calculation Quick Review print sandbox should include micro-drill answers');
}
context.__printCalls = 0;
context.printCalculationQuickReviewMicroDrillSheet();
await new Promise(resolve => setTimeout(resolve, 260));
if ((context.__printCalls || 0) < 1) {
  throw new Error('Calculation Quick Review micro-drill sheet print function did not call window.print');
}
const microDrillPrintRootHtml = String(elements.get('print-root')?.innerHTML || '');
if (!microDrillPrintRootHtml.includes('quick-review-drill-print-shell') || !microDrillPrintRootHtml.includes('16题模型微练卷 · 参考答案') || !microDrillPrintRootHtml.includes('自查：') || !microDrillPrintRootHtml.includes('错法提醒')) {
  throw new Error('Calculation Quick Review micro-drill sheet print sandbox is incomplete');
}
emit('afterprint');
context.__printCalls = 0;
context.__popupCalls = 0;
context.navigator.vendor = 'Apple Computer, Inc.';
context.navigator.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';
context.printCalculationQuickReviewMicroDrillSheet();
await new Promise(resolve => setTimeout(resolve, 260));
if ((context.__printCalls || 0) < 1) {
  throw new Error('Safari-style print path should still call same-page window.print');
}
if ((context.__popupCalls || 0) !== 0) {
  throw new Error('Safari-style print path should not open an extra blank popup window');
}
emit('afterprint');
context.navigator.vendor = '';
context.navigator.userAgent = 'math-mini-challenge-validator';
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
  if (!paper.includes('Mini Challenge Advanced') || !paper.includes('Quick Answers')) {
    throw new Error(`Generated paper for set ${setNumber} is missing challenge or answer sections`);
  }
  if (paper.includes('Detailed Solutions') || paper.includes('解析 Steps') || paper.includes('易错点 Tip')) {
    throw new Error(`Generated answer sheets for set ${setNumber} still show long solution-page labels`);
  }
  if (!paper.includes('核对点：')) {
    throw new Error(`Generated answer sheets for set ${setNumber} are missing compact answer-check hints`);
  }
  if (!paper.includes('答案速查') || !paper.includes('ans-answer-num')) {
    throw new Error(`Generated answer sheets for set ${setNumber} are missing quick-scan controls or answer numbers`);
  }
  if (!paper.includes('今日训练结构') || !paper.includes('错题相关') || !paper.includes('新题/交错')) {
    throw new Error(`Generated answer sheets for set ${setNumber} are missing the daily practice mix summary`);
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
  assertAdvancedAnswerKeyCoverage(paper, setNumber);
  return sheetCount;
}

function assertAdvancedAnswerKeyCoverage(paper, setNumber) {
  const expectations = {
    kai: [
      { index: 1, count: 4, sec: '复杂乘法' },
      { index: 2, count: 4, sec: '复杂除法' },
      { index: 3, count: 4, sec: '大数减法' },
      { index: 4, count: 8, sec: '互化结果' },
      { index: 5, count: 12, sec: '繁分数与方程' },
      { index: 6, count: 4, sec: '奥数混合运算' },
    ],
    lorik: [
      { index: 1, count: 4, sec: '进阶乘法' },
      { index: 2, count: 4, sec: '进阶除法' },
      { index: 3, count: 4, sec: '大数减法' },
      { index: 4, count: 8, sec: '互化与比较' },
      { index: 5, count: 12, sec: '分数四则运算' },
      { index: 6, count: 4, sec: '基础简便运算' },
    ],
  };

  Object.entries(expectations).forEach(([studentId, sections]) => {
    sections.forEach(({ index, count, sec }) => {
      const sectionHtml = extractAnswerSectionHtml(paper, studentId, index);
      const records = extractAnswerRecords(sectionHtml);
      if (records.length !== count) {
        throw new Error(`Set ${setNumber} ${studentId} answer section ${index} expected ${count} rows, got ${records.length}`);
      }
      records.forEach((record, rowIndex) => {
        if (record.info.sec !== sec) {
          throw new Error(`Set ${setNumber} ${studentId} answer section ${index} row ${rowIndex + 1} has section ${record.info.sec || '(missing)'}, expected ${sec}`);
        }
        if (Number(record.info.num) !== rowIndex + 1) {
          throw new Error(`Set ${setNumber} ${studentId} answer section ${index} row ${rowIndex + 1} has wrong paper number ${record.info.num}`);
        }
        if (!record.tag || !record.info.q || !record.info.a || !record.info.step) {
          throw new Error(`Set ${setNumber} ${studentId} answer section ${index} row ${rowIndex + 1} is missing tag/question/answer/step`);
        }
      });
    });
  });
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
  if (!paper.includes('第二阶段批改写回') || !paper.includes('独立画像')) {
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
  { errorBook: { e3: { tag: 'k_dmul_basic', count: 4, rewrongCount: 2, lastPracticeGrade: 'wrong', practiceCount: 2, mastered: false, info: { q: '2 &times; 3', a: '6' } } } },
  'k_dmul_basic'
);
if (!sampleErrorSignal || sampleErrorSignal.exactCount <= 4 || sampleErrorSignal.rewrongCount < 2 || sampleErrorSignal.score <= 0) {
  throw new Error('Error-book signal scoring is not prioritizing exact active re-wrong errors');
}
context.window.currentSetNumber = 120;
const notDueSpacing = context.window.getErrorEntrySpacingState?.({ tag: 'k_dmul_basic', count: 1, lastSet: 119, grade: 'wrong' }, 120);
const dueSpacing = context.window.getErrorEntrySpacingState?.({ tag: 'k_dmul_basic', count: 1, lastSet: 115, grade: 'wrong' }, 120);
const prioritySpacing = context.window.getErrorEntrySpacingState?.({ tag: 'k_dmul_basic', count: 1, lastSet: 120, grade: 'wrong', rewrongCount: 1, lastPracticeGrade: 'wrong' }, 120);
if (!notDueSpacing || notDueSpacing.due || notDueSpacing.nextDueSet !== 123 || !notDueSpacing.nextLabel.includes('Set 123') || !dueSpacing?.due || dueSpacing.nextDueSet !== 119 || dueSpacing.weight <= notDueSpacing.weight || !prioritySpacing?.priority || prioritySpacing.nextDueSet !== 121 || prioritySpacing.weight <= dueSpacing.weight) {
  throw new Error('Error-book spacing state should prioritize due and re-wrong items over just-seen mistakes');
}
const scheduledEntry = context.window.refreshErrorBookEntrySchedule?.({ tag: 'k_dmul_basic', count: 1, lastSet: 119, grade: 'wrong', mastered: false }, 120);
if (!scheduledEntry || scheduledEntry.nextPracticeSet !== 123 || scheduledEntry.practiceGap !== 4 || scheduledEntry.practiceState !== 'not-due') {
  throw new Error('Error-book schedule metadata should persist the next practice set and gap');
}
const sampleKnowledgeRows = context.window.buildKnowledgeWeakRows?.({
  KAI: { weights: { k_ddiv_shift: 3 }, errorBook: { e4: { tag: 'k_ddiv_decimal_q', count: 2, mastered: false, lastSet: 88 } } },
  Lorik: { weights: {}, errorBook: {} }
}) || [];
if (!sampleKnowledgeRows.length || sampleKnowledgeRows.some(row => /k_ddiv|l_div|c2_/.test(row.display?.name || ''))) {
  throw new Error('Human-readable knowledge map rows are missing or still exposing raw code tags');
}
const nextStepHtml = context.window.buildKnowledgeNextStepCards?.(sampleKnowledgeRows) || '';
if (!nextStepHtml.includes('KAI 今日先练') || !nextStepHtml.includes('小数除法') || !nextStepHtml.includes('打印错题专项+答案')) {
  throw new Error('Knowledge map next-step cards are missing learner-specific practice guidance');
}
const domainHeatHtml = context.window.buildKnowledgeDomainHeatmap?.({
  KAI: { weights: { k_ddiv_shift: 3 }, errorBook: { e4: { tag: 'k_ddiv_decimal_q', count: 2, mastered: false, lastSet: 88 } } },
  Lorik: { weights: {}, errorBook: {} }
}, ['KAI']) || '';
if (!domainHeatHtml.includes('KAI 领域热力') || !domainHeatHtml.includes('小数与位值') || !domainHeatHtml.includes('打印小数与位值补练+答案') || !domainHeatHtml.includes('批改小数与位值补练') || domainHeatHtml.includes('Lorik 领域热力')) {
  throw new Error('Knowledge map domain heatmap is missing learner-specific domain signals');
}
context.window.StorageDB.cache.KAI = {
  weights: { k_ddiv_shift: 3 },
  lastSeen: {},
  history: [],
  errorBook: {
    e4: { tag: 'k_ddiv_decimal_q', count: 2, mastered: false, lastSet: 88, info: { q: '0.84 ÷ 1.2', a: '0.7' } },
    e5: { tag: 'k_dmul_basic', count: 1, mastered: false, lastSet: 119, info: { q: '2.4 × 3', a: '7.2' } }
  },
  programs: {}
};
context.window.showKnowledgeMap?.();
const knowledgeMapHtml = elements.get('report-content-area')?.innerHTML || '';
if (!knowledgeMapHtml.includes('今日先练') || !knowledgeMapHtml.includes('领域热力') || !knowledgeMapHtml.includes('知识点') || !knowledgeMapHtml.includes('小数除法') || !knowledgeMapHtml.includes('复练时机') || !knowledgeMapHtml.includes('逾期补练') || !knowledgeMapHtml.includes('暂缓') || !knowledgeMapHtml.includes('先做新题交错') || knowledgeMapHtml.includes('<th>Tag</th>') || knowledgeMapHtml.includes('k_ddiv_shift') || knowledgeMapHtml.includes('k_dmul_basic')) {
  throw new Error('Knowledge map is not rendering as a parent-facing Chinese diagnostic view');
}
context.window.showKnowledgeMap?.('KAI');
const filteredKnowledgeMapHtml = elements.get('report-content-area')?.innerHTML || '';
if (!filteredKnowledgeMapHtml.includes('KAI 今日先练') || !filteredKnowledgeMapHtml.includes('KAI 领域热力') || filteredKnowledgeMapHtml.includes('Lorik 今日先练') || filteredKnowledgeMapHtml.includes('Lorik 领域热力') || !filteredKnowledgeMapHtml.includes('打印当前知识地图')) {
  throw new Error('Knowledge map learner filter did not focus the current learner view');
}
context.window.printCurrentKnowledgeMap?.();
await new Promise(resolve => setTimeout(resolve, 260));
const knowledgePrintHtml = elements.get('print-root')?.innerHTML || '';
if (!context.document.body.classList.contains('print-sandbox-active') || !knowledgePrintHtml.includes('KAI 知识点地图') || !knowledgePrintHtml.includes('今日先练')) {
  throw new Error('Knowledge map print sandbox did not stage the filtered learner map');
}
emit('afterprint');
await assertSafariSamePagePrint('Knowledge map print', () => context.window.printCurrentKnowledgeMap?.(), 'KAI 知识点地图');
context.__printCalls = 0;
const domainPracticeHtml = context.window.buildErrorBookDomainPrintHTML?.('KAI', 'decimal', true) || '';
const domainPackCode = context.window.getErrorBookPracticePackCode?.('KAI', { domainId: 'decimal', limit: 8 }) || '';
if (!domainPracticeHtml.includes('领域专项补练：小数与位值') || !domainPracticeHtml.includes('参考答案') || !domainPracticeHtml.includes(`锁定码：${domainPackCode}`)) {
  throw new Error('Error-book domain practice print sheet did not render decimal domain practice with answers and lock code');
}
context.window.setSeed?.(246813579);
const repeatedDomainPracticeHtml = context.window.buildErrorBookDomainPrintHTML?.('KAI', 'decimal', true) || '';
if (domainPracticeHtml !== repeatedDomainPracticeHtml) {
  throw new Error('Error-book domain practice print pack should be deterministic for the same domain scope');
}
const domainPracticeReviewHtml = context.window.buildErrorBookPracticeReviewHTML?.('KAI', { domainId: 'decimal' }) || '';
if (!domainPracticeReviewHtml.includes('小数与位值领域补练批改') || !domainPracticeReviewHtml.includes('data-domain-id="decimal"') || !domainPracticeReviewHtml.includes('data-source-uid="e4"') || !domainPracticeReviewHtml.includes('data-practice-limit="8"') || !domainPracticeReviewHtml.includes(`data-pack-code="${domainPackCode}"`) || !domainPracticeReviewHtml.includes(`锁定码：${domainPackCode}`)) {
  throw new Error('Error-book domain practice grading sheet is missing domain scope metadata or matching lock code');
}
if (!domainPracticeReviewHtml.includes('纸卷快速回填') || !domainPracticeReviewHtml.includes('全部已会 ✓') || !domainPracticeReviewHtml.includes('全部需讲解 ⚠️') || !domainPracticeReviewHtml.includes('清空重填') || !domainPracticeReviewHtml.includes('practice-batch-progress') || !domainPracticeReviewHtml.includes('暂不能提交')) {
  throw new Error('Error-book domain practice grading sheet is missing batch refill actions');
}
await assertSafariSamePagePrint('Error-book domain practice print', () => context.window.printErrorBookDomainPractice?.('KAI', 'decimal', true), '领域专项补练：小数与位值');
await assertSafariSamePagePrint('Error-book full practice print', () => context.window.printErrorBookPractice?.('KAI', true), '错题专项卷');
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
if (sampleReplay?.qualityFamily !== 'arithmetic_fluency') {
  throw new Error(`Expected arithmetic replay sample to keep arithmetic_fluency qualityFamily, got ${sampleReplay?.qualityFamily}`);
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
context.__printCalls = 0;
context.__popupCalls = 0;
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
if (!answerPrintRootHtml.includes('ans-answer-num')) {
  throw new Error('Answer-sheet print sandbox is missing quick-scan answer numbers');
}
emit('afterprint');
if (context.document.body.classList.contains('print-questions-only') || context.document.body.classList.contains('print-answers-only')) {
  throw new Error('Answer-sheet print mode did not clear after afterprint');
}
if ((elements.get('print-root')?.innerHTML || '') !== '') {
  throw new Error('Answer-sheet print sandbox did not clear after afterprint');
}
context.window.StorageDB.cache.KAI = { weights: {}, lastSeen: {}, history: [], errorBook: {}, programs: {} };
context.window.StorageDB.cache.Lorik = { weights: {}, lastSeen: {}, history: [], errorBook: {}, programs: {} };
context.window.currentProgramId = 'advanced_fluency_v1';
context.window.currentSetNumber = 86;
context.window.renderPaper();
context.window.answerQuickModeState.KAI = true;
context.window.renderPaper();
if (!String(elements.get('paper-container')?.innerHTML || '').includes('class="sheet ans-sheet answer-only-mode" id="kai-ans-sheet"')) {
  throw new Error('KAI answer sheet did not render answer-only quick-scan mode when enabled');
}
context.window.answerQuickModeState.KAI = false;
context.window.renderPaper();
const lorikSet86SectionHtml = extractAnswerSectionHtml(elements.get('paper-container')?.innerHTML || '', 'lorik', 5);
const lorikSet86Records = extractAnswerRecords(lorikSet86SectionHtml);
if (lorikSet86Records.length !== 12) {
  throw new Error(`Set 86 Lorik section-five answer key should have 12 rows, got ${lorikSet86Records.length}`);
}
if (lorikSet86Records.some(record => record.info.sec !== '分数四则运算' || !record.info.a || !record.info.step)) {
  throw new Error('Set 86 Lorik section-five answer rows are missing section labels, answers, or steps');
}
const set86WholeNumber = lorikSet86Records.find(record => record.tag === 'l_fmix_ofwhole');
const set86FractionSub = lorikSet86Records.find(record => record.tag === 'l_fmix_sub');
if (!set86WholeNumber || stripHtml(set86WholeNumber.info.a) !== '40') {
  throw new Error('Set 86 Lorik fraction-of-whole answer is not preserved as 40');
}
if (!set86FractionSub || !/27\s*56/.test(stripHtml(set86FractionSub.info.a))) {
  throw new Error('Set 86 Lorik fraction subtraction answer is not preserved as 27/56');
}
context.window.printAnswerSheets();
await new Promise(resolve => setTimeout(resolve, 260));
const lorikSet86PrintSectionHtml = extractAnswerSectionHtml(elements.get('print-root')?.innerHTML || '', 'lorik', 5);
const lorikSet86PrintRecords = extractAnswerRecords(lorikSet86PrintSectionHtml);
if (lorikSet86PrintRecords.length !== 12) {
  throw new Error('Set 86 Lorik printable answer sheet dropped section-five rows');
}
emit('afterprint');
await context.window.StorageDB.saveSession('Lorik', lorikSet86Records, 86, 'advanced_fluency_v1');
const lorikSet86Session = context.window.StorageDB.getProfile('Lorik', 'advanced_fluency_v1').history.find(session => session.set === 86);
if (!lorikSet86Session || lorikSet86Session.details.length !== 12 || lorikSet86Session.details.some(detail => detail.info.sec !== '分数四则运算' || !detail.info.a)) {
  throw new Error('Set 86 Lorik report persistence did not keep all section-five answer records');
}
const lorikSet86AnswerAudit = context.window.getSessionAnswerKeyAudit?.(lorikSet86Session, 'Lorik');
if (!lorikSet86AnswerAudit?.checked || lorikSet86AnswerAudit.total !== 12 || lorikSet86AnswerAudit.aligned !== 12 || lorikSet86AnswerAudit.mismatches.length !== 0) {
  throw new Error('Set 86 Lorik report did not align every section-five row back to the cached answer key');
}
const lorikSet86IntegrityHtml = context.window.buildSetReviewIntegrityHTML?.(lorikSet86Session, 'Lorik') || '';
if (!lorikSet86IntegrityHtml.includes('答案对齐 12/12')) {
  throw new Error('Set 86 Lorik report integrity banner does not show answer-key alignment');
}
const driftedSet86Session = JSON.parse(JSON.stringify(lorikSet86Session));
driftedSet86Session.details[0].info.a = '999';
const driftedSet86Audit = context.window.getSessionAnswerKeyAudit?.(driftedSet86Session, 'Lorik');
if (!driftedSet86Audit?.checked || driftedSet86Audit.mismatches.length !== 1 || driftedSet86Audit.aligned !== 11) {
  throw new Error('Set-review answer-key audit did not detect a drifted report answer');
}
const driftedSet86IntegrityHtml = context.window.buildSetReviewIntegrityHTML?.(driftedSet86Session, 'Lorik') || '';
if (!driftedSet86IntegrityHtml.includes('错题记录仍需复核') || !driftedSet86IntegrityHtml.includes('答案对齐 11/12')) {
  throw new Error('Set-review integrity banner did not warn about answer drift');
}
context.window.showSetReview(86, 'Lorik');
const lorikSet86ReportHtml = elements.get('report-content-area')?.innerHTML || '';
if (!lorikSet86ReportHtml.includes('Lorik · Set 86') || !lorikSet86ReportHtml.includes('分数四则运算') || !lorikSet86ReportHtml.includes('第 12 小题') || !lorikSet86ReportHtml.includes('正确答案') || !lorikSet86ReportHtml.includes('答案对齐 12/12')) {
  throw new Error('Set 86 Lorik report is missing section-five locations or answer labels');
}
context.window.StorageDB.cache.Lorik = { weights: {}, lastSeen: {}, history: [], errorBook: {}, programs: {} };
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
context.window.currentSetNumber = 109;
context.window.renderErrorBook();
const errorBookHtml = elements.get('paper-container')?.innerHTML || '';
if (!errorBookHtml.includes('高频机制') || !errorBookHtml.includes('representation-conversion')) {
  throw new Error('Error book did not render clickable mechanism summary chips');
}
if (!errorBookHtml.includes('今天可练') || !errorBookHtml.includes('复错优先') || !errorBookHtml.includes('暂缓') || !errorBookHtml.includes('现在可进入短卷')) {
  throw new Error('Error book should render a visible spaced-review queue with next-set timing');
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
if (!mechanismFilteredHtml.includes('到期复练') || !mechanismFilteredHtml.includes('今天建议先做') || !mechanismFilteredHtml.includes('打印到期复练卷') || !mechanismFilteredHtml.includes('到期卷+答案') || !mechanismFilteredHtml.includes('批改到期卷') || !mechanismFilteredHtml.includes('当前机制错题卷')) {
  throw new Error('Error book is missing full targeted practice print entry points');
}
if (!mechanismFilteredHtml.includes('今日10题（推荐）') || !mechanismFilteredHtml.includes('加量20题') || !mechanismFilteredHtml.includes('第二天安排') || !mechanismFilteredHtml.includes('现在可进入短卷')) {
  throw new Error('Error book should make 10/20-item print choices and next-day plan visible');
}
if (mechanismFilteredHtml.includes('解析 (Solutions)') || mechanismFilteredHtml.includes('攻克建议')) {
  throw new Error('Error-book answer reference should not show long solution wording');
}
const mechanismPrintHtml = context.window.buildErrorBookMechanismPrintHTML?.('KAI', 'representation-conversion', false) || '';
if (!mechanismPrintHtml.includes('机制补练') || !mechanismPrintHtml.includes('0.25')) {
  throw new Error('Error book mechanism print builder did not produce concrete practice content');
}
if (!mechanismPrintHtml.includes('data-error-book-practice="true"')) {
  throw new Error('Error book mechanism print builder should opt into multi-page-safe print layout');
}
if (mechanismPrintHtml.includes('class="blank math-inline-blank"') || mechanismPrintHtml.includes('<div class="blank"></div>')) {
  throw new Error('Error book mechanism print HTML still contains legacy underline blanks');
}
await assertSafariSamePagePrint('Error-book mechanism practice print', () => context.window.printErrorBookMechanismPractice?.('KAI', 'representation-conversion', false), '机制补练');
const fullErrorBookPracticeHtml = context.window.buildErrorBookPracticePrintHTML?.('KAI', true, {}) || '';
if (!fullErrorBookPracticeHtml.includes('错题专项卷') || !fullErrorBookPracticeHtml.includes('复练记录') || !fullErrorBookPracticeHtml.includes('□ 又错')) {
  throw new Error('Full error-book targeted practice print HTML is missing sheet title or re-error tracking marks');
}
if (!fullErrorBookPracticeHtml.includes('data-error-book-practice="true"')) {
  throw new Error('Full error-book targeted practice print should opt into multi-page-safe print layout');
}
const limitedPackCode = context.window.getErrorBookPracticePackCode?.('KAI', { limit: 1 }) || '';
const limitedErrorBookPracticeHtml = context.window.buildErrorBookPracticePrintHTML?.('KAI', false, { limit: 1 }) || '';
if (!limitedErrorBookPracticeHtml.includes('错题专项卷（1题）') || !limitedErrorBookPracticeHtml.includes(`锁定码：${limitedPackCode}`) || (limitedErrorBookPracticeHtml.match(/followup-print-item/g) || []).length !== 1) {
  throw new Error('Error-book limited print pack should honor a 1-item cap and show its lock code');
}
const stableErrorBookPracticeHtml = context.window.buildErrorBookPracticePrintHTML?.('KAI', false, { limit: 1 }) || '';
context.window.setSeed?.(987654321);
const stableErrorBookPracticeRepeatHtml = context.window.buildErrorBookPracticePrintHTML?.('KAI', false, { limit: 1 }) || '';
const stableErrorBookPracticeReviewHtml = context.window.buildErrorBookPracticeReviewHTML?.('KAI', { limit: 1 }) || '';
if (stableErrorBookPracticeHtml !== stableErrorBookPracticeRepeatHtml || !stableErrorBookPracticeReviewHtml.includes('data-practice-limit="1"') || !stableErrorBookPracticeReviewHtml.includes(`data-pack-code="${limitedPackCode}"`) || !stableErrorBookPracticeReviewHtml.includes(`锁定码：${limitedPackCode}`) || (stableErrorBookPracticeReviewHtml.match(/eb-practice-grade-row/g) || []).length !== 1) {
  throw new Error('Error-book practice packs should be locked for the same scope and size');
}
context.window.currentSetNumber = 109;
const dueErrorBookPracticeHtml = context.window.buildErrorBookPracticePrintHTML?.('KAI', true, { dueOnly: true }) || '';
if (!dueErrorBookPracticeHtml.includes('到期错题复练卷') || !dueErrorBookPracticeHtml.includes('到期复练') || !dueErrorBookPracticeHtml.includes('参考答案')) {
  throw new Error('Due error-book practice print HTML is missing due-only title or answer reference');
}
const dueReviewHtml = context.window.buildErrorBookPracticeReviewHTML?.('KAI', { dueOnly: true }) || '';
if (!dueReviewHtml.includes('到期错题复练批改') || !dueReviewHtml.includes('data-due-only="true"')) {
  throw new Error('Due error-book practice grading sheet is missing due-only metadata');
}
const limitedDueReviewHtml = context.window.buildErrorBookPracticeReviewHTML?.('KAI', { dueOnly: true, limit: 1 }) || '';
if (!limitedDueReviewHtml.includes('到期错题复练批改（1题）') || !limitedDueReviewHtml.includes('data-practice-limit="1"') || (limitedDueReviewHtml.match(/eb-practice-grade-row/g) || []).length !== 1) {
  throw new Error('Due error-book grading sheet should honor a 1-item cap and persist practice limit metadata');
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
if (typeof context.window.getDailyErrorMixSnapshot !== 'function') {
  throw new Error('Daily error-book mix budget helper is not exposed');
}
const previousKaiDailyMixRecord = context.window.StorageDB.cache.KAI;
const previousLorikDailyMixRecord = context.window.StorageDB.cache.Lorik;
const buildDenseErrorBook = (entries, { lastSet = 108 } = {}) => Object.fromEntries(entries.map((entry, index) => [
  `mix-${index}`,
  {
    tag: entry.tag,
    grade: 'wrong',
    count: 5,
    firstSet: 90 + index,
    lastSet: entry.lastSet ?? lastSet,
    mastered: false,
    info: { sec: entry.sec || '每日混合', num: index + 1, q: entry.q, a: entry.a || '1', step: entry.step || '按原结构复练。' }
  }
]));
context.window.StorageDB.cache.KAI = context.window.StorageDB.migrateProfile({
  weights: { k_dmul_basic: 6, k_ddiv_shift: 6, k_sub_100k: 6, k_conv_1: 6, k_eq_sub: 6 },
  lastSeen: {},
  history: [],
  errorBook: buildDenseErrorBook([
    { tag: 'k_dmul_basic', q: '2 &times; 3 =', a: '6' },
    { tag: 'k_ddiv_shift', q: '4.8 &divide; 0.6 =', a: '8' },
    { tag: 'k_sub_100k', q: '100000 &minus; 2468 =', a: '97532' },
    { tag: 'k_conv_1', q: '0.25 = (   )', a: '1/4' },
    { tag: 'k_eq_sub', q: '<span class="frac"><span>7</span><span class="bottom">6</span></span> &minus; <i class="var">x</i> = <span class="frac"><span>1</span><span class="bottom">6</span></span>', a: 'x=1' }
  ], { lastSet: 104 })
});
context.window.StorageDB.cache.Lorik = context.window.StorageDB.migrateProfile({
  weights: { l_mul_3x20: 6, l_div_decimal_divisor: 6, l_sub_6digit: 6, l_conv_5: 6, l_fmix_sub: 6 },
  lastSeen: {},
  history: [],
  errorBook: buildDenseErrorBook([
    { tag: 'l_mul_3x20', q: '23 &times; 40 =', a: '920' },
    { tag: 'l_div_decimal_divisor', q: '4.8 &divide; 0.6', a: '8' },
    { tag: 'l_sub_6digit', q: '654321 &minus; 123456 =', a: '530865' },
    { tag: 'l_conv_5', q: '<div class="frac"><span>4</span><span class="bottom">5</span></div><span class="circle-blank"></span>0.79', a: '&gt;' },
    { tag: 'l_fmix_sub', q: '<div class="frac"><span>3</span><span class="bottom">4</span></div> &minus; <div class="frac"><span>1</span><span class="bottom">2</span></div> =', a: '1/4' }
  ], { lastSet: 104 })
});
context.window.currentProgramId = 'advanced_fluency_v1';
context.window.currentSetNumber = 109;
context.window._recentQuestions = new Set();
context.window._paperQuestions = new Set();
const denseMixSet = context.window.generateProgramSetData?.('advanced_fluency_v1');
const denseKaiItems = context.window.flattenPaperSections?.(denseMixSet, ['k_m', 'k_d', 'k_s', 'k_c', 'k_f', 'k_o']) || [];
const denseKaiLinked = denseKaiItems.filter(item => ['replay', 'variant'].includes(item?.reason) || item?.isErrorReplay || item?.isErrorVariant || item?.isAdvancedHighValueReplay).length;
const denseKaiBudget = context.window.getDailyErrorMixSnapshot?.('KAI', 'advanced_fluency_v1');
const denseKaiMixStats = context.window.getPracticeMixStats?.(denseKaiItems, 'advanced_fluency_v1');
if (
  denseKaiItems.length !== 36 ||
  !denseKaiBudget?.maxErrorLinked ||
  denseKaiBudget.pressureBand !== 'intensive' ||
  denseKaiBudget.dueReadyCount < 5 ||
  denseKaiLinked !== denseKaiMixStats?.errorLinked ||
  denseKaiLinked > denseKaiBudget.maxErrorLinked ||
  denseKaiMixStats.fresh < 20
) {
  throw new Error(`Daily generated practice should keep a mixed new/error ratio, got ${denseKaiLinked}/${denseKaiItems.length} error-linked with cap ${denseKaiBudget?.maxErrorLinked}`);
}
context.window._dailyErrorMixState = {};
context.window.StorageDB.cache.KAI = context.window.StorageDB.migrateProfile({
  weights: {},
  lastSeen: {},
  history: [],
  errorBook: buildDenseErrorBook([
    { tag: 'k_dmul_basic', q: '2 &times; 3 =', a: '6' }
  ])
});
const lightKaiBudget = context.window.getDailyErrorMixSnapshot?.('KAI', 'advanced_fluency_v1');
if (lightKaiBudget?.pressureBand !== 'light' || lightKaiBudget.maxErrorLinked >= denseKaiBudget.maxErrorLinked) {
  throw new Error('Daily error-book mix should lower the cap when active error pressure is light');
}
context.window._dailyErrorMixState = {};
context.window.StorageDB.cache.KAI = context.window.StorageDB.migrateProfile({
  weights: {},
  lastSeen: {},
  history: [],
  errorBook: buildDenseErrorBook([
    { tag: 'k_dmul_basic', q: '2 &times; 3 =', a: '6', lastSet: 109 },
    { tag: 'k_ddiv_shift', q: '4.8 &divide; 0.6 =', a: '8', lastSet: 109 }
  ], { lastSet: 109 })
});
const notDueKaiBudget = context.window.getDailyErrorMixSnapshot?.('KAI', 'advanced_fluency_v1');
if (notDueKaiBudget?.dueReadyCount !== 0 || notDueKaiBudget.maxExactReplay !== 0 || notDueKaiBudget.maxErrorLinked > 1) {
  throw new Error('Daily error-book mix should hold back not-due mistakes instead of replaying them too soon');
}
context.window.StorageDB.cache.KAI = previousKaiDailyMixRecord;
context.window.StorageDB.cache.Lorik = previousLorikDailyMixRecord;
const previousKaiPracticeBalanceRecord = context.window.StorageDB.cache.KAI;
const previousPracticeBalanceSet = context.window.currentSetNumber;
const makePracticeBalanceErrorBook = () => {
  const rows = [];
  const pushRows = (tags, mechanismKey, qPrefix) => {
    tags.forEach((tag, index) => {
      rows.push({
        uid: `${tag}-${index}`,
        tag,
        mechanismKey,
        grade: 'wrong',
        count: 4,
        firstSet: 90 + index,
        firstDate: 'validator',
        lastSet: 112,
        lastDate: 'validator',
        mastered: false,
        info: { sec: '平衡测试', num: index + 1, q: `${qPrefix} ${index + 1} = (   )`, a: String(index + 1), step: '按同类结构复练。' }
      });
    });
  };
  pushRows(['k_conv_1', 'k_conv_2', 'k_conv_3', 'k_conv_4', 'k_conv_5', 'k_conv_6', 'k_conv_7', 'k_conv_8'], 'bridge_convert', '表示转换');
  pushRows(['k_fcalc_addsub', 'k_fcalc_paren', 'k_fcalc_dist', 'k_fcalc_muldiv', 'k_fcalc_cancel'], 'fraction_addsub', '分数通分');
  pushRows(['k_eq_sub', 'k_eq_divisor', 'k_eq_twostep', 'k_eq_prop'], 'equation_inverse', '方程逆运算');
  return Object.fromEntries(rows.map(row => [row.uid, row]));
};
context.window.StorageDB.cache.KAI = context.window.StorageDB.migrateProfile({
  weights: {},
  lastSeen: {},
  history: [],
  errorBook: makePracticeBalanceErrorBook()
});
context.window.currentSetNumber = 120;
const balanceSourceEntries = Object.entries(context.window.StorageDB.getProfile('KAI', 'advanced_fluency_v1')?.errorBook || {}).map(([uid, entry]) => ({ uid, ...entry }));
const arrangedBalanceEntries = context.window.arrangeErrorBookPracticeEntries?.(balanceSourceEntries, { limit: 10 }) || [];
const arrangedMechanismCounts = arrangedBalanceEntries.slice(0, 10).reduce((acc, entry) => {
  const key = entry.mechanismKey || 'unknown';
  acc[key] = (acc[key] || 0) + 1;
  return acc;
}, {});
const balancedPracticeItems = context.window.buildErrorBookPracticeItems?.('KAI', { limit: 10 }) || [];
const balanceMechanismCounts = balancedPracticeItems.reduce((acc, item) => {
  const key = item.followupMechanismKey || 'unknown';
  acc[key] = (acc[key] || 0) + 1;
  return acc;
}, {});
const balanceMechanismCount = Object.keys(balanceMechanismCounts).length;
const balanceDominantCount = Math.max(...Object.values(balanceMechanismCounts));
const balancedPrintHtml = context.window.buildErrorBookPracticePrintHTML?.('KAI', false, { limit: 10 }) || '';
if (arrangedBalanceEntries.length < 10 || Object.keys(arrangedMechanismCounts).length < 3 || Math.max(...Object.values(arrangedMechanismCounts)) > 6 || balancedPracticeItems.length !== 10 || balanceMechanismCount < 3 || balanceDominantCount > 6 || !context.window.getErrorBookPracticeInterleaveSummaryText?.(balancedPracticeItems).includes('交错') || !balancedPrintHtml.includes('交错') || !balancedPrintHtml.includes('表示转换') || !balancedPrintHtml.includes('分数通分加减') || !balancedPrintHtml.includes('方程逆运算')) {
  throw new Error(`Error-book 10-item practice should soft-balance mechanisms, arranged ${JSON.stringify(arrangedMechanismCounts)}, built ${JSON.stringify(balanceMechanismCounts)}, source ${balanceSourceEntries.length}`);
}
const mechanismOnlyPracticeItems = context.window.buildErrorBookPracticeItems?.('KAI', { mechanismKey: 'bridge_convert', limit: 6 }) || [];
if (mechanismOnlyPracticeItems.length !== 6 || mechanismOnlyPracticeItems.some(item => item.followupMechanismKey !== 'bridge_convert')) {
  throw new Error('Mechanism-specific error-book practice should stay focused on the selected mechanism');
}
context.window.StorageDB.cache.KAI = previousKaiPracticeBalanceRecord;
context.window.currentSetNumber = previousPracticeBalanceSet;
const reviewHtmlForPractice = context.window.buildErrorBookPracticeReviewHTML?.('KAI', { mechanismKey: 'representation-conversion' }) || '';
if (!reviewHtmlForPractice.includes('错题专项卷批改') || !reviewHtmlForPractice.includes('提交专项批改') || !reviewHtmlForPractice.includes('data-source-uid="eb1"') || !reviewHtmlForPractice.includes('data-practice-lane=') || !reviewHtmlForPractice.includes('practice-lane-chip') || !reviewHtmlForPractice.includes('选题') || !reviewHtmlForPractice.includes('表示转换') || !reviewHtmlForPractice.includes('全部已会 ✓') || !reviewHtmlForPractice.includes('全部需讲解 ⚠️') || !reviewHtmlForPractice.includes('全部又错 ✗') || !reviewHtmlForPractice.includes('还差')) {
  throw new Error('Error-book targeted practice grading sheet is missing review rows or submit action');
}
const practiceLog = await context.window.StorageDB.saveErrorBookPractice('KAI', [
  {
    tag: 'k_conv_1',
    grade: 'wrong',
    sourceErrorUid: 'eb1',
    mechanismKey: 'representation-conversion',
    practiceLane: 'due',
    practiceLaneLabel: '到期复练',
    info: { sec: '错题专项卷', num: 1, q: '0.25 = (   )', a: '1/4', step: '先转成分数。' }
  }
], 'advanced_fluency_v1', { mechanismKey: 'representation-conversion' });
const practicedProfile = context.window.StorageDB.getProfile('KAI', 'advanced_fluency_v1');
if (!practiceLog?.results?.length || practiceLog.results[0].nextPracticeSet !== 110 || practiceLog.results[0].mechanismKey !== 'representation-conversion' || practicedProfile.errorBook.eb1.lastPracticeGrade !== 'wrong' || !practicedProfile.errorBook.eb1.rewrongCount || practicedProfile.errorBook.eb1.nextPracticeSet !== 110 || practicedProfile.errorBook.eb1.practiceGap !== 1) {
  throw new Error('Error-book targeted practice did not record wrong-again status');
}
const explainPracticeLog = await context.window.StorageDB.saveErrorBookPractice('KAI', [
  {
    tag: 'k_conv_2',
    grade: 'careless',
    sourceErrorUid: 'eb2',
    mechanismKey: 'baseline-comparison',
    info: { sec: '错题专项卷', num: 2, q: '比较 0.49 和 1/2', a: '1/2 大', step: '先想 1/2 = 0.5。' }
  }
], 'advanced_fluency_v1', { mechanismKey: 'baseline-comparison' });
const explainedProfile = context.window.StorageDB.getProfile('KAI', 'advanced_fluency_v1');
if (!explainPracticeLog?.results?.length || explainPracticeLog.results[0].nextPracticeSet !== 110 || explainedProfile.errorBook.eb2.lastPracticeGrade !== 'careless' || explainedProfile.errorBook.eb2.needsExplainCount !== 1 || Number(explainedProfile.errorBook.eb2.rewrongCount || 0) !== 0 || explainedProfile.errorBook.eb2.nextPracticeSet !== 110) {
  throw new Error('Error-book targeted practice should track needs-explanation separately from wrong-again');
}
context.window.renderErrorBook();
const rewrongErrorBookHtml = elements.get('paper-container')?.innerHTML || '';
if (!rewrongErrorBookHtml.includes('复错优先') || !rewrongErrorBookHtml.includes('专项又错') || !rewrongErrorBookHtml.includes('专项需讲解') || !rewrongErrorBookHtml.includes('Set 110 复错优先') || !rewrongErrorBookHtml.includes('Set 110 讲后确认') || !rewrongErrorBookHtml.includes('打印复错优先卷') || !rewrongErrorBookHtml.includes('打印复错优先卷+答案')) {
  throw new Error('Error book is not surfacing wrong-again priority markers');
}
const priorityPracticeHtml = context.window.buildErrorBookPracticePrintHTML?.('KAI', false, { priorityOnly: true }) || '';
if (!priorityPracticeHtml.includes('复错优先专项卷') || !priorityPracticeHtml.includes('选题') || !priorityPracticeHtml.includes('复错优先 1') || !priorityPracticeHtml.includes('0.25')) {
  throw new Error('Wrong-again priority practice print sheet is missing prioritized content');
}
const priorityPracticeAnswerHtml = context.window.buildErrorBookPracticePrintHTML?.('KAI', true, { priorityOnly: true }) || '';
if (!priorityPracticeAnswerHtml.includes('复错优先专项卷') || !priorityPracticeAnswerHtml.includes('参考答案') || !priorityPracticeAnswerHtml.includes('0.25')) {
  throw new Error('Wrong-again priority practice answer sheet is missing prioritized answer content');
}
const priorityReviewHtml = context.window.buildErrorBookPracticeReviewHTML?.('KAI', { priorityOnly: true }) || '';
if (!priorityReviewHtml.includes('复错优先卷批改') || !priorityReviewHtml.includes('data-priority-only="true"') || !priorityReviewHtml.includes('data-practice-lane="wrong-again"') || !priorityReviewHtml.includes('复错优先')) {
  throw new Error('Wrong-again priority practice grading sheet is missing priority metadata');
}
const practiceResultHtml = context.window.buildErrorBookPracticeResultHTML?.('KAI', practiceLog) || '';
if (!practiceResultHtml.includes('机制补练批改结果') || !practiceResultHtml.includes('下一步') || !practiceResultHtml.includes('第二天') || !practiceResultHtml.includes('第 1 题') || !practiceResultHtml.includes('选题') || !practiceResultHtml.includes('结构：表示转换1') || !practiceResultHtml.includes('到期复练') || !practiceResultHtml.includes('需讲解') || !practiceResultHtml.includes('又错') || !practiceResultHtml.includes('正确答案') || !practiceResultHtml.includes('下次') || !practiceResultHtml.includes('Set 110 再练') || !practiceResultHtml.includes('打印讲解清单') || !practiceResultHtml.includes('data-log-id=')) {
  throw new Error('Error-book targeted practice result report is missing summary or answer details');
}
const explainPracticeResultHtml = context.window.buildErrorBookPracticeResultHTML?.('KAI', explainPracticeLog) || '';
if (!explainPracticeResultHtml.includes('机制补练批改结果') || !explainPracticeResultHtml.includes('需讲解') || !explainPracticeResultHtml.includes('Set 110 讲后确认')) {
  throw new Error('Error-book needs-explanation result should show a teach-then-confirm next step');
}
context.window.StorageDB.cache.KAI.errorBook.ebMastery = {
  tag: 'k_conv_1',
  grade: 'wrong',
  count: 4,
  rewrongCount: 1,
  lastPracticeGrade: 'wrong',
  practiceCount: 2,
  lastSet: 108,
  firstSet: 104,
  firstDate: 'validator',
  lastDate: 'validator',
  mastered: false,
  mechanismKey: 'representation-conversion',
  info: { q: '0.75 = (   )', a: '3/4', step: '先转成四分之三。' }
};
const firstMasteryLog = await context.window.StorageDB.saveErrorBookPractice('KAI', [
  {
    tag: 'k_conv_1',
    grade: 'perfect',
    sourceErrorUid: 'ebMastery',
    mechanismKey: 'representation-conversion',
    info: { sec: '错题专项卷', num: 3, q: '0.75 = (   )', a: '3/4', step: '先转成四分之三。' }
  }
], 'advanced_fluency_v1', { mechanismKey: 'representation-conversion', set: 109 });
const masteryPendingEntry = context.window.StorageDB.getProfile('KAI', 'advanced_fluency_v1').errorBook.ebMastery;
const masteryPendingHtml = context.window.buildErrorBookPracticeResultHTML?.('KAI', firstMasteryLog) || '';
if (!firstMasteryLog?.results?.[0]?.masteryPending || masteryPendingEntry.mastered || !masteryPendingEntry.masteryPending || masteryPendingEntry.masteryStreak !== 1 || masteryPendingEntry.masteryRequired !== 2 || masteryPendingEntry.nextPracticeSet !== 111 || !masteryPendingHtml.includes('Set 111 巩固确认')) {
  throw new Error('Repeated error should require a second spaced confirmation before mastery');
}
context.window.renderErrorBook();
const masteryPendingBookHtml = elements.get('paper-container')?.innerHTML || '';
if (!masteryPendingBookHtml.includes('专项已会·待巩固 1/2') || !masteryPendingBookHtml.includes('预计 Set 111 巩固确认')) {
  throw new Error('Error book should surface pending mastery confirmation after first success');
}
await context.window.StorageDB.saveErrorBookPractice('KAI', [
  {
    tag: 'k_conv_1',
    grade: 'perfect',
    sourceErrorUid: 'ebMastery',
    mechanismKey: 'representation-conversion',
    info: { sec: '错题专项卷', num: 3, q: '0.75 = (   )', a: '3/4', step: '先转成四分之三。' }
  }
], 'advanced_fluency_v1', { mechanismKey: 'representation-conversion', set: 111 });
const masteredAfterConfirm = context.window.StorageDB.getProfile('KAI', 'advanced_fluency_v1').errorBook.ebMastery;
if (!masteredAfterConfirm.mastered || masteredAfterConfirm.masteryPending || masteredAfterConfirm.masteryStreak !== 2 || masteredAfterConfirm.practiceState !== 'mastered') {
  throw new Error('Second consecutive spaced success should mark repeated error as mastered');
}
const practiceExplainChecklistHtml = context.window.buildErrorBookPracticeExplainChecklistHTML?.('KAI', practiceLog) || '';
if (!practiceExplainChecklistHtml.includes('机制补练讲解清单') || !practiceExplainChecklistHtml.includes('讲解顺序') || !practiceExplainChecklistHtml.includes('选题') || !practiceExplainChecklistHtml.includes('结构：表示转换1') || !practiceExplainChecklistHtml.includes('到期复练') || !practiceExplainChecklistHtml.includes('讲解动作') || !practiceExplainChecklistHtml.includes('讲后记录') || !practiceExplainChecklistHtml.includes('□ 已讲清') || !practiceExplainChecklistHtml.includes('□ 已重做') || !practiceExplainChecklistHtml.includes('□ 仍不会') || !practiceExplainChecklistHtml.includes('隔天优先二刷') || !practiceExplainChecklistHtml.includes('0.25')) {
  throw new Error('Error-book targeted practice explanation checklist is missing actionable review details');
}
const practiceLogHtml = context.window.buildErrorBookPracticeLogHTML?.('KAI', { errorBookPracticeLog: [practiceLog] }) || '';
if (!practiceLogHtml.includes('最近补练批改') || !practiceLogHtml.includes('第二天安排') || !practiceLogHtml.includes('机制补练') || !practiceLogHtml.includes('表示转换1') || !practiceLogHtml.includes('需讲解 0') || !practiceLogHtml.includes('又错 1') || !practiceLogHtml.includes('openErrorBookPracticeLog')) {
  throw new Error('Error-book targeted practice recent-log summary is missing wrong-again counts or next-day plan');
}
const domainPracticeLog = await context.window.StorageDB.saveErrorBookPractice('KAI', [
  {
    tag: 'k_conv_2',
    grade: 'perfect',
    sourceErrorUid: 'eb2',
    mechanismKey: 'baseline-comparison',
    info: { sec: '小数与位值领域补练', num: 1, q: '比较 0.49 和 1/2', a: '1/2 大', step: '先想 1/2 = 0.5。' }
  }
], 'advanced_fluency_v1', { domainId: 'decimal' });
const domainPracticeResultHtml = context.window.buildErrorBookPracticeResultHTML?.('KAI', domainPracticeLog) || '';
if (!domainPracticeLog?.domainId || !domainPracticeResultHtml.includes('领域补练批改结果') || !domainPracticeResultHtml.includes('小数与位值领域错题') || !domainPracticeResultHtml.includes('全部过关')) {
  throw new Error('Error-book domain practice grading log is not preserving domain scope');
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
const eb1AfterOnePerfect = context.window.StorageDB.getProfile('KAI', 'advanced_fluency_v1').errorBook.eb1;
if (eb1AfterOnePerfect.mastered || !eb1AfterOnePerfect.masteryPending || eb1AfterOnePerfect.masteryStreak !== 1) {
  throw new Error('Wrong-again error should not be mastered after only one perfect review');
}
context.window.StorageDB.cache.KAI.errorBook.ebLowRisk = {
  tag: 'k_conv_1',
  grade: 'careless',
  count: 1,
  lastSet: 108,
  firstSet: 108,
  firstDate: 'validator',
  lastDate: 'validator',
  mastered: false,
  mechanismKey: 'representation-conversion',
  info: { q: '0.5 = (   )', a: '1/2', step: '一半。' }
};
await context.window.StorageDB.saveErrorBookPractice('KAI', [
  {
    tag: 'k_conv_1',
    grade: 'perfect',
    sourceErrorUid: 'ebLowRisk',
    mechanismKey: 'representation-conversion',
    info: { sec: '错题专项卷', num: 4, q: '0.5 = (   )', a: '1/2', step: '一半。' }
  }
], 'advanced_fluency_v1', { mechanismKey: 'representation-conversion' });
if (!context.window.StorageDB.getProfile('KAI', 'advanced_fluency_v1').errorBook.ebLowRisk.mastered) {
  throw new Error('Low-risk one-off error should be mastered after one perfect review');
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
context.window._setReviewFollowupItemCache = {};
context.window.showSetReview(106, 'KAI');
const reviewHtml = elements.get('report-content-area')?.innerHTML || '';
if (!reviewHtml.includes('Set 106') || !reviewHtml.includes('复杂乘法') || !reviewHtml.includes('第 2 小题') || !reviewHtml.includes('6')) {
  throw new Error('Set review report is missing set number, location, or answer');
}
if (!reviewHtml.includes('本套错题变式跟训') || !reviewHtml.includes('今日变式跟训') || !reviewHtml.includes('备用二刷') || !reviewHtml.includes("openSetReviewFollowupPreview('KAI', 'main'") || !reviewHtml.includes("openSetReviewFollowupPreview('KAI', 'backup'") || !reviewHtml.includes("printSetReviewFollowup('KAI', false)") || !reviewHtml.includes("printSetReviewFollowupAnswers('KAI')") || !reviewHtml.includes("openSetReviewFollowupPracticeReview('KAI'") || !reviewHtml.includes("printSetReviewBackupFollowup('KAI', false)") || !reviewHtml.includes("printSetReviewBackupAnswers('KAI')") || !reviewHtml.includes("openSetReviewBackupPracticeReview('KAI'")) {
  throw new Error('Set review report is missing the in-report variant follow-up block');
}
if (!reviewHtml.includes('待预览生成') || !reviewHtml.includes('预计题量') || !reviewHtml.includes('报告页不默认展开题目') || !reviewHtml.includes('预览今日变式') || !reviewHtml.includes('预览备用二刷') || reviewHtml.includes('备用二刷题库') || reviewHtml.includes('建议先独立完成上面的变式跟训')) {
  throw new Error('Set review report should keep variants collapsed and route tutors to quick preview instead of expanding all questions');
}
if (Object.keys(context.window._setReviewFollowupItemCache || {}).length !== 0) {
  throw new Error('Set review report should not generate variant packs before preview, print, or grading is requested');
}
if (!reviewHtml.includes('打印当前报告') || typeof context.window.printCurrentSetReviewReport !== 'function') {
  throw new Error('Set review report is missing the current-report print action');
}
context.window.printCurrentSetReviewReport();
await new Promise(resolve => setTimeout(resolve, 260));
const setReviewPrintHtml = elements.get('print-root')?.innerHTML || '';
if (!context.document.body.classList.contains('print-sandbox-active') || !setReviewPrintHtml.includes('Set 106') || !setReviewPrintHtml.includes('本套错题变式跟训')) {
  throw new Error('Set review report print sandbox did not stage the current report content');
}
emit('afterprint');
if ((elements.get('print-root')?.innerHTML || '') !== '') {
  throw new Error('Set review report print sandbox did not clear after afterprint');
}
context.window.printCurrentSetReviewReport('KAI');
await new Promise(resolve => setTimeout(resolve, 260));
const singleSetReviewPrintHtml = elements.get('print-root')?.innerHTML || '';
if (!singleSetReviewPrintHtml.includes('KAI 单人报告') || !singleSetReviewPrintHtml.includes('KAI · Set 106') || singleSetReviewPrintHtml.includes('Lorik · Set 106')) {
  throw new Error('Single-student set review print sandbox did not filter to the requested student report');
}
emit('afterprint');
await assertSafariSamePagePrint('Set review report print', () => context.window.printCurrentSetReviewReport?.('KAI'), 'KAI 单人报告');
await assertSafariSamePagePrint('Set review main follow-up print', () => context.window.printSetReviewFollowup?.('KAI', false), '错题变式训练');
await assertSafariSamePagePrint('Set review main answer print', () => context.window.printSetReviewFollowupAnswers?.('KAI'), '主变式参考答案');
await assertSafariSamePagePrint('Set review backup follow-up print', () => context.window.printSetReviewBackupFollowup?.('KAI', false), '备用二刷');
await assertSafariSamePagePrint('Set review backup answer print', () => context.window.printSetReviewBackupAnswers?.('KAI'), '备用二刷参考答案');
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
if (!Array.isArray(sampleFollowupItems) || sampleFollowupItems.length !== context.window.StorageDB.cache.KAI.history[0].details.length) {
  throw new Error('Set review follow-up item builder is not producing one variant for each current-set mistake');
}
if (!context.window.StorageDB.cache.KAI.history[0].setReviewFollowupPack?.items?.length) {
  throw new Error('Set review follow-up items should persist the generated variant pack onto the set session');
}
const sampleFollowupItemsCached = context.window.buildSetReviewFollowupItems?.(context.window.StorageDB.cache.KAI.history[0], 'KAI', 'advanced_fluency_v1');
if (sampleFollowupItemsCached !== sampleFollowupItems) {
  throw new Error('Set review follow-up items should be cached so preview, print, and grading use the same variants');
}
context.window._setReviewFollowupItemCache = {};
const sampleFollowupItemsPersisted = context.window.buildSetReviewFollowupItems?.(context.window.StorageDB.cache.KAI.history[0], 'KAI', 'advanced_fluency_v1');
if (sampleFollowupItemsPersisted !== context.window.StorageDB.cache.KAI.history[0].setReviewFollowupPack.items) {
  throw new Error('Set review follow-up items should reload from the persisted set-session variant pack after memory cache is cleared');
}
if (!sampleFollowupItems.every(item => item.isSetReviewFollowup && item.isReviewItem)) {
  throw new Error('Set review follow-up items are missing review metadata');
}
if (!sampleFollowupItems.every(item => item.followupMechanismKey)) {
  throw new Error('Set review follow-up items are missing followupMechanismKey metadata');
}
if (!sampleFollowupItems.every(item => item.followupSourceLabel)) {
  throw new Error('Set review follow-up items are missing source-location labels');
}
if (!sampleFollowupItems.every(item => item.followupBackupVariant?.q && item.followupBackupVariant?.a)) {
  throw new Error('Set review follow-up items are missing the second prepared backup variant');
}
if (!sampleFollowupItems.every(item => item.followupCandidatePoolSize >= 1 && item.followupSelectionScore > 0 && item.followupBackupVariant?.followupCandidatePoolSize >= 1)) {
  throw new Error('Set review follow-up items should retain candidate-pool selection metadata for main and backup variants');
}
if (!sampleFollowupItems.every(item => item.followupQualityScore === 100 && (!item.followupQualityWarnings || item.followupQualityWarnings.length === 0))) {
  throw new Error('Set review follow-up items should pass the same-structure quality gate');
}
const mainPreviewHtml = context.window.buildSetReviewFollowupPreviewHTML?.('KAI', 106, 'main') || '';
if (!mainPreviewHtml.includes('今日变式预览') || !mainPreviewHtml.includes('预览体检通过') || !mainPreviewHtml.includes('候选池') || !mainPreviewHtml.includes('可直接进入打印') || !mainPreviewHtml.includes('原错题') || !mainPreviewHtml.includes('参考答案') || !mainPreviewHtml.includes('贴合原题') || !mainPreviewHtml.includes('预览、打印、批改会复用同一套题') || !mainPreviewHtml.includes('重新生成') || !mainPreviewHtml.includes('打印题目') || !mainPreviewHtml.includes('返回本套报告')) {
  throw new Error('Set review main follow-up preview is missing readable question review content or actions');
}
const backupPreviewHtml = context.window.buildSetReviewFollowupPreviewHTML?.('KAI', 106, 'backup') || '';
if (!backupPreviewHtml.includes('备用二刷预览') || !backupPreviewHtml.includes('预览体检通过') || !backupPreviewHtml.includes('看今日变式') || !backupPreviewHtml.includes('原错题') || !backupPreviewHtml.includes('参考答案')) {
  throw new Error('Set review backup follow-up preview is missing readable backup review content');
}
context.window.openSetReviewFollowupPreview?.('KAI', 'main', 106);
const stagedPreviewHtml = elements.get('report-content-area')?.innerHTML || '';
if (!stagedPreviewHtml.includes('KAI Set 106 今日变式预览') || context.document.body.classList.contains('print-sandbox-active')) {
  throw new Error('Set review quick preview should stage inside the report modal without entering print mode');
}
context.window.regenerateSetReviewFollowupPreview?.('KAI', 'main', 106);
const regeneratedFollowupItems = context.window.buildSetReviewFollowupItems?.(context.window.StorageDB.cache.KAI.history[0], 'KAI', 'advanced_fluency_v1');
if (regeneratedFollowupItems === sampleFollowupItems) {
  throw new Error('Set review follow-up regenerate action should refresh the cached variant pack');
}
const sampleFollowupAudit = context.window.getSetReviewFollowupAudit?.(context.window.StorageDB.cache.KAI.history[0], sampleFollowupItems);
if (!sampleFollowupAudit?.ok || sampleFollowupAudit.mistakeCount !== 2 || sampleFollowupAudit.mainCount !== 2 || sampleFollowupAudit.backupCount !== 2 || sampleFollowupAudit.qualityIssueCount !== 0 || sampleFollowupAudit.candidatePoolCount < 4) {
  throw new Error('Set review follow-up audit is not confirming one main and one backup variant per mistake');
}
const candidatePoolRows = context.window.collectSetReviewVariantCandidates?.(sampleFollowupTargets[0], 'KAI', 'advanced_fluency_v1', new Set(), 8) || [];
if (!candidatePoolRows.length || candidatePoolRows[0].isUsed || candidatePoolRows[0].selectionScore <= 0 || !candidatePoolRows[0].quality?.ok) {
  throw new Error('Set review candidate-pool selector should rank usable high-quality variants first');
}
const brokenFollowupAudit = context.window.getSetReviewFollowupAudit?.(context.window.StorageDB.cache.KAI.history[0], sampleFollowupItems.slice(0, 1));
if (brokenFollowupAudit?.ok || brokenFollowupAudit?.mainCount !== 1) {
  throw new Error('Set review follow-up audit should flag missing variants');
}
const qualityBrokenAudit = context.window.getSetReviewFollowupAudit?.(context.window.StorageDB.cache.KAI.history[0], [
  { ...sampleFollowupItems[0], followupQualityWarnings: ['运算结构不一致'] },
  sampleFollowupItems[1]
]);
if (qualityBrokenAudit?.ok || qualityBrokenAudit?.qualityIssueCount !== 1) {
  throw new Error('Set review follow-up audit should flag low-quality variants');
}
const qualityBrokenAuditHtml = context.window.buildSetReviewFollowupAuditHTML?.(qualityBrokenAudit) || '';
if (!qualityBrokenAuditHtml.includes('第 1 题主变式') || !qualityBrokenAuditHtml.includes('运算结构不一致') || !qualityBrokenAuditHtml.includes('使用建议')) {
  throw new Error('Set review follow-up audit should render concrete quality issue details');
}
const warningPreviewAuditHtml = context.window.buildSetReviewFollowupPreviewAuditHTML?.({
  ok: false,
  mistakeCount: 2,
  mainCount: 1,
  backupCount: 2,
  sourceCount: 1,
  candidatePoolCount: 3,
  duplicateCount: 1,
  familyMismatch: 0,
  qualityIssueCount: 1,
  qualityIssues: [{ num: 1, kind: '主变式', sourceLabel: '复杂乘法 · 第 2 小题', reasons: ['题型骨架不一致'] }]
}, 'main') || '';
if (!warningPreviewAuditHtml.includes('预览体检需复核') || !warningPreviewAuditHtml.includes('候选池 3') || !warningPreviewAuditHtml.includes('主变式缺口 1 题') || !warningPreviewAuditHtml.includes('重点复核') || !warningPreviewAuditHtml.includes('题型骨架不一致') || !warningPreviewAuditHtml.includes('重新生成')) {
  throw new Error('Set review preview audit should summarize risk before printing');
}
const healthyAuditHtml = context.window.buildSetReviewFollowupAuditHTML?.(sampleFollowupAudit) || '';
if (!healthyAuditHtml.includes('可直接作为今日错题变式跟训') || !healthyAuditHtml.includes('候选池')) {
  throw new Error('Set review follow-up audit should render a direct-use recommendation when variants pass');
}
const arithmeticQuality = context.window.getSetReviewVariantQuality?.(sampleFollowupTargets[0], sampleFollowupItems[0]);
if (!arithmeticQuality?.ok || arithmeticQuality.score !== 100) {
  throw new Error('Set review quality gate should accept same-operation arithmetic variants');
}
const arithmeticSourceSignature = context.window.getSetReviewStructureSignature?.('2 &times; 3', 'arithmetic_fluency');
const arithmeticVariantSignature = context.window.getSetReviewStructureSignature?.(sampleFollowupItems[0]?.q || '', 'arithmetic_fluency');
if (arithmeticSourceSignature !== 'arith:×:integer' || arithmeticVariantSignature !== 'arith:×:integer') {
  throw new Error('Set review structure signatures should preserve integer multiplication skeletons');
}
const arithmeticDriftQuality = context.window.getSetReviewVariantQuality?.(sampleFollowupTargets[0], { q: `0.6 + <span class="frac"><span>3</span><span class="bottom">4</span></span> =`, qualityFamily: 'complex_mixed' });
if (arithmeticDriftQuality?.ok || !arithmeticDriftQuality?.reasons?.some(reason => /结构|骨架|知识族/.test(reason))) {
  throw new Error('Set review quality gate should reject drifted arithmetic variants');
}
if (!sampleFollowupItems.every(item => item.followupFamily === 'arithmetic_fluency') || sampleFollowupItems.some(item => /0\.6 \+|frac/.test(item.q || ''))) {
  throw new Error('Basic arithmetic set-review variants are not staying close to the original operation');
}
const zeroBorrowSession = {
  set: 130,
  details: [
    {
      tag: 'l_sub_all0',
      grade: 'wrong',
      uid: 'arith-zero-borrow-source',
      info: { sec: '连续退位', num: 1, q: `60000 &minus; 25876 =`, a: '34124', step: '整万数减法要从最高位连续借位。' }
    }
  ]
};
const zeroBorrowTargets = context.window.buildSetReviewFollowupTargets?.(zeroBorrowSession) || [];
const zeroBorrowItems = context.window.buildSetReviewFollowupItems?.(zeroBorrowSession, 'Lorik', 'advanced_fluency_v1') || [];
const zeroBorrowItem = zeroBorrowItems[0] || {};
if (context.window.getSetReviewStructureSignature?.(zeroBorrowSession.details[0].info.q, 'arithmetic_fluency') !== 'arith:-:zero-chain' || context.window.getSetReviewStructureSignature?.(zeroBorrowItem.q || '', 'arithmetic_fluency') !== 'arith:-:zero-chain' || zeroBorrowItem.variantSourceMode !== 'source-aware-arithmetic' || zeroBorrowItem.followupQualityWarnings?.length) {
  throw new Error(`Zero-chain subtraction variants should preserve continuous-borrow structure, got ${zeroBorrowItem.q || '(missing)'}`);
}
const zeroBorrowDriftQuality = context.window.getSetReviewVariantQuality?.(zeroBorrowTargets[0], { q: `654321 &minus; 123456 =`, qualityFamily: 'arithmetic_fluency' });
if (zeroBorrowDriftQuality?.ok || !zeroBorrowDriftQuality?.reasons?.some(reason => /骨架/.test(reason))) {
  throw new Error('Set review quality gate should reject continuous-borrow subtraction drifting into ordinary borrow');
}
const divisionScaleSession = {
  set: 131,
  details: [
    {
      tag: 'l_div_scale10',
      grade: 'wrong',
      uid: 'arith-div-scale-source',
      info: { sec: '除法缩放', num: 1, q: `5600 &divide; 70 =`, a: '80', step: '被除数和除数同时去掉一个 0。' }
    }
  ]
};
const divisionScaleItems = context.window.buildSetReviewFollowupItems?.(divisionScaleSession, 'Lorik', 'advanced_fluency_v1') || [];
const divisionScaleItem = divisionScaleItems[0] || {};
if (context.window.getSetReviewStructureSignature?.(divisionScaleSession.details[0].info.q, 'arithmetic_fluency') !== 'arith:÷:scale10' || context.window.getSetReviewStructureSignature?.(divisionScaleItem.q || '', 'arithmetic_fluency') !== 'arith:÷:scale10' || divisionScaleItem.variantSourceMode !== 'source-aware-arithmetic' || divisionScaleItem.followupQualityWarnings?.length) {
  throw new Error('Scale-by-10 division variants should preserve common-zero reduction structure');
}
const divisionMidZeroSession = {
  set: 132,
  details: [
    {
      tag: 'l_div_mid0',
      grade: 'wrong',
      uid: 'arith-div-mid0-source',
      info: { sec: '商中间0', num: 1, q: `828 &divide; 4 =`, a: '207', step: '商中间遇到不够除的位要写 0 占位。' }
    }
  ]
};
const divisionMidZeroItems = context.window.buildSetReviewFollowupItems?.(divisionMidZeroSession, 'Lorik', 'advanced_fluency_v1') || [];
const divisionMidZeroItem = divisionMidZeroItems[0] || {};
if (context.window.getSetReviewStructureSignature?.(divisionMidZeroSession.details[0].info.q, 'arithmetic_fluency') !== 'arith:÷:quotient-mid0' || context.window.getSetReviewStructureSignature?.(divisionMidZeroItem.q || '', 'arithmetic_fluency') !== 'arith:÷:quotient-mid0' || divisionMidZeroItem.variantSourceMode !== 'source-aware-arithmetic' || divisionMidZeroItem.followupQualityWarnings?.length) {
  throw new Error('Middle-zero quotient variants should preserve quotient-zero placeholder structure');
}
const decimalDivisionSession = {
  set: 115,
  details: [
    {
      tag: 'custom_decimal_division',
      grade: 'wrong',
      uid: 'decimal-div-source',
      info: { sec: '小数除法', num: 1, q: '4.8 &divide; 0.6 =', a: '8', step: '除数是小数，先同乘10变成整数除法。' }
    }
  ]
};
const decimalDivisionTargets = context.window.buildSetReviewFollowupTargets?.(decimalDivisionSession) || [];
const decimalDivisionItems = context.window.buildSetReviewFollowupItems?.(decimalDivisionSession, 'KAI', 'advanced_fluency_v1') || [];
const decimalDivisionItem = decimalDivisionItems[0] || {};
const decimalDivisionSourceSignature = context.window.getSetReviewStructureSignature?.(decimalDivisionSession.details[0].info.q, 'decimal_division');
const decimalDivisionCandidateSignature = context.window.getSetReviewStructureSignature?.(decimalDivisionItem.q || '', 'decimal_division');
if (decimalDivisionSourceSignature !== 'decimal-div:left-dec:right-dec:q-1to9' || decimalDivisionCandidateSignature !== 'decimal-div:left-dec:right-dec:q-1to9' || decimalDivisionItem.variantSourceMode !== 'source-aware-decimal-division' || decimalDivisionItem.followupQualityWarnings?.length) {
  throw new Error(`Unknown-tag decimal division variants should preserve decimal position and quotient band, got ${decimalDivisionSourceSignature} -> ${decimalDivisionCandidateSignature} for ${decimalDivisionItem.q || '(missing)'}`);
}
const decimalSmallQuotientSession = {
  set: 116,
  details: [
    {
      tag: 'custom_decimal_smallq',
      grade: 'wrong',
      uid: 'decimal-div-smallq',
      info: { sec: '小数除法', num: 1, q: '0.084 &divide; 0.24 =', a: '0.35', step: '先判断商小于1，再同乘100。' }
    }
  ]
};
const decimalSmallQuotientItems = context.window.buildSetReviewFollowupItems?.(decimalSmallQuotientSession, 'KAI', 'advanced_fluency_v1') || [];
const decimalSmallQuotientItem = decimalSmallQuotientItems[0] || {};
if (context.window.getSetReviewStructureSignature?.(decimalSmallQuotientSession.details[0].info.q, 'decimal_division') !== 'decimal-div:left-dec:right-dec:q-lt1' || context.window.getSetReviewStructureSignature?.(decimalSmallQuotientItem.q || '', 'decimal_division') !== 'decimal-div:left-dec:right-dec:q-lt1' || decimalSmallQuotientItem.followupQualityWarnings?.length) {
  throw new Error('Decimal division variants should preserve quotient-less-than-one training point');
}
const decimalDivisionDriftQuality = context.window.getSetReviewVariantQuality?.(decimalDivisionTargets[0], { q: '48 &divide; 6 =', qualityFamily: 'decimal_division' });
if (decimalDivisionDriftQuality?.ok || !decimalDivisionDriftQuality?.reasons?.some(reason => /骨架|小数/.test(reason))) {
  throw new Error('Set review quality gate should reject decimal-division place-value drift');
}
const conversionFollowupSession = {
  set: 108,
  details: [
    {
      tag: 'k_conv_1',
      grade: 'wrong',
      uid: 'conv-source-1',
      info: { sec: '互化专项', num: 1, q: '0.25 = (   )', a: '1/4', step: '先写成分母100的分数再约分。' }
    }
  ]
};
const conversionFollowupItems = context.window.buildSetReviewFollowupItems?.(conversionFollowupSession, 'KAI', 'advanced_fluency_v1') || [];
if (conversionFollowupItems.length !== 1 || !/^\d*\.?\d+ =/.test(conversionFollowupItems[0]?.q || '') || /%/.test(conversionFollowupItems[0]?.q || '')) {
  throw new Error('Decimal-to-fraction source mistakes should keep the same conversion direction in follow-up variants');
}
const conversionQuality = context.window.getSetReviewVariantQuality?.(context.window.buildSetReviewFollowupTargets?.(conversionFollowupSession)?.[0], conversionFollowupItems[0]);
if (!conversionQuality?.ok) {
  throw new Error('Set review quality gate should accept same-direction conversion variants');
}
const conversionSignature = context.window.getSetReviewStructureSignature?.(conversionFollowupItems[0]?.q || '', 'conversion_bridge');
if (conversionSignature !== 'conversion:decimal-to-fraction') {
  throw new Error('Set review structure signatures should preserve decimal-to-fraction conversion skeletons');
}
if (!conversionFollowupItems[0]?.followupBackupVariant?.q || /%/.test(conversionFollowupItems[0].followupBackupVariant.q)) {
  throw new Error('Decimal-to-fraction source mistakes should prepare a same-direction backup variant');
}
const validatorFrac = (n, d) => `<div class="frac"><span>${n}</span><span class="bottom">${d}</span></div>`;
const fractionToDecimalSession = {
  set: 117,
  details: [
    {
      tag: 'custom_fraction_to_decimal',
      grade: 'wrong',
      uid: 'conv-frac-dec-source',
      info: { sec: '分数小数互化', num: 1, q: `${validatorFrac(3, 8)} = (   )`, a: '0.375', step: '把分数化成小数。' }
    }
  ]
};
const fractionToDecimalTargets = context.window.buildSetReviewFollowupTargets?.(fractionToDecimalSession) || [];
const fractionToDecimalItems = context.window.buildSetReviewFollowupItems?.(fractionToDecimalSession, 'KAI', 'advanced_fluency_v1') || [];
const fractionToDecimalItem = fractionToDecimalItems[0] || {};
const fractionToDecimalSourceSignature = context.window.getSetReviewStructureSignature?.(fractionToDecimalSession.details[0].info.q, 'conversion_bridge');
const fractionToDecimalCandidateSignature = context.window.getSetReviewStructureSignature?.(fractionToDecimalItem.q || '', 'conversion_bridge');
if (fractionToDecimalTargets[0]?.family !== 'conversion_bridge' || fractionToDecimalSourceSignature !== 'conversion:fraction-to-decimal' || fractionToDecimalCandidateSignature !== 'conversion:fraction-to-decimal' || fractionToDecimalItem.variantSourceMode !== 'source-aware-conversion' || fractionToDecimalItem.followupQualityWarnings?.length) {
  throw new Error(`Unknown-tag fraction-to-decimal mistakes should stay in conversion bridge and preserve direction, got family ${fractionToDecimalTargets[0]?.family || '(missing)'} signatures ${fractionToDecimalSourceSignature} -> ${fractionToDecimalCandidateSignature} for ${fractionToDecimalItem.q || '(missing)'}`);
}
const fractionToPercentSession = {
  set: 118,
  details: [
    {
      tag: 'custom_fraction_to_percent',
      grade: 'wrong',
      uid: 'conv-frac-percent-source',
      info: { sec: '分数百分数互化', num: 1, q: `${validatorFrac(3, 20)} = (   )%`, a: '15%', step: '先化成分母100。' }
    }
  ]
};
const fractionToPercentItems = context.window.buildSetReviewFollowupItems?.(fractionToPercentSession, 'KAI', 'advanced_fluency_v1') || [];
const fractionToPercentItem = fractionToPercentItems[0] || {};
if (context.window.getSetReviewStructureSignature?.(fractionToPercentSession.details[0].info.q, 'conversion_bridge') !== 'conversion:fraction-to-percent' || context.window.getSetReviewStructureSignature?.(fractionToPercentItem.q || '', 'conversion_bridge') !== 'conversion:fraction-to-percent' || !/%/.test(fractionToPercentItem.q || '') || fractionToPercentItem.followupQualityWarnings?.length) {
  throw new Error('Fraction-to-percent variants should preserve percent direction');
}
const decimalToPercentSession = {
  set: 119,
  details: [
    {
      tag: 'custom_decimal_to_percent',
      grade: 'wrong',
      uid: 'conv-dec-percent-source',
      info: { sec: '小数百分数互化', num: 1, q: `0.35 = (   )%`, a: '35%', step: '小数化成百分数。' }
    }
  ]
};
const decimalToPercentItems = context.window.buildSetReviewFollowupItems?.(decimalToPercentSession, 'KAI', 'advanced_fluency_v1') || [];
const decimalToPercentItem = decimalToPercentItems[0] || {};
if (context.window.getSetReviewStructureSignature?.(decimalToPercentSession.details[0].info.q, 'conversion_bridge') !== 'conversion:decimal-to-percent' || context.window.getSetReviewStructureSignature?.(decimalToPercentItem.q || '', 'conversion_bridge') !== 'conversion:decimal-to-percent' || !/%/.test(decimalToPercentItem.q || '') || decimalToPercentItem.followupQualityWarnings?.length) {
  throw new Error('Decimal-to-percent variants should preserve percent direction');
}
const conversionDriftQuality = context.window.getSetReviewVariantQuality?.(fractionToDecimalTargets[0], { q: `${validatorFrac(3, 20)} = (   )%`, qualityFamily: 'conversion_bridge' });
if (conversionDriftQuality?.ok || !conversionDriftQuality?.reasons?.some(reason => /骨架|方向/.test(reason))) {
  throw new Error('Set review quality gate should reject conversion direction drift');
}
const ratioToDecimalBridgeSession = {
  set: 136,
  details: [
    {
      tag: 'c2_bridge_ratio_frac',
      grade: 'wrong',
      uid: 'bridge-ratio-dec-source',
      info: { sec: '跨表示桥接', num: 1, q: `3 : 4 =<div class="blank"></div>`, a: '0.75', step: '把 3:4 看成 3÷4。' }
    }
  ]
};
const ratioToDecimalBridgeItems = context.window.buildSetReviewFollowupItems?.(ratioToDecimalBridgeSession, 'KAI', 'elementary_closure_v1') || [];
const ratioToDecimalBridgeItem = ratioToDecimalBridgeItems[0] || {};
if (context.window.getSetReviewStructureSignature?.(ratioToDecimalBridgeSession.details[0].info.q, 'conversion_bridge') !== 'conversion:ratio-to-decimal' || context.window.getSetReviewStructureSignature?.(ratioToDecimalBridgeItem.q || '', 'conversion_bridge') !== 'conversion:ratio-to-decimal' || ratioToDecimalBridgeItem.variantSourceMode !== 'source-aware-conversion' || ratioToDecimalBridgeItem.followupQualityWarnings?.length) {
  throw new Error(`Ratio-to-decimal bridge variants should preserve direct ratio conversion, got ${ratioToDecimalBridgeItem.q || '(missing)'}`);
}
const fractionToRatioBridgeSession = {
  set: 137,
  details: [
    {
      tag: 'c2_bridge_ratio_frac',
      grade: 'wrong',
      uid: 'bridge-frac-ratio-source',
      info: { sec: '跨表示桥接', num: 1, q: `${validatorFrac(3, 5)} = 3 :<div class="blank"></div>`, a: '5', step: '分数 a/b 可以看成 a:b。' }
    }
  ]
};
const fractionToRatioBridgeItems = context.window.buildSetReviewFollowupItems?.(fractionToRatioBridgeSession, 'KAI', 'elementary_closure_v1') || [];
const fractionToRatioBridgeItem = fractionToRatioBridgeItems[0] || {};
if (context.window.getSetReviewStructureSignature?.(fractionToRatioBridgeSession.details[0].info.q, 'conversion_bridge') !== 'conversion:fraction-to-ratio' || context.window.getSetReviewStructureSignature?.(fractionToRatioBridgeItem.q || '', 'conversion_bridge') !== 'conversion:fraction-to-ratio' || fractionToRatioBridgeItem.variantSourceMode !== 'source-aware-conversion' || fractionToRatioBridgeItem.followupQualityWarnings?.length) {
  throw new Error(`Fraction-to-ratio bridge variants should preserve ratio-fill structure, got ${fractionToRatioBridgeItem.q || '(missing)'}`);
}
const bridgeChoiceSession = {
  set: 138,
  details: [
    {
      tag: 'c2_bridge_ratio_frac',
      grade: 'wrong',
      uid: 'bridge-choice-source',
      info: { sec: '跨表示桥接', num: 1, q: `比较 3:5 和 0.7 时，先把 3:5 化成<div class="blank"></div>更快`, a: '0.6', step: '先选更方便的表示。' }
    }
  ]
};
const bridgeChoiceTargets = context.window.buildSetReviewFollowupTargets?.(bridgeChoiceSession) || [];
const bridgeChoiceItems = context.window.buildSetReviewFollowupItems?.(bridgeChoiceSession, 'KAI', 'elementary_closure_v1') || [];
const bridgeChoiceItem = bridgeChoiceItems[0] || {};
if (context.window.getSetReviewStructureSignature?.(bridgeChoiceSession.details[0].info.q, 'conversion_bridge') !== 'conversion:bridge-choice' || context.window.getSetReviewStructureSignature?.(bridgeChoiceItem.q || '', 'conversion_bridge') !== 'conversion:bridge-choice' || bridgeChoiceItem.variantSourceMode !== 'source-aware-conversion' || bridgeChoiceItem.followupQualityWarnings?.length) {
  throw new Error(`Representation-choice bridge variants should preserve method-choice structure, got ${bridgeChoiceItem.q || '(missing)'}`);
}
const bridgePostUseSession = {
  set: 139,
  details: [
    {
      tag: 'c2_bridge_ratio_frac',
      grade: 'wrong',
      uid: 'bridge-post-use-source',
      info: { sec: '跨表示桥接', num: 1, q: `把 3:4 先化成小数后，再和 0.5 比较，较大的是<div class="blank"></div>`, a: '3:4', step: '先转换，再用转换结果比较。' }
    }
  ]
};
const bridgePostUseItems = context.window.buildSetReviewFollowupItems?.(bridgePostUseSession, 'KAI', 'elementary_closure_v1') || [];
const bridgePostUseItem = bridgePostUseItems[0] || {};
if (context.window.getSetReviewStructureSignature?.(bridgePostUseSession.details[0].info.q, 'conversion_bridge') !== 'conversion:bridge-post-use' || context.window.getSetReviewStructureSignature?.(bridgePostUseItem.q || '', 'conversion_bridge') !== 'conversion:bridge-post-use' || bridgePostUseItem.variantSourceMode !== 'source-aware-conversion' || bridgePostUseItem.followupQualityWarnings?.length) {
  throw new Error(`Post-conversion-use bridge variants should preserve convert-then-use structure, got ${bridgePostUseItem.q || '(missing)'}`);
}
const bridgeLaneDriftQuality = context.window.getSetReviewVariantQuality?.(bridgeChoiceTargets[0], { q: `5 : 8 =<div class="blank"></div>`, qualityFamily: 'conversion_bridge' });
if (bridgeLaneDriftQuality?.ok || !bridgeLaneDriftQuality?.reasons?.some(reason => /骨架/.test(reason))) {
  throw new Error('Set review quality gate should reject bridge-lane drift between method choice and direct conversion');
}
const fractionAddSession = {
  set: 109,
  details: [
    {
      tag: 'custom_fraction_add',
      grade: 'wrong',
      uid: 'frac-source-add',
      info: { sec: '分数加法', num: 1, q: `${validatorFrac(1, 6)} + ${validatorFrac(1, 12)} =`, a: validatorFrac(1, 4), step: '异分母分数先通分再加。' }
    }
  ]
};
const fractionAddTargets = context.window.buildSetReviewFollowupTargets?.(fractionAddSession) || [];
const fractionAddItems = context.window.buildSetReviewFollowupItems?.(fractionAddSession, 'KAI', 'advanced_fluency_v1') || [];
const fractionAddItem = fractionAddItems[0] || {};
const fractionAddSourceSignature = context.window.getSetReviewStructureSignature?.(fractionAddSession.details[0].info.q, 'fraction_operation');
const fractionAddCandidateSignature = context.window.getSetReviewStructureSignature?.(fractionAddItem.q || '', 'fraction_operation');
if (fractionAddSourceSignature !== 'fraction:+' || fractionAddCandidateSignature !== 'fraction:+') {
  throw new Error(`Source-aware fraction variants should preserve add/sub/mul/div operation skeletons, got ${fractionAddSourceSignature} -> ${fractionAddCandidateSignature} for ${fractionAddItem.q || '(missing)'}`);
}
if (fractionAddItem.variantSourceMode !== 'source-aware-fraction' || /&minus;|&divide;|&times;/.test(fractionAddItem.q || '') || fractionAddItem.followupQualityWarnings?.length) {
  throw new Error('Unknown-tag fraction addition mistakes should generate close same-operation variants');
}
const fractionDriftQuality = context.window.getSetReviewVariantQuality?.(fractionAddTargets[0], { q: `${validatorFrac(5, 6)} &minus; ${validatorFrac(1, 4)} =`, qualityFamily: 'fraction_operation' });
if (fractionDriftQuality?.ok || !fractionDriftQuality?.reasons?.some(reason => /骨架|运算/.test(reason))) {
  throw new Error('Set review quality gate should reject fraction operation drift');
}
const fractionParenSession = {
  set: 110,
  details: [
    {
      tag: 'custom_fraction_paren',
      grade: 'wrong',
      uid: 'frac-source-paren',
      info: { sec: '分数括号', num: 1, q: `${validatorFrac(3, 4)} &times; <span class="paren-l"></span>${validatorFrac(1, 6)} + ${validatorFrac(1, 3)}<span class="paren-r"></span> =`, a: validatorFrac(3, 8), step: '括号内先加，再乘外面的分数。' }
    }
  ]
};
const fractionParenItems = context.window.buildSetReviewFollowupItems?.(fractionParenSession, 'KAI', 'advanced_fluency_v1') || [];
const fractionParenItem = fractionParenItems[0] || {};
if (context.window.getSetReviewStructureSignature?.(fractionParenSession.details[0].info.q, 'fraction_operation') !== 'fraction:×+' || context.window.getSetReviewStructureSignature?.(fractionParenItem.q || '', 'fraction_operation') !== 'fraction:×+' || !/paren-l/.test(fractionParenItem.q || '') || fractionParenItem.followupQualityWarnings?.length) {
  throw new Error('Source-aware fraction variants should preserve parenthesized fraction operation structure');
}
const equationDivisorSession = {
  set: 111,
  details: [
    {
      tag: 'custom_eq_divisor',
      grade: 'wrong',
      uid: 'eq-source-divisor',
      info: { sec: '方程逆运算', num: 1, q: `36 &divide; <i class="var">x</i> = 4`, a: `<i class="var">x</i> = 9`, step: '未知数在除数位置，用被除数除以商。' }
    }
  ]
};
const equationDivisorTargets = context.window.buildSetReviewFollowupTargets?.(equationDivisorSession) || [];
const equationDivisorItems = context.window.buildSetReviewFollowupItems?.(equationDivisorSession, 'KAI', 'advanced_fluency_v1') || [];
const equationDivisorItem = equationDivisorItems[0] || {};
if (context.window.getSetReviewStructureSignature?.(equationDivisorSession.details[0].info.q, 'equation_method') !== 'equation:divisor' || context.window.getSetReviewStructureSignature?.(equationDivisorItem.q || '', 'equation_method') !== 'equation:divisor' || equationDivisorItem.variantSourceMode !== 'source-aware-equation' || !/&divide; <i class="var">x<\/i>/.test(equationDivisorItem.q || '') || equationDivisorItem.followupQualityWarnings?.length) {
  throw new Error('Unknown-tag equation divisor mistakes should generate same-position equation variants');
}
const equationDriftQuality = context.window.getSetReviewVariantQuality?.(equationDivisorTargets[0], { q: `<i class="var">x</i> &divide; 4 + 2 = 8`, qualityFamily: 'equation_method' });
if (equationDriftQuality?.ok || !equationDriftQuality?.reasons?.some(reason => /骨架/.test(reason))) {
  throw new Error('Set review quality gate should reject equation unknown-position drift');
}
const equationCoeffSession = {
  set: 113,
  details: [
    {
      tag: 'custom_eq_coeff',
      grade: 'wrong',
      uid: 'eq-source-coeff',
      info: { sec: '方程系数', num: 1, q: `3<i class="var">x</i> = 18`, a: `<i class="var">x</i> = 6`, step: '等式两边同除以 3。' }
    }
  ]
};
const equationCoeffItems = context.window.buildSetReviewFollowupItems?.(equationCoeffSession, 'KAI', 'advanced_fluency_v1') || [];
const equationCoeffItem = equationCoeffItems[0] || {};
const equationCoeffSourceSignature = context.window.getSetReviewStructureSignature?.(equationCoeffSession.details[0].info.q, 'equation_method');
const equationCoeffCandidateSignature = context.window.getSetReviewStructureSignature?.(equationCoeffItem.q || '', 'equation_method');
if (equationCoeffSourceSignature !== 'equation:coefficient' || equationCoeffCandidateSignature !== 'equation:coefficient' || equationCoeffItem.variantSourceMode !== 'source-aware-equation' || equationCoeffItem.followupQualityWarnings?.length) {
  throw new Error(`Unknown-tag coefficient equations should preserve coefficient structure, got ${equationCoeffSourceSignature} -> ${equationCoeffCandidateSignature} for ${equationCoeffItem.q || '(missing)'}`);
}
const knownEquationDivisorSession = {
  set: 133,
  details: [
    {
      tag: 'k_eq_divisor',
      grade: 'wrong',
      uid: 'eq-known-divisor-source',
      info: { sec: '方程逆运算', num: 1, q: `36 &divide; <i class="var">x</i> = 4`, a: `<i class="var">x</i> = 9`, step: '未知数在除数位置。' }
    }
  ]
};
const knownEquationDivisorItems = context.window.buildSetReviewFollowupItems?.(knownEquationDivisorSession, 'KAI', 'advanced_fluency_v1') || [];
const knownEquationDivisorItem = knownEquationDivisorItems[0] || {};
if (context.window.getSetReviewStructureSignature?.(knownEquationDivisorSession.details[0].info.q, 'equation_method') !== 'equation:divisor' || context.window.getSetReviewStructureSignature?.(knownEquationDivisorItem.q || '', 'equation_method') !== 'equation:divisor' || knownEquationDivisorItem.variantSourceMode !== 'source-aware-equation' || !/&divide; <i class="var">x<\/i>/.test(knownEquationDivisorItem.q || '') || knownEquationDivisorItem.followupQualityWarnings?.length) {
  throw new Error('Known equation divisor tags should still prefer same-position source-aware variants');
}
const percentDirectEquationSession = {
  set: 134,
  details: [
    {
      tag: 'c2_eq_percent',
      grade: 'wrong',
      uid: 'eq-percent-direct-source',
      info: { sec: '百分数方程', num: 1, q: `<i class="var">x</i> &times; 25% = 16，<i class="var">x</i> =<div class="blank"></div>`, a: '64', step: '整体×百分率=部分。' }
    }
  ]
};
const percentDirectEquationTargets = context.window.buildSetReviewFollowupTargets?.(percentDirectEquationSession) || [];
const percentDirectEquationItems = context.window.buildSetReviewFollowupItems?.(percentDirectEquationSession, 'KAI', 'advanced_fluency_v1') || [];
const percentDirectEquationItem = percentDirectEquationItems[0] || {};
if (context.window.getSetReviewStructureSignature?.(percentDirectEquationSession.details[0].info.q, 'equation_method') !== 'equation:percent-direct' || context.window.getSetReviewStructureSignature?.(percentDirectEquationItem.q || '', 'equation_method') !== 'equation:percent-direct' || percentDirectEquationItem.variantSourceMode !== 'source-aware-equation' || percentDirectEquationItem.followupQualityWarnings?.length) {
  throw new Error(`Percent direct equation mistakes should preserve direct percent-equation structure, got ${percentDirectEquationItem.q || '(missing)'}`);
}
const percentOffsetEquationSession = {
  set: 135,
  details: [
    {
      tag: 'c2_eq_percent',
      grade: 'wrong',
      uid: 'eq-percent-offset-source',
      info: { sec: '百分数方程', num: 1, q: `<i class="var">x</i> 的 40% 比 18 多 6，<i class="var">x</i> =<div class="blank"></div>`, a: '60', step: '先得百分率对应量。' }
    }
  ]
};
const percentOffsetEquationItems = context.window.buildSetReviewFollowupItems?.(percentOffsetEquationSession, 'KAI', 'advanced_fluency_v1') || [];
const percentOffsetEquationItem = percentOffsetEquationItems[0] || {};
if (context.window.getSetReviewStructureSignature?.(percentOffsetEquationSession.details[0].info.q, 'equation_method') !== 'equation:percent-offset' || context.window.getSetReviewStructureSignature?.(percentOffsetEquationItem.q || '', 'equation_method') !== 'equation:percent-offset' || percentOffsetEquationItem.variantSourceMode !== 'source-aware-equation' || percentOffsetEquationItem.followupQualityWarnings?.length) {
  throw new Error(`Percent offset equation mistakes should preserve compare-offset percent-equation structure, got ${percentOffsetEquationItem.q || '(missing)'}`);
}
const percentEquationDriftQuality = context.window.getSetReviewVariantQuality?.(percentDirectEquationTargets[0], { q: `<i class="var">x</i> 的 40% 比 18 多 6，<i class="var">x</i> =<div class="blank"></div>`, qualityFamily: 'equation_method' });
if (percentEquationDriftQuality?.ok || !percentEquationDriftQuality?.reasons?.some(reason => /骨架/.test(reason))) {
  throw new Error('Set review quality gate should reject direct-vs-offset percent equation drift');
}
const speedRateSession = {
  set: 112,
  details: [
    {
      tag: 'custom_speed_rate',
      grade: 'wrong',
      uid: 'unit-source-speed-rate',
      info: { sec: '速度关系', num: 1, q: `一辆车 2.5 时行 175 千米，平均每时行<div class="blank"></div>千米`, a: '70', step: '平均速度 = 路程 ÷ 时间。' }
    }
  ]
};
const speedRateTargets = context.window.buildSetReviewFollowupTargets?.(speedRateSession) || [];
const speedRateItems = context.window.buildSetReviewFollowupItems?.(speedRateSession, 'KAI', 'advanced_fluency_v1') || [];
const speedRateItem = speedRateItems[0] || {};
if (context.window.getSetReviewStructureSignature?.(speedRateSession.details[0].info.q, 'unit_rate_speed') !== 'unit:speed-rate' || context.window.getSetReviewStructureSignature?.(speedRateItem.q || '', 'unit_rate_speed') !== 'unit:speed-rate' || speedRateItem.variantSourceMode !== 'source-aware-unit-rate' || !/平均每时/.test(speedRateItem.q || '') || speedRateItem.followupQualityWarnings?.length) {
  throw new Error('Unknown-tag speed-rate mistakes should generate same-relation unit-rate variants');
}
const speedDriftQuality = context.window.getSetReviewVariantQuality?.(speedRateTargets[0], { q: `每本 12 元，买 5 本，一共<div class="blank"></div>元`, qualityFamily: 'unit_rate_speed' });
if (speedDriftQuality?.ok || !speedDriftQuality?.reasons?.some(reason => /骨架/.test(reason))) {
  throw new Error('Set review quality gate should reject unit-rate relation drift');
}
const priceUnitSession = {
  set: 114,
  details: [
    {
      tag: 'custom_price_unit',
      grade: 'wrong',
      uid: 'unit-source-price-unit',
      info: { sec: '单价关系', num: 1, q: `5 本共 60 元，每本<div class="blank"></div>元`, a: '12', step: '单价 = 总价 ÷ 数量。' }
    }
  ]
};
const priceUnitItems = context.window.buildSetReviewFollowupItems?.(priceUnitSession, 'KAI', 'advanced_fluency_v1') || [];
const priceUnitItem = priceUnitItems[0] || {};
if (context.window.getSetReviewStructureSignature?.(priceUnitSession.details[0].info.q, 'unit_rate_speed') !== 'unit:price-unit' || context.window.getSetReviewStructureSignature?.(priceUnitItem.q || '', 'unit_rate_speed') !== 'unit:price-unit' || priceUnitItem.variantSourceMode !== 'source-aware-unit-rate' || priceUnitItem.followupQualityWarnings?.length) {
  throw new Error('Unknown-tag unit-price mistakes should generate same-relation unit-rate variants');
}
const unitCmToMSession = {
  set: 127,
  details: [
    {
      tag: 'c2_unit_length',
      grade: 'wrong',
      uid: 'unit-cm-m-source',
      info: { sec: '单位换算', num: 1, q: `650 cm =<div class="blank"></div> m`, a: '6.5', step: '厘米化米要除以 100。' }
    }
  ]
};
const unitCmToMTargets = context.window.buildSetReviewFollowupTargets?.(unitCmToMSession) || [];
const unitCmToMItems = context.window.buildSetReviewFollowupItems?.(unitCmToMSession, 'KAI', 'advanced_fluency_v1') || [];
const unitCmToMItem = unitCmToMItems[0] || {};
if (context.window.getSetReviewStructureSignature?.(unitCmToMSession.details[0].info.q, 'unit_rate_speed') !== 'unit:conversion:length-cm-to-m' || context.window.getSetReviewStructureSignature?.(unitCmToMItem.q || '', 'unit_rate_speed') !== 'unit:conversion:length-cm-to-m' || unitCmToMItem.variantSourceMode !== 'source-aware-unit-rate' || /km/.test(unitCmToMItem.q || '') || unitCmToMItem.followupQualityWarnings?.length) {
  throw new Error(`Centimeter-to-meter mistakes should preserve conversion direction, got ${unitCmToMItem.q || '(missing)'}`);
}
const unitConversionDriftQuality = context.window.getSetReviewVariantQuality?.(unitCmToMTargets[0], { q: `2.4 km =<div class="blank"></div> m`, qualityFamily: 'unit_rate_speed' });
if (unitConversionDriftQuality?.ok || !unitConversionDriftQuality?.reasons?.some(reason => /骨架/.test(reason))) {
  throw new Error('Set review quality gate should reject unit conversion direction drift');
}
const unitKgGToGSession = {
  set: 128,
  details: [
    {
      tag: 'custom_unit_kg_g',
      grade: 'wrong',
      uid: 'unit-kg-g-source',
      info: { sec: '质量换算', num: 1, q: `3 kg 80 g =<div class="blank"></div> g`, a: '3080', step: '先把 kg 化成 g，再加 80 g。' }
    }
  ]
};
const unitKgGToGItems = context.window.buildSetReviewFollowupItems?.(unitKgGToGSession, 'KAI', 'advanced_fluency_v1') || [];
const unitKgGToGItem = unitKgGToGItems[0] || {};
if (context.window.getSetReviewStructureSignature?.(unitKgGToGSession.details[0].info.q, 'unit_rate_speed') !== 'unit:conversion:mass-kg-g-to-g' || context.window.getSetReviewStructureSignature?.(unitKgGToGItem.q || '', 'unit_rate_speed') !== 'unit:conversion:mass-kg-g-to-g' || unitKgGToGItem.variantSourceMode !== 'source-aware-unit-rate' || unitKgGToGItem.followupQualityWarnings?.length) {
  throw new Error('Mixed kg-and-g conversion variants should preserve kg+g to g structure');
}
const unitLengthOpSession = {
  set: 129,
  details: [
    {
      tag: 'custom_unit_length_op',
      grade: 'wrong',
      uid: 'unit-length-op-source',
      info: { sec: '单位运算', num: 1, q: `1.25 km + 750 m =<div class="blank"></div> km`, a: '2', step: '先把 750 m 化成 0.75 km，再相加。' }
    }
  ]
};
const unitLengthOpItems = context.window.buildSetReviewFollowupItems?.(unitLengthOpSession, 'KAI', 'advanced_fluency_v1') || [];
const unitLengthOpItem = unitLengthOpItems[0] || {};
if (context.window.getSetReviewStructureSignature?.(unitLengthOpSession.details[0].info.q, 'unit_rate_speed') !== 'unit:conversion:length-op-to-km' || context.window.getSetReviewStructureSignature?.(unitLengthOpItem.q || '', 'unit_rate_speed') !== 'unit:conversion:length-op-to-km' || unitLengthOpItem.variantSourceMode !== 'source-aware-unit-rate' || unitLengthOpItem.followupQualityWarnings?.length) {
  throw new Error('Length-unit operation variants should preserve the target output unit');
}
const validationQuotientSession = {
  set: 124,
  details: [
    {
      tag: 'custom_validation_quotient',
      grade: 'wrong',
      uid: 'validation-quotient-source',
      info: { sec: '结果检验', num: 1, q: `0.48 &divide; 0.6 的商应该比 1 大还是小？`, a: '小于 1', step: '先比较被除数和除数，不急着精算。' }
    }
  ]
};
const validationQuotientTargets = context.window.buildSetReviewFollowupTargets?.(validationQuotientSession) || [];
const validationQuotientItems = context.window.buildSetReviewFollowupItems?.(validationQuotientSession, 'KAI', 'advanced_fluency_v1') || [];
const validationQuotientItem = validationQuotientItems[0] || {};
if (validationQuotientTargets[0]?.family !== 'validation_estimation' || context.window.getSetReviewStructureSignature?.(validationQuotientSession.details[0].info.q, 'validation_estimation') !== 'validation:quotient-vs-one' || context.window.getSetReviewStructureSignature?.(validationQuotientItem.q || '', 'validation_estimation') !== 'validation:quotient-vs-one' || validationQuotientItem.variantSourceMode !== 'source-aware-validation' || validationQuotientItem.followupQualityWarnings?.length) {
  throw new Error(`Quotient reasonableness variants should preserve comparison-to-one structure, got family ${validationQuotientTargets[0]?.family || '(missing)'} for ${validationQuotientItem.q || '(missing)'}`);
}
const validationDriftQuality = context.window.getSetReviewVariantQuality?.(validationQuotientTargets[0], { q: `4.8 &divide; 0.6 =`, qualityFamily: 'validation_estimation' });
if (validationDriftQuality?.ok || !validationDriftQuality?.reasons?.some(reason => /骨架/.test(reason))) {
  throw new Error('Set review quality gate should reject validation judgement drifting into ordinary calculation');
}
const validationEstimateSession = {
  set: 125,
  details: [
    {
      tag: 'custom_validation_estimate',
      grade: 'wrong',
      uid: 'validation-estimate-source',
      info: { sec: '估算检验', num: 1, q: `7.9 &times; 5.1 的结果更接近<div class="blank"></div>`, a: '40', step: '先约成 8×5，再选接近值。' }
    }
  ]
};
const validationEstimateItems = context.window.buildSetReviewFollowupItems?.(validationEstimateSession, 'KAI', 'advanced_fluency_v1') || [];
const validationEstimateItem = validationEstimateItems[0] || {};
if (context.window.getSetReviewStructureSignature?.(validationEstimateSession.details[0].info.q, 'validation_estimation') !== 'validation:estimate:×:decimal' || context.window.getSetReviewStructureSignature?.(validationEstimateItem.q || '', 'validation_estimation') !== 'validation:estimate:×:decimal' || validationEstimateItem.variantSourceMode !== 'source-aware-validation' || validationEstimateItem.followupQualityWarnings?.length) {
  throw new Error('Estimate-product variants should preserve estimate-not-exact-calculation structure');
}
const c2JudgementSession = {
  set: 126,
  details: [
    {
      tag: 'c2_mix_judgement',
      grade: 'wrong',
      uid: 'validation-c2-judgement-source',
      info: { sec: '结果判断', num: 1, q: `0.45 &divide; 0.9 的结果比 1<div class="blank"></div>`, a: '小', step: '被除数比除数小，所以结果应小于 1。' }
    }
  ]
};
const c2JudgementTargets = context.window.buildSetReviewFollowupTargets?.(c2JudgementSession) || [];
if (c2JudgementTargets[0]?.family !== 'validation_estimation') {
  throw new Error(`c2_mix_judgement should route to validation_estimation, got ${c2JudgementTargets[0]?.family || '(missing)'}`);
}
const complexNearSession = {
  set: 120,
  details: [
    {
      tag: 'l_bmix_near100',
      grade: 'wrong',
      uid: 'complex-near-comp-source',
      info: { sec: '简算补偿', num: 1, q: `99 &times; 34 + 34`, a: '3400', step: '把 99 个 34 和 1 个 34 合成 100 个 34。' }
    }
  ]
};
const complexNearTargets = context.window.buildSetReviewFollowupTargets?.(complexNearSession) || [];
const complexNearItems = context.window.buildSetReviewFollowupItems?.(complexNearSession, 'Lorik', 'advanced_fluency_v1') || [];
const complexNearItem = complexNearItems[0] || {};
if (context.window.getSetReviewStructureSignature?.(complexNearSession.details[0].info.q, 'complex_mixed') !== 'complex:near-base-compensation' || context.window.getSetReviewStructureSignature?.(complexNearItem.q || '', 'complex_mixed') !== 'complex:near-base-compensation' || complexNearItem.variantSourceMode !== 'source-aware-complex' || complexNearItem.followupQualityWarnings?.length) {
  throw new Error(`Near-100 compensation variants should preserve the compensation structure, got ${complexNearItem.q || '(missing)'}`);
}
const nearProductDriftQuality = context.window.getSetReviewVariantQuality?.(complexNearTargets[0], { q: `99 &times; 47 =`, qualityFamily: 'complex_mixed' });
if (nearProductDriftQuality?.ok || !nearProductDriftQuality?.reasons?.some(reason => /骨架/.test(reason))) {
  throw new Error('Set review quality gate should reject near-100 compensation drifting into plain near-100 multiplication');
}
const complexOrderSession = {
  set: 121,
  details: [
    {
      tag: 'l_bmix_order',
      grade: 'wrong',
      uid: 'complex-order-source',
      info: { sec: '运算顺序', num: 1, q: `42 + 14 &times; 6`, a: '126', step: '先乘除后加减，不能从左往右先加。' }
    }
  ]
};
const complexOrderItems = context.window.buildSetReviewFollowupItems?.(complexOrderSession, 'Lorik', 'advanced_fluency_v1') || [];
const complexOrderItem = complexOrderItems[0] || {};
if (context.window.getSetReviewStructureSignature?.(complexOrderSession.details[0].info.q, 'complex_mixed') !== 'complex:priority-add-mul' || context.window.getSetReviewStructureSignature?.(complexOrderItem.q || '', 'complex_mixed') !== 'complex:priority-add-mul' || complexOrderItem.variantSourceMode !== 'source-aware-complex' || complexOrderItem.followupQualityWarnings?.length) {
  throw new Error('Order-of-operations variants should preserve add-then-multiply structure');
}
const complexRemainSession = {
  set: 122,
  details: [
    {
      tag: 'k_oly_unit_fraction',
      grade: 'wrong',
      uid: 'complex-remain-source',
      info: { sec: '分数应用', num: 1, q: `48 &minus; 48 &times; ${validatorFrac(3, 8)}`, a: '30', step: '先求总量的 3/8，再用总量相减。' }
    }
  ]
};
const complexRemainItems = context.window.buildSetReviewFollowupItems?.(complexRemainSession, 'KAI', 'advanced_fluency_v1') || [];
const complexRemainItem = complexRemainItems[0] || {};
if (context.window.getSetReviewStructureSignature?.(complexRemainSession.details[0].info.q, 'complex_mixed') !== 'complex:fraction-remainder-of-whole' || context.window.getSetReviewStructureSignature?.(complexRemainItem.q || '', 'complex_mixed') !== 'complex:fraction-remainder-of-whole' || complexRemainItem.variantSourceMode !== 'source-aware-complex' || !/&minus;/.test(complexRemainItem.q || '') || complexRemainItem.followupQualityWarnings?.length) {
  throw new Error('Fraction remainder variants should preserve total-minus-fraction-of-total structure');
}
const complexDistSession = {
  set: 123,
  details: [
    {
      tag: 'l_bmix_dist',
      grade: 'wrong',
      uid: 'complex-fraction-dist-source',
      info: { sec: '逆用分配律', num: 1, q: `${validatorFrac(3, 13)} &times; 39 + ${validatorFrac(10, 13)} &times; 39`, a: '39', step: '两个互补分数都乘同一个数，先合成 1。' }
    }
  ]
};
const complexDistItems = context.window.buildSetReviewFollowupItems?.(complexDistSession, 'Lorik', 'advanced_fluency_v1') || [];
const complexDistItem = complexDistItems[0] || {};
if (context.window.getSetReviewStructureSignature?.(complexDistSession.details[0].info.q, 'complex_mixed') !== 'complex:fraction-complement-distribution' || context.window.getSetReviewStructureSignature?.(complexDistItem.q || '', 'complex_mixed') !== 'complex:fraction-complement-distribution' || complexDistItem.variantSourceMode !== 'source-aware-complex' || complexDistItem.followupQualityWarnings?.length) {
  throw new Error('Fraction complement distribution variants should preserve the same distributive-law mechanism');
}
const bulkFollowupSession = {
  set: 107,
  details: Array.from({ length: 11 }, (_, idx) => ({
    tag: 'k_dmul_basic',
    grade: idx % 3 === 0 ? 'careless' : 'wrong',
    uid: `bulk-${idx}`,
    info: { sec: '基础乘法', num: idx + 1, q: `${idx + 2} &times; ${idx + 3}`, a: `${(idx + 2) * (idx + 3)}`, step: '按乘法算。' }
  }))
};
const bulkFollowupItems = context.window.buildSetReviewFollowupItems?.(bulkFollowupSession, 'KAI', 'advanced_fluency_v1') || [];
if (bulkFollowupItems.length !== bulkFollowupSession.details.length) {
  throw new Error(`Set review follow-up should match mistake count, got ${bulkFollowupItems.length} for ${bulkFollowupSession.details.length}`);
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
if (!sampleFollowupPrintHtml.includes('错题变式训练') || !sampleFollowupPrintHtml.includes('参考答案') || !sampleFollowupPrintHtml.includes('□ 已会') || !sampleFollowupPrintHtml.includes('□ 又错')) {
  throw new Error('Set review follow-up print shell is missing the training or answer sections');
}
if (sampleFollowupPrintHtml.includes('变式体检通过') || sampleFollowupPrintHtml.includes('贴合原题') || sampleFollowupPrintHtml.includes('回填方法：') || sampleFollowupPrintHtml.includes('对应原错题：')) {
  throw new Error('Set review follow-up print shell should stay worksheet-clean without audit badges or report guidance');
}
const sampleFollowupQuestionOnlyPrintHtml = context.window.buildSetReviewFollowupPrintHTML?.('KAI', 106, false) || '';
if (!sampleFollowupQuestionOnlyPrintHtml.includes('错题变式训练') || sampleFollowupQuestionOnlyPrintHtml.includes('参考答案')) {
  throw new Error('Set review follow-up question-only print shell should render practice without answers');
}
const sampleFollowupAnswerOnlyPrintHtml = context.window.buildSetReviewFollowupAnswerPrintHTML?.('KAI', 106) || '';
if (!sampleFollowupAnswerOnlyPrintHtml.includes('主变式答案') || !sampleFollowupAnswerOnlyPrintHtml.includes('主变式参考答案') || sampleFollowupAnswerOnlyPrintHtml.includes('错题变式训练')) {
  throw new Error('Set review follow-up answer-only print shell should render answers without the practice sheet');
}
const warningBadgeHtml = context.window.buildSetReviewQualityBadge?.({ followupQualityWarnings: ['题型骨架不一致'] }) || '';
if (!warningBadgeHtml.includes('需复核') || !warningBadgeHtml.includes('题型骨架不一致')) {
  throw new Error('Set review quality badge should render warning reasons');
}
if (sampleFollowupPrintHtml.includes('备用变式：')) {
  throw new Error('Primary set review follow-up print sheet should not inline backup variants');
}
if (sampleFollowupPrintHtml.includes('class="blank math-inline-blank"') || sampleFollowupPrintHtml.includes('<div class="blank"></div>')) {
  throw new Error('Set review follow-up print HTML still contains legacy underline blanks');
}
const sampleBackupBankHtml = context.window.buildSetReviewBackupBankHTML?.(sampleFollowupItems, { includeAnswers: true }) || '';
if (!sampleBackupBankHtml.includes('备用二刷题库') || !sampleBackupBankHtml.includes('答案：') || !sampleBackupBankHtml.includes('贴合原题')) {
  throw new Error('Set review backup bank should render backup questions with optional answers');
}
const sampleBackupPrintHtml = context.window.buildSetReviewBackupPrintHTML?.('KAI', 106, true) || '';
if (!sampleBackupPrintHtml.includes('备用二刷变式') || !sampleBackupPrintHtml.includes('备用二刷题库') || !sampleBackupPrintHtml.includes('备用二刷参考答案') || !sampleBackupPrintHtml.includes('答案：')) {
  throw new Error('Set review backup print shell is missing backup practice or answers');
}
if (!sampleBackupPrintHtml.includes('□ 已会') || !sampleBackupPrintHtml.includes('□ 又错') || sampleBackupPrintHtml.includes('回填方法：') || sampleBackupPrintHtml.includes('对应原错题：')) {
  throw new Error('Set review backup print shell should keep compact paper marks without report guidance');
}
if (sampleBackupPrintHtml.indexOf('答案：') < sampleBackupPrintHtml.indexOf('备用二刷参考答案')) {
  throw new Error('Set review backup answer-included print should keep answers in a separate reference section after the questions');
}
const sampleBackupQuestionOnlyPrintHtml = context.window.buildSetReviewBackupPrintHTML?.('KAI', 106, false) || '';
if (!sampleBackupQuestionOnlyPrintHtml.includes('备用二刷变式') || !sampleBackupQuestionOnlyPrintHtml.includes('备用二刷题库') || sampleBackupQuestionOnlyPrintHtml.includes('备用二刷参考答案') || sampleBackupQuestionOnlyPrintHtml.includes('答案：')) {
  throw new Error('Set review backup question-only print shell should render backup questions without answers');
}
const sampleBackupAnswerOnlyPrintHtml = context.window.buildSetReviewBackupAnswerPrintHTML?.('KAI', 106) || '';
if (!sampleBackupAnswerOnlyPrintHtml.includes('备用二刷答案') || !sampleBackupAnswerOnlyPrintHtml.includes('备用二刷参考答案') || !sampleBackupAnswerOnlyPrintHtml.includes('答案：') || sampleBackupAnswerOnlyPrintHtml.includes('备用二刷题库')) {
  throw new Error('Set review backup answer-only print shell should render answers without the question bank');
}
context.window.currentSetNumber = 109;
const sampleBackupReviewHtml = context.window.buildSetReviewBackupPracticeReviewHTML?.('KAI', 106) || '';
const sampleFollowupReviewHtml = context.window.buildSetReviewFollowupPracticeReviewHTML?.('KAI', 106) || '';
if (
  !sampleFollowupReviewHtml.includes('主变式批改') ||
  !sampleFollowupReviewHtml.includes('data-practice-kind="set-review-followup"') ||
  !sampleFollowupReviewHtml.includes('data-set-num="106"') ||
  !sampleFollowupReviewHtml.includes('data-source-uid="r1"') ||
  !sampleFollowupReviewHtml.includes('sourceLabel') ||
  !sampleFollowupReviewHtml.includes('sourceQ') ||
  !sampleFollowupReviewHtml.includes('提交主变式批改') ||
  !sampleFollowupReviewHtml.includes('纸卷快速回填') ||
  !sampleFollowupReviewHtml.includes('全部已会 ✓') ||
  !sampleFollowupReviewHtml.includes('全部需讲解 ⚠️') ||
  !sampleFollowupReviewHtml.includes('需讲解 / 半会') ||
  !sampleFollowupReviewHtml.includes('practice-batch-progress') ||
  !sampleFollowupReviewHtml.includes('暂不能提交')
) {
  throw new Error('Set review main follow-up practice review shell is missing grading metadata or submit action');
}
if (
  !sampleBackupReviewHtml.includes('备用二刷批改') ||
  !sampleBackupReviewHtml.includes('data-practice-kind="set-review-backup"') ||
  !sampleBackupReviewHtml.includes('data-set-num="106"') ||
  !sampleBackupReviewHtml.includes('data-source-uid="r1"') ||
  !sampleBackupReviewHtml.includes('sourceLabel') ||
  !sampleBackupReviewHtml.includes('sourceQ') ||
  !sampleBackupReviewHtml.includes('提交备用二刷批改') ||
  !sampleBackupReviewHtml.includes('纸卷快速回填') ||
  !sampleBackupReviewHtml.includes('全部需讲解 ⚠️') ||
  !sampleBackupReviewHtml.includes('全部又错 ✗') ||
  !sampleBackupReviewHtml.includes('需讲解 / 半会') ||
  !sampleBackupReviewHtml.includes('practice-batch-progress') ||
  !sampleBackupReviewHtml.includes('暂不能提交')
) {
  throw new Error('Set review backup practice review shell is missing grading metadata or submit action');
}
const backupPracticeLog = await context.window.StorageDB.saveErrorBookPractice('KAI', [
  {
    tag: 'k_dmul_basic',
    grade: 'wrong',
    sourceErrorUid: 'r1',
    mechanismKey: 'arithmetic_multiplication',
    info: { sec: '备用二刷卷', num: 1, q: '3 × 4', a: '12', step: '按乘法口诀。', sourceLabel: '复杂乘法 · 第 2 小题', sourceQ: '2 × 3', sourceA: '6', sourceSet: 106 }
  }
], 'advanced_fluency_v1', { set: 106, practiceKind: 'set-review-backup', scopeLabel: 'Set 106 备用二刷' });
const backupResultHtml = context.window.buildErrorBookPracticeResultHTML?.('KAI', backupPracticeLog) || '';
const backupProfile = context.window.StorageDB.getProfile('KAI', 'advanced_fluency_v1');
if (
  backupPracticeLog?.set !== 106 ||
  backupProfile.errorBook.r1?.lastSet !== 106 ||
  !backupResultHtml.includes('备用二刷批改结果') ||
  !backupResultHtml.includes('Set 106 备用二刷') ||
  !backupResultHtml.includes('对应原错题') ||
  !backupResultHtml.includes('复杂乘法 · 第 2 小题') ||
  !backupResultHtml.includes('复杂乘法 · 第 2 小题 继续留在错题本') ||
  !backupResultHtml.includes('2 × 3') ||
  !backupResultHtml.includes('原答案：6') ||
  !backupResultHtml.includes('返回 Set 106 本套报告')
) {
  throw new Error('Set review backup grading log is not preserving its result title or scope label');
}
const mainFollowupPracticeLog = await context.window.StorageDB.saveErrorBookPractice('KAI', [
  {
    tag: 'k_dmul_basic',
    grade: 'careless',
    sourceErrorUid: 'r2',
    mechanismKey: 'arithmetic_multiplication',
    info: { sec: '变式训练卷', num: 1, q: '4 × 6', a: '24', step: '按乘法口诀。', sourceLabel: '复杂乘法 · 第 3 小题', sourceQ: '4 × 5', sourceA: '20', sourceSet: 106 }
  }
], 'advanced_fluency_v1', { set: 106, practiceKind: 'set-review-followup', scopeLabel: 'Set 106 主变式跟训' });
const mainFollowupResultHtml = context.window.buildErrorBookPracticeResultHTML?.('KAI', mainFollowupPracticeLog) || '';
if (
  mainFollowupPracticeLog?.set !== 106 ||
  !mainFollowupResultHtml.includes('主变式批改结果') ||
  !mainFollowupResultHtml.includes('Set 106 主变式跟训') ||
  !mainFollowupResultHtml.includes('复杂乘法 · 第 3 小题') ||
  !mainFollowupResultHtml.includes('需讲解') ||
  !mainFollowupResultHtml.includes('需要先讲解/口述方法') ||
  !mainFollowupResultHtml.includes('打印讲解清单') ||
  !mainFollowupResultHtml.includes('返回 Set 106 本套报告')
) {
  throw new Error('Set review main follow-up grading log is not preserving its result title or scope label');
}
const mainFollowupExplainChecklistHtml = context.window.buildErrorBookPracticeExplainChecklistHTML?.('KAI', mainFollowupPracticeLog) || '';
if (!mainFollowupExplainChecklistHtml.includes('主变式讲解清单') || !mainFollowupExplainChecklistHtml.includes('复杂乘法 · 第 3 小题') || !mainFollowupExplainChecklistHtml.includes('让孩子先口述方法') || !mainFollowupExplainChecklistHtml.includes('讲后记录')) {
  throw new Error('Set review main follow-up explanation checklist is missing source-linked action guidance');
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
context.window.StorageDB.cache.KAI = { weights: {}, lastSeen: {}, history: [], errorBook: {}, programs: {} };
context.window.currentSetNumber = 110;
const duplicateInfoA = { sec: '一、口算', num: 1, q: '48 ÷ 6 = （ ）', a: '8', step: '六八四十八。' };
const duplicateInfoB = { sec: '一、口算', num: 2, q: '48 ÷ 6 = （ ）', a: '8', step: '六八四十八。' };
const duplicateInfoC = { sec: '一、口算', num: 3, q: '48 ÷ 6 = （ ）', a: '8', step: '六八四十八。' };
const duplicatePayload = context.window.buildSubmissionPayloadFromRows?.([
  makeFakeRow({ tag: 'dup_div_fact', info: duplicateInfoA, grade: 'wrong' }),
  makeFakeRow({ tag: 'dup_div_fact', info: duplicateInfoB, grade: 'careless' }),
  makeFakeRow({ tag: 'dup_div_fact', info: duplicateInfoC }),
], null);
if (!duplicatePayload || duplicatePayload.records.length !== 2 || duplicatePayload.newRecords.length !== 2) {
  throw new Error('Duplicate same-question rows were collapsed before saving the set report');
}
await context.window.StorageDB.saveSession('KAI', duplicatePayload.records, 110, 'advanced_fluency_v1');
const duplicateProfile = context.window.StorageDB.getProfile('KAI', 'advanced_fluency_v1');
const duplicateSession = duplicateProfile.history.find(session => session.set === 110);
if (!duplicateSession || duplicateSession.allGrades.length !== 2 || duplicateSession.details.length !== 2) {
  throw new Error('Set report did not preserve duplicate same-question rows by position');
}
if (!context.window.findSessionGradeEntry?.(duplicateSession, 'dup_div_fact', duplicateInfoA) || !context.window.findSessionGradeEntry?.(duplicateSession, 'dup_div_fact', duplicateInfoB)) {
  throw new Error('Position-based answer lookup did not find both duplicate submitted rows');
}
if (context.window.findSessionGradeEntry?.(duplicateSession, 'dup_div_fact', duplicateInfoC)) {
  throw new Error('Position-based answer lookup incorrectly marked an unsubmitted duplicate row');
}
const duplicateErrorEntries = Object.values(duplicateProfile.errorBook || {});
if (duplicateErrorEntries.length !== 1 || duplicateErrorEntries[0].count !== 2) {
  throw new Error('Error book should merge duplicate same-question rows while retaining the set report occurrences');
}
const duplicateIntegrityHtml = context.window.buildSetReviewIntegrityHTML?.(duplicateSession) || '';
if (!duplicateIntegrityHtml.includes('错题记录完整性已核对') || !duplicateIntegrityHtml.includes('报告列出 2 条')) {
  throw new Error('Set review integrity banner did not confirm the duplicate-row report coverage');
}
const duplicateAudit = context.window.getSetReportIntegrityAudit?.(duplicateProfile);
if (!duplicateAudit || duplicateAudit.missing !== 0 || duplicateAudit.details !== 2 || duplicateAudit.mistakes !== 2) {
  throw new Error('Set-report integrity audit did not summarize duplicate-row coverage correctly');
}
const duplicateAuditHtml = context.window.buildSetReportIntegrityAuditHTML?.() || '';
if (!duplicateAuditHtml.includes('错题记录体检') || !duplicateAuditHtml.includes('一键重新修复')) {
  throw new Error('Set-report integrity audit panel did not render the repair controls');
}
const submittedActionsHtml = context.window.buildSubmittedAnswerActionsHTML?.('KAI', duplicateSession) || '';
if (!submittedActionsHtml.includes('提交后对照') || !submittedActionsHtml.includes('查看KAI本套报告') || !submittedActionsHtml.includes('打印本套错题变式')) {
  throw new Error('Submitted answer sheet actions did not expose set report and follow-up print controls');
}
const legacyMigratedProfile = context.window.StorageDB.migrateProgramProfile?.({
  weights: {},
  lastSeen: {},
  errorBook: {},
  history: [{
    set: 111,
    date: '2026/4/28',
    details: [],
    allGrades: [{
      tag: 'legacy_div_fact',
      grade: 'wrong',
      uid: 'legacy-row',
      rowKey: 'legacy_div_fact::一、口算::1',
      info: { sec: '一、口算', num: 1, q: '63 ÷ 7 = （ ）', a: '9', step: '七九六十三。' }
    }]
  }]
}, 'advanced_fluency_v1');
const legacySession = legacyMigratedProfile?.history?.find(session => session.set === 111);
if (!legacySession || legacySession.details.length !== 1 || !legacySession.details[0].rowKey) {
  throw new Error('Legacy session migration did not repair missing mistake details from allGrades');
}
const legacyErrorEntries = Object.values(legacyMigratedProfile.errorBook || {});
if (legacyErrorEntries.length !== 1 || legacyErrorEntries[0].count !== 1) {
  throw new Error('Legacy migration did not reconcile repaired mistake details back into the error book');
}
const warningIntegrityHtml = context.window.buildSetReviewIntegrityHTML?.({
  allGrades: [{ tag: 'x', grade: 'wrong', uid: 'x1', rowKey: 'x::一::1', info: { sec: '一', num: 1, q: 'x', a: '1' } }],
  details: []
}) || '';
if (!warningIntegrityHtml.includes('错题记录仍需复核') || !warningIntegrityHtml.includes('待补 1 条')) {
  throw new Error('Set review integrity banner did not warn when details are still missing');
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
const closureSet12AnswerRecords = [1, 2, 3, 4, 5].flatMap(sectionIndex =>
  extractAnswerRecords(extractAnswerSectionHtml(elements.get('paper-container')?.innerHTML || '', 'kai', sectionIndex))
);
const closureSet12Session = {
  set: 12,
  programId: 'elementary_closure_v1',
  details: closureSet12AnswerRecords,
  allGrades: closureSet12AnswerRecords.map(record => ({ ...record, grade: record.grade || 'wrong' })),
};
const closureSet12AnswerAudit = context.window.getSessionAnswerKeyAudit?.(closureSet12Session, 'KAI');
if (!closureSet12AnswerAudit?.checked || closureSet12AnswerAudit.total !== closureSet12AnswerRecords.length || closureSet12AnswerAudit.aligned !== closureSet12AnswerRecords.length || closureSet12AnswerAudit.mismatches.length !== 0) {
  throw new Error('Closure set-report answer audit did not align KAI rows back to the closure answer key');
}
const driftedClosureSet12Session = JSON.parse(JSON.stringify(closureSet12Session));
driftedClosureSet12Session.details[0].info.a = 'closure-drift';
const driftedClosureSet12Audit = context.window.getSessionAnswerKeyAudit?.(driftedClosureSet12Session, 'KAI');
if (!driftedClosureSet12Audit?.checked || driftedClosureSet12Audit.mismatches.length !== 1 || driftedClosureSet12Audit.aligned !== closureSet12AnswerRecords.length - 1) {
  throw new Error('Closure set-report answer audit did not detect a drifted answer');
}
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
