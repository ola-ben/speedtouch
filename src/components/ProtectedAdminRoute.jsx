import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedAdminRoute({ children }) {
  const { isAuthenticated, loading, isSupabaseConfigured } = useAuth()
  const location = useLocation()

  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-12">
        <div className="max-w-md rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
          <h2 className="text-base font-semibold text-amber-900">
            Supabase isn't connected
          </h2>
          <p className="mt-2">
            Add <code className="font-mono">VITE_SUPABASE_URL</code> and{' '}
            <code className="font-mono">VITE_SUPABASE_ANON_KEY</code> to your{' '}
            <code className="font-mono">.env</code>, then restart the dev server.
          </p>
          <p className="mt-2">
            See <code className="font-mono">supabase/README.md</code> for the
            full walkthrough.
          </p>
        </div>
      </div>
    )
  }

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

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return children
}

export default ProtectedAdminRoute
