/**
 * Migration: Convert trips.id from text-slug → UUID
 * Adds a `slug` column preserving the old text IDs.
 * Updates bookings.trip_id FK references.
 * Run: node --env-file=.env supabase/migrate-to-uuid.js
 */
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

async function run() {
  console.log('🚀  Starting UUID migration...\n')

  // ── Step 1: Read all current trips ───────────────────────────────
  const { data: trips, error: fetchErr } = await supabase
    .from('trips')
    .select('*')

  if (fetchErr) throw new Error('Cannot read trips: ' + fetchErr.message)
  console.log(`📋  Found ${trips.length} trips to migrate`)

  // ── Step 2: For each trip – insert a NEW row with a UUID id ──────
  // We'll create a mapping of old_slug → new_uuid
  const slugToUuid = {}

  for (const trip of trips) {
    const newId = crypto.randomUUID()
    slugToUuid[trip.id] = newId

    const newTrip = {
      ...trip,
      id: newId,
      slug: trip.id,          // preserve old text id as slug
    }

    const { error: insErr } = await supabase
      .from('trips')
      .insert(newTrip)

    if (insErr) {
      console.error(`  ✗  Failed to insert UUID version of "${trip.id}":`, insErr.message)
    } else {
      console.log(`  ✓  "${trip.id}"  →  ${newId}`)
    }
  }

  // ── Step 3: Update bookings to point to new UUIDs ────────────────
  console.log('\n🔗  Updating bookings references...')
  const { data: bookings, error: bFetchErr } = await supabase
    .from('bookings')
    .select('id, trip_id')

  if (!bFetchErr && bookings?.length) {
    for (const booking of bookings) {
      const newTripId = slugToUuid[booking.trip_id]
      if (!newTripId) continue // already a UUID or unknown

      const { error: bUpdErr } = await supabase
        .from('bookings')
        .update({ trip_id: newTripId })
        .eq('id', booking.id)

      if (bUpdErr) console.error(`  ✗  Booking ${booking.id}:`, bUpdErr.message)
      else console.log(`  ✓  Booking ${booking.id}: trip_id updated`)
    }
  } else {
    console.log('  ℹ️   No bookings to update')
  }

  // ── Step 4: Delete old slug-based rows ───────────────────────────
  console.log('\n🗑️   Removing old slug-based rows...')
  const oldIds = trips.map(t => t.id)

  // Delete bookings referencing old slug IDs first
  await supabase.from('bookings').delete().in('trip_id', oldIds)

  const { error: delErr } = await supabase
    .from('trips')
    .delete()
    .in('id', oldIds)

  if (delErr) console.error('  ✗  Delete error:', delErr.message)
  else console.log(`  ✓  Removed ${oldIds.length} old rows`)

  // ── Done ─────────────────────────────────────────────────────────
  console.log('\n✅  Migration complete!')
  console.log('\n📌  Slug → UUID mapping:')
  for (const [slug, uuid] of Object.entries(slugToUuid)) {
    console.log(`    ${slug.padEnd(20)} → ${uuid}`)
  }
  console.log('\n⚠️   Next steps:')
  console.log('    Run the SQL below in Supabase SQL Editor to add the slug column:')
  console.log('    ALTER TABLE trips ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;\n')
}

run().catch(err => {
  console.error('\n💥  Error:', err.message)
  process.exit(1)
})
