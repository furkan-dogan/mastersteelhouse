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
      <main className="min-h-screen pt-20">{children}</main>
      <SiteFooter />
    </div>
  )
}
