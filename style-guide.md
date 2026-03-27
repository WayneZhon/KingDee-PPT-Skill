# 金蝶 PPT 视觉规范 Style Guide v3.0
> 所有数值从官方模板 XML 精确提取（2026版），可直接用于 PptxGenJS。
> v2.0 新增：Anti-Slop 设计原则、Bento Grid 规范、iconfont 图标规范、勾线图形规范。
> v3.0 更新：品牌色系升级（官方2026色盘）、完整间距/对齐/布局规范、内容密度表、29种版式速查。

---

## 1. 幻灯片尺寸

```javascript
pres.layout = 'LAYOUT_WIDE';
// ✅ 精确：13.3333" × 7.5"（12192000 × 6858000 EMU）
// ❌ 禁止 LAYOUT_16x9（10"×5.625"，不是官方尺寸）
```

---

## 2. 品牌色系（2026 官方色盘）

### 主色系
| 色名 | Hex | RGB | 用途 |
|------|-----|-----|------|
| 科技蓝（主品牌蓝） | `2971EB` | 41,113,235 | accent1：标题、强调、TOC序号、页码、Bento主卡 |
| 亮天蓝（品青） | `22AAFE` | 34,170,254 | accent2：执行/方法层辅助强调 |
| 章节数字青 | `00CCFE` | 0,204,254 | 章节页超大数字 + 装饰横线（章节标题/副标题均为白色） |
| 深紫蓝（藏青） | `28245F` | 40,36,95 | 深色辅助、架构图底层、强对比文字块 |

### 辅助色系
| 色名 | Hex | RGB | 用途 |
|------|-----|-----|------|
| 绿松石青 | `05C8C8` | 5,200,200 | 增长/机会/Opportunities 语义 |
| 薰衣草紫 | `966EFF` | 150,110,255 | 挑战/风险/Threats/Question 语义 |
| 橙黄 | `FFB61A` | 255,182,26 | 强调要素/Check/警示/WHAT 语义 |

### 中性色
| 色名 | Hex | RGB | 用途 |
|------|-----|-----|------|
| 深灰（正文） | `373838` | 55,56,56 | 白底主正文、卡片正文 |
| 浅灰（次要） | `BFBFBF` | 191,191,191 | 次要说明、分割线、边框 |
| 冰蓝（背景） | `E7F1FF` | 231,241,255 | 卡片底色、内容区淡底、二级信息区 |
| 白色 | `FFFFFF` | 255,255,255 | 深色背景上所有文字 |

### 主色渐变（封面 / 强调色块专用）
```
方向：135°（右下→左上）
起点：#2374F0（RGB 35,116,240）
终点：#22A9FE（RGB 34,169,254）
规则：渐变仅用于封面背景图、大型强调色块；卡片元素用纯色
```

### 多色序列（图表 / 多列卡片）
```javascript
const COLOR_SEQ = ['2971EB', '22AAFE', '05C8C8', '966EFF', 'FFB61A'];
```

### ⚠️ 渐变使用规则（重要）
```
✅ 允许：同色系透明度渐变（#2971EB 100% → #2971EB 15%）
✅ 允许：深藏青 #28245F → 科技蓝 #2971EB（同色系深→浅）
✅ 允许：封面渐变 #2374F0 → #22A9FE（135°，仅封面）
❌ 禁止：不同高亮色互相渐变（禁止蓝→青、蓝→金等跨色系渐变）
```

---

## 3. 字体规范

```javascript
const FONT = 'Microsoft YaHei';   // 全局唯一字体，所有文字元素（中英文/数字/图标）均使用
// ⚠️ 禁止使用任何其他字体（Helvetica、Arial、Calibri 等）
```

| 文字类型 | 字号 | 字重 | 颜色 | 备注 |
|---------|------|------|------|------|
| 页面标题（Title）| **28pt** | 加粗 | `373838` | 内容页标题（↑ Google Canvas）|
| 副标题 | 14pt | 普通 | `BFBFBF` | 内容页副标题（↓ 提升层级对比）|
| 内容正文 | **16pt** | 普通 | `373838` | 行距 1.4×（↓ 配合大标题）|
| 重点强调 | 18pt | 加粗 | `2971EB` 或 `FFB61A` | — |
| **超大数字（Bento/看板）** | **120-160pt** | 加粗 | `2971EB` | — |
| 章节大数字 | **125pt** | 加粗 | `00CCFE` | sz=12500 |
| 章节标题 | **24pt** | 加粗 | `FFFFFF` | 章节分隔页 |
| 章节副标题 | **16pt** | 普通 | `FFFFFF` | 章节分隔页 |
| TOC 章节编号 | 80pt | 加粗 | `2971EB` | — |
| 金句正文 | 28-36pt | 普通 | `373838` | 居中对齐 |
| 卡片标题 | **18-20pt** | 加粗 | `2971EB` 或 `FFFFFF` | ↑ Google Canvas |
| 卡片正文 | 13-14pt | 普通 | `373838` | 保持紧凑 |
| 图标字符 | 24-32pt | 普通 | `FFFFFF` | 置于色块内 |
| 页码 | 10pt | 普通 | `2971EB` | — |
| 封面主标题 | 54pt | 加粗 | `FFFFFF` | — |
| 保密声明 | 8pt | 普通 | `BFBFBF` | 右下角 |

---

## 4. Logo 规范

### Logo 文件（两套，按背景色选用）
| 文件 | 适用场景 |
|------|---------|
| `assets/logo_color.png` | **白底/浅色背景页**（目录页、内容页） |
| `assets/logo_white.png` | **蓝底/深色背景页**（封面、章节分隔、结尾） |

### 精确坐标（从 slideLayout3/5/7 XML 提取）
```javascript
function addLogo(slide, A, onDark) {
  slide.addImage({
    data: onDark ? A.LOGO_W : A.LOGO_C,
    x: 12.250, y: 0.187, w: 0.849, h: 0.433
  });
}
```

---

## 5. 背景图资源

| 文件 | 用途 |
|------|------|
| `assets/bg_cover.jpeg` | 封面 |
| `assets/bg_toc.png` | 目录 |
| `assets/bg_section_a/b/c.jpeg` | 章节分隔（轮换） |
| `assets/bg_closing.jpeg` | 结尾 |
| `assets/closing_thanks.png` | 结尾多语言谢谢图 |

```javascript
const SEC_BGS = [A.BG_SEC_A, A.BG_SEC_B, A.BG_SEC_C];
```

---

## 6. 页脚规范

```javascript
function addFooter(slide, pageNum, onDark) {
  if (!onDark) {
    slide.addText('④ 内部公开 请勿外传', {
      x: 11.355, y: 7.017, w: 1.327, h: 0.190,
      fontSize: 8, color: 'BFBFBF', fontFace: 'Microsoft YaHei', margin: 0
    });
  }
  slide.addText(String(pageNum), {
    x: 12.845, y: 7.051, w: 0.384, h: 0.150,
    fontSize: 10, color: onDark ? 'FFFFFF' : '2971EB',
    align: 'right', fontFace: 'Microsoft YaHei', bold: false, margin: 0
  });
}
```

---

## 7. 内容页标题栏

```javascript
function addContentTitle(slide, title, subtitle) {
  slide.addText(title, {
    x: 0.435, y: 0.230, w: 10.601, h: 0.513,
    fontSize: 24, color: '373838', bold: true,
    fontFace: 'Microsoft YaHei', margin: 0, valign: 'middle'
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.435, y: 0.747, w: 8.523, h: 0.312,
      fontSize: 16, color: 'BFBFBF', bold: false,
      fontFace: 'Microsoft YaHei', margin: 0, valign: 'middle'
    });
  }
}
// 内容区边界：x=0.434" y=1.503" w=12.256" h=5.348"
```

---

## 8. Anti-Slop 设计原则（反平庸规则）

> 作为顶尖商业演示设计师，必须克服大语言模型常有的「平庸审美」倾向。

---

### 8.1 间距基准（必须严格执行）

| 类型 | 数值 | 说明 |
|------|------|------|
| 页面最小边距 | **0.5"** | 所有内容元素距页面边缘 ≥ 0.5" |
| 内容块之间间距 | **0.3–0.5"** | 卡片间/列间/段落间；全张一致，不混用 |
| 留白目标 | **≥ 30%** | 不填满每一寸空间 |
| 文本框内边距 | `margin: 0` + 手动偏移 | 形状/线与文字对齐时必须补偿内边距 |

> **⚠️ 间距规则**：全张 PPT 只选一档间距（0.3" 或 0.5"），禁止同一张幻灯片内混用。

---

### 8.2 对齐规则

```
✅ 段落文字、要点列表 → 左对齐
✅ 标题、金句 → 居中对齐（封面/金句页）或左对齐（内容页）
❌ 禁止正文段落和列表居中对齐（视觉重心失衡）
```

---

### 8.3 视觉主心骨（每页必须满足之一）

- 一个占据版面 1/3 以上的超大品牌色数字（如 `8.4B`、`+83%`）
- 一个全幅或占 50% 以上的高质量图片
- 一个深色/全幅高亮色块，形成视觉锚点
- 一句充满张力的超大金句（版式 16）

**元素大小必须形成对比**：主视觉 vs 次要文字，尺寸比 ≥ 3:1；避免所有文字大小相近。

---

### 8.4 文案精炼原则

| 平庸写法 | 有力写法 |
|---------|---------|
| 提升工作效率 | 重塑效能边界 |
| 降低成本 | 压缩至零边际 |
| 生态合作共赢 | 共创价值飞轮 |
| 产品功能丰富 | 能力矩阵完整 |
| 用户数量增长 | 生态规模跃迁 |
| 支持多种场景 | 全场景穿透 |

---

### 8.5 ❌ 绝对禁止清单

```
布局：
❌ 「标题 + 三个带小黑点的列表」作为默认排版——必须加图标/图表/视觉元素
❌ 纯文本幻灯片——每页必须有图片、图标、图表或色块等视觉元素
❌ 连续 3 页使用同一版式——相邻页面必须变换列/卡片/标注形式
❌ 只精心设计一张而其他简陋——视觉密度要全程一致

对比度：
❌ 浅色背景上使用浅色文字（如白底灰字）
❌ 深色背景上使用深色文字（如深蓝底藏青字）
❌ 图标与背景色过近导致看不清

标题：
❌ 内容页标题下方加强调线（AI 生成幻灯片典型特征）
   → 章节分隔页品牌装饰横线（#00CCFE）为官方模板元素，保留
   → 内容页标题下方改用空白或背景色形成分隔

其他：
❌ 不同高亮色互相渐变（只允许同色透明度渐变）
❌ 在 PPT 里写超过 20 字的长句要点
❌ 页面留白 < 30%（内容塞满版面）
❌ 所有卡片等大等色，无主次之分
❌ 同一页面间距随意混用（0.3"/0.5" 选一档执行到底）
❌ 颜色超出官方色盘（科技蓝/天蓝/章节青/深紫蓝/绿松石/薰衣草紫/橙黄）
```

---

## 8.6 Google Canvas 设计精髓（核心借鉴原则）

> 金蝶 PPT 在严格遵守品牌色系、字体（Microsoft YaHei）、白底内容页等规范前提下，吸收 Google Slides Canvas 的现代感设计语言。

### 节奏感（Rhythm）
每页的视觉重量要有节奏：**大号数字页 → 图文页 → 卡片网格页 → 金句页**，不要连续多页同等视觉密度。

### 层级鲜明（Hierarchy）
- 标题：**28pt**（比正文大 75%，形成强对比）
- 正文：**16pt**（干净简洁）
- 标注/副说明：**13–14pt**（退到视觉层次背后）
- 超大数字：**60–160pt**（在页面上「悬浮」）

### 圆角系统（Radius System）
| 卡片类型 | rectRadius | 说明 |
|---------|-----------|------|
| 主内容卡片（Bento / 特征 / 数据 / 对比栏） | **0.15"** | Google Canvas 大圆角 |
| 小型嵌套元素（SWOT格 / 5W1H格 / SCQA格 / 叠加卡片） | **0.12"** | 次级圆角 |
| 结构性色块（表头 / 架构层标签 / 顶部色条） | **0"** | 保持直角，体现秩序感 |

### 阴影三档（Elevation System）
| 档位 | 函数 | blur | offset | opacity | 用途 |
|------|------|------|--------|---------|------|
| elevation-1（最轻） | `mkShS()` | 4 | 1 | 0.05 | 普通内容卡片、背景分隔 |
| elevation-2（标准） | `mkSh()` | 8 | 3 | 0.08 | 主要卡片、重要信息块 |
| elevation-3（品牌光晕） | `mkShB()` | 14 | 4 | 0.10 | 图标圆 / 主卡 Bento / CTA色块 |

### 呼吸空间（Breathing Room）
- 页面留白 **≥ 30%**，优先 40%
- 元素之间最小间距 **0.3"**，主要区块间 **0.5"**
- 宁可内容拆成两页，也不压缩字号或间距

### 不做的事（保持金蝶品牌纯粹性）
```
❌ 不用 Google Sans / Nunito（坚持 Microsoft YaHei）
❌ 不用深色内容页背景（内容页全程白底）
❌ 不引入品牌色盘外的颜色（无论设计多时髦）
❌ 不在官方封面/章节/结尾页上改动背景图或布局
```

### 基础参数
```javascript
const BENTO = {
  gap:    0.12,     // 卡片间距（英寸）
  radius: 0.15,     // 圆角（英寸，用 rectRadius） ← Google Canvas 大圆角
  // 主卡配色（1/3 以上版面）
  primary: { fill: '2971EB', text: 'FFFFFF' },
  // 次卡配色（1/6 版面）
  secondary: { fill: 'E7F1FF', text: '373838', titleColor: '2971EB' },
  // 强调卡（中等，用于次重要信息）
  accent: { fill: 'E7F1FF', text: '2971EB' },
  shadow: () => ({ type:'outer', blur:4, offset:1, angle:135, color:'000000', opacity:0.05 }),  // elevation-1
};
```

### 标准 2×3 非均等布局（版式 12）
```
┌──────────────────┬──────────┬──────────┐
│                  │  次卡 B  │  次卡 C  │
│   主卡 A（大）    ├──────────┼──────────┤
│                  │  次卡 D  │  次卡 E  │
└──────────────────┴──────────┴──────────┘
主卡 A：w≈5.8"  次卡：w≈3.0"  高度相同 h≈5.2"
```

### 辅助函数：bentoCard
```javascript
/**
 * 绘制单个 Bento 卡片
 * @param {Object} slide - PptxGenJS slide
 * @param {Object} pres  - PptxGenJS pres（用于 ShapeType）
 * @param {Object} opts  - { x, y, w, h, fillColor, title, body, titleColor, bodyColor, icon, shadow }
 */
function bentoCard(slide, pres, opts) {
  const {
    x, y, w, h,
    fillColor = 'E7F1FF',
    title = '',
    body = '',
    titleColor = '2971EB',
    bodyColor = '373838',
    icon = '',
    hasShadow = true,
  } = opts;

  // 卡片底色
  const shapeOpts = {
    x, y, w, h,
    fill: { color: fillColor },
    rectRadius: 0.15,
  };
  if (hasShadow) shapeOpts.shadow = BENTO.shadow();
  slide.addShape(pres.ShapeType.roundRect, shapeOpts);

  let textY = y + 0.18;

  // 图标（可选）
  if (icon) {
    slide.addText(icon, {
      x: x + 0.18, y: textY, w: 0.5, h: 0.5,
      fontSize: 22, fontFace: 'Microsoft YaHei',
      color: fillColor === '2971EB' ? 'FFFFFF' : '2971EB',
      valign: 'middle', align: 'center', margin: 0,
    });
    textY += 0.52;
  }

  // 标题
  if (title) {
    slide.addText(title, {
      x: x + 0.18, y: textY, w: w - 0.36, h: 0.40,
      fontSize: 16, bold: true, color: titleColor,
      fontFace: 'Microsoft YaHei', valign: 'middle', margin: 0,
    });
    textY += 0.44;
  }

  // 正文
  if (body) {
    slide.addText(body, {
      x: x + 0.18, y: textY, w: w - 0.36, h: h - (textY - y) - 0.12,
      fontSize: 13, color: bodyColor,
      fontFace: 'Microsoft YaHei', valign: 'top', margin: 0,
      wrap: true,
    });
  }
}
```

---

## 10. iconfont 图标规范

> **方案选型**：图标字符统一使用 `Microsoft YaHei`，配合 PptxGenJS `addText` 直接渲染，跨平台一致。

---

### 10.1 字体声明

```javascript
const FONT_ICO = 'Microsoft YaHei';  // 图标字符统一使用微软雅黑
```

---

### 10.2 尺寸体系（三档）

| 档位 | fontSize | 适用场景 |
|------|----------|---------|
| **大图标** | `36–40pt` | 独立装饰块、章节分隔右侧装饰、金句页点缀 |
| **中图标** | `24–28pt` | Bento 卡片顶部、要点列表行首、思维模型格标题 |
| **小图标** | `16–18pt` | 行内辅助标注、标签徽章、流程箭头旁 |

---

### 10.3 金蝶业务场景图标库（完整版）

#### 📌 平台 / 技术 / AI

| 语义 | 字符 | Unicode | 推荐档位 |
|------|------|---------|---------|
| AI / 智能体 | 🤖 | U+1F916 | 中/大 |
| 闪电 / 快速响应 | ⚡ | U+26A1 | 中 |
| 云平台 / SaaS | ☁️ | U+2601 | 中/大 |
| 开发 / 工具 | 🔧 | U+1F527 | 中 |
| 代码 / API | 💻 | U+1F4BB | 中 |
| 连接 / 集成 | 🔗 | U+1F517 | 中 |
| 齿轮 / 引擎 | ⚙️ | U+2699 | 中 |
| 芯片 / 算力 | 🔬 | U+1F52C | 中 |
| 安全 / 可信 | 🔒 | U+1F512 | 中 |
| 移动端 / App | 📱 | U+1F4F1 | 中 |

#### 📌 生态 / 合作 / 开发者

| 语义 | 字符 | Unicode | 推荐档位 |
|------|------|---------|---------|
| 合作伙伴 / 握手 | 🤝 | U+1F91D | 中/大 |
| 全球生态 | 🌐 | U+1F310 | 中/大 |
| 开发者社区 | 👥 | U+1F465 | 中 |
| 认证 / 勋章 | 🏆 | U+1F3C6 | 中/大 |
| 星级 / 精选 | ★ | U+2605 | 小/中 |
| 市场 / 商店 | 🏪 | U+1F3EA | 中 |
| 种子 / 孵化 | 🌱 | U+1F331 | 中 |
| 飞轮 / 循环 | 🔄 | U+1F504 | 中 |

#### 📌 数据 / 分析 / 财务

| 语义 | 字符 | Unicode | 推荐档位 |
|------|------|---------|---------|
| 数据看板 | 📊 | U+1F4CA | 中/大 |
| 增长趋势 | 📈 | U+1F4C8 | 中/大 |
| 目标 / 精准 | 🎯 | U+1F3AF | 中/大 |
| 财务 / 金融 | 💰 | U+1F4B0 | 中 |
| 账本 / ERP | 📒 | U+1F4D2 | 中 |
| 报告 / 文档 | 📋 | U+1F4CB | 中 |
| 计算 / 精算 | 🧮 | U+1F9EE | 中 |
| 钻石 / 价值 | 💎 | U+1F48E | 大 |

#### 📌 流程 / 管理 / 组织

| 语义 | 字符 | Unicode | 推荐档位 |
|------|------|---------|---------|
| 流程 / 步骤 | → | U+2192 | 小/中 |
| 完成 / 确认 | ✓ | U+2713 | 小/中 |
| 任务 / 计划 | 📅 | U+1F4C5 | 中 |
| 人才 / 团队 | 🧑‍💼 | U+1F9D1+U+1F4BC | 中 |
| 供应链 / 物流 | 🚚 | U+1F69A | 中 |
| 制造 / 工厂 | 🏭 | U+1F3ED | 中 |
| 竞争 / 策略 | ⚔️ | U+2694 | 中 |
| 盾牌 / 防御 | 🛡️ | U+1F6E1 | 中 |

#### 📌 创新 / 战略 / 品牌

| 语义 | 字符 | Unicode | 推荐档位 |
|------|------|---------|---------|
| 创新 / 想法 | 💡 | U+1F4A1 | 中/大 |
| 火箭 / 起飞 | 🚀 | U+1F680 | 大 |
| 旗帜 / 目标 | 🚩 | U+1F6A9 | 中 |
| 望远镜 / 洞察 | 🔭 | U+1F52D | 中 |
| 拼图 / 方案 | 🧩 | U+1F9E9 | 中 |
| 地图 / 路径 | 🗺️ | U+1F5FA | 中 |
| 钥匙 / 解锁 | 🔑 | U+1F511 | 中 |
| 魔法棒 / AI生成 | ✨ | U+2728 | 中/大 |

---

### 10.4 思维模型专用图标配置

每种思维模型的各格子均有推荐图标，写入内容脚本时可直接引用：

| 模型 | 格子 | 推荐图标 | 备注 |
|------|------|---------|------|
| **PDCA** | P 计划 | 📅 | 蓝色格 |
| | D 执行 | ⚡ | 青色格 |
| | C 检查 | 🔍 | 黄色格 |
| | A 改进 | 🔄 | 紫色格 |
| **SWOT** | S 优势 | 💪 | 蓝色格 |
| | W 劣势 | ⚠️ | 浅色格 |
| | O 机会 | 🚀 | 蓝绿格 |
| | T 威胁 | 🛡️ | 紫色格 |
| **黄金圈** | WHY | 💡 | 内核蓝 |
| | HOW | ⚙️ | 中层青 |
| | WHAT | 📦 | 外层灰 |
| **SCQA** | S 场景 | 🌐 | 浅色格 |
| | C 冲突 | ⚔️ | 黄色格 |
| | Q 问题 | 🔍 | 紫色格 |
| | A 解决 | ✨ | 蓝色格 |
| **IPD五看** | 看行业 | 🏭 | 序号01 |
| | 看客户 | 👥 | 序号02 |
| | 看机会 | 🎯 | 序号03 |
| | 看竞争 | ⚔️ | 序号04 |
| | 看自己 | 🪞 | 序号05 |
| **5W1H** | WHO | 👥 | — |
| | WHAT | 📋 | — |
| | WHEN | 📅 | — |
| | WHERE | 🌐 | — |
| | WHY | 💡 | — |
| | HOW | ⚙️ | — |

---

### 10.5 图标徽章（Badge）模式

图标 + 圆形色块组合，用于 Bento 卡片顶部或流程节点标识：

```javascript
/**
 * 绘制图标徽章（圆形色块 + 居中 emoji）
 * @param {Object} slide
 * @param {Object} pres
 * @param {number} cx, cy  - 圆心坐标（英寸）
 * @param {number} r       - 圆半径（英寸，推荐 0.28~0.36）
 * @param {string} icon    - emoji 字符
 * @param {string} bgColor - 背景色（默认主蓝）
 * @param {boolean} onDark - 是否深色背景（影响图标颜色）
 */
function addIconBadge(slide, pres, cx, cy, r, icon, bgColor = '2971EB', onDark = true) {
  // 圆形底色
  slide.addShape(pres.ShapeType.oval, {
    x: cx - r, y: cy - r, w: r * 2, h: r * 2,
    fill: { color: bgColor },
    line: { color: bgColor, width: 0 },
  });
  // 居中图标
  slide.addText(icon, {
    x: cx - r, y: cy - r,
    w: r * 2, h: r * 2,
    fontSize: Math.round(r * 72 * 0.9),   // 字号 = 半径 × 0.9 × 72
    fontFace: 'Microsoft YaHei',
    color: onDark ? 'FFFFFF' : '2971EB',
    align: 'center', valign: 'middle', margin: 0,
  });
}

// 使用示例：在卡片左上角放置 0.30" 半径的蓝色徽章
addIconBadge(slide, pres, cardX + 0.42, cardY + 0.42, 0.30, '📊');
```

---

### 10.6 卡片内标准图标用法

```javascript
// ① 深色背景（主蓝 / 品青）→ 白色图标
slide.addText('📊', {
  x: cardX + 0.15, y: cardY + 0.18,
  w: 0.48, h: 0.48,
  fontSize: 26, fontFace: 'Microsoft YaHei',
  color: 'FFFFFF',
  align: 'center', valign: 'middle', margin: 0,
});

// ② 浅色背景（卡片底色 E7F1FF）→ 品牌蓝图标
slide.addText('💡', {
  x: cardX + 0.15, y: cardY + 0.18,
  w: 0.48, h: 0.48,
  fontSize: 26, fontFace: 'Microsoft YaHei',
  color: '2971EB',
  align: 'center', valign: 'middle', margin: 0,
});
```

---

### 10.7 图标禁用清单 & 替代建议

| 禁用图标 | 原因 | 替代方案 |
|---------|------|---------|
| 😀 / 😊 等面孔类 | 过于轻松，与企业调性不符 | 用 🎯 / 🏆 / 💡 等功能型图标 |
| 🎨 / 🖌️ 等艺术类 | 与金蝶业务无关联 | 用 ✨ 表达创新 |
| 🍕 / 🍺 等食物类 | 完全不适用 | — |
| ❤️ / 💕 等情感类 | 与企业演示不符 | 用 🤝 表达合作 |
| 各国国旗 🇨🇳 等 | 政治敏感，跨区域演示风险 | 用 🌐 表达全球化 |
| 🔴 🟠 等纯色圆形 | 与 PPT 色块视觉冲突 | 直接用 `addShape` 色块代替 |

---

## 11. 勾线图形规范（数据可视化配图）

用 PptxGenJS 的 `addShape` + `line` 绘制勾线风格元素，营造科技感。

### 基础参数
```javascript
const LINE_STYLE = {
  color:  '2971EB',  // 主色勾线（或 22AAFE 辅色）
  width:  1.5,       // pt
  dot:    0.05,      // 端点圆点半径（英寸）
  fill:   null,      // 勾线风格：无填充
  lightFill: 'E7F1FF', // 极浅填充（可选，透明度效果）
};
```

### 迷你折线图（数据看板页用）
```javascript
/**
 * 绘制迷你勾线折线图
 * @param {Object} slide
 * @param {Object} pres
 * @param {number} x, y, w, h - 图表区域
 * @param {number[]} data - 归一化数据 [0-1]
 * @param {string} color - 线条颜色
 */
function addMiniLineChart(slide, pres, x, y, w, h, data, color = '2971EB') {
  if (data.length < 2) return;
  const stepX = w / (data.length - 1);

  // 连接折线
  for (let i = 0; i < data.length - 1; i++) {
    const x1 = x + stepX * i;
    const y1 = y + h - data[i] * h;
    const x2 = x + stepX * (i + 1);
    const y2 = y + h - data[i + 1] * h;
    slide.addShape(pres.ShapeType.line, {
      x: x1, y: y1, w: x2 - x1, h: y2 - y1,
      line: { color, width: 1.5 }
    });
  }

  // 数据点（小圆点）
  data.forEach((val, i) => {
    const px = x + stepX * i - 0.05;
    const py = y + h - val * h - 0.05;
    slide.addShape(pres.ShapeType.oval, {
      x: px, y: py, w: 0.10, h: 0.10,
      fill: { color }, line: { color: 'FFFFFF', width: 1 }
    });
  });
}
```

### 圆环进度（单指标可视化）
```javascript
/**
 * 文字进度环（用圆弧近似：多段短线拼接）
 * 简化方案：用两个圆叠加表达进度
 */
function addProgressRing(slide, pres, cx, cy, r, percent, color = '2971EB') {
  // 外圈（背景）
  slide.addShape(pres.ShapeType.oval, {
    x: cx - r, y: cy - r, w: r * 2, h: r * 2,
    fill: { color: 'E7F1FF' },
    line: { color: 'BFBFBF', width: 1 }
  });
  // 简化：用扇形覆盖未完成区域（用浅色矩形裁切近似）
  // 实际使用时建议配合 SVG 图片内嵌代替
  slide.addText(`${Math.round(percent * 100)}%`, {
    x: cx - r, y: cy - 0.25, w: r * 2, h: 0.5,
    fontSize: 20, bold: true, color,
    fontFace: 'Microsoft YaHei', align: 'center', margin: 0,
  });
}
```

---

## 12. 内容密度上限（视觉 QA 基准）

> **内容超出限制？必须拆成多张幻灯片。切勿挤占空间，切勿堆叠滚动。**

### 幻灯片类型与最大内容

| 幻灯片类型 | 最大内容 | 版面占比上限 |
|-----------|---------|------------|
| **标题页** | 1 个标题 + 1 个副标题 + 可选标语 | 50% |
| **内容幻灯片** | 1 个标题 + 4–6 个要点，或 1 个标题 + 2 个段落 | 70% |
| **特征网格** | 1 个标题 + 最多 6 张卡片（2×3 或 3×2） | 80% |
| **代码幻灯片** | 1 个标题 + 8–10 行代码 | 75% |
| **引用幻灯片** | 1 段引用（最多 3 行）+ 出处 | 50% |
| **图片幻灯片** | 1 个标题 + 1 张图片（高度不超过页面 60%） | — |
| **数据看板** | 3 个数字卡片（每卡：数字 + 标签 + 副说明） | 75% |
| **横向流程** | 最多 5 个步骤 | 80% |

> ⚠️ **留白是设计，不是浪费**：超出上限 → 拆分，不压缩字号。

---

## 13. 布局选项速查（Layout Options）

> 选版式时优先参考此表，而非默认用「标题+要点」。

### 文字内容型

| 版式编号 | 名称 | 适用内容 | 最大要点数 |
|---------|------|---------|---------|
| 04 | 要点列表 | 单列要点，≤6 条 | 6 |
| 26 | 图标+文字行 | 彩色圆圈图标 + 粗体标题 + 描述，横向行排 | 4–5 行 |
| 16 | 金句/引言 | 1 段引用（≤30字）+ 出处 | 3 行 |

### 图文混排型

| 版式编号 | 名称 | 适用内容 |
|---------|------|---------|
| 08 | 图文并排 | 左文右图（sizing: contain） |
| 17 | 半出血图片 | 左侧全幅出血图 + 右侧纯白文字区 |
| 27 | 半出血叠加 | 右侧全幅出血图 + 内容卡叠加在图上 |

### 数据/指标型

| 版式编号 | 名称 | 适用内容 |
|---------|------|---------|
| 11 | 数据看板 | 3 个 KPI 卡片（72pt 数字 + 标签 + 迷你折线）|
| 28 | 悬浮统计 | 2–4 个大数字（60–72pt）无卡片容器，白底直排 |
| 29 | 对比栏 | 前后对比 / 优缺点 / 并排选项（两栏分隔）|

### 网格/卡片型

| 版式编号 | 名称 | 适用内容 |
|---------|------|---------|
| 12 | Bento Grid | 1 主卡 + 4 次卡，非均等 |
| 14 | 特征卡片 | 3–4 列图标圆+标题+说明 |
| 05 | 数据卡片 | 3–4 个带数字的卡片 |

### 流程/时间型

| 版式编号 | 名称 | 适用内容 |
|---------|------|---------|
| 06 | 步骤流程 | 横向 Step 1→2→3，≤5步 |
| 09 | 时间轴 | 日期节点，上下交错 |

### 对比/矩阵型

| 版式编号 | 名称 | 适用内容 |
|---------|------|---------|
| 15 | 分层矩阵 | 行×列对照表（如传统 vs AI原生） |
| 29 | 对比栏 | 两栏前后/是否/优劣对比 |

---

## 14. 章节分隔页规范（从 slideLayout5 XML 精确提取）

```javascript
// 大数字：sz=12500（125pt），color=#00CCFE，bold=true
// 位置：x=0.403" y=0.284" w=2.365" h=2.205"
// 品青装饰横线：x=0.603" y=2.489" w=0.876" h=0.096"，fill=#00CCFE（⚠️ 非红色）
// 章节标题：x=0.516" y=2.970" w=10.870" h=0.667"（24pt 白色加粗）
// 副标题：x=0.516" y=3.626" w=5.167" h=1.320"（16pt，color=#FFFFFF 白色）
```

---

## 15. 分辨率档位

| 档位 | 参数 | 输出像素 | 使用时机 |
|------|------|---------|---------|
| Standard | `-r 150` | ~1600×900 | 日常快速预览 |
| 2K | `-r 220` | ~2340×1316 | 精细QA |
| 4K | `-r 300` | ~3200×1800 | 大屏/印刷验收 |
