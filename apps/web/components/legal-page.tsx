import type { ReactNode } from 'react'
import { SitePageShell } from '@/components/site-page-shell'

type LegalPageProps = {
  title: string
  children: ReactNode
}

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <SitePageShell>
      <main className="page-top-offset min-h-screen">
        <section className="container mx-auto px-4 pb-16">
          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 md:p-8">
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
            <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">{children}</div>
          </div>
        </section>
      </main>
    </SitePageShell>
  )
}
