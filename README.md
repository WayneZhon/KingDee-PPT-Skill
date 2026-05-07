<div align="center">

# 金蝶 PPT 生成 Skill

<p>
  <a href="https://www.npmjs.com/package/kingdee-ppt">
    <img src="https://img.shields.io/npm/v/kingdee-ppt?style=flat-square&color=2971EB" alt="npm version">
  </a>
  <a href="https://github.com/WayneZhon/KingDee-PPT-Skill">
    <img src="https://img.shields.io/badge/金蝶-PPT_Skill-2971EB?style=flat-square" alt="Kingdee PPT Skill">
  </a>
  <a href="https://claude.ai">
    <img src="https://img.shields.io/badge/Claude_Code-支持-432391?style=flat-square&logo=anthropic" alt="Claude Code">
  </a>
  <a href="https://github.com/WayneZhon/KingDee-PPT-Skill/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/WayneZhon/KingDee-PPT-Skill?style=flat-square" alt="License">
  </a>
</p>

**将文字、大纲、文档一键转换为金蝶官方风格 `.pptx` 或交互式 HTML 幻灯片**

完全复现金蝶国际软件集团 2026 版官方模板设计语言 · 支持双风格体系（Classic / Bento Motion）· 29 种版式 · 7 种思维模型自动识别 · 内嵌官方背景与 Logo · 零配置可用

</div>

---

## 核心能力

| 能力 | 说明 |
|------|------|
| **官方设计还原** | 品牌色 `#2971EB` · 字体 `Microsoft YaHei` · Logo · 背景图完全对齐 2026 版官方模板 |
| **双风格输出** | Classic（传统 PPT，支持 PPTX 导出）/ Bento Motion（纯白底 + Apple 滚动动效，科技发布风格） |
| **思维模型识别** | 自动识别内容结构，匹配金字塔、SWOT、PDCA、黄金圈、5W1H、SCQA、IPD五看 7 种思维框架 |
| **29 种智能版式** | 封面、目录、章节页、要点列表、数据卡片、对比、流程、时间轴、Bento 卡片、悬浮统计…… |
| **AI 品牌 Logo** | 自动识别内容中的 AI 品牌（DeepSeek、通义、文心等），通过 lobe-icons 嵌入官方 Logo |
| **多格式输入** | Markdown · 文本大纲 · Word 文档 · 直接粘贴内容均可 |
| **保密标识** | 自动添加「④ 内部公开 请勿外传」水印标识 |
| **自更新机制** | npm 包分发，自动检测新版本，一键升级 |

---

## 快速开始

### 安装

推荐通过 npm 全局安装，自动完成 Claude Code Skill 注册：

```bash
npm install -g kingdee-ppt
```

安装完成后，`~/.claude/skills/kingdee-ppt` 会自动链接到 npm 包目录，重启 Claude Code 即可生效。

**验证安装**

打开 Claude Code，输入：

```
帮我做个金蝶 PPT
```

若 Claude 开始询问输出格式（HTML / PPTX）和场景，说明 Skill 已成功加载。

---

## 使用示例

### 基础用法

```
帮我把以下内容做成金蝶风格的汇报材料：

## 2026 年 Skill 生态市场建设进展
- 已上线 Skill 数量：156 个
- 活跃 ISV 合作伙伴：48 家
- 平台调用量：月均 32 万次

## 下一步计划
- Q2 启动 Skill 认证体系
- 引入独立开发者激励计划
```

### 进阶用法（指定格式和场景）

```
将以下内容转换为金蝶风格 PPT，要求：
- 输出格式：PPTX 可编辑文件
- 场景：伙伴赋能
- 页数：中等（10-15 页）
- 图片：保留占位符
- 内容：请完整保留所有数据

[粘贴你的文档内容]
```

### 触发词参考

任何包含以下词语的句子都会自动激活 Skill：

> `做PPT` · `做个PPT` · `金蝶PPT` · `金蝶模板` · `生成幻灯片` · `汇报材料` · `演示文稿` · `生成deck` · `输出PPT` · `HTML幻灯片` · `交互式演示`

---

## 工作流说明

Skill 采用结构化流程，先让用户选择输出格式，再经过内容确认和视觉质检后交付：

```
┌─────────────────────────────────────────────────────────┐
│  Phase F  输出格式选择                                    │
│    询问 HTML 交互式演示 或 PPTX 可编辑文件                 │
├─────────────────────────────────────────────────────────┤
│  Phase 0  内容结构分析                                    │
│    逐页分析内容特征，自动匹配思维模型（金字塔/SWOT/PDCA等） │
├─────────────────────────────────────────────────────────┤
│  Phase 0.5  AI 品牌 Logo 识别（可选）                      │
│    识别 DeepSeek/通义/文心等品牌，自动嵌入 lobe-icons      │
├─────────────────────────────────────────────────────────┤
│  Phase 1  大纲+版式推荐                                   │
│    输出完整大纲，每页标注推荐版式及理由 → 用户确认           │
├─────────────────────────────────────────────────────────┤
│  Phase 2  内容脚本                                        │
│    输出逐页内容脚本（含排版指令）→ 用户审阅定稿              │
├─────────────────────────────────────────────────────────┤
│  Phase H  HTML 生成（核心输出）                            │
│    Classic：生成多文件 HTML deck，支持键盘/触摸导航         │
│    Bento Motion：生成单文件全页滚动 HTML，GSAP 动效         │
├─────────────────────────────────────────────────────────┤
│  Phase X  PPTX 导出（仅当用户选择 PPTX 时）                 │
│    按 html2pptx.js 硬约束导出真文本框可编辑 PPTX            │
└─────────────────────────────────────────────────────────┘
```

### 双风格体系对比

| 维度 | Classic（默认）| Bento Motion（科技感）|
|------|---------------|---------------------|
| **背景** | 冰蓝底/渐变封面 | 纯白 `#FFFFFF` |
| **动效** | Intersection Observer fade | GSAP ScrollTrigger（Apple 式）|
| **PPTX 导出** | **支持** | **不支持**（走 PDF）|
| **适用场景** | 正式汇报、领导层、政府客户 | 产品发布、科技受众、创新展示 |

---

## 支持场景与页数

| 场景 | 典型用途 | 建议页数 | 偏好版式 |
|------|---------|---------|---------|
| **内部汇报** | 向上级汇报工作进展、述职 | 短（5-10 页） | 悬浮统计、对比栏、PDCA/金字塔 |
| **伙伴赋能** | ISV / OEM / 开发者培训材料 | 中（10-20 页） | 架构图、SWOT/黄金圈 |
| **客户大会** | 对外客户演示、合作发布 | 中（10-20 页） | IPD五看、黄金圈/SCQA |
| **方案提案** | 项目立项、解决方案建议书 | 长（20 页+） | SCQA/5W1H、对比栏 |

---

## 支持版式

**标准版式（22 种）**

封面页 · 目录页 · 章节分隔页 · 要点列表 · 数据卡片 · 左右对比 · 横向流程 · 纵向流程 · 图文并排 · 时间轴 · 引用语录 · Bento 卡片 · 悬浮统计 · 图标行 · 半出血叠加 · 架构图 · 结尾致谢……

**思维模型版式（7 种）**

| 模型 | 结构 | 适用场景 |
|------|------|---------|
| 金字塔 / MECE | 结论 → 分论点 → 论据 | 战略解读、融资路演、汇报 |
| PDCA | 计划 → 执行 → 检查 → 改进 | 复盘、述职、质量管理 |
| SWOT | 优势/劣势 × 机会/威胁 | 生态策略、竞争分析 |
| 黄金圈 | WHY → HOW → WHAT | 产品发布、品牌故事 |
| 5W1H | Who/When/What/Where/Why/How | 方案说明、项目计划 |
| SCQA | 场景 → 冲突 → 问题 → 解决 | 提案、客户大会 |
| IPD五看 | 看行业/客户/机会/竞争/自己 | 战略发布、市场分析 |

---

## 品牌色规范

| 颜色 | 色值 | 用途 |
|------|------|------|
| 科技蓝（主蓝） | `#2971EB` | 核心结论、首要模块、标题强调 |
| 亮天蓝（品青） | `#22AAFE` | 执行流程、方法层、次级信息 |
| 章节青 | `#00CCFE` | 章节页装饰横线（专用） |
| 深紫蓝（藏青） | `#28245F` | 强对比文字块、深色强调 |
| 橙黄 | `#FFB61A` | 强调要素、警示信息、分论点 |
| 绿松石青 | `#05C8C8` | 增长正面、机会 |
| 薰衣草紫 | `#966EFF` | 挑战冲突、威胁风险 |
| 冰蓝 | `#E7F1FF` | 二级信息底色、卡片背景 |

> 严格禁止使用红色 `#E8210A` 及任何不在官方色盘中的颜色。

---

## 自更新机制

安装后，每次触发 Skill 会自动检查 npm registry 是否有新版本：

```bash
# 检查更新
kingdee-ppt-update-check

# 执行升级
kingdee-ppt-upgrade
```

- **自动提示**：Claude 检测到新版本时会在对话中提示用户
- **缓存策略**：最新版本缓存 60 分钟，有更新时缓存 720 分钟
- **Snooze**：用户可选择「稍后提醒」，支持 24h / 48h / 7d 三级延迟
- **禁用检查**：设置环境变量 `KINGDEE_PPT_UPDATE_CHECK=false` 即可关闭

---

## 仓库结构

```
kingdee-ppt/
├── SKILL.md                     # Skill 主配置（触发规则 + 完整工作流）
├── VERSION                      # 当前版本号（自更新检查依据）
├── package.json                 # npm 包配置
├── Changelog                    # 版本变更日志
├── README.md                    # 本文件
├── LICENSE                      # MIT 许可证
│
├── bin/                         # CLI 工具
│   ├── kingdee-ppt-update-check  # 版本检查脚本
│   └── kingdee-ppt-upgrade       # 升级脚本
│
├── scripts/                     # 构建与安装脚本
│   ├── postinstall.sh           # npm install 后自动链接 skill
│   ├── export_deck_pptx.mjs     # HTML → PPTX 导出器
│   └── html2pptx.js             # PPTX 导出核心逻辑
│
├── build_pptx.js                # PptxGenJS 直接构建脚本
├── build_codex.js               # Codex CLI 集成构建脚本
│
├── design-tokens.md             # 设计变量常量（颜色/圆角/阴影/间距）
├── style-guide.md               # 金蝶品牌视觉规范
├── layout-schema.md             # 版式参数命名规范
├── rhythm-templates.md          # 节奏模板（页面组合预设）
│
├── layout-base.md               # 通用辅助函数
├── layout-fixed.md              # 固定版式（封面/目录/章节/结尾）
├── layout-content.md            # 内容版式（要点/数据/对比/流程/图文/时间轴）
├── layout-advanced.md           # 高级版式（数据看板/Bento/架构/特性/矩阵/金句/沉浸/焦点）
├── layout-models.md             # 思维模型版式（金字塔/PDCA/SWOT/黄金圈/5W1H/SCQA/IPD）
├── layout-special.md            # 特殊版式（图标行/半出血/悬浮统计/对比栏）
│
├── html-kingdee-*.md            # Classic 风格 HTML 组件文档
├── html-bento-*.md              # Bento Motion 风格组件文档
│
├── pptx-builder.md              # 构建流程规范（资源加载/QA清单）
├── anti-ai-slop.md              # Anti AI-slop 设计规则
│
├── references/
│   └── ai-brand-logos.md        # AI 品牌 Logo 映射表（lobe-icons slug）
│
└── assets/                      # 内嵌资源文件
    ├── bg_cover.jpeg            # 封面背景
    ├── bg_toc.png               # 目录页背景
    ├── bg_section_a/b/c.jpeg    # 章节页背景（三色版）
    ├── bg_closing.jpeg          # 结尾页背景
    ├── closing_thanks.png       # 多语言致谢图
    ├── logo_color.png           # 金蝶彩色 Logo
    └── logo_white.png           # 金蝶反白 Logo
```

---

## 常见问题

<details>
<summary><b>Q1：生成的 PPT 可以在 PowerPoint / WPS 中编辑吗？</b></summary>

可以。选择 PPTX 输出格式时，导出的 `.pptx` 完全兼容 Microsoft PowerPoint、WPS Office、Apple Keynote 等主流软件，所有文本框均可二次编辑。
</details>

<details>
<summary><b>Q2：HTML 交互式演示和 PPTX 有什么区别？</b></summary>

| 对比项 | HTML 交互式演示 | PPTX 可编辑文件 |
|--------|----------------|----------------|
| 文件格式 | `.html`（浏览器打开） | `.pptx`（PowerPoint 打开） |
| 动画效果 | 支持 CSS/JS 动画、键盘/触摸导航 | 静态页面 |
| 在线分享 | 可部署 Vercel，生成在线 URL | 需邮件/网盘传输 |
| 二次编辑 | 需修改 HTML 源码 | 直接在 PowerPoint 中编辑 |
| 离线演示 | 需提前打开网页 | 无需网络 |

选择建议：需要在线演示或部署 → HTML；需要发给领导二次修改 → PPTX。
</details>

<details>
<summary><b>Q3：思维模型版式如何触发？</b></summary>

自动识别：当内容中出现「结论先行」「PDCA」「SWOT」等关键词，或内容结构明显符合模型特征时，会自动匹配对应版式。

手动指定：在提示词中明确说明「请用 SWOT 版式」或「按金字塔结构呈现」。
</details>

<details>
<summary><b>Q4：如何更新到最新版本？</b></summary>

```bash
# 方式一：一键升级（推荐）
kingdee-ppt-upgrade

# 方式二：npm 直接更新
npm install -g kingdee-ppt@latest
```

升级后自动更新 `~/.claude/skills/kingdee-ppt` 链接，无需手动操作。
</details>

<details>
<summary><b>Q5：如何关闭自动更新检查？</b></summary>

设置环境变量：

```bash
export KINGDEE_PPT_UPDATE_CHECK=false
```

或在 `~/.zshrc` / `~/.bashrc` 中持久化配置。
</details>

---

## 版本历史

详见 [Changelog](Changelog)。

---

## 贡献指南

欢迎通过 Issue 和 Pull Request 改进这个项目。

```bash
# 1. Fork 本仓库
# 2. 创建分支
git checkout -b feature/your-feature

# 3. 提交改动
git commit -m 'feat: 新增 xxx 功能'

# 4. 推送并发起 PR
git push origin feature/your-feature
```

**可贡献的方向：**
- 新增版式模板
- 支持更多思维模型
- 提升版式自动识别准确率
- 完善多平台使用文档

---

## 许可证

本项目采用 [MIT 许可证](LICENSE)，可自由使用、修改和分发。

---

<div align="center">

**作者：钟伟纯（Wayne Zhong）**

金蝶国际软件集团 · 苍穹平台 · AI平台生态产品部

[📧 weichun_zhong@kingdee.com](mailto:weichun_zhong@kingdee.com) · [🐛 提交反馈](https://github.com/WayneZhon/KingDee-PPT-Skill/issues)

---

*让你的金蝶演示文稿更专业、更高效*

</div>
