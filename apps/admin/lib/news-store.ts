import { existsSync } from 'fs'
import { promises as fs } from 'fs'
import path from 'path'

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
  const raw = await fs.readFile(getStorePath(), 'utf8')
  return JSON.parse(raw) as NewsStore
}

export async function writeNewsStore(store: NewsStore) {
  await fs.writeFile(getStorePath(), `${JSON.stringify(store, null, 2)}\n`, 'utf8')
}
