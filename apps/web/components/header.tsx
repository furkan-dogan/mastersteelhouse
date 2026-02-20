'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import {
  corporateLinks,
  desktopPrimaryLinks,
  mediaLinks,
  mobilePrimaryLinks,
  productFlowItems,
  productNavGroups,
  type NavLinkItem,
} from '@/lib/site-navigation'

type DropdownKey = 'kurumsal' | 'urunler' | 'medya'

const desktopDropdownPanelClass =
  'absolute top-full left-0 mt-1 bg-background/98 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200'

const desktopDropdownLinkClass =
  'flex items-center px-4 py-2.5 text-sm text-foreground/80 hover:text-accent rounded-xl hover:bg-accent/10 transition-all duration-200'

const mobileMenuLinkClass =
  'block px-4 py-2 rounded-lg text-sm text-foreground/70 hover:bg-accent/10 hover:text-accent transition-all'

function DropdownList({
  links,
  onClickLink,
}: {
  links: NavLinkItem[]
  onClickLink: () => void
}) {
  return (
    <div className="p-2">
      {links.map((item) => (
        <Link key={item.href} href={item.href} onClick={onClickLink} className={desktopDropdownLinkClass}>
          <span className="font-medium">{item.label}</span>
        </Link>
      ))}
    </div>
  )
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey | null>(null)
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false)
  const [mobileOpenSection, setMobileOpenSection] = useState<DropdownKey | null>(null)
  const closeDropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const clearCloseTimer = () => {
    if (closeDropdownTimerRef.current) {
      clearTimeout(closeDropdownTimerRef.current)
      closeDropdownTimerRef.current = null
    }
  }

  const handleMouseEnter = (dropdown: DropdownKey) => {
    clearCloseTimer()
    setActiveDropdown(dropdown)
  }

  const handleMouseLeave = () => {
    clearCloseTimer()
    closeDropdownTimerRef.current = setTimeout(() => setActiveDropdown(null), 140)
  }

  useEffect(() => () => clearCloseTimer(), [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setActiveDropdown(null)
      setIsProductsMenuOpen(false)
      setIsMobileMenuOpen(false)
      setMobileOpenSection(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const closeAllMenus = () => {
    setActiveDropdown(null)
    setIsProductsMenuOpen(false)
    setIsMobileMenuOpen(false)
    setMobileOpenSection(null)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        isScrolled ? 'bg-background/95 backdrop-blur-2xl shadow-xl border-b border-border/30' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'h-16' : 'h-20'}`}>
          <Link href="/" className="flex items-center gap-3 group relative z-10">
            <div className={`relative transition-all duration-500 ${isScrolled ? 'h-10' : 'h-14'}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Master Steel House Logo"
                className={`relative transition-all duration-500 group-hover:scale-105 drop-shadow-2xl ${
                  isScrolled ? 'h-10' : 'h-14'
                }`}
                style={{ width: 'auto' }}
              />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-1 p-1.5 rounded-full bg-muted/50 border border-border/50 backdrop-blur-xl">
              <div
                className="relative group/nav"
                onMouseEnter={() => handleMouseEnter('kurumsal')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                    activeDropdown === 'kurumsal'
                      ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/30'
                      : 'text-foreground/70 hover:text-foreground hover:bg-background/80'
                  }`}
                >
                  <span>Kurumsal</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      activeDropdown === 'kurumsal' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeDropdown === 'kurumsal' ? (
                  <div className={`${desktopDropdownPanelClass} w-56`}>
                    <DropdownList links={corporateLinks} onClickLink={() => setActiveDropdown(null)} />
                  </div>
                ) : null}
              </div>

              <div
                className="relative group/nav"
                onMouseEnter={() => handleMouseEnter('urunler')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => {
                    clearCloseTimer()
                    setActiveDropdown(null)
                    setIsProductsMenuOpen((prev) => !prev)
                  }}
                  className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                    activeDropdown === 'urunler' || isProductsMenuOpen
                      ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/30'
                      : 'text-foreground/70 hover:text-foreground hover:bg-background/80'
                  }`}
                >
                  <span>Ürünler</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      activeDropdown === 'urunler' || isProductsMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeDropdown === 'urunler' ? (
                  <div className={`${desktopDropdownPanelClass} w-[580px]`}>
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        {productNavGroups.map((group) => (
                          <div key={group.title} className="space-y-1">
                            <div className="px-3 py-2 text-xs font-bold text-accent uppercase tracking-wider">{group.title}</div>
                            {group.links.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setActiveDropdown(null)}
                                className="flex items-center px-3 py-2 text-sm text-foreground/80 hover:text-accent rounded-lg hover:bg-accent/10 transition-all duration-200"
                              >
                                <span className="font-medium">{item.label}</span>
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              {desktopPrimaryLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setActiveDropdown(null)}
                  className="relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 text-foreground/70 hover:text-foreground hover:bg-background/80"
                >
                  <span>{item.label}</span>
                </Link>
              ))}

              <div
                className="relative group/nav"
                onMouseEnter={() => handleMouseEnter('medya')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                    activeDropdown === 'medya'
                      ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/30'
                      : 'text-foreground/70 hover:text-foreground hover:bg-background/80'
                  }`}
                >
                  <span>Medya</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      activeDropdown === 'medya' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeDropdown === 'medya' ? (
                  <div className={`${desktopDropdownPanelClass} w-56`}>
                    <DropdownList links={mediaLinks} onClickLink={() => setActiveDropdown(null)} />
                  </div>
                ) : null}
              </div>
            </div>
          </nav>

          <button
            onClick={() => {
              setIsMobileMenuOpen((prev) => !prev)
              if (isMobileMenuOpen) setMobileOpenSection(null)
            }}
            className="lg:hidden p-2 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
        </div>
      </div>

      {isProductsMenuOpen ? (
        <div className="fixed inset-0 bg-primary/98 backdrop-blur-3xl z-40 overflow-y-auto animate-in fade-in duration-500">
          <div className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
            <button
              onClick={() => setIsProductsMenuOpen(false)}
              className="fixed top-8 right-8 p-4 rounded-full bg-background/10 hover:bg-background/20 backdrop-blur-sm transition-all duration-300 group z-50"
            >
              <X className="w-6 h-6 text-primary-foreground" />
            </button>
            <div className="space-y-0">
              {productFlowItems.map((product, index) => (
                <Link
                  key={product.href}
                  href={product.href}
                  onClick={() => setIsProductsMenuOpen(false)}
                  className="group relative flex items-center justify-center py-8 md:py-12 border-b border-primary-foreground/10 overflow-hidden transition-all duration-700 hover:bg-background/5 animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="absolute left-0 md:left-12 -translate-x-full md:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-100 scale-50">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-accent/30">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.image || '/placeholder.svg'} alt={product.title} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center text-primary-foreground tracking-tight transition-all duration-500 group-hover:text-accent group-hover:scale-105">
                    {product.title}
                  </h3>

                  <div className="absolute right-0 md:right-12 translate-x-full md:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-100 scale-50">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-accent/30">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.image || '/placeholder.svg'} alt={product.title} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {isMobileMenuOpen ? (
        <div className="lg:hidden border-t border-border/50 bg-background/98 backdrop-blur-2xl">
          <div className="container mx-auto px-4 py-6 space-y-2">
            {(
              [
                { key: 'kurumsal' as const, label: 'Kurumsal', links: corporateLinks },
                {
                  key: 'urunler' as const,
                  label: 'Ürünler',
                  links: productNavGroups.flatMap((group) => group.links),
                },
              ] as const
            ).map((group) => (
              <div key={group.key}>
                <button
                  onClick={() => setMobileOpenSection((prev) => (prev === group.key ? null : group.key))}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-foreground/80 hover:bg-accent/10 hover:text-accent transition-all"
                >
                  <span>{group.label}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${mobileOpenSection === group.key ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileOpenSection === group.key ? (
                  <div className="pl-4 pr-2 space-y-1">
                    {group.links.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeAllMenus}
                        className={mobileMenuLinkClass}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}

            {mobilePrimaryLinks.map((item) => (
              <Link key={item.href} href={item.href} onClick={closeAllMenus} className="block px-4 py-3 rounded-xl text-foreground/80 hover:bg-accent/10 hover:text-accent transition-all">
                {item.label}
              </Link>
            ))}

            <button
              onClick={() => setMobileOpenSection((prev) => (prev === 'medya' ? null : 'medya'))}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-foreground/80 hover:bg-accent/10 hover:text-accent transition-all"
            >
              <span>Medya</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileOpenSection === 'medya' ? 'rotate-180' : ''}`} />
            </button>
            {mobileOpenSection === 'medya' ? (
              <div className="pl-4 pr-2 space-y-1">
                {mediaLinks.map((item) => (
                  <Link key={item.href} href={item.href} onClick={closeAllMenus} className={mobileMenuLinkClass}>
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
