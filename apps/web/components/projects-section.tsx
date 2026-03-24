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
    <section id="projects" ref={ref} className="py-24 bg-gradient-to-br from-muted/30 via-muted/10 to-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Başarıyla Tamamladığımız{' '}
            <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">Projeler</span>
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
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-accent-foreground font-semibold hover:shadow-xl hover:shadow-accent/50 transition-all duration-300 hover:scale-105"
          >
            Portföyümüzü İnceleyin
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
