import { Link } from 'react-router-dom'
import { ChevronRight, Heart, Leaf, ShieldCheck, Sparkles } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function AboutPage() {
  useDocumentTitle(
    'About us',
    "How Speedtouch started — a small Ibadan team that wanted cleaning done honestly and on time.",
  )

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <nav className="flex items-center gap-1 text-sm text-slate-500">
          <Link to="/" className="hover:text-brand-blue">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-slate-900">About us</span>
        </nav>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          We started Speedtouch because we were tired of cleaners who didn't show up.
        </h1>
        <p className="mt-5 text-base text-slate-700 md:text-lg">
          That's the honest version. The polished one says we're "a premium
          cleaning company in Ibadan committed to excellence" — and that's also
          true. But the real story is simpler: in 2024, our founder spent six
          weekends in a row waiting on cleaners who either arrived three hours
          late, did a half-job, or didn't come at all. We figured we couldn't be
          the only ones.
        </p>
        <p className="mt-4 text-slate-700">
          So we built Speedtouch — a small, trained team that <em>shows up</em>,
          works hard, and treats your home like it's their own. Today we serve
          homes and offices across Ibadan, and we'd like to keep this feeling
          for as long as we can: small, careful, and answerable to every
          customer by name.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <Value
            icon={Heart}
            title="People over polish"
            body="We pay our cleaners well, train them properly, and treat them with respect. Good service starts there — not in marketing copy."
          />
          <Value
            icon={ShieldCheck}
            title="On time, every time"
            body="If we say 9am, we mean 9am. And if traffic on Iwo Road catches us, you'll get a call before we're late — not after."
          />
          <Value
            icon={Leaf}
            title="Kind to your home"
            body="Plant-based products, gloves, microfiber. No harsh smells, no headaches, nothing that'd worry a toddler or a pet."
          />
          <Value
            icon={Sparkles}
            title="Honest pricing"
            body="One quote, no surprises. If the job ends up smaller than expected, we'll tell you. We'd rather earn a second booking than a one-time win."
          />
        </div>

        <div className="mt-12 rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center">
          <p className="text-sm text-slate-700">
            We're based at <strong>7 Oluyoro St, Old Bodija, Ibadan</strong>.
            Stop by, or just send us a message — we read everything.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Say hello
            </Link>
            <Link
              to="/#services"
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-brand-blue hover:text-brand-blue"
            >
              See what we offer
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Value({ icon: Icon, title, body }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue-soft text-brand-blue">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">{body}</p>
    </div>
  )
}

export default AboutPage
