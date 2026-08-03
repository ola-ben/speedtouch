import { useState } from 'react'
import { Loader2 } from 'lucide-react'

function ImageWithLoader({ src, alt, className = '', imgClassName = '', ...props }) {
  const [loaded, setLoaded] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)

  // Reset loaded state if image source changes
  if (src !== currentSrc) {
    setCurrentSrc(src)
    setLoaded(false)
  }

  return (
    <div className={`relative overflow-hidden bg-slate-100/60 ${className}`}>
      {/* Loading Shimmer and Spinner */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 animate-pulse">
          <Loader2 className="h-5 w-5 animate-spin text-brand-blue/50" />
        </div>
      )}

      {/* Image */}
      {src ? (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={`transition-opacity duration-300 ${imgClassName} ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      ) : null}
    </div>
  )
}

export default ImageWithLoader
