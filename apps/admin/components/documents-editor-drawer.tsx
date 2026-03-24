'use client'

import type { RefObject } from 'react'
import type { DocumentItem } from '@/lib/documents-store'
import { CmsEditorDrawer } from '@/components/ui/cms-editor-drawer'
import { DocumentsEditorForm } from '@/components/documents-editor-form'

type DocumentsEditorDrawerProps = {
  open: boolean
  saving: boolean
  selectedItem: DocumentItem | null
  uploadingFile: boolean
  fileInputRef: RefObject<HTMLInputElement | null>
  onSave: () => void
  onClose: () => void
  onPatchItem: (update: Partial<DocumentItem>) => void
  onUploadFile: (files: FileList | File[]) => Promise<void>
  onOpenMediaPicker: () => void
  onRequestDelete: () => void
}

export function DocumentsEditorDrawer({
  open,
  saving,
  selectedItem,
  uploadingFile,
  fileInputRef,
  onSave,
  onClose,
  onPatchItem,
  onUploadFile,
  onOpenMediaPicker,
  onRequestDelete,
}: DocumentsEditorDrawerProps) {
  if (!open || !selectedItem) return null

  return (
    <CmsEditorDrawer
      open={open}
      title={selectedItem.title}
      subtitle="Belge Düzenle"
      saving={saving}
      onSave={onSave}
      onClose={onClose}
    >
      <DocumentsEditorForm
        selectedItem={selectedItem}
        uploadingFile={uploadingFile}
        fileInputRef={fileInputRef}
        onPatchItem={onPatchItem}
        onUploadFile={onUploadFile}
        onOpenMediaPicker={onOpenMediaPicker}
        onRequestDelete={onRequestDelete}
      />
    </CmsEditorDrawer>
  )
}
