'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { ProjectCard } from '@/components/projects/project-card'
import { useRevealOnScroll } from '@/hooks/use-reveal-on-scroll'
import { projects } from '@/lib/content/projects'

export function ProjectsSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const { ref, isVisible } = useRevealOnScroll()

  useEffect(() => {
    if (!isVisible) return
    projects.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, index])
      }, index * 100)
    })
  }, [isVisible])

  return (
    <section id="projects" ref={ref} className="py-24 bg-background relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="mb-4 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-accent">
            <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
            Referanslarımız
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground mb-6 text-balance">
            Başarıyla Tamamladığımız <span className="text-accent">Projeler</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
            Yüzlerce projeyi başarıyla tamamladık ve müşteri memnuniyetini en üst düzeyde tutuyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              isVisible={visibleItems.includes(index)}
              isHovered={hoveredIndex === index}
              onHover={(hovered) => setHoveredIndex(hovered ? index : null)}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-6">Daha fazla proje görmek ister misiniz?</p>
          <Link
            href="/referanslar"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 font-medium text-primary-foreground transition-colors duration-300 hover:bg-primary/90"
          >
            Portföyümüzü İnceleyin
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
