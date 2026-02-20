import { SitePageShell } from '@/components/site-page-shell'
import { Calendar, User, Clock, ArrowLeft, Share2, ChevronDown, List } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/blog-catalog'
import { mediaPlacementImageStyle } from '@/lib/media-placement'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function BlogDetail({ params }: Props) {
  const { slug } = await params
  const blog = await getBlogPostBySlug(slug)
  const relatedPosts = await getRelatedBlogPosts(slug)

  if (!blog) {
    return (
      <SitePageShell>
        <main className="min-h-screen pt-32">
          <div className="container mx-auto px-4">
            <p className="text-lg text-muted-foreground">Blog yazısı bulunamadı.</p>
          </div>
        </main>
      </SitePageShell>
    )
  }

  return (
    <SitePageShell>
      <main className="min-h-screen bg-background">
        <section className="relative h-[70vh] min-h-[560px] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              style={mediaPlacementImageStyle(blog.imagePlacement, blog.imagePosition)}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
          </div>

          <div className="relative z-10 container mx-auto px-4 pb-16">
            <div className="max-w-4xl">
              <Link
                href="/medya/blog"
                className="inline-flex items-center gap-2 text-white/90 hover:text-white font-semibold mb-8 hover:gap-3 transition-all backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full"
              >
                <ArrowLeft className="w-4 h-4" />
                Bloga Dön
              </Link>

              <div className="space-y-6">
                <h1
                  className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance leading-tight"
                  style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)' }}
                >
                  {blog.title}
                </h1>

                <div className="inline-flex flex-wrap gap-6 text-white px-6 py-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20">
                  <span className="flex items-center gap-2 font-medium">
                    <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
                      <Calendar className="w-4 h-4" />
                    </div>
                    {blog.date}
                  </span>
                  <span className="flex items-center gap-2 font-medium">
                    <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
                      <Clock className="w-4 h-4" />
                    </div>
                    {blog.readTime}
                  </span>
                  <span className="flex items-center gap-2 font-medium">
                    <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
                      <User className="w-4 h-4" />
                    </div>
                    {blog.author}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <article className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {blog.excerpt && (
                <div className="mb-10 p-8 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/5 border-l-4 border-accent">
                  <p className="text-xl leading-relaxed text-foreground font-medium">{blog.excerpt}</p>
                </div>
              )}

              {blog.sections.length > 0 && (
                <nav className="mb-12 rounded-2xl border bg-card p-6">
                  <div className="mb-4 flex items-center gap-2 text-base font-semibold">
                    <List className="h-4 w-4 text-accent" />
                    İçerikler
                  </div>
                  <ol className="grid gap-2 sm:grid-cols-2">
                    {blog.sections.map((section, index) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          {index + 1}. {section.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              <div className="space-y-12">
                {blog.sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-32">
                    <h2 className="text-3xl font-bold mb-5 border-b border-border pb-3">{section.title}</h2>
                    <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">{section.content}</p>

                    {section.image && (
                      <div className="relative mt-8 h-[340px] overflow-hidden rounded-2xl border">
                        <Image
                          src={section.image}
                          alt={section.title}
                          fill
                          className="object-cover"
                          style={mediaPlacementImageStyle(section.imagePlacement, section.imagePosition)}
                          sizes="(max-width: 768px) 100vw, 896px"
                        />
                      </div>
                    )}
                  </section>
                ))}
              </div>

              <div className="mt-16 pt-8 border-t-2 border-border">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8 rounded-3xl bg-gradient-to-br from-muted to-muted/50">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Bu yazıyı paylaş</h3>
                    <p className="text-muted-foreground">Arkadaşlarınızla bu yazıyı paylaşabilirsiniz</p>
                  </div>
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-accent/30 transition-all"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Paylaş
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">İlgili Yazılar</h2>
                <p className="text-muted-foreground text-lg">Sizin için seçtiğimiz diğer yazılar</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((post) => (
                  <Link key={post.slug} href={`/medya/blog/${post.slug}`} className="group">
                    <div className="bg-card rounded-3xl overflow-hidden border border-border hover:border-accent transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-2">
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                          style={mediaPlacementImageStyle(post.imagePlacement, post.imagePosition)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent">
                            {post.category}
                          </span>
                          <span className="text-xs text-muted-foreground">{post.date}</span>
                        </div>
                        <h3 className="text-xl font-bold group-hover:text-accent transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </SitePageShell>
  )
}
