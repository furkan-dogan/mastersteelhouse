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
          <div className="mb-4 inline-block">
            <span className="rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
              {badge}
            </span>
          </div>
        ) : null}
        <h1 className={cn('mb-6 text-4xl font-bold text-balance md:text-5xl lg:text-6xl', titleClassName)}>
          {title}
          {accent ? (
            <>
              {' '}
              <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">{accent}</span>
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
