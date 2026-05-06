import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

function AdminLoginPage() {
  const { signIn, isAuthenticated, isSupabaseConfigured } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/admin'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  if (isAuthenticated) return <Navigate to={from} replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await signIn(email, password)
      navigate(from, { replace: true })
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
          Use your Supabase admin credentials to manage products.
        </p>

        {!isSupabaseConfigured && (
          <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            Supabase isn't configured. Add{' '}
            <code className="font-mono">VITE_SUPABASE_URL</code> and{' '}
            <code className="font-mono">VITE_SUPABASE_ANON_KEY</code> to your
            <code className="font-mono"> .env</code>, then restart the dev server.
            See <Link to="/" className="underline">supabase/README.md</Link>.
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm">
            <span className="text-xs font-medium text-slate-700">Email</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            {submitting ? 'Signing in…' : 'Sign in'}
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
