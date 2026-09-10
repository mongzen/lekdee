'use client';
import {useState} from 'react';
import {Bookmark,RotateCw,Sparkles} from 'lucide-react';
import {randomNumber} from '@/lib/numbers';
import {useApp} from '@/lib/store';

const temples = ['ไอ้ไข่ วัดเจดีย์','หลวงพ่อสมหวัง','สิ่งศักดิ์สิทธิ์ที่คุณศรัทธา'];

export default function TempleRitual(){
 const {save} = useApp();
 const [temple,setTemple] = useState(temples[0]);
 const [busy,setBusy] = useState(false);
 const [result,setResult] = useState('');

 function spin(){
  if(busy) return;
  setBusy(true); setResult('');
  setTimeout(()=>{ setResult(randomNumber()); setBusy(false); },1400);
 }

 return <section className="panel ritual-card">
  <span className="eyebrow">A MOMENT FOR YOURSELF</span>
  <h2>ตั้งจิต แล้วอธิษฐาน</h2>
  <p>ใช้ความเชื่อเป็นแรงบันดาลใจ ให้ใจได้มีความหวัง</p>
  <select aria-label="เลือกสิ่งศักดิ์สิทธิ์" disabled={busy} value={temple} onChange={e=>setTemple(e.target.value)}>
   {temples.map(t=><option key={t}>{t}</option>)}
  </select>
  <div className={'ritual-symbol '+(busy?'shaking':'')}>✦<span>{busy?'…':result||'๙'}</span></div>
  {result&&<div className="ritual-result" aria-live="polite"><span>เลขสุ่มสำหรับคุณ</span><strong>{result}</strong><button className="outline" onClick={()=>save(result,temple)}><Bookmark size={16}/> เก็บลงโพย</button></div>}
  <button disabled={busy} className="primary full" onClick={spin}><RotateCw size={18}/>{busy?'กำลังเสี่ยงเลข…':result?'ลองเสี่ยงเลขอีกครั้ง':'เสี่ยงเซียมซี'}</button>
  <p className="fine-print">ประสบการณ์ดิจิทัล ไม่ได้เป็นตัวแทนหรือเชื่อมต่อกับวัด<br/>ผลสุ่มไม่ใช่คำทำนาย และไม่เพิ่มโอกาสถูกรางวัล</p>
 </section>;
}
