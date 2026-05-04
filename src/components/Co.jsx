import { ShieldCheck, Leaf, Sparkles } from 'lucide-react'
import Reveal from './Reveal'

function Co() {
  const features = [
    {
      title: 'Trained & insured',
      body: 'Every Speedtouch cleaner is background-checked, trained in-house, and fully insured for your peace of mind.',
      Icon: ShieldCheck,
      iconColor: 'text-brand-pink-deep',
      tint: 'bg-brand-pink-soft',
    },
    {
      title: 'Eco-friendly products',
      body: 'Plant-based, non-toxic supplies that are safe for kids, pets, and sensitive surfaces — never harsh chemicals.',
      Icon: Leaf,
      iconColor: 'text-brand-blue',
      tint: 'bg-brand-blue-soft',
    },
    {
      title: '100% satisfaction',
      body: "If you're not thrilled with the result, we'll come back and re-clean — free, within 24 hours. No questions.",
      Icon: Sparkles,
      iconColor: 'text-brand-pink-deep',
      tint: 'bg-brand-pink-soft',
    },
  ]

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-pink-deep">
              Why Speedtouch
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Cleaning you can <em className="italic text-brand-blue">actually</em> trust
            </h2>
            <p className="mt-4 text-slate-600">
              We treat your home like our own. Vetted pros, honest pricing, and
              results that speak for themselves.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 100}>
              <div className="group h-full rounded-3xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-xl hover:shadow-brand-blue/5">
                <div
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${f.tint}`}
                >
                  <f.Icon className={`h-7 w-7 ${f.iconColor}`} strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {f.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
        <div id="book" className="mt-16 overflow-hidden rounded-3xl bg-linear-to-br from-brand-blue-soft via-white to-brand-pink-soft p-10 md:p-14">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                Get a free quote in 60 seconds
              </h3>
              <p className="mt-3 text-slate-600">
                Tell us about your space and we'll send you an instant price —
                with 20% off your first clean. No commitment, no calls.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="flex-1 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              />
              <button
                type="submit"
                className="rounded-full bg-brand-blue px-6 py-3 text-sm font-medium text-white shadow-md transition hover:bg-blue-700"
              >
                Get my quote
              </button>
            </form>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Co
