'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Home, Briefcase, GraduationCap, ShoppingBag, Users } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const services = [
  {
    icon: Home,
    title: 'Hafif Çelik Villa',
    description: 'Tek ve çok katlı çelik villalar. Modern tasarım, depreme dayanıklı, enerji verimli yapılar.',
    features: ['Depreme Dayanıklı', 'Hızlı Montaj', 'Enerji Verimli'],
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    icon: Building2,
    title: 'Çelik Konstrüksiyon',
    description: 'Endüstriyel ve ticari çelik yapılar. Geniş açıklıklı, dayanıklı ve esnek çözümler.',
    features: ['Geniş Açıklık', 'Dayanıklı', 'Esnek Tasarım'],
    color: 'from-purple-500/20 to-pink-500/20'
  },
  {
    icon: Briefcase,
    title: 'Ofis Binaları',
    description: 'Modern ofis yapıları. Ergonomik tasarım, akıllı bina sistemleri, çevre dostu yapılar.',
    features: ['Akıllı Sistemler', 'Ergonomik', 'Çevre Dostu'],
    color: 'from-orange-500/20 to-red-500/20'
  },
  {
    icon: ShoppingBag,
    title: 'Ticari Yapılar',
    description: 'Mağaza, restoran, otel ve diğer ticari yapılar için özel çelik konstrüksiyon çözümleri.',
    features: ['Özel Tasarım', 'Hızlı İnşaat', 'Ekonomik'],
    color: 'from-green-500/20 to-emerald-500/20'
  },
  {
    icon: GraduationCap,
    title: 'Eğitim Yapıları',
    description: 'Okul, kreş, eğitim merkezi gibi yapılar için güvenli ve fonksiyonel çözümler.',
    features: ['Güvenli', 'Fonksiyonel', 'Dayanıklı'],
    color: 'from-yellow-500/20 to-amber-500/20'
  },
  {
    icon: Users,
    title: 'Özel Projeler',
    description: 'İhtiyacınıza özel tasarlanmış çelik yapı projeleri. Sınırsız tasarım özgürlüğü.',
    features: ['Özelleştirilebilir', 'Yaratıcı', 'Benzersiz'],
    color: 'from-indigo-500/20 to-violet-500/20'
  },
]

export function ServicesSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            services.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems(prev => [...prev, index])
              }, index * 150)
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
    <section id="services" ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
              Hizmetlerimiz
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Profesyonel <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">Çelik Yapı</span> Hizmetleri
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
            Her türlü çelik yapı ihtiyacınız için kapsamlı çözümler sunuyoruz. 
            Planlama, tasarım ve montaj süreçlerini profesyonelce yönetiyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            const isVisible = visibleItems.includes(index)
            const isHovered = hoveredIndex === index
            
            return (
              <Card 
                key={service.title}
                className={`group relative overflow-hidden transition-all duration-700 border-2 hover:shadow-2xl hover:shadow-accent/20 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                } ${isHovered ? 'scale-105 border-accent/50' : 'border-border hover:border-accent/30'}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                <CardHeader className="relative z-10">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-4 transition-all duration-500 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl mb-3 group-hover:text-accent transition-colors">{service.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, i) => (
                      <span 
                        key={feature}
                        className="px-3 py-1.5 text-xs font-medium rounded-full bg-muted/80 text-muted-foreground group-hover:bg-accent/20 group-hover:text-accent transition-all duration-300"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </CardContent>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-accent/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            {'Projeniz için en uygun çözümü birlikte belirleyelim'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#contact"
              className="group px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-accent-foreground font-semibold hover:shadow-xl hover:shadow-accent/50 transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center gap-2">
                Ücretsiz Danışmanlık Alın
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
