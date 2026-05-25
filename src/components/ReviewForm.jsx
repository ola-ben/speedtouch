import { useEffect, useState } from 'react'
import { CheckCircle2, Star, X } from 'lucide-react'
import { submitReview } from '../lib/reviews'

const SERVICES = [
  'Standard Clean',
  'Deep Clean',
  'Move In / Out',
  'Office Clean',
  'Post-Construction',
  'Window Clean',
  'Other',
]

function ReviewForm({ open, onClose }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState('')
  const [service, setService] = useState('')
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (rating < 1 || rating > 5) {
      setError('Please choose a rating between 1 and 5.')
      return
    }
    setSubmitting(true)
    try {
      await submitReview({
        name,
        email,
        location,
        rating,
        comment,
        service,
        honeypot,
      })
      setDone(true)
      // Reset for next time after a beat.
      setTimeout(() => {
        setName('')
        setEmail('')
        setLocation('')
        setService('')
        setRating(5)
        setComment('')
      }, 200)
    } catch (err) {
      setError(err.message || 'Could not submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      onClick={onClose}
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 backdrop-blur-sm sm:items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Leave a review"
        className="relative w-full max-w-lg overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          <X className="h-5 w-5" />
        </button>

        {done ? (
          <div className="px-6 py-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 className="h-7 w-7 text-emerald-500" />
            </div>
            <h2 className="mt-5 font-serif text-2xl font-semibold tracking-tight text-slate-900">
              Thanks for the kind words!
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              We'll read it and publish shortly. (We moderate to keep things
              honest.)
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-7">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-slate-900">
              Leave a review
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Tell other customers what we got right (or wrong). Your name
              shows publicly; email is just so we can follow up if needed.
            </p>

            <div className="mt-5 space-y-4">
              <Field label="Your name" required>
                <input
                  type="text"
                  required
                  maxLength={80}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" hint="Optional — never shown publicly.">
                  <input
                    type="email"
                    maxLength={120}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Location" hint="e.g. Bodija, Ibadan">
                  <input
                    type="text"
                    maxLength={80}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="Service used" hint="Optional.">
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className={inputClass}
                >
                  <option value="">— Choose —</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Rating" required>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      onMouseEnter={() => setHoverRating(n)}
                      onMouseLeave={() => setHoverRating(0)}
                      aria-label={`${n} star${n > 1 ? 's' : ''}`}
                      className="rounded p-0.5 transition hover:scale-110"
                    >
                      <Star
                        className={`h-7 w-7 ${
                          n <= (hoverRating || rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-slate-600 tabular-nums">
                    {rating} / 5
                  </span>
                </div>
              </Field>

              <Field label="Your review" required>
                <textarea
                  required
                  rows={4}
                  maxLength={800}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What was it like? Anything we should know?"
                  className={inputClass}
                />
              </Field>

              {/* Honeypot: visually hidden, only bots fill this */}
              <label className="sr-only" aria-hidden="true">
                Leave this field empty
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </label>
            </div>

            {error && (
              <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:border-brand-blue hover:text-brand-blue"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? 'Sending…' : 'Submit review'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

const inputClass =
  'mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20'

function Field({ label, hint, required, children }) {
  return (
    <label className="block text-sm">
      <span className="text-xs font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </span>
      {children}
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </label>
  )
}

export default ReviewForm
