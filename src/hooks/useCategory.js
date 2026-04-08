import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

/**
 * Fetches a single category + its trips in one round-trip.
 * Trips are ordered to match the category's trip_keys array.
 *
 * @param {string} categorySlug - e.g. "cruises", "safari"
 * @returns {{ category: object|null, trips: Array, loading: boolean, error: string|null }}
 */
export function useCategory(categorySlug) {
  const [category, setCategory] = useState(null)
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!categorySlug) return
    let cancelled = false

    async function fetchCategory() {
      setLoading(true)
      setError(null)

      // Fetch the category row
      const { data: catData, error: catErr } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', categorySlug)
        .single()

      if (cancelled) return

      if (catErr) {
        console.error('[useCategory] category fetch:', catErr.message)
        setError(catErr.message)
        setLoading(false)
        return
      }

      setCategory(catData)

      // Fetch trips belonging to this category
      const { data: tripData, error: tripErr } = await supabase
        .from('trips')
        .select('*')
        .eq('category_slug', categorySlug)

      if (cancelled) return

      if (tripErr) {
        console.error('[useCategory] trips fetch:', tripErr.message)
        setError(tripErr.message)
        setLoading(false)
        return
      }

      // Re-order trips to match the category's trip_keys ordering
      const keys = catData.trip_keys || []
      const ordered = keys
        .map((key) => (tripData || []).find((t) => t.id === key))
        .filter(Boolean)

      // Append any trips not in trip_keys at the end, sorted by created_at desc
      const extra = (tripData || [])
        .filter((t) => !keys.includes(t.id))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

      setTrips([...ordered, ...extra])
      setLoading(false)
    }

    fetchCategory()
    return () => { cancelled = true }
  }, [categorySlug])

  return { category, trips, loading, error }
}
