import type { Metadata } from 'next'

export const PROFILE_SITE_URL = process.env.NEXT_PUBLIC_PROFILE_SITE_URL ?? 'https://profil.mastersteelhouse.com'
export const PROFILE_SITE_NAME = 'Master Steel House Profil Sistemleri'
export const PROFILE_INSTAGRAM_URL = 'https://www.instagram.com/mastersteelhouseprofil/'

const DEFAULT_OG_IMAGE = '/logoprofil.png'

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
  image = DEFAULT_OG_IMAGE,
  robots,
}: BuildProfileMetadataInput): Metadata {
  const canonicalPath = path.startsWith('/') ? path : `/${path}`
  const imageUrl = image.startsWith('http') ? image : absoluteProfileUrl(image)

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalPath,
      languages: {
        'tr-TR': canonicalPath,
      },
    },
    openGraph: {
      type,
      locale: 'tr_TR',
      siteName: PROFILE_SITE_NAME,
      title,
      description,
      url: canonicalPath,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} | ${PROFILE_SITE_NAME}`,
        },
      ],
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
