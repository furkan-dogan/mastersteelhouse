'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { corporateLinks, mediaLinks, productLinks, type NavLinkItem } from '@/lib/site-navigation'

type DropdownKey = 'kurumsal' | 'urunler' | 'medya'

type TopNavItem = {
  key: string
  label: string
  href?: string
  dropdown?: DropdownKey
}

const topNavItems: TopNavItem[] = [
  { key: 'kurumsal', label: 'Kurumsal', dropdown: 'kurumsal' },
  { key: 'urunler', label: 'Ürünler', dropdown: 'urunler' },
  { key: 'referanslar', label: 'Referanslar', href: '/#referanslar' },
  { key: 'iletisim', label: 'İletişim', href: '/#teklif' },
  { key: 'medya', label: 'Medya', dropdown: 'medya' },
]

function dropdownLinksByKey(key: DropdownKey): NavLinkItem[] {
  if (key === 'kurumsal') return corporateLinks
  if (key === 'urunler') return productLinks
  return mediaLinks
}

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey | null>(null)
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<DropdownKey | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href?: string) => {
    if (!href) return false
    if (href.startsWith('/#')) return false
    if (href === '/urunler') return pathname.startsWith('/urunler')
    return pathname === href
  }

  const closeAll = () => {
    setMobileOpen(false)
    setActiveDropdown(null)
    setMobileOpenDropdown(null)
  }

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-slate-200/80 bg-[#f3f4f1]/95 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logoprofil.png" alt="Master Steel House" className="block h-11 w-auto" />
        </Link>

        <nav
          className="hidden items-center gap-1 rounded-full border border-slate-300/80 bg-white/85 p-1 md:flex"
          onMouseLeave={() => setActiveDropdown(null)}
        >
          {topNavItems.map((item) => {
            if (item.dropdown) {
              const open = activeDropdown === item.dropdown
              const dropdownLinks = dropdownLinksByKey(item.dropdown)
              return (
                <div key={item.key} className="relative" onMouseEnter={() => setActiveDropdown(item.dropdown!)}>
                  <button
                    type="button"
                    onClick={() => setActiveDropdown((prev) => (prev === item.dropdown ? null : item.dropdown!))}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      open ? 'bg-[#eab308] text-black' : 'text-slate-700 hover:bg-[#eab308] hover:text-black'
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition ${open ? 'rotate-180' : ''}`} />
                  </button>

                  {open ? (
                    <div className="absolute left-0 top-full pt-2">
                      <div className="w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                        {dropdownLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeAll}
                            className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-[#eab308] hover:text-black"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              )
            }

            return (
              <Link key={item.key} href={item.href ?? '/'} onMouseEnter={() => setActiveDropdown(null)}>
                <span
                  className={`block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-[#eab308] text-black'
                      : 'text-slate-700 hover:bg-[#eab308] hover:text-black'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-slate-800 md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Menü"
        >
          {mobileOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-slate-200 bg-[#f3f4f1]/98 md:hidden"
          >
            <nav className="flex flex-col p-4">
              {topNavItems.map((item) => {
                if (item.dropdown) {
                  const open = mobileOpenDropdown === item.dropdown
                  const dropdownLinks = dropdownLinksByKey(item.dropdown)
                  return (
                    <div key={item.key}>
                      <button
                        type="button"
                        onClick={() => setMobileOpenDropdown((prev) => (prev === item.dropdown ? null : item.dropdown!))}
                        className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-slate-700 hover:text-slate-900"
                      >
                        {item.label}
                        <ChevronDown className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} />
                      </button>
                      {open ? (
                        <div className="mb-2 rounded-lg border border-slate-200 bg-white p-2">
                          {dropdownLinks.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={closeAll}
                              className="block rounded-md px-2 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.key}
                    href={item.href ?? '/'}
                    onClick={closeAll}
                    className="py-3 text-sm font-medium text-slate-700 hover:text-slate-900"
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
