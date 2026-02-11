"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowUpRight, MapPin } from "lucide-react"
import type { ProfilProjectsSection } from "@/lib/profil-content"

type ProjectsSectionProps = {
  content: ProfilProjectsSection
}

export function ProjectsSection({ content }: ProjectsSectionProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            content.items.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => [...prev, index])
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
  }, [content.items])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-muted/30 via-muted/10 to-background relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-xs sm:text-sm font-medium border border-accent/20">
              {content.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            {content.title}{" "}
            <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
              {content.titleAccent}
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {content.items.map((project, index) => {
            const isVisible = visibleItems.includes(index)
            const isHovered = hoveredIndex === index

            return (
              <div
                key={project.id}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                } ${isHovered ? "scale-105 z-10" : ""}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden bg-muted">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className={`object-cover transition-all duration-700 ${isHovered ? "scale-110 rotate-2" : "scale-100"}`}
                  />

                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent transition-opacity duration-500 ${
                      isHovered ? "opacity-90" : "opacity-70"
                    }`}
                  />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full bg-accent/90 backdrop-blur-sm text-accent-foreground text-xs font-semibold">
                      {project.category}
                    </span>
                  </div>

                  <div
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-accent/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                      isHovered ? "opacity-100 scale-100" : "opacity-0 scale-50"
                    }`}
                  >
                    <ArrowUpRight className="w-5 h-5 text-accent-foreground" />
                  </div>

                  <div
                    className={`absolute inset-x-0 bottom-0 p-6 transition-all duration-500 ${
                      isHovered ? "translate-y-0" : "translate-y-2"
                    }`}
                  >
                    <h3 className="text-xl sm:text-2xl font-bold text-primary-foreground mb-2">{project.title}</h3>
                    <div className="flex items-center gap-2 text-primary-foreground/90 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{project.location}</span>
                    </div>

                    <div
                      className={`flex flex-wrap items-center gap-3 transition-all duration-500 ${
                        isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                    >
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
                        <span className="text-xs text-primary-foreground/80">Kalinlik:</span>
                        <span className="text-xs sm:text-sm font-semibold text-primary-foreground">{project.area}</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
                        <span className="text-xs text-primary-foreground/80">Not:</span>
                        <span className="text-xs sm:text-sm font-semibold text-primary-foreground">{project.year}</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-1000 ${
                      isHovered ? "translate-x-full" : ""
                    }`}
                  />
                </div>

                <div
                  className={`absolute inset-0 rounded-2xl border-2 transition-all duration-500 ${
                    isHovered ? "border-accent shadow-2xl shadow-accent/50" : "border-transparent"
                  }`}
                />
              </div>
            )
          })}
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-base sm:text-lg text-muted-foreground mb-6">{content.ctaNote}</p>
          <a
            href={content.ctaHref}
            className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-accent-foreground font-semibold text-sm sm:text-base hover:shadow-xl hover:shadow-accent/50 transition-all duration-300 hover:scale-105"
          >
            {content.ctaLabel}
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
