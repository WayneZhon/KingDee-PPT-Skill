# 金蝶 PPT 技术构建规范 PPTX Builder
> 基于官方模板 2026 版，从 XML 精确提取后重写。

---

## 1. 构建脚本标准模板

```javascript
'use strict';
const pptxgen = require('pptxgenjs');
const fs = require('fs');

// ① assets 检查（必须全部存在）
const REQUIRED = [
  'logo_color.png', 'logo_white.png',
  'bg_cover.jpeg', 'bg_toc.png',
  'bg_section_a.jpeg', 'bg_section_b.jpeg', 'bg_section_c.jpeg',
  'bg_closing.jpeg', 'closing_thanks.png'
];
for (const f of REQUIRED) {
  if (!fs.existsSync(`assets/${f}`)) {
    console.error(`❌ 缺少: assets/${f}`);
    process.exit(1);
  }
}

// ② 资源加载
function loadAsset(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const mimeMap = { jpeg:'image/jpeg', jpg:'image/jpeg', png:'image/png', gif:'image/gif' };
  return (mimeMap[ext]||'image/png') + ';base64,' + fs.readFileSync(`assets/${filename}`).toString('base64');
}
const A = {
  BG_COVER:       loadAsset('bg_cover.jpeg'),
  BG_TOC:         loadAsset('bg_toc.png'),
  BG_SEC_A:       loadAsset('bg_section_a.jpeg'),
  BG_SEC_B:       loadAsset('bg_section_b.jpeg'),
  BG_SEC_C:       loadAsset('bg_section_c.jpeg'),
  BG_CLOSING:     loadAsset('bg_closing.jpeg'),
  CLOSING_THANKS: loadAsset('closing_thanks.png'),
  LOGO_C:         loadAsset('logo_color.png'),   // 白底页用彩色
  LOGO_W:         loadAsset('logo_white.png'),   // 蓝底页用反白
};
const SEC_BGS = [A.BG_SEC_A, A.BG_SEC_B, A.BG_SEC_C];
const COLOR_SEQ = ['1770EA', '00CBFF', '00C7C7', 'AF6EFF', 'FFC000'];

// ③ Shadow 工厂（必须每次 new，避免 PptxGenJS 对象变异 bug）
const mkSh  = () => ({ type:'outer', blur:12, offset:4, angle:135, color:'000000', opacity:0.10 });
const mkShS = () => ({ type:'outer', blur:6,  offset:2, angle:135, color:'000000', opacity:0.07 });

// ④ 粘贴 layout-presets.md 中的所有通用函数
// addLogo / addFooter / addContentTitle / 所有版式函数...

// ⑤ 主函数
async function main() {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';   // ✅ 13.3333" × 7.5"
  pres.title  = '演示文稿标题';
  pres.author = '金蝶国际软件集团';

  let pg = 1;
  // addCoverSlide(pres, A, { title:'...', date:'2026.03' }, pg++);
  // addTOCSlide(pres, A, [...], pg++);
  // addSectionSlide(pres, A, { num:'01', title:'...', bgData:SEC_BGS[0] }, pg++);
  // addBulletSlide(pres, A, { title:'...', points:[...] }, pg++);
  // addClosingSlide(pres, A, pg++);

  await pres.writeFile({ fileName: 'output.pptx' });
  console.log(`✓ output.pptx（共 ${pg-1} 页）`);
}
main().catch(e => { console.error(e); process.exit(1); });
```

---

## 2. 用户图片 base64 内嵌

```javascript
function loadUserImage(uploadFilename) {
  const path = `/mnt/user-data/uploads/${uploadFilename}`;
  if (!fs.existsSync(path)) { console.warn(`⚠️ 找不到: ${path}`); return null; }
  const ext = uploadFilename.split('.').pop().toLowerCase();
  const mimeMap = { png:'image/png', jpg:'image/jpeg', jpeg:'image/jpeg',
                    svg:'image/svg+xml', webp:'image/webp' };
  return (mimeMap[ext]||'image/png') + ';base64,' + fs.readFileSync(path).toString('base64');
}

// 使用示例（版式08 图文并排）
const img1 = loadUserImage('screenshot.png');
addImageTextSlide(pres, A, {
  title: '操作演示',
  imgData: img1,
  imgSide: 'right',
  points: [...]
}, pg++);
```

---

## 3. 执行命令序列

```bash
# 1. 生成 PPTX（在 /home/claude 目录下执行，assets/ 在同级）
cd /home/claude && node build_pptx.js

# 2. 转 PDF
python /mnt/skills/public/pptx/scripts/office/soffice.py --headless --convert-to pdf output.pptx

# 3. 转预览图
rm -f slide-*.jpg
pdftoppm -jpeg -r 150 output.pdf slide   # Standard（日常）
# pdftoppm -jpeg -r 220 output.pdf slide  # 2K（精细QA）

# 4. 视觉 QA（view 工具逐张检查）

# 5. 修复后重新执行 1-4

# 6. 交付
cp output.pptx /mnt/user-data/outputs/[文件名].pptx
```

---

## 4. 视觉 QA 清单（必须，至少一次修复循环）

**逐张视觉检查：**

| 类别 | 检查项 |
|------|-------|
| Logo | 白底/浅底页（目录、内容）→ 彩色 logo_color；蓝底页（封面、章节、结尾）→ 反白 logo_white；位置 x=12.250" y=0.187" w=0.849" h=0.433" |
| 页脚 | 页码右下角 x=12.845" y=7.051"；内容页左下角有保密声明 |
| 封面 | 主标题在 y=2.247"；日期在 y=6.198"；无 Logo |
| 目录 | 大号序号蓝色左对齐；标题在 x=1.791"；页码在 x=11.008" |
| 章节页 | 大数字 125pt #46CCFE；红色横线在 y=2.489"；标题在 y=2.970" |
| 内容页 | 标题无竖线；内容从 y=1.503" 开始；无溢出 |
| 结尾页 | 多语言图片在 x=0.794" y=2.802" w=7.562"；无 Logo |
| 对比度 | 蓝底页文字为白色；内容页文字为深色 |
| 溢出 | 无文字超出文本框边界 |

---

## 5. 绝对禁止事项

```javascript
// ❌ Hex 色值加 # 号（损坏文件）
color: "#1770EA"  →  color: "1770EA"

// ❌ 8位透明度颜色字符串（损坏文件）
color: "00000020"  →  使用 opacity 参数

// ❌ 复用 shadow 对象（PptxGenJS 变异 bug）
→ 改用工厂函数：const mkSh = () => ({ type:'outer', ... });

// ❌ Unicode 项目符号（双重符号）
addText("• 要点")  →  addText([...], { bullet: true })

// ❌ lineSpacing 与 bullet 组合 → 改用 paraSpaceAfter

// ❌ 错误幻灯片尺寸
LAYOUT_16x9  →  LAYOUT_WIDE

// ❌ 封面/结尾页放 Logo（官方模板无）

// ❌ 内容页标题加左侧竖线（官方模板无）
```

---

## 6. breakLine 规范

```javascript
slide.addText([
  { text: '第一行', options: { breakLine: true } },
  { text: '第二行', options: { breakLine: true } },
  { text: '第三行' }   // ← 最后一项不加 breakLine
], { ... });
```

---

## 7. 字体降级说明

Linux 沙箱可能无微软雅黑，LibreOffice 转 PDF 时自动匹配相近字体，可能造成 ±0.05" 轻微排版偏差。最终在 Windows/Mac PowerPoint 中打开效果最优。

---

## 8. 交付规范

```
✅ 视觉 QA 通过（所有页面逐帧检查）
✅ 至少完成一次 修复 → 重新转图 → 视觉确认 循环
✅ 文件复制到 /mnt/user-data/outputs/
✅ present_files 工具提供下载
✅ 交付说明 ≤2行
```
