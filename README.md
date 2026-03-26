<div align="center">

# 🏢 金蝶 PPT 生成 Skill
## 一键将文字转换为金蝶官方风格幻灯片

[![金蝶 PPT Skill](https://img.shields.io/badge/金蝶-PPT_Skill-1770EA?style=for-the-badge)](https://github.com/WayneZhon/KingDee-PPT-Skill)
[![License](https://img.shields.io/github/license/WayneZhon/KingDee-PPT-Skill?style=for-the-badge)](LICENSE)
[![Stars](https://img.shields.io/github/stars/WayneZhon/KingDee-PPT-Skill?style=for-the-badge&color=FFC000)](https://github.com/WayneZhon/KingDee-PPT-Skill/stargazers)

</div>

> **一句话说明**：告别手动排版，把大纲/文档交给 AI，30 秒生成专业级金蝶风格 `.pptx` 幻灯片

---

## ✨ 为什么选择这个 Skill？

### 🎯 核心优势

| 特性 | 说明 |
|------|------|
| **🏢 官方设计还原** | 100% 还原金蝶 2026 版官方模板，品牌色、Logo、背景、字体完全对齐 |
| **🤖 智能版式匹配** | 自动识别内容结构，智能选择最佳版式（金字塔、SWOT、PDCA、黄金圈等 7 种思维模型） |
| **⚡ 零配置开箱即用** | 一键安装，无需配置品牌资源，内嵌官方背景图和 Logo |
| **📊 18+ 专业版式** | 封面/目录/章节/数据卡片/对比/流程/时间轴/Bento Grid/架构图/金句引言… |
| **🎯 一键生成文件** | 直接输出 `.pptx`，PowerPoint/WPS/Keynote 完全兼容，可二次编辑 |
| **🔐 保密标识** | 自动添加「④ 内部公开 请勿外传」水印标识 |

---

## 🚀 一键安装（30 秒上手）

### ⚡ 自动安装脚本（推荐）

```bash
# Claude Code 用户
curl -fsSL https://raw.githubusercontent.com/WayneZhon/KingDee-PPT-Skill/main/scripts/install.sh | bash
```

**自动脚本会完成：**
- ✅ 克隆最新版本代码
- ✅ 安装依赖（pptxgenjs 等）
- ✅ 配置 Claude Code Skill
- ✅ 验证安装成功

---

## 💻 平台支持矩阵

| 平台 | 安装方式 | 功能完整度 | 推荐指数 |
|------|---------|-----------|---------|
| **[Claude Code](#-claude-code)** | 原生 Skill | 🌟🌟🌟🌟🌟 100% | ⭐⭐⭐⭐⭐ 首选 |
| **[通义灵码 Qoderwork](#-通义灵码-qoderwork)** | Prompt 模板导入 | 🌟🌟🌟🌟 85% | ⭐⭐⭐⭐ 推荐 |
| **[亚马逊 Kiro](#-亚马逊-kiro)** | Prompt 模板导入 | 🌟🌟🌟🌟 85% | ⭐⭐⭐⭐ 推荐 |
| **[Cursor / Windsurf](#-cursor--windsurf)** | 项目规则 | 🌟🌟🌟 70% | ⭐⭐⭐ 可用 |

---

## 📦 详细安装指南

### 🟣 Claude Code（官方推荐）

**方式一：自动脚本（最快）**

```bash
curl -fsSL https://raw.githubusercontent.com/WayneZhon/KingDee-PPT-Skill/main/scripts/install.sh | bash
```

**方式二：手动安装**

```bash
# 1. 克隆仓库
cd ~/.claude/skills/
git clone https://github.com/WayneZhon/KingDee-PPT-Skill.git kingdee-ppt

# 2. 安装依赖（可选，自动脚本会处理）
cd kingdee-ppt
npm install pptxgenjs

# 3. 重启 Claude Code
```

**✅ 验证安装**

打开 Claude Code，输入：

```
帮我做个金蝶 PPT
```

若开始询问场景和页数，说明安装成功！🎉

---

### 🟠 通义灵码 Qoderwork

**步骤 1：获取 Prompt 文件**

```bash
git clone https://github.com/WayneZhon/KingDee-PPT-Skill.git
```

或直接 [下载 ZIP](https://github.com/WayneZhon/KingDee-PPT-Skill/archive/refs/heads/main.zip)

**步骤 2：导入自定义指令**

1. 打开通义灵码 Qoderwork（VS Code / JetBrains）
2. 进入 **设置 → 自定义指令 → 新建**
3. 将 `SKILL.md` 内容复制粘贴进去
4. 命名为 `金蝶PPT生成`，保存

**步骤 3：使用**

```
@金蝶PPT生成 帮我把以下内容整理成金蝶风格的汇报材料：
[你的内容]
```

> ⚠️ **注意**：Qoderwork 不支持自动执行脚本生成 `.pptx`，需将生成的代码手动运行，或在 Claude Code 中执行。

---

### 🔵 亚马逊 Kiro

**步骤 1：导入 Prompt**

1. 打开 Kiro
2. 进入 **Settings → Custom Agents → Create**
3. **Name**: `金蝶PPT生成`
4. **Description**: `将文字转换为金蝶官方风格幻灯片`
5. **Prompt**: 粘贴 `SKILL.md` 全文
6. 保存

**步骤 2：使用**

```
/金蝶PPT生成 帮我生成一份关于[主题]的金蝶风格汇报材料
```

> 💡 **提示**：Kiro 支持 `/命令` 触发自定义 Agent，体验流畅。

---

### 🟢 Cursor / Windsurf

```bash
# 在你的项目根目录
curl -fsSL https://raw.githubusercontent.com/WayneZhon/KingDee-PPT-Skill/main/SKILL.md > .cursorrules
```

或手动复制 `SKILL.md` 内容到 `.cursorrules` / `.windsurfrules`

---

## 🎬 使用示例

### 场景 1：快速生成汇报材料

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

### 场景 2：指定详细要求

```
将以下内容转换为金蝶风格 PPT：
- 场景：伙伴赋能
- 页数：中等（10-15 页）
- 包含图片占位符
- 使用思维模型版式

[粘贴你的文档内容]
```

### 场景 3：上传文档转换

```
（上传 .docx 或 .md 文件）
帮我把这个文档转成金蝶风格的 PPT，场景是客户大会
```

### 🎯 触发词参考

以下任一触发词都会激活 Skill：

> `做PPT` · `金蝶PPT` · `金蝶模板` · `生成幻灯片` · `汇报材料` · `演示文稿` · `输出PPT` · `做个汇报` · `生成deck`

---

## 🏗️ 工作流说明

```
第零阶段：思维模型识别
  └─ 扫描内容结构，自动匹配金字塔/SWOT/PDCA/黄金圈等版式

第一阶段：内容发现
  └─ 询问场景/页数/图片 → 生成大纲 → 用户确认

第二阶段：内容脚本
  └─ 输出逐页内容脚本（含排版指令）→ 用户审阅定稿

第三阶段：生成交付
  └─ 生成 Node.js 脚本 → 执行 → 转图 QA → 修复 → 交付 .pptx
```

---

## 🗂️ 支持场景

| 场景 | 典型用途 | 建议页数 | 推荐版式 |
|------|---------|---------|---------|
| **内部汇报** | 工作进展、述职 | 5-10 页 | 数据卡片/要点列表/时间轴 |
| **伙伴赋能** | ISV/OEM 培训 | 10-20 页 | 架构图/对比/流程/Bento Grid |
| **客户大会** | 对外演示、发布 | 10-20 页 | 金句引言/大数字看板/黄金圈 |
| **方案提案** | 立项/解决方案 | 20+ 页 | 对比/流程/思维模型组合 |

---

## 🎨 版式库一览

### 标准版式（10 种）
- 封面页 · 目录页 · 章节分隔页
- 要点列表 · 数据卡片 · 左右对比 · 横向流程
- 图文并排 · 时间轴 · 结尾致谢

### 思维模型版式（7 种）
- **金字塔/MECE** - 核心结论+分论点
- **PDCA 循环** - 计划-执行-检查-改进
- **SWOT 矩阵** - 优势-劣势-机会-威胁
- **黄金圈** - WHY-HOW-WHAT
- **5W1H 六格** - 方案说明/项目计划
- **SCQA 四步** - 场景-冲突-问题-解决
- **IPD 五看** - 行业/客户/机会/竞争/自己

### 高级版式（8 种）
- **Bento Grid** - 信息矩阵
- **架构生态图** - 系统/生态体系
- **核心特性卡片** - 功能亮点
- **大数字看板** - KPI 指标
- **金句引言页** - CEO 宣言/战略金句
- **超大焦点页** - 年度封底/口号
- **分层矩阵** - 成熟度分析
- **时间轴里程碑** - 路线图

---

## 📁 仓库结构

```
kingdee-ppt/
├── SKILL.md                   # Skill 主配置（触发规则 + 完整工作流）
├── style-guide.md             # 金蝶品牌视觉规范（颜色/字体/坐标/Logo）
├── layout-presets-base.md     # 基础版式 01-10（必须加载）
├── layout-presets-advanced.md # 高级版式 11-18（Bento/架构/金句等）
├── layout-presets-models.md   # 思维模型版式 19-25（金字塔/黄金圈等）
├── layout-presets-visual.md   # 视觉增强版式 26-29（图标行/对比条形等）
├── pptx-builder.md            # 构建文档（QA 规范/常见陷阱）
├── README.md                  # 本文件
├── scripts/                   # 安装脚本
│   └── install.sh             # 一键安装脚本
├── assets/                    # 内嵌资源
│   ├── bg_*.jpeg              # 背景图（封面/目录/章节/结尾）
│   ├── logo_*.png             # Logo（彩色/反白）
│   └── closing_thanks.png     # 多语言致谢
└── LICENSE
```

---

## 🔧 技术依赖

**生成 `.pptx` 文件需要的依赖：**

```bash
npm install pptxgenjs
```

**可选依赖（转图预览）：**

```bash
# macOS
brew install libreoffice poppler

# Linux
sudo apt-get install libreoffice poppler-utils

# Windows
# 安装 LibreOffice: https://www.libreoffice.org/download/download/
```

> 💡 **提示**：自动安装脚本会自动检测并安装所需依赖。

---

## ❓ 常见问题

<details>
<summary><b>Q1：生成的 PPT 可以在 PowerPoint / WPS 中编辑吗？</b></summary>

可以。输出的 `.pptx` 完全兼容 Microsoft PowerPoint、WPS Office、Apple Keynote 等，所有文本、形状均可二次编辑。
</details>

<details>
<summary><b>Q2：图片占位符怎么替换？</b></summary>

打开 PPT 后，点击占位框，使用软件的「插入图片」功能替换即可。占位框已标注建议尺寸和内容描述。
</details>

<details>
<summary><b>Q3：如何更新到最新版本？</b></summary>

```bash
cd ~/.claude/skills/kingdee-ppt
git pull origin main
# 重启 Claude Code
```

或重新运行自动安装脚本。
</details>

<details>
<summary><b>Q4：Qoderwork / Kiro 为什么不能直接生成文件？</b></summary>

Claude Code 的 Skill 机制支持直接执行终端命令（Node.js 脚本），而 Qoderwork / Kiro 的 Prompt 模板只能生成代码，需手动执行。推荐使用 Claude Code 获得完整体验。
</details>

<details>
<summary><b>Q5：如何自定义品牌颜色？</b></summary>

编辑 `style-guide.md` 中的颜色配置，修改后重启生效。或联系作者添加多品牌支持。
</details>

<details>
<summary><b>Q6：批量生成多个 PPT 可以吗？</b></summary>

每次对话生成一个文件。批量需求可通过 Claude CLI 编写循环脚本：

```bash
for file in ~/docs/*.md; do
  claude chat "帮我把 $file 转换为金蝶风格汇报材料"
done
```
</details>

---

## 🤝 贡献指南

欢迎贡献！无论是修复 bug、新增版式，还是完善文档。

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
- 🎨 新增版式模板
- 🧠 支持更多思维模型
- 🎯 提升版式自动识别准确率
- 📝 完善多平台使用文档
- 🌐 多语言支持

---

## 📜 许可证

[MIT License](LICENSE) - 欢迎使用、修改和分发。

---

## 🙏 致谢

- 金蝶国际软件集团 - 官方设计语言授权
- Claude Code Team - Skill 机制支持
- 社区用户 - 宝贵反馈和建议

---

## 📬 联系方式

- **作者**：钟伟纯（Wayne Zhong）
- **部门**：金蝶国际软件集团 · 苍穹平台 · AI 平台生态产品部
- **邮箱**：[weichun_zhong@kingdee.com](mailto:weichun_zhong@kingdee.com)
- **反馈**：[提交 Issue](https://github.com/WayneZhon/KingDee-PPT-Skill/issues)
- **Star**：[⭐ Star 本项目](https://github.com/WayneZhon/KingDee-PPT-Skill/stargazers)

---

<div align="center">

**让你的金蝶演示文稿更专业、更高效 🎉**

[![Fork](https://img.shields.io/github/forks/WayneZhon/KingDee-PPT-Skill?style=social)](https://github.com/WayneZhon/KingDee-PPT-Skill/fork)
[![Star](https://img.shields.io/github/stars/WayneZhon/KingDee-PPT-Skill?style=social)](https://github.com/WayneZhon/KingDee-PPT-Skill/stargazers)
[![Watch](https://img.shields.io/github/watchers/WayneZhon/KingDee-PPT-Skill?style=social)](https://github.com/WayneZhon/KingDee-PPT-Skill/watchers)

</div>
