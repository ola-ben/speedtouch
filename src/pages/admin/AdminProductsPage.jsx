import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { deleteProduct, fetchProducts } from '../../lib/products'
import { deleteProductImage } from '../../lib/storage'
import { isSupabaseConfigured } from '../../lib/supabase'

function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(null)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const list = await fetchProducts()
        if (!cancelled) setProducts(list)
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load products')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const handleDelete = async (product) => {
    if (!window.confirm(`Delete "${product.name}"? This can't be undone.`)) return
    setBusy(product.id)
    try {
      await deleteProduct(product.id)
      if (product.image) {
        try {
          await deleteProductImage(product.image)
        } catch {
          // best-effort
        }
      }
      setProducts((list) => list.filter((p) => p.id !== product.id))
    } catch (err) {
      window.alert(err.message || 'Delete failed')
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="px-4 py-8 sm:px-6 md:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Products
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage your catalogue — names, prices, stock, and images.
            </p>
          </div>
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            New product
          </Link>
        </div>

        {!isSupabaseConfigured && (
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Supabase isn't connected. Add{' '}
            <code className="font-mono">VITE_SUPABASE_URL</code> and{' '}
            <code className="font-mono">VITE_SUPABASE_ANON_KEY</code> to your environment.
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-blue/20 border-t-brand-blue" />
            </div>
          ) : products.length === 0 ? (
            <div className="px-6 py-16 text-center text-sm text-slate-500">
              No products yet.{' '}
              <Link to="/admin/products/new" className="font-medium text-brand-blue hover:underline">
                Add your first product
              </Link>
              .
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="hidden px-4 py-3 sm:table-cell">Category</th>
                  <th className="px-4 py-3 text-right">Price</th>
                  <th className="hidden px-4 py-3 text-right md:table-cell">Stock</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-slate-100">
                          {p.image && (
                            <img
                              src={p.image}
                              alt=""
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          )}
                        </div>
                        <div>
                          <div className="line-clamp-1 font-medium text-slate-900">
                            {p.name}
                          </div>
                          <div className="font-mono text-[11px] text-slate-400">{p.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 capitalize text-slate-600 sm:table-cell">
                      {p.category}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-900 tabular-nums">
                      ₦{p.price.toLocaleString('en-NG')}
                    </td>
                    <td className="hidden px-4 py-3 text-right tabular-nums md:table-cell">
                      {p.stock === 0 ? (
                        <span className="text-red-600">Out</span>
                      ) : p.stock < 10 ? (
                        <span className="text-amber-600">{p.stock}</span>
                      ) : (
                        <span className="text-slate-700">{p.stock}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/admin/products/${p.id}/edit`}
                          aria-label={`Edit ${p.name}`}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-brand-blue-soft hover:text-brand-blue"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(p)}
                          disabled={busy === p.id}
                          aria-label={`Delete ${p.name}`}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminProductsPage
