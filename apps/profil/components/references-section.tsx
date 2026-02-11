"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import type { ProfilReferencesSection } from "@/lib/profil-content"

type ReferencesSectionProps = {
  content: ProfilReferencesSection
}

export function ReferencesSection({ content }: ReferencesSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
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

  const doubledClients = [...content.clients, ...content.clients]

  return (
    <section
      id="references"
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-muted/30 via-muted/10 to-background relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`max-w-3xl mx-auto text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
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

        <div
          className={`space-y-12 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative">
            <div className="flex overflow-hidden">
              <div className="flex animate-scroll-left">
                {doubledClients.map((client, index) => (
                  <div key={`left-${client.id}-${index}`} className="flex-shrink-0 mx-4 sm:mx-6 w-36 h-24 sm:w-44 sm:h-28 lg:w-48 lg:h-32 relative group">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-card border-2 border-border hover:border-accent/50 transition-all duration-500 hover:shadow-xl hover:shadow-accent/20 hover:scale-110">
                      <Image
                        src={client.logo || "/placeholder.svg"}
                        alt={client.name}
                        fill
                        className="object-contain p-4 sm:p-6 grayscale group-hover:grayscale-0 transition-all duration-500"
                      />

                      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute inset-y-0 left-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          </div>

          <div className="relative">
            <div className="flex overflow-hidden">
              <div className="flex animate-scroll-right">
                {doubledClients.map((client, index) => (
                  <div key={`right-${client.id}-${index}`} className="flex-shrink-0 mx-4 sm:mx-6 w-36 h-24 sm:w-44 sm:h-28 lg:w-48 lg:h-32 relative group">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-card border-2 border-border hover:border-accent/50 transition-all duration-500 hover:shadow-xl hover:shadow-accent/20 hover:scale-110">
                      <Image
                        src={client.logo || "/placeholder.svg"}
                        alt={client.name}
                        fill
                        className="object-contain p-4 sm:p-6 grayscale group-hover:grayscale-0 transition-all duration-500"
                      />

                      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute inset-y-0 left-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          </div>
        </div>

        <div
          className={`mt-12 sm:mt-20 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {content.stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 font-mono bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }

        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
