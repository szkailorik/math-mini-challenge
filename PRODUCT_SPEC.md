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
