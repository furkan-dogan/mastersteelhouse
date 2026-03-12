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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
            <div className="rounded-xl bg-accent/10 p-2">
              <Icon className="w-5 h-5 text-accent" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="font-semibold break-words">{item.value}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
