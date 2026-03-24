import Link from 'next/link'
import { getReferenceItems } from '@/lib/references-catalog'
import { LogoCloud } from '@/components/ui/logo-cloud-4'

export async function ReferencesSection() {
  const references = await getReferenceItems()
  const visible = references.slice(0, 12)
  const logos = visible.map((item) => ({
    src: item.image || '/placeholder.svg',
    alt: item.title,
    label: item.title,
  }))

  return (
    <section id="references" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Bizimle Çalışan <span className="text-accent">Markalar</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Güven veren markalarla uzun soluklu iş birliklerimiz devam ediyor.
          </p>
        </div>

        <LogoCloud logos={logos} />

        <div className="mt-10 text-center">
          <Link href="/referanslar" className="inline-flex items-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-opacity">
            Tüm Referansları Gör
          </Link>
        </div>
      </div>
    </section>
  )
}
