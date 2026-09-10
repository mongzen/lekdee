import {getTrends} from '@/lib/trends';
export async function GET(){
 const trends = await getTrends();
 if(trends.mode==='error') return Response.json({error:trends.error},{status:502});
 return Response.json({mode:trends.mode,items:trends.items,updatedAt:trends.updatedAt});
}
