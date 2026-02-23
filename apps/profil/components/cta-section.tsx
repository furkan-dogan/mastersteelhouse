'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'

export function CtaSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-[#eab308]/30 bg-gradient-to-br from-white via-[#f8fafc] to-[#eef1ee] p-12 lg:p-16"
        >
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-[#eab308]/15 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-[#eab308]/10 blur-3xl" />

          <div className="relative flex flex-col items-center text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff5cc] text-[#b88700]">
              <MessageCircle className="h-7 w-7" />
            </div>

            <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-[#b88700]">İletişim İçin</p>
            <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">Projenizi Birlikte Planlayalım</h2>
            <p className="mt-4 max-w-2xl text-slate-600">
              Teknik talepleriniz, metraj ihtiyaçlarınız ve ürün seçim süreci için iletişim sayfasına geçip bize doğrudan ulaşabilirsiniz.
            </p>

            <Link
              href="/iletisim"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#eab308] px-8 py-4 font-semibold text-black transition hover:bg-[#facc15]"
            >
              İletişim Sayfasına Git
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
