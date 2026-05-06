import { Link, useParams } from 'react-router-dom'
import { ChevronRight, Mail, Phone, MapPin, Calendar } from 'lucide-react'
import { findCustomer } from '../../data/customers'
import { orders, STATUS_META } from '../../data/orders'

function formatNaira(n) {
  return `₦${Number(n).toLocaleString('en-NG')}`
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

function AdminCustomerDetailPage() {
  const { id } = useParams()
  const customer = findCustomer(id)
  const customerOrders = customer ? orders.filter((o) => o.customerId === customer.id) : []

  if (!customer) {
    return (
      <div className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Customer not found</h1>
          <Link
            to="/admin/customers"
            className="mt-4 inline-block rounded-full bg-brand-blue px-5 py-2.5 text-sm font-medium text-white"
          >
            Back to customers
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-8 sm:px-6 md:py-10">
      <div className="mx-auto max-w-5xl">
        <nav className="flex items-center gap-1 text-sm text-slate-500">
          <Link to="/admin" className="transition hover:text-brand-blue">Admin</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/admin/customers" className="transition hover:text-brand-blue">Customers</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-slate-900">{customer.name}</span>
        </nav>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
              <img
                src={customer.avatar}
                alt=""
                className="mx-auto h-20 w-20 rounded-full object-cover"
              />
              <h1 className="mt-4 text-xl font-semibold tracking-tight text-slate-900">
                {customer.name}
              </h1>
              <span className="mt-2 inline-flex rounded-full bg-brand-blue-soft px-2.5 py-0.5 text-xs font-medium capitalize text-brand-blue">
                {customer.status}
              </span>

              <dl className="mt-6 space-y-3 text-left text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  <dd className="truncate text-slate-700">{customer.email}</dd>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  <dd className="text-slate-700">{customer.phone}</dd>
                </div>
                <div className="flex gap-2">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                  <dd className="text-slate-700">
                    {customer.address}<br />
                    {customer.city}, {customer.state}
                  </dd>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  <dd className="text-slate-700">
                    Joined{' '}
                    {new Date(customer.joinedAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-col gap-2">
                <button
                  type="button"
                  className="rounded-full bg-brand-blue px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Email customer
                </button>
                <button
                  type="button"
                  className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 hover:border-brand-blue hover:text-brand-blue"
                >
                  Add note
                </button>
              </div>
            </div>
          </aside>

          <div className="space-y-6 lg:col-span-2">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-xs uppercase tracking-wider text-slate-500">Lifetime spend</div>
                <div className="mt-1 text-xl font-bold text-slate-900 tabular-nums md:text-2xl">
                  {formatNaira(customer.spent)}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-xs uppercase tracking-wider text-slate-500">Orders</div>
                <div className="mt-1 text-xl font-bold text-slate-900 tabular-nums md:text-2xl">
                  {customer.orders}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-xs uppercase tracking-wider text-slate-500">Avg order</div>
                <div className="mt-1 text-xl font-bold text-slate-900 tabular-nums md:text-2xl">
                  {customer.orders === 0
                    ? '—'
                    : formatNaira(Math.round(customer.spent / customer.orders))}
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <header className="border-b border-slate-100 px-5 py-4">
                <h2 className="text-base font-semibold text-slate-900">Order history</h2>
              </header>
              {customerOrders.length === 0 ? (
                <div className="px-5 py-12 text-center text-sm text-slate-500">
                  No orders yet.
                </div>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-5 py-2.5">Order</th>
                      <th className="px-4 py-2.5">Status</th>
                      <th className="hidden px-4 py-2.5 sm:table-cell">Date</th>
                      <th className="px-5 py-2.5 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {customerOrders.map((o) => (
                      <tr key={o.id} className="hover:bg-slate-50">
                        <td className="px-5 py-3">
                          <Link
                            to={`/admin/orders/${o.id}`}
                            className="font-mono text-xs font-semibold text-brand-blue hover:underline"
                          >
                            #{o.id}
                          </Link>
                        </td>
                        <td className="px-4 py-3">
                          <StatusPill status={o.status} />
                        </td>
                        <td className="hidden px-4 py-3 text-slate-600 sm:table-cell">
                          {new Date(o.placedAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
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
      </div>
    </div>
  )
}

export default AdminCustomerDetailPage
