'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, ArrowUp } from 'lucide-react'

export function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const services = [
    'Hafif Çelik Yapı',
    'Çelik Villa',
    'Çelik Konstrüksiyon',
    'Ticari Yapılar',
    'Ofis Binaları',
    'Eğitim Yapıları',
  ]

  const quickLinks = [
    { name: 'Hakkımızda', href: '#about' },
    { name: 'Hizmetlerimiz', href: '#services' },
    { name: 'Projelerimiz', href: '#projects' },
    { name: 'İletişim', href: '#contact' },
  ]

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/mastersteelhous/', color: 'hover:bg-blue-500' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/mastersteelhouse', color: 'hover:bg-pink-500' },
    { name: 'X', icon: Twitter, href: 'https://x.com/mastersteelhous', color: 'hover:bg-sky-500' },
    { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/@mastersteelhouse', color: 'hover:bg-red-600' },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gradient-to-b from-primary to-primary/95 text-primary-foreground relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform">
                  <span className="text-accent-foreground font-bold text-xl">ÇY</span>
                </div>
                <span className="text-2xl font-bold font-mono">ÇELİK YAPI</span>
              </div>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                20+ yıllık tecrübemizle çelik yapı sektöründe güvenilir çözümler sunuyoruz. Kalite, güvenlik ve müşteri memnuniyeti önceliğimizdir.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-3 text-primary-foreground/90">Bizi Takip Edin</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative w-11 h-11 rounded-xl bg-primary-foreground/10 flex items-center justify-center transition-all duration-300 ${social.color} hover:scale-110 hover:shadow-lg group`}
                      aria-label={social.name}
                      onMouseEnter={() => setHoveredSocial(social.name)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      <Icon className="w-5 h-5 relative z-10" />
                      {hoveredSocial === social.name && (
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
                      )}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Hizmetlerimiz
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-accent to-transparent rounded-full" />
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="group">
                  <a 
                    href="#services" 
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground hover:translate-x-2 inline-flex items-center gap-2 transition-all"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Hızlı Linkler
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-accent to-transparent rounded-full" />
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name} className="group">
                  <a 
                    href={link.href} 
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground hover:translate-x-2 inline-flex items-center gap-2 transition-all"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              İletişim
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-accent to-transparent rounded-full" />
            </h3>
            <ul className="space-y-4">
              <li className="group">
                <a 
                  href="tel:+905000000000" 
                  className="flex items-start gap-3 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="pt-1">
                    <div>+90 500 000 00 00</div>
                    <div>+90 500 000 00 01</div>
                  </div>
                </a>
              </li>
              <li className="group">
                <a 
                  href="mailto:info@celikyapi.com" 
                  className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>info@celikyapi.com</span>
                </a>
              </li>
              <li className="group">
                <div className="flex items-start gap-3 text-sm text-primary-foreground/80">
                  <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="pt-1">Organize Sanayi Bölgesi, 1. Cadde No: 15, Ankara/Türkiye</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/70">
            <p>© 2025 Çelik Yapı. Tüm hakları saklıdır.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary-foreground transition-colors relative group">
                Gizlilik Politikası
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
              </a>
              <a href="#" className="hover:text-primary-foreground transition-colors relative group">
                Kullanım Koşulları
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent/80 text-accent-foreground shadow-xl shadow-accent/30 flex items-center justify-center hover:scale-110 transition-all duration-300 z-50 group animate-in fade-in slide-in-from-bottom-4"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </footer>
  )
}
