import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ChevronRight, CreditCard, Lock } from 'lucide-react'
import { useCart } from '../context/CartContext'

const SHIPPING_THRESHOLD = 40000
const SHIPPING_COST = 2500

function CheckoutPage() {
  const { items, count, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  if (items.length === 0 && !submitting) return <Navigate to="/cart" replace />

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    const orderId = `ST-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
    setTimeout(() => {
      clearCart()
      navigate(`/order/confirmation?id=${orderId}`, { replace: true })
    }, 800)
  }

  return (
    <section className="bg-white py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav className="flex items-center gap-1 text-sm text-slate-500">
          <Link to="/" className="transition hover:text-brand-blue">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/cart" className="transition hover:text-brand-blue">
            Cart
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-slate-900">Checkout</span>
        </nav>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <fieldset className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <legend className="px-2 text-sm font-semibold text-slate-900">
                Contact
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" type="email" name="email" required autoComplete="email" />
                <Field label="Phone" type="tel" name="phone" required autoComplete="tel" />
              </div>
            </fieldset>

            <fieldset className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <legend className="px-2 text-sm font-semibold text-slate-900">
                Shipping address
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name" name="firstName" required autoComplete="given-name" />
                <Field label="Last name" name="lastName" required autoComplete="family-name" />
                <div className="sm:col-span-2">
                  <Field label="Street address" name="address" required autoComplete="street-address" />
                </div>
                <Field label="City" name="city" required autoComplete="address-level2" />
                <Field label="State" name="state" required autoComplete="address-level1" />
                <Field label="Postal code" name="postal" required autoComplete="postal-code" />
                <Field label="Country" name="country" defaultValue="Nigeria" required />
              </div>
            </fieldset>

            <fieldset className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-slate-900">
                <CreditCard className="h-4 w-4 text-brand-blue" />
                Payment
              </legend>
              <div className="grid gap-4">
                <Field label="Card number" name="cardNumber" placeholder="0000 0000 0000 0000" required autoComplete="cc-number" />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiry" name="expiry" placeholder="MM / YY" required autoComplete="cc-exp" />
                  <Field label="CVC" name="cvc" placeholder="123" required autoComplete="cc-csc" />
                </div>
                <Field label="Name on card" name="cardName" required autoComplete="cc-name" />
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
                <Lock className="h-3 w-3" /> Demo checkout — no real charge will be made.
              </p>
            </fieldset>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-semibold text-slate-900">
                Order summary{' '}
                <span className="text-sm font-normal text-slate-500">({count})</span>
              </h2>
              <ul className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1">
                {items.map((it) => (
                  <li key={it.id} className="flex gap-3 text-sm">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-slate-100">
                      <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                      <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-1 text-[10px] font-bold text-white">
                        {it.quantity}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col">
                      <span className="line-clamp-2 text-xs font-medium text-slate-800">
                        {it.name}
                      </span>
                      <span className="mt-auto text-sm font-semibold text-slate-900 tabular-nums">
                        ₦{(it.price * it.quantity).toLocaleString('en-NG')}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-600">Subtotal</dt>
                  <dd className="tabular-nums">₦{subtotal.toLocaleString('en-NG')}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-600">Shipping</dt>
                  <dd className="tabular-nums">
                    {shipping === 0 ? 'Free' : `₦${shipping.toLocaleString('en-NG')}`}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-2 text-base font-semibold">
                  <dt>Total</dt>
                  <dd className="tabular-nums">₦{total.toLocaleString('en-NG')}</dd>
                </div>
              </dl>
              <button
                type="submit"
                disabled={submitting}
                className="mt-5 w-full rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-60"
              >
                {submitting ? 'Placing order…' : `Pay ₦${total.toLocaleString('en-NG')}`}
              </button>
            </div>
          </aside>
        </form>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', ...rest }) {
  return (
    <label className="block text-sm">
      <span className="text-xs font-medium text-slate-700">{label}</span>
      <input
        type={type}
        name={name}
        className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
        {...rest}
      />
    </label>
  )
}

export default CheckoutPage
