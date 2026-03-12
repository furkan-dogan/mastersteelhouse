import React from 'react'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const DEFAULT_SITE_URL = 'https://mastersteelhouse.com'
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).trim().replace(/\/$/, '')
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
        url: '/logo.png',
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
    images: ['/logo.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
