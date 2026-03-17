# 金蝶 PPT 视觉规范 Style Guide
> 所有数值从官方模板 XML 精确提取（2026版），可直接用于 PptxGenJS。
> 上次更新：基于 `金蝶集团PPT模板_内部公开_.pptx` 逐帧/逐 XML 提取。

---

## 1. 幻灯片尺寸

```javascript
pres.layout = 'LAYOUT_WIDE';
// ✅ 精确：13.3333" × 7.5"（12192000 × 6858000 EMU）
// ❌ 禁止 LAYOUT_16x9（10"×5.625"，不是官方尺寸）
```

---

## 2. 品牌色系（从 theme1.xml 精确提取）

### 主色系
| 色名 | Hex | 用途 |
|------|-----|------|
| 主品牌蓝 | `1770EA` | accent1：标题、强调、TOC序号、页码 |
| 亮青色 | `00CBFF` | accent2：章节大数字、辅助强调 |
| 章节数字青 | `46CCFE` | 章节页超大数字（从 layout XML 直接提取） |
| 深品牌蓝 | `005392` | dk2：深色辅助、heading |

### 辅助色系
| 色名 | Hex | 用途 |
|------|-----|------|
| 青绿色 | `00C7C7` | accent3：点缀、标签 |
| 点缀紫 | `AF6EFF` | accent4：图标装饰 |
| 金黄色 | `FFC000` | accent5：数据高亮、重点强调 |
| 暖棕色 | `C6AE8F` | accent6：辅助装饰（少用） |

### 中性色
| 色名 | Hex | 用途 |
|------|-----|------|
| 深灰正文 | `262626` | 白底主正文（非模板值，视觉推荐） |
| 页码蓝 | `2A71EC` | 页码数字（从 layout XML 提取） |
| 中灰 | `888888` | 次要信息 |
| 浅灰线 | `DDDDDD` | 分割线 |
| 卡片底色 | `F7F9FC` | 内容卡片背景 |

### 多色序列（图表/多列卡片）
```javascript
const COLOR_SEQ = ['1770EA', '00CBFF', '00C7C7', 'AF6EFF', 'FFC000'];
```

---

## 3. 字体规范

```javascript
const FONT = 'Microsoft YaHei';    // 中英文统一，备用：微软雅黑
const FONT_NUM = 'Helvetica Neue'; // 纯数字/英文
```

| 文字类型 | 字号 | 字重 | 颜色 | 备注 |
|---------|------|------|------|------|
| 页面标题（Title）| 24pt | 加粗 | `262626` | 从 layout3 提取 |
| 副标题 | 16pt | 普通 | scheme:tx1 | 从 layout3 提取 |
| 内容正文 | 18pt | 普通 | `262626` | 行距 1.3× |
| 重点强调 | 20pt | 加粗 | `1770EA` 或 `FFC000` | — |
| 章节大数字 | **125pt** | 加粗 | `46CCFE` | sz=12500，从 layout5 XML 提取 |
| TOC 章节编号 | 80pt | 加粗 | `1770EA` | 大号左侧序号 |
| TOC 章节标题 | 20pt | 加粗 | `262626` | — |
| TOC 副说明 | 13pt | 普通 | `888888` | — |
| 页码 | 10pt | 普通 | `2A71EC` | — |
| 封面主标题 | 54pt | 加粗 | `FFFFFF` | 从 layout1 注释提取 |
| 封面日期/署名 | 16pt | 普通 | `FFFFFF` | 底部左侧 |
| 保密声明 | 8pt | 普通 | `AAAAAA` | 右下角 |

---

## 4. Logo 规范

### Logo 文件（两套，按背景色选用）
| 文件 | 适用场景 | 说明 |
|------|---------|------|
| `assets/logo_color.png` | **白底/浅色背景页**（目录页、内容页） | 彩色版：三色点阵 + 蓝色"金蝶"文字，2000×1019px |
| `assets/logo_white.png` | **蓝底/深色背景页**（封面、章节分隔、结尾） | 反白版：全白点阵 + 白色"金蝶"文字，2000×1019px |

### 使用规则
- 白底页（目录、内容）→ `logo_color.png`（彩色）
- 蓝底页（封面、章节页、结尾）→ `logo_white.png`（反白）

### 精确坐标（从 slideLayout3/5/7 XML 提取）
```javascript
// 宽高比 2000:1019 ≈ 1.963:1
// 官方尺寸：w=0.849" h=0.433"
function addLogo(slide, A, onDark) {
  slide.addImage({
    data: onDark ? A.LOGO_W : A.LOGO_C,
    x: 12.250,   // 右上角，精确值
    y: 0.187,
    w: 0.849,
    h: 0.433,    // 按宽高比 1.963:1 计算
  });
}
// onDark=true  → 蓝底页 → 白色反白 Logo
// onDark=false → 白底页 → 彩色 Logo
```

---

## 5. 背景图资源（从官方模板内部提取）

| 文件 | 尺寸 | 用途 | 对应 layout |
|------|------|------|------------|
| `assets/bg_cover.jpeg` | 972×548 | 蓝底+右下气泡圆 | layout1（封面） |
| `assets/bg_toc.png` | 1601×901 RGBA | 极浅白底+气泡纹理 | layout2（目录） |
| `assets/bg_section_a.jpeg` | 972×548 | 蓝底+右侧大圆 | layout5（章节A） |
| `assets/bg_section_b.jpeg` | 972×548 | 蓝底+右上大圆 | layout7（章节B） |
| `assets/bg_section_c.jpeg` | 972×548 | 蓝底+右下大圆 | layout10/11（章节C） |
| `assets/bg_closing.jpeg` | 972×548 | 蓝底+顶部大圆 | layout15（结尾） |
| `assets/closing_thanks.png` | 1983×717 RGBA | 多语言"谢谢"白字 | layout15（结尾内嵌） |

### 标准加载方式
```javascript
function loadAsset(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const mimeMap = { jpeg:'image/jpeg', jpg:'image/jpeg', png:'image/png', gif:'image/gif' };
  const mime = mimeMap[ext] || 'image/png';
  return mime + ';base64,' + require('fs').readFileSync(`assets/${filename}`).toString('base64');
}

// main() 开头一次性加载
const A = {
  BG_COVER:   loadAsset('bg_cover.jpeg'),
  BG_TOC:     loadAsset('bg_toc.png'),
  BG_SEC_A:   loadAsset('bg_section_a.jpeg'),
  BG_SEC_B:   loadAsset('bg_section_b.jpeg'),
  BG_SEC_C:   loadAsset('bg_section_c.jpeg'),
  BG_CLOSING: loadAsset('bg_closing.jpeg'),
  CLOSING_THANKS: loadAsset('closing_thanks.png'),
  LOGO:       loadAsset('logo.png'),
};

// 章节背景图轮换（按章节索引 0/1/2 循环）
const SEC_BGS = [A.BG_SEC_A, A.BG_SEC_B, A.BG_SEC_C];
```

---

## 6. 页脚规范（从 slideLayout3 XML 精确提取）

```javascript
// ─── 页脚：内容页（白底）专用 ─────────────────────────────────
function addFooter(slide, pageNum, onDark) {
  if (!onDark) {
    // 左侧保密声明（x=11.355 y=7.017 精确值）
    slide.addText('④ 内部公开 请勿外传', {
      x: 11.355, y: 7.017, w: 1.327, h: 0.190,
      fontSize: 8, color: 'AAAAAA', fontFace: 'Microsoft YaHei', margin: 0
    });
  }
  // 页码（x=12.845 y=7.051 精确值，颜色 2A71EC）
  slide.addText(String(pageNum), {
    x: 12.845, y: 7.051, w: 0.384, h: 0.150,
    fontSize: 10, color: onDark ? 'FFFFFF' : '2A71EC',
    align: 'right', fontFace: 'Microsoft YaHei', bold: false, margin: 0
  });
}
```

---

## 7. 内容页标题栏（从 slideLayout3 XML 精确提取）

```javascript
// ⚠️ 关键区别：官方模板标题区【无左侧竖线装饰】
// 精确坐标：x=0.435" y=0.230" w=10.601" h=0.513"

function addContentTitle(slide, title, subtitle) {
  // 主标题
  slide.addText(title, {
    x: 0.435, y: 0.230, w: 10.601, h: 0.513,
    fontSize: 24, color: '262626', bold: true,
    fontFace: 'Microsoft YaHei', margin: 0, valign: 'middle'
  });
  // 副标题（可选，y=0.747）
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.435, y: 0.747, w: 8.523, h: 0.312,
      fontSize: 16, color: '888888', bold: false,
      fontFace: 'Microsoft YaHei', margin: 0, valign: 'middle'
    });
  }
}

// 内容区边界（精确坐标）
// 正文区：x=0.434" y=1.503" w=12.256" h=5.348"
```

---

## 8. 章节分隔页规范（从 slideLayout5 XML 精确提取）

```javascript
// 大数字：sz=12500（125pt），color=#46CCFE，bold=true，font=微软雅黑
// 位置：x=0.403" y=0.284" w=2.365" h=2.205"
// 红色装饰横线：x=0.603" y=2.489" w=0.876" h=0.096"（颜色：E8210A 或 00CBFF）
// 章节标题：x=0.516" y=2.970" w=10.870" h=0.667"（24pt 白色加粗）
// 子说明：x=0.516" y=3.626" w=5.167" h=1.320"（白色普通）
```

---

## 9. 封面页规范（从 slideLayout1 XML 精确提取）

```javascript
// 背景：bg_cover.jpeg 全幅铺满 x=0 y=0 w=13.333 h=7.517
// 无独立 Logo（封面无 logo）
// 主标题：x=0.917" y=2.247" w=11.500" h=1.450"（54pt 白色加粗）
// 署名人：x=0.917" y=5.255" w=3.008" h=0.443"（白色，可选）
// 部门：x=0.917" y=5.715" w=3.002" h=0.473"（白色，可选）
// 日期：x=0.911" y=6.198" w=3.008" h=0.330"（16pt 白色）
// 版权：x=1.007" y=7.023" w=3.415" h=0.166"（8pt，自动）
// 保密标识：x=3.877" y=6.998" w=1.599" h=0.190"（8pt）
```

---

## 10. 结尾页规范（从 slideLayout15 XML 精确提取）

```javascript
// 背景：bg_closing.jpeg 全幅铺满
// 多语言谢谢图片：closing_thanks.png
//   x=0.794" y=2.802" w=7.562" h=2.735"（精确坐标）
// 版权：x=1.095" y=6.961" w=2.965" h=0.188"
// 保密：x=3.825" y=6.867" w=1.599" h=0.190"
// 无 Logo（结尾页背景图内已含）
```

---

## 11. 分辨率档位

| 档位 | 参数 | 输出像素 | 使用时机 |
|------|------|---------|---------|
| Standard | `-r 150` | ~1600×900 | 日常快速预览 |
| 2K | `-r 220` | ~2340×1316 | 精细QA |
| 4K | `-r 300` | ~3200×1800 | 大屏/印刷验收 |
