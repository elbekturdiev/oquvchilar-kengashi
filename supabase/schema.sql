-- =====================================================================
--  O‘quvchilar kengashi — Supabase sxemasi
--  Supabase → SQL Editor → New query → shu faylni to‘liq qo‘yib, RUN bosing.
--  Qayta ishga tushirish xavfsiz (idempotent).
-- =====================================================================

-- 1) Foydalanuvchi profillari ------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text not null default '',
  role        text not null default 'student'
              check (role in ('student', 'parent', 'counselor', 'admin')),
  phone       text default '',
  district    text default '',
  school      text default '',
  grade       text default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Admin ekanligini tekshirish (RLS ichida rekursiyasiz ishlatish uchun)
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- Ro‘yxatdan o‘tganda profilni avtomatik yaratish
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  r text := coalesce(new.raw_user_meta_data ->> 'role', 'student');
begin
  if r not in ('student', 'parent', 'counselor') then
    r := 'student';  -- admin rolini faqat SQL orqali berish mumkin
  end if;
  insert into public.profiles (id, full_name, role, phone, district, school, grade)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    r,
    coalesce(new.raw_user_meta_data ->> 'phone', ''),
    coalesce(new.raw_user_meta_data ->> 'district', ''),
    coalesce(new.raw_user_meta_data ->> 'school', ''),
    coalesce(new.raw_user_meta_data ->> 'grade', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Foydalanuvchi o‘z rolini o‘zi o‘zgartira olmasin
create or replace function public.protect_profile_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role and not public.is_admin() then
    new.role := old.role;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists profiles_protect_role on public.profiles;
create trigger profiles_protect_role
  before update on public.profiles
  for each row execute function public.protect_profile_role();

alter table public.profiles enable row level security;

drop policy if exists "profiles: o'zini ko'radi" on public.profiles;
create policy "profiles: o'zini ko'radi" on public.profiles
  for select using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles: o'zini tahrirlaydi" on public.profiles;
create policy "profiles: o'zini tahrirlaydi" on public.profiles
  for update using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());

-- 2) To‘garaklarga arizalar ---------------------------------------------
create table if not exists public.applications (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users (id) on delete set null,
  club_id       text not null,
  club_name     text not null,
  org           text default '',
  student_name  text not null check (char_length(student_name) between 2 and 120),
  grade         text default '',
  phone         text not null check (char_length(phone) between 7 and 30),
  school        text default '',
  status        text not null default 'new'
                check (status in ('new', 'accepted', 'rejected')),
  created_at    timestamptz not null default now()
);

create index if not exists applications_user_idx on public.applications (user_id);
create index if not exists applications_created_idx on public.applications (created_at desc);

alter table public.applications enable row level security;

-- Har kim (kirmagan ham) ariza yubora oladi; kirgan bo‘lsa — faqat o‘z nomidan
drop policy if exists "applications: yuborish" on public.applications;
create policy "applications: yuborish" on public.applications
  for insert to anon, authenticated
  with check (
    status = 'new'
    and (user_id is null or user_id = auth.uid())
  );

-- O‘z arizalarini ko‘radi; admin — hammasini
drop policy if exists "applications: ko'rish" on public.applications;
create policy "applications: ko'rish" on public.applications
  for select using (user_id = auth.uid() or public.is_admin());

-- Holatni faqat admin o‘zgartiradi
drop policy if exists "applications: admin yangilaydi" on public.applications;
create policy "applications: admin yangilaydi" on public.applications
  for update using (public.is_admin()) with check (public.is_admin());

-- Foydalanuvchi o‘z yangi arizasini bekor qila oladi
drop policy if exists "applications: bekor qilish" on public.applications;
create policy "applications: bekor qilish" on public.applications
  for delete using ((user_id = auth.uid() and status = 'new') or public.is_admin());

grant select, insert, update, delete on public.applications to anon, authenticated;
grant select, update on public.profiles to authenticated;

-- =====================================================================
--  O‘zingizni ADMIN qilish (avval saytdan ro‘yxatdan o‘ting, keyin):
--    update public.profiles set role = 'admin'
--    where id = (select id from auth.users where email = 'SIZNING@POCHTA.UZ');
-- =====================================================================
