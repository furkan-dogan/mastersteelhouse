import { Eye, TrendingUp, Globe, Lightbulb } from 'lucide-react'
import { ProfilePageShell } from '@/components/profile-page-shell'
import { SectionIntro } from '@/components/section-intro'
import { IconFeatureGrid } from '@/components/icon-feature-grid'

export default function VizyonumuzPage() {
  const goals = [
    {
      icon: TrendingUp,
      title: 'Sektörel Güç',
      description: 'Profil sistemlerinde kalite ve güven dengesini referans alınan bir standart haline getirmek.',
    },
    {
      icon: Globe,
      title: 'Yaygın Etki',
      description: 'Farklı proje ölçeklerinde sürdürülebilir sonuç üreten güçlü bir çözüm ağı oluşturmak.',
    },
    {
      icon: Lightbulb,
      title: 'Sürekli Gelişim',
      description: 'Sahadan gelen verilerle süreçleri düzenli iyileştirerek daha verimli bir yapı kurmak.',
    },
    {
      icon: Eye,
      title: 'Uzun Vadeli Güven',
      description: 'Müşteri deneyimini merkeze alan yaklaşımımızla kalıcı iş birlikleri geliştirmek.',
    },
  ]

  return (
    <ProfilePageShell>
      <section className="pt-12 pb-20 bg-[#f3f4f1]">
        <SectionIntro
          badge="Vizyonumuz"
          title="Geleceğe"
          accent="Planlı Büyüme"
          description="Vizyonumuz; profil sistemlerinde güvenilirliği, yenilikçiliği ve operasyonel disiplini birlikte yükselterek güçlü bir marka konumu inşa etmektir."
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative mb-20 h-[400px] overflow-hidden rounded-3xl border border-slate-200">
            <img src="/profil-tavan-uc.jpg" alt="Vizyon" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="mb-4 text-4xl font-bold md:text-6xl">Vizyon Odaklı</div>
                <div className="text-lg font-semibold md:text-2xl">Sürdürülebilir Gelişim</div>
              </div>
            </div>
          </div>

          <IconFeatureGrid items={goals} />

          <div className="mx-auto mt-20 max-w-4xl">
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-[#eef1ee] p-8 md:p-12">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 md:text-3xl">Stratejik Önceliklerimiz</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">Operasyonel Mükemmellik</h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Planlama, üretim ve teslim süreçlerinde ölçülebilir kaliteyi kalıcı standarda dönüştürmek.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">Veriyle İyileştirme</h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Saha geri bildirimlerini karar süreçlerine taşıyarak verimliliği sürekli yükseltmek.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">Marka Güveni</h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Kullanıcı deneyimi ve teknik tutarlılıkla uzun vadeli iş ortaklıklarını güçlendirmek.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ProfilePageShell>
  )
}
