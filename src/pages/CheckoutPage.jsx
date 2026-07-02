import { useMemo, useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ChevronRight, Lock, MapPin, ShieldCheck, Store, Truck } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import { useCart } from '../context/CartContext'
import { createOrder, generateOrderId } from '../lib/orders'
import { isSupabaseConfigured } from '../lib/supabase'
import { buildOrderMessage, WHATSAPP_NUMBER } from '../lib/whatsapp'
import { humanizeError } from '../lib/errors'

export const PICKUP_ADDRESS = {
  street: '7 Oluyoro Street, off Awolowo Avenue',
  area: 'Old Bolaji',
  city: 'Ibadan',
  postal: '000234',
  state: 'Oyo',
  country: 'Nigeria',
  hours: 'Mon–Sat · 9am – 6pm',
}

// Bank details shown for the direct-transfer payment option.
const BANK = {
  bank: 'Moniepoint',
  account: '8212184496',
  name: 'Speedtouch Cleanings',
}

// Remember the customer's checkout details so they don't re-type on every order.
const SAVED_CHECKOUT_KEY = 'speedtouch_checkout_v1'

function loadSavedCheckout() {
  try {
    return JSON.parse(localStorage.getItem(SAVED_CHECKOUT_KEY)) || {}
  } catch {
    return {}
  }
}

function CheckoutPage() {
  const { items, count, subtotal, clearCart, showToast } = useCart()
  const navigate = useNavigate()
  const formRef = useRef(null)
  const [submitting, setSubmitting] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState('delivery')
  
  const [formData, setFormData] = useState(() => {
    const saved = loadSavedCheckout()
    return {
      firstName: saved.firstName || '',
      lastName: saved.lastName || '',
      email: saved.email || '',
      phone: saved.phone || '',
      address: saved.address || '',
      city: saved.city || '',
      state: saved.state || '',
      postal: saved.postal || '',
      country: saved.country || 'Nigeria',
    }
  })

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const updated = { ...prev, [name]: value }
      try {
        localStorage.setItem(SAVED_CHECKOUT_KEY, JSON.stringify(updated))
      } catch {
        // ignore
      }
      return updated
    })
  }

  if (items.length === 0 && !submitting) return <Navigate to="/cart" replace />

  const isPickup = deliveryMethod === 'pickup'
  // Delivery fee isn't charged at checkout — it depends on the area and is
  // communicated after payment is confirmed. So the total is just the subtotal.
  const shipping = 0
  const total = subtotal + shipping

  // Note: NOT async. We open WhatsApp synchronously inside the tap so iOS
  // doesn't block it (Safari only allows window.open during a direct user
  // gesture — an `await` beforehand loses that permission). The Supabase save
  // runs in the background and never blocks the order.
  const placeOrder = (paymentMethod) => {
    // Make sure the form's required fields are filled before placing an order.
    if (formRef.current && !formRef.current.reportValidity()) return

    setSubmitting(true)

    const fd = new FormData(formRef.current)
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

    // Remember these details so the next order is pre-filled.
    try {
      localStorage.setItem(
        SAVED_CHECKOUT_KEY,
        JSON.stringify({
          firstName: fd.get('firstName') ?? '',
          lastName: fd.get('lastName') ?? '',
          email: customerEmail ?? '',
          phone: customerPhone ?? '',
          address: fd.get('address') ?? '',
          city: fd.get('city') ?? '',
          state: fd.get('state') ?? '',
          postal: fd.get('postal') ?? '',
          country: fd.get('country') ?? 'Nigeria',
        }),
      )
    } catch {
      // localStorage unavailable (private mode) — not critical.
    }

    // Build the WhatsApp message synchronously (before any async work).
    let text = buildOrderMessage({
      orderId,
      items,
      subtotal,
      shipping,
      total,
      deliveryMethod,
      customer: { name: customerName, email: customerEmail, phone: customerPhone },
      shippingAddress,
    })
    if (paymentMethod === 'bank_transfer') {
      text += `\n\n*Payment: Bank transfer*\n${BANK.bank} — ${BANK.account} (${BANK.name})\nI'll send proof of payment here.`
    }
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`

    // Best-effort: record the order for the admin dashboard. Fire-and-forget so
    // it never blocks the order — the full order also reaches us via WhatsApp.
    if (isSupabaseConfigured) {
      createOrder({
        id: orderId,
        customerName,
        customerEmail,
        customerPhone,
        deliveryMethod,
        shippingAddress,
        paymentMethod,
        paymentReference: null,
        subtotal,
        shipping,
        total,
        status: 'pending',
        items: items.map((it) => ({
          productId: it.id,
          name: it.name,
          image: it.image,
          price: it.price,
          quantity: it.quantity,
        })),
      }).catch((err) => {
        console.error('Order save failed (order still sent via WhatsApp):', err)
        showToast(humanizeError(err), 'error')
      })
    }

    // Open WhatsApp inside the gesture so iOS opens it reliably.
    const waWindow = window.open(waUrl, '_blank')
    if (!waWindow) {
      // Popups fully blocked — open in the same tab as a fallback.
      window.location.href = waUrl
      return
    }

    // Clear cart and send the customer to the confirmation page.
    clearCart()
    navigate(
      `/order/confirmation?id=${orderId}&method=${deliveryMethod}`,
      { replace: true },
    )
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

        <form
          ref={formRef}
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 grid gap-8 lg:grid-cols-3"
        >
          <div className="space-y-8 lg:col-span-2">
            <fieldset className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <legend className="px-2 text-sm font-semibold text-slate-900">Contact</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" type="email" name="email" required autoComplete="email" value={formData.email} onChange={handleFieldChange} />
                <Field label="Phone" type="tel" name="phone" required autoComplete="tel" value={formData.phone} onChange={handleFieldChange} />
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
                  body="Doorstep delivery · fee depends on your area"
                  selected={!isPickup}
                  onClick={() => setDeliveryMethod('delivery')}
                />
                <DeliveryOption
                  icon={Store}
                  title="Pick up at station"
                  body="Free · pick up from our Old Bolaji store"
                  selected={isPickup}
                  onClick={() => setDeliveryMethod('pickup')}
                />
              </div>
              {!isPickup && (
                <p className="mt-3 rounded-lg bg-brand-blue-soft px-3 py-2 text-xs text-slate-600">
                  Your delivery fee depends on your area and will be communicated
                  after payment is confirmed.
                </p>
              )}
            </fieldset>

            {!isPickup ? (
              <fieldset className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <legend className="px-2 text-sm font-semibold text-slate-900">
                  Shipping address
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="First name" name="firstName" required autoComplete="given-name" value={formData.firstName} onChange={handleFieldChange} />
                  <Field label="Last name" name="lastName" required autoComplete="family-name" value={formData.lastName} onChange={handleFieldChange} />
                  <div className="sm:col-span-2">
                    <Field label="Street address" name="address" required autoComplete="street-address" value={formData.address} onChange={handleFieldChange} />
                  </div>
                  <Field label="City" name="city" required autoComplete="address-level2" value={formData.city} onChange={handleFieldChange} />
                  <Field label="State" name="state" required autoComplete="address-level1" value={formData.state} onChange={handleFieldChange} />
                  <Field label="Postal code" name="postal" required autoComplete="postal-code" value={formData.postal} onChange={handleFieldChange} />
                  <Field label="Country" name="country" required value={formData.country} onChange={handleFieldChange} />
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
                      <div className="font-semibold text-slate-900">Speedtouch — Old Bolaji</div>
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
                  <Field label="First name" name="firstName" required autoComplete="given-name" value={formData.firstName} onChange={handleFieldChange} />
                  <Field label="Last name" name="lastName" required autoComplete="family-name" value={formData.lastName} onChange={handleFieldChange} />
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
                  <Store className="h-9 w-9 shrink-0 rounded-lg bg-brand-blue-soft p-2 text-brand-blue" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-slate-900">
                      Pay by bank transfer
                    </div>
                    <p className="mt-0.5 text-xs text-slate-600">
                      Transfer to our Moniepoint account, then send your proof on
                      WhatsApp. Your order is confirmed once we receive payment.
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
                <Lock className="h-3 w-3" /> Secure checkout · HTTPS encrypted
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
                      <img src={it.image} alt={it.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
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
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-600">{isPickup ? 'Pickup' : 'Delivery'}</dt>
                  <dd className="text-right">
                    {isPickup ? (
                      'Free'
                    ) : (
                      <span className="text-xs text-slate-500">Fee confirmed after payment</span>
                    )}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-2 text-base font-semibold">
                  <dt>Total</dt>
                  <dd className="tabular-nums">₦{total.toLocaleString('en-NG')}</dd>
                </div>
                {!isPickup && (
                  <p className="text-xs text-slate-400">
                    Delivery fee (based on your area) is added after payment.
                  </p>
                )}
              </dl>
              <p className="mb-2 mt-5 text-sm font-semibold text-slate-900">
                Pay by bank transfer
              </p>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <dl className="space-y-1 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Bank</dt>
                    <dd className="font-medium text-slate-900">{BANK.bank}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Account number</dt>
                    <dd className="font-bold tabular-nums tracking-wide text-slate-900">
                      {BANK.account}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Account name</dt>
                    <dd className="font-medium text-slate-900">{BANK.name}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-xs text-slate-500">
                  Transfer <span className="font-semibold text-slate-700">₦{total.toLocaleString('en-NG')}</span>{' '}
                  to the account above, then tap the button to confirm your order and
                  send your proof of payment on WhatsApp.
                </p>
              </div>
              <button
                type="button"
                onClick={() => placeOrder('bank_transfer')}
                disabled={submitting}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand-blue px-5 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-brand-blue-deep disabled:opacity-60"
              >
                <FaWhatsapp className="h-5 w-5" />
                {submitting ? 'Confirming…' : "I've sent the money — confirm order"}
              </button>
              <p className="mt-2 text-center text-xs text-slate-500">
                Opens WhatsApp with your order — tap{' '}
                <span className="font-semibold text-slate-700">Send</span> and attach your
                payment proof.
              </p>
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
