'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, ArrowUpRight } from 'lucide-react'
import { PROFILE_INSTAGRAM_URL } from '@/lib/seo'

export function InstagramFollowSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.a
          href={PROFILE_INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer noopener"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-[#eab308]/50 hover:shadow-lg hover:shadow-[#eab308]/10 md:flex-row md:justify-between md:gap-8 md:p-10"
        >
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-pink-400/20 to-purple-500/20 blur-3xl transition-opacity group-hover:opacity-100" />
          <div className="relative flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-white">
              <Instagram className="h-8 w-8" />
            </div>
            <div className="text-center md:text-left">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#b88700]">Bizi Takip Edin</p>
              <h3 className="mt-1 text-xl font-bold text-slate-900 md:text-2xl">Instagram&apos;da Birlikte</h3>
              <p className="mt-2 text-slate-600">
                Ürünlerimiz, projeler ve güncel paylaşımlar için <span className="font-semibold text-slate-800">@mastersteelhouseprofil</span> hesabımızı takip edin.
              </p>
            </div>
          </div>
          <div className="relative mt-6 md:mt-0">
            <span className="inline-flex items-center gap-2 rounded-xl bg-[#eab308] px-6 py-3 font-semibold text-black transition group-hover:bg-[#d89f04]">
              Instagram&apos;a Git
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>
        </motion.a>
      </div>
    </section>
  )
}
