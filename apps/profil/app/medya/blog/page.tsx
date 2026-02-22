'use client'

import { useMemo, useState } from 'react'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import Link from 'next/link'
import { ProfilePageShell } from '@/components/profile-page-shell'

const posts = [
  {
    slug: 'profil-secim-rehberi',
    title: 'Profil Seçiminde Doğru Kriterler',
    excerpt: 'Alçıköşe, kaba sıva ve tavan U-C ürünleri arasında doğru seçimi hızlandıran temel teknik kriterler.',
    category: 'Teknik',
    date: '22 Şubat 2026',
    readTime: '6 dk',
    author: 'Teknik Ekip',
    image: '/profil-alcikose.jpg',
  },
  {
    slug: 'sahada-hizli-uygulama',
    title: 'Sahada Hızlı Uygulama için 5 Öneri',
    excerpt: 'Uygulama ekiplerinin iş akışını hızlandırmak için pratik adımlar ve planlama önerileri.',
    category: 'Uygulama',
    date: '19 Şubat 2026',
    readTime: '4 dk',
    author: 'Saha Koordinasyon',
    image: '/profil-kabasiva.jpg',
  },
  {
    slug: 'kalite-kontrol-listesi',
    title: 'Profil Sistemlerinde Kalite Kontrol Listesi',
    excerpt: 'Projelerde kalite sürekliliğini korumak için kontrol edilmesi gereken temel başlıklar.',
    category: 'Kalite',
    date: '16 Şubat 2026',
    readTime: '5 dk',
    author: 'Kalite Birimi',
    image: '/profil-tavan-uc.jpg',
  },
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü')

  const categories = useMemo(() => ['Tümü', ...Array.from(new Set(posts.map((post) => post.category)))], [])

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'Tümü') return posts
    return posts.filter((post) => post.category === selectedCategory)
  }, [selectedCategory])

  return (
    <ProfilePageShell>
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-[#eab308]/10 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-5xl font-bold text-slate-900 md:text-6xl">
              Profil Sistemleri <span className="bg-gradient-to-r from-[#b88700] to-[#eab308] bg-clip-text text-transparent">Blog</span>
            </h1>
            <p className="text-xl text-slate-600">Teknik bilgi, uygulama notları ve saha deneyimlerine dayalı güncel içerikler.</p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 py-2.5 font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'scale-105 bg-[#eab308] text-black shadow-lg shadow-[#eab308]/30'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-[#eab308]/50 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <Link key={post.slug} href="#" className="group">
                <article className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-[#eab308]/50 hover:shadow-2xl hover:shadow-[#eab308]/10">
                  <div className="relative h-56 overflow-hidden">
                    <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

                    <div className="absolute left-4 top-4">
                      <span className="rounded-full bg-[#eab308]/90 px-3 py-1.5 text-xs font-semibold text-black backdrop-blur-sm">{post.category}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4 flex flex-wrap gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{post.date}</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
                      <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{post.author}</span>
                    </div>

                    <h2 className="mb-3 line-clamp-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-[#b88700]">{post.title}</h2>
                    <p className="mb-4 line-clamp-3 text-sm text-slate-600">{post.excerpt}</p>

                    <div className="flex items-center gap-2 text-sm font-semibold text-[#b88700] transition-all group-hover:gap-3">
                      Devamını Oku
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </ProfilePageShell>
  )
}
