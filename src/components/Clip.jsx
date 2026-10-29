import { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// A short muted gameplay loop that only plays while on screen. Without a clip,
// or for visitors with reduced motion, it shows the still image instead.
export default function Clip({ clip, image, className }) {
  const videoRef = useRef(null)
  const [still] = useState(prefersReducedMotion)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {})
      else video.pause()
    }, { threshold: 0.25 })
    io.observe(video)
    return () => io.disconnect()
  }, [clip])

  if (!clip || still) {
    return <img className={className} src={image.src} alt={image.alt} loading="lazy" />
  }

  return (
    <video
      ref={videoRef}
      className={className}
      src={clip}
      poster={image.src}
      aria-label={image.alt}
      muted
      loop
      playsInline
      preload="none"
    />
  )
}
