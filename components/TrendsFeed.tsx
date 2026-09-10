'use client';
import {useEffect,useState} from 'react';
import {ArrowUpRight,Bookmark,Flame,Plus,Search,ShieldCheck} from 'lucide-react';
import type {TrendItem,Trends} from '@/lib/trends';
import NumberChip from './NumberChip';
import {useApp} from '@/lib/store';

const filters = ['ทั้งหมด','ข่าวและเหตุการณ์','กระแสออนไลน์','สายมู'];
const hotList = ['89','56','27','19','68'];

export default function TrendsFeed({initial}:{initial:Trends}){
 const {save,setToast} = useApp();
 const [trends,setTrends] = useState<TrendItem[]>(initial.items);
 const [dataMode,setDataMode] = useState(initial.mode);
 const [dataError,setDataError] = useState('');
 const [filter,setFilter] = useState('ทั้งหมด');
 const [search,setSearch] = useState('');

 useEffect(()=>{
  const controller = new AbortController();
  async function refresh(){
   try {
    const r = await fetch('/api/trends',{signal:controller.signal});
    const data = await r.json();
    if(!r.ok) throw new Error(data.error);
    setTrends(data.items); setDataMode(data.mode); setDataError('');
   } catch { if(!controller.signal.aborted) setDataError('อัปเดตกระแสไม่ได้ แสดงข้อมูลล่าสุดที่มี'); }
  }
  const t = setInterval(refresh,60000);
  return ()=>{ controller.abort(); clearInterval(t); };
 },[]);

 const feed = trends.filter(s=>(filter==='ทั้งหมด'||s.tag===filter)&&(`${s.number} ${s.pair} ${s.title}`).includes(search));

 return <section className="feed-layout">
  <div className="feed-main">
   <div className="section-title"><div><h2><Flame className="flame" size={22}/> กระแสเลขดัง <span className="tiny-badge">{dataMode==='live'?'อัปเดตทุก 60 วินาที':'ตัวอย่าง'}</span></h2><p>ตัวเลขที่น่าจับตา จากเรื่องราวรอบตัว</p></div></div>
   <div className="filters">
    {filters.map(f=><button className={filter===f?'selected':''} onClick={()=>setFilter(f)} key={f}>{f}</button>)}
    <label className="search"><Search size={16}/><input aria-label="ค้นหาเลขหรือเรื่องราว" placeholder="ค้นหาเลข" value={search} onChange={e=>setSearch(e.target.value)}/></label>
   </div>
   <div className="story-grid">{feed.map(s=>
    <article className="story" key={s.id}>
     <div className={'story-art art-'+s.id}><span className="art-symbol">{s.icon}</span><span className="art-ring"/><span className="art-num">{s.number}</span><span className="art-category">{s.tag}</span><button className="art-save" aria-label={'บันทึกเลข '+s.number} onClick={()=>save(s.number,s.title)}><Bookmark size={17}/></button></div>
     <div className="story-body">
      <div className="story-source"><span/> {s.source}</div>
      <h3>{s.title}</h3>
      {s.sourceUrl&&<a className="source-link" href={s.sourceUrl} target="_blank" rel="noreferrer">อ่านแหล่งข่าว <ArrowUpRight size={12}/></a>}
      <div className="story-numbers"><NumberChip number={s.number} source={s.title}/><NumberChip number={s.pair} source={s.title}/></div>
      <div className="story-footer"><span><Flame size={13}/> {dataMode==='live'?'ดัชนีความสนใจ':'ดัชนีตัวอย่าง'} {s.heat}</span><button aria-label={'อ่านเรื่อง '+s.title} onClick={()=>setToast(s.detail)}><ArrowUpRight size={17}/></button></div>
     </div>
    </article>
   )}</div>
   {!feed.length&&<div className="empty">ไม่พบเลขหรือเรื่องราวที่ค้นหา ลองค้นหาใหม่อีกครั้ง</div>}
   <div className="data-note"><ShieldCheck size={14}/> {dataError||(dataMode==='live'?'อัปเดตจากแหล่งข้อมูลที่เชื่อมต่อทุก 60 วินาที':'ฟีดนี้ใช้ข้อมูลสาธิต ยังไม่ได้เชื่อมข่าวหรือโซเชียลแบบเรียลไทม์')}</div>
  </div>
  <aside className="hot-panel">
   <div className="section-title"><h2>เลขที่น่าจับตา <Flame size={18} className="flame"/></h2><span className="tiny-badge">DEMO</span></div>
   <div className="hot-subtitle">ความสนใจตัวอย่าง <span>ไม่ใช่โอกาสถูกรางวัล</span></div>
   {hotList.map((n,i)=><button className="rank" key={n} onClick={()=>save(n,'อันดับตัวอย่าง')}><span className={'rank-index rank-'+i}>{String(i+1).padStart(2,'0')}</span><strong>{n}</strong><span className="rank-bar"><i style={{width:`${92-i*15}%`}}/></span><span className="rank-score">{92-i*15}</span><Plus size={14}/></button>)}
   <div className="hot-bottom"><span className="status-dot"/> สำรวจความสนใจ ไม่ใช่การทำนาย</div>
  </aside>
 </section>;
}
