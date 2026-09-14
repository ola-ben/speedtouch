'use client'

import { Link } from 'react-router-dom'
import { ChevronRight, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const sections = [
  {
    title: '1. Our Cleaning Services',
    body: 'We provide professional cleaning services and eco-friendly cleaning products in Ibadan, Nigeria. We send trained, vetted, and background-checked cleaners to your designated address.',
  },
  {
    title: '2. Bookings & Scheduling',
    body: 'Bookings can be made online via our platform or through WhatsApp. We request accurate details about your space (number of rooms, bathrooms, etc.) so we can dispatch the right team and products.',
  },
  {
    title: '3. Payments',
    body: 'Payments are processed securely via Paystack or via bank transfer to our Moniepoint account with confirmation on WhatsApp. Bookings are fully confirmed only after payment is received and processed.',
  },
  {
    title: '4. Cancellations & Rescheduling',
    body: 'We understand plans change. For details on refunds, cancellation fees, and rescheduling guidelines, please read our dedicated Cancellation Policy.',
    hasLink: true,
  },
  {
    title: '5. Access and Safety',
    body: 'Please ensure our team has safe access to the premises at the scheduled time. For safety and security, please secure any valuables, cash, or sensitive jewelry before our team arrives.',
  },
  {
    title: '6. Liability & Satisfaction Guarantee',
    body: 'If you are not satisfied with the quality of our service, notify us within 24 hours and we will return to make it right at no extra cost. While we carry public liability insurance, we are not liable for pre-existing wear and tear or items that are not secured safely.',
  },
]

function TermsPage() {
  useDocumentTitle(
    'Terms of Service',
    'Speedtouch Terms of Service — simple and straightforward terms for our cleaning services in Ibadan.',
  )

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <nav className="flex items-center gap-1 text-sm text-slate-500">
          <Link to="/" className="hover:text-brand-blue">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-slate-900">Terms of Service</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-brand-blue">
            <ShieldCheck className="h-3.5 w-3.5" />
            Legal Agreement
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-5 text-base text-slate-700 md:text-lg">
            Welcome to Speedtouch. We believe in keeping things simple. These terms explain the agreement between us (Speedtouch Cleanings and Hygiene Ltd) and you (our customer).
          </p>
        </motion.div>

        <div className="mt-10 space-y-6 text-slate-700">
          {sections.map((sec, idx) => (
            <motion.div
              key={sec.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-slate-200"
            >
              <h2 className="text-xl font-semibold text-slate-900">{sec.title}</h2>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                {sec.hasLink ? (
                  <>
                    We understand plans change. For details on refunds, cancellation fees, and rescheduling guidelines, please read our dedicated{' '}
                    <Link to="/cancellation" className="font-medium text-brand-blue hover:underline">
                      Cancellation Policy
                    </Link>.
                  </>
                ) : (
                  sec.body
                )}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 rounded-2xl border border-slate-100 bg-slate-50 p-6 text-sm text-slate-700"
        >
          <p>
            <strong>Last Updated:</strong> July 2026. If we change these terms, we will post the updated version here. If you have any questions, please{' '}
            <Link to="/contact" className="font-medium text-brand-blue hover:underline">
              contact us
            </Link>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default TermsPage
