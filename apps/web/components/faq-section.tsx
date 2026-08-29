'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { homeFaqItems } from '@/lib/content/faqs'

export function FAQSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [openItem, setOpenItem] = useState<string | undefined>(undefined)
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

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <div className="mb-4 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-accent">
            <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
            Sıkça Sorulan Sorular
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground mb-6 text-balance">
            Merak Ettikleriniz <span className="text-accent">Burada</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
            Çelik yapı sistemleri hakkında en çok sorulan sorular ve detaylı cevapları
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion
            type="single"
            collapsible
            className="divide-y divide-border border-t border-b border-border"
            value={openItem}
            onValueChange={setOpenItem}
          >
            {homeFaqItems.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-none">
                <AccordionTrigger className="py-5 text-left hover:no-underline">
                  <span className="text-base font-medium text-foreground md:text-lg">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
                  <p className="text-sm md:text-base">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className={`mt-16 text-center transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <p className="text-lg text-muted-foreground mb-6">
            Başka sorularınız mı var?
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 font-medium text-primary-foreground transition-colors duration-300 hover:bg-primary/90"
          >
            Bize Ulaşın
          </Link>
        </div>
      </div>
    </section>
  )
}
