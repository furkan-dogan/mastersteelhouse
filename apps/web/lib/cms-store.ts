import 'server-only'

import { readCmsJson, type ReadCmsJsonOptions } from '@/lib/cms-fetch'

type ValidatorConfig = {
  stringPaths?: string[]
  arrayPaths?: string[]
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object') return null
  return value as Record<string, unknown>
}

function getByPath(value: unknown, path: string): unknown {
  const keys = path.split('.')
  let current: unknown = value

  for (const key of keys) {
    const record = asRecord(current)
    if (!record) return undefined
    current = record[key]
  }

  return current
}

export function createCmsStoreValidator({ stringPaths = [], arrayPaths = [] }: ValidatorConfig) {
  return (value: unknown) => {
    const root = asRecord(value)
    if (!root) return false

    const stringsOk = stringPaths.every((fieldPath) => typeof getByPath(root, fieldPath) === 'string')
    const arraysOk = arrayPaths.every((fieldPath) => Array.isArray(getByPath(root, fieldPath)))

    return stringsOk && arraysOk
  }
}

export async function readCmsStore<T>(options: ReadCmsJsonOptions<T>): Promise<T> {
  return readCmsJson(options)
}

export function mapStoreItems<TStore extends { items: TItem[] }, TItem>(
  store: TStore,
  mapItem: (item: TItem) => TItem
): TStore {
  return {
    ...store,
    items: store.items.map(mapItem),
  }
}
