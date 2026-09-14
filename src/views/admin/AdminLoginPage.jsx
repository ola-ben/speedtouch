'use client'

import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Lock, ShieldAlert, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

function AdminLoginPage() {
  const { signIn, signOut, user, isAuthenticated, isAdmin, loading, isSupabaseConfigured } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const rawFrom = location.state?.from?.pathname || '/admin'
  const from = (!rawFrom || rawFrom.startsWith('/admin/login')) ? '/admin' : rawFrom
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  // 1. Wait for Supabase auth to initialize to prevent flicker
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div
          aria-label="Loading"
          className="h-10 w-10 animate-spin rounded-full border-4 border-brand-blue/20 border-t-brand-blue"
        />
      </div>
    )
  }

  // 2. Only redirect if the current user is CONFIRMED as an admin
  // (Prevents the infinite redirect loop when signed in with a regular customer account)
  if (isAuthenticated && isAdmin) {
    return <Navigate to={from} replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await signIn(email, password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message || 'Sign in failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue-soft">
          <Lock className="h-5 w-5 text-brand-blue" />
        </div>
        <h1 className="mt-5 text-center text-2xl font-semibold tracking-tight text-slate-900">
          Admin sign in
        </h1>
        <p className="mt-2 text-center text-sm text-slate-600">
          Use your Supabase admin credentials to manage services & products.
        </p>

        {/* Inform users if they are logged in with a non-admin account */}
        {isAuthenticated && !isAdmin && (
          <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
            <div className="flex items-start gap-2.5">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <div>
                <p className="font-semibold text-amber-950">Non-admin account active</p>
                <p className="mt-1 leading-relaxed">
                  You are signed in as <strong>{user?.email}</strong>. This account does not have administrator privileges.
                </p>
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-amber-300 bg-white px-3 py-1.5 font-medium text-amber-900 shadow-sm transition hover:bg-amber-100"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign out to switch account
                </button>
              </div>
            </div>
          </div>
        )}

        {!isSupabaseConfigured && (
          <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            Supabase isn't configured. Add{' '}
            <code className="font-mono">VITE_SUPABASE_URL</code> and{' '}
            <code className="font-mono">VITE_SUPABASE_ANON_KEY</code> to your
            <code className="font-mono"> .env</code>, then restart the dev server.
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm">
            <span className="text-xs font-medium text-slate-700">Admin Email</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. speedtouch@gmail.com"
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            />
          </label>
          <label className="block text-sm">
            <span className="text-xs font-medium text-slate-700">Password</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            />
          </label>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting || !isSupabaseConfigured}
            className="w-full rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? 'Signing in…' : 'Sign in as Admin'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          <Link to="/" className="hover:text-brand-blue">
            ← Back to site
          </Link>
        </p>
      </div>
    </section>
  )
}

export default AdminLoginPage
