import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { Award, Users, Zap, Target } from 'lucide-react'

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
      description: 'Avrupa standartlarında üretim ve ISO sertifikalarımızla güvence altındayız.'
    },
    {
      icon: Users,
      title: 'Uzman Kadro',
      description: 'Alanında uzman mühendis ve teknisyenlerden oluşan profesyonel ekibimiz.'
    },
    {
      icon: Zap,
      title: 'Hızlı ve Etkili',
      description: 'Modern üretim teknikleriyle kısa sürede projelerinizi teslim ediyoruz.'
    },
    {
      icon: Target,
      title: 'Müşteri Odaklı',
      description: 'Müşteri memnuniyetini her zaman ön planda tutarak çalışıyoruz.'
    }
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
                Hakkımızda
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Çelik Yapıda <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">Öncü Firmayız</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
              Hafif çelik yapı sistemlerinde uzun yıllara dayanan birikimimizle, güvenli ve estetik yaşam alanları inşa ediyoruz.
              Kalite odaklı yaklaşımımızla her projede sürdürülebilir değer üretiyoruz.
            </p>
          </div>

          {/* Main Image */}
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/steel-structure.jpg"
              alt="Hakkımızda"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Uzun Yıllara Dayanan <span className="text-accent">Uzmanlık</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Firmamız, hafif çelik yapı sistemleri alanında proje planlamadan uygulamaya kadar uçtan uca hizmet sunar.
                  Konut projelerinden endüstriyel ve ticari yapılara uzanan geniş bir ölçekte, ihtiyaca özel çözümler geliştirir.
                </p>
                <p>
                  Modern üretim altyapımız, teknik uzmanlığımız ve sahadaki uygulama deneyimimiz sayesinde
                  her aşamada kalite, hız ve güven dengesini koruruz. Müşteri ihtiyaçlarını doğru analiz ederek
                  proje süreçlerini şeffaf bir planlama yaklaşımıyla yönetiriz.
                </p>
                <p>
                  Depreme dayanıklı, enerji verimli ve uzun ömürlü çelik yapılar üreterek,
                  kullanıcı odaklı ve çevreye duyarlı yaşam alanları oluşturuyoruz.
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

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Değerlerimiz
            </h2>
            <p className="text-lg text-muted-foreground">
              Başarımızın ardındaki temel değerlerimiz
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={value.title}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 transition-all duration-500 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 group-hover:scale-110 transition-all">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
