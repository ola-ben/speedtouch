import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import StockBar from './StockBar'
import { useProducts } from '../hooks/useProducts'

function Products() {
  const { products, loading } = useProducts()
  const featured = products.slice(0, 6)

  return (
    <section id="products" className="bg-white py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="px-4 sm:px-6">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-pink-deep">
                Our products
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                Quality cleaning supplies, made for everyday use
              </h2>
              <p className="mt-4 text-slate-600">
                Carefully selected products that get the job done — eco-friendly,
                durable, and honestly priced.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-8 sm:mt-12 sm:px-6">
          <div className="overflow-hidden border-y border-slate-200 sm:rounded-2xl sm:border sm:shadow-sm">
            <div className="flex items-center justify-between bg-brand-blue px-4 py-3 md:px-6 md:py-4">
              <h3 className="text-base font-semibold text-white md:text-lg">
                Top picks{' '}
                <span className="text-sm font-normal text-white/80">
                  | Up to 35% off
                </span>
              </h3>
              <Link
                to="/products"
                className="flex items-center gap-1 text-sm font-medium text-white transition hover:opacity-80"
              >
                See all <span aria-hidden="true">›</span>
              </Link>
            </div>

            <div className="bg-white p-3 md:p-4">
              {loading && featured.length === 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="overflow-hidden rounded-lg border border-slate-200 bg-white"
                    >
                      <div className="aspect-square animate-pulse bg-slate-100" />
                      <div className="space-y-2 p-3">
                        <div className="h-3 animate-pulse rounded bg-slate-100" />
                        <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />
                        <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : featured.length === 0 ? (
                <p className="px-2 py-12 text-center text-sm text-slate-500">
                  No products yet.{' '}
                  <Link to="/admin/products/new" className="font-medium text-brand-blue hover:underline">
                    Add the first one →
                  </Link>
                </p>
              ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-3">
                {featured.map((p) => (
                  <article
                    key={p.id}
                    className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:border-brand-blue/40 hover:shadow-md hover:shadow-brand-blue/5"
                  >
                    <Link to={`/products/${p.id}`} className="group block">
                      <div className="relative aspect-square overflow-hidden bg-slate-100">
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          className={`h-full w-full object-cover transition duration-300 group-hover:scale-105 ${
                            p.stock === 0 ? 'opacity-60 grayscale' : ''
                          }`}
                        />
                        {p.stock === 0 ? (
                          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-900/85 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
                            Sold out
                          </span>
                        ) : (
                          <span className="absolute right-1.5 top-1.5 rounded bg-brand-pink-soft px-1.5 py-0.5 text-[10px] font-bold text-brand-pink-deep">
                            -{p.discount}%
                          </span>
                        )}
                      </div>
                      <div className="px-3 pt-3">
                        <h4 className="line-clamp-2 min-h-[2.4em] text-xs leading-snug text-slate-800 md:text-sm">
                          {p.name}
                        </h4>
                        <div className="mt-1 text-sm font-bold text-slate-900 md:text-base">
                          ₦{p.price.toLocaleString('en-NG')}
                        </div>
                        <div className="text-[10px] text-slate-400 line-through md:text-xs">
                          ₦{p.original.toLocaleString('en-NG')}
                        </div>
                        <StockBar stock={p.stock} />
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products
