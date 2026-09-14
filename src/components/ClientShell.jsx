'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import Toast from './Toast'
import InstallPrompt from './InstallPrompt'
import ScrollToTop from './ScrollToTop'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'

export default function ClientShell({ children }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <AuthProvider>
      <CartProvider>
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
        <div className="flex min-h-screen flex-col bg-white text-slate-900">
          {!isAdmin && <Header />}
          <main className={isAdmin ? '' : 'flex-1'}>
            <Suspense fallback={null}>
              {children}
            </Suspense>
          </main>
          {!isAdmin && <Footer />}
          {mounted && !isAdmin && <InstallPrompt />}
          {mounted && <CartDrawer />}
          {mounted && <Toast />}
        </div>
      </CartProvider>
    </AuthProvider>
  )
}
