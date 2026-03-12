import { HeroSlider } from '@/components/hero-slider'
import { FAQSection } from '@/components/faq-section'
import { InstagramFollowSection } from '@/components/instagram-follow-section'
import { CtaSection } from '@/components/cta-section'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { SeoJsonLd } from '@/components/seo-json-ld'
import { ProcessTimeline } from '@/components/process-timeline'
import { ProductsSlider } from '@/components/products-slider'
import { HomeSeoContent } from '@/components/home-seo-content'
import { getProfileFaqs, getProfileProducts } from '@/lib/profile-content'
import { absoluteProfileUrl, buildProfileMetadata, PROFILE_SITE_NAME, PROFILE_SITE_URL } from '@/lib/seo'
import { buildBreadcrumbList } from '@/lib/structured-data'

export const revalidate = 300

export const metadata = buildProfileMetadata({
  title: 'Galvanizli Profil Sistemleri: Delikli Alçı Köşe, Kaba Sıva ve Tavan U-C Profilleri',
  description:
    'Galvanizli delikli alçı köşe profili, kaba sıva profili ve tavan U-C profili çözümlerini teknik özellikler, uygulama rehberi ve hızlı teklif desteği ile inceleyin.',
  path: '/',
  keywords: ['profil sistemleri', 'delikli alçı köşe profili', 'kaba sıva profili', 'tavan u-c profili'],
})

export default async function ProfilHomePage() {
  const [products, faqs] = await Promise.all([getProfileProducts(), getProfileFaqs()])

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: PROFILE_SITE_NAME,
    url: PROFILE_SITE_URL,
    inLanguage: 'tr-TR',
  }

  const breadcrumbSchema = buildBreadcrumbList([{ name: 'Anasayfa', path: '/' }])

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Profil Ürünleri',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: product.name,
      url: absoluteProfileUrl(`/urunler/${product.slug}`),
    })),
  }

  return (
    <div className="min-h-screen bg-[#f3f4f1]">
      <SeoJsonLd data={[websiteSchema, breadcrumbSchema, itemListSchema]} />
      <SiteHeader />
      <HeroSlider products={products} />
      <ProductsSlider products={products} />
      <ProcessTimeline />
      <HomeSeoContent />
      <FAQSection faqs={faqs} limit={4} showMoreButton />
      <InstagramFollowSection />
      <CtaSection />
      <SiteFooter />
    </div>
  )
}
