import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import WorkShowcase from '../components/WorkShowcase'

function WorkPage() {
  useDocumentTitle(
    'Our Work In Action',
    'Watch Speedtouch cleaning teams in action. Real cleaning transformations and step-by-step deep clean walkthroughs in Ibadan.',
  )

  return (
    <div className="bg-slate-50/60 py-6 md:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav className="flex items-center gap-1 text-sm text-slate-500">
          <Link to="/" className="hover:text-brand-blue">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-slate-900">Our Work</span>
        </nav>
      </div>
      <WorkShowcase />
    </div>
  )
}

export default WorkPage
