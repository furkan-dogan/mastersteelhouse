import { ContactSection } from '@/components/contact-section'
import { SitePageShell } from '@/components/site-page-shell'
import { buildPageMetadata } from '@/lib/seo'

export const metadata = buildPageMetadata({
  title: 'İletişim',
  description: 'Bizimle iletişime geçin. Projeleriniz için profesyonel çelik yapı çözümleri.',
  path: '/iletisim',
})

export default function IletisimPage() {
  return (
    <SitePageShell>
      <main className="min-h-screen">
        <div className="page-top-offset">
          <ContactSection />
        </div>
      </main>
    </SitePageShell>
  )
}
