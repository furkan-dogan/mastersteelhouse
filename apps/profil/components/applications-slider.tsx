'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Building2, Store, Factory, Landmark } from 'lucide-react'
import { applicationAreas } from '@/lib/home-content'

const icons = { building: Building2, store: Store, factory: Factory, landmark: Landmark }

export function ApplicationsSlider() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((p) => (p + 1) % applicationAreas.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: active * (el.scrollWidth / applicationAreas.length), behavior: 'smooth' })
  }, [active])

  return (
    <section id="referanslar" className="scroll-mt-20 bg-[#eef1ee] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#b88700]">Uygulama Alanları</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Her Proje Tipinde</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">Konut, ticari, endüstriyel ve kamu projelerinde güvenilir profil çözümleri.</p>
        </motion.div>

        <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide" style={{ scrollSnapType: 'x mandatory' }}>
          {applicationAreas.map((area, i) => {
            const Icon = icons[area.icon as keyof typeof icons] || Building2
            return (
              <motion.article
                key={area.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActive(i)}
                className={`flex min-w-[280px] cursor-pointer flex-col rounded-2xl border p-8 transition-all sm:min-w-[320px] ${
                  active === i ? 'border-[#eab308]/50 bg-[#fff9e8]' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
                style={{ scrollSnapAlign: 'center' }}
              >
                <div className={`mb-4 rounded-xl p-3 ${active === i ? 'bg-[#fde68a]/40' : 'bg-slate-100'}`}>
                  <Icon className={`h-8 w-8 ${active === i ? 'text-[#b88700]' : 'text-slate-600'}`} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{area.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{area.desc}</p>
              </motion.article>
            )
          })}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {applicationAreas.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all ${i === active ? 'w-8 bg-[#eab308]' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
