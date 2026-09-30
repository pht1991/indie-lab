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
- **发布同步项**：每篇需同步更新 `sitemap.xml`（加 `<url>`）+ `index.html` 列表 + 检查 og:image/figure/内链/占位（`[Your Name]`/`href="#"`/`(Stub)` 必须清零）。
- **首页列表排序铁律（2026-09-29 定）**：**权威优先，非时间优先**。技术文（蓝海案例/拆解/教程）占前排立 EEAT；变现/购买指南文（#6 键盘、#7 工具）**一律垫底**（仍在首页+靠技术文内链导流，转化更高）；红海漏斗文（#8 indie games）插在权威文与变现文之间（漏斗引流，非变现，不放垫底）。当前顺序：kubi→引擎对比(#2)→包体(#5)→idle(#4)→i18n(#3)→indie games(#8)→工具(#7)→键盘(#6)。section 标题已从 `Latest Field Notes` 改为 `Field Notes`（避免"最新在上"预期）。新文按此规则插位，**不要按发布时间把变现文顶到前排**。
- **署名**：作者统一 **Haitao Pan**（与税务/Payoneer 一致，EEAT）。

## 已产内容（截至 2026-09-29，共 8 篇，#8 待用户 git push；#1~#7 已推）
1. `how-i-built-kubi.html` — kubi 案例（Cocos 3.8 微信小游戏架构/UI 网格/性能）
2. `cocos-vs-unity-vs-godot.html` — 引擎选型（首篇带 Amazon 书单联盟）
3. `cocos-web-game-i18n-guide.html` — i18n 完整指南（长尾）
4. `idle-loop-design.html` — idle 循环设计（长尾，无联盟）
5. `bundle-size-optimization.html` — 包体优化 60%（引擎分包 + PerfTier，长尾）
6. `best-mechanical-keyboards.html` — 机械键盘（**首篇真带 Amazon 实物联盟 gear 利润锚**，FTC+5 链接 phtbyte-20）
7. `indie-tools-2026.html` — 工具清单（蓝海，首篇 SaaS 联盟锚；PartnerStack/Awin 未注册，链接暂用官网直链 + FTC 标注"接入后回填"，非负 Amazon、无 tag=phtbyte-20）
8. `indie-games-2026.html` — 《7 Indie Games You Missed in 2026 (and What Devs Can Learn)》（**红海流量漏斗文**，无联盟，游戏名链接指向 Steam 搜索页非联盟；内链回 #2/#4/#5/#1 四篇蓝海，2 张 SVG：四课框架 + 漏斗路由图）
- **下一篇 #9**：蓝海长尾技术文（建议 Cocos 专项教程，或人设文补足 8 蓝+1 红+1 人设配比）。

## 子站变现接线（kubi.phtbyte.com / sign.phtbyte.com，2026-09-29 加）
- **目的**：两个 GitHub Pages 子站（Cocos 游戏、Three.js 招牌工具）面向海外用户，挂 Amazon US 联盟（`phtbyte-20`）+ Ko-fi / GitHub Sponsors 捐赠。观众是海外英文用户 → US 联盟对口，搜索页带 tag 链接可赚（24h cookie 内整单计佣）。
- **sign-renderer（Vite+React）**：新增 `src/AffiliateBanner.tsx`（底部横幅：3D打印机/4K显示器/绘图板 带 tag 搜索链接 + Ko-fi/Sponsors + FTC 行）、`public/about.html`、`public/privacy.html`（英文，填 AdSense thin-content 拒批坑）。App.tsx 引入横幅 + 顶部 About/Privacy 导航。
- **kubi-minigame（Cocos web）**：`web-extra/about.html`、`privacy.html`（游戏外设键盘/鼠标/耳机 带 tag 链接）、`nav.html`（顶部导航片段）、`inject-nav.ps1`（注入脚本）。`deploy-web.bat` 改：复制 about/privacy 到 gh-pages + powershell 注入顶部导航（防重部署 `git rm -rf` 冲掉 CNAME/导航）。
- **捐赠入口定为 Ko-fi**（`https://ko-fi.com/haitaopan`，真实 handle；GitHub Sponsors 按钮已删，AffiliateBanner 已改可折叠默认展开）。**Buy Me a Coffee 已试并弃**：BMC 2026 年提现全面 Stripe-only，官方支持国家无中国大陆，钱收了也锁死；勿再推荐。
- **打赏收款路径（大陆个人实测可行，待老板执行）**：PayPal 中国**个人**账户（勿选商业账户）→ Ko-fi 绑 PayPal → PayPal"关联美国银行账户"填 Payoneer 虚拟账户（~3%，若报"请检查你的信息"是 Citibank 号段被拦，找 Payoneer 客服改发 First Century Bank）→ Payoneer 结汇回国内卡（~1.2%）。
- **PayPal 绑 Payoneer 残坑（2026-09-30 查证）**：FCB 非 100% 必过。① 新账户常需 **等 5-7 天** PayPal 安全期，先等再判失败；② **绑定时必须关 VPN/代理、用国内 IP**，否则非常用 IP 触发风控；③ 仍被拦→打 PayPal 客服（400-921-1000 / 021-28913888）**人工协助，但绝口不提 Payoneer/P卡/派安盈**（两者竞争关系，一提客服不服务），只说"自己拿到/第三方签发的美国银行账户"；④ 极小概率 FCB 也不行，可让 Payoneer 客服改回 Community Federal Savings Bank 试（现难签发）。姓名顺序（PayPal 姓前 Pan Haitao / Payoneer 名前 Haitao Pan）非卡点，Payoneer 不验账户名。
- Amazon 链接均为带 `?tag=phtbyte-20` 的搜索页，价格不写死。

## 用户协作偏好（跨项目）
- **不自动 git commit/push**：改动留本地，用户自己 review 后提交推送（用户显式要求时例外）。
- 指令简短、重执行效率；先明确范围再动手（what→how）；参考现有项目模式作 ground truth，保持命名/逻辑/结构一致。
