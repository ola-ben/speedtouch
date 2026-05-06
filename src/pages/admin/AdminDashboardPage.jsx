import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Banknote,
  ShoppingBag,
  Users,
  Package,
  AlertTriangle,
} from 'lucide-react'
import { orders, STATUS_META } from '../../data/orders'
import { customers } from '../../data/customers'
import { products } from '../../data/products'

function formatNaira(n) {
  return `₦${Number(n).toLocaleString('en-NG')}`
}

function StatCard({ icon: Icon, label, value, trend, tint }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${tint}`}>
          <Icon className="h-5 w-5" />
        </div>
        {trend != null && (
          <span
            className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
              trend >= 0
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-rose-50 text-rose-700'
            }`}
          >
            <ArrowUpRight
              className={`h-3 w-3 ${trend < 0 ? 'rotate-90' : ''}`}
            />
            {trend >= 0 ? '+' : ''}
            {trend}%
          </span>
        )}
      </div>
      <div className="mt-4 text-2xl font-bold tracking-tight text-slate-900 tabular-nums md:text-3xl">
        {value}
      </div>
      <div className="mt-1 text-sm text-slate-600">{label}</div>
    </div>
  )
}

function StatusPill({ status }) {
  const meta = STATUS_META[status] || STATUS_META.pending
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${meta.bg} ${meta.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  )
}

function AdminDashboardPage() {
  const totalRevenue = orders
    .filter((o) => !['cancelled', 'refunded'].includes(o.status))
    .reduce((s, o) => s + o.total, 0)
  const ordersCount = orders.length
  const customersCount = customers.length
  const productsCount = products.length

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.placedAt) - new Date(a.placedAt))
    .slice(0, 5)

  const productSales = orders
    .flatMap((o) => o.items)
    .reduce((acc, it) => {
      const cur = acc.get(it.productId) || { id: it.productId, name: it.name, units: 0, revenue: 0 }
      cur.units += it.quantity
      cur.revenue += it.quantity * it.price
      acc.set(it.productId, cur)
      return acc
    }, new Map())
  const topProducts = [...productSales.values()].sort((a, b) => b.revenue - a.revenue).slice(0, 5)

  const lowStock = products
    .filter((p) => p.stock > 0 && p.stock < 20)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5)

  return (
    <div className="px-4 py-8 sm:px-6 md:py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Overview
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            What's happening across your store right now.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Banknote}
            label="Revenue (this month)"
            value={formatNaira(totalRevenue)}
            trend={18}
            tint="bg-brand-blue-soft text-brand-blue"
          />
          <StatCard
            icon={ShoppingBag}
            label="Orders"
            value={ordersCount}
            trend={12}
            tint="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            icon={Users}
            label="Customers"
            value={customersCount}
            trend={6}
            tint="bg-violet-50 text-violet-600"
          />
          <StatCard
            icon={Package}
            label="Products"
            value={productsCount}
            trend={-3}
            tint="bg-brand-pink-soft text-brand-pink-deep"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white lg:col-span-2">
            <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h2 className="text-base font-semibold text-slate-900">Recent orders</h2>
              <Link
                to="/admin/orders"
                className="text-sm font-medium text-brand-blue hover:underline"
              >
                View all
              </Link>
            </header>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-2.5">Order</th>
                  <th className="hidden px-4 py-2.5 sm:table-cell">Customer</th>
                  <th className="px-4 py-2.5">Status</th>
                  <th className="px-5 py-2.5 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.map((o) => (
                  <tr key={o.id}>
                    <td className="px-5 py-3">
                      <Link
                        to={`/admin/orders/${o.id}`}
                        className="font-mono text-xs font-semibold text-brand-blue hover:underline"
                      >
                        #{o.id}
                      </Link>
                      <div className="text-[11px] text-slate-400">
                        {new Date(o.placedAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 text-slate-700 sm:table-cell">
                      {o.customerName}
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill status={o.status} />
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-slate-900 tabular-nums">
                      {formatNaira(o.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white">
            <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h2 className="text-base font-semibold text-slate-900">Top products</h2>
              <Link
                to="/admin/products"
                className="text-sm font-medium text-brand-blue hover:underline"
              >
                Catalog
              </Link>
            </header>
            <ul className="divide-y divide-slate-100">
              {topProducts.map((p, i) => (
                <li key={p.id} className="flex items-center gap-3 px-5 py-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="line-clamp-1 text-sm font-medium text-slate-900">
                      {p.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {p.units} sold · {formatNaira(p.revenue)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {lowStock.length > 0 && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <h2 className="text-base font-semibold text-amber-900">
                Low stock — restock soon
              </h2>
            </div>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {lowStock.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center gap-3 rounded-xl bg-white p-3"
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-slate-100">
                    {p.image && (
                      <img src={p.image} alt="" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="line-clamp-1 text-sm font-medium text-slate-900">
                      {p.name}
                    </div>
                    <div className="text-xs text-amber-700">
                      Only {p.stock} left in stock
                    </div>
                  </div>
                  <Link
                    to={`/admin/products/${p.id}/edit`}
                    className="rounded-full border border-amber-300 bg-white px-3 py-1 text-xs font-medium text-amber-800 hover:border-amber-500"
                  >
                    Edit
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboardPage
