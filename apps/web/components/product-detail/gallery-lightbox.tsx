'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

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
  if (!isOpen || selectedIndex === null) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={onClose}>
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
        aria-label="Galeriyi kapat"
      >
        <X className="w-6 h-6" />
      </button>

      <button
        onClick={(event) => {
          event.stopPropagation()
          onPrev()
        }}
        className="absolute left-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
        aria-label="Onceki gorsel"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={(event) => {
          event.stopPropagation()
          onNext()
        }}
        className="absolute right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
        aria-label="Sonraki gorsel"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      <div className="relative w-full max-w-6xl h-full max-h-[85vh]" onClick={(event) => event.stopPropagation()}>
        <Image
          src={images[selectedIndex]}
          alt={`${productName} - Gorsel ${selectedIndex + 1}`}
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
}
