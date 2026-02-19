import 'server-only'

import { existsSync } from 'fs'
import { promises as fs } from 'fs'
import path from 'path'
import type { NewsPost } from '@/lib/news-types'
import { normalizeMediaPlacement } from '@/lib/media-placement'

type NewsStore = {
  posts: NewsPost[]
}

function resolveStorePath() {
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

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function normalizePost(post: NewsPost): NewsPost {
  const seen = new Set<string>()
  const sections = (post.sections ?? []).map((section, index) => {
    const rawId = section.id?.trim() || slugify(section.title) || `bolum-${index + 1}`
    let id = rawId
    let suffix = 2
    while (seen.has(id)) {
      id = `${rawId}-${suffix}`
      suffix += 1
    }
    seen.add(id)

    return {
      ...section,
      id,
      imagePosition: section.imagePosition || '50% 50%',
      imagePlacement: normalizeMediaPlacement(section.imagePlacement, section.imagePosition),
    }
  })

  return {
    ...post,
    imagePosition: post.imagePosition || '50% 50%',
    imagePlacement: normalizeMediaPlacement(post.imagePlacement, post.imagePosition),
    imagePlacementCard: normalizeMediaPlacement(
      post.imagePlacementCard ?? post.imagePlacement,
      post.imagePosition
    ),
    imagePlacementHero: normalizeMediaPlacement(
      post.imagePlacementHero ?? post.imagePlacement,
      post.imagePosition
    ),
    sections,
    gallery: post.gallery ?? [],
  }
}

async function readStore(): Promise<NewsStore> {
  const filePath = resolveStorePath()
  const raw = await fs.readFile(filePath, 'utf8')
  return JSON.parse(raw) as NewsStore
}

export async function getNewsPosts(): Promise<NewsPost[]> {
  const store = await readStore()
  return store.posts.map(normalizePost)
}

export async function getNewsPostBySlug(slug: string): Promise<NewsPost | undefined> {
  const posts = await getNewsPosts()
  return posts.find((post) => post.slug === slug)
}

export async function getRelatedNewsPosts(slug: string, limit = 3): Promise<NewsPost[]> {
  const posts = await getNewsPosts()
  return posts.filter((post) => post.slug !== slug).slice(0, limit)
}
