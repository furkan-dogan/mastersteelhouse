import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { Target, Sparkles, Award } from 'lucide-react'

export const metadata = {
  title: 'Misyonumuz | Çelik Yapı',
  description:
    'Hafif çelik yapı projelerinde teknik doğruluk, kaliteli uygulama ve şeffaf süreç yönetimiyle güvenilir çözümler sunuyoruz.',
}

export default function MisyonPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
                Misyonumuz
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Geleceği <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">İnşa Ediyoruz</span>
            </h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative h-[500px] rounded-3xl overflow-hidden">
              <Image src="/hero-slide-2.jpg" alt="Misyon" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Müşteri Odaklılık</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Her projenin ihtiyaçlarını detaylı analiz ederek, kullanıcı beklentilerine uygun
                    hafif çelik yapı çözümleri geliştiriyor ve süreç boyunca güçlü iletişim sağlıyoruz.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Yenilikçi Yaklaşım</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Tasarım, üretim ve montaj aşamalarında güncel teknolojileri kullanarak
                    verimliliği artıran, güvenli ve sürdürülebilir yapı çözümleri sunuyoruz.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Kalite Güvencesi</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Malzeme seçiminden uygulama detaylarına kadar her adımda kalite standartlarını
                    önceliklendirerek uzun ömürlü ve güvenilir çelik yapılar inşa ediyoruz.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Çalışma Prensibimiz</h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-center mb-6">
                Her projede önce ihtiyacı doğru tanımlar, ardından tasarım, üretim ve uygulama adımlarını
                aynı kalite çizgisinde ilerleterek işlevsel ve güvenli sonuçlar üretiriz.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed text-center">
                İş ortaklarımızla kurduğumuz açık iletişim, teknik disiplin ve sorumluluk odaklı yaklaşımımız;
                uzun vadeli iş birliğinin temelini oluşturur.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
