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
              'rounded-xl border border-border/60 bg-card p-8 transition-colors duration-300 hover:border-accent/40 group',
              cardClassName
            )}
          >
            <div
              className={cn(
                'mb-6 flex h-14 w-14 items-center justify-center rounded-md border border-border/60',
                iconWrapClassName
              )}
            >
              <Icon className={cn('h-7 w-7 text-accent', iconClassName)} />
            </div>
            <h3 className={cn('mb-4 text-2xl font-semibold tracking-tight group-hover:text-accent transition-colors', titleClassName)}>
              {item.title}
            </h3>
            <p className={cn('leading-relaxed text-muted-foreground', descriptionClassName)}>{item.description}</p>
          </div>
        )
      })}
    </div>
  )
}
