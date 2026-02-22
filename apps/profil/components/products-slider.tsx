'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { profileProducts } from '@/lib/products'

export function ProductsSlider() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'left' ? -400 : 400, behavior: 'smooth' })
    setTimeout(checkScroll, 300)
  }

  const ProductCard = ({ product, i }: { product: (typeof profileProducts)[0]; i: number }) => (
    <motion.div
      key={product.slug}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
    >
      <Link href={`/urunler/${product.slug}`}>
        <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#151d28] transition-all hover:border-[#eab308]/40 hover:shadow-xl hover:shadow-[#eab308]/5">
          <div className="relative aspect-[4/3] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e14] via-transparent to-transparent" />
            <span className="absolute left-4 top-4 rounded-lg bg-[#eab308] px-3 py-1 text-xs font-semibold text-black">
              {product.shortName}
            </span>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-white">{product.name}</h3>
            <p className="mt-2 text-sm text-slate-400">{product.subtitle}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-[#eab308] transition group-hover:underline">
              Detaylı incele →
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  )

  return (
    <section id="urunler" className="scroll-mt-20 relative overflow-hidden bg-[#0f1419] py-20">
      <div className="pattern-grid absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-[#eab308]">Ürün Kataloğu</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">3 Profil, Tüm İhtiyaçlar</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
            İnşaat projeleriniz için alçıpan köşe, kaba sıva ve tavan U-C profilleri. Galvanizli çelik, yüksek kalite.
          </p>
        </motion.div>

        {/* Desktop: grid */}
        <div className="hidden grid-cols-1 gap-8 md:grid md:grid-cols-3">
          {profileProducts.map((product, i) => (
            <ProductCard key={product.slug} product={product} i={i} />
          ))}
        </div>

        {/* Mobile/Tablet: horizontal slider */}
        <div className="relative md:hidden">
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {profileProducts.map((product, i) => (
              <div key={product.slug} className="min-w-[85vw] shrink-0 snap-center sm:min-w-[340px]">
                <ProductCard product={product} i={i} />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-[#151d28] p-2.5 text-white ${
              !canScrollLeft ? 'opacity-30' : ''
            }`}
            disabled={!canScrollLeft}
            aria-label="Sol"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-[#151d28] p-2.5 text-white ${
              !canScrollRight ? 'opacity-30' : ''
            }`}
            disabled={!canScrollRight}
            aria-label="Sağ"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/urunler"
            className="rounded-lg border border-[#eab308]/50 px-6 py-2.5 font-semibold text-[#eab308] transition hover:bg-[#eab308]/10"
          >
            Tüm Ürünler
          </Link>
        </div>
      </div>
    </section>
  )
}
