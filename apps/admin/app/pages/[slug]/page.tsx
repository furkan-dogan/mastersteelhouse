import Link from "next/link"
import AdminShell from "@/components/admin-shell"
import WebPageEditor from "@/components/web-page-editor"
import { getWebPageContent, saveWebPageContent } from "../actions"

export const dynamic = "force-dynamic"

export default async function PageDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const content = await getWebPageContent(slug)

  return (
    <AdminShell>
      <div className="admin-page-header">
        <div>
          <p style={{ letterSpacing: "0.08em", fontSize: 12, textTransform: "uppercase", color: "#6b7280" }}>
            Web Sayfa İçeriği
          </p>
          <h1>{content.hero?.title ?? "Sayfa"}</h1>
          <p style={{ margin: "6px 0 0", color: "#6b7280" }}>
            Bu sayfanın hero, içerik blokları ve CTA detaylarını buradan düzenleyin.
          </p>
        </div>
        <Link href="/pages" className="admin-button admin-button-secondary">
          Tüm Sayfalar
        </Link>
      </div>

      <section className="admin-section">
        <WebPageEditor initialContent={content} saveAction={saveWebPageContent} />
      </section>
    </AdminShell>
  )
}
