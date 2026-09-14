import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './views/HomePage'
import ScrollToTop from './components/ScrollToTop'
import InstallPrompt from './components/InstallPrompt'
import CartDrawer from './components/CartDrawer'
import Toast from './components/Toast'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'
import AdminLayout from './components/admin/AdminLayout'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

const TermsPage = lazy(() => import('./views/TermsPage'))
const PrivacyPage = lazy(() => import('./views/PrivacyPage'))
const NotFoundPage = lazy(() => import('./views/NotFoundPage'))
const WorkPage = lazy(() => import('./views/WorkPage'))
const ProductsPage = lazy(() => import('./views/ProductsPage'))
const ProductDetailPage = lazy(() => import('./views/ProductDetailPage'))
const ServicesPage = lazy(() => import('./views/ServicesPage'))
const ServiceDetailPage = lazy(() => import('./views/ServiceDetailPage'))
const CartPage = lazy(() => import('./views/CartPage'))
const CheckoutPage = lazy(() => import('./views/CheckoutPage'))
const AccountPage = lazy(() => import('./views/AccountPage'))
const OrderConfirmationPage = lazy(() => import('./views/OrderConfirmationPage'))
const AboutPage = lazy(() => import('./views/AboutPage'))
const ReviewsPage = lazy(() => import('./views/ReviewsPage'))
const ContactPage = lazy(() => import('./views/ContactPage'))
const PricingPage = lazy(() => import('./views/PricingPage'))
const CancellationPage = lazy(() => import('./views/CancellationPage'))
const FAQPage = lazy(() => import('./views/FAQPage'))
const AdminLoginPage = lazy(() => import('./views/admin/AdminLoginPage'))
const AdminDashboardPage = lazy(() => import('./views/admin/AdminDashboardPage'))
const AdminProductsPage = lazy(() => import('./views/admin/AdminProductsPage'))
const AdminProductFormPage = lazy(() => import('./views/admin/AdminProductFormPage'))
const AdminServicesPage = lazy(() => import('./views/admin/AdminServicesPage'))
const AdminServiceFormPage = lazy(() => import('./views/admin/AdminServiceFormPage'))
const AdminReviewsPage = lazy(() => import('./views/admin/AdminReviewsPage'))
const AdminOrdersPage = lazy(() => import('./views/admin/AdminOrdersPage'))
const AdminOrderDetailPage = lazy(() => import('./views/admin/AdminOrderDetailPage'))
const AdminCustomersPage = lazy(() => import('./views/admin/AdminCustomersPage'))
const AdminCustomerDetailPage = lazy(() => import('./views/admin/AdminCustomerDetailPage'))
const AdminSettingsPage = lazy(() => import('./views/admin/AdminSettingsPage'))

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div
        aria-label="Loading"
        className="h-10 w-10 animate-spin rounded-full border-4 border-brand-blue/20 border-t-brand-blue"
      />
    </div>
  )
}

function Shell() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {!isAdmin && <Header />}
      <main className={isAdmin ? '' : 'flex-1'}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:id" element={<ServiceDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/order/confirmation" element={<OrderConfirmationPage />} />

            <Route path="/about" element={<AboutPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/cancellation" element={<CancellationPage />} />
            <Route path="/faq" element={<FAQPage />} />

            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/orders" element={<AdminOrdersPage />} />
              <Route path="/admin/orders/:id" element={<AdminOrderDetailPage />} />
              <Route path="/admin/customers" element={<AdminCustomersPage />} />
              <Route path="/admin/customers/:id" element={<AdminCustomerDetailPage />} />
              <Route path="/admin/products" element={<AdminProductsPage />} />
              <Route path="/admin/products/new" element={<AdminProductFormPage />} />
              <Route path="/admin/products/:id/edit" element={<AdminProductFormPage />} />
              <Route path="/admin/services" element={<AdminServicesPage />} />
              <Route path="/admin/services/new" element={<AdminServiceFormPage />} />
              <Route path="/admin/services/:id/edit" element={<AdminServiceFormPage />} />
              <Route path="/admin/reviews" element={<AdminReviewsPage />} />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />
            </Route>

            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <InstallPrompt />}
      <CartDrawer />
      <Toast />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <Shell />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
