import Link from 'next/link'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { ContactFormState, FormErrors } from '@/components/contact/types'

type ContactFormProps = {
  formData: ContactFormState
  errors: FormErrors
  isSubmitting: boolean
  onChange: (name: keyof ContactFormState, value: string) => void
  onKvkkChange: (checked: boolean) => void
  onSubmit: () => Promise<void>
}

export function ContactForm({ formData, errors, isSubmitting, onChange, onKvkkChange, onSubmit }: ContactFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        void onSubmit()
      }}
      className="space-y-6"
      noValidate
    >
      <div className="hidden" aria-hidden>
        <label htmlFor="company">Şirket</label>
        <Input
          id="company"
          name="company"
          value={formData.company}
          onChange={(event) => onChange('company', event.target.value)}
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
            onChange={(event) => onChange('name', event.target.value)}
            placeholder="Adınız ve soyadınız"
            className={`h-12 border border-border/60 focus:border-accent transition-colors duration-300 ${errors.name ? 'border-red-400' : ''}`}
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
            onChange={(event) => onChange('phone', event.target.value)}
            placeholder="0500 000 00 00"
            className={`h-12 border border-border/60 focus:border-accent transition-colors duration-300 ${errors.phone ? 'border-red-400' : ''}`}
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
          onChange={(event) => onChange('email', event.target.value)}
          placeholder="ornek@email.com"
          className={`h-12 border border-border/60 focus:border-accent transition-colors duration-300 ${errors.email ? 'border-red-400' : ''}`}
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
          onChange={(event) => onChange('subject', event.target.value)}
          placeholder="Örn: Çelik Villa Teklifi"
          className={`h-12 border border-border/60 focus:border-accent transition-colors duration-300 ${errors.subject ? 'border-red-400' : ''}`}
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
          onChange={(event) => onChange('message', event.target.value)}
          placeholder="Proje detaylarınızı ve ihtiyaçlarınızı belirtin..."
          rows={6}
          className={`resize-none border border-border/60 focus:border-accent transition-colors duration-300 ${errors.message ? 'border-red-400' : ''}`}
        />
        {errors.message ? <p className="text-xs text-red-600">{errors.message}</p> : null}
      </div>

      <div className="space-y-2">
        <label className="flex items-start gap-3 text-sm text-foreground/90">
          <input
            type="checkbox"
            checked={formData.kvkk}
            onChange={(event) => onKvkkChange(event.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-border text-accent focus:ring-accent"
          />
          <span>
            <Link href="/kvkk" className="font-medium text-accent underline underline-offset-2 hover:opacity-80">
              KVKK
            </Link>{' '}
            ve{' '}
            <Link
              href="/gizlilik-politikasi"
              className="font-medium text-accent underline underline-offset-2 hover:opacity-80"
            >
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
        className="w-full h-14 text-lg bg-accent hover:bg-accent/90 transition-colors duration-300 group disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span className="flex items-center gap-2">
          {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
      </Button>
    </form>
  )
}
