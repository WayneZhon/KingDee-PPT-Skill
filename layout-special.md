# 金蝶 PPT 特殊版式 Layout Special v3.1
> 版式编号：26-29
> 用途：图标+文字行、半出血叠加、悬浮统计、对比栏 + 版式速查表
>
> **依赖**：需先引用 layout-base.md 和 design-tokens.md

---

## 版式 26 — 图标+文字行（Icon Row List）

**Vibe**：专业严谨 ｜**场景**：功能列举、优势说明、服务条目（横向行排，每行图标+标题+描述）

```javascript
/**
 * 4–5 行图标+文字行排版
 * rows: [
 *   { icon:'⚡', color:'2971EB', title:'极速响应', body:'毫秒级处理，零感知等待' },
 *   { icon:'🔒', color:'05C8C8', title:'安全合规', body:'等保三级，数据主权可控' },
 *   { icon:'🌐', color:'966EFF', title:'生态开放', body:'2800+ ISV 认证合作伙伴' },
 *   { icon:'📊', color:'FFB61A', title:'智能洞察', body:'AI 驱动实时分析与趋势预测' },
 * ]
 * 布局：左侧彩色圆圈图标（Ø 0.52"）→ 粗体标题（18pt）→ 描述文字（14pt）
 * 间距：行间 0.30"，边距 0.50"（符合设计规范）
 */
function addIconRowSlide(pres, A, { title, subtitle, rows }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);

  const MARGIN  = 0.50;           // 左边距（0.5" 规范）
  const ROW_GAP = 0.30;           // 行间距（0.3" 规范）
  const ICO_R   = 0.26;           // 圆形图标半径
  const ICO_D   = ICO_R * 2;      // 直径 0.52"
  const ROW_H   = 0.85;           // 每行高度
  const START_Y = 1.55;
  const TEXT_X  = MARGIN + ICO_D + 0.22;  // 文字起始 x
  const TEXT_W  = 13.333 - TEXT_X - MARGIN;

  (rows || []).slice(0, 5).forEach((row, i) => {
    const rowY = START_Y + i * (ROW_H + ROW_GAP);
    const col  = row.color || COLOR_SEQ[i % COLOR_SEQ.length];

    // 彩色圆圈（垂直居中于行）
    const icoCY = rowY + ROW_H / 2;
    s.addShape(pres.ShapeType.oval, {
      x: MARGIN, y: icoCY - ICO_R, w: ICO_D, h: ICO_D,
      fill: { color: col }, line: { type: 'none' },
      shadow: { type: 'outer', blur: 6, offset: 2, angle: 135, color: col, opacity: 0.25 },
    });
    if (row.icon) {
      s.addText(row.icon, {
        x: MARGIN, y: icoCY - ICO_R, w: ICO_D, h: ICO_D,
        fontSize: 18, fontFace: 'Microsoft YaHei',
        color: 'FFFFFF', align: 'center', valign: 'middle', margin: 0,
      });
    }

    // 粗体标题
    s.addText(row.title || '', {
      x: TEXT_X, y: rowY, w: TEXT_W, h: 0.38,
      fontSize: 18, bold: true, color: '373838',
      fontFace: 'Microsoft YaHei', valign: 'middle', margin: 0,
    });

    // 描述文字
    if (row.body) {
      s.addText(row.body, {
        x: TEXT_X, y: rowY + 0.40, w: TEXT_W, h: 0.42,
        fontSize: 14, color: 'BFBFBF',
        fontFace: 'Microsoft YaHei', valign: 'top', margin: 0, wrap: true,
      });
    }

    // 行底分隔线（最后一行不加）
    if (i < (rows || []).length - 1) {
      s.addShape(pres.ShapeType.line, {
        x: MARGIN, y: rowY + ROW_H + ROW_GAP / 2,
        w: 13.333 - MARGIN * 2, h: 0,
        line: { color: 'E7F1FF', width: 0.5 },
      });
    }
  });

  addFooter(s, pageNum, false);
}
```

---

## 版式 27 — 半出血叠加页（Half-Bleed Overlay）

**Vibe**：活力生态 ｜**场景**：产品截图+功能说明、案例展示+数字亮点、图片为主带内容标注

```javascript
/**
 * 右侧全幅出血图片（60% 宽），内容卡片叠加在图片左侧区域
 * 与版式 17（图文沉浸）的区别：内容卡叠加在图片上方，而非纯白文字区
 *
 * imgData:   base64 图片（必须提供；无图则用品牌色占位块）
 * imgSide:   'right'（默认）或 'left'
 * overlayCards: [{ icon, stat, label }]  叠加统计卡（最多 3 个）
 * points:    [{ text, bold }]  主文字要点（最多 4 条）
 */
function addHalfBleedOverlaySlide(pres, A, { title, imgData, imgSide = 'right', overlayCards, points }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, imgSide === 'left');  // 图在左时用白色 logo

  const IMG_W  = 7.80;   // 图片宽度（~58%）
  const IMG_H  = 7.50;   // 全高出血
  const CARD_W = 5.10;   // 内容区宽度
  const MARGIN = 0.50;

  const imgX = imgSide === 'right' ? 13.333 - IMG_W : 0;
  const txtX = imgSide === 'right' ? MARGIN : IMG_W + 0.40;

  // 全幅图片（从顶到底出血）
  if (imgData) {
    s.addImage({ data: imgData, x: imgX, y: 0, w: IMG_W, h: IMG_H,
      sizing: { type: 'cover', w: IMG_W, h: IMG_H } });
  } else {
    s.addShape(pres.ShapeType.rect, { x: imgX, y: 0, w: IMG_W, h: IMG_H,
      fill: { color: '28245F' } });
    s.addText('[图片占位]', { x: imgX, y: IMG_H/2-0.3, w: IMG_W, h: 0.6,
      fontSize: 14, color: 'BFBFBF', align: 'center', italic: true,
      fontFace: 'Microsoft YaHei', margin: 0 });
  }

  // 左/右内容区
  // 标题
  s.addText(title || '', {
    x: txtX, y: 0.80, w: CARD_W, h: 0.72,
    fontSize: 22, bold: true, color: '373838',
    fontFace: 'Microsoft YaHei', valign: 'middle', margin: 0,
  });

  // 主要点列表
  const items = (points || []).map((p, i) => ({
    text: p.text,
    options: {
      bullet: true,
      breakLine: i < points.length - 1,
      fontSize: p.bold ? 17 : 15,
      color: p.bold ? '2971EB' : '373838',
      bold: p.bold || false,
      fontFace: 'Microsoft YaHei',
      paraSpaceAfter: 14,
    }
  }));
  if (items.length) {
    s.addText(items, {
      x: txtX, y: 1.68, w: CARD_W, h: 3.40,
      valign: 'top', fontFace: 'Microsoft YaHei',
    });
  }

  // 叠加统计卡（浮于底部，叠加在图片上）
  if (overlayCards && overlayCards.length) {
    const n     = Math.min(overlayCards.length, 3);
    const cW    = (IMG_W - 0.30 * (n + 1)) / n;
    const cH    = 1.20;
    const cY    = IMG_H - cH - 0.40;

    overlayCards.slice(0, n).forEach((oc, i) => {
      const cx = imgX + 0.30 + i * (cW + 0.30);
      // 半透明白色底卡
      s.addShape(pres.ShapeType.rect, {
        x: cx, y: cY, w: cW, h: cH,
        fill: { color: 'FFFFFF', transparency: 15 },
        rectRadius: 0.12, shadow: mkShS(),
      });
      // 大数字
      if (oc.stat) {
        s.addText(oc.stat, {
          x: cx + 0.10, y: cY + 0.08, w: cW - 0.20, h: 0.60,
          fontSize: 28, bold: true, color: '2971EB',
          fontFace: 'Microsoft YaHei', align: 'center', valign: 'middle', margin: 0,
        });
      }
      // 标签
      if (oc.label) {
        s.addText(oc.label, {
          x: cx + 0.10, y: cY + 0.72, w: cW - 0.20, h: 0.38,
          fontSize: 12, color: '373838',
          fontFace: 'Microsoft YaHei', align: 'center', valign: 'top', margin: 0,
        });
      }
    });
  }

  addFooter(s, pageNum, false);
}
```

---

## 版式 28 — 悬浮统计页（Floating Stats）

**Vibe**：极简震撼 ｜**场景**：2–4 个关键数据，白底无卡片容器，数字直接呼吸在版面上

```javascript
/**
 * 与版式 11（数据看板）的区别：无卡片底色，数字直接浮于白底，呼吸感极强
 * 适合：年报关键数字、成果页、背景有图的数字摘要
 *
 * stats: [
 *   { value:'8.4B', unit:'元', label:'生态总GMV', sub:'同比 +83.7%', color:'2971EB' },
 *   { value:'+83%', unit:'',  label:'年增长率',  sub:'连续三年',      color:'22AAFE' },
 *   { value:'2800+',unit:'',  label:'ISV伙伴',   sub:'覆盖全行业',   color:'05C8C8' },
 * ]
 * 大数字字号：60–72pt（按数量自适应）
 */
function addFloatingStatsSlide(pres, A, { title, subtitle, stats }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);

  const n      = Math.min((stats || []).length, 4);
  if (n === 0) { addFooter(s, pageNum, false); return; }

  const MARGIN = 0.50;
  const GAP    = 0.50;
  const totalW = 13.333 - MARGIN * 2;
  const colW   = (totalW - GAP * (n - 1)) / n;
  const START_Y = subtitle ? 1.40 : 1.60;
  const NUM_FS = n <= 2 ? 72 : (n === 3 ? 66 : 60);

  stats.slice(0, n).forEach((stat, i) => {
    const cx    = MARGIN + i * (colW + GAP);
    const col   = stat.color || COLOR_SEQ[i % COLOR_SEQ.length];

    // 顶部品牌色细线（2pt，宽 0.60"）
    s.addShape(pres.ShapeType.line, {
      x: cx, y: START_Y, w: 0.60, h: 0,
      line: { color: col, width: 2.5 },
    });

    // 超大数字
    const numText = (stat.value || '') + (stat.unit || '');
    s.addText(numText, {
      x: cx, y: START_Y + 0.20, w: colW, h: 1.80,
      fontSize: NUM_FS, bold: true, color: col,
      fontFace: 'Microsoft YaHei', valign: 'middle', margin: 0,
      fit: 'shrink',
    });

    // 标签（粗体中号）
    s.addText(stat.label || '', {
      x: cx, y: START_Y + 2.10, w: colW, h: 0.48,
      fontSize: 16, bold: true, color: '373838',
      fontFace: 'Microsoft YaHei', valign: 'middle', margin: 0,
    });

    // 副说明（小字，品牌色）
    if (stat.sub) {
      s.addText(stat.sub, {
        x: cx, y: START_Y + 2.62, w: colW, h: 0.38,
        fontSize: 13, color: col,
        fontFace: 'Microsoft YaHei', valign: 'top', margin: 0,
      });
    }
  });

  addFooter(s, pageNum, false);
}
```

---

## 版式 29 — 对比栏（Before / After / Pros & Cons）

**Vibe**：专业严谨 ｜**场景**：前后对比、优缺点、两方案并排比较

```javascript
/**
 * 两栏对比，中央垂直分隔
 * left:  { header, headerColor, points: string[] }
 * right: { header, headerColor, points: string[] }
 * dividerLabel: 分隔线中央标签（可选，如 'VS'）
 *
 * 示例：
 * left:  { header:'传统 ERP', headerColor:'28245F', points:['烟囱式独立应用','人工编码为主','按项目收费'] }
 * right: { header:'AI 原生', headerColor:'2971EB', points:['Skill化原子能力','SDD规范驱动','SaaS订阅+分润'] }
 * dividerLabel: 'VS'
 */
function addCompareSlide(pres, A, { title, subtitle, left, right, dividerLabel }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);

  const MARGIN  = 0.50;
  const GAP     = 0.28;           // 中央分隔区宽度
  const TOTAL_W = 13.333 - MARGIN * 2;
  const COL_W   = (TOTAL_W - GAP) / 2;
  const START_Y = subtitle ? 1.42 : 1.60;
  const HEADER_H = 0.60;
  const BODY_H   = 7.50 - START_Y - HEADER_H - 0.40;
  const lX = MARGIN;
  const rX = MARGIN + COL_W + GAP;
  const divX = MARGIN + COL_W;

  // ── 左侧表头
  const lCol = (left && left.headerColor) || '28245F';
  s.addShape(pres.ShapeType.rect, {
    x: lX, y: START_Y, w: COL_W, h: HEADER_H,
    fill: { color: lCol }, line: { type: 'none' },
  });
  s.addText((left && left.header) || '选项 A', {
    x: lX + 0.20, y: START_Y, w: COL_W - 0.40, h: HEADER_H,
    fontSize: 18, bold: true, color: 'FFFFFF',
    fontFace: 'Microsoft YaHei', valign: 'middle', margin: 0,
  });

  // ── 右侧表头
  const rCol = (right && right.headerColor) || '2971EB';
  s.addShape(pres.ShapeType.rect, {
    x: rX, y: START_Y, w: COL_W, h: HEADER_H,
    fill: { color: rCol }, line: { type: 'none' },
  });
  s.addText((right && right.header) || '选项 B', {
    x: rX + 0.20, y: START_Y, w: COL_W - 0.40, h: HEADER_H,
    fontSize: 18, bold: true, color: 'FFFFFF',
    fontFace: 'Microsoft YaHei', valign: 'middle', margin: 0,
  });

  // ── 内容区底色
  s.addShape(pres.ShapeType.roundRect, {
    x: lX, y: START_Y + HEADER_H, w: COL_W, h: BODY_H,
    fill: { color: 'E7F1FF' }, rectRadius: 0.15, line: { type: 'none' }, shadow: mkShS(),
  });
  s.addShape(pres.ShapeType.roundRect, {
    x: rX, y: START_Y + HEADER_H, w: COL_W, h: BODY_H,
    fill: { color: 'E7F1FF' }, rectRadius: 0.15, line: { type: 'none' }, shadow: mkShS(),
  });

  // ── 左侧要点（左对齐）
  if (left && left.points && left.points.length) {
    const items = left.points.map((p, i) => ({
      text: p,
      options: {
        bullet: { type: 'bullet', indent: 10 },
        breakLine: i < left.points.length - 1,
        fontSize: 15, color: '373838', bold: false,
        fontFace: 'Microsoft YaHei', paraSpaceAfter: 12,
      }
    }));
    s.addText(items, {
      x: lX + 0.22, y: START_Y + HEADER_H + 0.20,
      w: COL_W - 0.44, h: BODY_H - 0.30,
      valign: 'top', fontFace: 'Microsoft YaHei',
    });
  }

  // ── 右侧要点（左对齐）
  if (right && right.points && right.points.length) {
    const items = right.points.map((p, i) => ({
      text: p,
      options: {
        bullet: { type: 'bullet', indent: 10 },
        breakLine: i < right.points.length - 1,
        fontSize: 15, color: '373838', bold: false,
        fontFace: 'Microsoft YaHei', paraSpaceAfter: 12,
      }
    }));
    s.addText(items, {
      x: rX + 0.22, y: START_Y + HEADER_H + 0.20,
      w: COL_W - 0.44, h: BODY_H - 0.30,
      valign: 'top', fontFace: 'Microsoft YaHei',
    });
  }

  // ── 中央分隔线
  const divMidX = divX + GAP / 2;
  s.addShape(pres.ShapeType.line, {
    x: divMidX, y: START_Y + 0.10,
    w: 0, h: HEADER_H + BODY_H - 0.20,
    line: { color: 'BFBFBF', width: 1, dashType: 'dash' },
  });

  // 可选中央标签（如 'VS'）
  if (dividerLabel) {
    s.addShape(pres.ShapeType.oval, {
      x: divMidX - 0.28, y: START_Y + HEADER_H / 2 - 0.28,
      w: 0.56, h: 0.56,
      fill: { color: 'FFFFFF' }, line: { color: 'BFBFBF', width: 1 },
      shadow: mkShS(),
    });
    s.addText(dividerLabel, {
      x: divMidX - 0.28, y: START_Y + HEADER_H / 2 - 0.28,
      w: 0.56, h: 0.56,
      fontSize: 12, bold: true, color: 'BFBFBF',
      fontFace: 'Microsoft YaHei', align: 'center', valign: 'middle', margin: 0,
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
| 功能列举 / 服务条目 | **26 图标+文字行** | 活力生态 |
| 数据指标 / KPI | 05 数据卡片 / **11 大数字看板** | 通用 / 极简 |
| 关键数字悬浮展示 | **28 悬浮统计** | 极简震撼 |
| 新旧对比 / 优缺点 | **29 对比栏** | 专业严谨 |
| 矩阵/成熟度对比 | 15 分层矩阵 | 专业严谨 |
| 实施步骤 / 工作流 | 07 横向流程 | 专业严谨 |
| 产品截图 / 案例 | 08 图文并排 / **17 图文沉浸** | 通用 / 活力 |
| 图片主导+数字叠加 | **27 半出血叠加** | 活力生态 |
| 项目路线图 / 里程碑 | 09 时间轴 | 通用 |
| **核心特性矩阵** | **12 Bento Grid** | 极简 / 活力 |
| **平台架构 / 生态体系** | **13 架构生态** | 专业严谨 |
| **功能列举 / 亮点介绍** | **14 核心特性卡片** | 活力生态 |
| **战略金句 / CEO宣言** | **16 金句引言页** | 极简震撼 |
| **年度封底 / 战略口号** | **18 超大焦点页** | 极简震撼 |
| **核心主张 + 三大支柱** | **19 金字塔/MECE** | 专业严谨 |
| **复盘述职 / 持续改进** | **20 PDCA 循环** | 专业严谨 |
| **竞争/战略 四象限分析** | **21 SWOT 矩阵** | 专业严谨 |
| **品牌故事 / WHY演讲** | **22 黄金圈** | 极简震撼 |
| **方案说明 / 项目计划** | **23 5W1H 六格** | 专业严谨 |
| **提案 / 问题分析报告** | **24 SCQA 四步** | 专业严谨 |
| **战略发布 / 市场全景** | **25 IPD 五看** | 专业严谨 |