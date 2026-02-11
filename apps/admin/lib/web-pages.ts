import type { Collection } from "mongodb"
import { getDatabase } from "./mongodb"
import { DEFAULT_WEB_PAGES, type WebPageContent } from "../../../content/web-pages"
import { normalizeWebPage } from "@mastersteelhouse/shared-content/web-pages"

export type WebPageDocument = {
  slug: string
  content: WebPageContent
  updatedAt: Date
}

const COLLECTION_NAME = "web_pages"

async function getCollection(): Promise<Collection<WebPageDocument>> {
  const db = await getDatabase()
  return db.collection<WebPageDocument>(COLLECTION_NAME)
}

async function seedIfMissing() {
  const collection = await getCollection()
  const existing = await collection.find({}, { projection: { slug: 1 } }).toArray()
  const existingSlugs = new Set(existing.map((doc) => doc.slug))
  const missing = DEFAULT_WEB_PAGES.filter((content) => !existingSlugs.has(content.slug))

  if (missing.length > 0) {
    await collection.insertMany(
      missing.map((content) => ({
        slug: content.slug,
        content,
        updatedAt: new Date(),
      }))
    )
  }
}

export async function readWebPage(slug: string): Promise<WebPageContent> {
  await seedIfMissing()
  const collection = await getCollection()
  const doc = await collection.findOne({ slug })
  if (!doc?.content) {
    const fallback = DEFAULT_WEB_PAGES.find((item) => item.slug === slug) ?? DEFAULT_WEB_PAGES[0]
    return normalizeWebPage(fallback)
  }
  return normalizeWebPage(doc.content)
}

export async function writeWebPage(content: WebPageContent): Promise<void> {
  const collection = await getCollection()
  await collection.updateOne(
    { slug: content.slug },
    { $set: { content, updatedAt: new Date() } },
    { upsert: true }
  )
}
