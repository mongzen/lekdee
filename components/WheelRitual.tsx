'use client';
import {useRef,useState} from 'react';
import GameWheel from './GameWheel';
import Link from 'next/link';
import styles from './WheelRitual.module.css';
import {Bookmark,RotateCw,Sparkles,ShieldCheck,Stars,ArrowRight} from 'lucide-react';
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

 return <section id="wheel" className={`${styles.scene} ${busy?styles.spinning:result?styles.won:''}`}>
  <div className={styles.topline}><span className={styles.brand}>✳ เลขดี</span><span>YOUR LITTLE LUCKY MOMENT</span></div>
  <div className={styles.intro}>
   <span className={styles.tag}><Sparkles size={12}/> SPIN TO DISCOVER</span>
   <h1>กงล้อเสี่ยงเลข</h1>
   <p>ตั้งจิตสักนิด แล้วค้นพบเลขนำโชคของคุณ</p>
  </div>
  <GameWheel rotation={rotation} busy={busy} result={result}/>
  <div className={styles.result} aria-live="polite" aria-atomic="true">
   {result?<><div><span className={styles.resultLabel}>เลขสุ่มสำหรับคุณ</span><strong>{result}</strong></div><button className={styles.save} onClick={()=>save(result,'กงล้อเสี่ยงเลข')}><Bookmark size={16}/> เก็บลงโพย</button></>:<div className={styles.placeholder}><Sparkles size={26}/><div><span className={styles.resultLabel}>{busy?'กำลังค้นพบเลขของคุณ…':'เลขนำโชคกำลังรอคุณอยู่'}</span><p>{busy?'อีกสักครู่ พบกับเลขคู่ใหม่':'หมุนกงล้อ แล้วเปิดรับความเป็นไปได้'}</p></div></div>}
  </div>
  <button disabled={busy} className={styles.cta} onClick={spin}><RotateCw size={19}/>{busy?'กำลังเสี่ยงเลข…':result?'ลองเสี่ยงเลขอีกครั้ง':'หมุนกงล้อ'}</button>
  <div className={styles.status}><i/>{busy?'วงล้อกำลังหมุน':'พร้อมให้คุณลองเสี่ยงเลข'}</div>
  <div className={styles.info}><ShieldCheck size={19}/><div><strong>หมุนหลักหน่วย · สุ่มหลักสิบให้ครบคู่</strong><p>ประสบการณ์ดิจิทัล ไม่ได้เป็นตัวแทนหรือเชื่อมต่อกับวัด<br/>ผลสุ่มไม่ใช่คำทำนาย และไม่เพิ่มโอกาสถูกรางวัล</p></div></div>
  <Link className={styles.link} href="/ritual/siam-si"><Stars size={16}/> ลองเสี่ยงเซียมซี <ArrowRight size={14}/></Link>
 </section>;
}
