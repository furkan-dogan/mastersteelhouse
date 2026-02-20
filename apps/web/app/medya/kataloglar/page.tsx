import { FileText, Download, Eye } from 'lucide-react'
import Link from 'next/link'
import { getCatalogsContent } from '@/lib/catalogs-catalog'
import { SitePageShell } from '@/components/site-page-shell'

export const dynamic = 'force-dynamic'

export default async function Kataloglar() {
  const content = await getCatalogsContent()

  return (
    <SitePageShell>
      <main className="min-h-screen pt-32">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
                <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
                  {content.hero.title}
                </span>
              </h1>
              <p className="text-lg text-center text-muted-foreground mb-16">{content.hero.description}</p>

              <div className="grid md:grid-cols-2 gap-6">
                {content.items.map((catalog) => (
                  <div
                    key={catalog.id}
                    className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10"
                  >
                    <div className="relative aspect-[210/297] border-b bg-muted/30">
                      {catalog.pdfUrl ? (
                        <iframe
                          src={`${catalog.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&page=1&view=FitH`}
                          title={`${catalog.title} önizleme`}
                          className="h-full w-full"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <FileText className="h-12 w-12 text-accent" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-4">{catalog.title}</h3>
                    {catalog.pdfUrl ? (
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={catalog.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground transition-all"
                        >
                          <Eye className="w-4 h-4" />
                          <span>PDF'i Göster</span>
                        </Link>
                        <a
                          href={catalog.pdfUrl}
                          download
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-foreground hover:border-accent/50 hover:text-accent transition-all"
                        >
                          <Download className="w-4 h-4" />
                          <span>İndir</span>
                        </a>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">PDF henüz eklenmedi</span>
                    )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </SitePageShell>
  )
}
