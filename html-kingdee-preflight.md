# 金蝶 HTML 生成预检清单 v1.0

> 从 open-design 借鉴的 Pre-flight 机制：生成前必须确认所有类名存在。
> 避免 HTML 输出后样式崩坏（字体 fallback、布局错乱）。

---

## 核心设计理念

**问题**：生成 HTML 后才发现类名缺失，导致样式崩坏：

- 大标题变成非衬线（`.h-hero` 未定义）
- 数据卡片挤成一团（`.grid-3` 未定义）
- 图片堆到页面底部（`align-items: start` 未预设）

**方案**：生成前必须确认所有类名在 CSS 中存在。

---

## 预检流程

### Phase H3 生成前必须执行

```
H3.0 预检 → Read `html-kingdee-template.md` + `html-kingdee-style.md`
          → 对照本清单确认所有类名存在
          → 缺失类 → 在 style 中补充
          → 全部存在 → 进入 H3.1 生成
```

---

## 必检类名清单

### A. 排版类（Typography）

| 类名 | 来源文件 | 用途 | 缺失后果 |
|------|---------|------|---------|
| `.h-hero` | typography.md | 超大标题 | 标题变非衬线 |
| `.h-xl` | typography.md | 页面主标题 | 标题变非衬线 |
| `.h-md` | typography.md | 副标题 | 层级不清 |
| `.lead` | typography.md | 引导段落 | 字号混乱 |
| `.body` | typography.md | 正文 | 字体 fallback |
| `.body-sm` | typography.md | 小字说明 | 字号过大 |
| `.kicker` | typography.md | ALL CAPS 标签 | letter-spacing 缺失 |
| `.meta` | typography.md | 元数据 | 字体 fallback |
| `.meta-row` | typography.md | 元数据行 | 布局混乱 |

### B. 网格类（Grids）

| 类名 | 来源文件 | 用途 | 缺失后果 |
|------|---------|------|---------|
| `.grid-2-6-6` | grids.md | 对半分 | 单列堆叠 |
| `.grid-2-7-5` | grids.md | 文字主导 | 布局错位 |
| `.grid-2-8-4` | grids.md | 大段文字 | 图片位置错 |
| `.grid-3` | grids.md | 三等分 | 单列堆叠 |
| `.grid-3-3` | grids.md | 3×2 矩阵 | 图片撑破 |
| `.grid-4` | grids.md | 四等分 | 单列堆叠 |
| `.grid-5` | grids.md | IPD五看 | 布局错位 |
| `.grid-6` | grids.md | 六格矩阵 | 卡片挤一团 |

### C. 组件类（Components）

| 类名 | 来源文件 | 用途 | 缺失后果 |
|------|---------|------|---------|
| `.stat-card` | components.md | 统计卡片 | 布局混乱 |
| `.stat-label` | components.md | 卡片标签 | 字体 fallback |
| `.stat-nb` | components.md | 大数字 | 数字变非衬线 |
| `.stat-unit` | components.md | 数字单位 | 字号过大 |
| `.stat-note` | components.md | 卡片说明 | 字号混乱 |
| `.callout` | components.md | 引用框 | 无边框样式 |
| `.callout-text` | components.md | 金句内容 | 字体 fallback |
| `.callout-src` | components.md | 出处 | 层级不清 |
| `.pillar-card` | components.md | 支柱卡 | 布局混乱 |
| `.pillar-ic` | components.md | 序号 | 字体 fallback |
| `.pillar-title` | components.md | 标题 | 层级不清 |
| `.pillar-desc` | components.md | 描述 | 字号混乱 |
| `.step-card` | components.md | 流程步 | 布局混乱 |
| `.step-nb` | components.md | 步骤序号 | 字体 fallback |
| `.step-title` | components.md | 步骤标题 | 层级不清 |
| `.step-desc` | components.md | 步骤描述 | 字号混乱 |
| `.icon-badge` | components.md | 图标徽章 | 尺寸混乱 |
| `.frame-img` | components.md | 图片框 | object-fit 缺失 |
| `.frame-cap` | components.md | 图片 caption | 布局错位 |

### D. 基础结构类（Structure）

| 类名 | 来源文件 | 用途 | 缺失后果 |
|------|---------|------|---------|
| `.slide` | template.md | 幻灯片外壳 | 布局崩坏 |
| `.slide.active` | template.md | 当前页 | 显示混乱 |
| `.slide.light` | template.md | 浅色主题 | 颜色混乱 |
| `.slide.dark` | template.md | 深色主题 | 颜色混乱 |
| `.frame` | template.md | 内容容器 | 宽度失控 |
| `.chrome` | template.md | 页眉 | 位置错位 |
| `.foot` | template.md | 页脚 | 位置错位 |
| `.progress-bar` | template.md | 进度条 | 不显示 |
| `.nav-dots` | template.md | 导航点 | 不显示 |

---

## 预检执行代码

### grep 验证脚本

```bash
# 预检排版类
grep -E '\.h-hero|\.h-xl|\.lead|\.kicker|\.meta' html-kingdee-style.md

# 预检网格类
grep -E '\.grid-2-6-6|\.grid-2-7-5|\.grid-3|\.grid-5' html-kingdee-grids.md

# 预检组件类
grep -E '\.stat-card|\.callout|\.pillar-card|\.step-card' html-kingdee-components.md
```

### 缺失类处理流程

```
1. 发现缺失类 → 在对应文件中补充 CSS 定义
2. 补充原则：
   - 不发明新类名，使用清单中已有类名
   - 如需自定义，用 inline style（style="..."）
   - 补充后重新 grep 验证
3. 全部存在 → 进入生成阶段
```

---

## 常见缺失类示例

### 示例 1：大标题变成非衬线

**问题**：生成后发现 `.h-hero` 未定义，标题 fallback 到非衬线。

**预检**：
```bash
grep '.h-hero' html-kingdee-typography.md
# 输出：.h-hero { font-family: var(--font-serif); ... }
```

**缺失处理**：
```css
/* 补充到 html-kingdee-style.md */
.h-hero {
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 10vw, 4rem);
  font-weight: 700;
  letter-spacing: -0.02em;
}
```

### 示例 2：数据卡片挤成一团

**问题**：生成后发现 `.grid-3` 未定义，卡片堆成单列。

**预检**：
```bash
grep '.grid-3' html-kingdee-grids.md
# 输出：.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); ... }
```

**缺失处理**：
```css
/* 补充到 html-kingdee-style.md */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--grid-gap-h) var(--grid-gap-v);
  align-items: start;
}
```

### 示例 3：图片堆到页面底部

**问题**：生成后发现网格容器未预设 `align-items: start`，图片用 `align-self: end` 后滑到底部。

**预检**：
```bash
grep 'align-items: start' html-kingdee-grids.md
# 输出：所有网格类默认 align-items: start
```

**缺失处理**：
```css
/* 补充到所有网格类 */
.grid-2-6-6,
.grid-2-7-5,
.grid-3 {
  align-items: start;
}
```

---

## 预检失败处理

| 失败类型 | 处理方式 |
|---------|---------|
| 类名完全缺失 | 在对应文件补充完整定义 |
| 类名部分缺失（缺某个属性） | 补充缺失属性 |
| 类名冲突（同名但定义不同） | 以本清单定义为准 |
| 自定义类需求 | 用 inline style，不发明新类名 |

---

## 生成后自检

### grep 所有主题类

```bash
grep 'class="slide' output.html
# 输出应包含 light / dark / hero 主题
```

**缺失后果**：无主题类 → WebGL 背景不切换 → 翻页视觉卡顿

### grep 所有网格类

```bash
grep 'class="grid-' output.html
# 输出应匹配 grids.md 中定义的类名
```

### grep 排版类

```bash
grep 'class="h-' output.html
# 输出应匹配 typography.md 中定义的类名
```

---

## 预检清单文件位置

| 文件 | 负责检查的类名类型 |
|------|------------------|
| `html-kingdee-typography.md` | 排版类（.h-hero, .lead, .kicker） |
| `html-kingdee-grids.md` | 网格类（.grid-3, .grid-5） |
| `html-kingdee-components.md` | 组件类（.stat-card, .callout） |
| `html-kingdee-template.md` | 结构类（.slide, .frame, .chrome） |
| `html-kingdee-style.md` | CSS 变量（--font-serif, --grid-gap-h） |

---

## 预检时机

| 阶段 | 操作 |
|------|------|
| H3.0 | 生成前预检（必须） |
| H3.4 | 生成后自检（可选） |
| 用户反馈后 | 问题定位 → 补充缺失类 → 重新生成 |

---

## 预检完整流程

```
Phase H3.0 预检
  → Read html-kingdee-typography.md（排版类）
  → Read html-kingdee-grids.md（网格类）
  → Read html-kingdee-components.md（组件类）
  → Read html-kingdee-template.md（结构类）
  → 对照本清单 grep 验证
  → 发现缺失 → 补充
  → 全部存在 → 进入 H3.1 生成
```

---

## 新增版式时的预检

当需要使用新版式（非清单已有类名）：

1. **优先组合现有组件**：stat-card + grid-3 = 数据卡片页
2. **禁止发明新类名**：用 inline style 自定义
3. **如需复用新版式**：补充到对应文件，更新本清单