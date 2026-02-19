'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Sparkles } from 'lucide-react'

const faqs = [
  {
    question: 'Çelik Evler Neden Geleneksel Yapılara Göre Daha Avantajlıdır?',
    answer: 'Çelik evler, yüksek deprem dayanıklılığı, üstün ısı ve ses izolasyonu, hızlı montaj avantajı ve enerji verimliliği özellikleriyle öne çıkar. Profesyonel üretim süreçleri ve kaliteli malzeme kullanımı sayesinde, uzun ömürlü ve minimum bakım gerektiren yapılar sunuyoruz. Modern çelik yapı teknolojisi, geleneksel yapılara göre %40\'a varan maliyet avantajı sağlarken, çevre dostu özellikleriyle de sürdürülebilir bir yaşam vadediyor.',
  },
  {
    question: 'Çelik Ev Fiyatları Nasıl Belirlenir?',
    answer: 'Çelik ev fiyatları, projenin metrekaresi, mimari tasarımı, kullanılan malzemelerin kalitesi ve özel isteklere göre değişiklik gösterir. Anahtar teslim projelerimizde, zemin etüdü, mimari tasarım, statik proje, elektrik-mekanik tesisatı ve iç-dış cephe uygulamaları dahil tüm hizmetler tek pakette sunulur. Her bütçeye uygun çözümler ve esnek ödeme seçenekleriyle, hayalinizdeki eve sahip olmanızı kolaylaştırıyoruz.',
  },
  {
    question: 'Çelik Konstrüksiyon Yapıların Deprem Güvenliği Nasıl Sağlanır?',
    answer: 'Çelik konstrüksiyon sistemlerimiz, en zorlu deprem koşullarına dayanacak şekilde tasarlanıyor. ISO standartlarına uygun yüksek mukavemetli çelik malzeme kullanımı, profesyonel mühendislik hesaplamaları ve özel bağlantı detaylarıyla maksimum güvenlik sağlıyoruz. Esnek yapısal özellikleri sayesinde deprem enerjisini sönümleyen çelik sistemler, yapının bütünlüğünü koruyarak can ve mal güvenliğini garanti ediyor.',
  },
  {
    question: 'Çelik Evlerde Isı ve Ses Yalıtımı Nasıl Sağlanır?',
    answer: 'Modern çelik evlerimizde, sandviç panel sistemi ve özel yalıtım malzemeleriyle üstün ısı ve ses izolasyonu sağlıyoruz. Dış cephede kullanılan yüksek performanslı yalıtım malzemeleri, kışın ısı kaybını, yazın ise ısı kazancını minimize ediyor. İç mekanlarda uygulanan akustik çözümler ve özel ses yalıtım sistemleri, konforlu bir yaşam alanı yaratıyor. Bu sayede enerji verimliliği artarken, ısıtma-soğutma maliyetleri önemli ölçüde azalıyor.',
  },
  {
    question: 'Çelik Ev Projeleri Ne Kadar Sürede Tamamlanır?',
    answer: 'Çelik yapı teknolojimiz sayesinde, projeleri geleneksel yapılara göre çok daha hızlı tamamlıyoruz. Ortalama 120-150 m² bir çelik ev projesi, fabrika üretimi ve saha montajı dahil 45-60 gün içinde tamamlanabiliyor. Projelendirme aşamasından anahtar teslimine kadar tüm süreçler, profesyonel ekibimiz tarafından titizlikle yönetiliyor. Hava koşullarından minimum etkilenen montaj sistemimiz, projelerin planlanan sürede teslim edilmesini garanti ediyor.',
  },
  {
    question: 'Hafif Çelik Yapı Nedir?',
    answer: 'Hafif çelik yapı, galvanize edilmiş çelik profiller kullanılarak inşa edilen, modern yapı teknolojisiyle üretilen konutlardır. Bu yapılar, geleneksel betonarme evlere göre daha hafif ve depreme dayanıklıdır. Yüksek mukavemet özelliklerine sahip galvanizli çelik profillerden üretilir ve 0.9-2.5 mm arasında değişen et kalınlığına sahip profilleri kullanır.',
  },
]

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
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        
        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-accent/20 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20 mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Sıkça Sorulan Sorular</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Merak Ettikleriniz{' '}
            <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">Burada</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
            Çelik yapı sistemleri hakkında en çok sorulan sorular ve detaylı cevapları
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion 
            type="single" 
            collapsible 
            className="space-y-4"
            value={openItem}
            onValueChange={setOpenItem}
          >
            {faqs.map((faq, index) => {
              const isOpen = openItem === `item-${index}`
              const itemVisible = isVisible
              
              return (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className={`group relative bg-card border-2 border-border rounded-2xl overflow-hidden transition-all duration-700 hover:shadow-xl hover:shadow-accent/10 ${
                    isOpen ? 'border-accent shadow-xl shadow-accent/20' : ''
                  } ${
                    itemVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Gradient background on hover/open */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 opacity-0 transition-opacity duration-500 ${
                    isOpen ? 'opacity-100' : 'group-hover:opacity-100'
                  }`} />
                  
                  {/* Number badge */}
                  <div className={`absolute -top-3 -left-3 w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center text-accent-foreground font-bold shadow-lg transition-all duration-500 ${
                    isOpen ? 'scale-110 shadow-accent/50' : 'scale-100'
                  }`}>
                    {index + 1}
                  </div>

                  <AccordionTrigger className="relative text-left hover:no-underline py-6 px-6 pl-16 group/trigger">
                    <span className={`text-base md:text-lg font-semibold pr-8 transition-colors ${
                      isOpen ? 'text-accent' : 'text-foreground group-hover/trigger:text-accent'
                    }`}>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  
                  <AccordionContent className="relative text-muted-foreground leading-relaxed px-6 pl-16 pb-6">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-accent to-transparent mb-4 animate-in fade-in slide-in-from-left-2 duration-300" />
                    <p className="text-sm md:text-base animate-in fade-in slide-in-from-top-2 duration-300 delay-75">{faq.answer}</p>
                  </AccordionContent>

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-lg text-muted-foreground mb-6">
            Başka sorularınız mı var?
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-accent-foreground font-semibold hover:shadow-xl hover:shadow-accent/50 transition-all duration-300 hover:scale-105"
          >
            Bize Ulaşın
          </a>
        </div>
      </div>
    </section>
  )
}
