import type { ReactNode } from 'react'
import { SectionIntro } from '@/components/section-intro'
import { cn } from '@/lib/utils'

type CorporateIntroSectionProps = {
  badge?: string
  title: string
  accent?: string
  description?: string
  sectionClassName?: string
  containerClassName?: string
  children: ReactNode
}

export function CorporateIntroSection({
  badge,
  title,
  accent,
  description,
  sectionClassName,
  containerClassName,
  children,
}: CorporateIntroSectionProps) {
  return (
    <section className={cn('page-top-offset pb-20', sectionClassName)}>
      <SectionIntro badge={badge} title={title} accent={accent} description={description} />
      <div className={cn('container mx-auto px-4', containerClassName)}>{children}</div>
    </section>
  )
}
