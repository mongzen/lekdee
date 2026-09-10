#!/usr/bin/env node
// Pulls the latest draw from the official GLO (Government Lottery Office) API
// and appends it to data/lottery-history.json. GLO only exposes the latest
// draw, not full history, so this must run on a recurring schedule (cron) to
// accumulate results over time. See README "Provider configuration".
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HISTORY_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'data', 'lottery-history.json');
const GLO_ENDPOINT = 'https://www.glo.or.th/api/lottery/getLatestLottery';
const SOURCE_URL = 'https://www.glo.or.th/';

const THAI_MONTHS = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

function thaiDateToIso(input) {
  const trimmed = String(input).trim();
  const iso = /^\d{4}-\d{2}-\d{2}/.exec(trimmed);
  if (iso) return iso[0];
  const match = /(\d{1,2})\s+([ก-๙]+)\s+(\d{4})/.exec(trimmed);
  if (!match) return null;
  const [, day, monthName, buddhistYear] = match;
  const monthIndex = THAI_MONTHS.indexOf(monthName);
  if (monthIndex === -1) return null;
  const year = Number(buddhistYear) - 543;
  return `${year}-${String(monthIndex + 1).padStart(2, '0')}-${day.padStart(2, '0')}`;
}

// GLO's response shape isn't published as a worked example (only field names
// like "#displayDate" / "#last2"), so search the payload for known key
// variants instead of assuming one fixed nesting.
function findFirst(obj, keys, seen = new Set()) {
  if (!obj || typeof obj !== 'object' || seen.has(obj)) return undefined;
  seen.add(obj);
  for (const key of keys) if (obj[key] !== undefined) return obj[key];
  for (const value of Object.values(obj)) {
    if (value && typeof value === 'object') {
      const found = findFirst(value, keys, seen);
      if (found !== undefined) return found;
    }
  }
  return undefined;
}

// Real GLO shape (confirmed against the live API): data.last2 is
// { price, number: [{ round, value }] } — not a plain string/array.
function normalizeLastTwo(value) {
  let raw = value;
  if (raw && typeof raw === 'object' && Array.isArray(raw.number)) raw = raw.number[0]?.value;
  if (Array.isArray(raw)) raw = raw[0];
  const digits = String(raw ?? '').replace(/\D/g, '');
  return /^\d{2}$/.test(digits) ? digits : null;
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');

  const response = await fetch(GLO_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
  if (!response.ok) throw new Error(`GLO API responded ${response.status}`);
  const data = await response.json();

  // "date" first: confirmed as a plain ISO string on the live API. Other
  // candidates come after as fallbacks — GLO also has a "displayDate" key
  // that holds a {date,month,year} object, not a string, so it must not
  // take priority over the clean "date" field.
  const dateRaw = findFirst(data, ['date', '#displayDate', 'displayDate']);
  const last2Raw = findFirst(data, ['last2', '#last2']);
  if (dateRaw === undefined || last2Raw === undefined) {
    console.error('Could not locate date/last2 fields. Raw response:', JSON.stringify(data));
    throw new Error('Unrecognized GLO response shape — inspect the raw response above and adjust the key candidates in scripts/fetch-lottery.mjs');
  }

  const date = thaiDateToIso(dateRaw);
  const lastTwo = normalizeLastTwo(last2Raw);
  if (!date || !lastTwo) throw new Error(`Failed to parse date="${dateRaw}" last2="${JSON.stringify(last2Raw)}"`);

  await mkdir(dirname(HISTORY_PATH), { recursive: true });
  let history = { sourceUrl: SOURCE_URL, results: [] };
  try { history = JSON.parse(await readFile(HISTORY_PATH, 'utf8')); } catch {}

  if (history.results.some((r) => r.date === date)) {
    console.log(`Draw ${date} already recorded, nothing to do.`);
    return;
  }

  history.results.push({ date, lastTwo });
  history.results.sort((a, b) => a.date.localeCompare(b.date));

  console.log(`New draw: ${date} -> ${lastTwo}`);
  if (dryRun) { console.log('Dry run, not writing file.'); return; }
  await writeFile(HISTORY_PATH, JSON.stringify(history, null, 2));
  console.log(`Wrote ${HISTORY_PATH} (${history.results.length} draws total)`);
}

main().catch((err) => { console.error(err); process.exit(1); });
