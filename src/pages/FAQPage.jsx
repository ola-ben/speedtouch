import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const faqs = [
  {
    q: 'Do I need to be home during the clean?',
    a: "No. Most of our customers leave a key, or open the door and pop out. Just let us know which it'll be when you book. If you're going to be out, please let us in via WhatsApp when we arrive (we'll message).",
  },
  {
    q: 'What products do you use?',
    a: "Plant-based, low-fragrance, child- and pet-safe. Brands rotate based on what's available, but the standard is always the same: nothing that makes you cough or stings the eyes. If you've got allergies or strong preferences, tell us — we'll match.",
  },
  {
    q: 'Do I need to provide anything?',
    a: "Nothing. We bring our own products, cloths, mop, vacuum — everything. If you'd rather we use yours (some folks prefer their own vacuum on hardwood), just say.",
  },
  {
    q: 'Is the team insured?',
    a: 'Yes. We carry public-liability cover for accidental damage, and every cleaner is background-checked. The very rare time something has broken, we replaced it — straightforwardly.',
  },
  {
    q: 'What if I\'m not happy with the clean?',
    a: "Tell us within 24 hours and we come back and re-do it — free. No arguments, no forms. We get it right or we make it right.",
  },
  {
    q: 'How do you decide who\'s sent?',
    a: 'For one-off bookings, we send whoever\'s closest and free. For recurring bookings (weekly, bi-weekly), we keep the same cleaner where we possibly can — most customers see the same face for months.',
  },
  {
    q: 'How do I pay?',
    a: "At checkout you pay by bank transfer to our Moniepoint account, then tap to send your proof of payment on WhatsApp — we confirm your order instantly. Card payments are coming soon.",
  },
  {
    q: 'Do you clean outside Ibadan?',
    a: 'For one-off jobs in Lagos and Abuja, sometimes — message us with the location and date and we\'ll see if we can route a team. Inside Ibadan and the rest of Oyo State, we\'re always available.',
  },
  {
    q: 'Can I tip the cleaner?',
    a: 'You can, and they\'ll appreciate it — but we pay everyone above market rate so tipping is genuinely optional, not the thing keeping their lights on. Up to you.',
  },
]

function FAQPage() {
  useDocumentTitle(
    'FAQ',
    "Honest answers to the questions Speedtouch customers ask most often — cleaners, products, pricing, and more.",
  )

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <nav className="flex items-center gap-1 text-sm text-slate-500">
          <Link to="/" className="hover:text-brand-blue">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-slate-900">FAQ</span>
        </nav>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          Questions, answered.
        </h1>
        <p className="mt-5 text-base text-slate-700 md:text-lg">
          The things customers ask most often — straight answers, no fluff.
          Don't see your question?{' '}
          <Link to="/contact" className="font-medium text-brand-blue hover:underline">
            Just ask us
          </Link>
          .
        </p>

        <ul className="mt-10 space-y-3">
          {faqs.map((f) => (
            <li
              key={f.q}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
            >
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-slate-900 transition hover:bg-slate-50 sm:text-base">
                  <span>{f.q}</span>
                  <span
                    aria-hidden="true"
                    className="text-lg text-slate-400 transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="border-t border-slate-100 px-5 py-4 text-sm leading-relaxed text-slate-600">
                  {f.a}
                </div>
              </details>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center text-sm text-slate-700">
          Still stuck?{' '}
          <Link to="/contact" className="font-medium text-brand-blue hover:underline">
            Send us a message
          </Link>{' '}
          — a real person reads everything.
        </div>
      </div>
    </section>
  )
}

export default FAQPage
