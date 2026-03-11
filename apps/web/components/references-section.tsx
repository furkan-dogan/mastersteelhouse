import Image from 'next/image'
import Link from 'next/link'
import { getReferenceItems } from '@/lib/references-catalog'

export async function ReferencesSection() {
  const references = await getReferenceItems()
  const visible = references.slice(0, 8)

  return (
    <section id="references" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-flex px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
            Referanslarımız
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-foreground">
            Bizimle Çalışan <span className="text-accent">Markalar</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            CMS üzerinden yönetilen güncel referans listemiz
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visible.map((item) => (
            <article key={item.id} className="rounded-2xl border border-border bg-card p-4 hover:border-accent/40 transition-colors">
              <div className="relative h-20 w-full overflow-hidden rounded-xl bg-muted/40">
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.title}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <p className="mt-3 text-sm font-semibold text-foreground line-clamp-2">{item.title}</p>
              {item.location ? <p className="mt-1 text-xs text-muted-foreground">{item.location}</p> : null}
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/referanslar" className="inline-flex items-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-opacity">
            Tüm Referansları Gör
          </Link>
        </div>
      </div>
    </section>
  )
}
