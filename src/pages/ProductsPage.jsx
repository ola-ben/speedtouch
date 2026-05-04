import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { products } from '../data/products'

function ProductsPage() {
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
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              All Products
            </h1>
            <p className="mt-2 text-sm text-slate-600 md:text-base">
              Browse our full range of cleaning supplies, tools, and bundles.
            </p>
          </div>
          <span className="text-sm text-slate-500">
            {products.length} items
          </span>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <article
              key={p.name}
              className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:border-brand-blue/40 hover:shadow-md hover:shadow-brand-blue/5"
            >
              <div className="group block">
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
                <div className="px-3 pt-3">
                  <h3 className="line-clamp-2 min-h-[2.4em] text-xs leading-snug text-slate-800 md:text-sm">
                    {p.name}
                  </h3>
                  <div className="mt-1 text-sm font-bold text-slate-900 md:text-base">
                    ₦{p.price.toLocaleString('en-NG')}
                  </div>
                  <div className="text-[10px] text-slate-400 line-through md:text-xs">
                    ₦{p.original.toLocaleString('en-NG')}
                  </div>
                </div>
              </div>
              <div className="mt-2 px-3 pb-3">
                <button
                  type="button"
                  className="w-full rounded-full bg-brand-blue px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                >
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>

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
