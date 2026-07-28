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
  
  const { user, sendOtp, verifyOtp, signInWithGoogleIdToken, signOut, isAuthenticated, isSupabaseConfigured } = useAuth()
  const navigate = useNavigate()
  
  // Auth State
  const [authError, setAuthError] = useState(null)
  const [authSubmitting, setAuthSubmitting] = useState(false)
  const [email, setEmail] = useState('')
  const [otpToken, setOtpToken] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  
  const googleBtnRef = useRef(null)
  const otpInputRef = useRef(null)

  const handleSendOtp = async (e) => {
    if (e) e.preventDefault()
    setAuthError(null)
    setAuthSubmitting(true)
    try {
      await sendOtp(email)
      setOtpSent(true)
    } catch (err) {
      setAuthError(err.message || 'Failed to send verification code.')
    } finally {
      setAuthSubmitting(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setAuthError(null)
    setAuthSubmitting(true)
    try {
      await verifyOtp(email, otpToken)
    } catch (err) {
      setAuthError(err.message || 'Invalid or expired code. Please try again.')
    } finally {
      setAuthSubmitting(false)
    }
  }
  
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
  }, [isAuthenticated, signInWithGoogleIdToken, otpSent])

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

  // Unauthenticated: OTP Sign In Form
  if (!isAuthenticated) {
    return (
      <section className="flex min-h-[75vh] items-center justify-center bg-slate-50/60 px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue-soft text-brand-blue">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="mt-5 text-center text-2xl font-semibold tracking-tight text-slate-900">
            {otpSent ? 'Verify your email' : 'Sign in or register'}
          </h1>
          <p className="mt-2 text-center text-xs text-slate-500 leading-relaxed">
            {otpSent
              ? `We sent a 6-digit verification code to ${email}`
              : 'Enter your email to receive a secure one-time passcode.'}
          </p>

          {!otpSent ? (
            <>
              <form onSubmit={handleSendOtp} className="mt-6 space-y-4">
                <label className="block text-sm">
                  <span className="text-xs font-medium text-slate-700">Email address</span>
                  <input
                    type="email"
                    required
                    placeholder="your email address"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  />
                </label>

                {authError && (
                  <div className="w-full rounded-xl bg-red-50 p-3 text-xs text-red-700 text-center" role="alert">
                    {authError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={authSubmitting || !isSupabaseConfigured}
                  className="w-full rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                >
                  {authSubmitting ? 'Sending code…' : 'Send verification code'}
                </button>
              </form>

              <div className="relative my-6 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100"></div>
                </div>
                <span className="relative bg-white px-3 text-xs text-slate-400 font-medium">
                  Or continue with
                </span>
              </div>

              <div className="flex justify-center w-full min-h-[44px]">
                <div ref={googleBtnRef}></div>
              </div>
            </>
          ) : (
            <>
              <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
                <div className="block text-sm">
                  <span className="text-xs font-medium text-slate-700 block text-center mb-3">Enter 6-Digit Code</span>
                  <div 
                    onClick={() => otpInputRef.current?.focus()}
                    className="relative flex justify-center gap-2.5 cursor-pointer py-1"
                  >
                    {[0, 1, 2, 3, 4, 5].map((index) => {
                      const char = otpToken[index] || '0'
                      const isTyped = index < otpToken.length
                      const isCurrent = index === otpToken.length
                      return (
                        <div
                          key={index}
                          className={`w-11 h-12 rounded-xl border flex items-center justify-center text-lg font-bold transition-all duration-150 ${
                            isTyped 
                              ? 'border-brand-blue bg-white text-slate-900 shadow-sm ring-1 ring-brand-blue/10' 
                              : isCurrent
                                ? 'border-brand-blue bg-white text-slate-300 ring-2 ring-brand-blue/20 animate-pulse'
                                : 'border-slate-200 bg-slate-50 text-slate-300'
                          }`}
                        >
                          {char}
                        </div>
                      )
                    })}
                    <input
                      ref={otpInputRef}
                      type="text"
                      required
                      maxLength={6}
                      pattern="[0-9]*"
                      inputMode="numeric"
                      value={otpToken}
                      onChange={(e) => setOtpToken(e.target.value.replace(/[^0-9]/g, ''))}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </div>
                </div>

                {authError && (
                  <div className="w-full rounded-xl bg-red-50 p-3 text-xs text-red-700 text-center" role="alert">
                    {authError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={authSubmitting}
                  className="w-full rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                >
                  {authSubmitting ? 'Verifying…' : 'Verify & Sign In'}
                </button>
              </form>

              <div className="mt-6 text-center flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => handleSendOtp(null)}
                  disabled={authSubmitting}
                  className="text-xs font-medium text-brand-blue hover:underline cursor-pointer disabled:opacity-50"
                >
                  Resend verification code
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false)
                    setOtpToken('')
                    setAuthError(null)
                  }}
                  className="text-xs font-medium text-slate-500 hover:underline cursor-pointer"
                >
                  Change email address
                </button>
              </div>
            </>
          )}
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
