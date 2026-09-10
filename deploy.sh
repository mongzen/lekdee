#!/usr/bin/env bash
# =============================================================================
# deploy.sh — Production deploy script for lekdee (Next.js 15 + PM2 + Nginx)
# Usage (on server): bash deploy.sh
# =============================================================================

set -euo pipefail   # หยุดทันทีถ้ามี error หรือ unbound variable

# ── CONFIG (แก้ให้ตรงกับ server ของคุณ) ──────────────────────────────────────
APP_NAME="lekdee"
APP_DIR="/var/www/lekdee"          # path ของโปรเจกต์บน server
BRANCH="main"                      # branch ที่ใช้ deploy
NODE_VERSION="20"                  # Node.js major version
PM2_CONFIG="ecosystem.config.cjs"
# ─────────────────────────────────────────────────────────────────────────────

# สีสำหรับ log ให้อ่านง่าย
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
NC="\033[0m"  # No Color

log()   { echo -e "${GREEN}[DEPLOY]${NC} $1"; }
warn()  { echo -e "${YELLOW}[WARN]${NC}  $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

log "================================================="
log " Starting deploy: $APP_NAME"
log " Branch: $BRANCH  |  $(date '+%Y-%m-%d %H:%M:%S')"
log "================================================="

# ── 1. ตรวจสอบ dependencies ────────────────────────────────────────────────
log "Step 1/6 — Checking dependencies..."

command -v node >/dev/null 2>&1 || error "Node.js not found. Install Node.js $NODE_VERSION first."
command -v npm  >/dev/null 2>&1 || error "npm not found."
command -v pm2  >/dev/null 2>&1 || error "PM2 not found. Run: npm install -g pm2"
command -v git  >/dev/null 2>&1 || error "Git not found."

CURRENT_NODE=$(node -v)
log "  Node.js: $CURRENT_NODE  ✓"
log "  PM2: $(pm2 -v)  ✓"

# ── 2. เข้า directory โปรเจกต์ ─────────────────────────────────────────────
log "Step 2/6 — Navigating to project directory: $APP_DIR"
cd "$APP_DIR" || error "Cannot cd to $APP_DIR. Make sure the path exists."

# ── 3. ดึงโค้ดล่าสุดจาก Git ────────────────────────────────────────────────
log "Step 3/6 — Pulling latest code from branch: $BRANCH"
git fetch origin
git checkout "$BRANCH"
git reset --hard "origin/$BRANCH"
log "  Latest commit: $(git log -1 --oneline)"

# ── 4. ติดตั้ง dependencies ────────────────────────────────────────────────
log "Step 4/6 — Installing npm dependencies (production)..."
npm ci --omit=dev

# ── 5. Build Next.js ────────────────────────────────────────────────────────
log "Step 5/6 — Building Next.js app..."

# ตรวจว่ามีไฟล์ .env อยู่ไหม (จำเป็นสำหรับ build)
if [[ ! -f ".env" ]]; then
  warn ".env file not found! Copy .env.example → .env แล้วกรอกค่าก่อน deploy"
  warn "Run: cp .env.example .env && nano .env"
fi

npm run build
log "  Build completed ✓"

# ── 6. Restart / Start PM2 ─────────────────────────────────────────────────
log "Step 6/6 — Restarting app with PM2..."

if pm2 list | grep -q "$APP_NAME"; then
  log "  App found in PM2 — reloading (zero-downtime)..."
  pm2 reload "$PM2_CONFIG" --update-env
else
  log "  App not in PM2 — starting fresh..."
  pm2 start "$PM2_CONFIG"
fi

# บันทึก PM2 process list (รัน auto-start หลัง server reboot)
pm2 save

log "================================================="
log " Deploy complete! 🚀  App: $APP_NAME"
log " PM2 status:"
pm2 list
log "================================================="
