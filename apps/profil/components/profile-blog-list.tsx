'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import type { ProfileBlogPost } from '@/lib/profile-content'

type ProfileBlogListProps = {
  posts: ProfileBlogPost[]
}

export function ProfileBlogList({ posts }: ProfileBlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState('Tümü')

  const categories = useMemo(() => ['Tümü', ...Array.from(new Set(posts.map((post) => post.category)))], [posts])

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'Tümü') return posts
    return posts.filter((post) => post.category === selectedCategory)
  }, [posts, selectedCategory])

  return (
    <>
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
              <article
                key={post.slug}
                className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-[#eab308]/50 hover:shadow-2xl hover:shadow-[#eab308]/10"
              >
                <Link href={`/medya/blog/${post.slug}`} aria-label={`${post.title} yazısını aç`}>
                  <div className="relative h-56 overflow-hidden">
                    <img src={post.image} alt={`${post.title} kapak görseli`} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

                    <div className="absolute left-4 top-4">
                      <span className="rounded-full bg-[#eab308]/90 px-3 py-1.5 text-xs font-semibold text-black backdrop-blur-sm">{post.category}</span>
                    </div>
                  </div>
                </Link>

                <div className="p-6">
                  <div className="mb-4 flex flex-wrap gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
                    <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{post.author}</span>
                  </div>

                  <h2 className="mb-3 line-clamp-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-[#b88700]">
                    <Link href={`/medya/blog/${post.slug}`} className="hover:underline underline-offset-4">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mb-4 line-clamp-3 text-sm text-slate-600">{post.excerpt}</p>

                  <Link
                    href={`/medya/blog/${post.slug}`}
                    className="flex items-center gap-2 text-sm font-semibold text-[#b88700] transition-all group-hover:gap-3"
                  >
                    Yazıyı Oku
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
