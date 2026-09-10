import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowRight,ArrowUpRight,CalendarDays,ChevronRight,Flame,RotateCw,Sparkles,Stars} from 'lucide-react';
import {getTrends} from '@/lib/trends';
import RemindButton from '@/components/RemindButton';
import TrendPreviewChips from '@/components/TrendPreviewChips';
import BottomPromo from '@/components/BottomPromo';

export const metadata: Metadata = {
 title: 'วันนี้… เลขไหนดี?',
 description: 'ขอเลขสิ่งศักดิ์สิทธิ์ สำรวจกระแสเลขดัง และเก็บเลขโปรดของคุณไว้ในที่เดียว เพื่อความบันเทิง ไม่มีบริการรับแทงหรือซื้อขายสลาก',
};

export default async function Home(){
 const trends = await getTrends();
 return <>
  <div className="page-heading">
   <div><div className="eyebrow">A LITTLE BELIEF. A LITTLE POSSIBILITY.</div><h1>วันนี้… เลขไหนดี? <span>✦</span></h1><p>รวมทุกความเชื่อ ทุกกระแส ให้คุณค้นพบเลขที่ใช่ในแบบของคุณ</p></div>
   <RemindButton className="outline date-button"><CalendarDays size={17}/> เตือนวันออกรางวัล <ChevronRight size={15}/></RemindButton>
  </div>
  <section className="hero">
   <div className="hero-content">
    <span className="pill"><span/> เปิดรับพลังดี ๆ ให้วันนี้</span>
    <h2>ให้ความเชื่อนำทาง<br/>ให้<span>เลขดี</span>เป็นของคุณ</h2>
    <p>ตั้งจิต อธิษฐาน แล้วค้นพบเลขที่มีความหมาย<br/>จากสิ่งศักดิ์สิทธิ์ที่คุณศรัทธา</p>
    <Link className="primary" href="/ritual"><Sparkles size={18}/> ขอเลขนำโชค <ArrowUpRight size={18}/></Link>
    <small>เพื่อความบันเทิงและความเชื่อส่วนบุคคล</small>
   </div>
   <div className="hero-visual" aria-hidden="true">
    <div className="hv-glow hv-glow-purple"/>
    <div className="hv-glow hv-glow-teal"/>
    <div className="hv-glow hv-glow-green"/>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/hero-char.jpg" alt="" className="hv-char"/>
    <div className="hv-badge hv-badge-gold"><span className="hv-num">89</span><span className="hv-crown">♛</span></div>
    <div className="hv-badge hv-badge-green"><span className="hv-num">56</span><span className="hv-star">★</span></div>
    <div className="hv-badge hv-badge-purple"><span className="hv-num">27</span><span className="hv-star">✦</span></div>
    <div className="hv-orbit hv-orbit-1"/>
    <div className="hv-orbit hv-orbit-2"/>
    <span className="hv-spark s1">✦</span>
    <span className="hv-spark s2">✧</span>
    <span className="hv-spark s3">★</span>
    <span className="hv-spark s4">✦</span>
    <span className="hv-caption">YOUR LUCK IS WITHIN YOU</span>
   </div>
   <span className="hero-index">01 / THE BELIEF</span>
  </section>
  <section className="quick-grid">
   <Link className="quick-card" href="/ritual"><span className="quick-icon mint"><Stars/></span><div><strong>ขอเลขสิ่งศักดิ์สิทธิ์</strong><p>ตั้งจิต แล้วให้โชคชะตานำทาง</p></div><ArrowUpRight size={18}/></Link>
   <Link className="quick-card" href="/chat"><span className="quick-icon purple"><Sparkles/></span><div><strong>คุยกับเจ้าแม่ AI <em>DEMO</em></strong><p>เล่าเรื่องของคุณ ให้เจ้าแม่ช่วยใบ้</p></div><ArrowUpRight size={18}/></Link>
   <Link className="quick-card" href="/ritual#wheel"><span className="quick-icon blue"><RotateCw/></span><div><strong>กงล้อเสี่ยงเลข</strong><p>หมุนรับเลขดี เติมสีสันให้วันนี้</p></div><ArrowUpRight size={18}/></Link>
  </section>
  <section className="feed-layout home-preview">
   <div className="feed-main">
    <div className="section-title"><div><h2><Flame className="flame" size={22}/> กระแสเลขดัง <span className="tiny-badge">{trends.mode==='live'?'เชื่อมข้อมูลแล้ว':'ตัวอย่าง'}</span></h2><p>ตัวเลขที่น่าจับตา จากเรื่องราวรอบตัว</p></div><Link className="text-button" href="/trends">ดูทั้งหมด <ArrowRight size={15}/></Link></div>
    <TrendPreviewChips items={trends.items.slice(0,3)}/>
   </div>
  </section>
  <BottomPromo/>
 </>;
}
