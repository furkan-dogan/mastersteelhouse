'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

export function Header() {
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || 'https://admin.mastersteelhouse.com'
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false)
  const [mobileOpenSection, setMobileOpenSection] = useState<string | null>(null)
  const closeDropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const clearCloseTimer = () => {
    if (closeDropdownTimerRef.current) {
      clearTimeout(closeDropdownTimerRef.current)
      closeDropdownTimerRef.current = null
    }
  }

  const handleMouseEnter = (dropdown: string) => {
    clearCloseTimer()
    setActiveDropdown(dropdown)
  }

  const handleMouseLeave = () => {
    clearCloseTimer()
    closeDropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 140)
  }

  useEffect(() => {
    return () => {
      clearCloseTimer()
    }
  }, [])

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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-2xl shadow-xl border-b border-border/30' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group relative z-10">
            <div className={`relative transition-all duration-500 ${
              isScrolled ? 'h-10' : 'h-14'
            }`}>
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

          {/* Desktop Navigation - Pill Style */}
          <nav className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-1 p-1.5 rounded-full bg-muted/50 border border-border/50 backdrop-blur-xl">
              {/* Kurumsal Dropdown */}
              <div 
                className="relative group/nav"
                onMouseEnter={() => handleMouseEnter('kurumsal')}
                onMouseLeave={handleMouseLeave}
              >
                <button className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                  activeDropdown === 'kurumsal' 
                    ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/30' 
                    : 'text-foreground/70 hover:text-foreground hover:bg-background/80'
                }`}>
                  <span>Kurumsal</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'kurumsal' ? 'rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === 'kurumsal' && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-background/98 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2">
                      <Link href="/kurumsal/hakkimizda" onClick={() => setActiveDropdown(null)} className="flex items-center px-4 py-2.5 text-sm text-foreground/80 hover:text-accent rounded-xl hover:bg-accent/10 transition-all duration-200">
                        <span className="font-medium">Hakkımızda</span>
                      </Link>
                      <Link href="/kurumsal/misyonumuz" onClick={() => setActiveDropdown(null)} className="flex items-center px-4 py-2.5 text-sm text-foreground/80 hover:text-accent rounded-xl hover:bg-accent/10 transition-all duration-200">
                        <span className="font-medium">Misyonumuz</span>
                      </Link>
                      <Link href="/kurumsal/vizyonumuz" onClick={() => setActiveDropdown(null)} className="flex items-center px-4 py-2.5 text-sm text-foreground/80 hover:text-accent rounded-xl hover:bg-accent/10 transition-all duration-200">
                        <span className="font-medium">Vizyonumuz</span>
                      </Link>
                      <Link href="/kurumsal/belgelerimiz" onClick={() => setActiveDropdown(null)} className="flex items-center px-4 py-2.5 text-sm text-foreground/80 hover:text-accent rounded-xl hover:bg-accent/10 transition-all duration-200">
                        <span className="font-medium">Belgelerimiz</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Ürünler - Hem Hover hem Tıklanabilir */}
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
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'urunler' || isProductsMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === 'urunler' && (
                  <div className="absolute top-full left-0 mt-1 w-[580px] bg-background/98 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="px-3 py-2 text-xs font-bold text-accent uppercase tracking-wider">
                            Konut Çözümleri
                          </div>
                          <Link href="/urunler/tek-katli-celik-villalar" onClick={() => setActiveDropdown(null)} className="flex items-center px-3 py-2 text-sm text-foreground/80 hover:text-accent rounded-lg hover:bg-accent/10 transition-all duration-200">
                            <span className="font-medium">Tek Katlı Villa Çözümleri</span>
                          </Link>
                          <Link href="/urunler/cok-katli-celik-villalar" onClick={() => setActiveDropdown(null)} className="flex items-center px-3 py-2 text-sm text-foreground/80 hover:text-accent rounded-lg hover:bg-accent/10 transition-all duration-200">
                            <span className="font-medium">Çok Katlı Villa Çözümleri</span>
                          </Link>
                          <Link href="/urunler/teony-house" onClick={() => setActiveDropdown(null)} className="flex items-center px-3 py-2 text-sm text-foreground/80 hover:text-accent rounded-lg hover:bg-accent/10 transition-all duration-200">
                            <span className="font-medium">Loft Konsept Villalar</span>
                          </Link>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="px-3 py-2 text-xs font-bold text-accent uppercase tracking-wider">
                            Ticari & Kurumsal
                          </div>
                          <Link href="/urunler/ofis-yapilari" onClick={() => setActiveDropdown(null)} className="flex items-center px-3 py-2 text-sm text-foreground/80 hover:text-accent rounded-lg hover:bg-accent/10 transition-all duration-200">
                            <span className="font-medium">Ofis ve Yönetim Binaları</span>
                          </Link>
                          <Link href="/urunler/ticari-yapilar" onClick={() => setActiveDropdown(null)} className="flex items-center px-3 py-2 text-sm text-foreground/80 hover:text-accent rounded-lg hover:bg-accent/10 transition-all duration-200">
                            <span className="font-medium">Mağaza ve Ticari Alanlar</span>
                          </Link>
                          <Link href="/urunler/egitim-yapilari" onClick={() => setActiveDropdown(null)} className="flex items-center px-3 py-2 text-sm text-foreground/80 hover:text-accent rounded-lg hover:bg-accent/10 transition-all duration-200">
                            <span className="font-medium">Eğitim ve Sosyal Tesisler</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Referanslar */}
              <Link 
                href="/referanslar"
                onClick={() => setActiveDropdown(null)}
                className="relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 text-foreground/70 hover:text-foreground hover:bg-background/80"
              >
                <span>Referanslar</span>
              </Link>

              {/* Medya Dropdown */}
              <div 
                className="relative group/nav"
                onMouseEnter={() => handleMouseEnter('medya')}
                onMouseLeave={handleMouseLeave}
              >
                <button className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                  activeDropdown === 'medya' 
                    ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/30' 
                    : 'text-foreground/70 hover:text-foreground hover:bg-background/80'
                }`}>
                  <span>Medya</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'medya' ? 'rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === 'medya' && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-background/98 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2">
                      <Link href="/medya/kataloglar" onClick={() => setActiveDropdown(null)} className="flex items-center px-4 py-2.5 text-sm text-foreground/80 hover:text-accent rounded-xl hover:bg-accent/10 transition-all duration-200">
                        <span className="font-medium">Kataloglar</span>
                      </Link>
                      <Link href="/medya/haberler" onClick={() => setActiveDropdown(null)} className="flex items-center px-4 py-2.5 text-sm text-foreground/80 hover:text-accent rounded-xl hover:bg-accent/10 transition-all duration-200">
                        <span className="font-medium">Haberler</span>
                      </Link>
                      <Link href="/medya/videolar" onClick={() => setActiveDropdown(null)} className="flex items-center px-4 py-2.5 text-sm text-foreground/80 hover:text-accent rounded-xl hover:bg-accent/10 transition-all duration-200">
                        <span className="font-medium">Videolar</span>
                      </Link>
                      <Link href="/medya/blog" onClick={() => setActiveDropdown(null)} className="flex items-center px-4 py-2.5 text-sm text-foreground/80 hover:text-accent rounded-xl hover:bg-accent/10 transition-all duration-200">
                        <span className="font-medium">Blog</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* İletişim */}
              <Link 
                href="/iletisim"
                onClick={() => setActiveDropdown(null)}
                className="relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 text-foreground/70 hover:text-foreground hover:bg-background/80"
              >
                <span>İletişim</span>
              </Link>

              <a
                href={adminUrl}
                className="relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <span>Admin</span>
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              setIsMobileMenuOpen((prev) => !prev)
              if (isMobileMenuOpen) {
                setMobileOpenSection(null)
              }
            }}
            className="lg:hidden p-2 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Flowing Products Menu - Full Screen */}
      {isProductsMenuOpen && (
        <div className="fixed inset-0 bg-primary/98 backdrop-blur-3xl z-40 overflow-y-auto animate-in fade-in duration-500">
          <div className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
            {/* Close Button */}
            <button
              onClick={() => setIsProductsMenuOpen(false)}
              className="fixed top-8 right-8 p-4 rounded-full bg-background/10 hover:bg-background/20 backdrop-blur-sm transition-all duration-300 group z-50"
            >
              <X className="w-6 h-6 text-primary-foreground" />
            </button>

            {/* Flowing Menu Items */}
            <div className="space-y-0">
              {[
                { 
                  title: 'TEK KATLI VILLA ÇÖZÜMLERİ', 
                  href: '/urunler/tek-katli-celik-villalar',
                  image: '/project-1.jpg'
                },
                { 
                  title: 'ÇOK KATLI VILLA ÇÖZÜMLERİ', 
                  href: '/urunler/cok-katli-celik-villalar',
                  image: '/multi-story-villa.jpg'
                },
                { 
                  title: 'LOFT KONSEPT VILLALAR', 
                  href: '/urunler/teony-house',
                  image: '/loft-villa.jpg'
                },
                { 
                  title: 'OFİS VE YÖNETİM BİNALARI', 
                  href: '/urunler/ofis-yapilari',
                  image: '/office-building.jpg'
                },
                { 
                  title: 'MAĞAZA VE TİCARİ ALANLAR', 
                  href: '/urunler/ticari-yapilar',
                  image: '/project-2.jpg'
                },
                { 
                  title: 'EĞİTİM VE SOSYAL TESİSLER', 
                  href: '/urunler/egitim-yapilari',
                  image: '/project-6.jpg'
                },
              ].map((product, index) => (
                <Link
                  key={product.href}
                  href={product.href}
                  onClick={() => setIsProductsMenuOpen(false)}
                  className="group relative flex items-center justify-center py-8 md:py-12 border-b border-primary-foreground/10 overflow-hidden transition-all duration-700 hover:bg-background/5 animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Circular Images on Hover - Left */}
                  <div className="absolute left-0 md:left-12 -translate-x-full md:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-100 scale-50">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-accent/30">
                      <img 
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center text-primary-foreground tracking-tight transition-all duration-500 group-hover:text-accent group-hover:scale-105">
                    {product.title}
                  </h3>

                  {/* Circular Images on Hover - Right */}
                  <div className="absolute right-0 md:right-12 translate-x-full md:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-100 scale-50">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-accent/30">
                      <img 
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Subtle hover indicator */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border/50 bg-background/98 backdrop-blur-2xl">
          <div className="container mx-auto px-4 py-6 space-y-2">
            <button
              onClick={() => setMobileOpenSection((prev) => (prev === 'kurumsal' ? null : 'kurumsal'))}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-foreground/80 hover:bg-accent/10 hover:text-accent transition-all"
            >
              <span>Kurumsal</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileOpenSection === 'kurumsal' ? 'rotate-180' : ''}`} />
            </button>
            {mobileOpenSection === 'kurumsal' && (
              <div className="pl-4 pr-2 space-y-1">
                <Link href="/kurumsal/hakkimizda" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 rounded-lg text-sm text-foreground/70 hover:bg-accent/10 hover:text-accent transition-all">
                  Hakkımızda
                </Link>
                <Link href="/kurumsal/misyonumuz" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 rounded-lg text-sm text-foreground/70 hover:bg-accent/10 hover:text-accent transition-all">
                  Misyonumuz
                </Link>
                <Link href="/kurumsal/vizyonumuz" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 rounded-lg text-sm text-foreground/70 hover:bg-accent/10 hover:text-accent transition-all">
                  Vizyonumuz
                </Link>
                <Link href="/kurumsal/belgelerimiz" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 rounded-lg text-sm text-foreground/70 hover:bg-accent/10 hover:text-accent transition-all">
                  Belgelerimiz
                </Link>
              </div>
            )}

            <button
              onClick={() => setMobileOpenSection((prev) => (prev === 'urunler' ? null : 'urunler'))}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-foreground/80 hover:bg-accent/10 hover:text-accent transition-all"
            >
              <span>Ürünler</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileOpenSection === 'urunler' ? 'rotate-180' : ''}`} />
            </button>
            {mobileOpenSection === 'urunler' && (
              <div className="pl-4 pr-2 space-y-1">
                <Link href="/urunler/tek-katli-celik-villalar" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 rounded-lg text-sm text-foreground/70 hover:bg-accent/10 hover:text-accent transition-all">
                  Tek Katlı Villa Çözümleri
                </Link>
                <Link href="/urunler/cok-katli-celik-villalar" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 rounded-lg text-sm text-foreground/70 hover:bg-accent/10 hover:text-accent transition-all">
                  Çok Katlı Villa Çözümleri
                </Link>
                <Link href="/urunler/teony-house" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 rounded-lg text-sm text-foreground/70 hover:bg-accent/10 hover:text-accent transition-all">
                  Loft Konsept Villalar
                </Link>
                <Link href="/urunler/ofis-yapilari" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 rounded-lg text-sm text-foreground/70 hover:bg-accent/10 hover:text-accent transition-all">
                  Ofis ve Yönetim Binaları
                </Link>
                <Link href="/urunler/ticari-yapilar" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 rounded-lg text-sm text-foreground/70 hover:bg-accent/10 hover:text-accent transition-all">
                  Mağaza ve Ticari Alanlar
                </Link>
                <Link href="/urunler/egitim-yapilari" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 rounded-lg text-sm text-foreground/70 hover:bg-accent/10 hover:text-accent transition-all">
                  Eğitim ve Sosyal Tesisler
                </Link>
              </div>
            )}

            <Link href="/referanslar" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-foreground/80 hover:bg-accent/10 hover:text-accent transition-all">
              Referanslar
            </Link>
            <Link href="/uretim/celik-yapi-uretim" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-foreground/80 hover:bg-accent/10 hover:text-accent transition-all">
              Üretim
            </Link>
            <Link href="/proje-sureci/tasarim-sureci" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-foreground/80 hover:bg-accent/10 hover:text-accent transition-all">
              Proje Süreci
            </Link>
            <button
              onClick={() => setMobileOpenSection((prev) => (prev === 'medya' ? null : 'medya'))}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-foreground/80 hover:bg-accent/10 hover:text-accent transition-all"
            >
              <span>Medya</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileOpenSection === 'medya' ? 'rotate-180' : ''}`} />
            </button>
            {mobileOpenSection === 'medya' && (
              <div className="pl-4 pr-2 space-y-1">
                <Link href="/medya/kataloglar" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 rounded-lg text-sm text-foreground/70 hover:bg-accent/10 hover:text-accent transition-all">
                  Kataloglar
                </Link>
                <Link href="/medya/haberler" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 rounded-lg text-sm text-foreground/70 hover:bg-accent/10 hover:text-accent transition-all">
                  Haberler
                </Link>
                <Link href="/medya/videolar" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 rounded-lg text-sm text-foreground/70 hover:bg-accent/10 hover:text-accent transition-all">
                  Videolar
                </Link>
                <Link href="/medya/blog" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 rounded-lg text-sm text-foreground/70 hover:bg-accent/10 hover:text-accent transition-all">
                  Blog
                </Link>
              </div>
            )}
            <Link href="/iletisim" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-foreground/80 hover:bg-accent/10 hover:text-accent transition-all">
              İletişim
            </Link>
            <a href={adminUrl} onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
              Admin
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
