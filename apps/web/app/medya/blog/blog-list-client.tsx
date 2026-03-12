'use client'

import { useMemo, useState } from 'react'
import { Calendar, User, Clock } from 'lucide-react'
import type { BlogPost } from '@/lib/blog-types'
import { mediaPlacementImageStyle } from '@/lib/media-placement'
import { ArticleListCard } from '@/components/article-list-card'

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
              <ArticleListCard
                key={post.slug}
                href={`/medya/blog/${post.slug}`}
                title={post.title}
                excerpt={post.excerpt}
                image={post.image || '/placeholder.svg'}
                category={post.category}
                imageStyle={mediaPlacementImageStyle(post.imagePlacement, post.imagePosition)}
                meta={[
                  { icon: Calendar, label: post.date },
                  { icon: Clock, label: post.readTime },
                  { icon: User, label: post.author },
                ]}
                ctaLabel="Devamını Oku"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
