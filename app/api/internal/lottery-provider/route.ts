import 'server-only';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
export const dynamic = 'force-dynamic';
export async function GET(request: Request){
 const token = process.env.DATA_PROVIDER_TOKEN;
 if(token && request.headers.get('authorization') !== `Bearer ${token}`) return Response.json({error:'unauthorized'},{status:401});
 try {
  const raw = await readFile(join(process.cwd(),'data','lottery-history.json'),'utf8');
  return Response.json(JSON.parse(raw));
 } catch {
  return Response.json({sourceUrl:'https://www.glo.or.th/',results:[]});
 }
}
