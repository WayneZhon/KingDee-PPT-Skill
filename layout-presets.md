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

## 版式选择速查

| 场景描述 | 推荐版式 |
|---------|---------|
| 核心论点 / 战略方向 | 04 要点列表 |
| 数据指标 / KPI / 成果 | 05 数据卡片 |
| 新旧对比 / 方案对比 | 06 左右对比 |
| 实施步骤 / 工作流 | 07 横向流程 |
| 产品截图 / 案例 | 08 图文并排 |
| 项目路线图 / 里程碑 | 09 时间轴 |
