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
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {slides.map((slide, index) => (
          <button key={slide.id} onClick={() => onGoToSlide(index)} className="group relative" aria-label={`Go to slide ${index + 1}`}>
            <div className="w-16 h-1 rounded-full bg-white/20 backdrop-blur-sm overflow-hidden">
              {index === currentSlide ? (
                <div className="h-full bg-gradient-to-r from-accent to-accent/60 transition-all duration-100 ease-linear" style={{ width: `${progress}%` }} />
              ) : null}
              {index < currentSlide ? <div className="h-full w-full bg-accent/60" /> : null}
            </div>
            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-primary/90 backdrop-blur-xl border border-accent/30 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {slide.highlight}
            </div>
          </button>
        ))}
      </div>

      <div className="absolute bottom-12 right-8 z-30 flex items-center gap-3">
        <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
          <span className="text-white font-mono font-bold text-lg">{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="text-white/50 mx-2">/</span>
          <span className="text-white/70 font-mono">{String(slides.length).padStart(2, '0')}</span>
        </div>
      </div>
    </>
  )
}
