import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import StockBar from './StockBar'
import { useProducts } from '../hooks/useProducts'

const naira = (n) => `₦${Number(n).toLocaleString('en-NG')}`

function ProductCard({ product }) {
  const soldOut = product.stock === 0

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition hover:-translate-y-1">
      <Link
        to={`/products/${product.id}`}
        className="relative block aspect-[5/4] overflow-hidden bg-slate-100"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${
            soldOut ? 'opacity-60 grayscale' : ''
          }`}
        />
        {soldOut ? (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-900/85 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
            Sold out
          </span>
        ) : product.discount > 0 ? (
          <span className="absolute left-3 top-3 rounded-full bg-brand-pink-deep px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
            -{product.discount}%
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="line-clamp-2 min-h-[2.6em] text-sm font-semibold leading-snug text-slate-900 transition group-hover:text-brand-blue md:text-base">
            {product.name}
          </h3>
        </Link>

        {product.rating > 0 ? (
          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
            <span className="text-amber-400">★</span>
            <span className="font-semibold text-slate-700">{product.rating.toFixed(1)}</span>
            {product.reviews > 0 ? <span className="text-slate-400">({product.reviews})</span> : null}
          </div>
        ) : null}

        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="text-lg font-extrabold text-slate-900">{naira(product.price)}</span>
          {product.original ? (
            <span className="text-sm text-slate-400 line-through">{naira(product.original)}</span>
          ) : null}
        </div>

        <StockBar stock={product.stock} />
      </div>
    </article>
  )
}

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">
      <div className="aspect-[5/4] animate-pulse bg-slate-100" />
      <div className="space-y-2 p-4">
        <div className="h-3 animate-pulse rounded bg-slate-100" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />
        <div className="h-5 w-1/2 animate-pulse rounded bg-slate-200" />
        <div className="mt-2 h-9 animate-pulse rounded-full bg-slate-100" />
      </div>
    </div>
  )
}

function Products() {
  const { products, loading } = useProducts()
  const featured = products.slice(0, 8)

  return (
    <section id="products" className="bg-white py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
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

        {/* Top picks deal strip */}
        <Reveal>
          <div className="mt-10 flex items-center justify-center rounded-2xl bg-brand-blue px-5 py-3.5 text-white">
            <p className="font-semibold">
              Top picks
              <span className="ml-2 rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium">
                Up to 35% off
              </span>
            </p>
          </div>
        </Reveal>

        {/* Product grid */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {loading && featured.length === 0
            ? Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)
            : featured.map((p, i) => (
                <Reveal key={p.id} delay={i * 60} mobileSkip>
                  <ProductCard product={p} />
                </Reveal>
              ))}
        </div>

        {!loading && featured.length === 0 && (
          <p className="mt-6 text-center text-sm text-slate-500">
            No products yet.{' '}
            <Link to="/admin/products/new" className="font-medium text-brand-blue hover:underline">
              Add the first one →
            </Link>
          </p>
        )}

        {featured.length > 0 && (
          <div className="mt-10 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-brand-blue hover:text-brand-blue"
            >
              View all products →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default Products
