# 金蝶 PPT 技术构建规范 PPTX Builder v3.1
> 基于官方模板 2026 版，从 XML 精确提取后重写。
> v2.0 新增：内容密度守卫、模式 B python-pptx 解析模板、视觉 QA 升级。
> v3.1 更新：引用 design-tokens.md，删除重复的 COLOR_SEQ 和阴影工厂定义。

**⚠️ 常量定义已迁移至 design-tokens.md，禁止在此文件重复定义。**

---

## 1. 构建脚本标准模板

```javascript
'use strict';
const pptxgen = require('pptxgenjs');
const fs = require('fs');

// ══════════════════════════════════════════════════════════════════════
// ⚠️ 常量引用：从 design-tokens.md 复制以下定义
// ══════════════════════════════════════════════════════════════════════
// 颜色系统 COLORS — 见 design-tokens.md 第1节
// COLOR_SEQ — 见 design-tokens.md 第1节（唯一定义，禁止重复）
// RADIUS — 见 design-tokens.md 第2节
// SHADOWS — 见 design-tokens.md 第3节
// 阴影工厂 mkSh/mkShS/mkShB — 见 design-tokens.md 第3节（唯一定义，禁止重复）
// SPACING — 见 design-tokens.md 第4节
// FONT — 见 design-tokens.md 第5节
// ══════════════════════════════════════════════════════════════════════

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
const SEC_BGS = [A.BG_SEC_A, A.BG_SEC_B, A.BG_SEC_C];

// ⚠️ COLOR_SEQ 和阴影工厂定义已迁移至 design-tokens.md
// 使用前请从 design-tokens.md 复制到此处，禁止在此文件单独定义

// ③ 粘贴 layout-presets.md 中的所有通用函数
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

## 4. 内容密度守卫函数（Content Guard）

> 在内容脚本阶段，Claude 必须对每页执行以下检查，过载时强制拆页。

### 密度规则表

| 版式类型 | 上限 | 超出处理 |
|---------|------|---------|
| 要点列表页 | ≤5 条，单条 ≤25 字 | 超5条 → 拆为两页 |
| Bento 卡片 | ≤6 张卡 | 超6张 → 拆为两页 |
| 流程步骤 | ≤5 步 | 超5步 → 拆为两页 |
| 思维模型格 | 每格 ≤3 行，≤40 字 | 超限 → 压缩文字 |
| 数据看板 | ≤3 个指标 | 超3个 → 拆为两页 |

### 单句核心检查（Phase 2.1 强制执行）

在输出每页内容脚本后，Claude 必须追加自检行：

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
【第 X 页】版式：[数据看板11]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
...
核心句（≤10字）：AI伙伴矩阵覆盖主流平台
密度自检：✅ 正常（3卡片，单条≤25字，主锚点：大数字统计）
```

**若无法写出 ≤10 字核心句 → 信息过载 → 自动拆为两页。**

---

## 5. 执行命令序列

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

### 视觉层次检查（v3.0 新增）

| 检查项 | 标准 |
|-------|------|
| 三级层次 | 每页是否有 L1（主信息）+ L2（次信息）的明显区分 |
| 字号比例 | L1 与 L2 字号比是否 ≥ 2:1 |
| 单句核心 | 该页能否用 ≤10 字描述其核心信息（无法描述 → 拆页）|
| 锚点等级 | 主锚点是否达到优先级 ①–③（禁止仅靠小图标行作为锚点）|

### 排印精确检查（v3.0 新增）

| 检查项 | 标准 |
|-------|------|
| 标题行距 | 内容页标题是否使用 28pt（与正文形成 75% 对比） |
| 正文行距 | 正文要点是否保持舒适间距（每条 ≤25 字） |
| 超大数字 | 大数字是否 ≥ 60pt 且与说明文字形成 ≥ 3:1 比例 |
| 同页一致性 | 同一文字类型是否使用统一字号/字重 |

### 元素对齐检查（v3.0 新增）

| 检查项 | 标准 |
|-------|------|
| 内容区起点 | x 起点是否为官方模板坐标（如 0.435" 或 0.48"） |
| 卡片间距 | 全页卡片间距是否统一（0.12" 或不混用） |
| 元素对齐 | 同列元素左边缘是否精确对齐（误差 < 0.04"） |
| 内容底边 | 最低元素底边是否 ≤ 6.96"（留出页脚空间） |

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

## 10. lobe-icons AI 品牌 Logo 嵌入模块

> 当内容脚本含有 `[logo: slug]` 标注时，必须执行以下流程将 lobe-icons 图标嵌入 PPTX。

### 10.1 依赖安装

```bash
# sharp 用于 SVG → PNG 转换（必须）
npm install sharp --save
```

### 10.2 Logo 抓取与缓存函数

在 `build_pptx.js` 顶部（require 区域后）加入：

```javascript
const https = require('https');
const sharp = require('sharp');
const path  = require('path');

// ── lobe-icons CDN 配置 ──────────────────────────────────────────
const LOBE_CDN_PRIMARY  = 'https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons';
const LOBE_CDN_FALLBACK = 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons';
const LOBE_PNG_CDN      = 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/icons';
const LOBE_CACHE_DIR    = '/home/claude/lobe_cache';

// 确保缓存目录存在
if (!fs.existsSync(LOBE_CACHE_DIR)) fs.mkdirSync(LOBE_CACHE_DIR, { recursive: true });

/**
 * 从 URL 拉取内容，返回 Buffer
 */
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}: ${url}`));
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * 加载单个 lobe-icon，返回 "image/png;base64,xxxx" 字符串
 * 优先级：主 CDN SVG → 备用 CDN SVG → PNG CDN
 * 失败时返回 null（由调用方决定是否跳过）
 */
async function loadLobeIcon(slug, sizePx = 64) {
  const cacheFile = path.join(LOBE_CACHE_DIR, `${slug}_${sizePx}.png`);

  // 命中本地缓存
  if (fs.existsSync(cacheFile)) {
    return 'image/png;base64,' + fs.readFileSync(cacheFile).toString('base64');
  }

  const attempts = [
    `${LOBE_CDN_PRIMARY}/${slug}.svg`,
    `${LOBE_CDN_FALLBACK}/${slug}.svg`,
  ];

  for (const url of attempts) {
    try {
      const svgBuf = await fetchUrl(url);
      // SVG → PNG（sharp 处理，统一输出 sizePx × sizePx）
      const pngBuf = await sharp(svgBuf)
        .resize(sizePx, sizePx, { fit: 'contain', background: { r:0,g:0,b:0,alpha:0 } })
        .png()
        .toBuffer();
      fs.writeFileSync(cacheFile, pngBuf);
      return 'image/png;base64,' + pngBuf.toString('base64');
    } catch (_) { /* 继续尝试下一个 */ }
  }

  // SVG 全失败 → 尝试 PNG CDN
  try {
    const pngUrl = `${LOBE_PNG_CDN}/${slug}.png`;
    const pngBuf = await fetchUrl(pngUrl);
    // 用 sharp 缩放到目标尺寸
    const resized = await sharp(pngBuf)
      .resize(sizePx, sizePx, { fit: 'contain', background: { r:0,g:0,b:0,alpha:0 } })
      .png()
      .toBuffer();
    fs.writeFileSync(cacheFile, resized);
    return 'image/png;base64,' + resized.toString('base64');
  } catch (_) {}

  console.warn(`⚠️ lobe-icon 加载失败，跳过: ${slug}`);
  return null;
}

/**
 * 批量预加载，返回 Map<slug, base64String|null>
 * 在 main() 开始时调用，避免幻灯片构建中串行等待
 */
async function preloadLobeIcons(slugs, sizePx = 64) {
  const unique = [...new Set(slugs)];
  const results = await Promise.all(unique.map(s => loadLobeIcon(s, sizePx)));
  const map = {};
  unique.forEach((s, i) => { map[s] = results[i]; });
  return map;
}
```

---

### 10.3 幻灯片中插入 Logo 的三种模式

**模式 A：Bento 卡片左上角 Logo**

```javascript
// 在 bentoCard 函数内，卡片左上角插入 logo
async function bentoCardWithLogo(slide, opts, logoMap) {
  const { x, y, w, h, slug, title, bullets, bgColor, textColor } = opts;

  // 绘制卡片色块
  slide.addShape(pres.ShapeType.rect, {
    x, y, w, h,
    fill: { color: bgColor },
    line: { type: 'none' },
    shadow: mkShS(),
  });

  const logoData = slug ? logoMap[slug] : null;
  const logoSize = 0.42; // 英寸
  const logoX = x + 0.18;
  const logoY = y + 0.18;

  if (logoData) {
    slide.addImage({
      data: logoData,
      x: logoX, y: logoY,
      w: logoSize, h: logoSize,
    });
  }

  // 标题（logo 右侧或 logo 下方）
  const titleX = logoData ? logoX + logoSize + 0.12 : x + 0.18;
  const titleY = logoData ? logoY + (logoSize - 0.28) / 2 : y + 0.18;

  slide.addText(title, {
    x: titleX, y: titleY,
    w: w - (titleX - x) - 0.18, h: 0.36,
    fontSize: 13, bold: true,
    color: textColor || (bgColor === '2971EB' || bgColor === '22AAFE' ? 'FFFFFF' : '1A1A3E'),
    fontFace: 'Microsoft YaHei',
    valign: 'middle',
  });

  // 要点列表（卡片下半区）
  if (bullets && bullets.length) {
    const bulletY = logoY + logoSize + 0.12;
    slide.addText(bullets.map(b => ({ text: b, options: { breakLine: true } })), {
      x: x + 0.18, y: bulletY,
      w: w - 0.36, h: h - (bulletY - y) - 0.12,
      fontSize: 11,
      color: textColor || (bgColor === '2971EB' ? 'FFFFFF' : '555555'),
      fontFace: 'Microsoft YaHei',
      valign: 'top',
      lineSpacingMultiple: 1.35,
    });
  }
}
```

**模式 B：Logo 墙（合作伙伴横排展示）**

```javascript
// 在幻灯片底部生成横排 logo 墙
// slugsWithLabels: [{slug:'huawei', label:'华为云'}, ...]
async function addLogoWall(slide, y_start, slugsWithLabels, logoMap) {
  const count = slugsWithLabels.length;
  if (count === 0) return;

  // 背景条
  slide.addShape(pres.ShapeType.rect, {
    x: 0.5, y: y_start, w: 12.33, h: 1.35,
    fill: { color: 'F4F6FB' },
    line: { color: 'E0E6F0', pt: 1 },
    rounding: 0.08,
  });

  const itemW = 12.33 / count;
  for (let i = 0; i < count; i++) {
    const { slug, label } = slugsWithLabels[i];
    const cx = 0.5 + itemW * i + itemW / 2;
    const logoSize = 0.48;
    const logoX = cx - logoSize / 2;
    const logoY = y_start + 0.18;

    const logoData = logoMap[slug];
    if (logoData) {
      slide.addImage({ data: logoData, x: logoX, y: logoY, w: logoSize, h: logoSize });
    }

    // 品牌名标签
    if (label) {
      slide.addText(label, {
        x: logoX - 0.1, y: logoY + logoSize + 0.06,
        w: logoSize + 0.2, h: 0.22,
        fontSize: 9.5, color: '888888',
        fontFace: 'Microsoft YaHei',
        align: 'center',
      });
    }
  }
}
```

**模式 C：要点列表行首 Logo（替代项目符号）**

```javascript
// 每条要点前放小 logo，用于技术选型/对比类页面
async function addBulletWithLogo(slide, items, opts, logoMap) {
  // items: [{slug:'openai', text:'GPT-4o 负责长文档理解'}, ...]
  const { x, y, w, lineH = 0.42 } = opts;
  const iconSize = 0.28;

  for (let i = 0; i < items.length; i++) {
    const { slug, text } = items[i];
    const itemY = y + i * (lineH + 0.08);

    const logoData = slug ? logoMap[slug] : null;
    if (logoData) {
      slide.addImage({ data: logoData, x, y: itemY + (lineH - iconSize) / 2, w: iconSize, h: iconSize });
    }

    slide.addText(text, {
      x: x + (logoData ? iconSize + 0.1 : 0),
      y: itemY, w: w - (logoData ? iconSize + 0.1 : 0), h: lineH,
      fontSize: 14, color: '333333',
      fontFace: 'Microsoft YaHei',
      valign: 'middle',
    });
  }
}
```

---

### 10.4 main() 函数集成模式

```javascript
async function main() {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';

  // ── 第一步：收集本次 PPT 所有需要的 lobe-icons slug ──
  // （从内容脚本的 [logo: xxx] 标注中整理）
  // ⚠️ 常见易错 slug：
  //   Llama/Meta AI → 'metaai'（不是 'llama'）
  //   华为云        → 'huaweicloud'（不是 'huawei'，后者是华为集团）
  //   阿里云        → 'alibabacloud'（不是 'alibaba'，后者是阿里巴巴集团）
  //   MCP 协议      → 'mcp'  ← Skill 生态必备
  const ALL_SLUGS = ['huaweicloud', 'alibabacloud', 'deepseek', 'openai', 'claude', 'mcp'];  // 按实际填写

  // ── 第二步：批量预加载（并发拉取，提速）──
  console.log(`⏳ 预加载 ${ALL_SLUGS.length} 个 lobe-icons...`);
  const LOGOS = await preloadLobeIcons(ALL_SLUGS, 64);
  const loaded = Object.values(LOGOS).filter(Boolean).length;
  console.log(`✓ lobe-icons 加载完成：${loaded}/${ALL_SLUGS.length}`);

  // ── 第三步：构建幻灯片时传入 LOGOS map ──
  let pg = 1;
  // addCoverSlide(pres, A, {...}, pg++);
  // await addBentoWithLogoSlide(pres, A, LOGOS, {...}, pg++);
  // ...

  await pres.writeFile({ fileName: 'output.pptx' });
  console.log(`✓ output.pptx 完成`);
}
main().catch(e => { console.error(e); process.exit(1); });
```

---

### 10.5 视觉 QA 补充检查（lobe-icons 专项）

| 检查项 | 标准 |
|--------|------|
| Logo 是否渲染 | 每个标注了 `[logo:]` 的卡片/行，图标是否正常显示 |
| 尺寸一致性 | 同一页的 logo 尺寸是否统一（误差 < 0.02"） |
| 背景对比 | 深色卡片上 logo 是否可辨（彩色 logo 在深蓝底上是否清晰） |
| 文字位移 | logo 的存在是否导致文字挤出卡片边界 |
| 加载失败降级 | 加载失败的 slug 是否被静默跳过，不出现破图或占位符 |



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
