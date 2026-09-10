'use client';
import Link from 'next/link';
import {ArrowRight,ArrowUpRight,Bookmark} from 'lucide-react';
import {useApp} from '@/lib/store';

export default function BottomPromo(){
 const {notes} = useApp();
 return <section className="bottom-grid">
  <div className="note-promo"><span className="quick-icon mint"><Bookmark/></span><div><h3>เลขที่ถูกใจ เก็บไว้ในที่เดียว</h3><p>โพยส่วนตัวของคุณ มี {notes.length} เลขแล้ว</p></div><Link className="outline" href="/my-numbers">เปิดโพยของฉัน <ArrowRight size={15}/></Link></div>
  <Link className="community-promo" href="/community"><div className="mini-avatars"><span>ม</span><span>ด</span><span>ล</span></div><div><h3>ความเชื่อดี ๆ มีไว้แบ่งปัน</h3><p>แวะมาพูดคุยกับชุมชนสายมู</p></div><ArrowUpRight size={20}/></Link>
 </section>;
}
