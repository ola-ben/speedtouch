import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  Settings,
  Menu,
  X,
  ExternalLink,
  Bell,
  Search,
  LogOut,
} from 'lucide-react'
import Logo from '../Logo'
import { useAuth } from '../../context/AuthContext'

const nav = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

function SidebarContent({ onNavigate }) {
  return (
    <>
      <div className="px-5 py-5">
        <Logo />
      </div>

      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {nav.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-brand-blue text-white shadow-sm shadow-brand-blue/30'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-slate-100 p-4">
        <Link
          to="/"
          target="_blank"
          rel="noopener"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-brand-blue"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View store
        </Link>
      </div>
    </>
  )
}

function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, signOut } = useAuth()
  const initial = user?.email?.[0]?.toUpperCase() ?? 'A'

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col self-start overflow-y-auto border-r border-slate-200 bg-white lg:flex">
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <>
          <div
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          />
          <aside className="fixed inset-y-0 left-0 z-50 flex w-60 flex-col bg-white shadow-xl lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="absolute right-2 top-3 rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="relative hidden flex-1 max-w-md sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search admin"
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              aria-label="Notifications"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 hover:text-brand-blue"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-pink-deep" />
            </button>
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 sm:flex">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br from-brand-blue to-brand-pink-deep text-xs font-semibold text-white">
                {initial}
              </span>
              <div className="max-w-35 truncate text-left text-xs leading-tight">
                <div className="truncate font-semibold text-slate-900">
                  {user?.email ?? 'Admin'}
                </div>
                <div className="text-slate-500">Speedtouch</div>
              </div>
            </div>
            <button
              type="button"
              onClick={signOut}
              aria-label="Sign out"
              title="Sign out"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 hover:text-brand-pink-deep"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
