import {providerFetch} from '@/lib/provider';
import {randomNumber} from '@/lib/numbers';
export async function POST(req:Request){
 const origin=req.headers.get('origin');if(origin&&origin!==new URL(req.url).origin&&origin!==process.env.APP_ORIGIN)return Response.json({error:'Origin not allowed'},{status:403});
 try{const body=await req.text();if(body.length>2048)return Response.json({error:'ข้อความยาวเกินไป'},{status:413});const {message}=JSON.parse(body);if(typeof message!=='string'||message.trim().length===0||message.length>500)return Response.json({error:'กรุณาส่งข้อความ 1–500 ตัวอักษร'},{status:400});
 const answer=await providerFetch('AI_GATEWAY_URL',{method:'POST',body:JSON.stringify({message,system:'คุณคือเจ้าแม่ใบ้หวย ตอบภาษาไทยอย่างเป็นมิตร เพื่อความบันเทิงเท่านั้น ห้ามอ้างว่าทำนายผลหรือเพิ่มโอกาสถูกรางวัล ห้ามรับแทงหรือชี้ช่องทางซื้อขาย ห้ามอ้างข่าว สถิติ หรือกระแสสดที่ไม่ได้มีแหล่งข้อมูล ห้ามขอข้อมูลส่วนบุคคลที่ไม่จำเป็น'})});
 if(!answer)return Response.json({mode:'demo',reply:`ลองเก็บเลข ${randomNumber()} ไว้เป็นแรงบันดาลใจนะจ๊ะ ✨ นี่คือเลขสุ่มจากระบบตัวอย่าง ยังไม่ได้ใช้ AI วิเคราะห์ ความฝันและวันเกิดไม่เปลี่ยนโอกาสถูกรางวัลจ้ะ`});
 if(typeof answer.reply!=='string'||answer.reply.length>4000)throw new Error('Invalid response');return Response.json({mode:'live',reply:answer.reply});
 }catch{return Response.json({error:'เจ้าแม่ยังตอบไม่ได้ในตอนนี้ กรุณาลองใหม่'},{status:502});}
}
