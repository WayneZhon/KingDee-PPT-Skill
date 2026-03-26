# 金蝶 PPT 版式预设 — Base（通用函数 + 版式 01-10）
> 所有坐标基于 LAYOUT_WIDE（13.3333" × 7.5"），从官方模板 XML 精确提取（2026版）。
> 本文件为**必须加载**的基础文件，包含：通用辅助函数 + 版式01-10 + 版式选择速查。
> 高级版式见：`layout-presets-advanced.md`（版式11-18）
> 思维模型版式见：`layout-presets-models.md`（版式19-25）
> 视觉增强版式见：`layout-presets-visual.md`（版式26-29）

---

## 通用辅助函数（每个脚本必须包含）

```javascript
'use strict';
const pptxgen = require('pptxgenjs');
const fs = require('fs');

// ─── 全局字体（所有 addText 必须使用，禁止使用其他字体）───────────
const FONT = 'Microsoft YaHei';

// ─── 资源加载 ────────────────────────────────────────────────────
function loadAsset(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const mimeMap = { jpeg:'image/jpeg', jpg:'image/jpeg', png:'image/png', gif:'image/gif' };
  return (mimeMap[ext]||'image/png') + ';base64,' + fs.readFileSync(`assets/${filename}`).toString('base64');
}

function loadAllAssets() {
  return {
    BG_COVER:       loadAsset('bg_cover.jpeg'),
    BG_TOC:         loadAsset('bg_toc.png'),
    BG_SEC_A:       loadAsset('bg_section_a.jpeg'),
    BG_SEC_B:       loadAsset('bg_section_b.jpeg'),
    BG_SEC_C:       loadAsset('bg_section_c.jpeg'),
    BG_CLOSING:     loadAsset('bg_closing.jpeg'),
    CLOSING_THANKS: loadAsset('closing_thanks.png'),
    LOGO_C:         loadAsset('logo_color.png'),
    LOGO_W:         loadAsset('logo_white.png'),
  };
}

// ─── Shadow 工厂（必须每次 new，避免 PptxGenJS 对象变异 bug）──────
const mkSh  = () => ({ type:'outer', blur:12, offset:4, angle:135, color:'000000', opacity:0.10 });
const mkShS = () => ({ type:'outer', blur:6,  offset:2, angle:135, color:'000000', opacity:0.07 });
const mkShB = () => ({ type:'outer', blur:16, offset:6, angle:135, color:'1770EA',  opacity:0.12 });

// ─── Logo ────────────────────────────────────────────────────────
function addLogo(slide, A, onDark) {
  slide.addImage({
    data: onDark ? A.LOGO_W : A.LOGO_C,
    x: 12.250, y: 0.187, w: 0.849, h: 0.433
  });
}

// ─── 页脚 ────────────────────────────────────────────────────────
function addFooter(slide, pageNum, onDark) {
  if (!onDark) {
    slide.addText('④ 内部公开 请勿外传', {
      x: 11.355, y: 7.017, w: 1.327, h: 0.190,
      fontSize: 8, color: 'AAAAAA', fontFace: 'Microsoft YaHei', margin: 0
    });
  }
  slide.addText(String(pageNum), {
    x: 12.845, y: 7.051, w: 0.384, h: 0.150,
    fontSize: 10, color: onDark ? 'FFFFFF' : '2A71EC',
    align: 'right', fontFace: 'Microsoft YaHei', margin: 0
  });
}

// ─── 内容页标题 ───────────────────────────────────────────────────
function addContentTitle(slide, title, subtitle) {
  slide.addText(title, {
    x: 0.435, y: 0.230, w: 10.601, h: 0.513,
    fontSize: 24, color: '262626', bold: true,
    fontFace: 'Microsoft YaHei', margin: 0, valign: 'middle'
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.435, y: 0.747, w: 8.523, h: 0.312,
      fontSize: 16, color: '888888', bold: false,
      fontFace: 'Microsoft YaHei', margin: 0, valign: 'middle'
    });
  }
}

// ─── Bento 卡片辅助函数 ───────────────────────────────────────────
/**
 * @param {Object} pres - PptxGenJS 实例（用于 ShapeType）
 * @param {Object} slide - 目标幻灯片
 * @param {Object} opts  - 卡片配置
 *   x, y, w, h       : 位置尺寸（英寸）
 *   fillColor         : 卡片底色，默认 'F5F7FA'
 *   title             : 标题文字
 *   titleColor        : 标题颜色，默认 '1770EA'
 *   body              : 正文文字（可选）
 *   bodyColor         : 正文颜色，默认 '333333'
 *   bigNumber         : 超大数字（可选，替代图标）
 *   numberColor       : 大数字颜色，默认 'FFFFFF'（深色卡）或 '1770EA'（浅色卡）
 *   icon              : emoji 图标字符（可选）
 *   hasShadow         : 是否加阴影，默认 true
 */
function bentoCard(pres, slide, opts) {
  const {
    x, y, w, h,
    fillColor = 'F5F7FA',
    title = '',
    titleColor = fillColor === '1770EA' ? 'FFFFFF' : '1770EA',
    body = '',
    bodyColor = fillColor === '1770EA' ? 'D0E8FF' : '555555',
    bigNumber = '',
    numberColor = fillColor === '1770EA' ? 'FFFFFF' : '1770EA',
    icon = '',
    hasShadow = true,
  } = opts;

  const shapeOpts = {
    x, y, w, h,
    fill: { color: fillColor },
    rectRadius: 0.08,
  };
  if (hasShadow) shapeOpts.shadow = mkShS();
  slide.addShape(pres.ShapeType.roundRect, shapeOpts);

  const pad = 0.20;
  let curY = y + pad;

  // 图标（emoji）
  if (icon) {
    slide.addText(icon, {
      x: x + pad, y: curY, w: 0.52, h: 0.52,
      fontSize: 24, fontFace: 'Microsoft YaHei',
      color: titleColor, align: 'center', valign: 'middle', margin: 0,
    });
    curY += 0.58;
  }

  // 超大数字
  if (bigNumber) {
    const numSize = w > 3.5 ? 80 : 54;
    slide.addText(bigNumber, {
      x: x + pad, y: curY, w: w - pad * 2, h: 1.20,
      fontSize: numSize, bold: true, color: numberColor,
      fontFace: 'Microsoft YaHei', valign: 'middle', margin: 0,
    });
    curY += 1.28;
  }

  // 标题
  if (title) {
    const titleSize = fillColor === '1770EA' ? 18 : 16;
    slide.addText(title, {
      x: x + pad, y: curY, w: w - pad * 2, h: 0.42,
      fontSize: titleSize, bold: true, color: titleColor,
      fontFace: 'Microsoft YaHei', valign: 'middle', margin: 0,
    });
    curY += 0.46;
  }

  // 正文
  if (body) {
    const remaining = h - (curY - y) - pad;
    if (remaining > 0.2) {
      slide.addText(body, {
        x: x + pad, y: curY, w: w - pad * 2, h: remaining,
        fontSize: 13, color: bodyColor,
        fontFace: 'Microsoft YaHei', valign: 'top', margin: 0, wrap: true,
      });
    }
  }
}

const COLOR_SEQ = ['1770EA', '00CBFF', '00C7C7', 'AF6EFF', 'FFC000'];
```

---

## 版式 01 — 封面页

**背景**：`BG_COVER` 全幅 ｜ **无 Logo**

```javascript
function addCoverSlide(pres, A, { title, subtitle, author, dept, date }, pageNum) {
  const s = pres.addSlide();
  s.addImage({ data: A.BG_COVER, x: 0, y: 0, w: 13.333, h: 7.517 });
  s.addText(title, {
    x: 0.917, y: 2.247, w: 11.500, h: 1.450,
    fontSize: 54, color: 'FFFFFF', bold: true,
    fontFace: 'Microsoft YaHei', margin: 0, valign: 'middle'
  });
  if (subtitle) {
    s.addText(subtitle, {
      x: 0.917, y: 3.8, w: 8.0, h: 0.55,
      fontSize: 20, color: 'D0EEFF', bold: false,
      fontFace: 'Microsoft YaHei', margin: 0
    });
  }
  if (author) s.addText(author, { x:0.917, y:5.255, w:3.008, h:0.443, fontSize:16, color:'FFFFFF', fontFace:'Microsoft YaHei', margin:0 });
  if (dept)   s.addText(dept,   { x:0.917, y:5.715, w:3.002, h:0.473, fontSize:16, color:'FFFFFF', fontFace:'Microsoft YaHei', margin:0 });
  s.addText(date || '', { x:0.911, y:6.198, w:3.008, h:0.330, fontSize:16, color:'FFFFFF', fontFace:'Microsoft YaHei', margin:0 });
  s.addText('版权所有 © 金蝶国际软件集团有限公司   始创于 1993', {
    x:1.007, y:7.023, w:3.415, h:0.166, fontSize:8, color:'AACCDD', fontFace:'Microsoft YaHei', margin:0 });
  s.addText('④ 内部公开 请勿外传', { x:3.877, y:6.998, w:1.599, h:0.190, fontSize:8, color:'AACCDD', fontFace:'Microsoft YaHei', margin:0 });
}
```

---

## 版式 02 — 目录页

```javascript
function addTOCSlide(pres, A, sections, pageNum) {
  const s = pres.addSlide();
  s.addImage({ data: A.BG_TOC, x: 0, y: 0, w: 13.333, h: 7.500 });
  addLogo(s, A, false);
  s.addText('目  录', { x:0.435, y:0.230, w:4.0, h:0.513, fontSize:24, color:'262626', bold:true, fontFace:'Microsoft YaHei', margin:0 });
  const ROW_Y = [
    { numY:1.805, titleY:1.847, subY:2.343, pageY:1.900 },
    { numY:3.073, titleY:3.061, subY:3.510, pageY:3.080 },
    { numY:4.254, titleY:4.240, subY:4.679, pageY:4.261 },
    { numY:5.421, titleY:5.400, subY:5.846, pageY:5.441 },
  ];
  sections.slice(0, 4).forEach((sec, i) => {
    const row = ROW_Y[i];
    // 调整数字区域宽度至 2.0" 以容纳 80 大小的字符（80pt 字符推荐宽度）
    s.addText(sec.num, { x:0.429, y:row.numY, w:2.000, h:0.908, fontSize:80, color:'1770EA', bold:true, fontFace:'Microsoft YaHei', margin:0, valign:'top' });
    // 标题区域相应调整（向右移动 0.6"，宽度减少 0.6"）
    s.addText(sec.title, { x:2.582, y:row.titleY, w:6.250, h:0.449, fontSize:20, color:'262626', bold:true, fontFace:'Microsoft YaHei', margin:0, valign:'middle' });
    if (sec.sub) s.addText(sec.sub, { x:2.582, y:row.subY, w:6.250, h:0.312, fontSize:13, color:'888888', fontFace:'Microsoft YaHei', margin:0 });
    s.addText(`P  ${String(sec.page).padStart(2,'0')}`, { x:11.008, y:row.pageY, w:1.327, h:0.443, fontSize:14, color:'1770EA', fontFace:'Microsoft YaHei', align:'right', margin:0 });
    if (i < sections.length - 1) s.addShape(pres.ShapeType.line, { x:2.582, y:row.subY+0.35, w:9.9, h:0, line:{ color:'DDDDDD', width:0.5 } });
  });
  addFooter(s, pageNum, false);
}
```

---

## 版式 03 — 章节分隔页

```javascript
function addSectionSlide(pres, A, { num, title, subtitle, bgData }, pageNum) {
  const s = pres.addSlide();
  s.addImage({ data: bgData, x:0, y:0, w:13.333, h:7.516 });
  addLogo(s, A, true);
  s.addText(num, { x:0.403, y:0.284, w:2.365, h:2.205, fontSize:125, color:'00CCFE', bold:true, fontFace:'Microsoft YaHei', margin:0, valign:'top' });
  s.addShape(pres.ShapeType.rect, { x:0.603, y:2.489, w:0.876, h:0.096, fill:{ color:'00CCFE' } });
  s.addText(title, { x:0.516, y:2.970, w:10.870, h:0.667, fontSize:24, color:'FFFFFF', bold:true, fontFace:'Microsoft YaHei', margin:0, valign:'middle' });
  if (subtitle) s.addText(subtitle, { x:0.516, y:3.626, w:5.167, h:1.320, fontSize:16, color:'FFFFFF', fontFace:'Microsoft YaHei', margin:0 });
  addFooter(s, pageNum, true);
}
```

---

## 版式 04 — 内容页：要点列表

```javascript
function addBulletSlide(pres, A, { title, subtitle, points }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);
  const items = points.map((p, i) => ({
    text: p.text,
    options: {
      bullet: true,
      breakLine: i < points.length - 1,
      fontSize: p.bold ? 20 : 18,
      color: p.highlight ? '1770EA' : (p.gold ? 'FFC000' : '333333'),
      bold: p.bold || false,
      fontFace: 'Microsoft YaHei',
      paraSpaceAfter: 16,
    }
  }));
  s.addText(items, { x:0.434, y:1.503, w:12.256, h:5.3, valign:'top', fontFace:'Microsoft YaHei' });
  addFooter(s, pageNum, false);
}
```

---

## 版式 05 — 内容页：数据卡片

```javascript
// cards: [{ num, unit, label, sub, color }]（最多4张）
function addDataCardSlide(pres, A, { title, subtitle, cards }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);
  const n = cards.length, cW = (12.256 - (n-1)*0.24) / n;
  const cY = 1.60, cH = 5.20, sX = 0.434;
  cards.forEach((c, i) => {
    const x = sX + i * (cW + 0.24);
    const col = c.color || COLOR_SEQ[i % COLOR_SEQ.length];
    s.addShape(pres.ShapeType.rect, { x, y:cY, w:cW, h:cH, fill:{ color:'F7F9FC' }, shadow:mkShS() });
    s.addShape(pres.ShapeType.rect, { x, y:cY, w:cW, h:0.55, fill:{ color:col } });
    s.addText(c.label || '', { x, y:cY, w:cW, h:0.55, fontSize:15, color:'FFFFFF', bold:true, fontFace:'Microsoft YaHei', align:'center', margin:0, valign:'middle' });
    s.addText((c.num || '') + (c.unit ? (' ' + c.unit) : ''), { x, y:cY+0.70, w:cW, h:1.50, fontSize:60, color:col, bold:true, fontFace:'Microsoft YaHei', align:'center', margin:0, valign:'middle' });
    if (c.sub) s.addText(c.sub, { x:x+0.12, y:cY+2.30, w:cW-0.24, h:2.8, fontSize:14, color:'555555', fontFace:'Microsoft YaHei', valign:'top', margin:0, wrap:true });
  });
  addFooter(s, pageNum, false);
}
```

---

## 版式 06 — 内容页：左右对比

```javascript
function addCompareSlide(pres, A, { title, subtitle, left, right }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);
  [[left, 0.434], [right, 6.70]].forEach(([col, x]) => {
    const c = col.color || '1770EA', w = 6.05;
    s.addShape(pres.ShapeType.rect, { x, y:1.55, w, h:5.1, fill:{ color:'F7F9FC' }, shadow:mkShS() });
    s.addShape(pres.ShapeType.rect, { x, y:1.55, w, h:0.62, fill:{ color:c } });
    s.addText(col.title, { x, y:1.55, w, h:0.62, fontSize:18, color:'FFFFFF', bold:true, fontFace:'Microsoft YaHei', align:'center', margin:0, valign:'middle' });
    const pts = (col.points||[]).map((p,j) => ({ text:p.text, options:{ bullet:true, breakLine:j<col.points.length-1, fontSize:16, color:p.bold?c:'333333', bold:p.bold||false, fontFace:'Microsoft YaHei', paraSpaceAfter:12 } }));
    if (pts.length) s.addText(pts, { x:x+0.18, y:2.28, w:w-0.36, h:4.22, valign:'top' });
  });
  addFooter(s, pageNum, false);
}
```

---

## 版式 07 — 内容页：横向流程步骤

```javascript
function addFlowSlide(pres, A, { title, subtitle, steps, note }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);
  const n = steps.length, sX = 0.434, aW = 12.256;
  const sW = (aW - (n-1)*0.28) / n, sY = 2.0, sH = 3.5;
  steps.forEach((step, i) => {
    const x = sX + i*(sW+0.28), c = COLOR_SEQ[i % COLOR_SEQ.length];
    s.addShape(pres.ShapeType.rect, { x, y:sY, w:sW, h:sH, fill:{ color:'F7F9FC' }, shadow:mkShS() });
    s.addShape(pres.ShapeType.rect, { x, y:sY, w:sW, h:0.52, fill:{ color:c } });
    s.addText(`Step ${i+1}`, { x, y:sY, w:sW, h:0.52, fontSize:14, color:'FFFFFF', bold:true, fontFace:'Microsoft YaHei', align:'center', margin:0, valign:'middle' });
    s.addText(step.text, { x:x+0.1, y:sY+0.62, w:sW-0.2, h:sH-0.72, fontSize:14, color:'333333', fontFace:'Microsoft YaHei', valign:'top', margin:4 });
    if (i < n-1) s.addShape(pres.ShapeType.rect, { x:x+sW+0.04, y:sY+sH/2-0.04, w:0.20, h:0.07, fill:{ color:'CCCCCC' } });
  });
  if (note) s.addText(`⚠ ${note}`, { x:0.434, y:5.8, w:12.256, h:0.35, fontSize:12, color:'FFC000', fontFace:'Microsoft YaHei', margin:0 });
  addFooter(s, pageNum, false);
}
```

---

## 版式 08 — 内容页：图文并排

```javascript
function addImageTextSlide(pres, A, { title, subtitle, imgData, imgSide, placeholder, points }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);
  const imgX = imgSide==='left' ? 0.434 : 6.98;
  const txtX = imgSide==='left' ? 7.10 : 0.434;
  const imgW=6.10, imgH=5.25, cY=1.55;
  if (imgData) {
    s.addImage({ data:imgData, x:imgX, y:cY, w:imgW, h:imgH, sizing:{ type:'contain', w:imgW, h:imgH } });
  } else {
    s.addShape(pres.ShapeType.rect, { x:imgX, y:cY, w:imgW, h:imgH, fill:{ color:'EBF3FF' }, line:{ color:'1770EA', width:1, dashType:'dash' } });
    if (placeholder) s.addText(placeholder, { x:imgX, y:cY+imgH/2-0.3, w:imgW, h:0.6, fontSize:14, color:'1770EA', align:'center', italic:true, fontFace:'Microsoft YaHei', margin:0 });
  }
  const items = (points||[]).map((p,i) => ({ text:p.text, options:{ bullet:true, breakLine:i<points.length-1, fontSize:p.bold?19:17, color:p.highlight?'1770EA':'333333', bold:p.bold||false, fontFace:'Microsoft YaHei', paraSpaceAfter:14 } }));
  if (items.length) s.addText(items, { x:txtX, y:cY+0.2, w:5.8, h:5.05, valign:'top' });
  addFooter(s, pageNum, false);
}
```

---

## 版式 09 — 内容页：时间轴

```javascript
function addTimelineSlide(pres, A, { title, subtitle, milestones }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);
  const n = milestones.length, lineY=3.8, sX=0.80, span=11.5;
  s.addShape(pres.ShapeType.line, { x:sX, y:lineY, w:span, h:0, line:{ color:'1770EA', width:2 } });
  milestones.forEach((m, i) => {
    const x = sX + (span/(n-1||1))*i;
    s.addShape(pres.ShapeType.oval, { x:x-0.13, y:lineY-0.13, w:0.26, h:0.26, fill:{ color:'1770EA' } });
    const isUp = i%2===0;
    s.addText(m.date, { x:x-0.9, y:isUp?lineY-1.2:lineY+0.2, w:1.8, h:0.3, fontSize:13, color:'1770EA', bold:true, fontFace:'Microsoft YaHei', align:'center', margin:0 });
    s.addText(m.event, { x:x-0.9, y:isUp?lineY-0.85:lineY+0.55, w:1.8, h:0.55, fontSize:13, color:'262626', bold:true, fontFace:'Microsoft YaHei', align:'center', margin:0 });
    if (m.detail) s.addText(m.detail, { x:x-0.9, y:isUp?lineY+0.2:lineY-0.85, w:1.8, h:0.5, fontSize:11, color:'666666', fontFace:'Microsoft YaHei', align:'center', margin:0 });
  });
  addFooter(s, pageNum, false);
}
```

---

## 版式 10 — 结尾页

```javascript
function addClosingSlide(pres, A, pageNum) {
  const s = pres.addSlide();
  s.addImage({ data:A.BG_CLOSING, x:0, y:0, w:13.333, h:7.509 });
  s.addImage({ data:A.CLOSING_THANKS, x:0.794, y:2.802, w:7.562, h:2.735 });
  s.addText('版权所有 © 金蝶国际软件集团有限公司   始创于 1993', { x:1.095, y:6.961, w:2.965, h:0.188, fontSize:8, color:'AACCDD', fontFace:'Microsoft YaHei', margin:0 });
  s.addText('④ 内部公开 请勿外传', { x:3.825, y:6.867, w:1.599, h:0.190, fontSize:8, color:'AACCDD', fontFace:'Microsoft YaHei', margin:0 });
  addFooter(s, pageNum, true);
}
```

---

## 版式选择速查（完整版）

| 场景描述 | 推荐版式 | Vibe |
|---------|---------|------|
| 核心论点 / 战略方向 | **27 双栏右视觉面板**（替代 04 纯文本） | 通用 |
| 核心论点（无需数据佐证） | 04 要点列表 | 通用 |
| 数据指标 / KPI / 成果 | 05 数据卡片 / **11 大数字看板** | 通用 / 极简 |
| 新旧对比 / 指标对比（视觉化） | **28 对比条形页** | 专业严谨 |
| 新旧对比 / 文字方案对比 | 06 左右对比 | 专业严谨 |
| 实施步骤 / 工作流（视觉增强） | **29 增强步骤流程** | 专业严谨 / 活力 |
| 实施步骤（简洁版） | 07 横向流程 | 专业严谨 |
| 产品截图 / 案例 | 08 图文并排 / **17 图文沉浸** | 通用 / 活力 |
| 项目路线图 / 里程碑 | 09 时间轴 | 通用 |
| 功能列举 / 优势亮点（行列式） | **26 图标行列表** | 活力生态 |
| **核心特性矩阵** | **12 Bento Grid** | 极简 / 活力 |
| **平台架构 / 生态体系** | **13 架构生态** | 专业严谨 |
| **功能列举 / 亮点介绍（卡片式）** | **14 核心特性卡片** | 活力生态 |
| **成熟度 / 对照分析** | **15 分层矩阵** | 专业严谨 |
| **战略金句 / CEO宣言** | **16 金句引言页** | 极简震撼 |
| **年度封底 / 战略口号** | **18 超大焦点页** | 极简震撼 |
| **核心主张 + 三大支柱** | **19 金字塔/MECE** | 专业严谨 |
| **复盘述职 / 持续改进** | **20 PDCA 循环** | 专业严谨 |
| **竞争/战略 四象限分析** | **21 SWOT 矩阵** | 专业严谨 |
| **品牌故事 / WHY演讲** | **22 黄金圈** | 极简震撼 |
| **方案说明 / 项目计划** | **23 5W1H 六格** | 专业严谨 |
| **提案 / 问题分析报告** | **24 SCQA 四步** | 专业严谨 |
| **战略发布 / 市场全景** | **25 IPD 五看** | 专业严谨 |

### ⚠️ 反平庸原则：禁止纯文本幻灯片

每张内容页必须满足以下之一：
- 有数字大字（≥60pt）作为视觉主心骨
- 有彩色图标圆或 Bento 卡片
- 有图片/图表
- 使用版式 27（双栏右视觉面板）替代纯文本版式 04

**不要重复同一版式超过两张**：在大纲阶段强制版式多样化。

### 统一间距标准

| 间距场景 | 数值 | 说明 |
|---------|------|------|
| 最小页边距 | `0.500"` | 所有内容 x ≥ 0.5" |
| 内容块之间 | `0.30"` 或 `0.50"` | 选一个，全页一致 |
| 卡片间隙 | `0.12"` | Bento/流程卡片 |
| 两栏间隔 | `0.50"` | 双栏版式标准间距 |
| 段落间距 | `paraSpaceAfter: 18` | 约 0.30" 等效 |
