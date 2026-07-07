import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, LogOut, Package, Calendar, Tag, ChevronDown, ChevronUp, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { fetchCustomerOrders } from '../lib/orders'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const STATUS_CLASSES = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200/50',
  paid: 'bg-emerald-50 text-emerald-700 border-emerald-200/50',
  fulfilled: 'bg-blue-50 text-blue-700 border-blue-200/50',
  shipped: 'bg-indigo-50 text-indigo-700 border-indigo-200/50',
  delivered: 'bg-green-50 text-green-700 border-green-200/50',
  cancelled: 'bg-rose-50 text-rose-700 border-rose-200/50',
  refunded: 'bg-slate-50 text-slate-700 border-slate-200/50',
}

function AccountPage() {
  useDocumentTitle('My Account', 'Sign up, sign in, or track your orders with Speedtouch.')
  
  const { user, signInWithGoogleIdToken, signOut, isAuthenticated, isSupabaseConfigured } = useAuth()
  const navigate = useNavigate()
  
  // Auth State
  const [authError, setAuthError] = useState(null)
  const [authSubmitting, setAuthSubmitting] = useState(false)
  
  const googleBtnRef = useRef(null)
  
  // Order History State
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [ordersError, setOrdersError] = useState(null)
  const [expandedOrders, setExpandedOrders] = useState({})

  // Fetch orders when user is authenticated
  useEffect(() => {
    if (!isAuthenticated || !user?.id) return

    let active = true
    setOrdersLoading(true)
    setOrdersError(null)

    fetchCustomerOrders(user.id)
      .then((list) => {
        if (active) setOrders(list)
      })
      .catch((err) => {
        if (active) setOrdersError(err.message || 'Failed to fetch your orders')
      })
      .finally(() => {
        if (active) setOrdersLoading(false)
      })

    return () => {
      active = false
    }
  }, [isAuthenticated, user])

  useEffect(() => {
    if (isAuthenticated) return

    const initGoogleGsi = () => {
      /* global google */
      if (typeof google !== 'undefined' && googleBtnRef.current) {
        try {
          google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '503549812427-u9qi8llrjfbd26cu2v79gbkol50pa2o.apps.googleusercontent.com',
            callback: async (response) => {
              setAuthError(null)
              setAuthSubmitting(true)
              try {
                await signInWithGoogleIdToken(response.credential)
              } catch (err) {
                setAuthError(err.message || 'Google sign in failed.')
              } finally {
                setAuthSubmitting(false)
              }
            },
          })
          google.accounts.id.renderButton(googleBtnRef.current, {
            theme: 'outline',
            size: 'large',
            shape: 'pill',
            width: googleBtnRef.current.parentElement?.clientWidth || 320,
          })
        } catch (e) {
          console.error('Failed to initialize Google Sign-In:', e)
        }
      }
    }

    initGoogleGsi()

    const interval = setInterval(() => {
      if (typeof google !== 'undefined') {
        initGoogleGsi()
        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [isAuthenticated, signInWithGoogleIdToken])

  const toggleOrder = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }))
  }

  // Not configured state
  if (!isSupabaseConfigured) {
    return (
      <section className="mx-auto max-w-xl px-6 py-20 text-center">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
          <h2 className="text-base font-semibold">Supabase isn't connected</h2>
          <p className="mt-2">
            Accounts require Supabase connection. Please verify your environment keys.
          </p>
        </div>
      </section>
    )
  }

  // Unauthenticated: Sign In or Register Form
  if (!isAuthenticated) {
    return (
      <section className="flex min-h-[75vh] items-center justify-center bg-slate-50/60 px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue-soft text-brand-blue">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="mt-5 text-center text-2xl font-semibold tracking-tight text-slate-900">
            Sign in to your account
          </h1>
          <p className="mt-2 text-center text-xs text-slate-500">
            Access your order history and details across all your devices using Google Sign-In.
          </p>

          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="flex justify-center w-full min-h-[44px]">
              <div ref={googleBtnRef}></div>
            </div>
            
            {authSubmitting && (
              <p className="text-xs text-slate-500 animate-pulse">
                Please wait, authenticating…
              </p>
            )}

            {authError && (
              <div className="w-full rounded-xl bg-red-50 p-3 text-xs text-red-700 text-center" role="alert">
                {authError}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // Authenticated Dashboard
  return (
    <section className="bg-slate-50/60 py-10 md:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        {/* User Card */}
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue text-white">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Welcome back, {user.user_metadata?.full_name || user.email.split('@')[0]}
              </h1>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>

        {/* Orders Block */}
        <div className="mt-8">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-slate-700" />
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Order History</h2>
          </div>

          {ordersLoading ? (
            <div className="mt-6 flex h-40 items-center justify-center rounded-3xl border border-slate-100 bg-white shadow-xs">
              <div className="h-8 w-8 animate-spin rounded-full border-3 border-brand-blue/20 border-t-brand-blue" />
            </div>
          ) : ordersError ? (
            <div className="mt-6 rounded-3xl border border-red-100 bg-red-50 p-6 text-sm text-red-700 shadow-xs">
              {ordersError}
            </div>
          ) : orders.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-center shadow-xs">
              <Package className="mx-auto h-12 w-12 text-slate-300" />
              <h3 className="mt-4 text-sm font-semibold text-slate-900">No orders found</h3>
              <p className="mt-1 text-xs text-slate-500">
                You haven't placed any orders yet. Explore our shop or request cleanings to begin!
              </p>
              <div className="mt-5 flex justify-center gap-3">
                <Link
                  to="/products"
                  className="rounded-full bg-brand-blue px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition"
                >
                  Shop Products
                </Link>
                <Link
                  to="/services"
                  className="rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-semibold text-slate-700 hover:border-brand-blue hover:text-brand-blue transition"
                >
                  Book a Clean
                </Link>
              </div>
            </div>
          ) : (
            <ul className="mt-6 space-y-4">
              {orders.map((order) => {
                const isExpanded = !!expandedOrders[order.id]
                return (
                  <li
                    key={order.id}
                    className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xs"
                  >
                    {/* Header info */}
                    <div
                      onClick={() => toggleOrder(order.id)}
                      className="flex cursor-pointer flex-wrap items-center justify-between gap-4 p-5 hover:bg-slate-50/50 select-none"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-semibold text-slate-900">
                            #{order.id}
                          </span>
                          <span
                            className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                              STATUS_CLASSES[order.status] || 'bg-slate-50 text-slate-700 border-slate-200/50'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(order.placedAt).toLocaleDateString('en-NG', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-slate-700">
                            <Tag className="h-3.5 w-3.5 text-slate-400" />
                            ₦{Number(order.total).toLocaleString('en-NG')}
                          </span>
                        </div>
                      </div>

                      <div className="text-slate-400">
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </div>
                    </div>

                    {/* Detailed info */}
                    {isExpanded && (
                      <div className="border-t border-slate-100 bg-slate-50/40 p-5 text-sm">
                        <div className="grid gap-6 md:grid-cols-2">
                          
                          {/* Items summary */}
                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                              Items Ordered
                            </h3>
                            <ul className="mt-3 space-y-3">
                              {order.items.map((it, idx) => (
                                <li key={idx} className="flex gap-3">
                                  {it.image && (
                                    <img
                                      src={it.image}
                                      alt=""
                                      className="h-10 w-10 shrink-0 rounded-lg object-cover border border-slate-200 bg-white"
                                    />
                                  )}
                                  <div>
                                    <div className="font-semibold text-slate-800">{it.name}</div>
                                    <div className="text-xs text-slate-500">
                                      {it.quantity} × ₦{Number(it.price).toLocaleString('en-NG')}
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Shipment details */}
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Delivery Details
                              </h3>
                              <p className="mt-1 text-slate-700">
                                {order.deliveryMethod === 'pickup'
                                  ? 'Pick up at Old Bolaji station'
                                  : 'Home delivery'}
                              </p>
                              {order.shippingAddress && (
                                <p className="mt-1.5 rounded-xl border border-slate-100 bg-white p-3 text-xs text-slate-600">
                                  {order.shippingAddress.line1}
                                  <br />
                                  {order.shippingAddress.city}, {order.shippingAddress.state}
                                </p>
                              )}
                            </div>

                            <div className="border-t border-slate-100 pt-3 text-xs">
                              <div className="flex justify-between py-1 text-slate-500">
                                <span>Subtotal</span>
                                <span>₦{Number(order.subtotal).toLocaleString('en-NG')}</span>
                              </div>
                              <div className="flex justify-between py-1 text-slate-500">
                                <span>Shipping / Delivery Fee</span>
                                <span>
                                  {order.shipping > 0
                                    ? `₦${Number(order.shipping).toLocaleString('en-NG')}`
                                    : order.deliveryMethod === 'pickup'
                                    ? 'Free'
                                    : 'TBD (paid on delivery)'}
                                </span>
                              </div>
                              <div className="flex justify-between py-1.5 font-semibold text-slate-900 border-t border-slate-100 mt-1.5 text-sm">
                                <span>Total Paid</span>
                                <span>₦{Number(order.total).toLocaleString('en-NG')}</span>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

export default AccountPage
