'use client'

import type { ReferenceItem } from '@/lib/references-store'
import { CmsEditorDrawer } from '@/components/ui/cms-editor-drawer'
import { ReferencesEditorForm } from '@/components/references-editor-form'

type ReferencesEditorDrawerProps = {
  open: boolean
  saving: boolean
  selectedItem: ReferenceItem | null
  onSave: () => void
  onClose: () => void
  onPatchItem: (update: Partial<ReferenceItem>) => void
  onOpenMediaPicker: () => void
  onRequestDelete: () => void
  onError: (message: string | null) => void
  simplified?: boolean
}

export function ReferencesEditorDrawer({
  open,
  saving,
  selectedItem,
  onSave,
  onClose,
  onPatchItem,
  onOpenMediaPicker,
  onRequestDelete,
  onError,
  simplified = false,
}: ReferencesEditorDrawerProps) {
  if (!open || !selectedItem) return null

  return (
    <CmsEditorDrawer
      open={open}
      title={selectedItem.title}
      subtitle="Referans Düzenle"
      saving={saving}
      onSave={onSave}
      onClose={onClose}
    >
      <ReferencesEditorForm
        key={selectedItem.id}
        selectedItem={selectedItem}
        onPatchItem={onPatchItem}
        onOpenMediaPicker={onOpenMediaPicker}
        onRequestDelete={onRequestDelete}
        onError={onError}
        simplified={simplified}
      />
    </CmsEditorDrawer>
  )
}
