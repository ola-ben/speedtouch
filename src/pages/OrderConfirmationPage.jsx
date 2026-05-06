import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, Mail, Truck } from 'lucide-react'

function OrderConfirmationPage() {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('id') ?? 'ST-PREVIEW'

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
          <div className="flex gap-3">
            <Truck className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Shipping</h2>
              <p className="mt-1 text-xs text-slate-600">
                Estimated delivery in 2–4 business days.
              </p>
            </div>
          </div>
        </div>

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
