import { Link } from 'react-router-dom'
import { ChevronRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'

const SHIPPING_THRESHOLD = 40000
const SHIPPING_COST = 2500

function CartPage() {
  const { items, count, subtotal, removeItem, setQuantity, clearCart } = useCart()
  const shipping = subtotal === 0 ? 0 : subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping

  return (
    <section className="bg-white py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav className="flex items-center gap-1 text-sm text-slate-500">
          <Link to="/" className="transition hover:text-brand-blue">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-slate-900">Cart</span>
        </nav>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Your cart
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          {count} {count === 1 ? 'item' : 'items'} ready to ship.
        </p>

        {items.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-200 px-6 py-16 text-center">
            <ShoppingBag className="mx-auto h-10 w-10 text-slate-300" />
            <p className="mt-4 text-slate-600">
              Your cart is empty. Time to find something good.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-block rounded-full bg-brand-blue px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
                {items.map((it) => (
                  <li key={it.id} className="flex gap-4 p-4 sm:p-5">
                    <Link
                      to={`/products/${it.id}`}
                      className="block h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:h-28 sm:w-28"
                    >
                      <img
                        src={it.image}
                        alt={it.name}
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <Link
                        to={`/products/${it.id}`}
                        className="line-clamp-2 text-sm font-medium leading-snug text-slate-900 hover:text-brand-blue sm:text-base"
                      >
                        {it.name}
                      </Link>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-sm font-bold text-slate-900 sm:text-base">
                          ₦{it.price.toLocaleString('en-NG')}
                        </span>
                        {it.original && (
                          <span className="text-xs text-slate-400 line-through">
                            ₦{it.original.toLocaleString('en-NG')}
                          </span>
                        )}
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="inline-flex items-center rounded-full border border-slate-200 bg-white">
                          <button
                            type="button"
                            onClick={() => setQuantity(it.id, it.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="p-2 text-slate-700 hover:text-brand-blue disabled:opacity-40"
                            disabled={it.quantity <= 1}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-7 text-center text-sm font-medium tabular-nums">
                            {it.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(it.id, it.quantity + 1)}
                            aria-label="Increase quantity"
                            className="p-2 text-slate-700 hover:text-brand-blue"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-slate-900 tabular-nums">
                          ₦{(it.price * it.quantity).toLocaleString('en-NG')}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(it.id)}
                          aria-label={`Remove ${it.name}`}
                          className="p-1 text-slate-400 transition hover:text-brand-pink-deep"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <Link
                  to="/products"
                  className="text-sm font-medium text-slate-700 transition hover:text-brand-blue"
                >
                  ← Continue shopping
                </Link>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-sm font-medium text-slate-500 transition hover:text-brand-pink-deep"
                >
                  Clear cart
                </button>
              </div>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5">
                <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
                <dl className="mt-4 space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-slate-600">Subtotal</dt>
                    <dd className="font-medium text-slate-900 tabular-nums">
                      ₦{subtotal.toLocaleString('en-NG')}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-600">Shipping</dt>
                    <dd className="font-medium text-slate-900 tabular-nums">
                      {shipping === 0 ? 'Free' : `₦${shipping.toLocaleString('en-NG')}`}
                    </dd>
                  </div>
                  {subtotal > 0 && subtotal < SHIPPING_THRESHOLD && (
                    <p className="rounded-lg bg-brand-blue-soft px-3 py-2 text-xs text-slate-700">
                      Spend ₦{(SHIPPING_THRESHOLD - subtotal).toLocaleString('en-NG')}{' '}
                      more for free shipping.
                    </p>
                  )}
                </dl>
                <div className="mt-4 flex items-baseline justify-between border-t border-slate-100 pt-4">
                  <span className="text-base font-semibold text-slate-900">Total</span>
                  <span className="text-2xl font-bold text-slate-900 tabular-nums">
                    ₦{total.toLocaleString('en-NG')}
                  </span>
                </div>
                <Link
                  to="/checkout"
                  className="mt-5 block rounded-full bg-brand-blue px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Proceed to checkout
                </Link>
                <p className="mt-3 text-center text-xs text-slate-500">
                  Secure SSL checkout · Multiple payment methods
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  )
}

export default CartPage
