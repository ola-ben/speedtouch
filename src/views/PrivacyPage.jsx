'use client'

import { Link } from 'react-router-dom'
import { ChevronRight, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const privacySections = [
  {
    title: '1. Information We Collect',
    desc: 'When you book a service, sign up for an account, or contact us, we collect details necessary to fulfill your request:',
    list: [
      { label: 'Contact Info', text: 'Name, email address, phone number (used for WhatsApp coordination).' },
      { label: 'Service Location', text: 'Address, flat number, and any special directions for cleaning.' },
      { label: 'Payment Reference', text: 'Transaction reference for Paystack or transfer validation. We do not store card details on our servers.' },
    ],
  },
  {
    title: '2. How We Use Your Data',
    desc: 'We only use your personal information to provide, support, and improve our services:',
    list: [
      { label: 'Cleaners Dispatch', text: 'To schedule cleaners and navigate to your address.' },
      { label: 'Confirmations', text: 'To confirm your payments and send booking updates.' },
      { label: 'Support', text: 'To notify you about changes or resolve service issues.' },
    ],
  },
  {
    title: '3. Cookies & Local Storage',
    desc: 'We use standard local storage to save your active shopping cart items and session information. This is to ensure a smooth browsing experience and allow you to pick up where you left off.',
  },
  {
    title: '4. Third-Party Integrations',
    desc: 'We integrate with trusted providers to securely run our application:',
    list: [
      { label: 'Supabase', text: 'For user authentication and secure database storage.' },
      { label: 'Paystack', text: 'For processing secure online payments directly from the app.' },
      { label: 'Google Auth', text: 'If you choose to log in with Google, we access your name and email to pre-fill details.' },
    ],
  },
  {
    title: '5. Data Security',
    desc: 'We apply Row Level Security (RLS) on our database so that customers can only view their own orders and details. We work continuously to protect our platform, but no online storage or transmission is 100% secure.',
  },
]

function PrivacyPage() {
  useDocumentTitle(
    'Privacy Policy',
    'Speedtouch Privacy Policy — how we collect, protect, and use your personal information honestly.',
  )

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <nav className="flex items-center gap-1 text-sm text-slate-500">
          <Link to="/" className="hover:text-brand-blue">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-slate-900">Privacy Policy</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-brand-blue">
            <Lock className="h-3.5 w-3.5" />
            Data Protection
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-5 text-base text-slate-700 md:text-lg">
            At Speedtouch, we respect your privacy. This policy explains what information we collect when you use our website or services and how we handle it.
          </p>
        </motion.div>

        <div className="mt-10 space-y-6 text-slate-700">
          {privacySections.map((sec, idx) => (
            <motion.div
              key={sec.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-slate-200"
            >
              <h2 className="text-xl font-semibold text-slate-900">{sec.title}</h2>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{sec.desc}</p>
              {sec.list && (
                <ul className="mt-3 list-disc pl-5 text-sm text-slate-600 space-y-1.5">
                  {sec.list.map((item) => (
                    <li key={item.label}>
                      <strong className="text-slate-900">{item.label}:</strong> {item.text}
                    </li>
                  ))}
                </ul>
              )}
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
            <strong>Last Updated:</strong> July 2026. If you have any questions or would like to request deletion of your information, please reach out to us at{' '}
            <a href="mailto:info@speedtouch.com.ng" className="font-medium text-brand-blue hover:underline">
              info@speedtouch.com.ng
            </a>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default PrivacyPage
