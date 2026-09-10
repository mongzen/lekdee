import {providerFetch} from '@/lib/provider';
import {stories} from '@/lib/numbers';
export async function GET(){
 try { const result = await providerFetch('TRENDS_API_URL');
 if(!result) return Response.json({mode:'demo',items:stories,updatedAt:null});
 if(!Array.isArray(result.items)) throw new Error('Invalid data');
 const items=result.items.slice(0,30).map((x: Record<string,unknown>,i:number)=>{
 if(typeof x.number!=='string'||!/^\d{2,3}$/.test(x.number)||typeof x.title!=='string'||typeof x.source!=='string'||typeof x.sourceUrl!=='string'||!x.sourceUrl.startsWith('https://')||typeof x.publishedAt!=='string'||!Number.isFinite(Date.parse(x.publishedAt)))throw new Error('Invalid source');
 return {id:i+1,number:x.number,pair:typeof x.pair==='string'&&/^\d{2,3}$/.test(x.pair)?x.pair:x.number,tag:['ข่าวและเหตุการณ์','กระแสออนไลน์','สายมู'].includes(String(x.tag))?String(x.tag):'กระแสออนไลน์',title:x.title.slice(0,160),detail:typeof x.detail==='string'?x.detail.slice(0,800):x.title,source:x.source.slice(0,100),sourceUrl:x.sourceUrl,publishedAt:x.publishedAt,heat:Math.max(0,Math.min(100,Number(x.heat)||0)),icon:'✦'};
 });return Response.json({mode:'live',items,updatedAt:new Date().toISOString()});
 }catch{return Response.json({error:'เชื่อมต่อแหล่งข้อมูลไม่ได้ กรุณาลองใหม่ภายหลัง'},{status:502});}
}
