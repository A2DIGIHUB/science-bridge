-- Drop existing policies first
drop policy if exists "Public authors are viewable by everyone" on authors;
drop policy if exists "Authors can be created by authenticated users" on authors;
drop policy if exists "Categories are viewable by everyone" on categories;
drop policy if exists "Categories can be created by authenticated users" on categories;
drop policy if exists "Tags are viewable by everyone" on tags;
drop policy if exists "Tags can be created by authenticated users" on tags;
drop policy if exists "Published posts are viewable by everyone" on posts;
drop policy if exists "Posts can be created by authenticated users" on posts;
drop policy if exists "Posts can be updated by their authors" on posts;
drop policy if exists "Posts tags are viewable by everyone" on posts_tags;
drop policy if exists "Posts tags can be modified by post authors" on posts_tags;

-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

-- Authors table
create table if not exists authors (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  credentials text,
  bio text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Categories table
create table if not exists categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tags table
create table if not exists tags (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Posts table
create table if not exists posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  content jsonb not null,
  author_id uuid references authors(id),
  category_id uuid references categories(id),
  status text check (status in ('draft', 'review', 'published')),
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Posts-Tags junction table
create table if not exists posts_tags (
  post_id uuid references posts(id) on delete cascade,
  tag_id uuid references tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

-- Add full-text search
alter table posts add column if not exists search_vector tsvector
  generated always as (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(content->>'excerpt', '')), 'B') ||
    setweight(to_tsvector('english', coalesce(content->>'body', '')), 'C')
  ) stored;

create index if not exists posts_search_idx on posts using gin(search_vector);

-- Add some initial categories
insert into categories (name, slug, description) values
  ('Physics', 'physics', 'Articles about physics and the fundamental nature of reality'),
  ('Biology', 'biology', 'Exploring life sciences and living organisms'),
  ('Chemistry', 'chemistry', 'Understanding matter and its interactions'),
  ('Space', 'space', 'Astronomy and space exploration'),
  ('Technology', 'technology', 'Latest developments in science and technology'),
  ('Health', 'health', 'Medical science and healthcare')
on conflict (slug) do nothing;

-- Add RLS (Row Level Security) policies
alter table authors enable row level security;
alter table categories enable row level security;
alter table tags enable row level security;
alter table posts enable row level security;
alter table posts_tags enable row level security;

-- Policies for authors
create policy "Public authors are viewable by everyone"
  on authors for select
  using (true);

create policy "Authors can be created by authenticated users"
  on authors for insert
  with check (auth.role() = 'authenticated');

-- Policies for categories
create policy "Categories are viewable by everyone"
  on categories for select
  using (true);

create policy "Categories can be created by authenticated users"
  on categories for insert
  with check (auth.role() = 'authenticated');

-- Policies for tags
create policy "Tags are viewable by everyone"
  on tags for select
  using (true);

create policy "Tags can be created by authenticated users"
  on tags for insert
  with check (auth.role() = 'authenticated');

-- Policies for posts
create policy "Published posts are viewable by everyone"
  on posts for select
  using (status = 'published');

create policy "Posts can be created by authenticated users"
  on posts for insert
  with check (auth.role() = 'authenticated');

create policy "Posts can be updated by their authors"
  on posts for update
  using (auth.uid()::text = author_id::text);

-- Policies for posts_tags
create policy "Posts tags are viewable by everyone"
  on posts_tags for select
  using (true);

create policy "Posts tags can be modified by post authors"
  on posts_tags for insert
  with check (
    exists (
      select 1 from posts
      where id = post_id
      and auth.uid()::text = author_id::text
    )
  );
