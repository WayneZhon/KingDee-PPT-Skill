# 金蝶 HTML 原子组件系统 v1.0

> 从 open-design 借鉴的原子组件模式：放弃"版式编号"思维，采用可组合的原子组件。
> 每个组件独立定义，可自由组合成任意版式。
> 与 `html-kingdee-grids.md` 配合使用。

---

## 核心设计理念

**问题**：现有 29 种版式是固定模板，无法灵活组合。

**方案**：拆解为 6 大原子组件 + 5 种网格容器，自由组合：

```
旧模式：版式 05 = 数据卡片 = 固定三列布局
新模式：stat-card（原子）+ grid-3（容器）= 灵活组合
```

---

## 组件清单

| 组件 | 类名前缀 | 用途 | 可组合容器 |
|------|---------|------|-----------|
| 统计卡片 | `.stat-card` | 大数字+标签+说明 | grid-3, grid-4, grid-6 |
| 引用框 | `.callout` | 金句/引言/观点强调 | 单独使用, frame |
| 支柱卡 | `.pillar-card` | 序号+标题+描述 | grid-3, grid-4 |
| 流程步 | `.step-card` | 步骤编号+标题+箭头 | pipeline, grid-5 |
| 图标徽章 | `.icon-badge` | emoji/lobe-icons 小图标 | inline, card内 |
| 元数据行 | `.meta-row` | 作者/日期/来源 | 顶部/底部固定 |

---

## 组件 1: stat-card（统计卡片）

### HTML 结构

```html
<div class="stat-card">
  <div class="stat-label">Duration</div>
  <div class="stat-nb">64<span class="stat-unit">天</span></div>
  <div class="stat-note">从 0 到现在</div>
</div>
```

### CSS 定义

```css
.stat-card {
  display: flex;
  flex-direction: column;
  gap: var(--gap-xs);
  padding: var(--gap-lg);
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.stat-label {
  font-family: var(--font-mono);
  font-size: clamp(0.65rem, 1vw, 0.8rem);
  letter-spacing: 0.08em;  /* ALL CAPS 必须 */
  color: var(--color-muted);
  text-transform: uppercase;
}

.stat-nb {
  font-family: var(--font-serif);  /* 数字用衬线 */
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
}

.stat-unit {
  font-size: 0.4em;
  opacity: 0.55;
  font-weight: 400;
}

.stat-note {
  font-family: var(--font-sans);
  font-size: clamp(0.8rem, 1.2vw, 0.9rem);
  color: var(--color-text-secondary);
}
```

### 使用场景

- 数据卡片页（3-6 个 stat-card + grid 容器）
- 悬浮统计页（1-2 个大 stat-card 居中）
- KPI 概览（header 区嵌入）

---

## 组件 2: callout（引用框）

### HTML 结构

```html
<div class="callout" style="max-width: 60vw">
  <div class="callout-text">"没有交接，所有人都在构建。"</div>
  <div class="callout-src">— Luke Wroblewski</div>
</div>
```

### CSS 定义

```css
.callout {
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
  padding: var(--gap-xl) var(--gap-2xl);
  border-left: 3px solid var(--color-primary);
  background: var(--color-bg-tint);
}

.callout-text {
  font-family: var(--font-serif);  /* 金句用衬线 */
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  font-weight: 600;
  line-height: 1.35;
  color: var(--color-text);
}

.callout-src {
  font-family: var(--font-mono);
  font-size: clamp(0.7rem, 1vw, 0.85rem);
  color: var(--color-muted);
  letter-spacing: 0.06em;
}
```

### 变体

```html
<!-- Hero 页大引用 -->
<div class="callout callout-hero">
  <div class="callout-text">...</div>
</div>

<!-- 双语引用 -->
<div class="callout">
  <div class="callout-text">中文金句</div>
  <div class="callout-en">English quote</div>
  <div class="callout-src">— 来源</div>
</div>
```

---

## 组件 3: pillar-card（支柱卡）

### HTML 结构

```html
<div class="pillar-card">
  <div class="pillar-ic">01</div>
  <div class="pillar-title">三层文档体系</div>
  <div class="pillar-desc">CLAUDE.md + 项目知识库 + 护栏文件</div>
</div>
```

### CSS 定义

```css
.pillar-card {
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
  padding: var(--gap-lg);
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
}

.pillar-ic {
  font-family: var(--font-mono);
  font-size: clamp(1.5rem, 2vw, 2rem);
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: -0.02em;  /* 大数字收紧 */
}

.pillar-title {
  font-family: var(--font-serif);
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  font-weight: 600;
  color: var(--color-text);
}

.pillar-desc {
  font-family: var(--font-sans);
  font-size: clamp(0.85rem, 1.2vw, 1rem);
  color: var(--color-text-secondary);
  line-height: 1.5;
}
```

### 图标变体

```html
<div class="pillar-card pillar-icon">
  <div class="pillar-ic"><i data-lucide="compass"></i></div>
  <div class="pillar-title">判断力</div>
  <div class="pillar-desc">决策和方向的权威</div>
</div>
```

---

## 组件 4: step-card（流程步）

### HTML 结构

```html
<div class="step-card">
  <div class="step-nb">01</div>
  <div class="step-title">Draft</div>
  <div class="step-desc">AI 帮我起草初稿</div>
</div>
```

### CSS 定义

```css
.step-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap-xs);
  padding: var(--gap-md);
  background: var(--color-bg-card);
  border-radius: var(--radius-md);
  min-width: 120px;
}

.step-nb {
  font-family: var(--font-mono);
  font-size: clamp(1.2rem, 1.5vw, 1.5rem);
  font-weight: 700;
  color: var(--color-primary);
}

.step-title {
  font-family: var(--font-serif);
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  font-weight: 600;
  color: var(--color-text);
}

.step-desc {
  font-family: var(--font-sans);
  font-size: clamp(0.75rem, 1vw, 0.85rem);
  color: var(--color-text-secondary);
  text-align: center;
}

/* 流水线容器 */
.pipeline {
  display: flex;
  gap: var(--gap-md);
  align-items: center;
}

.pipeline .step-card::after {
  content: '→';
  position: absolute;
  right: -1em;
  color: var(--color-muted);
  font-size: 1.2em;
}

.pipeline .step-card:last-child::after {
  display: none;
}
```

---

## 组件 5: icon-badge（图标徽章）

### HTML 结构

```html
<!-- Emoji -->
<span class="icon-badge">📊</span>

<!-- lobe-icons CDN -->
<img class="icon-badge icon-brand" src="https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/claude-color.svg" alt="Claude">

<!-- Lucide -->
<i class="icon-badge" data-lucide="compass"></i>
```

### CSS 定义

```css
.icon-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: clamp(1.5rem, 2vw, 2rem);
  height: clamp(1.5rem, 2vw, 2rem);
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  border-radius: var(--radius-sm);
}

.icon-badge.icon-brand {
  width: clamp(2rem, 2.5vw, 2.5rem);
  height: clamp(2rem, 2.5vw, 2.5rem);
}
```

### 金蝶 AI 生态常用 lobe-icons

| 品牌 | Slug | CDN URL |
|------|------|---------|
| Claude | `claude-color` | `.../icons/claude-color.svg` |
| DeepSeek | `deepseek-color` | `.../icons/deepseek-color.svg` |
| 华为云 | `huaweicloud-color` | `.../icons/huaweicloud-color.svg` |
| 阿里云 | `alibabacloud-color` | `.../icons/alibabacloud-color.svg` |
| 文心 | `wenxin-color` | `.../icons/wenxin-color.svg` |

---

## 组件 6: meta-row（元数据行）

### HTML 结构

```html
<div class="meta-row">
  <span>歸藏 Guizang</span>
  <span class="sep">·</span>
  <span>独立创作者</span>
  <span class="sep">·</span>
  <span>2026.04.22</span>
</div>
```

### CSS 定义

```css
.meta-row {
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
  font-family: var(--font-mono);
  font-size: clamp(0.7rem, 1vw, 0.85rem);
  color: var(--color-muted);
  letter-spacing: 0.06em;
}

.meta-row .sep {
  opacity: 0.5;
}
```

---

## 组合示例

### 数据卡片页 = stat-card + grid-3

```html
<section class="slide light">
  <div class="chrome">...</div>
  <div class="frame" style="padding-top: 6vh">
    <div class="kicker">过去 64 天 · 开发篇</div>
    <h2 class="h-xl">一个人，做了什么</h2>
    <p class="lead">从 0 到开源 CodePilot</p>

    <div class="grid-3" style="margin-top: 5vh">
      <div class="stat-card">
        <div class="stat-label">Duration</div>
        <div class="stat-nb">64<span class="stat-unit">天</span></div>
        <div class="stat-note">从 0 到现在</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Lines of Code</div>
        <div class="stat-nb">110K+</div>
        <div class="stat-note">一行行写到 11 万+</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">GitHub Stars</div>
        <div class="stat-nb">5,166</div>
        <div class="stat-note">一个开源仓库</div>
      </div>
    </div>
  </div>
</section>
```

### 三支柱页 = pillar-card + grid-3

```html
<section class="slide dark">
  <div class="frame">
    <h2 class="h-xl">三层文档体系</h2>
    <div class="grid-3" style="margin-top: 4vh">
      <div class="pillar-card">
        <div class="pillar-ic">01</div>
        <div class="pillar-title">CLAUDE.md</div>
        <div class="pillar-desc">你该怎么做事 —— 行为规则 + 工作偏好</div>
      </div>
      <div class="pillar-card">
        <div class="pillar-ic">02</div>
        <div class="pillar-title">项目知识库</div>
        <div class="pillar-desc">架构 / 命名规范 / 技术栈</div>
      </div>
      <div class="pillar-card">
        <div class="pillar-ic">03</div>
        <div class="pillar-title">护栏文件</div>
        <div class="pillar-desc">禁止事项 + 边界条件</div>
      </div>
    </div>
  </div>
</section>
```

### 金句页 = callout 独立

```html
<section class="slide light">
  <div class="frame" style="display: grid; gap: 5vh; align-content: center; min-height: 80vh">
    <div class="kicker">Quote · 金句</div>
    <div class="callout callout-hero" style="max-width: 70vw">
      <div class="callout-text">"没有交接，所有人都在构建。"</div>
    </div>
    <p class="lead" style="opacity: .65">Without the handoff, everyone builds.</p>
    <div class="meta-row">
      <span>— Luke Wroblewski</span>
      <span class="sep">·</span>
      <span>2026.04.16</span>
    </div>
  </div>
</section>
```

---

## 与现有版式的关系

| 现有版式编号 | 原子组件替代方案 |
|-------------|----------------|
| 05 数据卡片 | stat-card + grid-3 / grid-6 |
| 14 核心特性 | pillar-card + grid-3 / grid-4 |
| 06 步骤流程 | step-card + pipeline |
| 16 金句页 | callout + callout-hero |
| 26 图标行 | icon-badge + inline |

**优势**：
- 版式灵活：3 列改 4 列只需换 grid 容器
- 内容适配：数据多少自动调整，无需重选版式
- 维护简单：组件定义统一，修改一处全 deck 生效