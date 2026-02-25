'use client'

import type { NewsPost } from '@/lib/news-store'
import type { CmsSectionRow } from '@/lib/use-posts-cms'
import { CmsEditorDrawer } from '@/components/ui/cms-editor-drawer'
import { NewsPostEditorForm } from '@/components/news-post-editor-form'

type NewsEditorDrawerProps = {
  open: boolean
  saving: boolean
  selectedPost: NewsPost | null
  sections: CmsSectionRow[]
  onSave: () => void
  onClose: () => void
  onPatchPost: (update: Partial<NewsPost>) => void
  onRenameSlug: (nextSlug: string) => void
  allowSlugEdit?: boolean
  showDateField?: boolean
  showLocationField?: boolean
  showAuthorField?: boolean
  showReadTimeField?: boolean
  onAddSection: () => void
  onRemoveSection: (sectionId: string) => void
  onUpdateSection: (sectionId: string, patch: Partial<CmsSectionRow>) => void
  onOpenCoverPicker: () => void
  onOpenGalleryPicker: () => void
  onOpenSectionPicker: (sectionId: string) => void
  onRemoveGalleryImage: (index: number) => void
  onRequestDelete: () => void
  onError: (message: string | null) => void
}

export function NewsEditorDrawer({
  open,
  saving,
  selectedPost,
  sections,
  onSave,
  onClose,
  onPatchPost,
  onRenameSlug,
  allowSlugEdit = true,
  showDateField = true,
  showLocationField = true,
  showAuthorField = true,
  showReadTimeField = true,
  onAddSection,
  onRemoveSection,
  onUpdateSection,
  onOpenCoverPicker,
  onOpenGalleryPicker,
  onOpenSectionPicker,
  onRemoveGalleryImage,
  onRequestDelete,
  onError,
}: NewsEditorDrawerProps) {
  if (!open || !selectedPost) return null

  return (
    <CmsEditorDrawer
      open={open}
      title={selectedPost.title}
      subtitle="Haber Düzenle"
      saving={saving}
      onSave={onSave}
      onClose={onClose}
    >
      <NewsPostEditorForm
        selectedPost={selectedPost}
        sections={sections}
        onPatchPost={onPatchPost}
        onRenameSlug={onRenameSlug}
        allowSlugEdit={allowSlugEdit}
        showDateField={showDateField}
        showLocationField={showLocationField}
        showAuthorField={showAuthorField}
        showReadTimeField={showReadTimeField}
        onAddSection={onAddSection}
        onRemoveSection={onRemoveSection}
        onUpdateSection={onUpdateSection}
        onOpenCoverPicker={onOpenCoverPicker}
        onOpenGalleryPicker={onOpenGalleryPicker}
        onOpenSectionPicker={onOpenSectionPicker}
        onRemoveGalleryImage={onRemoveGalleryImage}
        onRequestDelete={onRequestDelete}
        onError={onError}
      />
    </CmsEditorDrawer>
  )
}
