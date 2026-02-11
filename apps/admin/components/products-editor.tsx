"use client"

import { useMemo, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import type { ProductCatalog, ProductItem } from "@/lib/products"
import MediaField from "@/components/media-field"

type ProductsEditorProps = {
  initialCatalog: ProductCatalog
  saveCategory: (formData: FormData) => Promise<{ ok: boolean }>
  removeCategory: (formData: FormData) => Promise<{ ok: boolean }>
  saveProduct: (formData: FormData) => Promise<{ ok: boolean }>
  removeProduct: (formData: FormData) => Promise<{ ok: boolean }>
}

export default function ProductsEditor({
  initialCatalog,
  saveCategory,
  removeCategory,
  saveProduct,
  removeProduct,
}: ProductsEditorProps) {
  const router = useRouter()
  const catalog = initialCatalog
  const [status, setStatus] = useState<string>("")
  const [isPending, startTransition] = useTransition()
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCatalog.categories[0]?.slug ?? ""
  )
  const [specEdits, setSpecEdits] = useState<Record<string, { label: string; value: string }[]>>(() => {
    const nextState: Record<string, { label: string; value: string }[]> = {}
    initialCatalog.products.forEach((product) => {
      const key = `${product.categorySlug}::${product.slug}`
      nextState[key] = product.specs?.length ? product.specs : [{ label: "", value: "" }]
    })
    return nextState
  })
  const [imageEdits, setImageEdits] = useState<Record<string, string>>(() => {
    const nextState: Record<string, string> = {}
    initialCatalog.products.forEach((product) => {
      const key = `${product.categorySlug}::${product.slug}`
      nextState[key] = product.image || ""
    })
    return nextState
  })
  const [newImage, setNewImage] = useState<string>("")
  const [newSpecs, setNewSpecs] = useState<{ label: string; value: string }[]>([
    { label: "", value: "" },
  ])

  const selectedCategoryData = useMemo(() => {
    return catalog.categories.find((category) => category.slug === selectedCategory)
  }, [catalog.categories, selectedCategory])

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return catalog.products
    return catalog.products.filter((item) => item.categorySlug === selectedCategory)
  }, [catalog.products, selectedCategory])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    action: (formData: FormData) => Promise<{ ok: boolean }>
  ) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    startTransition(async () => {
      try {
        await action(formData)
        setStatus("Kaydedildi")
        router.refresh()
      } catch (error) {
        setStatus(error instanceof Error ? error.message : "Islem basarisiz")
      }
    })
  }

  const handleDeleteClick = async (
    payload: Record<string, string>,
    action: (formData: FormData) => Promise<{ ok: boolean }>
  ) => {
    const formData = new FormData()
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value)
    })

    startTransition(async () => {
      try {
        await action(formData)
        setStatus("Silindi")
        router.refresh()
      } catch (error) {
        setStatus(error instanceof Error ? error.message : "Silme basarisiz")
      }
    })
  }

  const updateSpecRow = (
    key: string,
    index: number,
    field: "label" | "value",
    value: string
  ) => {
    setSpecEdits((current) => {
      const specs = [...(current[key] ?? [{ label: "", value: "" }])]
      specs[index] = { ...specs[index], [field]: value }
      return { ...current, [key]: specs }
    })
  }

  const addSpecRow = (key: string) => {
    setSpecEdits((current) => ({
      ...current,
      [key]: [...(current[key] ?? [{ label: "", value: "" }]), { label: "", value: "" }],
    }))
  }

  const removeSpecRow = (key: string, index: number) => {
    setSpecEdits((current) => {
      const specs = (current[key] ?? []).filter((_, rowIndex) => rowIndex !== index)
      return { ...current, [key]: specs.length ? specs : [{ label: "", value: "" }] }
    })
  }

  const updateNewSpecRow = (index: number, field: "label" | "value", value: string) => {
    setNewSpecs((current) => {
      const specs = [...current]
      specs[index] = { ...specs[index], [field]: value }
      return specs
    })
  }

  const addNewSpecRow = () => {
    setNewSpecs((current) => [...current, { label: "", value: "" }])
  }

  const removeNewSpecRow = (index: number) => {
    setNewSpecs((current) => {
      const specs = current.filter((_, rowIndex) => rowIndex !== index)
      return specs.length ? specs : [{ label: "", value: "" }]
    })
  }

  return (
    <div className="admin-products-layout">
      <section className="admin-section admin-products-panel">
        <div className="admin-section-header">
          <div>
            <h2>Web Ürün Kategorileri</h2>
            <p>Ürünleri düzenlemek için önce kategori seçin.</p>
          </div>
          <span className="admin-pill">Kategori</span>
        </div>

        <div className="admin-category-list" style={{ marginTop: 16 }}>
          {catalog.categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              className={selectedCategory === category.slug ? "admin-category-item active" : "admin-category-item"}
              onClick={() => setSelectedCategory(category.slug)}
            >
              <div>
                <strong>{category.name}</strong>
                <span>{category.title}</span>
              </div>
              <span className="admin-badge">{category.slug}</span>
            </button>
          ))}
        </div>

        {selectedCategoryData && (
          <div className="admin-card" style={{ marginTop: 20 }}>
            <h3>Seçili Kategori</h3>
            <form onSubmit={(event) => handleSubmit(event, saveCategory)} className="admin-form-grid" style={{ marginTop: 12 }}>
              <div className="admin-form-row">
                <label>Kategori Adı</label>
                <input name="name" defaultValue={selectedCategoryData.name} required />
              </div>
              <div className="admin-form-row">
                <label>Slug</label>
                <input name="slug" defaultValue={selectedCategoryData.slug} required />
              </div>
              <div className="admin-form-row">
                <label>Eyebrow</label>
                <input name="eyebrow" defaultValue={selectedCategoryData.eyebrow} />
              </div>
              <div className="admin-form-row">
                <label>Başlık</label>
                <input name="title" defaultValue={selectedCategoryData.title} />
              </div>
              <div className="admin-form-row">
                <label>Vurgu</label>
                <input name="titleAccent" defaultValue={selectedCategoryData.titleAccent} />
              </div>
              <div className="admin-form-row">
                <label>Açıklama</label>
                <textarea name="description" rows={3} defaultValue={selectedCategoryData.description} />
              </div>
              <div className="admin-form-actions">
                <button type="submit" disabled={isPending}>
                  Kaydet
                </button>
                <button
                  type="button"
                  className="danger"
                  disabled={isPending}
                  onClick={() => handleDeleteClick({ slug: selectedCategoryData.slug }, removeCategory)}
                >
                  Sil
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="admin-card" style={{ marginTop: 20 }}>
          <h3>Yeni Kategori Ekle</h3>
          <form onSubmit={(event) => handleSubmit(event, saveCategory)} className="admin-form-grid" style={{ marginTop: 12 }}>
            <div className="admin-form-row">
              <label>Kategori Adı</label>
              <input name="name" placeholder="Orn. Yeni Kategori" required />
            </div>
            <div className="admin-form-row">
              <label>Slug</label>
              <input name="slug" placeholder="ornegin-yeni-kategori" />
            </div>
            <div className="admin-form-row">
              <label>Eyebrow</label>
              <input name="eyebrow" placeholder="Ürün Grubu" />
            </div>
            <div className="admin-form-row">
              <label>Başlık</label>
              <input name="title" placeholder="Başlık" />
            </div>
            <div className="admin-form-row">
              <label>Vurgu</label>
              <input name="titleAccent" placeholder="Vurgulu Metin" />
            </div>
            <div className="admin-form-row">
              <label>Açıklama</label>
              <textarea name="description" rows={3} placeholder="Kategori açıklaması" />
            </div>
            <div className="admin-form-actions">
              <button type="submit" disabled={isPending}>
                Kategori Ekle
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="admin-section admin-products-panel">
        <div className="admin-section-header">
          <div>
            <h2>Ürünler</h2>
            <p>
              {selectedCategoryData?.name ?? "Kategori"} için toplam {filteredProducts.length} ürün.
            </p>
          </div>
          <span className="admin-pill">Ürün</span>
        </div>

        <details className="admin-card admin-collapse" open>
          <summary>
            <div>
              <strong>Yeni Ürün Ekle</strong>
              <span>Seçili kategori için yeni ilan oluşturun.</span>
            </div>
            <span className="admin-badge">Form</span>
          </summary>
          <div className="admin-collapse-body">
            <form onSubmit={(event) => handleSubmit(event, saveProduct)} className="admin-form-grid">
              <div className="admin-form-row">
                <label>Kategori</label>
                <select name="categorySlug" defaultValue={selectedCategory || catalog.categories[0]?.slug}>
                  {catalog.categories.map((category) => (
                    <option key={category.slug} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="admin-form-row">
                <label>Ürün Adı</label>
                <input name="name" placeholder="Ürün adı" required />
              </div>
              <div className="admin-form-row">
                <label>Slug</label>
                <input name="slug" placeholder="urun-slug" />
              </div>
              <div className="admin-form-row">
                <label>Görsel</label>
                <input type="hidden" name="image" value={newImage} readOnly />
                <MediaField
                  value={newImage}
                  onChange={setNewImage}
                  allowVideo={false}
                  aspect={4 / 3}
                  outputWidth={1200}
                  outputHeight={900}
                />
              </div>
              <div className="admin-form-row">
                <label>Alan / Metraj</label>
                <input name="size" placeholder="100 m²" />
              </div>
              <div className="admin-form-row">
                <label>Oda</label>
                <input name="rooms" placeholder="3+1" />
              </div>
              <div className="admin-form-row">
                <label>Banyo</label>
                <input name="bathrooms" placeholder="2" />
              </div>
              <div className="admin-form-row">
                <label>Kapasite</label>
                <input name="capacity" placeholder="20-30 Kisi" />
              </div>
              <div className="admin-form-row">
                <label>Kullanım Tipi</label>
                <input name="usageType" placeholder="Magaza/Showroom" />
              </div>
              <div className="admin-form-row">
                <label>Açıklama</label>
                <textarea name="description" rows={3} placeholder="Ürün açıklaması" />
              </div>
              <div className="admin-form-row">
                <label>Öne Çıkanlar (virgül ile ayır)</label>
                <input name="highlights" placeholder="Hizli montaj, Dayanikli" />
              </div>
              <div className="admin-form-row">
                <label>Teknik Özellikler</label>
                <div className="admin-form-grid" style={{ gap: 12 }}>
                  {newSpecs.map((spec, index) => (
                    <div key={`new-spec-${index}`} className="admin-form-grid" style={{ gap: 8 }}>
                      <div className="admin-form-row">
                        <input
                          name="specLabel"
                          placeholder="Orn. Kat Yuksekligi"
                          value={spec.label}
                          onChange={(event) => updateNewSpecRow(index, "label", event.target.value)}
                        />
                      </div>
                      <div className="admin-form-row">
                        <input
                          name="specValue"
                          placeholder="Orn. 2.80 m"
                          value={spec.value}
                          onChange={(event) => updateNewSpecRow(index, "value", event.target.value)}
                        />
                      </div>
                      <div className="admin-form-actions" style={{ justifyContent: "flex-start" }}>
                        <button type="button" className="danger" onClick={() => removeNewSpecRow(index)}>
                          Satır Sil
                        </button>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={addNewSpecRow}>
                    Satır Ekle
                  </button>
                </div>
              </div>
              <div className="admin-form-actions">
                <button type="submit" disabled={isPending}>
                  Ürün Ekle
                </button>
              </div>
            </form>
          </div>
        </details>

        <div className="admin-product-grid" style={{ marginTop: 20 }}>
          {filteredProducts.map((product: ProductItem) => {
            const productKey = `${product.categorySlug}::${product.slug}`
            const specs =
              specEdits[productKey] ?? (product.specs?.length ? product.specs : [{ label: "", value: "" }])

            return (
              <details key={`${product.categorySlug}-${product.slug}`} className="admin-card admin-collapse">
                <summary>
                  <div className="admin-product-card">
                    <div className="admin-product-thumb">
                      <img src={product.image || "/profil/logo.png"} alt={product.name} />
                    </div>
                    <div className="admin-product-info">
                      <strong>{product.name}</strong>
                      <span>{product.size || "Metraj belirtilmedi"}</span>
                      <span>{product.rooms ? `${product.rooms} Oda` : "Oda bilgisi yok"}</span>
                    </div>
                  </div>
                  <span className="admin-badge">Düzenle</span>
                </summary>
                <div className="admin-collapse-body">
                  <form onSubmit={(event) => handleSubmit(event, saveProduct)} className="admin-form-grid">
                <input type="hidden" name="categorySlug" value={product.categorySlug} />
                <div className="admin-form-row">
                  <label>Ürün Adı</label>
                  <input name="name" defaultValue={product.name} required />
                </div>
                <div className="admin-form-row">
                  <label>Slug</label>
                  <input name="slug" defaultValue={product.slug} required />
                </div>
                <div className="admin-form-row">
                  <label>Görsel</label>
                  <input
                    type="hidden"
                    name="image"
                    value={imageEdits[productKey] ?? product.image ?? ""}
                    readOnly
                  />
                  <MediaField
                    value={imageEdits[productKey] ?? product.image ?? ""}
                    onChange={(url) => setImageEdits((prev) => ({ ...prev, [productKey]: url }))}
                    allowVideo={false}
                    aspect={4 / 3}
                    outputWidth={1200}
                    outputHeight={900}
                  />
                </div>
                <div className="admin-form-row">
                  <label>Alan / Metraj</label>
                  <input name="size" defaultValue={product.size} placeholder="100 m²" />
                </div>
                <div className="admin-form-row">
                  <label>Oda</label>
                  <input name="rooms" defaultValue={product.rooms} placeholder="3+1" />
                </div>
                <div className="admin-form-row">
                  <label>Banyo</label>
                  <input name="bathrooms" defaultValue={product.bathrooms} placeholder="2" />
                </div>
                <div className="admin-form-row">
                  <label>Kapasite</label>
                  <input name="capacity" defaultValue={product.capacity} placeholder="20-30 Kisi" />
                </div>
                <div className="admin-form-row">
                  <label>Kullanım Tipi</label>
                  <input name="usageType" defaultValue={product.usageType} placeholder="Magaza/Showroom" />
                </div>
                <div className="admin-form-row">
                  <label>Açıklama</label>
                  <textarea name="description" rows={3} defaultValue={product.description} />
                </div>
                <div className="admin-form-row">
                  <label>Öne Çıkanlar (virgül ile ayır)</label>
                  <input name="highlights" defaultValue={product.highlights?.join(", ") || ""} />
                </div>
                <div className="admin-form-row">
                  <label>Teknik Özellikler</label>
                  <div className="admin-form-grid" style={{ gap: 12 }}>
                    {specs.map((spec, index) => (
                      <div key={`${productKey}-spec-${index}`} className="admin-form-grid" style={{ gap: 8 }}>
                        <div className="admin-form-row">
                          <input
                            name="specLabel"
                            placeholder="Orn. Kat Yuksekligi"
                            value={spec.label}
                            onChange={(event) => updateSpecRow(productKey, index, "label", event.target.value)}
                          />
                        </div>
                        <div className="admin-form-row">
                          <input
                            name="specValue"
                            placeholder="Orn. 2.80 m"
                            value={spec.value}
                            onChange={(event) => updateSpecRow(productKey, index, "value", event.target.value)}
                          />
                        </div>
                        <div className="admin-form-actions" style={{ justifyContent: "flex-start" }}>
                          <button
                            type="button"
                            className="danger"
                            onClick={() => removeSpecRow(productKey, index)}
                          >
                            Satır Sil
                          </button>
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={() => addSpecRow(productKey)}>
                      Satır Ekle
                    </button>
                  </div>
                </div>
                <div className="admin-form-actions">
                  <button type="submit" disabled={isPending}>
                    Kaydet
                  </button>
                  <button
                    type="button"
                    className="danger"
                    disabled={isPending}
                    onClick={() =>
                      handleDeleteClick(
                        { categorySlug: product.categorySlug, slug: product.slug },
                        removeProduct
                      )
                    }
                  >
                    Sil
                  </button>
                </div>
              </form>
                </div>
              </details>
            )
          })}
        </div>

        {status && <p style={{ color: "#94a3b8", marginTop: 16 }}>{status}</p>}
      </section>
    </div>
  )
}
