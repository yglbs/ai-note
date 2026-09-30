#!/usr/bin/env bash
# 编译并安装 MindBook.app 到桌面和启动台（~/Applications）。
# 之后双击图标即可：自动用 .tools/node 拉起本地服务并打开窗口。
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
STAGE="$ROOT/desktop/.build/MindBook.app"
NODE="$ROOT/.tools/node/bin/node"
NEXT="$ROOT/node_modules/next/dist/bin/next"

if [[ ! -x "$NODE" ]]; then
  echo "缺少便携 Node：请先准备 $ROOT/.tools/node（Node 22）"
  exit 1
fi
if [[ ! -f "$NEXT" ]]; then
  echo "缺少依赖：请先执行"
  echo "  export PATH=\"$ROOT/.tools/node/bin:\$PATH\" && npm install"
  exit 1
fi

rm -rf "$STAGE"
mkdir -p "$STAGE/Contents/MacOS" "$STAGE/Contents/Resources"
swiftc -O -o "$STAGE/Contents/MacOS/MindBook" \
  "$ROOT/desktop/MindBook.swift" \
  -framework Cocoa -framework WebKit
cp "$ROOT/desktop/Info.plist" "$STAGE/Contents/Info.plist"
cp "$ROOT/desktop/AppIcon.icns" "$STAGE/Contents/Resources/AppIcon.icns"
printf '%s\n' "$ROOT" > "$STAGE/Contents/Resources/project-root"
xattr -cr "$STAGE" 2>/dev/null || true
codesign --force --deep --sign - "$STAGE"

mkdir -p "$HOME/Applications"
rm -rf "$HOME/Desktop/MindBook.app" "$HOME/Applications/MindBook.app"
cp -R "$STAGE" "$HOME/Desktop/MindBook.app"
cp -R "$STAGE" "$HOME/Applications/MindBook.app"

echo "已安装："
echo "  $HOME/Desktop/MindBook.app"
echo "  $HOME/Applications/MindBook.app"
echo "双击桌面上的 MindBook 即可打开。若被系统拦住，右键图标选「打开」。"
