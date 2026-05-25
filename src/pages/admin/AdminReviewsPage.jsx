import { useMemo, useState } from 'react'
import { Check, Star, Trash2, X } from 'lucide-react'
import { useAllReviews } from '../../hooks/useReviews'
import { deleteReview, updateReviewStatus } from '../../lib/reviews'

const STATUS_TABS = ['all', 'pending', 'approved', 'rejected']

const STATUS_STYLE = {
  pending: 'bg-amber-50 text-amber-700',
  approved: 'bg-emerald-50 text-emerald-700',
  rejected: 'bg-rose-50 text-rose-700',
}

function AdminReviewsPage() {
  const { reviews, loading, error, setReviews, refresh } = useAllReviews()
  const [tab, setTab] = useState('pending')
  const [busy, setBusy] = useState(null)
  const [actionError, setActionError] = useState(null)

  const counts = useMemo(() => {
    const c = { all: reviews.length, pending: 0, approved: 0, rejected: 0 }
    reviews.forEach((r) => {
      c[r.status] = (c[r.status] || 0) + 1
    })
    return c
  }, [reviews])

  const filtered = useMemo(() => {
    if (tab === 'all') return reviews
    return reviews.filter((r) => r.status === tab)
  }, [tab, reviews])

  const setStatus = async (id, status) => {
    setBusy(id)
    setActionError(null)
    try {
      const updated = await updateReviewStatus(id, status)
      setReviews((list) => list.map((r) => (r.id === id ? updated : r)))
    } catch (err) {
      setActionError(err.message || 'Update failed')
    } finally {
      setBusy(null)
    }
  }

  const remove = async (id) => {
    if (!window.confirm("Delete this review? This can't be undone.")) return
    setBusy(id)
    setActionError(null)
    try {
      await deleteReview(id)
      setReviews((list) => list.filter((r) => r.id !== id))
    } catch (err) {
      setActionError(err.message || 'Delete failed')
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="px-4 py-8 sm:px-6 md:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Reviews
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Approve customer reviews to publish them on the public site.
            </p>
          </div>
          <button
            type="button"
            onClick={refresh}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-blue hover:text-brand-blue"
          >
            Refresh
          </button>
        </div>

        <div className="no-scrollbar mt-6 -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {STATUS_TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium capitalize transition ${
                tab === t
                  ? 'border-brand-blue bg-brand-blue text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-brand-blue hover:text-brand-blue'
              }`}
            >
              {t}
              <span
                className={`ml-2 rounded-full px-1.5 py-0.5 text-[10px] tabular-nums ${
                  tab === t ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {counts[t] ?? 0}
              </span>
            </button>
          ))}
        </div>

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {actionError && (
          <div className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {actionError}
          </div>
        )}

        {loading ? (
          <div className="mt-10 flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-blue/20 border-t-brand-blue" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-200 py-16 text-center text-sm text-slate-500">
            No {tab === 'all' ? '' : tab} reviews yet.
          </div>
        ) : (
          <ul className="mt-8 space-y-4">
            {filtered.map((r) => (
              <li
                key={r.id}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">{r.name}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                          STATUS_STYLE[r.status] || ''
                        }`}
                      >
                        {r.status}
                      </span>
                    </div>
                    <div className="mt-0.5 text-xs text-slate-500">
                      {[r.location, r.service].filter(Boolean).join(' · ') || '—'}
                      {' · '}
                      {new Date(r.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                      {r.email ? ` · ${r.email}` : ''}
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`h-4 w-4 ${
                          s <= r.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-700">
                  {r.comment}
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 pt-4">
                  {r.status !== 'approved' && (
                    <button
                      type="button"
                      onClick={() => setStatus(r.id, 'approved')}
                      disabled={busy === r.id}
                      className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Approve
                    </button>
                  )}
                  {r.status !== 'rejected' && (
                    <button
                      type="button"
                      onClick={() => setStatus(r.id, 'rejected')}
                      disabled={busy === r.id}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-rose-400 hover:text-rose-600 disabled:opacity-50"
                    >
                      <X className="h-3.5 w-3.5" />
                      Reject
                    </button>
                  )}
                  {r.status !== 'pending' && (
                    <button
                      type="button"
                      onClick={() => setStatus(r.id, 'pending')}
                      disabled={busy === r.id}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-amber-400 hover:text-amber-700 disabled:opacity-50"
                    >
                      Mark pending
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(r.id)}
                    disabled={busy === r.id}
                    aria-label="Delete"
                    className="inline-flex items-center gap-1 rounded-full p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-40"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default AdminReviewsPage
