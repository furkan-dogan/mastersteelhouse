'use client'

import { motion } from 'framer-motion'
import { Phone, Mail } from 'lucide-react'

export function CtaSection() {
  return (
    <section id="teklif" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-[#eab308]/20 bg-gradient-to-br from-[#151d28] via-[#111820] to-[#0a0e14] p-12 lg:p-16"
        >
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-[#eab308]/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-[#eab308]/5 blur-3xl" />
          <div className="relative flex flex-col items-center text-center lg:flex-row lg:justify-between lg:text-left">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#eab308]">Teklif & Doküman</p>
              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                Projenize Uygun Profil Setini
                <span className="block text-[#eab308]">Beraber Seçelim</span>
              </h2>
              <p className="mt-4 max-w-xl text-slate-400">
                Metraj, kesit ve uygulama alanına göre teknik ekipten hızlı geri dönüş. Profil seçimi ve teslim planı için ulaşın.
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row lg:mt-0">
              <a
                href="tel:+905000000000"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#eab308] px-8 py-4 font-semibold text-black transition hover:bg-[#facc15]"
              >
                <Phone className="h-5 w-5" />
                Hemen Ara
              </a>
              <a
                href="mailto:info@mastersteelhouse.com"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                <Mail className="h-5 w-5" />
                E-posta Gönder
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
