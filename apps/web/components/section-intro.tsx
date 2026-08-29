import { cn } from '@/lib/utils'

type SectionIntroProps = {
  badge?: string
  title: string
  accent?: string
  description?: string
  centered?: boolean
  className?: string
  containerClassName?: string
  titleClassName?: string
  descriptionClassName?: string
}

export function SectionIntro({
  badge,
  title,
  accent,
  description,
  centered = true,
  className,
  containerClassName,
  titleClassName,
  descriptionClassName,
}: SectionIntroProps) {
  return (
    <div className={cn('container mx-auto px-4', className)}>
      <div
        className={cn(
          'mb-16 max-w-4xl',
          centered ? 'mx-auto text-center' : '',
          containerClassName
        )}
      >
        {badge ? (
          <div className={cn('mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-accent', centered ? 'justify-center' : '')}>
            <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
            {badge}
          </div>
        ) : null}
        <h1 className={cn('mb-6 text-4xl font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl', titleClassName)}>
          {title}
          {accent ? (
            <>
              {' '}
              <span className="text-accent">{accent}</span>
            </>
          ) : null}
        </h1>
        {description ? (
          <p
            className={cn(
              'text-lg leading-relaxed text-balance text-muted-foreground md:text-xl',
              descriptionClassName
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  )
}
