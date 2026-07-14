'use client'

import { useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ImageUp } from 'lucide-react'
import imageCompression from 'browser-image-compression'

const COMPRESS_THRESHOLD_MB = 3
const COMPRESS_OPTIONS = {
  maxSizeMB: 3,
  maxWidthOrHeight: 3200,
  useWebWorker: true,
  fileType: 'image/webp' as const,
  initialQuality: 0.9,
}

async function compressIfNeeded(file: File): Promise<File> {
  if (!file.type.startsWith('image/') || file.type === 'image/gif') return file
  if (file.size <= COMPRESS_THRESHOLD_MB * 1024 * 1024) return file
  try {
    return await imageCompression(file, COMPRESS_OPTIONS)
  } catch {
    return file
  }
}

type UploadResponse = {
  items?: Array<{ url: string }>
  message?: string
  code?: string
}

type PendingLowResolutionUpload = {
  files: File[]
  message: string
}

type Props = {
  endpoint?: string
  multiple?: boolean
  compact?: boolean
  helperText?: string
  galleryButtonLabel?: string
  accept?: string
  minimumLongEdge?: number
  onUploaded: (urls: string[]) => void
  onPickFromMedia: () => void
  onError?: (message: string) => void
}

export function MediaUploadDropzone({
  multiple = false,
  compact = false,
  helperText = 'PNG, JPG, GIF, WEBP, HEIC (maks. 20MB)',
  galleryButtonLabel = 'Galeriden seç',
  accept = 'image/*,.heic,.heif',
  minimumLongEdge,
  onUploaded,
  onPickFromMedia,
  onError,
  endpoint,
}: Props) {
  const pathname = usePathname()
  const resolvedEndpoint = endpoint ?? (pathname.startsWith('/profil-cms') ? '/api/profile/media' : '/api/media')

  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [compressing, setCompressing] = useState(false)
  const [pendingLowResolution, setPendingLowResolution] = useState<PendingLowResolutionUpload | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  async function postFiles(files: File[], allowLowResolution = false) {
    const formData = new FormData()
    if (minimumLongEdge) formData.set('minimumLongEdge', String(minimumLongEdge))
    if (allowLowResolution) formData.set('allowLowResolution', 'true')
    for (const file of files) formData.append('files', file)

    const response = await fetch(resolvedEndpoint, { method: 'POST', body: formData })
    const text = await response.text()
    let data: UploadResponse = {}
    try { data = JSON.parse(text) as UploadResponse } catch { /* non-JSON response */ }

    if (!response.ok) {
      if (response.status === 409 && data.code === 'LOW_RESOLUTION') {
        return { urls: [] as string[], lowResolutionMessage: data.message ?? 'Görsel çözünürlüğü önerilen değerin altında.' }
      }
      const message = data.message ?? (response.status === 413 ? 'Dosya çok büyük, lütfen daha küçük bir görsel deneyin.' : 'Dosya yüklenemedi.')
      throw new Error(message)
    }

    return {
      urls: (data.items ?? []).map((item) => item.url).filter(Boolean),
      lowResolutionMessage: null,
    }
  }

  async function uploadFiles(files: FileList | File[]) {
    const list = Array.from(files)
    if (list.length === 0) return

    const hasLargeImage = list.some(
      (f) => f.type.startsWith('image/') && f.type !== 'image/gif' && f.size > COMPRESS_THRESHOLD_MB * 1024 * 1024
    )

    if (hasLargeImage) setCompressing(true)
    const compressed = await Promise.all(list.map(compressIfNeeded))
    setCompressing(false)

    try {
      setUploading(true)
      setPendingLowResolution(null)
      const urls: string[] = []

      for (let index = 0; index < compressed.length; index += 1) {
        const result = await postFiles([compressed[index]])
        if (result.lowResolutionMessage) {
          setPendingLowResolution({
            files: compressed.slice(index),
            message: result.lowResolutionMessage,
          })
          break
        }
        urls.push(...result.urls)
      }

      if (urls.length > 0) {
        onUploaded(urls)
      }
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Dosya yüklenemedi.')
    } finally {
      setUploading(false)
    }
  }

  async function approveLowResolutionUpload() {
    if (!pendingLowResolution) return

    try {
      setUploading(true)
      const result = await postFiles(pendingLowResolution.files, true)
      if (result.urls.length > 0) onUploaded(result.urls)
      setPendingLowResolution(null)
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
          {compressing ? 'Görsel optimize ediliyor...' : uploading ? 'Yükleniyor...' : 'Tıklayın veya sürükleyip bırakın'}
        </p>
        <p className={`${compact ? 'mt-0.5' : 'mt-1'} text-xs text-muted-foreground`}>
          {multiple ? 'Birden fazla görsel yükleyebilirsiniz' : helperText}
        </p>
        {multiple && !compact && <p className="text-xs text-muted-foreground">{helperText}</p>}
      </div>

      {pendingLowResolution && (
        <div className="rounded-lg border border-warning/40 bg-warning/10 p-3 text-left">
          <p className="text-sm font-medium text-foreground">Düşük çözünürlük uyarısı</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{pendingLowResolution.message}</p>
          <p className="mt-1 text-xs text-muted-foreground">Kaynak görsel büyütülmeden, mevcut kalitesi korunarak yüklenebilir.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => void approveLowResolutionUpload()} disabled={uploading} className="cms-btn-primary h-8 px-3 py-1 text-xs disabled:opacity-60">
              Yine de yükle
            </button>
            <button type="button" onClick={() => setPendingLowResolution(null)} disabled={uploading} className="cms-btn-secondary h-8 px-3 py-1 text-xs disabled:opacity-60">
              Farklı görsel seç
            </button>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={accept}
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
