'use client'

import { useMemo, useState } from 'react'
import type { NewsPost, NewsStore } from '@/lib/news-store'
import { MediaPickerModal } from '@/components/media-picker-modal'
import { AdminLayout } from '@/components/admin-layout'
import { CmsErrorState, CmsLoadingState } from '@/components/cms-screen-state'
import { CmsStatusToast } from '@/components/cms-shared'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { CmsPageActions } from '@/components/ui/cms-page-actions'
import { CmsListToolbar } from '@/components/ui/cms-list-toolbar'
import { usePostsCms } from '@/lib/use-posts-cms'
import { normalizeMediaPlacement } from '@/lib/media-placement'
import { useConfirmDelete } from '@/lib/use-confirm-delete'
import { usePagination } from '@/lib/use-pagination'
import { NewsCmsTable } from '@/components/news-cms-table'
import { NewsEditorDrawer } from '@/components/news-editor-drawer'

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

  const { page, totalPages, pagedItems, setPage, resetPage, pageSize } = usePagination(filteredPosts, 10)

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

  function toggleFeatured(slug: string) {
    if (!store) return
    setStore({
      ...store,
      posts: store.posts.map((item) => (item.slug === slug ? { ...item, featured: !item.featured } : item)),
    })
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

  const { deleteTarget, requestDelete, closeDeleteDialog, confirmDelete } = useConfirmDelete<string>(deleteBySlug)

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
          <CmsPageActions
            saving={saving}
            createLabel="Yeni Haber"
            onRefresh={() => void loadStore()}
            onSave={() => void saveStore()}
            onCreate={createNews}
          />
        }
      >
        <section className="cms-card overflow-hidden">
          <CmsListToolbar
            searchValue={search}
            searchPlaceholder="Haber ara..."
            onSearchChange={(value) => {
              setSearch(value)
              resetPage()
            }}
            filterValue={categoryFilter}
            onFilterChange={(value) => {
              setCategoryFilter(value)
              resetPage()
            }}
            filterOptions={[
              { value: 'all', label: 'Tüm Kategoriler' },
              ...categories.map((category) => ({ value: category, label: category })),
            ]}
          />

          <NewsCmsTable
            filteredPosts={filteredPosts}
            pagedItems={pagedItems}
            page={page}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPage}
            onOpenEditor={openEditor}
            onRequestDelete={requestDelete}
            onToggleFeatured={toggleFeatured}
          />
        </section>
      </AdminLayout>

      <NewsEditorDrawer
        open={editorOpen}
        saving={saving}
        selectedPost={selectedPost}
        sections={sections}
        onSave={() => void saveStore()}
        onClose={() => setEditorOpen(false)}
        onPatchPost={patchPost}
        onRenameSlug={renameSelectedPostSlug}
        onAddSection={addSection}
        onRemoveSection={removeSection}
        onUpdateSection={updateSection}
        onOpenCoverPicker={() => openMediaPicker({ type: 'cover' })}
        onOpenGalleryPicker={() => openMediaPicker({ type: 'gallery' })}
        onOpenSectionPicker={(sectionId) => openMediaPicker({ type: 'section', rowId: sectionId })}
        onRemoveGalleryImage={removeGalleryImage}
        onRequestDelete={() => {
          if (!selectedPost) return
          requestDelete(selectedPost.slug, selectedPost.title)
        }}
        onError={setError}
      />

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
            <span className="font-medium text-foreground">{deleteTarget?.label}</span> adlı haberi kalıcı olarak silmek istediğinize emin misiniz?
          </>
        }
        confirmLabel="Haberi Sil"
        cancelLabel="Vazgeç"
        onCancel={closeDeleteDialog}
        onConfirm={confirmDelete}
      />

      <CmsStatusToast error={error} message={message} />
    </>
  )
}
