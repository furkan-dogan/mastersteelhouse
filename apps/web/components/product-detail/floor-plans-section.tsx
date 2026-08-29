'use client'

import { ResilientImage } from '@/components/resilient-image'

type FloorPlan = {
  name: string
  image: string
}

// A handful of CMS records still carry the untouched default label from the
// floor-plan editor. Showing it verbatim reads as unfinished content, so
// display a neutral generic name instead — this only changes the label, not
// the underlying data or which plan it points to.
function displayPlanName(name: string) {
  return name.trim().toLowerCase() === 'yeni kat' ? 'Kat Planı' : name
}

type FloorPlansSectionProps = {
  productName: string
  plans: FloorPlan[]
  selectedIndex: number
  fallbackImage: string
  onSelectPlan: (index: number) => void
  onOpenImage: (imageUrl: string) => void
}

export function FloorPlansSection({
  productName,
  plans,
  selectedIndex,
  fallbackImage,
  onSelectPlan,
  onOpenImage,
}: FloorPlansSectionProps) {
  const selectedImage = plans[selectedIndex]?.image ?? fallbackImage

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="flex gap-2 mb-6 justify-center">
        {plans.map((plan, index) => (
          <button
            key={plan.name}
            onClick={() => onSelectPlan(index)}
            className={`px-5 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 ${
              selectedIndex === index
                ? 'bg-accent text-accent-foreground'
                : 'border border-border/60 text-muted-foreground hover:text-foreground'
            }`}
          >
            {displayPlanName(plan.name)}
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
        <button
          type="button"
          onClick={() => onOpenImage(selectedImage)}
          className="relative block aspect-[16/9] w-full cursor-zoom-in overflow-hidden bg-muted/25"
          aria-label="Kat planını büyüt"
        >
          <ResilientImage
            src={selectedImage}
            alt={`${productName} - ${displayPlanName(plans[selectedIndex]?.name ?? 'Kat Planı')}`}
            fill
            sizes="(max-width: 896px) calc(100vw - 2rem), 896px"
            quality={90}
            className="object-contain"
          />
        </button>
      </div>
    </div>
  )
}
