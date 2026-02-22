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
    <section className="relative overflow-hidden border-b border-slate-200 bg-[#f3f4f1]">
      <div className="absolute inset-0">
        <img src={active.image} alt={active.name} className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.2),transparent_45%),linear-gradient(120deg,rgba(243,244,241,0.95),rgba(243,244,241,0.82))]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_0.7fr] lg:px-8 lg:py-20">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-amber-300/50 bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-amber-700">
            Profil.mastersteelhouse.com
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Endüstriyel
            <span className="text-amber-600"> Profil Sistemleri</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-slate-700 sm:text-lg">
            Alçıköşe, kaba sıva ve tavan U-C profil ürünlerinde hızlı montaj, dengeli malzeme kalitesi ve sahada
            tekrarlanabilir performans.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/urunler"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-300"
            >
              Ürünleri İncele
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#teklif"
              className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Teklif Al
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/85 p-5 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-700">Aktif Ürün</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">{active.name}</h2>
          <p className="mt-2 text-sm text-slate-600">{active.subtitle}</p>
          <div className="mt-5 grid gap-2">
            {active.specs.slice(0, 3).map((spec) => (
              <div key={spec.key} className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                <span className="text-xs text-slate-600">{spec.key}</span>
                <span className="text-xs font-semibold text-slate-900">{spec.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <Link href={`/urunler/${active.slug}`} className="text-sm font-semibold text-amber-700 hover:text-amber-600">
              Ürüne Git
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Önceki"
                onClick={() => setIndex((prev) => (prev - 1 + profileProducts.length) % profileProducts.length)}
                className="rounded-lg border border-slate-300 bg-white p-2 text-slate-800 transition hover:bg-slate-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Sonraki"
                onClick={() => setIndex((prev) => (prev + 1) % profileProducts.length)}
                className="rounded-lg border border-slate-300 bg-white p-2 text-slate-800 transition hover:bg-slate-100"
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
