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
      <article className="h-full rounded-xl overflow-hidden border border-border hover:border-accent/60 transition-colors duration-300">
        <div className="relative h-56 overflow-hidden">
          <Image
            src={image || '/placeholder.svg'}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            style={imageStyle}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
          <div className="absolute left-4 top-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-white/90">
            <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
            {category}
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

          <h3 className="text-xl font-semibold tracking-tight mb-3 line-clamp-2 group-hover:text-accent transition-colors">{title}</h3>

          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{excerpt}</p>

          <div className="flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all">
            {ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </article>
    </Link>
  )
}
