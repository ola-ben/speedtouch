import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, Mail, Truck, Store, MapPin } from 'lucide-react'
import { PICKUP_ADDRESS } from './CheckoutPage'

function OrderConfirmationPage() {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('id') ?? 'ST-PREVIEW'
  const isPickup = searchParams.get('method') === 'pickup'

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-9 w-9 text-emerald-500" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Thanks for your order!
        </h1>
        <p className="mt-3 text-slate-600">
          Your order{' '}
          <span className="font-semibold text-slate-900">#{orderId}</span> has been
          placed. We've sent a confirmation to your email.
        </p>

        <div className="mt-10 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-left sm:grid-cols-2">
          <div className="flex gap-3">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Order confirmation</h2>
              <p className="mt-1 text-xs text-slate-600">
                A receipt is on the way to your inbox.
              </p>
            </div>
          </div>
          {isPickup ? (
            <div className="flex gap-3">
              <Store className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Pickup</h2>
                <p className="mt-1 text-xs text-slate-600">
                  We'll text you when it's ready (usually within 24 hours).
                </p>
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <Truck className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Shipping</h2>
                <p className="mt-1 text-xs text-slate-600">
                  Estimated delivery in 2–4 business days.
                </p>
              </div>
            </div>
          )}
        </div>

        {isPickup && (
          <div className="mt-6 rounded-2xl border border-brand-blue/30 bg-brand-blue-soft/40 p-5 text-left">
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
                  Open {PICKUP_ADDRESS.hours}. Bring a valid ID and your order number.
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to="/products"
            className="rounded-full bg-brand-blue px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Continue shopping
          </Link>
          <Link
            to="/"
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-brand-blue hover:text-brand-blue"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  )
}

export default OrderConfirmationPage
