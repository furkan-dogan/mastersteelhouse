'use client'

import { useRef, useState } from 'react'
import { ImageUp } from 'lucide-react'

type UploadResponse = {
  items?: Array<{ url: string }>
  message?: string
}

type Props = {
  multiple?: boolean
  compact?: boolean
  helperText?: string
  galleryButtonLabel?: string
  onUploaded: (urls: string[]) => void
  onPickFromMedia: () => void
  onError?: (message: string) => void
}

export function MediaUploadDropzone({
  multiple = false,
  compact = false,
  helperText = 'PNG, JPG, GIF, WEBP (maks. 20MB)',
  galleryButtonLabel = 'Galeriden seç',
  onUploaded,
  onPickFromMedia,
  onError,
}: Props) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  async function uploadFiles(files: FileList | File[]) {
    const list = Array.from(files)
    if (list.length === 0) return

    const formData = new FormData()
    for (const file of list) {
      formData.append('files', file)
    }

    try {
      setUploading(true)
      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      })
      const data = (await response.json()) as UploadResponse
      if (!response.ok) {
        throw new Error(data.message || 'Dosya yüklenemedi.')
      }
      const urls = (data.items ?? []).map((item) => item.url).filter(Boolean)
      if (urls.length > 0) {
        onUploaded(urls)
      }
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Dosya yüklenemedi.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <div
        onDragOver={(event) => {
          event.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(event) => {
          event.preventDefault()
          setDragActive(false)
          if (event.dataTransfer.files?.length) {
            void uploadFiles(event.dataTransfer.files)
          }
        }}
        className={`rounded-xl border-2 border-dashed text-center transition-colors ${
          compact ? 'p-3' : 'p-6'
        } ${dragActive ? 'border-primary bg-primary/5' : 'border-border bg-muted/20'}`}
      >
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`mx-auto mb-2 flex items-center justify-center rounded-full bg-muted ${
            compact ? 'h-10 w-10' : 'h-14 w-14'
          }`}
          aria-label="Dosya seç"
        >
          <ImageUp className={`${compact ? 'h-4 w-4' : 'h-6 w-6'} text-muted-foreground`} />
        </button>
        <p className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-foreground`}>
          {uploading ? 'Yükleniyor...' : 'Tıklayın veya sürükleyip bırakın'}
        </p>
        <p className={`${compact ? 'mt-0.5' : 'mt-1'} text-xs text-muted-foreground`}>
          {multiple ? 'Birden fazla görsel yükleyebilirsiniz' : helperText}
        </p>
        {multiple && !compact && <p className="text-xs text-muted-foreground">{helperText}</p>}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          if (event.target.files) {
            void uploadFiles(event.target.files)
          }
          event.currentTarget.value = ''
        }}
      />

      <button type="button" onClick={onPickFromMedia} className="cms-btn-secondary h-9 px-3 py-1.5 text-sm">
        {galleryButtonLabel}
      </button>
    </div>
  )
}
