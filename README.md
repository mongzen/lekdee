# Lekdee / เลขดี

Next.js App Router + React + TypeScript. Dark green and neon visual theme based on the supplied inspiration.

## Local

Node.js 22 LTS recommended. `npm ci`, `npm run dev`. Production: `npm run build`, `npm start`.

## Working features

- Interactive ritual and animated wheel use unbiased Web Crypto random numbers, with no stakes or prizes.
- Device-local notes persist in localStorage, reject duplicate numbers, and support deletion.
- Trending feed filters and number saving. Fixture data is explicitly labeled as demonstration data.
- Downloadable calendar reminder for next regular 1st/16th date; user must import file and verify any official date changes.
- Chat API supports a configured server-side AI gateway; default is a clearly labeled template response.
- Community preview supports device-local toggle votes. No public posting or shared community database yet.
- Provider-backed trends and historical frequency APIs. No prediction is implied by historical frequency.

## Provider configuration

Copy `.env.example` to `.env.local` and supply authorized HTTPS endpoints. Values remain server-side. No provider keys are included. Gateways should enforce upstream authentication, rate limits, licensing, and content moderation. A single optional `DATA_PROVIDER_TOKEN` is sent as a bearer token to configured gateways; configure endpoints operated by the same trusted provider or extend to separate tokens before using different providers.

`TRENDS_API_URL`: GET JSON `{ "items": [{ "number":"89", "pair":"98", "tag":"กระแสออนไลน์", "title":"...", "detail":"...", "source":"...", "sourceUrl":"https://...", "publishedAt":"2026-09-10T00:00:00Z", "heat":75 }] }`. Heat is a normalized interest index, never a win probability. The provider is responsible for defining its calculation and gathering data under permission. The client polls every 60 seconds.

`LOTTERY_RESULTS_API_URL`: GET JSON `{ "sourceUrl":"https://...", "results":[{"date":"2026-09-01","lastTwo":"00"}] }`. Dates must be unique. These are schema examples, not real results.

### Built-in lottery provider (official GLO source)

The official [GLO](https://www.glo.or.th/) API only returns the *latest* draw, not history, so this repo ships a small self-hosted provider that accumulates results over time:

- `scripts/fetch-lottery.mjs` — POSTs to GLO's public `getLatestLottery` API, parses the Thai-formatted date, and appends any new draw to `data/lottery-history.json` (gitignored; created on first run; safe to re-run, duplicates are skipped).
- `app/api/internal/lottery-provider` — serves that file back in the exact schema `/api/statistics` expects, guarded by `DATA_PROVIDER_TOKEN` if set.

Setup:

1. Set `LOTTERY_RESULTS_API_URL=https://lekdee.kan.bio/api/internal/lottery-provider` (self-referencing) and set `DATA_PROVIDER_TOKEN` to a random secret — the same value is used both to call the internal endpoint and to authorize it.
2. Run `npm run fetch:lottery` once by hand to seed `data/lottery-history.json`, and `npm run fetch:lottery -- --dry-run` to test parsing without writing.
3. Add a cron entry as the `kan-lekdee` site user, e.g. once a month:
   ```
   0 6 2 * * cd /home/kan-lekdee/htdocs/lekdee.kan.bio && /usr/bin/npm run fetch:lottery >> logs/fetch-lottery.log 2>&1
   ```
   Note: GLO draws twice a month (1st and 16th) — a once-a-month run will only capture whichever draw already happened by that date. Run twice a month (e.g. days 2 and 17) to catch both.
4. `data/lottery-history.json` is gitignored on purpose so redeploys (`git reset --hard`, or re-extracting `release/lekdee-source.tar.gz`) never wipe accumulated history — back it up separately if you want durability beyond the server disk.

GLO's response field names (`#displayDate`, `#last2`) are documented but no worked JSON example is published; the parser searches the payload defensively and logs the raw response on the first run if the shape doesn't match, so verify `npm run fetch:lottery -- --dry-run` output once against the live API before relying on the cron.

`AI_GATEWAY_URL`: POST JSON `{message, system}` returns `{reply}`. Gateway must enforce the system policy and rate limits. Without configuration, the app uses explicit demo replies.

No news/social scraping is enabled. Facebook, TikTok, X, news feeds, and GLO require actual permitted source integrations before the app can claim live coverage. LINE OA is marked as coming soon; no account is connected.

## CloudPanel deployment target

Requested host: `lekdee.kan.bio`. Site creation has been confirmed in CloudPanel. Domain: lekdee.kan.bio. Node: 22 LTS. Site user: kan-lekdee. App port: 3002. Document root: /home/kan-lekdee/htdocs/lekdee.kan.bio. Server IP displayed by CloudPanel: 139.59.121.120. No source has been uploaded or app process started on the server; DNS and TLS are not yet verified.

1. Existing Node.js site is ready: `lekdee.kan.bio`, Node.js 22 LTS, app port 3002, site user `kan-lekdee`. Do not create a duplicate.
2. Point DNS to the CloudPanel server and issue a valid TLS certificate using the panel.
3. Transfer `release/lekdee-source.tar.gz` to `/home/kan-lekdee/htdocs/lekdee.kan.bio` and extract it as the site user. The archive excludes node_modules, .next and local secret files.
4. Run `npm ci && npm run build` as the site user. Set environment variables securely on the server. Never commit provider tokens.
5. Run with PM2 using `pm2 start ecosystem.config.cjs`, then `pm2 save`. Keep only one app bound to port 3002; change both panel and ecosystem config if occupied.
6. Confirm `https://lekdee.kan.bio/api/health` returns status ok, TLS works, and the homepage loads.

Production hardening before enabling costly AI or public community: authenticated users or abuse throttling at the gateway, database, moderation, consent/privacy notice and retention controls. This repository contains no payment, betting, lottery purchase, or gambling transaction features. It is not a legal certification.
