'use client'

import { useMemo, useState } from 'react'
import {
  Plus,
  RefreshCw,
  Save,
  Search,
  Star,
  StarOff,
} from 'lucide-react'
import type { NewsPost, NewsStore } from '@/lib/news-store'
import { MediaPickerModal } from '@/components/media-picker-modal'
import { adminPreviewUrl } from '@/lib/media-preview-url'
import { AdminLayout } from '@/components/admin-layout'
import { CmsErrorState, CmsLoadingState } from '@/components/cms-screen-state'
import { CmsStatusToast } from '@/components/cms-shared'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { CmsRowActions } from '@/components/ui/cms-row-actions'
import { CmsEditorDrawer } from '@/components/ui/cms-editor-drawer'
import { NewsPostEditorForm } from '@/components/news-post-editor-form'
import { usePostsCms } from '@/lib/use-posts-cms'
import { normalizeMediaPlacement } from '@/lib/media-placement'

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
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [editorOpen, setEditorOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ slug: string; title: string } | null>(null)
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

  function requestDelete(slug: string, title: string) {
    setDeleteTarget({ slug, title })
  }

  function confirmDelete() {
    if (!deleteTarget) return
    deleteBySlug(deleteTarget.slug)
    setDeleteTarget(null)
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
                        <CmsRowActions
                          onPreview={() => openEditor(post.slug)}
                          onEdit={() => openEditor(post.slug)}
                          onDelete={() => requestDelete(post.slug, post.title)}
                        />
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
        <CmsEditorDrawer
          open={editorOpen}
          title={selectedPost.title}
          subtitle="Haber Düzenle"
          saving={saving}
          onSave={() => void saveStore()}
          onClose={() => setEditorOpen(false)}
        >
          <NewsPostEditorForm
            selectedPost={selectedPost}
            sections={sections}
            onPatchPost={patchPost}
            onRenameSlug={renameSelectedPostSlug}
            onAddSection={addSection}
            onRemoveSection={removeSection}
            onUpdateSection={updateSection}
            onOpenCoverPicker={() => openMediaPicker({ type: 'cover' })}
            onOpenGalleryPicker={() => openMediaPicker({ type: 'gallery' })}
            onOpenSectionPicker={(sectionId) => openMediaPicker({ type: 'section', rowId: sectionId })}
            onRemoveGalleryImage={removeGalleryImage}
            onRequestDelete={() => requestDelete(selectedPost.slug, selectedPost.title)}
            onError={setError}
          />
        </CmsEditorDrawer>
      )}

      <MediaPickerModal
        open={showMediaPicker}
        title={mediaTarget.type === 'cover' ? 'Kapak Görseli Seç' : mediaTarget.type === 'gallery' ? 'Galeriye Medya Ekle' : 'Bölüm Görseli Seç'}
        onClose={() => setShowMediaPicker(false)}
        onSelect={handleMediaPick}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Haber Silinsin mi?"
        description={
          <>
            <span className="font-medium text-foreground">{deleteTarget?.title}</span> adlı haberi kalıcı olarak silmek istediğinize emin misiniz?
          </>
        }
        confirmLabel="Haberi Sil"
        cancelLabel="Vazgeç"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />

      <CmsStatusToast error={error} message={message} />
    </>
  )
}
