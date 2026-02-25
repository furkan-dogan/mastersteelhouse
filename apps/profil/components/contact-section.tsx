'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Send, Clock, MessageCircle, CheckCircle2, XCircle } from 'lucide-react'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mykdoyzn'
const MIN_SUBMIT_MS = 3000

const contactInfo = [
  {
    icon: Phone,
    title: 'Telefon',
    description: 'Hızlı Destek',
    lines: ['+90 533 498 15 40', '+90 532 603 34 66'],
    color: 'from-blue-500/20 to-blue-600/20',
    iconColor: 'text-blue-600',
  },
  {
    icon: Mail,
    title: 'E-posta',
    description: 'Teknik İletişim',
    lines: ['info@mastersteelhouse.com'],
    color: 'from-green-500/20 to-green-600/20',
    iconColor: 'text-green-600',
  },
  {
    icon: MapPin,
    title: 'Adres',
    description: 'Üretim ve Dağıtım Merkezi',
    lines: ['Saray mahallesi, Gökkuşağı caddesi 16/B Kahramankazan/Ankara'],
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
  const mountAtRef = useRef<number>(Date.now())
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

    // Honeypot: botlar gizli alanı doldurursa sessizce başarılı gibi dön.
    if (formData.company.trim()) {
      setResultPopup({ type: 'success', text: 'Mesajınız alındı. En kısa sürede size dönüş yapacağız.' })
      return
    }

    // Basit hız kontrolü: çok hızlı gönderimler bot adayı.
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

  const inputClass = (field: keyof FormErrors) =>
    `h-12 w-full rounded-xl border-2 px-4 text-slate-900 outline-none transition focus:border-[#eab308] ${
      errors[field] ? 'border-red-400' : 'border-slate-200'
    }`

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
            Teklif almak için formu doldurun, uzman ekibimiz kısa sürede size dönüş yapsın.
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

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="hidden" aria-hidden>
                  <label htmlFor="company">Şirket</label>
                  <input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

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
                      className={inputClass('name')}
                    />
                    {errors.name ? <p className="text-xs text-red-600">{errors.name}</p> : null}
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
                      className={inputClass('phone')}
                    />
                    {errors.phone ? <p className="text-xs text-red-600">{errors.phone}</p> : null}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-slate-900">
                    E-posta <span className="text-xs text-slate-500">(Opsiyonel)</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ornek@email.com"
                    className={inputClass('email')}
                  />
                  {errors.email ? <p className="text-xs text-red-600">{errors.email}</p> : null}
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
                    className={inputClass('subject')}
                  />
                  {errors.subject ? <p className="text-xs text-red-600">{errors.subject}</p> : null}
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
                    rows={6}
                    className={`w-full resize-none rounded-xl border-2 px-4 py-3 text-slate-900 outline-none transition focus:border-[#eab308] ${
                      errors.message ? 'border-red-400' : 'border-slate-200'
                    }`}
                  />
                  {errors.message ? <p className="text-xs text-red-600">{errors.message}</p> : null}
                </div>

                <div className="space-y-2">
                  <label className="flex items-start gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.kvkk}
                      onChange={(event) => {
                        const checked = event.target.checked
                        setFormData((prev) => ({ ...prev, kvkk: checked }))
                        if (checked) setErrors((prev) => ({ ...prev, kvkk: undefined }))
                      }}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#eab308] focus:ring-[#eab308]"
                    />
                    <span>
                      <Link href="/kvkk" className="font-medium text-[#b88700] underline underline-offset-2 hover:text-[#d89f00]">
                        KVKK
                      </Link>{' '}
                      ve{' '}
                      <Link href="/gizlilik-politikasi" className="font-medium text-[#b88700] underline underline-offset-2 hover:text-[#d89f00]">
                        gizlilik metni
                      </Link>{' '}
                      kapsamında verilerimin işlenmesini kabul ediyorum. <span className="text-[#b88700]">*</span>
                    </span>
                  </label>
                  {errors.kvkk ? <p className="text-xs text-red-600">{errors.kvkk}</p> : null}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative h-14 w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#eab308] to-[#d89f00] text-lg font-semibold text-black transition hover:shadow-lg hover:shadow-[#eab308]/40 disabled:cursor-not-allowed disabled:opacity-60"
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

      {resultPopup ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/35 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start gap-3">
              {resultPopup.type === 'success' ? (
                <CheckCircle2 className="mt-0.5 h-6 w-6 text-green-600" />
              ) : (
                <XCircle className="mt-0.5 h-6 w-6 text-red-600" />
              )}
              <div>
                <h4 className="text-lg font-semibold text-slate-900">
                  {resultPopup.type === 'success' ? 'Başarılı' : 'Gönderim Hatası'}
                </h4>
                <p className="mt-1 text-sm text-slate-600">{resultPopup.text}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setResultPopup(null)}
              className="mt-5 h-10 w-full rounded-lg bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Kapat
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}
