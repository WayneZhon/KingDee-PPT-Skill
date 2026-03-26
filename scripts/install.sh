#!/bin/bash

set -e

echo "========================================"
echo "  金蝶 PPT Skill 一键安装脚本"
echo "========================================"
echo ""

# 检测 Claude Code 目录
if [ -d "$HOME/.claude/skills" ]; then
    SKILL_DIR="$HOME/.claude/skills/kingdee-ppt"
    echo "✓ 检测到 Claude Code: $HOME/.claude/skills/"
elif [ -d "$HOME/Library/Application Support/claude/skills" ]; then
    SKILL_DIR="$HOME/Library/Application Support/claude/skills/kingdee-ppt"
    echo "✓ 检测到 Claude Code: $HOME/Library/Application Support/claude/skills/"
else
    echo "❌ 未检测到 Claude Code 安装目录"
    echo "   请确保已安装 Claude Code（macOS App Store / Desktop App）"
    echo ""
    echo "   如果只是导入 Prompt 模板（Qoderwork / Kiro），请手动克隆仓库："
    echo "   git clone https://github.com/WayneZhon/KingDee-PPT-Skill.git"
    exit 1
fi

# 检查是否已安装
if [ -d "$SKILL_DIR" ]; then
    echo "⚠ 检测到已安装，是否更新？(y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo "🔄 更新到最新版本..."
        cd "$SKILL_DIR" && git pull origin main
    else
        echo "✅ 已跳过更新"
        exit 0
    fi
else
    echo "📥 开始安装..."
    git clone https://github.com/WayneZhon/KingDee-PPT-Skill.git "$SKILL_DIR"
fi

# 检查是否需要安装依赖
echo ""
echo "📦 检查 Node.js 依赖..."
if command -v npm &> /dev/null; then
    cd "$SKILL_DIR"
    if [ ! -f "package.json" ]; then
        echo "   package.json 不存在，创建..."
        cat > package.json <<EOF
{
  "name": "kingdee-ppt-skill",
  "version": "1.0.0",
  "description": "金蝶 PPT 生成 Skill",
  "dependencies": {
    "pptxgenjs": "^3.12.0"
  }
}
EOF
    fi

    if [ ! -d "node_modules" ]; then
        echo "   安装依赖..."
        npm install
    else
        echo "   依赖已安装"
    fi
else
    echo "⚠ 未检测到 npm，跳过依赖安装"
    echo "   如需完整功能，请安装 Node.js：https://nodejs.org/"
fi

# 检查可选工具
echo ""
echo "🔧 检查可选工具..."
if command -v soffice &> /dev/null; then
    echo "   ✓ LibreOffice (soffice) 已安装"
else
    echo "   ⚠ LibreOffice 未安装（用于 PPT 转 PDF/图片预览）"
    echo "   macOS: brew install --cask libreoffice"
    echo "   Linux: sudo apt-get install libreoffice"
fi

if command -v pdftoppm &> /dev/null; then
    echo "   ✓ Poppler (pdftoppm) 已安装"
else
    echo "   ⚠ Poppler 未安装（用于 PDF 转图片）"
    echo "   macOS: brew install poppler"
    echo "   Linux: sudo apt-get install poppler-utils"
fi

echo ""
echo "========================================"
echo "  ✅ 安装完成！"
echo "========================================"
echo ""
echo "下一步操作："
echo "1. 重启 Claude Code（关闭后重新打开）"
echo "2. 在对话框中输入：""
echo "   帮我做个金蝶 PPT"
echo "3. Skill 会自动激活，开始询问场景和内容"
echo ""
echo "如需更新：重新运行此脚本即可"
echo ""
echo "反馈问题："
echo "  https://github.com/WayneZhon/KingDee-PPT-Skill/issues"
echo ""
echo "查看文档："
echo "  https://github.com/WayneZhon/KingDee-PPT-Skill/blob/main/README.md"
echo ""
