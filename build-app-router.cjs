const fs = require('fs');
const path = require('path');

const root = 'C:/Users/olabe/OneDrive/Desktop/speedtouch';

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeFile(relPath, content) {
  const full = path.join(root, relPath);
  ensureDir(full);
  fs.writeFileSync(full, content.trim() + '\n', 'utf8');
  console.log('Created:', relPath);
}

// 1. ClientShell
writeFile('src/components/ClientShell.jsx', 'use client'

import React, { useEffect, useState } from 'react'
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
        <ScrollToTop />
        <div className=flex min-h-screen flex-col bg-white text-slate-900>
          {!isAdmin && <Header />}
          <main className={isAdmin ? '' : 'flex-1'}>
            {children}
          </main>
          {!isAdmin && <Footer />}
          {mounted && !isAdmin && <InstallPrompt />}
          {mounted && <CartDrawer />}
          {mounted && <Toast />}
        </div>
      </CartProvider>
    </AuthProvider>
  )
});

// 2. Root Layout
writeFile('src/app/layout.jsx', import '../index.css'
import ClientShell from '../components/ClientShell'

export const metadata = {
  metadataBase: new URL('https://speedtouch.com.ng'),
  title: {
    default: 'Speedtouch — Professional Cleaning Services & Supplies in Ibadan',
    template: '%s | Speedtouch',
  },
  description:
    'Professional home & office cleaning and eco-friendly cleaning supplies in Ibadan, Nigeria. Book trained, insured cleaners in 60 seconds.',
  keywords: [
    'cleaning service Ibadan',
    'cleaning service Nigeria',
    'deep cleaning',
    'office cleaning',
    'move in out cleaning',
    'cleaning supplies Nigeria',
    'Speedtouch',
  ],
  authors: [{ name: 'Speedtouch Cleanings and Hygiene Ltd' }],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Speedtouch',
    locale: 'en_NG',
    url: 'https://speedtouch.com.ng/',
    title: 'Speedtouch — Professional Cleaning Services & Supplies',
    description:
      'A spotless home, without the hassle. Trained, insured cleaners and eco-friendly supplies in Ibadan, Nigeria.',
    images: [{ url: 'https://speedtouch.com.ng/logo.jpeg', width: 1280, height: 720, alt: 'Speedtouch' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Speedtouch — Professional Cleaning Services & Supplies',
    description:
      'A spotless home, without the hassle. Trained, insured cleaners and eco-friendly supplies in Ibadan, Nigeria.',
    images: ['https://speedtouch.com.ng/logo.jpeg'],
  },
}

export const viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang=en suppressHydrationWarning>
      <body className=antialiased>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  )
});

// 3. Homepage
writeFile('src/app/page.jsx', import HomePage from '../pages/HomePage'

export const metadata = {
  title: 'Speedtouch — Professional Cleaning Services & Supplies in Ibadan',
  description:
    'Book trained, vetted cleaners and shop eco-friendly cleaning supplies in Ibadan, Nigeria. Fast 60-second booking, 100% satisfaction guaranteed.',
}

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Speedtouch Cleanings and Hygiene Ltd',
    image: 'https://speedtouch.com.ng/logo.jpeg',
    '@id': 'https://speedtouch.com.ng/#business',
    url: 'https://speedtouch.com.ng',
    telephone: '+2347063026374',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ibadan',
      addressRegion: 'Oyo State',
      addressCountry: 'NG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 7.3775,
      longitude: 3.947,
    },
    priceRange: '₦₦',
  }

  return (
    <>
      <script
        type=application/ld+json
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage />
    </>
  )
});

// 4. Products Page
writeFile('src/app/products/page.jsx', import ProductsPage from '../../pages/ProductsPage'

export const metadata = {
  title: 'Cleaning Supplies & Products',
  description:
    'Shop top-rated eco-friendly cleaning chemicals, disinfectants, mops, sprays, and professional supplies in Nigeria from Speedtouch.',
  openGraph: {
    title: 'Cleaning Supplies & Products | Speedtouch',
    description:
      'Shop top-rated eco-friendly cleaning chemicals, disinfectants, mops, sprays, and professional supplies in Nigeria from Speedtouch.',
    url: 'https://speedtouch.com.ng/products',
  },
}

export default function Page() {
  return <ProductsPage />
});

// 5. Product Detail Page with Google Schema.org Product JSON-LD & Dynamic generateMetadata
writeFile('src/app/products/[id]/page.jsx', import ProductDetailPage from '../../../pages/ProductDetailPage'
import { fetchProductById } from '../../../lib/products'

export async function generateMetadata({ params }) {
  const resolved = await params
  const id = resolved?.id
  try {
    const product = await fetchProductById(id)
    if (product) {
      const title = \\ — Cleaning Supplies\
      const desc = product.description || \Buy \ for ₦\ from Speedtouch.\
      const img = product.image || 'https://speedtouch.com.ng/logo.jpeg'

      return {
        title,
        description: desc,
        openGraph: {
          title,
          description: desc,
          url: \https://speedtouch.com.ng/products/\\,
          images: [{ url: img, alt: product.name }],
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description: desc,
          images: [img],
        },
      }
    }
  } catch (e) {}

  return {
    title: 'Product Details | Speedtouch',
    description: 'Shop quality cleaning supplies from Speedtouch in Ibadan, Nigeria.',
  }
}

export default async function Page({ params }) {
  const resolved = await params
  const id = resolved?.id
  let product = null
  try {
    product = await fetchProductById(id)
  } catch (e) {}

  const productSchema = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.image ? [product.image] : ['https://speedtouch.com.ng/logo.jpeg'],
        description: product.description,
        sku: product.id,
        offers: {
          '@type': 'Offer',
          url: \https://speedtouch.com.ng/products/\\,
          priceCurrency: 'NGN',
          price: product.price,
          availability:
            product.stock > 0
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
          itemCondition: 'https://schema.org/NewCondition',
        },
      }
    : null

  return (
    <>
      {productSchema && (
        <script
          type=application/ld+json
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      <ProductDetailPage />
    </>
  )
});

// 6. Services Page
writeFile('src/app/services/page.jsx', import ServicesPage from '../../pages/ServicesPage'

export const metadata = {
  title: 'Cleaning Services in Ibadan',
  description:
    'Explore our professional cleaning services: Standard Home Cleaning, Deep Cleaning, Move In/Move Out Cleaning, Post-Construction, and Office Cleaning.',
  openGraph: {
    title: 'Cleaning Services in Ibadan | Speedtouch',
    description:
      'Explore our professional cleaning services: Standard Home Cleaning, Deep Cleaning, Move In/Move Out Cleaning, Post-Construction, and Office Cleaning.',
    url: 'https://speedtouch.com.ng/services',
  },
}

export default function Page() {
  return <ServicesPage />
});

// 7. Service Detail Page with Service Schema.org JSON-LD
writeFile('src/app/services/[id]/page.jsx', import ServiceDetailPage from '../../../pages/ServiceDetailPage'
import { fetchServiceById } from '../../../lib/services'

export async function generateMetadata({ params }) {
  const resolved = await params
  const id = resolved?.id
  try {
    const service = await fetchServiceById(id)
    if (service) {
      const title = \\ — Professional Cleaning Service\
      const desc = service.description || \Book \ in Ibadan with Speedtouch.\
      const img = service.image_url || 'https://speedtouch.com.ng/logo.jpeg'

      return {
        title,
        description: desc,
        openGraph: {
          title,
          description: desc,
          url: \https://speedtouch.com.ng/services/\\,
          images: [{ url: img, alt: service.name }],
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description: desc,
          images: [img],
        },
      }
    }
  } catch (e) {}

  return {
    title: 'Cleaning Service Details | Speedtouch',
    description: 'Book professional cleaning services in Ibadan with Speedtouch.',
  }
}

export default async function Page({ params }) {
  const resolved = await params
  const id = resolved?.id
  let service = null
  try {
    service = await fetchServiceById(id)
  } catch (e) {}

  const serviceSchema = service
    ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.name,
        serviceType: 'Cleaning',
        description: service.description,
        provider: {
          '@type': 'LocalBusiness',
          name: 'Speedtouch Cleanings and Hygiene Ltd',
          url: 'https://speedtouch.com.ng',
        },
        areaServed: {
          '@type': 'City',
          name: 'Ibadan',
        },
        offers: {
          '@type': 'Offer',
          price: service.price,
          priceCurrency: 'NGN',
        },
      }
    : null

  return (
    <>
      {serviceSchema && (
        <script
          type=application/ld+json
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      )}
      <ServiceDetailPage />
    </>
  )
});

// 8. Dynamic Sitemap
writeFile('src/app/sitemap.js', import { fetchProducts } from '../lib/products'
import { fetchServices } from '../lib/services'

export default async function sitemap() {
  const baseUrl = 'https://speedtouch.com.ng'

  const staticRoutes = [
    '',
    '/products',
    '/services',
    '/about',
    '/reviews',
    '/pricing',
    '/work',
    '/faq',
    '/contact',
    '/terms',
    '/privacy',
    '/cancellation',
  ].map((route) => ({
    url: \\\\,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/products' || route === '/services' ? 'daily' : 'monthly',
    priority: route === '' ? 1.0 : route === '/products' || route === '/services' ? 0.9 : 0.7,
  }))

  let productRoutes = []
  try {
    const products = await fetchProducts()
    if (products && products.length > 0) {
      productRoutes = products.map((p) => ({
        url: \\/products/\\,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }))
    }
  } catch (e) {}

  let serviceRoutes = []
  try {
    const services = await fetchServices()
    if (services && services.length > 0) {
      serviceRoutes = services.map((s) => ({
        url: \\/services/\\,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }))
    }
  } catch (e) {}

  return [...staticRoutes, ...productRoutes, ...serviceRoutes]
});

// 9. Robots.txt
writeFile('src/app/robots.js', export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/checkout', '/account', '/order/'],
      },
    ],
    sitemap: 'https://speedtouch.com.ng/sitemap.xml',
  }
});

// 10. Static pages
writeFile('src/app/about/page.jsx', import AboutPage from '../../pages/AboutPage'
export const metadata = {
  title: 'About Speedtouch Cleanings and Hygiene Ltd',
  description: 'Learn about Speedtouch, our mission, trained cleaners, and commitment to spotless homes and workplaces in Ibadan.',
}
export default function Page() { return <AboutPage /> });

writeFile('src/app/reviews/page.jsx', import ReviewsPage from '../../pages/ReviewsPage'
export const metadata = {
  title: 'Customer Reviews & Testimonials',
  description: 'Read verified reviews from clients who trust Speedtouch for home, apartment, and corporate cleaning in Ibadan.',
}
export default function Page() { return <ReviewsPage /> });

writeFile('src/app/contact/page.jsx', import ContactPage from '../../pages/ContactPage'
export const metadata = {
  title: 'Contact Speedtouch',
  description: 'Get in touch with Speedtouch for custom cleaning quotes, customer support, or cleaning supplies inquiries in Ibadan.',
}
export default function Page() { return <ContactPage /> });

writeFile('src/app/pricing/page.jsx', import PricingPage from '../../pages/PricingPage'
export const metadata = {
  title: 'Transparent Cleaning Pricing & Packages',
  description: 'View transparent pricing for residential cleaning, deep cleaning, office cleaning, and eco-supplies.',
}
export default function Page() { return <PricingPage /> });

writeFile('src/app/work/page.jsx', import WorkPage from '../../pages/WorkPage'
export const metadata = {
  title: 'Our Recent Cleaning Projects & Portfolio',
  description: 'Before & after transformations of homes, offices, and commercial sites cleaned by Speedtouch in Ibadan.',
}
export default function Page() { return <WorkPage /> });

writeFile('src/app/faq/page.jsx', import FAQPage from '../../pages/FAQPage'
export const metadata = {
  title: 'Frequently Asked Questions (FAQ)',
  description: 'Everything you need to know about booking, our cleaning supplies, vetted cleaners, insurance, and satisfaction guarantee.',
}
export default function Page() { return <FAQPage /> });

writeFile('src/app/terms/page.jsx', import TermsPage from '../../pages/TermsPage'
export const metadata = { title: 'Terms & Conditions' }
export default function Page() { return <TermsPage /> });

writeFile('src/app/privacy/page.jsx', import PrivacyPage from '../../pages/PrivacyPage'
export const metadata = { title: 'Privacy Policy' }
export default function Page() { return <PrivacyPage /> });

writeFile('src/app/cancellation/page.jsx', import CancellationPage from '../../pages/CancellationPage'
export const metadata = { title: 'Cancellation & Refund Policy' }
export default function Page() { return <CancellationPage /> });

writeFile('src/app/cart/page.jsx', import CartPage from '../../pages/CartPage'
export const metadata = { title: 'Shopping Cart', robots: { index: false } }
export default function Page() { return <CartPage /> });

writeFile('src/app/checkout/page.jsx', import CheckoutPage from '../../pages/CheckoutPage'
export const metadata = { title: 'Checkout', robots: { index: false } }
export default function Page() { return <CheckoutPage /> });

writeFile('src/app/account/page.jsx', import AccountPage from '../../pages/AccountPage'
export const metadata = { title: 'My Account', robots: { index: false } }
export default function Page() { return <AccountPage /> });

writeFile('src/app/order/confirmation/page.jsx', import OrderConfirmationPage from '../../../../pages/OrderConfirmationPage'
export const metadata = { title: 'Order Confirmation', robots: { index: false } }
export default function Page() { return <OrderConfirmationPage /> });

// 11. Admin Catch-All
writeFile('src/app/admin/[[...slug]]/page.jsx', 'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import ProtectedAdminRoute from '../../../components/ProtectedAdminRoute'
import AdminLayout from '../../../components/admin/AdminLayout'
import AdminLoginPage from '../../../pages/admin/AdminLoginPage'
import AdminDashboardPage from '../../../pages/admin/AdminDashboardPage'
import AdminProductsPage from '../../../pages/admin/AdminProductsPage'
import AdminProductFormPage from '../../../pages/admin/AdminProductFormPage'
import AdminServicesPage from '../../../pages/admin/AdminServicesPage'
import AdminServiceFormPage from '../../../pages/admin/AdminServiceFormPage'
import AdminReviewsPage from '../../../pages/admin/AdminReviewsPage'
import AdminOrdersPage from '../../../pages/admin/AdminOrdersPage'
import AdminOrderDetailPage from '../../../pages/admin/AdminOrderDetailPage'
import AdminCustomersPage from '../../../pages/admin/AdminCustomersPage'
import AdminCustomerDetailPage from '../../../pages/admin/AdminCustomerDetailPage'
import AdminSettingsPage from '../../../pages/admin/AdminSettingsPage'

export default function AdminCatchAll() {
  const pathname = usePathname()

  if (pathname === '/admin/login') {
    return <AdminLoginPage />
  }

  let content = <AdminDashboardPage />
  if (pathname === '/admin/products') content = <AdminProductsPage />
  else if (pathname === '/admin/products/new') content = <AdminProductFormPage />
  else if (pathname?.startsWith('/admin/products/') && pathname?.endsWith('/edit')) content = <AdminProductFormPage />
  else if (pathname === '/admin/services') content = <AdminServicesPage />
  else if (pathname === '/admin/services/new') content = <AdminServiceFormPage />
  else if (pathname?.startsWith('/admin/services/') && pathname?.endsWith('/edit')) content = <AdminServiceFormPage />
  else if (pathname === '/admin/reviews') content = <AdminReviewsPage />
  else if (pathname === '/admin/orders') content = <AdminOrdersPage />
  else if (pathname?.startsWith('/admin/orders/')) content = <AdminOrderDetailPage />
  else if (pathname === '/admin/customers') content = <AdminCustomersPage />
  else if (pathname?.startsWith('/admin/customers/')) content = <AdminCustomerDetailPage />
  else if (pathname === '/admin/settings') content = <AdminSettingsPage />

  return (
    <ProtectedAdminRoute>
      <AdminLayout>{content}</AdminLayout>
    </ProtectedAdminRoute>
  )
});

console.log('All App Router files successfully created!');
