function StockBar({ stock }) {
  if (stock == null) return null
  if (stock === 0) {
    return (
      <div className="mt-1.5">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-rose-700">
          Out of stock
        </div>
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-rose-100">
          <div className="h-full w-full rounded-full bg-rose-500" />
        </div>
      </div>
    )
  }

  const isLow = stock < 10
  // Visual scale: 100 items = full bar, with a small floor so a single item still shows a sliver.
  const fillPct = Math.min(100, Math.max(4, stock))

  return (
    <div className="mt-1.5">
      <div
        className={`text-[10px] font-medium ${
          isLow ? 'text-rose-700' : 'text-slate-600'
        }`}
      >
        {isLow ? `Only ${stock} left` : `${stock} items left`}
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isLow ? 'bg-rose-500' : 'bg-brand-blue'
          }`}
          style={{ width: `${fillPct}%` }}
        />
      </div>
    </div>
  )
}

export default StockBar
