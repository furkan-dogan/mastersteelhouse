import Image from 'next/image'
import { Award, Users, Zap, Target } from 'lucide-react'
import { SitePageShell } from '@/components/site-page-shell'
import { SectionIntro } from '@/components/section-intro'
import { IconFeatureGrid } from '@/components/icon-feature-grid'

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
        <section className="pt-32 pb-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <SectionIntro
            badge="Hakkımızda"
            title="Çelik Yapıda"
            accent="Öncü Firmayız"
            description="Hafif çelik yapı sistemlerinde uzun yıllara dayanan birikimimizle, güvenli ve estetik yaşam alanları inşa ediyoruz. Kalite odaklı yaklaşımımızla her projede sürdürülebilir değer üretiyoruz."
          />

          <div className="container mx-auto px-4">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/steel-structure.jpg" alt="Hakkımızda" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Uzun Yıllara Dayanan <span className="text-accent">Uzmanlık</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
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
                    <div className="relative h-48 rounded-2xl overflow-hidden">
                      <Image src="/project-1.jpg" alt="Proje" fill className="object-cover" />
                    </div>
                    <div className="relative h-64 rounded-2xl overflow-hidden">
                      <Image src="/project-2.jpg" alt="Proje" fill className="object-cover" />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="relative h-64 rounded-2xl overflow-hidden">
                      <Image src="/project-3.jpg" alt="Proje" fill className="object-cover" />
                    </div>
                    <div className="relative h-48 rounded-2xl overflow-hidden">
                      <Image src="/project-4.jpg" alt="Proje" fill className="object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Değerlerimiz</h2>
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
