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

async function readStore(): Promise<ProductStore> {
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
    image: product.image,
    description: product.description,
    features: {
      rooms: product.features?.rooms ?? '2+1',
      bathrooms: product.features?.bathrooms ?? '1',
      parking: product.features?.parking ?? '1 Araclik',
      height: product.features?.height ?? '2.80m',
      deliveryTime: product.features?.deliveryTime ?? '6-8 Hafta',
      earthquakeResistance: product.features?.earthquakeResistance ?? 'Yuksek Dayanim',
      energyClass: product.features?.energyClass ?? 'A+',
      warranty: product.features?.warranty ?? '20 Yil',
    },
    technicalDetails: product.technicalDetails ?? DEFAULT_TECHNICAL_DETAILS,
    highlights: product.highlights ?? DEFAULT_HIGHLIGHTS,
    gallery: product.gallery ?? DEFAULT_GALLERY,
    floorPlans: product.floorPlans ?? DEFAULT_FLOOR_PLANS,
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
