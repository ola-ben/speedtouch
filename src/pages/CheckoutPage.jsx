import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ChevronRight, Lock, MapPin, ShieldCheck, Store, Truck } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { createOrder, generateOrderId } from '../lib/orders'
import { isSupabaseConfigured } from '../lib/supabase'
import { isPaystackConfigured, openPaystack } from '../lib/paystack'

const SHIPPING_THRESHOLD = 40000
const SHIPPING_COST = 2500

export const PICKUP_ADDRESS = {
  street: '7 Oluyoro St, off Awolowo Avenue',
  area: 'Old Bodija',
  city: 'Lagelu',
  postal: '000234',
  state: 'Oyo',
  country: 'Nigeria',
  hours: 'Mon–Sat · 9am – 6pm',
}

function CheckoutPage() {
  const { items, count, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [deliveryMethod, setDeliveryMethod] = useState('delivery')

  if (items.length === 0 && !submitting) return <Navigate to="/cart" replace />

  const isPickup = deliveryMethod === 'pickup'
  const shipping = isPickup ? 0 : subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    const fd = new FormData(e.currentTarget)
    const customerEmail = fd.get('email')
    const customerPhone = fd.get('phone')
    const customerName =
      `${fd.get('firstName') ?? ''} ${fd.get('lastName') ?? ''}`.trim()
    const orderId = generateOrderId()

    const shippingAddress = isPickup
      ? null
      : {
          line1: fd.get('address') ?? '',
          city: fd.get('city') ?? '',
          state: fd.get('state') ?? '',
          postal: fd.get('postal') ?? '',
          country: fd.get('country') ?? 'Nigeria',
        }

    const finishOrder = async (paymentReference, status) => {
      if (isSupabaseConfigured) {
        await createOrder({
          id: orderId,
          customerName,
          customerEmail,
          customerPhone,
          deliveryMethod,
          shippingAddress,
          paymentMethod: 'paystack',
          paymentReference: paymentReference ?? null,
          subtotal,
          shipping,
          total,
          status,
          items: items.map((it) => ({
            productId: it.id,
            name: it.name,
            image: it.image,
            price: it.price,
            quantity: it.quantity,
          })),
        })
      }
      clearCart()
      navigate(
        `/order/confirmation?id=${orderId}&method=${deliveryMethod}`,
        { replace: true },
      )
    }

    setSubmitting(true)

    if (!isPaystackConfigured) {
      // No Paystack key — fall back to a soft demo flow so checkout still works
      // in environments without the env var (e.g., a fresh fork).
      try {
        await new Promise((res) => setTimeout(res, 600))
        await finishOrder(null, 'pending')
      } catch (err) {
        setError(err.message || 'Failed to place order')
        setSubmitting(false)
      }
      return
    }

    try {
      const response = await openPaystack({
        email: customerEmail,
        amount: total,
        reference: orderId,
        metadata: {
          orderId,
          customerName,
          customerPhone,
          deliveryMethod,
          custom_fields: [
            {
              display_name: 'Order ID',
              variable_name: 'order_id',
              value: orderId,
            },
          ],
        },
      })
      await finishOrder(response.reference ?? orderId, 'paid')
    } catch (err) {
      if (err && err.cancelled) {
        setError('Payment cancelled. You can try again.')
      } else {
        setError(err.message || 'Payment failed. Please try again.')
      }
      setSubmitting(false)
    }
  }

  return (
    <section className="bg-white py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav className="flex items-center gap-1 text-sm text-slate-500">
          <Link to="/" className="transition hover:text-brand-blue">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/cart" className="transition hover:text-brand-blue">Cart</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-slate-900">Checkout</span>
        </nav>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <fieldset className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <legend className="px-2 text-sm font-semibold text-slate-900">Contact</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" type="email" name="email" required autoComplete="email" />
                <Field label="Phone" type="tel" name="phone" required autoComplete="tel" />
              </div>
            </fieldset>

            <fieldset className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <legend className="px-2 text-sm font-semibold text-slate-900">
                Delivery method
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                <DeliveryOption
                  icon={Truck}
                  title="Home delivery"
                  body={`Doorstep delivery · ₦${SHIPPING_COST.toLocaleString('en-NG')} (free over ₦${SHIPPING_THRESHOLD.toLocaleString('en-NG')})`}
                  selected={!isPickup}
                  onClick={() => setDeliveryMethod('delivery')}
                />
                <DeliveryOption
                  icon={Store}
                  title="Pick up at station"
                  body="Free · pick up from our Bodija store"
                  selected={isPickup}
                  onClick={() => setDeliveryMethod('pickup')}
                />
              </div>
            </fieldset>

            {!isPickup ? (
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
            ) : (
              <fieldset className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <legend className="px-2 text-sm font-semibold text-slate-900">
                  Pickup details
                </legend>
                <div className="rounded-xl border border-brand-blue/30 bg-brand-blue-soft/40 p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                    <div className="text-sm">
                      <div className="font-semibold text-slate-900">Speedtouch — Bodija</div>
                      <div className="mt-1 text-slate-700">
                        {PICKUP_ADDRESS.street}<br />
                        {PICKUP_ADDRESS.area}, {PICKUP_ADDRESS.city} {PICKUP_ADDRESS.postal}<br />
                        {PICKUP_ADDRESS.state}, {PICKUP_ADDRESS.country}
                      </div>
                      <div className="mt-2 text-xs text-slate-500">
                        Open {PICKUP_ADDRESS.hours}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-xs text-slate-500">
                  We'll text you when your order is ready. Bring a valid ID and your
                  order number to collect.
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="First name" name="firstName" required autoComplete="given-name" />
                  <Field label="Last name" name="lastName" required autoComplete="family-name" />
                </div>
              </fieldset>
            )}

            <fieldset className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-slate-900">
                <ShieldCheck className="h-4 w-4 text-brand-blue" />
                Payment
              </legend>
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <PaystackLogo />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-slate-900">
                      Pay securely with Paystack
                    </div>
                    <p className="mt-0.5 text-xs text-slate-600">
                      Card, bank transfer, or USSD. Card details stay with
                      Paystack — never on our servers.
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
                <Lock className="h-3 w-3" /> 256-bit SSL · PCI DSS compliant
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
                      <span className="line-clamp-2 text-xs font-medium text-slate-800">{it.name}</span>
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
                  <dt className="text-slate-600">{isPickup ? 'Pickup' : 'Shipping'}</dt>
                  <dd className="tabular-nums">
                    {shipping === 0 ? 'Free' : `₦${shipping.toLocaleString('en-NG')}`}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-2 text-base font-semibold">
                  <dt>Total</dt>
                  <dd className="tabular-nums">₦{total.toLocaleString('en-NG')}</dd>
                </div>
              </dl>
              {error && (
                <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="mt-5 w-full rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-60"
              >
                {submitting ? 'Processing…' : `Pay ₦${total.toLocaleString('en-NG')} with Paystack`}
              </button>
            </div>
          </aside>
        </form>
      </div>
    </section>
  )
}

function DeliveryOption({ icon: Icon, title, body, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${
        selected
          ? 'border-brand-blue bg-brand-blue-soft/40 ring-2 ring-brand-blue/30'
          : 'border-slate-200 bg-white hover:border-brand-blue/50'
      }`}
    >
      <div
        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          selected ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-600'
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="mt-0.5 text-xs text-slate-600">{body}</div>
      </div>
      <span
        className={`mt-1 h-4 w-4 shrink-0 rounded-full border ${
          selected ? 'border-brand-blue bg-brand-blue ring-2 ring-white' : 'border-slate-300'
        }`}
      />
    </button>
  )
}

function PaystackLogo() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-9 w-9 shrink-0 rounded-lg"
      aria-label="Paystack"
    >
      <rect width="32" height="32" rx="8" fill="#011B33" />
      <path d="M7 9h12v2.5H7V9zm0 4.5h18V16H7v-2.5zM7 18h12v2.5H7V18zm0 4.5h7V25H7v-2.5z" fill="#00C3F7" />
    </svg>
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
