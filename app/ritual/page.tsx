import type {Metadata} from 'next';
import TempleRitual from '@/components/TempleRitual';
import WheelRitual from '@/components/WheelRitual';
import PageBanner from '@/components/PageBanner';

export const metadata: Metadata = {
 title: 'ขอเลขสิ่งศักดิ์สิทธิ์',
 description: 'ตั้งจิต อธิษฐาน แล้วค้นพบเลขที่มีความหมายจากสิ่งศักดิ์สิทธิ์ที่คุณศรัทธา หรือหมุนกงล้อเสี่ยงเลข เพื่อความบันเทิงและความเชื่อส่วนบุคคล',
};

export default function RitualPage(){
 return <>
  <PageBanner
   eyebrow="A LITTLE BELIEF. A LITTLE POSSIBILITY."
   title={<>ขอเลขสิ่งศักดิ์สิทธิ์ <span>✦</span></>}
   subtitle="สำรวจเรื่องราวของตัวเลข ด้วยความเชื่อและวิจารณญาณ"
   imgSrc="/img-banner-shrine.webp"
   theme="gold"
  />
  <div className="ritual-grid">
   <TempleRitual/>
   <WheelRitual/>
  </div>
 </>;
}
