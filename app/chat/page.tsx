import type {Metadata} from 'next';
import ChatWidget from '@/components/ChatWidget';
import PageBanner from '@/components/PageBanner';

export const metadata: Metadata = {
 title: 'เจ้าแม่ใบ้หวย',
 description: 'เล่าเรื่องของคุณให้เจ้าแม่ใบ้หวยฟัง ผู้ช่วยตัวอย่างเพื่อความบันเทิง ยังไม่ได้เชื่อมต่อผู้ให้บริการ AI จริง',
};

export default function ChatPage(){
 return <>
  <PageBanner
   eyebrow="A LITTLE BELIEF. A LITTLE POSSIBILITY."
   title={<>เจ้าแม่ใบ้หวย <span>✦</span></>}
   subtitle="สำรวจเรื่องราวของตัวเลข ด้วยความเชื่อและวิจารณญาณ"
   imgSrc="/img-banner-ai.webp"
   theme="pink"
  />
  <ChatWidget/>
 </>;
}
