import { ChevronLeft, ChevronRight } from 'lucide-react'

type NavigationControlsProps = {
  isAnimating: boolean
  onPrev: () => void
  onNext: () => void
}

export function NavigationControls({ isAnimating, onPrev, onNext }: NavigationControlsProps) {
  return (
    <div className="absolute left-4 bottom-28 z-30 flex flex-row gap-3 xl:left-8 xl:bottom-auto xl:top-1/2 xl:-translate-y-1/2 xl:flex-col xl:gap-4">
      <button
        onClick={onPrev}
        disabled={isAnimating}
        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:border-accent/50 transition-all duration-300 disabled:opacity-50 hover:scale-110 group md:w-14 md:h-14"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={onNext}
        disabled={isAnimating}
        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:border-accent/50 transition-all duration-300 disabled:opacity-50 hover:scale-110 group md:w-14 md:h-14"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  )
}
