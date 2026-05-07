import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pencil, Plus, Star, Trash2 } from 'lucide-react'
import { deleteService, fetchServices } from '../../lib/services'
import { deleteServiceImage } from '../../lib/storage'
import { isSupabaseConfigured } from '../../lib/supabase'

function AdminServicesPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(null)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const list = await fetchServices()
        if (!cancelled) setServices(list)
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load services')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const handleDelete = async (service) => {
    if (!window.confirm(`Delete "${service.name}"? This can't be undone.`)) return
    setBusy(service.id)
    try {
      await deleteService(service.id)
      if (service.image) {
        try {
          await deleteServiceImage(service.image)
        } catch {
          // best-effort
        }
      }
      setServices((list) => list.filter((s) => s.id !== service.id))
    } catch (err) {
      window.alert(err.message || 'Delete failed')
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="px-4 py-8 sm:px-6 md:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Services
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage your service offerings — names, prices, durations, and images.
            </p>
          </div>
          <Link
            to="/admin/services/new"
            className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            New service
          </Link>
        </div>

        {!isSupabaseConfigured && (
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Supabase isn't connected. Add{' '}
            <code className="font-mono">VITE_SUPABASE_URL</code> and{' '}
            <code className="font-mono">VITE_SUPABASE_ANON_KEY</code> to your environment.
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-blue/20 border-t-brand-blue" />
            </div>
          ) : services.length === 0 ? (
            <div className="px-6 py-16 text-center text-sm text-slate-500">
              No services yet.{' '}
              <Link to="/admin/services/new" className="font-medium text-brand-blue hover:underline">
                Add your first service
              </Link>
              .
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">Service</th>
                  <th className="hidden px-4 py-3 sm:table-cell">Tag</th>
                  <th className="hidden px-4 py-3 md:table-cell">Duration</th>
                  <th className="px-4 py-3 text-right">Price</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {services.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-slate-100">
                          {s.image && (
                            <img
                              src={s.image}
                              alt=""
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="line-clamp-1 font-medium text-slate-900">
                              {s.name}
                            </span>
                            {s.popular && (
                              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            )}
                          </div>
                          <div className="font-mono text-[11px] text-slate-400">
                            {s.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <span className="rounded-full bg-brand-pink-soft px-2.5 py-0.5 text-xs font-medium text-brand-pink-deep">
                        {s.tag}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 text-slate-600 md:table-cell">
                      {s.duration || '—'}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-900 tabular-nums">
                      ₦{s.price.toLocaleString('en-NG')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/admin/services/${s.id}/edit`}
                          aria-label={`Edit ${s.name}`}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-brand-blue-soft hover:text-brand-blue"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(s)}
                          disabled={busy === s.id}
                          aria-label={`Delete ${s.name}`}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
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

export default AdminServicesPage
