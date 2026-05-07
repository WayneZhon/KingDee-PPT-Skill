# 金蝶 PPT 节奏模板 Rhythm Templates v1.0
> 页面组合的预设模板，确保视觉节奏合理。
> 替代"禁止连续3页同版式"的规则，提供可执行的页面序列。
> 根据场景自动选择模板，降低AI决策负担。

---

## 1. 节奏模板定义

### 1.1 极简震撼型 minimal_impact

**适用场景**：年度总结、战略发布、融资路演、数据披露

```javascript
const MINIMAL_IMPACT = {
  name: '极简震撼型',
  vibe: '极简震撼',
  pages: [
    { type: 'cover',     required: false },
    { type: 'hero',      required: true,  alternates: ['floating_stats', 'quote'] },
    { type: 'metric',    required: false, alternates: ['bento_grid', 'data_card'] },
    { type: 'quote',     required: false, alternates: ['closing'] },
  ],
  constraints: {
    max_consecutive_same: 1,
    require_big_number: true,
    min_visual_weight_variance: 'high',
  },
  rules: [
    'hero 页必须有超大数字（≥120pt）或核心金句',
    '连续极端视觉不得超过1页',
    '每页必须有视觉主心骨',
  ],
};
```

**示例序列**：
```
cover → hero(8.4B) → metric(3列数据) → quote(金句) → closing
```

---

### 1.2 专业严谨型 professional_rigorous

**适用场景**：内部汇报、方案提案、复盘述职、技术分享

```javascript
const PROFESSIONAL_RIGOROUS = {
  name: '专业严谨型',
  vibe: '专业严谨',
  pages: [
    { type: 'cover',     required: true },
    { type: 'toc',       required: true },
    { type: 'section',   required: true, repeat: 'per_chapter' },
    { type: 'model',     required: true,  alternates: ['pyramid', 'pdca', 'swot', 'scqa', 'ipd'] },
    { type: 'timeline',  required: false, alternates: ['flow', 'five_w1h'] },
    { type: 'matrix',    required: false, alternates: ['compare'] },
    { type: 'closing',   required: true },
  ],
  constraints: {
    max_consecutive_same: 2,
    model_limit: 3,
    require_structure: true,
    require_toc: true,
  },
  rules: [
    '必须有目录页',
    '每章节开头必须有章节分隔页',
    '思维模型页不得超过3页',
    '必须有结构化内容（时间线/流程/矩阵）',
  ],
};
```

**示例序列**：
```
cover → toc → section01 → pyramid → timeline → section02 → swot → compare → closing
```

---

### 1.3 活力生态型 vibrant_eco

**适用场景**：伙伴赋能、产品发布、生态大会、客户介绍

```javascript
const VIBRANT_ECO = {
  name: '活力生态型',
  vibe: '活力生态',
  pages: [
    { type: 'cover',        required: true },
    { type: 'toc',          required: true },
    { type: 'section',      required: true, repeat: 'per_chapter' },
    { type: 'feature_card', required: true,  alternates: ['icon_row', 'bento_grid'] },
    { type: 'arch',         required: false, alternates: ['half_bleed_overlay'] },
    { type: 'compare',      required: false, alternates: ['matrix'] },
    { type: 'closing',      required: true },
  ],
  constraints: {
    max_consecutive_same: 2,
    min_card_count: 3,
    require_visual_element: true,
    require_image: true,
  },
  rules: [
    '每章节至少有1页卡片网格或图文页',
    '必须有架构图或产品截图',
    '卡片数量≥3',
    '禁止纯文字页',
  ],
};
```

**示例序列**：
```
cover → toc → section01 → bento_grid → arch → section02 → feature_card → half_bleed_overlay → closing
```

---

### 1.4 短汇报型 short_report

**适用场景**：内部汇报、周报、简报、快速同步

```javascript
const SHORT_REPORT = {
  name: '短汇报型',
  vibe: '通用',
  pages: [
    { type: 'bullet',    required: false, alternates: ['floating_stats'] },
    { type: 'metric',    required: true,  alternates: ['hero', 'data_card'] },
    { type: 'compare',   required: false, alternates: ['icon_row'] },
    { type: 'model',     required: false, alternates: ['pyramid', 'pdca'] },
  ],
  constraints: {
    max_pages: 10,
    skip_cover_closing: true,
    max_consecutive_same: 2,
  },
  rules: [
    '无封面/结尾页',
    '总页数≤10',
    '开场直接要点列表或数据',
  ],
};
```

**示例序列**：
```
bullet → metric → compare → pyramid
```

---

## 2. 版式类型定义

### 2.1 视觉重量分级

| 类型 | visual_weight | 说明 |
|------|---------------|------|
| `cover` | none | 封面（固定模板） |
| `toc` | low | 目录页 |
| `section` | high | 章节分隔页（大数字+背景图） |
| `closing` | none | 结尾页（固定模板） |
| `hero` | extreme | 超大数字页（视觉重心极强） |
| `floating_stats` | extreme | 悬浮统计页 |
| `metric` | high | 数据看板（大数字卡片） |
| `bento_grid` | high | Bento 网格（多彩卡片矩阵） |
| `feature_card` | medium | 特性卡片页 |
| `icon_row` | medium | 图标+文字行 |
| `quote` | low | 金句页（留白极多） |
| `bullet` | low | 要点列表页 |
| `model` | high | 思维模型页（PDCA/SWOT等） |
| `arch` | medium | 架构分层页 |
| `timeline` | medium | 时间轴页 |
| `flow` | medium | 流程步骤页 |
| `compare` | medium | 对比页 |
| `matrix` | medium | 矩阵表格页 |
| `half_bleed_overlay` | high | 半出血叠加页 |

### 2.2 版式类别分类

```javascript
const LAYOUT_CATEGORIES = {
  fixed:     ['cover', 'toc', 'section', 'closing'],      // 固定模板
  data:      ['hero', 'floating_stats', 'metric', 'data_card'],  // 数据展示
  grid:      ['bento_grid', 'feature_card', 'matrix'],    // 网格矩阵
  text:      ['quote', 'bullet', 'icon_row'],             // 文字为主
  model:     ['pyramid', 'pdca', 'swot', 'golden_circle', 'five_w1h', 'scqa', 'ipd'],  // 思维模型
  diagram:   ['arch', 'flow', 'timeline'],                // 图表流程
  compare:   ['compare', 'compare_split'],                // 对比分析
  image:     ['half_bleed_overlay', 'image_text', 'immersive'],  // 图片为主
};
```

---

## 3. 约束规则

### 3.1 全局约束

```javascript
const GLOBAL_CONSTRAINTS = {
  // 版式重复约束
  max_consecutive_same_layout: 2,   // 同版式最多连续2页

  // 视觉重量约束
  max_consecutive_extreme: 1,       // 极端视觉（hero/floating_stats）不得连续
  max_consecutive_low: 2,           // 低视觉（bullet/quote）不得连续超过2页

  // 类型约束
  max_consecutive_text: 2,          // 文字型版式不得连续超过2页
  require_data_or_grid_every: 5,    // 每5页至少有1页数据型或网格型

  // 内容约束
  max_bullet_points_per_page: 6,    // 要点列表上限
  content_density_max: 0.70,        // 内容占比上限70%
  whitespace_min: 0.30,             // 留白下限30%
};
```

### 3.2 视觉节奏推荐序列

```javascript
// 推荐的视觉重量交替模式
const RHYTHM_RECOMMENDED = {
  // 极端 → 中等 → 低 → 高 → 中等（循环）
  standard: ['extreme', 'medium', 'low', 'high', 'medium'],
  // 高 → 低 → 高 → 低（简洁交替）
  simple:   ['high', 'low', 'high', 'low'],
};
```

---

## 4. 场景匹配规则

### 4.1 场景 → 模板映射

```javascript
const SCENARIO_TO_TEMPLATE = {
  '内部汇报':     'short_report',
  '周报':         'short_report',
  '简报':         'short_report',
  '伙伴赋能':     'vibrant_eco',
  '产品发布':     'vibrant_eco',
  '生态大会':     'vibrant_eco',
  '客户介绍':     'vibrant_eco',
  '内部汇报':     'professional_rigorous',
  '方案提案':     'professional_rigorous',
  '复盘述职':     'professional_rigorous',
  '技术分享':     'professional_rigorous',
  '年度总结':     'minimal_impact',
  '战略发布':     'minimal_impact',
  '融资路演':     'minimal_impact',
  '数据披露':     'minimal_impact',
};
```

### 4.2 Vibe → 模板映射

```javascript
const VIBE_TO_TEMPLATE = {
  '极简震撼':     'minimal_impact',
  '专业严谨':     'professional_rigorous',
  '活力生态':     'vibrant_eco',
  '通用':         'short_report',
};
```

---

## 5. 版式推荐算法

### 5.1 推荐函数

```javascript
/**
 * 根据当前状态推荐下一页版式
 * @param {number} currentIndex - 当前页面序号（从0开始）
 * @param {string[]} previousLayouts - 前2页的版式类型
 * @param {object} template - 所选节奏模板
 * @returns {string[]} - 推荐的版式类型列表
 */
function recommendNextLayout(currentIndex, previousLayouts, template) {
  // 1. 获取前2页的视觉重量和类别
  const prevWeights = previousLayouts.map(l => VISUAL_WEIGHT[l] || 'medium');
  const prevCategories = previousLayouts.map(l => CATEGORY[l] || 'text');

  // 2. 检查全局约束
  // 同版式连续约束
  if (previousLayouts[0] === previousLayouts[1]) {
    return getAlternates(template, previousLayouts[0]);
  }

  // 极端视觉连续约束
  if (prevWeights[0] === 'extreme' && prevWeights[1] === 'extreme') {
    return getNonExtremeLayouts(template);
  }

  // 文字型连续约束
  if (prevCategories[0] === 'text' && prevCategories[1] === 'text') {
    return getNonTextLayouts(template);
  }

  // 3. 检查模板位置约束
  const templatePage = template.pages[currentIndex];
  if (templatePage?.alternates) {
    return templatePage.alternates;
  }

  // 4. 默认返回模板推荐
  return [templatePage?.type] || ['bullet'];
}

// 辅助函数
function getAlternates(template, excludeType) {
  return template.pages
    .filter(p => p.type !== excludeType && p.alternates)
    .flatMap(p => p.alternates);
}

function getNonExtremeLayouts(template) {
  return template.pages
    .filter(p => VISUAL_WEIGHT[p.type] !== 'extreme')
    .map(p => p.type);
}

function getNonTextLayouts(template) {
  return template.pages
    .filter(p => CATEGORY[p.type] !== 'text')
    .map(p => p.type);
}
```

---

## 6. 使用方式

### 6.1 SKILL.md 中的节奏选择流程

```
Phase 1: 节奏模板选择

1. 根据场景关键词匹配模板：
   - 「年度总结」「战略发布」「融资路演」→ minimal_impact
   - 「内部汇报」「方案提案」「复盘述职」→ professional_rigorous
   - 「伙伴赋能」「产品发布」「生态大会」→ vibrant_eco
   - 「周报」「简报」「快速同步」→ short_report

2. 根据用户指定 vibe 选择模板：
   - vibe: '极简震撼' → minimal_impact
   - vibe: '专业严谨' → professional_rigorous
   - vibe: '活力生态' → vibrant_eco

3. 读取模板的 pages 序列，按序生成页面

4. 生成每页时调用 recommendNextLayout() 检查约束
```

### 6.2 约束检查清单

```
生成每页前检查：
□ 前2页是否同版式？（禁止连续超过2页）
□ 前2页是否都是极端视觉？（禁止连续）
□ 前2页是否都是文字型？（禁止超过2页）
□ 当前页是否满足模板 required 约束？
□ 是否需要穿插数据/网格页？（每5页检查）
```

---

## 7. 模板示例

### 7.1 极简震撼型 8 页示例

| 序号 | 版式 | 内容 | visual_weight |
|------|------|------|---------------|
| 0 | cover | 标题+副标题+作者 | none |
| 1 | hero | 8.4B + 生态总GMV | extreme |
| 2 | metric | 3列数据看板 | high |
| 3 | quote | 金句：致良知·走正道 | low |
| 4 | hero | +83% + 年增长率 | extreme |
| 5 | bento_grid | 核心特性矩阵 | high |
| 6 | quote | 金句：行王道 | low |
| 7 | closing | 谢谢 | none |

**节奏分析**：extreme → high → low → extreme → high → low（符合推荐序列）

### 7.2 专业严谨型 12 页示例

| 序号 | 版式 | 内容 | visual_weight |
|------|------|------|---------------|
| 0 | cover | 封面 | none |
| 1 | toc | 目录（3章节） | low |
| 2 | section | 章节01：核心主张 | high |
| 3 | pyramid | MECE 三层结构 | high |
| 4 | timeline | 实施路线图 | medium |
| 5 | section | 章节02：数据支撑 | high |
| 6 | swot | SWOT 矩阵分析 | high |
| 7 | compare | 传统 vs AI原生 | medium |
| 8 | section | 章节03：行动计划 | high |
| 9 | pdca | PDCA 循环 | high |
| 10 | matrix | 成熟度对照表 | medium |
| 11 | closing | 结尾 | none |

**节奏分析**：low → high → high → medium → high → high → medium → high → high → medium（符合约束）

### 7.3 活力生态型 10 页示例

| 序号 | 版式 | 内容 | visual_weight |
|------|------|------|---------------|
| 0 | cover | 封面 | none |
| 1 | toc | 目录 | low |
| 2 | section | 章节01：平台能力 | high |
| 3 | bento_grid | 核心特性矩阵 | high |
| 4 | arch | 技术架构三层 | medium |
| 5 | section | 章节02：生态体系 | high |
| 6 | feature_card | 4列特性卡片 | medium |
| 7 | half_bleed_overlay | 产品截图+数据叠加 | high |
| 8 | compare | 合作优势对比 | medium |
| 9 | closing | 结尾 | none |

**节奏分析**：low → high → high → medium → high → medium → high → medium（符合约束）