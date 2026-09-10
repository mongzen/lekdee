import type {Metadata} from 'next';
import ChatWidget from '@/components/ChatWidget';

export const metadata: Metadata = {
 title: 'เจ้าแม่ใบ้หวย',
 description: 'เล่าเรื่องของคุณให้เจ้าแม่ใบ้หวยฟัง ผู้ช่วยตัวอย่างเพื่อความบันเทิง ยังไม่ได้เชื่อมต่อผู้ให้บริการ AI จริง',
};

export default function ChatPage(){
 return <>
  <div className="page-heading"><div><div className="eyebrow">A LITTLE BELIEF. A LITTLE POSSIBILITY.</div><h1>เจ้าแม่ใบ้หวย <span>✦</span></h1><p>สำรวจเรื่องราวของตัวเลข ด้วยความเชื่อและวิจารณญาณ</p></div></div>
  <ChatWidget/>
 </>;
}
