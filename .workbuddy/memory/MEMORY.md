# 项目记忆 · phtbyte.com 内容站出海（indie-lab）

## 项目定位
- **目标**：用 AI 批量产出英文内容站，做游戏开发/独立游戏垂类引流，海外变现（联盟营销）。**不是搬运/翻译原版游戏 IP**（KuBi/TheCedar 无 LICENSE = all rights reserved，碰 IP 违法），而是用 kubi 项目的真实开发经验做原创技术内容。
- **方向策略**：红蓝海都做（blue ≥50% 利润）。蓝海=长尾技术文（低竞争、意图强、AIO 抗吞噬度高）；红海=热门游戏攻略/介绍（流量漏斗，内链反哺蓝海）。配比 8 蓝 + 1 红 + 1 人设文。
- **内容源**：kubi-minigame（Cocos Creator 3.8 微信小游戏）的真实踩坑经验（包体优化、i18n、idle loop、UI 网格），泛化为通用 Cocos/独立游戏技术文。

## 基建（已全部闭环）
- **域名**：`phtbyte.com`（Porkbun 注册，2026-09-24 买定）。注册商 Porkbun，DNS 走 Cloudflare（NS: etta/pranab.ns.cloudflare.com）。
- **部署**：GitHub Pages + 自定义域 phtbyte.com；Cloudflare **橙色代理（Proxied）**；SSL/TLS 模式 **Full**（非 strict，因 GitHub 源站证书是 *.github.io）；Universal SSL 边缘证书有效至 **2026-12-27**；已开 **Always Use HTTPS**（http 301→https）。
- **GitHub**：仓库 `github.com:pht1991/indie-lab`（SSH：`git@github.com:pht1991/indie-lab.git`），分支 **master**，根目录部署。`CNAME` 文件内容 `phtbyte.com`，含 `.nojekyll`。
- **搜索收录**：Google Search Console 已验证（网域类型，DNS TXT）+ sitemap.xml 已提交（状态「成功·已发现 4→6 网页」）。收录催熟用「网址检查→请求编入索引」。Bing Webmaster 可从 GSC 导入。
- **HTTPS 历史坑**（备查）：GitHub 自定义域证书曾卡死（state 'new' 14h+，返回 *.github.io 通配符），最终靠 Cloudflare 橙云 + Universal SSL 兜底解决，GitHub Pages 红叉（NotServedByPagesError）在橙云架构下属预期可忽略。

## 变现（Amazon Associates 三件套已闭环）
- **联盟 ID**：`phtbyte-20`（Tracking ID，所有 Amazon 链接必须带 `?tag=phtbyte-20`）。
- **收款**：Payoneer USD 虚拟账户 direct deposit（Routing+Account Number），已连 Amazon。
- **税务**：W-8BEN 已提交（走「所有服务在美国境外执行」=非美来源收入 → 0% 预扣，有效期 3 年）。加拿大税务状况不完整不影响主站（仅影响 amazon.ca 预扣）。
- **180 天生死线**： Associates 要求注册后 180 天内产生 ≥3 笔有效订单（首单需在 90 天内），否则封号。当前倒计时进行中。
- **联盟平台边界（重要，避免踩坑）**：
  - **Amazon Associates** 只覆盖实体/电子书 → 书单/gear（键盘/鼠标/椅子等硬件）走它。
  - **Udemy/Coursera 课程**走 **Impact.com**（非 Amazon），一个 Impact 发布者账号可同时申两家；门槛：近 3 月 ≥500 月独立访客 + 活跃内容站（现阶段 0 流量申请必拒，等 4-5 篇 + 上线数周再接）。佣金一次性（Udemy 10-15%/7天、Coursera 15-45%/30天）。
  - **SaaS 工具**（#7 文）走 **PartnerStack/Awin**，独立于 Amazon，部分有 recurring 订阅佣金。
  - **合规铁律**：Amazon 链接价格**绝不写死**（"check current price via the link"）、每篇顶部挂 **FTC 披露**、JSON-LD Article 必填、`og:image` 必接。

## 内容管线（已固化为用户级技能 `phtbyte-content-pipeline`）
- 技能位置：`~/.workbuddy/skills/phtbyte-content-pipeline`（用户级，跨 workspace 可用），含 `references/article-template.md` + `scripts/gen-og.cjs`。
- **文章结构约定**：`articles/<slug>.html`；head 必含 canonical(https) + OG/Twitter（含 og:image）+ JSON-LD(Article, author=Haitao Pan)；正文 TL;DR → 各节（含 ≥2 张自绘 SVG `figure.diagram`）→ FTC 披露（affiliate 文）→ related-reads 内链（≥2 条，回已发文）。
- **OG 图**：`assets/og/gen-og.cjs` 用 **SVG 精确排版 → @resvg/resvg-js 栅格 1200×630 PNG**（AI 生图文字会糊，弃用；环境无 ImageMagick，`convert` 是 Windows 磁盘工具）。每篇 1 张，深色技术风品牌模板。改 `jobs` 数组加条目可幂等重渲全部。
- **视觉原则**：**不上 stock 图**（联盟站信任减分）；正文用 SVG 自绘（零托管、SEO 友好）；OG 图走 branded 深色排版。
- **发布同步项**：每篇需同步更新 `sitemap.xml`（加 `<url>`）+ `index.html` 列表（插新文）+ 检查 og:image/figure/内链/占位（`[Your Name]`/`href="#"`/`(Stub)` 必须清零）。
- **署名**：作者统一 **Haitao Pan**（与税务/Payoneer 一致，EEAT）。

## 已产内容（截至 2026-09-29，共 7 篇，#4/#5/#6/#7 待用户 git push）
1. `how-i-built-kubi.html` — kubi 案例（Cocos 3.8 微信小游戏架构/UI 网格/性能）
2. `cocos-vs-unity-vs-godot.html` — 引擎选型（首篇带 Amazon 书单联盟）
3. `cocos-web-game-i18n-guide.html` — i18n 完整指南（长尾）
4. `idle-loop-design.html` — idle 循环设计（长尾，无联盟）
5. `bundle-size-optimization.html` — 包体优化 60%（引擎分包 + PerfTier，长尾）
6. `best-mechanical-keyboards.html` — 机械键盘（**首篇真带 Amazon 实物联盟 gear 利润锚**，FTC+5 链接 phtbyte-20）
7. `indie-tools-2026.html` — 工具清单（蓝海，首篇 SaaS 联盟锚；PartnerStack/Awin 未注册，链接暂用官网直链 + FTC 标注"接入后回填"，非负 Amazon、无 tag=phtbyte-20）
- **下一篇 #8**：`(待定)`《10 Indie Games You Missed in 2026》→ 红海流量漏斗，内链回蓝海技术文（#2/#4/#9）。

## 用户协作偏好（跨项目）
- **不自动 git commit/push**：改动留本地，用户自己 review 后提交推送（用户显式要求时例外）。
- 指令简短、重执行效率；先明确范围再动手（what→how）；参考现有项目模式作 ground truth，保持命名/逻辑/结构一致。
