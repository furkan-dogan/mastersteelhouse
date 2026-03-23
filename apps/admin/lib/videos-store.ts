import { existsSync } from 'fs'
import { promises as fs } from 'fs'
import path from 'path'
import { isR2Configured, readJsonFromR2, writeJsonToR2 } from '@/lib/r2-storage'

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

const WEB_VIDEOS_INDEX_KEY = '_cms/videos-cms.json'

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
  if (isR2Configured()) {
    const r2Store = await readJsonFromR2<VideosStore>(WEB_VIDEOS_INDEX_KEY)
    if (r2Store && Array.isArray(r2Store.items) && r2Store.hero && typeof r2Store.hero.title === 'string') return r2Store

    try {
      const raw = await fs.readFile(getStorePath(), 'utf8')
      const fallback = JSON.parse(raw) as VideosStore
      if (fallback && Array.isArray(fallback.items) && fallback.hero && typeof fallback.hero.title === 'string') return fallback
    } catch {
      // ignore local fallback errors on serverless
    }

    return {
      hero: {
        title: '',
        description: '',
      },
      items: [],
    }
  }

  const raw = await fs.readFile(getStorePath(), 'utf8')
  return JSON.parse(raw) as VideosStore
}

export async function writeVideosStore(store: VideosStore) {
  if (isR2Configured()) {
    await writeJsonToR2(WEB_VIDEOS_INDEX_KEY, store)
  }

  await fs.writeFile(getStorePath(), `${JSON.stringify(store, null, 2)}\n`, 'utf8')
}
