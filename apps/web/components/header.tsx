'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import {
  corporateLinks,
  desktopPrimaryLinks,
  mediaLinks,
  mobilePrimaryLinks,
  productFlowItems,
  productNavGroups,
} from '@/lib/site-navigation'
import { DesktopNav } from '@/components/header/desktop-nav'
import { MobileMenu } from '@/components/header/mobile-menu'
import { ProductsOverlay } from '@/components/header/products-overlay'
import type { DropdownKey } from '@/components/header/types'

export function Header() {
  const pathname = usePathname()
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

  const isHomePage = pathname === '/'
  const useWhiteLogo = isHomePage && !isScrolled
  const logoSrc = useWhiteLogo ? '/logolongwhite.png' : '/logolongblack.png'

  const clearCloseTimer = () => {
    if (!closeDropdownTimerRef.current) return
    clearTimeout(closeDropdownTimerRef.current)
    closeDropdownTimerRef.current = null
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

  const closeAllMenus = () => {
    setActiveDropdown(null)
    setIsProductsMenuOpen(false)
    setIsMobileMenuOpen(false)
    setMobileOpenSection(null)
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      closeAllMenus()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

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
                src={logoSrc}
                alt="Master Steel House Logo"
                className={`relative transition-all duration-500 group-hover:scale-105 ${
                  useWhiteLogo ? 'drop-shadow-2xl' : ''
                } ${
                  isScrolled ? 'h-10' : 'h-14'
                }`}
                style={{ width: 'auto' }}
              />
            </div>
          </Link>

          <DesktopNav
            activeDropdown={activeDropdown}
            isProductsMenuOpen={isProductsMenuOpen}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onToggleProductsOverlay={() => {
              clearCloseTimer()
              setActiveDropdown(null)
              setIsProductsMenuOpen((prev) => !prev)
            }}
            onCloseDropdown={() => setActiveDropdown(null)}
            corporateLinks={corporateLinks}
            mediaLinks={mediaLinks}
            desktopPrimaryLinks={desktopPrimaryLinks}
            productNavGroups={productNavGroups}
          />

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

      <ProductsOverlay
        isOpen={isProductsMenuOpen}
        items={productFlowItems}
        onClose={() => setIsProductsMenuOpen(false)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        mobileOpenSection={mobileOpenSection}
        onToggleSection={(section) => setMobileOpenSection((prev) => (prev === section ? null : section))}
        onCloseAll={closeAllMenus}
        corporateLinks={corporateLinks}
        productNavGroups={productNavGroups}
        mobilePrimaryLinks={mobilePrimaryLinks}
        mediaLinks={mediaLinks}
      />
    </header>
  )
}
