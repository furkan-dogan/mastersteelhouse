'use client'

import { MessageCircle } from 'lucide-react'
import { ContactInfoGrid } from '@/components/contact/contact-info-grid'
import { ContactForm } from '@/components/contact/contact-form'
import { ContactMap } from '@/components/contact/contact-map'
import { ContactResultPopup } from '@/components/contact/contact-result-popup'
import { useContactForm } from '@/components/contact/use-contact-form'
import { useRevealOnScroll } from '@/hooks/use-reveal-on-scroll'
import { CONTACT_WHATSAPP_URL } from '@/lib/contact-details'

export function ContactSection() {
  const { ref, isVisible } = useRevealOnScroll()
  const {
    formData,
    errors,
    isSubmitting,
    resultPopup,
    setResultPopup,
    handleChange,
    handleKvkkChange,
    submit,
  } = useContactForm()

  return (
    <section id="contact" ref={ref} className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-accent mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            İletişim
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground mb-6 text-balance">
            Projeniz İçin{' '}
            <span className="text-accent">Hemen Başlayalım</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
            Ücretsiz keşif ve teklif almak için formu doldurun, uzman ekibimiz 24 saat içinde size dönüş yapsın.
          </p>
          <div className="mt-8">
            <a
              href={CONTACT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsappButton inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
              data-contact-location="contact_section_cta"
              data-contact-label="whatsapp_hizli_iletisim"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp&apos;tan Hızlı İletişim
            </a>
          </div>
        </div>

        <ContactInfoGrid isVisible={isVisible} />

        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="rounded-xl border border-border bg-card p-8 md:p-12">
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-3">Ücretsiz Teklif Alın</h3>
              <p className="text-muted-foreground">Formu doldurun, size özel çözümler sunalım</p>
            </div>

            <ContactForm
              formData={formData}
              errors={errors}
              isSubmitting={isSubmitting}
              onChange={handleChange}
              onKvkkChange={handleKvkkChange}
              onSubmit={submit}
            />
          </div>
        </div>

        <ContactMap isVisible={isVisible} />
      </div>

      <ContactResultPopup popup={resultPopup} onClose={() => setResultPopup(null)} />
    </section>
  )
}
