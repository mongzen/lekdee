import type {Metadata} from 'next';
import {getTrends} from '@/lib/trends';
import TrendsFeed from '@/components/TrendsFeed';
import PageBanner from '@/components/PageBanner';

export const metadata: Metadata = {
 title: 'กระแสเลขดัง',
 description: 'ตัวเลขที่น่าจับตาจากข่าว เหตุการณ์ กระแสออนไลน์ และสายมู อัปเดตเป็นระยะ เพื่อความบันเทิง ไม่ใช่การทำนายผลรางวัล',
};

export default async function TrendsPage(){
 const trends = await getTrends();
 return <>
  <PageBanner
   eyebrow="A LITTLE BELIEF. A LITTLE POSSIBILITY."
   title={<>กระแสเลขดัง <span>✦</span></>}
   subtitle="สำรวจเรื่องราวของตัวเลข ด้วยความเชื่อและวิจารณญาณ"
   imgSrc="/img-banner-trends.webp"
   theme="purple"
  />
  <TrendsFeed initial={trends}/>
 </>;
}
