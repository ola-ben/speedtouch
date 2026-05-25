import { Link } from 'react-router-dom'
import { ChevronRight, MapPin, Clock, ArrowRight } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import { WHATSAPP_NUMBER } from '../lib/whatsapp'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const openings = [
  {
    title: 'Cleaner',
    location: 'Ibadan',
    type: 'Full-time · ₦80,000–₦120,000 / month',
    blurb:
      "You're punctual, careful, and quietly proud of your work. We'll train you the rest of the way.",
  },
  {
    title: 'Driver / Logistics',
    location: 'Ibadan',
    type: 'Full-time',
    blurb:
      "You know the city, you keep a clean vehicle, and you can run a tight schedule. Bonus if you're calm in traffic.",
  },
  {
    title: 'Customer care (WhatsApp)',
    location: 'Remote · Ibadan-based preferred',
    type: 'Part-time',
    blurb:
      'You write warmly, reply quickly, and have a thing for solving small problems before they get bigger.',
  },
]

const why = [
  {
    title: 'Paid weekly',
    body: 'No waiting end-of-month. You work, you get paid Friday.',
  },
  {
    title: 'Trained, not thrown in',
    body: 'Three days of hands-on training before your first solo booking.',
  },
  {
    title: 'Real schedules',
    body: "Fixed hours, written rota. No 'come help today' calls at 6am.",
  },
  {
    title: 'Treated like staff',
    body: "We pay above market and we mean it. Tips are yours; we don't touch them.",
  },
]

function CareersPage() {
  useDocumentTitle(
    'Careers',
    "Open roles at Speedtouch — cleaning, logistics, and customer-care positions in Ibadan.",
  )

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <nav className="flex items-center gap-1 text-sm text-slate-500">
          <Link to="/" className="hover:text-brand-blue">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-slate-900">Careers</span>
        </nav>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          Work with us.
        </h1>
        <p className="mt-5 text-base text-slate-700 md:text-lg">
          We're growing slowly and carefully — only adding to the team when we
          can train you properly. Here's what's open today. If nothing fits but
          you think we'd be good together, send us a WhatsApp anyway.
        </p>

        <ul className="mt-10 space-y-4">
          {openings.map((o) => (
            <li
              key={o.title}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <h3 className="text-lg font-semibold text-slate-900">{o.title}</h3>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {o.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {o.type}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-600">{o.blurb}</p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hi Speedtouch — I'd like to apply for the ${o.title} role.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-blue hover:underline"
              >
                Apply on WhatsApp <ArrowRight className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          Why work here
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {why.map((w) => (
            <div key={w.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <h3 className="text-sm font-semibold text-slate-900">{w.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{w.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-emerald-50 p-6 text-center">
          <FaWhatsapp className="mx-auto h-8 w-8 text-emerald-600" />
          <p className="mt-3 text-sm text-slate-700">
            Quickest way to apply: a WhatsApp message with your name, age, and
            where you live. We reply within the day.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Hi Speedtouch — I'd like to apply to join the team.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            <FaWhatsapp className="h-4 w-4" />
            Send us a message
          </a>
        </div>
      </div>
    </section>
  )
}

export default CareersPage
