import { existsSync } from 'fs'
import { promises as fs } from 'fs'
import path from 'path'
import { isR2Configured, readJsonFromR2 } from '@/lib/r2-storage'

const MEDIA_URL_REGEX = /\/uploads\/media\/[^"'\s?#]+/g

function resolveContentPath(fileName: string) {
  const candidates = [
    path.join(process.cwd(), 'content', fileName),
    path.join(process.cwd(), '..', '..', 'content', fileName),
    path.join(process.cwd(), '..', 'content', fileName),
  ]

  return candidates.find((candidate) => existsSync(candidate)) ?? null
}

function extractMediaUrlsFromString(value: string) {
  const matches = value.match(MEDIA_URL_REGEX)
  return matches ?? []
}

function walk(value: unknown, collector: Set<string>) {
  if (typeof value === 'string') {
    const urls = extractMediaUrlsFromString(value)
    for (const url of urls) collector.add(url)
    // R2/CDN URLs are full https:// strings — collect them directly
    if (value.startsWith('https://') || value.startsWith('http://')) {
      collector.add(value)
    }
    return
  }

  if (Array.isArray(value)) {
    for (const item of value) walk(item, collector)
    return
  }

  if (value && typeof value === 'object') {
    for (const next of Object.values(value)) walk(next, collector)
  }
}

async function collectFromJsonFile(filePath: string, collector: Set<string>) {
  const raw = await fs.readFile(filePath, 'utf8')
  try {
    const parsed = JSON.parse(raw) as unknown
    walk(parsed, collector)
  } catch {
    for (const url of extractMediaUrlsFromString(raw)) collector.add(url)
  }
}

export async function collectUsedMediaUrls(fileNames: string[]) {
  const used = new Set<string>()

  for (const fileName of fileNames) {
    try {
      if (isR2Configured()) {
        const parsed = await readJsonFromR2<unknown>(`_cms/${fileName}`)
        if (parsed) walk(parsed, used)
      } else {
        const filePath = resolveContentPath(fileName)
        if (filePath) await collectFromJsonFile(filePath, used)
      }
    } catch {
      // ignore missing/invalid content files
    }
  }

  return used
}
