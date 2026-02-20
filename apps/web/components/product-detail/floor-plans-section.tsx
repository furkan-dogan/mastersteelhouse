'use client'

import Image from 'next/image'

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
  onOpenImage: () => void
}

export function FloorPlansSection({
  productName,
  plans,
  selectedIndex,
  fallbackImage,
  onSelectPlan,
  onOpenImage,
}: FloorPlansSectionProps) {
  return (
    <div className="max-w-5xl mx-auto">
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

      <div className="relative rounded-3xl overflow-hidden bg-card border border-border shadow-2xl">
        <div className="relative aspect-[16/10]">
          <Image
            src={plans[selectedIndex]?.image ?? fallbackImage}
            alt={`${productName} - ${plans[selectedIndex]?.name ?? 'Kat Plani'}`}
            fill
            className="object-cover"
          />
          <button
            onClick={onOpenImage}
            className="absolute top-4 right-4 px-4 py-2 rounded-full bg-accent/90 text-accent-foreground text-sm font-medium hover:scale-105 transition-transform"
          >
            Buyut
          </button>
        </div>
      </div>
    </div>
  )
}
