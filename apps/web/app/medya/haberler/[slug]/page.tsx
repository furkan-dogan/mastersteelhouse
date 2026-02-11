import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Calendar, MapPin, ArrowLeft, Share2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Mock news database
const newsData: Record<string, any> = {
  'yeni-fabrika-acilisi': {
    title: 'Master Steel House Yeni Üretim Tesisi Hizmete Girdi',
    date: '25 Ocak 2024',
    location: 'Gebze, Kocaeli',
    image: '/news-1.jpg',
    content: `
      <h2>15.000 m² Modern Üretim Tesisi Açıldı</h2>
      <p>Master Steel House olarak, sektördeki 20 yıllık deneyimimizi taçlandıran yeni üretim tesisimizi Gebze Organize Sanayi Bölgesi'nde hizmete açtık.</p>
      
      <h2>Tesisin Özellikleri</h2>
      <p>Toplam 15.000 m² kapalı alana sahip tesisimiz, 5.000 m² CNC üretim alanı, 3.000 m² boyama ve kaplama ünitesi, 2.000 m² kalite kontrol laboratuvarı ile tam donanımlı bir yapıya sahiptir.</p>
      
      <h3>Son Teknoloji Ekipmanlar</h3>
      <ul>
        <li>10 adet CNC lazer kesim makinesi</li>
        <li>8 adet robotik kaynak ünitesi</li>
        <li>Tam otomatik boyama hattı</li>
        <li>3D ölçüm ve kalite kontrol sistemleri</li>
      </ul>
      
      <h2>Üretim Kapasitesi</h2>
      <p>Yeni tesisimizle birlikte üretim kapasitemizi 3 katına çıkararak, yıllık 500 proje üretim kapasitesine ulaştık. Bu sayede müşterilerimize daha hızlı teslimat yapabilecek ve daha fazla projeye imza atabilecegiz.</p>
      
      <h2>Açılış Töreni</h2>
      <p>Açılış törenimize Sanayi ve Teknoloji Bakanımız, yerel yöneticiler, iş ortaklarımız ve basın mensupları katıldı. Genel Müdürümüz Ahmet Yılmaz, törende yaptığı konuşmada büyüme hedeflerinden ve sürdürülebilir üretim anlayışından bahsetti.</p>
      
      <blockquote>
        "Bu yatırım, Türkiye'nin çelik yapı sektöründeki gücünü göstermektedir. Amacımız, dünya standartlarında üretim yaparak hem yurtiçi hem de yurtdışı pazarlarda marka değerimizi artırmak." - Ahmet Yılmaz, Genel Müdür
      </blockquote>
    `
  },
}

export default async function HaberDetay({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const haber = newsData[slug] || {
    title: 'Haber',
    date: '1 Ocak 2024',
    location: 'Türkiye',
    image: '/news-1.jpg',
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
              <Link href="/medya/haberler" className="inline-flex items-center gap-2 text-accent font-semibold mb-8 hover:gap-3 transition-all">
                <ArrowLeft className="w-4 h-4" />
                Haberlere Dön
              </Link>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {haber.date}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {haber.location}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                {haber.title}
              </h1>

              {/* Featured Image */}
              <div className="relative h-96 rounded-3xl overflow-hidden mb-12">
                <Image
                  src={haber.image || "/placeholder.svg"}
                  alt={haber.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div 
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-blockquote:border-l-accent prose-blockquote:bg-accent/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3"
                dangerouslySetInnerHTML={{ __html: haber.content }}
              />

              {/* Share Section */}
              <div className="mt-16 pt-8 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Bu haberi paylaş</h3>
                    <p className="text-sm text-muted-foreground">Sosyal medyada paylaşabilirsin</p>
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
