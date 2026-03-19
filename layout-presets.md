# 金蝶 PPT 版式预设 Layout Presets v2.0
> 所有坐标基于 LAYOUT_WIDE（13.3333" × 7.5"），从官方模板 XML 精确提取（2026版）。
> v2.0 新增：版式 11-18（Bento Grid 系列、数据看板、架构生态、金句页等）

---

## 通用辅助函数（每个脚本必须包含）

```javascript
'use strict';
const pptxgen = require('pptxgenjs');
const fs = require('fs');

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
      fontSize: 24, fontFace: 'Segoe UI Emoji',
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
      fontFace: 'Helvetica Neue', valign: 'middle', margin: 0,
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
    s.addText(sec.num, { x:0.429, y:row.numY, w:1.151, h:0.908, fontSize:80, color:'1770EA', bold:true, fontFace:'Helvetica Neue', margin:0, valign:'top' });
    s.addText(sec.title, { x:1.791, y:row.titleY, w:7.221, h:0.449, fontSize:20, color:'262626', bold:true, fontFace:'Microsoft YaHei', margin:0, valign:'middle' });
    if (sec.sub) s.addText(sec.sub, { x:1.791, y:row.subY, w:7.221, h:0.312, fontSize:13, color:'888888', fontFace:'Microsoft YaHei', margin:0 });
    s.addText(`P  ${String(sec.page).padStart(2,'0')}`, { x:11.008, y:row.pageY, w:1.327, h:0.443, fontSize:14, color:'1770EA', fontFace:'Helvetica Neue', align:'right', margin:0 });
    if (i < sections.length - 1) s.addShape(pres.ShapeType.line, { x:1.791, y:row.subY+0.35, w:10.5, h:0, line:{ color:'DDDDDD', width:0.5 } });
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
  s.addText(num, { x:0.403, y:0.284, w:2.365, h:2.205, fontSize:125, color:'46CCFE', bold:true, fontFace:'微软雅黑', margin:0, valign:'top' });
  s.addShape(pres.ShapeType.rect, { x:0.603, y:2.489, w:0.876, h:0.096, fill:{ color:'E8210A' } });
  s.addText(title, { x:0.516, y:2.970, w:10.870, h:0.667, fontSize:24, color:'FFFFFF', bold:true, fontFace:'Microsoft YaHei', margin:0, valign:'middle' });
  if (subtitle) s.addText(subtitle, { x:0.516, y:3.626, w:5.167, h:1.320, fontSize:18, color:'FFFFFF', fontFace:'Microsoft YaHei', margin:0 });
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
    s.addText((c.num || '') + (c.unit ? (' ' + c.unit) : ''), { x, y:cY+0.70, w:cW, h:1.50, fontSize:60, color:col, bold:true, fontFace:'Helvetica Neue', align:'center', margin:0, valign:'middle' });
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
    s.addText(`Step ${i+1}`, { x, y:sY, w:sW, h:0.52, fontSize:14, color:'FFFFFF', bold:true, fontFace:'Helvetica Neue', align:'center', margin:0, valign:'middle' });
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
    s.addText(m.date, { x:x-0.9, y:isUp?lineY-1.2:lineY+0.2, w:1.8, h:0.3, fontSize:13, color:'1770EA', bold:true, fontFace:'Helvetica Neue', align:'center', margin:0 });
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

## ═══ 新增版式（v2.0）═══════════════════════════════════════

---

## 版式 11 — 数据看板页（3 个并列大数字卡片）

**Vibe**：极简震撼 ｜**场景**：KPI汇报、年度总结、数据披露

```javascript
/**
 * 三列大数字看板
 * metrics: [
 *   { num:'8.4B', unit:'元', label:'生态GMV', sub:'同比 +83.7%', trend:[0.3,0.5,0.6,0.8,1.0] },
 *   { num:'3万+', unit:'', label:'开发者总数', sub:'活跃度 +120%', trend:[...] },
 *   { num:'65%', unit:'', label:'AI解答率', sub:'较基线提升 30ppt', trend:[...] }
 * ]
 * trend: 归一化数据数组 [0-1]，用于绘制迷你折线图（可选）
 */
function addMetricDashboard(pres, A, { title, subtitle, metrics }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);

  const n       = Math.min(metrics.length, 3);
  const cW      = (12.256 - (n - 1) * 0.28) / n;
  const cH      = 5.20;
  const cY      = 1.55;
  const sX      = 0.434;
  const colors  = ['1770EA', '005392', '00CBFF'];

  metrics.slice(0, n).forEach((m, i) => {
    const x    = sX + i * (cW + 0.28);
    const col  = m.color || colors[i];
    const isMain = i === 0; // 第一张卡为主卡（深蓝底）

    // 卡片底色
    s.addShape(pres.ShapeType.rect, {
      x, y: cY, w: cW, h: cH,
      fill: { color: isMain ? '1770EA' : 'F5F7FA' },
      shadow: mkShS(),
    });

    // 顶部渐变强调条（同色透明度）
    s.addShape(pres.ShapeType.rect, {
      x, y: cY, w: cW, h: 0.06,
      fill: { color: col },
    });

    // 标签
    s.addText(m.label || '', {
      x: x + 0.20, y: cY + 0.22, w: cW - 0.40, h: 0.38,
      fontSize: 14, bold: false,
      color: isMain ? 'D0E8FF' : '888888',
      fontFace: 'Microsoft YaHei', margin: 0,
    });

    // 超大数字
    const numStr = (m.num || '') + (m.unit ? m.unit : '');
    s.addText(numStr, {
      x: x + 0.10, y: cY + 0.68, w: cW - 0.20, h: 1.60,
      fontSize: 72, bold: true,
      color: isMain ? 'FFFFFF' : col,
      fontFace: 'Helvetica Neue',
      valign: 'middle', margin: 0, fit: 'shrink',
    });

    // 副说明（同比/环比）
    if (m.sub) {
      s.addText(m.sub, {
        x: x + 0.20, y: cY + 2.40, w: cW - 0.40, h: 0.40,
        fontSize: 14, bold: true,
        color: isMain ? '46CCFE' : '1770EA',
        fontFace: 'Microsoft YaHei', margin: 0,
      });
    }

    // 迷你折线图（可选）
    if (m.trend && m.trend.length >= 2) {
      const chartX = x + 0.20, chartY = cY + 3.00;
      const chartW = cW - 0.40, chartH = 1.80;
      const lineColor = isMain ? '46CCFE' : col;
      const data = m.trend;
      const stepX = chartW / (data.length - 1);

      // 折线
      for (let j = 0; j < data.length - 1; j++) {
        const x1 = chartX + stepX * j;
        const y1 = chartY + chartH - data[j] * chartH;
        const x2 = chartX + stepX * (j + 1);
        const y2 = chartY + chartH - data[j + 1] * chartH;
        s.addShape(pres.ShapeType.line, {
          x: x1, y: y1, w: x2 - x1, h: y2 - y1,
          line: { color: lineColor, width: 1.5 }
        });
      }
      // 数据点
      data.forEach((val, j) => {
        s.addShape(pres.ShapeType.oval, {
          x: chartX + stepX * j - 0.055,
          y: chartY + chartH - val * chartH - 0.055,
          w: 0.11, h: 0.11,
          fill: { color: lineColor },
          line: { color: isMain ? '1770EA' : 'FFFFFF', width: 1 },
        });
      });
    }
  });

  addFooter(s, pageNum, false);
}
```

---

## 版式 12 — Bento Grid（核心特性页）

**Vibe**：极简震撼 / 活力生态 ｜**场景**：产品特性、功能矩阵、能力介绍

```javascript
/**
 * 2×3 非均等 Bento Grid
 * 布局：
 *   左侧大卡（w≈5.8"，h≈5.2"）+ 右侧 2×2 四张次卡
 *
 * cards: [
 *   { title, body, icon, bigNumber, isPrimary: true },   // 主卡（第一张）
 *   { title, body, icon },   // 次卡 B
 *   { title, body, icon },   // 次卡 C
 *   { title, body, icon },   // 次卡 D
 *   { title, body, icon },   // 次卡 E（可选）
 * ]
 */
function addBentoGrid(pres, A, { title, subtitle, cards }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);

  const GAP  = 0.12;
  const sX   = 0.434;
  const sY   = 1.55;
  const totalW = 12.256;
  const totalH = 5.20;

  const primaryW = totalW * 0.46;       // 主卡宽 ~5.64"
  const secondW  = totalW - primaryW - GAP; // 次卡区总宽
  const secColW  = (secondW - GAP) / 2; // 每列次卡宽

  const secRows = 2;
  const secRowH = (totalH - GAP * (secRows - 1)) / secRows;

  // ① 主卡（左，深蓝）
  const primary = cards[0] || {};
  bentoCard(pres, s, {
    x: sX, y: sY, w: primaryW, h: totalH,
    fillColor: '1770EA',
    title: primary.title || '',
    body:  primary.body  || '',
    bigNumber: primary.bigNumber || '',
    icon:  primary.icon  || '',
  });

  // ② 次卡（右侧 2×2，最多4张）
  const secondaries = cards.slice(1, 5);
  secondaries.forEach((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx  = sX + primaryW + GAP + col * (secColW + GAP);
    const cy  = sY + row * (secRowH + GAP);
    const fillOptions = ['F5F7FA', 'EBF3FF', 'F5F7FA', 'EBF3FF'];
    bentoCard(pres, s, {
      x: cx, y: cy, w: secColW, h: secRowH,
      fillColor: c.fillColor || fillOptions[i],
      title: c.title || '',
      body:  c.body  || '',
      icon:  c.icon  || '',
    });
  });

  addFooter(s, pageNum, false);
}
```

---

## 版式 13 — 架构生态页

**Vibe**：专业严谨 ｜**场景**：平台架构、技术分层、生态体系

```javascript
/**
 * 三层横向架构图
 * layers: [
 *   { label:'SaaS 层', color:'1770EA', items:['应用A','应用B','应用C','应用D'] },
 *   { label:'PaaS 层', color:'005392', items:['Cangqiong苍穹','Skill市场','Agent平台'] },
 *   { label:'IaaS 层', color:'00C7C7', items:['华为云','阿里云','腾讯云'] },
 * ]
 * bottomNote: 底部说明文字（可选）
 */
function addArchSlide(pres, A, { title, subtitle, layers, bottomNote }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);

  const sX     = 0.434;
  const sY     = 1.55;
  const totalW = 12.256;
  const n      = layers.length;
  const layerH = (bottomNote ? 4.60 : 5.00) / n;
  const GAP    = 0.14;
  const labelW = 1.20;

  layers.forEach((layer, i) => {
    const ly   = sY + i * (layerH + GAP);
    const col  = layer.color || COLOR_SEQ[i];

    // 层标签色块（左侧）
    s.addShape(pres.ShapeType.rect, {
      x: sX, y: ly, w: labelW, h: layerH,
      fill: { color: col },
    });
    s.addText(layer.label || '', {
      x: sX, y: ly, w: labelW, h: layerH,
      fontSize: 13, bold: true, color: 'FFFFFF',
      fontFace: 'Microsoft YaHei',
      align: 'center', valign: 'middle', margin: 0,
    });

    // 层内容区
    const itemsArea = layer.items || [];
    const itemCount = itemsArea.length;
    if (itemCount === 0) return;

    const contentX = sX + labelW + 0.12;
    const contentW = totalW - labelW - 0.12;
    const itemW    = (contentW - (itemCount - 1) * 0.10) / itemCount;

    itemsArea.forEach((item, j) => {
      const ix = contentX + j * (itemW + 0.10);
      s.addShape(pres.ShapeType.rect, {
        x: ix, y: ly, w: itemW, h: layerH,
        fill: { color: i === 0 ? 'EBF3FF' : 'F5F7FA' },
        line: { color: col, width: 0.5 },
        shadow: mkShS(),
      });
      s.addText(item, {
        x: ix, y: ly, w: itemW, h: layerH,
        fontSize: 13, color: i === 0 ? col : '333333',
        bold: i === 0,
        fontFace: 'Microsoft YaHei',
        align: 'center', valign: 'middle', margin: 2,
      });
    });
  });

  if (bottomNote) {
    s.addText(bottomNote, {
      x: sX, y: sY + n * (layerH + GAP) - GAP + 0.18,
      w: totalW, h: 0.35,
      fontSize: 12, color: '888888',
      fontFace: 'Microsoft YaHei', margin: 0,
    });
  }

  addFooter(s, pageNum, false);
}
```

---

## 版式 14 — 核心特性卡片页（图标 + 标题 + 说明）

**Vibe**：活力生态 ｜**场景**：功能列举、服务亮点、合作优势

```javascript
/**
 * 3 或 4 列等宽特性卡片，顶部圆形图标区
 * features: [
 *   { icon:'📊', title:'数据洞察', body:'实时分析 + 趋势预测', color:'1770EA' },
 *   { icon:'⚡', title:'极速响应', body:'毫秒级处理，零感知等待', color:'00CBFF' },
 *   { icon:'🔒', title:'安全合规', body:'等保三级，数据主权可控', color:'00C7C7' },
 *   { icon:'🌐', title:'生态开放', body:'200+ ISV 认证合作', color:'AF6EFF' },
 * ]
 */
function addFeatureCardSlide(pres, A, { title, subtitle, features }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);

  const n      = Math.min(features.length, 4);
  const sX     = 0.434, sY = 1.60;
  const cW     = (12.256 - (n - 1) * 0.22) / n;
  const cH     = 5.10;
  const icoR   = 0.40; // 图标圆半径

  features.slice(0, n).forEach((f, i) => {
    const x   = sX + i * (cW + 0.22);
    const col = f.color || COLOR_SEQ[i];

    // 卡片
    s.addShape(pres.ShapeType.rect, {
      x, y: sY, w: cW, h: cH,
      fill: { color: 'F5F7FA' }, shadow: mkShS(),
    });

    // 顶部彩色图标圆（圆心在卡片顶部）
    const icoCX = x + cW / 2;
    const icoCY = sY + 0.55;
    s.addShape(pres.ShapeType.oval, {
      x: icoCX - icoR, y: icoCY - icoR,
      w: icoR * 2, h: icoR * 2,
      fill: { color: col }, shadow: mkShB(),
    });

    // 图标字符
    if (f.icon) {
      s.addText(f.icon, {
        x: icoCX - icoR, y: icoCY - icoR,
        w: icoR * 2, h: icoR * 2,
        fontSize: 22, fontFace: 'Segoe UI Emoji',
        color: 'FFFFFF', align: 'center', valign: 'middle', margin: 0,
      });
    }

    // 标题
    s.addText(f.title || '', {
      x: x + 0.14, y: sY + 1.18, w: cW - 0.28, h: 0.52,
      fontSize: 16, bold: true, color: '262626',
      fontFace: 'Microsoft YaHei', align: 'center', valign: 'middle', margin: 0,
    });

    // 彩色细线分隔
    s.addShape(pres.ShapeType.line, {
      x: x + cW / 2 - 0.40, y: sY + 1.78,
      w: 0.80, h: 0,
      line: { color: col, width: 2 },
    });

    // 正文
    if (f.body) {
      s.addText(f.body, {
        x: x + 0.14, y: sY + 1.92, w: cW - 0.28, h: 3.0,
        fontSize: 13, color: '555555',
        fontFace: 'Microsoft YaHei', align: 'center', valign: 'top', margin: 0, wrap: true,
      });
    }
  });

  addFooter(s, pageNum, false);
}
```

---

## 版式 15 — 分层矩阵

**Vibe**：专业严谨 ｜**场景**：成熟度模型、评估框架、对照分析

```javascript
/**
 * 左列：维度标签（深色）；右侧多列：内容格
 * matrix: {
 *   headers: ['传统模式', 'AI原生模式'],   // 列头（2-4列）
 *   rows: [
 *     { label:'架构模式', values:['烟囱式独立应用', 'Skill化原子能力'] },
 *     { label:'开发模式', values:['人工编码为主', 'SDD规范驱动生成'] },
 *     { label:'商业模式', values:['按项目收费', 'SaaS订阅+生态分润'] },
 *     { label:'核心竞争力', values:['实施资源堆砌', '数字资产沉淀'] },
 *   ]
 * }
 */
function addMatrixSlide(pres, A, { title, subtitle, matrix }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);

  const rows    = matrix.rows || [];
  const headers = matrix.headers || [];
  const nCols   = headers.length;
  const nRows   = rows.length;
  if (nRows === 0 || nCols === 0) { addFooter(s, pageNum, false); return; }

  const sX       = 0.434, sY = 1.55;
  const labelW   = 1.80;
  const totalW   = 12.256;
  const colW     = (totalW - labelW - 0.12 * nCols) / nCols;
  const rowH     = Math.min(5.10 / (nRows + 1), 1.20);
  const headerH  = 0.52;

  // 表头
  headers.forEach((h, j) => {
    const cx = sX + labelW + 0.12 + j * (colW + 0.12);
    s.addShape(pres.ShapeType.rect, { x:cx, y:sY, w:colW, h:headerH, fill:{ color: j===0 ? '1770EA' : '005392' } });
    s.addText(h, { x:cx, y:sY, w:colW, h:headerH, fontSize:14, bold:true, color:'FFFFFF', fontFace:'Microsoft YaHei', align:'center', valign:'middle', margin:0 });
  });

  // 行
  rows.forEach((row, i) => {
    const ry = sY + headerH + i * (rowH + 0.06);
    const isEven = i % 2 === 0;

    // 标签列
    s.addShape(pres.ShapeType.rect, { x:sX, y:ry, w:labelW, h:rowH, fill:{ color: isEven ? '1770EA' : '005392' } });
    s.addText(row.label || '', { x:sX, y:ry, w:labelW, h:rowH, fontSize:13, bold:true, color:'FFFFFF', fontFace:'Microsoft YaHei', align:'center', valign:'middle', margin:4 });

    // 内容格
    (row.values || []).slice(0, nCols).forEach((val, j) => {
      const cx = sX + labelW + 0.12 + j * (colW + 0.12);
      s.addShape(pres.ShapeType.rect, { x:cx, y:ry, w:colW, h:rowH, fill:{ color: isEven ? 'F5F7FA' : 'EBF3FF' }, line:{ color:'DDDDDD', width:0.5 } });
      s.addText(val, { x:cx+0.12, y:ry, w:colW-0.24, h:rowH, fontSize:13, color: j===1 ? '1770EA' : '333333', bold: j===1, fontFace:'Microsoft YaHei', valign:'middle', margin:0, wrap:true });
    });
  });

  addFooter(s, pageNum, false);
}
```

---

## 版式 16 — 金句 / 引言页（极简）

**Vibe**：极简震撼 ｜**场景**：战略金句、章节引语、CEO宣言

```javascript
/**
 * 极简金句页，留白 ≥ 50%
 * quote:  核心金句（≤30字，拆为2-3行自然断句）
 * source: 出处/署名（可选，如「— 金蝶2026战略发布」）
 * size:   字号档位 'large'（36pt）/ 'medium'（30pt）/ 'small'（24pt），默认 'large'
 */
function addQuoteSlide(pres, A, { title, quote, source, size }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);

  // 顶部细标题（可选）
  if (title) {
    s.addText(title, {
      x: 0.435, y: 0.230, w: 10.601, h: 0.513,
      fontSize: 18, color: 'AAAAAA', bold: false,
      fontFace: 'Microsoft YaHei', margin: 0, valign: 'middle',
    });
  }

  // 左上角装饰线
  s.addShape(pres.ShapeType.line, {
    x: 0.80, y: 1.80, w: 0, h: 2.20,
    line: { color: '1770EA', width: 3 },
  });

  // 金句文字
  const fsMap = { large: 36, medium: 30, small: 24 };
  const fs = fsMap[size || 'large'] || 36;
  s.addText(quote || '', {
    x: 1.30, y: 1.80, w: 10.50, h: 3.20,
    fontSize: fs, color: '262626', bold: false,
    fontFace: 'Microsoft YaHei',
    valign: 'middle', margin: 0, wrap: true,
    lineSpacingMultiple: 1.4,
  });

  // 出处
  if (source) {
    s.addText(`— ${source}`, {
      x: 1.30, y: 5.30, w: 10.50, h: 0.40,
      fontSize: 14, color: '888888', bold: false,
      fontFace: 'Microsoft YaHei', margin: 0,
    });
  }

  addFooter(s, pageNum, false);
}
```

---

## 版式 17 — 图文沉浸页（全出血图片）

**Vibe**：活力生态 ｜**场景**：案例展示、产品截图、活动现场

```javascript
/**
 * 左侧 55% 全幅图片，右侧 45% 白底文字区
 * imgData: base64 图片
 * points:  [{ text, bold, highlight }]
 */
function addImmersiveSlide(pres, A, { title, imgData, placeholder, points }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);

  const imgW = 7.10, imgH = 7.50;
  const txtX = 7.50, txtW = 5.40;

  // 左侧全幅图（从页面顶部到底部）
  if (imgData) {
    s.addImage({
      data: imgData, x: 0, y: 0, w: imgW, h: imgH,
      sizing: { type: 'cover', w: imgW, h: imgH },
    });
  } else {
    s.addShape(pres.ShapeType.rect, { x:0, y:0, w:imgW, h:imgH, fill:{ color:'EBF3FF' }, line:{ color:'1770EA', width:1, dashType:'dash' } });
    if (placeholder) s.addText(placeholder, { x:0, y:imgH/2-0.3, w:imgW, h:0.6, fontSize:14, color:'1770EA', align:'center', italic:true, fontFace:'Microsoft YaHei', margin:0 });
  }

  // 右侧文字区
  // 标题
  s.addText(title || '', {
    x: txtX, y: 0.80, w: txtW, h: 0.80,
    fontSize: 22, bold: true, color: '262626',
    fontFace: 'Microsoft YaHei', valign: 'middle', margin: 0,
  });

  // 蓝色细线
  s.addShape(pres.ShapeType.line, {
    x: txtX, y: 1.72, w: 2.40, h: 0,
    line: { color: '1770EA', width: 2 },
  });

  // 要点
  const items = (points || []).map((p, i) => ({
    text: p.text,
    options: {
      bullet: true,
      breakLine: i < points.length - 1,
      fontSize: p.bold ? 18 : 16,
      color: p.highlight ? '1770EA' : '333333',
      bold: p.bold || false,
      fontFace: 'Microsoft YaHei',
      paraSpaceAfter: 16,
    }
  }));
  if (items.length) {
    s.addText(items, {
      x: txtX, y: 1.90, w: txtW, h: 5.00,
      valign: 'top', fontFace: 'Microsoft YaHei',
    });
  }

  addFooter(s, pageNum, false);
}
```

---

## 版式 18 — Bento 超大焦点页（极简震撼核心版式）

**Vibe**：极简震撼 ｜**场景**：年度总结、战略口号、核心数字

```javascript
/**
 * 左侧 55%：超大数字或核心词（160pt）
 * 右侧 45%：3-4 条简短说明
 * 透明度渐变色块营造科技感（同色系，不跨色渐变）
 *
 * hero:    { number, label }  超大主视觉（如 { number: '8.4B', label: '生态总GMV' }）
 * points:  [{ text, bold }]   右侧要点（最多 4 条，每条 ≤ 15 字）
 * accentColor: 主题色，默认 '1770EA'
 */
function addHeroSlide(pres, A, { title, hero, points, accentColor }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);

  const col  = accentColor || '1770EA';
  const splitX = 7.20;

  // 左侧渐变色块（同色透明度渐变：深 → 浅）
  // 用三个矩形叠加模拟渐变
  const gradSteps = [
    { opacity: 0.90, w: splitX * 0.40 },
    { opacity: 0.55, w: splitX * 0.35 },
    { opacity: 0.18, w: splitX * 0.25 },
  ];
  let gx = 0;
  gradSteps.forEach(g => {
    s.addShape(pres.ShapeType.rect, {
      x: gx, y: 0, w: g.w, h: 7.50,
      fill: { color: col, transparency: Math.round((1 - g.opacity) * 100) },
    });
    gx += g.w;
  });

  // 超大数字/文字（左侧居中）
  if (hero && hero.number) {
    s.addText(hero.number, {
      x: 0.40, y: 1.80, w: splitX - 0.60, h: 2.40,
      fontSize: 120, bold: true, color: 'FFFFFF',
      fontFace: 'Helvetica Neue',
      valign: 'middle', align: 'left', margin: 0, fit: 'shrink',
    });
  }

  // 超大文字下方标签
  if (hero && hero.label) {
    s.addText(hero.label, {
      x: 0.40, y: 4.50, w: splitX - 0.60, h: 0.60,
      fontSize: 20, bold: false, color: 'D0E8FF',
      fontFace: 'Microsoft YaHei', valign: 'middle', margin: 0,
    });
  }

  // 右侧内容区标题
  if (title) {
    s.addText(title, {
      x: splitX + 0.30, y: 0.30, w: 13.333 - splitX - 0.60, h: 0.80,
      fontSize: 20, bold: true, color: col,
      fontFace: 'Microsoft YaHei', valign: 'middle', margin: 0,
    });
    // 标题下细线
    s.addShape(pres.ShapeType.line, {
      x: splitX + 0.30, y: 1.18, w: 2.20, h: 0,
      line: { color: col, width: 2 },
    });
  }

  // 右侧要点
  const items = (points || []).map((p, i) => ({
    text: p.text,
    options: {
      bullet: false,
      breakLine: i < points.length - 1,
      fontSize: p.bold ? 18 : 16,
      color: p.bold ? col : '333333',
      bold: p.bold || false,
      fontFace: 'Microsoft YaHei',
      paraSpaceAfter: 22,
    }
  }));
  if (items.length) {
    s.addText(items, {
      x: splitX + 0.30, y: 1.40,
      w: 13.333 - splitX - 0.60, h: 5.60,
      valign: 'top', fontFace: 'Microsoft YaHei',
    });
  }

  addFooter(s, pageNum, false);
}
```

---

## 版式选择速查（完整版）

| 场景描述 | 推荐版式 | Vibe |
|---------|---------|------|
| 核心论点 / 战略方向 | 04 要点列表 | 通用 |
| 数据指标 / KPI / 成果 | 05 数据卡片 / **11 大数字看板** | 通用 / 极简 |
| 新旧对比 / 方案对比 | 06 左右对比 | 专业严谨 |
| 实施步骤 / 工作流 | 07 横向流程 | 专业严谨 |
| 产品截图 / 案例 | 08 图文并排 / **17 图文沉浸** | 通用 / 活力 |
| 项目路线图 / 里程碑 | 09 时间轴 | 通用 |
| **核心特性矩阵** | **12 Bento Grid** | 极简 / 活力 |
| **平台架构 / 生态体系** | **13 架构生态** | 专业严谨 |
| **功能列举 / 亮点介绍** | **14 核心特性卡片** | 活力生态 |
| **成熟度 / 对照分析** | **15 分层矩阵** | 专业严谨 |
| **战略金句 / CEO宣言** | **16 金句引言页** | 极简震撼 |
| **年度封底 / 战略口号** | **18 超大焦点页** | 极简震撼 |
---

## ═══ 思维模型版式（v3.0）══════════════════════════════════════

> 以下 7 种版式用于 SKILL.md Phase 0 识别到的思维模型内容页。
> 每种版式含：结构说明、ASCII 布局图、品牌色约束、完整 PptxGenJS 代码。

---

## 版式 19 — 金字塔 / MECE 版式

**结构**：顶部结论 → 中层分论点 → 底层论据（三级分层）

```
┌────────────────────────────────────────────┐  ← 主蓝 #1770EA，白字，结论一句话
│                  核心结论                    │
└────────────────────────────────────────────┘
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ← 黄色 #FFB800，白字
│   分论点 1   │  │   分论点 2   │  │   分论点 3   │
└──────────────┘  └──────────────┘  └──────────────┘
  · 论据 1           · 论据 1           · 论据 1      ← 浅灰蓝底 #EEF2FF，深色小字
  · 论据 2           · 论据 2           · 论据 2
```

**品牌色**：结论=`#1770EA` / 分论点=`#FFB800` / 论据区=`#EEF2FF`（深色字）

```javascript
function addPyramidSlide(ppt, A, pageNum, title, conclusion, points) {
  // points: [{label, bullets:[]}, ...]  (3 items)
  const slide = ppt.addSlide();
  slide.addImage({ data: A.BG_TOC, x:0,y:0,w:13.3333,h:7.5 });
  addLogo(slide, A, false);
  addFooter(slide, pageNum, false);
  // 页面标题
  slide.addText(title, { x:0.5,y:0.3,w:12.0,h:0.45, fontSize:22, bold:true,
    color:'1770EA', fontFace:'Microsoft YaHei' });
  // 结论条（全宽）
  slide.addShape(ppt.ShapeType.rect, { x:0.5,y:0.95,w:12.3333,h:0.85,
    fill:{color:'1770EA'}, line:{color:'1770EA'} });
  slide.addText(conclusion, { x:0.5,y:0.95,w:12.3333,h:0.85,
    fontSize:18, bold:true, color:'FFFFFF', align:'center',
    fontFace:'Microsoft YaHei', valign:'middle' });
  // 三列分论点 + 论据
  const colW = 3.95, colX = [0.5, 4.7, 8.9], colY = 2.0;
  points.forEach((pt, i) => {
    // 分论点标题块
    slide.addShape(ppt.ShapeType.rect, { x:colX[i],y:colY,w:colW,h:0.65,
      fill:{color:'FFB800'}, line:{color:'FFB800'} });
    slide.addText(pt.label, { x:colX[i],y:colY,w:colW,h:0.65,
      fontSize:15, bold:true, color:'FFFFFF', align:'center',
      fontFace:'Microsoft YaHei', valign:'middle' });
    // 论据区
    slide.addShape(ppt.ShapeType.rect, { x:colX[i],y:colY+0.68,w:colW,h:3.6,
      fill:{color:'EEF2FF'}, line:{color:'C8D4F8'} });
    const bulletText = pt.bullets.map(b => ({ text:'· '+b,
      options:{ fontSize:12, color:'333333', fontFace:'Microsoft YaHei',
        paraSpaceAfter:6, bullet:false } }));
    slide.addText(bulletText, { x:colX[i]+0.15,y:colY+0.75,w:colW-0.3,h:3.4,
      valign:'top' });
  });
}
```

---

## 版式 20 — PDCA 循环版式

**结构**：4格顺时针排布，中央循环符号

```
  ┌─────────────┐     ┌─────────────┐
  │  P  计划    │ →   │  D  执行    │
  └─────────────┘     └─────────────┘
        ↑        ↻          ↓
  ┌─────────────┐     ┌─────────────┐
  │  A  改进    │ ←   │  C  检查    │
  └─────────────┘     └─────────────┘
```

**品牌色**：P=`#1770EA` / D=`#00CBFF` / C=`#FFB800` / A=`#8B6FE8`

```javascript
function addPDCASlide(ppt, A, pageNum, title, pdca) {
  // pdca: { P:{label,bullets}, D:{...}, C:{...}, A:{...} }
  const slide = ppt.addSlide();
  slide.addImage({ data: A.BG_TOC, x:0,y:0,w:13.3333,h:7.5 });
  addLogo(slide, A, false); addFooter(slide, pageNum, false);
  slide.addText(title, { x:0.5,y:0.25,w:12,h:0.45, fontSize:22, bold:true,
    color:'1770EA', fontFace:'Microsoft YaHei' });
  const cells = [
    { key:'P', color:'1770EA', x:1.2,  y:1.1 },
    { key:'D', color:'00CBFF', x:7.2,  y:1.1 },
    { key:'C', color:'FFB800', x:7.2,  y:4.0 },
    { key:'A', color:'8B6FE8', x:1.2,  y:4.0 },
  ];
  const cW=4.8, cH=2.6;
  cells.forEach(cell => {
    const d = pdca[cell.key];
    slide.addShape(ppt.ShapeType.roundRect, { x:cell.x,y:cell.y,w:cW,h:cH,
      fill:{color:cell.color}, line:{color:cell.color}, rectRadius:0.08 });
    slide.addText(cell.key + '  ' + d.label, { x:cell.x+0.2,y:cell.y+0.15,
      w:cW-0.4,h:0.5, fontSize:16, bold:true, color:'FFFFFF',
      fontFace:'Microsoft YaHei' });
    const bullets = d.bullets.map(b=>({ text:'• '+b,
      options:{ fontSize:12, color:'FFFFFF', fontFace:'Microsoft YaHei',
        paraSpaceAfter:4, bullet:false }}));
    slide.addText(bullets, { x:cell.x+0.2,y:cell.y+0.7,w:cW-0.4,h:cH-0.9,
      valign:'top' });
  });
  // 中央循环符号
  slide.addText('↻', { x:5.8,y:2.3,w:1.5,h:1.5, fontSize:48,
    color:'AAAAAA', align:'center', valign:'middle', fontFace:'Arial' });
}
```

---

## 版式 21 — SWOT 矩阵版式

**结构**：2×2 矩阵，横纵轴标注维度

```
           内部因素              外部因素
优势/机会  [ S 优势  #1770EA ]  [ O 机会  #00C4A7 ]
劣势/威胁  [ W 劣势  #EEF2FF ]  [ T 威胁  #8B6FE8 ]
```

**品牌色**：S=`#1770EA` / O=`#00C4A7` / W=`#EEF2FF`（深字）/ T=`#8B6FE8`

```javascript
function addSWOTSlide(ppt, A, pageNum, title, swot) {
  // swot: { S:{label,bullets}, W:{...}, O:{...}, T:{...} }
  const slide = ppt.addSlide();
  slide.addImage({ data: A.BG_TOC, x:0,y:0,w:13.3333,h:7.5 });
  addLogo(slide, A, false); addFooter(slide, pageNum, false);
  slide.addText(title, { x:0.5,y:0.25,w:12,h:0.45, fontSize:22, bold:true,
    color:'1770EA', fontFace:'Microsoft YaHei' });
  // 轴标签
  slide.addText('内部因素', { x:1.5,y:0.9,w:5,h:0.3, fontSize:11,
    color:'AAAAAA', align:'center', fontFace:'Microsoft YaHei' });
  slide.addText('外部因素', { x:7.0,y:0.9,w:5,h:0.3, fontSize:11,
    color:'AAAAAA', align:'center', fontFace:'Microsoft YaHei' });
  slide.addText('优势\n机会', { x:0.2,y:1.3,w:1.0,h:2.7, fontSize:11,
    color:'AAAAAA', align:'center', valign:'middle', fontFace:'Microsoft YaHei' });
  slide.addText('劣势\n威胁', { x:0.2,y:4.2,w:1.0,h:2.7, fontSize:11,
    color:'AAAAAA', align:'center', valign:'middle', fontFace:'Microsoft YaHei' });
  const cells = [
    { key:'S', color:'1770EA', txtColor:'FFFFFF', x:1.4, y:1.2 },
    { key:'O', color:'00C4A7', txtColor:'FFFFFF', x:7.1, y:1.2 },
    { key:'W', color:'EEF2FF', txtColor:'333333', x:1.4, y:4.1 },
    { key:'T', color:'8B6FE8', txtColor:'FFFFFF', x:7.1, y:4.1 },
  ];
  const cW=5.4, cH=2.7;
  cells.forEach(cell => {
    const d = swot[cell.key];
    slide.addShape(ppt.ShapeType.rect, { x:cell.x,y:cell.y,w:cW,h:cH,
      fill:{color:cell.color}, line:{color:cell.color==='EEF2FF'?'C8D4F8':cell.color} });
    slide.addText(cell.key+'  '+d.label, { x:cell.x+0.2,y:cell.y+0.1,
      w:cW-0.4,h:0.45, fontSize:15, bold:true, color:cell.txtColor,
      fontFace:'Microsoft YaHei' });
    const bul = d.bullets.map(b=>({ text:'• '+b,
      options:{ fontSize:12, color:cell.txtColor, fontFace:'Microsoft YaHei',
        paraSpaceAfter:4, bullet:false }}));
    slide.addText(bul, { x:cell.x+0.2,y:cell.y+0.6,w:cW-0.4,h:cH-0.7,
      valign:'top' });
  });
}
```

---

## 版式 22 — 黄金圈版式

**结构**：左侧三层嵌套椭圆（WHY内→HOW中→WHAT外）+ 右侧说明列

**品牌色**：WHY内核=`#1770EA` / HOW中层=`#00CBFF` / WHAT外层=`#EEF2FF`

```javascript
function addGoldenCircleSlide(ppt, A, pageNum, title, gc) {
  // gc: { WHY:{label,desc}, HOW:{label,desc}, WHAT:{label,desc} }
  const slide = ppt.addSlide();
  slide.addImage({ data: A.BG_TOC, x:0,y:0,w:13.3333,h:7.5 });
  addLogo(slide, A, false); addFooter(slide, pageNum, false);
  slide.addText(title, { x:0.5,y:0.25,w:12,h:0.45, fontSize:22, bold:true,
    color:'1770EA', fontFace:'Microsoft YaHei' });
  // 三层椭圆（用矩形+圆角模拟嵌套层）
  const cx=3.4, cy=4.0;
  const layers=[
    { color:'EEF2FF', txtColor:'333333', w:5.6, h:4.8, label:'WHAT' },
    { color:'00CBFF', txtColor:'FFFFFF', w:4.0, h:3.4, label:'HOW'  },
    { color:'1770EA', txtColor:'FFFFFF', w:2.4, h:2.0, label:'WHY'  },
  ];
  layers.forEach(l=>{
    slide.addShape(ppt.ShapeType.ellipse, {
      x:cx-l.w/2, y:cy-l.h/2, w:l.w, h:l.h,
      fill:{color:l.color}, line:{color:l.color} });
    slide.addText(l.label, { x:cx-l.w/2, y:cy-l.h/2+0.1, w:l.w, h:0.4,
      fontSize:11, bold:true, color:l.txtColor, align:'center',
      fontFace:'Microsoft YaHei' });
  });
  // 右侧说明列
  const rightX=7.0;
  [['WHY','1770EA','FFFFFF'],['HOW','00CBFF','FFFFFF'],['WHAT','EEF2FF','333333']]
    .forEach(([key,bg,fg], i)=>{
      const d=gc[key], rY=1.4+i*1.8;
      slide.addShape(ppt.ShapeType.roundRect, { x:rightX,y:rY,w:5.6,h:1.5,
        fill:{color:bg}, line:{color:bg}, rectRadius:0.06 });
      slide.addText(key+' — '+d.label, { x:rightX+0.2,y:rY+0.1,w:5.2,h:0.4,
        fontSize:14, bold:true, color:fg, fontFace:'Microsoft YaHei' });
      slide.addText(d.desc, { x:rightX+0.2,y:rY+0.55,w:5.2,h:0.85,
        fontSize:12, color:fg, fontFace:'Microsoft YaHei', valign:'top' });
    });
}
```

---

## 版式 23 — 5W1H 六格版式

**结构**：2行×3列均等卡片，顶部蓝色标签 + 内容区

**品牌色**：标签顶块=`#1770EA`白字 / 内容区=`#EEF2FF`深字

```javascript
function add5W1HSlide(ppt, A, pageNum, title, items) {
  // items: [{ key:'WHO', label:'谁', bullets:[] }, ...] 共6项，顺序 WHO/WHAT/WHEN/WHERE/WHY/HOW
  const slide = ppt.addSlide();
  slide.addImage({ data: A.BG_TOC, x:0,y:0,w:13.3333,h:7.5 });
  addLogo(slide, A, false); addFooter(slide, pageNum, false);
  slide.addText(title, { x:0.5,y:0.25,w:12,h:0.45, fontSize:22, bold:true,
    color:'1770EA', fontFace:'Microsoft YaHei' });
  const cW=3.9, cH=2.8, gap=0.2;
  items.forEach((item, idx) => {
    const col=idx%3, row=Math.floor(idx/3);
    const x=0.5+col*(cW+gap), y=1.0+row*(cH+gap);
    // 顶部标签块
    slide.addShape(ppt.ShapeType.rect, { x,y,w:cW,h:0.55,
      fill:{color:'1770EA'}, line:{color:'1770EA'} });
    slide.addText(item.key+'  '+item.label, { x,y,w:cW,h:0.55,
      fontSize:13, bold:true, color:'FFFFFF', align:'center',
      fontFace:'Microsoft YaHei', valign:'middle' });
    // 内容区
    slide.addShape(ppt.ShapeType.rect, { x,y:y+0.55,w:cW,h:cH-0.55,
      fill:{color:'EEF2FF'}, line:{color:'C8D4F8'} });
    const bul=item.bullets.map(b=>({ text:'• '+b,
      options:{ fontSize:12, color:'333333', fontFace:'Microsoft YaHei',
        paraSpaceAfter:5, bullet:false }}));
    slide.addText(bul, { x:x+0.15,y:y+0.65,w:cW-0.3,h:cH-0.75, valign:'top' });
  });
}
```

---

## 版式 24 — SCQA 四步流程版式

**结构**：横向四格箭头流 + 底部说明行

**品牌色**：S=`#EEF2FF`（深字）/ C=`#FFB800` / Q=`#8B6FE8` / A=`#1770EA`

```javascript
function addSCQASlide(ppt, A, pageNum, title, scqa) {
  // scqa: { S:{label,desc}, C:{...}, Q:{...}, A:{...} }
  const slide = ppt.addSlide();
  slide.addImage({ data: A.BG_TOC, x:0,y:0,w:13.3333,h:7.5 });
  addLogo(slide, A, false); addFooter(slide, pageNum, false);
  slide.addText(title, { x:0.5,y:0.25,w:12,h:0.45, fontSize:22, bold:true,
    color:'1770EA', fontFace:'Microsoft YaHei' });
  const cells=[
    { key:'S', bg:'EEF2FF', fg:'333333', x:0.4  },
    { key:'C', bg:'FFB800', fg:'FFFFFF', x:3.55 },
    { key:'Q', bg:'8B6FE8', fg:'FFFFFF', x:6.7  },
    { key:'A', bg:'1770EA', fg:'FFFFFF', x:9.85 },
  ];
  const cW=2.9, topH=1.4, descH=2.8;
  cells.forEach(cell=>{
    const d=scqa[cell.key];
    // 顶部色块
    slide.addShape(ppt.ShapeType.roundRect, { x:cell.x,y:1.2,w:cW,h:topH,
      fill:{color:cell.bg}, line:{color:cell.bg}, rectRadius:0.06 });
    slide.addText(cell.key, { x:cell.x,y:1.3,w:cW,h:0.4,
      fontSize:20, bold:true, color:cell.fg, align:'center',
      fontFace:'Microsoft YaHei' });
    slide.addText(d.label, { x:cell.x,y:1.75,w:cW,h:0.6,
      fontSize:13, bold:true, color:cell.fg, align:'center',
      fontFace:'Microsoft YaHei' });
    // 箭头（最后一格不需要）
    if(cell.key!=='A'){
      slide.addText('→', { x:cell.x+cW+0.02,y:1.6,w:0.25,h:0.5,
        fontSize:18, color:'AAAAAA', align:'center' });
    }
    // 说明区
    slide.addShape(ppt.ShapeType.rect, { x:cell.x,y:2.85,w:cW,h:descH,
      fill:{color:'F7F9FF'}, line:{color:'C8D4F8'} });
    const bul=d.bullets? d.bullets.map(b=>({ text:'• '+b,
      options:{ fontSize:12, color:'333333', fontFace:'Microsoft YaHei',
        paraSpaceAfter:5, bullet:false }})) : [];
    if(d.desc) bul.unshift({ text:d.desc,
      options:{ fontSize:12, color:'555555', fontFace:'Microsoft YaHei',
        paraSpaceAfter:8, bold:false }});
    slide.addText(bul, { x:cell.x+0.12,y:2.95,w:cW-0.24,h:descH-0.2,
      valign:'top' });
  });
}
```

---

## 版式 25 — IPD 五看版式

**结构**：5列等宽卡片横排，顶部序号+标题色块（奇偶列交替主蓝/品青）+ 内容区

**品牌色**：奇数列顶块=`#1770EA` / 偶数列顶块=`#00CBFF` / 内容区=`#EEF2FF`

```javascript
function addIPD5ViewSlide(ppt, A, pageNum, title, views) {
  // views: [{ seq:'01', label:'看行业', point:'', data:'' }, ...] 共5项
  const slide = ppt.addSlide();
  slide.addImage({ data: A.BG_TOC, x:0,y:0,w:13.3333,h:7.5 });
  addLogo(slide, A, false); addFooter(slide, pageNum, false);
  slide.addText(title, { x:0.5,y:0.25,w:12,h:0.45, fontSize:22, bold:true,
    color:'1770EA', fontFace:'Microsoft YaHei' });
  const cW=2.3, gap=0.175, startX=0.5, topH=0.9, bodyH=4.6;
  views.forEach((v, i)=>{
    const x=startX+i*(cW+gap);
    const topColor=i%2===0?'1770EA':'00CBFF';
    // 序号+标题色块
    slide.addShape(ppt.ShapeType.rect, { x,y:1.1,w:cW,h:topH,
      fill:{color:topColor}, line:{color:topColor} });
    slide.addText(v.seq, { x,y:1.15,w:cW,h:0.35,
      fontSize:11, color:'FFFFFF', align:'center', fontFace:'Microsoft YaHei' });
    slide.addText(v.label, { x,y:1.52,w:cW,h:0.42,
      fontSize:13, bold:true, color:'FFFFFF', align:'center',
      fontFace:'Microsoft YaHei' });
    // 内容区
    slide.addShape(ppt.ShapeType.rect, { x,y:2.0,w:cW,h:bodyH,
      fill:{color:'EEF2FF'}, line:{color:'C8D4F8'} });
    slide.addText(v.point, { x:x+0.1,y:2.1,w:cW-0.2,h:1.8,
      fontSize:12, bold:true, color:'1770EA', fontFace:'Microsoft YaHei',
      valign:'top', wrap:true });
    slide.addText(v.data, { x:x+0.1,y:4.0,w:cW-0.2,h:1.9,
      fontSize:11, color:'555555', fontFace:'Microsoft YaHei',
      valign:'top', wrap:true });
  });
}
```
