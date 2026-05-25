import { Link } from 'react-router-dom'
import { ChevronRight, Star, Quote } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const reviews = [
  {
    name: 'Adaeze O.',
    where: 'Lekki, Lagos',
    rating: 5,
    quote:
      "They came at 9am exactly. Stayed for the full three hours. I came back to a kitchen I haven't seen since 2022.",
    service: 'Deep Clean',
    avatar: 'https://i.pravatar.cc/120?img=47',
  },
  {
    name: 'Chinedu E.',
    where: 'Asokoro, Abuja',
    rating: 5,
    quote:
      "Booked them for a move-out clean. My landlord called the next day to ask which company we used. I gave him this site.",
    service: 'Move In / Out',
    avatar: 'https://i.pravatar.cc/120?img=12',
  },
  {
    name: 'Folake A.',
    where: 'Bodija, Ibadan',
    rating: 5,
    quote:
      'Same lady every week. She knows my Saturday is for sleep — I come downstairs to a sparkling kitchen and that\'s the start of the weekend.',
    service: 'Weekly Standard Clean',
    avatar: 'https://i.pravatar.cc/120?img=32',
  },
  {
    name: 'Tunde B.',
    where: 'GRA, Port Harcourt',
    rating: 4,
    quote:
      "Solid job. They missed a spot under the bed the first time and came back to fix it the next day — at no extra cost. That's how you keep a customer.",
    service: 'Standard Clean',
    avatar: 'https://i.pravatar.cc/120?img=8',
  },
  {
    name: 'Ngozi I.',
    where: 'Ikoyi, Lagos',
    rating: 5,
    quote:
      "I have two cats. They didn't flinch. Used the eco products without me asking — and the place smelled like nothing, which is exactly what I wanted.",
    service: 'Deep Clean',
    avatar: 'https://i.pravatar.cc/120?img=44',
  },
  {
    name: 'Bisi O.',
    where: 'Ikeja, Lagos',
    rating: 5,
    quote:
      "Our office (about 18 desks) gets done after hours twice a week. Smooth and quiet — staff barely notice they were here, except every Monday everything works.",
    service: 'Office Clean',
    avatar: 'https://i.pravatar.cc/120?img=23',
  },
]

function ReviewsPage() {
  useDocumentTitle(
    'Reviews',
    "What customers say about Speedtouch's cleaning services in Ibadan, Lagos, Abuja and beyond.",
  )

  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <nav className="flex items-center gap-1 text-sm text-slate-500">
          <Link to="/" className="hover:text-brand-blue">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-slate-900">Reviews</span>
        </nav>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              In our customers' own words.
            </h1>
            <p className="mt-3 max-w-2xl text-slate-700">
              We get most of our bookings from word of mouth — these are some
              of the people doing the talking. We didn't filter for shine; the
              good and the constructively honest are both here.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center">
            <div className="flex items-center justify-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i <= Math.round(avg)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
            <div className="mt-1 text-2xl font-bold text-slate-900 tabular-nums">
              {avg.toFixed(1)}
            </div>
            <div className="text-xs text-slate-500">
              from {reviews.length} reviews
            </div>
          </div>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {reviews.map((r, i) => (
            <li
              key={i}
              className="relative rounded-2xl border border-slate-100 bg-white p-6"
            >
              <Quote className="absolute right-5 top-5 h-6 w-6 text-brand-pink/60" />
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`h-4 w-4 ${
                      s <= r.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                "{r.quote}"
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
                <img
                  src={r.avatar}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-slate-900">
                    {r.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {r.where} · {r.service}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center text-sm text-slate-700">
          Just booked us?{' '}
          <Link to="/contact" className="font-medium text-brand-blue hover:underline">
            Tell us how it went →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ReviewsPage
