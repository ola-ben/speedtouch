import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { STATUS_META } from '../../data/orders'
import { useOrders } from '../../hooks/useOrders'

const STATUS_TABS = [
  'all',
  'pending',
  'paid',
  'fulfilled',
  'shipped',
  'delivered',
  'cancelled',
  'refunded',
]

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

function formatNaira(n) {
  return `₦${Number(n).toLocaleString('en-NG')}`
}

function AdminOrdersPage() {
  const [tab, setTab] = useState('all')
  const [query, setQuery] = useState('')
  const { orders, loading, error } = useOrders()

  const filtered = useMemo(() => {
    let list = [...orders].sort(
      (a, b) => new Date(b.placedAt) - new Date(a.placedAt),
    )
    if (tab !== 'all') list = list.filter((o) => o.status === tab)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q),
      )
    }
    return list
  }, [tab, query, orders])

  return (
    <div className="px-4 py-8 sm:px-6 md:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Orders
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              {orders.length} total · review, fulfil, and update statuses.
            </p>
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search by order or customer"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
        </div>

        <div className="no-scrollbar mt-6 -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {STATUS_TABS.map((t) => {
            const count =
              t === 'all' ? orders.length : orders.filter((o) => o.status === t).length
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium capitalize transition ${
                  tab === t
                    ? 'border-brand-blue bg-brand-blue text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-brand-blue hover:text-brand-blue'
                }`}
              >
                {t === 'all' ? 'All' : STATUS_META[t]?.label}
                <span
                  className={`ml-2 rounded-full px-1.5 py-0.5 text-[10px] tabular-nums ${
                    tab === t ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-blue/20 border-t-brand-blue" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="px-6 py-16 text-center text-sm text-slate-500">
              {orders.length === 0
                ? 'No orders yet. They will appear here when customers check out.'
                : 'No orders match your filters.'}
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3">Order</th>
                  <th className="hidden px-4 py-3 sm:table-cell">Customer</th>
                  <th className="hidden px-4 py-3 md:table-cell">Items</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <Link
                        to={`/admin/orders/${o.id}`}
                        className="font-mono text-xs font-semibold text-brand-blue hover:underline"
                      >
                        #{o.id}
                      </Link>
                      <div className="text-[11px] text-slate-400">
                        {new Date(o.placedAt).toLocaleString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <Link
                        to={`/admin/customers/${o.customerId}`}
                        className="text-slate-700 hover:text-brand-blue"
                      >
                        {o.customerName}
                      </Link>
                    </td>
                    <td className="hidden px-4 py-3 text-slate-600 md:table-cell">
                      {o.items.reduce((s, i) => s + i.quantity, 0)} item
                      {o.items.reduce((s, i) => s + i.quantity, 0) === 1 ? '' : 's'}
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
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminOrdersPage
