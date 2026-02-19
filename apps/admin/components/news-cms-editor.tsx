'use client'

import { useMemo, useState } from 'react'
import {
  Eye,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Search,
  Trash2,
  X,
  Star,
  StarOff,
} from 'lucide-react'
import type { NewsPost, NewsStore } from '@/lib/news-store'
import { MediaPickerModal } from '@/components/media-picker-modal'
import { adminPreviewUrl } from '@/lib/media-preview-url'
import { MediaUploadDropzone } from '@/components/media-upload-dropzone'
import { MediaPlacementEditor } from '@/components/media-placement-editor'
import { AdminLayout } from '@/components/admin-layout'
import { CmsErrorState, CmsLoadingState } from '@/components/cms-screen-state'
import { CmsStatusToast } from '@/components/cms-shared'
import { usePostsCms } from '@/lib/use-posts-cms'
import { normalizeMediaPlacement, placementToObjectPosition } from '@/lib/media-placement'

const EMPTY_POST: NewsPost = {
  slug: 'yeni-haber',
  title: 'Yeni Haber',
  date: '1 Ocak 2024',
  location: 'Türkiye',
  author: 'Editör',
  category: 'Genel',
  readTime: '5 dk okuma',
  excerpt: '',
  image: '/news-1.jpg',
  imagePosition: '50% 50%',
  imagePlacement: { fit: 'cover', x: 50, y: 50, zoom: 100 },
  imagePlacementCard: { fit: 'cover', x: 50, y: 50, zoom: 100 },
  imagePlacementHero: { fit: 'cover', x: 50, y: 50, zoom: 100 },
  featured: false,
  sections: [
    {
      title: 'Başlık',
      content: 'Haber metni',
      imagePosition: '50% 50%',
      imagePlacement: { fit: 'cover', x: 50, y: 50, zoom: 100 },
    },
  ],
  gallery: [],
}

export function NewsCmsEditor() {
  const [showMediaPicker, setShowMediaPicker] = useState(false)
  const [coverPlacementMode, setCoverPlacementMode] = useState<'card' | 'hero'>('card')
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [editorOpen, setEditorOpen] = useState(false)
  const [mediaTarget, setMediaTarget] = useState<
    { type: 'cover' } | { type: 'section'; rowId: string } | { type: 'gallery' }
  >({ type: 'cover' })

  const {
    store,
    setStore,
    loading,
    saving,
    error,
    setError,
    message,
    selectedSlug,
    setSelectedSlug,
    selectedPost,
    sections,
    loadStore,
    saveStore,
    patchPost,
    renameSelectedPostSlug,
    addPost,
    removePost,
    updateSection,
    addSection,
    removeSection,
  } = usePostsCms<NewsPost, NewsStore>({
    endpoint: '/api/news',
    emptyPost: EMPTY_POST,
    slugBase: 'yeni-haber',
    loadErrorMessage: 'Haber verisi alınamadı',
    saveSuccessMessage: 'Haber içerikleri kaydedildi.',
  })

  const categories = useMemo(() => {
    if (!store) return []
    return Array.from(new Set(store.posts.map((post) => post.category.trim()).filter(Boolean))).sort((a, b) =>
      a.localeCompare(b, 'tr')
    )
  }, [store])

  const filteredPosts = useMemo(() => {
    if (!store) return []
    const q = search.trim().toLowerCase()
    return store.posts.filter((post) => {
      if (categoryFilter !== 'all' && post.category !== categoryFilter) return false
      if (!q) return true
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q)
      )
    })
  }, [store, search, categoryFilter])

  function openMediaPicker(target: { type: 'cover' } | { type: 'section'; rowId: string } | { type: 'gallery' }) {
    setMediaTarget(target)
    setShowMediaPicker(true)
  }

  function openEditor(slug: string) {
    setSelectedSlug(slug)
    setEditorOpen(true)
  }

  function createNews() {
    addPost()
    setEditorOpen(true)
  }

  function deleteBySlug(slug: string) {
    if (!store) return
    const nextPosts = store.posts.filter((post) => post.slug !== slug)
    setStore({ ...store, posts: nextPosts })
    if (selectedSlug === slug) {
      setSelectedSlug(nextPosts[0]?.slug ?? '')
      if (nextPosts.length === 0) {
        setEditorOpen(false)
      }
    }
  }

  function handleMediaPick(url: string) {
    if (!selectedPost) return

    if (mediaTarget.type === 'cover') {
      const basePlacement = normalizeMediaPlacement(selectedPost.imagePlacement, selectedPost.imagePosition)
      patchPost({
        image: url,
        imagePlacement: basePlacement,
        imagePlacementCard: selectedPost.imagePlacementCard
          ? normalizeMediaPlacement(selectedPost.imagePlacementCard, selectedPost.imagePosition)
          : basePlacement,
        imagePlacementHero: selectedPost.imagePlacementHero
          ? normalizeMediaPlacement(selectedPost.imagePlacementHero, selectedPost.imagePosition)
          : basePlacement,
      })
    } else if (mediaTarget.type === 'gallery') {
      patchPost({ gallery: [...(selectedPost.gallery ?? []), url] })
    } else {
      updateSection(mediaTarget.rowId, { image: url, imagePlacement: normalizeMediaPlacement(undefined) })
    }

    setShowMediaPicker(false)
  }

  function removeGalleryImage(index: number) {
    if (!selectedPost) return
    patchPost({
      gallery: (selectedPost.gallery ?? []).filter((_, itemIndex) => itemIndex !== index),
    })
  }

  if (loading) {
    return <CmsLoadingState message="Haber CMS yükleniyor..." />
  }

  if (!store) {
    return <CmsErrorState onRetry={() => void loadStore()} />
  }

  return (
    <>
      <AdminLayout
        title="Haberler"
        subtitle={`${filteredPosts.length} haber bulundu`}
        actions={
          <>
            <button onClick={() => void loadStore()} className="cms-btn-secondary h-9 px-3 py-1.5 text-sm">
              <RefreshCw className="h-4 w-4" />
              Yenile
            </button>
            <button onClick={() => void saveStore()} disabled={saving} className="cms-btn-primary h-9 px-3 py-1.5 text-sm disabled:opacity-60">
              <Save className="h-4 w-4" />
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
            <button onClick={createNews} className="cms-btn-primary h-9 px-3 py-1.5 text-sm">
              <Plus className="h-4 w-4" />
              Yeni Haber
            </button>
          </>
        }
      >
        <section className="cms-card overflow-hidden">
          <div className="border-b px-4 py-3">
            <div className="grid gap-3 md:grid-cols-[1fr_220px]">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Haber ara..."
                  className="cms-input !pl-10"
                />
              </label>
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="cms-input"
              >
                <option value="all">Tüm Kategoriler</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="cms-scroll overflow-x-auto">
            <table className="w-full table-fixed text-sm">
              <thead className="bg-muted/40 text-muted-foreground">
                <tr>
                  <th className="w-[62%] px-4 py-3 text-left font-medium">Başlık</th>
                  <th className="hidden w-[16%] px-4 py-3 text-left font-medium md:table-cell">Kategori</th>
                  <th className="hidden w-[8%] px-4 py-3 text-center font-medium lg:table-cell">Öne Çıkan</th>
                  <th className="hidden w-[8%] px-4 py-3 text-center font-medium lg:table-cell">Durum</th>
                  <th className="w-[120px] px-4 py-3 text-right font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-sm text-muted-foreground">
                      Haber bulunamadı.
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map((post) => (
                    <tr key={post.slug} className="border-t align-middle hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md border bg-muted/40">
                            {post.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={adminPreviewUrl(post.image)}
                                alt={post.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">Yok</div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-medium text-foreground">{post.title}</p>
                            <p className="hidden truncate text-xs text-muted-foreground md:block">{post.excerpt || 'Özet girilmemiş'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="hidden px-4 py-3 md:table-cell">
                        <span className="inline-flex rounded-md border bg-muted px-2 py-1 text-xs font-medium text-foreground">
                          {post.category || 'Genel'}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 text-center lg:table-cell">
                        <button
                          onClick={() => {
                            setStore({
                              ...store,
                              posts: store.posts.map((item) =>
                                item.slug === post.slug ? { ...item, featured: !item.featured } : item
                              ),
                            })
                          }}
                          className={`inline-flex h-8 w-8 items-center justify-center rounded-md border transition-colors ${
                            post.featured
                              ? 'border-yellow-300/60 bg-yellow-100/60 text-yellow-700 dark:border-yellow-500/30 dark:bg-yellow-500/10 dark:text-yellow-300'
                              : 'border-border bg-card text-muted-foreground hover:bg-muted'
                          }`}
                          title={post.featured ? 'Öne çıkan kaldır' : 'Öne çıkar'}
                        >
                          {post.featured ? <Star className="h-4 w-4" /> : <StarOff className="h-4 w-4" />}
                        </button>
                      </td>
                      <td className="hidden px-4 py-3 text-center lg:table-cell">
                        <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                          Yayında
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => openEditor(post.slug)}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:h-8 md:w-8"
                            title="Önizle"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => openEditor(post.slug)}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:h-8 md:w-8"
                            title="Düzenle"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteBySlug(post.slug)}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-red-300/60 bg-red-50 text-red-600 transition-colors hover:bg-red-100 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300 md:h-8 md:w-8"
                            title="Sil"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </AdminLayout>

      {editorOpen && selectedPost && (
        <>
          <button
            type="button"
            aria-label="Editörü kapat"
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setEditorOpen(false)}
          />
          <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-3xl border-l bg-background shadow-2xl">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b px-5 py-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Haber Düzenle</p>
                  <h2 className="text-base font-semibold text-foreground">{selectedPost.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => void saveStore()} disabled={saving} className="cms-btn-primary h-9 px-3 py-1.5 text-sm disabled:opacity-60">
                    <Save className="h-4 w-4" />
                    {saving ? 'Kaydediliyor...' : 'Kaydet'}
                  </button>
                  <button onClick={() => setEditorOpen(false)} className="cms-btn-ghost h-9 w-9 p-0" aria-label="Kapat">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="cms-scroll flex-1 overflow-y-auto p-5">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Temel Bilgiler</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted-foreground">Başlık</label>
                        <input value={selectedPost.title} onChange={(e) => patchPost({ title: e.target.value })} className="cms-input" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted-foreground">Slug</label>
                        <input
                          value={selectedPost.slug}
                          onChange={(event) => renameSelectedPostSlug(event.target.value)}
                          className="cms-input"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted-foreground">Tarih</label>
                        <input value={selectedPost.date} onChange={(e) => patchPost({ date: e.target.value })} className="cms-input" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted-foreground">Konum</label>
                        <input value={selectedPost.location} onChange={(e) => patchPost({ location: e.target.value })} className="cms-input" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted-foreground">Yazar</label>
                        <input value={selectedPost.author} onChange={(e) => patchPost({ author: e.target.value })} className="cms-input" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted-foreground">Kategori</label>
                        <input value={selectedPost.category} onChange={(e) => patchPost({ category: e.target.value })} className="cms-input" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted-foreground">Okuma Süresi</label>
                        <input value={selectedPost.readTime} onChange={(e) => patchPost({ readTime: e.target.value })} className="cms-input" />
                      </div>
                      <label className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                        <input
                          type="checkbox"
                          checked={selectedPost.featured}
                          onChange={(event) => patchPost({ featured: event.target.checked })}
                        />
                        Öne Çıkan Haber
                      </label>
                    </div>

                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <label className="block text-xs font-medium text-muted-foreground">Kapak Görseli</label>
                        {selectedPost.image && (
                          <button onClick={() => patchPost({ image: '' })} className="cms-btn-ghost h-7 px-2 py-1 text-xs text-error">
                            Kaldır
                          </button>
                        )}
                      </div>
                      <MediaUploadDropzone
                        onUploaded={(urls) => {
                          const nextUrl = urls[0]
                          if (!nextUrl) return
                          patchPost({
                            image: nextUrl,
                            imagePlacement: normalizeMediaPlacement(selectedPost.imagePlacement, selectedPost.imagePosition),
                          })
                        }}
                        onPickFromMedia={() => openMediaPicker({ type: 'cover' })}
                        onError={(nextMessage) => setError(nextMessage)}
                      />
                      {selectedPost.image && (
                        <div className="mt-3">
                          <div className="mb-2 inline-flex rounded-lg border bg-card p-1">
                            <button
                              type="button"
                              onClick={() => setCoverPlacementMode('card')}
                              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                                coverPlacementMode === 'card'
                                  ? 'bg-primary text-primary-foreground'
                                  : 'text-muted-foreground hover:bg-muted'
                              }`}
                            >
                              Haber Kartı
                            </button>
                            <button
                              type="button"
                              onClick={() => setCoverPlacementMode('hero')}
                              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                                coverPlacementMode === 'hero'
                                  ? 'bg-primary text-primary-foreground'
                                  : 'text-muted-foreground hover:bg-muted'
                              }`}
                            >
                              Haber Detay Hero
                            </button>
                          </div>
                          <MediaPlacementEditor
                            src={selectedPost.image}
                            value={normalizeMediaPlacement(
                              coverPlacementMode === 'card'
                                ? selectedPost.imagePlacementCard ?? selectedPost.imagePlacement
                                : selectedPost.imagePlacementHero ?? selectedPost.imagePlacement,
                              selectedPost.imagePosition
                            )}
                            onChange={(nextPlacement) => {
                              if (coverPlacementMode === 'card') {
                                patchPost({
                                  imagePlacementCard: nextPlacement,
                                  imagePosition: placementToObjectPosition(nextPlacement),
                                })
                                return
                              }
                              patchPost({
                                imagePlacementHero: nextPlacement,
                                imagePosition: placementToObjectPosition(nextPlacement),
                              })
                            }}
                            variants={
                              coverPlacementMode === 'card'
                                ? [{ label: 'Haber Kartı (16:9)', aspect: '16 / 9' }]
                                : [{ label: 'Haber Detay Hero (16:7)', aspect: '16 / 7' }]
                            }
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-muted-foreground">Özet</label>
                      <textarea
                        rows={3}
                        value={selectedPost.excerpt}
                        onChange={(e) => patchPost({ excerpt: e.target.value })}
                        className="cms-textarea"
                      />
                    </div>

                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <label className="block text-xs font-medium text-muted-foreground">Galeri Görselleri</label>
                      </div>
                      <MediaUploadDropzone
                        multiple
                        helperText="PNG, JPG, GIF, WEBP (maks. 20MB)"
                        galleryButtonLabel="Medyadan ekle"
                        onUploaded={(urls) => patchPost({ gallery: [...(selectedPost.gallery ?? []), ...urls] })}
                        onPickFromMedia={() => openMediaPicker({ type: 'gallery' })}
                        onError={(nextMessage) => setError(nextMessage)}
                      />
                      {(selectedPost.gallery ?? []).length > 0 && (
                        <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
                          {(selectedPost.gallery ?? []).map((img, index) => (
                            <div key={`${img}-${index}`} className="overflow-hidden rounded-lg border border-border bg-muted/20">
                              <div className="relative aspect-square">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={adminPreviewUrl(img)} alt={`Galeri ${index + 1}`} className="h-full w-full object-cover" />
                                <button
                                  onClick={() => removeGalleryImage(index)}
                                  className="absolute right-2 top-2 rounded-md bg-black/55 px-2 py-1 text-xs text-white hover:bg-black/70"
                                >
                                  Sil
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {(selectedPost.gallery ?? []).length === 0 && (
                        <p className="text-xs text-muted-foreground">Galeri boş. Medyadan görsel ekleyebilirsin.</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 border-t pt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">İçerikler (Section)</h3>
                      <button onClick={addSection} className="cms-btn-ghost h-8 px-2 py-1 text-xs">
                        <Plus className="h-3.5 w-3.5" />
                        Bölüm Ekle
                      </button>
                    </div>

                    <div className="space-y-3">
                      {sections.map((section, index) => (
                        <div key={section.id} className="space-y-2 rounded-lg border p-3">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold text-muted-foreground">Bölüm {index + 1}</p>
                            <button onClick={() => removeSection(section.id)} className="cms-btn-ghost h-7 px-2 py-1 text-xs text-error">
                              <Trash2 className="h-3.5 w-3.5" />
                              Sil
                            </button>
                          </div>

                          <input value={section.title} onChange={(e) => updateSection(section.id, { title: e.target.value })} className="cms-input" placeholder="Başlık" />
                          <textarea rows={5} value={section.content} onChange={(e) => updateSection(section.id, { content: e.target.value })} className="cms-textarea" placeholder="İçerik metni" />
                          {section.image && (
                            <div className="max-h-[140px] max-w-[320px] overflow-hidden rounded-lg border border-border bg-muted/20">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={adminPreviewUrl(section.image)}
                                alt={`Bölüm ${index + 1} görsel önizleme`}
                                className="h-full w-full object-cover"
                                style={{
                                  objectPosition: `${section.imagePlacement.x}% ${section.imagePlacement.y}%`,
                                  objectFit: section.imagePlacement.fit,
                                  transform: `scale(${section.imagePlacement.zoom / 100})`,
                                  transformOrigin: `${section.imagePlacement.x}% ${section.imagePlacement.y}%`,
                                }}
                              />
                            </div>
                          )}

                          <div className="space-y-2">
                            <MediaUploadDropzone
                              compact
                              onUploaded={(urls) => {
                                const nextUrl = urls[0]
                                if (!nextUrl) return
                                updateSection(section.id, {
                                  image: nextUrl,
                                  imagePlacement: normalizeMediaPlacement(undefined),
                                })
                              }}
                              onPickFromMedia={() => openMediaPicker({ type: 'section', rowId: section.id })}
                              onError={(nextMessage) => setError(nextMessage)}
                            />
                            {section.image && (
                              <button
                                onClick={() => updateSection(section.id, { image: '' })}
                                className="cms-btn-ghost h-7 px-2 py-1 text-xs text-error"
                              >
                                Görseli Kaldır
                              </button>
                            )}
                          </div>
                          {section.image && (
                            <MediaPlacementEditor
                              src={section.image}
                              value={section.imagePlacement}
                              onChange={(nextPlacement) => updateSection(section.id, { imagePlacement: nextPlacement })}
                              variants={[{ label: 'Bölüm Görseli (896/340)', aspect: '896 / 340' }]}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <button onClick={removePost} className="cms-btn-ghost h-9 px-3 py-1.5 text-sm text-error">
                      <Trash2 className="h-4 w-4" />
                      Bu Haberi Sil
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}

      <MediaPickerModal
        open={showMediaPicker}
        title={mediaTarget.type === 'cover' ? 'Kapak Görseli Seç' : mediaTarget.type === 'gallery' ? 'Galeriye Medya Ekle' : 'Bölüm Görseli Seç'}
        onClose={() => setShowMediaPicker(false)}
        onSelect={handleMediaPick}
      />

      <CmsStatusToast error={error} message={message} />
    </>
  )
}
