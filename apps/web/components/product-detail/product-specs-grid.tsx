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
    <div className="grid grid-cols-1 gap-x-8 gap-y-0 border-t border-border/60 sm:grid-cols-2">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <div key={item.label} className="flex items-center gap-3 border-b border-border/60 py-3.5">
            <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="ml-auto text-sm font-medium text-foreground">{item.value}</p>
          </div>
        )
      })}
    </div>
  )
}
