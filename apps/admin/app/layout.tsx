import './globals.css'
import type { Metadata } from 'next'
import { AdminAppShellGate } from '@/components/admin-app-shell-gate'

export const metadata: Metadata = {
  title: 'Master Steel House Admin',
  description: 'Ürün içerik yönetim paneli',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('admin-theme')||'light';document.documentElement.setAttribute('data-theme',t);})();`,
          }}
        />
      </head>
      <body className="antialiased">
        <AdminAppShellGate>{children}</AdminAppShellGate>
      </body>
    </html>
  )
}
