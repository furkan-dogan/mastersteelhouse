"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import type { ReactNode } from "react"

const navGroups = [
  {
    label: "Sayfalar",
    items: [
      { label: "Web Sayfaları", href: "/pages", icon: "▣" },
      { label: "Profil Sayfası", href: "/profil", icon: "◩" },
    ],
  },
  {
    label: "Ortak",
    items: [
      { label: "Medya Merkezi", href: "/media", icon: "◼" },
      { label: "SEO", href: "/seo", icon: "◎" },
      { label: "Ayarlar", href: "/settings", icon: "⚙" },
    ],
  },
]

type AdminShellProps = {
  children: ReactNode
}

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const activeSection = searchParams?.get("section")

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-content">
          <div className="admin-logo">
            <span>Yönetim Paneli</span>
            <h2>Master Steel House</h2>
          </div>

          <nav className="admin-nav">
            {navGroups.map((group) => (
              <div key={group.label}>
                <div className="admin-nav-group">{group.label}</div>
                {group.items.map((item) => {
                  const isActive = item.section
                    ? pathname === "/profil" && activeSection === item.section
                    : item.exact
                      ? pathname === item.href
                      : pathname?.startsWith(item.href)

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={isActive ? "active" : undefined}
                    >
                      <span className="admin-nav-icon">{item.icon}</span>
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            ))}
          </nav>

        </div>
      </aside>

      <div className="admin-content">{children}</div>
    </div>
  )
}
