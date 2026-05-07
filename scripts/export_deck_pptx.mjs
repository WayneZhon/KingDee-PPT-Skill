#!/usr/bin/env node

/**
 * export_deck_pptx.mjs - Export HTML slides to editable PPTX
 * 金蝶版本 - 将多文件 HTML deck 导出为可编辑 PowerPoint 文件
 *
 * USAGE:
 *   node scripts/export_deck_pptx.mjs --slides <dir> --out deck.pptx
 *
 * FEATURES:
 *   - 每页 HTML 独立转换为 PPTX slide
 *   - 真文本框可编辑（PPT 双击可改）
 *   - 金蝶品牌色自动验证
 *   - 支持图片、形状、列表、文字
 *
 * DEPENDENCIES:
 *   npm install playwright pptxgenjs
 */

import pptxgen from 'pptxgenjs';
import html2pptx from './html2pptx.js';
import { glob } from 'glob';
import fs from 'fs';
import path from 'path';

// ══════════════════════════════════════════════════════════════════════
// CLI 参数解析
// ══════════════════════════════════════════════════════════════════════
function parseArgs(args) {
  const result = {
    slides: 'slides',
    out: 'output.pptx',
    title: '金蝶演示文稿',
    author: '金蝶国际软件集团',
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--slides' && args[i + 1]) {
      result.slides = args[i + 1];
      i++;
    } else if (args[i] === '--out' && args[i + 1]) {
      result.out = args[i + 1];
      i++;
    } else if (args[i] === '--title' && args[i + 1]) {
      result.title = args[i + 1];
      i++;
    } else if (args[i] === '--author' && args[i + 1]) {
      result.author = args[i + 1];
      i++;
    }
  }

  return result;
}

// ══════════════════════════════════════════════════════════════════════
// 主函数
// ══════════════════════════════════════════════════════════════════════
async function main() {
  const args = parseArgs(process.argv.slice(2));

  console.log(`\n┌─────────────────────────────────────┐`);
  console.log(`│  金蝶 HTML → PPTX 导出器 v1.0       │`);
  console.log(`├─────────────────────────────────────┤`);
  console.log(`│  Slides: ${args.slides.padEnd(20)}  │`);
  console.log(`│  Output: ${args.out.padEnd(20)}  │`);
  console.log(`└─────────────────────────────────────┘\n`);

  // 查找所有 HTML slide 文件
  const slideFiles = await glob(`${args.slides}/*.html`, {
    absolute: true,
    nodir: true,
  });

  if (slideFiles.length === 0) {
    console.error(`❌ 未找到 HTML 文件: ${args.slides}/*.html`);
    process.exit(1);
  }

  // 按文件名排序（确保页面顺序正确）
  slideFiles.sort((a, b) => {
    const numA = parseInt(path.basename(a).match(/^(\d+)/)?.[1] || '0');
    const numB = parseInt(path.basename(b).match(/^(\d+)/)?.[1] || '0');
    return numA - numB;
  });

  console.log(`✓ 找到 ${slideFiles.length} 个 slide 文件`);
  slideFiles.forEach((f, i) => {
    console.log(`  ${String(i + 1).padStart(2)}: ${path.basename(f)}`);
  });

  // 创建 PPTX
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';  // 13.333" × 7.5" (1920×1080 96dpi)
  pres.title = args.title;
  pres.author = args.author;
  pres.company = '金蝶国际软件集团';

  // 遍历转换每个 slide
  const errors = [];
  let successCount = 0;

  for (const slideFile of slideFiles) {
    const slideName = path.basename(slideFile);
    console.log(`\n转换: ${slideName}`);

    try {
      const { slide, placeholders } = await html2pptx(slideFile, pres);
      successCount++;
      console.log(`  ✓ 成功 (placeholders: ${placeholders.length})`);
    } catch (err) {
      errors.push({ file: slideName, error: err.message });
      console.error(`  ❌ 失败: ${err.message.split('\n')[0]}`);
    }
  }

  // 写入文件
  if (successCount > 0) {
    await pres.writeFile({ fileName: args.out });
    console.log(`\n✓ 导出完成: ${args.out}`);
    console.log(`  成功: ${successCount}/${slideFiles.length} 页`);
  }

  if (errors.length > 0) {
    console.log(`\n⚠️ 警告：${errors.length} 个 slide 转换失败`);
    errors.forEach((e) => {
      console.log(`  - ${e.file}: ${e.error.split('\n')[0]}`);
    });

    // 如果所有页面都失败，退出并报错
    if (successCount === 0) {
      console.error('\n❌ 所有页面转换失败，未生成 PPTX 文件');
      process.exit(1);
    }
  }

  console.log('\n提示: PPTX 文件中的文本框可双击编辑');
  console.log('      字体可能回落到系统字体，建议安装 Microsoft YaHei');
}

main().catch((err) => {
  console.error('\n❌ 导出失败:', err.message);
  process.exit(1);
});