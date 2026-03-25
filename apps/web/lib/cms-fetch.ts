import 'server-only'

import { existsSync } from 'fs'
import { promises as fs } from 'fs'
import path from 'path'

export type ReadCmsJsonOptions<T> = {
  r2Key: string
  devApiPath?: string
  localFileName: string
  validate: (value: unknown) => value is T
}

const WEB_DEV_ADMIN_API_BASE = (process.env.WEB_DEV_ADMIN_API_BASE ?? 'http://localhost:3002').trim().replace(/\/$/, '')
const WEB_DEV_MEDIA_PROXY_BASE = (process.env.WEB_DEV_MEDIA_PROXY_BASE ?? WEB_DEV_ADMIN_API_BASE).trim().replace(/\/$/, '')
const DEFAULT_R2_PUBLIC_BASE_URL = 'https://pub-d48ad607846349fc992b42968ced0d17.r2.dev'

const IS_DEV = process.env.NODE_ENV === 'development'
const CMS_REVALIDATE_SECONDS = Number.parseInt(process.env.CMS_REVALIDATE_SECONDS ?? '120', 10)
const CMS_FORCE_NO_STORE = (process.env.CMS_FORCE_NO_STORE ?? 'true').trim().toLowerCase() !== 'false'

function resolveLocalContentPath(fileName: string) {
  const candidates = [
    path.join(process.cwd(), 'content', fileName),
    path.join(process.cwd(), '..', '..', 'content', fileName),
    path.join(process.cwd(), '..', 'content', fileName),
  ]

  const found = candidates.find((candidate) => existsSync(candidate))
  if (!found) {
    throw new Error(`${fileName} not found`)
  }

  return found
}

function resolveR2BaseUrl() {
  return (process.env.R2_PUBLIC_BASE_URL ?? process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL ?? DEFAULT_R2_PUBLIC_BASE_URL)
    .trim()
    .replace(/\/$/, '')
}

function isR2DevUrl(url: string) {
  return /^https:\/\/[^/]+\.r2\.dev\//i.test(url)
}

function toAdminMediaProxy(url: string) {
  return `${WEB_DEV_MEDIA_PROXY_BASE}/api/media/file?url=${encodeURIComponent(url)}`
}

export function normalizeCmsMediaUrl(input: string | undefined): string {
  const value = (input ?? '').trim()
  if (!value) return ''

  if (
    value.startsWith('/api/media/file?url=') ||
    value.startsWith('/api/profile/media/file?url=') ||
    value.startsWith('/api/media/file?path=') ||
    value.startsWith('/api/profile/media/file?path=')
  ) {
    try {
      const query = value.includes('url=') ? 'url=' : 'path='
      const raw = value.split(query)[1] ?? ''
      const decoded = decodeURIComponent(raw)
      return decoded || value
    } catch {
      return value
    }
  }

  if (IS_DEV && isR2DevUrl(value)) {
    return toAdminMediaProxy(value)
  }

  return value
}

async function fetchJson<T>(url: string, { forceNoStore = false }: { forceNoStore?: boolean } = {}): Promise<T | null> {
  try {
    const shouldBypassCache = IS_DEV || forceNoStore || CMS_FORCE_NO_STORE
    const response = await fetch(url, {
      cache: shouldBypassCache ? 'no-store' : 'force-cache',
      next: !shouldBypassCache ? { revalidate: CMS_REVALIDATE_SECONDS } : undefined,
    })

    if (!response.ok) return null
    return (await response.json()) as T
  } catch {
    return null
  }
}

export async function readCmsJson<T>({
  r2Key,
  devApiPath,
  localFileName,
  validate,
}: ReadCmsJsonOptions<T>): Promise<T> {
  if (IS_DEV && devApiPath) {
    const devValue = await fetchJson<unknown>(`${WEB_DEV_ADMIN_API_BASE}${devApiPath}`, { forceNoStore: true })
    if (devValue && validate(devValue)) return devValue
  }

  try {
    const raw = await fs.readFile(resolveLocalContentPath(localFileName), 'utf8')
    const parsed = JSON.parse(raw) as unknown
    if (validate(parsed)) return parsed
  } catch {
    // keep going and try R2 fallback
  }

  const r2Base = resolveR2BaseUrl()
  if (r2Base) {
    const r2Value = await fetchJson<unknown>(`${r2Base}/${r2Key}`)
    if (r2Value && validate(r2Value)) return r2Value
  }

  throw new Error(`Invalid CMS shape in ${localFileName}`)
}
