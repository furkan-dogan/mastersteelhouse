'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { profileProducts } from '@/lib/products'

export function HeroSlider() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % profileProducts.length), 5000)
    return () => clearInterval(t)
  }, [])

  const product = profileProducts[active]

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        {profileProducts.map((p, i) =>
          i === active ? (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#f3f4f1]/95 via-[#f3f4f1]/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#f3f4f1]/90 via-transparent to-transparent" />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      <div className="relative z-10 flex h-full flex-col justify-center px-6 lg:px-12 xl:px-20">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-[#b88700]">{product.shortName}</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">{product.name}</h1>
              <p className="mt-6 max-w-xl text-lg text-slate-700">{product.subtitle}</p>
              <Link
                href={`/urunler/${product.slug}`}
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#eab308] px-6 py-3.5 font-semibold text-black transition hover:bg-[#facc15]"
              >
                Ürün Detayı
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-8 left-6 right-6 flex items-center justify-between lg:left-12 lg:right-20">
        <div className="flex gap-2">
          {profileProducts.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${i === active ? 'w-10 bg-[#eab308]' : 'w-1.5 bg-slate-300 hover:bg-slate-500'}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <div className="hidden gap-2 lg:flex">
          <button
            type="button"
            onClick={() => setActive((p) => (p - 1 + profileProducts.length) % profileProducts.length)}
            className="rounded-lg border border-slate-300 bg-white/80 p-2.5 text-slate-900 transition hover:bg-slate-100"
            aria-label="Önceki"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setActive((p) => (p + 1) % profileProducts.length)}
            className="rounded-lg border border-slate-300 bg-white/80 p-2.5 text-slate-900 transition hover:bg-slate-100"
            aria-label="Sonraki"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
