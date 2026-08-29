import type { IconFeatureListItem } from '@/components/icon-feature-list'
import { IconFeatureList } from '@/components/icon-feature-list'
import { MediaBanner } from '@/components/media-banner'

type MediaFeatureSectionProps = {
  title: string
  accent: string
  description: string
  imageSrc: string
  imageAlt: string
  items: IconFeatureListItem[]
  reverse?: boolean
  sectionClassName?: string
  listClassName?: {
    itemClassName?: string
    iconWrapClassName?: string
    iconClassName?: string
    titleClassName?: string
    descriptionClassName?: string
  }
}

export function MediaFeatureSection({
  title,
  accent,
  description,
  imageSrc,
  imageAlt,
  items,
  reverse,
  sectionClassName = 'bg-background',
  listClassName,
}: MediaFeatureSectionProps) {
  return (
    <section className={`py-20 ${sectionClassName}`}>
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className={reverse ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              {title}{' '}
              <span className="text-accent">{accent}</span>
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground md:text-xl">{description}</p>

            <IconFeatureList
              items={items}
              itemClassName={listClassName?.itemClassName}
              iconWrapClassName={listClassName?.iconWrapClassName}
              iconClassName={listClassName?.iconClassName}
              titleClassName={listClassName?.titleClassName}
              descriptionClassName={listClassName?.descriptionClassName}
            />
          </div>

          <div className={reverse ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}>
            <MediaBanner src={imageSrc} alt={imageAlt} heightClassName="h-[600px]" className="shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
