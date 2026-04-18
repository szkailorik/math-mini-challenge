# Mini Challenge 第二阶段实施计划

> 基于文档：
> [2026-04-18-next-stage-calculation-spec.md](./2026-04-18-next-stage-calculation-spec.md)
>
> 目标：
> 在不破坏现有 `Mini Challenge Advanced` 主链路的前提下，把“第二阶段 / 小学计算收束阶段”按可回退、可验证、可逐步上线的方式做出来。

---

## 1. 实施总原则

这份实施计划严格基于现有系统演进，而不是另起炉灶。

必须保持不破坏的现有能力：

- 默认打开仍进入当前 `Mini Challenge Advanced`
- 现有 `KAI / Lorik` 双学生结构保持不变
- 现有 `打印AB四页`、`打印答案` 继续稳定
- 现有 `StorageDB` 与 `GistSync` 主链路继续可用
- 现有 `submitGrades`、错题本、本套批改报告、知识点地图不失效

实施方式采用：

- `program 并行`
- `配置优先`
- `小步落地`
- `每个阶段都能回退`

## 2. 当前代码基线

本计划默认以下真实入口仍是现有系统主骨架：

- [index.html](/Users/bianbian/Documents/codex/minichallenge/index.html:715)
  - `StorageDB`
- [index.html](/Users/bianbian/Documents/codex/minichallenge/index.html:2339)
  - `generateOrLoadSetData`
- [index.html](/Users/bianbian/Documents/codex/minichallenge/index.html:2445)
  - `window.renderPaper`
- [index.html](/Users/bianbian/Documents/codex/minichallenge/index.html:2528)
  - `renderErrorBook`
- [index.html](/Users/bianbian/Documents/codex/minichallenge/index.html:2970)
  - `showSetReview`
- [index.html](/Users/bianbian/Documents/codex/minichallenge/index.html:3058)
  - `window.printQuestionSheets`
- [index.html](/Users/bianbian/Documents/codex/minichallenge/index.html:3088)
  - `window.submitGrades`
- [scripts/validate-runtime.mjs](/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs:1)
  - 运行时结构校验

实施时不要绕开这些入口重新发明一套平行主链。

## 3. 里程碑总览

整个第二阶段实施建议拆成 4 个里程碑：

1. `M1 程序壳切换`
2. `M2 第二阶段可生成可打印`
3. `M3 第二阶段可批改可自适应`
4. `M4 阶段切换与验收闭环`

每个里程碑必须满足：

- 当前第一阶段行为不回归
- 第二阶段只增加，不替换
- 可以独立验收

## 4. M1 程序壳切换

### 4.1 目标

先把“多 Program 架构”立起来，但第二阶段内容先不做全。

达成结果：

- 页面上可以识别当前 program
- 默认仍是 `advanced_fluency_v1`
- 第一阶段题卷生成、打印、批改、错题本完全不变

### 4.2 主要修改文件

- [index.html](/Users/bianbian/Documents/codex/minichallenge/index.html:1)
- [scripts/validate-runtime.mjs](/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs:1)
- [DEV_SPEC.md](/Users/bianbian/Documents/codex/minichallenge/DEV_SPEC.md:1)
- [PRODUCT_SPEC.md](/Users/bianbian/Documents/codex/minichallenge/PRODUCT_SPEC.md:1)
- [WORKFLOW.md](/Users/bianbian/Documents/codex/minichallenge/WORKFLOW.md:1)

### 4.3 任务清单

1. 增加 `TRAINING_PROGRAMS` 配置对象
2. 增加 `currentProgramId`
3. 增加 program selector UI
4. 抽出 `getCurrentProgramId`
5. 抽出 `getProgramConfig`
6. 保证默认 program 为 `advanced_fluency_v1`
7. 校验第一阶段打开后视觉和行为不变
8. 新增 program 切换条的最小 UI 壳
9. 新增阶段状态卡占位结构，但第一版先服务第一阶段

### 4.4 关键约束

- 不在这一步改第二阶段题库
- 不在这一步改打印结构
- 不在这一步改历史画像结构

### 4.5 验收标准

- 打开页面仍看到现在熟悉的第一阶段
- 切 set、打印、提交批改都正常
- 页面上能看到当前 program 信息
- runtime validation 新增 program selector 基础检查

### 4.6 回滚策略

如果 M1 出问题，必须能简单回退到：

- 删除 program selector
- 保留 `advanced_fluency_v1` 为唯一 program
- 不影响现有数据

## 5. M2 第二阶段可生成可打印

### 5.1 目标

把第二阶段的“空壳 + 第一版纸面结构”做出来，让它能独立生成四张题卷并稳定打印。

达成结果：

- 第二阶段能进入
- 能生成 `KAI / Lorik` 各两页题卷
- 能生成答案页
- `打印AB四页` 仍稳定

### 5.2 主要修改文件

- [index.html](/Users/bianbian/Documents/codex/minichallenge/index.html:2339)
- [index.html](/Users/bianbian/Documents/codex/minichallenge/index.html:2445)
- [index.html](/Users/bianbian/Documents/codex/minichallenge/index.html:3058)
- [scripts/validate-runtime.mjs](/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs:1)
- [README.md](/Users/bianbian/Documents/codex/minichallenge/README.md:1)
- [DEV_SPEC.md](/Users/bianbian/Documents/codex/minichallenge/DEV_SPEC.md:1)
- [PRODUCT_SPEC.md](/Users/bianbian/Documents/codex/minichallenge/PRODUCT_SPEC.md:1)

### 5.3 任务清单

1. 实现 `generateProgramSetData(programId, setNumber)`
2. 将第一阶段生成逻辑包进 `generateAdvancedFluencySet`
3. 新增 `generateElementaryClosureSet`
4. 给第二阶段定义第一版 section map
5. 给第二阶段定义题卷标题和答案页标题
6. 保证第二阶段继续输出统一的 `.sheet.question-sheet` / `.sheet.ans-sheet`
7. 新增第二阶段缓存键命名空间
8. 增加第二阶段首次进入说明卡
9. 增加第二阶段报告顶部摘要条壳层

### 5.4 第二阶段第一版题面范围

M2 只要求把第二阶段基础纸面跑起来，不要求一次做完整题库。

建议先上线这 6 组：

- 百分数-小数-分数三向互化
- 比值-除法-分数桥接
- 单位换算计算链
- 估算与验算合理性判断
- 算式 / 方程双表达
- 速度稳定度短链

### 5.5 验收标准

- 切到第二阶段后，能正常看到四张题卷
- 答案页可渲染
- `打印AB四页` 不出现空白页
- 第一阶段打印不受影响
- 缓存键带有 program namespace
- 第二阶段新增控制区 UI 不影响现有打印流

### 5.6 回滚策略

如果第二阶段题卷结构出问题：

- 保留 M1 的 program 架构
- 暂时隐藏第二阶段入口
- 不动第一阶段现有生成逻辑

## 6. M3 第二阶段可批改可自适应

### 6.1 目标

让第二阶段真正进入“训练闭环”，而不是只有纸面生成。

达成结果：

- 第二阶段可提交批改
- 第二阶段可累积自己的画像
- 第二阶段错题进入自己的 errorBook
- readiness 信号开始沉淀

### 6.2 主要修改文件

- [index.html](/Users/bianbian/Documents/codex/minichallenge/index.html:715)
- [index.html](/Users/bianbian/Documents/codex/minichallenge/index.html:2528)
- [index.html](/Users/bianbian/Documents/codex/minichallenge/index.html:2970)
- [index.html](/Users/bianbian/Documents/codex/minichallenge/index.html:3088)
- [scripts/validate-runtime.mjs](/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs:1)

### 6.3 任务清单

1. 把 `StorageDB.getProfile` 升级为 program-aware
2. 把 `forceSave` 升级为 program-aware
3. 把 `saveSession` 升级为 program-aware
4. 为第二阶段新增：
   - `representationGap`
   - `methodGap`
   - `stabilityGap`
   - `speedGap`
   - `validationGap`
5. 让 `submitGrades` 写回当前 program profile
6. 让第二阶段错题进入自己的 errorBook
7. 让 `showSetReview` 可显示第二阶段更适合的复盘字段

### 6.4 关键约束

- 第一阶段老数据不能丢
- Gist 结构升级后老设备仍能读
- 第二阶段信号不反向污染第一阶段

### 6.5 验收标准

- 第二阶段批改提交后能立即重渲染
- 第二阶段错题本可查看
- 第二阶段本套批改报告可查看
- Gist 同步后两设备都能正确读取 program 结构

### 6.6 回滚策略

如果第二阶段画像读写出问题：

- 暂停第二阶段写入
- 保留第二阶段只读展示
- 保证第一阶段画像结构继续按老路径可用

## 7. M4 阶段切换与验收闭环

### 7.1 目标

让第二阶段不只是“另一个 program”，而是成为“第一阶段之后的正式下一阶段”。

达成结果：

- readiness 可计算、可显示
- 从第一阶段进入第二阶段有正式入口
- 有阶段初始化和画像折算
- 有完整的文档、验证和上线检查

### 7.2 主要修改文件

- [index.html](/Users/bianbian/Documents/codex/minichallenge/index.html:1)
- [scripts/validate-runtime.mjs](/Users/bianbian/Documents/codex/minichallenge/scripts/validate-runtime.mjs:1)
- [README.md](/Users/bianbian/Documents/codex/minichallenge/README.md:1)
- [DEV_SPEC.md](/Users/bianbian/Documents/codex/minichallenge/DEV_SPEC.md:1)
- [PRODUCT_SPEC.md](/Users/bianbian/Documents/codex/minichallenge/PRODUCT_SPEC.md:1)
- [WORKFLOW.md](/Users/bianbian/Documents/codex/minichallenge/WORKFLOW.md:1)

### 7.3 任务清单

1. 定义 readiness score
2. 定义 promotion gate
3. 实现 transfer bootstrap
4. 实现阶段切换提示
5. 实现“继续留在第一阶段巩固”的分支
6. 增加第二阶段发布前人工验收清单
7. 完成 runtime validation 的第二阶段专项检查

### 7.4 验收标准

- 能根据第一阶段记录判断是否具备切换条件
- 用户可以选择切换或继续巩固
- 切换后第二阶段题卷、批改、错题本、报告都正常
- 线上版本与文档一致

### 7.5 回滚策略

如果 readiness 或 promotion 判断体验不好：

- 暂时保留手动切换
- 隐藏自动提示
- 第二阶段 program 本身继续保留

## 8. 跨里程碑共通的技术原则

### 8.1 必须做的隔离

- cache 按 program 隔离
- profile 按 program 隔离
- set counter 按 program 隔离
- 第二阶段错题不直接写进第一阶段 errorBook

### 8.2 必须复用的现有主链

- `renderPaper`
- `printQuestionSheets`
- `printAnswerSheets`
- `submitGrades`
- `StorageDB`
- `GistSync`

### 8.3 明确不要做的事

- 不要复制一份新页面
- 不要重写打印 DOM
- 不要把第二阶段做成完全独立 gist
- 不要在第一阶段现有 key 上硬混第二阶段数据
- 不要为了“看起来像第二阶段”就在题卷上堆视觉提示

## 8.4 前端设计落地原则

第二阶段实施时，前端层面必须遵守：

1. `控制区增强，不是题卷增强`
   - program、阶段状态、切换入口主要发生在控制区。

2. `说明卡进入页面，不进入打印`
   - 第二阶段说明卡和 readiness 卡默认只存在于 no-print UI 层。

3. `报告增强优先于题卷装饰`
   - 第二阶段设计价值更多体现在报告与阶段状态，而不是把试卷做花。

4. `与现有视觉连续`
   - 第二阶段是现有系统的下一个阶段，不是另一个品牌。

## 9. 建议的文件修改顺序

推荐按下面顺序推进，返工最少：

1. `index.html`
   - 先做 program 壳层
2. `scripts/validate-runtime.mjs`
   - 同步补最低限度结构检查
3. `README.md` / `DEV_SPEC.md` / `PRODUCT_SPEC.md`
   - 只在每个里程碑稳定后再补
4. `WORKFLOW.md`
   - 在阶段完成后记录迭代说明

## 10. 发布与验收节奏

建议每个里程碑都走同一节奏：

1. 本地生成与冒烟
2. 打印预览检查
3. 提交批改回写检查
4. runtime validation
5. 文档更新
6. 推送 GitHub
7. Cloudflare / 线上检查

## 11. 当前建议先做什么

如果按这份计划正式开工，最先应该执行的是：

1. 在 `index.html` 中抽出 `TRAINING_PROGRAMS`
2. 加一个最轻的 program selector
3. 让第一阶段包进 `advanced_fluency_v1`
4. 保证现有页面行为完全不变

也就是说，真正的第一刀不是做题库，而是先把“多 Program 外壳”做对。

## 12. 当前计划的默认决策

如果暂时不再额外讨论，我建议默认按这 3 条执行：

1. 第二阶段仍保持 `KAI / Lorik` 双学生双卷结构
2. 切换条件采用 `时间 + readiness` 双条件
3. 第二阶段第一版就纳入：
   - 百分数
   - 比
   - 比例
   - 单位换算
   但只做计算链，不扩展成完整应用题系统
