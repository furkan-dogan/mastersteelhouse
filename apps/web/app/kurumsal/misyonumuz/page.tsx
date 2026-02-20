import Image from 'next/image'
import { Target, Sparkles, Award } from 'lucide-react'
import { SitePageShell } from '@/components/site-page-shell'
import { SectionIntro } from '@/components/section-intro'
import { IconFeatureList } from '@/components/icon-feature-list'

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
        <section className="pt-32 pb-20">
          <SectionIntro badge="Misyonumuz" title="Geleceği" accent="İnşa Ediyoruz" />

          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div className="relative h-[500px] rounded-3xl overflow-hidden">
                <Image src="/hero-slide-2.jpg" alt="Misyon" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              </div>

              <IconFeatureList
                items={missionItems}
                itemClassName="rounded-none border-0 bg-transparent p-0"
                iconWrapClassName="h-12 w-12 rounded-xl"
                titleClassName="text-xl font-bold mb-2"
                descriptionClassName="text-base leading-relaxed"
              />
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Çalışma Prensibimiz</h2>
                <p className="text-lg text-muted-foreground leading-relaxed text-center mb-6">
                  Her projede önce ihtiyacı doğru tanımlar, ardından tasarım, üretim ve uygulama adımlarını aynı
                  kalite çizgisinde ilerleterek işlevsel ve güvenli sonuçlar üretiriz.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed text-center">
                  İş ortaklarımızla kurduğumuz açık iletişim, teknik disiplin ve sorumluluk odaklı yaklaşımımız; uzun
                  vadeli iş birliğinin temelini oluşturur.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SitePageShell>
  )
}
