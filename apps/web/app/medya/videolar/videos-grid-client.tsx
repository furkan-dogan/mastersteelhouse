'use client'

import { useMemo, useState } from 'react'
import type { VideoItem } from '@/lib/videos-types'

type Props = {
  items: VideoItem[]
}

function extractYouTubeId(input: string) {
  const value = input.trim()
  if (!value) return ''

  try {
    const url = new URL(value)
    if (url.hostname.includes('youtu.be')) {
      return url.pathname.split('/').filter(Boolean)[0] ?? ''
    }
    if (url.hostname.includes('youtube.com')) {
      if (url.pathname === '/watch') return url.searchParams.get('v') ?? ''
      if (url.pathname.startsWith('/shorts/')) return url.pathname.split('/')[2] ?? ''
      if (url.pathname.startsWith('/embed/')) return url.pathname.split('/')[2] ?? ''
    }
  } catch {
    return ''
  }

  return ''
}

function getYouTubeEmbedUrl(input: string) {
  const id = extractYouTubeId(input)
  if (!id) return ''
  return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`
}

function isYouTubeShortUrl(input: string) {
  const value = input.trim()
  if (!value) return false
  try {
    const url = new URL(value)
    return url.hostname.includes('youtube.com') && url.pathname.startsWith('/shorts/')
  } catch {
    return false
  }
}

export function VideosGridClient({ items }: Props) {
  const [activeTab, setActiveTab] = useState<'videos' | 'reels'>('videos')

  const videos = useMemo(
    () => items.filter((item) => !isYouTubeShortUrl(item.youtubeUrl ?? item.videoFileUrl ?? item.videoUrl ?? '')),
    [items]
  )
  const reels = useMemo(
    () => items.filter((item) => isYouTubeShortUrl(item.youtubeUrl ?? item.videoFileUrl ?? item.videoUrl ?? '')),
    [items]
  )

  const visibleItems = activeTab === 'videos' ? videos : reels

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-1.5 w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('videos')}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'videos' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Videolar ({videos.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('reels')}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'reels' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Reels ({reels.length})
        </button>
      </div>

      {visibleItems.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          Bu sekmede içerik yok.
        </div>
      ) : null}

      <div className={`${activeTab === 'reels' ? 'flex flex-wrap gap-8' : 'grid md:grid-cols-2 gap-8'}`}>
        {visibleItems.map((video) => {
          const sourceUrl = video.youtubeUrl ?? video.videoFileUrl ?? video.videoUrl ?? ''
          const embedUrl = getYouTubeEmbedUrl(sourceUrl)
          const isShort = isYouTubeShortUrl(sourceUrl)
          const mediaBoxClass = isShort ? 'mx-auto w-full max-w-[260px] aspect-[9/16]' : 'w-full aspect-video'

          return (
            <article key={video.id} className={`group ${activeTab === 'reels' ? 'w-full sm:w-[260px]' : ''}`}>
              <div className={`relative rounded-xl overflow-hidden border bg-black mb-4 ${mediaBoxClass}`}>
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="h-full w-full"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                    Geçerli YouTube linki girin
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{video.title}</h3>
              {video.description ? (
                <p className="text-sm leading-relaxed text-muted-foreground">{video.description}</p>
              ) : null}
            </article>
          )
        })}
      </div>
    </div>
  )
}
