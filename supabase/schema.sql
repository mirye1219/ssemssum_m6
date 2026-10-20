-- 쌤씀 미션 6: 원아 메모
-- Supabase SQL Editor에 붙여 넣고 Run 하세요.
-- 인증/사용자별 RLS는 미션 7에서 적용합니다.

create extension if not exists pgcrypto;

create table if not exists public.memos (
  id uuid primary key default gen_random_uuid(),
  child_name text not null,
  memo_date date not null,
  content text not null,
  image_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint child_name_len check (char_length(child_name) between 1 and 20),
  constraint content_len check (char_length(content) between 5 and 1000)
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists memos_updated_at on public.memos;
create trigger memos_updated_at
before update on public.memos
for each row execute function public.set_updated_at();

alter table public.memos enable row level security;

grant select, insert, update, delete on table public.memos to anon, authenticated, service_role;

drop policy if exists "memos public select" on public.memos;
drop policy if exists "memos public insert" on public.memos;
drop policy if exists "memos public update" on public.memos;
drop policy if exists "memos public delete" on public.memos;

create policy "memos public select" on public.memos for select to public using (true);
create policy "memos public insert" on public.memos for insert to public with check (true);
create policy "memos public update" on public.memos for update to public using (true) with check (true);
create policy "memos public delete" on public.memos for delete to public using (true);

insert into storage.buckets (id, name, public)
values ('memo-images', 'memo-images', true)
on conflict (id) do update set public = true;

drop policy if exists "memo images public read" on storage.objects;
drop policy if exists "memo images public write" on storage.objects;
drop policy if exists "memo images public update" on storage.objects;
drop policy if exists "memo images public delete" on storage.objects;

create policy "memo images public read"
on storage.objects for select
to public
using (bucket_id = 'memo-images');

create policy "memo images public write"
on storage.objects for insert
to public
with check (bucket_id = 'memo-images');

create policy "memo images public update"
on storage.objects for update
to public
using (bucket_id = 'memo-images')
with check (bucket_id = 'memo-images');

create policy "memo images public delete"
on storage.objects for delete
to public
using (bucket_id = 'memo-images');
