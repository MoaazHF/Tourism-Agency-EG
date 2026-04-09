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
      setLoading(true)
      setError(null)

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
      } else {
        setTrip(data)
      }
      setLoading(false)
    }

    fetchTrip()
    return () => { cancelled = true }
  }, [tripId])

  return { trip, loading, error }
}
