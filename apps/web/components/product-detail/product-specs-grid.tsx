'use client'

import type { LucideIcon } from 'lucide-react'

export type ProductSpecItem = {
  icon: LucideIcon
  label: string
  value: string
}

type ProductSpecsGridProps = {
  items: ProductSpecItem[]
}

export function ProductSpecsGrid({ items }: ProductSpecsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <div key={item.label} className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border">
            <div className="p-2 rounded-xl bg-accent/10">
              <Icon className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="font-semibold">{item.value}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
