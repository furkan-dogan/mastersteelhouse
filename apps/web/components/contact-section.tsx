'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Phone, Mail, MapPin, Send, Clock, MessageCircle } from 'lucide-react'

const contactInfo = [
  {
    icon: Phone,
    title: 'Telefon',
    description: '7/24 Destek Hattı',
    lines: ['+90 500 000 00 00', '+90 500 000 00 01'],
    color: 'from-blue-500/20 to-blue-600/20',
    iconColor: 'text-blue-500',
  },
  {
    icon: Mail,
    title: 'E-posta',
    description: 'Hızlı İletişim',
    lines: ['info@celikyapi.com', 'proje@celikyapi.com'],
    color: 'from-green-500/20 to-green-600/20',
    iconColor: 'text-green-500',
  },
  {
    icon: MapPin,
    title: 'Adres',
    description: 'Merkez Ofis',
    lines: ['Organize Sanayi Bölgesi', '1. Cadde No: 15, Ankara/Türkiye'],
    color: 'from-purple-500/20 to-purple-600/20',
    iconColor: 'text-purple-500',
  },
  {
    icon: Clock,
    title: 'Çalışma Saatleri',
    description: 'Hafta İçi',
    lines: ['Pazartesi - Cuma: 08:00 - 18:00', 'Cumartesi: 09:00 - 14:00'],
    color: 'from-orange-500/20 to-orange-600/20',
    iconColor: 'text-orange-500',
  },
]

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-background relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20 mb-6">
            <MessageCircle className="w-4 h-4" />
            <span>İletişim</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Projeniz İçin{' '}
            <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">Hemen Başlayalım</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
            Ücretsiz keşif ve teklif almak için formu doldurun, uzman ekibimiz 24 saat içinde size dönüş yapsın.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <div
                key={info.title}
                className={`group relative overflow-hidden rounded-2xl bg-card border border-border p-6 transition-all duration-700 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${info.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
                    {info.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{info.description}</p>
                  <div className="space-y-1">
                    {info.lines.map((line, i) => (
                      <p key={i} className="text-sm text-foreground/80">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
              </div>
            )
          })}
        </div>

        {/* Contact Form */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative overflow-hidden rounded-3xl bg-card border-2 border-border p-8 md:p-12 shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Ücretsiz Teklif Alın
                </h3>
                <p className="text-muted-foreground">
                  Formu doldurun, size özel çözümler sunalım
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-2">
                      Ad Soyad
                      <span className="text-accent">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Adınız ve soyadınız"
                      required
                      className="h-12 border-2 focus:border-accent transition-all duration-300 group-hover:border-accent/50"
                    />
                  </div>
                  <div className="space-y-2 group">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground flex items-center gap-2">
                      Telefon
                      <span className="text-accent">*</span>
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0500 000 00 00"
                      required
                      className="h-12 border-2 focus:border-accent transition-all duration-300 group-hover:border-accent/50"
                    />
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                    E-posta
                    <span className="text-accent">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ornek@email.com"
                    required
                    className="h-12 border-2 focus:border-accent transition-all duration-300 group-hover:border-accent/50"
                  />
                </div>

                <div className="space-y-2 group">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground flex items-center gap-2">
                    Konu
                    <span className="text-accent">*</span>
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Örn: Çelik Villa Teklifi"
                    required
                    className="h-12 border-2 focus:border-accent transition-all duration-300 group-hover:border-accent/50"
                  />
                </div>

                <div className="space-y-2 group">
                  <label htmlFor="message" className="text-sm font-medium text-foreground flex items-center gap-2">
                    Mesajınız
                    <span className="text-accent">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Proje detaylarınızı ve ihtiyaçlarınızı belirtin..."
                    required
                    rows={6}
                    className="resize-none border-2 focus:border-accent transition-all duration-300 group-hover:border-accent/50"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg bg-gradient-to-r from-accent to-accent/80 hover:shadow-xl hover:shadow-accent/50 transition-all duration-300 hover:scale-105 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
