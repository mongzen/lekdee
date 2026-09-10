import type {Metadata} from 'next';
import {getTrends} from '@/lib/trends';
import TrendsFeed from '@/components/TrendsFeed';

export const metadata: Metadata = {
 title: 'กระแสเลขดัง',
 description: 'ตัวเลขที่น่าจับตาจากข่าว เหตุการณ์ กระแสออนไลน์ และสายมู อัปเดตเป็นระยะ เพื่อความบันเทิง ไม่ใช่การทำนายผลรางวัล',
};

export default async function TrendsPage(){
 const trends = await getTrends();
 return <>
  <div className="page-heading"><div><div className="eyebrow">A LITTLE BELIEF. A LITTLE POSSIBILITY.</div><h1>กระแสเลขดัง <span>✦</span></h1><p>สำรวจเรื่องราวของตัวเลข ด้วยความเชื่อและวิจารณญาณ</p></div></div>
  <TrendsFeed initial={trends}/>
 </>;
}
