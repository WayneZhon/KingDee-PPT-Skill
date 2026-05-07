# 金蝶 PPT 内容版式 Layout Content v3.1
> 版式编号：04-09
> 用途：要点列表、数据卡片、左右对比、横向流程、图文并排、时间轴
>
> **依赖**：需先引用 layout-base.md 和 design-tokens.md

---

## 版式 04 — 内容页：要点列表

```javascript
function addBulletSlide(pres, A, { title, subtitle, points }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);
  const items = points.map((p, i) => ({
    text: p.text,
    options: {
      bullet: true,
      breakLine: i < points.length - 1,
      fontSize: p.bold ? 16 : 14,
      color: p.highlight ? '2971EB' : (p.gold ? 'FFB61A' : '373838'),
      bold: p.bold || false,
      fontFace: 'Microsoft YaHei',
      paraSpaceAfter: 16,
    }
  }));
  s.addText(items, { x:0.434, y:1.503, w:12.256, h:5.3, valign:'top', fontFace:'Microsoft YaHei' });
  addFooter(s, pageNum, false);
}
```

---

## 版式 05 — 内容页：数据卡片

```javascript
// cards: [{ num, unit, label, sub, color }]（最多4张）
function addDataCardSlide(pres, A, { title, subtitle, cards }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);
  const n = cards.length, cW = (12.256 - (n-1)*0.24) / n;
  const cY = 1.60, cH = 5.20, sX = 0.434;
  cards.forEach((c, i) => {
    const x = sX + i * (cW + 0.24);
    const col = c.color || COLOR_SEQ[i % COLOR_SEQ.length];
    s.addShape(pres.ShapeType.roundRect, { x, y:cY, w:cW, h:cH, fill:{ color:'E7F1FF' }, rectRadius:0.15, shadow:mkShS() });
    s.addShape(pres.ShapeType.rect, { x, y:cY, w:cW, h:0.55, fill:{ color:col } });
    s.addText(c.label || '', { x, y:cY, w:cW, h:0.55, fontSize:15, color:'FFFFFF', bold:true, fontFace:'Microsoft YaHei', align:'center', margin:0, valign:'middle' });
    s.addText((c.num || '') + (c.unit ? (' ' + c.unit) : ''), { x, y:cY+0.70, w:cW, h:1.50, fontSize:60, color:col, bold:true, fontFace:'Microsoft YaHei', align:'center', margin:0, valign:'middle' });
    if (c.sub) s.addText(c.sub, { x:x+0.12, y:cY+2.30, w:cW-0.24, h:2.8, fontSize:14, color:'373838', fontFace:'Microsoft YaHei', valign:'top', margin:0, wrap:true });
  });
  addFooter(s, pageNum, false);
}
```

---

## 版式 06 — 内容页：左右对比

```javascript
function addCompareSlide(pres, A, { title, subtitle, left, right }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);
  [[left, 0.434], [right, 6.70]].forEach(([col, x]) => {
    const c = col.color || '2971EB', w = 6.05;
    s.addShape(pres.ShapeType.roundRect, { x, y:1.55, w, h:5.1, fill:{ color:'E7F1FF' }, rectRadius:0.15, shadow:mkShS() });
    s.addShape(pres.ShapeType.rect, { x, y:1.55, w, h:0.62, fill:{ color:c } });
    s.addText(col.title, { x, y:1.55, w, h:0.62, fontSize:18, color:'FFFFFF', bold:true, fontFace:'Microsoft YaHei', align:'center', margin:0, valign:'middle' });
    const pts = (col.points||[]).map((p,j) => ({ text:p.text, options:{ bullet:true, breakLine:j<col.points.length-1, fontSize:16, color:p.bold?c:'373838', bold:p.bold||false, fontFace:'Microsoft YaHei', paraSpaceAfter:12 } }));
    if (pts.length) s.addText(pts, { x:x+0.18, y:2.28, w:w-0.36, h:4.22, valign:'top' });
  });
  addFooter(s, pageNum, false);
}
```

---

## 版式 07 — 内容页：横向流程步骤

```javascript
function addFlowSlide(pres, A, { title, subtitle, steps, note }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);
  const n = steps.length, sX = 0.434, aW = 12.256;
  const sW = (aW - (n-1)*0.28) / n, sY = 2.0, sH = 3.5;
  steps.forEach((step, i) => {
    const x = sX + i*(sW+0.28), c = COLOR_SEQ[i % COLOR_SEQ.length];
    s.addShape(pres.ShapeType.roundRect, { x, y:sY, w:sW, h:sH, fill:{ color:'E7F1FF' }, rectRadius:0.15, shadow:mkShS() });
    s.addShape(pres.ShapeType.rect, { x, y:sY, w:sW, h:0.52, fill:{ color:c } });
    s.addText(`Step ${i+1}`, { x, y:sY, w:sW, h:0.52, fontSize:14, color:'FFFFFF', bold:true, fontFace:'Microsoft YaHei', align:'center', margin:0, valign:'middle' });
    s.addText(step.text, { x:x+0.1, y:sY+0.62, w:sW-0.2, h:sH-0.72, fontSize:14, color:'373838', fontFace:'Microsoft YaHei', valign:'top', margin:4 });
    if (i < n-1) s.addShape(pres.ShapeType.rect, { x:x+sW+0.04, y:sY+sH/2-0.04, w:0.20, h:0.07, fill:{ color:'CCCCCC' } });
  });
  if (note) s.addText(`⚠ ${note}`, { x:0.434, y:5.8, w:12.256, h:0.35, fontSize:12, color:'FFB61A', fontFace:'Microsoft YaHei', margin:0 });
  addFooter(s, pageNum, false);
}
```

---

## 版式 08 — 内容页：图文并排

```javascript
function addImageTextSlide(pres, A, { title, subtitle, imgData, imgSide, placeholder, points }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);
  const imgX = imgSide==='left' ? 0.434 : 6.98;
  const txtX = imgSide==='left' ? 7.10 : 0.434;
  const imgW=6.10, imgH=5.25, cY=1.55;
  if (imgData) {
    s.addImage({ data:imgData, x:imgX, y:cY, w:imgW, h:imgH, sizing:{ type:'contain', w:imgW, h:imgH } });
  } else {
    s.addShape(pres.ShapeType.rect, { x:imgX, y:cY, w:imgW, h:imgH, fill:{ color:'E7F1FF' }, line:{ color:'2971EB', width:1, dashType:'dash' } });
    if (placeholder) s.addText(placeholder, { x:imgX, y:cY+imgH/2-0.3, w:imgW, h:0.6, fontSize:14, color:'2971EB', align:'center', italic:true, fontFace:'Microsoft YaHei', margin:0 });
  }
  const items = (points||[]).map((p,i) => ({ text:p.text, options:{ bullet:true, breakLine:i<points.length-1, fontSize:p.bold?19:17, color:p.highlight?'2971EB':'373838', bold:p.bold||false, fontFace:'Microsoft YaHei', paraSpaceAfter:14 } }));
  if (items.length) s.addText(items, { x:txtX, y:cY+0.2, w:5.8, h:5.05, valign:'top' });
  addFooter(s, pageNum, false);
}
```

---

## 版式 09 — 内容页：时间轴

```javascript
function addTimelineSlide(pres, A, { title, subtitle, milestones }, pageNum) {
  const s = pres.addSlide();
  s.background = { color: 'FFFFFF' };
  addLogo(s, A, false);
  addContentTitle(s, title, subtitle);
  const n = milestones.length, lineY=3.8, sX=0.80, span=11.5;
  s.addShape(pres.ShapeType.line, { x:sX, y:lineY, w:span, h:0, line:{ color:'2971EB', width:2 } });
  milestones.forEach((m, i) => {
    const x = sX + (span/(n-1||1))*i;
    s.addShape(pres.ShapeType.oval, { x:x-0.13, y:lineY-0.13, w:0.26, h:0.26, fill:{ color:'2971EB' } });
    const isUp = i%2===0;
    s.addText(m.date, { x:x-0.9, y:isUp?lineY-1.2:lineY+0.2, w:1.8, h:0.3, fontSize:13, color:'2971EB', bold:true, fontFace:'Microsoft YaHei', align:'center', margin:0 });
    s.addText(m.event, { x:x-0.9, y:isUp?lineY-0.85:lineY+0.55, w:1.8, h:0.55, fontSize:13, color:'373838', bold:true, fontFace:'Microsoft YaHei', align:'center', margin:0 });
    if (m.detail) s.addText(m.detail, { x:x-0.9, y:isUp?lineY+0.2:lineY-0.85, w:1.8, h:0.5, fontSize:11, color:'666666', fontFace:'Microsoft YaHei', align:'center', margin:0 });
  });
  addFooter(s, pageNum, false);
}
```