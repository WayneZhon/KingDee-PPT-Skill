# 金蝶 Anti AI-slop 规则

> 防止生成内容落入 AI 模板通病，确保输出符合金蝶企业级标准。
> 融合 huashu-design 反 AI slop 规则 + 金蝶品牌专用规则。

---

## 禁止事项总表

| 问题 | ❌ 禁止 | ✅ 金蝶正确做法 |
|------|--------|----------------|
| **颜色滥用** | 紫色渐变 `linear-gradient(135deg, #667eea, #764ba2)` | 金蝶品牌色系：主蓝 `#2971EB` + 品青 `#22AAFE` |
| **禁用红色** | ❌ 任何红色 `#E8210A` | 用橙黄 `#FFB61A` 表警示 |
| **字体滥用** | Inter / 系统默认黑体 | Microsoft YaHei（正文）+ Noto Serif SC（标题） |
| **空洞图标** | generic 灯泡💡/齿轮⚙️/火箭🚀 | 金蝶品牌图标或无图标纯文字 |
| **Emoji 过度** | 标题里塞 emoji（如 `🚀 产品发布`） | 标题纯文字，emoji 仅用于正文强调 |
| **装饰滥用** | 抽象波浪/点阵/几何图形 | 金蝶气泡圆元素或无装饰 |
| **英文套话** | "Think Big" "Innovation" "Future" | 金蝶价值观：致良知、走正道、行王道 |
| **章节滥用** | 01/02/03/04 但无实质章节内容 | 有实质章节才用章节分隔页 |
| **段落过长** | 单条要点超过 50 字 | ≤30 字，每页≤5 要点 |
| **数据空洞** | "显著提升" "大幅增长" 无数字 | 必须有具体数字或明确来源 |
| **热词堆砌** | AI Agent、大模型、数字化转型滥用 | 每页最多 1 个技术热词，配具体场景 |
| **假性对比** | 新旧对比但无差异描述 | 左右对比页必须列出 ≥3 个差异点 |
| **时间轴空** | 只有年份无事件描述 | 每个时间点必须有事件+影响 |
| **AI slop 特征** | 圆角+左 border accent / SVG 画人脸 | 金蝶标准色块或无装饰 |

---

## huashu-design 反 AI slop 规则（融入金蝶）

### 禁止的视觉最大公约数

以下视觉特征是 AI 生成设计的"通病"，一眼识别为 AI slop：

| AI slop 特征 | 说明 | 替代方案 |
|--------------|------|----------|
| **紫色渐变** | AI 最爱用的配色，视觉廉价 | 金蝶主蓝+品青组合 |
| **Emoji 图标** | 标题/卡片用 emoji 作图标 | 无图标或金蝶品牌 icon |
| **圆角+左 accent** | `border-radius: 12px; border-left: 4px solid #xxx` | 金蝶标准色块或全宽条 |
| **SVG 人脸** | 用 SVG 画抽象人脸/人形 | 用真人照片或无人物 |
| **Inter 字体** | 标题用 Inter | Noto Serif SC 或 Microsoft YaHei |

### 推荐的设计语汇

| 设计手法 | 说明 |
|----------|------|
| **Serif display** | 标题用衬线字体（Noto Serif SC）增加质感 |
| **oklch 色彩** | 使用感知均匀的色彩空间（金蝶色系已定义） |
| **text-wrap: pretty** | 排印细节，避免孤词 |
| **CSS Grid** | 精准分栏，不用 flexbox hack |

---

## 金蝶专用规则

### 颜色使用规则

```css
/* ✅ 正确：金蝶品牌色 */
background: #2971EB;  /* 主蓝 */
color: #22AAFE;       /* 品青 */
border-color: #FFB61A; /* 橙黄（警示） */

/* ❌ 禁止：非金蝶色 */
background: #E8210A;  /* 红色 - 禁止 */
background: #1770EA;  /* 旧主蓝 - 已废弃 */
background: #FFC000;  /* 旧品金 - 已废弃 */

/* ❌ 禁止：渐变 */
background: linear-gradient(135deg, #667eea, #764ba2);

/* ✅ 正确：若需渐变效果，用金蝶相邻色 */
background: linear-gradient(135deg, #2971EB, #22AAFE);
```

### 字体使用规则

```css
/* ✅ 正确：金蝶标准字体 */
font-family: "Microsoft YaHei", sans-serif;  /* 正文 */
font-family: "Noto Serif SC", serif;         /* 标题 */

/* ❌ 禁止：AI 通病字体 */
font-family: Inter, sans-serif;              /* 禁止 */
font-family: system-ui, sans-serif;          /* 禁止做标题 */
```

### 图标使用规则

```
✅ 正确做法：
- 无图标：纯文字标题
- 金蝶品牌 icon：从官方素材库取
- 功能图标：仅用于正文要点强调

❌ 禁止做法：
- 标题用 emoji（如 🚀 产品发布）
- generic 灯泡💡/齿轮⚙️/火箭🚀
- SVG 画抽象人脸
```

---

## 检查清单（生成后必过）

1. [ ] 无紫色渐变、无红色 `#E8210A`
2. [ ] 标题无 emoji、无 Inter 字体
3. [ ] 无 generic 灯泡/齿轮/火箭图标
4. [ ] 无圆角+左 border accent 组合
5. [ ] 每条要点 ≤30 字
6. [ ] 数据有具体数字
7. [ ] 对比页有 ≥3 个差异点
8. [ ] 时间轴有事件描述

---

## 参考

- `design-tokens.md` — 金蝶品牌色定义
- `style-guide.md` — 视觉规范详细说明
- huashu-design `references/design-styles.md` — 20 种设计哲学