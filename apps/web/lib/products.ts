import type { Collection } from "mongodb"
import { getDatabase } from "./mongodb"
import { DEFAULT_CATEGORIES, DEFAULT_PRODUCTS } from "../../../content/products"

export type ProductCategory = {
  slug: string
  name: string
  eyebrow: string
  title: string
  titleAccent: string
  description: string
}

export type ProductItem = {
  categorySlug: string
  slug: string
  name: string
  size?: string
  image: string
  rooms?: string
  bathrooms?: string
  capacity?: string
  usageType?: string
  description: string
  highlights: string[]
  specs: { label: string; value: string }[]
}

export type ProductCatalog = {
  categories: ProductCategory[]
  products: ProductItem[]
}

const CATEGORY_COLLECTION = "product_categories"
const PRODUCT_COLLECTION = "products"

function normalizeCategory(value: Partial<ProductCategory>): ProductCategory {
  return {
    slug: value.slug ?? "",
    name: value.name ?? "",
    eyebrow: value.eyebrow ?? "",
    title: value.title ?? value.name ?? "",
    titleAccent: value.titleAccent ?? "",
    description: value.description ?? "",
  }
}

function normalizeProduct(value: Partial<ProductItem>): ProductItem {
  return {
    categorySlug: value.categorySlug ?? "",
    slug: value.slug ?? "",
    name: value.name ?? "",
    size: value.size ?? "",
    image: value.image ?? "",
    rooms: value.rooms ?? "",
    bathrooms: value.bathrooms ?? "",
    capacity: value.capacity ?? "",
    usageType: value.usageType ?? "",
    description: value.description ?? "",
    highlights: value.highlights ?? [],
    specs: value.specs ?? [],
  }
}

async function getCategoryCollection(): Promise<Collection<ProductCategory>> {
  const db = await getDatabase()
  return db.collection<ProductCategory>(CATEGORY_COLLECTION)
}

async function getProductCollection(): Promise<Collection<ProductItem>> {
  const db = await getDatabase()
  return db.collection<ProductItem>(PRODUCT_COLLECTION)
}

async function seedIfMissing() {
  const categoriesCollection = await getCategoryCollection()
  const productsCollection = await getProductCollection()

  const categoryCount = await categoriesCollection.countDocuments()
  const productCount = await productsCollection.countDocuments()

  if (categoryCount === 0) {
    await categoriesCollection.insertMany(DEFAULT_CATEGORIES.map(normalizeCategory))
  }

  if (productCount === 0) {
    await productsCollection.insertMany(DEFAULT_PRODUCTS.map(normalizeProduct))
  }
}

export async function readProductCatalog(): Promise<ProductCatalog> {
  if (!process.env.MONGODB_URI) {
    return {
      categories: DEFAULT_CATEGORIES.map(normalizeCategory),
      products: DEFAULT_PRODUCTS.map(normalizeProduct),
    }
  }

  try {
    await seedIfMissing()
    const categoriesCollection = await getCategoryCollection()
    const productsCollection = await getProductCollection()

    const categories = (await categoriesCollection.find().sort({ name: 1 }).toArray()).map(normalizeCategory)
    const products = (await productsCollection.find().sort({ name: 1 }).toArray()).map(normalizeProduct)

    return { categories, products }
  } catch (error) {
    console.error("Failed to read product catalog, falling back to defaults.", error)
    return {
      categories: DEFAULT_CATEGORIES.map(normalizeCategory),
      products: DEFAULT_PRODUCTS.map(normalizeProduct),
    }
  }
}
