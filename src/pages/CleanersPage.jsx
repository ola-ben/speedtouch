import { Link } from 'react-router-dom'
import { ChevronRight, ShieldCheck, GraduationCap, Smile } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const team = [
  {
    name: 'Ngozi A.',
    role: 'Lead cleaner',
    bio: "Two years with us. Famous for spotless kitchens — and being the first to laugh on a long day.",
    avatar: 'https://i.pravatar.cc/200?img=47',
  },
  {
    name: 'Tolu O.',
    role: 'Deep-clean specialist',
    bio: 'Trained electrician before he joined. Knows every screw, hinge, and grout line in a Lagos flat.',
    avatar: 'https://i.pravatar.cc/200?img=12',
  },
  {
    name: 'Funmi B.',
    role: 'Office team lead',
    bio: 'Runs our commercial routes. Quiet, careful, and frighteningly good at returning desks to exactly how she found them.',
    avatar: 'https://i.pravatar.cc/200?img=32',
  },
  {
    name: 'Yemi K.',
    role: 'Move-in/out',
    bio: 'Loves an empty flat. Has a personal vendetta against gas-cooker grease and limescale.',
    avatar: 'https://i.pravatar.cc/200?img=8',
  },
]

const standards = [
  {
    icon: ShieldCheck,
    title: 'Background-checked',
    body: 'Every cleaner is verified with two references and ID before they touch a single key.',
  },
  {
    icon: GraduationCap,
    title: 'Trained in-house',
    body: 'Three days of hands-on training covers our 22-point cleaning checklist, product safety, and how to handle delicate surfaces.',
  },
  {
    icon: Smile,
    title: 'Paid properly',
    body: 'We pay above market rate. Tipping is welcomed but never expected — they\'re already taken care of.',
  },
]

function CleanersPage() {
  useDocumentTitle(
    'Our cleaners',
    'Meet the small, trained, background-checked team behind every Speedtouch clean.',
  )

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <nav className="flex items-center gap-1 text-sm text-slate-500">
          <Link to="/" className="hover:text-brand-blue">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-slate-900">Our cleaners</span>
        </nav>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          The people who'll be in your home.
        </h1>
        <p className="mt-5 max-w-2xl text-base text-slate-700 md:text-lg">
          A clean home is only as good as the person doing the cleaning. We
          keep our team small on purpose — you'll often see the same face for
          your bookings, and you'll know their name.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {team.map((p) => (
            <article
              key={p.name}
              className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-5"
            >
              <img
                src={p.avatar}
                alt=""
                className="h-16 w-16 shrink-0 rounded-full object-cover"
                loading="lazy"
              />
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-slate-900">{p.name}</h3>
                <p className="text-xs font-medium uppercase tracking-wider text-brand-blue">
                  {p.role}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {p.bio}
                </p>
              </div>
            </article>
          ))}
        </div>

        <h2 className="mt-16 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          How we hire
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {standards.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-slate-100 bg-white p-5"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue-soft text-brand-blue">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center text-sm text-slate-700">
          Want to join us?{' '}
          <Link to="/careers" className="font-medium text-brand-blue hover:underline">
            Take a look at careers →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CleanersPage
