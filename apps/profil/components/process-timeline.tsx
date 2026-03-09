'use client'

import { useState, useEffect } from 'react'
import { processSteps } from '@/lib/home-content'

const processStepVideos = [
  {
    title: 'Hammadde',
    src: '/hammadde.mp4',
  },
  {
    title: 'Üretim',
    src: 'https://upload.wikimedia.org/wikipedia/commons/8/86/CNC_lathe.webm',
  },
  {
    title: 'Kalite Kontrol',
    src: '/kalitekontrol.mp4',
  },
  {
    title: 'Paketleme ve Sevkiyat',
    src: '/paketlemevesevkiyat.mp4',
  },
]

export function ProcessTimeline() {
  const [active, setActive] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    if (hoveredIndex !== null) {
      return
    }

    const interval = setInterval(() => {
      setActive((p) => (p + 1) % processSteps.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [hoveredIndex])

  const activeVideo = processStepVideos[active % processStepVideos.length]
  const isHoverMode = hoveredIndex !== null

  return (
    <section id="proje-sureci" className="scroll-mt-20 relative overflow-hidden bg-[#f3f4f1] py-20">
      <div className="absolute inset-0">
        <video
          key={activeVideo.src}
          className={`h-full w-full object-cover transition-all duration-500 ${isHoverMode ? 'opacity-80 scale-100' : 'opacity-45 scale-[1.02]'}`}
          src={activeVideo.src}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-label={activeVideo.title}
        />
        <div
          className={`absolute inset-0 transition-colors duration-500 ${
            isHoverMode ? 'bg-[#f3f4f1]/45' : 'bg-[#f3f4f1]/82'
          }`}
        />
        <div
          className={`absolute inset-0 transition-opacity duration-500 bg-[linear-gradient(180deg,rgba(243,244,241,0.3)_0%,rgba(234,179,8,0.08)_50%,rgba(243,244,241,0.45)_100%)] ${
            isHoverMode ? 'opacity-100' : 'opacity-60'
          }`}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#b88700]">Üretim Süreci</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Kalite Garantili Üretim</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">Hammadde tedarikinden sevkiyata kadar kontrollü süreç.</p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
          {processSteps.map((step, i) => (
            <button
              key={step.step}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => {
                setActive(i)
                setHoveredIndex(i)
              }}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative min-w-[280px] shrink-0 rounded-2xl border p-6 text-left transition-all lg:min-w-0 lg:p-8 ${
                active === i ? 'border-[#eab308]/50 bg-[#fff9e8]/90 shadow-sm' : 'border-slate-200 bg-white/85 hover:border-slate-300'
              }`}
            >
              <span className="text-2xl font-bold text-[#eab308]/50 lg:text-3xl">{step.step}</span>
              <h3 className="mt-3 text-base font-semibold text-slate-900 lg:mt-4 lg:text-lg">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.desc}</p>
              {i < processSteps.length - 1 ? (
                <div className="absolute -right-3 top-1/2 hidden h-0.5 w-6 -translate-y-1/2 bg-slate-300 lg:block" />
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
