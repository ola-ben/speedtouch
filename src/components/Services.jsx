import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Star, ChevronDown, ChevronUp, PenSquare } from 'lucide-react'
import Reveal from './Reveal'
import { useServices } from '../hooks/useServices'
import { useApprovedReviews } from '../hooks/useReviews'
import { WHATSAPP_NUMBER } from '../lib/whatsapp'
import ReviewForm from './ReviewForm'

function ExpandableText({ text, limit = 120, className = '' }) {
  const [isExpanded, setIsExpanded] = useState(false)
  if (!text) return null
  if (text.length <= limit) return <p className={className}>{text}</p>

  return (
    <p className={className}>
      {isExpanded ? text : `${text.slice(0, limit)}...`}{' '}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setIsExpanded(!isExpanded)
        }}
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


function Services() {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const { services, loading, error } = useServices()
  const { reviews, refresh: refreshReviews } = useApprovedReviews()
  const [expandedReviews, setExpandedReviews] = useState({})
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [selectedServiceForReview, setSelectedServiceForReview] = useState('')

  const handleOpenReviewModal = (serviceName) => {
    setSelectedServiceForReview(serviceName)
    setReviewModalOpen(true)
  }

  const toggleReviews = (serviceId) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }))
  }

  const handleScroll = () => {
    const c = containerRef.current
    if (!c || c.children.length === 0) return
    const center = c.scrollLeft + c.clientWidth / 2
    let closest = 0
    let minDist = Infinity
    for (let i = 0; i < c.children.length; i++) {
      const child = c.children[i]
      const childCenter = child.offsetLeft + child.clientWidth / 2
      const dist = Math.abs(childCenter - center)
      if (dist < minDist) {
        minDist = dist
        closest = i
      }
    }
    if (closest !== activeIdx) setActiveIdx(closest)
  }

  return (
    <section id="services" className="bg-slate-50/60 py-12 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-pink-deep">
              Our services
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Pick the clean that fits your space
            </h2>
          </div>
        </Reveal>

        {error && (
          <div className="mx-auto mt-6 max-w-2xl rounded-lg bg-red-50 px-4 py-3 text-center text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-8 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="aspect-4/3 animate-pulse bg-slate-100" />
                <div className="space-y-2 p-6">
                  <div className="h-5 animate-pulse rounded bg-slate-100" />
                  <div className="h-3 animate-pulse rounded bg-slate-100" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />
                  <div className="mt-3 h-7 w-1/2 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        ) : services.length === 0 ? (
          <p className="mt-12 text-center text-sm text-slate-500">
            No services published yet.{' '}
            <Link to="/admin/services/new" className="font-medium text-brand-blue hover:underline">
              Add the first one →
            </Link>
          </p>
        ) : (
          <>
            <div className="mt-8 flex items-center justify-between sm:hidden">
              <span className="text-xs uppercase tracking-wider text-slate-500">
                ← Swipe to browse
              </span>
              <span className="text-xs font-semibold tabular-nums text-slate-700">
                {Math.min(activeIdx + 1, services.length)} / {services.length}
              </span>
            </div>

            <div
              id="pricing"
              ref={containerRef}
              onScroll={handleScroll}
              className="no-scrollbar mt-3 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 sm:mx-0 sm:mt-14 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
            >
              {services.map((s, i) => {
                const serviceReviews = reviews.filter(
                  (r) =>
                    r.service &&
                    r.service.trim().toLowerCase() === s.name.trim().toLowerCase(),
                )
                const reviewCount = serviceReviews.length
                const avgRating =
                  reviewCount > 0
                    ? serviceReviews.reduce((sum, r) => sum + r.rating, 0) /
                      reviewCount
                    : 0
                const isExpanded = !!expandedReviews[s.id]

                return (
                  <Reveal
                    key={s.id}
                    delay={i * 80}
                    mobileSkip
                    className="w-4/5 shrink-0 snap-center sm:w-auto sm:shrink"
                  >
                    <article
                      onClick={() => navigate(`/services/${s.id}`)}
                      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition hover:-translate-y-1"
                    >
                      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                        {s.image && (
                          <img
                            src={s.image}
                            alt={s.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        )}
                        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-brand-pink-deep backdrop-blur">
                          {s.tag}
                        </span>
                        {s.popular && (
                          <span className="absolute right-3 top-3 rounded-full bg-brand-pink-deep px-3 py-1 text-xs font-semibold text-white shadow-sm">
                            Most booked
                          </span>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="text-xl font-semibold text-slate-900 hover:text-brand-blue transition">
                          <Link to={`/services/${s.id}`}>
                            {s.name}
                          </Link>
                        </h3>
                        <div className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                          <ExpandableText text={s.description} limit={140} />
                        </div>

                        {/* Reviews summary bar */}
                        <div className="mt-4 border-t border-slate-100 pt-3">
                          <div className="flex items-center justify-between text-xs">
                            {reviewCount > 0 ? (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleReviews(s.id)
                                }}
                                className="flex items-center gap-1.5 font-medium text-slate-700 hover:text-brand-blue transition focus:outline-none cursor-pointer"
                              >
                                <span className="flex items-center gap-0.5 text-amber-500">
                                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 animate-pulse" />
                                  <span className="font-bold text-slate-900">
                                    {avgRating.toFixed(1)}
                                  </span>
                                </span>
                                <span className="text-slate-500">
                                  ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
                                </span>
                                {isExpanded ? (
                                  <ChevronUp className="h-3 w-3 text-slate-400" />
                                ) : (
                                  <ChevronDown className="h-3 w-3 text-slate-400" />
                                )}
                              </button>
                            ) : (
                              <span className="text-slate-400 italic">No reviews yet</span>
                            )}

                            <button
                              type="button"
                              onClick={(e) => {
                                      e.stopPropagation()
                                      handleOpenReviewModal(s.name)
                              }}
                              className="inline-flex items-center gap-1 font-semibold text-brand-blue hover:text-brand-blue-deep transition cursor-pointer"
                            >
                              <PenSquare className="h-3 w-3" />
                              Write review
                            </button>
                          </div>

                          {/* Reviews Dropdown/Drawer inside card */}
                          {isExpanded && reviewCount > 0 && (
                            <div className="mt-3 max-h-40 overflow-y-auto rounded-xl border border-slate-100 bg-slate-50 p-3 scrollbar-thin">
                              <ul className="space-y-3">
                                {serviceReviews.map((r) => (
                                  <li key={r.id} className="text-xs text-left">
                                    <div className="flex items-center justify-between">
                                      <span className="font-semibold text-slate-800">
                                        {r.name}
                                        {r.location && (
                                          <span className="font-normal text-slate-400">
                                            {' · '}
                                            {r.location}
                                          </span>
                                        )}
                                      </span>
                                      <div className="flex items-center gap-0.5">
                                        {[1, 2, 3, 4, 5].map((starNum) => (
                                          <Star
                                            key={starNum}
                                            className={`h-2.5 w-2.5 ${
                                              starNum <= r.rating
                                                ? 'fill-amber-400 text-amber-400'
                                                : 'text-slate-200'
                                            }`}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                    <div className="mt-1 text-slate-600 leading-normal">
                                      <ExpandableText text={r.comment} limit={85} />
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="mt-2.5">
                            <Link
                              to={`/services/${s.id}`}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-brand-blue transition cursor-pointer"
                            >
                              Click here to view reviews and details →
                            </Link>
                          </div>
                        </div>

                        <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
                          <div>
                            <div className="text-xs text-slate-500">From</div>
                            <div className="font-sans text-2xl font-bold text-slate-900">
                              ₦{s.price.toLocaleString('en-NG')}
                              {s.duration && (
                                <span className="ml-1 text-sm font-medium text-slate-500">
                                  / {s.duration}
                                </span>
                              )}
                            </div>
                            <span className="mt-1 inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                              Negotiable
                            </span>
                          </div>
                          <span
                            className="rounded-full bg-brand-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                          >
                            Book
                          </span>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                )
              })}
            </div>

            <p className="mt-10 text-center text-sm text-slate-500">
              Need something custom?{' '}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Hi Speedtouch — I'd like a tailored cleaning quote. ",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-blue hover:underline"
              >
                Get a tailored quote on WhatsApp →
              </a>
            </p>
          </>
        )}
      </div>

      <ReviewForm
        open={reviewModalOpen}
        onClose={() => {
          setReviewModalOpen(false)
          refreshReviews()
        }}
        defaultService={selectedServiceForReview}
      />
    </section>
  )
}

export default Services

