'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
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

  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <nav className="flex items-center gap-1 text-sm text-slate-500">
          <Link to="/" className="hover:text-brand-blue">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-slate-900">FAQ</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
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
        </motion.div>

        <ul className="mt-10 space-y-3">
          {faqs.map((f, idx) => {
            const isOpen = openIndex === idx
            return (
              <motion.li
                key={f.q}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors hover:border-slate-300"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-slate-900 transition hover:bg-slate-50/70 sm:text-base"
                  aria-expanded={isOpen}
                >
                  <span>{f.q}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-slate-400"
                  >
                    <Plus className="h-5 w-5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-100 bg-slate-50/40 px-5 py-4 text-sm leading-relaxed text-slate-600">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            )
          })}
        </ul>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center text-sm text-slate-700"
        >
          Still stuck?{' '}
          <Link to="/contact" className="font-medium text-brand-blue hover:underline">
            Send us a message
          </Link>{' '}
          — a real person reads everything.
        </motion.div>
      </div>
    </section>
  )
}

export default FAQPage
