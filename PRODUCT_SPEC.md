# Product Spec

## Goal

Mini Challenge is a printable and local-first math fluency trainer for grades 3-4. It generates short, high-density practice sets for two learners, records grading outcomes, and turns mistakes into a durable error book.

## Learners

- Grade 3-4 students who need daily numerical fluency practice.
- Parent or tutor who prints sheets, grades answers, and reviews weak spots.

## Core User Stories

- As a tutor, I can generate a stable numbered set so a printed sheet and answer sheet match.
- As a tutor, I can mark each answer as perfect, careless, or concept error.
- As a learner, I get repeated retrieval of weak or recently forgotten concepts without seeing the exact same paper every time.
- As a tutor, I can open an error book grouped by knowledge point and mark items as mastered.
- As a family using multiple devices, I can sync progress through a private GitHub Gist and still keep a JSON backup.

## Learning Model

The app is designed around three learning science principles:

- Retrieval practice: students solve from memory before checking the answer sheet.
- Spacing and forgetting review: each tag stores `lastSeen`; older tags receive a selection bonus.
- Interleaving and discrimination: each set mixes arithmetic, fraction conversion, equations, and shortcut problems so students must choose methods instead of following a fixed block routine.

Feedback is immediate after grading. Mistakes are not only counted; they are classified as careless or concept errors, grouped by knowledge tag, and reintroduced through the adaptive weighting system.

v22.4 expands misconception coverage in the generator pools:

- Decimal place value: tiny products, decimal quotients, and estimation checks.
- Operation structure: unknown divisors, compensation around 99/101/999, and common scale-down division.
- Regrouping: whole-ten-thousand and whole-million subtraction with long borrow chains.
- Fraction meaning: fraction of a whole number, cross-canceling, and sixteenths/fortieths conversions.

v22.5 adds more diagnostic practice:

- Two-step equations that require undoing addition/subtraction before multiplication/division.
- Reverse distributive patterns that require identifying the shared factor.
- Unit-fraction application tasks that force "one part first, then several parts" reasoning.
- Parentheses-first mixed operations for catching left-to-right overgeneralization.

v22.6 improves feedback quality:

- Every answer row includes an actionable misconception tip.
- Exact knowledge tags use tailored advice; uncatalogued tags fall back to family-level advice before using the generic fallback.
- Error-book review and regular answer sheets share the same advice resolver, so practice and remediation stay aligned.

v22.7 improves training level control:

- Every generated item receives a level from L1 foundation to L4 challenge.
- The seven-set training cycle biases selection toward suitable levels for consolidation, trap avoidance, forgetting review, or challenge days.
- The knowledge map exposes active weak tags and the knowledge-family coverage behind the generator pools.

v22.8 improves training quality governance:

- Each sheet shows a phase focus strip with the current learning goal, target level band, and learning principle reminder.
- L4 challenge items are capped on non-challenge phases so difficult transfer work does not crowd out consolidation.
- The knowledge map adds a domain profile across decimal place value, integer algorithms, fractions/conversions, equations, and strategy problems.
- Active weak tags now show both domain and L1-L4 level, turning mistakes into a clearer next training target.

v22.9 improves adaptive transfer across related knowledge points:

- Domain-level weakness signals are computed from tag weights and active error-book counts.
- Related tags in a weak domain receive a moderate selection bonus, helping practice transfer beyond the exact missed tag.
- Answer sheets mark domain-boosted items so the tutor can see why a related item appeared.
- Domain profile cards show training priority, active error count, and mastered count.

v23.0 integrates the durable error book into regular training:

- Active error-book entries return through a three-part bridge: exact replay, same-tag variation, and same-domain transfer.
- Exact replay is capped per section so review is deliberate without crowding out new retrieval practice.
- Same-tag variation is labeled on the paper, making it clear when a generated item is connected to an active mistake.
- The knowledge map includes an Error-Book Bridge plan that explains how each active error will re-enter training.

v23.1 improves the daily print workflow:

- Tutors can print only the four student-facing AB question sheets from the long page.
- Answer sheets can be printed separately, reducing accidental answer leakage.
- The four question sheets are explicitly marked for stable A4 pagination.

v23.2 clarifies and strengthens cross-device sync:

- Records are local-only until the tutor connects a GitHub PAT with gist scope.
- Connected devices use one private GitHub Gist as the cloud store and merge local/cloud profiles on startup.
- Grading writes push automatically; focus/visibility changes and a light interval pull remote updates.
- The backup modal explains where data lives and shows separate pull/push timestamps.

v23.3 improves sync onboarding:

- Local-only status now exposes a direct cloud-connect button in the main control panel.
- The sync status line is clickable and opens the Gist connection panel.
- Copy explicitly says the current device is not connected yet, instead of only saying "local mode".

v23.4 adds a current-set grading report:

- After a tutor submits grades, a modal report summarizes the exact wrong or careless items in that set.
- Each row includes learner, section, paper question number, error type, original question, correct answer, and review advice.
- The report can also be reopened from the control panel for paper-to-screen review with the child.

v23.5 strengthens print reliability and Lorik division coverage:

- Question-sheet printing now uses print lifecycle cleanup instead of a short timer, reducing browser-dependent blank-page failures.
- Print layout uses visible-sheet pagination during print, instead of relying on fixed page-height boxes alone.
- Lorik section II now guarantees decimal division practice across three forms: decimal dividend, decimal divisor, and both dividend and divisor as decimals.

v23.6 improves operator confidence around backup and printing:

- Backups now carry explicit app-version and export metadata so families can tell which snapshot they are restoring.
- Import success feedback now surfaces both the source version and the current app version.
- Print actions show a brief preflight reminder for orientation, scaling, and header/footer settings before the system dialog opens.

v23.7 strengthens training quality through must-cover item diversity:

- KAI decimal multiplication and division sets now guarantee key misconception coverage instead of relying on random tag combinations alone.
- Every KAI decimal set includes both procedural decimal-place work and strategy-oriented shortcut work.
- Lorik basic mixed-operation sets now guarantee structure diversity across compensation, order of operations, distributive reasoning, and combination splitting.
- Runtime validation now treats these coverage guarantees as release-blocking checks.

v23.19 improves mathematical sheet readability and print polish:

- Math expressions now use more deliberate visual treatment for operators, equality marks, comparison signs, blanks, circles, and fraction spacing.
- The goal is to reduce visual friction: learners should parse the structure of the problem faster and with less symbol confusion.
- The typography pass applies to both on-screen review and printed sheets, so visual quality supports the training model instead of fighting it.

v23.22 turns phase two into a real trainable program without disrupting the current trainer:

- Families can now switch into `小学计算收束阶段`, complete a real second-stage paper set, submit grading, and immediately review closure-specific feedback.
- The phase-two paper is designed as `总收束 + 保温`: it integrates percent/fraction/ratio bridging, unit chains, rates, equations, estimation, speed, and result checking while still keeping first-stage core calculation fluency warm every day.
- The product intent is not to simply raise difficulty or revisit basics in isolation. It is to finish elementary-school calculation training efficiently and personally, judged from a grade-6 to junior-high readiness perspective.
- The current release now writes phase-two grading into an isolated program profile, so closure-specific error books and gap signals accumulate without polluting the first-stage trainer.

v23.23 completes the stage-promotion loop:

- This was an intermediate transition design and is now superseded by the teacher-controlled manual switcher in `v23.27`.
- The first stage now gives a human-readable readiness status instead of only exposing a raw second-stage switch.
- Families can formally choose between `进入第二阶段` and `继续巩固 7 套`, which matches the product goal of high-quality transition rather than mechanical stage flipping.
- The transition now preserves learning continuity better: `Advanced` and `Closure` keep their own set counters, and first entry into phase two performs a light bootstrap from first-stage weak domains.
- The product stance remains the same: the second stage is not "hard mode". It is the formal closure stage for elementary-school calculation, viewed from grade-6 to junior-high readiness.

v23.27 replaces automatic stage judgment with a teacher workbench and exam-paper presentation:

- Stage switching is now explicitly teacher-controlled. The system no longer blocks or scores readiness before allowing `Closure`; the guardian or tutor decides when to move from stage one to stage two.
- The product keeps the useful continuity from the earlier stage-gate work:
  - `Advanced` and `Closure` still maintain their own set counters
  - first entry into `Closure` still bootstraps from first-stage weak-domain signals
  - the two stages still share the same local-first storage model and sync path
- The on-screen product is now intentionally split into two layers:
  - a no-print teacher workbench for switching stage, reading status, and controlling the session
  - a student-facing paper surface that stays calm, print-safe, and closer to a Singapore-style mathematics booklet
- This matters product-wise because the adult-facing control experience and the child-facing paper should solve different problems:
  - the teacher needs clarity, switching control, and signal visibility
  - the learner needs a page that feels like a real assessment handout rather than a dashboard
- The new paper direction is not decorative. It is meant to improve training efficiency by reducing visual noise and making symbols, section breaks, blanks, units, and comparison structure easier to parse under print conditions.

v23.28 deepens the assessment-booklet feel of the student paper:

- The paper now makes the hierarchy of each large question clearer through stronger section markers instead of relying only on inline Chinese numbering text.
- Each printed page now also carries a compact meta band so the tutor can immediately tell:
  - which program this page belongs to
  - which paper it is within the AB flow
  - what the current page is mainly training
- This is still intentionally not a "dashboard on paper". The product goal is to make the sheet read like a real practice booklet while preserving print safety and adaptive logic under the hood.
- Product-wise, this improves efficiency in two ways:
  - adults orient faster when handling multiple printed pages
  - learners see a calmer, more legible hierarchy and can start the page with less friction

v23.29 aligns the answer key with the same booklet system:

- The answer key is no longer treated like a purely functional grading screen. It now shares the same booklet language as the question paper:
  - compact meta band
  - unified footer
  - clearer section headings for worked solutions
- This matters product-wise because the adult print workflow is part of the learning system. If the teacher key feels visually disconnected from the student paper, reviewing and reusing printed materials takes more effort than it should.
- The goal is still efficiency, not ornament:
  - faster sorting of printed pages
  - clearer teacher orientation during grading
  - stronger feeling that question paper and solution booklet belong to one intentional system

v23.30 fixes a high-friction booklet regression:

- The new booklet chrome had started to compete with question density: some longer items could be clipped, and multi-line questions could make the printed numbering feel unstable.
- The product now treats screen readability and print density as two different problems:
  - on screen, questions must render completely
  - in print, the page must stay compact enough to preserve the intended four-page packet
- The numbering model is also more exam-like now because serial numbers stay in their own left column instead of moving with wrapped question text.
- This matters product-wise because a beautifully styled booklet that clips questions or misaligns numbering is lower-quality training, not higher-quality presentation.

v23.24 deepens the second-stage training quality:

- `Closure` now follows a month-like three-phase arc instead of repeating one blended paper shape forever.
- `收口期` focuses on normalization first: common representations, base unit alignment, and estimate-before-exact habits.
- `收束期` focuses on integrated transfer: mixed percent/fraction/ratio work, method choice, and quicker switching across structures.
- `毕业判定期` focuses on stable checking: reverse representations, boundary discrimination, and validating whether the result is reasonable.
- The product goal remains unchanged: finish elementary-school calculation training efficiently and personally, while still keeping first-stage core algorithms warm enough that prior gains do not fade.

v23.25 makes phase two more personally efficient:

- The second-stage paper now has one learner-specific reinforcement lane instead of giving both learners the same fifth section by default.
- The system uses second-stage gap signals, active closure error-book entries, recent closure mistakes, and phase bias together to decide what that learner most needs today.
- This keeps the paper shape stable for printing and tutoring, but makes the second stage behave more like a coach:
  - one learner may get `重点强化：跨表示桥接`
  - another may get `重点强化：单位与建模`
  - another may get `重点强化：旧知稳态` or `结果检验`
- Product-wise, this is important because the closure stage is not meant to be a generic harder worksheet. It should finish elementary-school calculation efficiently by concentrating more time on the most valuable current gap while still preserving the common closure spine.

v23.26 deepens the closure coaching loop:

- The learner-specific reinforcement lane in section V now does more than change theme; it also tries to bring back one active mistake from that same gap family.
- The replay order is deliberate:
  - first try the exact old item
  - if that would duplicate the current paper, fall back to a same-skill variant
- This matters product-wise because the closure stage is supposed to be efficient, not merely comprehensive. When the system already knows today's dominant gap, it should spend at least one visible slot proving that it remembers the learner's actual recent mistake pattern.

v23.18 improves global training efficiency, not only local item quality:

- The selection engine now gives extra priority to high-value misconception families instead of treating all weak spots as equally urgent.
- In practice, this means more time is spent on decimal-division placement, equation inversion traps, fraction mul/div and canceling, and benchmark conversion/comparison work.
- Review variants now also cover selected KAI high-value traps, so remediation is less dependent on seeing the exact old item again.

v23.17 raises the quality ceiling of Lorik Set B division:

- Section II keeps the same decimal-division spine, but now more often requires genuine quotient estimation, `×10` versus `×100` scaling decisions, and post-solution verification.
- Decimal-division items now more deliberately include two-decimal dividends or divisors, plus both quotient-below-1 and quotient-above-1 cases.
- Error-book review variants for the same division families now match this stronger standard instead of replaying only older easier patterns.

v23.16 hardens the print path:

- Print actions now stage a dedicated print-only DOM container instead of asking the browser to paginate the live long page directly.
- Question-sheet printing uses a slightly sub-A4 fixed page height inside that sandbox, reducing rounding/overflow cases that can create blank even-numbered pages.
- The print sandbox is cleared after print lifecycle cleanup, so the interactive app view and the print flow stay isolated.

v23.15 upgrades review practice quality:

- Error-book practice is no longer limited to replaying the exact same item; selected high-value tags can now return as nearby same-skill variants.
- This makes remediation closer to real mastery checking: the learner must solve the same idea again in a slightly changed form, not just remember a prior answer.

v23.14 sharpens conversion and comparison discrimination:

- Comparison items now sit closer to common benchmark values, reducing "obvious answer" cases and increasing real decimal-fraction discrimination practice.
- Answer-sheet support for conversion items is stronger, so a tutor can review the exact benchmark transformation instead of only reading the final answer.

v23.13 restores exam-like sheet presentation:

- Normal question sheets now suppress internal training metadata so the printed page looks closer to a real exam handout.
- Only exact error-book replay items keep a lightweight review marker, and that marker is positioned so it does not change line height or pagination.
- This keeps pedagogy in the generation logic and answer sheet, while the student-facing paper stays visually calm and print-safe.

v23.12 deepens training quality beyond structural coverage:

- Decimal-division practice in Lorik Set B now includes quotient-placement decisions on both sides of 1, so students must genuinely reason about where the decimal point belongs.
- More core items now carry real worked hints on the answer sheet, especially in multiplication, subtraction, decimal division, and mixed-number fraction operations.
- Placeholder-style pseudo-explanations were removed from fraction review so remediation quality is closer to what a tutor would actually say aloud.

v23.11 upgrades overall training quality and refreshes stale cached papers:

- The set-cache namespace now advances with generator changes, so future papers regenerate under the latest logic instead of silently reusing stale older sets.
- Lorik Set B division keeps a fixed four-part spine every day: one integer division item, one decimal dividend item, one decimal divisor item, and one double-decimal item.
- Additional core blocks now use must-cover structure instead of random subsets, including Lorik multiplication, Lorik subtraction, KAI large subtraction, and KAI olympiad reasoning.
- The practical result is more diagnostically trustworthy daily practice: tutors can expect key misconception families to appear consistently instead of hoping random selection happens to hit them.

v23.10 fixes a high-friction print failure:

- The four-page AB print flow no longer relies on full-height preview shells during print, which could create blank even-numbered pages on some browsers or printer presets.
- Question and answer printing now insert page breaks only between adjacent visible sheets, so tutors can print four consecutive populated pages without manually selecting odd pages.

v23.9 strengthens fraction training reliability:

- KAI fraction sets now guarantee a daily blend of add/subtract structure, chained multiply-divide reasoning, distributive reasoning, cross-canceling, and decimal-fraction bridge work.
- Lorik fraction sets now guarantee all core forms appear every day, including mixed numbers, parentheses, fraction-of-whole, and decimal-fraction bridge practice.
- The goal is to make the fraction block diagnostically trustworthy, so a tutor can expect the same misconception families to surface instead of hoping randomness hits them.

v23.8 extends must-cover guarantees into conversion and equation reasoning:

- KAI conversion sets now guarantee a balanced mix of percent, repeating decimal, benchmark denominator, and exact decimal-to-fraction work.
- KAI equation sets now guarantee inverse-operation, multi-step, special-position unknown, and proportion forms in every set.
- The goal is not just more variety, but more reliable retrieval of the core misconception families a tutor expects to see each day.

## Practice Flow

1. Tutor opens a numbered set.
2. Student completes the printed challenge sheet.
3. Tutor uses the answer sheet to grade each row.
4. App saves a session record, updates adaptive weights, and writes durable error-book entries.
5. Student later reviews the active error book, then mastered items move to the archive.

## Data Model

```js
profile = {
  weights: { [tag]: number },
  lastSeen: { [tag]: setNumber },
  history: [
    {
      set,
      date,
      ts,
      details: [{ tag, grade, info, uid }],
      allGrades: [{ tag, grade }],
      weightAdjustments: [{ tag, delta }]
    }
  ],
  errorBook: {
    [uid]: {
      tag,
      info,
      grade,
      count,
      firstSet,
      firstDate,
      lastSet,
      lastDate,
      mastered,
      masteredDate
    }
  }
}
```

`details` stores non-perfect items for archives and error-book rollback. `allGrades` and `weightAdjustments` make resubmission deterministic without repeatedly inflating weak-topic weights.

## Acceptance Criteria

- Generated question and answer pairs are mathematically consistent.
- Reopening the same set keeps question data stable.
- Regrading the same set replaces the previous session contribution.
- Error-book entries survive history trimming and can be marked mastered.
- Local mode works without a server beyond static file serving.
- Gist sync failure does not block local practice.
