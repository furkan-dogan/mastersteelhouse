import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ResilientImage } from '@/components/resilient-image'

type ProductCategoryCardProps = {
  href: string
  name: string
  area: string
  image: string
  entered: boolean
  delayMs: number
  priority?: boolean
}

export function ProductCategoryCard({
  href,
  name,
  area,
  image,
  entered,
  delayMs,
  priority = false,
}: ProductCategoryCardProps) {
  return (
    <Link
      href={href}
      className={`group relative rounded-xl overflow-hidden bg-card border border-border/60 hover:border-accent/40 transition-[transform,box-shadow,border-color,opacity] duration-300 ease-out hover:shadow-lg ${
        entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
      style={{ transitionDelay: entered ? `${delayMs}ms` : '0ms' }}
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-muted">
        <ResilientImage
          src={image || '/placeholder.svg'}
          alt={name}
          fill
          sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(50vw - 2.25rem), (max-width: 1279px) 315px, (max-width: 1535px) 400px, 485px"
          quality={90}
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="mb-1.5 text-xl font-semibold tracking-tight">{name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium tracking-wide text-accent">{area}</span>
            <ArrowRight className="h-4 w-4 text-white/70 transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
          </div>
        </div>
      </div>
    </Link>
  )
}
