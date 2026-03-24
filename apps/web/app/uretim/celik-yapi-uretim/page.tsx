import { Cog, Zap, Shield, Award } from 'lucide-react'
import { SitePageShell } from '@/components/site-page-shell'
import { MediaFeatureSection } from '@/components/media-feature-section'
import { buildPageMetadata } from '@/lib/seo'

export const metadata = buildPageMetadata({
  title: 'Çelik Yapı Üretim',
  description: 'Modern üretim tesisimizde CNC destekli hassas çelik yapı üretim süreçleri.',
  path: '/uretim/celik-yapi-uretim',
})

export default function CelikYapiUretim() {
  const features = [
    { icon: Cog, title: 'CNC Kesim', description: 'Hassas ölçülerde otomatik kesim teknolojisi' },
    { icon: Zap, title: 'Robotik Kaynak', description: 'Yüksek kaliteli kaynak işlemleri' },
    { icon: Shield, title: 'Kalite Kontrol', description: 'Her aşamada test ve onay süreçleri' },
    { icon: Award, title: 'ISO Sertifikalı', description: 'Uluslararası standartlara uygun üretim' },
  ]

  return (
    <SitePageShell>
      <main className="page-top-offset min-h-screen">
        <MediaFeatureSection
          title="Çelik Yapı"
          accent="Üretim"
          description="Modern teknoloji ile donatılmış fabrikamızda, yüksek kalite standartlarında çelik yapı üretimi gerçekleştiriyoruz."
          imageSrc="/process-production.jpg"
          imageAlt="Çelik Yapı Üretim"
          items={features}
          sectionClassName="bg-gradient-to-br from-primary/5 to-background"
        />
      </main>
    </SitePageShell>
  )
}
