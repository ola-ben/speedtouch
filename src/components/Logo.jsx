import { Link } from 'react-router-dom'

function Logo({ wordmark = true, className = '' }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        className="h-9 w-9 shrink-0 drop-shadow-[0_4px_12px_rgba(37,99,235,0.25)]"
        aria-label="Speedtouch logo"
      >
        <defs>
          <linearGradient id="speedtouch-mark" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#2563eb" />
            <stop offset="1" stopColor="#f472b6" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="11" fill="url(#speedtouch-mark)" />
        <path
          d="M20 9 L21.9 17.4 L29.5 20 L21.9 22.6 L20 31 L18.1 22.6 L10.5 20 L18.1 17.4 Z"
          fill="white"
        />
        <circle cx="29" cy="11" r="1.6" fill="white" opacity="0.9" />
        <circle cx="11.5" cy="29" r="1" fill="white" opacity="0.7" />
      </svg>
      {wordmark && (
        <span className="text-xl font-bold tracking-tight text-slate-900">
          Speed<span className="text-brand-blue">touch</span>
        </span>
      )}
    </Link>
  )
}

export default Logo
