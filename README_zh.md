# Indie Game Lab —— 内容站出海 MVP 骨架

> 首发站（站1蓝海·游戏开发 + 站4红海·新游资讯 的融合 MVP），用真实游戏开发经历做 EEAT 护城河。

## 当前状态
纯静态 MVP（零依赖、双击 `index.html` 即可看）。已含：
- 首页 `index.html`（含 About/EEAT 区块、文章列表）
- 示例文章 `articles/how-i-built-kubi.html`（真实项目复盘，带 JSON-LD 结构化数据）
- `assets/style.css`（响应式、亮色、可读优先）
- `sitemap.xml` / `robots.txt`（SEO 基础）
- JSON-LD `WebSite` + `Article` 结构化数据（Google 富媒体摘要）

## ⚠️ 域名硬约束（变现前必须先解决）
- **`*.github.io` 免费子域不能用于变现站点**：它不归你所有，是 GitHub 的共享域名。
  - **Google AdSense 会直接拒**：2026 政策明确"free subdomains (blogspot/github.io) significantly reduce approval chances"，实测 github.io 子域 AdSense 被屏蔽（域名所有权不属于你）。广告变现这半边直接没戏。
  - **Amazon Associates 审核高风险**：2026 多家指南要求"Use a custom domain you control"，ownership test 中"free host you do not control can fail review"。技术可能过，但信任度低、易触发拒审——你 180 天 3 单已经够难，别自加风险。
  - **SEO/品牌弱**：子域不归你、品牌无沉淀，5 站组合也没法共用一个 github.io。
- ✅ **正确做法**：GitHub Pages 免费托管照用，但额外买一个**自己的域名**（Porkbun/Namecheap 注册 `.com` ≈ $10–11/年，Cloudflare 仅做免费 DNS/SSL），经 Cloudflare 指向 GitHub Pages，免费 HTTPS。
- ✅ **关键细节**：AdSense 拒的是"别人家的免费子域"；**你自己域名下的子域完全 OK**（如 `lab.yourdomain.com`）。所以 5 站组合 = 买 1 个域名 + 开 5 个子域，最省。
- `pht1991.github.io` 留作**开发预览/内部测试/原型展示**即可（sign-renderer、kubi-minigame 已在用），商业站点必须换自有域名。

## 下一步要做的（按优先级）
1. **买自有域名 + 部署**：Porkbun/Namecheap 注册 `.com`（≈$10–11/年）→ Cloudflare DNS 指向 GitHub Pages → 免费 HTTPS（详见 DOMAIN_SETUP.md）。
   部署后把全站 `your-domain.com` 替换成真实域名，并重新提交 sitemap。
   部署后把全站 `your-domain.com` 替换成真实域名，并重新提交 sitemap。
2. **Amazon Associates 注册**：把本站 URL 填进"网站 URL"字段（之前 Payoneer 的 URL 问题一并解决）。
   注意 **180 天 3 单生死线**——注册前就想好怎么出 3 单。
3. **内容管线**：用 AI 辅助写英文初稿 → 你用真实经历润色/补数据（EEAT 的关键）。
   每篇带 FTC 披露 + 不写死价格（锁 cookie）。
4. **Google Search Console**：提交 sitemap，等收录，3–6 月起量。
5. **流量起来后**：叠 Awin（外设/周边）+ PartnerStack（SaaS 复购）。

## 技术栈路线
- 当前：纯静态 HTML（零构建、立等可取、验证内容/SEO 流程）。
- 推荐升级：迁移到 **Astro**（静态输出、Lighthouse 满分、Markdown 原生、零运行时 JS）。
  迁移时**内容不变，只换壳**——把 `.html` 文章转成 `.md`，布局交给 Astro 组件。
- 为什么不直接上 Astro：先验证"内容能不能写、SEO 对不对"，再上构建链，避免早期被工具链卡住。

## 后续 5 站组合（红蓝都含，蓝海利润 ≥50%）
| # | 海 | 方向 | 你适配 |
|---|---|---|---|
| 1 | 蓝海 | 游戏开发/引擎教程 | 强（本站立项） |
| 2 | 蓝海 | 特定 hobby 深度评测 | 中 |
| 3 | 蓝海 | B2B SaaS 替代评测 | 中 |
| 4 | 红海 | 新游/独立游戏资讯 | 强（本站立项反哺） |
| 5 | 长尾 | 细分跨境小物评测 | 中 |

## 风险红线
- AIO 吞噬：蓝海占比不能低于 50%（红海易被 Google AI 摘要截流）。
- 内容同质化：每篇必须有真实经历/原创数据兜底，纯 AI 灌水 2025–26 被重拳。
- IP：本站内容用"原创独立游戏项目复盘"口径，不碰他人游戏的搬运/破解。
