'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import type { ReferenceItem } from '@/lib/references-store'
import { adminPreviewUrl } from '@/lib/media-preview-url'
import { MediaUploadDropzone } from '@/components/media-upload-dropzone'

function normalizeCategory(value: string) {
  return value.trim().replace(/\s+/g, ' ')
}

type ReferencesEditorFormProps = {
  selectedItem: ReferenceItem
  onPatchItem: (update: Partial<ReferenceItem>) => void
  onOpenMediaPicker: () => void
  onRequestDelete: () => void
  onError: (message: string | null) => void
  simplified?: boolean
}

export function ReferencesEditorForm({
  selectedItem,
  onPatchItem,
  onOpenMediaPicker,
  onRequestDelete,
  onError,
  simplified = false,
}: ReferencesEditorFormProps) {
  const [categoryInput, setCategoryInput] = useState('')

  function addCategory(rawValue: string) {
    const value = normalizeCategory(rawValue.replace(/,+$/, ''))
    if (!value) return

    const exists = selectedItem.categories.some((item) => item.toLowerCase() === value.toLowerCase())
    if (exists) return

    onPatchItem({ categories: [...selectedItem.categories, value] })
  }

  function removeCategory(category: string) {
    onPatchItem({ categories: selectedItem.categories.filter((item) => item !== category) })
  }

  function addPendingCategory() {
    addCategory(categoryInput)
    setCategoryInput('')
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-xs font-medium text-muted-foreground">Firma Adı</label>
        <input value={selectedItem.title} onChange={(e) => onPatchItem({ title: e.target.value })} className="cms-input" />
      </div>

      {!simplified ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Konum</label>
              <input value={selectedItem.location} onChange={(e) => onPatchItem({ location: e.target.value })} className="cms-input" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Adet</label>
              <input value={selectedItem.area ?? ''} onChange={(e) => onPatchItem({ area: e.target.value })} className="cms-input" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Kategoriler (Enter veya virgül ile ekle)</label>
            <div className="rounded-xl border border-border bg-background px-3 py-2">
              <div className="flex flex-wrap items-center gap-2">
                {selectedItem.categories.map((category) => (
                  <span key={category} className="inline-flex items-center gap-1 rounded-full bg-emerald-700 px-2.5 py-1 text-xs font-medium text-white">
                    {category}
                    <button
                      type="button"
                      onClick={() => removeCategory(category)}
                      className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/15 text-white/90 hover:bg-white/25 hover:text-white"
                      aria-label={`${category} kategorisini kaldır`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}

                <input
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  onBlur={addPendingCategory}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ',') {
                      e.preventDefault()
                      addPendingCategory()
                      return
                    }

                    if (e.key === 'Backspace' && !categoryInput.trim() && selectedItem.categories.length > 0) {
                      removeCategory(selectedItem.categories[selectedItem.categories.length - 1] ?? '')
                    }
                  }}
                  placeholder={selectedItem.categories.length > 0 ? 'Başka bir kategori ekle' : 'Kategori yaz ve Enter bas'}
                  className="min-w-[200px] flex-1 bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>
          </div>
        </>
      ) : null}

      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="block text-xs font-medium text-muted-foreground">Logo</label>
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
            <img src={adminPreviewUrl(selectedItem.image)} alt="Referans logosu" className="aspect-[4/3] w-full object-cover" />
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
