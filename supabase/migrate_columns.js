import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_KEY in .env')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

async function migrate() {
  console.log('🚀  Running migration...')

  // We can't easily run raw SQL via supabase-js unless pg_execute is set up.
  // The best way is for the user to run it in the SQL Editor.
  console.log('\n⚠️   You must run the following SQL in the Supabase SQL Editor:')
  console.log('\n    ALTER TABLE trips ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false NOT NULL;')
  console.log('    ALTER TABLE trips ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT \'{}\';\n')
  
  console.log('    Link: https://supabase.com/dashboard/project/' + SUPABASE_URL.split('.')[0].split('//')[1] + '/sql/new')
}

migrate().catch(console.error)
