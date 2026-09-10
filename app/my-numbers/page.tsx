'use client';
import {useState} from 'react';
import {Bookmark,Download,Plus,Trash2} from 'lucide-react';
import {useApp} from '@/lib/store';
import PageBanner from '@/components/PageBanner';

export default function MyNumbersPage(){
 const {notes,save,removeNote,remind,setToast} = useApp();
 const [manual,setManual] = useState('');

 return <>
  <PageBanner
   eyebrow="A LITTLE BELIEF. A LITTLE POSSIBILITY."
   title={<>โพยของฉัน <span>✦</span></>}
   subtitle="สำรวจเรื่องราวของตัวเลข ด้วยความเชื่อและวิจารณญาณ"
   imgSrc="/img-banner-notebook.webp"
   theme="pink"
  />
  <section className="panel">
   <div className="section-title"><div><h2>เลขโปรดของคุณ <span className="tiny-badge">{notes.length} เลข</span></h2><p>บันทึกเฉพาะอุปกรณ์นี้ • ระบบช่วยป้องกันเลขซ้ำ</p></div><button className="outline" onClick={remind}><Download size={16}/> เพิ่มเตือนในปฏิทิน</button></div>
   <form className="add-form" onSubmit={e=>{e.preventDefault();if(/^\d{2,3}$/.test(manual)){save(manual,'เพิ่มเอง');setManual('')}else setToast('กรอกเลข 2 หรือ 3 หลัก')}}>
    <input aria-label="เลขที่ต้องการบันทึก" inputMode="numeric" pattern="[0-9]{2,3}" maxLength={3} placeholder="เพิ่มเลข 2–3 หลัก" value={manual} onChange={e=>setManual(e.target.value.replace(/\D/g,''))}/>
    <button className="primary"><Plus size={17}/> บันทึกเลข</button>
   </form>
   {notes.length
    ? <div className="notes-grid">{notes.map(n=><article className="note" key={n.number}><strong>{n.number}</strong><p>{n.source}</p><small>{n.date}</small><button className="icon-button" aria-label={'ลบเลข '+n.number} onClick={()=>removeNote(n.number)}><Trash2 size={17}/></button></article>)}</div>
    : <div className="empty"><Bookmark size={35}/><h3>โพยว่าง รอเลขที่ถูกใจ</h3><p>กดสัญลักษณ์บันทึกบนเลข หรือเพิ่มเลขด้วยตัวเอง</p></div>}
  </section>
 </>;
}
