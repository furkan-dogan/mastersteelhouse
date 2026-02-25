import { existsSync } from 'fs'
import { promises as fs } from 'fs'
import path from 'path'
import { unstable_noStore as noStore } from 'next/cache'

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

export type ProfileReferenceItem = {
  id: string
  title: string
  location: string
  categories: string[]
  image: string
  area: string
}

type ProductsStore = {
  products: Array<{
    slug: string
    name: string
    area: string
    image: string
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
type ReferencesStore = { items: ProfileReferenceItem[] }

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
  noStore()
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
  if (name.toLowerCase().includes('alçı') || name.toLowerCase().includes('alcı')) {
    return 'Kusursuz Köşe Çözümleri'
  }
  if (name.toLowerCase().includes('sıva') || name.toLowerCase().includes('siva')) {
    return 'Hızlı ve Dengeli Sıva Altyapısı'
  }
  if (name.toLowerCase().includes('tavan')) {
    return 'Asma Tavanda Güvenli Taşıyıcı Sistem'
  }
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
    return {
      thickness,
      a: `${dimensionABase}`,
      b: `${dimensionABase}`,
      c: '86',
    }
  })
}

export async function getProfileProducts(): Promise<ProfileProduct[]> {
  const store = await readJson<ProductsStore>('profile-products-cms.json')

  return store.products.map((product) => ({
    slug: product.slug,
    name: product.detailTitle || product.name,
    shortName: buildShortName(product.name),
    heroTitle: product.sliderTitle || buildHeroTitle(product.name),
    subtitle: product.sliderDescription || product.description,
    image: product.image || product.gallery?.[0] || '',
    description: product.detailDescription || product.description,
    useAreas:
      product.highlights?.length
        ? product.highlights
        : ['Konut projeleri', 'Ticari projeler', 'Profesyonel uygulama ekipleri'],
    specs:
      product.specs?.map((spec) => ({
        key: spec.label,
        value: spec.value,
      })) ?? [],
    dimensions:
      product.dimensions?.filter(
        (row) => row && (row.thickness || row.a || row.b || row.c)
      ) ?? buildDimensionsFromSpecs(product.specs),
    gallery: product.gallery ?? [],
  }))
}

export async function getProfileBlogPosts() {
  const store = await readJson<BlogStore>('profile-blog-cms.json')
  return store.posts
}

export async function getProfileNewsPosts() {
  const store = await readJson<NewsStore>('profile-news-cms.json')
  return store.posts
}

export async function getProfileReferences() {
  const store = await readJson<ReferencesStore>('profile-references-cms.json')
  return store.items
}
