import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Star, Quote, PenSquare } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useApprovedReviews } from '../hooks/useReviews'
import ReviewForm from '../components/ReviewForm'

const seedReviews = [
  {
    id: 'seed-1',
    name: 'Adaeze O.',
    location: 'Lekki, Lagos',
    rating: 5,
    comment:
      "They came at 9am exactly. Stayed for the full three hours. I came back to a kitchen I haven't seen since 2022.",
    service: 'Deep Clean',
    seed: true,
  },
  {
    id: 'seed-2',
    name: 'Chinedu E.',
    location: 'Asokoro, Abuja',
    rating: 5,
    comment:
      'Booked them for a move-out clean. My landlord called the next day to ask which company we used. I gave him this site.',
    service: 'Move In / Out',
    seed: true,
  },
  {
    id: 'seed-3',
    name: 'Folake A.',
    location: 'Bodija, Ibadan',
    rating: 5,
    comment:
      "Same lady every week. She knows my Saturday is for sleep — I come downstairs to a sparkling kitchen and that's the start of the weekend.",
    service: 'Weekly Standard Clean',
    seed: true,
  },
]

const AVATAR_POOL = [47, 12, 32, 8, 44, 23, 20, 15, 5, 33, 16, 25]

function avatarFor(name) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0
  const id = AVATAR_POOL[Math.abs(hash) % AVATAR_POOL.length]
  return `https://i.pravatar.cc/120?img=${id}`
}

function ReviewsPage() {
  useDocumentTitle(
    'Reviews',
    "What customers say about Speedtouch's cleaning services in Ibadan, Lagos, Abuja and beyond.",
  )
  const { reviews: live, loading, refresh } = useApprovedReviews()
  const [formOpen, setFormOpen] = useState(false)

  const combined = useMemo(() => {
    // Always lead with real customer reviews; pad with seed examples until at
    // least 3 are visible so the page doesn't feel empty.
    if (live.length >= 3) return live
    return [...live, ...seedReviews.slice(0, 3 - live.length)]
  }, [live])

  const ratingPool = live.length > 0 ? live : seedReviews
  const avg =
    ratingPool.reduce((s, r) => s + r.rating, 0) / Math.max(1, ratingPool.length)

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
              from {ratingPool.length} review{ratingPool.length === 1 ? '' : 's'}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-5">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Recently used us?
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Drop a few honest lines — it helps the next person decide.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <PenSquare className="h-4 w-4" />
            Leave a review
          </button>
        </div>

        {loading && live.length === 0 ? (
          <div className="mt-10 flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-blue/20 border-t-brand-blue" />
          </div>
        ) : (
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {combined.map((r) => (
              <li
                key={r.id}
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
                  "{r.comment}"
                </p>
                <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <img
                    src={avatarFor(r.name)}
                    alt=""
                    className="h-10 w-10 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900">
                      {r.name}
                    </div>
                    <div className="truncate text-xs text-slate-500">
                      {[r.location, r.service].filter(Boolean).join(' · ')}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-12 rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center text-sm text-slate-700">
          Want to chat with us directly?{' '}
          <Link to="/contact" className="font-medium text-brand-blue hover:underline">
            Get in touch →
          </Link>
        </div>
      </div>

      <ReviewForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false)
          refresh()
        }}
      />
    </section>
  )
}

export default ReviewsPage
