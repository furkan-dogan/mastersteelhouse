import { FileText, Download, Eye } from 'lucide-react'
import { ProfilePageShell } from '@/components/profile-page-shell'

const catalogs = [
  { id: 'c1', title: 'Genel Profil Kataloğu', pdfUrl: '/documents/catalog-profil.pdf' },
  { id: 'c2', title: 'Uygulama ve Montaj Kılavuzu', pdfUrl: '/documents/montaj-kilavuzu.pdf' },
]

export default function KataloglarPage() {
  return (
    <ProfilePageShell>
      <section className="py-20 bg-[#f3f4f1]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-center text-4xl font-bold md:text-5xl">
              <span className="bg-gradient-to-r from-[#b88700] to-[#eab308] bg-clip-text text-transparent">Kataloglarımız</span>
            </h1>
            <p className="mb-16 text-center text-lg text-slate-600">Profil ürün gruplarına ait teknik özet ve uygulama içeriklerini tek alanda inceleyebilirsiniz.</p>

            <div className="grid gap-6 md:grid-cols-2">
              {catalogs.map((catalog) => (
                <div
                  key={catalog.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#eab308]/50 hover:shadow-xl hover:shadow-[#eab308]/10"
                >
                  <div className="relative aspect-[210/297] border-b bg-slate-50">
                    <div className="flex h-full items-center justify-center">
                      <FileText className="h-12 w-12 text-[#b88700]" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-4 text-xl font-bold text-slate-900">{catalog.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={catalog.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#eab308]/15 px-4 py-2 text-[#9a7000] transition hover:bg-[#eab308] hover:text-black"
                      >
                        <Eye className="h-4 w-4" />
                        <span>PDF'i Göster</span>
                      </a>
                      <a
                        href={catalog.pdfUrl}
                        download
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-700 transition hover:border-[#eab308]/50 hover:text-[#9a7000]"
                      >
                        <Download className="h-4 w-4" />
                        <span>İndir</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ProfilePageShell>
  )
}
