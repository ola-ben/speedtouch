import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ScrollToTop from './components/ScrollToTop'
import InstallPrompt from './components/InstallPrompt'
import CartDrawer from './components/CartDrawer'
import Toast from './components/Toast'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'
import AdminLayout from './components/admin/AdminLayout'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const OrderConfirmationPage = lazy(() => import('./pages/OrderConfirmationPage'))
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'))
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'))
const AdminProductsPage = lazy(() => import('./pages/admin/AdminProductsPage'))
const AdminProductFormPage = lazy(() => import('./pages/admin/AdminProductFormPage'))
const AdminOrdersPage = lazy(() => import('./pages/admin/AdminOrdersPage'))
const AdminOrderDetailPage = lazy(() => import('./pages/admin/AdminOrderDetailPage'))
const AdminCustomersPage = lazy(() => import('./pages/admin/AdminCustomersPage'))
const AdminCustomerDetailPage = lazy(() => import('./pages/admin/AdminCustomerDetailPage'))
const AdminSettingsPage = lazy(() => import('./pages/admin/AdminSettingsPage'))

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
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order/confirmation" element={<OrderConfirmationPage />} />

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
              <Route path="/admin/settings" element={<AdminSettingsPage />} />
            </Route>
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
