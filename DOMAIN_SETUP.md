# 域名选购 + Cloudflare 解析 + GitHub Pages 绑定 · 傻瓜步骤清单

> 目标：把 `indie-game-lab` 这套静态站挂到**你自己买的域名**上（GitHub Pages 免费托管 + Cloudflare 免费 HTTPS）。
> 为什么不直接用 `pht1991.github.io`：见 README「⚠️ 域名硬约束」——免费子域 AdSense 屏蔽、Amazon Associates 拒审、SEO 弱。
> 成本：域名 ≈ $10/年（Cloudflare Registrar 成本价），DNS/SSL/CDN 全免费。

---

## 第 0 步：先想好域名（5 分钟）

去 **Porkbun**（porkbun.com）或 **Namecheap**（namecheap.com）搜一下，挑一个能注册的。

> ⚠️ **为什么不在 Cloudflare 买**：Cloudflare Registrar 的"新域名注册"是受限 beta——多数账户只给"转入"、不给"注册"，且要求账户里已有域名在 Cloudflare 管理 DNS 满 1 周以上才解锁。新手直接去 Porkbun/Namecheap（.com ≈$10–11/年，与 Cloudflare 成本价几乎一致）更顺。**Cloudflare 仍负责免费 DNS + HTTPS**，只是不在那买域名。

**实测可注册候选（2026-09-28 用 Verisign RDAP 探测 35 个，以下 5 个 .com 真实 `AVAILABLE`）：**
| 候选 | 风格 | 适配 |
|---|---|---|
| ✅ `phtforge.com` | pht + **forge（锻造/创造）** | **首选推荐**：开发者"创造"身份契合，中性不锁游戏，5 站子域统一品牌 |
| ✅ `phtmedia.com` | pht + media | 中性媒体感，内容站矩阵契合 |
| ✅ `phtbyte.com` | pht + byte | 极客技术感 |
| ✅ `phtpost.com` | pht + post | 文章/发布感 |
| ✅ `quarkpost.com` | 通用科技词 | 独立品牌（不绑 pht handle） |

> 之前给的 `phtlabs/phtlab/northlabs/signalpost/quillpost/brightlab/nimbuslab` 等已被占或溢价，已剔除。
> 选 `.com` 最稳（AdSense/Associates 信任度最高）。**一旦选定，下面所有 `你的域名.com` 都替换成它。**
>
> ✅ **已定域名：`phtbyte.com`**（Porkbun 已购，站点文件占位已全局替换为 `phtbyte.com`）。子域规划即 `lab.phtbyte.com` / `gear.phtbyte.com` / `saas.phtbyte.com` / `news.phtbyte.com` / `deals.phtbyte.com`。

### 子域规划（5 站组合挂在 1 个域名下，互不撞品类）
| 子域 | 垂直 | 海 |
|---|---|---|
| `lab.你的域名.com` | 游戏开发/引擎教程（你的 unfair advantage） | 蓝海 |
| `gear.你的域名.com` | 特定 hobby 深度评测 | 蓝海 |
| `saas.你的域名.com` | B2B SaaS 替代评测 | 蓝海 |
| `news.你的域名.com` | 新游/独立游戏资讯（反哺自有游戏） | 红海 |
| `deals.你的域名.com` | 长尾跨境小物评测 | 长尾 |

> 的好处：1 个域名钱（≈$10/年）养 5 站，品牌统一，AdSense/Associates 各子域分别登记即可。

---

## 注册商选择：国内 vs 海外（重要澄清）

> 老板问过："国内平台买域名，国外能访问吗？" —— 答：**能**，但要注意下面 3 件事。

**1. 国外能访问吗？能。** 域名是全球通用的，`.com` 在哪买都一样全球解析。海外能不能打开只取决于两样：DNS 在哪解析（用 Cloudflare 就全球快）+ 主机在哪（GitHub Pages 在海外）。

**2. 备案：主机在海外就不需要，跟"在哪买域名"无关。**
- 工信部规定 **ICP 备案只看服务器物理位置（是否在中国大陆）**，不看域名注册地。本方案主机走 GitHub Pages / Cloudflare / Vercel（全在海外）→ **依法不需要备案**。
- 网上"国内买的域名不管服务器在哪都要备案"的说法，多出自主机商（阿里云/腾讯云系文章）为推"注册+主机打包"的模糊话术，**不是法律原文**。
- 唯一实际麻烦：个别国内注册商内部风控可能要求备案才给解析。破解法见第 3 步——**把 nameserver 改到 Cloudflare**，绕开注册商自带 DNS 限制即可。

**3. 实名认证：这是国内平台独有的真麻烦。**
- 通过国内注册商（阿里云/腾讯云/新网）买 `.com`，CNNIC 规定**强制实名**——要传身份证，几天内不过会被 `ServerHold` 暂停解析。
- 海外平台（Porkbun/Namecheap）注册 `.com` **不需要中国实名**，只要 ICANN WHOIS 信息真实即可。

| 维度 | 国内（阿里云/腾讯云） | 海外（Porkbun/Namecheap） |
|---|---|---|
| 国外访问 | ✅ 能（DNS 走 Cloudflare 即可） | ✅ 能 |
| ICP 备案 | 主机在海外→不需要 | 不需要 |
| 实名认证 | ⚠️ 强制中国身份证（CNNIC，长期绑定） | ⚠️ 一般不需中国实名；但 Porkbun 2026 起对**部分新账户（含中国地区信号）选择性要求 Veriff 照片证件验证**——属反欺诈 KYC，**非中国实名**，资料仅留 15 天即删。**被拒应对（三步）**：① 换**身份证**重试（护照反光膜难拍；手机现拍、光线均匀、四角完整、摘眼镜、姓名拼音与账户一致、禁 VPN）→ ② 仍拒则邮件申诉 `support@porkbun.com`（说明 declined in error 请求人工复核）→ ③ 不想耗则 Delete My Account 干净退出（无域名无余额零损失），换 **Namesilo**（风控最松、支持支付宝、几乎不查证件）。Veriff 会话 7 天时效，别无脑重试 |
| 付款 | 支付宝/微信，方便 | 双币信用卡/PayPal |
| 客服/语言 | 中文 | 英文 |
| AdSense/Associates 过审 | ✅ 自有域名即可 | ✅ 自有域名即可 |

**选型建议**：两种都行。本方案本来就要用 Cloudflare 管 DNS，所以注册商选哪家差别不大——
- 想**省事、避开中国实名、不想跟备案扯关系** → 海外（Porkbun/Namecheap/Namesilo，第 1 步默认走这条）。**若 Porkbun 弹出 Veriff 证件验证**：属一次性反欺诈核验（资料 15 天删除），不是中国实名。**被拒了按三步走**：换身份证重试 → 邮件申诉 Porkbun → 删号换 Namesilo（详见上表实名认证格）。
- 想**支付宝付款、中文客服** → 国内也完全 OK，但必须做实名（身份证长期绑定 CNNIC），且第 3 步务必把 nameserver 改到 Cloudflare 绕开国内解析限制。

> 出海用 `.com`，别用 `.cn`：`.cn` 强制中国实名+与中国管辖权绑定，海外信任度/解析不如 `.com`。

---

## 第 1 步：在 Porkbun / Namecheap 注册域名（10 分钟）

> Cloudflare 只做免费 DNS/SSL（第 3 步），域名在下面任一家注册商买即可。

1. 打开 https://porkbun.com （或 https://namecheap.com）→ 搜索第 0 步定下的候选。
2. 选 `.com`（首选）→ 加入购物车 → 结算（Porkbun 支持国内信用卡/支付宝；Namecheap 支持信用卡/ Payoneer）。
3. 买完**默认用注册商自带 DNS 即可**，先不用改 nameserver（第 3 步再指到 Cloudflare）。
4. 记下登录账号——后续要回来改 DNS / 开隐私保护（Porkbun/Namecheap 都送免费 WHOIS 隐私）。
5. 等状态变 `Active`（通常即时或几分钟）。

> 价格参考（2026）：Porkbun $10.98/年、Namecheap ≈$10–12/年、Cloudflare 成本价 $9.15/年（但有 1 周门槛+beta 限制，不推荐新手走）。三家价格基本持平，选顺手的。

---

## 第 2 步：建 GitHub 仓库并推站点（10 分钟）

> 当前站点是本地 `D:\Projects\demos\front_end\indie-game-lab` 的纯静态文件，要推到 GitHub 才能用 Pages 托管。
> 仓库已定：**`https://github.com/pht1991/indie-lab.git`**（Public）。**本地已 `git init` 并连好 `origin`、默认分支已改为 `master`、且已生成 `CNAME`(phtbyte.com) 与 `.nojekyll`**——你只需 commit + push 即可。

1. 仓库已在 GitHub 建好（`pht1991/indie-lab`，**Public**）。若还没建，去 New repository 建同名空仓库即可（不要勾 README/.gitignore，避免首次 push 冲突）。
2. 在你机器上提交并推送（**按你的规矩，这一步由你执行**）：
   ```bash
   cd D:\Projects\demos\front_end\indie-lab
   git add .
   git commit -m "init static site for phtbyte.com"
   git push -u origin master
   ```
   > 若 GitHub 仓库已含 README 导致 push 被拒：先 `git pull origin main --rebase` 再 push；或强推（仅空仓库时）`git push -u origin main --force`。
3. 仓库 → **Settings → Pages** → Build and deployment：**Deploy from a branch** → 选 `master` / `(root)` → Save。
4. 等 1–2 分钟，GitHub 会给临时地址 `https://pht1991.github.io/indie-lab/`（先验证站点能打开，再走第 3 步绑域名）。

---

## 第 3 步：Cloudflare DNS 解析（5 分钟）

> ⚠️ **先做第 3.0 步（改 nameserver），否则第 3.1 步配的所有记录都不生效！**
> 2026-09-28 实测踩坑：Cloudflare 里配好了记录，但域名 NS 还指着 Porkbun，全网解析都走 Porkbun 停放页（207.207.210.x），GitHub 报 `NotServedByPagesError`。

### 第 3.0 步：把 nameserver 从 Porkbun 切到 Cloudflare（关键，10 分钟）

1. 打开 **dash.cloudflare.com** → 确认 `phtbyte.com` 站点已添加（Free 计划即可）→ 进该域名 **Overview 页**，底部 **"Cloudflare Nameservers"** 会显示分配给你的 **2 个 NS**，形如：
   ```
   xxx.ns.cloudflare.com
   yyy.ns.cloudflare.com
   ```
   （每人分配的不一样，**以你后台显示的为准**，抄下来。）
2. 登录 **Porkbun** → **Domain Management** → 点 `phtbyte.com` → 找到 **Nameservers** 区块 → **Edit** → 选 **Custom Nameservers**（或 "Use custom nameservers"）→ 把 Cloudflare 那 2 个 NS 填进去，删掉 porkbun 默认的 4 个（curitiba/fortaleza/maceio/salvador.ns.porkbun.com）→ Save。
   - ⚠️ 改完 NS 后，Porkbun 自带的停放页/邮件转发功能即失效（本来就要删，正好）。
3. 等生效（通常 10 分钟 ~ 1 小时，最长 24h）。**验证方法**（本机 cmd/Git Bash）：
   ```
   nslookup -type=NS phtbyte.com 1.1.1.1
   ```
   返回 `xxx.ns.cloudflare.com` 两行 = 切换成功；还返回 `*.ns.porkbun.com` = 没生效，继续等。
   再 `nslookup phtbyte.com 1.1.1.1` 确认 A 记录变成 `185.199.108~111.153`。
4. 切换成功后，回 GitHub Pages 点 **Check again** → `DNS check successful`。

### 第 3.1 步：Cloudflare 里配记录（NS 切换后再配/核对）

进 dash.cloudflare.com → 选你的域名 → **DNS → Records** → 加以下记录：

**A. 裸域名（apex，`你的域名.com`）—— 4 条 A 记录：**
| Type | Name | Content | Proxy |
|---|---|---|---|
| A | `@` | `185.199.108.153` | DNS only（灰云） |
| A | `@` | `185.199.109.153` | DNS only（灰云） |
| A | `@` | `185.199.110.153` | DNS only（灰云） |
| A | `@` | `185.199.111.153` | DNS only（灰云） |

**B. www 子域 —— 1 条 CNAME：**
| Type | Name | Content | Proxy |
|---|---|---|---|
| CNAME | `www` | `pht1991.github.io` | DNS only（灰云） |

> ⚠️ **初期 Proxy 保持「灰云 / DNS only」**，等 GitHub 验证通过后再开橙云（CDN 加速）。
> ⚠️ CNAME 的 Content **只填 `pht1991.github.io`，不要带 `/indie-game-lab` 路径**——GitHub 靠仓库里的 CNAME 文件自己解析到具体仓库。

---

## 第 4 步：GitHub Pages 绑定自定义域名（5 分钟）

1. 仓库根目录新建文件 **`CNAME`**（无扩展名），内容只有一行：
   ```
   你的域名.com
   ```
   提交推送。
2. 仓库 → **Settings → Pages** → Custom domain 填 `你的域名.com` → Save。
3. 等状态变 **`DNS check successful`**（几分钟到几小时）。
4. 勾选 **Enforce HTTPS**（出现后立刻勾，强制全站 HTTPS，AdSense 硬性要求）。

---

## 第 5 步：Cloudflare SSL 模式（关键，1 分钟）

dash.cloudflare.com → 你的域名 → **SSL/TLS → Overview** → 加密模式选 **Full**（**绝不要 Flexible**）。

> Flexible 会让 Cloudflare 用 HTTP 回源 GitHub，而 GitHub 强制 HTTPS → 无限重定向死循环。选 **Full** 即可。

验证通过后（第 4 步成功），可回 DNS 把灰云点成橙云（开 CDN/防火墙），不影响。

---

## 第 6 步：替换站点内占位域名（2 分钟）

把全站 `your-domain.com` 占位换成真实域名。涉及文件：
- `index.html`（canonical、OG url、JSON-LD）
- `articles/how-i-built-kubi.html`（canonical、OG url、JSON-LD）
- `sitemap.xml`（`loc` 域名）
- `robots.txt`（sitemap 地址）

> 定了真实域名后，全局替换这些文件里的 `your-domain.com` 即可（已为 `phtbyte.com` 执行过）。

---

## 第 7 步：验证清单 ✅

- [ ] 浏览器开 `https://你的域名.com` → 显示站点、地址栏有小锁
- [ ] 开 `http://你的域名.com` → 自动跳 `https`
- [ ] 开 `https://www.你的域名.com` → 也能访问（CNAME 生效）
- [ ] Google Search Console 提交 `https://你的域名.com/sitemap.xml`
- [ ] Amazon Associates 注册时"网站 URL"填 `https://你的域名.com`

---

## 常见坑（踩过一次就懂）

1. **AdSense 用 github.io 必死** → 必须自有域名（本清单前提）。
2. **SSL 选了 Flexible 导致重定向死循环** → 改 Full。
3. **CNAME 文件漏了** → GitHub 会每隔段时间把 Custom domain 清空，必须仓库里有 `CNAME` 文件长期留存。
4. **初期 Proxy 开橙云导致 GitHub DNS 验证失败** → 先灰云，验证过再橙云。
5. **A 记录填成带路径** → A 记录只能填 IP，不能填 `pht1991.github.io/xxx`。
6. **Enforce HTTPS 不出现** → 等 DNS 完全传播（最多 24h），或清 DNS 缓存再看。
7. **Porkbun 买的域名把 DNS 托管到 Cloudflare 后，导入会带进一批遗留记录，必须清理**（2026-09-28 实测）：
   - ❌ 删 `*.phtbyte.com` CNAME → `uixie.porkbun.com`（Porkbun 停放页通配符，会劫持以后所有子域如 `lab.`/`news.` 跳到停放页）
   - ❌ 删 2 条 MX（`fwd1/fwd2.porkbun.com`）+ SPF TXT（`v=spf1 include:_spf.porkbun...`）——都是 Porkbun 邮件转发的；**除非你要用 `xxx@phtbyte.com` 收邮件转发，否则全删**（以后想要再加回来即可）
   - ❌ 删 2 条 `_acme-challenge` TXT（Porkbun 验证遗留，Cloudflare/GitHub 各自发证书用不到它）
   - ✅ 保留 4 条 A（185.199.108~111.153）+ `www` CNAME（`pht1991.github.io`），但**代理状态点回「仅 DNS / 灰云」**——初期橙云会让 GitHub 的 DNS check 失败（GitHub 查到的全是 Cloudflare IP，无法确认归属），验证通过后再开橙云加速
8. **Cloudflare 配好记录但 GitHub 仍报 `NotServedByPagesError`（2026-09-28 实测踩坑）** → 根因是 **nameserver 没从 Porkbun 切到 Cloudflare**：Cloudflare 里的记录只是"准备好的答案"，但全网问域名的还是 Porkbun 的 DNS（答的是停放页 207.207.210.x）。**先用 `nslookup -type=NS 域名 1.1.1.1` 查 NS 指向**，是 `*.ns.porkbun.com` 就按第 3.0 步切换到 Cloudflare 分配的 2 个 NS，等生效再 Check again。

---

## 多站组合复用（5 站规划）

5 站 = **1 个域名 + 5 个子域**（如 `lab.你的域名.com`、`saas.你的域名.com`），全挂同一套 Cloudflare DNS + GitHub Pages：
- 每个子域加 1 条 **CNAME**（`lab` → `pht1991.github.io`），各自仓库放对应 `CNAME` 文件。
- AdSense / Amazon Associates 把每个子域 URL 分别登记即可。
- 这样只花 1 个域名的钱（≈$10/年），5 站共享。
