'use client'

import type { RefObject } from 'react'
import { ExternalLink, FileText } from 'lucide-react'
import type { DocumentsStore, DocumentItem } from '@/lib/documents-store'
import { adminPreviewUrl } from '@/lib/media-preview-url'

function splitLines(value: string) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function isPdfUrl(url: string) {
  const value = url.split('?')[0].toLowerCase()
  return value.endsWith('.pdf')
}

type DocumentsEditorFormProps = {
  store: DocumentsStore
  selectedItem: DocumentItem
  uploadingFile: boolean
  fileInputRef: RefObject<HTMLInputElement | null>
  onPatchStore: (update: Partial<DocumentsStore>) => void
  onPatchItem: (update: Partial<DocumentItem>) => void
  onUploadFile: (files: FileList | File[]) => Promise<void>
  onOpenMediaPicker: () => void
  onRequestDelete: () => void
}

export function DocumentsEditorForm({
  store,
  selectedItem,
  uploadingFile,
  fileInputRef,
  onPatchStore,
  onPatchItem,
  onUploadFile,
  onOpenMediaPicker,
  onRequestDelete,
}: DocumentsEditorFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sayfa Ayarları</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <input value={store.hero.badge} onChange={(e) => onPatchStore({ hero: { ...store.hero, badge: e.target.value } })} className="cms-input" placeholder="Badge" />
          <input value={store.hero.title} onChange={(e) => onPatchStore({ hero: { ...store.hero, title: e.target.value } })} className="cms-input" placeholder="Başlık" />
          <input value={store.hero.titleAccent} onChange={(e) => onPatchStore({ hero: { ...store.hero, titleAccent: e.target.value } })} className="cms-input" placeholder="Vurgulu Başlık" />
        </div>
        <textarea value={store.hero.description} onChange={(e) => onPatchStore({ hero: { ...store.hero, description: e.target.value } })} rows={3} className="cms-textarea" placeholder="Açıklama" />
      </div>

      <div className="space-y-4 border-t pt-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Belge Detayı</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <input value={selectedItem.title} onChange={(e) => onPatchItem({ title: e.target.value })} className="cms-input" placeholder="Belge adı" />
          <input value={selectedItem.subtitle} onChange={(e) => onPatchItem({ subtitle: e.target.value })} className="cms-input" placeholder="Alt başlık" />
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

      <div className="space-y-3 border-t pt-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Alt Bilgi</h3>
        <textarea value={store.features.join('\n')} onChange={(e) => onPatchStore({ features: splitLines(e.target.value) })} rows={6} className="cms-textarea" placeholder="Özellikler (satır satır)" />
        <textarea value={store.footerNote} onChange={(e) => onPatchStore({ footerNote: e.target.value })} rows={2} className="cms-textarea" placeholder="Alt not" />
      </div>

      <div className="border-t pt-4">
        <button onClick={onRequestDelete} className="cms-btn-ghost h-9 px-3 py-1.5 text-sm text-error">
          Bu Belgeyi Sil
        </button>
      </div>
    </div>
  )
}
