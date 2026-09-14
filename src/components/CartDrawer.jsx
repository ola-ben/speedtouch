'use client'

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

function CartDrawer() {
  const { items, count, subtotal, removeItem, setQuantity, drawerOpen, closeDrawer } =
    useCart()

  useEffect(() => {
    if (!drawerOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeDrawer()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [drawerOpen, closeDrawer])

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            key="cart-backdrop"
            onClick={closeDrawer}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm"
          />

          <motion.aside
            key="cart-drawer-panel"
            role="dialog"
            aria-label="Shopping cart"
            aria-modal="true"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-brand-blue" />
                <h2 className="text-lg font-semibold text-slate-900">
                  Your cart{' '}
                  <span className="ml-1 text-sm font-normal text-slate-500">
                    ({count})
                  </span>
                </h2>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={closeDrawer}
                aria-label="Close cart"
                className="rounded-full p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingBag className="h-10 w-10 text-slate-300" />
                <p className="text-sm text-slate-600">Your cart is empty.</p>
                <Link
                  to="/products"
                  onClick={closeDrawer}
                  className="rounded-full bg-brand-blue px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
                >
                  Browse products
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-slate-100 overflow-y-auto px-5">
                  <AnimatePresence initial={false}>
                    {items.map((it) => (
                      <motion.li
                        key={it.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0, x: 20 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-3 py-4">
                          <Link
                            to={`/products/${it.id}`}
                            onClick={closeDrawer}
                            className="block h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100"
                          >
                            <img
                              src={it.image}
                              alt={it.name}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </Link>
                          <div className="flex flex-1 flex-col">
                            <Link
                              to={`/products/${it.id}`}
                              onClick={closeDrawer}
                              className="line-clamp-2 text-sm font-medium leading-snug text-slate-900 hover:text-brand-blue"
                            >
                              {it.name}
                            </Link>
                            <div className="mt-1 text-sm font-bold text-slate-900">
                              ₦{it.price.toLocaleString('en-NG')}
                            </div>
                            <div className="mt-auto flex items-center justify-between pt-2">
                              <div className="inline-flex items-center rounded-full border border-slate-200">
                                <button
                                  type="button"
                                  onClick={() => setQuantity(it.id, it.quantity - 1)}
                                  aria-label="Decrease quantity"
                                  className="p-1.5 text-slate-700 hover:text-brand-blue disabled:opacity-40"
                                  disabled={it.quantity <= 1}
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="min-w-[1.75rem] text-center text-sm font-medium tabular-nums">
                                  {it.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setQuantity(it.id, it.quantity + 1)}
                                  aria-label="Increase quantity"
                                  className="p-1.5 text-slate-700 hover:text-brand-blue"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeItem(it.id)}
                                aria-label={`Remove ${it.name}`}
                                className="p-1 text-slate-400 transition hover:text-brand-pink-deep"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <footer className="border-t border-slate-100 px-5 py-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-slate-600">Subtotal</span>
                    <span className="text-xl font-bold text-slate-900 tabular-nums">
                      ₦{subtotal.toLocaleString('en-NG')}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    <Link
                      to="/checkout"
                      onClick={closeDrawer}
                      className="rounded-full bg-brand-blue px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
                    >
                      Checkout · ₦{subtotal.toLocaleString('en-NG')}
                    </Link>
                    <Link
                      to="/cart"
                      onClick={closeDrawer}
                      className="rounded-full border border-slate-200 px-5 py-3 text-center text-sm font-medium text-slate-700 transition hover:border-brand-blue hover:text-brand-blue active:scale-[0.98]"
                    >
                      View cart
                    </Link>
                  </div>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer
