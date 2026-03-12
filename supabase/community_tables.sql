-- ============================================================
-- Viajeros Mayores — Community System
-- Run this ENTIRE script in your Supabase SQL Editor
-- ============================================================


-- ── 0. PROFILES TABLE ────────────────────────────────────────────────────────
-- profiles.id = auth.users.id (same UUID)
-- This table must exist before community tables (FK dependency)

create table if not exists profiles (
  id         uuid        references auth.users(id) on delete cascade primary key,
  full_name  text,
  username   text,
  avatar_url text,
  created_at timestamptz default now() not null
);

alter table profiles enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'profiles'
    and policyname = 'Public profiles are viewable by everyone'
  ) then
    create policy "Public profiles are viewable by everyone"
      on profiles for select using (true);
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'profiles'
    and policyname = 'Users can insert own profile'
  ) then
    create policy "Users can insert own profile"
      on profiles for insert with check (auth.uid() = id);
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'profiles'
    and policyname = 'Users can update own profile'
  ) then
    create policy "Users can update own profile"
      on profiles for update using (auth.uid() = id);
  end if;
end $$;

-- Auto-create profile when a user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ── 1. COMMUNITY POSTS ───────────────────────────────────────────────────────
-- FK to profiles(id) so PostgREST can join profiles via fk hint

create table if not exists community_posts (
  id             uuid        default gen_random_uuid() primary key,
  created_at     timestamptz default now()             not null,
  user_id        uuid        references profiles(id)   on delete cascade not null,
  title          text,
  content        text                                  not null,
  category       text        not null                  default 'experiencias',
  location       text,
  travel_date    date,
  likes_count    integer     not null                  default 0,
  comments_count integer     not null                  default 0
);

alter table community_posts enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'community_posts'
    and policyname = 'Anyone can read community posts'
  ) then
    create policy "Anyone can read community posts"
      on community_posts for select using (true);
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'community_posts'
    and policyname = 'Authenticated users can create community posts'
  ) then
    create policy "Authenticated users can create community posts"
      on community_posts for insert
      with check (auth.uid() = user_id);
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'community_posts'
    and policyname = 'Users can update their own community posts'
  ) then
    create policy "Users can update their own community posts"
      on community_posts for update
      using (auth.uid() = user_id);
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'community_posts'
    and policyname = 'Users can delete their own community posts'
  ) then
    create policy "Users can delete their own community posts"
      on community_posts for delete
      using (auth.uid() = user_id);
  end if;
end $$;


-- ── 2. COMMUNITY POST LIKES ──────────────────────────────────────────────────

create table if not exists community_post_likes (
  id         uuid        default gen_random_uuid() primary key,
  created_at timestamptz default now()             not null,
  post_id    uuid        references community_posts(id) on delete cascade not null,
  user_id    uuid        references auth.users(id)      on delete cascade not null,
  unique (post_id, user_id)
);

alter table community_post_likes enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'community_post_likes'
    and policyname = 'Anyone can read likes'
  ) then
    create policy "Anyone can read likes"
      on community_post_likes for select using (true);
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'community_post_likes'
    and policyname = 'Authenticated users can like'
  ) then
    create policy "Authenticated users can like"
      on community_post_likes for insert
      with check (auth.uid() = user_id);
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'community_post_likes'
    and policyname = 'Users can unlike'
  ) then
    create policy "Users can unlike"
      on community_post_likes for delete
      using (auth.uid() = user_id);
  end if;
end $$;


-- ── 3. COMMUNITY POST COMMENTS ───────────────────────────────────────────────
-- FK to profiles(id) so PostgREST can join profiles via fk hint

create table if not exists community_post_comments (
  id                uuid        default gen_random_uuid() primary key,
  created_at        timestamptz default now()             not null,
  post_id           uuid        references community_posts(id)       on delete cascade not null,
  user_id           uuid        references profiles(id)              on delete cascade not null,
  comment_text      text                                             not null,
  parent_comment_id uuid        references community_post_comments(id) on delete cascade
);

alter table community_post_comments enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'community_post_comments'
    and policyname = 'Anyone can read comments'
  ) then
    create policy "Anyone can read comments"
      on community_post_comments for select using (true);
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'community_post_comments'
    and policyname = 'Authenticated users can comment'
  ) then
    create policy "Authenticated users can comment"
      on community_post_comments for insert
      with check (auth.uid() = user_id);
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'community_post_comments'
    and policyname = 'Users can delete their own comments'
  ) then
    create policy "Users can delete their own comments"
      on community_post_comments for delete
      using (auth.uid() = user_id);
  end if;
end $$;


-- ── 4. TRIGGERS — keep counts in sync ────────────────────────────────────────

create or replace function handle_community_like_count()
returns trigger language plpgsql as $$
begin
  if TG_OP = 'INSERT' then
    update community_posts set likes_count = likes_count + 1 where id = NEW.post_id;
  elsif TG_OP = 'DELETE' then
    update community_posts set likes_count = greatest(likes_count - 1, 0) where id = OLD.post_id;
  end if;
  return null;
end;
$$;

drop trigger if exists trg_community_like_count on community_post_likes;
create trigger trg_community_like_count
  after insert or delete on community_post_likes
  for each row execute function handle_community_like_count();


create or replace function handle_community_comment_count()
returns trigger language plpgsql as $$
begin
  if TG_OP = 'INSERT' then
    update community_posts set comments_count = comments_count + 1 where id = NEW.post_id;
  elsif TG_OP = 'DELETE' then
    update community_posts set comments_count = greatest(comments_count - 1, 0) where id = OLD.post_id;
  end if;
  return null;
end;
$$;

drop trigger if exists trg_community_comment_count on community_post_comments;
create trigger trg_community_comment_count
  after insert or delete on community_post_comments
  for each row execute function handle_community_comment_count();


-- ── 5. INDICES ────────────────────────────────────────────────────────────────

create index if not exists idx_community_posts_created_at
  on community_posts (created_at desc);

create index if not exists idx_community_posts_category
  on community_posts (category);

create index if not exists idx_community_post_likes_post_id
  on community_post_likes (post_id);

create index if not exists idx_community_post_comments_post_id
  on community_post_comments (post_id, created_at);


-- ── 6. BACKFILL — create profiles for existing users without one ──────────────
-- Safe to run even if no users exist yet
insert into public.profiles (id, full_name, avatar_url)
select
  u.id,
  u.raw_user_meta_data->>'full_name',
  u.raw_user_meta_data->>'avatar_url'
from auth.users u
where not exists (select 1 from public.profiles p where p.id = u.id);
