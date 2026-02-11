import AdminShell from "@/components/admin-shell"
import ProductsEditor from "@/components/products-editor"
import { getProductCatalog, saveCategory, removeCategory, saveProduct, removeProduct } from "./actions"

export default async function ProductsPage() {
  const catalog = await getProductCatalog()

  return (
    <AdminShell>
      <div className="admin-page-header">
        <div>
          <p style={{ letterSpacing: "0.08em", fontSize: 12, textTransform: "uppercase", color: "#6b7280" }}>
            Web Sitesi
          </p>
          <h1>Urun Katalogu</h1>
          <p style={{ margin: "6px 0 0", color: "#6b7280" }}>
            Kategori ve urun ilanlarini buradan ekleyip duzenleyebilirsiniz.
          </p>
        </div>
        <span className="admin-pill">Urunler</span>
      </div>

      <ProductsEditor
        initialCatalog={catalog}
        saveCategory={saveCategory}
        removeCategory={removeCategory}
        saveProduct={saveProduct}
        removeProduct={removeProduct}
      />
    </AdminShell>
  )
}

export const dynamic = "force-dynamic"
