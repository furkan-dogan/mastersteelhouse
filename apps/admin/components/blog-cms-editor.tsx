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
} from 'lucide-react'
import type { BlogPost, BlogStore } from '@/lib/blog-store'
import { MediaPickerModal } from '@/components/media-picker-modal'
import { adminPreviewUrl } from '@/lib/media-preview-url'
import { MediaUploadDropzone } from '@/components/media-upload-dropzone'
import { MediaPlacementEditor } from '@/components/media-placement-editor'
import { AdminLayout } from '@/components/admin-layout'
import { CmsErrorState, CmsLoadingState } from '@/components/cms-screen-state'
import { CmsStatusToast } from '@/components/cms-shared'
import { usePostsCms } from '@/lib/use-posts-cms'
import { normalizeMediaPlacement, placementToObjectPosition } from '@/lib/media-placement'

const EMPTY_POST: BlogPost = {
  slug: 'yeni-blog-yazisi',
  title: 'Yeni Blog Yazısı',
  date: '1 Ocak 2024',
  author: 'Editör',
  category: 'Genel',
  readTime: '5 dk',
  excerpt: '',
  image: '/blog-1.jpg',
  imagePosition: '50% 50%',
  imagePlacement: { fit: 'cover', x: 50, y: 50, zoom: 100 },
  sections: [
    {
      title: 'Giriş',
      content: 'Bu bölümde yazının giriş metni yer alır.',
      imagePosition: '50% 50%',
      imagePlacement: { fit: 'cover', x: 50, y: 50, zoom: 100 },
    },
  ],
}

export function BlogCmsEditor() {
  const [showMediaPicker, setShowMediaPicker] = useState(false)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [editorOpen, setEditorOpen] = useState(false)
  const [mediaTarget, setMediaTarget] = useState<{ type: 'cover' } | { type: 'section'; rowId: string }>({
    type: 'cover',
  })

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
  } = usePostsCms<BlogPost, BlogStore>({
    endpoint: '/api/blog',
    emptyPost: EMPTY_POST,
    slugBase: 'yeni-blog-yazisi',
    loadErrorMessage: 'Blog verisi alınamadı',
    saveSuccessMessage: 'Blog içerikleri kaydedildi.',
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

  function openMediaPicker(target: { type: 'cover' } | { type: 'section'; rowId: string }) {
    setMediaTarget(target)
    setShowMediaPicker(true)
  }

  function handleMediaPick(url: string) {
    if (mediaTarget.type === 'cover') {
      patchPost({
        image: url,
        imagePlacement: normalizeMediaPlacement(selectedPost?.imagePlacement, selectedPost?.imagePosition),
      })
    } else {
      updateSection(mediaTarget.rowId, { image: url, imagePlacement: normalizeMediaPlacement(undefined) })
    }
    setShowMediaPicker(false)
  }

  function openEditor(slug: string) {
    setSelectedSlug(slug)
    setEditorOpen(true)
  }

  function createBlogPost() {
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

  if (loading) {
    return <CmsLoadingState message="Blog CMS yükleniyor..." />
  }

  if (!store) {
    return <CmsErrorState onRetry={() => void loadStore()} />
  }

  return (
    <>
      <AdminLayout
        title="Blog"
        subtitle={`${filteredPosts.length} yazı bulundu`}
        actions={
          <>
            <button onClick={() => void loadStore()} className="cms-btn-secondary h-9 px-3 py-1.5 text-sm">
              <RefreshCw className="h-4 w-4" />
              Yenile
            </button>
            <button
              onClick={() => void saveStore()}
              disabled={saving}
              className="cms-btn-primary h-9 px-3 py-1.5 text-sm disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
            <button onClick={createBlogPost} className="cms-btn-primary h-9 px-3 py-1.5 text-sm">
              <Plus className="h-4 w-4" />
              Yeni Yazı
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
                  placeholder="Yazı ara..."
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
                  <th className="w-[60%] px-4 py-3 text-left font-medium">Başlık</th>
                  <th className="hidden w-[16%] px-4 py-3 text-left font-medium md:table-cell">Kategori</th>
                  <th className="hidden w-[14%] px-4 py-3 text-left font-medium xl:table-cell">Yazar</th>
                  <th className="hidden w-[10%] px-4 py-3 text-left font-medium xl:table-cell">Tarih</th>
                  <th className="w-[120px] px-4 py-3 text-right font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-sm text-muted-foreground">
                      Yazı bulunamadı.
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
                              <img src={adminPreviewUrl(post.image)} alt={post.title} className="h-full w-full object-cover" />
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
                      <td className="hidden px-4 py-3 text-muted-foreground xl:table-cell">{post.author || 'Editör'}</td>
                      <td className="hidden px-4 py-3 text-muted-foreground xl:table-cell">{post.date || '-'}</td>
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
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Blog Yazısı Düzenle</p>
                  <h2 className="text-base font-semibold text-foreground">{selectedPost.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => void saveStore()}
                    disabled={saving}
                    className="cms-btn-primary h-9 px-3 py-1.5 text-sm disabled:opacity-60"
                  >
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
                        <input value={selectedPost.title} onChange={(event) => patchPost({ title: event.target.value })} className="cms-input" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted-foreground">Slug</label>
                        <input value={selectedPost.slug} onChange={(event) => renameSelectedPostSlug(event.target.value)} className="cms-input" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted-foreground">Tarih</label>
                        <input value={selectedPost.date} onChange={(event) => patchPost({ date: event.target.value })} className="cms-input" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted-foreground">Yazar</label>
                        <input value={selectedPost.author} onChange={(event) => patchPost({ author: event.target.value })} className="cms-input" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted-foreground">Kategori</label>
                        <input value={selectedPost.category} onChange={(event) => patchPost({ category: event.target.value })} className="cms-input" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-muted-foreground">Okuma Süresi</label>
                        <input value={selectedPost.readTime} onChange={(event) => patchPost({ readTime: event.target.value })} className="cms-input" />
                      </div>
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
                          <MediaPlacementEditor
                            src={selectedPost.image}
                            value={normalizeMediaPlacement(selectedPost.imagePlacement, selectedPost.imagePosition)}
                            onChange={(nextPlacement) =>
                              patchPost({
                                imagePlacement: nextPlacement,
                                imagePosition: placementToObjectPosition(nextPlacement),
                              })
                            }
                            variants={[
                              { label: 'Blog Kartı (16:9)', aspect: '16 / 9' },
                              { label: 'Blog Detay Hero (16:7)', aspect: '16 / 7' },
                            ]}
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-muted-foreground">Özet</label>
                      <textarea
                        rows={3}
                        value={selectedPost.excerpt}
                        onChange={(event) => patchPost({ excerpt: event.target.value })}
                        className="cms-textarea"
                      />
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
                          <input
                            value={section.title}
                            onChange={(event) => updateSection(section.id, { title: event.target.value })}
                            className="cms-input"
                            placeholder="Başlık"
                          />
                          <textarea
                            rows={5}
                            value={section.content}
                            onChange={(event) => updateSection(section.id, { content: event.target.value })}
                            className="cms-textarea"
                            placeholder="İçerik metni"
                          />
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
                      Bu Yazıyı Sil
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
        title={mediaTarget.type === 'cover' ? 'Kapak Görseli Seç' : 'Bölüm Görseli Seç'}
        onClose={() => setShowMediaPicker(false)}
        onSelect={handleMediaPick}
      />

      <CmsStatusToast error={error} message={message} />
    </>
  )
}
