import { Play } from 'lucide-react'
import { ProfilePageShell } from '@/components/profile-page-shell'

const videos = [
  { id: 'v1', title: 'Alçıköşe Profil Uygulama', description: 'Sahada hızlı montaj için temel adımlar.', thumb: '/profil-alcikose.jpg' },
  { id: 'v2', title: 'Kaba Sıva Profil Detayları', description: 'Uygulama öncesi dikkat edilmesi gereken noktalar.', thumb: '/profil-kabasiva.jpg' },
  { id: 'v3', title: 'Tavan U-C Profil Akışı', description: 'Uygulama düzeni ve teknik özet.', thumb: '/profil-tavan-uc.jpg' },
]

export default function VideolarPage() {
  return (
    <ProfilePageShell>
      <section className="bg-[#eef1ee] py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h1 className="mb-6 text-center text-4xl font-bold text-slate-900 md:text-5xl">
              <span className="bg-gradient-to-r from-[#b88700] to-[#eab308] bg-clip-text text-transparent">Videolar</span>
            </h1>
            <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-slate-600">
              Profil uygulama süreçlerini ve teknik detayları görsel olarak inceleyebileceğiniz video içerikleri.
            </p>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <article key={video.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-[#eab308]/50 hover:shadow-xl hover:shadow-[#eab308]/10">
                  <div className="relative h-56 overflow-hidden">
                    <img src={video.thumb} alt={video.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                    <button type="button" className="absolute inset-0 flex items-center justify-center" aria-label={`${video.title} oynat`}>
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#eab308] text-black shadow-lg">
                        <Play className="h-6 w-6" fill="currentColor" />
                      </span>
                    </button>
                  </div>
                  <div className="p-5">
                    <h2 className="text-lg font-bold text-slate-900">{video.title}</h2>
                    <p className="mt-2 text-sm text-slate-600">{video.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ProfilePageShell>
  )
}
