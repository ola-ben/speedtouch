import { useCallback, useEffect, useState } from 'react'
import { fetchOrderById, fetchOrders } from '../lib/orders'

export function useOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const list = await fetchOrders()
      setOrders(list)
    } catch (err) {
      setError(err.message || 'Failed to load orders')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { orders, loading, error, refresh }
}

export function useOrder(id) {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const o = await fetchOrderById(id)
      setOrder(o)
    } catch (err) {
      setError(err.message || 'Failed to load order')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { order, loading, error, refresh, setOrder }
}
