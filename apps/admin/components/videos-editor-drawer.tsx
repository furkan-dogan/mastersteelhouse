'use client'

import type { VideoItem, VideosStore } from '@/lib/videos-store'
import { CmsEditorDrawer } from '@/components/ui/cms-editor-drawer'
import { VideosEditorForm } from '@/components/videos-editor-form'

type VideosEditorDrawerProps = {
  open: boolean
  saving: boolean
  store: VideosStore
  selectedItem: VideoItem | null
  onSave: () => void
  onClose: () => void
  onPatchStore: (updater: (prev: VideosStore) => VideosStore) => void
  onPatchItem: (update: Partial<VideoItem>) => void
  onRequestDelete: () => void
}

export function VideosEditorDrawer({
  open,
  saving,
  store,
  selectedItem,
  onSave,
  onClose,
  onPatchStore,
  onPatchItem,
  onRequestDelete,
}: VideosEditorDrawerProps) {
  if (!open || !selectedItem) return null

  return (
    <CmsEditorDrawer
      open={open}
      title={selectedItem.title}
      subtitle="Video Düzenle"
      saving={saving}
      onSave={onSave}
      onClose={onClose}
    >
      <VideosEditorForm
        store={store}
        selectedItem={selectedItem}
        onPatchStore={onPatchStore}
        onPatchItem={onPatchItem}
        onRequestDelete={onRequestDelete}
      />
    </CmsEditorDrawer>
  )
}
