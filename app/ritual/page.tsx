import type {Metadata} from 'next';
import TempleRitual from '@/components/TempleRitual';
import WheelRitual from '@/components/WheelRitual';

export const metadata: Metadata = {
 title: 'ขอเลขสิ่งศักดิ์สิทธิ์',
 description: 'ตั้งจิต อธิษฐาน แล้วค้นพบเลขที่มีความหมายจากสิ่งศักดิ์สิทธิ์ที่คุณศรัทธา หรือหมุนกงล้อเสี่ยงเลข เพื่อความบันเทิงและความเชื่อส่วนบุคคล',
};

export default function RitualPage(){
 return <>
  <div className="page-heading"><div><div className="eyebrow">A LITTLE BELIEF. A LITTLE POSSIBILITY.</div><h1>ขอเลขสิ่งศักดิ์สิทธิ์ <span>✦</span></h1><p>สำรวจเรื่องราวของตัวเลข ด้วยความเชื่อและวิจารณญาณ</p></div></div>
  <div className="ritual-grid">
   <TempleRitual/>
   <WheelRitual/>
  </div>
 </>;
}
