# 内容计划 · 前 10 篇选题 + AI 写作管线（phtbyte.com 首发站）

> 定位：**开发者视角的独立游戏 / 游戏设计 / 引擎技术**站（蓝海利润锚）+ **新游资讯**（红海流量引擎）。
> 首发站先把两类融合验证，跑通后再拆成子域（lab/gear/saas/news/deals）。
> 你的 unfair advantage：你是真做过 Cocos 开发、在做一个原创游戏「超苦逼冒险者」的人——这是纯 AI 灌水写不出的 EEAT。

---

## 一、前 10 篇选题（按发布顺序，6–8 周铺完）

| # | 工作标题 | 主攻关键词（意图/难度） | 海 | 联盟钩子 | 发布周 |
|---|---|---|---|---|---|
| 1 | **How I Built an Idle Survival Game in Cocos Creator 3.8**（已有草稿） | "cocos creator game dev tutorial" / 长尾蓝海 | 蓝 | 无（EEAT 立人设） | 第 1 周 |
| 2 | **Cocos Creator vs Unity vs Godot: Which Engine for a Solo Indie in 2026** | "best game engine for indie 2026" / 中 | 蓝 | **Amazon Associates（游戏开发书单/实物，tag=phtbyte-20，已接通）** | 第 1 周 |
| 3 | **The Complete Guide to i18n in a Cocos Web Game** | "cocos creator localization" / 长尾蓝海 | 蓝 | 无（技术引流） | 第 2 周 |
| 4 | **Designing a Satisfying Idle Loop: Lessons from Shipping a Survival RPG** | "idle game design loop" / 蓝海 | 蓝 | 无（设计深度） | 第 2 周 |
| 5 | **How I Cut My Mini-Game Bundle Size 60% (Engine Subpackaging + PerfTier)** | "reduce cocos bundle size" / 长尾蓝海 | 蓝 | 无（技术深度） | 第 3 周 |
| 6 | **Best Mechanical Keyboards for Game Developers 2026 (Under $100 / $200)** | "best mechanical keyboard for coding" / 蓝海 | 蓝 | **Amazon Associates（gear）** | 第 3 周 |
| 7 | **Top 7 Free & Paid Tools to Ship an Indie Game on a Budget** | "indie game dev tools" / 蓝海 | 蓝 | **PartnerStack（SaaS recurring）**：Blender/Aseprite/Asset packs | 第 4 周 |
| 8 | **10 Indie Games You Missed in 2026 (and What Devs Can Learn)** | "best indie games 2026" / 红海流量 | 红 | 无（漏斗，内链到 2/4/9） | 第 4 周 |
| 9 | **How to Monetize a Web Game Without Killing Retention** | "web game monetization rewarded video" / 蓝海 | 蓝 | 无（设计+变现） | 第 5 周 |
| 10 | **Building a Localization Pipeline for Games with AI** | "game localization AI translation" / 蓝海 | 蓝 | 无（AI 管线，呼应出海） | 第 5 周 |

**配比**：8 蓝 + 1 红（#8 当流量漏斗，内链到蓝海技术文）+ 1 人设文（#1）。
**为什么这么排**：#1/#2 先立住「真开发者」人设 → #3/#4/#5 吃长尾技术词（竞争低、意图强）→ #6/#7 第一次上联盟（gear + SaaS recurring，利润锚）→ #8 引红海流量反哺 → #9/#10 收口设计+出海主题，闭环。

> ⚠️ **联盟平台更正（2026-09-28）**：原表里 #2 写的「Udemy/Coursera 课程（Amazon/Impact）」是错的——**课程类联盟（Udemy / Coursera）都跑在 Impact.com，不走 Amazon**（Amazon Associates 只覆盖书/实物/电子书）。所以前 10 篇的联盟钩子统一走 **Amazon Associates（tag=phtbyte-20，已接通）**：书单、键帽/机械键盘、绘图板、开发硬件等。Udemy/Coursera 课程属 Impact.com 独立体系（需 ≥500 月访客才易过审），**等站点有自然量后再单独接**，不阻塞 180 天出单。#7 的 Blender/Aseprite/Asset packs 走 PartnerStack/Awin（SaaS recurring），同样独立于 Amazon。

---

## 二、AI 写作管线（每篇都走这套，保证可规模化）

**流程**：AI 写英文初稿 → 你用真实经历补数据/截图/踩坑 → 套模板加结构 → 发布。

### 1. 文章骨架模板（固定 section，利于 SEO + 内链）
```
H1 主标题（含主关键词）
  导语（2–3 句，点明"我做过"的经验）
  H2 背景 / 为什么写这个
  H2 核心内容（分 3–5 个 H3 小节，每节有代码/截图/数据）
  H2 踩过的坑 / 复盘
  H2 结论 + 下一步（内链到本站相关文）
  [联盟钩子文专属] H2 推荐清单（带披露 + 不写死价格）
```

### 2. FTC 披露片段（每篇带联盟链接的文章必须放，欧美法律要求）
> *Disclosure: This article contains affiliate links. If you buy through them, I may earn a commission at no extra cost to you. I only recommend tools I've actually used.*

放在文章**顶部导语下方**一处即可，不必每节重复。

### 3. 价格不写死（Amazon 合规 + 锁 cookie）
❌ 错误："only $19.99"
✅ 正确："check the current price on Amazon via the link below"（链接即追踪，价格随时变也不违规）

### 4. 每篇必带的结构化数据（JSON-LD）
- Article / BlogPosting schema（标题、作者、日期、主图）
- 联盟清单页加 `ItemList`
- 复用 `how-i-built-kubi.html` 里已有的 JSON-LD 模板，换字段即可

### 5. 内链规则（SEO 权重沉淀）
- 红海文（#8）必须内链 ≥3 篇蓝海技术文
- 每篇底部「Related reads」放 2–3 条本站链接
- 所有内链用相对路径或 `https://phtbyte.com/...`

### 6. 发布节奏
- 前 5 周：每周 2 篇（1 蓝 + 1 红/技术），建立发布频率信号
- 之后稳定每周 1–2 篇，长期养站
- 关键：持续 > 爆发，Google 看的是稳定更新历史

---

## 三、发布前检查清单（每篇）
- [ ] 标题含主关键词，≤ 60 字符
- [ ] 有 ≥1 张原创截图/图（规避无图站被 AIO 吞噬）
- [ ] FTC 披露已加（带联盟链接时）
- [ ] 价格未写死
- [ ] JSON-LD 已填、canonical 指向自身
- [ ] ≥2 条内链到本站其他文
- [ ] sitemap.xml 已加该 URL（或等自动生成）

---

## 四、风险红线（来自前几轮分析）
- **蓝海占比不能 <50%**：红海+长尾最易被 Google AIO 直接吞噬流量。
- **每篇必须有真人经验兜底**：纯 AI 灌水在 2025–26 被重拳，EEAT 是你的护城河。
- **Amazon 180 天 3 单生死线**：注册前就要想好怎么出 3 单（见 AMAZON_ASSOCIATES.md）。
- **内容不碰搬运/破解**：本站是原创项目复盘 + 独立观点，与「超苦逼冒险者」IP 死线完全隔离。
