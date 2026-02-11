"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight, Play, Instagram, Facebook, Linkedin, Twitter } from "lucide-react"
import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import type { ProfilHeroControls, ProfilHeroSlide, ProfilSocialLink } from "@/lib/profil-content"

const socialIconMap = {
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
} as const

export type HeroSlide = ProfilHeroSlide

type HeroSectionProps = {
  slides: HeroSlide[]
  controls: ProfilHeroControls
}

function getSocialIcon(social: ProfilSocialLink) {
  return socialIconMap[social.icon] ?? Instagram
}

export function HeroSection({ slides, controls }: HeroSectionProps) {
  if (!slides || slides.length === 0) {
    return null
  }

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<"next" | "prev">("next")
  const [progress, setProgress] = useState(0)

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection("next")
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setProgress(0)
    setTimeout(() => setIsAnimating(false), 1000)
  }, [isAnimating, slides.length])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection("prev")
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setProgress(0)
    setTimeout(() => setIsAnimating(false), 1000)
  }, [isAnimating, slides.length])

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setDirection(index > currentSlide ? "next" : "prev")
    setCurrentSlide(index)
    setProgress(0)
    setTimeout(() => setIsAnimating(false), 1000)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide()
          return 0
        }
        return prev + 1
      })
    }, 70)

    return () => clearInterval(interval)
  }, [nextSlide])

  const nextSlideIndex = (currentSlide + 1) % slides.length

  return (
    <section className="relative h-[100svh] min-h-[640px] sm:min-h-[720px] overflow-hidden bg-black">
      <div className="relative h-full">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide
          const isNext = index === nextSlideIndex

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className={`absolute inset-0 transition-all duration-[8000ms] ease-out ${
                    isActive ? "scale-110" : "scale-100"
                  }`}
                >
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title.join(" ")}
                    fill
                    className="object-cover"
                    style={{ objectPosition: slide.imagePosition ?? "50% 50%" }}
                    priority={index === 0}
                  />
                </div>

                <div
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background: `linear-gradient(${45 + index * 30}deg, 
                      rgba(15, 23, 42, 0.95) 0%, 
                      rgba(15, 23, 42, 0.85) 30%, 
                      rgba(212, 163, 115, 0.2) 70%, 
                      rgba(212, 163, 115, 0.05) 100%)`,
                  }}
                />

                <div
                  className={`absolute inset-0 opacity-30 mix-blend-overlay transition-all duration-[2000ms] ${
                    isActive ? "scale-100 rotate-0" : "scale-150 rotate-12"
                  }`}
                  style={{
                    background: `radial-gradient(circle at ${30 + index * 15}% ${40 + index * 10}%, 
                      rgba(212, 163, 115, 0.3) 0%, 
                      transparent 50%)`,
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
              </div>

              <div className="relative h-full flex items-center z-20">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-6 leading-[1.1]">
                      {slide.title.map((line, i) => (
                        <div
                          key={i}
                          className={`overflow-hidden transition-all duration-700 ${
                            isActive ? "opacity-100" : direction === "next" ? "opacity-0" : "opacity-0"
                          }`}
                          style={{ transitionDelay: isActive ? `${300 + i * 150}ms` : "0ms" }}
                        >
                          <span
                            className={`block transition-all duration-700 ${
                              i === 2
                                ? "bg-gradient-to-r from-accent via-accent/80 to-accent/60 bg-clip-text text-transparent font-mono"
                                : "text-white"
                            } ${
                              isActive
                                ? "translate-y-0"
                                : direction === "next"
                                ? "translate-y-full"
                                : "-translate-y-full"
                            }`}
                            style={{ transitionDelay: isActive ? `${300 + i * 150}ms` : "0ms" }}
                          >
                            {line}
                          </span>
                        </div>
                      ))}
                    </h1>

                    <p
                      className={`text-base sm:text-lg md:text-xl text-white/90 mb-8 md:mb-10 leading-relaxed max-w-2xl transition-all duration-700 ${
                        isActive
                          ? "opacity-100 translate-x-0"
                          : direction === "next"
                          ? "opacity-0 -translate-x-12"
                          : "opacity-0 translate-x-12"
                      }`}
                      style={{ transitionDelay: isActive ? "750ms" : "0ms" }}
                    >
                      {slide.description}
                    </p>

                    <div
                      className={`flex flex-wrap gap-3 mb-8 md:mb-10 transition-all duration-700 ${
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      }`}
                      style={{ transitionDelay: isActive ? "900ms" : "0ms" }}
                    >
                      {slide.features.map((feature, i) => (
                        <span
                          key={feature}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm text-white font-medium hover:bg-white/20 transition-all cursor-default"
                          style={{ transitionDelay: isActive ? `${950 + i * 100}ms` : "0ms" }}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div
                      className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 ${
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                      }`}
                      style={{ transitionDelay: isActive ? "1050ms" : "0ms" }}
                    >
                      <Button
                        asChild
                        size="lg"
                        className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground group h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base shadow-2xl shadow-accent/50 hover:shadow-accent/70 transition-all hover:scale-105"
                      >
                        <a href={controls.primaryCtaHref} className="flex items-center gap-2">
                          {slide.cta}
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="w-full sm:w-auto border-2 border-white/40 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base group"
                      >
                        <a href={controls.secondaryCtaHref} className="flex items-center gap-2">
                          <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          {controls.secondaryCtaLabel}
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 w-1 h-64 bg-gradient-to-b from-transparent via-accent to-transparent transition-all duration-1000 ${
                  isActive ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                }`}
                style={{ transitionDelay: isActive ? "1200ms" : "0ms" }}
              />
            </div>
          )
        })}
      </div>

      <div className="hidden xl:flex absolute left-6 bottom-24 z-30 flex-col gap-3">
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:border-accent/50 transition-all duration-300 disabled:opacity-50 hover:scale-110 group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:border-accent/50 transition-all duration-300 disabled:opacity-50 hover:scale-110 group"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="absolute bottom-6 sm:bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className="group relative"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className="w-10 sm:w-12 md:w-16 h-1 rounded-full bg-white/20 backdrop-blur-sm overflow-hidden">
              {index === currentSlide && (
                <div
                  className="h-full bg-gradient-to-r from-accent to-accent/60 transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              )}
              {index < currentSlide && <div className="h-full w-full bg-accent/60" />}
            </div>
            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-primary/90 backdrop-blur-xl border border-accent/30 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {slide.highlight}
            </div>
          </button>
        ))}
      </div>

      <div className="hidden sm:flex absolute bottom-6 sm:bottom-10 md:bottom-12 right-4 sm:right-8 z-30 items-center gap-3">
        <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
          <span className="text-white font-mono font-bold text-base">{String(currentSlide + 1).padStart(2, "0")}</span>
          <span className="text-white/50 mx-2">/</span>
          <span className="text-white/70 font-mono text-sm">{String(slides.length).padStart(2, "0")}</span>
        </div>
      </div>

      <div className="hidden sm:flex absolute bottom-6 sm:bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce mt-20">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          </div>
        </div>
      </div>

      <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 flex-col gap-3">
        <div className="relative group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/90 to-accent backdrop-blur-xl border border-accent-foreground/20 flex items-center justify-center shadow-2xl shadow-accent/50 cursor-pointer transition-all duration-500 hover:scale-110 hover:rotate-6">
            <span className="text-[10px] font-bold text-primary tracking-wider [writing-mode:vertical-lr] rotate-180">
              {controls.followLabel}
            </span>
          </div>
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <div className="bg-accent text-primary px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap shadow-xl">
              {controls.followTooltip}
            </div>
          </div>
        </div>

        <div className="w-0.5 h-6 bg-gradient-to-b from-accent/60 via-accent/30 to-transparent mx-auto" />

        {controls.followLinks.map((social, index) => {
          const Icon = getSocialIcon(social)
          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center transition-all duration-500 hover:scale-125 hover:rotate-12 hover:shadow-2xl group-hover:bg-gradient-to-br group-hover:${social.color} group-hover:border-transparent`}
              >
                <Icon className="w-5 h-5 text-white transition-all duration-300 group-hover:scale-110" />
              </div>

              <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                <div className="bg-background text-foreground px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap shadow-xl border border-border">
                  {social.name}
                </div>
              </div>

              <div className="absolute inset-0 rounded-xl bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </a>
          )
        })}

        <div className="w-0.5 h-6 bg-gradient-to-t from-accent/60 via-accent/30 to-transparent mx-auto" />

        <div className="flex flex-col gap-1.5 items-center">
          {[0, 1, 2].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-accent/40 animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
