import type {Metadata} from 'next';
export const metadata: Metadata = {
 title: 'โพยของฉัน',
 description: 'บันทึกเลขโปรดของคุณไว้ในอุปกรณ์นี้ ป้องกันเลขซ้ำ และตั้งเตือนวันออกรางวัลลงปฏิทิน',
};
export default function MyNumbersLayout({children}:{children:React.ReactNode}){ return children; }
