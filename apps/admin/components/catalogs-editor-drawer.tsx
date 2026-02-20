'use client'

import type { RefObject } from 'react'
import type { CatalogItem, CatalogsStore } from '@/lib/catalogs-store'
import { CmsEditorDrawer } from '@/components/ui/cms-editor-drawer'
import { CatalogsEditorForm } from '@/components/catalogs-editor-form'

type CatalogsEditorDrawerProps = {
  open: boolean
  saving: boolean
  store: CatalogsStore
  selectedItem: CatalogItem | null
  uploadingPdf: boolean
  fileInputRef: RefObject<HTMLInputElement | null>
  onSave: () => void
  onClose: () => void
  onPatchStore: (update: Partial<CatalogsStore>) => void
  onPatchItem: (update: Partial<CatalogItem>) => void
  onUploadPdf: (files: FileList | File[]) => Promise<void>
  onOpenMediaPicker: () => void
  onRequestDelete: () => void
}

export function CatalogsEditorDrawer({
  open,
  saving,
  store,
  selectedItem,
  uploadingPdf,
  fileInputRef,
  onSave,
  onClose,
  onPatchStore,
  onPatchItem,
  onUploadPdf,
  onOpenMediaPicker,
  onRequestDelete,
}: CatalogsEditorDrawerProps) {
  if (!open || !selectedItem) return null

  return (
    <CmsEditorDrawer
      open={open}
      title={selectedItem.title}
      subtitle="Katalog Düzenle"
      saving={saving}
      onSave={onSave}
      onClose={onClose}
    >
      <CatalogsEditorForm
        store={store}
        selectedItem={selectedItem}
        uploadingPdf={uploadingPdf}
        fileInputRef={fileInputRef}
        onPatchStore={onPatchStore}
        onPatchItem={onPatchItem}
        onUploadPdf={onUploadPdf}
        onOpenMediaPicker={onOpenMediaPicker}
        onRequestDelete={onRequestDelete}
      />
    </CmsEditorDrawer>
  )
}
