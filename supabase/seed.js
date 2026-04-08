// ================================================================
// Route d'Égypte — Supabase Seed Script
// Migrates all existing trips.js data into Supabase tables.
//
// PREREQUISITES:
//   1. Fill in .env at project root with real Supabase credentials
//   2. Run supabase/schema.sql in Supabase SQL Editor first
//   3. Run this script: node supabase/seed.js
//
// Uses Node's built-in env loading — requires Node >= 20.6
// Or install dotenv: npm install dotenv  then uncomment line below
// ================================================================

// import 'dotenv/config' // ← Uncomment if Node < 20.6

import { createClient } from '@supabase/supabase-js'

// ── Load env manually for Node (Vite doesn't run here) ──────────
const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY  // service_role bypasses RLS

if (!SUPABASE_URL || !SUPABASE_KEY || SUPABASE_KEY.startsWith('your_')) {
  console.error('\n❌  Missing Supabase service_role key.')
  console.error('   Open .env and fill in SUPABASE_SERVICE_KEY')
  console.error('   Get it from: Supabase Dashboard > Project Settings > API > service_role (secret)\n')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// ── Import existing data ─────────────────────────────────────────
import { categoriesData, tripsData } from '../src/data/trips.js'

// ── Helpers ──────────────────────────────────────────────────────

/** Parse price string like "2 450" or "90" to a Number */
function parsePrice(str) {
  if (!str) return null
  const cleaned = String(str).replace(/\s/g, '').replace(',', '.')
  const n = parseFloat(cleaned)
  return isNaN(n) ? null : n
}

/** Parse rating string like "4.9/5 (128 avis)" to a Number */
function parseRating(str) {
  if (!str || str === 'New') return null
  const match = String(str).match(/^([\d.]+)/)
  return match ? parseFloat(match[1]) : null
}

async function upsertCategories() {
  console.log('\n📂  Seeding categories...')
  const rows = Object.values(categoriesData).map((cat) => ({
    slug:        cat.id,
    hero_tag:    cat.heroTag   || null,
    title:       cat.title,
    subtitle:    cat.subtitle  || null,
    hero_image:  cat.heroImage || null,
    intro_title: cat.introTitle || null,
    intro_text:  cat.introText  || [],
    trip_keys:   cat.tripKeys   || [],
  }))

  for (const row of rows) {
    const { error } = await supabase
      .from('categories')
      .upsert(row, { onConflict: 'slug' })
    if (error) {
      console.error(`  ✗  Category "${row.slug}":`, error.message)
    } else {
      console.log(`  ✓  Category "${row.slug}"`)
    }
  }
}

async function upsertTrips() {
  console.log('\n🗺️   Seeding trips...')

  // Build a map of trip → category slug
  const tripToCategory = {}
  for (const [slug, cat] of Object.entries(categoriesData)) {
    for (const key of cat.tripKeys || []) {
      tripToCategory[key] = slug
    }
  }

  for (const [key, trip] of Object.entries(tripsData)) {
    const row = {
      id:                trip.id,
      category_slug:     tripToCategory[trip.id] || null,
      title:             trip.title,
      short_description: trip.shortDescription || null,
      category_label:    trip.categoryLabel    || null,
      duration:          trip.duration         || null,
      group_size:        trip.groupSize        || null,
      language:          trip.language         || null,
      price_per_person:  parsePrice(trip.price),
      images:            trip.images           || [],
      itinerary:         [],    // empty — editable via admin dashboard
      includes:          [],    // empty — editable via admin dashboard
      excludes:          [],    // empty — editable via admin dashboard
      star_rating:       parseRating(trip.rating),
      extra_data: {
        // Preserve the original rating string for display
        rating_label: trip.rating || null,
      },
    }

    const { error } = await supabase
      .from('trips')
      .upsert(row, { onConflict: 'id' })
    if (error) {
      console.error(`  ✗  Trip "${trip.id}":`, error.message)
    } else {
      console.log(`  ✓  Trip "${trip.id}"`)
    }
  }
}

async function seed() {
  console.log('🚀  Starting Route d\'Égypte seed...')
  console.log(`    URL: ${SUPABASE_URL}`)

  await upsertCategories()
  await upsertTrips()

  console.log('\n✅  Seed complete!\n')
  process.exit(0)
}

seed().catch((err) => {
  console.error('\n💥  Unexpected error:', err)
  process.exit(1)
})
