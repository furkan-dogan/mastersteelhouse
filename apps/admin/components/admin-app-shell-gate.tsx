'use client'

import { usePathname } from 'next/navigation'
import { AdminShell } from '@/components/admin-shell'

type AdminAppShellGateProps = {
  children: React.ReactNode
}

export function AdminAppShellGate({ children }: AdminAppShellGateProps) {
  const pathname = usePathname()

  if (pathname === '/login') {
    return <>{children}</>
  }

  return <AdminShell>{children}</AdminShell>
}
