import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

/**
 * Fetches all categories from Supabase.
 * @returns {{ categories: Array, loading: boolean, error: string|null }}
 */
export function useCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchCategories() {
      setLoading(true)
      setError(null)

      const { data, error: err } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: true })

      if (cancelled) return

      if (err) {
        console.error('[useCategories]', err.message)
        setError(err.message)
      } else {
        setCategories(data || [])
      }
      setLoading(false)
    }

    fetchCategories()
    return () => { cancelled = true }
  }, [])

  return { categories, loading, error }
}
