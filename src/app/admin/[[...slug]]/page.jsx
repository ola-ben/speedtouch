'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import ProtectedAdminRoute from '../../../components/ProtectedAdminRoute'
import AdminLayout from '../../../components/admin/AdminLayout'
import AdminLoginPage from '../../../views/admin/AdminLoginPage'
import AdminDashboardPage from '../../../views/admin/AdminDashboardPage'
import AdminProductsPage from '../../../views/admin/AdminProductsPage'
import AdminProductFormPage from '../../../views/admin/AdminProductFormPage'
import AdminServicesPage from '../../../views/admin/AdminServicesPage'
import AdminServiceFormPage from '../../../views/admin/AdminServiceFormPage'
import AdminReviewsPage from '../../../views/admin/AdminReviewsPage'
import AdminOrdersPage from '../../../views/admin/AdminOrdersPage'
import AdminOrderDetailPage from '../../../views/admin/AdminOrderDetailPage'
import AdminCustomersPage from '../../../views/admin/AdminCustomersPage'
import AdminCustomerDetailPage from '../../../views/admin/AdminCustomerDetailPage'
import AdminSettingsPage from '../../../views/admin/AdminSettingsPage'

export default function AdminCatchAll() {
  const pathname = usePathname()

  if (pathname === '/admin/login' || pathname?.startsWith('/admin/login')) {
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
}
