import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight, Star, Plus, Minus, ShieldCheck, Truck, RotateCcw } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'

function NotFound() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-xl px-6 text-center">
        <h1 className="text-3xl font-semibold text-slate-900">Product not found</h1>
        <p className="mt-3 text-slate-600">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-block rounded-full bg-brand-blue px-6 py-3 text-sm font-medium text-white"
        >
          Browse all products
        </Link>
      </div>
    </section>
  )
}

function ProductDetailPage() {
  const { id } = useParams()
  const { products, loading } = useProducts()
  const product = products.find((p) => p.id === id)
  const [qty, setQty] = useState(1)
  const { addItem, openDrawer } = useCart()

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div
          aria-label="Loading"
          className="h-10 w-10 animate-spin rounded-full border-4 border-brand-blue/20 border-t-brand-blue"
        />
      </div>
    )
  }

  if (!product) return <NotFound />

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAdd = () => {
    addItem(product, qty)
    openDrawer()
  }

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav className="flex items-center gap-1 text-sm text-slate-500">
          <Link to="/" className="transition hover:text-brand-blue">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/products" className="transition hover:text-brand-blue">
            Products
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="line-clamp-1 font-medium text-slate-900">{product.name}</span>
        </nav>

        <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <div className="relative aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              <span className="absolute right-4 top-4 rounded bg-brand-pink-soft px-2 py-1 text-xs font-bold text-brand-pink-deep">
                -{product.discount}%
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold leading-tight tracking-tight text-slate-900 md:text-3xl">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-2 text-sm">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i <= Math.round(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium text-slate-900">{product.rating}</span>
              <span className="text-slate-500">({product.reviews} reviews)</span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-slate-900 md:text-4xl">
                ₦{product.price.toLocaleString('en-NG')}
              </span>
              <span className="text-base text-slate-400 line-through">
                ₦{product.original.toLocaleString('en-NG')}
              </span>
              <span className="rounded bg-brand-pink-soft px-2 py-0.5 text-xs font-bold text-brand-pink-deep">
                Save ₦{(product.original - product.price).toLocaleString('en-NG')}
              </span>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-slate-600 md:text-base">
              {product.description}
            </p>

            <div className="mt-6 text-sm">
              {product.stock > 10 ? (
                <span className="inline-flex items-center gap-1.5 text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  In stock — ready to ship
                </span>
              ) : product.stock > 0 ? (
                <span className="inline-flex items-center gap-1.5 text-amber-600">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  Only {product.stock} left
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  Out of stock
                </span>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-slate-200 bg-white">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="p-2.5 text-slate-700 hover:text-brand-blue disabled:opacity-40"
                  disabled={qty <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-8 text-center text-sm font-semibold tabular-nums">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  aria-label="Increase quantity"
                  className="p-2.5 text-slate-700 hover:text-brand-blue disabled:opacity-40"
                  disabled={qty >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                disabled={product.stock === 0}
                className="flex-1 rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add to cart · ₦{(product.price * qty).toLocaleString('en-NG')}
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-slate-100 pt-6 text-xs text-slate-600">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <Truck className="h-5 w-5 text-brand-blue" />
                <span>Free shipping ₦40k+</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <RotateCcw className="h-5 w-5 text-brand-blue" />
                <span>14-day returns</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <ShieldCheck className="h-5 w-5 text-brand-blue" />
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
              You might also like
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:border-brand-blue/40 hover:shadow-md hover:shadow-brand-blue/5"
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <span className="absolute right-1.5 top-1.5 rounded bg-brand-pink-soft px-1.5 py-0.5 text-[10px] font-bold text-brand-pink-deep">
                      -{p.discount}%
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="line-clamp-2 min-h-[2.4em] text-xs leading-snug text-slate-800 md:text-sm">
                      {p.name}
                    </h3>
                    <div className="mt-1 text-sm font-bold text-slate-900">
                      ₦{p.price.toLocaleString('en-NG')}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductDetailPage
