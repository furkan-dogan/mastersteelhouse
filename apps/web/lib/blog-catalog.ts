import 'server-only'

import { existsSync } from 'fs'
import { promises as fs } from 'fs'
import path from 'path'

import type { BlogPost } from '@/lib/blog-types'
import { normalizeMediaPlacement } from '@/lib/media-placement'

type BlogStore = {
  posts: BlogPost[]
}

function resolveStorePath() {
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

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function normalizePost(post: BlogPost): BlogPost {
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
      imagePlacement: normalizeMediaPlacement(section.imagePlacement, section.imagePosition),
    }
  })

  return {
    ...post,
    imagePlacement: normalizeMediaPlacement(post.imagePlacement, post.imagePosition),
    sections,
  }
}

async function readStore(): Promise<BlogStore> {
  const filePath = resolveStorePath()
  const raw = await fs.readFile(filePath, 'utf8')
  return JSON.parse(raw) as BlogStore
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const store = await readStore()
  return store.posts.map(normalizePost)
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts()
  return posts.find((post) => post.slug === slug)
}

export async function getRelatedBlogPosts(slug: string, limit = 3): Promise<BlogPost[]> {
  const posts = await getBlogPosts()
  return posts.filter((post) => post.slug !== slug).slice(0, limit)
}
