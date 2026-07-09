import { useEffect, useState } from 'react'

type SmartImageProps = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  fallbackSrc?: string
  priority?: boolean
  width?: number
  height?: number
  placeholderLabel?: string
}

export function SmartImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  fallbackSrc,
  priority = false,
  width,
  height,
  placeholderLabel = 'GCC IMAGE LOADING',
}: SmartImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let alive = true
    setLoaded(false)
    setCurrentSrc(src)

    const image = new Image()
    image.src = src

    const reveal = async () => {
      try { await image.decode?.() } catch { /* decode may fail for cached or older image formats */ }
      if (alive) setLoaded(true)
    }

    if (image.complete) reveal()
    else {
      image.onload = reveal
      image.onerror = () => {
        if (!alive) return
        if (fallbackSrc && fallbackSrc !== src) setCurrentSrc(fallbackSrc)
        else setLoaded(true)
      }
    }

    return () => { alive = false }
  }, [src, fallbackSrc])

  return <div className={`smart-image ${loaded ? 'is-loaded' : ''} ${className}`}>
    <div className="smart-image-placeholder" aria-hidden="true"><span>{placeholderLabel}</span></div>
    <img
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc)
        else setLoaded(true)
      }}
      className={imgClassName}
    />
  </div>
}
