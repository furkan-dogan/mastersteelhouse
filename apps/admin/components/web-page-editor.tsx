"use client"

import { useMemo, useState, useTransition } from "react"
import Link from "next/link"
import type { WebPageContent, WebPageSection, WebReferenceItem } from "../../../content/web-pages"
import MediaField from "@/components/media-field"

type WebPageEditorProps = {
  initialContent: WebPageContent
  saveAction: (formData: FormData) => Promise<{ ok: boolean }>
}

const createSection = (): WebPageSection => ({
  title: "Yeni Bölüm",
  description: "",
  image: "/project-1.jpg",
  bullets: [""],
})

const createReference = (): WebReferenceItem => ({
  id: Date.now(),
  title: "Yeni Referans",
  location: "",
  categories: [],
  image: "/project-1.jpg",
  area: "",
})

export default function WebPageEditor({ initialContent, saveAction }: WebPageEditorProps) {
  const [content, setContent] = useState<WebPageContent>(initialContent)
  const [status, setStatus] = useState("")
  const [isPending, startTransition] = useTransition()
  const [activeSectionId, setActiveSectionId] = useState("hero")

  const payload = useMemo(() => JSON.stringify(content), [content])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    startTransition(async () => {
      try {
        await saveAction(formData)
        setStatus("Kaydedildi")
      } catch (error) {
        setStatus(error instanceof Error ? error.message : "Kaydetme basarisiz")
      }
    })
  }

  const updateHero = (key: keyof WebPageContent["hero"], value: string) => {
    setContent((prev) => ({ ...prev, hero: { ...prev.hero, [key]: value } }))
  }

  if (content.template === "info") {
    const updateSection = (index: number, key: keyof WebPageSection, value: string) => {
      setContent((prev) => {
        if (prev.template !== "info") return prev
        const sections = [...prev.sections]
        sections[index] = { ...sections[index], [key]: value }
        return { ...prev, sections }
      })
    }

    const updateSectionBullet = (sectionIndex: number, bulletIndex: number, value: string) => {
      setContent((prev) => {
        if (prev.template !== "info") return prev
        const sections = [...prev.sections]
        const bullets = [...sections[sectionIndex].bullets]
        bullets[bulletIndex] = value
        sections[sectionIndex] = { ...sections[sectionIndex], bullets }
        return { ...prev, sections }
      })
    }

    const addSectionBullet = (sectionIndex: number) => {
      setContent((prev) => {
        if (prev.template !== "info") return prev
        const sections = [...prev.sections]
        sections[sectionIndex] = {
          ...sections[sectionIndex],
          bullets: [...sections[sectionIndex].bullets, ""],
        }
        return { ...prev, sections }
      })
    }

    const removeSectionBullet = (sectionIndex: number, bulletIndex: number) => {
      setContent((prev) => {
        if (prev.template !== "info") return prev
        const sections = [...prev.sections]
        const bullets = sections[sectionIndex].bullets.filter((_, i) => i !== bulletIndex)
        sections[sectionIndex] = {
          ...sections[sectionIndex],
          bullets: bullets.length ? bullets : [""],
        }
        return { ...prev, sections }
      })
    }

    const addSection = () => {
      setContent((prev) => {
        if (prev.template !== "info") return prev
        return { ...prev, sections: [...prev.sections, createSection()] }
      })
    }

    const removeSection = (index: number) => {
      setContent((prev) => {
        if (prev.template !== "info") return prev
        const sections = prev.sections.filter((_, i) => i !== index)
        return { ...prev, sections: sections.length ? sections : [createSection()] }
      })
    }

    const updateCta = (key: "label" | "href" | "note", value: string) => {
      setContent((prev) => {
        if (prev.template !== "info") return prev
        return { ...prev, cta: { ...prev.cta, [key]: value } }
      })
    }

    const sectionItems = [
      { id: "hero", title: "Hero", description: "Başlık, açıklama ve görsel" },
      { id: "sections", title: "Bölümler", description: `${content.sections.length} blok` },
      { id: "cta", title: "CTA", description: "Buton ve not" },
    ]

    const activeIndex = sectionItems.findIndex((section) => section.id === activeSectionId)
    const prevSection = activeIndex > 0 ? sectionItems[activeIndex - 1] : null
    const nextSection = activeIndex >= 0 && activeIndex < sectionItems.length - 1 ? sectionItems[activeIndex + 1] : null
    const activeSection = sectionItems[activeIndex] ?? sectionItems[0]

    return (
      <form onSubmit={handleSubmit} className="admin-form">
        <input type="hidden" name="payload" value={payload} readOnly />

        <section className="admin-section admin-form-section">
          <div className="admin-toolbar">
            <div className="admin-toolbar-row">
              <div className="admin-toolbar-meta">
                <p>Sayfa Türü</p>
                <div className="admin-segmented">
                  <button type="button" className="active">
                    Web Sayfası
                  </button>
                  <Link href="/profil">Profil Sayfası</Link>
                </div>
              </div>
              <div className="admin-toolbar-meta" style={{ textAlign: "right" }}>
                <p>Bölüm Seç</p>
                <select
                  className="admin-select"
                  value={activeSectionId}
                  onChange={(event) => setActiveSectionId(event.target.value)}
                >
                  {sectionItems.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="admin-form-row" style={{ gridTemplateColumns: "auto auto", justifyContent: "end" }}>
                <button
                  type="button"
                  className="admin-button admin-button-secondary"
                  disabled={!prevSection}
                  onClick={() => prevSection && setActiveSectionId(prevSection.id)}
                >
                  Önceki
                </button>
                <button
                  type="button"
                  className="admin-button admin-button-secondary"
                  disabled={!nextSection}
                  onClick={() => nextSection && setActiveSectionId(nextSection.id)}
                >
                  Sonraki
                </button>
              </div>
            </div>
            <div className="admin-toolbar-meta">
              <p>Düzenlenen Bölüm</p>
              <h2>{activeSection?.title}</h2>
              <span>{activeSection?.description}</span>
            </div>
          </div>
        </section>

        <section
          className="admin-section admin-form-section"
          style={{ display: activeSectionId === "hero" ? "grid" : "none" }}
        >
          <h2 style={{ margin: 0 }}>Hero</h2>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            <input value={content.hero.eyebrow} onChange={(e) => updateHero("eyebrow", e.target.value)} placeholder="Eyebrow" />
            <div className="admin-form-row">
              <input value={content.hero.title} onChange={(e) => updateHero("title", e.target.value)} placeholder="Başlık" />
              <input value={content.hero.titleAccent} onChange={(e) => updateHero("titleAccent", e.target.value)} placeholder="Vurgu" />
            </div>
            <textarea value={content.hero.description} onChange={(e) => updateHero("description", e.target.value)} rows={3} placeholder="Açıklama" />
            <MediaField
              label="Hero Görseli"
              value={content.hero.image}
              onChange={(url) => updateHero("image", url)}
              allowVideo={false}
              aspect={16 / 9}
              outputWidth={1600}
              outputHeight={900}
            />
          </div>
        </section>

        <section
          className="admin-section admin-form-section"
          style={{ display: activeSectionId === "sections" ? "grid" : "none" }}
        >
          <div className="admin-form-row" style={{ alignItems: "center" }}>
            <h2 style={{ margin: 0 }}>Bölümler</h2>
            <button type="button" onClick={addSection} className="admin-button admin-button-secondary">
              Yeni Bölüm
            </button>
          </div>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            {content.sections.map((section, index) => (
              <div key={`${section.title}-${index}`} className="admin-card">
                <div className="admin-form-grid">
                  <input value={section.title} onChange={(e) => updateSection(index, "title", e.target.value)} placeholder="Başlık" />
                  <textarea
                    value={section.description}
                    onChange={(e) => updateSection(index, "description", e.target.value)}
                    rows={3}
                    placeholder="Açıklama"
                  />
                  <MediaField
                    label="Bölüm Görseli"
                    value={section.image}
                    onChange={(url) => updateSection(index, "image", url)}
                    allowVideo={false}
                    aspect={4 / 3}
                    outputWidth={1200}
                    outputHeight={900}
                  />
                  <div className="admin-form-grid">
                    <strong style={{ fontSize: 12 }}>Maddeler</strong>
                    {section.bullets.map((bullet, bulletIndex) => (
                      <div key={`${index}-bullet-${bulletIndex}`} className="admin-form-row" style={{ alignItems: "center" }}>
                        <input
                          value={bullet}
                          onChange={(e) => updateSectionBullet(index, bulletIndex, e.target.value)}
                          placeholder="Madde"
                        />
                        <button
                          type="button"
                          className="admin-button-danger"
                          onClick={() => removeSectionBullet(index, bulletIndex)}
                        >
                          Sil
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addSectionBullet(index)} className="admin-button admin-button-secondary">
                      Madde Ekle
                    </button>
                  </div>
                </div>
                <div className="admin-form-actions" style={{ justifyContent: "flex-end", marginTop: 12 }}>
                  <button type="button" className="danger" onClick={() => removeSection(index)}>
                    Bölüm Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          className="admin-section admin-form-section"
          style={{ display: activeSectionId === "cta" ? "grid" : "none" }}
        >
          <h2 style={{ margin: 0 }}>CTA</h2>
          <div className="admin-form-grid" style={{ marginTop: 12 }}>
            <input value={content.cta.label} onChange={(e) => updateCta("label", e.target.value)} placeholder="Buton Metni" />
            <input value={content.cta.href} onChange={(e) => updateCta("href", e.target.value)} placeholder="Buton Linki" />
            <textarea value={content.cta.note} onChange={(e) => updateCta("note", e.target.value)} rows={2} placeholder="Not" />
          </div>
        </section>

        <div className="admin-form-actions">
          <button type="submit" disabled={isPending}>
            Kaydet
          </button>
          {status && <span style={{ color: "#6b7280" }}>{status}</span>}
        </div>
      </form>
    )
  }

  const updateCategories = (value: string) => {
    const categories = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
    setContent((prev) => ({ ...prev, categories }))
  }

  const updateReference = (index: number, key: keyof WebReferenceItem, value: string) => {
    setContent((prev) => {
      if (prev.template !== "references") return prev
      const items = [...prev.items]
      if (key === "categories") {
        items[index] = {
          ...items[index],
          categories: value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        }
      } else {
        items[index] = { ...items[index], [key]: value }
      }
      return { ...prev, items }
    })
  }

  const addReference = () => {
    setContent((prev) => {
      if (prev.template !== "references") return prev
      return { ...prev, items: [...prev.items, createReference()] }
    })
  }

  const removeReference = (index: number) => {
    setContent((prev) => {
      if (prev.template !== "references") return prev
      const items = prev.items.filter((_, i) => i !== index)
      return { ...prev, items: items.length ? items : [createReference()] }
    })
  }

  const sectionItems = [
    { id: "hero", title: "Hero", description: "Başlık, açıklama ve görsel" },
    { id: "categories", title: "Kategoriler", description: `${content.categories.length} kategori` },
    { id: "items", title: "Referans Projeleri", description: `${content.items.length} referans` },
  ]

  const activeIndex = sectionItems.findIndex((section) => section.id === activeSectionId)
  const prevSection = activeIndex > 0 ? sectionItems[activeIndex - 1] : null
  const nextSection = activeIndex >= 0 && activeIndex < sectionItems.length - 1 ? sectionItems[activeIndex + 1] : null
  const activeSection = sectionItems[activeIndex] ?? sectionItems[0]

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <input type="hidden" name="payload" value={payload} readOnly />

      <section className="admin-section admin-form-section">
        <div className="admin-form-row" style={{ alignItems: "center" }}>
          <div>
            <p style={{ margin: 0, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b7280" }}>
              Sayfa Türü
            </p>
            <div className="admin-form-row" style={{ marginTop: 8 }}>
              <button type="button" className="admin-button admin-button-secondary">
                Web Sayfası
              </button>
              <Link href="/profil" className="admin-button admin-button-secondary">
                Profil Sayfası
              </Link>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b7280" }}>
              Bölüm Seç
            </p>
            <select
              value={activeSectionId}
              onChange={(event) => setActiveSectionId(event.target.value)}
              style={{ marginTop: 8, minWidth: 220 }}
            >
              {sectionItems.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.title}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-form-row" style={{ gridTemplateColumns: "auto auto", justifyContent: "end" }}>
            <button
              type="button"
              className="admin-button admin-button-secondary"
              disabled={!prevSection}
              onClick={() => prevSection && setActiveSectionId(prevSection.id)}
            >
              Önceki
            </button>
            <button
              type="button"
              className="admin-button admin-button-secondary"
              disabled={!nextSection}
              onClick={() => nextSection && setActiveSectionId(nextSection.id)}
            >
              Sonraki
            </button>
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <p style={{ margin: 0, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b7280" }}>
            Düzenlenen Bölüm
          </p>
          <h2 style={{ margin: "6px 0 0" }}>{activeSection?.title}</h2>
          <p style={{ margin: "6px 0 0", color: "#6b7280" }}>{activeSection?.description}</p>
        </div>
      </section>

      <section className="admin-section admin-form-section" style={{ display: activeSectionId === "hero" ? "grid" : "none" }}>
        <h2 style={{ margin: 0 }}>Hero</h2>
        <div className="admin-form-grid" style={{ marginTop: 12 }}>
          <input value={content.hero.eyebrow} onChange={(e) => updateHero("eyebrow", e.target.value)} placeholder="Eyebrow" />
          <div className="admin-form-row">
            <input value={content.hero.title} onChange={(e) => updateHero("title", e.target.value)} placeholder="Başlık" />
            <input value={content.hero.titleAccent} onChange={(e) => updateHero("titleAccent", e.target.value)} placeholder="Vurgu" />
          </div>
          <textarea value={content.hero.description} onChange={(e) => updateHero("description", e.target.value)} rows={3} placeholder="Açıklama" />
          <MediaField
            label="Hero Görseli"
            value={content.hero.image}
            onChange={(url) => updateHero("image", url)}
            allowVideo={false}
            aspect={16 / 9}
            outputWidth={1600}
            outputHeight={900}
          />
        </div>
      </section>

      <section className="admin-section admin-form-section" style={{ display: activeSectionId === "categories" ? "grid" : "none" }}>
        <h2 style={{ margin: 0 }}>Kategoriler</h2>
        <div className="admin-form-grid" style={{ marginTop: 12 }}>
          <textarea
            value={content.categories.join(", ")}
            onChange={(e) => updateCategories(e.target.value)}
            rows={3}
            placeholder="Kategori listesini virgül ile ayırın"
          />
        </div>
      </section>

      <section className="admin-section admin-form-section" style={{ display: activeSectionId === "items" ? "grid" : "none" }}>
        <div className="admin-form-row" style={{ alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>Referans Projeleri</h2>
          <button type="button" onClick={addReference} className="admin-button admin-button-secondary">
            Yeni Referans
          </button>
        </div>
        <div className="admin-form-grid" style={{ marginTop: 12 }}>
          {content.items.map((item, index) => (
            <div key={`${item.title}-${index}`} className="admin-card">
              <div className="admin-form-grid">
                <input value={item.title} onChange={(e) => updateReference(index, "title", e.target.value)} placeholder="Başlık" />
                <input value={item.location} onChange={(e) => updateReference(index, "location", e.target.value)} placeholder="Lokasyon" />
                <input value={item.area} onChange={(e) => updateReference(index, "area", e.target.value)} placeholder="Metraj / adet" />
                <MediaField
                  label="Referans Görseli"
                  value={item.image}
                  onChange={(url) => updateReference(index, "image", url)}
                  allowVideo={false}
                  aspect={4 / 3}
                  outputWidth={1200}
                  outputHeight={900}
                />
                <textarea
                  value={item.categories.join(", ")}
                  onChange={(e) => updateReference(index, "categories", e.target.value)}
                  rows={2}
                  placeholder="Kategori listesi (virgül ile)"
                />
              </div>
              <div className="admin-form-actions" style={{ justifyContent: "flex-end", marginTop: 12 }}>
                <button type="button" className="danger" onClick={() => removeReference(index)}>
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="admin-form-actions">
        <button type="submit" disabled={isPending}>
          Kaydet
        </button>
        {status && <span style={{ color: "#6b7280" }}>{status}</span>}
      </div>
    </form>
  )
}
