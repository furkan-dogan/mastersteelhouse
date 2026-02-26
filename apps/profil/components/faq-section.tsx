'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { ProfileFaqItem } from '@/lib/profile-content'

const fallbackFaqs: ProfileFaqItem[] = [
  {
    id: 'fallback-1',
    question: 'Profil sistemleri neden geleneksel yöntemlere göre avantajlıdır?',
    answer:
      'Galvanizli profil sistemleri daha hızlı montaj, daha düşük saha maliyeti ve standart kalite avantajı sunar. Hassas üretim toleransları sayesinde proje süreleri kısalır ve uygulama hataları azalır.',
  },
]

type FAQSectionProps = {
  limit?: number
  showMoreButton?: boolean
  className?: string
  faqs?: ProfileFaqItem[]
}

export function FAQSection({ limit, showMoreButton = false, className, faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const sourceFaqs = useMemo(() => {
    if (faqs && faqs.length > 0) return faqs
    return fallbackFaqs
  }, [faqs])

  const visibleFaqs = useMemo(() => {
    if (!limit || limit >= sourceFaqs.length) {
      return sourceFaqs
    }
    return sourceFaqs.slice(0, limit)
  }, [limit, sourceFaqs])

  return (
    <section className={`bg-[#f3f4f1] py-20 ${className ?? ''}`}>
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#b88700]">Sıkça Sorulan Sorular</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Merak Ettikleriniz</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">Profil sistemleriyle ilgili en çok sorulan konuları tek yerde topladık.</p>
        </div>

        <div className="space-y-4">
          {visibleFaqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={faq.id || faq.question}
                className={`rounded-2xl border transition-all ${
                  isOpen ? 'border-[#eab308]/50 bg-[#fff9e8]' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#eab308]/15 text-sm font-semibold text-[#b88700]">
                      {index + 1}
                    </span>
                    <span className="text-base font-semibold text-slate-900 sm:text-lg">{faq.question}</span>
                  </div>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen ? (
                  <div className="px-6 pb-6">
                    <div className="mb-4 ml-12 h-px bg-slate-200" />
                    <p className="ml-12 text-sm leading-7 text-slate-600 sm:text-base">{faq.answer}</p>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>

        {showMoreButton && limit && sourceFaqs.length > limit ? (
          <div className="mt-10 text-center">
            <Link
              href="/sss"
              className="inline-flex items-center justify-center rounded-xl bg-[#eab308] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#d89f04]"
            >
              Daha Fazla Soru
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}
