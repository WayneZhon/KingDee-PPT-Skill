# 金蝶 Bento Motion 组件库 v1.0

> Bento Grid 卡片系统 + 超大数字 + 中英文混排 + 勾线图形。
> 纯白底 + 金蝶品牌色 accent + Tailwind CSS 类。
> 与 `html-bento-template.md` 配合使用。

---

## Bento Grid 基础布局

### CSS Grid 定义

```css
/* ─── Bento Grid 容器 ─────────────────────────────────────── */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(180px, auto);
  gap: 16px;
  padding: 16px;
}

/* ─── 响应式断点 ─────────────────────────────────────── */
@media (max-width: 1024px) {
  .bento-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .bento-grid { grid-template-columns: 1fr; }
}
```

### Tailwind 类名映射

| 自定义类 | Tailwind 等价写法 |
|---------|------------------|
| `.bento-grid` | `grid grid-cols-4 gap-4 p-4 auto-rows-[minmax(180px,auto)]` |
| `.bento-grid-3` | `grid grid-cols-3 gap-4` |
| `.bento-grid-2` | `grid grid-cols-2 gap-4` |

---

## Bento 卡片跨度系统

### 跨度类定义

| 类名 | 跨度 | Tailwind 等价 | 适用场景 |
|------|------|--------------|---------|
| `.bento-card` | 1×1 | `col-span-1 row-span-1` | 小数据卡、标签卡 |
| `.bento-card--wide` | 2×1 | `col-span-2` | 对比项、流程步骤 |
| `.bento-card--tall` | 1×2 | `row-span-2` | 长列表、时间轴项 |
| `.bento-card--large` | 2×2 | `col-span-2 row-span-2` | 主 hero 卡、核心数据 |
| `.bento-card--full` | 4×1 | `col-span-4` | 金句页、结尾页 |
| `.bento-card--hero` | 4×2 | `col-span-4 row-span-2` | 封面、超大数字展示 |

### CSS 定义

```css
.bento-card        { grid-column: span 1; grid-row: span 1; }
.bento-card--wide  { grid-column: span 2; grid-row: span 1; }
.bento-card--tall  { grid-column: span 1; grid-row: span 2; }
.bento-card--large { grid-column: span 2; grid-row: span 2; }
.bento-card--full  { grid-column: span 4; grid-row: span 1; }
.bento-card--hero  { grid-column: span 4; grid-row: span 2; }
```

---

## Bento 卡片样式

### 基础卡片（纯白底 + accent border）

```css
.bento-card {
  background: #FFFFFF;
  border: 1px solid rgba(41, 113, 235, 0.12);
  border-radius: 16px;
  padding: 24px;
  transition:
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.bento-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(41, 113, 235, 0.08);
  border-color: #2971EB;
}
```

### 主卡 accent 背景（透明度渐变）

```css
.bento-card--primary {
  background: linear-gradient(135deg,
    rgba(41, 113, 235, 0.08) 0%,
    rgba(41, 113, 235, 0.02) 100%);
  border: 2px solid #2971EB;
}

.bento-card--accent {
  background: linear-gradient(135deg,
    rgba(0, 204, 254, 0.08) 0%,
    rgba(0, 204, 254, 0.02) 100%);
  border: 2px solid #00CCFE;
}

.bento-card--growth {
  background: linear-gradient(135deg,
    rgba(5, 200, 200, 0.08) 0%,
    rgba(5, 200, 200, 0.02) 100%);
  border: 2px solid #05C8C8;
}
```

### 禁止事项

```css
/* ❌ 禁止：不同色互相渐变 */
background: linear-gradient(to right, #2971EB, #FFB61A);

/* ✅ 仅允许：同色系透明度渐变 */
background: linear-gradient(180deg,
  rgba(41, 113, 235, 1) 0%,
  rgba(41, 113, 235, 0.15) 100%);
```

---

## 超大数字组件

### 基础定义

```css
.bento-number {
  font-family: 'Noto Serif SC', 'Playfair Display', serif;
  font-size: clamp(4rem, 12vw, 8rem);  /* 80-160pt 响应式 */
  font-weight: 700;
  color: #2971EB;
  line-height: 1;
  letter-spacing: -0.02em;  /* 大数字收紧 */
}

/* 数字单位（小字）*/
.bento-unit {
  font-family: 'Inter', 'Microsoft YaHei', sans-serif;
  font-size: clamp(1rem, 3vw, 1.5rem);
  font-weight: 400;
  color: #373838;
  margin-left: 8px;
}
```

### Tailwind 类名

| 自定义类 | Tailwind 等价 |
|---------|--------------|
| `.bento-number` | `font-serif text-[clamp(4rem,12vw,8rem)] font-bold text-kingdee-primary tracking-tight leading-none` |
| `.bento-unit` | `font-sans text-lg text-kingdee-text ml-2` |

### HTML 示例

```html
<div class="bento-card bento-card--large">
  <div class="bento-subtitle-en">EFFICIENCY GAIN</div>
  <div class="flex items-baseline">
    <span class="bento-number">300</span>
    <span class="bento-unit">%</span>
  </div>
  <div class="text-sm text-kingdee-muted mt-2">相比传统开发模式</div>
</div>
```

---

## 中英文混排系统

### 中文大字（衬线粗体）

```css
.bento-title-zh {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-weight: 700;
  color: #373838;
  line-height: 1.2;
}

/* 封面超大标题 */
.bento-title-hero {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(2rem, 8vw, 4rem);
  font-weight: 700;
  color: #28245F;  /* 藏青 */
  line-height: 1.1;
  letter-spacing: -0.01em;
}
```

### 英文小字（点缀）

```css
.bento-subtitle-en {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.7rem, 1.5vw, 0.9rem);
  font-weight: 400;
  color: #BFBFBF;
  letter-spacing: 0.08em;  /* ALL CAPS 必须 */
  text-transform: uppercase;
}

/* 英文金句 */
.bento-quote-en {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-style: italic;
  font-weight: 400;
  color: #373838;
  opacity: 0.65;
}
```

### HTML 示例

```html
<div class="bento-card bento-card--full">
  <div class="bento-subtitle-en">CORE PHILOSOPHY</div>
  <h2 class="bento-title-zh">致良知 · 走正道 · 行王道</h2>
  <p class="bento-quote-en mt-4">Intuitive knowledge. Walk the right path. Act with benevolence.</p>
</div>
```

---

## 勾线图形组件

### SVG 基础样式

```css
/* ─── 实线（主色）────────────────────────────── */
.line-simple {
  stroke: #2971EB;
  stroke-width: 2;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* ─── 点线（辅色）────────────────────────────── */
.line-dotted {
  stroke: #22AAFE;
  stroke-width: 1.5;
  fill: none;
  stroke-dasharray: 4 4;
}

/* ─── 强调线（accent）────────────────────────────── */
.line-accent {
  stroke: #00CCFE;
  stroke-width: 3;
  fill: none;
  stroke-linecap: round;
}
```

### 简单图表组件

#### 折线图（最小化）

```html
<svg viewBox="0 0 200 100" class="w-full h-24">
  <!-- 勾线描画动画 -->
  <path class="line-simple line-path"
        d="M 10 80 L 50 60 L 90 45 L 130 30 L 170 20"/>
  <!-- 数据点 -->
  <circle cx="10" cy="80" r="3" fill="#2971EB"/>
  <circle cx="50" cy="60" r="3" fill="#2971EB"/>
  <circle cx="90" cy="45" r="3" fill="#2971EB"/>
  <circle cx="130" cy="30" r="3" fill="#2971EB"/>
  <circle cx="170" cy="20" r="3" fill="#2971EB"/>
</svg>
```

#### 柱状图（简洁版）

```html
<div class="flex items-end gap-2 h-24">
  <div class="w-6 bg-gradient-to-t from-kingdee-primary/100 to-kingdee-primary/15 h-[40%] rounded-t"></div>
  <div class="w-6 bg-gradient-to-t from-kingdee-primary/100 to-kingdee-primary/15 h-[60%] rounded-t"></div>
  <div class="w-6 bg-gradient-to-t from-kingdee-primary/100 to-kingdee-primary/15 h-[80%] rounded-t"></div>
  <div class="w-6 bg-gradient-to-t from-kingdee-primary/100 to-kingdee-primary/15 h-[95%] rounded-t"></div>
</div>
```

#### 对比分隔线

```html
<div class="flex items-center gap-8">
  <div class="bento-card bento-card--tall">方案 A</div>
  <!-- 勾线分隔 -->
  <svg viewBox="0 0 2 100" class="w-1 h-full">
    <line class="line-dotted" x1="1" y1="0" x2="1" y2="100"/>
  </svg>
  <div class="bento-card bento-card--tall">方案 B</div>
</div>
```

#### 时间轴连接线

```html
<div class="flex items-center gap-4">
  <div class="bento-card">阶段 1</div>
  <!-- 箭头连接 -->
  <svg viewBox="0 0 40 20" class="w-10">
    <path class="line-simple" d="M 0 10 L 30 10 L 35 10"/>
    <path class="line-simple" d="M 30 5 L 35 10 L 30 15"/>
  </svg>
  <div class="bento-card">阶段 2</div>
  <svg viewBox="0 0 40 20" class="w-10">
    <path class="line-simple" d="M 0 10 L 30 10"/>
    <path class="line-simple" d="M 30 5 L 35 10 L 30 15"/>
  </svg>
  <div class="bento-card">阶段 3</div>
</div>
```

---

## 图标系统

### Font Awesome 使用

```html
<!-- 图标 + 文字 -->
<div class="flex items-center gap-3">
  <i class="fa-solid fa-chart-line text-2xl text-kingdee-primary"></i>
  <span class="bento-title-zh text-lg">数据分析</span>
</div>

<!-- 大图标（强调）────────────────────────────── -->
<div class="text-center">
  <i class="fa-solid fa-rocket text-5xl text-kingdee-accent"></i>
  <div class="bento-subtitle-en mt-2">LAUNCH</div>
</div>
```

### Material Symbols 使用

```html
<span class="material-symbols-outlined text-3xl text-kingdee-growth">
  trending_up
</span>
```

### 禁止 emoji

```html
<!-- ❌ 禁止 -->
<div class="text-3xl">🚀</div>

<!-- ✅ 正确 -->
<i class="fa-solid fa-rocket text-3xl"></i>
```

---

## 卡片内布局模板

### 模板 A：数字 + 标签

```html
<div class="bento-card">
  <div class="bento-subtitle-en mb-2">METRIC</div>
  <div class="flex items-baseline">
    <span class="bento-number">128</span>
    <span class="bento-unit">万</span>
  </div>
  <div class="text-xs text-kingdee-muted mt-2">2026 Q1</div>
</div>
```

### 模板 B：标题 + 正文

```html
<div class="bento-card bento-card--wide">
  <div class="bento-subtitle-en">FEATURE</div>
  <h3 class="bento-title-zh mb-3">智能代码补全</h3>
  <p class="text-sm text-kingdee-text leading-relaxed">
    基于 AI 上下文感知的代码补全，准确率提升 40%。
  </p>
</div>
```

### 模板 C：图标 + 标题 + 数据

```html
<div class="bento-card flex flex-col items-center justify-center text-center">
  <i class="fa-solid fa-users text-4xl text-kingdee-primary mb-3"></i>
  <div class="bento-number text-4xl">5000+</div>
  <div class="bento-title-zh text-base mt-1">开发者社区</div>
</div>
```

### 模板 D：对比项

```html
<div class="bento-grid grid-cols-2">
  <div class="bento-card bento-card--primary">
    <div class="bento-subtitle-en">BEFORE</div>
    <div class="bento-number text-2xl">72</div>
    <div class="text-sm text-kingdee-muted">小时/周</div>
  </div>
  <div class="bento-card bento-card--growth">
    <div class="bento-subtitle-en">AFTER</div>
    <div class="bento-number text-2xl">24</div>
    <div class="text-sm text-kingdee-muted">小时/周</div>
  </div>
</div>
```

---

## 响应式卡片适配

### Desktop（4 列）

```html
<div class="bento-grid">
  <div class="bento-card bento-card--large">主卡</div>
  <div class="bento-card">小卡</div>
  <div class="bento-card">小卡</div>
  <div class="bento-card bento-card--wide">宽卡</div>
</div>
```

### Tablet（2 列，自动降级）

```css
@media (max-width: 1024px) {
  .bento-card--large { grid-column: span 2; grid-row: span 1; }
  .bento-card--wide  { grid-column: span 2; }
  .bento-card--hero  { grid-column: span 2; grid-row: span 2; }
}
```

### Mobile（单列）

```css
@media (max-width: 640px) {
  .bento-card,
  .bento-card--wide,
  .bento-card--large,
  .bento-card--hero { grid-column: span 1; grid-row: span 1; }
}
```

---

## 完整组件示例

### Dashboard 主卡

```html
<section class="slide-bento min-h-screen px-8 py-12">
  <div class="bento-grid">
    <!-- 主卡：超大数字 -->
    <div class="bento-card bento-card--large bento-card--primary">
      <div class="bento-subtitle-en">TOTAL USERS</div>
      <div class="flex items-baseline mt-4">
        <span class="bento-number">12.8</span>
        <span class="bento-unit">M</span>
      </div>
      <!-- 简单折线图 -->
      <svg viewBox="0 0 200 60" class="w-full h-16 mt-6">
        <path class="line-simple line-path" d="M 0 50 L 40 40 L 80 35 L 120 25 L 160 15 L 200 10"/>
      </svg>
    </div>

    <!-- 次卡：增长指标 -->
    <div class="bento-card">
      <i class="fa-solid fa-arrow-trend-up text-2xl text-kingdee-growth"></i>
      <div class="bento-number text-3xl mt-3">+23%</div>
      <div class="bento-subtitle-en">GROWTH RATE</div>
    </div>

    <!-- 次卡：活跃度 -->
    <div class="bento-card">
      <i class="fa-solid fa-bolt text-2xl text-kingdee-accent"></i>
      <div class="bento-number text-3xl mt-3">89%</div>
      <div class="bento-subtitle-en">ACTIVE RATE</div>
    </div>

    <!-- 宽卡：地域分布 -->
    <div class="bento-card bento-card--wide">
      <div class="bento-subtitle-en">REGIONAL DISTRIBUTION</div>
      <!-- 柱状图 -->
      <div class="flex items-end gap-3 h-20 mt-4">
        <div class="flex-1 bg-kingdee-primary/80 h-[70%] rounded-t text-center text-xs text-white py-1">华东 35%</div>
        <div class="flex-1 bg-kingdee-secondary/80 h-[50%] rounded-t text-center text-xs text-white py-1">华南 25%</div>
        <div class="flex-1 bg-kingdee-accent/80 h-[30%] rounded-t text-center text-xs text-kingdee-dark py-1">华北 15%</div>
      </div>
    </div>
  </div>
</section>
```

---

## 下一步

- 版式预设 → `html-bento-presets.md`
- 动效扩展 → `html-bento-motion.md`
- 风格选择逻辑 → `SKILL.md` Phase H 分支