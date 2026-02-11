import Link from "next/link"
import AdminShell from "@/components/admin-shell"
import { syncWebPageDefaults } from "./actions"

const pages = [
  {
    title: "Hakkımızda",
    slug: "hakkimizda",
    status: "Revizyon",
    owner: "Kurumsal",
    updated: "Dün 17:20",
  },
  {
    title: "Misyonumuz",
    slug: "misyonumuz",
    status: "Yayında",
    owner: "Kurumsal",
    updated: "2 gün önce",
  },
  {
    title: "Vizyonumuz",
    slug: "vizyonumuz",
    status: "Yayında",
    owner: "Kurumsal",
    updated: "2 gün önce",
  },
  {
    title: "Belgelerimiz",
    slug: "belgelerimiz",
    status: "Planlandı",
    owner: "Kurumsal",
    updated: "Bugün",
  },
  {
    title: "Referanslar",
    slug: "referanslar",
    status: "Yayında",
    owner: "Pazarlama",
    updated: "1 hafta önce",
  },
  {
    title: "Çelik Yapı Üretim",
    slug: "uretim-celik-yapi-uretim",
    status: "Yayında",
    owner: "Üretim",
    updated: "3 gün önce",
  },
  {
    title: "Dizayn Yazılımı",
    slug: "uretim-dizayn-yazilimi",
    status: "Yayında",
    owner: "Üretim",
    updated: "3 gün önce",
  },
  {
    title: "Üretim Yazılımı",
    slug: "uretim-uretim-yazilimi",
    status: "Yayında",
    owner: "Üretim",
    updated: "3 gün önce",
  },
  {
    title: "Blog",
    slug: "medya-blog",
    status: "Planlandı",
    owner: "İletişim",
    updated: "2 gün önce",
  },
  {
    title: "Haberler",
    slug: "medya-haberler",
    status: "Planlandı",
    owner: "İletişim",
    updated: "2 gün önce",
  },
  {
    title: "Kataloglar",
    slug: "medya-kataloglar",
    status: "Planlandı",
    owner: "İletişim",
    updated: "2 gün önce",
  },
  {
    title: "Videolar",
    slug: "medya-videolar",
    status: "Planlandı",
    owner: "İletişim",
    updated: "2 gün önce",
  },
  {
    title: "İletişim",
    slug: "iletisim",
    status: "Yayında",
    owner: "Satış",
    updated: "3 gün önce",
  },
]

export default function PagesOverview() {
  return (
    <AdminShell>
      <div className="admin-page-header">
        <div>
          <p style={{ letterSpacing: "0.08em", fontSize: 12, textTransform: "uppercase", color: "#6b7280" }}>
            Sayfa Yönetimi
          </p>
          <h1>Sayfa Kütüphanesi</h1>
          <p style={{ margin: "6px 0 0", color: "#6b7280" }}>
            Tüm sayfaların durumları, sorumluları ve yayın akışı.
          </p>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link href="/home" className="admin-button">
            Anasayfa
          </Link>
          <form action={syncWebPageDefaults}>
            <button type="submit" className="admin-button admin-button-secondary">
              Varsayilanlari DB'ye Yaz
            </button>
          </form>
        </div>
      </div>

      <section className="admin-section">
        <div className="admin-list">
          {pages.map((page) => (
            <Link key={page.slug} href={`/pages/${page.slug}`} className="admin-list-item">
              <div>
                <strong>{page.title}</strong>
                <p style={{ margin: "4px 0 0", color: "#6b7280" }}>{page.owner}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <span className="admin-pill">{page.status}</span>
                <p style={{ margin: "6px 0 0", fontSize: 12, color: "#6b7280" }}>{page.updated}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </AdminShell>
  )
}
