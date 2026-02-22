'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { processSteps } from '@/lib/home-content'

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((p) => (p + 1) % processSteps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="proje-sureci" className="scroll-mt-20 relative overflow-hidden bg-[#f3f4f1] py-20">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(234,179,8,0.06)_50%,transparent_100%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#b88700]">Üretim Süreci</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Kalite Garantili Üretim</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">Hammadde tedarikinden sevkiyata kadar kontrollü süreç.</p>
        </motion.div>

        <div ref={containerRef} className="relative">
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                onClick={() => setActive(i)}
                className={`relative cursor-pointer rounded-2xl border p-8 transition-all ${
                  active === i ? 'border-[#eab308]/50 bg-[#fff9e8]' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <span className="text-3xl font-bold text-[#eab308]/50">{step.step}</span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.desc}</p>
                {i < processSteps.length - 1 && <div className="absolute -right-3 top-1/2 hidden h-0.5 w-6 -translate-y-1/2 bg-slate-300 lg:block" />}
              </motion.div>
            ))}
          </div>

          <div className="lg:hidden">
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollSnapType: 'x mandatory' }}>
              {processSteps.map((step) => (
                <div key={step.step} className="min-w-[280px] shrink-0 snap-center rounded-2xl border border-slate-200 bg-white p-6" style={{ scrollSnapAlign: 'center' }}>
                  <span className="text-2xl font-bold text-[#eab308]/50">{step.step}</span>
                  <h3 className="mt-3 text-base font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
