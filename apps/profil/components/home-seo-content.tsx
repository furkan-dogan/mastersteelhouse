import Link from 'next/link'
import { BookOpen, Ruler, Layout, Layers, LayoutGrid, GitCompare, ExternalLink } from 'lucide-react'

type GuideCard = {
  icon: typeof Ruler
  title: string
  content: string
  links?: { label: string; href: string }[]
}

const cards: GuideCard[] = [
  {
    icon: Ruler,
    title: 'Delikli Alçı Köşe Profili Ne Sağlar?',
    content:
      'Delikli alçı köşe profili, duvar ve kolon köşelerinde düzgün hat elde etmek için kullanılır. Delikli yüzey yapısı, sıva ve alçı katmanının profile daha iyi tutunmasına yardımcı olur. Bu sayede darbelere karşı daha dayanıklı bir köşe formu oluşur ve boya öncesi yüzey kalitesi yükselir. Uygulama sırasında ölçü kaçaklarını azaltması, işçilik süresini kısaltması nedeniyle sahada maliyet kontrolüne katkı sağlar. İç mekan bitişlerinde temiz hat istenen projelerde en sık tercih edilen galvanizli köşe profili çözümüdür.',
  },
  {
    icon: Layout,
    title: 'Kaba Sıva Profili Ne Sağlar?',
    content:
      'Kaba sıva profili, iç ve dış cephe sıva uygulamalarında düzgün kot ve referans hattı oluşturur. Sıva kalınlığını sabitleyerek çatlak riskini azaltır, homojen yüzey kalitesi sağlar. Galvanizli çelik yapısı sayesinde paslanmaya karşı dirençli, uzun ömürlü kullanım sunar. Hızlı montaj avantajı ile işçilik süresini kısaltır, yüksek metrajlı projelerde fire oranını düşürür. Cephe ve iç mekan sıva uygulamalarında profesyonel bitiş için ideal galvaniz sıva profili çözümüdür.',
  },
  {
    icon: Layers,
    title: 'Tavan U-C Profili Ne Sağlar?',
    content:
      'Tavan U-C profili, asma tavan sistemlerinde ana ve tali taşıyıcı iskeletin temelini oluşturur. U kanal ve C taşıyıcı profil kombinasyonu ile rijit, sarkma yapmayan bir altyapı sunar. Galvaniz kaplı çelikten üretildiği için nemli ortamlarda dahi güvenle kullanılabilir. Konut, ofis, mağaza ve ticari projelerde alçıpan asma tavan uygulamaları için standart 3000 ve 4000 mm boy seçenekleri ile hızlı montaj ve uzun ömürlü performans sağlar.',
  },
  {
    icon: LayoutGrid,
    title: 'Duvar U-C Profili Ne Sağlar?',
    content:
      'Duvar U-C profili, bölme duvar ve alçıpan duvar sistemlerinde taşıyıcı iskelet oluşturmak için kullanılır. Dikey C profiller (dikme) ve yatay U profiller (tavan/taban kanalı) ile rijit bölme duvar konstrüksiyonu kurar. Galvanizli çelik yapısı sayesinde yangına dayanıklı, uzun ömürlü ve deprem performansı yüksek duvar çözümleri sunar. Ofis bölümleri, konut iç bölmeleri ve ticari mekanlarda hızlı montaj ile esnek planlama imkânı sağlar.',
  },
  {
    icon: GitCompare,
    title: 'Tavan U-C ve Duvar U-C Farkı',
    content:
      'Tavan U-C profili asma tavan sistemlerinde yatay taşıyıcı iskelet için, Duvar U-C profili ise bölme duvar sistemlerinde dikey taşıyıcı iskelet için tasarlanır. Her ikisi de U ve C profil kombinasyonu kullanır; fark uygulama yönü ve yük dağılımındadır. Tavan U-C daha çok aşağı doğru yük taşırken, Duvar U-C dikey yük ve rüzgar yüklerine karşı rijitlik sağlar. Doğru kesit ve et kalınlığı seçimi her iki uygulama için de kritik önemdedir.',
  },
  {
    icon: ExternalLink,
    title: 'Teknik Kaynaklar ve Standartlar',
    content:
      'Galvanizli çelik profil sistemlerinde korozyon dayanımı, yapı güvenliği ve yangın performansı konusunda uluslararası standartları takip etmek önemlidir. World Steel Association galvanizli çelik üretimi ve sürdürülebilirlik raporları için referans kaynaktır. ISO standartları ise profil kesitleri, et kalınlıkları ve montaj detayları için teknik çerçeve sunar. Proje öncesi bu kaynaklardan güncel yayınları inceleyerek doğru ürün seçimini destekleyebilirsiniz.',
    links: [
      { label: 'World Steel Association – galvanizli çelik ve sürdürülebilirlik', href: 'https://www.worldsteel.org/' },
      { label: 'ISO – yapısal çelik ve profil standartları', href: 'https://www.iso.org/' },
    ],
  },
]

export function HomeSeoContent() {
  return (
    <section id="teknik-rehber" className="scroll-mt-20 bg-[#f3f4f1] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#b88700]">Teknik Bilgi</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Profil Sistemlerinde Teknik Rehber</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
            Kusursuz Köşe Çözümleri yaklaşımıyla geliştirdiğimiz profil sistemleri, uygulama sahasında hız, kalite ve
            sürdürülebilir performansı aynı anda hedefler. Doğru profil seçimi, proje tipine, yüzey beklentisine ve
            montaj hızına göre birlikte değerlendirilmelidir.
          </p>
        </div>

        <div className="relative mb-12 overflow-hidden rounded-2xl border border-[#eab308]/25 bg-gradient-to-br from-white via-[#fffef9] to-[#fff9e8]/60 p-8 shadow-sm lg:p-10">
          <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[#eab308]/10 blur-3xl" />
          <div className="relative">
            <p className="text-base leading-8 text-slate-700">
              Delikli alçı köşe profili, kaba sıva profili, tavan U-C profili ve duvar U-C profili ürün grupları; hem
              konut projelerinde hem ticari yapılarda hem de yoğun kullanım alanlarında güvenilir bir taşıyıcı ve bitiş
              altyapısı sunar. Doğru profil seçimi yalnızca malzeme tercihinden ibaret değildir; proje tipine, yüzey
              beklentisine, montaj hızına ve bakım ihtiyacına göre birlikte değerlendirilmelidir.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon
            const hasLinks = 'links' in card && card.links

            return (
              <article
                key={card.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-[#eab308]/50 hover:shadow-lg hover:shadow-[#eab308]/8 lg:p-8"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#eab308]/15 text-[#b88700] transition-colors group-hover:bg-[#eab308]/25">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 lg:text-xl">{card.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{card.content}</p>
                {hasLinks && card.links && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {card.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0b2f57] underline-offset-4 transition hover:text-[#b88700] hover:underline"
                      >
                        {link.label}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                )}
              </article>
            )
          })}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/urunler"
            className="inline-flex items-center gap-2 rounded-xl border border-[#eab308]/60 bg-white px-6 py-3 text-sm font-semibold text-[#b88700] transition hover:border-[#eab308] hover:bg-[#eab308]/10"
          >
            <BookOpen className="h-4 w-4" />
            Profil ürünlerini incele
          </Link>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 rounded-xl bg-[#eab308] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#d89f04]"
          >
            Teknik teklif al
          </Link>
        </div>
      </div>
    </section>
  )
}
