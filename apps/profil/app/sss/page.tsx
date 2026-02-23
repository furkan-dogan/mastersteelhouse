import { FAQSection } from '@/components/faq-section'
import { ProfilePageShell } from '@/components/profile-page-shell'
import { SectionIntro } from '@/components/section-intro'

export default function SssPage() {
  return (
    <ProfilePageShell>
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
      <FAQSection />
    </ProfilePageShell>
  )
}
