/**
 * setup-db.js — Creates tables directly in Supabase using the Management API.
 * Run once: node --env-file=.env supabase/setup-db.js
 *
 * Requires: VITE_SUPABASE_URL and SUPABASE_SERVICE_KEY in .env
 */

const SUPABASE_URL  = process.env.VITE_SUPABASE_URL
const SERVICE_KEY   = process.env.SUPABASE_SERVICE_KEY
const PROJECT_REF   = SUPABASE_URL?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1]

if (!PROJECT_REF || !SERVICE_KEY || SERVICE_KEY.startsWith('your_')) {
  console.error('❌  Missing credentials in .env')
  process.exit(1)
}

const SQL = `
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
`

async function setup() {
  console.log(`\n🔧  Setting up database for project: ${PROJECT_REF}`)
  console.log(`    URL: ${SUPABASE_URL}\n`)

  // Use Supabase Management API to run SQL
  const res = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
    {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${SERVICE_KEY}`,
      },
      body: JSON.stringify({ query: SQL }),
    }
  )

  const text = await res.text()

  if (!res.ok) {
    // Management API requires a management token, not service_role key.
    // Fall back to direct PostgREST SQL execution.
    console.log('ℹ️   Management API needs a personal access token.')
    console.log('    Trying direct pg connection via Supabase REST...\n')
    await runViaRpc()
    return
  }

  console.log('✅  Database tables created successfully!\n')
}

// Fallback: Run SQL via supabase-js using the service role key
async function runViaRpc() {
  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

  // Try using pg_execute or direct rpc — this only works if pg_execute function exists
  const { data, error } = await supabase.rpc('pg_execute', { sql: SQL })

  if (error) {
    console.error('❌  Could not create tables automatically.\n')
    console.error('    The tables must be created manually in the Supabase SQL Editor.')
    console.error('    Please open this URL in your browser and run the schema:\n')
    console.error(`    👉  https://supabase.com/dashboard/project/${PROJECT_REF}/sql/new\n`)
    console.error('    Then paste the content of: supabase/schema.sql\n')

    // Write the SQL to a readable file as a fallback
    import('fs').then(fs => {
      console.log('    The SQL has also been saved to: supabase/create-tables.sql')
      console.log('    Copy and paste that file into the SQL Editor and click Run.\n')
      fs.writeFileSync('supabase/create-tables.sql', SQL, 'utf8')
    })
  } else {
    console.log('✅  Tables created successfully via RPC!\n')
  }
}

setup().catch((err) => {
  console.error('💥  Unexpected error:', err.message)
  process.exit(1)
})
