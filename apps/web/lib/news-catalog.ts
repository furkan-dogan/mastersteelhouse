import 'server-only'

import type { NewsPost } from '@/lib/news-types'
import { normalizeMediaPlacement } from '@/lib/media-placement'
import { ensureUniqueSectionIds } from '@/lib/content-utils'
import { normalizeCmsMediaUrl, readCmsJson } from '@/lib/cms-fetch'

type NewsStore = {
  posts: NewsPost[]
}

function isNewsStore(value: unknown): value is NewsStore {
  return Boolean(value && typeof value === 'object' && Array.isArray((value as NewsStore).posts))
}

function normalizePost(post: NewsPost): NewsPost {
  const sections = ensureUniqueSectionIds(post.sections).map((section) => ({
    ...section,
    image: normalizeCmsMediaUrl(section.image),
    imagePosition: section.imagePosition || '50% 50%',
    imagePlacement: normalizeMediaPlacement(section.imagePlacement, section.imagePosition),
  }))

  return {
    ...post,
    image: normalizeCmsMediaUrl(post.image),
    imagePosition: post.imagePosition || '50% 50%',
    imagePlacement: normalizeMediaPlacement(post.imagePlacement, post.imagePosition),
    imagePlacementCard: normalizeMediaPlacement(post.imagePlacementCard ?? post.imagePlacement, post.imagePosition),
    imagePlacementHero: normalizeMediaPlacement(post.imagePlacementHero ?? post.imagePlacement, post.imagePosition),
    sections,
    gallery: (post.gallery ?? []).map((item) => normalizeCmsMediaUrl(item)),
  }
}

async function readStore(): Promise<NewsStore> {
  return readCmsJson<NewsStore>({
    r2Key: '_cms/news-cms.json',
    devApiPath: '/api/news',
    localFileName: 'news-cms.json',
    validate: isNewsStore,
  })
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
