import type { ReactNode } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

type ProfilePageShellProps = {
  children: ReactNode
}

export function ProfilePageShell({ children }: ProfilePageShellProps) {
  return (
    <div className="min-h-screen bg-[#f3f4f1]">
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="min-h-screen pt-20 outline-none">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
