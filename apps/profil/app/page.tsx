import { SiteHeader } from '@/components/site-header'
import { HeroSlider } from '@/components/hero-slider'
import { ProductsSlider } from '@/components/products-slider'
import { ProcessTimeline } from '@/components/process-timeline'
import { FAQSection } from '@/components/faq-section'
import { CtaSection } from '@/components/cta-section'
import { SiteFooter } from '@/components/site-footer'

export default function ProfilHomePage() {
  return (
    <div className="min-h-screen bg-[#f3f4f1]">
      <SiteHeader />
      <HeroSlider />
      <ProductsSlider />
      <ProcessTimeline />
      <FAQSection limit={4} showMoreButton />
      <CtaSection />
      <SiteFooter />
    </div>
  )
}
