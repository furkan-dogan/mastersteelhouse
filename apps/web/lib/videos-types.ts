export type VideoItem = {
  id: string
  title: string
  description: string
  format?: 'landscape' | 'portrait'
  youtubeUrl: string
  videoFileUrl?: string
  videoUrl?: string
}

export type VideosStore = {
  hero: {
    title: string
    description: string
  }
  items: VideoItem[]
}
