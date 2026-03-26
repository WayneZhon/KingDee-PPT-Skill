# 金蝶 PPT 版式预设 — 视觉增强（版式 26-29）
> 本文件包含视觉增强版式，**仅在大纲中出现版式26-29时才需加载**。
> 基础函数（mkSh、mkShS、mkShB、addLogo、addContentTitle、COLOR_SEQ等）已在 `layout-presets-base.md` 中定义。
> v2.1 新增：版式 26-29（图标行列表、双栏右视觉面板、对比条形、增强步骤流程）

---

## 版式 26 — 图标行列表（Icon Row List）

**Vibe**：活力生态 ｜**场景**：功能列举、服务亮点、优势对比（纯文本幻灯片的视觉替代方案）

```javascript
// ══════════════════════════════════════════════════════════════════════
// 版式 26 — 图标行列表（Icon Row List）
// ══════════════════════════════════════════════════════════════════════
/**
 * addIconRowSlide — 彩色圆圈图标 + 粗体标题 + 下方描述（左对齐）
 * 每行结构：[彩色圆图标] [粗体标题]
 *                        [描述文字，左对齐]
 * 最多 5 行；行间距 0.30"（统一间距标准）
 * 视觉锚点：交替浅色底 + 左侧彩色细条 + 彩色图标圆
 *
 * @param {Object} data
 *   title    {string}
 *   subtitle {string}
 *   rows     Array<{ icon, title, body, color }>
 */
function addIconRowSlide(pres, A, { title, subtitle, rows = [] }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);
  addFooter(s, pageNum, false);

  const n = Math.min(rows.length, 5);
  if (n === 0) return;

  const ROW_GAP = 0.30;                // 统一行间距
  const sY = 1.55, totalH = 5.65;
  const ROW_H = (totalH - ROW_GAP * (n - 1)) / n;
  const sX     = 0.500;               // ≥ 0.5" 最小边距
  const totalW = 12.190;
  const ICON_R = 0.33;
  const textX  = sX + ICON_R * 2 + 0.28;
  const textW  = totalW - (ICON_R * 2 + 0.28);

  rows.slice(0, n).forEach((row, i) => {
    const ry  = sY + i * (ROW_H + ROW_GAP);
    const col = row.color || COLOR_SEQ[i % COLOR_SEQ.length];
    const icoCX = sX + ICON_R;
    const icoCY = ry + ROW_H / 2;

    // 交替浅色底
    if (i % 2 === 0) {
      s.addShape(pres.ShapeType.rect, {
        x: sX - 0.06, y: ry, w: totalW + 0.10, h: ROW_H,
        fill: { color: 'F5F8FF' }, line: { type: 'none' },
      });
    }

    // 左侧彩色细条（视觉锚点）
    s.addShape(pres.ShapeType.rect, {
      x: sX - 0.06, y: ry, w: 0.07, h: ROW_H,
      fill: { color: col }, line: { type: 'none' },
    });

    // 彩色圆圈图标
    s.addShape(pres.ShapeType.oval, {
      x: icoCX - ICON_R, y: icoCY - ICON_R,
      w: ICON_R * 2, h: ICON_R * 2,
      fill: { color: col }, shadow: mkShB(),
    });
    if (row.icon) {
      s.addText(row.icon, {
        x: icoCX - ICON_R, y: icoCY - ICON_R,
        w: ICON_R * 2, h: ICON_R * 2,
        fontSize: 20, fontFace: 'Microsoft YaHei',
        color: 'FFFFFF', align: 'center', valign: 'middle', margin: 0,
      });
    }

    // 粗体标题（左对齐）
    const titleH = 0.40;
    const bodyH  = ROW_H - titleH - 0.16;
    const titleY = ry + (ROW_H - titleH - bodyH - 0.10) / 2;

    s.addText(row.title || '', {
      x: textX, y: titleY, w: textW, h: titleH,
      fontSize: 17, bold: true, color: '262626',
      fontFace: 'Microsoft YaHei', valign: 'middle', margin: 0,
    });

    // 描述文字（左对齐，位于标题下方）
    if (row.body) {
      s.addText(row.body, {
        x: textX, y: titleY + titleH + 0.06, w: textW, h: bodyH,
        fontSize: 13, color: '666666',
        fontFace: 'Microsoft YaHei', valign: 'top', margin: 0, wrap: true,
      });
    }
  });
}
```

---

## 版式 27 — 双栏右视觉面板（Left Bullets + Right Visual Anchor）

**Vibe**：通用 ｜**场景**：论点+数据佐证、观点+金句强调——强制为每页内容页添加视觉锚点

```javascript
// ══════════════════════════════════════════════════════════════════════
// 版式 27 — 双栏右视觉面板
// ══════════════════════════════════════════════════════════════════════
/**
 * addDualPanelSlide — 左侧要点（左对齐）+ 右侧深色视觉面板
 * 解决「纯文本幻灯片」问题：强制右侧视觉锚点，无需图片素材
 *
 * @param {Object} data
 *   title      {string}
 *   subtitle   {string}
 *   points     Array<{ text, bold, highlight }>   左侧要点，左对齐
 *   panel      {Object}
 *     type       'stat' | 'icon' | 'quote'
 *     color      面板主题色，默认 '1770EA'
 *     number     (stat) 大数字，如 '83%'
 *     unit       (stat) 单位，如 '↑'
 *     label      大字下方说明文字
 *     icon       (icon) 大图标 emoji，如 '🚀'
 *     quote      (quote) 金句文字（≤30字）
 *
 * 左右比例：58% / 38%（间距 0.50"）
 */
function addDualPanelSlide(pres, A, { title, subtitle, points = [], panel = {} }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);
  addFooter(s, pageNum, false);

  const sX     = 0.500;
  const sY     = 1.55;
  const totalW = 12.190;
  const totalH = 5.65;
  const leftW  = totalW * 0.58;         // ~7.07"
  const GAP    = 0.50;                  // 两栏间距 0.50"
  const rightX = sX + leftW + GAP;
  const rightW = totalW - leftW - GAP;  // ~4.62"
  const col    = panel.color || '1770EA';

  // ── 左侧：要点列表（左对齐，段落间距 0.30" 等效）
  const items = points.map((p, i) => ({
    text: p.text,
    options: {
      bullet: true,
      breakLine: i < points.length - 1,
      fontSize: p.bold ? 19 : 17,
      color: p.highlight ? '1770EA' : '333333',
      bold: p.bold || false,
      fontFace: 'Microsoft YaHei',
      paraSpaceAfter: 18,
    },
  }));
  if (items.length) {
    s.addText(items, {
      x: sX, y: sY, w: leftW, h: totalH,
      valign: 'top', fontFace: 'Microsoft YaHei',
    });
  }

  // ── 右侧：视觉面板（圆角深色卡片）
  s.addShape(pres.ShapeType.roundRect, {
    x: rightX, y: sY, w: rightW, h: totalH,
    fill: { color: col }, rectRadius: 0.10, shadow: mkShB(),
  });

  if (panel.type === 'stat' || (!panel.type && panel.number)) {
    // 大数字模式
    s.addText((panel.number || '') + (panel.unit || ''), {
      x: rightX + 0.20, y: sY + 0.70, w: rightW - 0.40, h: 2.40,
      fontSize: 80, bold: true, color: 'FFFFFF',
      fontFace: 'Microsoft YaHei',
      align: 'center', valign: 'middle', margin: 0, fit: 'shrink',
    });
    if (panel.label) {
      s.addText(panel.label, {
        x: rightX + 0.20, y: sY + 3.20, w: rightW - 0.40, h: 0.52,
        fontSize: 15, color: 'D0E8FF',
        fontFace: 'Microsoft YaHei', align: 'center', margin: 0,
      });
    }
  } else if (panel.type === 'icon') {
    // 大图标模式
    if (panel.icon) {
      s.addText(panel.icon, {
        x: rightX + 0.20, y: sY + 1.20, w: rightW - 0.40, h: 2.20,
        fontSize: 90, fontFace: 'Microsoft YaHei',
        color: 'FFFFFF', align: 'center', valign: 'middle', margin: 0,
      });
    }
    if (panel.label) {
      s.addText(panel.label, {
        x: rightX + 0.20, y: sY + 3.60, w: rightW - 0.40, h: 0.52,
        fontSize: 15, color: 'D0E8FF',
        fontFace: 'Microsoft YaHei', align: 'center', margin: 0,
      });
    }
  } else if (panel.type === 'quote') {
    // 金句模式
    s.addText('\u275D', {
      x: rightX + 0.25, y: sY + 0.40, w: 0.60, h: 0.60,
      fontSize: 36, color: 'D0E8FF',
      fontFace: 'Microsoft YaHei', margin: 0,
    });
    s.addText(panel.quote || '', {
      x: rightX + 0.25, y: sY + 1.00, w: rightW - 0.50, h: 3.80,
      fontSize: 17, color: 'FFFFFF',
      fontFace: 'Microsoft YaHei',
      valign: 'middle', margin: 0, wrap: true, lineSpacingMultiple: 1.4,
    });
  }
}
```

---

## 版式 28 — 对比条形页（Before/After / Option A vs B）

**Vibe**：专业严谨 ｜**场景**：传统 vs AI 原生、方案选项横向评估、指标前后对比

```javascript
// ══════════════════════════════════════════════════════════════════════
// 版式 28 — 对比条形页
// ══════════════════════════════════════════════════════════════════════
/**
 * addCompareBarSlide — 水平条形对比（视觉化前后或方案对比）
 * 每行：维度标签 | 左侧条形（方案A）| 右侧条形（方案B）
 * 最多 5 行；行间距 0.30"
 *
 * @param {Object} data
 *   title       {string}
 *   subtitle    {string}
 *   leftLabel   左侧方案标签，如 '传统模式'
 *   rightLabel  右侧方案标签，如 'AI 原生'
 *   leftColor   默认 'AAAAAA'
 *   rightColor  默认 '1770EA'
 *   items       Array<{ label, left:0-100, right:0-100, unit }>
 */
function addCompareBarSlide(pres, A, { title, subtitle, leftLabel, rightLabel, items = [], leftColor, rightColor }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);
  addFooter(s, pageNum, false);

  const lCol  = leftColor  || 'AAAAAA';
  const rCol  = rightColor || '1770EA';
  const n     = Math.min(items.length, 5);
  const sX    = 0.500;
  const totalW = 12.190;

  const labelW  = 2.40;
  const barX    = sX + labelW + 0.30;
  const barAreaW = totalW - labelW - 0.30;
  const halfW   = (barAreaW - 0.20) / 2;

  const HEADER_H = 0.46;
  const ROW_GAP  = 0.30;
  const sY       = 1.55;
  const contentY = sY + HEADER_H + 0.20;
  const contentH = 5.65 - HEADER_H - 0.20;
  const ROW_H    = (contentH - ROW_GAP * (n - 1)) / n;

  // 表头
  [[lCol, leftLabel || '方案 A', barX],
   [rCol, rightLabel || '方案 B', barX + halfW + 0.20]].forEach(([c, label, x]) => {
    s.addShape(pres.ShapeType.rect, {
      x, y: sY, w: halfW, h: HEADER_H,
      fill: { color: c }, line: { type: 'none' }, shadow: mkShS(),
    });
    s.addText(label, {
      x, y: sY, w: halfW, h: HEADER_H,
      fontSize: 14, bold: true, color: 'FFFFFF',
      fontFace: 'Microsoft YaHei', align: 'center', valign: 'middle', margin: 0,
    });
  });

  items.slice(0, n).forEach((item, i) => {
    const ry = contentY + i * (ROW_H + ROW_GAP);

    // 交替行背景
    s.addShape(pres.ShapeType.rect, {
      x: sX - 0.06, y: ry, w: totalW + 0.10, h: ROW_H,
      fill: { color: i % 2 === 0 ? 'F7F9FF' : 'FFFFFF' }, line: { type: 'none' },
    });

    // 维度标签（左对齐）
    s.addText(item.label || '', {
      x: sX, y: ry, w: labelW, h: ROW_H,
      fontSize: 14, bold: true, color: '333333',
      fontFace: 'Microsoft YaHei', valign: 'middle', margin: 0,
    });

    const BAR_H = Math.min(ROW_H * 0.52, 0.44);
    const barY  = ry + (ROW_H - BAR_H) / 2;

    [[lCol, item.left || 0, barX, 'right'],
     [rCol, item.right || 0, barX + halfW + 0.20, 'left']].forEach(([c, val, bx, numAlign]) => {
      const fill = Math.min(Math.max(val, 0), 100) / 100;
      // 背景轨道
      s.addShape(pres.ShapeType.rect, {
        x: bx, y: barY, w: halfW, h: BAR_H,
        fill: { color: 'EEEEEE' }, line: { type: 'none' },
      });
      // 实际填充
      if (fill > 0) {
        s.addShape(pres.ShapeType.rect, {
          x: bx, y: barY, w: halfW * fill, h: BAR_H,
          fill: { color: c }, line: { type: 'none' }, shadow: mkShS(),
        });
      }
      // 数值标签
      const numColor = fill > 0.45 ? 'FFFFFF' : c;
      const numX = numAlign === 'right' ? bx : bx + 0.10;
      s.addText(`${val}${item.unit || ''}`, {
        x: numX, y: barY, w: halfW - 0.10, h: BAR_H,
        fontSize: 12, bold: true, color: numColor,
        fontFace: 'Microsoft YaHei', align: numAlign, valign: 'middle', margin: 0,
      });
    });
  });
}
```

---

## 版式 29 — 增强步骤流程（数字徽章 + 图标 + 箭头）

**Vibe**：专业严谨 / 活力生态 ｜**场景**：实施步骤、工作流、方案路径——比版式 07 视觉更丰富

```javascript
// ══════════════════════════════════════════════════════════════════════
// 版式 29 — 增强步骤流程
// ══════════════════════════════════════════════════════════════════════
/**
 * addEnhancedFlowSlide — 编号徽章 + 图标圆 + 箭头连接
 * 与版式 07 的区别：
 *   - 大号圆形数字徽章（悬浮在卡片顶部，形成视觉主心骨）
 *   - 卡片顶部彩色细条
 *   - 内容左对齐，段落间距 0.30"
 *   - 箭头可见但简洁（灰色横线）
 *
 * @param {Object} data
 *   title    {string}
 *   subtitle {string}
 *   steps    Array<{ icon, title, body, color }>（3-5步）
 *   note     底部备注（可选）
 */
function addEnhancedFlowSlide(pres, A, { title, subtitle, steps = [], note }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);
  addFooter(s, pageNum, false);

  const n = Math.min(steps.length, 5);
  if (n === 0) return;

  const sX     = 0.500;
  const sY     = 1.60;
  const totalW = 12.190;
  const totalH = note ? 5.00 : 5.40;

  const ARROW_W = 0.38;
  const cW      = (totalW - ARROW_W * (n - 1)) / n;
  const BADGE_R = 0.42;                            // 数字徽章半径
  const ICON_R  = 0.26;                            // 图标小圆半径
  const CARD_Y  = sY + BADGE_R * 2 + 0.12;        // 卡片顶（徽章下方）
  const CARD_H  = totalH - BADGE_R * 2 - 0.12;

  steps.slice(0, n).forEach((step, i) => {
    const x   = sX + i * (cW + ARROW_W);
    const col = step.color || COLOR_SEQ[i % COLOR_SEQ.length];
    const badgeCX = x + cW / 2;
    const badgeCY = sY + BADGE_R;

    // 卡片（圆角，浅底）
    s.addShape(pres.ShapeType.roundRect, {
      x, y: CARD_Y, w: cW, h: CARD_H,
      fill: { color: 'F5F7FA' }, rectRadius: 0.06, shadow: mkShS(),
    });
    // 顶部彩色细条
    s.addShape(pres.ShapeType.rect, {
      x, y: CARD_Y, w: cW, h: 0.09,
      fill: { color: col }, line: { type: 'none' },
    });

    // 数字徽章（圆形，悬浮在卡片顶边缘）
    s.addShape(pres.ShapeType.oval, {
      x: badgeCX - BADGE_R, y: badgeCY - BADGE_R,
      w: BADGE_R * 2, h: BADGE_R * 2,
      fill: { color: col }, shadow: mkShB(),
    });
    s.addText(String(i + 1), {
      x: badgeCX - BADGE_R, y: badgeCY - BADGE_R,
      w: BADGE_R * 2, h: BADGE_R * 2,
      fontSize: 22, bold: true, color: 'FFFFFF',
      fontFace: 'Microsoft YaHei', align: 'center', valign: 'middle', margin: 0,
    });

    // 图标小圆（附在徽章右下角）
    if (step.icon) {
      const icoCX = badgeCX + BADGE_R * 0.66;
      const icoCY = badgeCY + BADGE_R * 0.66;
      s.addShape(pres.ShapeType.oval, {
        x: icoCX - ICON_R, y: icoCY - ICON_R,
        w: ICON_R * 2, h: ICON_R * 2,
        fill: { color: 'FFFFFF' }, line: { color: col, pt: 1.5 },
      });
      s.addText(step.icon, {
        x: icoCX - ICON_R, y: icoCY - ICON_R,
        w: ICON_R * 2, h: ICON_R * 2,
        fontSize: 13, fontFace: 'Microsoft YaHei',
        color: col, align: 'center', valign: 'middle', margin: 0,
      });
    }

    // 步骤标题（卡片内，左对齐）
    const innerX = x + 0.18;
    const innerW = cW - 0.36;
    const innerY = CARD_Y + 0.22;

    s.addText(step.title || '', {
      x: innerX, y: innerY, w: innerW, h: 0.50,
      fontSize: 15, bold: true, color: '262626',
      fontFace: 'Microsoft YaHei', valign: 'middle', margin: 0,
    });

    // 步骤描述（左对齐，段落间距 0.30"）
    if (step.body) {
      s.addText(step.body, {
        x: innerX, y: innerY + 0.56, w: innerW, h: CARD_H - 0.82,
        fontSize: 13, color: '555555',
        fontFace: 'Microsoft YaHei', valign: 'top', margin: 0, wrap: true,
        lineSpacingMultiple: 1.3,
      });
    }

    // 箭头（步骤之间，灰色横线）
    if (i < n - 1) {
      const arrowX = x + cW + 0.05;
      const arrowY = CARD_Y + CARD_H / 2;
      s.addShape(pres.ShapeType.rect, {
        x: arrowX, y: arrowY - 0.04, w: ARROW_W - 0.10, h: 0.07,
        fill: { color: 'CCCCCC' }, line: { type: 'none' },
      });
      // 箭头三角头部
      s.addShape(pres.ShapeType.rect, {
        x: arrowX + ARROW_W - 0.16, y: arrowY - 0.12,
        w: 0.11, h: 0.23,
        fill: { color: 'CCCCCC' }, line: { type: 'none' },
      });
    }
  });

  // 底部备注
  if (note) {
    s.addText(`⚠ ${note}`, {
      x: sX, y: CARD_Y + CARD_H + 0.18, w: totalW, h: 0.30,
      fontSize: 12, color: 'FFC000',
      fontFace: 'Microsoft YaHei', margin: 0,
    });
  }
}
```
