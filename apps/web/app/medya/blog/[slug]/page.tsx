import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Calendar, User, Clock, ArrowLeft, Share2, Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Mock blog database
const blogData: Record<string, any> = {
  'celik-yapi-avantajlari': {
    title: 'Çelik Yapıların Avantajları ve Modern İnşaattaki Yeri',
    date: '25 Ocak 2024',
    author: 'Mühendislik Ekibi',
    category: 'Teknik',
    readTime: '8 dk',
    image: '/blog-1.jpg',
    content: `
      <h2>Çelik Yapı Nedir?</h2>
      <p>Çelik yapılar, taşıyıcı sistem elemanlarının çelikten oluştuğu modern yapı sistemleridir. Geleneksel betonarme yapılara göre birçok avantaj sunan çelik yapılar, günümüzde konut, ticari ve endüstriyel projelerde yaygın olarak tercih edilmektedir.</p>
      
      <h2>Çelik Yapıların Avantajları</h2>
      <h3>1. Deprem Dayanıklılığı</h3>
      <p>Çelik, elastik bir malzemedir ve deprem anında enerjiyi absorbe edebilir. Bu özelliği sayesinde çelik yapılar, betonarme yapılara göre deprem performansı açısından çok daha güvenlidir.</p>
      
      <h3>2. Hızlı Montaj</h3>
      <p>Çelik yapı elemanları fabrikada üretilir ve şantiyeye hazır halde gelir. Bu sayede montaj süresi geleneksel inşaata göre %70 daha kısadır. Bir çelik villa ortalama 45-60 günde teslim edilebilir.</p>
      
      <h3>3. Ekonomik Avantaj</h3>
      <p>İşçilik maliyetlerinin düşük olması, hızlı montaj ve az bakım gereksinimi nedeniyle uzun vadede çelik yapılar daha ekonomiktir.</p>
      
      <h3>4. Esneklik ve Tasarım Özgürlüğü</h3>
      <p>Çelik yapılar, geniş açıklıklar geçebilir ve mimari tasarımda büyük esneklik sağlar. İç mekanda kolon sayısını azaltarak daha ferah yaşam alanları oluşturabilirsiniz.</p>
      
      <h2>Uygulama Alanları</h2>
      <ul>
        <li>Konut Projeleri (Villa, Müstakil Ev)</li>
        <li>Ticari Yapılar (Ofis, Mağaza)</li>
        <li>Endüstriyel Tesisler</li>
        <li>Eğitim ve Sağlık Yapıları</li>
      </ul>
      
      <h2>Sonuç</h2>
      <p>Çelik yapılar, modern inşaat teknolojilerinin getirdiği tüm avantajları bünyesinde barındıran, güvenli, ekonomik ve sürdürülebilir bir yapı sistemidir. Türkiye gibi deprem kuşağında yer alan ülkelerde çelik yapı tercihi, ailenizin güvenliği için en doğru karardır.</p>
    `
  },
  // Diğer blog yazıları için varsayılan içerik
}

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blog = blogData[slug] || {
    title: 'Blog Yazısı',
    date: '1 Ocak 2024',
    author: 'Master Steel House',
    category: 'Genel',
    readTime: '5 dk',
    image: '/blog-1.jpg',
    content: '<p>İçerik yükleniyor...</p>'
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 bg-background">
        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Link href="/medya/blog" className="inline-flex items-center gap-2 text-accent font-semibold mb-8 hover:gap-3 transition-all">
                <ArrowLeft className="w-4 h-4" />
                Bloga Dön
              </Link>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {blog.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {blog.readTime}
                </span>
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {blog.author}
                </span>
                <span className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                {blog.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                {blog.title}
              </h1>

              {/* Featured Image */}
              <div className="relative h-96 rounded-3xl overflow-hidden mb-12">
                <Image
                  src={blog.image || "/placeholder.svg"}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div 
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Share Section */}
              <div className="mt-16 pt-8 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Bu yazıyı paylaş</h3>
                    <p className="text-sm text-muted-foreground">Arkadaşlarınla bu yazıyı paylaşabilirsin</p>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:shadow-xl hover:shadow-accent/30 transition-all">
                    <Share2 className="w-5 h-5" />
                    Paylaş
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
