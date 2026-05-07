#!/usr/bin/env bash
# postinstall — create Claude Code skill symlink after npm install
set -euo pipefail

PKG_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SKILL_DIR="$HOME/.claude/skills/kingdee-ppt"

mkdir -p "$HOME/.claude/skills"

if [ -d "$SKILL_DIR" ] && [ ! -L "$SKILL_DIR" ]; then
  echo "Backing up existing skill directory to $SKILL_DIR.bak"
  mv "$SKILL_DIR" "$SKILL_DIR.bak.$(date +%s)"
fi

ln -sf "$PKG_DIR" "$SKILL_DIR"
echo "kingdee-ppt skill linked: $SKILL_DIR -> $PKG_DIR"
