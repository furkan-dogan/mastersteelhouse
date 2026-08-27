import { ExternalLink, CheckCircle, FileText, Download } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getDocumentsContent } from '@/lib/documents-catalog'
import { SitePageShell } from '@/components/site-page-shell'
import { SectionIntro } from '@/components/section-intro'
import { buildPageMetadata } from '@/lib/seo'

export const metadata = buildPageMetadata({
  title: 'Belgelerimiz',
  description: 'ISO sertifikalarımız ve kalite belgelerimizle güven veriyoruz.',
  path: '/kurumsal/belgelerimiz',
})

export const dynamic = 'force-dynamic'

function isPdfUrl(url: string) {
  const value = url.split('?')[0].toLowerCase()
  return value.endsWith('.pdf')
}

export default async function BelgelerPage() {
  const content = await getDocumentsContent()

  return (
    <SitePageShell>
      <main className="min-h-screen">
        <section className="page-top-offset pb-20">
          <SectionIntro
            badge={content.hero.badge}
            title={content.hero.title}
            accent={content.hero.titleAccent}
            description={content.hero.description}
          />

          <div className="container mx-auto px-4">
            <div className="mb-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {content.items.map((doc, index) => (
                <article
                  key={doc.id}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative aspect-[210/297] border-b bg-muted/30">
                    {doc.pdfUrl ? (
                      isPdfUrl(doc.pdfUrl) ? (
                        <iframe
                          src={`${doc.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&page=1&view=FitH`}
                          title={`${doc.title} önizleme`}
                          className="h-full w-full"
                        />
                      ) : (
                        <Image
                          src={doc.pdfUrl}
                          alt={`${doc.title} görsel`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      )
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <FileText className="h-12 w-12 text-accent" />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="mb-4 text-xl font-bold transition-colors group-hover:text-accent">{doc.title}</h3>
                    <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{doc.description}</p>
                    {doc.pdfUrl ? (
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={doc.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-accent/10 px-3 py-2 text-sm font-semibold text-accent transition-all hover:bg-accent hover:text-accent-foreground"
                        >
                          {isPdfUrl(doc.pdfUrl) ? "PDF'i Göster" : 'Görseli Göster'}
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                        <a
                          href={doc.pdfUrl}
                          download
                          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground transition-all hover:border-accent/50 hover:text-accent"
                        >
                          İndir
                          <Download className="h-4 w-4" />
                        </a>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">Dosya henüz eklenmedi</span>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className="mx-auto max-w-4xl">
              <div className="rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10 p-8 md:p-12">
                <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">Belge ve Sertifikalarımızın Anlamı</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {content.features.map((feature, index) => (
                    <div key={`${feature}-${index}`} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/20">
                        <CheckCircle className="h-4 w-4 text-accent" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 border-t border-border pt-8">
                  <p className="text-center text-muted-foreground">{content.footerNote}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SitePageShell>
  )
}
