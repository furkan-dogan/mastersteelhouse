'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Phone, Mail, MapPin, Send, Clock, MessageCircle, CheckCircle2, XCircle } from 'lucide-react'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mlgwzedw'
const MIN_SUBMIT_MS = 3000

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

type ContactFormState = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  kvkk: boolean
  company: string
}

type FormErrors = Partial<Record<'name' | 'email' | 'phone' | 'subject' | 'message' | 'kvkk', string>>

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    kvkk: false,
    company: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resultPopup, setResultPopup] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const mountAtRef = useRef<number>(Date.now())

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

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {}

    if (!formData.name.trim()) nextErrors.name = 'Ad Soyad zorunludur.'
    if (!formData.phone.trim()) nextErrors.phone = 'Telefon zorunludur.'
    if (!formData.subject.trim()) nextErrors.subject = 'Konu zorunludur.'
    if (!formData.message.trim()) nextErrors.message = 'Mesaj zorunludur.'
    if (formData.email.trim() && !isValidEmail(formData.email.trim())) {
      nextErrors.email = 'E-posta formatı geçersiz.'
    }
    if (!formData.kvkk) nextErrors.kvkk = 'Onay vermeden gönderim yapılamaz.'

    return nextErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    if (formData.company.trim()) {
      setResultPopup({ type: 'success', text: 'Mesajınız alındı. En kısa sürede size dönüş yapacağız.' })
      return
    }

    if (Date.now() - mountAtRef.current < MIN_SUBMIT_MS) {
      setResultPopup({ type: 'error', text: 'Gönderim çok hızlı algılandı. Lütfen birkaç saniye sonra tekrar deneyin.' })
      return
    }

    setIsSubmitting(true)
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim() || undefined,
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        kvkkAccepted: formData.kvkk ? 'Evet' : 'Hayır',
        page: typeof window !== 'undefined' ? window.location.href : '/iletisim',
      }

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Form gönderimi başarısız')
      }

      setFormData({ name: '', email: '', phone: '', subject: '', message: '', kvkk: false, company: '' })
      setErrors({})
      setResultPopup({ type: 'success', text: 'Mesajınız alındı. En kısa sürede size dönüş yapacağız.' })
    } catch {
      setResultPopup({ type: 'error', text: 'Gönderim sırasında bir sorun oluştu. Lütfen tekrar deneyin.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
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

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
              </div>
            )
          })}
        </div>

        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative overflow-hidden rounded-3xl bg-card border-2 border-border p-8 md:p-12 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Ücretsiz Teklif Alın</h3>
                <p className="text-muted-foreground">Formu doldurun, size özel çözümler sunalım</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="hidden" aria-hidden>
                  <label htmlFor="company">Şirket</label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

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
                      className={`h-12 border-2 focus:border-accent transition-all duration-300 group-hover:border-accent/50 ${errors.name ? 'border-red-400' : ''}`}
                    />
                    {errors.name ? <p className="text-xs text-red-600">{errors.name}</p> : null}
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
                      className={`h-12 border-2 focus:border-accent transition-all duration-300 group-hover:border-accent/50 ${errors.phone ? 'border-red-400' : ''}`}
                    />
                    {errors.phone ? <p className="text-xs text-red-600">{errors.phone}</p> : null}
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                    E-posta
                    <span className="text-xs text-muted-foreground">(Opsiyonel)</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ornek@email.com"
                    className={`h-12 border-2 focus:border-accent transition-all duration-300 group-hover:border-accent/50 ${errors.email ? 'border-red-400' : ''}`}
                  />
                  {errors.email ? <p className="text-xs text-red-600">{errors.email}</p> : null}
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
                    className={`h-12 border-2 focus:border-accent transition-all duration-300 group-hover:border-accent/50 ${errors.subject ? 'border-red-400' : ''}`}
                  />
                  {errors.subject ? <p className="text-xs text-red-600">{errors.subject}</p> : null}
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
                    rows={6}
                    className={`resize-none border-2 focus:border-accent transition-all duration-300 group-hover:border-accent/50 ${errors.message ? 'border-red-400' : ''}`}
                  />
                  {errors.message ? <p className="text-xs text-red-600">{errors.message}</p> : null}
                </div>

                <div className="space-y-2">
                  <label className="flex items-start gap-3 text-sm text-foreground/90">
                    <input
                      type="checkbox"
                      checked={formData.kvkk}
                      onChange={(event) => {
                        const checked = event.target.checked
                        setFormData((prev) => ({ ...prev, kvkk: checked }))
                        if (checked) setErrors((prev) => ({ ...prev, kvkk: undefined }))
                      }}
                      className="mt-0.5 h-4 w-4 rounded border-border text-accent focus:ring-accent"
                    />
                    <span>
                      <Link href="/kvkk" className="font-medium text-accent underline underline-offset-2 hover:opacity-80">
                        KVKK
                      </Link>{' '}
                      ve{' '}
                      <Link href="/gizlilik-politikasi" className="font-medium text-accent underline underline-offset-2 hover:opacity-80">
                        gizlilik metni
                      </Link>{' '}
                      kapsamında verilerimin işlenmesini kabul ediyorum. <span className="text-accent">*</span>
                    </span>
                  </label>
                  {errors.kvkk ? <p className="text-xs text-red-600">{errors.kvkk}</p> : null}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg bg-gradient-to-r from-accent to-accent/80 hover:shadow-xl hover:shadow-accent/50 transition-all duration-300 hover:scale-105 group relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {resultPopup ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/35 px-4">
          <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-2xl border border-border">
            <div className="flex items-start gap-3">
              {resultPopup.type === 'success' ? (
                <CheckCircle2 className="mt-0.5 h-6 w-6 text-green-600" />
              ) : (
                <XCircle className="mt-0.5 h-6 w-6 text-red-600" />
              )}
              <div>
                <h4 className="text-lg font-semibold text-foreground">
                  {resultPopup.type === 'success' ? 'Başarılı' : 'Gönderim Hatası'}
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">{resultPopup.text}</p>
              </div>
            </div>
            <Button
              type="button"
              onClick={() => setResultPopup(null)}
              className="mt-5 h-10 w-full"
            >
              Kapat
            </Button>
          </div>
        </div>
      ) : null}
    </section>
  )
}
