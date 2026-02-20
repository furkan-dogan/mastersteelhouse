import { SitePageShell } from '@/components/site-page-shell'
import { ProcessHeroSection } from '@/components/process-hero-section'

export default function SantiyeVeMontaj() {
  return (
    <SitePageShell>
      <main className="min-h-screen pt-32">
        <ProcessHeroSection
          title="Şantiye ve Montaj"
          description="Profesyonel ekibimizle hızlı ve güvenli montaj"
          imageSrc="/process-assembly.jpg"
          imageAlt="Şantiye ve Montaj"
          sectionClassName="bg-muted/30"
        />
      </main>
    </SitePageShell>
  )
}
