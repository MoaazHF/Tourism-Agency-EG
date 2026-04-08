import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

/**
 * Fetches all trips (useful for home page featured sections or admin tables).
 *
 * @returns {{ trips: Array, loading: boolean, error: string|null }}
 */
export function useTrips() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchTrips() {
      setLoading(true)
      setError(null)

      const { data, error: err } = await supabase
        .from('trips')
        .select('*')
        .order('created_at', { ascending: true })

      if (cancelled) return

      if (err) {
        console.error('[useTrips]', err.message)
        setError(err.message)
      } else {
        setTrips(data || [])
      }
      setLoading(false)
    }

    fetchTrips()
    return () => { cancelled = true }
  }, [])

  return { trips, loading, error }
}
