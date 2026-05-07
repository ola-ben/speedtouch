import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight, Mail, Phone, MapPin, CreditCard, Store, Truck } from 'lucide-react'
import { STATUS_META } from '../../data/orders'
import { ORDER_STATUSES, updateOrderStatus } from '../../lib/orders'
import { useOrder } from '../../hooks/useOrders'

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
  const { order, loading, error, setOrder } = useOrder(id)
  const [updating, setUpdating] = useState(false)
  const [updateError, setUpdateError] = useState(null)

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-blue/20 border-t-brand-blue" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-2xl rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      </div>
    )
  }

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

  const handleStatusChange = async (next) => {
    setUpdating(true)
    setUpdateError(null)
    try {
      const updated = await updateOrderStatus(order.id, next)
      setOrder(updated)
    } catch (err) {
      setUpdateError(err.message || 'Status update failed')
    } finally {
      setUpdating(false)
    }
  }

  const isPickup = order.deliveryMethod === 'pickup'
  const addr = order.shippingAddress

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
            <div className="flex flex-wrap items-center gap-3">
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
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-xs font-medium text-slate-600">Status</label>
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={updating}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 capitalize focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 disabled:opacity-50"
            >
              {ORDER_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_META[s]?.label ?? s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {updateError && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
            {updateError}
          </p>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <header className="border-b border-slate-100 px-5 py-4">
                <h2 className="text-base font-semibold text-slate-900">Items</h2>
              </header>
              <ul className="divide-y divide-slate-100">
                {order.items.map((it, i) => (
                  <li key={`${it.productId ?? 'item'}-${i}`} className="flex items-center gap-4 px-5 py-4">
                    {it.productId ? (
                      <Link
                        to={`/products/${it.productId}`}
                        target="_blank"
                        rel="noopener"
                        className="block h-14 w-14 shrink-0 overflow-hidden rounded-md bg-slate-100"
                      >
                        {it.image ? (
                          <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full bg-linear-to-br from-brand-blue-soft to-brand-pink-soft" />
                        )}
                      </Link>
                    ) : (
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md bg-slate-100">
                        {it.image && (
                          <img src={it.image} alt="" className="h-full w-full object-cover" />
                        )}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="line-clamp-2 text-sm font-medium text-slate-900">
                        {it.name}
                      </div>
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
                  <dt className="text-slate-600">{isPickup ? 'Pickup' : 'Shipping'}</dt>
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
              <dl className="mt-3 space-y-3 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-slate-500">Name</dt>
                  <dd className="mt-0.5 font-medium text-slate-900">
                    {order.customerName || '—'}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-slate-500">Email</dt>
                  <dd className="mt-0.5 flex items-center gap-2 text-slate-900">
                    <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                    <a
                      href={`mailto:${order.customerEmail}`}
                      className="truncate hover:text-brand-blue"
                    >
                      {order.customerEmail || '—'}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-slate-500">Phone</dt>
                  <dd className="mt-0.5 flex items-center gap-2 text-slate-900">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                    {order.customerPhone ? (
                      <a
                        href={`tel:${order.customerPhone}`}
                        className="hover:text-brand-blue"
                      >
                        {order.customerPhone}
                      </a>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                {isPickup ? (
                  <Store className="h-4 w-4 text-brand-blue" />
                ) : (
                  <Truck className="h-4 w-4 text-brand-blue" />
                )}
                Delivery
              </h3>
              <dl className="mt-3 space-y-3 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-slate-500">Method</dt>
                  <dd className="mt-0.5">
                    <span className="inline-flex rounded-full bg-brand-blue-soft px-2.5 py-0.5 text-xs font-medium text-brand-blue">
                      {isPickup ? 'Pick up at station' : 'Home delivery'}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-slate-500">
                    {isPickup ? 'Pickup location' : 'Shipping address'}
                  </dt>
                  <dd className="mt-1 flex gap-2 text-slate-700">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                    {isPickup ? (
                      <div>
                        <div className="font-medium text-slate-900">Speedtouch — Bodija</div>
                        <div>7 Oluyoro St, off Awolowo Avenue</div>
                        <div>Old Bodija, Lagelu 000234</div>
                        <div>Oyo, Nigeria</div>
                      </div>
                    ) : addr ? (
                      <div>
                        <div>{addr.line1 || '—'}</div>
                        <div>
                          {addr.city}
                          {addr.state ? `, ${addr.state}` : ''}{' '}
                          {addr.postal}
                        </div>
                        <div>{addr.country ?? 'Nigeria'}</div>
                      </div>
                    ) : (
                      <span className="text-slate-500">No address on file.</span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-slate-900">Payment</h3>
              <dl className="mt-3 space-y-3 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-slate-500">Method</dt>
                  <dd className="mt-0.5 flex items-center gap-2 capitalize text-slate-900">
                    <CreditCard className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                    {order.paymentMethod || 'card'}
                  </dd>
                </div>
                {order.paymentReference && (
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-500">
                      Paystack reference
                    </dt>
                    <dd className="mt-0.5 break-all font-mono text-xs text-slate-900">
                      {order.paymentReference}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs uppercase tracking-wider text-slate-500">Status</dt>
                  <dd className="mt-0.5 text-slate-900">
                    <StatusPill status={order.status} />
                  </dd>
                </div>
              </dl>
              <p className="mt-3 text-[11px] text-slate-400">
                Card numbers are never stored — handled by the payment processor.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default AdminOrderDetailPage
