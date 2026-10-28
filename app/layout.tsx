import type {Metadata,Viewport} from 'next';
import './globals.css';
import {AppProvider} from '@/lib/store';
import Shell from '@/components/Shell';
import {Noto_Sans_Thai_Looped,Space_Grotesk} from 'next/font/google';

const thai = Noto_Sans_Thai_Looped({subsets:['thai','latin'],weight:['400','500','600','700'],display:'swap',variable:'--font-thai'});
const grotesk = Space_Grotesk({subsets:['latin'],weight:['400','500','600','700'],display:'swap',variable:'--font-grotesk'});

export const metadata: Metadata = {
 metadataBase: new URL('https://lekdee.kan.bio'),
 title: {default:'เลขดี — ให้ทุกความเชื่อ มีเรื่องราว',template:'%s | เลขดี'},
 description: 'พื้นที่รวมแรงบันดาลใจเรื่องตัวเลข ขอเลข บันทึกเลขโปรด และสำรวจกระแส เพื่อความบันเทิง ไม่มีบริการรับแทงหรือซื้อขายสลาก',
 openGraph: {title:'เลขดี — ให้ทุกความเชื่อ มีเรื่องราว',description:'ขอเลข บันทึกเลขโปรด สำรวจกระแสเลขดัง และสถิติย้อนหลัง เพื่อความบันเทิง',url:'https://lekdee.kan.bio',siteName:'เลขดี',locale:'th_TH',type:'website'},
 robots: {index:false,follow:false,nocache:true,noarchive:true,nosnippet:true,noimageindex:true,googleBot:{index:false,follow:false,noarchive:true,nosnippet:true,noimageindex:true}},
};

export const viewport: Viewport = {
 width: 'device-width',
 initialScale: 1,
 themeColor: '#07100e',
};

export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="th" className={`${thai.variable} ${grotesk.variable}`}><body><AppProvider><Shell>{children}</Shell></AppProvider></body></html>;
}
