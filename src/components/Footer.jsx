import { FaInstagram, FaFacebookF, FaTiktok, FaXTwitter } from 'react-icons/fa6'
import Logo from './Logo'

const socials = [
  { Icon: FaInstagram, label: 'Instagram', href: '#' },
  { Icon: FaFacebookF, label: 'Facebook', href: '#' },
  { Icon: FaTiktok, label: 'TikTok', href: '#' },
  { Icon: FaXTwitter, label: 'X (Twitter)', href: '#' },
]

function Footer() {
  const cols = [
    {
      title: 'Services',
      links: ['Standard cleaning', 'Deep cleaning', 'Move in / out', 'Office & commercial'],
    },
    {
      title: 'Company',
      links: ['About us', 'Our cleaners', 'Careers', 'Reviews'],
    },
    {
      title: 'Help',
      links: ['Contact', 'Pricing', 'Cancellation', 'FAQ'],
    },
  ]

  return (
    <footer id="contact" className="border-t border-slate-100 bg-brand-pink-soft">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-slate-600">
              Professional home and office cleaning, delivered with care.
              Bonded, insured, and 100% satisfaction guaranteed.
            </p>

            <div className="mt-5 flex items-center gap-2">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm transition hover:bg-brand-blue hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold text-slate-900">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-slate-600 transition hover:text-brand-blue"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-pink-200/60 pt-6 text-xs text-slate-500 md:flex-row">
          <div>© 2026 Speedtouch Cleaning Services. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-brand-blue">Privacy</a>
            <a href="#" className="hover:text-brand-blue">Terms</a>
            <a href="#" className="hover:text-brand-blue">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
