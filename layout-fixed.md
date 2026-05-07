# 金蝶 PPT 固定版式 Layout Fixed v3.1
> 版式编号：01-03, 10
> 用途：封面、目录、章节分隔、结尾页（固定模板，不可修改布局）
>
> **依赖**：需先引用 layout-base.md 和 design-tokens.md

---

## 版式 01 — 封面页

**背景**：`BG_COVER` 全幅 ｜ **无 Logo**

```javascript
function addCoverSlide(pres, A, { title, subtitle, author, dept, date }, pageNum) {
  const s = pres.addSlide();
  s.addImage({ data: A.BG_COVER, x: 0, y: 0, w: 13.333, h: 7.517 });
  s.addText(title, {
    x: 0.917, y: 2.247, w: 11.500, h: 1.450,
    fontSize: 54, color: 'FFFFFF', bold: true,
    fontFace: 'Microsoft YaHei', margin: 0, valign: 'middle'
  });
  if (subtitle) {
    s.addText(subtitle, {
      x: 0.917, y: 3.8, w: 8.0, h: 0.55,
      fontSize: 20, color: 'E7F1FF', bold: false,
      fontFace: 'Microsoft YaHei', margin: 0
    });
  }
  if (author) s.addText(author, { x:0.917, y:5.255, w:3.008, h:0.443, fontSize:16, color:'FFFFFF', fontFace:'Microsoft YaHei', margin:0 });
  if (dept)   s.addText(dept,   { x:0.917, y:5.715, w:3.002, h:0.473, fontSize:16, color:'FFFFFF', fontFace:'Microsoft YaHei', margin:0 });
  s.addText(date || '', { x:0.911, y:6.198, w:3.008, h:0.330, fontSize:16, color:'FFFFFF', fontFace:'Microsoft YaHei', margin:0 });
  s.addText('版权所有 © 金蝶国际软件集团有限公司   始创于 1993', {
    x:1.007, y:7.023, w:3.415, h:0.166, fontSize:8, color:'BFBFBF', fontFace:'Microsoft YaHei', margin:0 });
  s.addText('④ 内部公开 请勿外传', { x:3.877, y:6.998, w:1.599, h:0.190, fontSize:8, color:'BFBFBF', fontFace:'Microsoft YaHei', margin:0 });
}
```

---

## 版式 02 — 目录页

```javascript
function addTOCSlide(pres, A, sections, pageNum) {
  const s = pres.addSlide();
  s.addImage({ data: A.BG_TOC, x: 0, y: 0, w: 13.333, h: 7.500 });
  addLogo(s, A, false);
  s.addText('目  录', { x:0.435, y:0.230, w:4.0, h:0.513, fontSize:24, color:'373838', bold:true, fontFace:'Microsoft YaHei', margin:0 });
  const ROW_Y = [
    { numY:1.805, titleY:1.847, subY:2.343, pageY:1.900 },
    { numY:3.073, titleY:3.061, subY:3.510, pageY:3.080 },
    { numY:4.254, titleY:4.240, subY:4.679, pageY:4.261 },
    { numY:5.421, titleY:5.400, subY:5.846, pageY:5.441 },
  ];
  sections.slice(0, 4).forEach((sec, i) => {
    const row = ROW_Y[i];
    s.addText(sec.num, { x:0.429, y:row.numY, w:2.400, h:0.908, fontSize:80, color:'2971EB', bold:true, fontFace:'Microsoft YaHei', margin:0, valign:'top' });
    s.addText(sec.title, { x:3.050, y:row.titleY, w:7.650, h:0.449, fontSize:20, color:'373838', bold:true, fontFace:'Microsoft YaHei', margin:0, valign:'middle' });
    if (sec.sub) s.addText(sec.sub, { x:3.050, y:row.subY, w:7.650, h:0.312, fontSize:13, color:'BFBFBF', fontFace:'Microsoft YaHei', margin:0 });
    s.addText(`P  ${String(sec.page).padStart(2,'0')}`, { x:11.008, y:row.pageY, w:1.327, h:0.443, fontSize:14, color:'2971EB', fontFace:'Microsoft YaHei', align:'right', margin:0 });
    if (i < sections.length - 1) s.addShape(pres.ShapeType.line, { x:3.050, y:row.subY+0.35, w:9.241, h:0, line:{ color:'BFBFBF', width:0.5 } });
  });
  addFooter(s, pageNum, false);
}
```

---

## 版式 03 — 章节分隔页

```javascript
function addSectionSlide(pres, A, { num, title, subtitle, bgData }, pageNum) {
  const s = pres.addSlide();
  s.addImage({ data: bgData, x:0, y:0, w:13.333, h:7.516 });
  addLogo(s, A, true);
  s.addText(num, { x:0.403, y:0.284, w:2.365, h:2.205, fontSize:125, color:'00CCFE', bold:true, fontFace:'Microsoft YaHei', margin:0, valign:'top' });
  s.addShape(pres.ShapeType.rect, { x:0.603, y:2.489, w:0.876, h:0.096, fill:{ color:'00CCFE' } });
  s.addText(title, { x:0.516, y:2.970, w:10.870, h:0.667, fontSize:24, color:'FFFFFF', bold:true, fontFace:'Microsoft YaHei', margin:0, valign:'middle' });
  if (subtitle) s.addText(subtitle, { x:0.516, y:3.626, w:5.167, h:1.320, fontSize:16, color:'FFFFFF', fontFace:'Microsoft YaHei', margin:0 });
  addFooter(s, pageNum, true);
}
```

---

## 版式 10 — 结尾页

```javascript
function addClosingSlide(pres, A, pageNum) {
  const s = pres.addSlide();
  s.addImage({ data:A.BG_CLOSING, x:0, y:0, w:13.333, h:7.509 });
  s.addImage({ data:A.CLOSING_THANKS, x:0.794, y:2.802, w:7.562, h:2.735 });
  s.addText('版权所有 © 金蝶国际软件集团有限公司   始创于 1993', { x:1.095, y:6.961, w:2.965, h:0.188, fontSize:8, color:'BFBFBF', fontFace:'Microsoft YaHei', margin:0 });
  s.addText('④ 内部公开 请勿外传', { x:3.825, y:6.867, w:1.599, h:0.190, fontSize:8, color:'BFBFBF', fontFace:'Microsoft YaHei', margin:0 });
  addFooter(s, pageNum, true);
}
```