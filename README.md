# Mini Challenge · 专家私教引擎 v22.5

小学数学高密度训练单页应用：基于遗忘曲线的智能出题 + 永久错题本 + GitHub Gist 多设备同步。

## 在线访问

**https://szkailorik.github.io/math-mini-challenge/**

## 多设备同步设置（一次，30 秒）

1. 打开 https://github.com/settings/tokens/new?scopes=gist&description=math-mini-challenge （已预勾 gist 权限）
2. Expiration 选 **No expiration**，点底部 **Generate token**
3. 复制 token（形如 `ghp_xxxx...`）
4. 在应用右上角控制面板点 **💾 数据备份** → 粘贴 token → **🔗 连接云同步**
5. 换设备（iPad/电脑/其他浏览器）时粘贴同一 token → 数据自动合并同步

数据存在你自己 GitHub 账号下一个**私有 gist** 里（描述为 `math-mini-challenge-sync-v1`）。随时可在 https://gist.github.com 查看/删除/导出。不走任何第三方服务器，Anthropic / 其他云服务商看不到你的数据。

## v22.0 重点：错题本永久存档版

相比 v21.0，重写了错题本存储与交互：

| 维度 | v21 旧版 | v22 新版 |
| --- | --- | --- |
| 存储位置 | 挂在 `history[]` 的 session details 里 | 独立 `errorBook{}` 字典，单独持久化 |
| 超 60 次训练后 | `history.shift()` 会裁剪掉老错题 | errorBook 不裁剪，永久保留 |
| 同一题错多次 | 重复出现多张卡片 | 自动去重，合并为一条 + `count` 计数 |
| 重新提交同 set | 错题会被覆盖/丢失 | 可回滚的增量计数，历史错次不丢 |
| 已掌握的题 | 无法从错题本移除 | ✓ 按钮标记掌握，单独归档；再次错→自动撤销 |
| 知识点视图 | 时间线混排 | 按 KnowledgeBase tag 自动分组，组内按错次排序 |
| 数据迁移 | — | 从旧版 `history` 自动重建 errorBook |

核心错题唯一 ID：`tag + FNV-1a(normalized(q))`，不同题不会碰撞，同题跨 set 稳定命中。

## v22.5 诊断训练增强

- KAI 增加两步方程、逆向分配律、单位分数应用题，强化“先逆运算、再处理乘除”和“先找单位量”的步骤意识。
- Lorik 增加括号优先级混合运算，专门拦截从左到右顺算的常见错误。
- 试卷缓存升级到 `MathSetData_v25`，确保新题型上线后能进入新生成的 set。
- 运行时验证扩展到 Set 73-102，并检查 section 数量、空题/空答案、重复题和异常字符串。

## v22.4 题型质量增强

- KAI 新增极小数乘法、小数商、未知数作除数、整百万连续借位、补偿凑整等诊断题型。
- Lorik 新增接近整百乘法、25/末尾0除法、整万连续借位、求一个数的几分之几等题型。
- 关键基础题补充解析步骤，让答案页不只给结果，也能提示孩子检查位值、估算和凑整策略。
- 互化题修正小数答案格式，统一用稳定格式输出，减少 `0.30000000004` 这类浮点显示风险。
- 新增 `scripts/validate-runtime.mjs`，可在 Node 中生成整套试卷做轻量运行时验证。

## v22.3 稳定性优化

- 修正 `k_ddiv_basic` 小数除法生成器：被除数保留 3 位，避免四舍五入后题面与答案不一致。
- 加固分数引擎：构造 `Frac` 时先把小数转换为整数比，降低浮点误差导致的异常约分风险。
- 重复提交同一套题时会回滚旧权重、应用新权重，让自适应弱点画像保持一致。
- 本地存储写入失败时会清理旧试卷快照并重试，减少 localStorage 配额满导致的保存失败。
- 避免 Lorik 异分母相减生成负数答案。
- 图片导出组件未加载完成时给出明确提示，而不是静默报错。

## v22.0-v22.2 优化

- `Frac` 构造函数：加固 `n=0` / `d=0` 边界，避免 NaN 污染
- `localStorage` 超配额：快照写入失败时自动清理其他版本缓存后重试
- 数据导入：旧版备份 (v21 及更早) 自动通过 `migrateProfile` 重建 errorBook
- 备份文件名：加日期后缀 `_2026-04-16.json` 方便版本管理
- 答题行识别：使用 `uid` 精确匹配，解决同 tag 不同题的状态串扰

## 数据结构

```
profile = {
  weights:   { tag: number },        // 掌握度加权
  lastSeen:  { tag: setNum },        // 遗忘曲线
  history:   [ {
    set, date, ts,
    details:[{tag, grade, info, uid}],         // 错题明细
    allGrades:[{tag, grade}],                  // 本套完整批改摘要
    weightAdjustments:[{tag, delta}]           // 重交批改时用于回滚画像
  } ],  // 保留 60 套
  errorBook: {                        // ★ 永久，不裁剪
    [uid]: {
      tag, info: {q,a,step,sec},
      grade: 'careless' | 'wrong',
      count: N,
      firstSet, firstDate,
      lastSet, lastDate,
      mastered: false,
      masteredDate
    }
  }
}
```

## 本地运行

单文件纯前端，无构建：

```bash
# 任选其一
python3 -m http.server 8080
npx serve .
```

浏览器访问 `http://localhost:8080/`。

## 本地验证

```bash
sed -n '/<script type="module">/,/<\/script>/p' index.html | sed '1d;$d' > /tmp/math-mini-challenge-script.mjs
node --check /tmp/math-mini-challenge-script.mjs
node scripts/validate-runtime.mjs
```

## 部署

仓库根目录的 `index.html` 直接作为 GitHub Pages 首页。workflow 在 `.github/workflows/pages.yml` 自动发布 `main` 分支的根目录。

## 浏览器要求

- Chrome / Edge / Safari 最近两个大版本
- 需要 ES Modules 支持
- 依赖 `localStorage`；云端同步使用 GitHub Gist API，需要用户提供具备 `gist` scope 的 GitHub PAT
- 图片导出依赖 CDN 加载 `html2canvas`

## 数据安全

- 默认仅本地存储（localStorage）
- 跨设备同步：GitHub Gist（PAT 存本地，不发到任何第三方服务器）
- 冲突处理：多端并发修改时按 uid/ts 安全合并，不会丢数据
- 本地始终是主副本，断网也能用，恢复网络后自动 debounce 回推
- 数据保险箱：JSON 导出/导入作为终极离线备份
