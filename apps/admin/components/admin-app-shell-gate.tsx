'use client'

import { usePathname } from 'next/navigation'
import { AdminShell } from '@/components/admin-shell'

type AdminAppShellGateProps = {
  children: React.ReactNode
}

const shelllessPaths = new Set(['/login', '/panel-secimi'])

export function AdminAppShellGate({ children }: AdminAppShellGateProps) {
  const pathname = usePathname()

  if (shelllessPaths.has(pathname)) {
    return <>{children}</>
  }

  if (pathname.startsWith('/profil-cms')) {
    return (
      <AdminShell basePath="/profil-cms" brandSubtitle="Profil CMS Panel">
        {children}
      </AdminShell>
    )
  }

  return <AdminShell>{children}</AdminShell>
}
