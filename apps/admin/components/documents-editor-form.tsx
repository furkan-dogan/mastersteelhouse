'use client'

import type { RefObject } from 'react'
import { ExternalLink, FileText } from 'lucide-react'
import type { DocumentItem } from '@/lib/documents-store'
import { adminPreviewUrl } from '@/lib/media-preview-url'

function isPdfUrl(url: string) {
  const value = url.split('?')[0].toLowerCase()
  return value.endsWith('.pdf')
}

type DocumentsEditorFormProps = {
  selectedItem: DocumentItem
  uploadingFile: boolean
  fileInputRef: RefObject<HTMLInputElement | null>
  onPatchItem: (update: Partial<DocumentItem>) => void
  onUploadFile: (files: FileList | File[]) => Promise<void>
  onOpenMediaPicker: () => void
  onRequestDelete: () => void
}

export function DocumentsEditorForm({
  selectedItem,
  uploadingFile,
  fileInputRef,
  onPatchItem,
  onUploadFile,
  onOpenMediaPicker,
  onRequestDelete,
}: DocumentsEditorFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Belge Detayı</h3>
        <div className="grid gap-3">
          <input value={selectedItem.title} onChange={(e) => onPatchItem({ title: e.target.value })} className="cms-input" placeholder="Belge adı" />
        </div>
        <textarea value={selectedItem.description} onChange={(e) => onPatchItem({ description: e.target.value })} rows={3} className="cms-textarea" placeholder="Belge açıklaması" />

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Dosya (PDF / Görsel)</label>
          <div className="rounded-xl border-2 border-dashed border-border bg-muted/20 p-4 text-center" onDragOver={(event) => event.preventDefault()} onDrop={(event) => {
            event.preventDefault()
            if (event.dataTransfer.files?.length) {
              void onUploadFile(event.dataTransfer.files)
            }
          }}>
            <FileText className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
            <p className="text-sm font-medium">{uploadingFile ? 'Dosya yükleniyor...' : 'PDF veya görsel sürükleyip bırak / seç'}</p>
            <div className="mt-3 flex justify-center gap-2">
              <button type="button" onClick={() => fileInputRef.current?.click()} className="cms-btn-secondary h-9 px-3 py-1.5 text-sm">Bilgisayardan Seç</button>
              <button type="button" onClick={onOpenMediaPicker} className="cms-btn-ghost h-9 px-3 py-1.5 text-sm">Medyadan Seç</button>
            </div>
            <input ref={fileInputRef} type="file" accept="application/pdf,image/*" className="hidden" onChange={(event) => {
              if (event.target.files) void onUploadFile(event.target.files)
              event.currentTarget.value = ''
            }} />
          </div>

          {selectedItem.pdfUrl ? (
            <div className="overflow-hidden rounded-xl border bg-card">
              {isPdfUrl(selectedItem.pdfUrl) ? (
                <iframe src={`${adminPreviewUrl(selectedItem.pdfUrl)}#toolbar=0&navpanes=0&page=1`} title={`${selectedItem.title} önizleme`} className="h-72 w-full" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={adminPreviewUrl(selectedItem.pdfUrl)} alt={`${selectedItem.title} önizleme`} className="h-72 w-full object-cover" />
              )}
              <div className="flex items-center justify-between border-t px-3 py-2 text-xs">
                <span className="truncate text-muted-foreground">{selectedItem.pdfUrl}</span>
                <a href={adminPreviewUrl(selectedItem.pdfUrl)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary">
                  Aç
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">Henüz dosya seçilmedi.</p>
          )}
        </div>
      </div>

      <div className="border-t pt-4">
        <button onClick={onRequestDelete} className="cms-btn-ghost h-9 px-3 py-1.5 text-sm text-error">
          Bu Belgeyi Sil
        </button>
      </div>
    </div>
  )
}
