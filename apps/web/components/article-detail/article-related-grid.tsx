import { Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { mediaPlacementImageStyle, type MediaPlacement } from '@/lib/media-placement'

type RelatedItem = {
  slug: string
  title: string
  date: string
  image: string
  category?: string
  imagePosition?: string
  imagePlacement?: MediaPlacement
}

type ArticleRelatedGridProps = {
  title: string
  description?: string
  hrefPrefix: string
  items: RelatedItem[]
  compact?: boolean
}

export function ArticleRelatedGrid({
  title,
  description,
  hrefPrefix,
  items,
  compact = false,
}: ArticleRelatedGridProps) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className={compact ? 'mb-12' : 'text-center mb-12'}>
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            {description ? <p className="text-muted-foreground text-lg">{description}</p> : null}
          </div>

          <div className={`grid md:grid-cols-3 ${compact ? 'gap-6' : 'gap-8'}`}>
            {items.map((item) => (
              <Link key={item.slug} href={`${hrefPrefix}/${item.slug}`} className="group">
                <div className="rounded-xl overflow-hidden border border-border/60 hover:border-accent/40 transition-colors duration-300">
                  <div className={`relative ${compact ? 'h-48' : 'h-56'} overflow-hidden`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                      style={mediaPlacementImageStyle(item.imagePlacement, item.imagePosition)}
                    />
                    {compact ? null : (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                  <div className="p-6">
                    {compact ? (
                      <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {item.date}
                      </p>
                    ) : (
                      <div className="flex items-center gap-3 mb-3">
                        {item.category ? (
                          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent">
                            {item.category}
                          </span>
                        ) : null}
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                      </div>
                    )}
                    <h3
                      className={`font-bold group-hover:text-accent transition-colors ${
                        compact ? 'text-lg' : 'text-xl line-clamp-2'
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
