<div align="center">

# 🏢 金蝶 PPT 生成 Skill

<p>
  <a href="https://github.com/WayneZhon/KingDee-PPT-Skill">
    <img src="https://img.shields.io/badge/金蝶-PPT_Skill-2971EB?style=flat-square" alt="Kingdee PPT Skill">
  </a>
  <a href="https://claude.ai">
    <img src="https://img.shields.io/badge/Claude_Code-支持-432391?style=flat-square&logo=anthropic" alt="Claude Code">
  </a>
  <a href="https://github.com/WayneZhon/KingDee-PPT-Skill/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/WayneZhon/KingDee-PPT-Skill?style=flat-square" alt="License">
  </a>
  <a href="https://github.com/WayneZhon/KingDee-PPT-Skill/stargazers">
    <img src="https://img.shields.io/github/stars/WayneZhon/KingDee-PPT-Skill?style=flat-square&color=FFB61A" alt="Stars">
  </a>
</p>

**将文字、大纲、文档一键转换为金蝶官方风格 `.pptx` 幻灯片**

完全复现金蝶国际软件集团 2026 版官方模板设计语言 · 支持 29 种版式 · 6 种思维模型自动识别 · 内嵌官方背景与 Logo · 零配置可用

</div>

---

## ✨ 核心能力

| 能力 | 说明 |
|------|------|
| 🎨 **官方设计还原** | 品牌色 `#2971EB` · 字体 `Microsoft YaHei` · Logo · 背景图完全对齐 2026 版官方模板 |
| 🧠 **思维模型识别** | 自动识别内容结构，匹配金字塔、SWOT、PDCA、黄金圈、5W1H、SCQA、IPD五看 7 种思维框架 |
| 📐 **29 种智能版式** | 封面、目录、章节页、要点列表、数据卡片、对比、流程、时间轴、Bento 卡片、悬浮统计…… |
| 🤖 **AI 品牌 Logo** | 自动识别内容中的 AI 品牌（DeepSeek、通义、文心等），通过 lobe-icons 嵌入官方 Logo |
| 📄 **多格式输入** | Markdown · 文本大纲 · Word 文档 · 直接粘贴内容均可 |
| 🔐 **保密标识** | 自动添加「④ 内部公开 请勿外传」水印标识 |
| ✅ **视觉 QA** | 生成后自动转图检查，对齐问题自动修复再交付 |

---

## 🚀 快速开始

### 平台支持

| 平台 | 支持方式 | 推荐程度 |
|------|---------|---------|
| [Claude Code](#-方式一claude-code) | 原生 `.skill` 文件，完整工作流 | ⭐⭐⭐ 首选 |
| [通义灵码 / Cursor / Windsurf](#-方式二其他-ai-ide) | 导入 Prompt 模板，核心功能可用 | ⭐⭐ 推荐 |

---

## 📦 安装方法

### 🔷 方式一：Claude Code

Claude Code 支持原生 Skill，体验最完整，**推荐使用此方式**。

**方法 A — Git 克隆（推荐）**

```bash
# 1. 进入 Claude Code 的 skills 目录
cd ~/.claude/skills/

# 2. 克隆仓库
git clone https://github.com/WayneZhon/KingDee-PPT-Skill.git kingdee-ppt

# 3. 重启 Claude Code 即可生效
```

**方法 B — 一键脚本**

```bash
curl -L https://github.com/WayneZhon/KingDee-PPT-Skill/archive/refs/heads/main.zip \
  | unzip - -d ~/.claude/skills/ && \
  mv ~/.claude/skills/KingDee-PPT-Skill-main ~/.claude/skills/kingdee-ppt
```

**验证安装**

打开 Claude Code，输入：

```
帮我做个金蝶 PPT
```

若 Claude 开始询问场景和页数，说明 Skill 已成功加载 ✅

---

### 🟠 方式二：其他 AI IDE

将 Skill 内容作为自定义指令导入。

**步骤 1 — 获取源文件**

```bash
git clone https://github.com/WayneZhon/KingDee-PPT-Skill.git
```

或直接 [下载 ZIP](https://github.com/WayneZhon/KingDee-PPT-Skill/archive/refs/heads/main.zip)

**步骤 2 — 导入自定义指令**

1. 打开你的 AI IDE（通义灵码 / Cursor / Windsurf）
2. 进入设置 → 自定义指令 / 规则文件
3. 将 `SKILL.md` 的内容复制粘贴进去
4. 保存并命名

**步骤 3 — 使用**

在对话框中触发：

```
帮我把以下内容整理成金蝶风格的汇报材料：
[你的内容]
```

> ⚠️ **注意**：非 Claude Code 方式不支持自动执行 Node.js 脚本生成 `.pptx`，需将生成的代码手动在本地运行。

---

## 💬 使用示例

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

### 进阶用法（指定场景和要求）

```
将以下内容转换为金蝶风格 PPT，要求：
- 场景：伙伴赋能
- 页数：中等（10-15 页）
- 图片：保留占位符
- 内容：请完整保留所有数据

[粘贴你的文档内容]
```

### 触发词参考

任何包含以下词语的句子都会自动激活 Skill：

> `做PPT` · `做个PPT` · `金蝶PPT` · `金蝶模板` · `生成幻灯片` · `汇报材料` · `演示文稿` · `生成deck` · `输出PPT`

---

## 🎬 工作流说明

Skill 采用四阶段结构化流程，确保每次输出都经过内容确认和视觉质检：

```
┌─────────────────────────────────────────────────────────┐
│  第零阶段  思维模型识别                                    │
│    扫描内容结构信号，自动匹配金字塔/SWOT/PDCA等模型          │
├─────────────────────────────────────────────────────────┤
│  第零点五阶段  AI 品牌 Logo 识别                           │
│    识别 DeepSeek/通义/文心等品牌，自动嵌入 lobe-icons      │
├─────────────────────────────────────────────────────────┤
│  第一阶段  内容发现                                        │
│    询问场景 / 页数 / 图片处理方式 → 生成大纲 → 用户确认       │
├─────────────────────────────────────────────────────────┤
│  第二阶段  内容脚本                                        │
│    输出逐页内容脚本（含模型排版指令）→ 用户审阅定稿            │
├─────────────────────────────────────────────────────────┤
│  第三阶段  生成交付                                        │
│    生成 Node.js 脚本 → 执行 → 转图 QA → 修复 → 交付 .pptx  │
└─────────────────────────────────────────────────────────┘
```

---

## 🗂️ 支持场景与页数

| 场景 | 典型用途 | 建议页数 | 偏好版式 |
|------|---------|---------|---------|
| **内部汇报** | 向上级汇报工作进展、述职 | 短（5-10 页） | 悬浮统计、对比栏、PDCA/金字塔 |
| **伙伴赋能** | ISV / OEM / 开发者培训材料 | 中（10-20 页） | 架构图、SWOT/黄金圈 |
| **客户大会** | 对外客户演示、合作发布 | 中（10-20 页） | IPD五看、黄金圈/SCQA |
| **方案提案** | 项目立项、解决方案建议书 | 长（20 页+） | SCQA/5W1H、对比栏 |

---

## 🎨 支持版式

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

## 🏷️ 品牌色规范

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

> ⚠️ 严格禁止使用红色 `#E8210A` 及任何不在官方色盘中的颜色。

---

## 📁 仓库结构

```
kingdee-ppt/
├── SKILL.md               # Skill 主配置（触发规则 + 完整工作流）
├── style-guide.md         # 金蝶品牌视觉规范（颜色、字体、坐标、Logo）
├── layout-presets.md      # 29 种版式 PptxGenJS 代码模板
├── pptx-builder.md        # 技术构建文档（QA 规范、常见陷阱）
├── references/            # 参考文档
│   └── ai-brand-logos.md  # AI 品牌 Logo 映射表（lobe-icons slug）
├── README.md              # 本文件
├── LICENSE                # MIT 许可证
└── assets/                # 内嵌资源文件
    ├── bg_cover.jpeg          # 封面背景
    ├── bg_toc.png             # 目录页背景
    ├── bg_section_a/b/c.jpeg  # 章节页背景（三色版）
    ├── bg_closing.jpeg        # 结尾页背景
    ├── closing_thanks.png     # 多语言致谢图
    ├── logo_color.png         # 金蝶彩色 Logo
    └── logo_white.png         # 金蝶反白 Logo
```

---

## ❓ 常见问题

<details>
<summary><b>Q1：生成的 PPT 可以在 PowerPoint / WPS 中编辑吗？</b></summary>

可以。输出的 `.pptx` 完全兼容 Microsoft PowerPoint、WPS Office、Apple Keynote 等主流软件，所有文本、形状均可二次编辑。
</details>

<details>
<summary><b>Q2：思维模型版式如何触发？</b></summary>

自动识别：当内容中出现「结论先行」「PDCA」「SWOT」等关键词，或内容结构明显符合模型特征时，会自动匹配对应版式。

手动指定：在提示词中明确说明「请用 SWOT 版式」或「按金字塔结构呈现」。
</details>

<details>
<summary><b>Q3：AI 品牌 Logo 如何使用？</b></summary>

当内容中出现「DeepSeek」「通义千问」「文心一言」「GPT-4」「Claude」等 AI 品牌关键词时，Skill 会自动识别并嵌入对应的 lobe-icons 官方 Logo。

如不需要 Logo，在提示词中说明「不要 logo」即可跳过。
</details>

<details>
<summary><b>Q4：如何更新 Skill 到最新版本？</b></summary>

```bash
cd ~/.claude/skills/kingdee-ppt
git pull origin main
# 重启 Claude Code 生效
```
</details>

<details>
<summary><b>Q5：如何自定义品牌颜色？</b></summary>

编辑 `style-guide.md` 中的颜色配置（主色 `#2971EB` / 青色 `#22AAFE` / 金色 `#FFB61A`），修改后重启 Claude Code 生效。
</details>

---

## 🤝 贡献指南

欢迎通过 Issue 和 Pull Request 改进这个项目！

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

## 📜 许可证

本项目采用 [MIT 许可证](LICENSE)，可自由使用、修改和分发。

---

<div align="center">

**作者：钟伟纯（Wayne Zhong）**

金蝶国际软件集团 · 苍穹平台 · AI平台生态产品部

[📧 weichun_zhong@kingdee.com](mailto:weichun_zhong@kingdee.com) · [🐛 提交反馈](https://github.com/WayneZhon/KingDee-PPT-Skill/issues)

---

*让你的金蝶演示文稿更专业、更高效 🎉*

</div>