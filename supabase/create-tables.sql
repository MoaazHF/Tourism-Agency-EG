
-- Drop if partially created, then recreate cleanly
drop table if exists trips cascade;
drop table if exists categories cascade;

-- TABLE: categories
create table categories (
  id          uuid    default gen_random_uuid() primary key,
  slug        text    unique not null,
  hero_tag    text,
  title       text    not null,
  subtitle    text,
  hero_image  text,
  intro_title text,
  intro_text  text[],
  trip_keys   text[],
  created_at  timestamp with time zone default now()
);

-- TABLE: trips
create table trips (
  id                text    primary key,
  category_slug     text    references categories(slug) on delete set null,
  title             text    not null,
  short_description text,
  category_label    text,
  duration          text,
  trip_type         text,
  group_size        text,
  language          text,
  price_per_person  numeric,
  price_per_two     numeric,
  departing_details text,
  star_rating       numeric default 5,
  images            text[],
  itinerary         jsonb   default '[]'::jsonb,
  includes          text[]  default '{}',
  excludes          text[]  default '{}',
  extra_data        jsonb   default '{}'::jsonb,
  is_featured       boolean default false not null,
  tags              text[]  default '{}',
  created_at        timestamp with time zone default now()
);

-- RLS
alter table categories enable row level security;
alter table trips       enable row level security;

-- Drop policies if they already exist (safe to re-run)
drop policy if exists "Public read categories"       on categories;
drop policy if exists "Public read trips"            on trips;
drop policy if exists "Admin full access categories" on categories;
drop policy if exists "Admin full access trips"      on trips;

create policy "Public read categories"
  on categories for select using (true);

create policy "Public read trips"
  on trips for select using (true);

create policy "Admin full access categories"
  on categories for all using (auth.role() = 'authenticated');

create policy "Admin full access trips"
  on trips for all using (auth.role() = 'authenticated');
