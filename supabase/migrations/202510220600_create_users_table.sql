-- Create extension for UUID generation (already present on most Supabase projects)
create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text not null,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;

-- Basic policies – adjust to match your security requirements.
drop policy if exists "Allow authenticated read users" on public.users;
create policy "Allow authenticated read users"
on public.users
for select
to authenticated
using (true);

drop policy if exists "Allow authenticated insert users" on public.users;
create policy "Allow authenticated insert users"
on public.users
for insert
to authenticated
with check (true);

drop policy if exists "Allow authenticated update users" on public.users;
create policy "Allow authenticated update users"
on public.users
for update
to authenticated
using (true)
with check (true);
