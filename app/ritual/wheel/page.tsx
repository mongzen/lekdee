import type {Metadata} from 'next';
import WheelRitual from '@/components/WheelRitual';

export const metadata: Metadata = {
 title: 'หมุนกงล้อ | ขอเลขสิ่งศักดิ์สิทธิ์',
 description: 'หมุนกงล้อเสี่ยงเลขหลักหน่วย แล้วสุ่มหลักสิบให้ครบคู่ เพื่อความบันเทิงและความเชื่อส่วนบุคคล',
};

export default function WheelPage(){
 return <WheelRitual/>;
}
