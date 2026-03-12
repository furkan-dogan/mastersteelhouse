import 'server-only'

import type { CatalogsStore } from '@/lib/catalogs-types'
import { normalizeCmsMediaUrl } from '@/lib/cms-fetch'
import { createCmsStoreValidator, mapStoreItems, readCmsStore } from '@/lib/cms-store'

const isCatalogsStore = createCmsStoreValidator({
  stringPaths: ['hero.title', 'hero.description'],
  arrayPaths: ['items'],
}) as (value: unknown) => value is CatalogsStore

export async function getCatalogsContent(): Promise<CatalogsStore> {
  const store = await readCmsStore<CatalogsStore>({
    r2Key: '_cms/catalogs-cms.json',
    devApiPath: '/api/catalogs',
    localFileName: 'catalogs-cms.json',
    validate: isCatalogsStore,
  })

  return mapStoreItems<CatalogsStore, CatalogsStore['items'][number]>(store, (item) => ({
    ...item,
    pdfUrl: normalizeCmsMediaUrl(item.pdfUrl),
  }))
}
