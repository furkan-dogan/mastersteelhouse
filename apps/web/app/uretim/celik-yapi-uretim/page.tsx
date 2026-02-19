import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { Cog, Zap, Shield, Award } from 'lucide-react'

export default function CelikYapiUretim() {
  const features = [
    { icon: Cog, title: 'CNC Kesim', description: 'Hassas ölçülerde otomatik kesim teknolojisi' },
    { icon: Zap, title: 'Robotik Kaynak', description: 'Yüksek kaliteli kaynak işlemleri' },
    { icon: Shield, title: 'Kalite Kontrol', description: 'Her aşamada test ve onay süreçleri' },
    { icon: Award, title: 'ISO Sertifikalı', description: 'Uluslararası standartlara uygun üretim' },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32">
        <section className="py-20 bg-gradient-to-br from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Çelik Yapı{' '}
                  <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
                    Üretim
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                  Modern teknoloji ile donatılmış fabrikamızda, yüksek kalite standartlarında çelik yapı üretimi gerçekleştiriyoruz.
                </p>

                <div className="space-y-4">
                  {features.map((feature) => {
                    const Icon = feature.icon
                    return (
                      <div key={feature.title} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent/50 transition-all">
                        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/process-production.jpg" alt="Çelik Yapı Üretim" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
