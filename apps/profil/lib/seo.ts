import type { Metadata } from 'next'

export const PROFILE_SITE_URL = process.env.NEXT_PUBLIC_PROFILE_SITE_URL ?? 'https://profil.mastersteelhouse.com'
export const PROFILE_SITE_NAME = 'Master Steel House Profil Sistemleri'

type BuildProfileMetadataInput = {
  title: string
  description: string
  path: string
  keywords?: string[]
  type?: 'website' | 'article'
  image?: string
  robots?: Metadata['robots']
}

export function absoluteProfileUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${PROFILE_SITE_URL.replace(/\/$/, '')}${normalizedPath}`
}

export function buildProfileMetadata({
  title,
  description,
  path,
  keywords,
  type = 'website',
  image = '/logo-profil.png',
  robots,
}: BuildProfileMetadataInput): Metadata {
  const canonicalPath = path.startsWith('/') ? path : `/${path}`
  const imageUrl = absoluteProfileUrl(image)

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type,
      locale: 'tr_TR',
      siteName: PROFILE_SITE_NAME,
      title,
      description,
      url: canonicalPath,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    ...(robots ? { robots } : {}),
  }
}
