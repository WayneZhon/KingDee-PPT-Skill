'use strict';
const pptxgen = require('pptxgenjs');
const fs = require('fs');

// ══════════════════════════════════════════════════════════════════════
// 常量定义（从 design-tokens.md 复制）
// ══════════════════════════════════════════════════════════════════════
const COLOR_SEQ = ['2971EB', '22AAFE', '05C8C8', '966EFF', 'FFB61A'];
const mkSh  = () => ({ type:'outer', blur:8,  offset:3, angle:135, color:'000000', opacity:0.08 });
const mkShS = () => ({ type:'outer', blur:4,  offset:1, angle:135, color:'000000', opacity:0.05 });
const mkShB = () => ({ type:'outer', blur:14, offset:4, angle:135, color:'2971EB',  opacity:0.10 });
const FONT = 'Microsoft YaHei';

// ══════════════════════════════════════════════════════════════════════
// 资源加载
// ══════════════════════════════════════════════════════════════════════
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

// ══════════════════════════════════════════════════════════════════════
// 通用辅助函数
// ══════════════════════════════════════════════════════════════════════
function addLogo(slide, onDark) {
  slide.addImage({ data: onDark ? A.LOGO_W : A.LOGO_C, x: 12.250, y: 0.187, w: 0.849, h: 0.433 });
}
function addFooter(slide, pageNum, onDark) {
  if (!onDark) slide.addText('④ 内部公开 请勿外传', { x: 11.355, y: 7.017, w: 1.327, h: 0.190, fontSize: 8, color: 'BFBFBF', fontFace: FONT, margin: 0 });
  slide.addText(String(pageNum), { x: 12.845, y: 7.051, w: 0.384, h: 0.150, fontSize: 10, color: onDark ? 'FFFFFF' : '2971EB', align: 'right', fontFace: FONT, margin: 0 });
}
function addContentTitle(slide, title, subtitle) {
  slide.addText(title, { x: 0.435, y: 0.230, w: 10.601, h: 0.513, fontSize: 28, color: '373838', bold: true, fontFace: FONT, margin: 0, valign: 'middle' });
  if (subtitle) slide.addText(subtitle, { x: 0.435, y: 0.747, w: 8.523, h: 0.312, fontSize: 14, color: 'BFBFBF', fontFace: FONT, margin: 0, valign: 'middle' });
}

// ══════════════════════════════════════════════════════════════════════
// 版式 01 — 封面页
// ══════════════════════════════════════════════════════════════════════
function addCoverSlide(pres, { title, subtitle, author, dept, date }, pageNum) {
  const s = pres.addSlide();
  s.addImage({ data: A.BG_COVER, x: 0, y: 0, w: 13.333, h: 7.517 });
  s.addText(title, { x: 0.917, y: 2.247, w: 11.500, h: 1.450, fontSize: 48, color: 'FFFFFF', bold: true, fontFace: FONT, margin: 0, valign: 'middle' });
  if (subtitle) s.addText(subtitle, { x: 0.917, y: 3.8, w: 8.0, h: 0.55, fontSize: 20, color: 'E7F1FF', fontFace: FONT, margin: 0 });
  if (author) s.addText(author, { x: 0.917, y: 5.255, w: 3.008, h: 0.443, fontSize: 16, color: 'FFFFFF', fontFace: FONT, margin: 0 });
  if (dept) s.addText(dept, { x: 0.917, y: 5.715, w: 3.002, h: 0.473, fontSize: 16, color: 'FFFFFF', fontFace: FONT, margin: 0 });
  s.addText(date || '', { x: 0.911, y: 6.198, w: 3.008, h: 0.330, fontSize: 16, color: 'FFFFFF', fontFace: FONT, margin: 0 });
  s.addText('版权所有 © 金蝶国际软件集团有限公司   始创于 1993', { x: 1.007, y: 7.023, w: 3.415, h: 0.166, fontSize: 8, color: 'BFBFBF', fontFace: FONT, margin: 0 });
  s.addText('④ 内部公开 请勿外传', { x: 3.877, y: 6.998, w: 1.599, h: 0.190, fontSize: 8, color: 'BFBFBF', fontFace: FONT, margin: 0 });
}

// ══════════════════════════════════════════════════════════════════════
// 版式 02 — 目录页
// ══════════════════════════════════════════════════════════════════════
function addTOCSlide(pres, sections, pageNum) {
  const s = pres.addSlide();
  s.addImage({ data: A.BG_TOC, x: 0, y: 0, w: 13.333, h: 7.500 });
  addLogo(s, false);
  s.addText('目  录', { x: 0.435, y: 0.230, w: 4.0, h: 0.513, fontSize: 24, color: '373838', bold: true, fontFace: FONT, margin: 0 });
  const ROW_Y = [
    { numY: 1.805, titleY: 1.847, subY: 2.343, pageY: 1.900 },
    { numY: 3.073, titleY: 3.061, subY: 3.510, pageY: 3.080 },
    { numY: 4.254, titleY: 4.240, subY: 4.679, pageY: 4.261 },
    { numY: 5.421, titleY: 5.400, subY: 5.846, pageY: 5.441 },
  ];
  sections.slice(0, 4).forEach((sec, i) => {
    const row = ROW_Y[i];
    s.addText(sec.num, { x: 0.429, y: row.numY, w: 2.400, h: 0.908, fontSize: 80, color: '2971EB', bold: true, fontFace: FONT, margin: 0, valign: 'top' });
    s.addText(sec.title, { x: 3.050, y: row.titleY, w: 7.650, h: 0.449, fontSize: 20, color: '373838', bold: true, fontFace: FONT, margin: 0, valign: 'middle' });
    if (sec.sub) s.addText(sec.sub, { x: 3.050, y: row.subY, w: 7.650, h: 0.312, fontSize: 13, color: 'BFBFBF', fontFace: FONT, margin: 0 });
    s.addText(`P  ${String(sec.page).padStart(2,'0')}`, { x: 11.008, y: row.pageY, w: 1.327, h: 0.443, fontSize: 14, color: '2971EB', fontFace: FONT, align: 'right', margin: 0 });
    if (i < sections.length - 1) s.addShape(pres.ShapeType.line, { x: 3.050, y: row.subY + 0.35, w: 9.241, h: 0, line: { color: 'BFBFBF', width: 0.5 } });
  });
}

// ══════════════════════════════════════════════════════════════════════
// 版式 03 — 章节分隔页
// ══════════════════════════════════════════════════════════════════════
function addSectionSlide(pres, { num, title, subtitle, bgIdx }, pageNum) {
  const s = pres.addSlide();
  const bgData = SEC_BGS[bgIdx % 3];
  s.addImage({ data: bgData, x: 0, y: 0, w: 13.333, h: 7.500 });
  addLogo(s, true);
  s.addText(num, { x: 0.917, y: 1.407, w: 11.500, h: 1.450, fontSize: 128, color: '00CCFE', bold: true, fontFace: FONT, margin: 0, valign: 'middle' });
  s.addShape(pres.ShapeType.line, { x: 0.917, y: 3.0, w: 4.0, h: 0, line: { color: '00CCFE', width: 4 } });
  s.addText(title, { x: 0.917, y: 3.408, w: 11.500, h: 0.858, fontSize: 44, color: 'FFFFFF', bold: true, fontFace: FONT, margin: 0, valign: 'middle' });
  if (subtitle) s.addText(subtitle, { x: 0.917, y: 4.466, w: 11.500, h: 0.312, fontSize: 16, color: 'E7F1FF', fontFace: FONT, margin: 0 });
}

// ══════════════════════════════════════════════════════════════════════
// 版式 05 — 数据卡片
// ══════════════════════════════════════════════════════════════════════
function addDataCardSlide(pres, { title, subtitle, cards }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, false);
  addContentTitle(s, title, subtitle);
  const n = cards.length, cW = (12.256 - (n-1)*0.24) / n;
  const cY = 1.60, cH = 5.20, sX = 0.434;
  cards.forEach((c, i) => {
    const x = sX + i * (cW + 0.24);
    const col = c.color || COLOR_SEQ[i % COLOR_SEQ.length];
    s.addShape(pres.ShapeType.roundRect, { x, y: cY, w: cW, h: cH, fill: { color: 'E7F1FF' }, rectRadius: 0.15, shadow: mkShS() });
    s.addShape(pres.ShapeType.rect, { x, y: cY, w: cW, h: 0.55, fill: { color: col } });
    s.addText(c.label || '', { x, y: cY, w: cW, h: 0.55, fontSize: 15, color: 'FFFFFF', bold: true, fontFace: FONT, align: 'center', margin: 0, valign: 'middle' });
    s.addText((c.num || '') + (c.unit ? (' ' + c.unit) : ''), { x, y: cY + 0.70, w: cW, h: 1.50, fontSize: 60, color: col, bold: true, fontFace: FONT, align: 'center', margin: 0, valign: 'middle' });
    if (c.sub) s.addText(c.sub, { x: x + 0.12, y: cY + 2.30, w: cW - 0.24, h: 2.8, fontSize: 14, color: '373838', fontFace: FONT, valign: 'top', margin: 0, wrap: true });
  });
  addFooter(s, pageNum, false);
}

// ══════════════════════════════════════════════════════════════════════
// 版式 07 — 左右对比
// ══════════════════════════════════════════════════════════════════════
function addCompareSlide(pres, { title, subtitle, left, right }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, false);
  addContentTitle(s, title, subtitle);
  [[left, 0.434], [right, 6.70]].forEach(([col, x]) => {
    const c = col.color || '2971EB', w = 6.05;
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.55, w, h: 5.1, fill: { color: 'E7F1FF' }, rectRadius: 0.15, shadow: mkShS() });
    s.addShape(pres.ShapeType.rect, { x, y: 1.55, w, h: 0.62, fill: { color: c } });
    s.addText(col.title, { x, y: 1.55, w, h: 0.62, fontSize: 18, color: 'FFFFFF', bold: true, fontFace: FONT, align: 'center', margin: 0, valign: 'middle' });
    const pts = (col.points || []).map((p, j) => ({ text: p.text, options: { bullet: true, breakLine: j < col.points.length - 1, fontSize: 16, color: p.bold ? c : '373838', bold: p.bold || false, fontFace: FONT, paraSpaceAfter: 12 } }));
    if (pts.length) s.addText(pts, { x: x + 0.18, y: 2.28, w: w - 0.36, h: 4.22, valign: 'top' });
  });
  addFooter(s, pageNum, false);
}

// ══════════════════════════════════════════════════════════════════════
// 版式 19 — 金字塔 / MECE
// ══════════════════════════════════════════════════════════════════════
function addPyramidSlide(pres, { title, subtitle, conclusion, pillars }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, false);
  addContentTitle(s, title, subtitle);
  addFooter(s, pageNum, false);
  const GX = 0.434, GY = 1.48, GW = 12.256, GAP = 0.12;
  // 顶层结论
  const topH = 0.72;
  s.addShape(pres.ShapeType.rect, { x: GX, y: GY, w: GW, h: topH, fill: { color: '2971EB' }, line: { type: 'none' }, shadow: mkSh() });
  s.addText(conclusion || '核心结论', { x: GX + 0.28, y: GY, w: GW - 0.56, h: topH, fontSize: 20, bold: true, color: 'FFFFFF', fontFace: FONT, valign: 'middle' });
  // 中层分论点
  const midY = GY + topH + GAP, midH = 0.60, colW = (GW - GAP * 2) / 3;
  const p3 = pillars.length >= 3 ? pillars.slice(0, 3) : [...pillars, ...Array(3 - pillars.length).fill({ label: '分论点', points: [] })];
  p3.forEach((pillar, i) => {
    const cx = GX + i * (colW + GAP);
    s.addShape(pres.ShapeType.rect, { x: cx, y: midY, w: colW, h: midH, fill: { color: 'FFB61A' }, line: { type: 'none' }, shadow: mkShS() });
    s.addText(pillar.label || `分论点 ${i + 1}`, { x: cx + 0.15, y: midY, w: colW - 0.30, h: midH, fontSize: 16, bold: true, color: '28245F', fontFace: FONT, valign: 'middle', align: 'center' });
  });
  // 底层论据
  const botY = midY + midH + GAP, botH = 7.5 - 0.20 - botY;
  p3.forEach((pillar, i) => {
    const cx = GX + i * (colW + GAP);
    s.addShape(pres.ShapeType.rect, { x: cx, y: botY, w: colW, h: botH, fill: { color: 'E7F1FF' }, rectRadius: 0.12, line: { type: 'none' }, shadow: mkShS() });
    const pts = (pillar.points || []).slice(0, 4);
    if (pts.length) {
      const items = pts.map((p, j) => ({ text: p, options: { bullet: true, breakLine: j < pts.length - 1, fontSize: 14, color: '373838', fontFace: FONT, paraSpaceAfter: 10 } }));
      s.addText(items, { x: cx + 0.15, y: botY + 0.15, w: colW - 0.30, h: botH - 0.30, valign: 'top' });
    }
  });
}

// ══════════════════════════════════════════════════════════════════════
// 版式 14 — 支柱卡（三列并列）
// ══════════════════════════════════════════════════════════════════════
function addPillarSlide(pres, { title, subtitle, pillars }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, false);
  addContentTitle(s, title, subtitle);
  const n = pillars.length, cW = (12.256 - (n-1)*0.24) / n;
  const cY = 1.60, cH = 5.20;
  pillars.forEach((p, i) => {
    const x = 0.434 + i * (cW + 0.24);
    const col = COLOR_SEQ[i % COLOR_SEQ.length];
    s.addShape(pres.ShapeType.roundRect, { x, y: cY, w: cW, h: cH, fill: { color: 'E7F1FF' }, rectRadius: 0.15, shadow: mkShS() });
    // 序号
    s.addText(p.num || `0${i+1}`, { x, y: cY + 0.20, w: cW, h: 0.80, fontSize: 48, color: col, bold: true, fontFace: FONT, align: 'center', margin: 0, valign: 'middle' });
    // 标题
    s.addText(p.title || '', { x: x + 0.15, y: cY + 1.10, w: cW - 0.30, h: 0.50, fontSize: 18, color: '373838', bold: true, fontFace: FONT, valign: 'middle' });
    // 描述
    if (p.desc) s.addText(p.desc, { x: x + 0.15, y: cY + 1.70, w: cW - 0.30, h: 3.4, fontSize: 14, color: '6b6964', fontFace: FONT, valign: 'top', wrap: true, margin: 0 });
  });
  addFooter(s, pageNum, false);
}

// ══════════════════════════════════════════════════════════════════════
// 版式 08 — 图文并排
// ══════════════════════════════════════════════════════════════════════
function addImageTextSlide(pres, { title, subtitle, content, imageNote }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, false);
  addContentTitle(s, title, subtitle);
  // 左列文字
  s.addText(content, { x: 0.435, y: 1.55, w: 6.2, h: 5.3, fontSize: 16, color: '373838', fontFace: FONT, valign: 'top', wrap: true, margin: 0 });
  // 右列图片占位
  s.addShape(pres.ShapeType.roundRect, { x: 7.0, y: 1.55, w: 5.7, h: 4.8, fill: { color: 'E7F1FF' }, rectRadius: 0.15, shadow: mkShS() });
  s.addText(imageNote || '配图位置', { x: 7.0, y: 3.5, w: 5.7, h: 0.5, fontSize: 14, color: 'BFBFBF', fontFace: FONT, align: 'center', margin: 0 });
  addFooter(s, pageNum, false);
}

// ══════════════════════════════════════════════════════════════════════
// 版式 16 — 金句页
// ══════════════════════════════════════════════════════════════════════
function addQuoteSlide(pres, { title, quote, source }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: '2971EB' };
  addLogo(s, true);
  if (title) s.addText(title, { x: 0.917, y: 0.5, w: 11.5, h: 0.6, fontSize: 24, color: 'E7F1FF', fontFace: FONT, margin: 0 });
  s.addText(quote, { x: 1.2, y: 2.5, w: 10.9, h: 2.5, fontSize: 36, color: 'FFFFFF', bold: true, fontFace: FONT, align: 'center', valign: 'middle', wrap: true, margin: 0 });
  if (source) s.addText(source, { x: 1.2, y: 5.5, w: 10.9, h: 0.5, fontSize: 16, color: 'E7F1FF', fontFace: FONT, align: 'center', margin: 0 });
  addFooter(s, pageNum, true);
}

// ══════════════════════════════════════════════════════════════════════
// 版式 10 — 结尾页
// ══════════════════════════════════════════════════════════════════════
function addClosingSlide(pres, pageNum) {
  const s = pres.addSlide();
  s.addImage({ data: A.BG_CLOSING, x: 0, y: 0, w: 13.333, h: 7.517 });
  s.addImage({ data: A.CLOSING_THANKS, x: 4.0, y: 2.5, w: 5.333, h: 1.5 });
  s.addText('多语言致谢', { x: 1.5, y: 4.5, w: 10.333, h: 0.5, fontSize: 16, color: 'FFFFFF', fontFace: FONT, align: 'center', margin: 0 });
  s.addText('Thank You | 谢谢 | Merci | Danke | Grazie', { x: 1.5, y: 5.2, w: 10.333, h: 0.5, fontSize: 14, color: 'E7F1FF', fontFace: FONT, align: 'center', margin: 0 });
}

// ══════════════════════════════════════════════════════════════════════
// 主函数
// ══════════════════════════════════════════════════════════════════════
async function main() {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.title = 'OpenAI Codex 团队产品方法论';
  pres.author = '金蝶国际软件集团';

  let pg = 1;

  // ── P01 封面 ────────────────────────────────────────────────────────
  addCoverSlide(pres, {
    title: 'OpenAI Codex 团队\n如何用产品构建产品',
    subtitle: '整个 Spec 只有 10 个要点',
    author: '产品方法论分享',
    dept: '',
    date: '2026.05'
  }, pg++);

  // ── P02 目录 ────────────────────────────────────────────────────────
  addTOCSlide(pres, [
    { num: '01', title: '极简文档体系', sub: '10 个要点就够了', page: 4 },
    { num: '02', title: '规划哲学', sub: '只做近期和远期，不做中期', page: 8 },
    { num: '03', title: '团队运作', sub: '海盗船式运作，PM是填空岗位', page: 12 },
    { num: '04', title: '招聘标准', sub: '能动性 > 作品 > 不看简历', page: 19 },
  ], pg++);

  // ── P03 章节分隔 Act I ───────────────────────────────────────────────
  addSectionSlide(pres, {
    num: '01',
    title: '极简文档体系',
    subtitle: '10 个要点就够了',
    bgIdx: 0
  }, pg++);

  // ── P04 数据卡片：关键数字 ───────────────────────────────────────────
  addDataCardSlide(pres, {
    title: 'Codex 团队关键数字',
    subtitle: '整个产品 spec 只有这些',
    cards: [
      { num: '10', unit: '要点', label: 'Spec 长度', sub: '整个产品规格文档只有10个要点', color: '2971EB' },
      { num: '50-100', unit: '人', label: '团队规模', sub: '50-100人团队长期只有一个PM', color: '22AAFE' },
      { num: '1', unit: 'PM', label: '产品经理', sub: '直到最近才有了第二个产品经理', color: '05C8C8' },
    ]
  }, pg++);

  // ── P05 对比栏：传统Spec vs 10要点 ─────────────────────────────────────
  addCompareSlide(pres, {
    title: '传统 Spec vs 10 个要点',
    subtitle: '文档方式的变化',
    left: {
      title: '传统产品规格',
      color: '966EFF',
      points: [
        { text: '详细功能描述，多人协调', bold: true },
        { text: '先写文档再开发' },
        { text: '一个人脑子装不下' },
        { text: '需要三个人协调' },
      ]
    },
    right: {
      title: 'Codex 团队做法',
      color: '2971EB',
      points: [
        { text: '几乎不写规格文档', bold: true },
        { text: '最多10个要点' },
        { text: '一个人用Codex探索清楚' },
        { text: '离金属最近的人做决策', bold: true },
      ]
    }
  }, pg++);

  // ── P06 图文并排：PM用AI的三种模式 ─────────────────────────────────────
  addImageTextSlide(pres, {
    title: 'PM 使用 Codex 的三种模式',
    subtitle: 'Alexander Embiricos 的实践经验',
    content: `• 简单改动直接上手：生成代码、测试、提交 PR

• 中等复杂度改动：让 Codex 先做实现计划

• 模糊想法探索：和模型对话探索代码库，建立心智模型，把理解分享给工程师

"我不是在写代码，我是在建立心智模型。"

设计师现在写的代码量超过了六个月前一个工程师写的代码量。`,
    imageNote: '三种模式示意图'
  }, pg++);

  // ── P07 章节分隔 Act II ───────────────────────────────────────────────
  addSectionSlide(pres, {
    num: '02',
    title: '规划哲学',
    subtitle: '只做近期和远期，不做中期',
    bgIdx: 1
  }, pg++);

  // ── P08 数据卡片：规划时间轴 ───────────────────────────────────────────
  addDataCardSlide(pres, {
    title: 'OpenAI 规划框架',
    subtitle: '近期 vs 远期 vs 无中期',
    cards: [
      { num: '8', unit: '周', label: '近期规划', sub: '最多8周，具体目标，团队集中发力', color: '2971EB' },
      { num: '1+', unit: '年', label: '远期规划', sub: '一种"感觉"，方向性判断', color: '05C8C8' },
      { num: '0', unit: '中期', label: '中期路线图', sub: '基本不存在，模型能力快速变化', color: '966EFF' },
    ]
  }, pg++);

  // ── P09 金字塔：Codex App诞生 ───────────────────────────────────────────
  addPyramidSlide(pres, {
    title: 'Codex App 诞生过程',
    subtitle: '从18个终端窗口到一个桌面应用',
    conclusion: '远期愿景：用户需要界面让多Agent协作变得自然',
    pillars: [
      { label: '问题出现', points: ['GPT-5.2 Codex发布', '用户用tmux开18个窗口', '只有顶尖1%工程师会用'] },
      { label: '内部争论', points: ['IDE扩展已经很受欢迎', 'CLI也有需求', '真的需要独立app吗'] },
      { label: '项目启动', points: ['不是spec推动', '而是"为什么"文档', 'App形态在构建中成形'] },
    ]
  }, pg++);

  // ── P10 支柱卡：产品设计分层 ───────────────────────────────────────────
  addPillarSlide(pres, {
    title: '产品设计分层哲学',
    subtitle: '先为 power user 做可配置性，再为普通用户做简化',
    pillars: [
      { num: '01', title: '核心交互极简', desc: '让产品几乎隐形，让模型能力自然显现' },
      { num: '02', title: '分层解锁功能', desc: '像打游戏一样一层层解锁更深功能' },
      { num: '03', title: '前沿用户探索', desc: '最前沿的用户和团队一起住在未来，拉着团队往前走' },
    ]
  }, pg++);

  // ── P11 章节分隔 Act III ───────────────────────────────────────────────
  addSectionSlide(pres, {
    num: '03',
    title: '团队运作',
    subtitle: '海盗船式运作，PM是填空岗位',
    bgIdx: 2
  }, pg++);

  // ── P12 金字塔：海盗船式运作 ───────────────────────────────────────────
  addPyramidSlide(pres, {
    title: '海盗船式团队运作',
    subtitle: '50-100人团队刻意保持低摩擦',
    conclusion: '有意识地像一支海盗船，跨职能协调极少',
    pillars: [
      { label: '执行模式', points: ['大量使用Codex', '了解Slack反馈', '让Codex总结并发到Linear', '直接提交代码改动'] },
      { label: '协调模式', points: ['规划新方向', '更多时间思考沟通', '用Codex做文字工作'] },
      { label: '极简汇报', points: ['大部分人是工程师', '汇报结构极简', '入职无任务列表'] },
    ]
  }, pg++);

  // ── P13 数据卡片：团队数据 ───────────────────────────────────────────
  addDataCardSlide(pres, {
    title: '团队数据',
    subtitle: '',
    cards: [
      { num: '50-100', unit: '人', label: '团队规模', sub: 'Codex核心团队', color: '2971EB' },
      { num: '1', unit: 'PM', label: '产品经理', sub: '长期只有一个PM', color: '22AAFE' },
      { num: '极少', unit: '协调', label: '跨职能协调', sub: '刻意保持低摩擦', color: '05C8C8' },
    ]
  }, pg++);

  // ── P14 对比栏：传统PM vs 填空PM ─────────────────────────────────────
  addCompareSlide(pres, {
    title: 'PM 角色转变',
    subtitle: '从领导岗位到填空岗位',
    left: {
      title: '传统 PM',
      color: '966EFF',
      points: [
        { text: '领导岗位', bold: true },
        { text: '任务分类和项目管理' },
        { text: '集中精力写代码' },
        { text: '协调多人工作' },
      ]
    },
    right: {
      title: '填空 PM',
      color: '2971EB',
      points: [
        { text: '填补空缺岗位', bold: true },
        { text: 'AI工具让每个人做别人的工作' },
        { text: '人才栈压缩正在发生' },
        { text: '每个决策更纯粹', bold: true },
      ]
    }
  }, pg++);

  // ── P15 数据卡片：用户增长 ───────────────────────────────────────────
  addDataCardSlide(pres, {
    title: 'Codex 用户数据',
    subtitle: '从开发者工具到通用平台',
    cards: [
      { num: '200', unit: '万+', label: '周活跃用户', sub: '截至2026年3月', color: '2971EB' },
      { num: '100', unit: '万+', label: '首月用户', sub: '发布当月', color: '22AAFE' },
      { num: '9', unit: '亿', label: 'ChatGPT用户', sub: '目标：把Codex带给所有用户', color: '05C8C8' },
    ]
  }, pg++);

  // ── P16 支柱卡：Codex作为平台入口 ─────────────────────────────────────
  addPillarSlide(pres, {
    title: 'Codex 作为开发者平台入口',
    subtitle: '不只是编码，而是所有开发者平台的起点',
    pillars: [
      { num: '01', title: 'Imagen 图像生成', desc: '直接教开发者用Codex + Skill完成集成' },
      { num: '02', title: 'Sora 视频生成', desc: 'Codex可以是起点' },
      { num: '03', title: 'Speech 语音对话', desc: '所有开发者平台的入口' },
    ]
  }, pg++);

  // ── P17 金句页 ────────────────────────────────────────────────────────
  addQuoteSlide(pres, {
    title: '',
    quote: '"做任何事情所需的人越少，那件事就做得越好。每个决策都更纯粹。"',
    source: '— Alexander Embiricos'
  }, pg++);

  // ── P18 章节分隔 Act IV ───────────────────────────────────────────────
  addSectionSlide(pres, {
    num: '04',
    title: '招聘标准',
    subtitle: '能动性 > 作品 > 不看简历',
    bgIdx: 0
  }, pg++);

  // ── P19 支柱卡：招聘三要素 ───────────────────────────────────────────
  addPillarSlide(pres, {
    title: '招聘标准',
    subtitle: '给我看你做了什么',
    pillars: [
      { num: '01', title: '能动性 Agency', desc: '主动发现问题、不介意推翻决策、愿意接手未知领域' },
      { num: '02', title: '作品优先', desc: '看链接和想法，不看自我介绍和简历' },
      { num: '03', title: '不看证书', desc: '完全不知道团队是什么学校毕业的' },
    ]
  }, pg++);

  // ── P20 结尾页 ────────────────────────────────────────────────────────
  const s = pres.addSlide();
  s.background = { color: '28245F' };
  addLogo(s, true);
  s.addText('关键问题', { x: 0.917, y: 1.5, w: 11.5, h: 0.6, fontSize: 24, color: '00CCFE', fontFace: FONT, margin: 0 });
  s.addText('"离金属最近的人做决策"\n还能持续吗？', { x: 1.2, y: 2.5, w: 10.9, h: 2.5, fontSize: 36, color: 'FFFFFF', bold: true, fontFace: FONT, align: 'center', valign: 'middle', wrap: true, margin: 0 });
  s.addText('当用户从"写代码的人"扩展到"所有人"，产品决策复杂度会发生质变', { x: 1.2, y: 5.2, w: 10.9, h: 0.8, fontSize: 16, color: 'E7F1FF', fontFace: FONT, align: 'center', wrap: true, margin: 0 });
  addFooter(s, pg++, true);

  await pres.writeFile({ fileName: 'output.pptx' });
  console.log(`✓ output.pptx（共 ${pg-1} 页）`);
}

main().catch(e => { console.error(e); process.exit(1); });