import type {Metadata} from 'next';
import {ArrowUpRight,ChartNoAxesCombined} from 'lucide-react';
import {getStatistics} from '@/lib/statistics';
import SaveButton from '@/components/SaveButton';

export const metadata: Metadata = {
 title: 'สถิติย้อนหลัง',
 description: 'ความถี่เลขท้าย 2 ตัวจากผลรางวัลย้อนหลัง ตรวจสอบได้จากแหล่งข้อมูลทางการ ความถี่ในอดีตไม่ใช่โอกาสที่จะออกในงวดถัดไป',
};

export default async function StatisticsPage(){
 const stats = await getStatistics();
 return <>
  <div className="page-heading"><div><div className="eyebrow">A LITTLE BELIEF. A LITTLE POSSIBILITY.</div><h1>สถิติย้อนหลัง <span>✦</span></h1><p>สำรวจเรื่องราวของตัวเลข ด้วยความเชื่อและวิจารณญาณ</p></div></div>
  {stats.mode==='live'
   ? <section className="panel">
      <div className="section-title"><h2>ความถี่เลขท้าย 2 ตัว จาก {stats.draws} งวด</h2><a className="outline" href={stats.sourceUrl} target="_blank" rel="noreferrer">แหล่งข้อมูล <ArrowUpRight size={16}/></a></div>
      <p>ความถี่ในอดีตไม่ใช่โอกาสที่จะออกในงวดถัดไป</p>
      <div className="stats-table"><table><thead><tr><th>เลข</th><th>จำนวนครั้ง</th><th>ออกล่าสุด</th><th>เก็บลงโพย</th></tr></thead>
       <tbody>{stats.items.map(s=><tr key={s.number}><td>{s.number}</td><td>{s.count}</td><td>{s.lastSeen}</td><td><SaveButton number={s.number} source="สถิติย้อนหลัง">บันทึก</SaveButton></td></tr>)}</tbody>
      </table></div>
     </section>
   : <section className="panel">
      <div className="section-title"><h2>สถิติที่ตรวจสอบได้ เริ่มจากแหล่งที่เชื่อถือได้</h2><span className="tiny-badge">รอเชื่อมข้อมูล</span></div>
      <div className="empty"><ChartNoAxesCombined size={48}/><h3>{stats.mode==='error'?'เชื่อมต่อข้อมูลสถิติไม่ได้':'ยังไม่มีข้อมูลผลรางวัลที่ตรวจสอบแล้ว'}</h3><p>เมื่อเชื่อมข้อมูลกองสลาก จะแสดงความถี่และช่วงเวลาที่เลขแต่ละตัวออก<br/>การออกบ่อยหรือไม่ออกนาน ไม่ได้ทำให้โอกาสงวดถัดไปเพิ่มขึ้น</p><a className="outline" href="https://www.glo.or.th" target="_blank" rel="noreferrer">เว็บไซต์สำนักงานสลากกินแบ่งรัฐบาล <ArrowUpRight size={16}/></a></div>
     </section>}
 </>;
}
