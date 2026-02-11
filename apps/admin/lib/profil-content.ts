import type { Collection } from "mongodb"
import { getDatabase } from "./mongodb"
import {
  DEFAULT_CONTENT,
  getDefaultProfilContent,
  normalizeProfilContent,
  type ProfilContent,
} from "@mastersteelhouse/shared-content/profil"

export * from "@mastersteelhouse/shared-content/profil"

export type ProfilContentDocument = {
  slug: "profil"
  content: ProfilContent
  updatedAt: Date
}

export { getDefaultProfilContent }

export async function getProfilCollection(): Promise<Collection<ProfilContentDocument>> {
  const db = await getDatabase()
  return db.collection<ProfilContentDocument>("profil_content")
}

export async function readProfilContent(): Promise<ProfilContent> {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set in environment variables.")
  }
  const collection = await getProfilCollection()
  const existing = await collection.findOne({ slug: "profil" })
  if (!existing?.content) {
    await collection.updateOne(
      { slug: "profil" },
      { $set: { content: DEFAULT_CONTENT, updatedAt: new Date() } },
      { upsert: true }
    )
    return DEFAULT_CONTENT
  }
  return normalizeProfilContent(existing.content)
}

export async function writeProfilContent(content: ProfilContent): Promise<void> {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set in environment variables.")
  }
  const collection = await getProfilCollection()
  await collection.updateOne(
    { slug: "profil" },
    { $set: { content, updatedAt: new Date() } },
    { upsert: true }
  )
}
