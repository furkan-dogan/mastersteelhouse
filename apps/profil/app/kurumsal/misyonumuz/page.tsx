import { Target, Sparkles, Award } from 'lucide-react'
import { ProfilePageShell } from '@/components/profile-page-shell'
import { SectionIntro } from '@/components/section-intro'
import { IconFeatureList } from '@/components/icon-feature-list'

export default function MisyonumuzPage() {
  const missionItems = [
    {
      icon: Target,
      title: 'Müşteri Odaklılık',
      description:
        'Her projenin ihtiyaçlarını dikkatle analiz ederek uygulamacının hızını artıran ve hata riskini azaltan profil çözümleri sunuyoruz.',
    },
    {
      icon: Sparkles,
      title: 'Yenilikçi Yaklaşım',
      description:
        'Üretim ve süreç yönetiminde sürekli iyileştirme yaklaşımıyla daha verimli, daha tutarlı ve daha öngörülebilir sonuçlar hedefliyoruz.',
    },
    {
      icon: Award,
      title: 'Kalite Güvencesi',
      description:
        'Malzeme standardı, ürün kontrolü ve teslim disiplinini tek bir kalite çizgisinde birleştirerek uzun vadeli güven sağlıyoruz.',
    },
  ]

  return (
    <ProfilePageShell>
      <section className="pt-12 pb-20 bg-[#f3f4f1]">
        <SectionIntro
          badge="Misyonumuz"
          title="Sahada Değer Üreten"
          accent="Profil Çözümleri"
          description="Misyonumuz; doğru ürün, doğru planlama ve doğru iletişimle proje ekiplerine güvenilir teknik destek sağlamak ve süreç verimliliğini artırmaktır."
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-20 grid items-center gap-12 lg:grid-cols-2">
            <div className="relative h-[500px] overflow-hidden rounded-3xl border border-slate-200">
              <img src="/profil-alcikose.jpg" alt="Misyon" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/45 to-transparent" />
            </div>

            <IconFeatureList items={missionItems} />
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl border border-[#eab308]/30 bg-gradient-to-br from-[#fff9e8] to-[#fff4cc] p-8 md:p-12">
              <h2 className="mb-6 text-center text-2xl font-bold text-slate-900 md:text-3xl">Çalışma Prensibimiz</h2>
              <p className="mb-6 text-center text-lg leading-relaxed text-slate-700">
                Her projede önce ihtiyacı doğru tanımlar, ardından ürün, tedarik ve uygulama akışını aynı kalite çizgisinde ilerleterek
                güvenli ve işlevsel sonuçlar üretiriz.
              </p>
              <p className="text-center text-lg leading-relaxed text-slate-700">
                Teknik disiplin, şeffaf iletişim ve sorumluluk odaklı yaklaşımımız; uzun vadeli iş birliğinin temelini oluşturur.
              </p>
            </div>
          </div>
        </div>
      </section>
    </ProfilePageShell>
  )
}
