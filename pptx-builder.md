# 金蝶 PPT 技术构建规范 PPTX Builder v2.0
> 基于官方模板 2026 版，从 XML 精确提取后重写。
> v2.0 新增：内容密度守卫、模式 B python-pptx 解析模板、视觉 QA 升级。

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
  LOGO_C:         loadAsset('logo_color.png'),
  LOGO_W:         loadAsset('logo_white.png'),
};
const SEC_BGS    = [A.BG_SEC_A, A.BG_SEC_B, A.BG_SEC_C];
const COLOR_SEQ  = ['1770EA', '00CBFF', '00C7C7', 'AF6EFF', 'FFC000'];

// ③ Shadow 工厂（必须每次 new，避免 PptxGenJS 对象变异 bug）
const mkSh  = () => ({ type:'outer', blur:12, offset:4, angle:135, color:'000000', opacity:0.10 });
const mkShS = () => ({ type:'outer', blur:6,  offset:2, angle:135, color:'000000', opacity:0.07 });
const mkShB = () => ({ type:'outer', blur:16, offset:6, angle:135, color:'1770EA',  opacity:0.12 });

// ④ 粘贴 layout-presets.md 中的所有通用函数
// addLogo / addFooter / addContentTitle / bentoCard / 所有版式函数...

// ⑤ 主函数
async function main() {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.title  = '演示文稿标题';
  pres.author = '金蝶国际软件集团';

  let pg = 1;
  // addCoverSlide(pres, A, { title:'...', date:'2026.03' }, pg++);
  // addTOCSlide(pres, A, [...], pg++);
  // addSectionSlide(pres, A, { num:'01', title:'...', bgData:SEC_BGS[0] }, pg++);
  // addMetricDashboard(pres, A, { title:'...', metrics:[...] }, pg++);
  // addBentoGrid(pres, A, { title:'...', cards:[...] }, pg++);
  // addHeroSlide(pres, A, { title:'...', hero:{number:'8.4B',label:'...'}, points:[...] }, pg++);
  // addQuoteSlide(pres, A, { quote:'...', source:'...' }, pg++);
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
  const mimeMap = { png:'image/png', jpg:'image/jpeg', jpeg:'image/jpeg', svg:'image/svg+xml', webp:'image/webp' };
  return (mimeMap[ext]||'image/png') + ';base64,' + fs.readFileSync(path).toString('base64');
}
```

---

## 3. 模式 B — python-pptx 解析脚本

用于从用户上传的 `.pptx` 文件中提取文字内容，供 Claude 重新排版。

```bash
pip install python-pptx --break-system-packages
```

```python
from pptx import Presentation
from pptx.util import Pt
import json, sys

def extract_pptx(filepath):
    prs = Presentation(filepath)
    slides = []
    for i, slide in enumerate(prs.slides):
        shapes_data = []
        for shape in slide.shapes:
            if not shape.has_text_frame:
                continue
            texts = []
            for para in shape.text_frame.paragraphs:
                t = para.text.strip()
                if t:
                    # 尝试判断是否为标题（字号更大）
                    is_title = False
                    for run in para.runs:
                        if run.font.size and run.font.size >= Pt(18):
                            is_title = True
                    texts.append({'text': t, 'is_title': is_title})
            if texts:
                shapes_data.append({
                    'shape_name': shape.name,
                    'texts': texts
                })
        slides.append({'page': i + 1, 'shapes': shapes_data})
    return slides

if __name__ == '__main__':
    filepath = sys.argv[1] if len(sys.argv) > 1 else '/mnt/user-data/uploads/input.pptx'
    result = extract_pptx(filepath)
    print(json.dumps(result, ensure_ascii=False, indent=2))
```

**解析后 Claude 需要输出：**

```
第 X 页  识别内容：[标题] + [要点列表]
         → 建议版式：[版式名]
         → 内容密度：✅ 正常 / ⚠️ 过密（建议拆页）
         → 文案优化：[平庸写法] → [有力写法]
```

---

## 4. 执行命令序列

```bash
# 1. 生成 PPTX
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

## 5. 视觉 QA 清单 v2.0（每次生成后必须执行）

### 基础规范检查

| 类别 | 检查项 |
|------|-------|
| Logo | 白底页 → 彩色 logo_color；蓝底页 → 反白 logo_white；位置 x=12.250" y=0.187" |
| 页脚 | 页码右下角；内容页左下角有保密声明 |
| 封面 | 主标题在 y=2.247"；日期在 y=6.198"；无 Logo |
| 目录 | 大号序号蓝色左对齐；页码在 x=11.008" |
| 章节页 | 大数字 125pt #46CCFE；红线在 y=2.489" |
| 内容页 | 标题无竖线；内容从 y=1.503" 开始 |
| 结尾页 | 多语言图片在 x=0.794" y=2.802"；无 Logo |

### Anti-Slop 视觉检查（v2.0 新增）

| 检查项 | 标准 |
|-------|------|
| 视觉主心骨 | 每页是否有一个占据 1/3+ 版面的主视觉元素 |
| 元素对比 | 主要元素与次要文字的尺寸比是否 ≥ 3:1 |
| 内容密度 | 要点类页面是否 ≤ 6 条；Bento 是否 ≤ 6 张卡片 |
| 留白 | 内容是否未超版面 70%（避免塞满） |
| Vibe 一致性 | 极简震撼：是否有超大数字/色块；活力生态：是否有多卡片/图标 |
| 连续重复 | 是否连续超过 3 页使用同一版式 |

### Bento Grid 专项检查

| 检查项 | 标准 |
|-------|------|
| 主次分明 | 主卡（深蓝）是否明显大于次卡 |
| 卡片数量 | 是否 ≤ 6 张（超出自动拆页） |
| 文字颜色 | 深蓝底卡 → 白色文字；浅灰底卡 → 深色文字 |
| 卡片间距 | 间距是否约 0.12" |

---

## 6. 绝对禁止事项

```javascript
// ❌ Hex 色值加 # 号（损坏文件）
color: "#1770EA"  →  color: "1770EA"

// ❌ 8位透明度颜色字符串
color: "00000020"  →  使用 opacity/transparency 参数

// ❌ 复用 shadow 对象（PptxGenJS 变异 bug）
→ 每次调用工厂函数：mkShS() / mkSh() / mkShB()

// ❌ Unicode 项目符号（双重符号）
addText("• 要点")  →  addText([...], { bullet: true })

// ❌ lineSpacing 与 bullet 组合 → 改用 paraSpaceAfter

// ❌ 错误幻灯片尺寸
LAYOUT_16x9  →  LAYOUT_WIDE

// ❌ 封面/结尾页放 Logo（官方模板无）

// ❌ 跨色系渐变（蓝→金/蓝→青）
→ 只允许同色系透明度渐变

// ❌ 连续 3 页以上用同一版式
→ 穿插不同版式保持视觉节奏
```

---

## 7. breakLine 规范

```javascript
slide.addText([
  { text: '第一行', options: { breakLine: true } },
  { text: '第二行', options: { breakLine: true } },
  { text: '第三行' }   // ← 最后一项不加 breakLine
], { ... });
```

---

## 8. 字体降级说明

Linux 沙箱可能无微软雅黑，LibreOffice 转 PDF 时自动匹配相近字体，可能造成 ±0.05" 轻微排版偏差。`Segoe UI Emoji` 在 Linux 环境下可能降级为 Noto Emoji，图标字符视觉效果基本一致。最终在 Windows/Mac PowerPoint 中打开效果最优。

---

## 9. 交付规范

```
✅ 视觉 QA 通过（基础规范 + Anti-Slop 检查全部通过）
✅ 至少完成一次 修复 → 重新转图 → 视觉确认 循环
✅ 文件复制到 /mnt/user-data/outputs/
✅ present_files 工具提供下载
✅ 交付说明 ≤2行：「共 X 页，Vibe：[风格]，已通过视觉QA。」
```
