import { Check } from 'lucide-react'

type HighlightsGridProps = {
  items: string[]
}

export function HighlightsGrid({ items }: HighlightsGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((highlight) => (
        <div key={highlight} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-accent/50 transition-colors">
          <div className="p-1 rounded-full bg-accent/10">
            <Check className="w-4 h-4 text-accent" />
          </div>
          <span className="text-sm font-medium">{highlight}</span>
        </div>
      ))}
    </div>
  )
}
