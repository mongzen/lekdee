'use client';
import {createContext,useContext,useEffect,useRef,useState} from 'react';
import type {Note} from './numbers';

type AppState = {
 notes: Note[];
 votes: string[];
 toast: string;
 menu: boolean;
 setMenu: (v:boolean)=>void;
 setToast: (v:string)=>void;
 save: (number:string, source:string)=>void;
 removeNote: (number:string)=>void;
 toggleVote: (number:string)=>void;
 remind: ()=>void;
};

const AppContext = createContext<AppState|null>(null);

export function AppProvider({children}:{children:React.ReactNode}){
 const [notes,setNotes] = useState<Note[]>([]);
 const [votes,setVotes] = useState<string[]>([]);
 const [toast,setToast] = useState('');
 const [menu,setMenu] = useState(false);
 const [ready,setReady] = useState(false);
 const toastTimer = useRef<ReturnType<typeof setTimeout>|null>(null);

 useEffect(()=>{
  try {
   const n = JSON.parse(localStorage.getItem('lekdee-notes')||'[]');
   if(Array.isArray(n)) setNotes(n.filter(x=>x&&/^\d{2,3}$/.test(x.number)&&typeof x.source==='string'&&typeof x.date==='string'));
   const v = JSON.parse(localStorage.getItem('lekdee-votes')||'[]');
   if(Array.isArray(v)) setVotes(v.filter(x=>typeof x==='string'));
  } catch {}
  setReady(true);
  return ()=>{ if(toastTimer.current) clearTimeout(toastTimer.current); };
 },[]);

 useEffect(()=>{
  if(!ready) return;
  try {
   localStorage.setItem('lekdee-notes',JSON.stringify(notes));
   localStorage.setItem('lekdee-votes',JSON.stringify(votes));
  } catch { setToast('พื้นที่เก็บข้อมูลเต็ม การเปลี่ยนแปลงอาจไม่ถูกบันทึก'); }
 },[notes,votes,ready]);

 useEffect(()=>{
  if(!toast) return;
  const t = setTimeout(()=>setToast(''),3200);
  return ()=>clearTimeout(t);
 },[toast]);

 function save(number:string, source:string){
  if(notes.some(n=>n.number===number)){ setToast('เลขนี้อยู่ในโพยแล้ว ไม่เพิ่มเลขซ้ำ'); return; }
  setNotes(n=>[...n,{number,source,date:new Date().toLocaleDateString('th-TH')}]);
  setToast(`บันทึกเลข ${number} ลงโพยแล้ว`);
 }
 function removeNote(number:string){ setNotes(ns=>ns.filter(x=>x.number!==number)); }
 function toggleVote(number:string){ setVotes(v=>v.includes(number)?v.filter(x=>x!==number):[...v,number]); }

 function remind(){
  const d = new Date();
  let next = new Date(d.getFullYear(),d.getMonth(),d.getDate()<16?16:1);
  if(d.getDate()>=16) next.setMonth(next.getMonth()+1);
  const stamp = `${next.getFullYear()}${String(next.getMonth()+1).padStart(2,'0')}${String(next.getDate()).padStart(2,'0')}`;
  const blob = new Blob([`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Lekdee//Reminder//TH\r\nBEGIN:VEVENT\r\nUID:${stamp}@lekdee.kan.bio\r\nDTSTAMP:${new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'')}\r\nDTSTART;VALUE=DATE:${stamp}\r\nSUMMARY:ทบทวนโพยเลขดีและตรวจวันออกรางวัลจริง\r\nDESCRIPTION:กำหนดเตือนตามวันที่ 1 หรือ 16 อาจมีการเลื่อนวันออกรางวัล โปรดตรวจสอบกองสลาก\r\nEND:VEVENT\r\nEND:VCALENDAR`],{type:'text/calendar;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'lekdee-reminder.ics'; a.click();
  URL.revokeObjectURL(url);
  setToast('ดาวน์โหลดไฟล์แล้ว เปิดไฟล์เพื่อเพิ่มในปฏิทิน');
 }

 return <AppContext.Provider value={{notes,votes,toast,menu,setMenu,setToast,save,removeNote,toggleVote,remind}}>{children}</AppContext.Provider>;
}

export function useApp(){
 const ctx = useContext(AppContext);
 if(!ctx) throw new Error('useApp must be used within AppProvider');
 return ctx;
}
