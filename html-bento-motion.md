# 金蝶 Bento Motion 动效库 v1.0

> GSAP ScrollTrigger 动效 + 原生 CSS Scroll-Driven fallback。
> Apple 式滚动动效：进度条、stagger 进入、数字跳动、勾线描画。
> 与 `html-bento-template.md` 配合使用。

---

## 动效总览

| 动效 ID | 名称 | GSAP API | 原生 CSS fallback | 触发方式 |
|--------|------|---------|------------------|---------|
| M01 | 进度条 | `gsap.to()` + scrub | `animation-timeline: scroll()` | 滚动进度 |
| M02 | 卡片 stagger | `gsap.from()` + stagger | `animation-timeline: view()` | 进入视口 |
| M03 | 数字跳动 | `textContent` + snap | 无 fallback（GSAP 专属）| 进入视口 |
| M04 | Pin 固定 | `scrollTrigger.pin` | 无 fallback（GSAP 专属）| 滚动固定 |
| M05 | 勾线描画 | `strokeDasharray` | `stroke-dashoffset` + view | 进入视口 |
| M06 | 时间轴动画 | `gsap.timeline()` + scrub | 无 fallback | 滚动驱动 |
| M07 | 视差滚动 | `y` + scrub | `transform` + scroll | 滚动驱动 |
| M08 | 导航点高亮 | ScrollTrigger callbacks | Intersection Observer | 区域进入 |

---

## M01 · 进度条动画

### GSAP 实现

```javascript
gsap.registerPlugin(ScrollTrigger);

gsap.to("#progress-bar", {
  scaleX: 1,               // 从 scale-x-0 到 1
  ease: "none",            // 线性，跟随滚动
  scrollTrigger: {
    trigger: "#deck-container",
    start: "top top",
    end: "bottom bottom",
    scrub: true            // 平滑跟随滚动
  }
});
```

### 原生 CSS fallback

```css
@keyframes grow-progress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

#progress-bar {
  transform-origin: 0 50%;
  animation: grow-progress auto linear;
  animation-timeline: scroll();
}
```

---

## M02 · 卡片 Stagger 进入

### GSAP 实现（推荐）

```javascript
gsap.utils.toArray(".bento-grid").forEach(grid => {
  const cards = grid.querySelectorAll(".bento-card");

  gsap.from(cards, {
    opacity: 0,
    y: 40,
    duration: 0.6,
    stagger: 0.08,        // 每个卡片间隔 0.08s
    ease: "power2.out",
    scrollTrigger: {
      trigger: grid,
      start: "top 80%",   // 进入视口 80% 时触发
      toggleActions: "play none none reverse"  // 滚回时反向
    }
  });
});
```

### Stagger 方向控制

```javascript
stagger: {
  each: 0.08,
  from: "center",  // 或 "start", "end", "random"
  grid: [3, 4]     // 支持 grid 布局自动计算
}
```

### 原生 CSS fallback

```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.bento-card {
  animation: fade-in-up linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;
}
```

---

## M03 · 超大数字跳动

### GSAP 实现（专属，无 CSS fallback）

```javascript
gsap.utils.toArray(".bento-number").forEach(num => {
  const target = parseInt(num.textContent);
  const duration = 2;  // 2 秒

  gsap.from(num, {
    textContent: 0,
    duration: duration,
    ease: "power1.out",
    snap: { textContent: 1 },  // 整数 snap
    scrollTrigger: {
      trigger: num,
      start: "top 80%",
      toggleActions: "play none none reset"  // 滚回重置
    }
  });

  // 保留原始值（snap 会覆盖）
  num.textContent = target;
});
```

### 高级用法：格式化数字

```javascript
gsap.from(".formatted-number", {
  textContent: 0,
  duration: 2,
  snap: { textContent: 1 },
  modifiers: {
    textContent: value => Math.floor(value).toLocaleString()  // 12,800
  }
});
```

---

## M04 · Pin 固定（Apple 式）

### GSAP 实现（专属）

```javascript
// 固定 hero 区域，滚动 300px 后释放
gsap.to(".hero-pin", {
  scrollTrigger: {
    trigger: ".hero-pin",
    pin: true,
    start: "top top",
    end: "+=300",      // 固定 300px 滚动距离
    scrub: true
  }
});

// 同时应用动画
gsap.to(".hero-pin", {
  opacity: 0.3,
  scale: 0.9,
  scrollTrigger: {
    trigger: ".hero-pin",
    pin: true,
    start: "top top",
    end: "+=300",
    scrub: 1          // 1 秒平滑过渡
  }
});
```

### 多层 Pin（时间轴）

```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero-pin",
    pin: true,
    start: "top top",
    end: "+=600",
    scrub: 1
  }
});

tl.to(".hero-title", { y: -50, opacity: 0 })
  .to(".hero-subtitle", { y: -30, opacity: 0 }, "-=0.3")
  .to(".hero-image", { scale: 1.2 }, "-=0.5");
```

---

## M05 · 勾线描画动画

### GSAP 实现

```javascript
gsap.utils.toArray(".line-path").forEach(path => {
  // 获取路径总长度
  const length = path.getTotalLength ? path.getTotalLength() : 1000;

  gsap.from(path, {
    strokeDasharray: `0, ${length}`,  // 从 0 开始描画
    duration: 1.5,
    ease: "none",
    scrollTrigger: {
      trigger: path.closest(".slide-bento"),
      start: "top 60%",
      toggleActions: "play none none reverse"
    }
  });

  // 设定初始状态
  path.style.strokeDasharray = `${length}`;
});
```

### 原生 CSS fallback

```css
@keyframes draw-line {
  from { stroke-dashoffset: 1000; }
  to   { stroke-dashoffset: 0; }
}

.line-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw-line linear;
  animation-timeline: view();
  animation-range: entry 0% cover 60%;
}
```

---

## M06 · 时间轴动画

### GSAP 实现

```javascript
// 多元素依次动画，滚动驱动
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".timeline-section",
    start: "top 80%",
    end: "bottom 20%",
    scrub: 1,           // 滚动驱动，1 秒平滑
    pin: false
  }
});

tl.from(".step-1", { x: -100, opacity: 0 })
  .from(".step-2", { x: -100, opacity: 0 }, "-=0.5")
  .from(".step-3", { x: -100, opacity: 0 }, "-=0.5")
  .from(".step-4", { x: -100, opacity: 0 }, "-=0.5");
```

### 时间轴 + 勾线连接

```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".slide-timeline",
    start: "top 60%",
    scrub: 0.5
  }
});

// 步骤卡片依次进入
tl.from(".step-card", {
  opacity: 0,
  y: 20,
  stagger: 0.2
})
// 勾线描画
.from(".connector-line", {
  strokeDasharray: "0, 60",
  duration: 0.5,
  stagger: 0.15
}, "-=0.3");
```

---

## M07 · 视差滚动

### GSAP 实现

```javascript
// 背景层慢速移动
gsap.to(".parallax-bg", {
  y: -100,
  ease: "none",
  scrollTrigger: {
    trigger: ".parallax-section",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});

// 内容层正常速度
gsap.to(".parallax-content", {
  y: -50,
  ease: "none",
  scrollTrigger: {
    trigger: ".parallax-section",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});
```

### 视差比例

```javascript
// 背景层：0.5x 速度（更慢）
yPercent: -50

// 内容层：1x 速度（正常）
yPercent: -100
```

---

## M08 · 导航点高亮

### GSAP 实现

```javascript
const slides = document.querySelectorAll(".slide-bento");
const navDots = document.getElementById("nav-dots").children;

slides.forEach((slide, i) => {
  ScrollTrigger.create({
    trigger: slide,
    start: "top 50%",    // 进入视口中心
    end: "bottom 50%",
    onEnter: () => {
      navDots[i]?.classList.add("bg-kingdee-primary", "scale-125");
    },
    onLeave: () => {
      navDots[i]?.classList.remove("bg-kingdee-primary", "scale-125");
    },
    onEnterBack: () => {
      navDots[i]?.classList.add("bg-kingdee-primary", "scale-125");
    },
    onLeaveBack: () => {
      navDots[i]?.classList.remove("bg-kingdee-primary", "scale-125");
    }
  });
});
```

### Intersection Observer fallback

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const index = parseInt(entry.target.dataset.index);
    const dot = navDots[index];

    if (entry.isIntersecting) {
      dot?.classList.add("bg-kingdee-primary", "scale-125");
    } else {
      dot?.classList.remove("bg-kingdee-primary", "scale-125");
    }
  });
}, {
  threshold: 0.5
});

slides.forEach(slide => observer.observe(slide));
```

---

## 完整动效初始化脚本

```javascript
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // ─── M01 进度条 ───────────────────────────────────────
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

  // ─── M02 卡片 stagger ───────────────────────────────────────
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

  // ─── M03 数字跳动 ───────────────────────────────────────
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
    num.textContent = target;
  });

  // ─── M05 勾线描画 ───────────────────────────────────────
  gsap.utils.toArray(".line-path").forEach(path => {
    const length = path.getTotalLength ? path.getTotalLength() : 1000;
    gsap.from(path, {
      strokeDasharray: `0, ${length}`,
      duration: 1.5,
      ease: "none",
      scrollTrigger: {
        trigger: path.closest(".slide-bento") || path.parentElement,
        start: "top 60%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // ─── M08 导航点高亮 ───────────────────────────────────────
  const slides = document.querySelectorAll(".slide-bento");
  const navDots = document.getElementById("nav-dots")?.children || [];

  slides.forEach((slide, i) => {
    ScrollTrigger.create({
      trigger: slide,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => navDots[i]?.classList.add("bg-kingdee-primary", "scale-125"),
      onLeave: () => navDots[i]?.classList.remove("bg-kingdee-primary", "scale-125"),
      onEnterBack: () => navDots[i]?.classList.add("bg-kingdee-primary", "scale-125"),
      onLeaveBack: () => navDots[i]?.classList.remove("bg-kingdee-primary", "scale-125")
    });
  });
});
```

---

## 动效性能优化

### 1. 减少监听元素数量

```javascript
// ❌ 监听所有卡片（性能差）
gsap.utils.toArray(".bento-card").forEach(card => { ... });

// ✅ 监听 grid 容器，stagger 子元素
gsap.utils.toArray(".bento-grid").forEach(grid => {
  const cards = grid.querySelectorAll(".bento-card");
  gsap.from(cards, { ... });
});
```

### 2. 使用 scrub 替代 toggleActions

```javascript
// ❌ 每次进入触发新动画（重复计算）
toggleActions: "play none none reset"

// ✅ 滚动驱动，平滑过渡
scrub: true
```

### 3. 限制动画范围

```javascript
// ❌ 整个页面滚动范围
end: "bottom top"

// ✅ 限制在具体元素范围内
end: "bottom 80%"
```

### 4. 批量清理 ScrollTrigger

```javascript
// 页面卸载时清理
ScrollTrigger.getAll().forEach(st => st.kill());
```

---

## 浏览器兼容性

| 特性 | Chrome | Safari | Firefox | fallback |
|------|---------|--------|---------|---------|
| GSAP ScrollTrigger | 全版本 | 全版本 | 全版本 | 无需 fallback |
| CSS `animation-timeline: scroll()` | 115+ | 26+ | 暂不支持 | GSAP |
| CSS `animation-timeline: view()` | 115+ | 26+ | 暂不支持 | GSAP |

**建议**：始终加载 GSAP ScrollTrigger，确保跨浏览器兼容。

---

## 调试技巧

### 1. ScrollTrigger 标记

```javascript
scrollTrigger: {
  trigger: ".element",
  markers: true,  // 显示 start/end 标记线
  id: "my-animation"
}
```

### 2. 控制台调试

```javascript
// 打印所有 ScrollTrigger 状态
console.log(ScrollTrigger.getAll());

// 打印单个触发器状态
console.log(ScrollTrigger.getById("my-animation"));
```

### 3. 手动刷新

```javascript
// 窗口 resize 后刷新
window.addEventListener("resize", () => ScrollTrigger.refresh());

// 动态内容加载后刷新
ScrollTrigger.refresh();
```

---

## 下一步

- 风格选择逻辑 → `SKILL.md` Phase H 分支
- 完整示例 → `html-bento-template.md` 验证脚本