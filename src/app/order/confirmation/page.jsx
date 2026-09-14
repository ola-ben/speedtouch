import { Suspense } from 'react'
import OrderConfirmationPage from '../../../views/OrderConfirmationPage'

export const metadata = {
  title: 'Order Confirmation | Speedtouch Autos',
  robots: { index: false },
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center text-slate-400">Loading order details...</div>}>
      <OrderConfirmationPage />
    </Suspense>
  )
}
