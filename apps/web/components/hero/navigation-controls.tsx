import { ChevronLeft, ChevronRight } from 'lucide-react'

type NavigationControlsProps = {
  isAnimating: boolean
  onPrev: () => void
  onNext: () => void
}

export function NavigationControls({ isAnimating, onPrev, onNext }: NavigationControlsProps) {
  return (
    <div className="absolute left-4 bottom-24 z-30 flex flex-row gap-3 sm:bottom-28 xl:left-8 xl:bottom-auto xl:top-1/2 xl:-translate-y-1/2 xl:flex-col xl:gap-4">
      <button
        onClick={onPrev}
        disabled={isAnimating}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition-all duration-300 group hover:scale-110 hover:border-accent/50 hover:bg-white/20 disabled:opacity-50 md:h-14 md:w-14"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5 md:h-6 md:w-6" />
      </button>
      <button
        onClick={onNext}
        disabled={isAnimating}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition-all duration-300 group hover:scale-110 hover:border-accent/50 hover:bg-white/20 disabled:opacity-50 md:h-14 md:w-14"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 md:h-6 md:w-6" />
      </button>
    </div>
  )
}
