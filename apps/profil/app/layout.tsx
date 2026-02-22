import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'Master Steel House | Profil Sistemleri',
  description: 'Alçıpan köşe profili, kaba sıva profili ve tavan U-C profili. İnşaat sektörüne özel galvanizli çelik profil çözümleri.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
