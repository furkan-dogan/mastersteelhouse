import { SitePageShell } from '@/components/site-page-shell'
import { ProcessHeroSection } from '@/components/process-hero-section'

export default function UretimSureci() {
  return (
    <SitePageShell>
      <main className="min-h-screen pt-32">
        <ProcessHeroSection
          title="Üretim Süreci"
          description="Modern fabrikamızda CNC teknolojisi ile hassas üretim"
          imageSrc="/process-production.jpg"
          imageAlt="Üretim Süreci"
        />
      </main>
    </SitePageShell>
  )
}
