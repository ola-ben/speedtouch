import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { customers } from '../../data/customers'

const STATUS_STYLE = {
  vip: 'bg-violet-50 text-violet-700',
  active: 'bg-emerald-50 text-emerald-700',
  new: 'bg-brand-blue-soft text-brand-blue',
  inactive: 'bg-slate-100 text-slate-500',
}

function formatNaira(n) {
  return `₦${Number(n).toLocaleString('en-NG')}`
}

function AdminCustomersPage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    let list = [...customers].sort((a, b) => b.spent - a.spent)
    if (filter !== 'all') list = list.filter((c) => c.status === filter)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q),
      )
    }
    return list
  }, [query, filter])

  return (
    <div className="px-4 py-8 sm:px-6 md:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Customers
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              {customers.length} total · sorted by lifetime spend.
            </p>
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search by name, email, or city"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
        </div>

        <div className="no-scrollbar mt-6 -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {['all', 'vip', 'active', 'new', 'inactive'].map((f) => {
            const count = f === 'all' ? customers.length : customers.filter((c) => c.status === f).length
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium capitalize transition ${
                  filter === f
                    ? 'border-brand-blue bg-brand-blue text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-brand-blue hover:text-brand-blue'
                }`}
              >
                {f === 'all' ? 'All customers' : f}
                <span
                  className={`ml-2 rounded-full px-1.5 py-0.5 text-[10px] tabular-nums ${
                    filter === f ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {filtered.length === 0 ? (
            <div className="px-6 py-16 text-center text-sm text-slate-500">
              No customers match your filters.
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3">Customer</th>
                  <th className="hidden px-4 py-3 sm:table-cell">Location</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="hidden px-4 py-3 text-right md:table-cell">Orders</th>
                  <th className="px-5 py-3 text-right">Spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <Link
                        to={`/admin/customers/${c.id}`}
                        className="flex items-center gap-3"
                      >
                        <img
                          src={c.avatar}
                          alt=""
                          className="h-9 w-9 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium text-slate-900 hover:text-brand-blue">
                            {c.name}
                          </div>
                          <div className="text-xs text-slate-500">{c.email}</div>
                        </div>
                      </Link>
                    </td>
                    <td className="hidden px-4 py-3 text-slate-700 sm:table-cell">
                      {c.city}, {c.state}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                          STATUS_STYLE[c.status] || STATUS_STYLE.active
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 text-right tabular-nums md:table-cell">
                      {c.orders}
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-slate-900 tabular-nums">
                      {formatNaira(c.spent)}
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

export default AdminCustomersPage
