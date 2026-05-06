import { CheckCircle2 } from 'lucide-react'
import { useCart } from '../context/CartContext'

function Toast() {
  const { toast } = useCart()

  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 transition-all duration-300 sm:bottom-8 ${
        toast ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      {toast && (
        <div className="pointer-events-auto flex max-w-sm items-center gap-2.5 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-xl">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span className="truncate">{toast.message}</span>
        </div>
      )}
    </div>
  )
}

export default Toast
