import Link from 'next/link'

export const metadata = {
  title: 'Page Not Found | Speedtouch Autos',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center px-4 text-center">
      <span className="text-6xl font-extrabold text-blue-600">404</span>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-base text-slate-600">
        Sorry, we could not find the page or auto part you were looking for.
      </p>
      <div className="mt-8 flex items-center gap-4">
        <Link
          href="/"
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/products"
          className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    </div>
  )
}
