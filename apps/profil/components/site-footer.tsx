'use client'

import Link from 'next/link'

const links = [
  { href: '/', label: 'Anasayfa' },
  { href: '/urunler', label: 'Ürünler' },
  { href: '/#uygulama', label: 'Uygulama Alanları' },
  { href: '/#teklif', label: 'Teklif' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-[#eef1ee] py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <img src="/logoprofil.png" alt="Master Steel House" className="h-8 w-auto" />
          </div>
          <nav className="flex flex-wrap justify-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition hover:text-[#b88700]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
          © 2026 Master Steel House Profil Sistemleri
        </div>
      </div>
    </footer>
  )
}
