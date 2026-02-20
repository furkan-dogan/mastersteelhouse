import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type IconFeatureItem = {
  icon: LucideIcon
  title: string
  description: string
}

type IconFeatureGridProps = {
  items: IconFeatureItem[]
  columnsClassName?: string
  cardClassName?: string
  iconWrapClassName?: string
  iconClassName?: string
  titleClassName?: string
  descriptionClassName?: string
}

export function IconFeatureGrid({
  items,
  columnsClassName,
  cardClassName,
  iconWrapClassName,
  iconClassName,
  titleClassName,
  descriptionClassName,
}: IconFeatureGridProps) {
  return (
    <div className={cn('grid md:grid-cols-2 gap-8', columnsClassName)}>
      {items.map((item) => {
        const Icon = item.icon
        return (
          <div
            key={item.title}
            className={cn(
              'rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 group',
              cardClassName
            )}
          >
            <div
              className={cn(
                'mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 group-hover:scale-110 transition-transform',
                iconWrapClassName
              )}
            >
              <Icon className={cn('h-8 w-8 text-accent', iconClassName)} />
            </div>
            <h3 className={cn('mb-4 text-2xl font-bold group-hover:text-accent transition-colors', titleClassName)}>
              {item.title}
            </h3>
            <p className={cn('leading-relaxed text-muted-foreground', descriptionClassName)}>{item.description}</p>
          </div>
        )
      })}
    </div>
  )
}
