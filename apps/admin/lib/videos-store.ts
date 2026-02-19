import { existsSync } from 'fs'
import { promises as fs } from 'fs'
import path from 'path'

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

function getStorePath() {
  const candidates = [
    path.join(process.cwd(), 'content', 'videos-cms.json'),
    path.join(process.cwd(), '..', '..', 'content', 'videos-cms.json'),
    path.join(process.cwd(), '..', 'content', 'videos-cms.json'),
  ]

  const found = candidates.find((candidate) => existsSync(candidate))
  if (!found) {
    throw new Error('videos-cms.json not found')
  }

  return found
}

export async function readVideosStore(): Promise<VideosStore> {
  const raw = await fs.readFile(getStorePath(), 'utf8')
  return JSON.parse(raw) as VideosStore
}

export async function writeVideosStore(store: VideosStore) {
  await fs.writeFile(getStorePath(), `${JSON.stringify(store, null, 2)}\n`, 'utf8')
}
