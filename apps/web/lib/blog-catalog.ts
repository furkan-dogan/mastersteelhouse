import 'server-only'

import type { BlogPost } from '@/lib/blog-types'
import { normalizeMediaPlacement } from '@/lib/media-placement'
import { ensureUniqueSectionIds } from '@/lib/content-utils'
import { normalizeCmsMediaUrl, readCmsJson } from '@/lib/cms-fetch'

type BlogStore = {
  posts: BlogPost[]
}

function isBlogStore(value: unknown): value is BlogStore {
  return Boolean(value && typeof value === 'object' && Array.isArray((value as BlogStore).posts))
}

function normalizePost(post: BlogPost): BlogPost {
  const sections = ensureUniqueSectionIds(post.sections).map((section) => ({
    ...section,
    image: normalizeCmsMediaUrl(section.image),
    imagePlacement: normalizeMediaPlacement(section.imagePlacement, section.imagePosition),
  }))

  return {
    ...post,
    image: normalizeCmsMediaUrl(post.image),
    imagePlacement: normalizeMediaPlacement(post.imagePlacement, post.imagePosition),
    sections,
  }
}

async function readStore(): Promise<BlogStore> {
  return readCmsJson<BlogStore>({
    r2Key: '_cms/blog-cms.json',
    devApiPath: '/api/public/blog',
    localFileName: 'blog-cms.json',
    validate: isBlogStore,
  })
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
