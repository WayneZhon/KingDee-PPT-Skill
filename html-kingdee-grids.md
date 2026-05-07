# 金蝶 HTML 网格比例系统 v1.0

> 从 open-design 借鉴的比例布局：用"份数比例"替代固定坐标。
> 所有网格基于 12 份划分，语义化命名。
> 与 `html-kingdee-components.md` 配合使用。

---

## 核心设计理念

**问题**：PPTX 版式用英寸坐标（`x: 0.435, w: 10.601`），HTML 无法直接对应。

**方案**：采用"份数比例"命名：

```
PPTX 坐标 → HTML 份数比例
x: 0.435, w: 10.601 → margin-left: 0.5rem; width: calc(100% - 1rem)
左 7 份 右 5 份 → grid-2-7-5（语义命名）
```

---

## 网格类名速查

| 类名 | 份数比例 | 用途 | 适用组件 |
|------|---------|------|---------|
| `.grid-2-6-6` | 6:6（1:1） | 对半分 | pillar-card, 对比页 |
| `.grid-2-7-5` | 7:5（文字主导） | 左文右图 | callout + figure |
| `.grid-2-8-4` | 8:4（2:1） | 大段文字 + 小图 | quote + image |
| `.grid-3` | 4:4:4（三等分） | 三支柱 | pillar-card, stat-card |
| `.grid-3-3` | 4:4:4 × 2 行 | 六格矩阵 | stat-card, 图片网格 |
| `.grid-4` | 3:3:3:3（四等分） | 四项并列 | pillar-card |
| `.grid-4-2` | 3:3:3:3 × 2 行 | 八格矩阵 | 图片网格 |
| `.grid-5` | 2.4:2.4:2.4:2.4:2.4 | 五列等分 | IPD五看, step-card |
| `.grid-6` | 2:2:2:2:2:2 | 六列等分 | stat-card 小数字 |

---

## CSS 定义（全部基于 12 份）

```css
/* ─── 基础网格变量 ─────────────────────────────────────── */
:root {
  --grid-gap-h: 3vw;   /* 水平间距 */
  --grid-gap-v: 4vh;   /* 垂直间距 */
  --grid-col: calc((100% - 11 * var(--grid-gap-h)) / 12);
}

/* ─── 双列网格 ────────────────────────────────────────── */

/* 6:6 对半分 */
.grid-2-6-6 {
  display: grid;
  grid-template-columns: repeat(2, 6fr);
  gap: var(--grid-gap-h) var(--grid-gap-v);
}

/* 7:5 文字主导 + 辅图 */
.grid-2-7-5 {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: var(--grid-gap-h) var(--grid-gap-v);
}

/* 8:4 大段文字 + 小图/数据 */
.grid-2-8-4 {
  display: grid;
  grid-template-columns: 8fr 4fr;
  gap: var(--grid-gap-h) var(--grid-gap-v);
}

/* ─── 三列网格 ────────────────────────────────────────── */

/* 三等分 */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--grid-gap-h) var(--grid-gap-v);
}

/* 3×2 六格矩阵 */
.grid-3-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: var(--grid-gap-h) var(--grid-gap-v);
}

/* ─── 四列网格 ────────────────────────────────────────── */

/* 四等分 */
.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--grid-gap-h) var(--grid-gap-v);
}

/* 4×2 八格矩阵 */
.grid-4-2 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: var(--grid-gap-h) var(--grid-gap-v);
}

/* ─── 五列网格（IPD五看专用）────────────────────────────── */

.grid-5 {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: calc(var(--grid-gap-h) * 0.8) var(--grid-gap-v);
}

/* ─── 六列网格（小数字卡片）────────────────────────────── */

.grid-6 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: var(--grid-gap-h) var(--grid-gap-v);
  /* 实际是 3×2，但语义为"6 个卡片" */
}
```

---

## 网格对齐规则

### 默认对齐（已预设）

```css
.grid-2-6-6,
.grid-2-7-5,
.grid-2-8-4,
.grid-3,
.grid-3-3,
.grid-4,
.grid-4-2,
.grid-5,
.grid-6 {
  align-items: start;  /* 所有网格默认顶对齐 */
}
```

### 左列文字贴底 + 右列图片贴顶（常见场景）

```html
<!-- 左列用 flex column 让 callout 自然贴底 -->
<div class="grid-2-7-5">
  <div style="display: flex; flex-direction: column; justify-content: space-between">
    <div>
      <div class="kicker">BUT</div>
      <h2 class="h-xl">我不是程序员。</h2>
      <p class="lead">...</p>
    </div>
    <div class="callout">...</div>  <!-- 自然贴底 -->
  </div>
  <figure class="frame-img">...</figure>  <!-- 默认贴顶 -->
</div>
```

**禁止**：`align-self: end`（会让图片滑到 cell 底被遮挡）

---

## 图片在网格中的约束

### 固定高度（vh），不用 aspect-ratio

```css
/* 图片网格统一用 vh */
.grid-3-3 .frame-img,
.grid-4-2 .frame-img {
  height: 26vh;  /* 不用 aspect-ratio，避免撑破 */
}

/* 单张主图用 aspect-ratio + max-height */
.frame-img.hero {
  aspect-ratio: 16/10;
  max-height: 56vh;
}
```

### object-position: top center

```css
.frame-img img {
  object-fit: cover;
  object-position: top center;  /* 只裁底部，不裁顶/左/右 */
}
```

---

## 使用场景对照

| PPTX 版式 | HTML 网格 + 组件组合 |
|-----------|---------------------|
| 版式 05 数据卡片（3列） | `stat-card + grid-3` |
| 版式 05 数据卡片（3×2） | `stat-card + grid-6` |
| 版式 07 左右对比 | `grid-2-6-6`（两列均分） |
| 版式 08 图文并排（图为主） | `grid-2-7-5`（文 7 图 5） |
| 版式 08 图文并排（文为主） | `grid-2-8-4`（文 8 图 4） |
| 版式 14 核心特性（三支柱） | `pillar-card + grid-3` |
| 版式 14 核心特性（四支柱） | `pillar-card + grid-4` |
| 版式 25 IPD五看 | `pillar-card + grid-5`（5 列） |
| 版式 05 图片网格（6 张） | `frame-img + grid-3-3`（固定 height: 26vh） |

---

## 命名规则

**类名格式**：`grid-{列数}-{份数1}-{份数2}` 或 `grid-{列数}`

- `grid-2-7-5`：双列，左 7 份右 5 份
- `grid-3`：三列等分（每列 4 份）
- `grid-5`：五列等分（每列 2.4 份）
- `grid-6`：语义上"六个卡片"，实际为 3×2 矩阵

**份数总和**：所有份数总和为 12（基于 12 列网格系统）

---

## 响应式断点

```css
/* 移动端降级为单列 */
@media (max-width: 768px) {
  .grid-2-6-6,
  .grid-2-7-5,
  .grid-2-8-4,
  .grid-3,
  .grid-4,
  .grid-5 {
    grid-template-columns: 1fr;
  }

  .grid-3-3,
  .grid-4-2,
  .grid-6 {
    grid-template-columns: repeat(2, 1fr);  /* 保持 2 列 */
  }
}
```

---

## 与 PPTX 版式坐标对照（参考）

| PPTX 版式 | 坐标（英寸） | HTML 份数 |
|-----------|-------------|-----------|
| 版式 05 三列卡片 | `cW = (12.256 - 2*0.24) / 3 ≈ 3.93` | `grid-3`（4:4:4） |
| 版式 07 左右对比 | `左: x=0.435, w=5.77; 右: x=6.42, w=5.77` | `grid-2-6-6`（6:6） |
| 版式 08 图文并排 | `左: x=0.435, w=8.35; 右: x=8.98, w=3.75` | `grid-2-8-4`（8:4） |
| 版式 25 IPD五看 | `5 列等宽` | `grid-5`（2.4:2.4:2.4:2.4:2.4） |

---

## 网格 + 组件完整示例

### 数据卡片页（6 个 stat-card）

```html
<section class="slide light">
  <div class="frame" style="padding-top: 6vh">
    <div class="kicker">过去 64 天 · 开发篇</div>
    <h2 class="h-xl">一个人，做了什么</h2>

    <div class="grid-6" style="margin-top: 5vh">
      <!-- 6 个 stat-card，自动排成 3×2 -->
      <div class="stat-card">...</div>
      <div class="stat-card">...</div>
      <div class="stat-card">...</div>
      <div class="stat-card">...</div>
      <div class="stat-card">...</div>
      <div class="stat-card">...</div>
    </div>
  </div>
</section>
```

### 三支柱页（3 个 pillar-card）

```html
<section class="slide dark">
  <div class="frame">
    <h2 class="h-xl">三层文档体系</h2>

    <div class="grid-3" style="margin-top: 4vh">
      <div class="pillar-card">
        <div class="pillar-ic">01</div>
        <div class="pillar-title">CLAUDE.md</div>
        <div class="pillar-desc">...</div>
      </div>
      <div class="pillar-card">...</div>
      <div class="pillar-card">...</div>
    </div>
  </div>
</section>
```

### IPD五看页（5 列）

```html
<section class="slide light">
  <div class="frame">
    <h2 class="h-xl">市场全景分析</h2>

    <div class="grid-5" style="margin-top: 4vh">
      <div class="pillar-card">
        <div class="pillar-ic">01</div>
        <div class="pillar-title">看行业</div>
        <div class="pillar-desc">...</div>
      </div>
      <!-- 重复 5 个 -->
    </div>
  </div>
</section>
```

---

## 网格间距默认值

| 场景 | 水平间距 | 垂直间距 |
|------|---------|---------|
| 默认 | `3vw` | `4vh` |
| 紧凑（多列） | `1.5vw` | `2vh` |
| 宽松（少列） | `4vw` | `5vh` |

**inline 覆盖**：

```html
<div class="grid-3" style="gap: 1.5vw 2vh">
  <!-- 紧凑间距 -->
</div>
```