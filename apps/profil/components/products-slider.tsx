'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { ProfileProduct } from '@/lib/profile-content'

type ProductsSliderProps = {
  products: ProfileProduct[]
}

export function ProductsSlider({ products }: ProductsSliderProps) {
  if (products.length === 0) return null

  return (
    <section id="urunler" className="scroll-mt-20 relative overflow-hidden bg-[#f3f4f1] py-20">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-[#b88700]">Ürün Kataloğu</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">3 Profil, Tüm İhtiyaçlar</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
            Delikli alçı köşe profili, kaba sıva profili ve tavan U-C profili seçenekleri ile
            farklı proje ihtiyaçlarına uygun galvanizli çelik çözümleri sunuyoruz.
          </p>
        </motion.div>

        <div className="flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {products.map((product, i) => (
            <motion.article
              key={product.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group min-w-[85vw] shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:border-[#eab308]/50 hover:shadow-lg hover:shadow-[#eab308]/10 sm:min-w-[340px] md:min-w-0"
            >
              <Link href={`/urunler/${product.slug}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={product.cardImage || product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain bg-slate-50 p-2 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900">{product.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{product.subtitle}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-[#b88700] transition group-hover:underline">
                    {product.name} detayları →
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/urunler"
            className="rounded-lg border border-[#eab308]/60 px-6 py-2.5 font-semibold text-[#b88700] transition hover:bg-[#eab308]/10"
          >
            Tüm Ürünler
          </Link>
        </div>
      </div>
    </section>
  )
}
