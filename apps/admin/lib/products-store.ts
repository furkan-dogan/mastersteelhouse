import { existsSync } from 'fs'
import { promises as fs } from 'fs'
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

export type ProductSpec = {
  label: string
  value: string
  icon: 'Clock' | 'Ruler' | 'Shield' | 'Zap'
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
  description: string
  features: ProductFeatures
  specs?: ProductSpec[]
  technicalDetails?: Record<string, string>
  highlights?: string[]
  gallery?: string[]
  floorPlans?: { name: string; image: string }[]
}

export type ProductStore = {
  categories: ProductCategory[]
  products: ProductItem[]
}

function getStorePath() {
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

export async function readProductStore(): Promise<ProductStore> {
  const raw = await fs.readFile(getStorePath(), 'utf8')
  return JSON.parse(raw) as ProductStore
}

export async function writeProductStore(store: ProductStore) {
  await fs.writeFile(getStorePath(), `${JSON.stringify(store, null, 2)}\n`, 'utf8')
}
