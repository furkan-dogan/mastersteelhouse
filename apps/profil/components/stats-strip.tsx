'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { profileStats } from '@/lib/home-content'

function Counter({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  const num = parseInt(value, 10)

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setN(Math.floor(eased * num))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, num])

  return (
    <div ref={ref} className="flex flex-col items-center gap-0.5">
      <span className="tabular-nums text-3xl font-bold text-slate-900 sm:text-4xl">{n}</span>
      <span className="text-base font-medium text-slate-600 sm:text-lg">{suffix}</span>
    </div>
  )
}

export function StatsStrip() {
  return (
    <section id="kurumsal" className="scroll-mt-20 relative overflow-hidden border-y border-slate-200 bg-[#f3f4f1] py-16 sm:py-20">
      <div className="pattern-dots absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4 sm:gap-x-12 sm:gap-y-0"
        >
          {profileStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex min-w-0 flex-col items-center text-center"
            >
              <div className="mb-3">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm font-medium leading-snug text-slate-700">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
