import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronRight, ImagePlus, Loader2 } from 'lucide-react'
import { categories } from '../../data/products'
import {
  createProduct,
  fetchProductById,
  slugify,
  updateProduct,
} from '../../lib/products'
import { uploadProductImage } from '../../lib/storage'
import { isSupabaseConfigured } from '../../lib/supabase'

const editableCategories = categories.filter((c) => c.id !== 'all')

const emptyForm = {
  id: '',
  name: '',
  description: '',
  category: 'sprays',
  image: '',
  price: '',
  original: '',
  stock: '',
}

function AdminProductFormPage() {
  const { id: paramId } = useParams()
  const isEdit = Boolean(paramId)
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(isEdit)
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [touchedId, setTouchedId] = useState(false)

  useEffect(() => {
    if (!isEdit) return
    fetchProductById(paramId)
      .then((p) => {
        if (!p) {
          setError('Product not found')
          return
        }
        setForm({
          id: p.id,
          name: p.name,
          description: p.description ?? '',
          category: p.category,
          image: p.image ?? '',
          price: String(p.price ?? ''),
          original: p.original != null ? String(p.original) : '',
          stock: String(p.stock ?? ''),
        })
        setTouchedId(true)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [isEdit, paramId])

  const setField = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleNameChange = (e) => {
    const name = e.target.value
    setForm((f) => ({
      ...f,
      name,
      id: !isEdit && !touchedId ? slugify(name) : f.id,
    }))
  }

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError(null)
    try {
      const { url } = await uploadProductImage(file, form.id || slugify(form.name))
      setForm((f) => ({ ...f, image: url }))
    } catch (err) {
      setError(err.message || 'Image upload failed')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const payload = {
      id: form.id || slugify(form.name),
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category,
      image: form.image,
      price: Number(form.price),
      original: form.original ? Number(form.original) : null,
      stock: Number(form.stock),
    }

    if (!payload.name) {
      setError('Name is required')
      setSubmitting(false)
      return
    }
    if (!payload.id) {
      setError('Slug is required')
      setSubmitting(false)
      return
    }
    if (!payload.image) {
      setError('Please upload a product image')
      setSubmitting(false)
      return
    }

    try {
      if (isEdit) await updateProduct(paramId, payload)
      else await createProduct(payload)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message || 'Save failed')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-blue/20 border-t-brand-blue" />
      </div>
    )
  }

  return (
    <section className="bg-slate-50 py-10 md:py-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <nav className="flex items-center gap-1 text-sm text-slate-500">
          <Link to="/admin" className="transition hover:text-brand-blue">
            Admin
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-slate-900">
            {isEdit ? 'Edit product' : 'New product'}
          </span>
        </nav>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          {isEdit ? 'Edit product' : 'New product'}
        </h1>

        {!isSupabaseConfigured && (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Preview mode — Supabase isn't connected, so saves and image uploads
            won't persist. Connect Supabase to enable.
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
        >
          <Field label="Name" required>
            <input
              type="text"
              required
              value={form.name}
              onChange={handleNameChange}
              className={inputClass}
            />
          </Field>

          <Field label="Slug (URL)" hint="Lowercase, no spaces. Auto-filled from name.">
            <input
              type="text"
              required
              disabled={isEdit}
              value={form.id}
              onChange={(e) => {
                setTouchedId(true)
                setForm((f) => ({ ...f, id: slugify(e.target.value) }))
              }}
              className={`${inputClass} disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500`}
            />
          </Field>

          <Field label="Category" required>
            <select
              required
              value={form.category}
              onChange={setField('category')}
              className={inputClass}
            >
              {editableCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Description">
            <textarea
              rows={4}
              value={form.description}
              onChange={setField('description')}
              className={inputClass}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Price (₦)" required>
              <input
                type="number"
                min="0"
                required
                value={form.price}
                onChange={setField('price')}
                className={inputClass}
              />
            </Field>
            <Field label="Original price (₦)" hint="Optional. Used for strikethrough.">
              <input
                type="number"
                min="0"
                value={form.original}
                onChange={setField('original')}
                className={inputClass}
              />
            </Field>
            <Field label="Stock" required>
              <input
                type="number"
                min="0"
                required
                value={form.stock}
                onChange={setField('stock')}
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Product image" required>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                {form.image ? (
                  <img src={form.image} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-slate-300">
                    <ImagePlus className="h-8 w-8" />
                  </div>
                )}
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                    <Loader2 className="h-5 w-5 animate-spin text-brand-blue" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-brand-blue file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700"
                />
                <p className="mt-2 text-xs text-slate-500">
                  PNG / JPG / WebP. Stored in the <code>product-images</code> bucket.
                </p>
                {form.image && (
                  <p className="mt-1 break-all text-[10px] text-slate-400">
                    {form.image}
                  </p>
                )}
              </div>
            </div>
          </Field>

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
            <Link
              to="/admin"
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-brand-blue hover:text-brand-blue"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting || uploading}
              className="rounded-full bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Saving…' : isEdit ? 'Save changes' : 'Create product'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20'

function Field({ label, hint, required, children }) {
  return (
    <label className="block text-sm">
      <span className="text-xs font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </span>
      <div className="mt-1">{children}</div>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </label>
  )
}

export default AdminProductFormPage
