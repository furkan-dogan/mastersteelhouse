import { existsSync } from 'fs'
import { promises as fs } from 'fs'
import path from 'path'
import { isR2Configured, readJsonFromR2, writeJsonToR2 } from '@/lib/r2-storage'

export type MediaPlacement = {
  fit?: 'cover' | 'contain'
  x?: number
  y?: number
  zoom?: number
}

export type NewsSection = {
  id?: string
  title: string
  content: string
  image?: string
  imagePosition?: string
  imagePlacement?: MediaPlacement
}

export type NewsPost = {
  slug: string
  title: string
  date: string
  location: string
  author: string
  category: string
  readTime: string
  excerpt: string
  image: string
  imagePosition?: string
  imagePlacement?: MediaPlacement
  imagePlacementCard?: MediaPlacement
  imagePlacementHero?: MediaPlacement
  featured: boolean
  sections: NewsSection[]
  gallery?: string[]
}

export type NewsStore = {
  posts: NewsPost[]
}

const WEB_NEWS_INDEX_KEY = '_cms/news-cms.json'

function getStorePath() {
  const candidates = [
    path.join(process.cwd(), 'content', 'news-cms.json'),
    path.join(process.cwd(), '..', '..', 'content', 'news-cms.json'),
    path.join(process.cwd(), '..', 'content', 'news-cms.json'),
  ]

  const found = candidates.find((candidate) => existsSync(candidate))
  if (!found) {
    throw new Error('news-cms.json not found')
  }

  return found
}

export async function readNewsStore(): Promise<NewsStore> {
  if (isR2Configured()) {
    const r2Store = await readJsonFromR2<NewsStore>(WEB_NEWS_INDEX_KEY)
    if (r2Store && Array.isArray(r2Store.posts)) return r2Store

    try {
      const raw = await fs.readFile(getStorePath(), 'utf8')
      const fallback = JSON.parse(raw) as NewsStore
      if (fallback && Array.isArray(fallback.posts)) return fallback
    } catch {
      // ignore local fallback errors on serverless
    }

    return { posts: [] }
  }

  const raw = await fs.readFile(getStorePath(), 'utf8')
  return JSON.parse(raw) as NewsStore
}

export async function writeNewsStore(store: NewsStore) {
  if (isR2Configured()) {
    await writeJsonToR2(WEB_NEWS_INDEX_KEY, store)
    return
  }

  await fs.writeFile(getStorePath(), `${JSON.stringify(store, null, 2)}\n`, 'utf8')
}
