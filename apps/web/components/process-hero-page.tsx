import { SitePageShell } from '@/components/site-page-shell'
import { ProcessHeroSection } from '@/components/process-hero-section'

type ProcessHeroPageProps = {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  sectionClassName?: string
}

export function ProcessHeroPage(props: ProcessHeroPageProps) {
  return (
    <SitePageShell>
      <main className="page-top-offset min-h-screen">
        <ProcessHeroSection {...props} />
      </main>
    </SitePageShell>
  )
}
