import React from 'react'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { ContactTrackingListener } from '@/components/tracking/contact-tracking-listener'
import { SeoJsonLd } from '@/components/seo-json-ld'
import { buildOrganizationSchema, buildWebsiteSchema } from '@/lib/structured-data'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const DEFAULT_SITE_URL = 'https://www.mastersteelhouse.com'
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).trim().replace(/\/$/, '')
const GTM_ID = (process.env.NEXT_PUBLIC_GTM_ID ?? 'GTM-PZRWQN9W').trim()
const brandName = 'Master Steel House'
const defaultTitle = `${brandName} | Profesyonel Çelik Yapı Çözümleri`
const defaultDescription =
  'Master Steel House; hafif çelik yapı, çelik villa, çelik konstrüksiyon ve anahtar teslim çözümlerle dayanıklı, modern ve hızlı yapı sistemleri sunar.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${brandName}`,
  },
  description: defaultDescription,
  keywords: [
    'master steel house',
    'çelik yapı',
    'hafif çelik',
    'çelik villa',
    'çelik ev',
    'çelik konstrüksiyon',
    'prefabrik ev',
    'depreme dayanıklı yapı',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: '/',
    siteName: brandName,
    type: 'website',
    locale: 'tr_TR',
    images: [
      {
        url: '/hero-slide-1.jpg',
        width: 1200,
        height: 630,
        alt: `${brandName} logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: ['/hero-slide-1.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationSchema = buildOrganizationSchema()
  const websiteSchema = buildWebsiteSchema()

  return (
    <html lang="tr" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`} suppressHydrationWarning>
        <SeoJsonLd data={organizationSchema} />
        <SeoJsonLd data={websiteSchema} />

        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        ) : null}

        {GTM_ID ? (
          <Script id="gtm-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('set', { cookie_domain: 'mastersteelhouse.com', cookie_flags: 'SameSite=None;Secure' });
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}</Script>
        ) : null}

        {children}
        <ContactTrackingListener />
        <Analytics />
      </body>
    </html>
  )
}
