# 🏢 金蝶 PPT 生成 Skill

<p align="center">
  <a href="https://github.com/WayneZhon/KingDee-PPT-Skill">
    <img src="https://img.shields.io/badge/金蝶-PPT_Skill-1770EA?style=flat-square" alt="Kingdee">
  </a>
  <a href="https://claude.ai">
    <img src="https://img.shields.io/badge/Claude-Code-432391?style=flat-square&logo=anthropic" alt="Claude Code">
  </a>
  <a href="https://github.com/WayneZhon/KingDee-PPT-Skill/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/WayneZhon/KingDee-PPT-Skill?style=flat-square" alt="License">
  </a>
  <a href="https://github.com/WayneZhon/KingDee-PPT-Skill/stargazers">
    <img src="https://img.shields.io/github/stars/WayneZhon/KingDee-PPT-Skill?style=flat-square" alt="Stars">
  </a>
</p>

> ✨ **一键生成金蝶官方风格的 PPT** —— 将文字、大纲、文档快速转换为专业的 `.pptx` 幻灯片，完全复现金蝶国际软件集团 2026 版官方模板设计语言。

---

## 🎯 功能特性

| 特性 | 说明 |
|------|------|
| 🎨 **官方设计** | 完全复现金蝶 2026 版官方 PPT 模板风格，品牌色、字体、Logo 一致 |
| 📄 **多格式输入** | 支持 Markdown、文本大纲、Word 文档等多种输入形式 |
| 🎯 **智能布局** | 自动识别内容结构，智能分配版式（封面、目录、章节、内容、结尾） |
| 📊 **12 种版式** | 要点列表、数据卡片、左右对比、横向流程、图文并排、时间轴等 |
| 🖼️ **图片占位** | 自动生成图片占位符，方便后续插入图表、截图 |
| ⚡ **快速生成** | 输入内容即可一键生成完整 PPT，无需手动排版 |
| 🔐 **保密标识** | 自动添加内部保密标识（④ 内部公开 请勿外传） |

---

## 📦 安装方法

### 方法一：从源码安装（推荐）

```bash
# 克隆仓库到 Claude Code 的 skills 目录
git clone https://github.com/WayneZhon/KingDee-PPT-Skill.git ~/.claude/skills/kingdee-ppt

# 重启 Claude Code 使 Skill 生效
```

### 方法二：使用 curl 一键安装

```bash
curl -L https://github.com/WayneZhon/KingDee-PPT-Skill/archive/refs/heads/main.zip \
  | unzip - -d ~/.claude/skills/
mv ~/.claude/skills/KingDee-PPT-Skill-main ~/.claude/skills/kingdee-ppt
```

### 方法三：下载 Skill 包

从 [Releases](https://github.com/WayneZhon/KingDee-PPT-Skill/releases) 下载最新的 `.zip` 压缩包，解压到 `~/.claude/skills/kingdee-ppt/` 目录，重启 Claude Code 即可。

---

## 🚀 快速使用

### 触发词

在 Claude Code 中，使用以下任意触发词即可激活 Skill：

- `帮我做成金蝶 PPT`
- `按金蝶模板整理`
- `生成幻灯片` / `做个汇报材料`
- `演示文稿`

### 推荐提示词模板

**基础用法**：
```
帮我把以下内容转换成金蝶风格的汇报材料：

# 标题
这是第一页的内容

## 章节一
- 要点 1
- 要点 2
```

**进阶用法（指定场景和页数）**：
```
将我的文档 /path/to/your/doc.md 转换为金蝶风格的 PPT，要求：
1. 场景：伙伴赋能
2. 页数：短（5-10页）
3. 内容：完整准备
4. 图片：保留占位符
使用 kingdee-ppt skill 生成
```

### 支持的场景

| 场景 | 适用对象 | 建议页数 |
|------|---------|---------|
| 内部汇报 | 向上级领导汇报工作进展 | 短（5-10页） |
| 伙伴赋能 | ISV、OEM、开发者培训 | 中（10-20页） |
| 客户大会 | 对外客户演示、发布会 | 中（10-20页） |
| 方案提案 | 项目立项、方案建议 | 长（20页+） |

---

## 🖥️ 使用场景

### 桌面端（Claude Code Desktop）

1. 打开 Claude Code 应用
2. 上传文档或直接输入内容
3. 使用触发词或复制上面的提示词
4. 等待生成，下载 `.pptx` 文件

### CLI 命令行

```bash
# 对话模式生成
claude chat "帮我把这段内容做成金蝶风格的 PPT"

# 指定文件
claude chat "将 ~/Downloads/产品介绍.md 转换为金蝶风格的方案提案"
```

---

## 🎨 支持的版式

| 版式类型 | 适用场景 | 典型用途 |
|---------|---------|---------|
| 封面页 | 主题标题、副标题 | 产品发布、汇报开场 |
| 目录页 | 章节导航 | 大型演示、培训材料 |
| 章节分隔页 | 章节过渡 | 多章节内容分割 |
| 要点列表 | 核心论点、战略方向 | 重点强调、政策概述 |
| 数据卡片 | 数据指标、KPI | 成果汇报、数据展示 |
| 左右对比 | 新旧对比、方案选择 | 差异说明、方案PK |
| 横向流程 | 实施步骤、工作流 | 流程介绍、操作指南 |
| 图文并排 | 产品截图、案例图 | 产品演示、案例展示 |
| 时间轴 | 项目路线图、里程碑 | 项目规划、发展历程 |

---

## 📁 仓库结构

```
kingdee-ppt/
├── SKILL.md               # Skill 配置文件（触发规则、能力描述）
├── style-guide.md         # 金蝶品牌视觉规范（颜色、字体、Logo）
├── layout-presets.md      # 12 种版式预设代码
├── pptx-builder.md        # PPTX 构建技术文档
├── README.md              # 本文件
├── LICENSE                # MIT 许可证
└── assets/                # 资源文件
    ├── bg_cover.jpeg          # 封面背景
    ├── bg_toc.png             # 目录页背景
    ├── bg_section_a.jpeg      # 章节页背景 A
    ├── bg_section_b.jpeg      # 章节页背景 B
    ├── bg_section_c.jpeg      # 章节页背景 C
    ├── bg_closing.jpeg        # 结尾页背景
    ├── closing_thanks.png     # 多语言致谢图
    ├── logo_color.png         # 金蝶彩色 Logo
    └── logo_white.png         # 金蝶反白 Logo
```

---

## 📖 完整工作流

```
第一阶段：内容发现
  ├─ 选择场景（内部汇报 / 伙伴赋能 / 客户大会 / 方案提案）
  ├─ 选择页数（短 5-10页 / 中 10-20页 / 长 20页+）
  ├─ 评估内容完整性
  └─ 确认图片处理方式（占位符 / 实际图片）

第二阶段：大纲确认
  ├─ 自动生成完整大纲
  ├─ 用户确认或调整
  └─ 最终定稿

第三阶段：生成交付
  ├─ 生成 .pptx 文件
  ├─ 转换为预览图进行视觉质量检查
  └─ 交付最终文件
```

---

## ❓ 常见问题

**Q1: 如何更新 Skill？**

```bash
cd ~/.claude/skills/
rm -rf kingdee-ppt
git clone https://github.com/WayneZhon/KingDee-PPT-Skill.git kingdee-ppt
```

**Q2: 生成的 PPT 能在 PowerPoint 中编辑吗？**

可以。生成的 `.pptx` 文件完全兼容 Microsoft PowerPoint、WPS Office、Apple Keynote 等主流软件。

**Q3: 图片占位符如何替换？**

打开 PPT 后，点击占位框，使用软件的"插入图片"功能替换即可。

**Q4: 如何自定义品牌颜色或字体？**

编辑 `style-guide.md` 文件中的颜色配置（主色 `#1770EA`、青色 `#00CBFF` 等），修改后重启 Claude Code 生效。

**Q5: 支持批量生成吗？**

目前每次对话生成一个 PPT 文件，批量需求可通过 Claude CLI 脚本实现。

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建新分支：`git checkout -b feature/your-feature`
3. 提交代码：`git commit -m 'Add: 新增某功能'`
4. 推送分支：`git push origin feature/your-feature`
5. 发起 Pull Request

---

## 📜 许可证

本项目采用 [MIT 许可证](LICENSE)，可自由使用、修改和分发。

---

## 📮 联系方式

- **作者**：钟伟纯（Wayne Zhong）
- **部门**：金蝶国际软件集团 / 产品研发中心 / 苍穹平台 / AI平台生态产品部
- **邮箱**：weichun_zhong@kingdee.com
- **Issue**：[提交反馈](https://github.com/WayneZhon/KingDee-PPT-Skill/issues)

---

**🎉 让你的金蝶演示文稿更专业、更高效！**
