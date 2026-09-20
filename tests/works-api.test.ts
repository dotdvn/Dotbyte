import test from 'node:test';
import assert from 'node:assert/strict';
import project from '../api/project.ts';
import sitemap from '../api/sitemap.ts';
process.env.VITE_SUPABASE_URL='https://example.supabase.co';
process.env.VITE_SUPABASE_PUBLISHABLE_KEY='test-public-key';
const originalFetch=globalThis.fetch;
function response(){return {status:0,body:'',headers:{} as Record<string,string>,writeHead(status:number,headers:Record<string,string>){this.status=status;this.headers=headers;},end(body:string){this.body=body;}};}
test('project HTML escapes content and only requests published non-trashed works',async()=>{
 globalThis.fetch=async(input)=>{const url=String(input);assert.match(url,/status=eq.published/);assert.match(url,/deleted_at=is.null/);return new Response(JSON.stringify({title:'<script>alert(1)</script>',slug:'sample',summary:'A "quote"',category:'Websites',technologies:['<img>'],description:'<iframe>',live_url:'javascript:alert(1)',github_url:'',work_images:[]}));};
 const res=response();try{await project({url:'/api/project?slug=sample'} as any,res as any);assert.equal(res.status,200);assert.match(res.body,/&lt;script&gt;/);assert.doesNotMatch(res.body,/<script>|<iframe>|href="javascript:/);assert.match(res.body,/rel="canonical"/);}finally{globalThis.fetch=originalFetch;}
});
test('unknown or unpublished project returns noindex 404',async()=>{
 globalThis.fetch=async()=>new Response('null');const res=response();try{await project({url:'/api/project?slug=missing'} as any,res as any);assert.equal(res.status,404);assert.equal(res.headers['X-Robots-Tag'],'noindex');}finally{globalThis.fetch=originalFetch;}
});
test('sitemap requests only published non-trashed projects and uses valid XML',async()=>{
 globalThis.fetch=async(input)=>{assert.match(String(input),/status=eq.published/);assert.match(String(input),/deleted_at=is.null/);return new Response(JSON.stringify([{slug:'a-project',updated_at:'2026-09-19T00:00:00Z'}]));};const res=response();try{await sitemap({} as any,res as any);assert.equal(res.status,200);assert.match(res.body,/<loc>https:\/\/dotbyte.dotdvn.me\/works\/a-project<\/loc>/);}finally{globalThis.fetch=originalFetch;}
});
test('missing backend configuration fails closed',async()=>{const previous=process.env.VITE_SUPABASE_URL;delete process.env.VITE_SUPABASE_URL;const res=response();try{await project({url:'/api/project?slug=x'} as any,res as any);assert.equal(res.status,503);}finally{process.env.VITE_SUPABASE_URL=previous;}});
