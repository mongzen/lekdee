'use client';
import {useState} from 'react';
import {Send,Sparkles} from 'lucide-react';

const suggestions = ['เมื่อคืนฝันเห็นพญานาค','ขอเลขนำโชควันนี้','เลขจากวันเกิด'];

export default function ChatWidget(){
 const [chat,setChat] = useState([{who:'ai',text:'สวัสดีจ้ะ ✨ วันนี้อยากหาแรงบันดาลใจจากอะไร? เล่าความฝัน วันเกิด หรือเลขที่อยู่ในใจได้เลย โหมดนี้เป็นผู้ช่วยตัวอย่าง ยังไม่ได้เชื่อม AI จริงนะจ๊ะ'}]);
 const [input,setInput] = useState('');
 const [busy,setBusy] = useState(false);

 async function send(e:React.FormEvent){
  e.preventDefault();
  if(!input.trim()||busy) return;
  const question = input.trim();
  setChat(c=>[...c,{who:'you',text:question}]);
  setInput(''); setBusy(true);
  try {
   const response = await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:question}),signal:AbortSignal.timeout(15000)});
   const answer = await response.json();
   if(!response.ok) throw new Error(answer.error);
   setChat(c=>[...c,{who:'ai',text:(answer.mode==='live'?'คำตอบจาก AI • ':'')+answer.reply}]);
  } catch {
   setChat(c=>[...c,{who:'ai',text:'ตอนนี้ยังตอบไม่ได้ กรุณาลองส่งข้อความอีกครั้งนะจ๊ะ'}]);
   setInput(question);
  } finally { setBusy(false); }
 }

 return <section className="chat-layout">
  <div className="chat-panel">
   <div className="chat-heading"><span className="quick-icon purple"><Sparkles/></span><div><h2>เจ้าแม่ใบ้หวย</h2><p>ผู้ช่วยตัวอย่าง • สุ่มเลขเพื่อความบันเทิง</p></div></div>
   <div className="messages" aria-live="polite">{chat.map((c,i)=><div key={i} className={'message '+c.who}>{c.text}</div>)}{busy&&<div className="message ai" role="status">เจ้าแม่กำลังตอบ…</div>}</div>
   <div className="suggestions">{suggestions.map(x=><button key={x} onClick={()=>setInput(x)}>{x}</button>)}</div>
   <form onSubmit={send} className="chat-form"><input value={input} onChange={e=>setInput(e.target.value)} maxLength={500} placeholder="เล่าเรื่องของคุณให้เจ้าแม่ฟัง…" aria-label="ข้อความถึงเจ้าแม่"/><button disabled={busy} className="primary" aria-label="ส่งข้อความ"><Send size={20}/></button></form>
  </div>
  <div className="panel chat-info"><Sparkles/><h3>ความเชื่อ + วิจารณญาณ</h3><p>วันเกิด ราศี และความฝันเป็นแรงบันดาลใจส่วนบุคคล ไม่ใช่ข้อมูลที่ใช้พิสูจน์โอกาสถูกรางวัล</p><p>ยังไม่ได้เชื่อมผู้ให้บริการ AI ข้อความในโหมดนี้ตอบจากรูปแบบที่กำหนดไว้</p></div>
 </section>;
}
