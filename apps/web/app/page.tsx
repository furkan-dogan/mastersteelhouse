import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { ProjectsSection } from '@/components/projects-section'
import { FAQSection } from '@/components/faq-section'
import { ReferencesSection } from '@/components/references-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <FAQSection />
      <ReferencesSection />
      <Footer />
    </main>
  )
}
