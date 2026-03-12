import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
import { SeoJsonLd } from '@/components/seo-json-ld'
import { PROFILE_SITE_NAME, PROFILE_SITE_URL, absoluteProfileUrl } from '@/lib/seo'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['400', '500', '600', '700'] })

function parseVerificationToken(raw?: string) {
  if (!raw) return undefined
  const trimmed = raw.trim()
  const metaContentMatch = trimmed.match(/content\s*=\s*["']([^"']+)["']/i)
  const token = (metaContentMatch?.[1] ?? trimmed).trim()
  return token.replace(/^\.{3}/, '')
}

const GOOGLE_SITE_VERIFICATION = parseVerificationToken(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION)
const BING_SITE_VERIFICATION = parseVerificationToken(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION)
const YANDEX_SITE_VERIFICATION = parseVerificationToken(process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION)
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-9XR6LH9ZYH'

export const metadata: Metadata = {
  metadataBase: new URL(PROFILE_SITE_URL),
  title: {
    default: 'Master Steel House | Profil Sistemleri',
    template: '%s | Master Steel House Profil Sistemleri',
  },
  applicationName: PROFILE_SITE_NAME,
  description:
    'Alçıpan köşe profili, kaba sıva profili ve tavan U-C profili. İnşaat sektörüne özel galvanizli çelik profil çözümleri.',
  alternates: {
    canonical: '/',
    languages: {
      'tr-TR': '/',
    },
  },
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/logoprofil.png', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', type: 'image/png' }],
    shortcut: ['/icon.png'],
  },
  verification: {
    ...(GOOGLE_SITE_VERIFICATION ? { google: GOOGLE_SITE_VERIFICATION } : {}),
    ...(BING_SITE_VERIFICATION ? { other: { 'msvalidate.01': BING_SITE_VERIFICATION } } : {}),
    ...(YANDEX_SITE_VERIFICATION ? { yandex: YANDEX_SITE_VERIFICATION } : {}),
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
    url: PROFILE_SITE_URL,
    siteName: PROFILE_SITE_NAME,
    title: 'Master Steel House | Profil Sistemleri',
    description:
      'Alçıpan köşe profili, kaba sıva profili ve tavan U-C profili. İnşaat sektörüne özel galvanizli çelik profil çözümleri.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Master Steel House Profil Sistemleri',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Master Steel House | Profil Sistemleri',
    description:
      'Alçıpan köşe profili, kaba sıva profili ve tavan U-C profili. İnşaat sektörüne özel galvanizli çelik profil çözümleri.',
    images: ['/twitter-image'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: PROFILE_SITE_NAME,
    url: PROFILE_SITE_URL,
    logo: absoluteProfileUrl('/logoprofil.png'),
  }

  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <SeoJsonLd data={orgSchema} />
        {children}
      </body>
    </html>
  )
}
