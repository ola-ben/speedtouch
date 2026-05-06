import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import Logo from './Logo'
import { useCart } from '../context/CartContext'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/#services' },
  { label: 'Products', to: '/products' },
  { label: 'Pricing', to: '/#pricing' },
  { label: 'Contact', to: '/#contact' },
]

function Header() {
  const [open, setOpen] = useState(false)
  const closeOnClick = () => setOpen(false)
  const { count, openDrawer } = useCart()

  const CartButton = ({ className = '' }) => (
    <button
      type="button"
      onClick={openDrawer}
      aria-label={`Open cart (${count} ${count === 1 ? 'item' : 'items'})`}
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100 hover:text-brand-blue ${className}`}
    >
      <ShoppingBag className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-pink-deep px-1 text-[10px] font-bold text-white tabular-nums">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  )

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="text-sm font-medium text-slate-600 transition hover:text-brand-blue"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1 md:flex">
          <CartButton />
          <Link
            to="/#book"
            className="ml-2 rounded-full bg-brand-blue px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
          >
            Book a clean
          </Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <CartButton />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
          >
            <span className="text-2xl leading-none">{open ? '×' : '☰'}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={closeOnClick}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-brand-pink-soft hover:text-brand-blue"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/#book"
              onClick={closeOnClick}
              className="mt-2 rounded-full bg-brand-blue px-5 py-2 text-center text-sm font-medium text-white"
            >
              Book a clean
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
