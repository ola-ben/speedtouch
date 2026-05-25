import { Link } from 'react-router-dom'
import { ChevronRight, Check, X } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const includes = [
  'A trained, vetted cleaner (or two, for bigger jobs)',
  'All cleaning supplies and tools',
  'Eco-friendly products, safe for kids and pets',
  'Free re-clean if you\'re not happy within 24 hours',
]

const excludes = [
  'Exterior windows above the ground floor',
  'Industrial chemicals (bleach is fine on request)',
  'Moving furniture heavier than a sofa',
  'Pest control or extermination',
]

function PricingPage() {
  useDocumentTitle(
    'Pricing',
    'Transparent cleaning service prices in Naira — no hidden fees, no surprise add-ons.',
  )

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <nav className="flex items-center gap-1 text-sm text-slate-500">
          <Link to="/" className="hover:text-brand-blue">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-slate-900">Pricing</span>
        </nav>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          One quote. No surprises.
        </h1>
        <p className="mt-5 text-base text-slate-700 md:text-lg">
          You see the price before you book. It covers the cleaner, the
          products, and the satisfaction guarantee. If the job is unusually
          large (a five-bedroom after a party, say) we'll quote first — never
          after.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            See all service prices
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            The full list is on our home page — starting prices, durations,
            and what each service covers. Customers in Ibadan and around Oyo
            State pay these flat rates.
          </p>
          <Link
            to="/#services"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            View services & pricing →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-emerald-50/50 p-5">
            <h3 className="text-base font-semibold text-emerald-900">
              What's included
            </h3>
            <ul className="mt-3 space-y-2">
              {includes.map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-slate-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-rose-50/50 p-5">
            <h3 className="text-base font-semibold text-rose-900">
              What's not included
            </h3>
            <ul className="mt-3 space-y-2">
              {excludes.map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-slate-700">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 space-y-3 text-sm text-slate-700">
          <p>
            <strong>Travel:</strong> we cover Ibadan and most of Oyo within
            10km of Bodija free of charge. Further afield, we'll add a small
            transport fee — we'll always tell you before booking.
          </p>
          <p>
            <strong>Cancellation:</strong> free up to 24 hours before. Inside
            that window we charge 30% to cover the team's reserved time. See{' '}
            <Link to="/cancellation" className="font-medium text-brand-blue hover:underline">
              the cancellation page
            </Link>{' '}
            for the full policy.
          </p>
          <p>
            <strong>Recurring bookings:</strong> weekly or bi-weekly customers
            get 10% off after their fourth visit. Ask us about it.
          </p>
        </div>

        <div className="mt-12 rounded-2xl bg-slate-50 p-6 text-center text-sm text-slate-700">
          Got an unusual job?{' '}
          <Link to="/contact" className="font-medium text-brand-blue hover:underline">
            Send us a message
          </Link>{' '}
          and we'll give you a quote inside the day.
        </div>
      </div>
    </section>
  )
}

export default PricingPage
