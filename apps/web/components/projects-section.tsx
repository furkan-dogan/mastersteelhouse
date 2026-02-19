'use client'

import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, MapPin, Square } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Modern Çelik Villa',
    location: 'İstanbul, Beykoz',
    category: 'Konut',
    image: '/project-1.jpg',
    area: '350 m²',
    year: '2024'
  },
  {
    id: 2,
    title: 'Endüstriyel Tesis',
    location: 'Kocaeli, Gebze',
    category: 'Endüstriyel',
    image: '/project-2.jpg',
    area: '2.500 m²',
    year: '2023'
  },
  {
    id: 3,
    title: 'Ticari Ofis Binası',
    location: 'Ankara, Çankaya',
    category: 'Ticari',
    image: '/project-3.jpg',
    area: '1.200 m²',
    year: '2024'
  },
  {
    id: 4,
    title: 'Lüks Villa Projesi',
    location: 'Antalya, Belek',
    category: 'Konut',
    image: '/project-4.jpg',
    area: '450 m²',
    year: '2023'
  },
  {
    id: 5,
    title: 'Fabrika Tesisi',
    location: 'Bursa, Nilüfer',
    category: 'Endüstriyel',
    image: '/project-5.jpg',
    area: '3.800 m²',
    year: '2024'
  },
  {
    id: 6,
    title: 'Eğitim Kampüsü',
    location: 'İzmir, Bornova',
    category: 'Eğitim',
    image: '/project-6.jpg',
    area: '1.800 m²',
    year: '2023'
  },
]

export function ProjectsSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            projects.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems(prev => [...prev, index])
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-gradient-to-br from-muted/30 via-muted/10 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
              Projelerimiz
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Başarıyla Tamamladığımız{' '}
            <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">Projeler</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
            Yüzlerce projeyi başarıyla tamamladık ve müşteri memnuniyetini en üst düzeyde tutuyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const isVisible = visibleItems.includes(index)
            const isHovered = hoveredIndex === index
            
            return (
              <div
                key={project.id}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                } ${isHovered ? 'scale-105 z-10' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden bg-muted">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className={`object-cover transition-all duration-700 ${
                      isHovered ? 'scale-110 rotate-2' : 'scale-100'
                    }`}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent transition-opacity duration-500 ${
                    isHovered ? 'opacity-90' : 'opacity-70'
                  }`} />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full bg-accent/90 backdrop-blur-sm text-accent-foreground text-xs font-semibold">
                      {project.category}
                    </span>
                  </div>

                  {/* View Project Icon */}
                  <div className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-accent/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                    isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                  }`}>
                    <ArrowUpRight className="w-5 h-5 text-accent-foreground" />
                  </div>

                  {/* Content Overlay */}
                  <div className={`absolute inset-x-0 bottom-0 p-6 transition-all duration-500 ${
                    isHovered ? 'translate-y-0' : 'translate-y-2'
                  }`}>
                    <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-primary-foreground/90 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                    
                    {/* Project Details */}
                    <div className={`flex items-center gap-4 transition-all duration-500 ${
                      isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
                        <span className="text-xs text-primary-foreground/80">Alan:</span>
                        <span className="text-sm font-semibold text-primary-foreground">{project.area}</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
                        <span className="text-xs text-primary-foreground/80">Yıl:</span>
                        <span className="text-sm font-semibold text-primary-foreground">{project.year}</span>
                      </div>
                    </div>
                  </div>

                  {/* Shine Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-1000 ${
                    isHovered ? 'translate-x-full' : ''
                  }`} />
                </div>

                {/* Border Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-500 ${
                  isHovered ? 'border-accent shadow-2xl shadow-accent/50' : 'border-transparent'
                }`} />
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            {'Daha fazla proje görmek ister misiniz?'}
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-accent-foreground font-semibold hover:shadow-xl hover:shadow-accent/50 transition-all duration-300 hover:scale-105"
          >
            {'Portfolyomuzu İnceleyin'}
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
