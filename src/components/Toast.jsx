import { CheckCircle2, AlertCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'

function Toast() {
  const { toast } = useCart()
  const isError = toast?.type === 'error'

  return (
    <div
      role="status"
      aria-live={isError ? 'assertive' : 'polite'}
      className={`pointer-events-none fixed bottom-5 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 transition-all duration-300 sm:bottom-8 ${
        toast ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      {toast && (
        <div
          className={`pointer-events-auto flex items-start gap-2.5 rounded-2xl px-4 py-3 text-sm font-medium text-white shadow-xl ${
            isError ? 'bg-rose-600' : 'bg-slate-900'
          }`}
        >
          {isError ? (
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          ) : (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  )
}

export default Toast
