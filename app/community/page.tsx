import type {Metadata} from 'next';
import {Users} from 'lucide-react';
import {stories} from '@/lib/numbers';
import NumberChip from '@/components/NumberChip';
import VoteButton from '@/components/VoteButton';

export const metadata: Metadata = {
 title: 'ชุมชนสายมู',
 description: 'ห้องตัวอย่างของชุมชนสายมู พูดคุยและโหวตเลขที่ถูกใจ คะแนนโหวตเก็บเฉพาะอุปกรณ์นี้ ยังไม่แชร์กับผู้อื่น',
};

const authors = ['มะลิ สายมู','ดวงดีทุกวัน','ลัคกี้'];
const avatars = ['ม','ด','ล'];

export default function CommunityPage(){
 return <>
  <div className="page-heading"><div><div className="eyebrow">A LITTLE BELIEF. A LITTLE POSSIBILITY.</div><h1>ชุมชนสายมู <span>✦</span></h1><p>สำรวจเรื่องราวของตัวเลข ด้วยความเชื่อและวิจารณญาณ</p></div></div>
  <section className="panel">
   <div className="section-title"><div><h2>ชุมชนสายมู</h2><p>ห้องตัวอย่าง • คะแนนโหวตเก็บเฉพาะอุปกรณ์นี้ ยังไม่แชร์กับผู้อื่น</p></div><Users size={26}/></div>
   {stories.map((s,i)=><article className="community-post" key={s.id}>
    <span className="avatar">{avatars[i]}</span>
    <div><strong>{authors[i]} <span className="tiny-badge">ตัวอย่าง</span></strong><p>{s.title} วันนี้มีใครถูกใจเลข {s.number} เหมือนกันบ้าง ✨</p><NumberChip number={s.number} source="ชุมชนตัวอย่าง"/></div>
    <VoteButton number={s.number}/>
   </article>)}
  </section>
 </>;
}
