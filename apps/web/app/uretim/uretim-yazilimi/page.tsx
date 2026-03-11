import { Cpu, Database, Network, Monitor } from 'lucide-react'
import { SitePageShell } from '@/components/site-page-shell'
import { IconFeatureGrid } from '@/components/icon-feature-grid'
import { CorporateIntroSection } from '@/components/corporate-intro-section'

export default function UretimYazilimi() {
  const systems = [
    { icon: Cpu, title: 'CNC Programlama', description: 'Otomatik kesim ve delme programları' },
    { icon: Database, title: 'ERP Sistemi', description: 'Üretim takip ve stok yönetimi' },
    { icon: Network, title: 'Otomasyon', description: 'Fabrika otomasyon sistemleri' },
    { icon: Monitor, title: 'Kalite Takip', description: 'Dijital kalite kontrol yazılımları' },
  ]

  return (
    <SitePageShell>
      <main className="min-h-screen">
        <CorporateIntroSection
          title="Üretim"
          accent="Yazılımı"
          description="Üretim süreçlerimizi dijitalleştiren ve optimize eden yazılım çözümlerimiz."
          sectionClassName="bg-muted/30"
        >
          <IconFeatureGrid
            items={systems}
            titleClassName="mb-2"
            descriptionClassName="text-base"
            iconWrapClassName="bg-transparent h-auto w-auto mb-4"
            iconClassName="h-12 w-12"
            cardClassName="hover:shadow-xl"
          />
        </CorporateIntroSection>
      </main>
    </SitePageShell>
  )
}
