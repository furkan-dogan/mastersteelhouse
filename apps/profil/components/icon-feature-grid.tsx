import type { LucideIcon } from 'lucide-react'

type GridItem = {
  icon: LucideIcon
  title: string
  description: string
}

type IconFeatureGridProps = {
  items: GridItem[]
}

export function IconFeatureGrid({ items }: IconFeatureGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff9e8] text-[#b88700]">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
          </article>
        )
      })}
    </div>
  )
}
