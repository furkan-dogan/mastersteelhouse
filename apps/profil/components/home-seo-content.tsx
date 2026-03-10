'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, Ruler, Wrench, CheckSquare2, ExternalLink } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5 },
}

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
      'Delikli alçı köşe profili, duvar ve kolon köşelerinde düzgün hat elde etmek için kullanılır. Delikli yüzey yapısı, sıva ve alçı katmanının profile daha iyi tutunmasına yardımcı olur. Bu sayede darbelere karşı daha dayanıklı bir köşe formu oluşur ve boya öncesi yüzey kalitesi yükselir. Uygulama sırasında ölçü kaçaklarını azaltması, işçilik süresini kısaltması nedeniyle sahada maliyet kontrolüne katkı sağlar.',
  },
  {
    icon: Wrench,
    title: 'Kaba Sıva Profili ve Tavan U-C Profili Farkı',
    content:
      'Kaba sıva profili, sıva kalınlığını dengelemek ve cephe yüzeylerinde referans hattı oluşturmak için kullanılır. Tavan U-C profili ise asma tavan sistemlerinde ana ve tali taşıyıcı iskeletin temelini oluşturur. Her ikisi de galvanizli çelik yapısı sayesinde uzun ömürlü kullanım ve korozyona karşı dayanım sunar. Doğru kesit ve et kalınlığı seçildiğinde sistem stabilitesi artar.',
  },
  {
    icon: CheckSquare2,
    title: 'Doğru Ürün Seçimi İçin Pratik Kriterler',
    content:
      'Profil seçimi yapılırken uygulama alanının iç veya dış mekan olması, beklenen darbe dayanımı, montaj hızına dair ihtiyaç ve standart boy gereksinimi birlikte ele alınmalıdır. Ürün ölçüleri ile sahadaki detay çözümünü eşleştirdiğinizde hem fire oranı azalır hem de iş programı daha öngörülebilir ilerler. Teknik ekibimize doğrudan ulaşarak hızlı teklif alabilirsiniz.',
  },
  {
    icon: ExternalLink,
    title: 'Teknik Kaynaklar',
    content:
      'Galvanizli çelik, korozyon dayanımı ve yapı güvenliği konusunda temel bilgileri resmi ve sektörel kaynaklardan takip etmek önemlidir.',
    links: [
      { label: 'World Steel Association', href: 'https://www.worldsteel.org/' },
      { label: 'ISO standart sayfaları', href: 'https://www.iso.org/' },
    ],
  },
]

export function HomeSeoContent() {
  return (
    <section id="teknik-rehber" className="scroll-mt-20 bg-[#f3f4f1] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          {...fadeUp}
          className="mb-14 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-[#b88700]">Teknik Bilgi</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Profil Sistemlerinde Teknik Rehber</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
            Kusursuz Köşe Çözümleri yaklaşımıyla geliştirdiğimiz profil sistemleri, uygulama sahasında hız, kalite ve
            sürdürülebilir performansı aynı anda hedefler. Doğru profil seçimi, proje tipine, yüzey beklentisine ve
            montaj hızına göre birlikte değerlendirilmelidir.
          </p>
        </motion.div>

        {/* Intro card */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="relative mb-12 overflow-hidden rounded-2xl border border-[#eab308]/25 bg-gradient-to-br from-white via-[#fffef9] to-[#fff9e8]/60 p-8 shadow-sm lg:p-10"
        >
          <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[#eab308]/10 blur-3xl" />
          <div className="relative">
            <p className="text-base leading-8 text-slate-700">
              Delikli alçı köşe profili, kaba sıva profili ve tavan U-C profili ürün grupları; hem konut projelerinde hem
              ticari yapılarda hem de yoğun kullanım alanlarında güvenilir bir taşıyıcı ve bitiş altyapısı sunar. Doğru
              profil seçimi yalnızca malzeme tercihinden ibaret değildir; proje tipine, yüzey beklentisine, montaj hızına
              ve bakım ihtiyacına göre birlikte değerlendirilmelidir.
            </p>
          </div>
        </motion.div>

        {/* Topic cards grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {cards.map((card, index) => {
            const Icon = card.icon
            const hasLinks = 'links' in card && card.links

            return (
              <motion.article
                key={card.title}
                {...fadeUp}
                transition={{ duration: 0.45, delay: index * 0.08 }}
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
              </motion.article>
            )
          })}
        </div>

        {/* CTA buttons */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.3 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/urunler"
            className="inline-flex items-center gap-2 rounded-xl border border-[#eab308]/60 bg-white px-6 py-3 text-sm font-semibold text-[#b88700] transition hover:bg-[#eab308]/10 hover:border-[#eab308]"
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
        </motion.div>
      </div>
    </section>
  )
}
