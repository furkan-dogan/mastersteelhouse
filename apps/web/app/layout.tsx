import React from "react"
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'Master Steel House | Profesyonel Çelik Yapı Çözümleri',
  description: 'Master Steel House - Hafif çelik yapı, çelik villa, çelik ev ve tüm çelik konstrüksiyon hizmetlerinde 20+ yıllık deneyim. Depreme dayanıklı, hızlı montaj, uygun fiyat garantisi.',
  keywords: 'master steel house, çelik yapı, hafif çelik, çelik villa, çelik ev, metal konstrüksiyon, çelik konstrüksiyon, prefabrik ev, depreme dayanıklı yapı',
  openGraph: {
    title: 'Profesyonel Çelik Yapı Çözümleri',
    description: 'Hafif çelik yapı sistemleriyle modern, dayanıklı ve ekonomik çözümler sunuyoruz.',
    type: 'website',
    locale: 'tr_TR',
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
    generator: 'v0.app'
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
