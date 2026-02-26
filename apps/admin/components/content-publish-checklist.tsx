type ContentPublishChecklistProps = {
  type: 'blog' | 'news'
}

export function ContentPublishChecklist({ type }: ContentPublishChecklistProps) {
  const isBlog = type === 'blog'

  return (
    <section className="cms-card mb-4">
      <div className="border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">Yayın Öncesi SEO Checklist</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          İçeriği kaydetmeden önce aşağıdaki adımları kontrol et. Bu kurallar indekslenme ve kaliteyi doğrudan etkiler.
        </p>
      </div>

      <div className="grid gap-4 px-4 py-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-background p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">1. Başlık</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground">
            <li>Başlık net ve özgün olsun.</li>
            <li>Hedef anahtar kelime başlığın başına yakın geçsin.</li>
            <li>
              Örnek: <span className="font-medium">"{isBlog ? 'Delikli Alçı Köşe Profili Nedir? Uygulama Avantajları' : 'Yeni Üretim Hattımız Devrede: Profil Kapasitesi Arttı'}"</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-background p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">2. Özet (Excerpt)</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground">
            <li>2-3 cümlede içeriğin değerini anlat.</li>
            <li>İlk cümlede konu net geçsin, gereksiz giriş yapma.</li>
            <li>
              Örnek: <span className="font-medium">"{isBlog ? 'Bu yazıda delikli alçı köşe profilinin kullanım alanlarını ve doğru ürün seçimini adım adım özetliyoruz.' : 'Tesiste devreye alınan yeni hat ile profil üretim süreçleri daha hızlı ve planlı hale getirildi.'}"</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-background p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">3. Görsel</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground">
            <li>Kapak görseli içeriğe doğrudan uygun olsun.</li>
            <li>Düşük kalite veya alakasız görsel kullanma.</li>
            <li>Gerekirse medya seçmeden önce dosya adını anlamlı düzenle.</li>
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-background p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">4. Kategori ve İç Link</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground">
            <li>Kategori doğru seçilmiş olmalı.</li>
            <li>Metinde en az 1 iç yönlendirme mantığı kur (ürünler / iletişim).</li>
            <li>
              Örnek yönlendirme: <span className="font-medium">"Detaylı teknik bilgi için Ürünler sayfasını inceleyin."</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
