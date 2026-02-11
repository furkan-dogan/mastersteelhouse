import Link from "next/link"
import AdminShell from "@/components/admin-shell"

const pageStatus = [
  { title: "Anasayfa", status: "Yayında", updated: "Bugün 09:40", owner: "Pazarlama" },
  { title: "Hakkımızda", status: "Revizyon", updated: "Dün 17:20", owner: "Kurumsal" },
  { title: "Hizmetler", status: "Yayında", updated: "2 gün önce", owner: "Satış" },
  { title: "Projeler", status: "Taslak", updated: "3 gün önce", owner: "Teknik Ofis" },
]

const activityFeed = [
  { title: "Hero slide 03 güncellendi", meta: "Anasayfa · 25 dk önce" },
  { title: "Yeni proje kartı eklendi", meta: "Projeler · 2 saat önce" },
  { title: "Referans logoları yüklendi", meta: "Referanslar · Dün" },
]

const publishQueue = [
  { title: "2026 Bahar kampanyası", date: "02 Şubat", owner: "Pazarlama" },
  { title: "Fabrika turu video güncellemesi", date: "05 Şubat", owner: "Medya" },
  { title: "Enerji verimliliği sayfası", date: "09 Şubat", owner: "Kurumsal" },
]

export default function AdminHome() {
  return (
    <AdminShell>
      <div className="admin-page-header">
        <div>
          <p style={{ letterSpacing: "0.08em", fontSize: "12px", textTransform: "uppercase", color: "#6b7280" }}>
            Yönetim Paneli
          </p>
          <h1>Master Steel House Kontrol Merkezi</h1>
          <p style={{ margin: "6px 0 0", color: "#6b7280" }}>
            Site performansı, içerik akışı ve yayın planı tek ekranda.
          </p>
        </div>
          <Link href="/home" className="admin-button">
            Anasayfa
          </Link>
        </div>

      <section className="admin-card-grid">
        <div className="admin-card">
          <h3>Yayın Durumu</h3>
          <strong>78%</strong>
          <p>Aktif sayfalar + içerikler</p>
        </div>
        <div className="admin-card">
          <h3>İçerik Kuyruğu</h3>
          <strong>5</strong>
          <p>Onay bekleyen görev</p>
        </div>
        <div className="admin-card">
          <h3>Medya Deposu</h3>
          <strong>312</strong>
          <p>Görsel & video varlığı</p>
        </div>
        <div className="admin-card">
          <h3>SEO Skoru</h3>
          <strong>92</strong>
          <p>Son teknik tarama</p>
        </div>
      </section>

      <section className="admin-section">
        <div className="admin-page-header" style={{ marginBottom: 16 }}>
          <div>
            <h2 style={{ margin: 0 }}>Sayfa Durumları</h2>
            <p style={{ margin: "6px 0 0", color: "#6b7280" }}>
              Yayın, revizyon ve taslak sayfaların canlı görünümü.
            </p>
          </div>
          <Link href="/pages" className="admin-button admin-button-secondary">
            Tüm Sayfalar
          </Link>
        </div>
        <div className="admin-list">
          {pageStatus.map((item) => (
            <div key={item.title} className="admin-list-item">
              <div>
                <strong>{item.title}</strong>
                <p style={{ margin: "4px 0 0", color: "#6b7280" }}>{item.owner}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <span className="admin-pill">{item.status}</span>
                <p style={{ margin: "6px 0 0", fontSize: 12, color: "#6b7280" }}>{item.updated}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <div className="admin-page-header" style={{ marginBottom: 12 }}>
          <div>
            <h2 style={{ margin: 0 }}>Son Güncellemeler</h2>
            <p style={{ margin: "6px 0 0", color: "#6b7280" }}>
              Ekipten gelen en güncel içerik hareketleri.
            </p>
          </div>
          <span className="admin-pill">Canlı Akış</span>
        </div>
        <div className="admin-list">
          {activityFeed.map((item) => (
            <div key={item.title} className="admin-list-item">
              <strong>{item.title}</strong>
              <span style={{ color: "#6b7280", fontSize: 12 }}>{item.meta}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <div className="admin-page-header" style={{ marginBottom: 12 }}>
          <div>
            <h2 style={{ margin: 0 }}>Yayın Planı</h2>
            <p style={{ margin: "6px 0 0", color: "#6b7280" }}>
              Önümüzdeki 14 gün için planlanan içerikler.
            </p>
          </div>
          <span className="admin-pill">Takvim</span>
        </div>
        <div className="admin-list">
          {publishQueue.map((item) => (
            <div key={item.title} className="admin-list-item">
              <div>
                <strong>{item.title}</strong>
                <p style={{ margin: "4px 0 0", color: "#6b7280" }}>{item.owner}</p>
              </div>
              <span style={{ fontWeight: 600 }}>{item.date}</span>
            </div>
          ))}
        </div>
      </section>
    </AdminShell>
  )
}
