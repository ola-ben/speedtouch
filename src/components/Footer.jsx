import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa6'
import Logo from './Logo'

const socials = [
  {
    Icon: FaInstagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/speedtouch_cleanings/',
    hoverClass:
      'hover:bg-[linear-gradient(45deg,#feda75,#fa7e1e_25%,#d62976_50%,#962fbf_75%,#4f5bd5)] hover:text-white hover:border-transparent',
  },
  {
    Icon: FaFacebookF,
    label: 'Facebook',
    href: 'https://www.facebook.com/speedtouchcleaners/',
    hoverClass: 'hover:bg-[#1877f2] hover:text-white',
  },
  {
    Icon: FaTiktok,
    label: 'TikTok',
    href: 'https://vm.tiktok.com/ZS9YsDbx9upyt-6se0M/',
    hoverClass: 'hover:bg-black hover:text-white',
  },
]

const cols = [
  {
    title: 'Services',
    links: [
      { label: 'Standard cleaning', to: '/#services' },
      { label: 'Deep cleaning', to: '/#services' },
      { label: 'Move in / out', to: '/#services' },
      { label: 'Office & commercial', to: '/#services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', to: '/about' },
      { label: 'Careers', to: '/careers' },
      { label: 'Reviews', to: '/reviews' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Contact', to: '/contact' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Cancellation', to: '/cancellation' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
]

function Footer() {
  return (
    <footer id="contact" className="bg-brand-navy text-slate-400">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <span className="inline-flex rounded-xl bg-white px-3 py-2 shadow-sm">
              <Logo />
            </span>
            <p className="mt-4 max-w-xs text-sm text-slate-400">
              Professional home and office cleaning, delivered with care.
              Bonded, insured, and 100% satisfaction guaranteed.
            </p>

            <div className="mt-5 flex items-center gap-2">
              {socials.map(({ Icon, label, href, hoverClass }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition ${hoverClass}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold text-white">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={`${c.title}-${l.label}`}>
                    <Link
                      to={l.to}
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 md:flex-row">
          <div>© 2026 Speedtouch Cleanings and Hygiene Ltd. All rights reserved.</div>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
