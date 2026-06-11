import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Search, X } from 'lucide-react'
import { categories } from '../data/products'
import { useProducts } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import StockBar from '../components/StockBar'

function ProductsPage() {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('featured')
  const { addItem } = useCart()
  const { products, loading, error } = useProducts()

  useDocumentTitle(
    'Cleaning Supplies & Tools',
    'Browse Speedtouch cleaning supplies, tools, and bundles — eco-friendly, durable, honestly priced in Naira.',
  )

  const filtered = useMemo(() => {
    let list = products
    if (category !== 'all') list = list.filter((p) => p.category === category)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      )
    }
    switch (sort) {
      case 'price-asc':
        return [...list].sort((a, b) => a.price - b.price)
      case 'price-desc':
        return [...list].sort((a, b) => b.price - a.price)
      case 'discount':
        return [...list].sort((a, b) => b.discount - a.discount)
      default:
        return list
    }
  }, [category, query, sort, products])

  return (
    <section className="bg-white py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav className="flex items-center gap-1 text-sm text-slate-500">
          <Link to="/" className="transition hover:text-brand-blue">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-slate-900">Products</span>
        </nav>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              All Products
            </h1>
            <p className="mt-2 text-sm text-slate-600 md:text-base">
              Browse our full range of cleaning supplies, tools, and bundles.
            </p>
          </div>
          <span className="text-sm text-slate-500">
            {filtered.length} of {products.length} items
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="discount">Biggest discount</option>
          </select>
        </div>

        <div className="no-scrollbar mt-4 -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                category === c.id
                  ? 'border-brand-blue bg-brand-blue text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-brand-blue hover:text-brand-blue'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white"
              >
                <div className="aspect-[5/4] animate-pulse bg-slate-100" />
                <div className="space-y-2 p-3">
                  <div className="h-3 animate-pulse rounded bg-slate-100" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
                  <div className="mt-2 h-7 animate-pulse rounded-full bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-200 py-16 text-center text-sm text-slate-500">
            {products.length === 0 ? (
              <>
                No products yet.{' '}
                <Link to="/admin/products/new" className="font-medium text-brand-blue hover:underline">
                  Add the first one →
                </Link>
              </>
            ) : (
              <>
                No products match your search.{' '}
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    setCategory('all')
                  }}
                  className="font-medium text-brand-blue hover:underline"
                >
                  Reset filters
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <article
                key={p.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition hover:-translate-y-1"
              >
                <Link
                  to={`/products/${p.id}`}
                  className="relative block aspect-[5/4] overflow-hidden bg-slate-100"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${
                      p.stock === 0 ? 'opacity-60 grayscale' : ''
                    }`}
                  />
                  {p.stock === 0 ? (
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-900/85 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur">
                      Sold out
                    </span>
                  ) : p.discount > 0 ? (
                    <span className="absolute left-3 top-3 rounded-full bg-brand-pink-deep px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                      -{p.discount}%
                    </span>
                  ) : null}
                </Link>

                <div className="flex flex-1 flex-col p-3">
                  <Link to={`/products/${p.id}`}>
                    <h3 className="line-clamp-2 min-h-[2.5em] text-sm font-semibold leading-snug text-slate-900 transition group-hover:text-brand-blue">
                      {p.name}
                    </h3>
                  </Link>

                  <div className="mt-auto pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-extrabold text-slate-900 md:text-lg">
                        ₦{p.price.toLocaleString('en-NG')}
                      </span>
                      {p.original ? (
                        <span className="text-xs text-slate-400 line-through">
                          ₦{p.original.toLocaleString('en-NG')}
                        </span>
                      ) : null}
                    </div>

                    <StockBar stock={p.stock} />

                    <button
                      type="button"
                      onClick={() => addItem(p)}
                      disabled={p.stock === 0}
                      className="mt-2.5 w-full rounded-full bg-brand-blue px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-brand-blue-deep disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                    >
                      {p.stock === 0 ? 'Sold out' : 'Add to cart'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Link
            to="/"
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-brand-blue hover:text-brand-blue"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProductsPage
