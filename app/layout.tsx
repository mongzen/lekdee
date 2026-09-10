import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'เลขดี — ให้ทุกความเชื่อ มีเรื่องราว', description: 'พื้นที่รวมแรงบันดาลใจเรื่องตัวเลข ขอเลข บันทึกเลขโปรด และสำรวจกระแส เพื่อความบันเทิง ไม่มีบริการรับแทงหรือซื้อขายสลาก' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="th"><body>{children}</body></html>; }
