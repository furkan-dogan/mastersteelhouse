'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mlgwzedw'
const MIN_SUBMIT_MS = 3000

function generateCaptcha() {
  return Math.floor(10000 + Math.random() * 90000).toString()
}

type Props = {
  productName?: string
}

export function QuoteRequestForm({ productName }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [kvkk, setKvkk] = useState(false)
  const [captchaCode, setCaptchaCode] = useState('')
  const [captchaInput, setCaptchaInput] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const mountAtRef = useRef(Date.now())

  useEffect(() => {
    setCaptchaCode(generateCaptcha())
    mountAtRef.current = Date.now()
  }, [])

  function validate() {
    const next: Record<string, string> = {}
    if (!name.trim()) next.name = 'İsim Soyisim zorunludur.'
    if (!phone.trim()) next.phone = 'Telefon Numarası zorunludur.'
    if (!kvkk) next.kvkk = 'KVKK onayı zorunludur.'
    if (captchaInput.trim() !== captchaCode) next.captcha = 'Güvenlik kodu hatalı.'
    return next
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    // Honeypot check
    if (honeypot.trim()) {
      setStatus('success')
      return
    }

    // Bot speed check
    if (Date.now() - mountAtRef.current < MIN_SUBMIT_MS) {
      setErrors({ captcha: 'Gönderim çok hızlı algılandı. Lütfen birkaç saniye sonra tekrar deneyin.' })
      return
    }

    setStatus('submitting')
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          _replyto: email.trim() || phone.trim(),
          _subject: `Fiyat Teklifi: ${productName ?? 'Ürün'}`,
          message: message.trim() || '-',
          product: productName ?? '-',
          kvkkAccepted: 'Evet',
          page: typeof window !== 'undefined' ? window.location.href : '',
        }),
      })
      if (!response.ok) throw new Error('failed')
      setStatus('success')
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
      setKvkk(false)
      setCaptchaInput('')
      setCaptchaCode(generateCaptcha())
    } catch {
      setStatus('error')
    }
  }

  const inputCls =
    'h-14 w-full rounded-lg border border-border bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40'

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-8 py-12 text-center dark:border-emerald-800 dark:bg-emerald-950/30">
        <div className="mb-3 text-4xl">✓</div>
        <h3 className="mb-2 text-xl font-bold text-emerald-700 dark:text-emerald-400">Talebiniz Alındı!</h3>
        <p className="text-emerald-600 dark:text-emerald-500">En kısa sürede sizinle iletişime geçeceğiz.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            placeholder="İsim Soyisim *"
            value={name}
            onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: '' })) }}
            className={`${inputCls} ${errors.name ? 'border-red-400' : ''}`}
          />
          {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name}</p> : null}
        </div>
        <div>
          <input
            type="email"
            placeholder="E-Posta Adresi"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <input
            type="tel"
            placeholder="Telefon Numarası *"
            value={phone}
            onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: '' })) }}
            className={`${inputCls} ${errors.phone ? 'border-red-400' : ''}`}
          />
          {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone}</p> : null}
        </div>
      </div>

      <textarea
        rows={7}
        placeholder="Lütfen mesajınızı yazın..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
      />

      <div className="grid gap-4 sm:grid-cols-[148px_1fr] sm:items-start">
        <div
          className="flex h-14 items-center justify-center rounded-lg border border-border text-xl font-bold tracking-[0.12em] tabular-nums text-foreground sm:text-2xl select-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, rgba(220,38,38,0.12) 0px, rgba(220,38,38,0.12) 2px, transparent 2px, transparent 6px)',
          }}
          aria-label="Güvenlik kodu"
        >
          {captchaCode}
        </div>
        <div>
          <input
            type="text"
            placeholder="Güvenlik kodunu giriniz. *"
            value={captchaInput}
            onChange={(e) => { setCaptchaInput(e.target.value); setErrors((p) => ({ ...p, captcha: '' })) }}
            className={`${inputCls} ${errors.captcha ? 'border-red-400' : ''}`}
          />
          {errors.captcha ? <p className="mt-1 text-xs text-red-600">{errors.captcha}</p> : null}
        </div>
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={kvkk}
            onChange={(e) => { setKvkk(e.target.checked); setErrors((p) => ({ ...p, kvkk: '' })) }}
            className="mt-1 h-4 w-4 rounded border-border"
          />
          <span>
            <strong className="text-foreground">KVKK ve Gizlilik Metni</strong>'ni okudum, anladım ve kabul ediyorum.
          </span>
        </label>
        {errors.kvkk ? <p className="mt-1 text-xs text-red-600">{errors.kvkk}</p> : null}
      </div>

      {status === 'error' ? (
        <p className="text-sm text-red-600">Gönderim sırasında bir sorun oluştu. Lütfen tekrar deneyin.</p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={status === 'submitting'}
        className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 disabled:opacity-60"
      >
        <span className="flex items-center gap-2">
          {status === 'submitting' ? 'Gönderiliyor...' : 'Gönder'}
          <Send className="w-4 h-4" />
        </span>
      </Button>
    </form>
  )
}
