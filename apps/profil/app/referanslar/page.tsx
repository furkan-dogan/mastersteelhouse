import { MapPin } from 'lucide-react'
import { ProfilePageShell } from '@/components/profile-page-shell'
import { getProfileReferences } from '@/lib/profile-content'

export default async function ReferanslarPage() {
  const references = await getProfileReferences()

  return (
    <ProfilePageShell>
      <section className="bg-[#eef1ee] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl">Referanslar</h1>
            <p className="text-lg text-slate-600">Tamamlanan profil projeleri ve uygulama örnekleri.</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {references.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-[#eab308]/50 hover:shadow-lg hover:shadow-[#eab308]/10">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-bold text-slate-900">{item.title}</h2>
                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4" />
                    <span>{item.location}</span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-[#b88700]">{item.area}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.categories.map((category) => (
                      <span key={category} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </ProfilePageShell>
  )
}
