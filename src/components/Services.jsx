import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import { useServices } from '../hooks/useServices'

function Services() {
  const containerRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const { services, loading, error } = useServices()

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
            <p className="mt-4 text-slate-600">
              Transparent pricing. No hidden fees. Book any service in under a minute.
            </p>
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
              {services.map((s, i) => (
                <Reveal
                  key={s.id}
                  delay={i * 80}
                  mobileSkip
                  className="w-4/5 shrink-0 snap-center sm:w-auto sm:shrink"
                >
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-brand-blue/40 hover:shadow-xl hover:shadow-brand-blue/5">
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
                      <h3 className="text-xl font-semibold text-slate-900">
                        {s.name}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                        {s.description}
                      </p>

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
                        </div>
                        <a
                          href="#book"
                          className="rounded-full bg-brand-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                          Book
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <p className="mt-10 text-center text-sm text-slate-500">
              Need something custom?{' '}
              <a href="#contact" className="font-medium text-brand-blue hover:underline">
                Get a tailored quote →
              </a>
            </p>
          </>
        )}
      </div>
    </section>
  )
}

export default Services
