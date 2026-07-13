'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type ProductGalleryProps = {
  productName: string
  images: string[]
  currentIndex: number
  onPrev: () => void
  onNext: () => void
  onSelect: (index: number) => void
  onOpen: (index: number) => void
}

export function ProductGallery({
  productName,
  images,
  currentIndex,
  onPrev,
  onNext,
  onSelect,
  onOpen,
}: ProductGalleryProps) {
  return (
    <div>
      <div
        className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-3xl border border-border bg-muted/30"
        onClick={() => onOpen(currentIndex)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onOpen(currentIndex)
          }
        }}
      >
        <Image
          src={images[currentIndex]}
          alt={`${productName} - Görsel ${currentIndex + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 590px"
          quality={88}
          priority
          className="object-contain"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={(event) => {
                event.stopPropagation()
                onPrev()
              }}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/65 p-2.5 text-white opacity-100 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-accent hover:text-accent-foreground md:left-4 md:p-3 md:opacity-0 md:group-hover:opacity-100"
              aria-label="Önceki fotoğrafa git"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(event) => {
                event.stopPropagation()
                onNext()
              }}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/65 p-2.5 text-white opacity-100 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-accent hover:text-accent-foreground md:right-4 md:p-3 md:opacity-0 md:group-hover:opacity-100"
              aria-label="Sonraki fotoğrafa git"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm md:bottom-6 md:right-6 md:px-4 md:py-2 md:text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-4">
        {images.map((img, index) => (
          <button
            key={img + index}
            className={`relative h-20 cursor-pointer overflow-hidden rounded-xl border-2 bg-muted transition-[border-color,transform] duration-300 hover:scale-[1.03] hover:border-accent ${
              currentIndex === index ? 'border-accent' : 'border-transparent'
            }`}
            onClick={() => onSelect(index)}
            aria-label={`${index + 1}. görseli seç`}
            aria-pressed={currentIndex === index}
          >
            <Image
              src={img}
              alt={`${productName} - Görsel ${index + 1}`}
              fill
              sizes="80px"
              quality={75}
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
