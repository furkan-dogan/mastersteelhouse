"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import type { ProfilHeader } from "@/lib/profil-content"

type HeaderProps = {
  content: ProfilHeader
}

export function Header({ content }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        isScrolled ? "bg-background/95 backdrop-blur-2xl shadow-xl border-b border-border/30" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? "h-16" : "h-20"}`}>
          <Link href="/" className="flex items-center gap-3 group relative z-10">
            <div className={`relative transition-all duration-500 ${isScrolled ? "h-9 sm:h-10" : "h-12 sm:h-14"}`}>
              <img
                src={content.logoSrc}
                alt={content.logoAlt}
                className={`relative transition-all duration-500 group-hover:scale-105 drop-shadow-2xl ${
                  isScrolled ? "h-9 sm:h-10" : "h-12 sm:h-14"
                }`}
                style={{ width: "auto" }}
              />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-1 p-1.5 rounded-full bg-muted/50 border border-border/50 backdrop-blur-xl">
              {content.nav.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 text-foreground/70 hover:text-foreground hover:bg-background/80"
                >
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={content.cta.href}
              className="px-6 py-2.5 rounded-full bg-accent text-accent-foreground font-semibold text-sm hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 hover:scale-105"
            >
              {content.cta.label}
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted/60 border border-border/50 text-foreground transition-colors hover:bg-muted"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-2xl">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {content.nav.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-4 py-3 rounded-xl text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted/60 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={content.cta.href}
              className="block text-center px-4 py-3 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:shadow-lg hover:shadow-accent/30 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {content.cta.label}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
