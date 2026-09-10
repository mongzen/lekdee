import 'server-only';
import {providerFetch} from './provider';

export type StatItem = {number:string;count:number;lastSeen:string};
export type Statistics = {mode:'unconfigured'|'live'|'error';draws?:number;sourceUrl?:string;items:StatItem[]};

export async function getStatistics(): Promise<Statistics> {
 try {
  const data = await providerFetch('LOTTERY_RESULTS_API_URL');
  if(!data) return {mode:'unconfigured',items:[]};
  if(!Array.isArray(data.results)||typeof data.sourceUrl!=='string'||!data.sourceUrl.startsWith('https://')) throw new Error('Invalid data');
  const seen = new Set<string>();
  const results = data.results.slice(0,5000).map((r:{date:string;lastTwo:string})=>{
   if(!/^\d{4}-\d{2}-\d{2}$/.test(r.date)||!/^\d{2}$/.test(r.lastTwo)||seen.has(r.date)) throw new Error('Invalid record');
   seen.add(r.date);
   return r;
  });
  const counts = new Map<string,StatItem>();
  for(const r of results){
   const item = counts.get(r.lastTwo) || {number:r.lastTwo,count:0,lastSeen:r.date};
   item.count++;
   if(r.date>item.lastSeen) item.lastSeen=r.date;
   counts.set(r.lastTwo,item);
  }
  return {mode:'live',draws:results.length,sourceUrl:data.sourceUrl,items:[...counts.values()].sort((a,b)=>b.count-a.count)};
 } catch {
  return {mode:'error',items:[]};
 }
}
