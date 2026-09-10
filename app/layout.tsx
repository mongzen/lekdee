import type {Metadata,Viewport} from 'next';
import './globals.css';
import {AppProvider} from '@/lib/store';
import Shell from '@/components/Shell';

export const metadata: Metadata = {
 metadataBase: new URL('https://lekdee.kan.bio'),
 title: {default:'เลขดี — ให้ทุกความเชื่อ มีเรื่องราว',template:'%s | เลขดี'},
 description: 'พื้นที่รวมแรงบันดาลใจเรื่องตัวเลข ขอเลข บันทึกเลขโปรด และสำรวจกระแส เพื่อความบันเทิง ไม่มีบริการรับแทงหรือซื้อขายสลาก',
 openGraph: {title:'เลขดี — ให้ทุกความเชื่อ มีเรื่องราว',description:'ขอเลข บันทึกเลขโปรด สำรวจกระแสเลขดัง และสถิติย้อนหลัง เพื่อความบันเทิง',url:'https://lekdee.kan.bio',siteName:'เลขดี',locale:'th_TH',type:'website'},
 robots: {index:true,follow:true},
};

export const viewport: Viewport = {
 width: 'device-width',
 initialScale: 1,
 themeColor: '#07100e',
};

export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="th"><body><AppProvider><Shell>{children}</Shell></AppProvider></body></html>;
}
