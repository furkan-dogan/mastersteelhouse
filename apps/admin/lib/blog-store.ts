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

export type BlogSection = {
  id?: string
  title: string
  content: string
  image?: string
  imagePosition?: string
  imagePlacement?: MediaPlacement
}

export type BlogPost = {
  slug: string
  title: string
  date: string
  author: string
  category: string
  readTime: string
  excerpt: string
  image: string
  imagePosition?: string
  imagePlacement?: MediaPlacement
  sections: BlogSection[]
}

export type BlogStore = {
  posts: BlogPost[]
}

const WEB_BLOG_INDEX_KEY = '_cms/blog-cms.json'

function getStorePath() {
  const candidates = [
    path.join(process.cwd(), 'content', 'blog-cms.json'),
    path.join(process.cwd(), '..', '..', 'content', 'blog-cms.json'),
    path.join(process.cwd(), '..', 'content', 'blog-cms.json'),
  ]

  const found = candidates.find((candidate) => existsSync(candidate))
  if (!found) {
    throw new Error('blog-cms.json not found')
  }

  return found
}

export async function readBlogStore(): Promise<BlogStore> {
  if (isR2Configured()) {
    const r2Store = await readJsonFromR2<BlogStore>(WEB_BLOG_INDEX_KEY)
    if (r2Store && Array.isArray(r2Store.posts)) return r2Store

    try {
      const raw = await fs.readFile(getStorePath(), 'utf8')
      const fallback = JSON.parse(raw) as BlogStore
      if (fallback && Array.isArray(fallback.posts)) return fallback
    } catch {
      // ignore local fallback errors on serverless
    }

    return { posts: [] }
  }

  const raw = await fs.readFile(getStorePath(), 'utf8')
  return JSON.parse(raw) as BlogStore
}

export async function writeBlogStore(store: BlogStore) {
  if (isR2Configured()) {
    await writeJsonToR2(WEB_BLOG_INDEX_KEY, store)
  }

  await fs.writeFile(getStorePath(), `${JSON.stringify(store, null, 2)}\n`, 'utf8')
}
