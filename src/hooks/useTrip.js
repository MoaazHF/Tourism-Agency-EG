import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

/**
 * Fetches a single trip by its ID (UUID).
 *
 * @param {string} tripId - UUID of the trip
 * @returns {{ trip: object|null, loading: boolean, error: string|null }}
 */
export function useTrip(tripId) {
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!tripId) return
    let cancelled = false

    async function fetchTrip() {
      // UUID validation: Prevent Supabase from throwing a type error for slugs
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(tripId)) {
        console.warn('[useTrip] Invalid UUID format:', tripId);
        setTrip(null);
        setError('Invalid trip identifier. Please ensure the URL is correct.');
        setLoading(false);
        return;
      }

      setLoading(true)
      setError(null)

      try {
        const { data, error: err } = await supabase
          .from('trips')
          .select('*')
          .eq('id', tripId)
          .single()

        if (cancelled) return

        if (err) {
          console.error('[useTrip]', err.message)
          setError(err.message)
          setTrip(null)
        } else if (data) {
          // Data Normalization: Ensure collections are always arrays
          const normalized = {
            ...data,
            images: Array.isArray(data.images) ? data.images : [],
            itinerary: Array.isArray(data.itinerary) ? data.itinerary : [],
            includes: Array.isArray(data.includes) ? data.includes : [],
            excludes: Array.isArray(data.excludes) ? data.excludes : []
          }
          setTrip(normalized)
        } else {
          setTrip(null)
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.message)
          setTrip(null)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchTrip()
    return () => { cancelled = true }
  }, [tripId])

  return { trip, loading, error }
}
