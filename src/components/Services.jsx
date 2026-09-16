'use client'

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Building2,
  Trees,
  Users,
  Hammer,
  Waves,
  Armchair,
  Sparkles,
  Truck,
  ChevronDown,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'
import { useServices } from '../hooks/useServices'
import { WHATSAPP_NUMBER } from '../lib/whatsapp'
import ImageWithLoader from './ImageWithLoader'

function getServiceIcon(name = '', tag = '') {
  const n = (name + ' ' + tag).toLowerCase()
  if (n.includes('janitor') || n.includes('office')) return Building2
  if (n.includes('garden') || n.includes('landscap') || n.includes('lawn') || n.includes('tree')) return Trees
  if (n.includes('housekeep') || n.includes('guest') || n.includes('staff') || n.includes('standard')) return Users
  if (n.includes('post-construction') || n.includes('renovat') || n.includes('construct') || n.includes('build')) return Hammer
  if (n.includes('façade') || n.includes('facade') || n.includes('window') || n.includes('exterior')) return Waves
  if (n.includes('carpet') || n.includes('upholster') || n.includes('sofa') || n.includes('couch')) return Armchair
  if (n.includes('move')) return Truck
  if (n.includes('deep')) return Sparkles
  return Sparkles
}

function getServiceImage(service) {
  if (service?.image && service.image.startsWith('/services/')) {
    return service.image
  }
  const n = (service?.name || '').toLowerCase()
  if (n.includes('facade') || n.includes('façade') || n.includes('window')) {
    return '/services/facade-cleaning.jpg'
  }
  if (n.includes('carpet') || n.includes('upholster') || n.includes('sofa') || n.includes('rug')) {
    return '/services/carpet-cleaning.jpg'
  }
  if (n.includes('post-construction') || n.includes('renovat') || n.includes('construction')) {
    return '/services/post-construction.jpg'
  }
  if (n.includes('janitor') || n.includes('office')) {
    return '/services/janitorial-office.jpg'
  }
  if (n.includes('garden') || n.includes('landscap') || n.includes('lawn')) {
    return '/services/gardening-landscaping.jpg'
  }
  if (n.includes('housekeep') || n.includes('guest') || n.includes('staff') || n.includes('standard')) {
    return '/services/housekeeping.jpg'
  }
  if (n.includes('deep')) {
    return '/services/carpet-cleaning.jpg'
  }
  if (n.includes('move')) {
    return '/services/gardening-landscaping.jpg'
  }
  return service?.image || '/services/janitorial-office.jpg'
}

const bookingLink = (service) => {
  const text = encodeURIComponent(
    `Hi Speedtouch — I'd like to make an inquiry about the *${service.name}* service. Could we discuss?`,
  )
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}

function Services() {
  const navigate = useNavigate()
  const { services, loading, error } = useServices()
  const [expandedCards, setExpandedCards] = useState({})

  const toggleExpand = (serviceId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }))
  }

  return (
    <section id="services" className="bg-slate-50/60 py-12 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-pink-deep">
              Our services
            </h2>
          </div>
        </Reveal>

        {error && (
          <div className="mx-auto mt-6 max-w-2xl rounded-lg bg-red-50 px-4 py-3 text-center text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="aspect-16/10 animate-pulse bg-slate-100" />
                <div className="space-y-3 p-6">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-slate-100" />
                  <div className="h-4 animate-pulse rounded bg-slate-100" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
                  <div className="mt-4 h-10 w-full animate-pulse rounded-lg bg-slate-100" />
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
            {/* Cards Grid: 1 column on mobile (as in 3rd image), 2 on tablet, 3 on desktop */}
            <div
              id="pricing"
              className="mt-8 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3"
            >
              {services.map((s, i) => {
                const Icon = getServiceIcon(s.name, s.tag)
                const isExpanded = !!expandedCards[s.id]

                return (
                  <Reveal key={s.id} delay={i * 60} className="h-full">
                    <motion.article
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:border-slate-300 hover:shadow-lg"
                    >
                      {/* Image with Floating Icon Badge */}
                      <div
                        className="relative aspect-16/10 w-full overflow-hidden bg-slate-100 cursor-pointer"
                        onClick={() => navigate(`/services/${s.id}`)}
                      >
                        {/* Floating white icon badge at top-left */}
                        <div className="absolute left-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-md text-brand-blue transition-transform duration-200 group-hover:scale-105">
                          <Icon className="h-5 w-5 stroke-[2.2]" />
                        </div>

                        <ImageWithLoader
                          src={getServiceImage(s)}
                          alt={s.name}
                          className="h-full w-full"
                          imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Content Section */}
                      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-brand-blue">
                            <Link to={`/services/${s.id}`}>
                              {s.name}
                            </Link>
                          </h3>

                          <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3">
                            {s.description}
                          </p>
                        </div>

                        {/* Action: Read More ∨ Outline Button */}
                        <div className="mt-6">
                          <button
                            type="button"
                            onClick={() => toggleExpand(s.id)}
                            className="flex w-full items-center justify-center gap-2 rounded-lg border border-brand-blue py-2.5 px-4 text-sm font-semibold text-brand-blue transition-all duration-200 hover:bg-brand-blue hover:text-white cursor-pointer"
                          >
                            <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          {/* Accordion Content */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                className="overflow-hidden"
                              >
                                <div className="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-600 space-y-3">
                                  <div className="whitespace-pre-line leading-relaxed">
                                    {s.description}
                                  </div>
                                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                                    <a
                                      href={bookingLink(s)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 font-semibold text-brand-blue hover:underline"
                                    >
                                      Book on WhatsApp →
                                    </a>
                                    <Link
                                      to={`/services/${s.id}`}
                                      className="font-medium text-slate-500 hover:text-brand-blue hover:underline"
                                    >
                                      View Details & Reviews →
                                    </Link>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.article>
                  </Reveal>
                )
              })}
            </div>

            <p className="mt-12 text-center text-sm text-slate-500">
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
    </section>
  )
}

export default Services
