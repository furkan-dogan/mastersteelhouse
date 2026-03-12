import type { HeroSlide } from '@/lib/content/hero-slides'

type SlideIndicatorsProps = {
  slides: HeroSlide[]
  currentSlide: number
  progress: number
  onGoToSlide: (index: number) => void
}

export function SlideIndicators({ slides, currentSlide, progress, onGoToSlide }: SlideIndicatorsProps) {
  return (
    <>
      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 sm:bottom-10 sm:gap-3">
        {slides.map((slide, index) => (
          <button key={slide.id} onClick={() => onGoToSlide(index)} className="group relative" aria-label={`Go to slide ${index + 1}`}>
            <div className="h-1 w-10 overflow-hidden rounded-full bg-white/20 backdrop-blur-sm sm:w-16">
              {index === currentSlide ? (
                <div className="h-full bg-gradient-to-r from-accent to-accent/60 transition-all duration-100 ease-linear" style={{ width: `${progress}%` }} />
              ) : null}
              {index < currentSlide ? <div className="h-full w-full bg-accent/60" /> : null}
            </div>
            <div className="pointer-events-none absolute bottom-full left-1/2 mb-3 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-accent/30 bg-primary/90 px-3 py-1.5 text-xs text-white opacity-0 backdrop-blur-xl transition-opacity group-hover:opacity-100 lg:block">
              {slide.highlight}
            </div>
          </button>
        ))}
      </div>

      <div className="absolute bottom-8 right-4 z-30 hidden items-center gap-3 sm:bottom-10 sm:right-6 md:flex xl:right-8">
        <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur-xl xl:px-5 xl:py-3">
          <span className="text-white font-mono font-bold text-lg">{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="text-white/50 mx-2">/</span>
          <span className="text-white/70 font-mono">{String(slides.length).padStart(2, '0')}</span>
        </div>
      </div>
    </>
  )
}
