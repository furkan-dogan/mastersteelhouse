'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'
import { useEffect, useState, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { heroSlides as slides } from '@/lib/content/hero-slides'
import { NavigationControls } from '@/components/hero/navigation-controls'
import { SlideIndicators } from '@/components/hero/slide-indicators'
import { SocialStrip } from '@/components/hero/social-strip'

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

  useEffect(() => {
    const target = heroRef.current
    if (!target) return

    let ticking = false
    const handleWindowScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        const rect = target.getBoundingClientRect()
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
    <section ref={heroRef} className="hero-shell relative overflow-hidden bg-black">
      <div className="relative h-full">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide
          const HeadingTag = isActive ? 'h1' : 'div'

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className={`absolute inset-0 transition-all duration-[8000ms] ease-out ${isActive ? 'scale-110' : 'scale-100'}`}>
                  <Image
                    src={slide.image || '/placeholder.svg'}
                    alt={slide.title.join(' ')}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>

                <div
                  className={`absolute inset-0 transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}
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
                    isActive ? 'scale-100 rotate-0' : 'scale-150 rotate-12'
                  }`}
                  style={{
                    background: `radial-gradient(circle at ${30 + index * 15}% ${40 + index * 10}%, 
                      rgba(212, 163, 115, 0.3) 0%, 
                      transparent 50%)`,
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
              </div>

              <div className="relative z-20 flex min-h-full items-center">
                <div className="hero-content container mx-auto px-4 md:pl-28 lg:pl-32">
                  <div className="max-w-4xl">
                    <HeadingTag className="hero-title font-bold" aria-hidden={!isActive}>
                      {slide.title.map((line, i) => (
                        <div
                          key={i}
                          className={`my-[-0.08em] overflow-hidden py-[0.08em] transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                          style={{ transitionDelay: isActive ? `${300 + i * 150}ms` : '0ms' }}
                        >
                          <span
                            className={`block transition-all duration-700 ${
                              i === 2
                                ? 'bg-gradient-to-r from-accent via-accent/80 to-accent/60 bg-clip-text text-transparent font-mono'
                                : 'text-white'
                            } ${isActive ? 'translate-y-0' : direction === 'next' ? 'translate-y-full' : '-translate-y-full'}`}
                            style={{ transitionDelay: isActive ? `${300 + i * 150}ms` : '0ms' }}
                          >
                            {line}
                          </span>
                        </div>
                      ))}
                    </HeadingTag>

                    <p
                      className={`hero-description max-w-2xl leading-relaxed text-white/90 transition-all duration-700 ${
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

                    <div
                      className={`hero-features flex flex-wrap gap-3 transition-all duration-700 ${
                        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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

                    <div
                      className={`flex flex-col sm:flex-row items-stretch sm:items-start gap-4 transition-all duration-700 ${
                        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                      }`}
                      style={{ transitionDelay: isActive ? '1050ms' : '0ms' }}
                    >
                      <Button
                        asChild
                        size="lg"
                        className="bg-accent hover:bg-accent/90 text-accent-foreground group h-14 px-8 text-base shadow-2xl shadow-accent/50 hover:shadow-accent/70 transition-all hover:scale-105"
                      >
                        <Link href={slide.ctaHref} className="flex items-center justify-center gap-2">
                          {slide.cta}
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="group h-14 border-2 border-white/55 bg-white/10 px-8 text-base !text-white shadow-lg shadow-black/35 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:border-accent hover:!bg-accent hover:!text-primary hover:shadow-xl hover:shadow-accent/45"
                      >
                        <Link href="/kurumsal/hakkimizda" className="flex items-center justify-center gap-2">
                          <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          Daha Fazla Bilgi
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`hero-side-accent absolute left-0 top-1/2 h-64 w-1 -translate-y-1/2 bg-gradient-to-b from-transparent via-accent to-transparent transition-all duration-1000 ${
                  isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                }`}
                style={{ transitionDelay: isActive ? '1200ms' : '0ms' }}
              />
            </div>
          )
        })}
      </div>

      <NavigationControls isAnimating={isAnimating} onPrev={prevSlide} onNext={nextSlide} />

      <SlideIndicators slides={slides} currentSlide={currentSlide} progress={progress} onGoToSlide={goToSlide} />

      <div className="hero-scroll-hint absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 animate-bounce md:block">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          </div>
        </div>
      </div>

      <SocialStrip isPastHero={isPastHero} />
    </section>
  )
}
