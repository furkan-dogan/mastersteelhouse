import type { LucideIcon } from 'lucide-react'

type ListItem = {
  icon: LucideIcon
  title: string
  description: string
}

type IconFeatureListProps = {
  items: ListItem[]
}

export function IconFeatureList({ items }: IconFeatureListProps) {
  return (
    <div className="space-y-8">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <article key={item.title} className="flex gap-4">
            <div className="mt-1 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fff9e8] text-[#b88700]">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-slate-600">{item.description}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
