import type {Metadata} from 'next';
import WheelRitual from '@/components/WheelRitual';

export const metadata: Metadata = {
 title: 'ขอเลขสิ่งศักดิ์สิทธิ์',
 description: 'ตั้งจิต อธิษฐาน แล้วค้นพบเลขที่มีความหมายจากสิ่งศักดิ์สิทธิ์ที่คุณศรัทธา หรือหมุนกงล้อเสี่ยงเลข เพื่อความบันเทิงและความเชื่อส่วนบุคคล',
};

export default function RitualPage(){
 return <WheelRitual/>;
}
