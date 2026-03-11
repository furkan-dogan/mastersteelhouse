import { existsSync } from 'fs'
import { promises as fs } from 'fs'
import path from 'path'
import { isR2Configured, readJsonFromR2, writeJsonToR2 } from '@/lib/r2-storage'

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

export type ProductSpec = {
  label: string
  value: string
  icon: 'Clock' | 'Ruler' | 'Shield' | 'Zap'
}

export type ProductDimension = {
  thickness: string
  a: string
  b: string
  c: string
}

export type ProductCategory = {
  slug: string
  title: string
  description: string
}

export type ProductItem = {
  categorySlug: string
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
  features: ProductFeatures
  specs?: ProductSpec[]
  dimensions?: ProductDimension[]
  technicalDetails?: Record<string, string>
  highlights?: string[]
  gallery?: string[]
  floorPlans?: { name: string; image: string }[]
}

export type ProductStore = {
  categories: ProductCategory[]
  products: ProductItem[]
}

const PROFILE_PRODUCTS_INDEX_KEY = '_cms/profile-products-cms.json'

function getStorePath() {
  const candidates = [
    path.join(process.cwd(), 'content', 'profile-products-cms.json'),
    path.join(process.cwd(), '..', '..', 'content', 'profile-products-cms.json'),
    path.join(process.cwd(), '..', 'content', 'profile-products-cms.json'),
  ]

  const found = candidates.find((candidate) => existsSync(candidate))
  if (!found) {
    throw new Error('profile-products-cms.json not found')
  }

  return found
}

export async function readProductStore(): Promise<ProductStore> {
  if (isR2Configured()) {
    const r2Store = await readJsonFromR2<ProductStore>(PROFILE_PRODUCTS_INDEX_KEY)
    if (r2Store && Array.isArray(r2Store.categories) && Array.isArray(r2Store.products)) return r2Store

    try {
      const raw = await fs.readFile(getStorePath(), 'utf8')
      const fallback = JSON.parse(raw) as ProductStore
      if (fallback && Array.isArray(fallback.categories) && Array.isArray(fallback.products)) return fallback
    } catch {
      // ignore local fallback errors on serverless
    }

    return { categories: [], products: [] }
  }

  const raw = await fs.readFile(getStorePath(), 'utf8')
  return JSON.parse(raw) as ProductStore
}

export async function writeProductStore(store: ProductStore) {
  if (isR2Configured()) {
    await writeJsonToR2(PROFILE_PRODUCTS_INDEX_KEY, store)
  }

  await fs.writeFile(getStorePath(), `${JSON.stringify(store, null, 2)}\n`, 'utf8')
}
