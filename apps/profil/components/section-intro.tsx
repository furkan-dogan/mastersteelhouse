type SectionIntroProps = {
  badge: string
  title: string
  accent?: string
  description?: string
}

export function SectionIntro({ badge, title, accent, description }: SectionIntroProps) {
  return (
    <div className="mx-auto mb-14 max-w-4xl text-center">
      <p className="inline-flex rounded-full border border-[#eab308]/40 bg-[#eab308]/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#9a7000]">
        {badge}
      </p>
      <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
        {title} {accent ? <span className="text-[#b88700]">{accent}</span> : null}
      </h1>
      {description ? <p className="mt-5 text-lg leading-relaxed text-slate-700">{description}</p> : null}
    </div>
  )
}
