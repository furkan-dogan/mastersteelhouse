'use client'

import { CheckCircle2, TrendingUp, Users2, Lightbulb, Play, Pause } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const features = [
  {
    icon: CheckCircle2,
    title: 'Kalite Garantisi',
    description: 'Avrupa standartlarında malzeme ve işçilik garantisi sunuyoruz.',
    image: '/quality-assurance.jpg'
  },
  {
    icon: TrendingUp,
    title: 'Sürekli Gelişim',
    description: 'Sektördeki yenilikleri takip ediyor, teknolojiye yatırım yapıyoruz.',
    image: '/development.jpg'
  },
  {
    icon: Users2,
    title: 'Uzman Ekip',
    description: 'Alanında uzman mühendis ve teknik ekibimizle hizmetinizdeyiz.',
    image: '/expert-team.jpg'
  },
  {
    icon: Lightbulb,
    title: 'Yenilikçi Çözümler',
    description: 'Her projeye özel, yaratıcı ve modern çözümler üretiyoruz.',
    image: '/innovation.jpg'
  },
]

const stats = [
  { value: '20+', label: 'Yıllık Deneyim' },
  { value: '500+', label: 'Tamamlanan Proje' },
  { value: '50+', label: 'Uzman Personel' },
  { value: '%100', label: 'Müşteri Memnuniyeti' },
]

const timeline = [
  { 
    step: '01', 
    title: 'Danışmanlık', 
    description: 'Projenizi dinliyor, ihtiyaçlarınızı analiz ediyor ve size en uygun çözümü sunuyoruz.',
    image: '/process-consulting.jpg',
    icon: '🎯'
  },
  { 
    step: '02', 
    title: 'Tasarım Süreci', 
    description: '3D modelleme ile mimari tasarım ve statik hesaplamalarınızı yapıyoruz.',
    image: '/process-design.jpg',
    icon: '📐'
  },
  { 
    step: '03', 
    title: 'Üretim Süreci', 
    description: 'Modern fabrikamızda CNC teknolojisi ile hassas üretim gerçekleştiriyoruz.',
    image: '/process-production.jpg',
    icon: '⚙️'
  },
  { 
    step: '04', 
    title: 'Şantiye Ve Montaj Aşaması', 
    description: 'Deneyimli montaj ekibimiz ile sahada hızlı ve güvenli kurulum yapıyoruz.',
    image: '/process-assembly.jpg',
    icon: '🏗️'
  },
  { 
    step: '05', 
    title: 'Lojistik Ve Sevkiyat Süreci', 
    description: 'Özel araçlarımızla güvenli taşıma ve zamanında teslimat garantisi veriyoruz.',
    image: '/process-logistics.jpg',
    icon: '🚚'
  },
]

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [countedStats, setCountedStats] = useState<number[]>([])
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [activeFeature, setActiveFeature] = useState<number>(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  // Display feature: hover or default to first
  const displayedFeature = hoveredFeature !== null ? hoveredFeature : 0

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            stats.forEach((_, index) => {
              setTimeout(() => {
                setCountedStats(prev => [...prev, index])
              }, index * 200)
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

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20 animate-pulse">
              Hakkımızda
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Çelik Yapıda{' '}
            <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">20 Yılın Tecrübesi</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
            2004 yılından bu yana çelik yapı sektöründe lider konumdayız. Modern teknoloji ve uzman ekibimizle
            projelerinizi hayata geçiriyoruz.
          </p>
        </div>

        {/* Main Content Grid with Sticky Image */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Left: Sticky Image/Video Container */}
          <div className={`lg:sticky lg:top-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              {/* Video Background */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="https://cdn.coverr.co/videos/coverr-steel-construction-site-9893/1080p.mp4" type="video/mp4" />
              </video>

              {/* Image Overlay that changes based on hovered or active feature */}
              <div className="absolute inset-0 transition-opacity duration-700">
                <Image
                  src={features[displayedFeature].image || "/placeholder.svg"}
                  alt={features[displayedFeature].title}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />

              {/* Video Controls */}
              <button
                onClick={toggleVideo}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-all duration-300 group"
              >
                {isVideoPlaying ? (
                  <Pause className="w-5 h-5 text-foreground group-hover:scale-110 transition-transform" />
                ) : (
                  <Play className="w-5 h-5 text-foreground group-hover:scale-110 transition-transform" />
                )}
              </button>

              {/* Active Feature Badge */}
              <div className="absolute top-6 left-6">
                <div className="px-4 py-2 rounded-full bg-accent/90 backdrop-blur-sm border border-accent-foreground/20 animate-pulse">
                  <span className="text-sm font-semibold text-accent-foreground">
                    {features[displayedFeature].title}
                  </span>
                </div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-background/95 backdrop-blur-xl border border-border shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  {stats.slice(0, 2).map((stat, index) => (
                    <div key={stat.label} className={`text-center transition-all duration-700 delay-${index * 100}`}>
                      <div className="text-3xl md:text-4xl font-bold text-accent mb-1 font-mono">
                        {countedStats.includes(index) ? stat.value : '0'}
                      </div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border-4 border-accent/20 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
          </div>

          {/* Right: Features with Hover Only */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                const isHovered = hoveredFeature === index
                
                return (
                  <div
                    key={feature.title}
                    onMouseEnter={() => setHoveredFeature(index)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    className={`group transition-all duration-500 ${
                      isHovered ? 'scale-105' : 'scale-100'
                    }`}
                  >
                    <div className={`flex items-start gap-4 p-8 rounded-3xl bg-card border-2 transition-all duration-500 ${
                      isHovered 
                        ? 'border-accent/70 shadow-2xl shadow-accent/20' 
                        : 'border-border hover:border-accent/30 hover:shadow-xl hover:shadow-accent/10'
                    }`}>
                      {/* Icon with number */}
                      <div className="relative flex-shrink-0">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center transition-all duration-500 ${
                          isHovered ? 'scale-110 rotate-6 shadow-xl shadow-accent/30' : ''
                        }`}>
                          <Icon className="w-8 h-8 text-accent" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold shadow-lg">
                          {index + 1}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className={`text-2xl font-bold mb-3 transition-all duration-300 ${
                          isHovered ? 'text-accent' : 'text-foreground'
                        }`}>
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-base">
                          {feature.description}
                        </p>

                        {/* Progress indicator */}
                        <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r from-accent to-accent/60 transition-all duration-700 ${
                              isHovered ? 'w-full' : 'w-0'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Timeline Process - Enhanced Visual Design */}
        <div className="mt-32">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
                Çalışma Sürecimiz
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Fikir'den Teslim'e <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">5 Adım</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Projelerinizi profesyonel bir süreç yönetimiyle, en yüksek kalite standartlarında hayata geçiriyoruz
            </p>
          </div>

          {/* Vertical Timeline with Images */}
          <div className="max-w-5xl mx-auto space-y-12">
            {timeline.map((item, index) => {
              const isEven = index % 2 === 0
              
              return (
                <div
                  key={item.step}
                  className={`relative group transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`grid lg:grid-cols-2 gap-8 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                    {/* Image Side */}
                    <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-accent/20 transition-all duration-500">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                        
                        {/* Step Icon Badge */}
                        <div className="absolute top-6 left-6">
                          <div className="w-16 h-16 rounded-full bg-accent/90 backdrop-blur-sm border-4 border-accent-foreground/20 flex items-center justify-center text-3xl shadow-lg">
                            {item.icon}
                          </div>
                        </div>

                        {/* Step Number */}
                        <div className="absolute bottom-6 right-6">
                          <div className="w-16 h-16 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center">
                            <span className="text-2xl font-bold bg-gradient-to-br from-accent to-accent/60 bg-clip-text text-transparent">
                              {item.step}
                            </span>
                          </div>
                        </div>

                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="relative p-8 lg:p-12">
                        {/* Large Step Number Background */}
                        <div className="absolute -top-4 -left-4 text-9xl font-bold text-accent/5 select-none">
                          {item.step}
                        </div>
                        
                        <div className="relative">
                          {/* Step Badge */}
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
                            <span className="text-sm font-semibold text-accent">Adım {item.step}</span>
                          </div>

                          <h4 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-accent transition-colors">
                            {item.title}
                          </h4>
                          
                          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                            {item.description}
                          </p>

                          {/* Progress Bar */}
                          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-accent/60 rounded-full transition-all duration-1000 ease-out group-hover:w-full"
                              style={{ width: `${((index + 1) / timeline.length) * 100}%` }}
                            />
                          </div>

                          {/* Completion Percentage */}
                          <div className="mt-3 text-sm font-semibold text-accent">
                            {Math.round(((index + 1) / timeline.length) * 100)}% Tamamlandı
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connecting Arrow (except last item) */}
                  {index < timeline.length - 1 && (
                    <div className="flex justify-center my-8">
                      <div className="w-0.5 h-12 bg-gradient-to-b from-accent/50 to-accent/20" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center">
            <div className="inline-flex flex-col items-center gap-4 p-8 rounded-3xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20">
              <p className="text-lg font-semibold text-foreground">
                Projeniz için detaylı bilgi almak ister misiniz?
              </p>
              <a 
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-accent-foreground font-semibold hover:shadow-xl hover:shadow-accent/50 transition-all duration-300 hover:scale-105"
              >
                Hemen İletişime Geçin
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
