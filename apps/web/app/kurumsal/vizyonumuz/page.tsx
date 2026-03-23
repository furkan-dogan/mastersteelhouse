import { Eye, TrendingUp, Globe, Lightbulb } from 'lucide-react'
import { SitePageShell } from '@/components/site-page-shell'
import { IconFeatureGrid } from '@/components/icon-feature-grid'
import { CorporateIntroSection } from '@/components/corporate-intro-section'
import { MediaBanner } from '@/components/media-banner'
import { buildPageMetadata } from '@/lib/seo'

export const metadata = buildPageMetadata({
  title: 'Vizyonumuz',
  description:
    'Vizyonumuz; hafif çelik yapı sistemlerinde yenilikçi, sürdürülebilir ve güvenilir çözümlerle güçlü bir marka olmaktır.',
  path: '/kurumsal/vizyonumuz',
})

export default function VizyonPage() {
  const goals = [
    {
      icon: TrendingUp,
      title: 'Sektör Lideri',
      description: 'Çelik yapı sektöründe kalite, güven ve uzmanlıkla en çok tercih edilen markalardan biri olmak.',
    },
    {
      icon: Globe,
      title: 'Uluslararası Büyüme',
      description:
        'Farklı pazarlarda sürdürülebilir projeler geliştirerek marka gücümüzü uluslararası ölçekte büyütmek.',
    },
    {
      icon: Lightbulb,
      title: 'Ar-Ge Merkezi',
      description: 'Teknoloji odaklı Ar-Ge yaklaşımıyla sektöre değer katan yenilikçi çözümler üretmek.',
    },
    {
      icon: Eye,
      title: 'Sürdürülebilirlik',
      description: 'Çevreye duyarlı üretim ve kaynak verimliliğiyle sürdürülebilir yapı kültürünü yaygınlaştırmak.',
    },
  ]

  return (
    <SitePageShell>
      <main className="min-h-screen">
        <CorporateIntroSection
          badge="Vizyonumuz"
          title="Geleceğe Doğru"
          accent="Büyüyoruz"
          description="Vizyonumuz; hafif çelik yapı alanında güvenilirliği, yenilikçiliği ve kalite standardını birlikte yükselterek güçlü bir marka konumu inşa etmektir."
        >
          <MediaBanner
            src="/hero-slide-3.jpg"
            alt="Vizyon"
            className="mb-20"
            overlayClassName="bg-gradient-to-t from-primary/80 via-primary/40 to-transparent"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-primary-foreground">
                <div className="mb-4 text-4xl font-bold md:text-6xl">Vizyon Odaklı</div>
                <div className="text-lg font-semibold md:text-2xl">Sürdürülebilir Büyüme</div>
              </div>
            </div>
          </MediaBanner>

          <IconFeatureGrid items={goals} />

          <div className="mx-auto mt-20 max-w-4xl">
            <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 p-8 md:p-12">
              <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">Stratejik Önceliklerimiz</h2>
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
                    Tasarım ve üretim hatlarında veri odaklı karar mekanizmalarını güçlendirerek verimliliği
                    artırmak.
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
        </CorporateIntroSection>
      </main>
    </SitePageShell>
  )
}
