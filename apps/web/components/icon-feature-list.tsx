import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type IconFeatureListItem = {
  icon: LucideIcon
  title: string
  description: string
}

type IconFeatureListProps = {
  items: IconFeatureListItem[]
  itemClassName?: string
  iconWrapClassName?: string
  iconClassName?: string
  titleClassName?: string
  descriptionClassName?: string
}

export function IconFeatureList({
  items,
  itemClassName,
  iconWrapClassName,
  iconClassName,
  titleClassName,
  descriptionClassName,
}: IconFeatureListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <div
            key={item.title}
            className={cn(
              'flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-accent/50',
              itemClassName
            )}
          >
            <div
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10',
                iconWrapClassName
              )}
            >
              <Icon className={cn('h-6 w-6 text-accent', iconClassName)} />
            </div>
            <div>
              <h3 className={cn('mb-1 font-semibold', titleClassName)}>{item.title}</h3>
              <p className={cn('text-sm text-muted-foreground', descriptionClassName)}>{item.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
