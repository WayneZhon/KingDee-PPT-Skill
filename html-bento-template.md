# 金蝶 Bento Motion HTML 骨架模板 v1.0

> Bento Grid + Apple 滚动动效风格。
> 使用 Tailwind CSS v4 + GSAP ScrollTrigger CDN。
> 纯白底 + 金蝶品牌色 accent。
> 与 Classic 风格（html-kingdee-*）并行，用户可选择。

---

## CDN 引用清单

```html
<!-- Tailwind CSS v4 Play CDN -->
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

<!-- GSAP Core + ScrollTrigger -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

<!-- Font Awesome 6 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<!-- Material Icons (可选) -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0">
```

---

## 完整 HTML 骨架

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>金蝶 Bento Deck</title>

  <!-- ─── CDN 引用 ─────────────────────────────────────── -->
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

  <!-- ─── Tailwind 金蝶品牌色配置 ─────────────────────────── -->
  <style type="text/tailwindcss">
    @theme {
      /* 金蝶品牌色 */
      --color-kingdee-primary:   #2971EB;  /* 科技蓝 */
      --color-kingdee-secondary: #22AAFE;  /* 亮天蓝 */
      --color-kingdee-accent:    #00CCFE;  /* 章节青 */
      --color-kingdee-dark:      #28245F;  /* 藏青 */
      --color-kingdee-growth:    #05C8C8;  /* 绿松石 */
      --color-kingdee-challenge: #966EFF;  /* 薰衣草 */
      --color-kingdee-emphasis:  #FFB61A;  /* 橙黄 */
      --color-kingdee-text:      #373838;  /* 正文灰 */
      --color-kingdee-muted:     #BFBFBF;  /* 次级灰 */
      --color-kingdee-ice:       #E7F1FF;  /* 冰蓝底 */

      /* 字体 */
      --font-serif: 'Noto Serif SC', 'Playfair Display', serif;
      --font-sans:  'Inter', 'Microsoft YaHei', sans-serif;

      /* 动画时长 */
      --animate-fast:   150ms;
      --animate-normal: 300ms;
      --animate-slow:   500ms;

      /* 圆角 */
      --radius-card: 16px;
      --radius-sm:   8px;
    }
  </style>

  <style>
    /* ─── 基础样式 ─────────────────────────────────────── */
    html {
      scroll-behavior: smooth;
    }

    body {
      background: #FFFFFF;
      font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
      color: var(--color-kingdee-text);
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    /* ─── 原生 CSS Scroll-Driven Fallback ─────────────────── */
    @supports (animation-timeline: view()) {
      @keyframes fade-in-up {
        from { opacity: 0; transform: translateY(40px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      .bento-card {
        animation: fade-in-up linear both;
        animation-timeline: view();
        animation-range: entry 0% cover 40%;
      }

      @keyframes draw-line {
        from { stroke-dashoffset: 1000; }
        to   { stroke-dashoffset: 0; }
      }

      .line-path {
        stroke-dasharray: 1000;
        animation: draw-line linear;
        animation-timeline: view();
        animation-range: entry 0% cover 60%;
      }
    }

    /* ─── 勾线图形基础 ─────────────────────────────────────── */
    .line-simple {
      stroke: #2971EB;
      stroke-width: 2;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .line-dotted {
      stroke: #22AAFE;
      stroke-width: 1.5;
      fill: none;
      stroke-dasharray: 4 4;
    }

    /* ─── 透明度渐变（科技感）────────────────────────────── */
    .glow-primary {
      background: linear-gradient(180deg,
        rgba(41, 113, 235, 1) 0%,
        rgba(41, 113, 235, 0.15) 100%);
    }

    .glow-accent {
      background: linear-gradient(135deg,
        rgba(0, 204, 254, 0.12) 0%,
        rgba(0, 204, 254, 0.02) 100%);
    }

    /* ─── 禁止不同色互相渐变 ─────────────────────────────── */
    /* ❌ 禁止：linear-gradient(to right, #2971EB, #FFB61A) */
    /* ✅ 仅允许：同色系透明度渐变 */
  </style>
</head>

<body class="bg-white text-kingdee-text">

  <!-- ─── 进度条 ─────────────────────────────────────── -->
  <div id="progress-bar"
       class="fixed top-0 left-0 h-1 bg-gradient-to-r from-kingdee-primary to-kingdee-secondary origin-left scale-x-0 z-50">
  </div>

  <!-- ─── 导航点（可选）────────────────────────────────────── -->
  <nav id="nav-dots" class="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-40">
    <!-- JS 动态生成 -->
  </nav>

  <!-- ─── 主内容区：垂直滚动 ─────────────────────────────── -->
  <main id="deck-container" class="snap-y snap-mandatory overflow-y-scroll h-screen">

    <!-- Slide 1: Hero 封面 -->
    <section class="slide-bento min-h-screen snap-start flex items-center justify-center px-8">
      <!-- 内容由 presets.md 版式填充 -->
    </section>

    <!-- Slide 2-N: 内容页 -->
    <section class="slide-bento min-h-screen snap-start px-8 py-12">
      <!-- 内容由 presets.md 版式填充 -->
    </section>

  </main>

  <!-- ─── GSAP 动效初始化 ─────────────────────────────────────── -->
  <script>
    // 注册 ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // ─── 进度条动画 ───────────────────────────────────────
    gsap.to("#progress-bar", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "#deck-container",
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });

    // ─── Bento 卡片 stagger 进入 ───────────────────────────────
    gsap.utils.toArray(".bento-grid").forEach(grid => {
      const cards = grid.querySelectorAll(".bento-card");
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // ─── 超大数字跳动 ───────────────────────────────────────
    gsap.utils.toArray(".bento-number").forEach(num => {
      const target = parseInt(num.textContent);
      gsap.from(num, {
        textContent: 0,
        duration: 2,
        ease: "power1.out",
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: num,
          start: "top 80%",
          toggleActions: "play none none reset"
        }
      });
      num.textContent = target; // 保留原始值
    });

    // ─── 勾线描画动画 ───────────────────────────────────────
    gsap.utils.toArray(".line-path").forEach(path => {
      const length = path.getTotalLength ? path.getTotalLength() : 1000;
      gsap.from(path, {
        strokeDasharray: `0, ${length}`,
        duration: 1.5,
        ease: "none",
        scrollTrigger: {
          trigger: path.closest(".slide-bento"),
          start: "top 60%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // ─── 导航点生成 ───────────────────────────────────────
    const slides = document.querySelectorAll(".slide-bento");
    const navDots = document.getElementById("nav-dots");
    slides.forEach((slide, i) => {
      const dot = document.createElement("button");
      dot.className = "w-2 h-2 rounded-full bg-kingdee-muted hover:bg-kingdee-primary transition-colors";
      dot.addEventListener("click", () => slide.scrollIntoView({ behavior: "smooth" }));
      navDots.appendChild(dot);
    });

    // ─── 滚动时高亮当前导航点 ───────────────────────────────
    slides.forEach((slide, i) => {
      ScrollTrigger.create({
        trigger: slide,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => navDots.children[i]?.classList.add("bg-kingdee-primary", "scale-125"),
        onLeave: () => navDots.children[i]?.classList.remove("bg-kingdee-primary", "scale-125"),
        onEnterBack: () => navDots.children[i]?.classList.add("bg-kingdee-primary", "scale-125"),
        onLeaveBack: () => navDots.children[i]?.classList.remove("bg-kingdee-primary", "scale-125")
      });
    });

    // ─── Pin 固定效果（Apple 式）──────────────────────────────
    // 示例：固定 hero 3 秒钟滚动
    // gsap.to(".hero-pin", {
    //   scrollTrigger: {
    //     trigger: ".hero-pin",
    //     pin: true,
    //     start: "top top",
    //     end: "+=300",
    //     scrub: true
    //   }
    // });
  </script>

</body>
</html>
```

---

## 与 Classic 风格对比

| 维度 | Classic (html-kingdee-*) | Bento Motion (html-bento-*) |
|------|-------------------------|----------------------------|
| **背景** | 冰蓝底 / 渐变封面 | 纯白 `#FFFFFF` |
| **布局** | 固定版式（29 种） | Bento Grid 自适应（10 种） |
| **网格** | 12 份比例系统 | CSS Grid span（1/2/4 列） |
| **字号对比** | 标题 18-28pt / 正文 16pt | Hero 数字 80-160pt / 正文 14pt |
| **动效** | Intersection Observer fade | GSAP ScrollTrigger |
| **CDN** | 无外部依赖 | Tailwind v4 + GSAP + FA |
| **PPTX 导出** | 支持（html2pptx.js） | **不支持**（走 PDF） |

---

## 使用方式

### 方式 A：单文件 Deck

所有内容写入单个 HTML 文件的 `<main>` 内：

```html
<main id="deck-container">
  <section class="slide-bento min-h-screen snap-start">
    <!-- 版式 01: Hero -->
    <div class="bento-card bento-card--large">
      <div class="bento-subtitle-en">PRODUCT LAUNCH</div>
      <h1 class="bento-title-zh">苍穹 PaaS 3.0</h1>
      <div class="bento-number">300%</div>
      <div class="text-sm text-kingdee-muted">效率提升</div>
    </div>
  </section>

  <section class="slide-bento min-h-screen snap-start">
    <!-- 版式 02: Metrics -->
    <div class="bento-grid grid-cols-4">
      <!-- 4 个数据卡片 -->
    </div>
  </section>
</main>
```

### 方式 B：多文件 Deck（iframe 拼接）

```
我的Deck/
├── deck_index.html      # 聚合器（iframe + 导航）
├── slides/
│   ├── 01-hero.html     # 每页独立 HTML
│   ├── 02-metrics.html
│   └── ...
```

---

## 注意事项

### 1. CDN 加载顺序

Tailwind v4 必须在 `<style type="text/tailwindcss">` 之前加载。
GSAP 必须在 `<script>` 初始化之前加载。

### 2. 勾线 SVG getTotalLength()

需要 SVG path 元素支持 `getTotalLength()` 方法。
简单折线可手动估算长度。

### 3. 原生 Scroll-Driven fallback

Chrome 115+ / Safari 26+ 支持。
旧浏览器依赖 GSAP ScrollTrigger。

### 4. 品牌色一致性

所有 Tailwind 类使用 `text-kingdee-primary`、`bg-kingdee-accent` 等。
禁止硬编码其他颜色值。

---

## 快速验证

生成 HTML 后，浏览器打开检查：

1. **进度条**：滚动时从左到右增长
2. **卡片 stagger**：进入视口时依次上浮
3. **数字跳动**：从 0 跳到目标值
4. **勾线描画**：滚动时线条逐渐显现
5. **导航点**：当前页高亮，点击可跳转

---

## 下一步

- 组件定义 → `html-bento-components.md`
- 版式预设 → `html-bento-presets.md`
- 动效扩展 → `html-bento-motion.md`