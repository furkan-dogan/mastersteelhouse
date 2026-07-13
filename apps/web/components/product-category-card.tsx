import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

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
      className={`group relative rounded-3xl overflow-hidden bg-card border border-border hover:border-accent/50 transition-[transform,box-shadow,border-color,opacity] duration-700 ease-out hover:shadow-2xl hover:shadow-accent/20 ${
        entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
      style={{ transitionDelay: entered ? `${delayMs}ms` : '0ms' }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={image || '/placeholder.svg'}
          alt={name}
          fill
          sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(50vw - 2.25rem), 377px"
          quality={82}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">{name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-accent">{area}</span>
            <div className="w-10 h-10 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
