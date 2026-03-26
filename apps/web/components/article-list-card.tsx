import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'

type ArticleMetaItem = {
  icon: LucideIcon
  label: string
}

type ArticleListCardProps = {
  href: string
  title: string
  excerpt: string
  image: string
  category: string
  meta: ArticleMetaItem[]
  ctaLabel: string
  imageStyle?: CSSProperties
}

export function ArticleListCard({
  href,
  title,
  excerpt,
  image,
  category,
  meta,
  ctaLabel,
  imageStyle,
}: ArticleListCardProps) {
  return (
    <Link href={href} className="group">
      <article className="h-full rounded-2xl overflow-hidden bg-card border border-border hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-2">
        <div className="relative h-56 overflow-hidden">
          <Image src={image || '/placeholder.svg'} alt={title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" style={imageStyle} />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold shadow-lg">
              {category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
            {meta.map((item, index) => {
              const Icon = item.icon
              return (
                <span key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </span>
              )
            })}
          </div>

          <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-accent transition-colors">{title}</h3>

          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{excerpt}</p>

          <div className="flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
            {ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </article>
    </Link>
  )
}
