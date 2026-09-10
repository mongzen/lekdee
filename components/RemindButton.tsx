'use client';
import {useApp} from '@/lib/store';

export default function RemindButton({className,children}:{className?:string;children:React.ReactNode}){
 const {remind} = useApp();
 return <button className={className} onClick={remind}>{children}</button>;
}
