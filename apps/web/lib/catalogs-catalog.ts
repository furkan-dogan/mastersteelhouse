import 'server-only'

import type { CatalogsStore } from '@/lib/catalogs-types'
import { normalizeCmsMediaUrl, readCmsJson } from '@/lib/cms-fetch'

function isCatalogsStore(value: unknown): value is CatalogsStore {
  return Boolean(
    value &&
      typeof value === 'object' &&
      typeof (value as CatalogsStore).hero?.title === 'string' &&
      typeof (value as CatalogsStore).hero?.description === 'string' &&
      Array.isArray((value as CatalogsStore).items)
  )
}

export async function getCatalogsContent(): Promise<CatalogsStore> {
  const store = await readCmsJson<CatalogsStore>({
    r2Key: '_cms/catalogs-cms.json',
    devApiPath: '/api/catalogs',
    localFileName: 'catalogs-cms.json',
    validate: isCatalogsStore,
  })

  return {
    ...store,
    items: store.items.map((item) => ({
      ...item,
      pdfUrl: normalizeCmsMediaUrl(item.pdfUrl),
    })),
  }
}
