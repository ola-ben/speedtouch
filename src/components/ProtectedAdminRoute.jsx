// Auth temporarily disabled so the admin pages are publicly accessible for
// design review. Re-enable by uncommenting the original logic below.
function ProtectedAdminRoute({ children }) {
  return children
}

export default ProtectedAdminRoute

/*
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedAdminRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-blue/20 border-t-brand-blue" />
      </div>
    )
  }
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }
  return children
}
*/
