import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SeoJsonLd } from '@/components/seo-json-ld'
import { PROFILE_SITE_NAME, PROFILE_SITE_URL, absoluteProfileUrl } from '@/lib/seo'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['400', '500', '600', '700'] })

export const metadata: Metadata = {
  metadataBase: new URL(PROFILE_SITE_URL),
  title: {
    default: 'Master Steel House | Profil Sistemleri',
    template: '%s | Master Steel House Profil Sistemleri',
  },
  description:
    'Alçıpan köşe profili, kaba sıva profili ve tavan U-C profili. İnşaat sektörüne özel galvanizli çelik profil çözümleri.',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: '/',
    siteName: PROFILE_SITE_NAME,
    title: 'Master Steel House | Profil Sistemleri',
    description:
      'Alçıpan köşe profili, kaba sıva profili ve tavan U-C profili. İnşaat sektörüne özel galvanizli çelik profil çözümleri.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: PROFILE_SITE_NAME,
    url: PROFILE_SITE_URL,
    logo: absoluteProfileUrl('/logo-profil.png'),
  }

  return (
    <html lang="tr" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <SeoJsonLd data={orgSchema} />
        {children}
      </body>
    </html>
  )
}
