'use client';
import {Bookmark} from 'lucide-react';
import {useApp} from '@/lib/store';

export default function NumberChip({number,source}:{number:string;source:string}){
 const {notes,save} = useApp();
 const saved = notes.some(n=>n.number===number);
 return <button className={'number-chip '+(saved?'saved':'')} onClick={()=>save(number,source)}>{number}<Bookmark size={13}/></button>;
}
