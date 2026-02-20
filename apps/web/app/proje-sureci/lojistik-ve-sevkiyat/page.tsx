import { SitePageShell } from '@/components/site-page-shell'
import { ProcessHeroSection } from '@/components/process-hero-section'

export default function LojistikVeSevkiyat() {
  return (
    <SitePageShell>
      <main className="min-h-screen pt-32">
        <ProcessHeroSection
          title="Lojistik ve Sevkiyat"
          description="Güvenli taşıma ve zamanında teslimat garantisi"
          imageSrc="/process-logistics.jpg"
          imageAlt="Lojistik ve Sevkiyat"
        />
      </main>
    </SitePageShell>
  )
}
