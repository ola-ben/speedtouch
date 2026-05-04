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
      className="relative overflow-hidden border-y border-slate-200 bg-slate-900 py-5"
    >
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-12 px-6"
          >
            {items.map((item) => (
              <li
                key={`${copy}-${item}`}
                className="flex items-center gap-12 whitespace-nowrap font-serif text-2xl font-medium text-white md:text-3xl"
              >
                <span>{item}</span>
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-brand-pink-deep"
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
