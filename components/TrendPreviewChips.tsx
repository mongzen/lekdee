import type {TrendItem} from '@/lib/trends';
import NumberChip from './NumberChip';

export default function TrendPreviewChips({items}:{items:TrendItem[]}){
 if(!items.length) return <div className="empty">ยังไม่มีเรื่องราวให้แสดงในตอนนี้</div>;
 return <div className="trend-preview">{items.map(s=>
  <article className="trend-preview-card" key={s.id}>
   <div className="story-source"><span/> {s.source}</div>
   <h3>{s.title}</h3>
   <div className="story-numbers"><NumberChip number={s.number} source={s.title}/><NumberChip number={s.pair} source={s.title}/></div>
  </article>
 )}</div>;
}
