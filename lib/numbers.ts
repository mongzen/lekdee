export function randomNumber(digits = 2): string {
  const ceiling = 10 ** digits;
  const values = new Uint32Array(1);
  const limit = Math.floor(4294967296 / ceiling) * ceiling;
  do { crypto.getRandomValues(values); } while (values[0] >= limit);
  return String(values[0] % ceiling).padStart(digits, '0');
}
export const stories = [
 {id:1,number:'89',pair:'98',tag:'กระแสออนไลน์',title:'เลขคู่มงคลที่สายมูกำลังพูดถึง',detail:'ตัวอย่างการรวบรวมบทสนทนาเรื่องเลขคู่มงคลจากกระแสออนไลน์ ไม่ใช่ข่าวหรือยอดการกล่าวถึงจริง',source:'ตัวอย่างกระแสออนไลน์',heat:92,icon:'✦'},
 {id:2,number:'56',pair:'65',tag:'ข่าวและเหตุการณ์',title:'วันสำคัญ จุดเริ่มต้นของเลขในใจ',detail:'ตัวอย่างการแปลงวันที่และวันครบรอบเป็นตัวเลข พร้อมพื้นที่สำหรับแหล่งอ้างอิงเมื่อเชื่อมข้อมูลจริง',source:'ตัวอย่างข่าวและเหตุการณ์',heat:78,icon:'◈'},
 {id:3,number:'27',pair:'72',tag:'สายมู',title:'เลขจากความเชื่อ ที่ส่งต่อกันทุกงวด',detail:'ตัวอย่างเรื่องเล่าจากชุมชนสายมู ความเชื่อเป็นเรื่องส่วนบุคคลและไม่เพิ่มโอกาสถูกรางวัล',source:'ตัวอย่างเรื่องเล่าสายมู',heat:65,icon:'❋'},
];
export type Note = {number:string;source:string;date:string};
