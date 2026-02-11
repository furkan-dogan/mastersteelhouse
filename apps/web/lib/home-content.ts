import fs from "node:fs/promises"
import path from "node:path"
import type { Collection } from "mongodb"
import { getDatabase } from "./mongodb"
import { normalizeHomeContent, type HomeContent } from "@mastersteelhouse/shared-content/home-content"

export type { HomeContent }

export type HeroControls = HomeContent["hero"]["controls"]

type HomeContentDocument = {
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

export async function getHomeContent(): Promise<HomeContent> {
  if (!process.env.MONGODB_URI) {
    const seeded = await readHomeContentFromFile()
    return normalizeHomeContent(seeded)
  }

  try {
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
  } catch {
    const seeded = await readHomeContentFromFile()
    return normalizeHomeContent(seeded)
  }
}

async function getHomeCollection(): Promise<Collection<HomeContentDocument>> {
  const db = await getDatabase()
  return db.collection<HomeContentDocument>("home_content")
}

async function readHomeContentFromFile(): Promise<HomeContent> {
  const repoRoot = await findRepoRoot()
  const contentPath = path.join(repoRoot, CONTENT_RELATIVE_PATH)

  try {
    const raw = await fs.readFile(contentPath, "utf8")
    return JSON.parse(raw) as HomeContent
  } catch {
    return {
      hero: {
        slides: [],
        controls: {
          primaryCtaHref: "#contact",
          secondaryCtaLabel: "",
          secondaryCtaHref: "#about",
          followLabel: "",
          followTooltip: "",
          followLinks: [],
        },
      },
      about: {
        badge: "Hakkımızda",
        title: "Çelik Yapıda",
        titleAccent: "20 Yılın Tecrübesi",
        description: "",
        videoUrl: "",
        features: [],
        stats: [],
        timeline: [],
        ctaText: "",
        ctaButton: "",
      },
      projects: {
        eyebrow: "",
        title: "",
        titleAccent: "",
        description: "",
        areaLabel: "Alan",
        yearLabel: "Yıl",
        ctaNote: "",
        ctaLabel: "",
        ctaHref: "",
        items: [],
      },
      faq: {
        eyebrow: "",
        title: "",
        titleAccent: "",
        description: "",
        ctaNote: "",
        ctaLabel: "",
        ctaHref: "",
        items: [],
      },
      references: {
        eyebrow: "",
        title: "",
        titleAccent: "",
        description: "",
        clients: [],
        stats: [],
      },
    }
  }
}
