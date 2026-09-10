'use client';
import {useRef,useState} from 'react';
import {Bookmark,RotateCw} from 'lucide-react';
import {randomNumber} from '@/lib/numbers';
import {useApp} from '@/lib/store';

export default function WheelRitual(){
 const {save} = useApp();
 const [busy,setBusy] = useState(false);
 const [result,setResult] = useState('');
 const [rotation,setRotation] = useState(0);
 const timer = useRef<ReturnType<typeof setTimeout>|null>(null);

 function spin(){
  if(busy) return;
  setBusy(true); setResult('');
  const n = randomNumber();
  const target = (10-Number(n[1]))%10*36;
  setRotation(r=>r+(1800-r%360)+target);
  timer.current = setTimeout(()=>{ setResult(n); setBusy(false); },2400);
 }

 return <section id="wheel" className="panel ritual-card">
  <span className="eyebrow">A MOMENT FOR YOURSELF</span>
  <h2>กงล้อเสี่ยงเลข</h2>
  <p>หมุนเลขหลักหน่วย แล้วสุ่มหลักสิบให้ครบคู่</p>
  <div className="wheel-wrap">
   <span className="wheel-pointer">▼</span>
   <div className="wheel" style={{transform:`rotate(${rotation}deg)`}}>{Array.from({length:10},(_,i)=><span key={i} style={{transform:`rotate(${i*36}deg) translateY(-100px)`}}>{i}</span>)}</div>
   <div className="wheel-hub">✳</div>
  </div>
  {result&&<div className="ritual-result" aria-live="polite"><span>เลขสุ่มสำหรับคุณ</span><strong>{result}</strong><button className="outline" onClick={()=>save(result,'กงล้อเสี่ยงเลข')}><Bookmark size={16}/> เก็บลงโพย</button></div>}
  <button disabled={busy} className="primary full" onClick={spin}><RotateCw size={18}/>{busy?'กำลังเสี่ยงเลข…':result?'ลองเสี่ยงเลขอีกครั้ง':'หมุนกงล้อ'}</button>
  <p className="fine-print">ประสบการณ์ดิจิทัล ไม่ได้เป็นตัวแทนหรือเชื่อมต่อกับวัด<br/>ผลสุ่มไม่ใช่คำทำนาย และไม่เพิ่มโอกาสถูกรางวัล</p>
 </section>;
}
