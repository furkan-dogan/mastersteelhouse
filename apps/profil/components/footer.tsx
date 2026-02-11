"use client"

import { useEffect, useState } from "react"
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, Twitter, ArrowUp } from "lucide-react"
import type { ProfilFooter, ProfilSocialLink } from "@/lib/profil-content"

const socialIconMap = {
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
} as const

type FooterProps = {
  content: ProfilFooter
  contact: {
    phone: string
    email: string
    address: string
  }
}

function getSocialIcon(social: ProfilSocialLink) {
  return socialIconMap[social.icon] ?? Instagram
}

export function Footer({ content, contact }: FooterProps) {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-gradient-to-b from-primary to-primary/95 text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          <div className="space-y-6">
            <div className="group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform">
                  <span className="text-accent-foreground font-bold text-xl">{content.brand.initials}</span>
                </div>
                <span className="text-2xl font-bold font-mono">{content.brand.name}</span>
              </div>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">{content.brand.description}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-primary-foreground/90">{content.sectionTitles.social}</h4>
              <div className="flex gap-3">
                {content.socialLinks.map((social) => {
                  const Icon = getSocialIcon(social)
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary-foreground/10 flex items-center justify-center transition-all duration-300 ${social.color} hover:scale-110 hover:shadow-lg group`}
                      aria-label={social.name}
                      onMouseEnter={() => setHoveredSocial(social.name)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      <Icon className="w-5 h-5 relative z-10" />
                      {hoveredSocial === social.name && (
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
                      )}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              {content.sectionTitles.services}
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-accent to-transparent rounded-full" />
            </h3>
            <ul className="space-y-3">
              {content.services.map((service) => (
                <li key={service} className="group">
                  <a
                    href="#projects"
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground hover:translate-x-2 inline-flex items-center gap-2 transition-all"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              {content.sectionTitles.quickLinks}
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-accent to-transparent rounded-full" />
            </h3>
            <ul className="space-y-3">
              {content.quickLinks.map((link) => (
                <li key={link.label} className="group">
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground hover:translate-x-2 inline-flex items-center gap-2 transition-all"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              {content.sectionTitles.contact}
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-accent to-transparent rounded-full" />
            </h3>
            <ul className="space-y-4">
              <li className="group">
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-start gap-3 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="pt-1">
                    <div>{contact.phone}</div>
                  </div>
                </a>
              </li>
              <li className="group">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>{contact.email}</span>
                </a>
              </li>
              <li className="group">
                <div className="flex items-start gap-3 text-sm text-primary-foreground/80">
                  <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="pt-1">{contact.address}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/70">
            <p>{content.copyright}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              {content.legalLinks.map((link) => (
                <a key={link.label} href={link.href} className="hover:text-primary-foreground transition-colors relative group">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-accent to-accent/80 text-accent-foreground shadow-xl shadow-accent/30 flex items-center justify-center hover:scale-110 transition-all duration-300 z-50 group animate-in fade-in slide-in-from-bottom-4"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </footer>
  )
}
