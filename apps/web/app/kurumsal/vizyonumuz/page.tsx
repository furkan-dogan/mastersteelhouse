import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { Eye, TrendingUp, Globe, Lightbulb } from 'lucide-react'

export const metadata = {
  title: 'Vizyonumuz | Çelik Yapı',
  description:
    'Vizyonumuz; hafif çelik yapı sistemlerinde yenilikçi, sürdürülebilir ve güvenilir çözümlerle güçlü bir marka olmaktır.',
}

export default function VizyonPage() {
  const goals = [
    {
      icon: TrendingUp,
      title: 'Sektör Lideri',
      description: 'Çelik yapı sektöründe kalite, güven ve uzmanlıkla en çok tercih edilen markalardan biri olmak.'
    },
    {
      icon: Globe,
      title: 'Uluslararası Büyüme',
      description: 'Farklı pazarlarda sürdürülebilir projeler geliştirerek marka gücümüzü uluslararası ölçekte büyütmek.'
    },
    {
      icon: Lightbulb,
      title: 'Ar-Ge Merkezi',
      description: 'Teknoloji odaklı Ar-Ge yaklaşımıyla sektöre değer katan yenilikçi çözümler üretmek.'
    },
    {
      icon: Eye,
      title: 'Sürdürülebilirlik',
      description: 'Çevreye duyarlı üretim ve kaynak verimliliğiyle sürdürülebilir yapı kültürünü yaygınlaştırmak.'
    }
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
                Vizyonumuz
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Geleceğe Doğru <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">Büyüyoruz</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
              Vizyonumuz; hafif çelik yapı alanında güvenilirliği, yenilikçiliği ve kalite standardını
              birlikte yükselterek güçlü bir marka konumu inşa etmektir.
            </p>
          </div>

          <div className="relative h-[400px] rounded-3xl overflow-hidden mb-20">
            <Image src="/hero-slide-3.jpg" alt="Vizyon" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-primary-foreground">
                <div className="text-4xl md:text-6xl font-bold mb-4">Vizyon Odaklı</div>
                <div className="text-lg md:text-2xl font-semibold">Sürdürülebilir Büyüme</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {goals.map((goal) => {
              const Icon = goal.icon
              return (
                <div
                  key={goal.title}
                  className="p-8 rounded-2xl bg-card border border-border hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 transition-all duration-500 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">
                    {goal.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {goal.description}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border border-border">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Stratejik Önceliklerimiz</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-border/70 bg-background/70 p-5">
                  <h3 className="mb-2 text-lg font-semibold">Operasyonel Mükemmellik</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Proje planlama, üretim ve uygulama süreçlerinde ölçülebilir kaliteyi standart hale getirmek.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/70 p-5">
                  <h3 className="mb-2 text-lg font-semibold">Dijital Dönüşüm</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Tasarım ve üretim hatlarında veri odaklı karar mekanizmalarını güçlendirerek verimliliği artırmak.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/70 p-5">
                  <h3 className="mb-2 text-lg font-semibold">Marka Güveni</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Kullanıcı deneyimini merkeze alan yaklaşımımızla uzun vadeli iş ortaklıkları kurmak.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
