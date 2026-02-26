import type { MetadataRoute } from 'next'

const PROFILE_SITE_URL = process.env.NEXT_PUBLIC_PROFILE_SITE_URL ?? 'https://profil.mastersteelhouse.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${PROFILE_SITE_URL}/sitemap.xml`,
    host: PROFILE_SITE_URL,
  }
}
