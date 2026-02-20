'use client'

import type { ReferenceItem } from '@/lib/references-store'
import { adminPreviewUrl } from '@/lib/media-preview-url'
import { MediaUploadDropzone } from '@/components/media-upload-dropzone'

function splitByComma(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

type ReferencesEditorFormProps = {
  selectedItem: ReferenceItem
  onPatchItem: (update: Partial<ReferenceItem>) => void
  onOpenMediaPicker: () => void
  onRequestDelete: () => void
  onError: (message: string | null) => void
}

export function ReferencesEditorForm({
  selectedItem,
  onPatchItem,
  onOpenMediaPicker,
  onRequestDelete,
  onError,
}: ReferencesEditorFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-xs font-medium text-muted-foreground">Başlık</label>
        <input value={selectedItem.title} onChange={(e) => onPatchItem({ title: e.target.value })} className="cms-input" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Konum</label>
          <input value={selectedItem.location} onChange={(e) => onPatchItem({ location: e.target.value })} className="cms-input" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Alan / Ölçek</label>
          <input value={selectedItem.area ?? ''} onChange={(e) => onPatchItem({ area: e.target.value })} className="cms-input" />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-muted-foreground">Kategoriler (virgülle)</label>
        <input
          value={selectedItem.categories.join(', ')}
          onChange={(e) => onPatchItem({ categories: splitByComma(e.target.value) })}
          className="cms-input"
        />
      </div>
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="block text-xs font-medium text-muted-foreground">Görsel</label>
          {selectedItem.image && (
            <button onClick={() => onPatchItem({ image: '' })} className="cms-btn-ghost h-7 px-2 py-1 text-xs text-error">
              Kaldır
            </button>
          )}
        </div>
        <MediaUploadDropzone
          onUploaded={(urls) => {
            const nextUrl = urls[0]
            if (!nextUrl) return
            onPatchItem({ image: nextUrl })
          }}
          onPickFromMedia={onOpenMediaPicker}
          onError={onError}
        />
        {selectedItem.image && (
          <div className="mt-3 max-w-[560px] overflow-hidden rounded-2xl border bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={adminPreviewUrl(selectedItem.image)} alt="Referans görsel" className="aspect-[4/3] w-full object-cover" />
          </div>
        )}
      </div>

      <div className="border-t pt-4">
        <button onClick={onRequestDelete} className="cms-btn-ghost h-9 px-3 py-1.5 text-sm text-error">
          Bu Referansı Sil
        </button>
      </div>
    </div>
  )
}
