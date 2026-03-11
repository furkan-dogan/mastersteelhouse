import { Target, Sparkles, Award } from 'lucide-react'
import { SitePageShell } from '@/components/site-page-shell'
import { IconFeatureList } from '@/components/icon-feature-list'
import { CorporateIntroSection } from '@/components/corporate-intro-section'
import { MediaBanner } from '@/components/media-banner'

export const metadata = {
  title: 'Misyonumuz | Çelik Yapı',
  description:
    'Hafif çelik yapı projelerinde teknik doğruluk, kaliteli uygulama ve şeffaf süreç yönetimiyle güvenilir çözümler sunuyoruz.',
}

export default function MisyonPage() {
  const missionItems = [
    {
      icon: Target,
      title: 'Müşteri Odaklılık',
      description:
        'Her projenin ihtiyaçlarını detaylı analiz ederek, kullanıcı beklentilerine uygun hafif çelik yapı çözümleri geliştiriyor ve süreç boyunca güçlü iletişim sağlıyoruz.',
    },
    {
      icon: Sparkles,
      title: 'Yenilikçi Yaklaşım',
      description:
        'Tasarım, üretim ve montaj aşamalarında güncel teknolojileri kullanarak verimliliği artıran, güvenli ve sürdürülebilir yapı çözümleri sunuyoruz.',
    },
    {
      icon: Award,
      title: 'Kalite Güvencesi',
      description:
        'Malzeme seçiminden uygulama detaylarına kadar her adımda kalite standartlarını önceliklendirerek uzun ömürlü ve güvenilir çelik yapılar inşa ediyoruz.',
    },
  ]

  return (
    <SitePageShell>
      <main className="min-h-screen">
        <CorporateIntroSection badge="Misyonumuz" title="Geleceği" accent="İnşa Ediyoruz">
          <div className="mb-20 grid items-center gap-12 lg:grid-cols-2">
            <MediaBanner
              src="/hero-slide-2.jpg"
              alt="Misyon"
              heightClassName="h-[500px]"
              overlayClassName="bg-gradient-to-t from-primary/60 to-transparent"
            />

            <IconFeatureList
              items={missionItems}
              itemClassName="rounded-none border-0 bg-transparent p-0"
              iconWrapClassName="h-12 w-12 rounded-xl"
              titleClassName="text-xl font-bold mb-2"
              descriptionClassName="text-base leading-relaxed"
            />
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10 p-8 md:p-12">
              <h2 className="mb-6 text-center text-2xl font-bold md:text-3xl">Çalışma Prensibimiz</h2>
              <p className="mb-6 text-center text-lg leading-relaxed text-muted-foreground">
                Her projede önce ihtiyacı doğru tanımlar, ardından tasarım, üretim ve uygulama adımlarını aynı
                kalite çizgisinde ilerleterek işlevsel ve güvenli sonuçlar üretiriz.
              </p>
              <p className="text-center text-lg leading-relaxed text-muted-foreground">
                İş ortaklarımızla kurduğumuz açık iletişim, teknik disiplin ve sorumluluk odaklı yaklaşımımız; uzun
                vadeli iş birliğinin temelini oluşturur.
              </p>
            </div>
          </div>
        </CorporateIntroSection>
      </main>
    </SitePageShell>
  )
}
