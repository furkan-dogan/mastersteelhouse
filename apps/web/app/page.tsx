import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { ProjectsSection } from '@/components/projects-section'
import { FAQSection } from '@/components/faq-section'
import { ReferencesSection } from '@/components/references-section'
import { SitePageShell } from '@/components/site-page-shell'

export default function Home() {
  return (
    <SitePageShell>
      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <FAQSection />
        <ReferencesSection />
      </main>
    </SitePageShell>
  )
}
