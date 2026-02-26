import Link from 'next/link'

const links = [
  { href: '/urunler', label: 'Tüm Profil Ürünleri' },
  { href: '/sss', label: 'Sıkça Sorulan Sorular' },
  { href: '/iletisim', label: 'Teklif ve İletişim' },
  { href: '/kurumsal/hakkimizda', label: 'Hakkımızda' },
  { href: '/medya/blog', label: 'Teknik Blog' },
  { href: '/medya/haberler', label: 'Haberler' },
]

export function InternalLinksStrip() {
  return (
    <section className="border-y border-slate-200/70 bg-[#f0f1ee] py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Hızlı Erişim</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-[#eab308]/70 hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
