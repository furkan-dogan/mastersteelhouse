import type { ReactNode } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

type SitePageShellProps = {
  children: ReactNode
}

export function SitePageShell({ children }: SitePageShellProps) {
  return (
    <>
      <Header />
      <div id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </div>
      <Footer />
    </>
  )
}
