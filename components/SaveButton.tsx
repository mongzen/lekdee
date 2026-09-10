'use client';
import {useApp} from '@/lib/store';

export default function SaveButton({number,source,children,className}:{number:string;source:string;children:React.ReactNode;className?:string}){
 const {save} = useApp();
 return <button className={className||'outline'} onClick={()=>save(number,source)}>{children}</button>;
}
