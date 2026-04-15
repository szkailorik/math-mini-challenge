# Mini Challenge · 专家私教引擎 v22.0

小学数学高密度训练单页应用：基于遗忘曲线的智能出题 + 永久错题本 + 本地/云端双写。

## 在线试用

GitHub Pages 部署后访问：`https://szkailorik.github.io/math-mini-challenge/`

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

## 其他优化

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
  history:   [ { set, date, ts, details:[{tag, grade, info, uid}] } ],  // 保留 60 套
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

## 部署

仓库根目录的 `index.html` 直接作为 GitHub Pages 首页。workflow 在 `.github/workflows/pages.yml` 自动发布 `main` 分支的根目录。

## 浏览器要求

- Chrome / Edge / Safari 最近两个大版本
- 需要 ES Modules 支持（用于 Firebase 动态导入）
- 依赖 `localStorage`；云端同步依赖页面注入的 `__firebase_config`

## 数据安全

- 默认仅本地存储（localStorage）
- 如需跨设备同步：宿主环境需要注入 `__firebase_config` + `__initial_auth_token`
- 数据保险箱：支持 JSON 导出/导入作为终极防丢手段
