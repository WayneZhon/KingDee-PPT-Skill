# 金蝶 PPT 版式预设 Layout Presets
> 所有坐标基于 LAYOUT_WIDE（13.3333" × 7.5"），从官方模板 XML 精确提取（2026版）。

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
    LOGO_C:         loadAsset('logo_color.png'),   // 白底页用
    LOGO_W:         loadAsset('logo_white.png'),   // 蓝底页用
  };
}

// ─── Shadow 工厂（必须每次 new，避免 PptxGenJS 对象变异 bug）──────
const mkSh  = () => ({ type:'outer', blur:12, offset:4, angle:135, color:'000000', opacity:0.10 });
const mkShS = () => ({ type:'outer', blur:6,  offset:2, angle:135, color:'000000', opacity:0.07 });

// ─── Logo（右上角，x=12.250 y=0.187 w=0.849 h=0.433）──────────
// onDark=true  → 蓝底页（章节页、封面、结尾）→ 白色反白 logo_white.png
// onDark=false → 白底页（目录、内容页）→ 彩色 logo_color.png
function addLogo(slide, A, onDark) {
  slide.addImage({
    data: onDark ? A.LOGO_W : A.LOGO_C,
    x: 12.250, y: 0.187, w: 0.849, h: 0.433
  });
}

// ─── 页脚（坐标从 slideLayout3 XML 精确提取）──────────────────────
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

// ─── 内容页标题（从 slideLayout3 精确提取，无左侧竖线）────────────
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
```

---

## 版式 01 — 封面页

**背景**：`BG_COVER` 全幅 ｜ **无 Logo**（封面页不放 Logo）

```javascript
// author: 撰稿人（可选）
// dept: 撰稿部门（可选）
function addCoverSlide(pres, A, { title, subtitle, author, dept, date }, pageNum) {
  const s = pres.addSlide();
  // 全幅背景（精确：w=13.333 h=7.517）
  s.addImage({ data: A.BG_COVER, x: 0, y: 0, w: 13.333, h: 7.517 });

  // 主标题（x=0.917 y=2.247 w=11.500 h=1.450，54pt 白色加粗）
  s.addText(title, {
    x: 0.917, y: 2.247, w: 11.500, h: 1.450,
    fontSize: 54, color: 'FFFFFF', bold: true,
    fontFace: 'Microsoft YaHei', margin: 0, valign: 'middle'
  });

  // 副标题（可选，紧接主标题下方）
  if (subtitle) {
    s.addText(subtitle, {
      x: 0.917, y: 3.8, w: 8.0, h: 0.55,
      fontSize: 20, color: 'D0EEFF', bold: false,
      fontFace: 'Microsoft YaHei', margin: 0
    });
  }

  // 撰稿人（x=0.917 y=5.255，可选）
  if (author) {
    s.addText(author, {
      x: 0.917, y: 5.255, w: 3.008, h: 0.443,
      fontSize: 16, color: 'FFFFFF', fontFace: 'Microsoft YaHei', margin: 0
    });
  }

  // 部门（x=0.917 y=5.715，可选）
  if (dept) {
    s.addText(dept, {
      x: 0.917, y: 5.715, w: 3.002, h: 0.473,
      fontSize: 16, color: 'FFFFFF', fontFace: 'Microsoft YaHei', margin: 0
    });
  }

  // 日期（x=0.911 y=6.198）
  s.addText(date || '', {
    x: 0.911, y: 6.198, w: 3.008, h: 0.330,
    fontSize: 16, color: 'FFFFFF', fontFace: 'Microsoft YaHei', margin: 0
  });

  // 版权（固定，x=1.007 y=7.023）
  s.addText('版权所有 © 金蝶国际软件集团有限公司   始创于 1993', {
    x: 1.007, y: 7.023, w: 3.415, h: 0.166,
    fontSize: 8, color: 'AACCDD', fontFace: 'Microsoft YaHei', margin: 0
  });

  // 保密（x=3.877 y=6.998）
  s.addText('④ 内部公开 请勿外传', {
    x: 3.877, y: 6.998, w: 1.599, h: 0.190,
    fontSize: 8, color: 'AACCDD', fontFace: 'Microsoft YaHei', margin: 0
  });

  // 封面不显示页码
}
```

---

## 版式 02 — 目录页

**背景**：`BG_TOC`（极浅白底+气泡纹理）｜**Logo**：彩色

```javascript
// sections: [{ num:'01', title:'章节名', sub:'副说明（可选）', page: 3 }, ...]（最多4项）
// ⚠️ TOC 特点：左侧大号章节编号竖排，标题在 x=1.791" 右侧，页码在 x=11.008"
function addTOCSlide(pres, A, sections, pageNum) {
  const s = pres.addSlide();
  s.addImage({ data: A.BG_TOC, x: 0, y: 0, w: 13.333, h: 7.500 });
  addLogo(s, A, false);  // 白底页 → 彩色 Logo

  // "目 录" 标题（x=0.435 y=0.230，与内容页标题对齐）
  s.addText('目  录', {
    x: 0.435, y: 0.230, w: 4.0, h: 0.513,
    fontSize: 24, color: '262626', bold: true,
    fontFace: 'Microsoft YaHei', margin: 0
  });

  // 精确的 4 行 y 坐标（从 layout2 XML 提取）
  const ROW_Y = [
    { numY: 1.805, titleY: 1.847, subY: 2.343, pageY: 1.900 },
    { numY: 3.073, titleY: 3.061, subY: 3.510, pageY: 3.080 },
    { numY: 4.254, titleY: 4.240, subY: 4.679, pageY: 4.261 },
    { numY: 5.421, titleY: 5.400, subY: 5.846, pageY: 5.441 },
  ];

  sections.slice(0, 4).forEach((sec, i) => {
    const row = ROW_Y[i];

    // 大号章节编号（左侧，80pt，蓝色，w=1.151）
    s.addText(sec.num, {
      x: 0.429, y: row.numY, w: 1.151, h: 0.908,
      fontSize: 80, color: '1770EA', bold: true,
      fontFace: 'Helvetica Neue', margin: 0, valign: 'top'
    });

    // 章节标题（x=1.791，20pt 加粗）
    s.addText(sec.title, {
      x: 1.791, y: row.titleY, w: 7.221, h: 0.449,
      fontSize: 20, color: '262626', bold: true,
      fontFace: 'Microsoft YaHei', margin: 0, valign: 'middle'
    });

    // 副说明（可选，x=1.791，13pt 灰色）
    if (sec.sub) {
      s.addText(sec.sub, {
        x: 1.791, y: row.subY, w: 7.221, h: 0.312,
        fontSize: 13, color: '888888', bold: false,
        fontFace: 'Microsoft YaHei', margin: 0
      });
    }

    // 页码（x=11.008，右对齐蓝色）
    s.addText(`P  ${String(sec.page).padStart(2,'0')}`, {
      x: 11.008, y: row.pageY, w: 1.327, h: 0.443,
      fontSize: 14, color: '1770EA', bold: false,
      fontFace: 'Helvetica Neue', align: 'right', margin: 0
    });

    // 分割线（除最后一项）
    if (i < sections.length - 1) {
      s.addShape(pres.ShapeType.line, {
        x: 1.791, y: row.subY + 0.35, w: 10.5, h: 0,
        line: { color: 'DDDDDD', width: 0.5 }
      });
    }
  });

  addFooter(s, pageNum, false);
}
```

---

## 版式 03 — 章节分隔页

**背景**：`BG_SEC_A/B/C`（轮换）｜**Logo**：彩色

```javascript
// bgData 传入 SEC_BGS[chapterIndex % 3]
// num: '01'/'02' 等两位数字符串
// ⚠️ 大数字：sz=12500（125pt）color=#46CCFE，从 layout5 XML 精确提取
function addSectionSlide(pres, A, { num, title, subtitle, bgData }, pageNum) {
  const s = pres.addSlide();
  s.addImage({ data: bgData, x: 0, y: 0, w: 13.333, h: 7.516 });
  addLogo(s, A, true);  // 蓝底页 → 反白 Logo

  // 超大章节编号（x=0.403 y=0.284 w=2.365 h=2.205，125pt，#46CCFE）
  s.addText(num, {
    x: 0.403, y: 0.284, w: 2.365, h: 2.205,
    fontSize: 125, color: '46CCFE', bold: true,
    fontFace: '微软雅黑', margin: 0, valign: 'top'
  });

  // 红色装饰横线（x=0.603 y=2.489 w=0.876 h=0.096）
  s.addShape(pres.ShapeType.rect, {
    x: 0.603, y: 2.489, w: 0.876, h: 0.096,
    fill: { color: 'E8210A' }
  });

  // 章节标题（x=0.516 y=2.970 w=10.870 h=0.667，24pt 白色加粗）
  s.addText(title, {
    x: 0.516, y: 2.970, w: 10.870, h: 0.667,
    fontSize: 24, color: 'FFFFFF', bold: true,
    fontFace: 'Microsoft YaHei', margin: 0, valign: 'middle'
  });

  // 副说明（可选，x=0.516 y=3.626 w=5.167 h=1.320，18pt 白色）
  if (subtitle) {
    s.addText(subtitle, {
      x: 0.516, y: 3.626, w: 5.167, h: 1.320,
      fontSize: 18, color: 'FFFFFF', bold: false,
      fontFace: 'Microsoft YaHei', margin: 0
    });
  }

  // 章节分隔页只显示页码（无保密标识）
  addFooter(s, pageNum, true);
}
```

---

## 版式 04 — 内容页：要点列表

**背景**：白色 ｜**Logo**：彩色

```javascript
// points: [{ text:'要点', bold:false, highlight:false }, ...]
// highlight=true → 蓝色 1770EA；bold=true → 加粗 20pt
// 内容区精确坐标：x=0.434 y=1.503 w=12.256 h=5.348
function addBulletSlide(pres, A, { title, subtitle, points }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);  // 白底页 → 彩色 Logo
  addContentTitle(s, title, subtitle);

  const items = points.map((p, i) => ({
    text: p.text,
    options: {
      bullet: true,
      breakLine: i < points.length - 1,
      fontSize: p.bold ? 20 : 18,
      color: p.highlight ? '1770EA' : '333333',
      bold: p.bold || false,
      fontFace: 'Microsoft YaHei',
      paraSpaceAfter: 14,
    }
  }));

  s.addText(items, {
    x: 0.434, y: 1.503, w: 12.256, h: 5.348,
    fontFace: 'Microsoft YaHei', valign: 'top'
  });

  addFooter(s, pageNum, false);
}
```

---

## 版式 05 — 内容页：数据卡片组

**适用**：3~4 个并列指标

```javascript
// cards: [{ title:'微服务架构', color:'1770EA', points:[{text,bold},...] }, ...]
function addCardsSlide(pres, A, { title, subtitle, cards }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);  // 白底页 → 彩色 Logo
  addContentTitle(s, title, subtitle);

  const n = cards.length;
  const cW = n === 3 ? 3.90 : 2.90;
  const gap = n === 3 ? 0.24 : 0.20;
  const totalW = n * cW + (n - 1) * gap;
  const sX = (13.333 - totalW) / 2;
  const cY = 1.55, cH = 5.10;

  cards.forEach((card, i) => {
    const x = sX + i * (cW + gap);
    const c = card.color || COLOR_SEQ[i % 5];

    // 卡片背景
    s.addShape(pres.ShapeType.rect, {
      x, y: cY, w: cW, h: cH,
      fill: { color: 'F7F9FC' }, shadow: mkShS()
    });
    // 彩色顶部标题条
    s.addShape(pres.ShapeType.rect, {
      x, y: cY, w: cW, h: 0.68,
      fill: { color: c }
    });
    s.addText(card.title, {
      x, y: cY, w: cW, h: 0.68,
      fontSize: 17, color: 'FFFFFF', bold: true,
      fontFace: 'Microsoft YaHei', align: 'center', margin: 0, valign: 'middle'
    });

    // 要点内容
    const pts = (card.points || []).map((p, j) => ({
      text: p.text,
      options: {
        bullet: true,
        breakLine: j < card.points.length - 1,
        fontSize: p.bold ? 16 : 15,
        color: p.bold ? c : '333333',
        bold: p.bold || false,
        fontFace: 'Microsoft YaHei',
        paraSpaceAfter: 10,
      }
    }));
    if (pts.length) {
      s.addText(pts, {
        x: x + 0.16, y: cY + 0.82, w: cW - 0.32, h: cH - 1.0,
        fontFace: 'Microsoft YaHei', valign: 'top'
      });
    }
  });

  addFooter(s, pageNum, false);
}

const COLOR_SEQ = ['1770EA', '00CBFF', '00C7C7', 'AF6EFF', 'FFC000'];
```

---

## 版式 06 — 内容页：左右对比

```javascript
// left/right: { title, color, points:[{text,bold}] }
function addCompareSlide(pres, A, { title, subtitle, left, right }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);  // 白底页 → 彩色 Logo
  addContentTitle(s, title, subtitle);

  [[left, 0.434], [right, 6.70]].forEach(([col, x]) => {
    const c = col.color || '1770EA';
    const w = 6.05;
    s.addShape(pres.ShapeType.rect, {
      x, y: 1.55, w, h: 5.1,
      fill: { color: 'F7F9FC' }, shadow: mkShS()
    });
    s.addShape(pres.ShapeType.rect, {
      x, y: 1.55, w, h: 0.62,
      fill: { color: c }
    });
    s.addText(col.title, {
      x, y: 1.55, w, h: 0.62,
      fontSize: 18, color: 'FFFFFF', bold: true,
      fontFace: 'Microsoft YaHei', align: 'center', margin: 0, valign: 'middle'
    });
    const pts = (col.points || []).map((p, j) => ({
      text: p.text,
      options: {
        bullet: true,
        breakLine: j < col.points.length - 1,
        fontSize: 16, color: p.bold ? c : '333333',
        bold: p.bold || false,
        fontFace: 'Microsoft YaHei', paraSpaceAfter: 12,
      }
    }));
    if (pts.length) {
      s.addText(pts, {
        x: x + 0.18, y: 2.28, w: w - 0.36, h: 4.22,
        fontFace: 'Microsoft YaHei', valign: 'top'
      });
    }
  });

  addFooter(s, pageNum, false);
}
```

---

## 版式 07 — 内容页：横向流程步骤

```javascript
// steps: [{ text:'步骤说明' }, ...]（3~5步）
// note: 底部备注（可选）
function addFlowSlide(pres, A, { title, subtitle, steps, note }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);  // 白底页 → 彩色 Logo
  addContentTitle(s, title, subtitle);

  const n = steps.length;
  const sX = 0.434, aW = 12.256;
  const sW = (aW - (n - 1) * 0.28) / n;
  const sY = 2.0, sH = 3.5;
  const colors = ['1770EA', '00CBFF', '00C7C7', 'AF6EFF', 'FFC000'];

  steps.forEach((step, i) => {
    const x = sX + i * (sW + 0.28);
    const c = colors[i % colors.length];

    s.addShape(pres.ShapeType.rect, {
      x, y: sY, w: sW, h: sH,
      fill: { color: 'F7F9FC' }, shadow: mkShS()
    });
    s.addShape(pres.ShapeType.rect, {
      x, y: sY, w: sW, h: 0.52,
      fill: { color: c }
    });
    s.addText(`Step ${i + 1}`, {
      x, y: sY, w: sW, h: 0.52,
      fontSize: 14, color: 'FFFFFF', bold: true,
      fontFace: 'Helvetica Neue', align: 'center', margin: 0, valign: 'middle'
    });
    s.addText(step.text, {
      x: x + 0.1, y: sY + 0.62, w: sW - 0.2, h: sH - 0.72,
      fontSize: 14, color: '333333',
      fontFace: 'Microsoft YaHei', valign: 'top', margin: 4
    });

    // 箭头连接
    if (i < n - 1) {
      s.addShape(pres.ShapeType.rect, {
        x: x + sW + 0.04, y: sY + sH / 2 - 0.04, w: 0.20, h: 0.07,
        fill: { color: 'CCCCCC' }
      });
    }
  });

  if (note) {
    s.addText(`⚠ ${note}`, {
      x: 0.434, y: 5.8, w: 12.256, h: 0.35,
      fontSize: 12, color: 'FFC000', fontFace: 'Microsoft YaHei', margin: 0
    });
  }

  addFooter(s, pageNum, false);
}
```

---

## 版式 08 — 内容页：图文并排

```javascript
// imgData: base64 格式图片（或留空显示占位框）
// imgSide: 'left' | 'right'
function addImageTextSlide(pres, A, { title, subtitle, imgData, imgSide, placeholder, points }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);  // 白底页 → 彩色 Logo
  addContentTitle(s, title, subtitle);

  const imgX = imgSide === 'left' ? 0.434 : 6.98;
  const txtX = imgSide === 'left' ? 7.10 : 0.434;
  const imgW = 6.10, imgH = 5.25, cY = 1.55;

  // 图片或占位框
  if (imgData) {
    s.addImage({ data: imgData, x: imgX, y: cY, w: imgW, h: imgH,
      sizing: { type: 'contain', w: imgW, h: imgH } });
  } else {
    s.addShape(pres.ShapeType.rect, {
      x: imgX, y: cY, w: imgW, h: imgH,
      fill: { color: 'EBF3FF' },
      line: { color: '1770EA', width: 1, dashType: 'dash' }
    });
    if (placeholder) {
      s.addText(placeholder, {
        x: imgX, y: cY + imgH / 2 - 0.3, w: imgW, h: 0.6,
        fontSize: 14, color: '1770EA', align: 'center', italic: true,
        fontFace: 'Microsoft YaHei', margin: 0
      });
    }
  }

  // 文字要点
  const items = (points || []).map((p, i) => ({
    text: p.text,
    options: {
      bullet: true,
      breakLine: i < points.length - 1,
      fontSize: p.bold ? 19 : 17,
      color: p.highlight ? '1770EA' : '333333',
      bold: p.bold || false,
      fontFace: 'Microsoft YaHei',
      paraSpaceAfter: 14,
    }
  }));
  if (items.length) {
    s.addText(items, {
      x: txtX, y: cY + 0.2, w: 5.8, h: 5.05, valign: 'top'
    });
  }

  addFooter(s, pageNum, false);
}
```

---

## 版式 09 — 内容页：时间轴

```javascript
// milestones: [{ date:'2024 Q1', event:'事件名', detail:'详情', note:'备注' }, ...]
function addTimelineSlide(pres, A, { title, subtitle, milestones }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);  // 白底页 → 彩色 Logo
  addContentTitle(s, title, subtitle);

  const n = milestones.length;
  const lineY = 3.8, sX = 0.80, span = 11.5;

  s.addShape(pres.ShapeType.line, {
    x: sX, y: lineY, w: span, h: 0,
    line: { color: '1770EA', width: 2 }
  });

  milestones.forEach((m, i) => {
    const x = sX + (span / (n - 1 || 1)) * i;
    s.addShape(pres.ShapeType.oval, {
      x: x - 0.13, y: lineY - 0.13, w: 0.26, h: 0.26,
      fill: { color: '1770EA' }
    });

    const isUp = i % 2 === 0;
    s.addText(m.date, {
      x: x - 0.9, y: isUp ? lineY - 1.2 : lineY + 0.2,
      w: 1.8, h: 0.3,
      fontSize: 13, color: '1770EA', bold: true,
      fontFace: 'Helvetica Neue', align: 'center', margin: 0
    });
    s.addText(m.event, {
      x: x - 0.9, y: isUp ? lineY - 0.85 : lineY + 0.55,
      w: 1.8, h: 0.55,
      fontSize: 13, color: '262626', bold: true,
      fontFace: 'Microsoft YaHei', align: 'center', margin: 0
    });
    if (m.detail) {
      s.addText(m.detail, {
        x: x - 0.9, y: isUp ? lineY + 0.2 : lineY - 0.85,
        w: 1.8, h: 0.5,
        fontSize: 11, color: '666666',
        fontFace: 'Microsoft YaHei', align: 'center', margin: 0
      });
    }
  });

  addFooter(s, pageNum, false);
}
```

---

## 版式 10 — 结尾页

**背景**：`BG_CLOSING`（蓝底+顶部大圆）｜**无 Logo**

```javascript
// ⚠️ 多语言谢谢文字：使用官方 closing_thanks.png 图片（白色文字PNG，透明底）
// 精确坐标：x=0.794 y=2.802 w=7.562 h=2.735（从 layout15 XML 提取）
function addClosingSlide(pres, A, pageNum) {
  const s = pres.addSlide();
  s.addImage({ data: A.BG_CLOSING, x: 0, y: 0, w: 13.333, h: 7.509 });

  // 多语言谢谢（官方白色 PNG，精确位置）
  s.addImage({
    data: A.CLOSING_THANKS,
    x: 0.794, y: 2.802, w: 7.562, h: 2.735
  });

  // 版权（x=1.095 y=6.961，精确值）
  s.addText('版权所有 © 金蝶国际软件集团有限公司   始创于 1993', {
    x: 1.095, y: 6.961, w: 2.965, h: 0.188,
    fontSize: 8, color: 'AACCDD', fontFace: 'Microsoft YaHei', margin: 0
  });

  // 保密（x=3.825 y=6.867，精确值）
  s.addText('④ 内部公开 请勿外传', {
    x: 3.825, y: 6.867, w: 1.599, h: 0.190,
    fontSize: 8, color: 'AACCDD', fontFace: 'Microsoft YaHei', margin: 0
  });

  addFooter(s, pageNum, true);
}
```

---

---

## 版式 11 — 内容页：左大区 + 右侧面板组

**适用**：架构图/产品图放左侧，右侧3个信息面板（如核心能力/价值描述/年度目标）。参考 KWC 架构图页。

```javascript
// leftContent: { type:'placeholder'|'image', imgData, placeholder:'架构图区域', label:'KWC（Kingdee Web Components）' }
// panels: [{ title:'核心能力', color:'7B2FBE', points:[{text,bold}] }, ...]（2~3个）
function addLeftAreaRightPanelsSlide(pres, A, { title, subtitle, leftContent, panels }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);

  const contentY = 1.30;
  const leftW = 8.20, rightW = 4.50;
  const leftX = 0.30, rightX = 8.70;
  const totalH = 5.90;

  // ── 左侧主内容区 ───────────────────────────────────────────────
  s.addShape(pres.ShapeType.rect, {
    x: leftX, y: contentY, w: leftW, h: totalH,
    fill: { color: 'EBF5FF' }, line: { color: 'C5DFF8', width: 0.5 }
  });
  if (leftContent && leftContent.label) {
    s.addText(leftContent.label, {
      x: leftX, y: contentY + 0.10, w: leftW, h: 0.40,
      fontSize: 16, color: '1770EA', bold: true,
      fontFace: 'Microsoft YaHei', align: 'center', margin: 0
    });
  }
  if (leftContent && leftContent.imgData) {
    s.addImage({ data: leftContent.imgData, x: leftX + 0.10, y: contentY + 0.55,
      w: leftW - 0.20, h: totalH - 0.65, sizing: { type: 'contain', w: leftW - 0.20, h: totalH - 0.65 }
    });
  } else {
    s.addText(leftContent && leftContent.placeholder ? leftContent.placeholder : '[ 架构图 / 流程图 ]', {
      x: leftX, y: contentY + totalH / 2 - 0.30, w: leftW, h: 0.60,
      fontSize: 13, color: '1770EA', italic: true, align: 'center',
      fontFace: 'Microsoft YaHei', margin: 0
    });
  }

  // ── 右侧面板组 ────────────────────────────────────────────────
  const panelH = (totalH - (panels.length - 1) * 0.16) / panels.length;
  const PANEL_COLORS = ['7B2FBE', '00A8B5', 'FFC000'];

  panels.forEach((panel, i) => {
    const c = panel.color || PANEL_COLORS[i % 3];
    const py = contentY + i * (panelH + 0.16);

    s.addShape(pres.ShapeType.rect, {
      x: rightX, y: py, w: rightW, h: panelH,
      fill: { color: 'F8F6FF' }, shadow: mkShS()
    });
    // 彩色标题条
    s.addShape(pres.ShapeType.rect, {
      x: rightX, y: py, w: rightW, h: 0.45,
      fill: { color: c }
    });
    s.addText(panel.title, {
      x: rightX, y: py, w: rightW, h: 0.45,
      fontSize: 14, color: 'FFFFFF', bold: true,
      fontFace: 'Microsoft YaHei', align: 'center', margin: 0, valign: 'middle'
    });

    const pts = (panel.points || []).map((p, j) => ({
      text: p.text,
      options: {
        bullet: true,
        breakLine: j < panel.points.length - 1,
        fontSize: 13, color: p.bold ? c : '333333', bold: p.bold || false,
        fontFace: 'Microsoft YaHei', paraSpaceAfter: 6
      }
    }));
    if (pts.length) {
      s.addText(pts, {
        x: rightX + 0.12, y: py + 0.50, w: rightW - 0.24, h: panelH - 0.60,
        fontFace: 'Microsoft YaHei', valign: 'top'
      });
    }
  });

  addFooter(s, pageNum, false);
}
```

---

## 版式 12 — 内容页：三列洞察卡

**适用**：用户画像 / 核心痛点 / 商业机遇 等"三段式洞察"页面；每列支持大数字统计。参考客户洞察页。

```javascript
// titlePrefix: '客户洞察' (可选，显示为蓝色前缀标签)
// cols: [
//   { header:'用户画像', headerColor:'1770EA',
//     bigStat:'71.8%', bigStatLabel:'后端/全栈开发者',
//     points:[{text,bold,highlight}], note:'行为特征...' },
//   { header:'核心痛点', headerColor:'7B2FBE', bigStat:'53%', ... },
//   { header:'商业机遇', headerColor:'00A8B5', ... }
// ]
function addInsightColsSlide(pres, A, { title, subtitle, titlePrefix, cols }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);

  // 标题：前缀蓝色标签 + 正文
  if (titlePrefix) {
    s.addShape(pres.ShapeType.rect, {
      x: 0.30, y: 0.18, w: 1.60, h: 0.52,
      fill: { color: '1770EA' }, rectRadius: 0.06
    });
    s.addText(titlePrefix, {
      x: 0.30, y: 0.18, w: 1.60, h: 0.52,
      fontSize: 14, color: 'FFFFFF', bold: true,
      fontFace: 'Microsoft YaHei', align: 'center', margin: 0, valign: 'middle'
    });
    s.addText(title, {
      x: 2.10, y: 0.18, w: 10.80, h: 0.52,
      fontSize: 22, color: '262626', bold: true,
      fontFace: 'Microsoft YaHei', margin: 0, valign: 'middle'
    });
  } else {
    addContentTitle(s, title, subtitle);
  }

  const n = cols.length || 3;
  const gap = 0.20;
  const colW = (13.333 - 0.434 * 2 - gap * (n - 1)) / n;
  const colY = 1.15, colH = 6.05;

  cols.slice(0, 3).forEach((col, i) => {
    const x = 0.434 + i * (colW + gap);
    const c = col.headerColor || COLOR_SEQ[i % 5];

    // 列背景
    s.addShape(pres.ShapeType.rect, {
      x, y: colY, w: colW, h: colH,
      fill: { color: 'F8FAFC' }, shadow: mkShS()
    });
    // 顶部色彩条
    s.addShape(pres.ShapeType.rect, {
      x, y: colY, w: colW, h: 0.55,
      fill: { color: c }
    });
    s.addText(col.header, {
      x, y: colY, w: colW, h: 0.55,
      fontSize: 16, color: 'FFFFFF', bold: true,
      fontFace: 'Microsoft YaHei', align: 'center', margin: 0, valign: 'middle'
    });

    let curY = colY + 0.65;

    // 大数字统计
    if (col.bigStat) {
      s.addText(col.bigStat, {
        x: x + 0.10, y: curY, w: colW - 0.20, h: 0.90,
        fontSize: 44, color: c, bold: true,
        fontFace: 'Helvetica Neue', align: 'center', margin: 0
      });
      curY += 0.90;
    }
    if (col.bigStatLabel) {
      s.addText(col.bigStatLabel, {
        x: x + 0.10, y: curY, w: colW - 0.20, h: 0.38,
        fontSize: 14, color: '262626', bold: true,
        fontFace: 'Microsoft YaHei', align: 'center', margin: 0
      });
      curY += 0.42;
    }

    // 正文要点
    const pts = (col.points || []).map((p, j) => ({
      text: p.text,
      options: {
        bullet: true,
        breakLine: j < col.points.length - 1,
        fontSize: 13, color: p.highlight ? c : (p.bold ? '262626' : '444444'),
        bold: p.bold || false,
        fontFace: 'Microsoft YaHei', paraSpaceAfter: 8
      }
    }));
    if (pts.length) {
      s.addText(pts, {
        x: x + 0.12, y: curY, w: colW - 0.24, h: colY + colH - curY - 0.15,
        fontFace: 'Microsoft YaHei', valign: 'top'
      });
    }

    // 底部备注
    if (col.note) {
      s.addText(col.note, {
        x: x + 0.10, y: colY + colH - 0.70, w: colW - 0.20, h: 0.60,
        fontSize: 11, color: '888888', italic: true,
        fontFace: 'Microsoft YaHei', valign: 'bottom', margin: 0
      });
    }
  });

  addFooter(s, pageNum, false);
}
```

---

## 版式 13 — 内容页：双列归因对比（带中间连接）

**适用**：失败原因 vs 破局机会、障碍 vs 机会点等双列对比，中间用图标/箭头连接，视觉上形成"映射"关系。参考"洞察自己：从教训中总结经验"页。

```javascript
// leftHeader:  { title:'2024 失败归因（阻碍点）', color:'FFC000' }
// rightHeader: { title:'Current 破局的关键（机会点）', color:'00A8B5' }
// rows: [
//   { icon:'⚙', label:'技术成熟度',
//     left:  { title:'算力与模型双缺失', points:['RAG效果差…','第三方模型…'] },
//     right: { title:'基建完善与模型红利', points:['具备自建模型…','第三方模型成熟…'] }
//   }, ...
// ]（建议3~4行）
function addCausalCompareSlide(pres, A, { title, subtitle, leftHeader, rightHeader, rows }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);

  const n = rows.length;
  const startY = 1.30;
  const totalH = 5.90;
  const rowH = (totalH - (n - 1) * 0.16) / n;
  const lX = 0.25, rX = 7.50, mX = 5.50;
  const colW = 4.80, midW = 1.80;
  const lColor = (leftHeader && leftHeader.color) || 'FFC000';
  const rColor = (rightHeader && rightHeader.color) || '00A8B5';

  // 顶部栏
  [[lX, colW, lColor, leftHeader && leftHeader.title],
   [rX, colW, rColor, rightHeader && rightHeader.title]].forEach(([x, w, c, hTitle]) => {
    if (!hTitle) return;
    s.addShape(pres.ShapeType.rect, {
      x, y: startY - 0.50, w, h: 0.42,
      fill: { color: c }, rectRadius: 0.06
    });
    s.addText(hTitle, {
      x, y: startY - 0.50, w, h: 0.42,
      fontSize: 13, color: 'FFFFFF', bold: true,
      fontFace: 'Microsoft YaHei', align: 'center', margin: 0, valign: 'middle'
    });
  });

  rows.forEach((row, i) => {
    const ry = startY + i * (rowH + 0.16);

    // 左侧：金色边框卡片
    s.addShape(pres.ShapeType.rect, {
      x: lX, y: ry, w: colW, h: rowH,
      fill: { color: 'FFFDF0' }, line: { color: lColor, width: 1.5 }
    });
    s.addText(row.left.title, {
      x: lX + 0.15, y: ry + 0.08, w: colW - 0.30, h: 0.38,
      fontSize: 14, color: lColor, bold: true,
      fontFace: 'Microsoft YaHei', margin: 0
    });
    const lPts = (row.left.points || []).map((p, j) => ({
      text: p, options: {
        bullet: true, breakLine: j < row.left.points.length - 1,
        fontSize: 12, color: '555555', fontFace: 'Microsoft YaHei', paraSpaceAfter: 4
      }
    }));
    if (lPts.length) {
      s.addText(lPts, {
        x: lX + 0.15, y: ry + 0.50, w: colW - 0.30, h: rowH - 0.60,
        valign: 'top'
      });
    }

    // 中间：图标 + 连接线
    const cy = ry + rowH / 2;
    s.addShape(pres.ShapeType.oval, {
      x: mX + 0.25, y: cy - 0.38, w: 0.76, h: 0.76,
      fill: { color: 'F0F0F0' }, line: { color: 'CCCCCC', width: 0.5 }
    });
    s.addText(row.icon || '→', {
      x: mX + 0.25, y: cy - 0.38, w: 0.76, h: 0.76,
      fontSize: 18, align: 'center', valign: 'middle',
      fontFace: 'Microsoft YaHei', color: '666666', margin: 0
    });
    if (row.label) {
      s.addText(row.label, {
        x: mX, y: cy + 0.42, w: 1.30, h: 0.30,
        fontSize: 11, color: '888888',
        fontFace: 'Microsoft YaHei', align: 'center', margin: 0
      });
    }

    // 右侧：青色边框卡片
    s.addShape(pres.ShapeType.rect, {
      x: rX, y: ry, w: colW, h: rowH,
      fill: { color: 'F0FBFB' }, line: { color: rColor, width: 1.5 }
    });
    s.addText(row.right.title, {
      x: rX + 0.15, y: ry + 0.08, w: colW - 0.30, h: 0.38,
      fontSize: 14, color: rColor, bold: true,
      fontFace: 'Microsoft YaHei', margin: 0
    });
    const rPts = (row.right.points || []).map((p, j) => ({
      text: p, options: {
        bullet: true, breakLine: j < row.right.points.length - 1,
        fontSize: 12, color: '555555', fontFace: 'Microsoft YaHei', paraSpaceAfter: 4
      }
    }));
    if (rPts.length) {
      s.addText(rPts, {
        x: rX + 0.15, y: ry + 0.50, w: colW - 0.30, h: rowH - 0.60,
        valign: 'top'
      });
    }
  });

  addFooter(s, pageNum, false);
}
```

---

## 版式 14 — 内容页：三列特性卡（带底部装饰台）

**适用**：平台化战略三大价值、三大能力、三大优势等"三列平行论点"，每列带底部彩色台阶装饰。参考行业洞察页。

```javascript
// titleLabel: '行业洞察'（可选，蓝色小标签前置在标题前）
// cols: [
//   { title:'随需应变', color:'8B5CF6',
//     body:'打破烟囱式架构的束缚...',
//     badges:['整合与标准化','个性化服务'] },
//   { title:'避免重复造轮子', color:'00A8B5', body:'...', badges:['模块化','数据驱动'] },
//   { title:'敏捷技术升级', color:'1770EA', body:'...', badges:['开放API','生态系统构建'] }
// ]
function addFeatureColsSlide(pres, A, { title, subtitle, titleLabel, cols }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);

  // 标题区（带可选小标签）
  if (titleLabel) {
    s.addShape(pres.ShapeType.rect, {
      x: 0.30, y: 0.20, w: 1.50, h: 0.46,
      fill: { color: '1770EA' }
    });
    s.addText(titleLabel, {
      x: 0.30, y: 0.20, w: 1.50, h: 0.46,
      fontSize: 13, color: 'FFFFFF', bold: true,
      fontFace: 'Microsoft YaHei', align: 'center', margin: 0, valign: 'middle'
    });
    s.addText(title, {
      x: 2.00, y: 0.20, w: 11.00, h: 0.46,
      fontSize: 20, color: '262626', bold: true,
      fontFace: 'Microsoft YaHei', margin: 0, valign: 'middle'
    });
  } else {
    addContentTitle(s, title, subtitle);
  }

  const n = cols.length || 3;
  const gap = 0.22;
  const colW = (13.333 - 0.40 * 2 - gap * (n - 1)) / n;
  const cardY = 1.10, cardH = 4.40;
  const badgeAreaH = 0.80, decH = 1.50;

  cols.slice(0, 3).forEach((col, i) => {
    const x = 0.40 + i * (colW + gap);
    const c = col.color || COLOR_SEQ[i % 5];

    // 白色卡片（圆角）
    s.addShape(pres.ShapeType.rect, {
      x, y: cardY, w: colW, h: cardH,
      fill: { color: 'FFFFFF' }, shadow: mkSh()
    });

    // 彩色标题文字（无色块，直接彩色文字）
    s.addText(col.title, {
      x: x + 0.15, y: cardY + 0.20, w: colW - 0.30, h: 0.55,
      fontSize: 18, color: c, bold: true,
      fontFace: 'Microsoft YaHei', align: 'center', margin: 0
    });
    // 分隔线
    s.addShape(pres.ShapeType.line, {
      x: x + 0.30, y: cardY + 0.85, w: colW - 0.60, h: 0,
      line: { color: 'E0E0E0', width: 0.5 }
    });
    // 正文
    s.addText(col.body || '', {
      x: x + 0.15, y: cardY + 1.00, w: colW - 0.30, h: cardH - 1.30,
      fontSize: 14, color: '444444',
      fontFace: 'Microsoft YaHei', valign: 'top', margin: 0
    });

    // 底部徽章行
    const badgeY = cardY + cardH + 0.10;
    (col.badges || []).forEach((badge, bi) => {
      const bW = (colW - 0.10) / (col.badges.length);
      const bX = x + bi * bW;
      s.addShape(pres.ShapeType.rect, {
        x: bX + 0.05, y: badgeY, w: bW - 0.10, h: 0.38,
        fill: { color: c }
      });
      s.addText(badge, {
        x: bX + 0.05, y: badgeY, w: bW - 0.10, h: 0.38,
        fontSize: 11, color: 'FFFFFF', bold: true,
        fontFace: 'Microsoft YaHei', align: 'center', margin: 0, valign: 'middle'
      });
    });

    // 底部装饰台阶（梯形渐变效果，用两个矩形叠加模拟）
    const decY = badgeY + 0.55;
    s.addShape(pres.ShapeType.rect, {
      x: x, y: decY, w: colW, h: decH * 0.55,
      fill: { type: 'solid', color: c + '33' }  // 20% 透明度
    });
    s.addShape(pres.ShapeType.rect, {
      x: x + colW * 0.12, y: decY + decH * 0.40, w: colW * 0.76, h: decH * 0.30,
      fill: { type: 'solid', color: c + '22' }
    });
  });

  addFooter(s, pageNum, false);
}
```

---

## 版式 15 — 内容页：全幅分层矩阵

**适用**：开发者生态服务平台蓝图、产品架构全景、多层级能力地图等"行列分组"页面。参考开发者生态服务平台蓝图页。

```javascript
// rows: [
//   { label:'入口', labelColor:'1770EA',
//     cells:[{ text:'PC客户端', span:1 }, { text:'桌面端', span:1 }, ...]
//   },
//   { label:'业务平台', labelColor:'1770EA',
//     subTitle:'了解苍穹 → 体验苍穹 → ...',
//     groups:[
//       { groupTitle:'开发者门户', color:'1770EA',
//         cells:[['首页','文档中心','开放门户'],['社区版苍穹','文档','SDK']] }
//     ]
//   },
//   ...
// ]
// ⚠️ 此版式为复杂结构，优先用 placeholder 方式描述各区域，再填充内容
function addLayeredMatrixSlide(pres, A, { title, subtitle, rows }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);

  const matX = 0.25, matW = 12.85;
  const labelW = 1.10;
  const startY = 1.20;
  const totalH = 5.90;
  const rowH = totalH / Math.max(rows.length, 1);

  rows.forEach((row, i) => {
    const ry = startY + i * rowH;
    const c = row.labelColor || '1770EA';

    // 行标签（左侧蓝色竖条）
    s.addShape(pres.ShapeType.rect, {
      x: matX, y: ry + 0.04, w: labelW - 0.06, h: rowH - 0.08,
      fill: { color: c }
    });
    s.addText(row.label, {
      x: matX, y: ry + 0.04, w: labelW - 0.06, h: rowH - 0.08,
      fontSize: 14, color: 'FFFFFF', bold: true,
      fontFace: 'Microsoft YaHei', align: 'center', valign: 'middle', margin: 0
    });

    // 行内容区
    const contentX = matX + labelW;
    const contentW = matW - labelW;

    if (row.cells) {
      // 简单等分单元格行
      const cellW = contentW / row.cells.length;
      row.cells.forEach((cell, j) => {
        const cx = contentX + j * cellW;
        s.addShape(pres.ShapeType.rect, {
          x: cx + 0.04, y: ry + 0.04, w: cellW - 0.08, h: rowH - 0.08,
          fill: { color: 'F0F6FF' }, line: { color: 'D0E4FF', width: 0.5 }
        });
        s.addText(cell.text || cell, {
          x: cx + 0.04, y: ry + 0.04, w: cellW - 0.08, h: rowH - 0.08,
          fontSize: 13, color: '262626',
          fontFace: 'Microsoft YaHei', align: 'center', valign: 'middle', margin: 0
        });
      });
    } else if (row.groups) {
      // 分组区域行
      const groupW = contentW / row.groups.length;
      row.groups.forEach((grp, g) => {
        const gx = contentX + g * groupW;
        const gc = grp.color || COLOR_SEQ[g % 5];
        // 分组标题
        s.addShape(pres.ShapeType.rect, {
          x: gx + 0.04, y: ry + 0.04, w: groupW - 0.08, h: 0.40,
          fill: { color: gc }
        });
        s.addText(grp.groupTitle, {
          x: gx + 0.04, y: ry + 0.04, w: groupW - 0.08, h: 0.40,
          fontSize: 12, color: 'FFFFFF', bold: true,
          fontFace: 'Microsoft YaHei', align: 'center', valign: 'middle', margin: 0
        });
        // 分组内容
        const innerH = rowH - 0.50;
        const innerItems = (grp.cells || []).flat();
        if (innerItems.length) {
          s.addShape(pres.ShapeType.rect, {
            x: gx + 0.04, y: ry + 0.48, w: groupW - 0.08, h: innerH,
            fill: { color: 'F7FAFE' }, line: { color: 'D0E4FF', width: 0.5 }
          });
          const pts = innerItems.map((t, k) => ({
            text: t, options: {
              bullet: true, breakLine: k < innerItems.length - 1,
              fontSize: 11, color: '333333', fontFace: 'Microsoft YaHei', paraSpaceAfter: 3
            }
          }));
          s.addText(pts, {
            x: gx + 0.10, y: ry + 0.52, w: groupW - 0.20, h: innerH - 0.10, valign: 'top'
          });
        }
      });
      if (row.subTitle) {
        s.addShape(pres.ShapeType.rect, {
          x: contentX + 0.04, y: ry + 0.04, w: contentW - 0.08, h: 0.36,
          fill: { color: 'EDF5FF' }
        });
        s.addText(row.subTitle, {
          x: contentX + 0.04, y: ry + 0.04, w: contentW - 0.08, h: 0.36,
          fontSize: 11, color: '1770EA',
          fontFace: 'Microsoft YaHei', align: 'center', valign: 'middle', margin: 0
        });
      }
    } else if (row.text) {
      s.addText(row.text, {
        x: contentX + 0.10, y: ry + 0.04, w: contentW - 0.20, h: rowH - 0.08,
        fontSize: 12, color: '555555',
        fontFace: 'Microsoft YaHei', valign: 'middle', margin: 0
      });
    }
  });

  // 外框
  s.addShape(pres.ShapeType.rect, {
    x: matX, y: startY, w: matW, h: totalH,
    fill: { type: 'none' }, line: { color: 'D0D9E8', width: 0.8 }
  });

  addFooter(s, pageNum, false);
}
```

---

## 版式 16 — 内容页：横向漏斗矩阵（AARRR）

**适用**：开发者运营漏斗、用户旅程矩阵、AARRR/PAARC 框架等"多阶段×多动作"二维矩阵。参考开发者生态运营页。

```javascript
// phases: [
//   { enTitle:'Awareness', cnTitle:'认知度', color:'1770EA',
//     subTitle:'技术认知',   // 分组标题（可选）
//     tags:['技术媒体','搜索引擎','三方社区','展会沙龙'] }
//   ...
// ]（5~6个阶段）
// tagRows: 每列tag分为几行（默认4行）
function addFunnelMatrixSlide(pres, A, { title, subtitle, phases, tagRows }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);

  const n = phases.length;
  const matX = 0.25, matW = 12.85;
  const phaseW = matW / n;
  const headerY = 1.20, headerH = 1.10;
  const contentY = headerY + headerH + 0.08;
  const contentH = 5.90 - headerH - 0.08;
  const rows = tagRows || 4;
  const tagH = (contentH - (rows - 1) * 0.08) / rows;

  // 分组标题背景（跨列）
  const groups = {};
  phases.forEach((ph, i) => {
    if (ph.subTitle) {
      if (!groups[ph.subTitle]) groups[ph.subTitle] = { start: i, end: i, color: ph.color };
      else groups[ph.subTitle].end = i;
    }
  });
  Object.values(groups).forEach(g => {
    const gX = matX + g.start * phaseW;
    const gW = (g.end - g.start + 1) * phaseW;
    s.addShape(pres.ShapeType.rect, {
      x: gX, y: headerY - 0.36, w: gW - 0.04, h: 0.32,
      fill: { color: g.color + '30' }
    });
    s.addText(phases[g.start].subTitle, {
      x: gX, y: headerY - 0.36, w: gW - 0.04, h: 0.32,
      fontSize: 11, color: g.color, bold: true,
      fontFace: 'Microsoft YaHei', align: 'center', valign: 'middle', margin: 0
    });
  });

  phases.forEach((ph, i) => {
    const px = matX + i * phaseW;
    const c = ph.color || COLOR_SEQ[i % 5];

    // 阶段标题列
    s.addShape(pres.ShapeType.rect, {
      x: px, y: headerY, w: phaseW - 0.06, h: headerH,
      fill: { color: c }
    });
    s.addText(ph.enTitle || '', {
      x: px, y: headerY + 0.05, w: phaseW - 0.06, h: 0.42,
      fontSize: 13, color: 'FFFFFF', bold: true,
      fontFace: 'Helvetica Neue', align: 'center', margin: 0
    });
    s.addText(ph.cnTitle || '', {
      x: px, y: headerY + 0.48, w: phaseW - 0.06, h: 0.40,
      fontSize: 15, color: 'FFFFFF', bold: true,
      fontFace: 'Microsoft YaHei', align: 'center', margin: 0
    });

    // 标签矩阵
    const tags = ph.tags || [];
    tags.forEach((tag, j) => {
      const row = j % rows;
      const col = Math.floor(j / rows);
      const colCount = Math.ceil(tags.length / rows);
      const tagW = (phaseW - 0.06) / Math.max(colCount, 1);
      const tx = px + col * tagW;
      const ty = contentY + row * (tagH + 0.08);

      s.addShape(pres.ShapeType.rect, {
        x: tx + 0.04, y: ty, w: tagW - 0.08, h: tagH,
        fill: { color: c + '28' }
      });
      s.addText(tag, {
        x: tx + 0.04, y: ty, w: tagW - 0.08, h: tagH,
        fontSize: 11, color: c, bold: false,
        fontFace: 'Microsoft YaHei', align: 'center', valign: 'middle', margin: 0
      });
    });
  });

  // 外框
  s.addShape(pres.ShapeType.rect, {
    x: matX, y: headerY, w: matW, h: headerH + contentH + 0.08,
    fill: { type: 'none' }, line: { color: 'D8E4F0', width: 0.6 }
  });

  addFooter(s, pageNum, false);
}
```

---

## 版式 17 — 内容页：产品蓝图全幅（顶部双栏带状 + 主体分区 + 右侧面板）

**适用**：产品对外蓝图、平台能力全景、AI平台整体架构等"顶部 Agent/SaaS 层 + 中间平台层 + 右侧生态栏"三段布局。参考金蝶AI苍穹平台产品蓝图（对外）页。

```javascript
// headerBands: [
//   { label:'智能体', labelColor:'FFFFFF', bgColor:'2B2C6E',
//     items:['人力Agents','财务Agents','研发Agents','生产Agents','采购Agents','销售Agents','开发Agents','数据Agents'] },
//   { label:'SaaS产品', labelColor:'FFFFFF', bgColor:'1770EA',
//     items:['金蝶云星瀚','金蝶云星空','金蝶云星辰','ISV产品','客户定制应用'] }
// ]
// bodyBgColor: '6B4FBE'  （主体区域深色背景，默认为蓝紫色）
// bodyRows: [
//   { label:'平台套件', labelBg:'5040A0', labelColor:'FFFFFF',
//     cells:['Agent开发平台','应用开发平台','集成平台','分析平台'],
//     overlayLabel:'生产力工具', overlayColor:'FFC000' },
//   { label:'可信', labelBg:'3D3080', labelColor:'00CBFF',
//     cells:['加密&脱敏','安全与合规','隐私保护','身份&权限','备份&归档'] },
//   { label:'模型', labelBg:'3D3080', labelColor:'00CBFF',
//     cells:['金蝶原厂模型','第三方模型','客户定制模型'],
//     overlayLabel:'技术底座', overlayColor:'FFC000' },
//   { label:'数据', cells:['数据存储','数据连接','数据资产'] },
//   { label:'云原生', labelColor:'00CBFF', cells:['微服务','容器','多租户','多云适配','多中间件适配','安全可控'] }
// ]
// rightPanel: { label:'生态', bgColor:'4B3898',
//   items:['应用市场','开发者社区','赋能与认证','生态运营'],
//   overlayLabel:'开放生态', overlayColor:'FFC000' }
function addProductBlueprintSlide(pres, A, { title, headerBands, bodyBgColor, bodyRows, rightPanel }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);

  // ── 标题 ──────────────────────────────────────────────────────────
  s.addText(title, {
    x: 0.30, y: 0.10, w: 11.80, h: 0.48,
    fontSize: 20, color: '262626', bold: true,
    fontFace: 'Microsoft YaHei', margin: 0, valign: 'middle'
  });

  // ── 顶部双栏带状区 ─────────────────────────────────────────────────
  const bandY = 0.66;
  const bandH = 1.05;
  const bands = headerBands || [];
  const totalBandW = 12.85;
  const leftBandW = bands.length === 2 ? totalBandW * 0.62 : totalBandW;
  const rightBandW = totalBandW - leftBandW - 0.12;
  const bandX = 0.25;

  bands.forEach((band, bi) => {
    const bx = bi === 0 ? bandX : bandX + leftBandW + 0.12;
    const bw = bi === 0 ? leftBandW : rightBandW;
    const bc = band.bgColor || (bi === 0 ? '2B2C6E' : '1770EA');

    s.addShape(pres.ShapeType.rect, {
      x: bx, y: bandY, w: bw, h: bandH,
      fill: { color: bc }
    });
    // 带标签（左上角小标）
    s.addText(band.label, {
      x: bx + 0.12, y: bandY + 0.10, w: 1.10, h: 0.32,
      fontSize: 12, color: band.labelColor || 'FFFFFF', bold: true,
      fontFace: 'Microsoft YaHei', margin: 0
    });
    // 条目（均分排列）
    const items = band.items || [];
    if (items.length) {
      const itemW = (bw - 1.30) / items.length;
      items.forEach((item, j) => {
        const ix = bx + 1.30 + j * itemW;
        s.addShape(pres.ShapeType.rect, {
          x: ix + 0.05, y: bandY + 0.22, w: itemW - 0.10, h: 0.62,
          fill: { color: 'FFFFFF', transparency: 85 }
        });
        s.addText(item, {
          x: ix + 0.05, y: bandY + 0.22, w: itemW - 0.10, h: 0.62,
          fontSize: 11, color: band.labelColor || 'FFFFFF',
          fontFace: 'Microsoft YaHei', align: 'center', valign: 'middle', margin: 0
        });
      });
    }
  });

  // ── 主体区域 ───────────────────────────────────────────────────────
  const bodyY = bandY + bandH + 0.10;
  const bodyH = 7.30 - bodyY;
  const rightPanelW = rightPanel ? 2.55 : 0;
  const bodyZoneW = 12.85 - rightPanelW - (rightPanel ? 0.12 : 0);
  const bodyZoneX = 0.25;
  const bgC = bodyBgColor || '5A3FA0';

  // 主体背景色块
  s.addShape(pres.ShapeType.rect, {
    x: bodyZoneX, y: bodyY, w: bodyZoneW, h: bodyH,
    fill: { color: bgC }
  });

  // 分行渲染
  const rows = bodyRows || [];
  const rowH = bodyH / Math.max(rows.length, 1);
  const rowLabelW = 1.0;

  rows.forEach((row, i) => {
    const ry = bodyY + i * rowH;
    const labelBg = row.labelBg || bgC;
    const labelColor = row.labelColor || 'FFFFFF';

    // 行标签
    s.addShape(pres.ShapeType.rect, {
      x: bodyZoneX, y: ry + 0.04, w: rowLabelW - 0.06, h: rowH - 0.08,
      fill: { color: labelBg }
    });
    s.addText(row.label, {
      x: bodyZoneX, y: ry + 0.04, w: rowLabelW - 0.06, h: rowH - 0.08,
      fontSize: 13, color: labelColor, bold: true,
      fontFace: 'Microsoft YaHei', align: 'center', valign: 'middle', margin: 0
    });

    // 单元格
    const cellAreaX = bodyZoneX + rowLabelW;
    const cellAreaW = bodyZoneW - rowLabelW;
    const cells = row.cells || [];
    const cellW = cellAreaW / Math.max(cells.length, 1);

    cells.forEach((cell, j) => {
      const cx = cellAreaX + j * cellW;
      s.addShape(pres.ShapeType.rect, {
        x: cx + 0.06, y: ry + 0.08, w: cellW - 0.12, h: rowH - 0.16,
        fill: { color: 'FFFFFF', transparency: 88 },
        line: { color: 'FFFFFF', width: 0.3, transparency: 60 }
      });
      s.addText(cell, {
        x: cx + 0.06, y: ry + 0.08, w: cellW - 0.12, h: rowH - 0.16,
        fontSize: 12, color: 'FFFFFF',
        fontFace: 'Microsoft YaHei', align: 'center', valign: 'middle', margin: 0
      });
    });

    // 浮动标签（overlayLabel）
    if (row.overlayLabel) {
      const oc = row.overlayColor || 'FFC000';
      s.addText(row.overlayLabel, {
        x: cellAreaX + cellAreaW * 0.35, y: ry + rowH * 0.25,
        w: 2.20, h: 0.42,
        fontSize: 18, color: oc, bold: true,
        fontFace: 'Microsoft YaHei', align: 'center', margin: 0
      });
    }
  });

  // ── 右侧面板 ────────────────────────────────────────────────────────
  if (rightPanel) {
    const rpX = bodyZoneX + bodyZoneW + 0.12;
    const rpBg = rightPanel.bgColor || '3B2880';

    s.addShape(pres.ShapeType.rect, {
      x: rpX, y: bodyY, w: rightPanelW, h: bodyH,
      fill: { color: rpBg }
    });
    s.addText(rightPanel.label || '生态', {
      x: rpX, y: bodyY + 0.10, w: rightPanelW, h: 0.40,
      fontSize: 15, color: 'FFFFFF', bold: true,
      fontFace: 'Microsoft YaHei', align: 'center', margin: 0
    });

    // 右侧面板浮动大标签
    if (rightPanel.overlayLabel) {
      const oc = rightPanel.overlayColor || 'FFC000';
      s.addText(rightPanel.overlayLabel, {
        x: rpX, y: bodyY + 0.55, w: rightPanelW, h: 0.40,
        fontSize: 16, color: oc, bold: true,
        fontFace: 'Microsoft YaHei', align: 'center', margin: 0
      });
    }

    // 右侧条目列表
    const rpItems = rightPanel.items || [];
    rpItems.forEach((item, k) => {
      const iy = bodyY + 1.05 + k * ((bodyH - 1.10) / Math.max(rpItems.length, 1));
      s.addShape(pres.ShapeType.rect, {
        x: rpX + 0.12, y: iy, w: rightPanelW - 0.24, h: 0.50,
        fill: { color: 'FFFFFF', transparency: 85 }
      });
      s.addText(item, {
        x: rpX + 0.12, y: iy, w: rightPanelW - 0.24, h: 0.50,
        fontSize: 13, color: 'FFFFFF',
        fontFace: 'Microsoft YaHei', align: 'center', valign: 'middle', margin: 0
      });
    });
  }

  addFooter(s, pageNum, false);
}
```

---

## 版式选择速查

| 场景描述 | 推荐版式 |
|---------|---------|
| 核心论点 / 战略方向 | 04 要点列表 |
| 数据指标 / KPI / 成果 | 05 数据卡片 |
| 新旧对比 / 方案对比 | 06 左右对比 |
| 实施步骤 / 工作流 | 07 横向流程 |
| 产品截图 / 案例 | 08 图文并排 |
| 项目路线图 / 里程碑 | 09 时间轴 |
| 架构图 + 右侧信息面板组 | 11 左大区+右面板 |
| 用户画像 / 痛点 / 机遇 三列 | 12 三列洞察卡 |
| 失败归因 vs 破局机会（双列映射） | 13 双列归因对比 |
| 三大价值/能力/特性（带底部装饰） | 14 三列特性卡 |
| 开发者平台蓝图 / 能力全景图 | 15 全幅分层矩阵 |
| 运营漏斗 / AARRR 框架矩阵 | 16 横向漏斗矩阵 |
| AI平台产品蓝图（Agent/SaaS带+平台层+生态） | 17 产品蓝图全幅 |
