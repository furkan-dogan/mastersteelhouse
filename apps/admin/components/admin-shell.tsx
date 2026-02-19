'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  BookOpenText,
  Newspaper,
  FolderKanban,
  Image,
  FileBadge,
  BookMarked,
  Clapperboard,
  LogOut,
  Menu,
  ChevronLeft,
  Sun,
  Moon,
  User,
  ChevronDown,
} from 'lucide-react'

const navGroups = [
  {
    key: 'system',
    title: 'Sistem',
    items: [{ href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    key: 'content',
    title: 'İçerik Yönetimi',
    items: [
      { href: '/', label: 'Ürünler', icon: Package },
      { href: '/blog', label: 'Blog', icon: BookOpenText },
      { href: '/news', label: 'Haberler', icon: Newspaper },
      { href: '/videos', label: 'Videolar', icon: Clapperboard },
      { href: '/references', label: 'Referanslar', icon: FolderKanban },
    ],
  },
  {
    key: 'media',
    title: 'Medya & Doküman',
    items: [
      { href: '/media', label: 'Medya', icon: Image },
      { href: '/documents', label: 'Belgeler', icon: FileBadge },
      { href: '/catalogs', label: 'Kataloglar', icon: BookMarked },
    ],
  },
] as const

type ProductCategoryNav = {
  slug: string
  title: string
}

type AdminShellProps = {
  children: React.ReactNode
}

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    system: true,
    content: true,
    media: true,
  })
  const [profileOpen, setProfileOpen] = useState(false)
  const [productCategories, setProductCategories] = useState<ProductCategoryNav[]>([])
  const [isProductsSubmenuOpen, setIsProductsSubmenuOpen] = useState(true)
  const [isDark, setIsDark] = useState(() => {
    if (typeof document === 'undefined') return false
    return document.documentElement.getAttribute('data-theme') === 'dark'
  })

  useEffect(() => {
    const handler = () => setIsDark(document.documentElement.getAttribute('data-theme') === 'dark')
    window.addEventListener('theme-change', handler)
    return () => window.removeEventListener('theme-change', handler)
  }, [])

  useEffect(() => {
    let cancelled = false

    async function loadProductCategories() {
      try {
        const response = await fetch('/api/products', { cache: 'no-store' })
        if (!response.ok) return
        const data = (await response.json()) as { categories?: ProductCategoryNav[] }
        if (cancelled) return
        setProductCategories(data.categories ?? [])
      } catch {
        if (!cancelled) setProductCategories([])
      }
    }

    void loadProductCategories()
    return () => {
      cancelled = true
    }
  }, [])

  function toggleTheme() {
    const next = isDark ? 'light' : 'dark'
    localStorage.setItem('admin-theme', next)
    document.documentElement.setAttribute('data-theme', next)
    window.dispatchEvent(new Event('theme-change'))
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  function isItemActive(href: string) {
    return href === '/' ? pathname === '/' || pathname === '' : pathname.startsWith(href)
  }

  function isActiveCategory(slug: string) {
    return pathname === '/' && searchParams.get('category') === slug
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-200 ease-in-out ${
          sidebarCollapsed ? 'w-[72px]' : 'w-64'
        }`}
      >
        {/* Logo / Brand */}
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary">
            <Package className="h-5 w-5 text-primary-foreground" />
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-sidebar-foreground/70">Master Steel House</p>
              <p className="truncate text-sm font-semibold text-sidebar-foreground">CMS Panel</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="cms-scroll flex-1 space-y-5 overflow-y-auto p-3">
          {navGroups.map((group) => {
            const isOpen = openGroups[group.key] ?? true
            return (
              <div key={group.key} className="space-y-1">
                {!sidebarCollapsed && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenGroups((prev) => ({
                          ...prev,
                          [group.key]: !isOpen,
                        }))
                      }
                      className="flex w-full items-center justify-between px-2 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-sidebar-foreground/55 hover:text-sidebar-foreground/80"
                    >
                      <span>{group.title}</span>
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {!isOpen ? null : (
                      <div className="space-y-0.5">
                        {group.items.map((item) => {
                          const isActive = isItemActive(item.href)
                          const Icon = item.icon
                          const isProductsItem = item.href === '/'
                          return (
                            <div key={item.href + item.label} className="space-y-1">
                              {isProductsItem ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (!isActive) {
                                      router.push('/')
                                      setIsProductsSubmenuOpen(true)
                                      return
                                    }
                                    setIsProductsSubmenuOpen((prev) => !prev)
                                  }}
                                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                                    isActive
                                      ? 'bg-sidebar-active/85 text-primary-foreground'
                                      : 'text-sidebar-foreground/85 hover:bg-sidebar-hover hover:text-sidebar-foreground'
                                  }`}
                                >
                                  <Icon className="h-4 w-4 shrink-0" />
                                  <span className="flex-1 text-left">{item.label}</span>
                                  <ChevronDown
                                    className={`h-3.5 w-3.5 transition-transform ${
                                      isProductsSubmenuOpen ? 'rotate-180' : ''
                                    }`}
                                  />
                                </button>
                              ) : (
                                <Link
                                  href={item.href}
                                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                                    isActive
                                      ? 'bg-sidebar-active/85 text-primary-foreground'
                                      : 'text-sidebar-foreground/85 hover:bg-sidebar-hover hover:text-sidebar-foreground'
                                  }`}
                                >
                                  <Icon className="h-4 w-4 shrink-0" />
                                  <span>{item.label}</span>
                                </Link>
                              )}
                              {isProductsItem && productCategories.length > 0 && isActive && isProductsSubmenuOpen ? (
                                <div className="ml-8 space-y-0.5 border-l border-sidebar-border/70 pl-3">
                                  {productCategories.map((category) => (
                                    <Link
                                      key={category.slug}
                                      href={`/?category=${category.slug}`}
                                      className={`block rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                                        isActiveCategory(category.slug)
                                          ? 'bg-sidebar-active/70 text-primary-foreground'
                                          : 'text-sidebar-foreground/75 hover:bg-sidebar-hover hover:text-sidebar-foreground'
                                      }`}
                                    >
                                      {category.title}
                                    </Link>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </>
                )}

                {sidebarCollapsed && (
                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      const isActive = isItemActive(item.href)
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href + item.label}
                          href={item.href}
                          title={item.label}
                          className={`flex items-center justify-center rounded-xl px-3 py-2.5 transition-colors ${
                            isActive
                              ? 'bg-sidebar-active/85 text-primary-foreground'
                              : 'text-sidebar-foreground/85 hover:bg-sidebar-hover hover:text-sidebar-foreground'
                          }`}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-3">
          {!sidebarCollapsed && <p className="text-[11px] text-sidebar-foreground/60">v1.0</p>}
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-4 border-b border-border bg-card/95 px-6 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setSidebarCollapsed((c) => !c)}
            className="cms-btn-ghost -ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg p-0"
            aria-label={sidebarCollapsed ? 'Sidebar aç' : 'Sidebar kapat'}
          >
            {sidebarCollapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-2">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="cms-btn-ghost flex h-9 shrink-0 items-center gap-2 rounded-lg px-3 py-0"
              aria-label={isDark ? 'Açık tema' : 'Koyu tema'}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="hidden text-sm sm:inline">Tema</span>
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((o) => !o)}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <User className="h-4 w-4" />
                </div>
                <ChevronDown className="h-4 w-4" />
              </button>
              {profileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    aria-hidden
                    onClick={() => setProfileOpen(false)}
                  />
                  <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-border bg-card py-1 shadow-lg">
                    <div className="border-b border-border px-3 py-2">
                      <p className="text-sm font-medium text-foreground">Admin</p>
                      <p className="text-xs text-muted-foreground">admin@mastersteelhouse.com</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false)
                        void logout()
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <LogOut className="h-4 w-4" />
                      Çıkış Yap
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-[1600px]">{children}</div>
        </main>
      </div>
    </div>
  )
}
