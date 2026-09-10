#!/usr/bin/env bash
set -euo pipefail
APP_DIR=/home/kan-lekdee/htdocs/lekdee.kan.bio
if [ "$(id -un)" != 'kan-lekdee' ]; then
  echo 'Run as the kan-lekdee site user.' >&2
  exit 1
fi
cd "$APP_DIR"
if [ ! -f package-lock.json ] || [ ! -f ecosystem.config.cjs ]; then
  echo 'Upload the reviewed application source first.' >&2
  exit 1
fi
node -e "if(Number(process.versions.node.split('.')[0])<22) process.exit(1)"
umask 077
if [ ! -f .env.local ]; then
  printf 'APP_ORIGIN=https://lekdee.kan.bio\n' > .env.local
fi
npm ci --no-audit --no-fund
npm run build
if ! command -v pm2 >/dev/null 2>&1; then
  npm install --prefix "$HOME/.local/share/lekdee-runtime" pm2@6 --no-audit --no-fund
  export PATH="$HOME/.local/share/lekdee-runtime/node_modules/.bin:$PATH"
fi
pm2 startOrReload ecosystem.config.cjs --only lekdee --update-env
pm2 save
for attempt in $(seq 1 20); do
  if curl --fail --silent http://127.0.0.1:3002/api/health; then
    printf '\nApplication is healthy.\n'
    exit 0
  fi
  sleep 1
done
pm2 logs lekdee --nostream --lines 30
exit 1
