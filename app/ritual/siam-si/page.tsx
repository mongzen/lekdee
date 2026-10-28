import type {Metadata} from 'next';
import TempleRitual from '@/components/TempleRitual';
import PageBanner from '@/components/PageBanner';

export const metadata: Metadata = {
 title: 'เสี่ยงเซียมซี | ขอเลขสิ่งศักดิ์สิทธิ์',
 description: 'ตั้งจิต อธิษฐานกับสิ่งศักดิ์สิทธิ์ที่คุณศรัทธา แล้วขอเลขมงคลด้วยการเสี่ยงเซียมซี เพื่อความบันเทิงและความเชื่อส่วนบุคคล',
};

export default function SiamSiPage(){
 return <>
  <PageBanner
   eyebrow="A MOMENT FOR YOURSELF"
   title={<>เสี่ยงเซียมซี <span>✦</span></>}
   subtitle="ตั้งจิตอธิษฐานกับสิ่งศักดิ์สิทธิ์ที่คุณศรัทธา แล้วเปิดใจรับเลขของคุณ"
   imgSrc="/img-banner-shrine.webp"
   theme="gold"
  />
  <div className="ritual-single">
   <TempleRitual/>
  </div>
 </>;
}
