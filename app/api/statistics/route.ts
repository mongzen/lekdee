import {getStatistics} from '@/lib/statistics';
export async function GET(){
 const stats = await getStatistics();
 if(stats.mode==='error') return Response.json({error:'ไม่สามารถตรวจสอบข้อมูลสถิติได้'},{status:502});
 return Response.json(stats);
}
