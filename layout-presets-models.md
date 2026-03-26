# 金蝶 PPT 版式预设 — 思维模型（版式 19-25）
> 本文件包含思维模型版式，**仅在大纲中检测到思维模型（PDCA/SWOT/金字塔/黄金圈/5W1H/SCQA/IPD五看）时才需加载**。
> 基础函数（mkSh、mkShS、addLogo、addContentTitle等）已在 `layout-presets-base.md` 中定义。

---

## 版式 19 — 金字塔 / MECE 版式

**Vibe**：专业严谨 ｜**场景**：核心主张 + 三大支柱 + 论据，汇报/战略解读

```javascript
// ══════════════════════════════════════════════════════════════════════
// 版式 19 — 金字塔 / MECE 版式
// ══════════════════════════════════════════════════════════════════════
/**
 * addPyramidSlide — 金字塔 / MECE 三层结构
 *
 * @param {Object} data
 *   title      {string}   页面标题
 *   subtitle   {string}   副标题（可选）
 *   conclusion {string}   顶层核心结论（一句话）
 *   pillars    {Array}    三大分论点，每项 { label, points: string[] }
 */
function addPyramidSlide(pres, A, data, pageNum) {
  const { title, subtitle, conclusion, pillars = [] } = data;
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);
  addFooter(s, pageNum, false);

  const GX = 0.434, GY = 1.48, GW = 12.256, GAP = 0.12;

  // ── 顶层：结论条（主蓝全宽）
  const topH = 0.72;
  s.addShape(pres.ShapeType.rect, {
    x: GX, y: GY, w: GW, h: topH,
    fill: { color: '1770EA' }, line: { type: 'none' }, shadow: mkSh(),
  });
  s.addText(conclusion || '核心结论', {
    x: GX + 0.28, y: GY, w: GW - 0.56, h: topH,
    fontSize: 20, bold: true, color: 'FFFFFF',
    fontFace: 'Microsoft YaHei', valign: 'middle',
  });

  // ── 中层：三大分论点（金黄色等宽三列）
  const midY = GY + topH + GAP;
  const midH = 0.60;
  const colW = (GW - GAP * 2) / 3;

  const p3 = pillars.length >= 3 ? pillars.slice(0, 3)
    : [...pillars, ...Array(3 - pillars.length).fill({ label: '分论点', points: [] })];

  p3.forEach((pillar, i) => {
    const cx = GX + i * (colW + GAP);
    s.addShape(pres.ShapeType.rect, {
      x: cx, y: midY, w: colW, h: midH,
      fill: { color: 'FFB800' }, line: { type: 'none' }, shadow: mkShS(),
    });
    s.addText(pillar.label || `分论点 ${i + 1}`, {
      x: cx + 0.15, y: midY, w: colW - 0.30, h: midH,
      fontSize: 16, bold: true, color: '1A1A3E',
      fontFace: 'Microsoft YaHei', valign: 'middle', align: 'center',
    });
  });

  // ── 底层：三列论据区（浅灰蓝底）
  const botY = midY + midH + GAP;
  const botH = 7.5 - 0.20 - botY;

  p3.forEach((pillar, i) => {
    const cx = GX + i * (colW + GAP);
    s.addShape(pres.ShapeType.rect, {
      x: cx, y: botY, w: colW, h: botH,
      fill: { color: 'EEF2FF' }, line: { type: 'none' }, shadow: mkShS(),
    });
    const pts = (pillar.points || []).slice(0, 4);
    if (pts.length) {
      const items = pts.map((pt, j) => ({
        text: pt,
        options: {
          breakLine: j < pts.length - 1,
          fontSize: 13, color: '333355',
          fontFace: 'Microsoft YaHei', paraSpaceAfter: 14,
          bullet: { type: 'char', code: '25CF', color: '1770EA', size: 60 },
        },
      }));
      s.addText(items, {
        x: cx + 0.18, y: botY + 0.18, w: colW - 0.36, h: botH - 0.30,
        valign: 'top', fontFace: 'Microsoft YaHei',
      });
    }
  });
}
```

---

## 版式 20 — PDCA 循环版式

**Vibe**：专业严谨 ｜**场景**：复盘述职、质量管理、持续改进

```javascript
// ══════════════════════════════════════════════════════════════════════
// 版式 20 — PDCA 循环版式
// ══════════════════════════════════════════════════════════════════════
/**
 * addPDCASlide
 *
 * @param {Object} data
 *   title    {string}
 *   subtitle {string}
 *   pdca     { P, D, C, A }  各象限 { points: string[] }
 *
 * 色彩：P=主蓝 · D=品青 · A=紫色 · C=黄色
 * 布局：P左上 · D右上 · A左下 · C右下，中央 ↻ 循环标识
 */
function addPDCASlide(pres, A, data, pageNum) {
  const { title, subtitle, pdca = {} } = data;
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);
  addFooter(s, pageNum, false);

  const GX = 0.434, GY = 1.48, GW = 12.256, GH = 5.72;
  const GAP = 0.14;
  const cW = (GW - GAP) / 2;
  const cH = (GH - GAP) / 2;

  const CELLS = [
    { key: 'P', label: 'P  计划 Plan',  color: '1770EA', fg: 'FFFFFF', data: pdca.P },
    { key: 'D', label: 'D  执行 Do',    color: '00CBFF', fg: 'FFFFFF', data: pdca.D },
    { key: 'A', label: 'A  改进 Act',   color: '8B6FE8', fg: 'FFFFFF', data: pdca.A },
    { key: 'C', label: 'C  检查 Check', color: 'FFB800', fg: '1A1A3E', data: pdca.C },
  ];
  const COORDS = [[0,0],[1,0],[0,1],[1,1]]; // P左上·D右上·A左下·C右下

  CELLS.forEach((cell, i) => {
    const [col, row] = COORDS[i];
    const cx = GX + col * (cW + GAP);
    const cy = GY + row * (cH + GAP);

    s.addShape(pres.ShapeType.rect, {
      x: cx, y: cy, w: cW, h: cH,
      fill: { color: cell.color }, line: { type: 'none' }, shadow: mkSh(),
    });
    // 大号字母水印
    s.addText(cell.key, {
      x: cx + 0.20, y: cy + 0.12, w: 0.70, h: 0.85,
      fontSize: 56, bold: true, color: 'FFFFFF',
      fontFace: 'Microsoft YaHei', valign: 'middle',
      transparency: cell.fg === '1A1A3E' ? 30 : 20,
    });
    // 标题
    s.addText(cell.label, {
      x: cx + 0.95, y: cy + 0.22, w: cW - 1.10, h: 0.46,
      fontSize: 15, bold: true,
      color: cell.fg === '1A1A3E' ? '1A1A3E' : 'FFFFFF',
      fontFace: 'Microsoft YaHei', valign: 'middle',
    });
    // 要点
    const pts = ((cell.data && cell.data.points) || []).slice(0, 4);
    if (pts.length) {
      const items = pts.map((pt, j) => ({
        text: pt,
        options: {
          breakLine: j < pts.length - 1,
          fontSize: 13,
          color: cell.fg === '1A1A3E' ? '2A2A2A' : 'DDEEFF',
          fontFace: 'Microsoft YaHei', paraSpaceAfter: 12,
          bullet: { type: 'char', code: '25B8',
            color: cell.fg === '1A1A3E' ? '1A1A3E' : 'FFFFFF', size: 70 },
        },
      }));
      s.addText(items, {
        x: cx + 0.22, y: cy + 0.80, w: cW - 0.40, h: cH - 0.98,
        valign: 'top', fontFace: 'Microsoft YaHei',
      });
    }
  });

  // 中央循环标识
  const ox = GX + cW + GAP / 2 - 0.32;
  const oy = GY + cH + GAP / 2 - 0.32;
  s.addShape(pres.ShapeType.ellipse, {
    x: ox, y: oy, w: 0.64, h: 0.64,
    fill: { color: 'FFFFFF' }, line: { color: 'C0D0F0', pt: 2 }, shadow: mkSh(),
  });
  s.addText('↻', {
    x: ox, y: oy, w: 0.64, h: 0.64,
    fontSize: 22, color: '1770EA', align: 'center', valign: 'middle',
    fontFace: 'Microsoft YaHei',
  });
}
```

---

## 版式 21 — SWOT 矩阵版式

**Vibe**：专业严谨 ｜**场景**：生态策略、竞争分析、战略规划

```javascript
// ══════════════════════════════════════════════════════════════════════
// 版式 21 — SWOT 矩阵版式
// ══════════════════════════════════════════════════════════════════════
/**
 * addSWOTSlide
 *
 * @param {Object} data
 *   title    {string}
 *   subtitle {string}
 *   swot     { S, W, O, T }  各象限 { points: string[] }
 *
 * 色彩：S=主蓝 · O=青绿 · W=浅灰蓝(深字) · T=紫色
 * 布局：S左上 · O右上 · W左下 · T右下，含轴线标注
 */
function addSWOTSlide(pres, A, data, pageNum) {
  const { title, subtitle, swot = {} } = data;
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);
  addFooter(s, pageNum, false);

  const GX = 0.434, GY = 1.48, GW = 12.256, GH = 5.72;
  const GAP = 0.12;
  const cW = (GW - GAP) / 2;
  const cH = (GH - GAP) / 2;

  const CELLS = [
    { key: 'S', label: 'S  优势 Strengths',    headerColor: '1770EA', headerFg: 'FFFFFF', bodyColor: 'EEF4FF', data: swot.S },
    { key: 'O', label: 'O  机会 Opportunities', headerColor: '00C4A7', headerFg: 'FFFFFF', bodyColor: 'EDFAF7', data: swot.O },
    { key: 'W', label: 'W  劣势 Weaknesses',    headerColor: 'EEF2FF', headerFg: '333355', bodyColor: 'F8F8FF', data: swot.W },
    { key: 'T', label: 'T  威胁 Threats',       headerColor: '8B6FE8', headerFg: 'FFFFFF', bodyColor: 'F3F0FF', data: swot.T },
  ];
  const COORDS = [[0,0],[1,0],[0,1],[1,1]];

  CELLS.forEach((cell, i) => {
    const [col, row] = COORDS[i];
    const cx = GX + col * (cW + GAP);
    const cy = GY + row * (cH + GAP);
    const hH = 0.50;

    s.addShape(pres.ShapeType.rect, {
      x: cx, y: cy, w: cW, h: hH,
      fill: { color: cell.headerColor }, line: { type: 'none' },
    });
    s.addText(cell.label, {
      x: cx + 0.20, y: cy, w: cW - 0.30, h: hH,
      fontSize: 15, bold: true, color: cell.headerFg,
      fontFace: 'Microsoft YaHei', valign: 'middle',
    });
    s.addShape(pres.ShapeType.rect, {
      x: cx, y: cy + hH, w: cW, h: cH - hH,
      fill: { color: cell.bodyColor }, line: { color: 'DCE8F5', pt: 0.8 }, shadow: mkShS(),
    });

    const pts = ((cell.data && cell.data.points) || []).slice(0, 4);
    if (pts.length) {
      const dotColor = cell.headerColor === 'EEF2FF' ? '1770EA' : cell.headerColor;
      const items = pts.map((pt, j) => ({
        text: pt,
        options: {
          breakLine: j < pts.length - 1,
          fontSize: 13, color: '333355',
          fontFace: 'Microsoft YaHei', paraSpaceAfter: 14,
          bullet: { type: 'char', code: '25CF', color: dotColor, size: 55 },
        },
      }));
      s.addText(items, {
        x: cx + 0.22, y: cy + hH + 0.16, w: cW - 0.38, h: cH - hH - 0.24,
        valign: 'top', fontFace: 'Microsoft YaHei',
      });
    }
  });

  // 轴线标注
  const axisY = GY - 0.32;
  [{ t:'内部因素', x: GX + cW/2 - 0.8 }, { t:'外部因素', x: GX + cW + GAP + cW/2 - 0.8 }].forEach(ax => {
    s.addText(ax.t, { x: ax.x, y: axisY, w: 1.60, h: 0.28,
      fontSize: 11, color: '888888', fontFace: 'Microsoft YaHei', align: 'center' });
  });
  [{ t:'正面', y: GY + cH/2 - 0.12 }, { t:'负面', y: GY + cH + GAP + cH/2 - 0.12 }].forEach(ax => {
    s.addText(ax.t, { x: GX - 0.36, y: ax.y, w: 0.28, h: 0.28,
      fontSize: 11, color: '888888', fontFace: 'Microsoft YaHei', align: 'center', valign: 'middle' });
  });
}
```

---

## 版式 22 — 黄金圈版式（WHY / HOW / WHAT）

**Vibe**：极简震撼 ｜**场景**：产品发布、Partner 大会演讲、品牌故事

```javascript
// ══════════════════════════════════════════════════════════════════════
// 版式 22 — 黄金圈版式
// ══════════════════════════════════════════════════════════════════════
/**
 * addGoldenCircleSlide
 *
 * @param {Object} data
 *   title    {string}
 *   subtitle {string}
 *   why      { body }   核心使命（最重要）
 *   how      { body }   方法路径
 *   what     { body }   产品服务
 *
 * 左侧：WHY(主蓝内核) → HOW(品青中层) → WHAT(浅灰外层) 嵌套椭圆
 * 右侧：三行说明卡，左侧彩色竖条区分层次
 */
function addGoldenCircleSlide(pres, A, data, pageNum) {
  const { title, subtitle, why = {}, how = {}, what = {} } = data;
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);
  addFooter(s, pageNum, false);

  const cx = 3.50, cy = 4.42;

  // WHAT 外环
  s.addShape(pres.ShapeType.ellipse, {
    x: cx - 2.80, y: cy - 2.30, w: 5.60, h: 4.60,
    fill: { color: 'EEF2FF' }, line: { color: 'C8D8F8', pt: 1.5 }, shadow: mkSh(),
  });
  // HOW 中环
  s.addShape(pres.ShapeType.ellipse, {
    x: cx - 1.80, y: cy - 1.48, w: 3.60, h: 2.96,
    fill: { color: '00CBFF' }, line: { type: 'none' }, shadow: mkShS(),
  });
  // WHY 内核
  s.addShape(pres.ShapeType.ellipse, {
    x: cx - 0.90, y: cy - 0.74, w: 1.80, h: 1.48,
    fill: { color: '1770EA' }, line: { type: 'none' }, shadow: mkShS(),
  });

  s.addText('WHY',  { x: cx-0.72, y: cy-0.28, w: 1.44, h: 0.56,
    fontSize: 15, bold: true, color: 'FFFFFF', fontFace: 'Microsoft YaHei', align: 'center', valign: 'middle' });
  s.addText('HOW',  { x: cx-1.70, y: cy-0.22, w: 0.82, h: 0.44,
    fontSize: 12, bold: true, color: 'FFFFFF', fontFace: 'Microsoft YaHei', align: 'center', valign: 'middle' });
  s.addText('WHAT', { x: cx+0.88, y: cy-0.22, w: 0.90, h: 0.44,
    fontSize: 12, bold: true, color: '5577BB', fontFace: 'Microsoft YaHei', align: 'center', valign: 'middle' });

  // 右侧说明卡
  const RX = 7.00, RW = 5.60, rowH = 1.60, rowGap = 0.14, startY = 1.65;
  const rows = [
    { label: 'WHY — 为什么', color: '1770EA', body: why.body },
    { label: 'HOW — 怎么做', color: '00CBFF', body: how.body },
    { label: 'WHAT — 做什么', color: 'C0CCDD', textColor: '555566', body: what.body },
  ];
  rows.forEach((row, i) => {
    const ry = startY + i * (rowH + rowGap);
    s.addShape(pres.ShapeType.rect, { x: RX, y: ry, w: 0.10, h: rowH,
      fill: { color: row.color }, line: { type: 'none' } });
    s.addShape(pres.ShapeType.rect, { x: RX+0.10, y: ry, w: RW-0.10, h: rowH,
      fill: { color: 'F8FAFF' }, line: { color: 'DCE8F5', pt: 0.8 }, shadow: mkShS() });
    s.addText(row.label, { x: RX+0.28, y: ry+0.12, w: RW-0.44, h: 0.38,
      fontSize: 14, bold: true, color: row.textColor || row.color,
      fontFace: 'Microsoft YaHei', valign: 'middle' });
    if (row.body) {
      s.addText(row.body, { x: RX+0.28, y: ry+0.54, w: RW-0.44, h: rowH-0.66,
        fontSize: 13, color: '444455',
        fontFace: 'Microsoft YaHei', valign: 'top', lineSpacingMultiple: 1.35 });
    }
  });
}
```

---

## 版式 23 — 5W1H 六格版式

**Vibe**：专业严谨 ｜**场景**：方案说明、项目计划、活动策划（2×3 等宽格）

```javascript
// ══════════════════════════════════════════════════════════════════════
// 版式 23 — 5W1H 六格版式
// ══════════════════════════════════════════════════════════════════════
/**
 * addFiveW1HSlide
 *
 * @param {Object} data
 *   title    {string}
 *   subtitle {string}
 *   items    Array<{ key:'WHO'|'WHAT'|'WHEN'|'WHERE'|'WHY'|'HOW', label?, points:string[] }>
 *            顺序固定：WHO·WHAT·WHEN（上行）WHERE·WHY·HOW（下行）
 */
function addFiveW1HSlide(pres, A, data, pageNum) {
  const { title, subtitle, items = [] } = data;
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);
  addFooter(s, pageNum, false);

  const GX = 0.434, GY = 1.48, GW = 12.256, GH = 5.72;
  const COLS = 3, ROWS = 2, GAP = 0.12;
  const cW = (GW - GAP * (COLS-1)) / COLS;
  const cH = (GH - GAP * (ROWS-1)) / ROWS;
  const hH = 0.52;

  const DEFAULTS = [
    { key:'WHO',   label:'谁'   },
    { key:'WHAT',  label:'什么' },
    { key:'WHEN',  label:'何时' },
    { key:'WHERE', label:'何地' },
    { key:'WHY',   label:'为何' },
    { key:'HOW',   label:'如何' },
  ];

  DEFAULTS.forEach((def, i) => {
    const col = i % COLS, row = Math.floor(i / COLS);
    const cx = GX + col * (cW + GAP);
    const cy = GY + row * (cH + GAP);
    const src = items.find(it => it.key === def.key) || {};

    s.addShape(pres.ShapeType.rect, { x: cx, y: cy, w: cW, h: cH,
      fill: { color: 'F5F8FF' }, line: { type: 'none' }, shadow: mkShS() });
    s.addShape(pres.ShapeType.rect, { x: cx, y: cy, w: cW, h: hH,
      fill: { color: '1770EA' }, line: { type: 'none' } });
    s.addText(`${def.key}  ${src.label || def.label}`, {
      x: cx+0.15, y: cy, w: cW-0.30, h: hH,
      fontSize: 14, bold: true, color: 'FFFFFF',
      fontFace: 'Microsoft YaHei', valign: 'middle' });

    const pts = (src.points || []).slice(0, 3);
    if (pts.length) {
      const txtItems = pts.map((pt, j) => ({
        text: pt,
        options: {
          breakLine: j < pts.length - 1,
          fontSize: 13, color: '333355',
          fontFace: 'Microsoft YaHei', paraSpaceAfter: 14,
          bullet: { type: 'char', code: '25CF', color: '1770EA', size: 55 },
        },
      }));
      s.addText(txtItems, { x: cx+0.18, y: cy+hH+0.14, w: cW-0.34, h: cH-hH-0.22,
        valign: 'top', fontFace: 'Microsoft YaHei' });
    }
  });
}
```

---

## 版式 24 — SCQA 四步流程版式

**Vibe**：专业严谨 ｜**场景**：提案、客户大会、问题分析报告，横向四步叙事

```javascript
// ══════════════════════════════════════════════════════════════════════
// 版式 24 — SCQA 四步流程版式
// ══════════════════════════════════════════════════════════════════════
/**
 * addSCQASlide
 *
 * @param {Object} data
 *   title    {string}
 *   subtitle {string}
 *   scqa     { S, C, Q, A }  各步 { headline, body }
 *
 * 色彩：S=浅灰蓝(深字) · C=金黄 · Q=紫色 · A=主蓝
 * 每列顶部 Header + 正文区，右下角大号字母水印
 */
function addSCQASlide(pres, A, data, pageNum) {
  const { title, subtitle, scqa = {} } = data;
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);
  addFooter(s, pageNum, false);

  const GX = 0.434, GY = 1.48, GW = 12.256, GH = 5.72;
  const GAP = 0.14;
  const cW = (GW - GAP * 3) / 4;
  const hH = 0.60;

  const STEPS = [
    { key:'S', label:'情境 Situation',   color:'EEF2FF', headerFg:'333355', data: scqa.S },
    { key:'C', label:'冲突 Complication', color:'FFB800', headerFg:'1A1A3E', data: scqa.C },
    { key:'Q', label:'疑问 Question',     color:'8B6FE8', headerFg:'FFFFFF', data: scqa.Q },
    { key:'A', label:'解答 Answer',       color:'1770EA', headerFg:'FFFFFF', data: scqa.A },
  ];

  STEPS.forEach((step, i) => {
    const cx = GX + i * (cW + GAP);

    s.addShape(pres.ShapeType.rect, { x: cx, y: GY, w: cW, h: hH,
      fill: { color: step.color }, line: { type: 'none' }, shadow: mkShS() });
    s.addText(step.label, { x: cx+0.14, y: GY, w: cW-0.28, h: hH,
      fontSize: 13, bold: true, color: step.headerFg,
      fontFace: 'Microsoft YaHei', valign: 'middle' });

    // 箭头连接（最后一列不加）
    if (i < 3) {
      s.addShape(pres.ShapeType.rect, {
        x: cx+cW+0.01, y: GY+hH/2-0.02, w: GAP-0.02, h: 0.04,
        fill: { color: 'C0D0F0' }, line: { type: 'none' } });
    }

    s.addShape(pres.ShapeType.rect, { x: cx, y: GY+hH, w: cW, h: GH-hH,
      fill: { color: 'F8FAFF' }, line: { color: 'D8E8F5', pt: 0.8 }, shadow: mkShS() });

    // 大号字母水印
    s.addText(step.key, { x: cx+cW-1.00, y: GY+hH+0.05, w: 0.90, h: 1.10,
      fontSize: 64, bold: true, color: step.color,
      fontFace: 'Microsoft YaHei', align: 'right', valign: 'top', transparency: 75 });

    const d = step.data || {};
    if (d.headline) {
      s.addText(d.headline, { x: cx+0.18, y: GY+hH+0.18, w: cW-0.34, h: 0.50,
        fontSize: 14, bold: true, color: '1A2A4A',
        fontFace: 'Microsoft YaHei', valign: 'middle' });
    }
    if (d.body) {
      s.addText(d.body, { x: cx+0.18, y: GY+hH+0.74, w: cW-0.34, h: GH-hH-0.90,
        fontSize: 12.5, color: '444455',
        fontFace: 'Microsoft YaHei', valign: 'top', lineSpacingMultiple: 1.40 });
    }
  });
}
```

---

## 版式 25 — IPD 五看版式

**Vibe**：专业严谨 ｜**场景**：战略发布、生态大会、市场全景分析，5 列等宽

```javascript
// ══════════════════════════════════════════════════════════════════════
// 版式 25 — IPD 五看版式
// ══════════════════════════════════════════════════════════════════════
/**
 * addIPDFiveViewSlide
 *
 * @param {Object} data
 *   title    {string}
 *   subtitle {string}
 *   views    Array<{ num?, label?, headline, body }>
 *            顺序：看行业·看客户·看机会·看竞争·看自己
 *
 * 色彩：01主蓝·02品青·03青绿·04紫色·05主蓝（循环）
 * 顶部序号色块 + 核心观点（粗体彩色）+ 分割线 + 支撑数据
 */
function addIPDFiveViewSlide(pres, A, data, pageNum) {
  const { title, subtitle, views = [] } = data;
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);
  addFooter(s, pageNum, false);

  const GX = 0.434, GY = 1.48, GW = 12.256, GH = 5.72;
  const N = 5, GAP = 0.12;
  const cW = (GW - GAP * (N-1)) / N;
  const hH = 0.80;

  const DEFAULTS = [
    { num:'01', label:'看行业', color:'1770EA' },
    { num:'02', label:'看客户', color:'00CBFF' },
    { num:'03', label:'看机会', color:'00C4A7' },
    { num:'04', label:'看竞争', color:'8B6FE8' },
    { num:'05', label:'看自己', color:'1770EA' },
  ];

  DEFAULTS.forEach((def, i) => {
    const cx = GX + i * (cW + GAP);
    const src = views[i] || {};

    s.addShape(pres.ShapeType.rect, { x: cx, y: GY, w: cW, h: hH,
      fill: { color: def.color }, line: { type: 'none' }, shadow: mkShS() });
    s.addText(src.num || def.num, { x: cx+0.12, y: GY+0.02, w: cW-0.24, h: 0.40,
      fontSize: 22, bold: true, color: 'FFFFFF',
      fontFace: 'Microsoft YaHei', valign: 'middle' });
    s.addText(src.label || def.label, { x: cx+0.12, y: GY+0.42, w: cW-0.24, h: 0.34,
      fontSize: 13, bold: true, color: 'FFFFFF',
      fontFace: 'Microsoft YaHei', valign: 'middle' });

    s.addShape(pres.ShapeType.rect, { x: cx, y: GY+hH, w: cW, h: GH-hH,
      fill: { color: 'EEF4FF' }, line: { type: 'none' }, shadow: mkShS() });

    if (src.headline) {
      s.addText(src.headline, { x: cx+0.14, y: GY+hH+0.14, w: cW-0.28, h: 0.54,
        fontSize: 13, bold: true, color: def.color,
        fontFace: 'Microsoft YaHei', valign: 'middle', lineSpacingMultiple: 1.25 });
    }
    s.addShape(pres.ShapeType.line, {
      x: cx+0.14, y: GY+hH+0.76, w: cW-0.28, h: 0,
      line: { color: 'C8D8F0', pt: 0.8 } });
    if (src.body) {
      s.addText(src.body, { x: cx+0.14, y: GY+hH+0.86, w: cW-0.28, h: GH-hH-1.02,
        fontSize: 12, color: '444466',
        fontFace: 'Microsoft YaHei', valign: 'top', lineSpacingMultiple: 1.40 });
    }
  });
}
```
