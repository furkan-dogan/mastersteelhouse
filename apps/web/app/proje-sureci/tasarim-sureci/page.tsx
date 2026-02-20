import { Pencil, Box, Users, FileCheck } from 'lucide-react'
import { SitePageShell } from '@/components/site-page-shell'

export default function TasarimSureci() {
  const steps = [
    { icon: Pencil, title: 'Ön Görüşme', description: 'İhtiyaçlarınızı dinliyor ve analiz ediyoruz' },
    { icon: Box, title: '3D Modelleme', description: 'Projenizi 3 boyutlu olarak tasarlıyoruz' },
    { icon: Users, title: 'Revizyon', description: 'Geri bildirimlerinize göre düzenlemeler yapıyoruz' },
    { icon: FileCheck, title: 'Onay', description: 'Son tasarımı onayınıza sunuyoruz' },
  ]

  return (
    <SitePageShell>
      <main className="min-h-screen pt-32">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
                Tasarım{' '}
                <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
                  Süreci
                </span>
              </h1>
              <p className="text-lg text-center text-muted-foreground mb-16">
                Hayalinizdeki projeyi gerçeğe dönüştürmek için izlediğimiz adımlar
              </p>

              <div className="space-y-8">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <div key={step.title} className="flex items-start gap-6 p-6 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all group">
                      <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8 text-accent" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl font-bold text-accent/30">0{index + 1}</span>
                          <h3 className="text-2xl font-bold">{step.title}</h3>
                        </div>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </SitePageShell>
  )
}
