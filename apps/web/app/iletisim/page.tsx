import { Header } from '@/components/header'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'İletişim | Çelik Yapı',
  description: 'Bizimle iletişime geçin. Projeleriniz için profesyonel çelik yapı çözümleri.',
}

export default function IletisimPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-32">
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}
