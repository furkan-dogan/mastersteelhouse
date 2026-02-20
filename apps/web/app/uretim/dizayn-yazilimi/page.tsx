import Image from 'next/image'
import { Laptop, Box, Ruler, FileCode } from 'lucide-react'
import { SitePageShell } from '@/components/site-page-shell'
import { IconFeatureList } from '@/components/icon-feature-list'

export default function DizaynYazilimi() {
  const tools = [
    { icon: Laptop, title: 'AutoCAD & Revit', description: '3D modelleme ve teknik çizim' },
    { icon: Box, title: 'Tekla Structures', description: 'Çelik yapı detaylandırma yazılımı' },
    { icon: Ruler, title: 'Statik Analiz', description: 'SAP2000 ve ETABS ile hesaplama' },
    { icon: FileCode, title: 'BIM Teknolojisi', description: 'Yapı bilgi modellemesi' },
  ]

  return (
    <SitePageShell>
      <main className="min-h-screen pt-32">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/production-software.jpg" alt="Dizayn Yazılımı" fill className="object-cover" />
              </div>

              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Dizayn{' '}
                  <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
                    Yazılımı
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                  Endüstri standardı yazılımlar ile projelerinizi 3D olarak tasarlıyor ve her detayı hesaplıyoruz.
                </p>

                <IconFeatureList items={tools} iconWrapClassName="bg-transparent p-0 h-auto w-auto" iconClassName="h-8 w-8 mt-1" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </SitePageShell>
  )
}
