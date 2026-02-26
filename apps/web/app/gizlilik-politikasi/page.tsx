import { SitePageShell } from '@/components/site-page-shell'

export const metadata = {
  title: 'Gizlilik Politikası | Çelik Yapı',
  description: 'Web sitesi gizlilik politikası.',
}

export default function PrivacyPolicyPage() {
  return (
    <SitePageShell>
      <main className="min-h-screen pt-32">
        <section className="container mx-auto px-4 pb-16">
          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 md:p-8">
            <h1 className="text-3xl font-bold text-foreground">Gizlilik Politikası</h1>
            <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
              <p>
                Bu politika, web sitemizi kullanırken paylaştığınız bilgilerin toplanması, kullanılması ve korunmasına ilişkin esasları açıklar.
              </p>
              <h2 className="text-lg font-semibold text-foreground">1. Toplanan Bilgiler</h2>
              <p>İletişim formu verileri ve temel teknik erişim kayıtları.</p>
              <h2 className="text-lg font-semibold text-foreground">2. Kullanım Amaçları</h2>
              <p>İletişim taleplerine dönüş, hizmet geliştirme ve yasal yükümlülüklerin yerine getirilmesi.</p>
              <h2 className="text-lg font-semibold text-foreground">3. Güvenlik</h2>
              <p>Verileriniz yetkisiz erişime karşı makul teknik ve idari önlemlerle korunur.</p>
            </div>
          </div>
        </section>
      </main>
    </SitePageShell>
  )
}
