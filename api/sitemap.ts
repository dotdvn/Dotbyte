import type { IncomingMessage, ServerResponse } from 'node:http';
import { createClient } from '@supabase/supabase-js';
export default async function handler(_req: IncomingMessage,res: ServerResponse){
 const url=process.env.VITE_SUPABASE_URL,key=process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
 try{
 if(!url||!key)throw new Error('Missing configuration');
 const client=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data,error}=await client.from('works').select('slug,updated_at').eq('status','published').is('deleted_at',null);
 if(error)throw error;
 res.writeHead(200,{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'no-store'});
 res.end(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://dotbyte.dotdvn.me/</loc></url>${data.map(w=>`<url><loc>https://dotbyte.dotdvn.me/works/${encodeURIComponent(w.slug)}</loc><lastmod>${new Date(w.updated_at).toISOString()}</lastmod></url>`).join('')}</urlset>`);
 }catch{res.writeHead(503,{'Content-Type':'text/plain','Retry-After':'60'});res.end('Sitemap temporarily unavailable');}
}
