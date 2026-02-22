import { SiteHeader } from '@/components/site-header'
import { HeroSlider } from '@/components/hero-slider'
import { ProductsSlider } from '@/components/products-slider'
import { ApplicationsSlider } from '@/components/applications-slider'
import { ProcessTimeline } from '@/components/process-timeline'
import { CtaSection } from '@/components/cta-section'
import { SiteFooter } from '@/components/site-footer'

export default function ProfilHomePage() {
  return (
    <div className="min-h-screen bg-[#f3f4f1]">
      <SiteHeader />
      <HeroSlider />
      <ProductsSlider />
      <ApplicationsSlider />
      <ProcessTimeline />
      <CtaSection />
      <SiteFooter />
    </div>
  )
}
