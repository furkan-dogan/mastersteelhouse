'use client'

import { useEffect, useState } from 'react'
import { FooterBottomBar } from './footer/bottom-bar'
import { FooterCompanyInfo } from './footer/company-info'
import { FooterContactInfo } from './footer/contact-info'
import { FooterQuickLinks } from './footer/quick-links'
import { ScrollTopButton } from './footer/scroll-top-button'
import { FooterServicesLinks } from './footer/services-links'

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gradient-to-b from-primary to-primary/95 text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <FooterCompanyInfo />
          <FooterServicesLinks />
          <FooterQuickLinks />
          <FooterContactInfo />
        </div>

        <FooterBottomBar />
      </div>

      <ScrollTopButton visible={showScrollTop} onClick={scrollToTop} />
    </footer>
  )
}
