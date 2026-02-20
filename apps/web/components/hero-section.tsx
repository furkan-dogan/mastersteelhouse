'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronLeft, ChevronRight, Play, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { useEffect, useState, useCallback, useRef } from 'react'
import Image from 'next/image'
import { heroSlides as slides } from '@/lib/content/hero-slides'

export function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [progress, setProgress] = useState(0)
  const [isPastHero, setIsPastHero] = useState(false)

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection('next')
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setProgress(0)
    setTimeout(() => setIsAnimating(false), 1000)
  }, [isAnimating])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection('prev')
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setProgress(0)
    setTimeout(() => setIsAnimating(false), 1000)
  }, [isAnimating])

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setDirection(index > currentSlide ? 'next' : 'prev')
    setCurrentSlide(index)
    setProgress(0)
    setTimeout(() => setIsAnimating(false), 1000)
  }

  // Auto-play with progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide()
          return 0
        }
        return prev + 1
      })
    }, 70) // 7 seconds total (100 * 70ms)

    return () => clearInterval(interval)
  }, [nextSlide])

  useEffect(() => {
    const target = heroRef.current
    if (!target) return

    let ticking = false
    const handleWindowScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        const rect = target.getBoundingClientRect()
        // Slider bölgesi neredeyse tamamen çıkınca ikonları koyu moda al.
        const switchPoint = Math.max(120, window.innerHeight * 0.18)
        setIsPastHero(rect.bottom <= switchPoint)
        ticking = false
      })
    }

    handleWindowScroll()
    window.addEventListener('scroll', handleWindowScroll, { passive: true })
    window.addEventListener('resize', handleWindowScroll)
    return () => {
      window.removeEventListener('scroll', handleWindowScroll)
      window.removeEventListener('resize', handleWindowScroll)
    }
  }, [])

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden bg-black">
      {/* Main Slides Container */}
      <div className="relative h-full">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Background Image with Ken Burns Effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className={`absolute inset-0 transition-all duration-[8000ms] ease-out ${
                    isActive ? 'scale-110' : 'scale-100'
                  }`}
                >
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title.join(' ')}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>

                {/* Dynamic Gradient Overlays */}
                <div
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    background: `linear-gradient(${45 + index * 30}deg, 
                      rgba(15, 23, 42, 0.95) 0%, 
                      rgba(15, 23, 42, 0.85) 30%, 
                      rgba(212, 163, 115, 0.2) 70%, 
                      rgba(212, 163, 115, 0.05) 100%)`,
                  }}
                />

                {/* Animated Mesh Gradient */}
                <div
                  className={`absolute inset-0 opacity-30 mix-blend-overlay transition-all duration-[2000ms] ${
                    isActive ? 'scale-100 rotate-0' : 'scale-150 rotate-12'
                  }`}
                  style={{
                    background: `radial-gradient(circle at ${30 + index * 15}% ${40 + index * 10}%, 
                      rgba(212, 163, 115, 0.3) 0%, 
                      transparent 50%)`,
                  }}
                />

                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
              </div>

              {/* Content Container */}
              <div className="relative h-full flex items-center z-20">
                <div className="container mx-auto px-4 pl-20 sm:pl-24 md:pl-28 lg:pl-32">
                  <div className="max-w-4xl">
                    {/* Title with Split Text Animation */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-[1.1]">
                      {slide.title.map((line, i) => (
                        <div
                          key={i}
                          className={`overflow-hidden transition-all duration-700 ${
                            isActive
                              ? 'opacity-100'
                              : direction === 'next'
                              ? 'opacity-0'
                              : 'opacity-0'
                          }`}
                          style={{ transitionDelay: isActive ? `${300 + i * 150}ms` : '0ms' }}
                        >
                          <span
                            className={`block transition-all duration-700 ${
                              i === 2
                                ? 'bg-gradient-to-r from-accent via-accent/80 to-accent/60 bg-clip-text text-transparent font-mono'
                                : 'text-white'
                            } ${
                              isActive
                                ? 'translate-y-0'
                                : direction === 'next'
                                ? 'translate-y-full'
                                : '-translate-y-full'
                            }`}
                            style={{ transitionDelay: isActive ? `${300 + i * 150}ms` : '0ms' }}
                          >
                            {line}
                          </span>
                        </div>
                      ))}
                    </h1>

                    {/* Description */}
                    <p
                      className={`text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl transition-all duration-700 ${
                        isActive
                          ? 'opacity-100 translate-x-0'
                          : direction === 'next'
                          ? 'opacity-0 -translate-x-12'
                          : 'opacity-0 translate-x-12'
                      }`}
                      style={{ transitionDelay: isActive ? '750ms' : '0ms' }}
                    >
                      {slide.description}
                    </p>

                    {/* Feature Pills */}
                    <div
                      className={`flex flex-wrap gap-3 mb-10 transition-all duration-700 ${
                        isActive
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: isActive ? '900ms' : '0ms' }}
                    >
                      {slide.features.map((feature, i) => (
                        <span
                          key={feature}
                          className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm text-white font-medium hover:bg-white/20 transition-all cursor-default"
                          style={{ transitionDelay: isActive ? `${950 + i * 100}ms` : '0ms' }}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* CTA Buttons */}
                    <div
                      className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 ${
                        isActive
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-12'
                      }`}
                      style={{ transitionDelay: isActive ? '1050ms' : '0ms' }}
                    >
                      <Button
                        asChild
                        size="lg"
                        className="bg-accent hover:bg-accent/90 text-accent-foreground group h-14 px-8 text-base shadow-2xl shadow-accent/50 hover:shadow-accent/70 transition-all hover:scale-105"
                      >
                        <a href="#contact" className="flex items-center gap-2">
                          {slide.cta}
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="border-2 border-white/40 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 h-14 px-8 text-base group"
                      >
                        <a href="#about" className="flex items-center gap-2">
                          <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          Daha Fazla Bilgi
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Animated Lines */}
              <div
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-64 bg-gradient-to-b from-transparent via-accent to-transparent transition-all duration-1000 ${
                  isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                }`}
                style={{ transitionDelay: isActive ? '1200ms' : '0ms' }}
              />
            </div>
          )
        })}
      </div>

      {/* Navigation Controls */}
      <div className="absolute left-4 bottom-28 z-30 flex flex-row gap-3 xl:left-8 xl:bottom-auto xl:top-1/2 xl:-translate-y-1/2 xl:flex-col xl:gap-4">
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:border-accent/50 transition-all duration-300 disabled:opacity-50 hover:scale-110 group md:w-14 md:h-14"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:border-accent/50 transition-all duration-300 disabled:opacity-50 hover:scale-110 group md:w-14 md:h-14"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Slide Indicators with Progress */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className="group relative"
            aria-label={`Go to slide ${index + 1}`}
          >
            {/* Progress Bar Background */}
            <div className="w-16 h-1 rounded-full bg-white/20 backdrop-blur-sm overflow-hidden">
              {/* Active Progress */}
              {index === currentSlide && (
                <div
                  className="h-full bg-gradient-to-r from-accent to-accent/60 transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              )}
              {/* Completed Indicator */}
              {index < currentSlide && (
                <div className="h-full w-full bg-accent/60" />
              )}
            </div>
            {/* Hover Label */}
            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-primary/90 backdrop-blur-xl border border-accent/30 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {slide.highlight}
            </div>
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-12 right-8 z-30 flex items-center gap-3">
        <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
          <span className="text-white font-mono font-bold text-lg">
            {String(currentSlide + 1).padStart(2, '0')}
          </span>
          <span className="text-white/50 mx-2">/</span>
          <span className="text-white/70 font-mono">
            {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce mt-20">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          </div>
        </div>
      </div>

      {/* Social Media Follow Strip - Right Side */}
      <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 flex-col gap-3">
        {/* Follow Label */}
        <div className="relative group">
          <div
            className={`w-14 h-14 rounded-2xl border flex items-center justify-center cursor-pointer transition-all duration-500 hover:scale-110 hover:rotate-6 ${
              isPastHero
                ? 'bg-gradient-to-br from-accent to-accent/80 border-accent/40 shadow-xl shadow-accent/30'
                : 'bg-gradient-to-br from-accent/90 to-accent backdrop-blur-xl border-accent-foreground/20 shadow-2xl shadow-accent/50'
            }`}
          >
            <span className="text-[10px] font-bold text-primary tracking-wider [writing-mode:vertical-lr] rotate-180">
              TAKİP
            </span>
          </div>
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <div className="bg-accent text-primary px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap shadow-xl">
              Bizi Takip Edin!
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className={`w-0.5 h-6 mx-auto transition-colors duration-300 ${
          isPastHero
            ? 'bg-gradient-to-b from-black/40 via-black/20 to-transparent'
            : 'bg-gradient-to-b from-accent/60 via-accent/30 to-transparent'
        }`} />

        {/* Social Media Buttons */}
        {[
          { icon: Instagram, href: 'https://www.instagram.com/mastersteelhouse', label: 'Instagram', color: 'from-pink-500 to-purple-600' },
          { icon: Facebook, href: 'https://www.facebook.com/mastersteelhous/', label: 'Facebook', color: 'from-blue-600 to-blue-700' },
          { icon: Twitter, href: 'https://x.com/mastersteelhous', label: 'X', color: 'from-sky-400 to-sky-600' },
          { icon: Youtube, href: 'https://www.youtube.com/@mastersteelhouse', label: 'YouTube', color: 'from-red-600 to-red-700' },
        ].map((social, index) => {
          const Icon = social.icon
          return (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 hover:scale-125 hover:rotate-12 hover:shadow-2xl group-hover:bg-gradient-to-br group-hover:${social.color} group-hover:border-transparent ${
                  isPastHero
                    ? 'bg-black/10 border border-black/20'
                    : 'bg-white/10 backdrop-blur-xl border border-white/20'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${
                    isPastHero ? 'text-black/75 group-hover:text-white' : 'text-white'
                  }`}
                />
              </div>
              
              {/* Tooltip */}
              <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                <div
                  className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap shadow-xl border ${
                    isPastHero ? 'bg-card text-foreground border-border' : 'bg-background text-foreground border-border'
                  }`}
                >
                  {social.label}
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-xl bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </a>
          )
        })}

        {/* Bottom Separator */}
        <div className={`w-0.5 h-6 mx-auto transition-colors duration-300 ${
          isPastHero
            ? 'bg-gradient-to-t from-black/40 via-black/20 to-transparent'
            : 'bg-gradient-to-t from-accent/60 via-accent/30 to-transparent'
        }`} />

        {/* Animated Dots */}
        <div className="flex flex-col gap-1.5 items-center">
          {[0, 1, 2].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full animate-pulse transition-colors duration-300 ${
                isPastHero ? 'bg-black/35' : 'bg-accent/40'
              }`}
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>

    </section>
  )
}
