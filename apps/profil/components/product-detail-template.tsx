'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, FileText } from 'lucide-react'
import type { ProfileProduct } from '@/lib/products'

export function ProductDetailTemplate({ product }: { product: ProfileProduct }) {
  return (
    <main>
      <section className="relative min-h-[50vh] overflow-hidden border-b border-white/5 bg-[#0a0e14]">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt={product.name} className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e14] via-[#0a0e14]/95 to-[#0a0e14]/80" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <Link
            href="/urunler"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-[#eab308]"
          >
            <ArrowLeft className="h-4 w-4" />
            Ürünlere Dön
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-[#eab308]">
            {product.shortName}
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {product.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">{product.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-[#151d28] p-8"
          >
            <h2 className="text-xl font-bold text-white">Teknik Özellikler</h2>
            <div className="mt-6 divide-y divide-white/5">
              {product.specs.map((spec, i) => (
                <div key={spec.key} className="flex justify-between py-4">
                  <span className="text-slate-400">{spec.key}</span>
                  <span className="font-semibold text-white">{spec.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-[#151d28] p-8"
            >
              <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                <CheckCircle2 className="h-6 w-6 text-[#eab308]" />
                Kullanım Alanları
              </h2>
              <ul className="mt-6 space-y-3">
                {product.useAreas.map((area) => (
                  <li key={area} className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-3 text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-[#eab308]" />
                    {area}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-[#eab308]/20 bg-[#eab308]/5 p-6"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-[#eab308]" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-[#eab308]">Teklif</p>
                  <p className="mt-1 text-slate-300">Metraj bazlı fiyat çalışması talep edebilirsiniz.</p>
                </div>
              </div>
              <a
                href="/#teklif"
                className="mt-4 inline-flex rounded-lg bg-[#eab308] px-5 py-2.5 font-semibold text-black transition hover:bg-[#facc15]"
              >
                Teklif Al
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
