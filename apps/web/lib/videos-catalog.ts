import 'server-only'

import type { VideosStore } from '@/lib/videos-types'
import { createCmsStoreValidator, readCmsStore } from '@/lib/cms-store'

const isVideosStore = createCmsStoreValidator({
  stringPaths: ['hero.title', 'hero.description'],
  arrayPaths: ['items'],
}) as (value: unknown) => value is VideosStore

export async function getVideosContent(): Promise<VideosStore> {
  return readCmsStore<VideosStore>({
    r2Key: '_cms/videos-cms.json',
    devApiPath: '/api/public/videos',
    localFileName: 'videos-cms.json',
    validate: isVideosStore,
  })
}
