import Link from 'next/link'

export function HomeSeoContent() {
  return (
    <section className="bg-[#f3f4f1] py-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 lg:p-10">
          <h2 className="text-3xl font-bold text-slate-900">Profil Sistemlerinde Teknik Rehber</h2>
          <p className="mt-4 leading-8 text-slate-700">
            Kusursuz Köşe Çözümleri yaklaşımıyla geliştirdiğimiz profil sistemleri, uygulama sahasında hız,
            kalite ve sürdürülebilir performansı aynı anda hedefler. Delikli alçı köşe profili, kaba sıva profili
            ve tavan U-C profili ürün grupları; hem konut projelerinde hem ticari yapılarda hem de yoğun kullanım
            alanlarında güvenilir bir taşıyıcı ve bitiş altyapısı sunar. Doğru profil seçimi, yalnızca malzeme
            tercihinden ibaret değildir; proje tipine, yüzey beklentisine, montaj hızına ve bakım ihtiyacına göre
            birlikte değerlendirilmelidir.
          </p>

          <h3 className="mt-10 text-2xl font-semibold text-slate-900">Delikli Alçı Köşe Profili Ne Sağlar?</h3>
          <p className="mt-4 leading-8 text-slate-700">
            Delikli alçı köşe profili, duvar ve kolon köşelerinde düzgün hat elde etmek için kullanılır. Delikli
            yüzey yapısı, sıva ve alçı katmanının profile daha iyi tutunmasına yardımcı olur. Bu sayede darbelere
            karşı daha dayanıklı bir köşe formu oluşur ve boya öncesi yüzey kalitesi yükselir. Uygulama sırasında
            ölçü kaçaklarını azaltması, işçilik süresini kısaltması ve tekrar işlem ihtiyacını düşürmesi nedeniyle
            sahada maliyet kontrolüne katkı sağlar. İç mekan bitişlerinde temiz bir hat istenen projelerde en sık
            tercih edilen çözümlerden biridir.
          </p>

          <h3 className="mt-10 text-2xl font-semibold text-slate-900">Kaba Sıva Profili ve Tavan U-C Profili Farkı</h3>
          <p className="mt-4 leading-8 text-slate-700">
            Kaba sıva profili, özellikle sıva kalınlığını dengelemek ve cephe yüzeylerinde referans hattı oluşturmak
            için kullanılır. Tavan U-C profili ise asma tavan sistemlerinde ana ve tali taşıyıcı iskeletin temelini
            oluşturur. İki ürünün kullanım amacı farklı olsa da her ikisi de galvanizli çelik yapısı sayesinde uzun
            ömürlü kullanım ve korozyona karşı dayanım sunar. Projede doğru kesit ve et kalınlığı seçildiğinde,
            sistem stabilitesi artar, uygulama toleransları iyileşir ve tamamlanan işin estetik kalitesi yükselir.
          </p>

          <h3 className="mt-10 text-2xl font-semibold text-slate-900">Doğru Ürün Seçimi İçin Pratik Kriterler</h3>
          <p className="mt-4 leading-8 text-slate-700">
            Profil seçimi yapılırken uygulama alanının iç veya dış mekan olması, beklenen darbe dayanımı, montaj
            hızına dair ihtiyaç, standart boy gereksinimi ve sevkiyat planı birlikte ele alınmalıdır. Proje ekipleri,
            ürün ölçüleri ile sahadaki detay çözümünü eşleştirdiğinde hem fire oranı azalır hem de iş programı daha
            öngörülebilir ilerler. Bu nedenle ürün sayfalarımızdaki teknik özellikler, ürün ölçüleri ve avantajlar
            sekmeleri, karar sürecini hızlandırmak için ayrı ayrı yapılandırılmıştır. İhtiyacınıza göre hızlı teklif
            almak ve doğru profil kombinasyonunu belirlemek için iletişim sayfamız üzerinden teknik ekibimize
            doğrudan ulaşabilirsiniz.
          </p>

          <h3 className="mt-10 text-2xl font-semibold text-slate-900">Teknik Kaynaklar</h3>
          <p className="mt-4 leading-8 text-slate-700">
            Galvanizli çelik, korozyon dayanımı ve yapı güvenliği konusunda temel bilgileri resmi ve sektörel
            kaynaklardan takip etmek önemlidir. İlgili teknik çerçeveyi görmek isterseniz
            {' '}
            <a
              href="https://www.worldsteel.org/"
              target="_blank"
              rel="noreferrer noopener"
              className="font-semibold text-[#0b2f57] underline-offset-4 hover:underline"
            >
              World Steel Association
            </a>
            {' '}
            ve
            {' '}
            <a
              href="https://www.iso.org/"
              target="_blank"
              rel="noreferrer noopener"
              className="font-semibold text-[#0b2f57] underline-offset-4 hover:underline"
            >
              ISO standart sayfaları
            </a>
            {' '}
            üzerinden güncel yayınları inceleyebilirsiniz.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/urunler"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-[#eab308]/70 hover:text-slate-900"
            >
              Profil ürünlerini incele
            </Link>
            <Link
              href="/iletisim"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-[#eab308]/70 hover:text-slate-900"
            >
              Teknik teklif al
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
