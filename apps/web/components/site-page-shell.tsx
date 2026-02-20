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
      {children}
      <Footer />
    </>
  )
}
