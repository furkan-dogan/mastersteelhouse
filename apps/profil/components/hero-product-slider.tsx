'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { profileProducts } from '@/lib/products'

export function HeroProductSlider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % profileProducts.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const active = profileProducts[index]

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#0a0f15]">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={active.image} alt={active.name} className="h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.35),transparent_45%),radial-gradient(circle_at_80%_35%,rgba(59,130,246,0.22),transparent_50%),linear-gradient(120deg,rgba(10,15,21,0.95),rgba(10,15,21,0.86))]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_0.7fr] lg:px-8 lg:py-20">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-amber-300">
            Profil.mastersteelhouse.com
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            Endustriyel
            <span className="text-amber-400"> Profil Sistemleri</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-slate-200 sm:text-lg">
            Alcikose, kaba siva ve tavan U-C profil urunlerinde hizli montaj, dengeli malzeme kalitesi ve sahada
            tekrarlanabilir performans.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/urunler"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-300"
            >
              Urunleri Incele
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#teklif"
              className="inline-flex items-center rounded-xl border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Teklif Al
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-white/15 bg-black/30 p-5 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-300">Aktif Urun</p>
          <h2 className="mt-2 text-2xl font-bold text-white">{active.name}</h2>
          <p className="mt-2 text-sm text-slate-300">{active.subtitle}</p>
          <div className="mt-5 grid gap-2">
            {active.specs.slice(0, 3).map((spec) => (
              <div key={spec.key} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <span className="text-xs text-slate-300">{spec.key}</span>
                <span className="text-xs font-semibold text-white">{spec.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <Link href={`/urunler/${active.slug}`} className="text-sm font-semibold text-amber-300 hover:text-amber-200">
              Urune Git
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Onceki"
                onClick={() => setIndex((prev) => (prev - 1 + profileProducts.length) % profileProducts.length)}
                className="rounded-lg border border-white/20 bg-white/5 p-2 text-white/90 transition hover:bg-white/15"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Sonraki"
                onClick={() => setIndex((prev) => (prev + 1) % profileProducts.length)}
                className="rounded-lg border border-white/20 bg-white/5 p-2 text-white/90 transition hover:bg-white/15"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
