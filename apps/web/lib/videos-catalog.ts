import 'server-only'

import type { VideosStore } from '@/lib/videos-types'
import { readCmsJson } from '@/lib/cms-fetch'

function isVideosStore(value: unknown): value is VideosStore {
  return Boolean(
    value &&
      typeof value === 'object' &&
      typeof (value as VideosStore).hero?.title === 'string' &&
      typeof (value as VideosStore).hero?.description === 'string' &&
      Array.isArray((value as VideosStore).items)
  )
}

export async function getVideosContent(): Promise<VideosStore> {
  return readCmsJson<VideosStore>({
    r2Key: '_cms/videos-cms.json',
    devApiPath: '/api/videos',
    localFileName: 'videos-cms.json',
    validate: isVideosStore,
  })
}
