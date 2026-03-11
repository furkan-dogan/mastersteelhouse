import 'server-only'

import { promises as fs } from 'fs'
import { existsSync } from 'fs'
import path from 'path'

export type ProductFeatures = {
  rooms: string
  bathrooms: string
  parking: string
  height: string
  deliveryTime: string
  earthquakeResistance: string
  energyClass: string
  warranty: string
}

export type ProductItem = {
  categorySlug: string
  slug: string
  name: string
  area: string
  image: string
  description: string
  features: ProductFeatures
  technicalDetails: Record<string, string>
  highlights: string[]
  gallery: string[]
  floorPlans: { name: string; image: string }[]
}

export type ProductCategory = {
  slug: string
  title: string
  description: string
}

type ProductStore = {
  categories: ProductCategory[]
  products: Array<{
    categorySlug: string
    slug: string
    name: string
    area: string
    image: string
    cardImage?: string
    sliderImage?: string
    description: string
    features?: Partial<ProductFeatures>
    technicalDetails?: Record<string, string>
    highlights?: string[]
    gallery?: string[]
    floorPlans?: { name: string; image: string }[]
  }>
}

const DEFAULT_GALLERY = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
  'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=1200&q=80',
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80',
  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
]

const DEFAULT_FLOOR_PLANS = [
  { name: 'Zemin Kat', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80' },
  { name: '1. Kat', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80' },
]

const DEFAULT_TECHNICAL_DETAILS = {
  TasiyiciSistem: 'Galvanizli hafif celik konstruksiyon',
  DisDuvar: '14 cm celik karkas + tas yunu izolasyon',
  IcDuvar: '9 cm celik karkas + tas yunu izolasyon',
  Cati: 'Kumsuz metal kiremit',
  DisCephe: 'Nem bariyeri + boardex + mineral siva',
  IcCephe: 'OSB uzeri alcipan + silikonlu boya',
}

const DEFAULT_HIGHLIGHTS = [
  'Depreme dayanikli yapi',
  'Hizli uretim ve montaj',
  'Enerji verimli tasarim',
  'Ses ve isi yalitimi',
  'Uzun omurlu celik sistem',
  'Modern mimari cizgiler',
]

const WEB_DEV_MEDIA_PROXY_BASE = (process.env.WEB_DEV_MEDIA_PROXY_BASE ?? 'http://localhost:3002').trim().replace(/\/$/, '')

function isR2DevUrl(url: string) {
  return /^https:\/\/[^/]+\.r2\.dev\//i.test(url)
}

function toAdminMediaProxy(url: string) {
  return `${WEB_DEV_MEDIA_PROXY_BASE}/api/media/file?url=${encodeURIComponent(url)}`
}

function resolveStorePath() {
  const candidates = [
    path.join(process.cwd(), 'content', 'products-cms.json'),
    path.join(process.cwd(), '..', '..', 'content', 'products-cms.json'),
    path.join(process.cwd(), '..', 'content', 'products-cms.json'),
  ]

  const found = candidates.find((candidate) => existsSync(candidate))
  if (!found) {
    throw new Error('products-cms.json not found')
  }
  return found
}

function normalizeMediaUrl(input: string | undefined): string {
  const value = (input ?? '').trim()
  if (!value) return ''

  if (
    value.startsWith('/api/media/file?url=') ||
    value.startsWith('/api/profile/media/file?url=') ||
    value.startsWith('/api/media/file?path=') ||
    value.startsWith('/api/profile/media/file?path=')
  ) {
    try {
      const query = value.includes('url=') ? 'url=' : 'path='
      const raw = value.split(query)[1] ?? ''
      const decoded = decodeURIComponent(raw)
      return decoded || value
    } catch {
      return value
    }
  }

  // Local geliştirmede bazı makinelerde *.r2.dev TLS hatası verebiliyor.
  // Bu durumda görseli admin proxy endpoint'i üzerinden servis et.
  if (process.env.NODE_ENV === 'development' && isR2DevUrl(value)) {
    return toAdminMediaProxy(value)
  }

  return value
}

async function readStoreFromR2(): Promise<ProductStore | null> {
  const base = (process.env.R2_PUBLIC_BASE_URL ?? process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL ?? '').trim().replace(/\/$/, '')
  if (!base) return null

  try {
    const response = await fetch(`${base}/_cms/products-cms.json?ts=${Date.now()}`, {
      cache: 'no-store',
    })

    if (!response.ok) return null
    const json = (await response.json()) as ProductStore
    if (!Array.isArray(json.categories) || !Array.isArray(json.products)) return null
    return json
  } catch {
    return null
  }
}

async function readStoreFromAdminDev(): Promise<ProductStore | null> {
  if (process.env.NODE_ENV !== 'development') return null

  const adminBase = (process.env.WEB_DEV_ADMIN_BASE_URL ?? 'http://localhost:3002').trim().replace(/\/$/, '')
  if (!adminBase) return null

  try {
    const response = await fetch(`${adminBase}/api/products`, { cache: 'no-store' })
    if (!response.ok) return null
    const json = (await response.json()) as ProductStore
    if (!Array.isArray(json.categories) || !Array.isArray(json.products)) return null
    return json
  } catch {
    return null
  }
}

async function readStore(): Promise<ProductStore> {
  const r2Store = await readStoreFromR2()
  if (r2Store) return r2Store

  const adminDevStore = await readStoreFromAdminDev()
  if (adminDevStore) return adminDevStore

  const filePath = resolveStorePath()
  const raw = await fs.readFile(filePath, 'utf8')
  return JSON.parse(raw) as ProductStore
}

function normalizeProduct(product: ProductStore['products'][number]): ProductItem {
  return {
    categorySlug: product.categorySlug,
    slug: product.slug,
    name: product.name,
    area: product.area,
    image: normalizeMediaUrl(product.image || product.cardImage || product.sliderImage || product.gallery?.[0]),
    description: product.description,
    features: {
      rooms: product.features?.rooms ?? '2+1',
      bathrooms: product.features?.bathrooms ?? '1',
      parking: product.features?.parking ?? '1 Araçlık',
      height: product.features?.height ?? '2.80m',
      deliveryTime: product.features?.deliveryTime ?? '6-8 Hafta',
      earthquakeResistance: product.features?.earthquakeResistance ?? 'Yüksek Dayanım',
      energyClass: product.features?.energyClass ?? 'A+',
      warranty: product.features?.warranty ?? '20 Yıl',
    },
    technicalDetails: product.technicalDetails ?? DEFAULT_TECHNICAL_DETAILS,
    highlights: product.highlights ?? DEFAULT_HIGHLIGHTS,
    gallery: (product.gallery ?? DEFAULT_GALLERY).map((url) => normalizeMediaUrl(url)),
    floorPlans: (product.floorPlans ?? DEFAULT_FLOOR_PLANS).map((plan) => ({
      ...plan,
      image: normalizeMediaUrl(plan.image),
    })),
  }
}

export async function getCategories(): Promise<ProductCategory[]> {
  const store = await readStore()
  return store.categories
}

export async function getCategoryBySlug(categorySlug: string): Promise<ProductCategory | undefined> {
  const categories = await getCategories()
  return categories.find((category) => category.slug === categorySlug)
}

export async function getProductsByCategory(categorySlug: string): Promise<ProductItem[]> {
  const store = await readStore()
  return store.products.filter((item) => item.categorySlug === categorySlug).map(normalizeProduct)
}

export async function getProduct(categorySlug: string, slug: string): Promise<ProductItem | undefined> {
  const products = await getProductsByCategory(categorySlug)
  return products.find((product) => product.slug === slug)
}

export async function getAllProductPaths(): Promise<{ category: string; slug: string }[]> {
  const store = await readStore()
  return store.products.map((product) => ({ category: product.categorySlug, slug: product.slug }))
}
