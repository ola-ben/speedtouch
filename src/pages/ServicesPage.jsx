import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import Services from '../components/Services'

function ServicesPage() {
  useDocumentTitle(
    'Our cleaning services',
    'Pick the clean that fits your space. Speedtouch offers standard home, deep home, move in / out, and commercial office cleaning services.',
  )

  return (
    <div className="bg-slate-50/60 py-6 md:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav className="flex items-center gap-1 text-sm text-slate-500">
          <Link to="/" className="hover:text-brand-blue">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-slate-900">Services</span>
        </nav>
      </div>
      <Services />
    </div>
  )
}

export default ServicesPage
