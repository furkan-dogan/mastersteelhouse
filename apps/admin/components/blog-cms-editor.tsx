'use client'

import { useMemo, useState } from 'react'
import type { BlogPost, BlogStore } from '@/lib/blog-store'
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
import { BlogCmsTable } from '@/components/blog-cms-table'
import { BlogEditorDrawer } from '@/components/blog-editor-drawer'

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

  const { page, totalPages, pagedItems, setPage, resetPage, pageSize } = usePagination(filteredPosts, 10)

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

  const { deleteTarget, requestDelete, closeDeleteDialog, confirmDelete } = useConfirmDelete<string>(deleteBySlug)

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
          <CmsPageActions
            saving={saving}
            createLabel="Yeni Yazı"
            onRefresh={() => void loadStore()}
            onSave={() => void saveStore()}
            onCreate={createBlogPost}
          />
        }
      >
        <section className="cms-card overflow-hidden">
          <CmsListToolbar
            searchValue={search}
            searchPlaceholder="Yazı ara..."
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

          <BlogCmsTable
            filteredPosts={filteredPosts}
            pagedItems={pagedItems}
            page={page}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPage}
            onOpenEditor={openEditor}
            onRequestDelete={requestDelete}
          />
        </section>
      </AdminLayout>

      <BlogEditorDrawer
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
        onOpenSectionPicker={(sectionId) => openMediaPicker({ type: 'section', rowId: sectionId })}
        onRequestDelete={() => {
          if (!selectedPost) return
          requestDelete(selectedPost.slug, selectedPost.title)
        }}
        onError={setError}
      />

      <MediaPickerModal
        open={showMediaPicker}
        title={mediaTarget.type === 'cover' ? 'Kapak Görseli Seç' : 'Bölüm Görseli Seç'}
        onClose={() => setShowMediaPicker(false)}
        onSelect={handleMediaPick}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Yazı Silinsin mi?"
        description={
          <>
            <span className="font-medium text-foreground">{deleteTarget?.label}</span> adlı blog yazısını kalıcı olarak silmek istediğinize emin misiniz?
          </>
        }
        confirmLabel="Yazıyı Sil"
        cancelLabel="Vazgeç"
        onCancel={closeDeleteDialog}
        onConfirm={confirmDelete}
      />

      <CmsStatusToast error={error} message={message} />
    </>
  )
}
