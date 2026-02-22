import { SiteHeader } from '@/components/site-header'
import { HeroSlider } from '@/components/hero-slider'
import { ProductsSlider } from '@/components/products-slider'
import { StatsStrip } from '@/components/stats-strip'
import { ApplicationsSlider } from '@/components/applications-slider'
import { ProcessTimeline } from '@/components/process-timeline'
import { CtaSection } from '@/components/cta-section'
import { SiteFooter } from '@/components/site-footer'

export default function ProfilHomePage() {
  return (
    <div className="min-h-screen bg-[#0a0e14]">
      <SiteHeader />
      <HeroSlider />
      <ProductsSlider />
      <StatsStrip />
      <ApplicationsSlider />
      <ProcessTimeline />
      <CtaSection />
      <SiteFooter />
    </div>
  )
}
