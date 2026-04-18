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
if (!html.includes('function beautifyMathHTML')) {
  throw new Error('Math beautification helper is missing from runtime script');
}
if (!html.includes('.math-op') || !html.includes('.math-eq') || !html.includes('.math-compare')) {
  throw new Error('Math typography classes are missing from CSS');
}
if (html.includes('<span>...</span><span class="bottom">...</span>')) {
  throw new Error('Pedagogical placeholder fraction step should not remain in HTML');
}
const cachePrefix = html.match(/const SET_CACHE_PREFIX = '([^']+)'/)?.[1] || 'MathSetData_v36';

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
  if (!paper.includes('第二阶段预览') || !paper.includes('M3')) {
    throw new Error(`Closure answer sheet for set ${setNumber} is missing preview-only grading messaging`);
  }
  if (!closureQuestionOnly.includes('综合') && !closureQuestionOnly.includes('桥接')) {
    throw new Error(`Closure question paper for set ${setNumber} is missing integrated-training section framing`);
  }
  assertSetData(setNumber, 'elementary_closure_v1');
}

function stripHtml(value) {
  return String(value || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
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
  const seen = new Set();
  const getKnowledgeTip = context.window.getKnowledgeTip;
  const getKnowledgeDomain = context.window.getKnowledgeDomain;
  const fallbackName = context.window.FallbackAdvice?.name;
  if (programId === 'elementary_closure_v1') {
    const expectedClosureCounts = {
      c_k_bridge: 8,
      c_k_unit: 4,
      c_k_maint_core: 4,
      c_k_rate: 4,
      c_k_mix: 4,
      c_k_maint_mix: 8,
      c_l_bridge: 8,
      c_l_unit: 4,
      c_l_maint_core: 4,
      c_l_rate: 4,
      c_l_mix: 4,
      c_l_maint_mix: 8,
    };
    const closureSections = Object.keys(expectedClosureCounts);
    const kBridgeTags = new Set((data.c_k_bridge || []).map(item => item?.tag));
    const kUnitTags = new Set((data.c_k_unit || []).map(item => item?.tag));
    const kMaintCoreTags = new Set((data.c_k_maint_core || []).map(item => item?.tag));
    const kRateTags = new Set((data.c_k_rate || []).map(item => item?.tag));
    const kMixTags = new Set((data.c_k_mix || []).map(item => item?.tag));
    const kMaintMixTags = new Set((data.c_k_maint_mix || []).map(item => item?.tag));
    const lBridgeTags = new Set((data.c_l_bridge || []).map(item => item?.tag));
    const lUnitTags = new Set((data.c_l_unit || []).map(item => item?.tag));
    const lMaintCoreTags = new Set((data.c_l_maint_core || []).map(item => item?.tag));
    const lRateTags = new Set((data.c_l_rate || []).map(item => item?.tag));
    const lMixTags = new Set((data.c_l_mix || []).map(item => item?.tag));
    const lMaintMixTags = new Set((data.c_l_maint_mix || []).map(item => item?.tag));

    if (!kBridgeTags.has('c2_bridge_pct_frac') || !kBridgeTags.has('c2_bridge_ratio_frac')) {
      throw new Error(`Closure set ${setNumber} is missing KAI bridge coverage`);
    }
    if (!lBridgeTags.has('c2_bridge_pct_frac') || !lBridgeTags.has('c2_bridge_ratio_frac')) {
      throw new Error(`Closure set ${setNumber} is missing Lorik bridge coverage`);
    }
    if (!kUnitTags.has('c2_unit_length') || !kUnitTags.has('c2_unit_mass')) {
      throw new Error(`Closure set ${setNumber} is missing KAI unit-chain coverage`);
    }
    if (!lUnitTags.has('c2_unit_length') || !lUnitTags.has('c2_unit_mass')) {
      throw new Error(`Closure set ${setNumber} is missing Lorik unit-chain coverage`);
    }
    if (!kRateTags.has('c2_rate_discount') || !kRateTags.has('c2_eq_percent')) {
      throw new Error(`Closure set ${setNumber} is missing KAI rate-equation coverage`);
    }
    if (!lRateTags.has('c2_rate_discount') || !lRateTags.has('c2_eq_percent')) {
      throw new Error(`Closure set ${setNumber} is missing Lorik rate-equation coverage`);
    }
    if (!kMixTags.has('c2_est_product') || !kMixTags.has('c2_speed_mix')) {
      throw new Error(`Closure set ${setNumber} is missing KAI estimation-speed coverage`);
    }
    if (!lMixTags.has('c2_est_product') || !lMixTags.has('c2_speed_mix')) {
      throw new Error(`Closure set ${setNumber} is missing Lorik estimation-speed coverage`);
    }
    if (![...kMaintCoreTags].some(tag => String(tag || '').startsWith('k_ddiv_'))) {
      throw new Error(`Closure set ${setNumber} is missing KAI division maintenance coverage`);
    }
    if (![...lMaintCoreTags].some(tag => String(tag || '').startsWith('l_div_'))) {
      throw new Error(`Closure set ${setNumber} is missing Lorik division maintenance coverage`);
    }
    if (![...kMaintMixTags].some(tag => String(tag || '').startsWith('k_dmul_')) || ![...kMaintMixTags].some(tag => String(tag || '').startsWith('k_sub_'))) {
      throw new Error(`Closure set ${setNumber} is missing KAI maintenance of multiplication or subtraction`);
    }
    if (![...lMaintMixTags].some(tag => String(tag || '').startsWith('l_mul_')) || ![...lMaintMixTags].some(tag => String(tag || '').startsWith('l_sub_'))) {
      throw new Error(`Closure set ${setNumber} is missing Lorik maintenance of multiplication or subtraction`);
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
        const signature = `${item.tag}:${stripHtml(item.q)}`;
        if (seen.has(signature)) throw new Error(`${location} duplicates ${signature}`);
        seen.add(signature);
      });
    });
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
      const signature = `${item.tag}:${stripHtml(item.q)}`;
      if (seen.has(signature)) throw new Error(`${location} duplicates ${signature}`);
      seen.add(signature);
    });
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
context.window.StorageDB.cache.KAI = { weights: {}, lastSeen: {}, history: [], errorBook: {} };
context.window.StorageDB.cache.KAI.history = [{
  set: 106,
  date: 'validator',
  ts: Date.now(),
  details: [{ tag: 'k_dmul_basic', grade: 'wrong', uid: 'r1', info: { sec: '复杂乘法', num: 2, q: '2 &times; 3', a: '6', step: '2乘3等于6。' } }],
  allGrades: [{ tag: 'k_dmul_basic', grade: 'wrong' }, { tag: 'k_dmul_scale', grade: 'perfect' }],
  weightAdjustments: [],
}];
context.window.showSetReview(106, 'KAI');
const reviewHtml = elements.get('report-content-area')?.innerHTML || '';
if (!reviewHtml.includes('Set 106') || !reviewHtml.includes('第 2 题') || !reviewHtml.includes('2 &times; 3') || !reviewHtml.includes('6')) {
  throw new Error('Set review report is missing set number, paper number, question, or answer');
}
context.window.StorageDB.cache.KAI = { weights: {}, lastSeen: {}, history: [], errorBook: {} };
for (let setNumber = 73; setNumber <= 102; setNumber += 1) {
  context.window.currentSetNumber = setNumber;
  context.window.renderPaper();
  checked.push(`${setNumber}:${assertPaper(setNumber)}`);
}
context.window.changeProgram('elementary_closure_v1');
if (programSelector.value !== 'elementary_closure_v1') {
  throw new Error('Program selector did not switch to elementary_closure_v1');
}
if (!String(programTitleLabel?.textContent || '').includes('小学计算收束阶段')) {
  throw new Error('Program shell did not render the closure program label');
}
if (!String(stageStatusTitle?.textContent || '').includes('第二阶段')) {
  throw new Error('Stage status card did not render second-stage status text');
}
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
