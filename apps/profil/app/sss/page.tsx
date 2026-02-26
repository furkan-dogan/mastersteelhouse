import { FAQSection } from '@/components/faq-section'
import { ProfilePageShell } from '@/components/profile-page-shell'
import { SectionIntro } from '@/components/section-intro'
import { SeoJsonLd } from '@/components/seo-json-ld'
import { getProfileFaqs } from '@/lib/profile-content'
import { absoluteProfileUrl, buildProfileMetadata } from '@/lib/seo'

export const metadata = buildProfileMetadata({
  title: 'Sıkça Sorulan Sorular',
  description: 'Profil sistemleriyle ilgili en çok sorulan teknik ve uygulama sorularının cevapları.',
  path: '/sss',
  keywords: ['sss', 'profil sistemleri sorular', 'teknik soru cevap'],
})

export default async function SssPage() {
  const faqs = await getProfileFaqs()

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
    url: absoluteProfileUrl('/sss'),
  }

  return (
    <ProfilePageShell>
      <SeoJsonLd data={faqSchema} />
      <section className="bg-[#f3f4f1] pb-4 pt-12">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SectionIntro
            badge="Bilgi Merkezi"
            title="Sıkça Sorulan"
            accent="Sorular"
            description="Profil sistemleri, uygulama detayları ve teslim süreçleri hakkında en çok sorulan soruların cevaplarını burada bulabilirsiniz."
          />
        </div>
      </section>
      <FAQSection faqs={faqs} />
    </ProfilePageShell>
  )
}
