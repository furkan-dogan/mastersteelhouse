import Image from 'next/image'
import { Cog, Zap, Shield, Award } from 'lucide-react'
import { SitePageShell } from '@/components/site-page-shell'
import { IconFeatureList } from '@/components/icon-feature-list'

export default function CelikYapiUretim() {
  const features = [
    { icon: Cog, title: 'CNC Kesim', description: 'Hassas ölçülerde otomatik kesim teknolojisi' },
    { icon: Zap, title: 'Robotik Kaynak', description: 'Yüksek kaliteli kaynak işlemleri' },
    { icon: Shield, title: 'Kalite Kontrol', description: 'Her aşamada test ve onay süreçleri' },
    { icon: Award, title: 'ISO Sertifikalı', description: 'Uluslararası standartlara uygun üretim' },
  ]

  return (
    <SitePageShell>
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

                <IconFeatureList items={features} />
              </div>

              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/process-production.jpg" alt="Çelik Yapı Üretim" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </SitePageShell>
  )
}
