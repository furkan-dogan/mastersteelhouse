import { ProfilePageShell } from '@/components/profile-page-shell'
import { ContactSection } from '@/components/contact-section'
import { SeoJsonLd } from '@/components/seo-json-ld'
import { absoluteProfileUrl, buildProfileMetadata } from '@/lib/seo'
import { buildBreadcrumbList } from '@/lib/structured-data'

export const metadata = buildProfileMetadata({
  title: 'İletişim',
  description: 'Profil sistemleri için teklif, teknik destek ve ürün bilgisi taleplerinizde bizimle iletişime geçin.',
  path: '/iletisim',
  keywords: ['profil iletişim', 'teklif formu', 'teknik destek'],
})

export default function IletisimPage() {
  const breadcrumbSchema = buildBreadcrumbList([
    { name: 'Anasayfa', path: '/' },
    { name: 'İletişim', path: '/iletisim' },
  ])

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'İletişim',
    url: absoluteProfileUrl('/iletisim'),
    isPartOf: absoluteProfileUrl('/'),
  }

  return (
    <ProfilePageShell>
      <SeoJsonLd data={[breadcrumbSchema, contactSchema]} />
      <ContactSection />
    </ProfilePageShell>
  )
}
