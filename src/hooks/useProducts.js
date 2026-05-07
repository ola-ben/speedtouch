import { useEffect, useState } from 'react'
import { fetchProductById, fetchProducts } from '../lib/products'
import { isSupabaseConfigured } from '../lib/supabase'

if (typeof window !== 'undefined' && !isSupabaseConfigured) {
  // eslint-disable-next-line no-console
  console.warn(
    '[Speedtouch] Supabase env vars are missing. ' +
      'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel → Settings → Environment Variables, then redeploy.',
  )
}

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchProducts()
      .then((list) => {
        if (!cancelled) setProducts(list)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load products')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { products, loading, error }
}

export function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchProductById(id)
      .then((p) => {
        if (!cancelled) setProduct(p)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load product')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id])

  return { product, loading, error }
}
