'use client'

import { useMemo, useState } from 'react'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { BlogPost } from '@/lib/blog-types'
import { mediaPlacementImageStyle } from '@/lib/media-placement'

type Props = {
  posts: BlogPost[]
}

export function BlogListClient({ posts }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü')

  const categories = useMemo(
    () => ['Tümü', ...Array.from(new Set(posts.map((post) => post.category)))],
    [posts]
  )

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'Tümü') return posts
    return posts.filter((post) => post.category === selectedCategory)
  }, [posts, selectedCategory])

  return (
    <>
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/30 scale-105'
                    : 'bg-card border border-border text-muted-foreground hover:border-accent/50 hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredPosts.map((post) => (
              <Link key={post.slug} href={`/medya/blog/${post.slug}`} className="group">
                <article className="h-full rounded-2xl overflow-hidden bg-card border border-border hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={post.image || '/placeholder.svg'}
                      alt={post.title}
                      fill
                      className="object-cover"
                      style={mediaPlacementImageStyle(post.imagePlacement, post.imagePosition)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-full bg-accent/90 backdrop-blur-sm text-accent-foreground text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        {post.author}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>

                    <div className="flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
                      Devamını Oku
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
