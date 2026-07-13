'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'

type GalleryLightboxProps = {
  isOpen: boolean
  selectedIndex: number | null
  productName: string
  images: string[]
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function GalleryLightbox({
  isOpen,
  selectedIndex,
  productName,
  images,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrev()
      if (event.key === 'ArrowRight') onNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose, onNext, onPrev])

  if (!isOpen || selectedIndex === null) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 sm:p-4"
      onClick={onClose}
      onTouchStart={(event) => {
        const touch = event.touches[0]
        touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current
        const touch = event.changedTouches[0]
        touchStart.current = null
        if (!start || !touch) return

        const deltaX = touch.clientX - start.x
        const deltaY = touch.clientY - start.y
        if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY)) return
        if (deltaX > 0) onPrev()
        else onNext()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${productName} görsel galerisi`}
    >
      <button
        onClick={onClose}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 sm:right-6 sm:top-6 sm:p-3"
        aria-label="Galeriyi kapat"
      >
        <X className="w-6 h-6" />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(event) => {
              event.stopPropagation()
              onPrev()
            }}
            className="absolute left-2 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:left-6 sm:p-3"
            aria-label="Önceki görsel"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(event) => {
              event.stopPropagation()
              onNext()
            }}
            className="absolute right-2 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:right-6 sm:p-3"
            aria-label="Sonraki görsel"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      <div className="relative w-full max-w-6xl h-full max-h-[85vh]" onClick={(event) => event.stopPropagation()}>
        <Image
          src={images[selectedIndex]}
          alt={`${productName} - Görsel ${selectedIndex + 1}`}
          fill
          sizes="(max-width: 1280px) calc(100vw - 2rem), 1152px"
          quality={90}
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
}
