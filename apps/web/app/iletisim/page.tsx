import { ContactSection } from '@/components/contact-section'
import { SitePageShell } from '@/components/site-page-shell'

export const metadata = {
  title: 'İletişim | Çelik Yapı',
  description: 'Bizimle iletişime geçin. Projeleriniz için profesyonel çelik yapı çözümleri.',
}

export default function IletisimPage() {
  return (
    <SitePageShell>
      <main className="min-h-screen">
        <div className="pt-32">
          <ContactSection />
        </div>
      </main>
    </SitePageShell>
  )
}
