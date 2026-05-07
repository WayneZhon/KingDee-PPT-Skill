# 金蝶 HTML 版式预设 Layout Presets v2.0

> 基于 kingdee-ppt layout-presets.md，转换为 HTML/CSS 类定义。
> v2.0 新增：Bento hover交互、Grid named areas、subgrid对齐、卡片lift效果。
> 每种版式对应一个 CSS 类和 HTML 结构模板。
> 与 `html-kingdee-style.md` 配合使用。

---

## 版式类名速查

| 版式编号 | 类名 | 适用场景 |
|---------|------|---------|
| 01 | `.slide-cover` | 封面页 |
| 02 | `.slide-toc` | 目录页 |
| 03 | `.slide-section` | 章节分隔页 |
| 04 | `.slide-bullets` | 要点列表 |
| 05 | `.slide-data-cards` | 数据卡片 |
| 06 | `.slide-flow` | 步骤流程 |
| 07 | `.slide-compare` | 左右对比 |
| 08 | `.slide-image-text` | 图文并排 |
| 09 | `.slide-timeline` | 时间轴 |
| 10 | `.slide-closing` | 结尾页 |
| 11 | `.slide-dashboard` | 数据看板 |
| 12 | `.slide-bento` | Bento Grid |
| 13 | `.slide-arch` | 架构生态 |
| 14 | `.slide-features` | 核心特性卡片 |
| 15 | `.slide-matrix` | 分层矩阵 |
| 16 | `.slide-quote` | 金句/引言 |
| 17 | `.slide-immersive` | 图文沉浸 |
| 18 | `.slide-hero` | 超大焦点页 |
| 19 | `.slide-pyramid` | 金字塔/MECE |
| 20 | `.slide-pdca` | PDCA 循环 |
| 21 | `.slide-swot` | SWOT 矩阵 |
| 22 | `.slide-golden` | 黄金圈 |
| 23 | `.slide-5w1h` | 5W1H 六格 |
| 24 | `.slide-scqa` | SCQA 四步 |
| 25 | `.slide-ipd` | IPD 五看 |
| 26 | `.slide-icon-row` | 图标+文字行 |
| 27 | `.slide-half-bleed` | 半出血叠加 |
| 28 | `.slide-floating-stats` | 悬浮统计 |
| 29 | `.slide-compare-bar` | 对比栏 |

---

## 版式 01 — 封面页

```html
<section class="slide slide-cover">
  <img class="logo logo-white" src="assets/logo_white.png" alt="金蝶 Logo">
  <div class="slide-content">
    <h1 class="cover-title animate-fade-up">{主标题}</h1>
    <p class="cover-subtitle animate-fade-up stagger-2">{副标题}</p>
    <div class="cover-meta animate-fade-up stagger-3">
      <span class="author">{作者}</span>
      <span class="dept">{部门}</span>
      <span class="date">{日期}</span>
    </div>
  </div>
  <div class="copyright">版权所有 © 金蝶国际软件集团有限公司 始创于 1993</div>
  <div class="confidential">④ 内部公开 请勿外传</div>
</section>
```

```css
.slide-cover {
  background: var(--gradient-cover);
  color: var(--color-white);
}

/* ─── 标题层（推荐直接使用 typography.md 的 .h-hero/.h-xl/.lead）─── */
/* 封面标题：继承 .h-hero 衬线风格 */
.slide-cover .cover-title {
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 10vw, 4rem);  /* 与 .h-hero 一致 */
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: var(--gap-md);
  text-align: center;
}

/* 封面副标题：继承 .lead 衬线风格 */
.slide-cover .cover-subtitle {
  font-family: var(--font-serif);
  font-size: clamp(1rem, 2vw, 1.25rem);  /* 与 .lead 一致 */
  line-height: 1.4;
  color: var(--color-bg-light);
  margin-bottom: var(--gap-xl);
}

.slide-cover .cover-meta {
  display: flex;
  flex-direction: column;
  gap: var(--gap-xs);
  font-size: clamp(0.85rem, 1.8vw, 1rem);
}

.slide-cover .copyright {
  position: absolute;
  bottom: 0.5rem;
  left: 1rem;
  font-size: clamp(0.5rem, 1vw, 0.6rem);
  color: var(--color-muted);
}
```

---

## 版式 02 — 目录页

```html
<section class="slide slide-toc">
  <img class="logo" src="assets/logo_color.png" alt="金蝶 Logo">
  <div class="slide-content">
    <h2 class="toc-title">目  录</h2>
    <div class="toc-list">
      <div class="toc-item animate-fade-up stagger-1">
        <span class="toc-num">01</span>
        <span class="toc-section">{章节名}</span>
        <span class="toc-page">P 01</span>
      </div>
      <!-- 最多 4 个章节 -->
    </div>
  </div>
  <div class="footer">
    <span class="confidential">④ 内部公开 请勿外传</span>
    <span class="page-number">02</span>
  </div>
</section>
```

```css
.slide-toc {
  background: var(--color-white);
}

.toc-title {
  font-size: var(--title-size);
  margin-bottom: var(--gap-lg);
  color: var(--color-text);
}

.toc-list {
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
}

.toc-item {
  display: grid;
  grid-template-columns: 4rem 1fr 3rem;
  align-items: center;
  gap: var(--gap-md);
  padding: var(--gap-sm) 0;
  border-bottom: 1px solid var(--color-muted);
}

.toc-num {
  font-size: var(--toc-number);
  font-weight: bold;
  color: var(--brand-primary);
}

.toc-section {
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: bold;
  color: var(--color-text);
}

.toc-page {
  font-size: clamp(0.85rem, 1.5vw, 0.9rem);
  color: var(--brand-primary);
  text-align: right;
}
```

---

## 版式 03 — 章节分隔页

```html
<section class="slide slide-section">
  <img class="logo logo-white" src="assets/logo_white.png" alt="金蝶 Logo">
  <div class="slide-content">
    <span class="section-num animate-scale">{章节编号}</span>
    <div class="section-line"></div>
    <h2 class="section-title animate-fade-up stagger-2">{章节标题}</h2>
    <p class="section-subtitle animate-fade-up stagger-3">{副标题}</p>
  </div>
  <div class="footer">
    <span class="page-number">{页码}</span>
  </div>
</section>
```

```css
.slide-section {
  background: linear-gradient(135deg, var(--brand-dark), var(--brand-primary));
  color: var(--color-white);
}

.section-num {
  font-size: var(--chapter-number);
  font-weight: bold;
  color: var(--brand-accent);
  margin-bottom: var(--gap-sm);
}

.section-line {
  width: 4rem;
  height: 0.15rem;
  background: var(--brand-accent);
  margin-bottom: var(--gap-md);
}

.section-title {
  font-size: clamp(1.5rem, 4vw, 1.8rem);
  font-weight: bold;
}

.section-subtitle {
  font-size: clamp(0.85rem, 2vw, 1rem);
  color: var(--color-bg-light);
}
```

---

## 版式 04 — 要点列表

```html
<section class="slide slide-bullets">
  <img class="logo" src="assets/logo_color.png" alt="金蝶 Logo">
  <div class="slide-content">
    <h2 class="page-title animate-fade-up">{页面标题}</h2>
    <p class="page-subtitle animate-fade-up stagger-1">{副标题}</p>
    <ul class="bullet-list animate-fade-up stagger-2">
      <li class="bullet-item">普通要点</li>
      <li class="bullet-item bullet-highlight">重点要点（蓝色强调）</li>
      <li class="bullet-item bullet-gold">警示要点（黄色强调）</li>
    </ul>
  </div>
  <div class="footer">
    <span class="confidential">④ 内部公开 请勿外传</span>
    <span class="page-number">{页码}</span>
  </div>
</section>
```

```css
.slide-bullets {
  background: var(--color-white);
}

/* ─── 页面标题层（推荐直接使用 typography.md 的 .h-xl/.lead）─── */
/* 页面主标题：继承 .h-xl 衬线风格 */
.page-title {
  font-family: var(--font-serif);
  font-size: clamp(1.8rem, 7vw, 2.5rem);  /* 与 .h-xl 一致 */
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--color-text);
  margin-bottom: var(--gap-xs);
}

/* 页面副标题/引导段：继承 .lead 衬线风格 */
.page-subtitle {
  font-family: var(--font-serif);
  font-size: clamp(1rem, 2vw, 1.25rem);  /* 与 .lead 一致 */
  line-height: 1.4;
  color: var(--color-text-secondary);
  margin-bottom: var(--gap-lg);
}

.bullet-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
  max-width: min(80vw, 900px);
}

.bullet-item {
  font-size: var(--body-size);
  color: var(--color-text);
  padding-left: 1.5em;
  position: relative;
}

.bullet-item::before {
  content: '•';
  color: var(--brand-primary);
  font-weight: bold;
  position: absolute;
  left: 0;
}

.bullet-highlight::before { color: var(--brand-primary); }
.bullet-highlight { font-weight: bold; color: var(--brand-primary); }

.bullet-gold::before { color: var(--color-emphasis); }
.bullet-gold { font-weight: bold; color: var(--color-emphasis); }
```

---

## 版式 05 — 数据卡片

```html
<section class="slide slide-data-cards">
  <img class="logo" src="assets/logo_color.png" alt="金蝶 Logo">
  <div class="slide-content">
    <h2 class="page-title animate-fade-up">{页面标题}</h2>
    <div class="data-card-grid animate-fade-up stagger-2">
      <div class="data-card">
        <div class="data-card-header" style="background: var(--brand-primary);">
          <span class="data-card-label">{标签}</span>
        </div>
        <div class="data-card-body">
          <span class="data-card-number">{数字}</span>
          <span class="data-card-unit">{单位}</span>
          <p class="data-card-desc">{描述}</p>
        </div>
      </div>
      <!-- 最多 4 张卡片 -->
    </div>
  </div>
  <div class="footer">
    <span class="confidential">④ 内部公开 请勿外传</span>
    <span class="page-number">{页码}</span>
  </div>
</section>
```

```css
.data-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  gap: var(--gap-md);
  width: 100%;
  max-width: min(90vw, 1200px);
}

.data-card {
  background: var(--color-bg-light);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-1);
  overflow: hidden;
}

.data-card-header {
  padding: var(--gap-sm);
  text-align: center;
}

.data-card-label {
  font-size: clamp(0.85rem, 1.5vw, 1rem);
  font-weight: bold;
  color: var(--color-white);
}

.data-card-body {
  padding: var(--gap-md);
  text-align: center;
}

.data-card-number {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: bold;
  color: var(--brand-primary);
  display: block;
}

.data-card-unit {
  font-size: var(--body-size);
  color: var(--brand-primary);
}

.data-card-desc {
  font-size: var(--card-body);
  color: var(--color-text);
  margin-top: var(--gap-sm);
}

/* ─── v2.0: 数据卡片 hover lift ─── */
.data-card {
  transition: transform var(--transition-normal),
              box-shadow var(--transition-normal);
}

.data-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-3);  /* 品牌光晕 */
}
```

---

## 版式 11 — 数据看板页（超大数字）

```html
<section class="slide slide-dashboard">
  <img class="logo" src="assets/logo_color.png" alt="金蝶 Logo">
  <div class="slide-content">
    <h2 class="page-title animate-fade-up">{页面标题}</h2>
    <div class="dashboard-grid animate-fade-up stagger-2">
      <div class="dashboard-card dashboard-primary">
        <span class="dashboard-label">{标签}</span>
        <span class="dashboard-number">{超大数字}</span>
        <span class="dashboard-sub">{同比/环比}</span>
        <!-- 可选迷你折线图 -->
        <div class="mini-chart" data-values="0.3,0.5,0.6,0.8,1.0"></div>
      </div>
      <!-- 最多 3 张 -->
    </div>
  </div>
  <div class="footer">
    <span class="page-number">{页码}</span>
  </div>
</section>
```

```css
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap-md);
  width: 100%;
  max-width: min(90vw, 1200px);
}

@media (max-width: 600px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

.dashboard-card {
  border-radius: var(--radius-md);
  padding: var(--gap-lg);
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
  position: relative;
}

.dashboard-primary {
  background: var(--brand-primary);
  color: var(--color-white);
}

.dashboard-secondary {
  background: var(--color-bg-light);
  color: var(--brand-primary);
}

.dashboard-label {
  font-size: clamp(0.85rem, 1.5vw, 1rem);
  opacity: 0.9;
}

.dashboard-number {
  font-size: var(--hero-number);
  font-weight: bold;
  line-height: 1.2;
}

.dashboard-sub {
  font-size: clamp(0.85rem, 1.5vw, 1rem);
  font-weight: bold;
  color: var(--brand-accent);
}

.dashboard-primary .dashboard-sub {
  color: var(--brand-accent);
}

.dashboard-secondary .dashboard-sub {
  color: var(--brand-primary);
}

/* 迷你折线图（SVG 内联） */
.mini-chart {
  height: 2rem;
  margin-top: var(--gap-sm);
}
```

---

## 版式 12 — Bento Grid

```html
<section class="slide slide-bento">
  <img class="logo" src="assets/logo_color.png" alt="金蝶 Logo">
  <div class="slide-content">
    <h2 class="page-title animate-fade-up">{页面标题}</h2>
    <div class="bento-grid animate-fade-up stagger-2">
      <!-- 主卡（左，深蓝） -->
      <div class="bento-main">
        <span class="bento-icon">{图标}</span>
        <span class="bento-number">{超大数字}</span>
        <h3 class="bento-title">{标题}</h3>
        <p class="bento-body">{正文}</p>
      </div>
      <!-- 次卡区（右，2×2） -->
      <div class="bento-secondary">
        <div class="bento-card">...</div>
        <div class="bento-card">...</div>
        <div class="bento-card">...</div>
        <div class="bento-card">...</div>
      </div>
    </div>
  </div>
  <div class="footer">
    <span class="page-number">{页码}</span>
  </div>
</section>
```

```css
.bento-grid {
  display: grid;
  grid-template-columns: 46% 54%;
  gap: var(--gap-md);
  width: 100%;
  height: min(80vh, 600px);
}

@media (max-width: 600px) {
  .bento-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
}

.bento-main {
  background: var(--brand-primary);
  border-radius: var(--radius-md);
  padding: var(--gap-lg);
  color: var(--color-white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: var(--shadow-3);
}

.bento-secondary {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: var(--gap-sm);
}

.bento-card {
  background: var(--color-bg-light);
  border-radius: var(--radius-md);
  padding: var(--gap-md);
  box-shadow: var(--shadow-1);
}

.bento-icon {
  font-size: clamp(1.5rem, 3vw, 2rem);
}

.bento-number {
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: bold;
  margin: var(--gap-sm) 0;
}

.bento-title {
  font-size: var(--card-title);
  font-weight: bold;
  margin-bottom: var(--gap-xs);
}

.bento-body {
  font-size: var(--card-body);
  color: var(--color-bg-light);
}

/* ─── v2.0: Bento hover 交互 ─── */
.bento-main {
  transition: transform var(--transition-normal),
              box-shadow var(--transition-normal);
}

.bento-main:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 30px rgba(41,113,235,0.15);
}

.bento-card {
  transition: transform var(--transition-normal),
              box-shadow var(--transition-normal);
}

.bento-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-3);  /* 品牌光晕 */
}

/* ─── v2.0: Bento subgrid 对齐 ─── */
.bento-secondary {
  display: grid;
  grid-template-rows: auto auto auto;
  gap: var(--gap-sm);
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

## 版式 19 — 金字塔 / MECE

```html
<section class="slide slide-pyramid">
  <img class="logo" src="assets/logo_color.png" alt="金蝶 Logo">
  <div class="slide-content">
    <h2 class="page-title animate-fade-up">{页面标题}</h2>
    <div class="pyramid-wrapper animate-fade-up stagger-2">
      <!-- 顶层：核心结论 -->
      <div class="pyramid-top">
        <span class="pyramid-conclusion">{核心结论}</span>
      </div>
      <!-- 中层：三大分论点 -->
      <div class="pyramid-middle">
        <div class="pyramid-pillar" style="--pillar-color: var(--color-emphasis);">
          <span class="pillar-label">{分论点1}</span>
        </div>
        <div class="pyramid-pillar" style="--pillar-color: var(--color-emphasis);">
          <span class="pillar-label">{分论点2}</span>
        </div>
        <div class="pyramid-pillar" style="--pillar-color: var(--color-emphasis);">
          <span class="pillar-label">{分论点3}</span>
        </div>
      </div>
      <!-- 底层：论据区 -->
      <div class="pyramid-bottom">
        <div class="pyramid-evidence">
          <ul class="evidence-list">
            <li>{论据1}</li>
            <li>{论据2}</li>
          </ul>
        </div>
        <!-- 重复 3 个论据区 -->
      </div>
    </div>
  </div>
  <div class="footer">
    <span class="page-number">{页码}</span>
  </div>
</section>
```

```css
.pyramid-wrapper {
  width: 100%;
  max-width: min(90vw, 1100px);
}

.pyramid-top {
  background: var(--brand-primary);
  padding: var(--gap-md) var(--gap-lg);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  text-align: center;
  box-shadow: var(--shadow-2);
}

.pyramid-conclusion {
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  font-weight: bold;
  color: var(--color-white);
}

.pyramid-middle {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap-sm);
  margin-top: var(--gap-xs);
}

.pyramid-pillar {
  background: var(--pillar-color, var(--color-emphasis));
  padding: var(--gap-sm);
  text-align: center;
  box-shadow: var(--shadow-1);
}

.pillar-label {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  font-weight: bold;
  color: var(--brand-dark);
}

.pyramid-bottom {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap-sm);
  margin-top: var(--gap-xs);
}

.pyramid-evidence {
  background: var(--color-bg-light);
  border-radius: var(--radius-sm);
  padding: var(--gap-md);
  box-shadow: var(--shadow-1);
}

.evidence-list {
  list-style: none;
  padding: 0;
  font-size: var(--card-body);
  color: var(--color-text);
}

.evidence-list li {
  margin-bottom: var(--gap-xs);
  position: relative;
  padding-left: 1em;
}

.evidence-list li::before {
  content: '●';
  color: var(--brand-primary);
  position: absolute;
  left: 0;
  font-size: 0.6em;
}
```

---

## 版式 20 — PDCA 循环

```html
<section class="slide slide-pdca">
  <img class="logo" src="assets/logo_color.png" alt="金蝶 Logo">
  <div class="slide-content">
    <h2 class="page-title animate-fade-up">{页面标题}</h2>
    <div class="pdca-grid animate-fade-up stagger-2">
      <div class="pdca-cell color-plan">
        <span class="pdca-letter">P</span>
        <span class="pdca-label">计划 Plan</span>
        <ul class="pdca-points">
          <li>{要点1}</li>
          <li>{要点2}</li>
        </ul>
      </div>
      <div class="pdca-cell color-do">
        <span class="pdca-letter">D</span>
        <span class="pdca-label">执行 Do</span>
        <ul class="pdca-points">...</ul>
      </div>
      <div class="pdca-cell color-act">
        <span class="pdca-letter">A</span>
        <span class="pdca-label">改进 Act</span>
        <ul class="pdca-points">...</ul>
      </div>
      <div class="pdca-cell color-check">
        <span class="pdca-letter">C</span>
        <span class="pdca-label">检查 Check</span>
        <ul class="pdca-points">...</ul>
      </div>
    </div>
    <!-- 中央循环标识 -->
    <div class="pdca-cycle-icon">↻</div>
  </div>
  <div class="footer">
    <span class="page-number">{页码}</span>
  </div>
</section>
```

```css
.pdca-grid {
  display: grid;
  grid-template-areas:
    "plan do"
    "act check";
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: var(--gap-md);
  width: 100%;
  max-width: min(90vw, 1000px);
  height: min(70vh, 500px);
}

/* ─── v2.0: Named Areas ─── */
.pdca-cell:nth-child(1) { grid-area: plan; }
.pdca-cell:nth-child(2) { grid-area: do; }
.pdca-cell:nth-child(3) { grid-area: act; }
.pdca-cell:nth-child(4) { grid-area: check; }

.pdca-cell {
  border-radius: var(--radius-md);
  padding: var(--gap-md);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-2);
  position: relative;
}

.pdca-letter {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: bold;
  opacity: 0.3;
  position: absolute;
  top: var(--gap-sm);
  left: var(--gap-sm);
}

.pdca-label {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  font-weight: bold;
  margin-bottom: var(--gap-sm);
  margin-left: 2.5rem;
}

.pdca-points {
  list-style: none;
  padding: 0;
  font-size: var(--card-body);
}

.pdca-points li {
  margin-bottom: var(--gap-xs);
  padding-left: 1em;
  position: relative;
}

.pdca-points li::before {
  content: '▸';
  position: absolute;
  left: 0;
}

.pdca-cycle-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: clamp(1.5rem, 3vw, 2rem);
  background: var(--color-white);
  border-radius: 50%;
  padding: var(--gap-sm);
  box-shadow: var(--shadow-2);
  color: var(--brand-primary);
}
```

---

## 版式 21 — SWOT 矩阵

```html
<section class="slide slide-swot">
  <img class="logo" src="assets/logo_color.png" alt="金蝶 Logo">
  <div class="slide-content">
    <h2 class="page-title animate-fade-up">{页面标题}</h2>
    <!-- 轴线标注 -->
    <div class="swot-axes">
      <span class="axis-label axis-top-left">内部因素</span>
      <span class="axis-label axis-top-right">外部因素</span>
    </div>
    <div class="swot-grid animate-fade-up stagger-2">
      <div class="swot-cell color-strength">
        <div class="swot-header">S  优势 Strengths</div>
        <div class="swot-body">
          <ul class="swot-points">...</ul>
        </div>
      </div>
      <div class="swot-cell color-opportunity">
        <div class="swot-header">O  机会 Opportunities</div>
        <div class="swot-body">...</div>
      </div>
      <div class="swot-cell color-weakness">
        <div class="swot-header">W  劣势 Weaknesses</div>
        <div class="swot-body">...</div>
      </div>
      <div class="swot-cell color-threat">
        <div class="swot-header">T  威胁 Threats</div>
        <div class="swot-body">...</div>
      </div>
    </div>
  </div>
  <div class="footer">
    <span class="page-number">{页码}</span>
  </div>
</section>
```

```css
.swot-axes {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: var(--gap-xs);
  font-size: clamp(0.7rem, 1.2vw, 0.8rem);
  color: var(--color-muted);
  text-align: center;
}

.swot-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: var(--gap-sm);
  width: 100%;
  max-width: min(90vw, 1000px);
}

.swot-cell {
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-1);
}

.swot-header {
  padding: var(--gap-sm);
  font-size: clamp(0.85rem, 1.5vw, 1rem);
  font-weight: bold;
}

.swot-body {
  background: var(--color-bg-light);
  padding: var(--gap-md);
}

.swot-points {
  list-style: none;
  padding: 0;
  font-size: var(--card-body);
  color: var(--color-text);
}

.swot-points li {
  margin-bottom: var(--gap-xs);
  padding-left: 1em;
  position: relative;
}

.swot-points li::before {
  content: '●';
  color: var(--brand-primary);
  position: absolute;
  left: 0;
  font-size: 0.6em;
}
```

---

## 版式 22 — 黄金圈

```html
<section class="slide slide-golden">
  <img class="logo" src="assets/logo_color.png" alt="金蝶 Logo">
  <div class="slide-content">
    <h2 class="page-title animate-fade-up">{页面标题}</h2>
    <div class="golden-wrapper animate-fade-up stagger-2">
      <!-- 左侧嵌套椭圆 -->
      <div class="golden-circles">
        <div class="golden-what"></div>
        <div class="golden-how"></div>
        <div class="golden-why">
          <span class="golden-label">WHY</span>
        </div>
        <span class="golden-label-how">HOW</span>
        <span class="golden-label-what">WHAT</span>
      </div>
      <!-- 右侧说明卡 -->
      <div class="golden-explain">
        <div class="golden-row color-why">
          <div class="golden-bar"></div>
          <div class="golden-card">
            <span class="golden-title">WHY — 为什么</span>
            <p class="golden-body">{核心使命}</p>
          </div>
        </div>
        <div class="golden-row color-how">...</div>
        <div class="golden-row color-what">...</div>
      </div>
    </div>
  </div>
  <div class="footer">
    <span class="page-number">{页码}</span>
  </div>
</section>
```

```css
.golden-wrapper {
  display: grid;
  grid-template-columns: 45% 55%;
  gap: var(--gap-lg);
  width: 100%;
  max-width: min(90vw, 1100px);
  align-items: center;
}

@media (max-width: 600px) {
  .golden-wrapper {
    grid-template-columns: 1fr;
  }
  .golden-circles { margin-bottom: var(--gap-lg); }
}

.golden-circles {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
}

.golden-what {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--color-bg-light);
  border: 2px solid var(--brand-primary);
}

.golden-how {
  position: absolute;
  top: 25%;
  left: 25%;
  width: 50%;
  height: 50%;
  border-radius: 50%;
  background: var(--brand-secondary);
}

.golden-why {
  position: absolute;
  top: 40%;
  left: 40%;
  width: 20%;
  height: 20%;
  border-radius: 50%;
  background: var(--brand-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.golden-label {
  color: var(--color-white);
  font-size: clamp(0.7rem, 1.5vw, 0.9rem);
  font-weight: bold;
}

.golden-explain {
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
}

.golden-row {
  display: flex;
  gap: 0;
}

.golden-bar {
  width: 0.3rem;
  height: 100%;
}

.golden-card {
  background: var(--color-bg-light);
  padding: var(--gap-md);
  border-radius: var(--radius-sm);
  flex: 1;
}

.golden-title {
  font-size: clamp(0.85rem, 1.5vw, 1rem);
  font-weight: bold;
  margin-bottom: var(--gap-xs);
}

.golden-body {
  font-size: var(--card-body);
  color: var(--color-text);
}
```

---

## 版式 25 — IPD 五看

```html
<section class="slide slide-ipd">
  <img class="logo" src="assets/logo_color.png" alt="金蝶 Logo">
  <div class="slide-content">
    <h2 class="page-title animate-fade-up">{页面标题}</h2>
    <div class="ipd-grid animate-fade-up stagger-2">
      <div class="ipd-card color-view-1">
        <div class="ipd-header">
          <span class="ipd-num">01</span>
          <span class="ipd-label">看行业</span>
        </div>
        <div class="ipd-body">
          <p class="ipd-headline">{核心观点}</p>
          <div class="ipd-divider"></div>
          <p class="ipd-detail">{支撑数据}</p>
        </div>
      </div>
      <!-- 重复 5 列 -->
    </div>
  </div>
  <div class="footer">
    <span class="page-number">{页码}</span>
  </div>
</section>
```

```css
.ipd-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--gap-sm);
  width: 100%;
  max-width: min(95vw, 1200px);
}

@media (max-width: 800px) {
  .ipd-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 500px) {
  .ipd-grid {
    grid-template-columns: 1fr;
  }
}

.ipd-card {
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-1);
}

.ipd-header {
  padding: var(--gap-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap-xs);
}

.ipd-num {
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  font-weight: bold;
  color: var(--color-white);
}

.ipd-label {
  font-size: clamp(0.75rem, 1.5vw, 0.9rem);
  font-weight: bold;
  color: var(--color-white);
}

.ipd-body {
  background: var(--color-bg-light);
  padding: var(--gap-md);
}

.ipd-headline {
  font-size: clamp(0.8rem, 1.5vw, 0.9rem);
  font-weight: bold;
  color: var(--brand-primary);
  margin-bottom: var(--gap-xs);
}

.ipd-divider {
  height: 1px;
  background: var(--color-muted);
  margin: var(--gap-xs) 0;
}

.ipd-detail {
  font-size: var(--card-body);
  color: var(--color-text);
}
```

---

## 版式 16 — 金句/引言页

```html
<section class="slide slide-quote">
  <img class="logo" src="assets/logo_color.png" alt="金蝶 Logo">
  <div class="slide-content">
    <p class="quote-tagline animate-fade-up">{可选细标题}</p>
    <div class="quote-line animate-fade-up stagger-1"></div>
    <p class="quote-text animate-fade-up stagger-2">{金句内容}</p>
    <p class="quote-source animate-fade-up stagger-3">— {出处}</p>
  </div>
  <div class="footer">
    <span class="page-number">{页码}</span>
  </div>
</section>
```

```css
.slide-quote {
  background: var(--color-white);
}

.quote-tagline {
  font-size: var(--subtitle-size);
  color: var(--color-muted);
  margin-bottom: var(--gap-md);
}

.quote-line {
  width: 0.15rem;
  height: 6rem;
  background: var(--brand-primary);
  margin-bottom: var(--gap-lg);
}

.quote-text {
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  color: var(--color-text);
  max-width: min(80vw, 800px);
  line-height: 1.5;
}

.quote-source {
  font-size: var(--subtitle-size);
  color: var(--color-muted);
  margin-top: var(--gap-lg);
}
```

---

## 版式 28 — 悬浮统计页

```html
<section class="slide slide-floating-stats">
  <img class="logo" src="assets/logo_color.png" alt="金蝶 Logo">
  <div class="slide-content">
    <h2 class="page-title animate-fade-up">{页面标题}</h2>
    <div class="floating-grid animate-fade-up stagger-2">
      <div class="floating-stat">
        <div class="stat-accent-line" style="background: var(--brand-primary);"></div>
        <span class="stat-number">{数字}</span>
        <span class="stat-label">{标签}</span>
        <span class="stat-sub">{副说明}</span>
      </div>
      <!-- 最多 4 个 -->
    </div>
  </div>
  <div class="footer">
    <span class="page-number">{页码}</span>
  </div>
</section>
```

```css
.floating-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  gap: var(--gap-lg);
  width: 100%;
  max-width: min(90vw, 1200px);
}

.floating-stat {
  padding-top: var(--gap-md);
}

.stat-accent-line {
  width: 3rem;
  height: 0.15rem;
  margin-bottom: var(--gap-sm);
}

.stat-number {
  font-size: var(--hero-number);
  font-weight: bold;
  display: block;
  margin-bottom: var(--gap-xs);
}

.stat-label {
  font-size: clamp(1rem, 2vw, 1.1rem);
  font-weight: bold;
  color: var(--color-text);
  display: block;
  margin-bottom: var(--gap-xs);
}

.stat-sub {
  font-size: var(--card-body);
  color: var(--brand-primary);
}
```

---

## 版式 10 — 结尾页

```html
<section class="slide slide-closing">
  <img class="logo logo-white" src="assets/logo_white.png" alt="金蝶 Logo">
  <div class="slide-content">
    <img class="closing-thanks" src="assets/closing_thanks.png" alt="多语言致谢">
  </div>
  <div class="copyright">版权所有 © 金蝶国际软件集团有限公司 始创于 1993</div>
  <div class="confidential">④ 内部公开 请勿外传</div>
</section>
```

```css
.slide-closing {
  background: var(--gradient-cover);
}

.closing-thanks {
  max-width: min(60vw, 500px);
  object-fit: contain;
}
```