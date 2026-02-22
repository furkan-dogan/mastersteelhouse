import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

type InfoSection = {
  title: string
  text: string
}

type HighlightItem = {
  title: string
  description: string
}

type InfoPageTemplateProps = {
  badge: string
  title: string
  accent: string
  description: string
  heroImage: string
  heroImageAlt: string
  narrativeTitle: string
  narrativeParagraphs: string[]
  highlightsTitle: string
  highlights: HighlightItem[]
  sectionsTitle: string
  sections: InfoSection[]
}

export function InfoPageTemplate({
  badge,
  title,
  accent,
  description,
  heroImage,
  heroImageAlt,
  narrativeTitle,
  narrativeParagraphs,
  highlightsTitle,
  highlights,
  sectionsTitle,
  sections,
}: InfoPageTemplateProps) {
  return (
    <div className="min-h-screen bg-[#f3f4f1]">
      <SiteHeader />
      <main className="min-h-screen">
        <section className="pt-32 pb-20 bg-gradient-to-br from-[#fff8e6] via-[#f3f4f1] to-[#eef1ee]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl">
              <p className="inline-flex rounded-full border border-[#eab308]/40 bg-[#eab308]/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#9a7000]">
                {badge}
              </p>
              <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
                {title} <span className="text-[#b88700]">{accent}</span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-slate-700">{description}</p>
            </div>

            <div className="relative mt-12 h-[300px] overflow-hidden rounded-3xl border border-slate-200 shadow-sm md:h-[430px]">
              <img src={heroImage} alt={heroImageAlt} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-transparent to-transparent" />
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#f3f4f1]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">{narrativeTitle}</h2>
                <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
                  {narrativeParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">{highlightsTitle}</h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  {highlights.map((item) => (
                    <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                      <h4 className="text-lg font-semibold text-slate-900">{item.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-white to-[#eef1ee] border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-3xl font-bold text-slate-900">{sectionsTitle}</h2>
              <p className="mt-4 text-slate-600">Profil sistemleri odaklı yaklaşımımızı sahadan gelen ihtiyaçlara göre net ve uygulanabilir başlıklarda topluyoruz.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sections.map((section) => (
                <article key={section.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="text-xl font-semibold text-slate-900">{section.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{section.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
