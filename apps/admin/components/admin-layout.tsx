'use client'

import { PageHeader } from '@/components/page-header'

type Props = {
  children: React.ReactNode
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

/**
 * Page-level layout wrapper under persistent AdminShell.
 */
export function AdminLayout({ children, title, subtitle, actions }: Props) {
  return (
    <div className="space-y-6">
      <PageHeader title={title} description={subtitle} actions={actions} />
      {children}
    </div>
  )
}
