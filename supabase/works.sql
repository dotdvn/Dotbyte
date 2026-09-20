begin;
-- Run once in the Supabase SQL editor.
create table public.work_admins (user_id uuid primary key references auth.users(id) on delete cascade);
alter table public.work_admins enable row level security;
create policy "Read own membership" on public.work_admins for select to authenticated using (user_id = auth.uid());
create function public.is_work_admin() returns boolean language sql stable security definer set search_path = '' as $$ select exists(select 1 from public.work_admins where user_id = auth.uid()); $$;
revoke all on function public.is_work_admin() from public;
grant execute on function public.is_work_admin() to anon, authenticated;
create table public.works (
 id uuid primary key default gen_random_uuid(), title text not null check(length(title) between 1 and 150),
 slug text not null unique check(slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
 summary text not null default '', description text not null default '',
 category text not null default 'Websites' check(category in ('Websites','Apps','IoT','PCB')),
 technologies text[] not null default '{}', live_url text not null default '' check(live_url = '' or live_url ~ '^https?://'),
 github_url text not null default '' check(github_url = '' or github_url ~ '^https?://'),
 status text not null default 'draft' check(status in ('draft','published')),
 featured boolean not null default false, sort_order integer not null default 0,
 deleted_at timestamptz, updated_at timestamptz not null default now(), created_at timestamptz not null default now()
);
create function public.touch_work() returns trigger language plpgsql set search_path = '' as $$ begin new.updated_at = now(); return new; end $$;
create trigger touch_work before update on public.works for each row execute function public.touch_work();
alter table public.works enable row level security;
create policy "Published works" on public.works for select to anon, authenticated using ((status = 'published' and deleted_at is null) or public.is_work_admin());
create policy "Admin writes" on public.works for all to authenticated using (public.is_work_admin()) with check (public.is_work_admin());
create table public.work_images (
 id uuid primary key default gen_random_uuid(), work_id uuid not null references public.works(id) on delete cascade,
 path text not null unique, alt text not null default '', caption text not null default '', sort_order integer not null default 0,
 check(split_part(path, '/', 1) = work_id::text)
);
alter table public.work_images enable row level security;
create policy "Visible images" on public.work_images for select to anon, authenticated using (exists(select 1 from public.works w where w.id = work_id and ((w.status = 'published' and w.deleted_at is null) or public.is_work_admin())));
create policy "Admin image writes" on public.work_images for all to authenticated using(public.is_work_admin()) with check(public.is_work_admin());
grant select on public.works, public.work_images to anon;
grant select,insert,update,delete on public.works, public.work_images to authenticated;
grant select on public.work_admins to authenticated;
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types) values ('work-images','work-images',false,5242880,array['image/jpeg','image/png','image/webp']);
create policy "Published image files" on storage.objects for select to anon, authenticated using (bucket_id = 'work-images' and (public.is_work_admin() or exists(select 1 from public.work_images i join public.works w on w.id = i.work_id where i.path = name and w.status = 'published' and w.deleted_at is null)));
create policy "Admin image files" on storage.objects for all to authenticated using (bucket_id = 'work-images' and public.is_work_admin()) with check(bucket_id = 'work-images' and public.is_work_admin());
commit;
-- After creating your user in Authentication > Users, run this separately:
-- insert into public.work_admins(user_id) select id from auth.users where email = 'YOUR_ADMIN_EMAIL';
