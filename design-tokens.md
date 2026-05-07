# 金蝶 PPT 设计变量 Design Tokens v1.0
> 所有颜色、圆角、阴影、间距、字体常量的唯一定义源。
> 其他文件引用此文件，禁止重复定义。
> 版式函数参数使用此处常量，禁止硬编码。

---

## 1. 颜色系统 COLORS

```javascript
// ══════════════════════════════════════════════════════════════════════
// 主色系 PRIMARY — 金蝶品牌核心色
// ══════════════════════════════════════════════════════════════════════
const COLORS = {
  PRIMARY: {
    TECH_BLUE:    '2971EB',   // 科技蓝（主品牌蓝）— accent1：标题、强调、TOC序号、页码、Bento主卡
    SKY_BLUE:     '22AAFE',   // 亮天蓝（品青）— accent2：执行/方法层辅助强调
    SECTION_CYAN: '00CCFE',   // 章节数字青 — 章节页超大数字 + 装饰横线
    DEEP_PURPLE:  '28245F',   // 深紫蓝（藏青）— 深色辅助、架构图底层、强对比文字块
  },

  // ══════════════════════════════════════════════════════════════════════
  // 辅助色系 ACCENT — 功能语义色
  // ══════════════════════════════════════════════════════════════════════
  ACCENT: {
    TEAL:      '05C8C8',   // 绿松石青 — 增长/机会/Opportunities 语义
    LAVENDER:  '966EFF',   // 薰衣草紫 — 挑战/风险/Threats/Question 语义
    ORANGE:    'FFB61A',   // 橙黄 — 强调要素/Check/警示/WHAT 语义
  },

  // ══════════════════════════════════════════════════════════════════════
  // 中性色系 NEUTRAL — 文字与背景
  // ══════════════════════════════════════════════════════════════════════
  NEUTRAL: {
    DARK_GRAY:  '373838',   // 深灰 — 正文
    LIGHT_GRAY: 'BFBFBF',   // 浅灰 — 次要说明、分割线、边框
    ICE_BLUE:   'E7F1FF',   // 冰蓝 — 卡片底色、内容区淡底
    WHITE:      'FFFFFF',   // 白色 — 深色背景上文字
  },

  // ══════════════════════════════════════════════════════════════════════
  // 思维模型语义色 MODEL — 自动映射，无需用户指定
  // ══════════════════════════════════════════════════════════════════════
  MODEL: {
    // PDCA 循环
    PLAN:     '2971EB',   // P 计划 — 主蓝
    DO:       '22AAFE',   // D 执行 — 品青
    CHECK:    'FFB61A',   // C 检查 — 橙黄
    ACT:      '966EFF',   // A 改进 — 紫色

    // SWOT 矩阵
    STRENGTH:     '2971EB',   // S 优势 — 主蓝
    WEAKNESS:     'E7F1FF',   // W 劣势 — 冰蓝（浅底深字）
    OPPORTUNITY:  '05C8C8',   // O 机会 — 青绿
    THREAT:       '966EFF',   // T 威胁 — 紫色

    // 黄金圈 WHY/HOW/WHAT
    WHY:      '2971EB',   // 内核 — 主蓝
    HOW:      '22AAFE',   // 中层 — 品青
    WHAT:     'E7F1FF',   // 外层 — 冰蓝

    // SCQA 叙事
    SITUATION:    'E7F1FF',   // S 场景 — 冰蓝
    COMPLICATION: 'FFB61A',   // C 冲突 — 橙黄
    QUESTION:     '966EFF',   // Q 问题 — 紫色
    ANSWER:       '2971EB',   // A 解答 — 主蓝
  },
};

// ══════════════════════════════════════════════════════════════════════
// 多色序列 COLOR_SEQ — 图表/多列卡片轮换
// ══════════════════════════════════════════════════════════════════════
const COLOR_SEQ = ['2971EB', '22AAFE', '05C8C8', '966EFF', 'FFB61A'];
// ⚠️ 此定义唯一，禁止在其他文件重复定义

// ══════════════════════════════════════════════════════════════════════
// 渐变配置 GRADIENTS
// ══════════════════════════════════════════════════════════════════════
const GRADIENTS = {
  COVER: {
    angle: 135,                // 右下→左上
    start: '2374F0',
    end:   '22A9FE',
    rule:  '仅用于封面背景图、大型强调色块',
  },
  SAME_FAMILY: {
    allowed: ['28245F → 2971EB', '2971EB → 2971EB@15%'],
    forbidden: '禁止蓝→青、蓝→金等跨色系渐变',
  },
};
```

---

## 2. 圆角系统 RADIUS

```javascript
// ══════════════════════════════════════════════════════════════════════
// 圆角三档 — Google Canvas 大圆角风格
// ══════════════════════════════════════════════════════════════════════
const RADIUS = {
  CARD_PRIMARY:   0.15,   // 主内容卡片（Bento/特征/数据/对比栏）— Google Canvas 大圆角
  CARD_SECONDARY: 0.12,   // 小型嵌套元素（SWOT格/5W1H格/SCQA格/叠加卡片）— 次级圆角
  CARD_NONE:      0,      // 结构性色块（表头/架构层标签/顶部色条）— 直角，体现秩序感
  BADGE:          0.28,   // 图标徽章半径（圆形）
};

// 别名（兼容旧代码）
const BENTO_RADIUS     = RADIUS.CARD_PRIMARY;
const GRID_CELL_RADIUS = RADIUS.CARD_SECONDARY;

// 圆角选择函数
const getRadius = (type) => RADIUS[type] || RADIUS.CARD_PRIMARY;
```

---

## 3. 阴影系统 SHADOWS

```javascript
// ══════════════════════════════════════════════════════════════════════
// 阴影三档 Elevation System
// ══════════════════════════════════════════════════════════════════════
const SHADOWS = {
  ELEVATION_1: { type:'outer', blur:4,  offset:1, angle:135, color:'000000', opacity:0.05 },  // 最轻 — 普通内容卡片、背景分隔
  ELEVATION_2: { type:'outer', blur:8,  offset:3, angle:135, color:'000000', opacity:0.08 },  // 标准 — 主要卡片、重要信息块
  ELEVATION_3: { type:'outer', blur:14, offset:4, angle:135, color:'2971EB', opacity:0.10 },  // 品牌光晕 — 图标圆/主卡Bento/CTA色块
};

// ══════════════════════════════════════════════════════════════════════
// 阴影工厂函数 — 必须每次 new，避免 PptxGenJS 对象变异 bug
// ══════════════════════════════════════════════════════════════════════
const mkShS = () => ({ ...SHADOWS.ELEVATION_1 });  // elevation-1（最轻）
const mkSh  = () => ({ ...SHADOWS.ELEVATION_2 });  // elevation-2（标准）
const mkShB = () => ({ ...SHADOWS.ELEVATION_3 });  // elevation-3（品牌光晕）
// ⚠️ 此定义唯一，禁止在其他文件重复定义
```

---

## 4. 间距系统 SPACING

```javascript
// ══════════════════════════════════════════════════════════════════════
// 间距基准 — 全张 PPT 只选一档，禁止混用
// ══════════════════════════════════════════════════════════════════════
const SPACING = {
  // 页面边距
  PAGE_MARGIN:     0.50,   // 所有内容元素距页面边缘 ≥ 0.5"

  // 内容块间距（选一档，全张一致）
  GAP_TIGHT:       0.30,   // 紧凑间距（卡片间/列间/段落间）
  GAP_STANDARD:    0.50,   // 标准间距

  // 卡片专用
  CARD_GAP:        0.12,   // Bento 卡片间距
  COLUMN_GAP:      0.22,   // 列间距
  CARD_PADDING:    0.20,   // 卡片内边距

  // 文字间距
  LINE_HEIGHT:     1.4,    // 行距倍数
  PARA_SPACE:      16,     // 段落间距（pt）

  // 留白目标
  WHITESPACE_MIN:  0.30,   // 留白下限 30%
  CONTENT_MAX:     0.70,   // 内容占比上限 70%
};

// 间距选择规则：density='tight' → GAP_TIGHT，否则 GAP_STANDARD
const selectGap = (density) => density === 'tight' ? SPACING.GAP_TIGHT : SPACING.GAP_STANDARD;
```

---

## 5. 字体系统 FONT

```javascript
// ══════════════════════════════════════════════════════════════════════
// 字体 — 全局唯一
// ══════════════════════════════════════════════════════════════════════
const FONT = {
  FAMILY: 'Microsoft YaHei',   // ⚠️ 禁止使用任何其他字体

  // ══════════════════════════════════════════════════════════════════════
  // 字号档位 SIZE
  // ══════════════════════════════════════════════════════════════════════
  SIZE: {
    // 内容页
    TITLE_PAGE:      28,     // 页面标题（↑ Google Canvas）
    SUBTITLE:        14,     // 副标题
    BODY:            16,     // 正文
    EMPHASIS:        18,     // 重点强调

    // 大数字
    BIG_NUMBER:      120,    // 超大数字（Bento/看板）160pt 也可用
    SECTION_NUMBER:  125,    // 章节大数字

    // 章节页
    SECTION_TITLE:   24,     // 章节标题
    SECTION_SUB:     16,     // 章节副标题

    // 目录
    TOC_NUMBER:      80,     // TOC 章节编号

    // 金句
    QUOTE_LARGE:     36,     // 金句大号
    QUOTE_MEDIUM:    30,     // 金句中号
    QUOTE_SMALL:     24,     // 金句小号

    // 卡片
    CARD_TITLE:      18,     // 卡片标题（20pt 也可用）
    CARD_BODY:       13,     // 卡片正文（14pt 也可用）

    // 图标/装饰
    ICON_LARGE:      36,     // 大图标（独立装饰块）
    ICON_MEDIUM:     24,     // 中图标（Bento卡片顶部）
    ICON_SMALL:      16,     // 小图标（行内辅助）

    // 其他
    PAGE_NUMBER:     10,     // 页码
    COVER_TITLE:     54,     // 封面主标题
    CONFIDENTIAL:    8,      // 保密声明
  },

  // 字重
  WEIGHT: {
    NORMAL: false,
    BOLD:   true,
  },
};

// 字号选择函数
const getFontSize = (type) => FONT.SIZE[type] || FONT.SIZE.BODY;
```

---

## 6. 版式坐标常量 COORDS

```javascript
// ══════════════════════════════════════════════════════════════════════
// 通用坐标 — 从官方模板 XML 精确提取（LAYOUT_WIDE: 13.3333" × 7.5")
// ══════════════════════════════════════════════════════════════════════
const COORDS = {
  // 页面尺寸
  PAGE_W: 13.333,
  PAGE_H: 7.5,

  // Logo
  LOGO: { x: 12.250, y: 0.187, w: 0.849, h: 0.433 },

  // 页脚
  FOOTER: {
    CONFIDENTIAL: { x: 11.355, y: 7.017, w: 1.327, h: 0.190 },
    PAGE_NUM:     { x: 12.845, y: 7.051, w: 0.384, h: 0.150 },
  },

  // 内容区边界
  CONTENT_START_Y: 1.503,
  CONTENT_W:       12.256,
  CONTENT_H:       5.348,

  // 标题栏
  TITLE:     { x: 0.435, y: 0.230, w: 10.601, h: 0.513 },
  SUBTITLE:  { x: 0.435, y: 0.747, w: 8.523,  h: 0.312 },
};
```

---

## 7. 使用规则

### 颜色引用规则
```javascript
// ✅ 正确：引用 COLORS 常量
fill: { color: COLORS.PRIMARY.TECH_BLUE }
color: COLORS.NEUTRAL.DARK_GRAY

// ❌ 禁止：硬编码颜色值（除非常量未定义）
fill: { color: '2971EB' }  // → 应改为 COLORS.PRIMARY.TECH_BLUE
```

### 圆角引用规则
```javascript
// ✅ 正确：引用 RADIUS 常量
rectRadius: RADIUS.CARD_PRIMARY

// ❌ 禁止：硬编码圆角值
rectRadius: 0.15  // → 应改为 RADIUS.CARD_PRIMARY
```

### 阴影引用规则
```javascript
// ✅ 正确：使用工厂函数（避免对象变异）
shadow: mkSh()   // 标准阴影
shadow: mkShS()  // 轻阴影
shadow: mkShB()  // 品牌光晕

// ❌ 禁止：直接引用 SHADOWS 对象
shadow: SHADOWS.ELEVATION_2  // → PptxGenJS 会变异，导致后续版式出错
```

### 思维模型颜色规则
```javascript
// ✅ 正确：自动映射，无需用户指定
// 版式函数内部使用 COLORS.MODEL.PLAN 等

// ❌ 禁止：在思维模型版式中要求用户指定颜色
// PDCA/SWOT/黄金圈/SCQA 等版式颜色由常量自动映射
```