const items = [
  'Standard Clean',
  'Deep Clean',
  'Move In / Out',
  'Office Clean',
  'Post-Construction',
  'Window Clean',
  'Same-Day Service',
  'Eco-Friendly Products',
]

function Marquee() {
  return (
    <div
      aria-label="Services we offer"
      className="relative overflow-hidden border-y border-slate-200 bg-slate-900 py-3 md:py-5"
    >
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-6 px-4 md:gap-12 md:px-6"
          >
            {items.map((item) => (
              <li
                key={`${copy}-${item}`}
                className="flex items-center gap-6 whitespace-nowrap font-serif text-sm font-medium text-white md:gap-12 md:text-2xl"
              >
                <span>{item}</span>
                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-brand-pink-deep md:h-1.5 md:w-1.5"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

export default Marquee
