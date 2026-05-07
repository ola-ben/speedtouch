import { useEffect, useState } from 'react'
import { fetchServices } from '../lib/services'

export function useServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetchServices()
      .then((list) => {
        if (!cancelled) setServices(list)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load services')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { services, loading, error }
}
