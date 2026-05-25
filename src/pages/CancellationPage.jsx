import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function CancellationPage() {
  useDocumentTitle(
    'Cancellation',
    'How Speedtouch handles cancellations and rescheduling. Life happens — we keep it simple.',
  )

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <nav className="flex items-center gap-1 text-sm text-slate-500">
          <Link to="/" className="hover:text-brand-blue">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-slate-900">Cancellation</span>
        </nav>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          Life happens.
        </h1>
        <p className="mt-5 text-base text-slate-700 md:text-lg">
          Sometimes a meeting runs over, a child gets sick, or the day just
          gets away from you. Here's how cancellations work — and we keep it
          short on purpose, because lawyer-speak doesn't help anyone.
        </p>

        <div className="mt-10 space-y-6">
          <Rule
            tag="Free"
            tagTone="emerald"
            title="More than 24 hours before"
            body="Cancel or reschedule any time up to 24 hours before your booking and you owe us nothing. WhatsApp us, send an email — whatever's easiest."
          />
          <Rule
            tag="30%"
            tagTone="amber"
            title="Inside 24 hours"
            body="Once we're inside the day, our team has already arranged their schedule around your booking. We charge 30% of the service price to cover their reserved time. We'd much rather reschedule than cancel — just ask."
          />
          <Rule
            tag="Full"
            tagTone="rose"
            title="No-show"
            body="If the cleaner arrives and there's no one to let them in (and we couldn't reach you), the full price applies. We give a 15-minute grace and three call/WhatsApp attempts before this kicks in."
          />
          <Rule
            tag="Free"
            tagTone="emerald"
            title="If we're late or no-show"
            body="The other way works too. If we're more than 30 minutes late and didn't tell you, the booking is on us. That's a promise — message us and we'll sort it."
          />
        </div>

        <div className="mt-12 rounded-2xl border border-slate-100 bg-slate-50 p-6 text-sm text-slate-700">
          <p>
            <strong>Recurring bookings:</strong> pause or skip a week any time.
            No charge, no questions, no losing your slot for next time.
          </p>
          <p className="mt-3">
            <strong>Refunds:</strong> if something went wrong during a clean,
            we'd rather come back and fix it. If that's not what you want, a
            partial or full refund is processed within 5 business days.
          </p>
        </div>

        <div className="mt-12 text-center text-sm text-slate-700">
          Need to cancel or reschedule something now?{' '}
          <Link to="/contact" className="font-medium text-brand-blue hover:underline">
            Reach us here →
          </Link>
        </div>
      </div>
    </section>
  )
}

function Rule({ tag, tagTone, title, body }) {
  const tones = {
    emerald: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700',
    rose: 'bg-rose-100 text-rose-700',
  }
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-5">
      <span
        className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xs font-bold uppercase ${tones[tagTone]}`}
      >
        {tag}
      </span>
      <div className="min-w-0">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{body}</p>
      </div>
    </div>
  )
}

export default CancellationPage
