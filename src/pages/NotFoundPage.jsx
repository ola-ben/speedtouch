import { Link } from 'react-router-dom'
import { Sparkles, Home, ArrowLeft } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function NotFoundPage() {
  useDocumentTitle(
    'Page Not Found',
    'Sorry, the page you are looking for does not exist on Speedtouch.',
  )

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-6 py-12 text-center md:py-24">
      <div className="mx-auto max-w-md">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-pink-soft px-3 py-1 text-xs font-semibold text-brand-pink-deep animate-pulse">
          <Sparkles className="h-3.5 w-3.5" />
          <span>404 Error</span>
        </div>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Looks spotless, but empty.
        </h1>
        <p className="mt-4 text-base text-slate-600">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let us help you find your way back.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 border-t border-slate-100 pt-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Or visit our main sections
          </h2>
          <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <li>
              <Link to="/services" className="font-medium text-brand-blue hover:underline">
                Cleaning Services
              </Link>
            </li>
            <li>
              <Link to="/products" className="font-medium text-brand-blue hover:underline">
                Supplies & Products
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="font-medium text-brand-blue hover:underline">
                Pricing Plans
              </Link>
            </li>
            <li>
              <Link to="/faq" className="font-medium text-brand-blue hover:underline">
                FAQs
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage
