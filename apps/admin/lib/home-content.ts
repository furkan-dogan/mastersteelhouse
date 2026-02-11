import fs from "node:fs/promises"
import path from "node:path"
import type { Collection } from "mongodb"
import { getDatabase } from "./mongodb"
import { normalizeHomeContent, type HomeContent } from "@mastersteelhouse/shared-content/home-content"

export type { HomeContent }

export type HomeContentDocument = {
  slug: "home"
  content: HomeContent
  updatedAt: Date
}

const CONTENT_RELATIVE_PATH = path.join("content", "home.json")

async function findRepoRoot(): Promise<string> {
  let current = process.cwd()
  for (let i = 0; i < 6; i += 1) {
    const pkgPath = path.join(current, "package.json")
    try {
      const raw = await fs.readFile(pkgPath, "utf8")
      const pkg = JSON.parse(raw)
      if (pkg && pkg.workspaces) {
        return current
      }
    } catch {
      // keep searching
    }
    const parent = path.dirname(current)
    if (parent === current) break
    current = parent
  }
  return process.cwd()
}

export async function readHomeContent(): Promise<HomeContent> {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set in environment variables.")
  }
  const collection = await getHomeCollection()
  const existing = await collection.findOne({ slug: "home" })
  if (existing?.content) {
    return normalizeHomeContent(existing.content)
  }
  const seeded = await readHomeContentFromFile()
  const normalized = normalizeHomeContent(seeded)
  await collection.updateOne(
    { slug: "home" },
    { $set: { content: normalized, updatedAt: new Date() } },
    { upsert: true }
  )
  return normalized
}

export async function writeHomeContent(content: HomeContent): Promise<void> {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set in environment variables.")
  }

  const collection = await getHomeCollection()
  await collection.updateOne(
    { slug: "home" },
    { $set: { content, updatedAt: new Date() } },
    { upsert: true }
  )
}

async function readHomeContentFromFile(): Promise<HomeContent> {
  const repoRoot = await findRepoRoot()
  const contentPath = path.join(repoRoot, CONTENT_RELATIVE_PATH)
  const raw = await fs.readFile(contentPath, "utf8")
  return JSON.parse(raw) as HomeContent
}

async function getHomeCollection(): Promise<Collection<HomeContentDocument>> {
  const db = await getDatabase()
  return db.collection<HomeContentDocument>("home_content")
}
