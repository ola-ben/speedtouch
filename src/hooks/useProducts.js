import { useEffect, useState } from 'react'
import { fetchProductById, fetchProducts } from '../lib/products'
import { isSupabaseConfigured } from '../lib/supabase'
import { products as localProducts } from '../data/products'

export function useProducts() {
  const [products, setProducts] = useState(() =>
    isSupabaseConfigured ? [] : localProducts,
  )
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    let cancelled = false
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
  const [product, setProduct] = useState(() =>
    isSupabaseConfigured ? null : localProducts.find((p) => p.id === id) ?? null,
  )
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    let cancelled = false
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
