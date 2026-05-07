# 金蝶 PPT 版式参数 Schema v1.0
> 版式函数参数的统一命名规范和颜色推断规则。
> 确保所有版式函数参数命名一致，降低AI生成错误概率。
> 向后兼容旧参数名，通过别名映射自动转换。

---

## 1. 颜色参数命名规范

### 1.1 统一命名

| 新参数名 | 替代的旧参数名 | 用途 |
|---------|---------------|------|
| `bgColor` | `fillColor`, `color`, `headerColor` | 背景/填充色 |
| `textColor` | `bodyColor` | 正文颜色 |
| `titleColor` | `titleColor`（保留） | 标题颜色 |
| `accentColor` | 新增 | 强调色（数字/图标） |

### 1.2 向后兼容别名映射

```javascript
// 在版式函数内部添加参数别名映射
function normalizeColorParams(opts) {
  return {
    ...opts,
    bgColor:     opts.bgColor || opts.fillColor || opts.color || opts.headerColor || COLORS.NEUTRAL.ICE_BLUE,
    textColor:   opts.textColor || opts.bodyColor || COLORS.NEUTRAL.DARK_GRAY,
    titleColor:  opts.titleColor || COLORS.PRIMARY.TECH_BLUE,
    accentColor: opts.accentColor || opts.color || COLORS.PRIMARY.TECH_BLUE,
  };
}

// 使用示例
function bentoCard(pres, slide, opts) {
  const { bgColor, textColor, titleColor, accentColor } = normalizeColorParams(opts);
  // ...
}
```

---

## 2. 颜色推断规则

### 2.1 自动推断逻辑

| bgColor 条件 | titleColor | textColor | accentColor |
|-------------|-----------|-----------|-------------|
| `COLORS.PRIMARY.TECH_BLUE`（深蓝） | `COLORS.NEUTRAL.WHITE` | `COLORS.NEUTRAL.WHITE` | `COLORS.NEUTRAL.WHITE` |
| `COLORS.PRIMARY.DEEP_PURPLE`（藏青） | `COLORS.NEUTRAL.WHITE` | `COLORS.NEUTRAL.WHITE` | `COLORS.NEUTRAL.WHITE` |
| `COLORS.NEUTRAL.ICE_BLUE`（冰蓝） | `COLORS.PRIMARY.TECH_BLUE` | `COLORS.NEUTRAL.DARK_GRAY` | `COLORS.PRIMARY.TECH_BLUE` |
| `COLORS.NEUTRAL.WHITE`（白色） | `COLORS.PRIMARY.TECH_BLUE` | `COLORS.NEUTRAL.DARK_GRAY` | `COLORS.PRIMARY.TECH_BLUE` |
| 未指定（多卡版式） | 按 COLOR_SEQ[i] 轮换 | `COLORS.NEUTRAL.DARK_GRAY` | 同 bgColor |

### 2.2 推断函数

```javascript
function inferColors(bgColor, opts = {}) {
  // 深色背景 → 白色文字
  const isDarkBg = bgColor === COLORS.PRIMARY.TECH_BLUE ||
                   bgColor === COLORS.PRIMARY.DEEP_PURPLE ||
                   bgColor === COLORS.ACCENT.TEAL ||
                   bgColor === COLORS.ACCENT.LAVENDER;

  return {
    bgColor,
    titleColor: opts.titleColor || (isDarkBg ? COLORS.NEUTRAL.WHITE : COLORS.PRIMARY.TECH_BLUE),
    textColor:  opts.textColor  || (isDarkBg ? COLORS.NEUTRAL.WHITE : COLORS.NEUTRAL.DARK_GRAY),
    accentColor: opts.accentColor || (isDarkBg ? COLORS.NEUTRAL.WHITE : bgColor),
  };
}
```

---

## 3. 卡片参数 Schema

### 3.1 统一卡片参数结构

```javascript
// 所有卡片类版式（bentoCard、dataCard、featureCard 等）统一参数
const CARD_SCHEMA = {
  // 基础参数
  title:       '',          // 标题（字符串）
  body:        '',          // 正文/描述（字符串）
  number:      '',          // 大数字（字符串，可选）
  unit:        '',          // 数字单位（字符串，可选）
  icon:        '',          // 图标 emoji（字符串，可选）

  // 颜色参数
  bgColor:     '',          // 背景色（可选，默认 COLORS.NEUTRAL.ICE_BLUE）
  titleColor:  '',          // 标题颜色（可选，自动推断）
  textColor:   '',          // 正文颜色（可选，自动推断）
  accentColor: '',          // 强调色（可选，数字/图标颜色）

  // 尺寸参数
  x:          0,            // 左上角 x（英寸）
  y:          0,            // 左上角 y（英寸）
  w:          0,            // 宽度（英寸）
  h:          0,            // 高度（英寸）
  radius:     RADIUS.CARD_PRIMARY,  // 圆角（可选）
  hasShadow:  true,         // 是否阴影（可选）

  // 特殊标记
  isPrimary:  false,        // 是否主卡（Bento Grid 专用）
};
```

### 3.2 多卡版式参数结构

```javascript
// 多卡并列版式（版式05/11/12/14/26 等）
const MULTI_CARD_SCHEMA = {
  title:      '',           // 页标题
  subtitle:   '',           // 副标题（可选）
  cards: [                   // 卡片数组
    { ...CARD_SCHEMA },
    { ...CARD_SCHEMA },
    // ...
  ],
  // 颜色轮换规则：cards[i].bgColor 未指定时，按 COLOR_SEQ[i] 自动赋值
};
```

---

## 4. 对比/分区参数 Schema

### 4.1 左右对比版式

```javascript
// 版式06/29 对比版式
const COMPARE_SCHEMA = {
  title:      '',
  subtitle:   '',
  left: {
    header:    '',          // 区标题（替代 title）
    points:    [],          // 要点列表
    bgColor:   '',          // 背景色（替代 color）
    headerBgColor: '',      // 表头背景色（可选）
  },
  right: {
    header:    '',
    points:    [],
    bgColor:   '',
    headerBgColor: '',
  },
  dividerLabel: '',         // 分隔线标签（可选，如 'VS'）
};
```

### 4.2 分层架构版式

```javascript
// 版式13/15 分层版式
const LAYER_SCHEMA = {
  title:      '',
  subtitle:   '',
  layers: [
    {
      label:    '',          // 层标签
      items:    [],          // 层内容
      bgColor:  '',          // 层背景色
    },
  ],
  bottomNote: '',            // 底部说明（可选）
};
```

---

## 5. 思维模型参数 Schema

### 5.1 PDCA 循环

```javascript
// 版式20 — 颜色自动映射，无需用户指定
const PDCA_SCHEMA = {
  title:      '',
  subtitle:   '',
  pdca: {
    P: { points: [] },      // 自动使用 COLORS.MODEL.PLAN (2971EB)
    D: { points: [] },      // 自动使用 COLORS.MODEL.DO (22AAFE)
    C: { points: [] },      // 自动使用 COLORS.MODEL.CHECK (FFB61A)
    A: { points: [] },      // 自动使用 COLORS.MODEL.ACT (966EFF)
  },
};
```

### 5.2 SWOT 矩阵

```javascript
// 版式21 — 颜色自动映射
const SWOT_SCHEMA = {
  title:      '',
  subtitle:   '',
  swot: {
    S: { points: [] },      // 自动使用 COLORS.MODEL.STRENGTH (2971EB)
    W: { points: [] },      // 自动使用 COLORS.MODEL.WEAKNESS (E7F1FF)
    O: { points: [] },      // 自动使用 COLORS.MODEL.OPPORTUNITY (05C8C8)
    T: { points: [] },      // 自动使用 COLORS.MODEL.THREAT (966EFF)
  },
};
```

### 5.3 黄金圈

```javascript
// 版式22 — 颜色自动映射
const GOLDEN_SCHEMA = {
  title:      '',
  subtitle:   '',
  why:  { body: '' },       // 自动使用 COLORS.MODEL.WHY (2971EB)
  how:  { body: '' },       // 自动使用 COLORS.MODEL.HOW (22AAFE)
  what: { body: '' },       // 自动使用 COLORS.MODEL.WHAT (E7F1FF)
};
```

### 5.4 SCQA 叙事

```javascript
// 版式24 — 颜色自动映射
const SCQA_SCHEMA = {
  title:      '',
  subtitle:   '',
  scqa: {
    S: { headline: '', body: '' },  // 自动使用 COLORS.MODEL.SITUATION (E7F1FF)
    C: { headline: '', body: '' },  // 自动使用 COLORS.MODEL.COMPLICATION (FFB61A)
    Q: { headline: '', body: '' },  // 自动使用 COLORS.MODEL.QUESTION (966EFF)
    A: { headline: '', body: '' },  // 自动使用 COLORS.MODEL.ANSWER (2971EB)
  },
};
```

### 5.5 IPD 五看

```javascript
// 版式25 — 颜色按序号轮换
const IPD_SCHEMA = {
  title:      '',
  subtitle:   '',
  views: [
    { num: '01', label: '看行业', headline: '', body: '' },  // 2971EB
    { num: '02', label: '看客户', headline: '', body: '' },  // 22AAFE
    { num: '03', label: '看机会', headline: '', body: '' },  // 05C8C8
    { num: '04', label: '看竞争', headline: '', body: '' },  // 966EFF
    { num: '05', label: '看自己', headline: '', body: '' },  // 2971EB
  ],
};
```

---

## 6. 参数优先级规则

```
用户显式指定 > 推断规则 > COLOR_SEQ 轮换 > 默认值
```

### 优先级示例

```javascript
// 示例：bentoCard 参数优先级
function bentoCard(pres, slide, opts) {
  // 1. 用户显式指定 bgColor
  // 2. 否则检查 opts.fillColor（向后兼容）
  // 3. 否则检查 opts.color（向后兼容）
  // 4. 否则使用 COLORS.NEUTRAL.ICE_BLUE（默认）
  const bgColor = opts.bgColor || opts.fillColor || opts.color || COLORS.NEUTRAL.ICE_BLUE;

  // titleColor 推断：
  // 1. 用户显式指定
  // 2. 根据 bgColor 自动推断（深底白字，浅底蓝字）
  const titleColor = opts.titleColor || inferTitleColor(bgColor);
}
```

---

## 7. 版式函数参数对照表

| 版式函数 | 旧参数 | 新参数 | 兼容别名 |
|---------|--------|--------|---------|
| `bentoCard()` | fillColor, titleColor, bodyColor | bgColor, titleColor, textColor | fillColor→bgColor |
| `addDataCardSlide()` | cards[].color | cards[].bgColor | color→bgColor |
| `addCompareSlide()` v06 | left.color, right.color | left.bgColor, right.bgColor | color→bgColor |
| `addCompareSlide()` v29 | headerColor | headerBgColor | headerColor→headerBgColor |
| `addFeatureCardSlide()` | f.color | f.bgColor | color→bgColor |
| `addIconRowSlide()` | row.color | row.bgColor | color→bgColor |
| `addArchSlide()` | layer.color | layer.bgColor | color→bgColor |
| `addMetricDashboard()` | m.color | m.bgColor | color→bgColor |

---

## 8. 思维模型颜色映射表

| 模型 | 格子 | 常量名 | Hex |
|------|------|--------|-----|
| **PDCA** | P | COLORS.MODEL.PLAN | 2971EB |
| | D | COLORS.MODEL.DO | 22AAFE |
| | C | COLORS.MODEL.CHECK | FFB61A |
| | A | COLORS.MODEL.ACT | 966EFF |
| **SWOT** | S | COLORS.MODEL.STRENGTH | 2971EB |
| | W | COLORS.MODEL.WEAKNESS | E7F1FF |
| | O | COLORS.MODEL.OPPORTUNITY | 05C8C8 |
| | T | COLORS.MODEL.THREAT | 966EFF |
| **黄金圈** | WHY | COLORS.MODEL.WHY | 2971EB |
| | HOW | COLORS.MODEL.HOW | 22AAFE |
| | WHAT | COLORS.MODEL.WHAT | E7F1FF |
| **SCQA** | S | COLORS.MODEL.SITUATION | E7F1FF |
| | C | COLORS.MODEL.COMPLICATION | FFB61A |
| | Q | COLORS.MODEL.QUESTION | 966EFF |
| | A | COLORS.MODEL.ANSWER | 2971EB |