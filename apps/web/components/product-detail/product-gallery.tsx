'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type ProductGalleryProps = {
  productName: string
  images: string[]
  currentIndex: number
  onPrev: () => void
  onNext: () => void
  onOpen: (index: number) => void
}

export function ProductGallery({
  productName,
  images,
  currentIndex,
  onPrev,
  onNext,
  onOpen,
}: ProductGalleryProps) {
  return (
    <div>
      <div className="relative h-[420px] sm:h-[480px] lg:h-[500px] rounded-3xl overflow-hidden group">
        <Image
          src={images[currentIndex]}
          alt={`${productName} - Gorsel ${currentIndex + 1}`}
          fill
          className="object-cover transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-accent/90 text-accent-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg z-10"
          aria-label="Onceki fotografa git"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-accent/90 text-accent-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg z-10"
          aria-label="Sonraki fotografa git"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-black/70 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          {currentIndex + 1} / {images.length}
        </div>

        <button
          onClick={() => onOpen(currentIndex)}
          className="absolute bottom-6 left-6 px-4 py-2 rounded-full bg-accent/90 text-accent-foreground text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105"
        >
          Tam Ekran Goruntule
        </button>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-4">
        {images.map((img, index) => (
          <button
            key={img + index}
            className="relative h-20 rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-accent transition-all duration-300 hover:scale-105 bg-muted"
            onClick={() => onOpen(index)}
            aria-label={`${index + 1}. gorseli ac`}
          >
            <Image
              src={img}
              alt={`${productName} - Gorsel ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 150px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
