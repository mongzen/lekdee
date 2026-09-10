'use client';
import {Check,Plus} from 'lucide-react';
import {useApp} from '@/lib/store';

export default function VoteButton({number}:{number:string}){
 const {votes,toggleVote} = useApp();
 const voted = votes.includes(number);
 return <button className={'outline '+(voted?'voted':'')} onClick={()=>toggleVote(number)}>{voted?<Check size={15}/>:<Plus size={15}/>} {voted?'โหวตแล้ว':'โหวต'} {voted?1:0}</button>;
}
