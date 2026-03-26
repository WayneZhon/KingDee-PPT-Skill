# 金蝶 PPT 版式预设 — Advanced（版式 11-18）
> 本文件包含高级视觉版式，**仅在大纲中出现版式11-18时才需加载**。
> 基础函数（bentoCard、mkSh、addLogo等）已在 `layout-presets-base.md` 中定义。
> v2.0 新增：版式 11-18（Bento Grid 系列、数据看板、架构生态、金句页等）

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
      fontFace: 'Microsoft YaHei',
      valign: 'middle', margin: 0, fit: 'shrink',
    });

    // 副说明（同比/环比）
    if (m.sub) {
      s.addText(m.sub, {
        x: x + 0.20, y: cY + 2.40, w: cW - 0.40, h: 0.40,
        fontSize: 14, bold: true,
        color: isMain ? '00CCFE' : '1770EA',
        fontFace: 'Microsoft YaHei', margin: 0,
      });
    }

    // 迷你折线图（可选）
    if (m.trend && m.trend.length >= 2) {
      const chartX = x + 0.20, chartY = cY + 3.00;
      const chartW = cW - 0.40, chartH = 1.80;
      const lineColor = isMain ? '00CCFE' : col;
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
        line: { type: 'none' },
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
        fontSize: 22, fontFace: 'Microsoft YaHei',
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
      s.addShape(pres.ShapeType.rect, { x:cx, y:ry, w:colW, h:rowH, fill:{ color: isEven ? 'F5F7FA' : 'EBF3FF' }, line:{ type:'none' }, shadow: mkShS() });
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
      fontFace: 'Microsoft YaHei',
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
