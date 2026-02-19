import 'server-only'

import { existsSync } from 'fs'
import { promises as fs } from 'fs'
import path from 'path'
import type { VideosStore } from '@/lib/videos-types'

function resolveStorePath() {
  const candidates = [
    path.join(process.cwd(), 'content', 'videos-cms.json'),
    path.join(process.cwd(), '..', '..', 'content', 'videos-cms.json'),
    path.join(process.cwd(), '..', 'content', 'videos-cms.json'),
  ]

  const found = candidates.find((candidate) => existsSync(candidate))
  if (!found) {
    throw new Error('videos-cms.json not found')
  }

  return found
}

export async function getVideosContent(): Promise<VideosStore> {
  const raw = await fs.readFile(resolveStorePath(), 'utf8')
  return JSON.parse(raw) as VideosStore
}

