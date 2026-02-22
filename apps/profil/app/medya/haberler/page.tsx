import { Calendar, ArrowRight, MapPin } from 'lucide-react'
import Link from 'next/link'
import { ProfilePageShell } from '@/components/profile-page-shell'

const news = [
  {
    slug: 'uretim-hatti-guncellemesi',
    title: 'Üretim Hattı Güncellemesi Tamamlandı',
    excerpt: 'Profil üretim sürecinde hız ve kalite kontrolü artıran güncelleme başarıyla devreye alındı.',
    date: '20 Şubat 2026',
    location: 'Ankara',
    category: 'Duyuru',
    image: '/profil-kabasiva.jpg',
    featured: true,
  },
  {
    slug: 'saha-uygulama-egitimi',
    title: 'Saha Uygulama Eğitimi Programı',
    excerpt: 'Teknik ekiplerle birlikte gerçekleştirilen uygulama eğitimi programı tamamlandı.',
    date: '18 Şubat 2026',
    location: 'İstanbul',
    category: 'Eğitim',
    image: '/profil-alcikose.jpg',
    featured: false,
  },
  {
    slug: 'tedarik-sureci-optimizasyonu',
    title: 'Tedarik Sürecinde Yeni Optimizasyon',
    excerpt: 'Teslimat planlamasını hızlandıran yeni operasyon düzeni uygulanmaya başladı.',
    date: '15 Şubat 2026',
    location: 'İzmir',
    category: 'Operasyon',
    image: '/profil-tavan-uc.jpg',
    featured: false,
  },
]

export default function HaberlerPage() {
  return (
    <ProfilePageShell>
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-[#eab308]/10 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-5xl font-bold md:text-6xl text-slate-900">
              Haberler & <span className="bg-gradient-to-r from-[#b88700] to-[#eab308] bg-clip-text text-transparent">Duyurular</span>
            </h1>
            <p className="text-xl text-slate-600">Profil sistemlerinden son gelişmeler, teknik paylaşımlar ve kurumsal güncellemeler.</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            {news
              .filter((item) => item.featured)
              .map((item) => (
                <Link key={item.slug} href="#" className="group mb-12 block">
                  <div className="grid gap-8 rounded-3xl border-2 border-[#eab308]/30 bg-white p-8 transition-all duration-500 hover:border-[#eab308]/60 hover:shadow-2xl hover:shadow-[#eab308]/20 md:grid-cols-2">
                    <div className="relative h-80 overflow-hidden rounded-2xl">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-[#eab308] px-4 py-2 text-xs font-semibold text-black shadow">{item.category}</span>
                      </div>
                      <div className="absolute right-4 top-4">
                        <span className="rounded-full bg-[#b88700] px-4 py-2 text-sm font-bold text-white shadow">ÖNE ÇIKAN HABER</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="mb-4 flex flex-wrap gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-2"><Calendar className="h-4 w-4" />{item.date}</span>
                        <span className="flex items-center gap-2"><MapPin className="h-4 w-4" />{item.location}</span>
                      </div>
                      <h2 className="mb-4 text-3xl font-bold text-slate-900 transition-colors group-hover:text-[#b88700]">{item.title}</h2>
                      <p className="mb-6 text-lg leading-relaxed text-slate-600">{item.excerpt}</p>
                      <div className="flex items-center gap-2 font-semibold text-[#b88700] transition-all group-hover:gap-3">
                        Haberi Oku
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {news
                .filter((item) => !item.featured)
                .map((item) => (
                  <Link key={item.slug} href="#" className="group">
                    <article className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-[#eab308]/50 hover:shadow-2xl hover:shadow-[#eab308]/10">
                      <div className="relative h-56 overflow-hidden">
                        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                        <div className="absolute left-4 top-4">
                          <span className="rounded-full bg-[#eab308] px-3 py-1.5 text-xs font-semibold text-black">{item.category}</span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="mb-3 flex flex-wrap gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{item.date}</span>
                          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{item.location}</span>
                        </div>

                        <h3 className="mb-3 line-clamp-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-[#b88700]">{item.title}</h3>
                        <p className="mb-4 line-clamp-3 text-sm text-slate-600">{item.excerpt}</p>

                        <div className="flex items-center gap-2 text-sm font-semibold text-[#b88700] transition-all group-hover:gap-3">
                          Detayları Gör
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </ProfilePageShell>
  )
}
