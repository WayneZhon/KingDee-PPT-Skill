# 金蝶 PPT 基础函数 Layout Base v3.1
> 版式编号：无（通用辅助函数）
> 用途：所有 PPT 构建脚本必须包含的基础函数
>
> **⚠️ 常量引用**：COLOR_SEQ、mkSh/mkShS/mkShB 已迁移至 design-tokens.md
> 使用前请先读取 design-tokens.md 复制常量定义到脚本顶部

---

## 通用辅助函数（每个脚本必须包含）

```javascript
'use strict';
const pptxgen = require('pptxgenjs');
const fs = require('fs');

// ══════════════════════════════════════════════════════════════════════
// ⚠️ 常量引用：从 design-tokens.md 复制以下定义
// ══════════════════════════════════════════════════════════════════════
// COLOR_SEQ — 见 design-tokens.md 第1节（唯一定义）
// mkSh/mkShS/mkShB — 见 design-tokens.md 第3节（唯一定义）
// ══════════════════════════════════════════════════════════════════════

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
      fontSize: 8, color: 'BFBFBF', fontFace: 'Microsoft YaHei', margin: 0
    });
  }
  slide.addText(String(pageNum), {
    x: 12.845, y: 7.051, w: 0.384, h: 0.150,
    fontSize: 10, color: onDark ? 'FFFFFF' : '2971EB',
    align: 'right', fontFace: 'Microsoft YaHei', margin: 0
  });
}

// ─── 内容页标题 ───────────────────────────────────────────────────
function addContentTitle(slide, title, subtitle) {
  slide.addText(title, {
    x: 0.435, y: 0.230, w: 10.601, h: 0.513,
    fontSize: 28, color: '373838', bold: true,
    fontFace: 'Microsoft YaHei', margin: 0, valign: 'middle'
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.435, y: 0.747, w: 8.523, h: 0.312,
      fontSize: 14, color: 'BFBFBF', bold: false,
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
 *   fillColor         : 卡片底色，默认 'E7F1FF'
 *   title             : 标题文字
 *   titleColor        : 标题颜色，默认 '2971EB'
 *   body              : 正文文字（可选）
 *   bodyColor         : 正文颜色，默认 '373838'
 *   bigNumber         : 超大数字（可选，替代图标）
 *   numberColor       : 大数字颜色，默认 'FFFFFF'（深色卡）或 '2971EB'（浅色卡）
 *   icon              : emoji 图标字符（可选）
 *   hasShadow         : 是否加阴影，默认 true
 */
function bentoCard(pres, slide, opts) {
  const {
    x, y, w, h,
    fillColor = 'E7F1FF',
    title = '',
    titleColor = fillColor === '2971EB' ? 'FFFFFF' : '2971EB',
    body = '',
    bodyColor = fillColor === '2971EB' ? 'E7F1FF' : '373838',
    bigNumber = '',
    numberColor = fillColor === '2971EB' ? 'FFFFFF' : '2971EB',
    icon = '',
    hasShadow = true,
  } = opts;

  const shapeOpts = {
    x, y, w, h,
    fill: { color: fillColor },
    rectRadius: 0.15,
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
    const titleSize = fillColor === '2971EB' ? 18 : 16;
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
```

---

## 参数命名向后兼容（v3.1 新增）

> layout-schema.md 定义了统一的参数命名规范。
> 旧参数名通过别名映射自动转换，确保向后兼容。

```javascript
/**
 * 参数别名映射（在版式函数内部使用）
 * fillColor → bgColor
 * bodyColor → textColor
 * color → bgColor（多卡版式）
 */
function normalizeColorParams(opts) {
  return {
    ...opts,
    bgColor:     opts.bgColor || opts.fillColor || opts.color || opts.headerColor || 'E7F1FF',
    textColor:   opts.textColor || opts.bodyColor || '373838',
    titleColor:  opts.titleColor || '2971EB',
    accentColor: opts.accentColor || opts.color || '2971EB',
  };
}
```