import type { Metadata } from 'next'

const DEFAULT_SITE_URL = 'https://mastersteelhouse.com'
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).trim().replace(/\/$/, '')

export const BRAND_NAME = 'Master Steel House'

export function getSiteUrl() {
  return SITE_URL
}

export function toAbsoluteUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalizedPath}`
}

export function trimForMeta(text: string, max = 160) {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  return `${clean.slice(0, max - 1).trimEnd()}…`
}

type BuildPageMetadataOptions = {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
}

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
}: BuildPageMetadataOptions): Metadata {
  const canonical = path.startsWith('/') ? path : `/${path}`
  const ogImage = image
    ? image.startsWith('http')
      ? image
      : toAbsoluteUrl(image)
    : toAbsoluteUrl('/logo.png')

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export function buildArticleMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string
  description: string
  path: string
  image?: string
}): Metadata {
  return buildPageMetadata({
    title,
    description,
    path,
    image,
    type: 'article',
  })
}
