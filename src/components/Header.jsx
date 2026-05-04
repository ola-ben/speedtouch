import { useState } from 'react'
import Logo from './Logo'

function Header() {
  const [open, setOpen] = useState(false)

  const links = [
    { label: 'Home', href: '#top' },
    { label: 'Services', href: '#services' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ]

  const closeOnClick = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-slate-600 transition hover:text-brand-blue"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="tel:+10000000000"
            className="text-sm font-medium text-slate-600 transition hover:text-brand-blue"
          >
            Call us
          </a>
          <a
            href="#book"
            className="rounded-full bg-brand-blue px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
          >
            Book a clean
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 md:hidden"
        >
          <span className="text-2xl leading-none">{open ? '×' : '☰'}</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={closeOnClick}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-brand-pink-soft hover:text-brand-blue"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#book"
              onClick={closeOnClick}
              className="mt-2 rounded-full bg-brand-blue px-5 py-2 text-center text-sm font-medium text-white"
            >
              Book a clean
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
