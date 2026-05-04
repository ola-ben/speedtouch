import { useEffect, useRef, useState } from 'react'

const computeInitialShown = (mobileSkip) => {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
  if (mobileSkip && window.matchMedia('(max-width: 639px)').matches) return true
  return false
}

function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
  mobileSkip = false,
}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(() => computeInitialShown(mobileSkip))

  useEffect(() => {
    if (shown) return
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          obs.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [shown])

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </Tag>
  )
}

export default Reveal
