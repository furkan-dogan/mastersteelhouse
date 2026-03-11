import { Award, Users, Zap, Target } from 'lucide-react'
import { SitePageShell } from '@/components/site-page-shell'
import { IconFeatureGrid } from '@/components/icon-feature-grid'
import { CorporateIntroSection } from '@/components/corporate-intro-section'
import { MediaBanner } from '@/components/media-banner'

export const metadata = {
  title: 'Hakkımızda | Çelik Yapı',
  description:
    'Kurumsal yapımız, teknik uzmanlığımız ve uygulama disiplinimizle hafif çelik yapı projelerinde uçtan uca çözüm sunuyoruz.',
}

export default function HakkimizdaPage() {
  const values = [
    {
      icon: Award,
      title: 'Kalite ve Güven',
      description: 'Avrupa standartlarında üretim ve ISO sertifikalarımızla güvence altındayız.',
    },
    {
      icon: Users,
      title: 'Uzman Kadro',
      description: 'Alanında uzman mühendis ve teknisyenlerden oluşan profesyonel ekibimiz.',
    },
    {
      icon: Zap,
      title: 'Hızlı ve Etkili',
      description: 'Modern üretim teknikleriyle kısa sürede projelerinizi teslim ediyoruz.',
    },
    {
      icon: Target,
      title: 'Müşteri Odaklı',
      description: 'Müşteri memnuniyetini her zaman ön planda tutarak çalışıyoruz.',
    },
  ]

  return (
    <SitePageShell>
      <main className="min-h-screen">
        <CorporateIntroSection
          badge="Hakkımızda"
          title="Çelik Yapıda"
          accent="Öncü Firmayız"
          description="Hafif çelik yapı sistemlerinde uzun yıllara dayanan birikimimizle, güvenli ve estetik yaşam alanları inşa ediyoruz. Kalite odaklı yaklaşımımızla her projede sürdürülebilir değer üretiyoruz."
          sectionClassName="bg-gradient-to-br from-primary/5 via-background to-accent/5"
        >
          <MediaBanner
            src="/steel-structure.jpg"
            alt="Hakkımızda"
            heightClassName="h-[500px]"
            className="shadow-2xl"
            overlayClassName="bg-gradient-to-t from-primary/80 via-transparent to-transparent"
          />
        </CorporateIntroSection>

        <section className="bg-background py-20">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                  Uzun Yıllara Dayanan <span className="text-accent">Uzmanlık</span>
                </h2>
                <div className="space-y-4 leading-relaxed text-muted-foreground">
                  <p>
                    Firmamız, hafif çelik yapı sistemleri alanında proje planlamadan uygulamaya kadar uçtan uca hizmet
                    sunar. Konut projelerinden endüstriyel ve ticari yapılara uzanan geniş bir ölçekte, ihtiyaca özel
                    çözümler geliştirir.
                  </p>
                  <p>
                    Modern üretim altyapımız, teknik uzmanlığımız ve sahadaki uygulama deneyimimiz sayesinde her
                    aşamada kalite, hız ve güven dengesini koruruz. Müşteri ihtiyaçlarını doğru analiz ederek proje
                    süreçlerini şeffaf bir planlama yaklaşımıyla yönetiriz.
                  </p>
                  <p>
                    Depreme dayanıklı, enerji verimli ve uzun ömürlü çelik yapılar üreterek, kullanıcı odaklı ve
                    çevreye duyarlı yaşam alanları oluşturuyoruz.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <MediaBanner src="/project-1.jpg" alt="Proje" heightClassName="h-48" />
                    <MediaBanner src="/project-2.jpg" alt="Proje" heightClassName="h-64" />
                  </div>
                  <div className="space-y-4 pt-8">
                    <MediaBanner src="/project-3.jpg" alt="Proje" heightClassName="h-64" />
                    <MediaBanner src="/project-4.jpg" alt="Proje" heightClassName="h-48" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-muted/30 to-background py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">Değerlerimiz</h2>
              <p className="text-lg text-muted-foreground">Başarımızın ardındaki temel değerlerimiz</p>
            </div>

            <IconFeatureGrid
              items={values}
              columnsClassName="md:grid-cols-2 lg:grid-cols-4 gap-6"
              cardClassName="p-6"
              iconWrapClassName="h-14 w-14 rounded-xl bg-accent/10 mb-4 group-hover:bg-accent/20"
              iconClassName="h-7 w-7"
              titleClassName="text-xl mb-3"
              descriptionClassName="text-sm"
            />
          </div>
        </section>
      </main>
    </SitePageShell>
  )
}
