import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'

type FeaturedMetaItem = {
  icon: LucideIcon
  label: string
}

type ArticleFeaturedCardProps = {
  href: string
  title: string
  excerpt: string
  image: string
  category: string
  badgeText?: string
  meta: FeaturedMetaItem[]
  ctaLabel: string
  imageStyle?: CSSProperties
}

export function ArticleFeaturedCard({
  href,
  title,
  excerpt,
  image,
  category,
  badgeText,
  meta,
  ctaLabel,
  imageStyle,
}: ArticleFeaturedCardProps) {
  return (
    <Link href={href} className="block mb-12 group">
      <div className="grid md:grid-cols-2 gap-8 p-8 rounded-xl border border-border hover:border-accent/60 transition-colors duration-300">
        <div className="relative h-80 rounded-lg overflow-hidden">
          <Image src={image || '/placeholder.svg'} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" style={imageStyle} />
          <div className="absolute left-4 top-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-white/90">
            <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
            {category}
          </div>
          {badgeText ? (
            <div className="absolute right-4 top-4 rounded-md bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground">
              {badgeText}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            {meta.map((item, index) => {
              const Icon = item.icon
              return (
                <span key={`${item.label}-${index}`} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {item.label}
                </span>
              )
            })}
          </div>
          <h2 className="text-3xl font-semibold tracking-tight mb-4 group-hover:text-accent transition-colors">{title}</h2>
          <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{excerpt}</p>
          <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
            {ctaLabel}
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  )
}
