import { Play } from 'lucide-react'
import { ProfilePageShell } from '@/components/profile-page-shell'
import { getProfileVideos } from '@/lib/profile-content'

function toYoutubeEmbedUrl(input: string) {
  try {
    const url = new URL(input)
    if (url.hostname.includes('youtu.be')) {
      const id = url.pathname.split('/').filter(Boolean)[0]
      return id ? `https://www.youtube.com/embed/${id}` : ''
    }
    if (url.pathname.startsWith('/shorts/')) {
      const id = url.pathname.split('/').filter(Boolean)[1]
      return id ? `https://www.youtube.com/embed/${id}` : ''
    }
    const v = url.searchParams.get('v')
    return v ? `https://www.youtube.com/embed/${v}` : ''
  } catch {
    return ''
  }
}

export default async function VideolarPage() {
  const videos = await getProfileVideos()

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
              {videos.map((video) => {
                const embedUrl = toYoutubeEmbedUrl(video.youtubeUrl)
                return (
                  <article key={video.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-[#eab308]/50 hover:shadow-xl hover:shadow-[#eab308]/10">
                    <div className="relative h-56 overflow-hidden">
                      {embedUrl ? (
                        <iframe
                          src={embedUrl}
                          title={video.title}
                          className="h-full w-full"
                          loading="lazy"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-900 text-slate-200">
                          <Play className="h-8 w-8" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h2 className="text-lg font-bold text-slate-900">{video.title}</h2>
                      <p className="mt-2 text-sm text-slate-600">{video.description}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </ProfilePageShell>
  )
}
