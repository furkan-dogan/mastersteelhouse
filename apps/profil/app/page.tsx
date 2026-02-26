import { SiteHeader } from '@/components/site-header'
import { HeroSlider } from '@/components/hero-slider'
import { ProductsSlider } from '@/components/products-slider'
import { ProcessTimeline } from '@/components/process-timeline'
import { FAQSection } from '@/components/faq-section'
import { CtaSection } from '@/components/cta-section'
import { SiteFooter } from '@/components/site-footer'
import { getProfileFaqs, getProfileProducts } from '@/lib/profile-content'

export const dynamic = 'force-dynamic'

export default async function ProfilHomePage() {
  const [products, faqs] = await Promise.all([getProfileProducts(), getProfileFaqs()])

  return (
    <div className="min-h-screen bg-[#f3f4f1]">
      <SiteHeader />
      <HeroSlider products={products} />
      <ProductsSlider products={products} />
      <ProcessTimeline />
      <FAQSection faqs={faqs} limit={4} showMoreButton />
      <CtaSection />
      <SiteFooter />
    </div>
  )
}
