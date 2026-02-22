'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { profileProducts } from '@/lib/products'

export function ProductCardGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14 text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-wider text-[#eab308]">Ürün Kataloğu</p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">3 Profil, Tüm İhtiyaçlar</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-400">
          Alçıpan köşe, kaba sıva ve tavan U-C profilleri. Galvanizli çelik, yüksek kalite.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-3">
        {profileProducts.map((product, i) => (
          <motion.div
            key={product.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={`/urunler/${product.slug}`}>
              <article className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-[#151d28] transition-all hover:border-[#eab308]/40 hover:shadow-xl hover:shadow-[#eab308]/5">
                <div className="relative aspect-[4/3] overflow-hidden">
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
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#eab308] transition group-hover:underline">
                    Detaylı incele
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
