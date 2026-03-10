import { existsSync } from 'fs'
import { promises as fs } from 'fs'
import path from 'path'

export type ProfileProductSpec = {
  label: string
  value: string
  icon?: 'Clock' | 'Ruler' | 'Shield' | 'Zap'
}

export type ProfileProductDimension = {
  thickness: string
  a: string
  b: string
  c: string
}

export type ProfileProduct = {
  slug: string
  name: string
  shortName: string
  heroTitle: string
  subtitle: string
  image: string
  cardImage: string
  sliderImage: string
  description: string
  useAreas: string[]
  specs: Array<{ key: string; value: string }>
  dimensions: ProfileProductDimension[]
  gallery: string[]
}

export type ProfileBlogPost = {
  slug: string
  title: string
  date: string
  author: string
  category: string
  readTime: string
  excerpt: string
  image: string
}

export type ProfileNewsPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  location: string
  category: string
  image: string
  featured?: boolean
}

export type ProfileFaqItem = {
  id: string
  question: string
  answer: string
}

type ProductsStore = {
  products: Array<{
    slug: string
    name: string
    area: string
    image: string
    cardImage?: string
    sliderImage?: string
    description: string
    sliderTitle?: string
    sliderDescription?: string
    detailTitle?: string
    detailDescription?: string
    highlights?: string[]
    specs?: ProfileProductSpec[]
    dimensions?: ProfileProductDimension[]
    gallery?: string[]
  }>
}

type BlogStore = { posts: ProfileBlogPost[] }
type NewsStore = { posts: ProfileNewsPost[] }
type FaqStore = { items: ProfileFaqItem[] }

const LEGACY_BLOG_IMAGE_MAP: Record<string, string> = {
  '/profil-alcikose.jpg': '/uploads/media/img-2821-1772097200995-322d0a.jpg',
  '/profil-kabasiva.jpg': '/uploads/media/img-2823-1772096428209-911296.jpg',
  '/profil-tavan-uc.jpg': '/uploads/media/img-2818-1772096687379-f7260c.jpg',
}

const DEV_IMAGE_PROXY_BASE = (process.env.PROFILE_DEV_IMAGE_PROXY_BASE ?? 'https://profil.mastersteelhouse.com').replace(/\/$/, '')

function isR2DevUrl(url: string) {
  return /^https:\/\/[^/]+\.r2\.dev\//i.test(url)
}

function toDevProxyImage(url: string) {
  return `${DEV_IMAGE_PROXY_BASE}/_next/image?url=${encodeURIComponent(url)}&w=1920&q=75`
}

function normalizeProfileImageUrl(image: string | undefined, fallback = '/logoprofil.png') {
  if (!image) return fallback

  const trimmed = image.trim()
  if (!trimmed) return fallback

  // Keep DEV and PROD visual result same: when local TLS fails on *.r2.dev,
  // use production image optimizer endpoint as proxy.
  if (process.env.NODE_ENV === 'development' && isR2DevUrl(trimmed)) {
    return toDevProxyImage(trimmed)
  }

  return trimmed
}

function getContentPath(fileName: string) {
  const candidates = [
    path.join(process.cwd(), 'content', fileName),
    path.join(process.cwd(), '..', '..', 'content', fileName),
    path.join(process.cwd(), '..', 'content', fileName),
  ]

  const found = candidates.find((candidate) => existsSync(candidate))
  if (!found) {
    throw new Error(`${fileName} not found`)
  }

  return found
}

async function readJson<T>(fileName: string): Promise<T> {
  const raw = await fs.readFile(getContentPath(fileName), 'utf8')
  return JSON.parse(raw) as T
}

function buildShortName(name: string) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
  return initials || 'PRF'
}

function buildHeroTitle(name: string) {
  if (name.toLowerCase().includes('alçı') || name.toLowerCase().includes('alcı')) return 'Kusursuz Köşe Çözümleri'
  if (name.toLowerCase().includes('sıva') || name.toLowerCase().includes('siva')) return 'Hızlı ve Dengeli Sıva Altyapısı'
  if (name.toLowerCase().includes('tavan')) return 'Asma Tavanda Güvenli Taşıyıcı Sistem'
  return name
}

function buildDimensionsFromSpecs(specs: ProfileProductSpec[] | undefined): ProfileProductDimension[] {
  const thicknessSpec = specs?.find((item) => item.label.toLowerCase().includes('kalın'))
  if (!thicknessSpec?.value) return []

  const normalized = thicknessSpec.value.replace(',', '.')
  const matches = normalized.match(/\d+(?:\.\d+)?/g)
  if (!matches) return []

  const unique = Array.from(new Set(matches.map((v) => Number(v).toFixed(2).replace('.', ','))))
  return unique.slice(0, 6).map((thickness, idx) => {
    const dimensionABase = 20 + Math.min(idx, 3)
    return { thickness, a: `${dimensionABase}`, b: `${dimensionABase}`, c: '86' }
  })
}

function normalizeProfileBlogImage(image: string | undefined) {
  if (!image) return '/logoprofil.png'

  if (image.startsWith('/api/profile/media/file?url=') || image.startsWith('/api/media/file?url=')) {
    try {
      const raw = image.split('url=')[1] ?? ''
      const decoded = decodeURIComponent(raw)
      if (decoded) return normalizeProfileImageUrl(decoded, '/logoprofil.png')
    } catch {
      // ignore parse errors and continue with fallback rules
    }
  }

  if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('/uploads/')) {
    return normalizeProfileImageUrl(image, '/logoprofil.png')
  }

  if (LEGACY_BLOG_IMAGE_MAP[image]) return normalizeProfileImageUrl(LEGACY_BLOG_IMAGE_MAP[image], '/logoprofil.png')
  if (image.startsWith('/')) return '/logoprofil.png'
  return image
}

export async function getProfileProducts(): Promise<ProfileProduct[]> {
  const store = await readJson<ProductsStore>('profile-products-cms.json')

  return store.products.map((product) => ({
    slug: product.slug,
    name: product.detailTitle || product.name,
    shortName: buildShortName(product.name),
    heroTitle: product.sliderTitle || buildHeroTitle(product.name),
    subtitle: product.sliderDescription || product.description,
    image: normalizeProfileImageUrl(product.image || product.cardImage || product.sliderImage || product.gallery?.[0] || ''),
    cardImage: normalizeProfileImageUrl(product.cardImage || product.image || product.gallery?.[0] || ''),
    sliderImage: normalizeProfileImageUrl(product.sliderImage || product.image || product.gallery?.[0] || ''),
    description: product.detailDescription || product.description,
    useAreas: product.highlights?.length ? product.highlights : ['Konut projeleri', 'Ticari projeler', 'Profesyonel uygulama ekipleri'],
    specs:
      product.specs?.map((spec) => ({
        key: spec.label,
        value: spec.value,
      })) ?? [],
    dimensions:
      product.dimensions?.filter((row) => row && (row.thickness || row.a || row.b || row.c)) ??
      buildDimensionsFromSpecs(product.specs),
    gallery: (product.gallery ?? []).map((url) => normalizeProfileImageUrl(url)),
  }))
}

export async function getProfileBlogPosts() {
  const store = await readJson<BlogStore>('profile-blog-cms.json')
  return store.posts.map((post) => ({ ...post, image: normalizeProfileBlogImage(post.image) }))
}

export async function getProfileNewsPosts() {
  const store = await readJson<NewsStore>('profile-news-cms.json')
  return store.posts
}

export async function getProfileFaqs() {
  const store = await readJson<FaqStore>('profile-faq-cms.json')
  return store.items
}

export async function getProfileBlogPostBySlug(slug: string) {
  const posts = await getProfileBlogPosts()
  return posts.find((post) => post.slug === slug) ?? null
}

export async function getProfileNewsPostBySlug(slug: string) {
  const posts = await getProfileNewsPosts()
  return posts.find((post) => post.slug === slug) ?? null
}
