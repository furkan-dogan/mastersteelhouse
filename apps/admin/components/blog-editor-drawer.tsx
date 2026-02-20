'use client'

import type { BlogPost } from '@/lib/blog-store'
import type { CmsSectionRow } from '@/lib/use-posts-cms'
import { CmsEditorDrawer } from '@/components/ui/cms-editor-drawer'
import { BlogPostEditorForm } from '@/components/blog-post-editor-form'

type BlogEditorDrawerProps = {
  open: boolean
  saving: boolean
  selectedPost: BlogPost | null
  sections: CmsSectionRow[]
  onSave: () => void
  onClose: () => void
  onPatchPost: (update: Partial<BlogPost>) => void
  onRenameSlug: (nextSlug: string) => void
  onAddSection: () => void
  onRemoveSection: (sectionId: string) => void
  onUpdateSection: (sectionId: string, patch: Partial<CmsSectionRow>) => void
  onOpenCoverPicker: () => void
  onOpenSectionPicker: (sectionId: string) => void
  onRequestDelete: () => void
  onError: (message: string | null) => void
}

export function BlogEditorDrawer({
  open,
  saving,
  selectedPost,
  sections,
  onSave,
  onClose,
  onPatchPost,
  onRenameSlug,
  onAddSection,
  onRemoveSection,
  onUpdateSection,
  onOpenCoverPicker,
  onOpenSectionPicker,
  onRequestDelete,
  onError,
}: BlogEditorDrawerProps) {
  if (!open || !selectedPost) return null

  return (
    <CmsEditorDrawer
      open={open}
      title={selectedPost.title}
      subtitle="Blog Yazısı Düzenle"
      saving={saving}
      onSave={onSave}
      onClose={onClose}
    >
      <BlogPostEditorForm
        selectedPost={selectedPost}
        sections={sections}
        onPatchPost={onPatchPost}
        onRenameSlug={onRenameSlug}
        onAddSection={onAddSection}
        onRemoveSection={onRemoveSection}
        onUpdateSection={onUpdateSection}
        onOpenCoverPicker={onOpenCoverPicker}
        onOpenSectionPicker={onOpenSectionPicker}
        onRequestDelete={onRequestDelete}
        onError={onError}
      />
    </CmsEditorDrawer>
  )
}
