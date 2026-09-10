'use client';
import {useEffect} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {ArrowUpRight,Bell,ChevronRight,Check,Flame,House,Menu,MessageCircle,ShieldCheck,Sparkles,Stars,Users,ChartNoAxesCombined,Bookmark} from 'lucide-react';
import {useApp} from '@/lib/store';

const nav = [
 {name:'ภาพรวม',href:'/',icon:House},
 {name:'ขอเลขสิ่งศักดิ์สิทธิ์',href:'/ritual',icon:Stars},
 {name:'กระแสเลขดัง',href:'/trends',icon:Flame},
 {name:'เจ้าแม่ใบ้หวย',href:'/chat',icon:MessageCircle},
 {name:'โพยของฉัน',href:'/my-numbers',icon:Bookmark},
 {name:'สถิติย้อนหลัง',href:'/statistics',icon:ChartNoAxesCombined},
 {name:'ชุมชนสายมู',href:'/community',icon:Users},
];

export default function Shell({children}:{children:React.ReactNode}){
 const pathname = usePathname();
 const {notes,toast,menu,setMenu,remind} = useApp();
 const current = nav.find(n=>n.href===pathname)?.name || 'ภาพรวม';

 useEffect(()=>{ setMenu(false); },[pathname]); // eslint-disable-line react-hooks/exhaustive-deps

 return <div className="app">
  <aside className={menu?'sidebar opened':'sidebar'}>
   <Link className="brand" href="/" aria-label="เลขดี หน้าหลัก"><span className="brand-icon">✳</span><strong>เลขดี<span>lekdee</span></strong><span className="brand-dot">®</span></Link>
   <div className="workspace-label">YOUR LUCKY SPACE</div>
   <nav>{nav.map(({name,href,icon:Icon})=>
    <Link href={href} className={pathname===href?'active':''} key={name}>
     <Icon size={19}/>{name}
     {name==='โพยของฉัน'&&notes.length>0&&<small>{notes.length}</small>}
     {name==='เจ้าแม่ใบ้หวย'&&<em>AI</em>}
    </Link>
   )}</nav>
   <div className="sidebar-bottom">
    <div className="line-promo"><span className="line-icon">LINE</span><strong>เลขดี อยู่ใกล้คุณ</strong><p>เตรียมพบกับเลขดีบน LINE OA</p><span className="soon">เร็ว ๆ นี้ <ArrowUpRight size={13}/></span></div>
    <div className="safe"><ShieldCheck size={18}/><span>พื้นที่แห่งความเชื่อ<br/><b>ไม่มีการรับแทงหรือซื้อขาย</b></span></div>
    <div className="profile"><span className="avatar">ม</span><div>สวัสดี สายมู<span>พื้นที่ส่วนตัวบนอุปกรณ์นี้</span></div><Sparkles size={17}/></div>
   </div>
  </aside>
  {menu&&<button className="sidebar-scrim" aria-label="ปิดเมนู" onClick={()=>setMenu(false)}/>}
  <div className="main-shell">
   <header>
    <button className="mobile-menu icon-button" aria-label="เปิดเมนู" onClick={()=>setMenu(!menu)}><Menu/></button>
    <div className="breadcrumb">พื้นที่นำโชคของคุณ <ChevronRight size={14}/><span>{current}</span></div>
    <div className="header-right"><span className="demo-dot"/> โหมดตัวอย่าง <button className="icon-button" aria-label="ตั้งเตือนในปฏิทิน" onClick={remind}><Bell size={18}/></button><span className="avatar small">ม</span></div>
   </header>
   <main>{children}</main>
   <footer><span className="footer-brand">✳ เลขดี <span>ให้ทุกความเชื่อ มีเรื่องราว</span></span><p>เพื่อความบันเทิงเท่านั้น ไม่มีบริการรับแทง ซื้อขาย หรือชำระเงิน • ไม่รับประกันผลรางวัล</p><span>© {new Date().getFullYear()} Lekdee</span></footer>
  </div>
  {toast&&<div className="toast" role="status"><Check size={18}/>{toast}</div>}
 </div>;
}
