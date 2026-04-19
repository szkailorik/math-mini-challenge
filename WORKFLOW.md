# Workflow

## Multi-AG Process

Each change should pass through these lightweight roles. A single developer may perform multiple roles, but the handoff notes should stay explicit.

## Roles

- 产品经理AG: scope, user stories, acceptance criteria.
- 学习科学AG: retrieval practice, spacing, interleaving, misconceptions.
- 设计AG: sheet flow, grading UX, gamification and error-book behavior.
- 架构AG: static app architecture, local-first data, sync and deploy design.
- 开发AG: implementation and self-confirmation.
- 测试AG: smoke tests, edge cases, accessibility checks.
- 审核AG / 质量审核AG: final feasibility and learning alignment review.

## Required Handoff Fields

- What I changed
- Open questions
- Risks
- Next steps

## Iteration Rule

Every substantial release should include at least three passes:

1. Thin slice: keep the app working end to end.
2. Quality pass: fix correctness, persistence, error handling, and adaptive behavior.
3. Polish pass: improve copy, documentation, deployment, and edge cases.

## Current v23.79 Iteration Notes

### Iteration 1

- What I changed: deepened second-stage `Closure` Section II so it now carries explicit representation-conversion, baseline-comparison, representation-choice, and post-conversion-use lanes, with graduation prompts now forcing “更接近 / 更方便 / 先化成” style bridge judgement instead of stopping at raw conversion.
- Open questions: whether the next pass should now connect Section II and Section III even more tightly with mixed “convert first, then choose a shortcut” prompts, or first observe a few real papers to see whether the new bridge lane is already balanced enough.
- Risks: the bridge lane is now much more intentional, so if later edits bloat it with too many raw conversion-only prompts, it could drift back toward low-value percentage/fraction drills instead of true representation transfer.
- Next steps: review several real `Closure` papers, then decide whether the next implementation pass should deepen Section II further or move to Section IV / Section V calibration.

## Current v23.78 Iteration Notes

### Iteration 1

- What I changed: deepened second-stage `Closure` Section III so it now carries explicit structure-recognition, method-choice, complex-execution, and result-judgement lanes, with method choice prioritized before raw complexity.
- Open questions: whether the next pass should enrich Section II so representation transfer and complex mixed work interlock even more tightly, or first observe a few real papers to see whether Section III is now too heavy in graduation mode.
- Risks: bracket-bearing graduation prompts now exist by design, so if later edits inflate them without preserving method-choice cues, the lane could drift back toward “harder calculations” instead of “higher-value calculations”.
- Next steps: review several real `Closure` papers, then decide whether the next iteration should deepen Section II or further calibrate Section III density.

## Current v23.77 Iteration Notes

### Iteration 1

- What I changed: rebuilt the second-stage `Closure` paper around a clearer five-part matrix: keep-warm, representation core, complex mixed core, unit/rate bridge, and targeted focus.
- Open questions: whether the next pass should further enrich Section III with more mixed decimal-fraction and bracket-heavy pools, or first tune the current balance using real learner sessions.
- Risks: the bridge lane now remains intentionally heavy, so if later edits bloat it further, it could crowd out the complex-mixed lane again.
- Next steps: observe a few real `Closure` sets, then decide whether the next iteration should deepen complex-mixed question pools or refine focus-lane targeting.

### Iteration 1

- What I changed: refined the print-only compact mode for `本套错题变式训练` by removing the subtitle in dense cases, shortening the metadata line, and tightening dense/ultra math rows another step.
- Open questions: whether the next pass should finally style the separate answer sheet to match the same AB-paper language, or pause here because the practice sheet itself is now close to the one-page target.
- Risks: additional compression helps dense sheets fit, but the ultra-dense fraction cases are approaching the readability limit; another full global shrink would likely hurt more than help.
- Next steps: check the heaviest real print previews and decide whether the next iteration should move to the answer sheet instead of squeezing the practice sheet further.

## Current v23.75 Iteration Notes

### Iteration 1

- What I changed: kept the new AB-style printable follow-up sheet, then added a second pass that suppresses more print-only explanation text and switches dense follow-up sets into a tighter layout pack so they are more likely to stay on one page.
- Open questions: whether the next pass should now optimize the separate answer sheet to match the same visual language, or keep pushing one-page packing on the practice sheet itself.
- Risks: compact mode improves one-page odds, but a very large mistake set with several ultra-dense fraction items can still spill beyond a page; that is an intentional tradeoff to avoid unreadable compression.
- Next steps: review real print previews with dense mistake sets and decide whether the next improvement should target answer-sheet styling or one more round of packing heuristics.

## Current v23.74 Iteration Notes

### Iteration 1

- What I changed: reworked the printable `本套错题变式训练` page toward a more formal AB-paper look by removing the heavier summary-card layer, using a lighter title/meta strip, and turning the grouped families into exam-style section headings.
- Open questions: whether the next pass should now tune the answer-reference page to match the same paper language more closely, or keep focusing on the practice sheet only.
- Risks: the leaner print header frees more space for questions, but extremely mistake-heavy sessions can still spill beyond one page if too many dense prompts land in the same follow-up sheet.
- Next steps: review the print preview with real follow-up sets, then decide whether to tune the answer sheet or do one final pass on one-page packing.

## Current v23.73 Iteration Notes

### Iteration 1

- What I changed: added a lightweight density classifier for `本套错题变式跟训` rows so notation-heavy prompts like mixed numbers, multi-fraction expressions, and longer conversion prompts use a steadier layout than simple arithmetic rows.
- Open questions: whether the next pass should explicitly special-case the longest fraction-comparison prompts, or stop here because the current density ladder already absorbs most of the instability.
- Risks: density detection is heuristic and tied to current markup patterns; if prompt rendering changes later, some rows may fall back to normal density until the classifier is updated.
- Next steps: review a few real follow-up pages with multiple fraction-heavy mistakes, then decide whether one final fraction-specific pass is still worth it.

## Current v23.72 Iteration Notes

### Iteration 1

- What I changed: removed the per-row family badge from `本套错题变式跟训` and normalized the row layout into a cleaner number lane plus prompt lane so long prompts, fraction prompts, and conversion prompts feel less crowded.
- Open questions: whether the next pass should now target especially long fraction/mixed-number prompts with an even more explicit dense mode, or stop here and merge this branch.
- Risks: removing the repeated row badge depends on the section headers staying strong and visible; if those headers are weakened later, family context could become less obvious again.
- Next steps: review the live report with a few longer follow-up items and decide whether to do one final fraction-specific pass or prepare the branch for merge.

## Current v23.71 Iteration Notes

### Iteration 1

- What I changed: added a lightweight shape-aware layout pass for the `本套错题变式跟训` block so fraction-heavy and conversion-heavy prompts render with steadier font sizing and spacing in both the report and the printable worksheet.
- Open questions: whether the next pass should now explicitly optimize line-breaking for the longest mixed-number and fraction prompts, or return to expanding family-specific question generation.
- Risks: shape detection improves dense math layouts, but it is still heuristic; if future prompt markup changes significantly, some item shapes may fall back to the standard lane until the detector is updated.
- Next steps: review real follow-up sheets that contain several fraction/conversion mistakes, then decide whether to keep pushing print density or switch back to question-family depth.

## Current v23.70 Iteration Notes

### Iteration 1

- What I changed: kept the stronger family-aware variant generation from `v23.69`, then redesigned the in-report `本套错题变式跟训` block so it reads more like a compact follow-up worksheet with a clear overview, compact metrics, grouped practice sections, and a cleaner teacher-facing answer reference.
- Open questions: whether the next pass should now focus on even tighter print density and line-breaking for especially fraction-heavy follow-up sets, or return to adding more family-specific generators.
- Risks: the sheet is more readable and printable, but very long wrong-set histories in a single session could still produce denser print pages than ideal if too many families fire at once.
- Next steps: review the live report and print output with real student mistakes, then decide whether the next pass should prioritize print density or another round of question-family depth.

## Current v23.69 Iteration Notes

### Iteration 1

- What I changed: deepened the pedagogical quality of the new `本套错题变式跟训` block by routing more follow-up families through existing high-value variant builders and closure boundary-reinforcement builders, especially for fractions, conversions, unit/rate work, and `c2_*` tags.
- Open questions: whether the next pass should now focus on visible report polish and print aesthetics, or keep expanding family-specific builders where fallbacks still feel too generic.
- Risks: stronger routing improves relevance, but the feature still depends on family coverage; if a family lacks enough dedicated builders, some tags may still feel more generic than ideal.
- Next steps: review the live follow-up sheets with real wrong-set data, then decide whether to prioritize visual polish or another wave of family-specific question builders.

## Current v23.68 Iteration Notes

### Iteration 1

- What I changed: refined the new `本套错题变式跟训` block so items are grouped by mistake family and shown in a clearer training order, with concept-error families leading and lighter careless-review groups following; the same grouped structure now also carries into the print shell.
- Open questions: whether the next pass should deepen family-specific variant pools further, or shift to purely visual polish inside the report and print layout.
- Risks: the grouping logic improves readability, but if a family still falls back to generic variants too often, the experience may feel structurally strong but pedagogically uneven.
- Next steps: review the live grouped follow-up block with real graded sets, then decide whether the next iteration should focus on richer variant builders or tighter report/print aesthetics.

## Current v23.67 Iteration Notes

### Iteration 1

- What I changed: extended `本套报告 / Set Review` with a per-student same-skill variant follow-up block that reuses the current set’s graded mistakes, groups them by mistake family, generates a compact 4-8 item reinforcement sheet, and supports printing either the follow-up page alone or the follow-up page plus answers.
- Open questions: whether the first-pass variant pools already feel strong enough for every common family, or whether the next pass should deepen family-specific builders for fractions, conversions, and unit/rate tags.
- Risks: if a tag falls back too often to generic follow-up language, the new block may feel weaker than intended; family coverage should keep expanding where real set data shows repetition.
- Next steps: review the live `本套报告` flow with real graded sets, then decide whether the next pass should focus on follow-up question quality, report layout polish, or print presentation.

## Current v23.66 Iteration Notes

### Iteration 1

- What I changed: shifted the quick-review work from content to print presentation by tightening and unifying the printed hero, focus cards, navigation chips, topic cards, flow steps, and support/example blocks so the page reads more like a prepared review handout on paper.
- Open questions: whether the next pass should keep refining printed density, or move back to topic-level copy polish on screen.
- Risks: denser print styling improves handout quality, but if pushed too far it could reduce margin for annotation and visual breathing room.
- Next steps: review the actual print preview, then decide whether to stop at this level of polish or keep tuning paper density and hierarchy.

## Current v23.65 Iteration Notes

### Iteration 1

- What I changed: rewrote the child-facing `Calculation Quick Review` topic copy into shorter, more spoken reminder language so hooks, first moves, checks, rules, and pitfalls behave more like quick recall prompts than mini-explanations.
- Open questions: whether the next pass should continue refining wording topic-by-topic, or pause content edits and refocus on print density and final visual polish.
- Risks: shorter copy improves speed, but the wording must still stay precise enough that important distinctions like decimal-point handling or fraction inversion are not blurred.
- Next steps: review the live page with real child-use expectations, then decide whether to do one more content pass or switch back to print-first polish.

## Current v23.64 Iteration Notes

### Iteration 1

- What I changed: tightened the child-facing `Calculation Quick Review` topic cards so each section now reads more like a compact review card with hook and recall route first, then the three-step process line, then lighter support and example content.
- Open questions: whether the next pass should now focus on simplifying the wording inside specific topics, or on tightening the printed topic-card rhythm even further.
- Risks: compressing topic cards improves scan speed, but the support area must still stay readable enough that the page does not become too terse for younger learners.
- Next steps: review the live page and print preview with real child-use expectations, then choose between copy simplification and print-density polish.

## Current v23.63 Iteration Notes

### Iteration 1

- What I changed: reduced the visual weight of the child-facing `Calculation Quick Review` header by turning it into a lighter two-column cover and tightening the focus cards so learners reach the real topic blocks faster.
- Open questions: whether the next quick-review pass should now focus on topic-level copy quality, or on further print-first tightening of the topic cards.
- Risks: making the top lighter improves scan speed, but the focus cards must still remain clear enough that children know what to review first.
- Next steps: review the live page with child-like scan behavior, then decide whether to sharpen topic wording or keep polishing print rhythm.

## Current v23.62 Iteration Notes

### Iteration 1

- What I changed: reduced the visual weight of the floating tutor shell again by hiding the workbench kicker, shrinking chips and insight pills, and turning the stage-status block into a lighter status layer instead of a second heavy card.
- Open questions: whether the next shell pass should stop here or merge one more layer of controls into a tighter top utility band.
- Risks: making the shell too airy can improve fit, but if the state layer gets too subtle it may become easier to miss at a glance.
- Next steps: review the live shell for scanability, then decide whether one more structural merge is worth it.

## Current v23.61 Iteration Notes

### Iteration 1

- What I changed: removed the now-redundant current-program title row from the floating tutor shell, then tightened menu width, spacing, chip density, and button rhythm so the same controls occupy less vertical space.
- Open questions: whether the next shell pass should stop here or continue by shortening a few bilingual button labels even more.
- Risks: compacting the shell further improves fit, but if labels are shortened too far it could become less instantly scannable for the tutor.
- Next steps: review the live menu on real short-height windows, then decide whether the shell has reached the right balance or needs one final copy pass.

## Current v23.60 Iteration Notes

### Iteration 1

- What I changed: further compressed the floating teacher-workbench menu by turning the lower single-column action stack into a denser two-column grid and tightening the cloud-status area, so the same actions are easier to reach within one viewport.
- Open questions: whether the next shell pass should also shorten a few button labels further, or whether the current balance between density and recognizability is already right.
- Risks: packing actions more tightly helps height, but if labels are compressed too aggressively the tutor shell could become harder to scan.
- Next steps: review the live menu at typical laptop and short-window heights, then decide whether to stop here or do one final label-polish pass.

## Current v23.59 Iteration Notes

### Iteration 1

- What I changed: compressed the floating teacher-workbench menu by removing long first-stage and second-stage explanatory copy, tightening card and button spacing, and adding short-viewport internal scrolling so lower actions remain reachable.
- Open questions: whether the next shell pass should also further compress the release note and archive-entry area, or whether menu density is now in the right place.
- Risks: over-compressing the tutor shell could make state harder to scan, so the menu should keep its phase chip, title, and insight pills even while long prose stays out.
- Next steps: review the live menu on a shorter viewport, then decide whether to keep polishing shell density or return to content and worksheet quality work.

## Current v23.58 Iteration Notes

### Iteration 1

- What I changed: kept the new study-flow structure, then further reduced visual noise by turning the recommendation pills into one calmer priority sentence and making the three-step working flow read more explicitly as an ordered sequence.
- Open questions: whether the next pass should focus on tighter wording inside each topic, or on further print and density polish now that the structure is much calmer.
- Risks: the page is now quieter and easier to scan, but future additions must stay disciplined or the recommendation area could become noisy again.
- Next steps: review the live page with real child use, then either sharpen topic copy or continue print-first refinement.

## Current v23.57 Iteration Notes

### Iteration 1

- What I changed: kept the new “总纲句 + 做题主线 + 轻量补充” topic structure, then tightened the page’s visual hierarchy so the quick-review experience feels calmer, more guided, and more like a printable study leaflet instead of a stack of equally loud colorful modules.
- Open questions: whether the next pass should now focus mainly on wording quality inside each topic, or keep tuning density and print balance.
- Risks: the structure is now much cleaner, but future content additions must stay disciplined or the page could drift back toward visual noise.
- Next steps: review the live page with real child use, then either sharpen copy quality or continue print-first polish.

## Current v23.56 Iteration Notes

### Iteration 1

- What I changed: reorganized the child-facing `Calculation Quick Review` page so each topic now reads as one total-principle sentence, one three-step working flow, and one lighter support area instead of many equally loud stacked reminder blocks.
- Open questions: whether the next pass should refine the wording of the flow steps and principle lines, or focus mainly on further density and print-layout polish.
- Risks: the new structure is much cleaner, but if later edits reintroduce too many equal-priority blocks the page could drift back toward a noisy card collection.
- Next steps: review the live page with real child use, then either sharpen copy quality or keep polishing print-first visual rhythm and spacing.

## Current v23.55 Iteration Notes

### Iteration 1

- What I changed: upgraded the child-facing `Calculation Quick Review` page so every topic now also shows a `最后检查` self-check cue, making the page better at supporting the end of a calculation routine instead of only the start.
- Open questions: whether the next pass should refine the wording of these self-check lines, or pause content-layer changes and focus again on print density and typography.
- Risks: this new self-check layer helps only if it remains short and concrete; if later edits make it broad or vague, it will stop functioning as a quick end-of-problem scan.
- Next steps: review the live page with real child use, then either sharpen the self-check wording or continue refining print-first rhythm and density.

## Current v23.54 Iteration Notes

### Iteration 1

- What I changed: upgraded the child-facing `Calculation Quick Review` page so every topic now also shows a `先做这一步` action cue, making the page better at telling the learner how to start, not only what to remember or avoid.
- Open questions: whether the next pass should refine the actual wording of these action cues, or pause content-layer work and further tighten print density and typography.
- Risks: this new action layer only helps if it stays short and concrete; if later edits make it abstract, it will stop functioning as a true first-move hint.
- Next steps: review the live page with real child use, then either sharpen the action-cue wording or continue refining print-first balance and visual rhythm.

## Current v23.53 Iteration Notes

### Iteration 1

- What I changed: upgraded the child-facing `Calculation Quick Review` page so every topic now also surfaces a `最容易错` warning line, making the page more useful as a rapid pre-practice and post-practice anti-slip review aid.
- Open questions: whether the next pass should tighten the wording of these warning lines, or shift back to print density and topic-copy refinement.
- Risks: this new warning layer is useful only if it stays short and specific; if later edits make it verbose, it will stop functioning as a true fast-scan reminder.
- Next steps: review the live page with real child use, then either sharpen the warning phrasing or continue refining typography and print-first balance.

## Current v23.52 Iteration Notes

### Iteration 1

- What I changed: upgraded the child-facing `Calculation Quick Review` page so every topic now starts with a `先记住` memory hook, making the page easier to scan as a rapid recall tool instead of only a structured reference sheet.
- Open questions: whether the next pass should focus on tightening the actual wording quality of these memory hooks, or on polishing print density and typography even further.
- Risks: the new hook layer improves fast recall, but if later edits let these lines become too long or too explanatory they will stop acting like true memory triggers.
- Next steps: review the live page with real child use, then either sharpen the wording of the hook lines or continue refining print-first visual balance.

## Current v23.51 Iteration Notes

### Iteration 1

- What I changed: upgraded the child-facing `Calculation Quick Review` page with a stronger `今日先看` focus strip, promoted the top two recommended topics into larger spotlight cards, and turned the overview navigation into direct jump shortcuts while keeping the printed handout compact.
- Open questions: whether the next pass should tighten the wording quality inside each topic block again, or keep refining the visual density so the whole page feels even more like a polished study leaflet.
- Risks: the page is now more decisive and easier to scan, but future additions must stay disciplined so the focus strip remains a prioritization aid rather than turning into a second dashboard.
- Next steps: review the live page with real child use, then either sharpen topic copy or continue refining print-first layout balance and typography.

## Current v23.50 Iteration Notes

### Iteration 1

- What I changed: refined the new child-facing `Calculation Quick Review` page so it now includes explicit usage guidance, numbered scan navigation, stage notes, and per-topic recall-order copy instead of only a list of review blocks.
- Open questions: whether the next pass should focus more on tightening the actual wording inside each topic, or on further compressing the print layout into an even cleaner one-page-first output.
- Risks: the page is now more guided and more teachable, but future additions must stay disciplined so it does not drift into a dense instruction panel or lose its “quick scan” character.
- Next steps: review the live page with real child use, then either refine topic wording and example quality or keep polishing density and print balance.

## Previous v23.49 Iteration Notes

### Iteration 1

- What I changed: added a new child-facing `Calculation Quick Review` page that reuses the existing modal shell and print sandbox, organizes eight high-value calculation review topics into an overview-plus-topics layout, and keeps the page print-friendly while adding only light stage-aware recommendation hints.
- Open questions: whether the next pass should deepen the content quality of each topic block first, or refine the page’s visual density and printing balance after real-world teacher use.
- Risks: the v1 page intentionally keeps content stable and restrained, so if later iterations add too much personalized detail it could drift away from its core “knowledge reactivation” role and become a noisy mini-dashboard.
- Next steps: review the live page with real student use, then either polish topic copy and examples or continue refining the page’s density, typography, and print layout.

## Previous v23.48 Iteration Notes

### Iteration 1

- What I changed: extended dedicated `Closure` boundary replay into `stabilityGap`, so second-stage `L3` reinforcement can now test quotient size and decimal-point judgment with custom boundary-style stability items instead of only ordinary maintenance variants.
- Open questions: whether the next pass should stop deepening boundary families and instead surface `closureFocusMode` inside the teacher-facing report.
- Risks: custom `L3` depth is now strong across the four most valuable closure families, so the next improvements may be more about visibility and orchestration than adding still more replay branches.
- Next steps: either expose replay depth in reports or start refining answer/report language so teachers can see exactly what kind of reinforcement was used.

## Previous v23.47 Iteration Notes

### Iteration 1

- What I changed: extended dedicated `Closure` boundary replay into `speedGap`, so second-stage `L3` reinforcement can now test structure recognition and fast-method choice with custom boundary-style speed items instead of only ordinary variants.
- Open questions: whether the next pass should deepen `stabilityGap` with its own custom boundary items, or shift from deeper replay to stronger reporting and teacher visibility.
- Risks: custom `L3` depth is now strong in `methodGap`, `validationGap`, and `speedGap`, but still thinner in the remaining closure families.
- Next steps: either widen boundary replay to `stabilityGap` or surface `closureFocusMode` and replay depth in reports so the teacher can see how the system is reinforcing.

## Previous v23.46 Iteration Notes

### Iteration 1

- What I changed: extended dedicated `Closure` boundary replay from `methodGap` into `validationGap`, so second-stage `L3` reinforcement can now test result plausibility with custom boundary-style estimate checks instead of only ordinary variants.
- Open questions: whether the next pass should deepen `speedGap` with its own custom boundary items, or pause boundary work and strengthen reporting/teacher visibility.
- Risks: custom `L3` depth is now clearly stronger in `methodGap` and `validationGap` than in the remaining closure families.
- Next steps: either widen boundary replay to `speedGap` or surface current `closureFocusMode` in reports so teachers can see how deep the reinforcement is.

## Previous v23.45 Iteration Notes

### Iteration 1

- What I changed: upgraded `Closure` method-gap `L3` replay from a plain higher-level variant into dedicated boundary-style reinforcement items, and tightened runtime validation so the second-stage focus lane now has to prove it used the boundary path.
- Open questions: whether the next boundary pass should prioritize `unit_rate_speed` families or start exposing these stronger focus modes more explicitly in reports.
- Risks: the strongest custom `L3` depth is still concentrated in a few second-stage families, so some focus lanes remain more generic than others.
- Next steps: widen dedicated closure boundary items to more method and validation families, then consider surfacing focus mode in reports for teachers.

## Previous v23.44 Iteration Notes

### Iteration 1

- What I changed: widened shared quality-family coverage so KAI fraction-calculation tags and closure equation tags now participate in the same replay and explanation core instead of sitting outside it.
- Open questions: whether the next widening pass should target more closure method/unit families, or shift to making the stronger replay families more visible in reports.
- Risks: the semantic layer now covers more tags, but family-specific custom variants are still deeper for some families than others.
- Next steps: keep widening deterministic family coverage and then sharpen family-specific replay/answer wording where the shared templates are still generic.

## Previous v23.43 Iteration Notes

### Iteration 1

- What I changed: extended the shared training-quality core into answer explanations by adding `explanationMode` plus structured `规则提醒 / 方法提醒 / 检验提醒` wrapping for the first rollout families.
- Open questions: whether the next pass should expose explanation mode more visibly in the answer-row UI, or keep it as wording-only for now.
- Risks: some long legacy step text is now more structured but still not fully rewritten family-by-family, so the biggest quality gains are currently concentrated in the rollout families.
- Next steps: keep widening the rollout to more families and tighten answer-sheet wording where existing steps are still too long.

## Previous v23.42 Iteration Notes

### Iteration 1

- What I changed: upgraded the `Closure` focus lane from a simple replay-or-variant fallback into an explicit `L1 / L2 / L3` selector, and tightened runtime validation so second-stage reinforcement now has to expose `isClosureFocusReplay`, `qualityFamily`, and the expected replay level.
- Open questions: whether the next step should broaden `L3` boundary-style variants beyond the current bridge-focused rollout families.
- Risks: second-stage quality is now more explicit in metadata than in visible UI, so the strongest payoff will come when more focus families get custom L3 variants.
- Next steps: continue Task 4 by widening custom `Closure` focus variants to more second-stage families, then upgrade shared answer explanations.

## Previous v23.41 Iteration Notes

### Iteration 1

- What I changed: accepted the new hard constraint that the whole worksheet must stay within two pages, so “single-column fraction protection” was no longer enough.
- Open questions: none.
- Risks: denser multi-column recovery only works if item heights are also brought back down.
- Next steps: remove oversized fraction-cell assumptions instead of only changing column count.

### Iteration 2

- What I changed: switched from a section-specific single-column strategy to a global “single-question single-line” rule with adaptive 2-column/3-column grids.
- Open questions: none.
- Risks: some exceptionally long prompts may still need section-level density tuning later.
- Next steps: keep watching the longest mixed and conversion prompts after the fraction section stabilizes.

### Iteration 3

- What I changed: mirrored the same compacting logic into the print sandbox so paper output follows the same two-page, no-midline-break rule.
- Open questions: none.
- Risks: print density now depends more on font sizing and less on vertical whitespace.
- Next steps: if a specific item still feels too tight, solve it by density class or section column choice, not by allowing line breaks.

## Current v23.40 Iteration Notes

### Iteration 1

- What I changed: accepted that even the wider fraction layout was still compromising item integrity, so the next step was to stop sharing a row between fraction problems at all.
- Open questions: none.
- Risks: the section now grows taller, which may affect overall page balance.
- Next steps: monitor whether the cleaner one-line fraction items are worth the extra vertical space in actual printouts.

### Iteration 2

- What I changed: switched fraction-heavy sections from the widened multi-column layout to a single-column layout with tighter vertical rhythm.
- Open questions: none.
- Risks: if page count becomes the new issue, it will need to be solved at section allocation level rather than by rebreaking fraction items.
- Next steps: keep the “one problem, one line” rule as the priority for this section.

### Iteration 3

- What I changed: mirrored the same logic into the print path so the fraction section does not revert to denser row sharing on paper.
- Open questions: none.
- Risks: taller sections can push other content farther down the sheet.
- Next steps: keep checking page composition as fraction content evolves.

## Previous v23.39 Iteration Notes

### Iteration 1

- What I changed: took the user's constraint literally for the fraction area: one problem should stay on one line even if the whole section needs more rows.
- Open questions: none.
- Risks: reducing columns increases total section height, so page balance must be watched.
- Next steps: prefer a taller but cleaner fraction section over dense multi-line fraction items.

### Iteration 2

- What I changed: moved fraction sections to a wider per-item layout and tightened both row and column spacing inside that section specifically.
- Open questions: none.
- Risks: if future fraction generators become much longer, even two columns may not be enough.
- Next steps: keep fraction layout rules section-specific instead of forcing the same density rules on every math block.

### Iteration 3

- What I changed: mirrored the fraction-section tightening into the print path so “single-line first” behavior is preserved on paper too.
- Open questions: none.
- Risks: print pagination should still be spot-checked because taller fraction sections can shift later content.
- Next steps: keep watching paper balance after any further fraction-generator changes.

## Previous v23.38 Iteration Notes

### Iteration 1

- What I changed: continued tightening the inline worksheet layout after removing the answer underlines, focusing on the remaining visual looseness around fractions, parentheses, and write-gaps.
- Open questions: none.
- Risks: over-tightening can hurt legibility if the paper starts feeling cramped.
- Next steps: keep spacing changes concentrated in fraction-heavy areas rather than globally shrinking the whole worksheet.

### Iteration 2

- What I changed: restored a more neutral operator treatment by changing the equals sign back to the same ink color as the rest of the math text.
- Open questions: none.
- Risks: if other operators remain visually over-emphasized, the page can still feel stylistically uneven.
- Next steps: keep symbols visually subordinate to the mathematical structure they connect.

### Iteration 3

- What I changed: preserved the no-underline answer mode while tightening inline spacing, so the paper becomes cleaner without reintroducing line geometry.
- Open questions: none.
- Risks: future symbol-polish passes should check that they do not accidentally drift back toward decorative contrast.
- Next steps: continue preferring restraint over ornament in worksheet typography.

## Previous v23.37 Iteration Notes

### Iteration 1

- What I changed: accepted the new requirement that answer underlines after `=` should disappear entirely instead of being merely shortened.
- Open questions: none.
- Risks: removing the line changes the visual affordance of where to write, so the remaining gap must still feel intentional.
- Next steps: keep the no-line approach simple and avoid replacing it with another decorative marker.

### Iteration 2

- What I changed: replaced the underlined answer segment after `=` with a borderless write-gap while keeping the rest of the inline question flow intact.
- Open questions: none.
- Risks: if the gap is too small, some items may look visually abrupt; if too large, the spacing problem returns.
- Next steps: tune only the gap width if needed, not by reintroducing line art.

### Iteration 3

- What I changed: mirrored the borderless write-gap behavior into the print path and updated runtime checks so they expect a write-gap instead of an answer underline.
- Open questions: none.
- Risks: future refactors could accidentally restore underlined blanks unless validation continues to guard the new rule.
- Next steps: keep answer-underlines and answer-gaps as mutually exclusive modes.

## Previous v23.36 Iteration Notes

### Iteration 1

- What I changed: isolated the remaining worksheet complaint to answer-line proportion rather than expression layout or symbol rules.
- Open questions: none.
- Risks: if the line becomes too short, some items could feel cramped instead of tidy.
- Next steps: keep answer-line tuning incremental and paper-focused.

### Iteration 2

- What I changed: reduced the default inline answer-line width for the active worksheet renderer.
- Open questions: none.
- Risks: different sections share the same answer-line primitive, so changes must still feel acceptable across conversion, computation, and equation items.
- Next steps: keep checking real printed papers rather than only DOM structure.

### Iteration 3

- What I changed: mirrored the shorter width into print-specific rules so paper output stays aligned with on-screen tuning.
- Open questions: none.
- Risks: future print-density changes could accidentally stretch or compress the answer line again.
- Next steps: treat screen and print answer-line widths as one linked setting.

## Previous v23.35 Iteration Notes

### Iteration 1

- What I changed: stopped treating the notation issue as another local bug and instead compared the current worksheet against the older printed look the user preferred.
- Open questions: none.
- Risks: keeping newer layout abstractions while trying to mimic the old paper by styling alone would keep causing conflicts.
- Next steps: favor structural rollback to older worksheet behavior over more micro-fixes.

### Iteration 2

- What I changed: removed the newer split answer-tail model from the active paper path and restored a single inline flow for expression, equals sign, blank line, and any suffix text.
- Open questions: none.
- Risks: some especially long prompts may still need generator-level shortening rather than layout changes.
- Next steps: if more paper issues remain, inspect concrete generated prompt families instead of adding another generic wrapper layer.

### Iteration 3

- What I changed: updated validation to confirm that legacy `= blank` prompts normalize into the restored inline rendering path rather than the newer detached tail component.
- Open questions: none.
- Risks: the paper can still regress if future edits mix both rendering styles again.
- Next steps: keep one worksheet notation path active at a time.

## Previous v23.34 Iteration Notes

### Iteration 1

- What I changed: shifted the investigation from “missing equals signs” to “conflicting equals-sign systems”, because some prompts still carried their own in-body `= blank` structure while others used the shared tail renderer.
- Open questions: none.
- Risks: if future generators mix inline blanks and shared tails ad hoc again, visual consistency will drift quickly.
- Next steps: keep one canonical answer-tail structure and route legacy prompt shapes through it.

### Iteration 2

- What I changed: normalized `= <blank>` prompt shapes into the shared answer-tail component, including suffixes like `%`, so those items no longer keep a separate blank line inside the question body.
- Open questions: none.
- Risks: prompts with more unusual suffix text may still need spot-checking to make sure the suffix belongs after the blank, not before it.
- Next steps: continue treating unit and percentage suffixes as part of the tail component rather than bespoke inline markup.

### Iteration 3

- What I changed: added runtime checks for this normalization path so future changes cannot quietly reintroduce old in-body blank patterns for equality prompts.
- Open questions: none.
- Risks: runtime validation confirms structure, but paper appearance should still be human-checked for the strangest legacy prompt families.
- Next steps: keep sampling real generated prompts when users report notation drift instead of relying only on abstract helper tests.

## Previous v23.33 Iteration Notes

### Iteration 1

- What I changed: treated the remaining complaint as a density problem instead of only a logic problem, because the missing-equals behavior could now also come from the answer tail being pushed out of sight in narrow three-column math items.
- Open questions: none.
- Risks: overly dense math can become hard to read if pushed too far.
- Next steps: keep density changes targeted to the heaviest fraction sections instead of shrinking the whole worksheet.

### Iteration 2

- What I changed: tightened the exam-inline layout for fraction-heavy and mixed-operation items by shrinking the expression row, the answer slot, fraction blocks, and parentheses together.
- Open questions: none.
- Risks: extreme edge-case expressions may still need generator-side simplification if they exceed the visual budget of a three-column paper.
- Next steps: continue checking the longest fraction patterns first whenever worksheet complaints mention “still not on one line”.

### Iteration 3

- What I changed: mirrored the same compaction strategy into the print sandbox so the on-screen improvement does not disappear during printing.
- Open questions: none.
- Risks: print-specific density rules are now more specialized, so future booklet tweaks should re-check these sections explicitly.
- Next steps: keep fraction-heavy print layout as a release-sensitive area.

## Previous v23.32 Iteration Notes

### Iteration 1

- What I changed: re-investigated the remaining missing-equals failures from real prompt output instead of assuming the previous structural fix had solved them.
- Open questions: none.
- Risks: math layout bugs can hide in semantic checks, not only in CSS, so visual polish alone is not enough.
- Next steps: keep sampling rendered prompts when a paper bug appears, not only scanning source generators.

### Iteration 2

- What I changed: found that visible-equals detection was reading raw HTML and mistaking attributes such as `class="frac"` for an existing equals sign, which suppressed the shared answer tail on many fraction items.
- Open questions: none.
- Risks: any future semantic check that reads raw markup instead of visible math text can create similarly subtle rendering regressions.
- Next steps: strip markup before semantic math checks and keep regression cases in runtime validation.

### Iteration 3

- What I changed: added an exam-inline row treatment for fraction-heavy prompts so fractions, parentheses, equals, and answer lines stay closer to a real worksheet line instead of drifting like wrapped webpage fragments.
- Open questions: none.
- Risks: very long future prompt families may still need item-specific density tuning if they exceed the available column width.
- Next steps: keep fraction-heavy prompts on the stricter exam-row path and check them in print preview whenever new fraction generators are added.

## Previous v23.31 Iteration Notes

### Iteration 1

- What I changed: traced the remaining math-layout failures to question HTML that still embedded block-like fraction and blank nodes, plus a suffix rule that guessed answer equals signs from raw strings.
- Open questions: none.
- Risks: if future generators reintroduce block-level fragments into inline math, similar drift could return even if the CSS stays polished.
- Next steps: keep normalizing question fragments before styling them, rather than trying to patch visual glitches after rendering.

### Iteration 2

- What I changed: added a normalized question-prompt renderer that converts legacy fraction and blank markup into inline-safe spans, removes raw trailing equals from the body, and rebuilds them through one shared answer-tail component.
- Open questions: none.
- Risks: any generator that truly needs a nonstandard tail format should opt in explicitly, because the default path is now intentionally stricter.
- Next steps: keep new math item formats flowing through the shared prompt normalizer instead of bypassing it ad hoc.

### Iteration 3

- What I changed: retuned fraction size, bracket grouping, answer-slot sizing, and print compaction together so the same structural fix improves both screen papers and printed sheets.
- Open questions: none.
- Risks: fraction-heavy edge cases still deserve human print preview when new item families are added.
- Next steps: treat fraction groups and answer tails as release-sensitive print primitives and include them in future layout spot checks.

## Previous v23.30 Iteration Notes

### Iteration 1

- What I changed: traced the "显示不全 / 排列 / 序号错位" regression back to fixed-height question blocks that no longer fit once booklet chrome grew taller.
- Open questions: none.
- Risks: allowing screen blocks to grow can hide print-density problems unless print gets its own compact rules.
- Next steps: keep screen completeness and print compactness as separate concerns instead of forcing one rule to satisfy both.

### Iteration 2

- What I changed: switched question blocks to screen-first `min-height` behavior and split the sequence number into its own dedicated column so long items can wrap without dragging numbering out of alignment.
- Open questions: none.
- Risks: any future item-style embellishment can still destabilize the line rhythm if it is added inside the question body.
- Next steps: continue keeping question numbers structurally separate from wrapped text.

### Iteration 3

- What I changed: added print-only compression rules inside the sandbox so the repaired on-screen layout does not spill into bloated printed pages.
- Open questions: none.
- Risks: print compaction now carries more responsibility, so every future layout pass should include print preview verification.
- Next steps: keep print adjustments scoped to `#print-root` and avoid mixing them back into the screen stylesheet.

## Previous v23.29 Iteration Notes

### Iteration 1

- What I changed: kept the `v23.28` question-paper booklet structure and extended the same language into the answer pages instead of treating them as a separate utilitarian surface.
- Open questions: none.
- Risks: answer sheets already carry more content density than question papers, so any added chrome must stay compact.
- Next steps: if future answer-sheet polish continues, prioritize teacher speed and scanability over decoration.

### Iteration 2

- What I changed: added a shared footer system and aligned meta bands so question sheets and answer keys now sort and read like one coherent printed packet.
- Open questions: none.
- Risks: extra footer and header metadata reduce vertical space slightly, so verification and print preview remain necessary.
- Next steps: keep any future page identity elements one-line and low-height.

### Iteration 3

- What I changed: strengthened answer-section headings so the solutions booklet has clearer internal navigation while still preserving the underlying grading workflow.
- Open questions: none.
- Risks: stronger answer headings must not overwhelm the actual worked solutions or grading controls.
- Next steps: continue polishing only where it helps adults review faster and more accurately.

## Previous v23.28 Iteration Notes

### Iteration 1

- What I changed: kept the `v23.27` teacher workbench intact and continued only on the student paper surface, adding clearer section markers so each large question reads more like a formal booklet section.
- Open questions: none.
- Risks: stronger section identity must not become decorative clutter; it should help orientation without stealing attention from the math itself.
- Next steps: keep future booklet polish subordinate to readability and print density.

### Iteration 2

- What I changed: added a compact page meta band to each question sheet, making the printed stack easier for adults to sort by program, paper position, and current training emphasis.
- Open questions: none.
- Risks: any extra line added near the top of the sheet reduces vertical budget, so print preview remains part of release confirmation.
- Next steps: if further metadata is ever added, prefer tightening copy rather than adding more rows.

### Iteration 3

- What I changed: tuned grid spacing and line rhythm again so the assessment-booklet look feels more deliberate without changing the underlying training structure or print sandbox behavior.
- Open questions: none.
- Risks: even subtle rhythm changes can reveal hidden density problems on edge-case pages, so runtime validation still needs to be paired with human print review.
- Next steps: continue polishing the paper in ways that improve reading speed and print quality, not in ways that add ornament.

## Previous v23.27 Iteration Notes

### Iteration 1

- What I changed: removed the stage-promotion gate from the active path and replaced it with direct manual switching between `Advanced` and `Closure`, while preserving program-specific set counters and first-entry bootstrap into phase two.
- Open questions: none.
- Risks: because switching is now fully teacher-controlled, the control panel must stay extremely clear about which stage is active and what each stage is for.
- Next steps: keep the top shell focused on adult decision-making and avoid drifting back toward automatic gating language.

### Iteration 2

- What I changed: redesigned the no-print top area into a teacher workbench with explicit stage buttons, clearer status copy, and compact insights that explain current set position and phase-two focus without touching print layout.
- Open questions: none.
- Risks: visual polish in the workbench must stay separated from the printable question sheets; otherwise dashboard styling could leak into paper mode.
- Next steps: keep future control features inside the no-print shell and treat the student paper as a separate design surface.

### Iteration 3

- What I changed: pushed the printable sheets further toward an exam-paper feel, with a calmer header, more restrained section treatment, and a Singapore-math-inspired booklet tone while keeping math symbol polish and print safety intact.
- Open questions: none.
- Risks: "more like an exam paper" is partly visual judgment, so human print preview remains the final quality gate even when runtime validation passes.
- Next steps: continue improving sheet typography and training quality together, but never at the cost of pagination stability.

## Previous v23.26 Iteration Notes

### Iteration 1

- What I changed: upgraded the second-stage learner-specific reinforcement lane so section V now tries to inject one exact replay or same-skill variant from the chosen closure gap family.
- Open questions: none.
- Risks: replay logic must stay bounded to one visible slot; otherwise the closure paper could drift from "guided closure" into a patchwork review sheet.
- Next steps: keep the replay lane focused and expand variants only where exact replay would otherwise be too repetitive.

### Iteration 2

- What I changed: added closure-specific fallback variants for bridge, unit, rate, speed, and validation tags, so replay can still happen even when the original question would duplicate the current paper.
- Open questions: none.
- Risks: variant quality now matters more because it is part of the remediation contract, not just a backup path.
- Next steps: continue improving the most frequently triggered closure variants based on real review sessions.

### Iteration 3

- What I changed: upgraded runtime validation so a seeded `representationGap` must produce both the adaptive focus title and an actual replay/variant item inside the next closure focus lane.
- Open questions: none.
- Risks: validator confirms the loop exists, but human review is still the final check for whether the replay item feels worth printing.
- Next steps: continue into adaptive difficulty inside the chosen focus lane, not only adaptive topic selection.

## Previous v23.25 Iteration Notes
### Iteration 1

- What I changed: kept the second-stage six-section paper shape stable, but turned section V into a learner-specific `重点强化区` driven by the strongest current closure gap.
- Open questions: none.
- Risks: the adaptive lane is now part of the product contract, so future closure edits must preserve both print stability and clear reinforcement identity.
- Next steps: keep tuning the focus pools so each gap lane stays obviously different in live use.

### Iteration 2

- What I changed: made the adaptive focus decision use four signals together: stored closure gap fields, active closure error-book entries, recent closure mistakes, and the current phase bias.
- Open questions: none.
- Risks: if the weighting is too weak, the lane will feel cosmetic; if too strong, it may overreact to one noisy set.
- Next steps: observe whether the current weighting needs tightening after real tutoring sessions.

### Iteration 3

- What I changed: added runtime validation that creates a clear second-stage `representationGap`, then confirms the next closure set really changes section V into `重点强化：跨表示桥接`.
- Open questions: none.
- Risks: validator proves the lane can switch, but human review is still needed to judge whether the new focus pool feels high-value enough.
- Next steps: continue from adaptive section selection into stronger adaptive difficulty and error-book variant replay inside the chosen lane.

## Previous v23.24 Iteration Notes
### Iteration 1

- What I changed: turned `Closure` from a single blended paper into a phase-aware program with `收口期 / 收束期 / 毕业判定期`, so the second stage now changes emphasis across the monthly arc instead of repeating the same balance forever.
- Open questions: none.
- Risks: phase progression is now part of the release contract, so future closure-item edits need to preserve both phase differentiation and cross-student non-duplication.
- Next steps: keep tuning which misconceptions belong in each phase based on live use, not only on perceived difficulty.

### Iteration 2

- What I changed: aligned the closure stage card, intro copy, and answer-sheet labeling with the active phase cue, so the UI now explains what the current closure set is training.
- Open questions: none.
- Risks: wording must stay faithful to the actual generated paper emphasis; otherwise phase labels become cosmetic.
- Next steps: if real use shows one phase still feels too generic, tighten that phase's section pools before adding more UI.

### Iteration 3

- What I changed: upgraded runtime validation to assert closure phase identity on representative sets, preventing regression back to one-size-fits-all second-stage papers.
- Open questions: none.
- Risks: validator can prove phase identity and structural coverage, but human print review is still needed to judge paper feel.
- Next steps: continue deepening closure adaptive behaviour so the three-phase arc also responds more strongly to second-stage gap signals.

## Previous v23.23 Iteration Notes
### Iteration 1

- What I changed: completed M4 by adding a formal promotion gate from `Advanced` into `Closure`, rather than treating stage two as a plain manual toggle.
- Open questions: none.
- Risks: promotion wording now affects real user decisions, so the stage card and gate copy should stay aligned with actual readiness behavior.
- Next steps: if real use shows the gate is too strict or too loose, tune thresholds rather than removing the gate structure.

### Iteration 2

- What I changed: added the `继续巩固 7 套` branch and isolated set counters per program, so switching stages no longer overwrites the other stage's position.
- Open questions: none.
- Risks: any future import/sync changes now need to respect per-program counters and promotion state, not only the legacy single-set pointer.
- Next steps: keep stage-state persistence in mind whenever backup or sync behavior changes.

### Iteration 3

- What I changed: bootstrapped first entry into `Closure`, added a no-print first-entry explanation card, and upgraded runtime validation to cover readiness, defer, bootstrap, and per-program set restoration.
- Open questions: none.
- Risks: the release contract now includes stage-promotion flow in addition to print, grading, reporting, and storage.
- Next steps: continue improving second-stage paper quality and readiness scoring based on real usage, not on one-off threshold tuning.

## Previous v23.19 Iteration Notes

### Iteration 1

- What I changed: added a math-layout polish layer so generated expressions now render with more deliberate operator, equality, comparison, blank, and circle styling.
- Open questions: none.
- Risks: visual tuning is inherently subjective, so real print preview remains the final authority for whether the paper feels balanced.
- Next steps: keep future new generators using the same normalized math-markup path instead of styling each symbol ad hoc.

### Iteration 2

- What I changed: tightened spacing around fractions, mixed numbers, parentheses, question numbers, and conversion cells to make the sheet feel more even and exam-like.
- Open questions: none.
- Risks: denser spacing can make some edge-case expressions feel slightly more compact, so it should stay paired with print checks.
- Next steps: if any specific section still feels crowded, tune that section locally rather than undoing the global math polish layer.

### Iteration 3

- What I changed: updated runtime docs and version metadata so the math-layout pass is now part of the visible release contract.
- Open questions: none.
- Risks: validator can check helper presence, but paper beauty still needs human eyes.
- Next steps: continue balancing pedagogy improvements with sheet readability, since both affect real training quality.

## Previous v23.18 Iteration Notes

### Iteration 1

- What I changed: added a high-value training priority layer so the engine now spends more daily paper budget on misconception families with higher leverage, not just on whatever currently has weight.
- Open questions: none.
- Risks: stronger prioritisation can make the paper feel more purposeful but slightly less uniform, which is intentional.
- Next steps: keep observing whether additional high-value families should join this layer after live use.

### Iteration 2

- What I changed: extended targeted review variants into selected KAI decimal-division and equation traps, so remediation now checks transfer, not only exact memory.
- Open questions: none.
- Risks: stronger review variants increase cognitive demand, so answer-sheet explanations must remain explicit.
- Next steps: if the new KAI review lane works well, expand it into a few fraction trap families later.

### Iteration 3

- What I changed: updated docs, validation, and cache versioning so the new global high-value focus logic is regression-protected.
- Open questions: none.
- Risks: validator can check that the new focus helpers and review variants exist, but live paper feel still matters.
- Next steps: continue sharpening the highest-value training blocks after observing the new paper balance.

## Previous v23.17 Iteration Notes

### Iteration 1

- What I changed: raised the diagnostic quality of Lorik Set B division by moving more items onto explicit estimate-then-scale-then-verify patterns instead of lighter decimal practice.
- Open questions: none.
- Risks: the section is slightly harder now, so future tuning should stay focused on misconception value rather than making numbers large for their own sake.
- Next steps: watch whether the stronger quotient-estimation pattern should also expand into selected KAI decimal-division review variants.

### Iteration 2

- What I changed: upgraded Lorik decimal-division pools so sets now more reliably include `商<1`, `商>1`, `×10`, `×100`, and some two-decimal dividend/divisor cases.
- Open questions: none.
- Risks: stronger decimal-division structure reduces "easy win" items in that section, which is intentional but should remain only a slight difficulty increase.
- Next steps: if needed later, separate daily B-roll difficulty by cycle phase rather than weakening the structure coverage.

### Iteration 3

- What I changed: updated error-book review variants, docs, cache versioning, and runtime validation so the stronger B卷除法 standard is applied consistently and regression-protected.
- Open questions: none.
- Risks: validator now expects higher-value decimal-division structure, so future generator edits must preserve this training spine intentionally.
- Next steps: continue the next optimization pass on broader training quality after confirming the new division set feels right in live use.

## Previous v23.16 Iteration Notes

### Iteration 1

- What I changed: moved question and answer printing onto a dedicated `#print-root` sandbox so the browser prints a staged copy of the target sheets instead of the live long page.
- Open questions: none.
- Risks: native print engines still vary, so the final confirmation remains a real print preview on the target browser/printer combination.
- Next steps: if any printer still misbehaves, capture that printer/browser pair and tune the sandbox sheet height rather than the live page layout.

### Iteration 2

- What I changed: restored a more rigid A4 question-sheet print height inside the sandbox, but trimmed it slightly below `297mm` to avoid rounding overflow that can produce blank even-numbered pages.
- Open questions: none.
- Risks: if future sections become materially taller, they may need density tuning rather than more print CSS relaxation.
- Next steps: keep `打印AB四页` in the release smoke tests whenever sheet density changes.

### Iteration 3

- What I changed: updated validation and docs so the dedicated print sandbox is now part of the guarded runtime contract.
- Open questions: none.
- Risks: validator can confirm the sandbox flow structurally, but it still cannot replace a native print preview.
- Next steps: after print stabilizes in real use, return to deeper training-quality upgrades.

## Previous v23.15 Iteration Notes

### Iteration 1

- What I changed: upgraded error-book review from exact replay only to a two-lane model: exact replay plus targeted same-tag review variants.
- Open questions: none.
- Risks: variant coverage is still selective by tag family, so future rounds should expand it intentionally rather than universally.
- Next steps: keep extending the variant lane to other high-value misconception families after observing which ones benefit most.

### Iteration 2

- What I changed: added targeted review variants for Lorik benchmark-comparison items and decimal-division items, where near-boundary variation is especially valuable.
- Open questions: none.
- Risks: stronger near-boundary review items increase discrimination demand, so answer-sheet hints must continue staying explicit.
- Next steps: expand the same pattern to selected KAI decimal-division and equation traps if needed.

### Iteration 3

- What I changed: kept review variants under the same lightweight `复习题` marker so the paper stays exam-like while review logic becomes smarter.
- Open questions: none.
- Risks: review variants still depend on the same-tag trigger path, so they appear only when the error-book signal is strong enough.
- Next steps: consider a future three-lane model with exact replay, near-boundary variant, and reverse-form transfer.

## Previous v23.14 Iteration Notes

### Iteration 1

- What I changed: narrowed Lorik benchmark-comparison items so they now sit close to 0.5, 0.625, 0.75, and 0.8, forcing actual discrimination instead of obvious guesses.
- Open questions: none.
- Risks: tighter comparison ranges are cognitively sharper, so answer review needs to keep benchmarks very explicit.
- Next steps: if needed, extend the same "near boundary" design to selected KAI conversion families later.

### Iteration 2

- What I changed: added worked conversion steps across KAI and Lorik conversion sections so answer review shows the denominator/benchmark transformation used.
- Open questions: none.
- Risks: more answer-sheet detail slightly increases density, but it improves tutoring value after grading.
- Next steps: continue filling step gaps for any remaining high-frequency conversion items.

### Iteration 3

- What I changed: bumped the set-cache namespace again so new benchmark-comparison content is used immediately on future generated sets.
- Open questions: none.
- Risks: older cached sets remain in storage history, but newly generated sets use the new namespace.
- Next steps: keep tying substantial content changes to cache-version updates when stale papers would otherwise hide the improvement.

## Previous v23.13 Iteration Notes

### Iteration 1

- What I changed: removed training-status chrome from question sheets, including level badges, weakness/domain cues, and the phase strip in the page header.
- Open questions: none.
- Risks: less visible training metadata on the question page means those signals now live mainly in generation logic and answer review, which is the intended separation.
- Next steps: keep validating the student paper against an "exam-like" presentation standard.

### Iteration 2

- What I changed: preserved only a lightweight review marker for exact error-book replay items, using absolute positioning so it does not affect line height or page breaks.
- Open questions: none.
- Risks: if a section ever becomes too visually dense near the top-right corner, the marker may need a smaller size on compact items.
- Next steps: if needed later, allow the review marker to hide on the tiniest conversion cells while still showing in answer review.

### Iteration 3

- What I changed: updated validation and documentation so question sheets are now explicitly expected to be print-safe and exam-like.
- Open questions: none.
- Risks: validator can catch structural chrome regressions, but native print preview still remains the final authority for spacing.
- Next steps: keep this rule stable across future feature work so pedagogy metadata does not leak back onto the paper.

## Previous v23.12 Iteration Notes

### Iteration 1

- What I changed: improved Lorik decimal-division generators so the section now practices decimal-point placement with both quotient-above-1 and quotient-below-1 cases.
- Open questions: none.
- Risks: stronger decimal-quotient variation raises decision-making demand, so answer-sheet hints need to stay crisp.
- Next steps: if needed, add phase-aware alternation between one-step and two-step decimal shifts.

### Iteration 2

- What I changed: added more worked hints to high-frequency multiplication and subtraction items, plus KAI large subtraction items, so review is less dependent on generic fallback tips.
- Open questions: none.
- Risks: more detailed steps increase answer-sheet density slightly, so future copy edits should keep them short.
- Next steps: continue replacing any low-information answer lines with worked hints when a pattern keeps generating the same misconception.

### Iteration 3

- What I changed: removed the placeholder-style mixed-number subtraction explanation and replaced it with a real borrow-and-common-denominator walkthrough, then guarded against placeholder markup in validation.
- Open questions: none.
- Risks: validation now blocks this class of explanation regression, so future wording changes must preserve fully rendered worked steps.
- Next steps: keep using validation for pedagogy regressions, not just structural ones.

## Previous v23.11 Iteration Notes

### Iteration 1

- What I changed: bumped the set-cache namespace so future papers regenerate under the latest generator rules instead of reusing stale cached sets.
- Open questions: none.
- Risks: old cached papers still exist in browser storage but are no longer the active source for newly generated sets.
- Next steps: if needed later, add a small UI action to purge obsolete cached set versions explicitly.

### Iteration 2

- What I changed: reinforced Lorik Set B division so the section keeps one integer item plus the full decimal trio, and expanded decimal-divisor cases to include stronger decimal-point shifting practice.
- Open questions: none.
- Risks: daily division structure is now more deliberate, so difficulty tuning should happen inside each subtype rather than by dropping one subtype entirely.
- Next steps: keep an eye on whether double-decimal items should occasionally use two-decimal divisors more often.

### Iteration 3

- What I changed: converted additional high-value blocks from random subsets to must-cover structures, specifically Lorik multiplication, Lorik subtraction, KAI large subtraction, and KAI olympiad reasoning.
- Open questions: none.
- Risks: stronger scaffolding reduces surprise slightly, but it improves diagnostic consistency and makes daily review more reliable.
- Next steps: if the app keeps expanding, extract the section-coverage manifests into named constants shared by generators and validators.

## Previous v23.10 Iteration Notes

### Iteration 1

- What I changed: removed the print-time full-page shell sizing that could make each question sheet slightly overflow the printable page box and generate interleaved blank pages.
- Open questions: none.
- Risks: print density now follows content height during print, so any future section that grows too tall still needs manual preview confirmation.
- Next steps: keep `打印AB四页` in the smoke-test checklist whenever layout density changes.

### Iteration 2

- What I changed: changed question and answer printing to use adjacent-sheet page breaks instead of `page-break-after` on every visible sheet.
- Open questions: none.
- Risks: browser print engines still differ, but this pattern is more robust than breaking after fixed-height A4 preview cards.
- Next steps: if any printer still misbehaves, add a dedicated print-debug mode that highlights overflow.

### Iteration 3

- What I changed: updated validation and docs so the blank-even-page regression is explicitly guarded and documented.
- Open questions: none.
- Risks: validator can confirm the CSS strategy, but native print preview still requires occasional manual confirmation on real devices.
- Next steps: if print regressions recur, consider adding exported PDF snapshot checks outside the browser print dialog.

## Previous v23.9 Iteration Notes

### Iteration 1

- What I changed: replaced pure random KAI fraction-calculation selection with must-cover coverage groups, while keeping equation archetype coverage intact.
- Open questions: none.
- Risks: KAI fraction sections are more deliberately scaffolded now, so future new fraction tags should be assigned to a clear structure family instead of appended loosely.
- Next steps: watch whether the `k_fcalc_paren` and `k_fcalc_muldiv` alternation feels balanced enough in daily use.

### Iteration 2

- What I changed: made Lorik fraction mix guarantee the full daily spread of its 12 fraction-operation families instead of sampling randomly from the pool.
- Open questions: none.
- Risks: this raises structural consistency and lowers tag-level randomness, so difficulty tuning should happen inside each family rather than by deleting daily families.
- Next steps: consider a phase-aware rotation only if some family starts to feel over-practiced after longer use.

### Iteration 3

- What I changed: updated runtime validation and product/development docs so the new fraction coverage guarantees are explicit and regression-protected.
- Open questions: none.
- Risks: validator strictness is higher again, so any future fraction-pool refactor must update the expected coverage rules intentionally.
- Next steps: if coverage rules keep growing, move the validator expectations into shared named manifests.

## Previous v23.8 Iteration Notes
### Iteration 1

- What I changed: extended must-cover generation into KAI conversions so each set now includes percent, repeating-decimal, benchmark-denominator, and decimal-to-fraction practice.
- Open questions: none.
- Risks: conversion sections are now more pedagogically stable but slightly less surprising from set to set.
- Next steps: monitor whether one conversion family should rotate by phase rather than appear daily.

### Iteration 2

- What I changed: made KAI equations cover inverse-operation, multi-step, special-position unknown, and proportion forms every set.
- Open questions: none.
- Risks: stronger archetype coverage means the equation block is more intentionally structured, so future tag additions should slot into a clear archetype instead of just enlarging the pool.
- Next steps: consider the same archetype-based approach for fraction calculation subtypes if that section starts drifting.

### Iteration 3

- What I changed: updated runtime validation and docs so conversion/equation coverage is explicit and protected.
- Open questions: none.
- Risks: validator strictness is higher, so future content expansions must update the expectations intentionally.
- Next steps: if the app keeps growing, extract per-section coverage rules into named constants instead of repeating them in validators.

## Previous v23.7 Iteration Notes

### Iteration 1

- What I changed: replaced pure random section selection in KAI decimal multiplication and division with must-cover coverage groups before shuffling.
- Open questions: none.
- Risks: fixed coverage reduces randomness slightly, but the gain in daily diagnostic consistency is worth that tradeoff.
- Next steps: watch whether any one must-cover subtype starts to feel overrepresented after a month of use.

### Iteration 2

- What I changed: made Lorik basic mixed problems cover shortcut structure, operation order, distributive reasoning, and combination splitting every set.
- Open questions: none.
- Risks: stronger structure coverage may expose more misconception clusters at once, so answer tips should stay concise.
- Next steps: if needed, tune weekly phase weights so one category gets lighter during challenge-heavy cycles.

### Iteration 3

- What I changed: updated runtime validation and docs so section-coverage guarantees are explicit and regression-protected.
- Open questions: none.
- Risks: future generator edits must preserve these guarantees or update the validation intentionally.
- Next steps: consider adding similar must-cover scaffolding to KAI conversions if that section starts feeling too random.

## Previous v23.6 Iteration Notes

### Iteration 1

- What I changed: introduced shared runtime version constants so UI labels, Gist metadata, and JSON exports stay on the same app version.
- Open questions: none.
- Risks: static README and release notes still need manual updates each release even though the runtime strings are now centralized.
- Next steps: if releases become more frequent, generate the human-facing changelog from a single source too.

### Iteration 2

- What I changed: upgraded backup export metadata and import success feedback so recovery flows show the source version and context.
- Open questions: none.
- Risks: older backups still restore as `legacy`, which is correct but less precise if users renamed files manually.
- Next steps: consider adding a tiny backup summary panel before import confirmation.

### Iteration 3

- What I changed: added lightweight print preflight hints and unified toast feedback for print, grading, and error-book actions.
- Open questions: none.
- Risks: the print hint intentionally delays dialog opening slightly, so it should stay brief to avoid feeling sluggish.
- Next steps: if families still miss print settings, consider a first-run-only print checklist modal.

## Previous v23.5 Iteration Notes

### Iteration 1

- What I changed: replaced timer-only print cleanup with `afterprint` and print media lifecycle cleanup, and updated print CSS so visible sheets own pagination during print.
- Open questions: none.
- Risks: browser print engines still depend on user scaling and printer hardware margins, so a manual preview check remains part of release confirmation.
- Next steps: if print regressions keep recurring, add browser PDF snapshot checks in CI.

### Iteration 2

- What I changed: guaranteed Lorik section II includes decimal-dividend, decimal-divisor, and double-decimal division practice on every generated set.
- Open questions: none.
- Risks: more decimal division in one section raises local density slightly, so future tuning may rebalance difficulty if Lorik sets feel too narrow.
- Next steps: monitor whether the three-way decimal mix should rotate by phase or remain fixed every set.

### Iteration 3

- What I changed: updated README, product/development docs, and runtime validation for print lifecycle and Lorik decimal-division coverage.
- Open questions: none.
- Risks: validation confirms structure and helper behavior, but native print preview still needs occasional manual verification.
- Next steps: keep the print-preview smoke test in every release checklist that touches layout or print CSS.

## Previous v23.4 Iteration Notes

### Iteration 1

- What I changed: added a current-set review report button to the control panel.
- Open questions: none.
- Risks: reports only show submitted grading records, so unsubmitted learners are clearly marked as pending.
- Next steps: keep the report tied to the paper question number for easy parent-child review.

### Iteration 2

- What I changed: automatically opens the set report after grade submission.
- Open questions: none.
- Risks: the modal adds one more step after submit, but it directly supports paper correction.
- Next steps: consider a print-friendly set-review summary if parents want a separate correction slip.

### Iteration 3

- What I changed: added validation and docs for set-review output including question number, original question, and correct answer.
- Open questions: none.
- Risks: the report depends on `info.num` stored by answer rows; future answer-row changes must preserve it.
- Next steps: include report checks in every runtime validation pass.

## Previous v23.3 Iteration Notes

### Iteration 1

- What I changed: made the local-only status actionable with a visible cloud-connect button.
- Open questions: none.
- Risks: users still need a valid GitHub PAT with gist scope on each device.
- Next steps: keep setup instructions short and visible.

### Iteration 2

- What I changed: made the cloud status line clickable and clarified the not-connected state.
- Open questions: none.
- Risks: status text alone cannot confirm whether the browser has blocked localStorage.
- Next steps: add localStorage diagnostics only if connection problems persist.

### Iteration 3

- What I changed: updated docs for the new sync onboarding flow.
- Open questions: none.
- Risks: GitHub token generation is still an external GitHub step.
- Next steps: consider adding a small illustrated setup checklist later.

## Previous v23.2 Iteration Notes

### Iteration 1

- What I changed: clarified that cloud records live in a private GitHub Gist, while GitHub Pages only serves the app.
- Open questions: none.
- Risks: users must connect the same token on each device; without token the app remains local-only.
- Next steps: keep the data backup modal as the primary sync onboarding surface.

### Iteration 2

- What I changed: added automatic remote pull on page focus, visibility return, and a light interval.
- Open questions: none.
- Risks: GitHub API rate limits are possible with excessive open tabs, so pulls are throttled.
- Next steps: observe whether the interval needs tuning after real family use.

### Iteration 3

- What I changed: improved sync status timestamps and validation coverage for auto-pull helpers.
- Open questions: none.
- Risks: native browser storage can still be cleared by the user, so JSON backup remains recommended.
- Next steps: add a visible cloud conflict log only if sync issues appear in practice.

## Previous v23.1 Iteration Notes

### Iteration 1

- What I changed: added a question-only print mode that hides answers and non-question sheets.
- Open questions: none.
- Risks: browser print dialogs still depend on user printer defaults such as scaling.
- Next steps: recommend default scale or "fit to printable area" if a specific printer clips edges.

### Iteration 2

- What I changed: marked the four AB sheets as `question-sheet` and the fourth as `print-last-question` for stable A4 pagination.
- Open questions: none.
- Risks: if future sections grow taller, the fixed A4 sheet may overflow.
- Next steps: keep runtime and visual checks tied to any future content-density changes.

### Iteration 3

- What I changed: added answer-only printing, docs, and validation that each generated set has exactly four printable question sheets.
- Open questions: none.
- Risks: validation is structural and does not open the native print dialog.
- Next steps: add browser screenshot or PDF export checks if print layout changes often.

## Previous v23.0 Iteration Notes

### Iteration 1

- What I changed: added exact error-book replay scoring and capped replay per section.
- Open questions: none.
- Risks: exact replay should stay limited so students still practice retrieval transfer.
- Next steps: tune replay rate after observing whether repeated misses clear faster.

### Iteration 2

- What I changed: added same-tag variation labels and kept domain transfer as the third bridge layer.
- Open questions: none.
- Risks: variant labels may need tutor explanation the first time students see them.
- Next steps: add short parent-facing copy if the badge vocabulary feels unclear.

### Iteration 3

- What I changed: added the Error-Book Bridge plan to the knowledge map and validation coverage for replay bridging.
- Open questions: none.
- Risks: bridge priority is based on local app data, not a formal mastery scale.
- Next steps: consider a weekly “错题清零” routine view once enough sessions accumulate.

## Previous v22.9 Iteration Notes

### Iteration 1

- What I changed: added domain-level weakness scoring from weights and active error-book counts.
- Open questions: none.
- Risks: domain boosts must stay moderate so one weak area does not monopolize the whole paper.
- Next steps: tune boost size after several graded sessions.

### Iteration 2

- What I changed: connected domain signals to adaptive selection and added a Domain Boost answer badge.
- Open questions: none.
- Risks: the badge explains intent, but students still need tutor guidance to link related tags.
- Next steps: add short domain-specific remediation routines if repeated clusters persist.

### Iteration 3

- What I changed: upgraded the knowledge map priority labels and runtime validation for domain-signal scoring.
- Open questions: none.
- Risks: priority labels are based on app-local data, not standardized mastery scores.
- Next steps: consider historical trend charts once enough sessions accumulate.

## Previous v22.8 Iteration Notes

### Iteration 1

- What I changed: added a visible phase focus plan and capped L4 challenge density outside challenge phases.
- Open questions: none.
- Risks: challenge caps are heuristic and should be tuned after observing several real graded sessions.
- Next steps: compare perceived difficulty across consolidation and challenge days.

### Iteration 2

- What I changed: added curriculum-domain grouping for generated tags and upgraded the knowledge map to show domain coverage and weak-point levels.
- Open questions: none.
- Risks: domains are app-specific learning domains, not a full external curriculum standard.
- Next steps: expand domain descriptors if formal syllabus reporting becomes necessary.

### Iteration 3

- What I changed: updated documentation and runtime validation to check focus strips, level badges, knowledge advice, and domain coverage.
- Open questions: none.
- Risks: validation remains structural; visual overflow still needs browser-based checking when layout changes grow.
- Next steps: consider Playwright screenshots for modal and print layouts.

## Previous v22.7 Iteration Notes

### Iteration 1

- What I changed: added L1-L4 training levels and phase-aware selection bonuses.
- Open questions: none.
- Risks: level inference is tag-based, so exact levels should be tuned as real error data accumulates.
- Next steps: promote high-frequency misses into explicit tag-level difficulty overrides.

### Iteration 2

- What I changed: surfaced level badges on question and answer sheets.
- Open questions: whether printed sheets feel too visually busy.
- Risks: badges use horizontal space in dense sections.
- Next steps: if print density becomes tight, hide level badges in print while keeping them on answer sheets.

### Iteration 3

- What I changed: added a knowledge map modal and runtime level validation.
- Open questions: none.
- Risks: knowledge map currently reflects generated families and active weak tags, not a full curriculum standard.
- Next steps: expand it into a formal grade 3-4 scope map if the app needs curriculum reporting.

## Previous v22.6 Iteration Notes

### Iteration 1

- What I changed: added per-answer misconception tips to the answer sheet.
- Open questions: none.
- Risks: answer sheets are slightly longer because each row now includes feedback text.
- Next steps: watch print density on smaller browser print settings.

### Iteration 2

- What I changed: introduced family-level advice resolution so every generated tag receives targeted feedback.
- Open questions: none.
- Risks: family advice is less precise than exact tag advice, but still much better than a generic fallback.
- Next steps: promote frequently missed family-level tips into exact tag advice over time.

### Iteration 3

- What I changed: expanded runtime validation to fail when generated tags only resolve to the generic fallback.
- Open questions: none.
- Risks: validation still runs in a stubbed DOM, so visual overflow needs separate manual or screenshot review.
- Next steps: add visual regression testing if layout changes continue.

## Previous v22.5 Iteration Notes

### Iteration 1

- What I changed: added two-step equations, reverse distributive shortcuts, unit-fraction application, and parentheses-priority mixed operations.
- Open questions: none.
- Risks: more diagnostic variety may increase perceived difficulty on some days.
- Next steps: watch whether error-book tags cluster around two-step equations or unit fractions.

### Iteration 2

- What I changed: upgraded set cache prefix to v25 so newly generated sets use the expanded pools immediately.
- Open questions: none.
- Risks: previously cached v24 sets remain in local storage but are no longer used for current generation.
- Next steps: keep cache prefix changes tied to generator-pool releases.

### Iteration 3

- What I changed: expanded runtime validation to sets 73-102 and added checks for section counts, empty outputs, duplicate items, and invalid strings.
- Open questions: none.
- Risks: validation is still structural and does not prove every arithmetic answer semantically.
- Next steps: add targeted arithmetic invariants for generator families when they are extracted from the single file.

## Previous v22.4 Iteration Notes

### Iteration 1

- What I changed: expanded misconception tags and fixed answer formatting for conversion and decimal arithmetic items.
- Open questions: none.
- Risks: broader pools make periodic generator sampling more important.
- Next steps: keep the runtime validator in the release checklist.

### Iteration 2

- What I changed: added higher-diagnostic KAI items for tiny decimal products, decimal quotients, unknown divisors, long borrow chains, and compensation shortcuts.
- Open questions: whether future sets should expose per-topic difficulty sliders.
- Risks: advanced KAI items may need manual tuning if daily sessions feel too dense.
- Next steps: watch error-book clustering after several sessions.

### Iteration 3

- What I changed: added Lorik items for near-100 multiplication, 25/scale division, whole-number fraction meaning, and a Node runtime validation script.
- Open questions: none.
- Risks: the stubbed DOM validator is a smoke test, not a visual layout test.
- Next steps: add browser-based screenshot tests if the project later adopts Playwright.

## Previous v22.3 Iteration Notes

### Iteration 1

- What I changed: fixed a decimal-division generator that rounded the dividend and could produce wrong answer keys.
- Open questions: none.
- Risks: generated math still needs periodic sampling because the app has many generators.
- Next steps: keep a generator audit checklist in future releases.

### Iteration 2

- What I changed: made resubmission roll back prior weight adjustments, added safer localStorage writes, and hardened fraction construction against decimal inputs.
- Open questions: whether Gist merge should eventually track per-device conflict metadata.
- Risks: legacy sessions without `weightAdjustments` can only approximate weight rollback for old perfect answers.
- Next steps: retain `weightAdjustments` for all new sessions.

### Iteration 3

- What I changed: updated documentation, clarified GitHub Pages and Gist sync setup, and added product/development specs.
- Open questions: whether to add automated browser tests with Playwright in a future repo structure.
- Risks: the current single-file architecture is convenient but makes unit testing harder.
- Next steps: consider extracting generators and storage into testable modules if the app grows.

## Self-Confirmation Rule

When an error or ambiguity appears, first run a local confirmation: inspect the code, reproduce minimally, or perform a syntax/smoke test. Ask the user only after confirming the decision cannot be made safely from local context.

## Research Alignment

All practice changes must preserve:

- Retrieval before feedback.
- Spaced reappearance of weak or forgotten tags.
- Interleaving across problem forms.
- Feedback that distinguishes careless mistakes from concept errors.
