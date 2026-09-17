'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/#services' },
  { label: 'Products', to: '/products' },
  { label: 'Pricing', to: '/#pricing' },
  { label: 'Contact', to: '/#contact' },
]

const menuContainerVariants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: [0.32, 0.72, 0, 1],
      when: 'afterChildren',
    },
  },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
}

const menuItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
}

function Header() {
  const [open, setOpen] = useState(false)
  const closeOnClick = () => setOpen(false)
  const { count, openDrawer } = useCart()
  const { isAuthenticated } = useAuth()

  const CartButton = ({ className = '' }) => (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      onClick={openDrawer}
      aria-label={`Open cart (${count} ${count === 1 ? 'item' : 'items'})`}
      className={`relative inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100 hover:text-brand-blue ${className}`}
    >
      <ShoppingBag className="h-5 w-5" />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key="cart-badge"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-pink-deep px-1 text-[10px] font-bold text-white tabular-nums shadow-sm"
          >
            {count > 99 ? '99+' : count}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:py-3.5 sm:px-6">
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

        <div className="hidden items-center gap-2 md:flex">
          <CartButton />
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/#book"
              className="ml-1 inline-flex items-center rounded-full bg-brand-blue px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
            >
              Book a clean
            </Link>
          </motion.div>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <CartButton />
          <motion.button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100"
          >
            <motion.div
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            variants={menuContainerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-hidden border-t border-slate-100 bg-white/95 shadow-lg backdrop-blur-md md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
              {links.map((l) => (
                <motion.div key={l.label} variants={menuItemVariants}>
                  <Link
                    to={l.to}
                    onClick={closeOnClick}
                    className="flex items-center rounded-xl px-3.5 py-2.5 text-base font-medium text-slate-700 transition hover:bg-brand-pink-soft/70 hover:text-brand-blue"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={menuItemVariants}>
                <Link
                  to="/account"
                  onClick={closeOnClick}
                  className="flex items-center rounded-xl px-3.5 py-2.5 text-base font-medium text-slate-700 transition hover:bg-brand-pink-soft/70 hover:text-brand-blue"
                >
                  {isAuthenticated ? 'My Account' : 'Sign In'}
                </Link>
              </motion.div>

              <motion.div variants={menuItemVariants} className="pt-2">
                <Link
                  to="/#book"
                  onClick={closeOnClick}
                  className="flex w-full items-center justify-center rounded-full bg-brand-blue py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
                >
                  Book a clean
                </Link>
              </motion.div>

              <motion.div
                variants={menuItemVariants}
                className="mt-3 flex items-center justify-center gap-4 border-t border-slate-100 pt-3 text-xs text-slate-400"
              >
                <Link
                  to="/terms"
                  onClick={closeOnClick}
                  className="hover:text-brand-blue transition"
                >
                  Terms of Service
                </Link>
                <span>•</span>
                <Link
                  to="/privacy"
                  onClick={closeOnClick}
                  className="hover:text-brand-blue transition"
                >
                  Privacy Policy
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
