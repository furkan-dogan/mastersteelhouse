'use client'

import { useMemo, useState } from 'react'
import type { BlogPost, BlogStore } from '@/lib/blog-store'
import { MediaPickerModal } from '@/components/media-picker-modal'
import { adminPreviewUrl } from '@/lib/media-preview-url'
import { AdminLayout } from '@/components/admin-layout'
import { CmsErrorState, CmsLoadingState } from '@/components/cms-screen-state'
import { CmsStatusToast } from '@/components/cms-shared'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { CmsRowActions } from '@/components/ui/cms-row-actions'
import { CmsEditorDrawer } from '@/components/ui/cms-editor-drawer'
import { CmsPageActions } from '@/components/ui/cms-page-actions'
import { CmsListToolbar } from '@/components/ui/cms-list-toolbar'
import { TablePagination } from '@/components/ui/table'
import { BlogPostEditorForm } from '@/components/blog-post-editor-form'
import { usePostsCms } from '@/lib/use-posts-cms'
import { normalizeMediaPlacement } from '@/lib/media-placement'
import { useConfirmDelete } from '@/lib/use-confirm-delete'
import { usePagination } from '@/lib/use-pagination'

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
                  pagedItems.map((post) => (
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
          <TablePagination
            page={page}
            totalPages={totalPages}
            totalItems={filteredPosts.length}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </section>
      </AdminLayout>

      {editorOpen && selectedPost && (
        <CmsEditorDrawer
          open={editorOpen}
          title={selectedPost.title}
          subtitle="Blog Yazısı Düzenle"
          saving={saving}
          onSave={() => void saveStore()}
          onClose={() => setEditorOpen(false)}
        >
          <BlogPostEditorForm
            selectedPost={selectedPost}
            sections={sections}
            onPatchPost={patchPost}
            onRenameSlug={renameSelectedPostSlug}
            onAddSection={addSection}
            onRemoveSection={removeSection}
            onUpdateSection={updateSection}
            onOpenCoverPicker={() => openMediaPicker({ type: 'cover' })}
            onOpenSectionPicker={(sectionId) => openMediaPicker({ type: 'section', rowId: sectionId })}
            onRequestDelete={() => requestDelete(selectedPost.slug, selectedPost.title)}
            onError={setError}
          />
        </CmsEditorDrawer>
      )}

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
