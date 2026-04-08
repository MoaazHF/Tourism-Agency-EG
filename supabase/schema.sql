-- ================================================================
-- Route d'Égypte — Supabase Database Schema
-- Run this entire file in: Supabase Dashboard > SQL Editor
-- ================================================================

-- ────────────────────────────────────────────────────────────────
-- TABLE: categories
-- ────────────────────────────────────────────────────────────────
create table categories (
  id          uuid    default gen_random_uuid() primary key,
  slug        text    unique not null,           -- e.g. "cruises", "safari"
  hero_tag    text,                              -- e.g. "Évasion Millénaire"
  title       text    not null,
  subtitle    text,
  hero_image  text,                              -- URL
  intro_title text,
  intro_text  text[], -- array of paragraphs (supports HTML links)
  trip_keys   text[], -- ordered list of trip IDs belonging to this category
  created_at  timestamp with time zone default now()
);

-- ────────────────────────────────────────────────────────────────
-- TABLE: trips
-- ────────────────────────────────────────────────────────────────
create table trips (
  id                text    primary key,          -- slug, e.g. "felucca"
  category_slug     text    references categories(slug) on delete set null,
  title             text    not null,
  short_description text,
  category_label    text,                          -- e.g. "Expérience Signature"
  duration          text,                          -- e.g. "10 Jours / 9 Nuits"
  trip_type         text,
  group_size        text,
  language          text,
  price_per_person  numeric,                       -- numeric, e.g. 2450
  price_per_two     numeric,
  departing_details text,
  star_rating       numeric  default 5,
  images            text[],                        -- array of image URLs
  itinerary         jsonb    default '[]'::jsonb,  -- [{day, title, description}]
  includes          text[]   default '{}',
  excludes          text[]   default '{}',
  extra_data        jsonb    default '{}'::jsonb,  -- catch-all for unmapped fields
  is_featured       boolean  default false not null,
  tags              text[]   default '{}',
  created_at        timestamp with time zone default now()
);

-- ────────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ────────────────────────────────────────────────────────────────
alter table categories enable row level security;
alter table trips       enable row level security;

-- Public: read-only (travel site is publicly browsable)
create policy "Public read categories"
  on categories for select using (true);

create policy "Public read trips"
  on trips for select using (true);

-- Authenticated users (admin): full access
create policy "Admin full access categories"
  on categories for all using (auth.role() = 'authenticated');

create policy "Admin full access trips"
  on trips for all using (auth.role() = 'authenticated');
