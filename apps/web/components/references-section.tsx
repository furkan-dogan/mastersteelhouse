'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const clients = [
  { id: 1, name: 'Client 1', logo: '/client-1.jpg' },
  { id: 2, name: 'Client 2', logo: '/client-2.jpg' },
  { id: 3, name: 'Client 3', logo: '/client-3.jpg' },
  { id: 4, name: 'Client 4', logo: '/client-4.jpg' },
  { id: 5, name: 'Client 5', logo: '/client-5.jpg' },
  { id: 6, name: 'Client 6', logo: '/client-6.jpg' },
  { id: 7, name: 'Client 7', logo: '/client-7.jpg' },
  { id: 8, name: 'Client 8', logo: '/client-8.jpg' },
]

export function ReferencesSection() {
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

  // Double the clients array for seamless infinite scroll
  const doubledClients = [...clients, ...clients]

  return (
    <section 
      id="references" 
      ref={sectionRef} 
      className="py-24 bg-gradient-to-b from-muted/30 via-muted/10 to-background relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
              Referanslarımız
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Güvenilir Markalarla{' '}
            <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">Çalışıyoruz</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
            Türkiye'nin önde gelen kurumları bizimle çalışmayı tercih ediyor
          </p>
        </div>

        {/* Scrolling Logos */}
        <div className={`space-y-12 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* First Row - Left to Right */}
          <div className="relative">
            <div className="flex overflow-hidden">
              <div className="flex animate-scroll-left">
                {doubledClients.map((client, index) => (
                  <div
                    key={`left-${client.id}-${index}`}
                    className="flex-shrink-0 mx-6 w-48 h-32 relative group"
                  >
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-card border-2 border-border hover:border-accent/50 transition-all duration-500 hover:shadow-xl hover:shadow-accent/20 hover:scale-110">
                      <Image
                        src={client.logo || "/placeholder.svg"}
                        alt={client.name}
                        fill
                        className="object-contain p-6 grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                      
                      {/* Hover Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Fade Gradients */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          </div>

          {/* Second Row - Right to Left */}
          <div className="relative">
            <div className="flex overflow-hidden">
              <div className="flex animate-scroll-right">
                {doubledClients.map((client, index) => (
                  <div
                    key={`right-${client.id}-${index}`}
                    className="flex-shrink-0 mx-6 w-48 h-32 relative group"
                  >
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-card border-2 border-border hover:border-accent/50 transition-all duration-500 hover:shadow-xl hover:shadow-accent/20 hover:scale-110">
                      <Image
                        src={client.logo || "/placeholder.svg"}
                        alt={client.name}
                        fill
                        className="object-contain p-6 grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                      
                      {/* Hover Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Fade Gradients */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-20 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold mb-2 font-mono bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                500+
              </div>
              <div className="text-sm text-muted-foreground">Mutlu Müşteri</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold mb-2 font-mono bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                20+
              </div>
              <div className="text-sm text-muted-foreground">Yıllık Deneyim</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold mb-2 font-mono bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                %98
              </div>
              <div className="text-sm text-muted-foreground">Memnuniyet Oranı</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold mb-2 font-mono bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                50+
              </div>
              <div className="text-sm text-muted-foreground">Uzman Ekip</div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
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
