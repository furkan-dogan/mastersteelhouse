'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type Props = {
  images: string[]
}

function getPerView(width: number) {
  if (width < 768) return 1
  if (width < 1024) return 2
  return 3
}

export function NewsGallery({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [perView, setPerView] = useState(3)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const update = () => setPerView(getPerView(window.innerWidth))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxStartIndex = Math.max(0, images.length - perView)

  useEffect(() => {
    if (currentIndex > maxStartIndex) {
      setCurrentIndex(maxStartIndex)
    }
  }, [currentIndex, maxStartIndex])

  const canSlide = images.length > perView

  useEffect(() => {
    if (!canSlide || selectedIndex !== null || isHovered) return

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxStartIndex ? 0 : prev + 1))
    }, 3000)

    return () => window.clearInterval(timer)
  }, [canSlide, isHovered, maxStartIndex, selectedIndex])

  return (
    <>
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {canSlide && (
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/95 p-2 shadow-md disabled:opacity-40"
            aria-label="Önceki görseller"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        <div className="overflow-hidden">
          <div
            className="flex -mx-2 transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${(currentIndex * 100) / perView}%)` }}
          >
            {images.map((img, index) => (
              <div key={`${img}-${index}`} className="shrink-0 px-2" style={{ width: `${100 / perView}%` }}>
                <button
                  onClick={() => setSelectedIndex(index)}
                  className="relative h-64 w-full overflow-hidden rounded-2xl border group text-left"
                >
                  <Image
                    src={img}
                    alt={`Galeri ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {canSlide && (
          <button
            onClick={() => setCurrentIndex((prev) => Math.min(maxStartIndex, prev + 1))}
            disabled={currentIndex >= maxStartIndex}
            className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/95 p-2 shadow-md disabled:opacity-40"
            aria-label="Sonraki görseller"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Kapat"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            onClick={(event) => {
              event.stopPropagation()
              setSelectedIndex((prev) => {
                if (prev === null) return 0
                return prev === 0 ? images.length - 1 : prev - 1
              })
            }}
            className="absolute left-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Önceki"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="relative h-full max-h-[85vh] w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <Image
              src={images[selectedIndex]}
              alt={`Galeri ${selectedIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>

          <button
            onClick={(event) => {
              event.stopPropagation()
              setSelectedIndex((prev) => {
                if (prev === null) return 0
                return prev === images.length - 1 ? 0 : prev + 1
              })
            }}
            className="absolute right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Sonraki"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  )
}
