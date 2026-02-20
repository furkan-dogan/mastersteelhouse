export function extractYouTubeId(input: string) {
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

export function toYouTubeThumbnailUrl(input: string) {
  const id = extractYouTubeId(input)
  if (!id) return ''
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

export function toYouTubeEmbedUrl(input: string) {
  const id = extractYouTubeId(input)
  if (!id) return ''
  return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`
}

export function isYouTubeShortUrl(input: string) {
  const value = input.trim()
  if (!value) return false

  try {
    const url = new URL(value)
    return url.hostname.includes('youtube.com') && url.pathname.startsWith('/shorts/')
  } catch {
    return false
  }
}
