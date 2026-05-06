import { Link, useParams } from 'react-router-dom'
import { ChevronRight, Mail, Phone, MapPin, CreditCard } from 'lucide-react'
import { findOrder, STATUS_META } from '../../data/orders'
import { findCustomer } from '../../data/customers'

function formatNaira(n) {
  return `₦${Number(n).toLocaleString('en-NG')}`
}

function StatusPill({ status }) {
  const meta = STATUS_META[status] || STATUS_META.pending
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${meta.bg} ${meta.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  )
}

function AdminOrderDetailPage() {
  const { id } = useParams()
  const order = findOrder(id)
  const customer = order ? findCustomer(order.customerId) : null

  if (!order) {
    return (
      <div className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Order not found</h1>
          <Link
            to="/admin/orders"
            className="mt-4 inline-block rounded-full bg-brand-blue px-5 py-2.5 text-sm font-medium text-white"
          >
            Back to orders
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
          <Link to="/admin/orders" className="transition hover:text-brand-blue">Orders</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-slate-900">#{order.id}</span>
        </nav>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-mono text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                #{order.id}
              </h1>
              <StatusPill status={order.status} />
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Placed{' '}
              {new Date(order.placedAt).toLocaleString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-blue hover:text-brand-blue"
            >
              Print
            </button>
            <button
              type="button"
              className="rounded-full bg-brand-blue px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              Mark fulfilled
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <header className="border-b border-slate-100 px-5 py-4">
                <h2 className="text-base font-semibold text-slate-900">Items</h2>
              </header>
              <ul className="divide-y divide-slate-100">
                {order.items.map((it) => (
                  <li key={it.productId} className="flex items-center gap-4 px-5 py-4">
                    <Link
                      to={`/products/${it.productId}`}
                      target="_blank"
                      rel="noopener"
                      className="block h-14 w-14 shrink-0 overflow-hidden rounded-md bg-slate-100"
                    >
                      <div className="h-full w-full bg-gradient-to-br from-brand-blue-soft to-brand-pink-soft" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/products/${it.productId}`}
                        target="_blank"
                        rel="noopener"
                        className="line-clamp-2 text-sm font-medium text-slate-900 hover:text-brand-blue"
                      >
                        {it.name}
                      </Link>
                      <div className="mt-0.5 text-xs text-slate-500">
                        {formatNaira(it.price)} × {it.quantity}
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-slate-900 tabular-nums">
                      {formatNaira(it.price * it.quantity)}
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-2 border-t border-slate-100 px-5 py-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-600">Subtotal</dt>
                  <dd className="tabular-nums">{formatNaira(order.subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-600">Shipping</dt>
                  <dd className="tabular-nums">
                    {order.shipping === 0 ? 'Free' : formatNaira(order.shipping)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-2 text-base font-semibold">
                  <dt>Total</dt>
                  <dd className="tabular-nums">{formatNaira(order.total)}</dd>
                </div>
              </dl>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-slate-900">Customer</h3>
              {customer ? (
                <Link
                  to={`/admin/customers/${customer.id}`}
                  className="mt-3 flex items-center gap-3 rounded-lg p-2 -m-2 transition hover:bg-slate-50"
                >
                  <img
                    src={customer.avatar}
                    alt=""
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-slate-900">
                      {customer.name}
                    </div>
                    <div className="truncate text-xs text-slate-500">
                      {customer.orders} order{customer.orders === 1 ? '' : 's'} · {formatNaira(customer.spent)} spent
                    </div>
                  </div>
                </Link>
              ) : (
                <p className="mt-3 text-sm text-slate-500">{order.customerName}</p>
              )}
              {customer && (
                <div className="mt-4 space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    <span className="truncate">{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    {customer.phone}
                  </div>
                </div>
              )}
            </div>

            {customer && (
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Shipping address</h3>
                <div className="mt-3 flex gap-2 text-sm text-slate-700">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                  <div>
                    <div>{customer.address}</div>
                    <div>{customer.city}, {customer.state}</div>
                    <div>Nigeria</div>
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-slate-900">Payment</h3>
              <div className="mt-3 flex items-center gap-2 text-sm text-slate-700">
                <CreditCard className="h-3.5 w-3.5 text-slate-400" />
                {order.paymentMethod}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default AdminOrderDetailPage
