-- ============================================================================
-- StudiaCare — Supabase schema (Postgres) + Row Level Security.
-- Run this in the Supabase SQL editor once the project exists.
-- {{NEED FROM CLIENT: create the Supabase project, then run this file.}}
-- ============================================================================

-- ---- Profiles: one row per auth user -------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  tier text not null default 'free' check (tier in ('free', 'standard', 'advanced')),
  stripe_customer_id text,
  created_at timestamptz not null default now()
);

-- Create a profile row automatically when a user signs up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email)
  on conflict (id) do nothing;
  insert into public.progress (user_id) values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---- Progress: one row per user ------------------------------------------
create table if not exists public.progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  questions_answered int not null default 0,
  streak int not null default 0,
  last_study_date date,
  cycle_day int not null default 1,
  cycle_number int not null default 1,
  chapter_scores jsonb not null default '{}'::jsonb,
  reminders jsonb not null default
    '{"enabled":false,"time":"18:00","channel":"email","days":[1,2,3,4,5]}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ---- Attempts: history of completed quizzes ------------------------------
create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  label text not null,
  chapter text not null,
  score int not null,
  total int not null,
  by_chapter jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists attempts_user_idx on public.attempts (user_id, created_at desc);

-- ---- Question bank -------------------------------------------------------
create table if not exists public.questions (
  id text primary key,
  chapter text not null,
  prompt text not null,
  options jsonb not null,
  correct int not null,
  rationale text not null,
  bank int not null default 1
);

-- ---- Flashcards ----------------------------------------------------------
create table if not exists public.flashcards (
  id text primary key,
  chapter text not null,
  front text not null,
  back text not null
);

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table public.profiles   enable row level security;
alter table public.progress   enable row level security;
alter table public.attempts   enable row level security;
alter table public.questions  enable row level security;
alter table public.flashcards enable row level security;

-- Users can read/update only their own profile.
create policy "own profile - select" on public.profiles
  for select using (auth.uid() = id);
create policy "own profile - update" on public.profiles
  for update using (auth.uid() = id);

-- Users can read/update only their own progress.
create policy "own progress - select" on public.progress
  for select using (auth.uid() = user_id);
create policy "own progress - upsert" on public.progress
  for insert with check (auth.uid() = user_id);
create policy "own progress - update" on public.progress
  for update using (auth.uid() = user_id);

-- Users can read/insert only their own attempts.
create policy "own attempts - select" on public.attempts
  for select using (auth.uid() = user_id);
create policy "own attempts - insert" on public.attempts
  for insert with check (auth.uid() = user_id);

-- Question bank + flashcards are readable by any signed-in user.
create policy "questions - read" on public.questions
  for select using (auth.role() = 'authenticated');
create policy "flashcards - read" on public.flashcards
  for select using (auth.role() = 'authenticated');
