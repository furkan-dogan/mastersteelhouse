'use client'

import { ResilientImage } from '@/components/resilient-image'

type FloorPlan = {
  name: string
  image: string
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
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              selectedIndex === index
                ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/30'
                : 'bg-card border border-border hover:border-accent text-muted-foreground hover:text-foreground'
            }`}
          >
            {plan.name}
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
        <button
          type="button"
          onClick={() => onOpenImage(selectedImage)}
          className="relative block aspect-[16/9] w-full cursor-zoom-in overflow-hidden bg-muted/25"
          aria-label="Kat planını büyüt"
        >
          <ResilientImage
            src={selectedImage}
            alt={`${productName} - ${plans[selectedIndex]?.name ?? 'Kat Planı'}`}
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
