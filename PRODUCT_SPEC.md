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
