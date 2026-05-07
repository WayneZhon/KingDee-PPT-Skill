# 金蝶 HTML 排版规范 v1.0

> 从 open-design 借鉴的字体配对 + letter-spacing 规则。
> 与 `html-kingdee-style.md` 配合使用，补充字体层级和间距规范。

---

## 核心设计理念

**问题**：现有 HTML 输出缺乏字体层级，所有文字用同一字重/字号。

**方案**：采用衬线/非衬线/等宽三字体配对 + letter-spacing 约束：

```
衬线 → 标题/金句/数字（视觉重音）
非衬线 → 正文/描述（信息密度）
等宽 → 元数据/标签（装饰节奏）
```

---

## 字体配对规则

### CSS 变量定义

```css
:root {
  --font-serif: 'Noto Serif SC', 'Playfair Display', serif;
  --font-sans: 'Noto Sans SC', 'Inter', 'Microsoft YaHei', sans-serif;
  --font-mono: 'IBM Plex Mono', 'JetBrains Mono', monospace;

  /* 金蝶品牌字体（保留） */
  --font-brand: 'Microsoft YaHei', sans-serif;
}
```

### 字体分工矩阵

| 用途 | 字体 | 类名前缀 | 示例 |
|------|------|---------|------|
| 超大标题 | 衬线 | `.h-hero` | 封面/章节标题 |
| 页面主标题 | 衬线 | `.h-xl` | 内容页标题 |
| 副标题 | 衬线 | `.h-md` | 小节标题 |
| 引导段 | 衬线 | `.lead` | 标题下方大字引导 |
| 正文/描述 | 非衬线 | `.body` | 要点列表、描述文字 |
| 元数据标签 | 等宽 | `.kicker`, `.meta` | 页眉页脚、ALL CAPS 标签 |
| 大数字 | 衬线 | `.stat-nb` | 数据卡片数字 |
| 金句引用 | 衬线 | `.callout-text` | callout 内容 |

### CSS 定义

```css
/* ─── 衬线标题层级 ─────────────────────────────────────── */

.h-hero {
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 10vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;  /* 大标题收紧 */
  color: var(--color-text);
}

.h-xl {
  font-family: var(--font-serif);
  font-size: clamp(1.8rem, 7vw, 2.5rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--color-text);
}

.h-md {
  font-family: var(--font-serif);
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  font-weight: 600;
  line-height: 1.25;
  color: var(--color-text);
}

.lead {
  font-family: var(--font-serif);
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 400;
  line-height: 1.4;
  color: var(--color-text-secondary);
}

/* ─── 非衬线正文 ─────────────────────────────────────────── */

.body {
  font-family: var(--font-sans);
  font-size: clamp(0.85rem, 1.2vw, 1rem);
  font-weight: 400;
  line-height: 1.55;
  color: var(--color-text);
}

.body-lg {
  font-size: clamp(1rem, 1.5vw, 1.1rem);
}

/* ─── 等宽元数据 ─────────────────────────────────────────── */

.kicker {
  font-family: var(--font-mono);
  font-size: clamp(0.65rem, 1vw, 0.8rem);
  font-weight: 500;
  letter-spacing: 0.08em;  /* ALL CAPS 必须 */
  text-transform: uppercase;
  color: var(--color-muted);
}

.meta {
  font-family: var(--font-mono);
  font-size: clamp(0.7rem, 1vw, 0.85rem);
  letter-spacing: 0.06em;  /* 小字放宽 */
  color: var(--color-muted);
}
```

> `.meta-row` 定义已移至 `html-kingdee-components.md`（包含 `display: flex`, `gap`, `.sep`）。

---

## Letter-spacing 规则（关键）

### 规则矩阵

| 场景 | letter-spacing | 原因 |
|------|----------------|------|
| **ALL CAPS** | **≥ 0.06em**（必须） | 全大写字母间距太紧难以阅读 |
| Display ≥ 32px | -0.01em ~ -0.02em | 大标题收紧视觉更紧凑 |
| Small ≤ 14px | +0.01em ~ +0.02em | 小字放宽提高可读性 |
| 数字（纯数字） | -0.01em | 数字收紧视觉整齐 |
| 中文标题 ≥ 24px | -0.01em | 大标题收紧（可选） |

### 代码示例

```css
/* ALL CAPS 必须放宽 */
.kicker,
.meta,
.stat-label {
  letter-spacing: 0.08em;  /* 最小 0.06em */
  text-transform: uppercase;
}

/* 大标题收紧 */
.h-hero,
.h-xl {
  letter-spacing: -0.02em;
}

/* 小字放宽 */
.body-sm,
.stat-note {
  font-size: 0.85rem;
  letter-spacing: 0.01em;
}
```

---

## 字号层级（clamp 响应式）

### 基础字号

| 类名 | clamp 范围 | 用途 |
|------|-----------|------|
| `.h-hero` | `clamp(2.5rem, 10vw, 4rem)` | 封面标题 |
| `.h-xl` | `clamp(1.8rem, 7vw, 2.5rem)` | 页面标题 |
| `.h-md` | `clamp(1.2rem, 3vw, 1.5rem)` | 小节标题 |
| `.lead` | `clamp(1rem, 2vw, 1.25rem)` | 引导段落 |
| `.body` | `clamp(0.85rem, 1.2vw, 1rem)` | 正文 |
| `.body-sm` | `clamp(0.7rem, 1vw, 0.85rem)` | 小字说明 |
| `.kicker` | `clamp(0.65rem, 1vw, 0.8rem)` | ALL CAPS 标签 |
| `.stat-nb` | `clamp(2rem, 4vw, 3rem)` | 数据卡片数字 |

### clamp 语法

```css
font-size: clamp(最小值, 视口相对值, 最大值);
/* 示例 */
font-size: clamp(1rem, 2vw, 1.25rem);
/* → 最小 1rem，最大 1.25rem，中间按 2vw 计算 */
```

---

## 行高规则

| 字号范围 | line-height | 原因 |
|---------|------------|------|
| ≥ 24px | 1.1 ~ 1.2 | 大标题行高小，视觉紧凑 |
| 16-24px | 1.25 ~ 1.35 | 中等字号标准行高 |
| ≤ 14px | 1.4 ~ 1.55 | 小字行高放宽，阅读舒适 |
| 数字纯显示 | 1.0 | 数字单行无需额外行高 |

---

## 字重规则

| 用途 | font-weight | 类名 |
|------|------------|------|
| 超大标题 | 700 | `.h-hero` |
| 页面标题 | 600-700 | `.h-xl` |
| 副标题 | 600 | `.h-md` |
| 正文 | 400 | `.body` |
| ALL CAPS 标签 | 500 | `.kicker` |
| 数字 | 700 | `.stat-nb` |

---

## 英文处理

### 英文词渲染为衬线斜体

```html
<em class="en">English Word</em>
```

```css
em.en {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 400;
}
```

### 英文金句页

```html
<div class="callout">
  <div class="callout-text">中文金句</div>
  <div class="callout-en" style="opacity: 0.65">English quote</div>
</div>
```

---

## 颜色层级

### 文字颜色变量

```css
:root {
  --color-text: #373838;          /* 主文字（深灰） */
  --color-text-secondary: #6b6964; /* 次级文字 */
  --color-muted: #BFBFBF;         /* 辅助文字/标签 */
  --color-white: #FFFFFF;         /* 深色背景上文字 */
}
```

### 深色背景上的文字

```css
.slide.dark .h-hero,
.slide.dark .h-xl,
.slide.dark .body {
  color: var(--color-white);
}

.slide.dark .lead,
.slide.dark .body-sm {
  color: rgba(255, 255, 255, 0.7);
}

.slide.dark .kicker,
.slide.dark .meta {
  color: rgba(255, 255, 255, 0.5);
}
```

---

## 与现有 style-guide.md 的关系

| style-guide.md 规范 | HTML 排版规范对应 |
|---------------------|------------------|
| 主蓝 #2971EB | CSS 变量 `--color-primary` |
| 正文 18pt | `.body` → `clamp(0.85rem, 1.2vw, 1rem)` |
| 标题 28pt 加粗 | `.h-xl` → `clamp(1.8rem, 7vw, 2.5rem); font-weight: 700` |
| 1.3× 行距 | `.body` → `line-height: 1.55` |

---

## 禁止事项

| ❌ 禁止 | ✅ 正确 |
|--------|--------|
| ALL CAPS 无 letter-spacing | `letter-spacing: ≥0.06em` |
| 大标题无衬线 | `.h-hero`, `.h-xl` → `font-family: var(--font-serif)` |
| 正文用衬线 | `.body` → `font-family: var(--font-sans)` |
| 元数据标签用非衬线 | `.kicker`, `.meta` → `font-family: var(--font-mono)` |
| 字号用固定 px | `clamp(最小, 视口相对, 最大)` |

---

## 完整示例

### 标题 + 引导 + 正文

```html
<section class="slide light">
  <div class="frame">
    <div class="kicker">过去 64 天 · 开发篇</div>
    <h2 class="h-xl">一个人，做了什么</h2>
    <p class="lead">从 0 到开源 CodePilot</p>
    <div class="body">
      大学毕业之后再也没写过一行代码。过去十年做的是 UI 设计和 AI 特效。
    </div>
  </div>
</section>
```

### 数据卡片（数字衬线 + 标签等宽）

```html
<div class="stat-card">
  <div class="stat-label">Duration</div>  <!-- 等宽 ALL CAPS -->
  <div class="stat-nb">64<span class="stat-unit">天</span></div>  <!-- 衬线大数字 -->
  <div class="stat-note">从 0 到现在</div>  <!-- 非衬线小字 -->
</div>
```

### 金句页（衬线金句 + 等宽出处）

```html
<section class="slide light">
  <div class="callout">
    <div class="callout-text">"没有交接，所有人都在构建。"</div>  <!-- 衬线 -->
    <div class="callout-en" style="opacity: 0.65">Without the handoff, everyone builds.</div>
    <div class="meta-row">— Luke Wroblewski · 2026.04.16</div>  <!-- 等宽 -->
  </div>
</section>
```