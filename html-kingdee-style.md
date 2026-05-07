# 金蝶 HTML 幻灯片品牌规范 Style Guide v2.0

> 基于 kingdee-ppt style-guide.md，转换为 CSS 自定义属性格式。
> v2.0 新增：高级排版特性（text-wrap: balance/pretty）、CSS Grid named areas、subgrid、hover交互、滚动条美化。
> 配合 `html-kingdee-template.md` 和 `html-kingdee-presets.md` 使用。
> 所有 CSS 规则写入单个 HTML 文件的 `<style>` 标签内，或拆分为 `shared/tokens.css`（多文件架构）。

---

## 1. CSS 自定义属性（品牌色系）

```css
:root {
  /* ─── 主色系 ─── */
  --brand-primary:      #2971EB;  /* 科技蓝（主品牌蓝） */
  --brand-secondary:    #22AAFE;  /* 亮天蓝（品青） */
  --brand-accent:       #00CCFE;  /* 章节数字青 */
  --brand-dark:         #28245F;  /* 深紫蓝（藏青） */

  /* ─── 辅助色系 ─── */
  --color-growth:       #05C8C8;  /* 绿松石青（增长/机会） */
  --color-challenge:    #966EFF;  /* 薰衣草紫（挑战/风险） */
  --color-emphasis:     #FFB61A;  /* 橙黄（强调/警示） */

  /* ─── 中性色 ─── */
  --color-text:         #373838;  /* 深灰（正文） */
  --color-muted:        #BFBFBF;  /* 浅灰（次要说明） */
  --color-bg-light:     #E7F1FF;  /* 冰蓝（卡片底色） */
  --color-white:        #FFFFFF;  /* 白色 */

  /* ─── 多色序列（图表/卡片） ─── */
  --color-seq-1:        #2971EB;
  --color-seq-2:        #22AAFE;
  --color-seq-3:        #05C8C8;
  --color-seq-4:        #966EFF;
  --color-seq-5:        #FFB61A;

  /* ─── 渐变（封面专用） ─── */
  --gradient-cover: linear-gradient(135deg, #2374F0, #22A9FE);

  /* ─── 字体系统 ─── */
  --font-family:  'Microsoft YaHei', 'PingFang SC', sans-serif;  /* 默认品牌字体 */
  --font-serif:   'Noto Serif SC', 'Playfair Display', serif;     /* 衬线标题 */
  --font-sans:    'Noto Sans SC', 'Inter', 'Microsoft YaHei', sans-serif;  /* 无衬线正文 */
  --font-mono:    'IBM Plex Mono', 'JetBrains Mono', monospace;   /* 等宽标签 */

  /* ─── 响应式字号（clamp 三参数） ─── */
  --title-size:    clamp(1.5rem, 4vw, 2.8rem);    /* 页面标题 28pt */
  --subtitle-size: clamp(0.75rem, 1.5vw, 0.9rem); /* 副标题 14pt */
  --body-size:     clamp(0.85rem, 1.6vw, 1rem);   /* 正文 16pt */
  --emphasis-size: clamp(0.95rem, 1.8vw, 1.1rem); /* 重点 18pt */
  --card-title:    clamp(0.95rem, 1.8vw, 1.2rem); /* 卡片标题 18-20pt */
  --card-body:     clamp(0.7rem, 1.4vw, 0.85rem); /* 卡片正文 13-14pt */
  --hero-number:   clamp(4rem, 12vw, 8rem);       /* 超大数字 120-160pt */
  --chapter-number: clamp(5rem, 14vw, 7.5rem);    /* 章节大数字 125pt */
  --toc-number:    clamp(3rem, 10vw, 5rem);       /* TOC 章节编号 80pt */

  /* ─── Space Scale（8px 基准）────────────────────────────── */
  --space-1:  0.25rem;   /* 4px  - 微间距 */
  --space-2:  0.5rem;    /* 8px  - 基准单位 */
  --space-3:  0.75rem;   /* 12px - 紧凑间距 */
  --space-4:  1rem;      /* 16px - 标准间距 */
  --space-5:  1.25rem;   /* 20px - 中等间距 */
  --space-6:  1.5rem;    /* 24px - 较大间距 */
  --space-7:  2rem;      /* 32px - 大间距 */
  --space-8:  2.5rem;    /* 40px - 区块间距 */
  --space-9:  3rem;      /* 48px - 页面边距 */
  --space-10: 4rem;      /* 64px - 章节间距 */

  /* ─── Gap 变量（映射 space）────────────────────────────── */
  --gap-xs:   var(--space-2);  /* 8px  */
  --gap-sm:   var(--space-3);  /* 12px */
  --gap-md:   var(--space-5);  /* 20px */
  --gap-lg:   var(--space-7);  /* 32px */
  --gap-xl:   var(--space-8);  /* 40px */
  --gap-2xl:  var(--space-10); /* 64px - 章节/大区块分隔 */
  --gap-3xl:  5rem;            /* 80px - 预留扩展 */

  /* ─── 页面边距 ─── */
  --margin-page: clamp(0.4rem, 1vw, 0.5rem);  /* 页面最小边距 0.5" */

  /* ─── 圆角系统 ─── */
  --radius-sm:   0.12rem;  /* 小型嵌套元素 */
  --radius-md:   0.15rem;  /* 主内容卡片 */
  --radius-lg:   0.20rem;  /* 大卡片 */

  /* ─── 阴影系统（三档） ─── */
  --shadow-1: 0 2px 4px rgba(0,0,0,0.05);           /* elevation-1 */
  --shadow-2: 0 4px 8px rgba(0,0,0,0.08);           /* elevation-2 */
  --shadow-3: 0 7px 14px rgba(41,113,235,0.10);     /* elevation-3 品牌光晕 */

  /* ─── 动画时长 ─── */
  --transition-fast:   0.15s;
  --transition-normal: 0.3s;
  --transition-slow:   0.5s;
}
```

---

## 2. 视口锁定基础样式

```css
/* ─── 视口锁定 ─── */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  scroll-snap-type: y mandatory;
  font-family: var(--font-family);
  background: var(--color-white);
  color: var(--color-text);
}

/* ─── 每张幻灯片 100vh ─── */
.slide {
  height: 100vh;
  height: 100dvh;  /* 动态视口高度（移动端地址栏收缩时自适应） */
  width: 100vw;
  overflow: hidden;
  scroll-snap-align: start;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* ─── 内容区域 ─── */
.slide-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--margin-page);
  box-sizing: border-box;
  max-width: 100%;
}

/* ─── 进度条 ─── */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--brand-primary);
  z-index: 1000;
  transition: width var(--transition-normal);
}

/* ─── 导航点 ─── */
.nav-dots {
  position: fixed;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 100;
}

.nav-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-muted);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.nav-dot.active {
  background: var(--brand-primary);
  transform: scale(1.3);
}

.nav-dot:hover {
  background: var(--brand-secondary);
}
```

---

## 3. 响应式断点

```css
/* ─── 高度受限（投影仪/低分辨率屏幕） ─── */
@media (max-height: 700px) {
  :root {
    --title-size:    clamp(1.2rem, 3.5vw, 2.2rem);
    --body-size:     clamp(0.8rem, 1.4vw, 0.9rem);
    --hero-number:   clamp(3rem, 10vw, 6rem);
    --gap-lg:        0.8rem;
  }
  .slide-content { padding: 0.3rem; }
}

@media (max-height: 600px) {
  :root {
    --title-size:    clamp(1rem, 3vw, 1.8rem);
    --hero-number:   clamp(2.5rem, 8vw, 5rem);
    --chapter-number: clamp(3rem, 10vw, 5rem);
  }
  .nav-dots { display: none; }  /* 隐藏导航点 */
}

/* ─── 移动端（窄屏） ─── */
@media (max-width: 600px) {
  :root {
    --title-size:    clamp(1rem, 3vw, 1.6rem);
    --body-size:     clamp(0.75rem, 1.3vw, 0.85rem);
    --hero-number:   clamp(2rem, 7vw, 4rem);
    --gap-md:        0.5rem;
    --margin-page:   0.3rem;
  }

  .nav-dots {
    right: 0.5rem;
    gap: 0.3rem;
  }

  .nav-dot {
    width: 6px;
    height: 6px;
  }

  /* 卡片/网格垂直堆叠 */
  .grid-2x3, .grid-3x2, .grid-2x2 {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  .card {
    max-width: min(90vw, 400px);
  }

  /* 左右对比改为上下 */
  .compare-wrapper {
    flex-direction: column;
    gap: var(--gap-md);
  }
}

/* ─── 大屏投影（16:9 宽屏） ─── */
@media (min-width: 1200px) {
  .slide-content {
    max-width: min(90vw, 1400px);
  }
}
```

---

## 4. 动画与过渡

```css
/* ─── 基础 reveal 动画 ─── */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ─── 触发条件 ─── */
.slide.visible .animate-fade-up {
  animation: fadeInUp var(--transition-slow) ease-out forwards;
}

.slide.visible .animate-fade-left {
  animation: fadeInLeft var(--transition-slow) ease-out forwards;
}

.slide.visible .animate-scale {
  animation: fadeInScale var(--transition-normal) ease-out forwards;
}

/* ─── 交错延迟（stagger） ─── */
.stagger-1 { animation-delay: 0.1s; }
.stagger-2 { animation-delay: 0.2s; }
.stagger-3 { animation-delay: 0.3s; }
.stagger-4 { animation-delay: 0.4s; }
.stagger-5 { animation-delay: 0.5s; }

/* ─── 无动画模式 ─── */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-up,
  .animate-fade-left,
  .animate-scale {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

---

## 5. 卡片通用样式

```css
.card {
  background: var(--color-bg-light);
  border-radius: var(--radius-md);
  padding: var(--gap-md);
  box-shadow: var(--shadow-1);
  display: flex;
  flex-direction: column;
  gap: var(--gap-xs);
}

.card-primary {
  background: var(--brand-primary);
  color: var(--color-white);
}

.card-secondary {
  background: var(--color-bg-light);
  color: var(--color-text);
}

.card-accent {
  background: var(--brand-secondary);
  color: var(--color-white);
}

/* ─── 卡片内图标 ─── */
.card-icon {
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin-bottom: var(--gap-sm);
}

/* ─── 卡片内标题 ─── */
.card-title {
  font-size: var(--card-title);
  font-weight: bold;
  margin-bottom: var(--gap-xs);
}

/* ─── 卡片内正文 ─── */
.card-body {
  font-size: var(--card-body);
  line-height: 1.5;
  color: var(--color-text);
}

.card-primary .card-body {
  color: var(--color-bg-light);
}
```

---

## 6. 品牌色语义映射（思维模型）

```css
/* ─── PDCA ─── */
.color-plan     { background: var(--brand-primary);   color: var(--color-white); }  /* P */
.color-do       { background: var(--brand-secondary); color: var(--color-white); }  /* D */
.color-check    { background: var(--color-emphasis);  color: var(--brand-dark);    }  /* C */
.color-act      { background: var(--color-challenge); color: var(--color-white); }  /* A */

/* ─── SWOT ─── */
.color-strength { background: var(--brand-primary);   color: var(--color-white); }
.color-weakness { background: var(--color-bg-light);  color: var(--color-text);   border: 1px solid var(--color-muted); }
.color-opportunity { background: var(--color-growth); color: var(--color-white); }
.color-threat   { background: var(--color-challenge); color: var(--color-white); }

/* ─── 黄金圈 ─── */
.color-why      { background: var(--brand-primary);   color: var(--color-white); }
.color-how      { background: var(--brand-secondary); color: var(--color-white); }
.color-what     { background: var(--color-bg-light);  color: var(--brand-dark);  border: 2px solid var(--brand-primary); }

/* ─── SCQA ─── */
.color-situation  { background: var(--color-bg-light); color: var(--color-text); }
.color-complication { background: var(--color-emphasis); color: var(--brand-dark); }
.color-question   { background: var(--color-challenge); color: var(--color-white); }
.color-answer     { background: var(--brand-primary);   color: var(--color-white); }

/* ─── IPD 五看 ─── */
.color-view-1   { background: var(--brand-primary);   color: var(--color-white); }  /* 看行业 */
.color-view-2   { background: var(--brand-secondary); color: var(--color-white); }  /* 看客户 */
.color-view-3   { background: var(--color-growth);    color: var(--color-white); }  /* 看机会 */
.color-view-4   { background: var(--color-challenge); color: var(--color-white); }  /* 看竞争 */
.color-view-5   { background: var(--brand-primary);   color: var(--color-white); }  /* 看自己 */
```

---

## 7. 内容密度上限（视觉 QA 基准）

```css
/* ─── 卡片最大宽度 ─── */
.card {
  max-width: min(90vw, 800px);
  max-height: min(80vh, 600px);
}

/* ─── 图片限制 ─── */
.slide-image {
  max-height: min(50vh, 400px);
  object-fit: contain;
}

/* ─── 网格自适应 ─── */
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  gap: var(--gap-md);
  width: 100%;
}

/* ─── 留白强制 ─── */
.slide-content {
  padding: clamp(0.3rem, 1vw, 0.5rem) clamp(0.4rem, 1.5vw, 0.6rem);
}

/* ─── 正文最大宽度（可读性） ─── */
.text-block {
  max-width: min(80vw, 800px);
}
```

---

## 8. 颜色禁止清单

```css
/* ❌ 禁止使用以下颜色 */
/* 红色 #E8210A — 不在官方色盘 */
/* 旧主蓝 #1770EA — 已替换为 #2971EB */
/* 旧品金 #FFC000 / #FFB800 — 已统一为 #FFB61A */

/* ✅ 仅允许使用以下颜色变量 */
:root {
  --allowed-colors: var(--brand-primary), var(--brand-secondary),
    var(--brand-accent), var(--brand-dark), var(--color-growth),
    var(--color-challenge), var(--color-emphasis), var(--color-text),
    var(--color-muted), var(--color-bg-light), var(--color-white);
}
```

---

## 9. Logo 处理

```css
/* ─── Logo 位置 ─── */
.logo {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  height: clamp(1.5rem, 3vw, 2rem);
  object-fit: contain;
}

.logo-white { filter: brightness(0) invert(1); }  /* 深色背景用白色版 */

/* ─── 封面/章节页 Logo ─── */
.slide-cover .logo,
.slide-section .logo {
  filter: brightness(0) invert(1);  /* 白色 Logo */
}

/* ─── 内容页 Logo ─── */
.slide-content .logo {
  /* 原色 Logo */
}
```

---

## 10. 页脚与保密声明

```css
/* ─── 页脚 ─── */
.footer {
  position: absolute;
  bottom: 0.3rem;
  right: 0.5rem;
  font-size: clamp(0.5rem, 1vw, 0.6rem);
  color: var(--color-muted);
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
}

.page-number {
  color: var(--brand-primary);
  font-weight: bold;
}

/* ─── 保密声明 ─── */
.confidential {
  position: absolute;
  bottom: 0.3rem;
  left: 0.5rem;
  font-size: clamp(0.5rem, 1vw, 0.6rem);
  color: var(--color-muted);
}

.slide-cover .confidential,
.slide-section .confidential,
.slide-closing .confidential {
  color: var(--color-muted);
}
```

---

## 11. 键盘导航提示（可选显示）

```css
.nav-hint {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: clamp(0.6rem, 1.2vw, 0.75rem);
  color: var(--color-muted);
  background: var(--color-bg-light);
  padding: 0.3rem 0.8rem;
  border-radius: var(--radius-sm);
  opacity: 0;
  transition: opacity var(--transition-normal);
  z-index: 100;
}

.nav-hint.show {
  opacity: 1;
}

.nav-hint kbd {
  background: var(--color-white);
  padding: 0.1rem 0.3rem;
  border-radius: 2px;
  border: 1px solid var(--color-muted);
  font-family: inherit;
}
```

---

## 12. 高级排版特性（v2.0 新增）

```css
/* ─── 标题换行优化（避免孤词）─── */
h1, h2, h3 {
  text-wrap: balance;  /* 多行标题自然平衡换行 */
}

/* ─── 正文换行优化（避免寡孀孤儿）─── */
p {
  text-wrap: pretty;   /* 智能避免最后一行只有1-2个词 */
}

/* ─── 中文标点挤压 ─── */
p {
  text-spacing-trim: space-all;
  hanging-punctuation: first;  /* 行首标点悬挂 */
}

/* ─── 可读行长（66字符黄金线）─── */
.text-block {
  max-width: 66ch;  /* 字符单位，最佳阅读宽度 */
}
```

---

## 13. CSS Grid Named Areas（布局语义化）

```css
/* ─── Named Grid Areas（可读性爆表）─── */
.layout-dashboard {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main stats"
    "footer footer footer";
  grid-template-columns: 240px 1fr 200px;
  grid-template-rows: auto 1fr auto;
}

.layout-dashboard > header { grid-area: header; }
.layout-dashboard > aside  { grid-area: sidebar; }
.layout-dashboard > main   { grid-area: main; }
.layout-dashboard > .stats { grid-area: stats; }
.layout-dashboard > footer { grid-area: footer; }

/* ─── 思维模型网格 ─── */
.layout-pdca {
  display: grid;
  grid-template-areas:
    "plan do"
    "act check";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: var(--gap-md);
}

.layout-pdca > .plan   { grid-area: plan; }
.layout-pdca > .do     { grid-area: do; }
.layout-pdca > .check  { grid-area: check; }
.layout-pdca > .act    { grid-area: act; }

/* ─── SWOT 2×2 ─── */
.layout-swot {
  display: grid;
  grid-template-areas:
    "strength weakness"
    "opportunity threat";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: var(--gap-md);
}
```

---

## 14. Subgrid 对齐（卡片内容统一高度）

```css
/* ─── 卡片内部 subgrid 对齐 ─── */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap-md);
}

.card {
  display: grid;
  grid-template-rows: subgrid;  /* 子元素沿用父网格行定义 */
  gap: var(--gap-xs);
}

/* 所有卡片标题行在同一水平线 */
.card-title { grid-row: 1; }
.card-body  { grid-row: 2; }
.card-meta  { grid-row: 3; }

/* ─── 示例：Bento Grid 卡片对齐 ─── */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto auto;
  gap: var(--gap-md);
}

.bento-card {
  display: grid;
  grid-template-rows: subgrid;
}

.bento-card-icon   { grid-row: 1; }
.bento-card-title  { grid-row: 2; }
.bento-card-body   { grid-row: 3; }
```

---

## 15. Hover 交互效果（v2.0 新增）

```css
/* ─── 卡片 hover lift ─── */
.card {
  transition: transform var(--transition-normal),
              box-shadow var(--transition-normal);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-3);  /* 品牌光晕 */
}

/* ─── Bento 主卡 hover scale ─── */
.bento-main:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 30px rgba(41,113,235,0.15);
}

/* ─── 按钮 hover ─── */
.btn-primary {
  background: var(--brand-primary);
  color: var(--color-white);
  padding: var(--gap-sm) var(--gap-md);
  border-radius: var(--radius-sm);
  transition: background var(--transition-fast);
}

.btn-primary:hover {
  background: color-mix(in oklch, var(--brand-primary) 85%, black);
}

/* ─── 导航点 hover ─── */
.nav-dot:hover {
  background: var(--brand-secondary);
  transform: scale(1.2);
}

/* ─── 链接 hover ─── */
a {
  color: var(--brand-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--brand-secondary);
  text-decoration: underline;
  text-underline-offset: 2px;
}
```

---

## 16. 滚动条美化

```css
/* ─── 自定义滚动条 ─── */
* {
  scrollbar-width: thin;  /* Firefox */
  scrollbar-color: var(--brand-primary) transparent;
}

/* ─── Chrome/Safari 滚动条 ─── */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--brand-primary);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--brand-secondary);
}
```

---

## 17. 玻璃拟态（克制使用）

```css
/* ─── Glassmorphism（仅用于悬浮导航/提示）─── */
.glass-panel {
  backdrop-filter: blur(20px) saturate(150%);
  background: color-mix(in oklch, var(--color-white) 70%, transparent);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: var(--radius-md);
}

/* ─── 仅用于深色背景上的悬浮元素 ─── */
.slide-cover .nav-hint,
.slide-section .nav-hint {
  backdrop-filter: blur(10px);
  background: rgba(0,0,0,0.4);
}

/* ⚠️ 禁止滥用 glassmorphism：
   ❌ 大面积卡片背景
   ❌ 内容区域主背景
   ✅ 仅用于小面积悬浮提示、导航遮罩
*/
```

---

## 18. View Transitions API（页面切换丝滑）

```css
/* ─── 启用 view transitions ─── */
@view-transition {
  navigation: auto;
}

/* ─── 自定义过渡动画 ─── */
::view-transition-old(root) {
  animation: fadeOut 0.3s ease-out;
}

::view-transition-new(root) {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeOut {
  from { opacity: 1; }
  to   { opacity: 0; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* ─── 幻灯片切换过渡 ─── */
.slide {
  view-transition-name: slide-content;
}

/* ⚠️ 注意：View Transitions API 目前仅在 Chrome 111+ 支持，
   其他浏览器会 fallback 到普通切换 */
```

---

## 19. CSS Token 文件拆分（多文件架构）

当使用多文件架构（deck_index.html + slides/*.html）时，可拆分为独立 CSS 文件：

```css
/* shared/tokens.css ─── 品牌色变量（所有页面共享）─── */
:root {
  /* 从 §1 复制全部 CSS 自定义属性 */
}

/* shared/base.css ─── 基础样式 ─── */
/* 从 §2 复制视口锁定 + 进度条 + 导航点 */

/* shared/animations.css ─── 动画 ─── */
/* 从 §4 复制 fadeInUp + stagger */

/* shared/components.css ─── 卡片 + 按钮 ─── */
/* 从 §5 + §15 复制 */

/* 使用方式（单页 HTML 引入）─── */
<link rel="stylesheet" href="../shared/tokens.css">
<link rel="stylesheet" href="../shared/base.css">
<link rel="stylesheet" href="../shared/animations.css">
<link rel="stylesheet" href="../shared/components.css">
<style>
  /* 本页专用样式 */
</style>
```

---

## 20. :has() 选择器（条件样式）

```css
/* ─── 有图片的卡片无顶 padding ─── */
.card:has(img) {
  padding-top: 0;
}

/* ─── 有重点标记的卡片加强边框 ─── */
.card:has(.emphasis) {
  border: 2px solid var(--brand-primary);
}

/* ─── 有 emoji 图标的标题调整间距 ─── */
h1:has(.icon) {
  gap: var(--gap-sm);
}

/* ─── 深色背景上的所有文字白色 ─── */
.slide-cover:has(.logo-white) h1,
.slide-section:has(.logo-white) h1 {
  color: var(--color-white);
}
```

---

## 21. Container Queries（组件级响应式）

```css
/* ─── 定义容器 ─── */
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* ─── 容器级响应式 ─── */
@container card (min-width: 300px) {
  .card {
    flex-direction: row;  /* 宽卡片横向布局 */
  }
  .card-icon {
    margin-bottom: 0;
    margin-right: var(--gap-sm);
  }
}

@container card (max-width: 200px) {
  .card-title {
    font-size: clamp(0.8rem, 1.5vw, 0.9rem);  /* 紧凑卡片缩小标题 */
  }
}
```
```