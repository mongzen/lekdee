import 'server-only';
export async function providerFetch(variable: string, init?: RequestInit) {
  const target = process.env[variable];
  if (!target) return null;
  const url = new URL(target);
  if (url.protocol !== 'https:') throw new Error('Provider must use HTTPS');
  const headers = new Headers(init?.headers);
  headers.set('Content-Type', 'application/json');
  if (process.env.DATA_PROVIDER_TOKEN) headers.set('Authorization', `Bearer ${process.env.DATA_PROVIDER_TOKEN}`);
  const response = await fetch(url, {...init, headers, cache:'no-store', signal:AbortSignal.timeout(12000), redirect:'error'});
  if(!response.ok) throw new Error('Provider unavailable');
  const body = await response.text();
  if(body.length > 1_000_000) throw new Error('Response too large');
  return JSON.parse(body);
}
