'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Send, Clock, MessageCircle } from 'lucide-react'

const contactInfo = [
  {
    icon: Phone,
    title: 'Telefon',
    description: 'Hızlı Destek',
    lines: ['+90 500 000 00 00', '+90 500 000 00 01'],
    color: 'from-blue-500/20 to-blue-600/20',
    iconColor: 'text-blue-600',
  },
  {
    icon: Mail,
    title: 'E-posta',
    description: 'Teknik İletişim',
    lines: ['info@mastersteelhouse.com', 'proje@mastersteelhouse.com'],
    color: 'from-green-500/20 to-green-600/20',
    iconColor: 'text-green-600',
  },
  {
    icon: MapPin,
    title: 'Adres',
    description: 'Merkez Ofis',
    lines: ['Organize Sanayi Bölgesi', '1. Cadde No: 15, Ankara/Türkiye'],
    color: 'from-purple-500/20 to-purple-600/20',
    iconColor: 'text-purple-600',
  },
  {
    icon: Clock,
    title: 'Çalışma Saatleri',
    description: 'Hafta İçi',
    lines: ['Pazartesi - Cuma: 08:00 - 18:00', 'Cumartesi: 09:00 - 14:00'],
    color: 'from-orange-500/20 to-orange-600/20',
    iconColor: 'text-orange-600',
  },
]

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 900))
    alert('Mesajınız alındı. En kısa sürede size dönüş yapacağız.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="teklif" className="relative overflow-hidden bg-[#f3f4f1] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#eab308]/20 bg-[#eab308]/10 px-4 py-2 text-sm font-medium text-[#b88700]">
            <MessageCircle className="h-4 w-4" />
            <span>İletişim</span>
          </div>
          <h2 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl lg:text-6xl">
            Projeniz İçin <span className="bg-gradient-to-r from-[#b88700] to-[#eab308] bg-clip-text text-transparent">Hemen Başlayalım</span>
          </h2>
          <p className="text-lg leading-relaxed text-slate-600 md:text-xl">
            Ücretsiz keşif ve teklif almak için formu doldurun, uzman ekibimiz kısa sürede size dönüş yapsın.
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((info) => {
            const Icon = info.icon
            return (
              <div
                key={info.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#eab308]/50 hover:shadow-lg hover:shadow-[#eab308]/10"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                <div className="relative z-10">
                  <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${info.color}`}>
                    <Icon className={`h-7 w-7 ${info.iconColor}`} />
                  </div>
                  <h3 className="mb-1 text-lg font-bold text-slate-900">{info.title}</h3>
                  <p className="mb-3 text-sm text-slate-500">{info.description}</p>
                  <div className="space-y-1">
                    {info.lines.map((line, i) => (
                      <p key={i} className="text-sm text-slate-700">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-xl md:p-12">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-gradient-to-br from-[#eab308]/10 to-transparent blur-3xl" />
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-gradient-to-tr from-[#eab308]/10 to-transparent blur-3xl" />

            <div className="relative z-10">
              <div className="mb-8">
                <h3 className="mb-3 text-2xl font-bold text-slate-900 md:text-3xl">Ücretsiz Teklif Alın</h3>
                <p className="text-slate-600">Formu doldurun, size özel profil çözümü sunalım</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-slate-900">
                      Ad Soyad <span className="text-[#b88700]">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Adınız ve soyadınız"
                      required
                      className="h-12 w-full rounded-xl border-2 border-slate-200 px-4 text-slate-900 outline-none transition focus:border-[#eab308]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-slate-900">
                      Telefon <span className="text-[#b88700]">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0500 000 00 00"
                      required
                      className="h-12 w-full rounded-xl border-2 border-slate-200 px-4 text-slate-900 outline-none transition focus:border-[#eab308]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-slate-900">
                    E-posta <span className="text-[#b88700]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ornek@email.com"
                    required
                    className="h-12 w-full rounded-xl border-2 border-slate-200 px-4 text-slate-900 outline-none transition focus:border-[#eab308]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="flex items-center gap-2 text-sm font-medium text-slate-900">
                    Konu <span className="text-[#b88700]">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Örn: Profil Teklifi"
                    required
                    className="h-12 w-full rounded-xl border-2 border-slate-200 px-4 text-slate-900 outline-none transition focus:border-[#eab308]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-slate-900">
                    Mesajınız <span className="text-[#b88700]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Proje detaylarınızı ve ihtiyaçlarınızı yazın..."
                    required
                    rows={6}
                    className="w-full resize-none rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-[#eab308]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative h-14 w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#eab308] to-[#d89f00] text-lg font-semibold text-black transition hover:shadow-lg hover:shadow-[#eab308]/40"
                >
                  <span className="relative z-10 inline-flex items-center gap-2">
                    {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
                    <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
