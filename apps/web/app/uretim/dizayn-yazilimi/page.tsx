import { Laptop, Box, Ruler, FileCode } from 'lucide-react'
import { SitePageShell } from '@/components/site-page-shell'
import { MediaFeatureSection } from '@/components/media-feature-section'
import { buildPageMetadata } from '@/lib/seo'

export const metadata = buildPageMetadata({
  title: 'Dizayn Yazılımı',
  description: 'Tasarım süreçlerinde kullandığımız 3D modelleme, statik analiz ve BIM yazılım altyapısı.',
  path: '/uretim/dizayn-yazilimi',
})

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
        <MediaFeatureSection
          title="Dizayn"
          accent="Yazılımı"
          description="Endüstri standardı yazılımlar ile projelerinizi 3D olarak tasarlıyor ve her detayı hesaplıyoruz."
          imageSrc="/production-software.jpg"
          imageAlt="Dizayn Yazılımı"
          items={tools}
          reverse
          listClassName={{
            iconWrapClassName: 'bg-transparent p-0 h-auto w-auto',
            iconClassName: 'h-8 w-8 mt-1',
          }}
        />
      </main>
    </SitePageShell>
  )
}
