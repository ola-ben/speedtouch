import { Link } from 'react-router-dom'
import { ChevronRight, Mail, MapPin, Phone, Clock } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import { WHATSAPP_NUMBER } from '../lib/whatsapp'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function ContactPage() {
  useDocumentTitle(
    'Contact us',
    "Reach Speedtouch — WhatsApp, phone, email, or visit our Old Bolaji office in Ibadan.",
  )

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <nav className="flex items-center gap-1 text-sm text-slate-500">
          <Link to="/" className="hover:text-brand-blue">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-slate-900">Contact</span>
        </nav>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          Say hello.
        </h1>
        <p className="mt-5 text-base text-slate-700 md:text-lg">
          The fastest way to reach us is WhatsApp — a real person reads it,
          and you usually hear back within minutes during business hours. If
          you prefer email or a phone call, those work too.
        </p>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            'Hi Speedtouch — ',
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex items-start gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 transition hover:border-emerald-400"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <FaWhatsapp className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-base font-semibold text-emerald-900">
              WhatsApp us (fastest)
            </div>
            <div className="mt-0.5 text-sm text-emerald-700">
              0802 077 6686 · Replies usually within minutes (Mon–Sat, 9am–6pm)
            </div>
          </div>
        </a>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <ContactCard
            icon={Phone}
            title="Call us"
            line1="0802 077 6686"
            line2="Mon–Sat · 9am – 6pm"
            href="tel:+2348020776686"
          />
          <ContactCard
            icon={Mail}
            title="Email"
            line1="info@speedtouch.com"
            line2="We reply within 24 hours."
            href="mailto:info@speedtouch.com"
          />
          <ContactCard
            icon={MapPin}
            title="Visit"
            line1="7 Oluyoro Street, off Awolowo Avenue"
            line2="Old Bolaji · Ibadan, Oyo"
          />
          <ContactCard
            icon={Clock}
            title="Hours"
            line1="Monday – Saturday"
            line2="9:00am – 6:00pm"
          />
        </div>

        <div className="mt-12 rounded-2xl bg-slate-50 p-6 text-center text-sm text-slate-700">
          Already a customer with a question about a specific booking? Reply
          to the WhatsApp thread we already have — we'll find your order
          faster that way.
        </div>
      </div>
    </section>
  )
}

function ContactCard({ icon: Icon, title, line1, line2, href }) {
  const inner = (
    <>
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue-soft text-brand-blue">
        <Icon className="h-5 w-5" />
      </span>
      <div className="mt-3">
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="mt-1 text-sm text-slate-700">{line1}</div>
        <div className="text-xs text-slate-500">{line2}</div>
      </div>
    </>
  )
  const className =
    'block rounded-2xl border border-slate-100 bg-white p-5 transition hover:border-brand-blue/40'
  return href ? (
    <a href={href} className={className}>{inner}</a>
  ) : (
    <div className={className}>{inner}</div>
  )
}

export default ContactPage
