import type { LucideIcon } from 'lucide-react'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { mediaPlacementImageStyle, type MediaPlacement } from '@/lib/media-placement'

type MetaItem = {
  icon: LucideIcon
  label: string
}

type ArticleHeroProps = {
  image: string
  title: string
  backHref: string
  backLabel: string
  imagePosition?: string
  imagePlacement?: MediaPlacement
  minHeightClassName?: string
  backClassName?: string
  meta: MetaItem[]
}

export function ArticleHero({
  image,
  title,
  backHref,
  backLabel,
  imagePosition,
  imagePlacement,
  minHeightClassName = 'min-h-[560px]',
  backClassName = 'inline-flex items-center gap-2 text-white/90 hover:text-white font-semibold mb-8 hover:gap-3 transition-all backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full',
  meta,
}: ArticleHeroProps) {
  return (
    <section className={`relative h-[70vh] ${minHeightClassName} flex items-end overflow-hidden`}>
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          style={mediaPlacementImageStyle(imagePlacement, imagePosition)}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pb-16">
        <div className="max-w-4xl">
          <Link href={backHref} className={backClassName}>
            <ArrowLeft className="w-4 h-4" />
            {backLabel}
          </Link>

          <h1
            className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance leading-tight"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)' }}
          >
            {title}
          </h1>

          <div className="inline-flex flex-wrap gap-6 text-white px-6 py-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20">
            {meta.map((item) => {
              const Icon = item.icon
              return (
                <span key={`${item.label}-${Icon.displayName ?? Icon.name}`} className="flex items-center gap-2 font-medium">
                  <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
                    <Icon className="w-4 h-4" />
                  </div>
                  {item.label}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
