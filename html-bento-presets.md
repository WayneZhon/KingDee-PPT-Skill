# 金蝶 Bento Motion 版式预设 v1.0

> 10 种 Bento Grid 版式预设，覆盖常见展示场景。
> 纯白底 + 超大数字 + 中英文混排 + 勾线图形。
> 与 `html-bento-components.md` 配合使用。

---

## 版式总览

| 版式 ID | 类名 | 用途 | 卡片组合 |
|--------|------|------|---------|
| B01 | `.slide-hero` | 封面/开篇 | hero 卡 + 超大标题 |
| B02 | `.slide-metrics` | 数据展示 | 4 个数据卡 |
| B03 | `.slide-dashboard` | 看板 | large 主卡 + 4 小卡 |
| B04 | `.slide-comparison` | 对比 | 2 列 wide 卡 |
| B05 | `.slide-timeline` | 时间轴 | 3-4 个 wide 卡 + 勾线 |
| B06 | `.slide-features` | 功能特性 | 3×2 Grid + 图标 |
| B07 | `.slide-quote` | 金句 | full 卡 + 衬线大字 |
| B08 | `.slide-visual` | 图文沉浸 | tall 图片卡 + 文字卡 |
| B09 | `.slide-stack` | 技术栈 | 图标网格 + 勾线架构 |
| B10 | `.slide-closing` | 结尾 | full 卡 + Logo + CTA |

---

## B01 · Hero 封面页

### HTML 结构

```html
<section class="slide-hero min-h-screen snap-start flex items-center justify-center px-8">
  <div class="bento-grid grid-cols-4 max-w-6xl w-full">

    <!-- 主 hero 卡 -->
    <div class="bento-card bento-card--hero bento-card--primary text-center flex flex-col items-center justify-center">
      <div class="bento-subtitle-en mb-4">PRODUCT LAUNCH 2026</div>
      <h1 class="bento-title-hero">苍穹 PaaS 3.0</h1>
      <p class="bento-quote-en mt-4 max-w-lg">
        The next generation enterprise AI platform.
      </p>

      <!-- 透明度渐变装饰线 -->
      <div class="glow-primary h-1 w-32 mt-8 rounded-full"></div>
    </div>

  </div>
</section>
```

### Tailwind 精简版

```html
<section class="min-h-screen snap-start flex items-center justify-center px-8">
  <div class="bento-card bento-card--hero text-center bg-gradient-to-br from-kingdee-primary/8 to-kingdee-primary/2 border-2 border-kingdee-primary">
    <div class="text-xs text-kingdee-muted tracking-widest uppercase mb-4">LAUNCH 2026</div>
    <h1 class="text-[clamp(2rem,8vw,4rem)] font-serif font-bold text-kingdee-dark">苍穹 PaaS 3.0</h1>
    <p class="font-serif italic text-base text-kingdee-text/65 mt-4">The next generation platform.</p>
  </div>
</section>
```

---

## B02 · Metrics 数据展示页

### 4 个数据卡布局

```html
<section class="slide-metrics min-h-screen snap-start px-8 py-12">
  <div class="max-w-6xl mx-auto">
    <div class="bento-subtitle-en mb-2">KEY METRICS</div>
    <h2 class="bento-title-zh mb-8">核心数据指标</h2>

    <div class="bento-grid grid-cols-4">
      <!-- 卡片 1：用户数 -->
      <div class="bento-card bento-card--primary">
        <i class="fa-solid fa-users text-2xl text-kingdee-primary mb-3"></i>
        <div class="flex items-baseline">
          <span class="bento-number">12.8</span>
          <span class="bento-unit">M</span>
        </div>
        <div class="bento-subtitle-en mt-2">TOTAL USERS</div>
      </div>

      <!-- 卡片 2：增长率 -->
      <div class="bento-card">
        <i class="fa-solid fa-arrow-trend-up text-2xl text-kingdee-growth mb-3"></i>
        <div class="flex items-baseline">
          <span class="bento-number text-kingdee-growth">+23</span>
          <span class="bento-unit">%</span>
        </div>
        <div class="bento-subtitle-en mt-2">GROWTH RATE</div>
      </div>

      <!-- 卡片 3：效率 -->
      <div class="bento-card">
        <i class="fa-solid fa-bolt text-2xl text-kingdee-accent mb-3"></i>
        <div class="flex items-baseline">
          <span class="bento-number text-kingdee-accent">300</span>
          <span class="bento-unit">%</span>
        </div>
        <div class="bento-subtitle-en mt-2">EFFICIENCY</div>
      </div>

      <!-- 卡片 4：满意度 -->
      <div class="bento-card">
        <i class="fa-solid fa-heart text-2xl text-kingdee-emphasis mb-3"></i>
        <div class="flex items-baseline">
          <span class="bento-number text-kingdee-emphasis">98</span>
          <span class="bento-unit">%</span>
        </div>
        <div class="bento-subtitle-en mt-2">SATISFACTION</div>
      </div>
    </div>
  </div>
</section>
```

---

## B03 · Dashboard 看板页

### 主卡 + 4 小卡布局

```html
<section class="slide-dashboard min-h-screen snap-start px-8 py-12">
  <div class="bento-grid grid-cols-4 max-w-6xl">

    <!-- 主卡：超大数字 + 折线图 -->
    <div class="bento-card bento-card--large bento-card--primary">
      <div class="bento-subtitle-en">DAILY ACTIVE USERS</div>
      <div class="flex items-baseline mt-4">
        <span class="bento-number">128</span>
        <span class="bento-unit">K</span>
      </div>

      <!-- 简单折线图 -->
      <svg viewBox="0 0 200 60" class="w-full h-16 mt-6">
        <path class="line-simple line-path" d="M 0 50 L 40 42 L 80 38 L 120 28 L 160 18 L 200 12"/>
        <circle cx="0" cy="50" r="2" fill="#2971EB"/>
        <circle cx="40" cy="42" r="2" fill="#2971EB"/>
        <circle cx="80" cy="38" r="2" fill="#2971EB"/>
        <circle cx="120" cy="28" r="2" fill="#2971EB"/>
        <circle cx="160" cy="18" r="2" fill="#2971EB"/>
        <circle cx="200" cy="12" r="2" fill="#2971EB"/>
      </svg>
    </div>

    <!-- 小卡 1 -->
    <div class="bento-card">
      <div class="bento-number text-2xl">+15%</div>
      <div class="bento-subtitle-en">WEEKLY</div>
    </div>

    <!-- 小卡 2 -->
    <div class="bento-card">
      <div class="bento-number text-2xl text-kingdee-growth">89%</div>
      <div class="bento-subtitle-en">RETENTION</div>
    </div>

    <!-- 宽卡：地域分布 -->
    <div class="bento-card bento-card--wide">
      <div class="bento-subtitle-en">REGIONAL</div>
      <div class="flex items-end gap-2 h-20 mt-4">
        <div class="flex-1 bg-kingdee-primary/80 h-[70%] rounded-t text-xs text-white py-1 text-center">华东 35%</div>
        <div class="flex-1 bg-kingdee-secondary/80 h-[50%] rounded-t text-xs text-white py-1 text-center">华南 25%</div>
        <div class="flex-1 bg-kingdee-accent/80 h-[30%] rounded-t text-xs text-kingdee-dark py-1 text-center">华北 15%</div>
      </div>
    </div>
  </div>
</section>
```

---

## B04 · Comparison 对比页

### 2 列对比布局

```html
<section class="slide-comparison min-h-screen snap-start px-8 py-12">
  <div class="max-w-6xl mx-auto">
    <div class="bento-subtitle-en mb-2">COMPARISON</div>
    <h2 class="bento-title-zh mb-8">传统模式 vs 智能模式</h2>

    <div class="bento-grid grid-cols-2">

      <!-- 左列：传统模式 -->
      <div class="bento-card bento-card--tall">
        <div class="bento-subtitle-en text-kingdee-muted">TRADITIONAL</div>
        <div class="flex items-baseline mt-4">
          <span class="bento-number text-kingdee-muted">72</span>
          <span class="bento-unit">小时/周</span>
        </div>

        <ul class="mt-6 space-y-2 text-sm text-kingdee-text">
          <li class="flex items-center gap-2">
            <i class="fa-solid fa-xmark text-kingdee-muted"></i>
            <span>手动编码耗时</span>
          </li>
          <li class="flex items-center gap-2">
            <i class="fa-solid fa-xmark text-kingdee-muted"></i>
            <span>反复沟通确认</span>
          </li>
          <li class="flex items-center gap-2">
            <i class="fa-solid fa-xmark text-kingdee-muted"></i>
            <span>文档维护困难</span>
          </li>
        </ul>
      </div>

      <!-- 右列：智能模式 -->
      <div class="bento-card bento-card--tall bento-card--growth">
        <div class="bento-subtitle-en text-kingdee-growth">AI-POWERED</div>
        <div class="flex items-baseline mt-4">
          <span class="bento-number text-kingdee-growth">24</span>
          <span class="bento-unit">小时/周</span>
        </div>

        <ul class="mt-6 space-y-2 text-sm text-kingdee-text">
          <li class="flex items-center gap-2">
            <i class="fa-solid fa-check text-kingdee-growth"></i>
            <span>AI 辅助生成代码</span>
          </li>
          <li class="flex items-center gap-2">
            <i class="fa-solid fa-check text-kingdee-growth"></i>
            <span>自动上下文理解</span>
          </li>
          <li class="flex items-center gap-2">
            <i class="fa-solid fa-check text-kingdee-growth"></i>
            <span>实时文档同步</span>
          </li>
        </ul>

        <!-- 效率提升标注 -->
        <div class="mt-4 pt-4 border-t border-kingdee-growth/30">
          <div class="text-xs text-kingdee-muted">效率提升</div>
          <div class="bento-number text-2xl text-kingdee-growth">+300%</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## B05 · Timeline 时间轴页

### 4 步流程 + 勾线连接

```html
<section class="slide-timeline min-h-screen snap-start px-8 py-12">
  <div class="max-w-6xl mx-auto">
    <div class="bento-subtitle-en mb-2">ROADMAP</div>
    <h2 class="bento-title-zh mb-8">产品迭代路径</h2>

    <div class="flex items-center gap-6">

      <!-- 步骤 1 -->
      <div class="bento-card flex-1 text-center">
        <div class="bento-number text-xl text-kingdee-primary">01</div>
        <div class="bento-title-zh text-base mt-2">需求洞察</div>
        <div class="bento-subtitle-en mt-1">DISCOVERY</div>
      </div>

      <!-- 勾线连接 -->
      <svg viewBox="0 0 60 20" class="w-12">
        <path class="line-simple" d="M 5 10 L 45 10"/>
        <path class="line-simple" d="M 40 5 L 45 10 L 40 15"/>
      </svg>

      <!-- 步骤 2 -->
      <div class="bento-card flex-1 text-center">
        <div class="bento-number text-xl text-kingdee-secondary">02</div>
        <div class="bento-title-zh text-base mt-2">方案设计</div>
        <div class="bento-subtitle-en mt-1">DESIGN</div>
      </div>

      <!-- 勾线连接 -->
      <svg viewBox="0 0 60 20" class="w-12">
        <path class="line-simple" d="M 5 10 L 45 10"/>
        <path class="line-simple" d="M 40 5 L 45 10 L 40 15"/>
      </svg>

      <!-- 步骤 3 -->
      <div class="bento-card flex-1 text-center">
        <div class="bento-number text-xl text-kingdee-accent">03</div>
        <div class="bento-title-zh text-base mt-2">快速交付</div>
        <div class="bento-subtitle-en mt-1">DELIVERY</div>
      </div>

      <!-- 勾线连接 -->
      <svg viewBox="0 0 60 20" class="w-12">
        <path class="line-simple" d="M 5 10 L 45 10"/>
        <path class="line-simple" d="M 40 5 L 45 10 L 40 15"/>
      </svg>

      <!-- 步骤 4 -->
      <div class="bento-card flex-1 text-center bento-card--growth">
        <div class="bento-number text-xl text-kingdee-growth">04</div>
        <div class="bento-title-zh text-base mt-2">持续迭代</div>
        <div class="bento-subtitle-en mt-1">ITERATE</div>
      </div>
    </div>

    <!-- 时间标注 -->
    <div class="flex justify-center gap-32 mt-6">
      <div class="text-xs text-kingdee-muted">Q1 2026</div>
      <div class="text-xs text-kingdee-muted">Q2 2026</div>
      <div class="text-xs text-kingdee-muted">Q3 2026</div>
      <div class="text-xs text-kingdee-growth">Q4 2026</div>
    </div>
  </div>
</section>
```

---

## B06 · Features 功能特性页

### 3×2 Grid + 图标

```html
<section class="slide-features min-h-screen snap-start px-8 py-12">
  <div class="max-w-6xl mx-auto">
    <div class="bento-subtitle-en mb-2">CAPABILITIES</div>
    <h2 class="bento-title-zh mb-8">六大核心能力</h2>

    <div class="bento-grid grid-cols-3">

      <!-- 特性 1 -->
      <div class="bento-card text-center">
        <i class="fa-solid fa-brain text-4xl text-kingdee-primary mb-3"></i>
        <div class="bento-title-zh text-lg">智能代码生成</div>
        <p class="text-xs text-kingdee-muted mt-2">AI-driven code generation with context awareness</p>
      </div>

      <!-- 特性 2 -->
      <div class="bento-card text-center">
        <i class="fa-solid fa-shield-halved text-4xl text-kingdee-secondary mb-3"></i>
        <div class="bento-title-zh text-lg">安全合规审计</div>
        <p class="text-xs text-kingdee-muted mt-2">Built-in security & compliance checks</p>
      </div>

      <!-- 特性 3 -->
      <div class="bento-card text-center">
        <i class="fa-solid fa-plug text-4xl text-kingdee-accent mb-3"></i>
        <div class="bento-title-zh text-lg">生态连接</div>
        <p class="text-xs text-kingdee-muted mt-2">Seamless integration with 200+ apps</p>
      </div>

      <!-- 特性 4 -->
      <div class="bento-card text-center">
        <i class="fa-solid fa-clock text-4xl text-kingdee-growth mb-3"></i>
        <div class="bento-title-zh text-lg">实时协作</div>
        <p class="text-xs text-kingdee-muted mt-2">Real-time multi-user collaboration</p>
      </div>

      <!-- 特性 5 -->
      <div class="bento-card text-center">
        <i class="fa-solid fa-chart-line text-4xl text-kingdee-challenge mb-3"></i>
        <div class="bento-title-zh text-lg">数据分析</div>
        <p class="text-xs text-kingdee-muted mt-2">Advanced analytics & insights</p>
      </div>

      <!-- 特性 6 -->
      <div class="bento-card text-center">
        <i class="fa-solid fa-mobile-screen text-4xl text-kingdee-emphasis mb-3"></i>
        <div class="bento-title-zh text-lg">移动优先</div>
        <p class="text-xs text-kingdee-muted mt-2">Mobile-first responsive design</p>
      </div>
    </div>
  </div>
</section>
```

---

## B07 · Quote 金句页

### full 卡 + 衬线大字

```html
<section class="slide-quote min-h-screen snap-start flex items-center justify-center px-8">
  <div class="bento-card bento-card--full max-w-4xl text-center">

    <div class="bento-subtitle-en mb-4">CORE PHILOSOPHY</div>

    <!-- 中文金句（衬线大字）────────────────────────────── -->
    <blockquote class="bento-title-hero text-kingdee-dark leading-tight">
      「没有交接，所有人都在构建。」
    </blockquote>

    <!-- 英文出处（斜体点缀）────────────────────────────── -->
    <p class="bento-quote-en mt-6">
      "Without the handoff, everyone builds."
    </p>

    <!-- 元数据行（等宽小字）────────────────────────────── -->
    <div class="flex items-center justify-center gap-4 mt-8 text-xs text-kingdee-muted font-mono tracking-wider">
      <span>— Luke Wroblewski</span>
      <span class="text-kingdee-muted/50">·</span>
      <span>2026.04.16</span>
    </div>
  </div>
</section>
```

---

## B08 · Visual 图文沉浸页

### tall 图片卡 + 文字卡

```html
<section class="slide-visual min-h-screen snap-start px-8 py-12">
  <div class="bento-grid grid-cols-4 max-w-6xl">

    <!-- 图片卡（tall）────────────────────────────── -->
    <div class="bento-card bento-card--tall bg-kingdee-ice flex items-center justify-center">
      <!-- 占位图或真实产品图 -->
      <div class="w-full h-full bg-gradient-to-br from-kingdee-primary/20 to-kingdee-accent/10 rounded-lg flex items-center justify-center">
        <i class="fa-solid fa-image text-4xl text-kingdee-primary/40"></i>
      </div>
    </div>

    <!-- 文字卡（wide）────────────────────────────── -->
    <div class="bento-card bento-card--wide bento-card--primary">
      <div class="bento-subtitle-en">PRODUCT SHOWCASE</div>
      <h3 class="bento-title-zh mt-4 mb-3">苍穹 PaaS 3.0</h3>
      <p class="text-sm text-kingdee-text leading-relaxed">
        新一代企业级 AI 平台，支持智能代码生成、实时协作、安全合规审计。
        开发效率提升 300%，部署时间缩短 80%。
      </p>

      <!-- 简单柱状图 -->
      <div class="flex items-end gap-2 h-16 mt-6">
        <div class="w-4 bg-kingdee-primary/80 h-[60%] rounded-t"></div>
        <div class="w-4 bg-kingdee-primary/80 h-[80%] rounded-t"></div>
        <div class="w-4 bg-kingdee-primary/80 h-[95%] rounded-t"></div>
      </div>
      <div class="text-xs text-kingdee-muted mt-2">效率提升趋势</div>
    </div>
  </div>
</section>
```

---

## B09 · Stack 技术栈页

### 图标网格 + 勾线架构

```html
<section class="slide-stack min-h-screen snap-start px-8 py-12">
  <div class="max-w-6xl mx-auto">
    <div class="bento-subtitle-en mb-2">TECH STACK</div>
    <h2 class="bento-title-zh mb-8">技术架构</h2>

    <!-- 3 层架构 + 勾线连接 -->
    <div class="space-y-4">

      <!-- Layer 1：前端 -->
      <div class="flex items-center gap-4">
        <div class="bento-subtitle-en w-24">FRONTEND</div>
        <div class="flex gap-3">
          <div class="bento-card px-4 py-2 flex items-center gap-2">
            <i class="fa-solid fa-code text-xl text-kingdee-primary"></i>
            <span class="text-sm">React</span>
          </div>
          <div class="bento-card px-4 py-2 flex items-center gap-2">
            <i class="fa-solid fa-palette text-xl text-kingdee-secondary"></i>
            <span class="text-sm">Tailwind</span>
          </div>
        </div>
      </div>

      <!-- 勾线分隔 -->
      <svg viewBox="0 0 400 30" class="w-full h-8">
        <path class="line-dotted" d="M 100 5 L 100 25"/>
        <path class="line-dotted" d="M 200 5 L 200 25"/>
        <path class="line-dotted" d="M 300 5 L 300 25"/>
        <path class="line-simple" d="M 50 15 L 350 15"/>
      </svg>

      <!-- Layer 2：后端 -->
      <div class="flex items-center gap-4">
        <div class="bento-subtitle-en w-24">BACKEND</div>
        <div class="flex gap-3">
          <div class="bento-card px-4 py-2 flex items-center gap-2">
            <i class="fa-solid fa-server text-xl text-kingdee-growth"></i>
            <span class="text-sm">Node.js</span>
          </div>
          <div class="bento-card px-4 py-2 flex items-center gap-2">
            <i class="fa-solid fa-database text-xl text-kingdee-challenge"></i>
            <span class="text-sm">PostgreSQL</span>
          </div>
        </div>
      </div>

      <!-- 勾线分隔 -->
      <svg viewBox="0 0 400 30" class="w-full h-8">
        <path class="line-simple" d="M 50 15 L 350 15"/>
      </svg>

      <!-- Layer 3：AI -->
      <div class="flex items-center gap-4">
        <div class="bento-subtitle-en w-24">AI ENGINE</div>
        <div class="flex gap-3">
          <div class="bento-card px-4 py-2 flex items-center gap-2 bento-card--primary">
            <i class="fa-solid fa-brain text-xl text-kingdee-primary"></i>
            <span class="text-sm">Claude API</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## B10 · Closing 结尾页

### full 卡 + Logo + CTA

```html
<section class="slide-closing min-h-screen snap-start flex items-center justify-center px-8">
  <div class="bento-card bento-card--full max-w-4xl text-center">

    <!-- Logo -->
    <div class="mb-8">
      <img src="../assets/logo_color.png" alt="Kingdee" class="h-12 mx-auto">
    </div>

    <!-- 核心信息 -->
    <h2 class="bento-title-hero text-kingdee-dark mb-4">感谢聆听</h2>
    <p class="bento-quote-en">Thank you for your attention.</p>

    <!-- CTA -->
    <div class="mt-8 flex items-center justify-center gap-6">
      <a href="#" class="bento-card px-6 py-3 border-2 border-kingdee-primary text-kingdee-primary hover:bg-kingdee-primary hover:text-white transition-colors">
        <i class="fa-solid fa-envelope mr-2"></i>
        联系我们
      </a>
      <a href="#" class="bento-card px-6 py-3 border-2 border-kingdee-secondary text-kingdee-secondary hover:bg-kingdee-secondary hover:text-white transition-colors">
        <i class="fa-solid fa-book mr-2"></i>
        了解更多
      </a>
    </div>

    <!-- 页脚信息 -->
    <div class="mt-12 text-xs text-kingdee-muted">
      <div>金蝶国际软件集团 · AI平台生态产品部</div>
      <div class="mt-2 font-mono tracking-wider">2026.05.05</div>
    </div>
  </div>
</section>
```

---

## 版式选择指南

| 场景 | 推荐版式 | 组合建议 |
|------|---------|---------|
| 产品发布会 | B01 → B02 → B06 → B03 → B10 | Hero + 数据 + 功能 + Dashboard + 结尾 |
| 季度汇报 | B02 → B03 → B04 → B07 | Metrics + Dashboard + 对比 + 金句 |
| 技术分享 | B09 → B06 → B08 → B05 | Stack + 功能 + 图文 + 时间轴 |
| 品牌宣讲 | B01 → B07 → B06 → B10 | Hero + 金句 + 功能 + 结尾 |

---

## 下一步

- 动效扩展 → `html-bento-motion.md`
- 风格选择逻辑 → `SKILL.md` Phase H 分支