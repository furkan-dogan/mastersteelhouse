import { Award, Users, Zap, Target } from 'lucide-react'
import { ProfilePageShell } from '@/components/profile-page-shell'
import { SectionIntro } from '@/components/section-intro'
import { IconFeatureGrid } from '@/components/icon-feature-grid'

export default function HakkimizdaPage() {
  const values = [
    {
      icon: Award,
      title: 'Kalite ve Güven',
      description: 'Profil üretiminde istikrarlı kalite ve güvenilir süreç yönetimiyle sahada öngörülebilir sonuçlar sunuyoruz.',
    },
    {
      icon: Users,
      title: 'Uzman Kadro',
      description: 'Teknik ekip ve saha deneyimi yüksek uzman kadromuzla doğru ürün kararlarını hızla destekliyoruz.',
    },
    {
      icon: Zap,
      title: 'Hızlı ve Etkili',
      description: 'Planlı üretim ve sevkiyat akışıyla uygulama programlarını aksatmadan ilerlemenize yardımcı oluyoruz.',
    },
    {
      icon: Target,
      title: 'Müşteri Odaklı',
      description: 'Her projeyi kendi dinamikleriyle değerlendirip ihtiyaca uygun profil çözümünü net biçimde sunuyoruz.',
    },
  ]

  return (
    <ProfilePageShell>
      <section className="pt-12 pb-20 bg-gradient-to-br from-[#fff8e6] via-[#f3f4f1] to-[#eef1ee]">
        <SectionIntro
          badge="Hakkımızda"
          title="Profil Sistemlerinde"
          accent="Odaklı Uzmanlık"
          description="Alçıköşe, kaba sıva ve tavan U-C ürünlerinde proje planlamadan uygulamaya kadar sahaya uyumlu, güvenilir ve sürdürülebilir çözümler sunuyoruz."
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative h-[500px] overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
            <img src="/profil-kabasiva.jpg" alt="Hakkımızda" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f3f4f1]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">
                Uygulama Sahasına Uyumlu <span className="text-[#b88700]">Teknik Yaklaşım</span>
              </h2>
              <div className="space-y-4 leading-relaxed text-slate-700">
                <p>
                  Profil sistemlerinde sadece ürün sunmakla kalmıyor; uygulama sürecinde hız, doğruluk ve süreklilik sağlayacak
                  teknik bir çalışma disiplini oluşturuyoruz.
                </p>
                <p>
                  Üretimden sevkiyata kadar her adımı planlı yöneterek proje ekiplerinin iş programına uyumlu, net ve güvenilir bir
                  operasyon akışı sağlıyoruz.
                </p>
                <p>
                  Sahadan gelen geri bildirimleri düzenli olarak süreçlerimize dahil ediyor, ürün ve hizmet kalitemizi sürekli
                  geliştiriyoruz.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-48 overflow-hidden rounded-2xl border border-slate-200">
                    <img src="/profil-alcikose.jpg" alt="Proje" className="h-full w-full object-cover" />
                  </div>
                  <div className="relative h-64 overflow-hidden rounded-2xl border border-slate-200">
                    <img src="/profil-tavan-uc.jpg" alt="Proje" className="h-full w-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative h-64 overflow-hidden rounded-2xl border border-slate-200">
                    <img src="/profil-kabasiva.jpg" alt="Proje" className="h-full w-full object-cover" />
                  </div>
                  <div className="relative h-48 overflow-hidden rounded-2xl border border-slate-200">
                    <img src="/profil-alcikose.jpg" alt="Proje" className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#eef1ee] to-[#f8fafc] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">Değerlerimiz</h2>
            <p className="text-lg text-slate-600">Süreç kalitemizi ve iş birliği gücümüzü belirleyen temel yaklaşım başlıklarımız.</p>
          </div>

          <IconFeatureGrid items={values} />
        </div>
      </section>
    </ProfilePageShell>
  )
}
