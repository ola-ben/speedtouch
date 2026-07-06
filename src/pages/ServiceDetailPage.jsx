import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight, Star, PenSquare, Quote, MessageSquareDashed, ShieldCheck, Clock } from 'lucide-react'
import { useServices } from '../hooks/useServices'
import { useApprovedReviews } from '../hooks/useReviews'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { WHATSAPP_NUMBER } from '../lib/whatsapp'
import ReviewForm from '../components/ReviewForm'

function NotFound() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-xl px-6 text-center">
        <h1 className="text-3xl font-semibold text-slate-900">Service not found</h1>
        <p className="mt-3 text-slate-600">
          The service you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/services"
          className="mt-6 inline-block rounded-full bg-brand-blue px-6 py-3 text-sm font-medium text-white"
        >
          Browse all services
        </Link>
      </div>
    </section>
  )
}

function ExpandableText({ text, limit = 150, className = '' }) {
  const [isExpanded, setIsExpanded] = useState(false)
  if (!text) return null
  if (text.length <= limit) return <p className={className}>{text}</p>

  return (
    <p className={className}>
      {isExpanded ? text : `${text.slice(0, limit)}...`}{' '}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-block font-semibold text-brand-blue hover:text-brand-blue-deep hover:underline focus:outline-none cursor-pointer"
      >
        {isExpanded ? 'See less' : 'See more'}
      </button>
    </p>
  )
}

const bookingLink = (service) => {
  const price = `₦${Number(service.price).toLocaleString('en-NG')}`
  const text = encodeURIComponent(
    `Hi Speedtouch — I'd like to book the *${service.name}* (${price}, negotiable). Could we discuss?`,
  )
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}

const AVATAR_POOL = [47, 12, 32, 8, 44, 23, 20, 15, 5, 33, 16, 25]

function avatarFor(name) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0
  const id = AVATAR_POOL[Math.abs(hash) % AVATAR_POOL.length]
  return `https://i.pravatar.cc/120?img=${id}`
}

function ServiceDetailPage() {
  const { id } = useParams()
  const { services, loading: servicesLoading } = useServices()
  const { reviews, loading: reviewsLoading, refresh: refreshReviews } = useApprovedReviews()
  const [formOpen, setFormOpen] = useState(false)

  const service = services.find((s) => s.id === id)

  useDocumentTitle(
    service ? `${service.name} Cleaning Service` : 'Service Details',
    service?.description || 'Professional home & office cleaning service by Speedtouch.',
  )

  if (servicesLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div
          aria-label="Loading"
          className="h-10 w-10 animate-spin rounded-full border-4 border-brand-blue/20 border-t-brand-blue"
        />
      </div>
    )
  }

  if (!service) return <NotFound />

  const serviceReviews = reviews.filter(
    (r) => r.service && r.service.trim().toLowerCase() === service.name.trim().toLowerCase()
  )
  const reviewCount = serviceReviews.length
  const avgRating =
    reviewCount > 0
      ? serviceReviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
      : 0

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-sm text-slate-500">
          <Link to="/" className="transition hover:text-brand-blue">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/services" className="transition hover:text-brand-blue">
            Services
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="line-clamp-1 font-medium text-slate-900">{service.name}</span>
        </nav>

        {/* Content Grid */}
        <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12">
          {/* Left Column: Image */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <div className="relative aspect-4/3">
              {service.image ? (
                <img
                  src={service.image}
                  alt={service.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-slate-100 text-slate-400">
                  No Image Available
                </div>
              )}
              {service.popular && (
                <span className="absolute right-4 top-4 rounded-full bg-brand-pink-deep px-3 py-1.5 text-xs font-semibold text-white shadow-md">
                  Most booked
                </span>
              )}
              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-brand-pink-deep shadow-sm backdrop-blur">
                {service.tag}
              </span>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl">
                {service.name}
              </h1>

              {/* Rating stats */}
              <div className="mt-3 flex items-center gap-2 text-sm">
                {reviewCount > 0 ? (
                  <>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i <= Math.round(avgRating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-slate-900">{avgRating.toFixed(1)}</span>
                    <a
                      href="#reviews-list"
                      className="text-brand-blue hover:underline font-medium"
                    >
                      ({reviewCount} customer {reviewCount === 1 ? 'review' : 'reviews'})
                    </a>
                  </>
                ) : (
                  <span className="text-slate-400 italic">No reviews yet</span>
                )}
              </div>

              {/* Description */}
              <p className="mt-6 text-sm leading-relaxed text-slate-600 md:text-base whitespace-pre-line">
                {service.description}
              </p>

              {/* Trust Indicators */}
              <div className="mt-6 space-y-2 border-t border-slate-100 pt-6 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand-green" />
                  <span>Fully insured & trained professional cleaners</span>
                </div>
                {service.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-brand-blue" />
                    <span>Estimated time: ~{service.duration}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Price & Booking Actions */}
            <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-500">Starting Price</span>
                  <div className="font-sans text-3xl font-extrabold text-slate-900">
                    ₦{service.price.toLocaleString('en-NG')}
                    {service.duration && (
                      <span className="ml-1 text-base font-normal text-slate-500">
                        / {service.duration}
                      </span>
                    )}
                  </div>
                  <span className="mt-1 inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                    Negotiable
                  </span>
                </div>

                <a
                  href={bookingLink(service)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition"
                >
                  Book on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div id="reviews-list" className="mt-16 border-t border-slate-100 pt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Customer Reviews
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                What clients are saying about our {service.name} service.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition"
            >
              <PenSquare className="h-4 w-4" />
              Write a review
            </button>
          </div>

          {reviewsLoading ? (
            <div className="flex justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-blue/20 border-t-brand-blue" />
            </div>
          ) : serviceReviews.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-200 px-6 py-12 text-center bg-slate-50/50">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue-soft text-brand-blue">
                <MessageSquareDashed className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                No reviews yet for this service
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-xs text-slate-500">
                Have we cleaned your space using this service? Be the first to share your experience with other clients!
              </p>
              <button
                type="button"
                onClick={() => setFormOpen(true)}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:border-brand-blue hover:text-brand-blue transition"
              >
                Write the first review
              </button>
            </div>
          ) : (
            <ul className="mt-8 grid gap-6 md:grid-cols-2">
              {serviceReviews.map((r) => (
                <li
                  key={r.id}
                  className="relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
                >
                  <Quote className="absolute right-5 top-5 h-6 w-6 text-brand-pink/40" />
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

                  <div className="mt-3 text-sm leading-relaxed text-slate-700">
                    <ExpandableText text={r.comment} limit={160} />
                  </div>

                  <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
                    <img
                      src={avatarFor(r.name)}
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">{r.name}</div>
                      {r.location && <div className="text-[10px] text-slate-400">{r.location}</div>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <ReviewForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false)
          refreshReviews()
        }}
        defaultService={service.name}
      />
    </section>
  )
}

export default ServiceDetailPage
