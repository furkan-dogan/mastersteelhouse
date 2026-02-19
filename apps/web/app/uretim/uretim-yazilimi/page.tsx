import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Cpu, Database, Network, Monitor } from 'lucide-react'

export default function UretimYazilimi() {
  const systems = [
    { icon: Cpu, title: 'CNC Programlama', description: 'Otomatik kesim ve delme programları' },
    { icon: Database, title: 'ERP Sistemi', description: 'Üretim takip ve stok yönetimi' },
    { icon: Network, title: 'Otomasyon', description: 'Fabrika otomasyon sistemleri' },
    { icon: Monitor, title: 'Kalite Takip', description: 'Dijital kalite kontrol yazılımları' },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32">
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Üretim{' '}
                <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
                  Yazılımı
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Üretim süreçlerimizi dijitalleştiren ve optimize eden yazılım çözümlerimiz.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {systems.map((system) => {
                const Icon = system.icon
                return (
                  <div key={system.title} className="p-8 rounded-2xl bg-card border border-border hover:border-accent/50 hover:shadow-xl transition-all group">
                    <Icon className="w-12 h-12 text-accent mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold mb-2">{system.title}</h3>
                    <p className="text-muted-foreground">{system.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
