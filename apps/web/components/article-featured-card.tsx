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
      <div className="grid md:grid-cols-2 gap-8 p-8 rounded-3xl bg-card border-2 border-accent/20 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500">
        <div className="relative h-80 rounded-2xl overflow-hidden">
          <Image src={image || '/placeholder.svg'} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" style={imageStyle} />
          <div className="absolute top-4 left-4">
            <span className="px-4 py-2 rounded-full bg-accent text-accent-foreground text-xs font-semibold shadow-lg">
              {category}
            </span>
          </div>
          {badgeText ? (
            <div className="absolute top-4 right-4">
              <span className="px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-bold shadow-xl">
                {badgeText}
              </span>
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
          <h2 className="text-3xl font-bold mb-4 group-hover:text-accent transition-colors">{title}</h2>
          <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{excerpt}</p>
          <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
            {ctaLabel}
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  )
}
