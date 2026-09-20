import { createClient } from '@supabase/supabase-js';
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const supabase = url && key ? createClient(url, key) : null;
export const categories = ['Websites', 'Apps', 'IoT', 'PCB'];
export interface WorkImage { id: string; work_id: string; path: string; alt: string; caption: string; sort_order: number; url?: string }
export interface Work { id: string; title: string; slug: string; summary: string; description: string; category: string; technologies: string[]; live_url: string; github_url: string; featured: boolean; sort_order: number; status: 'draft'|'published'; deleted_at: string|null; work_images?: WorkImage[] }
export const emptyWork = (): Work => ({id:crypto.randomUUID(),title:'',slug:'',summary:'',description:'',category:'Websites',technologies:[],live_url:'',github_url:'',featured:false,sort_order:0,status:'draft',deleted_at:null});
export const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export function safeLink(url: string) { try { const u = new URL(url); return ['https:','http:'].includes(u.protocol) ? u.href : undefined; } catch { return undefined; } }
export async function loadWorks(admin = false) {
 if (!supabase) return [];
 let query = supabase.from('works').select('*,work_images(*)').order('sort_order').order('created_at',{ascending:false});
 if (!admin) query = query.eq('status','published').is('deleted_at',null);
 const {data,error} = await query; if(error) throw error;
 return Promise.all((data as Work[]).map(async w => ({...w,work_images:await signImages(w.work_images || [])})));
}
export async function signImages(images: WorkImage[]) {
 if (!supabase || !images.length) return [];
 const {data,error} = await supabase.storage.from('work-images').createSignedUrls(images.map(i=>i.path),3600);
 if(error) throw error;
 return images.map((i,n)=>({...i,url:data[n]?.signedUrl})).sort((a,b)=>a.sort_order-b.sort_order);
}
export async function compressImage(file: File) {
 if(!['image/jpeg','image/png','image/webp'].includes(file.type) || file.size > 15*1024*1024) throw new Error('Choose a JPG, PNG, or WebP image under 15 MB.');
 const bitmap = await createImageBitmap(file);
 const ratio = Math.min(1,1920/Math.max(bitmap.width,bitmap.height));
 const canvas = document.createElement('canvas'); canvas.width=Math.round(bitmap.width*ratio); canvas.height=Math.round(bitmap.height*ratio);
 canvas.getContext('2d')!.drawImage(bitmap,0,0,canvas.width,canvas.height); bitmap.close();
 const blob = await new Promise<Blob|null>(resolve=>canvas.toBlob(resolve,'image/webp',.85));
 if(!blob || blob.size>5*1024*1024) throw new Error('Image is too large after compression. Choose a smaller image.');
 return blob;
}
