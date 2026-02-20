'use client'

import type { RefObject } from 'react'
import { ExternalLink, FileText } from 'lucide-react'
import type { CatalogsStore, CatalogItem } from '@/lib/catalogs-store'
import { adminPreviewUrl } from '@/lib/media-preview-url'

type CatalogsEditorFormProps = {
  store: CatalogsStore
  selectedItem: CatalogItem
  uploadingPdf: boolean
  fileInputRef: RefObject<HTMLInputElement | null>
  onPatchStore: (update: Partial<CatalogsStore>) => void
  onPatchItem: (update: Partial<CatalogItem>) => void
  onUploadPdf: (files: FileList | File[]) => Promise<void>
  onOpenMediaPicker: () => void
  onRequestDelete: () => void
}

export function CatalogsEditorForm({
  store,
  selectedItem,
  uploadingPdf,
  fileInputRef,
  onPatchStore,
  onPatchItem,
  onUploadPdf,
  onOpenMediaPicker,
  onRequestDelete,
}: CatalogsEditorFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sayfa Ayarları</h3>
        <input value={store.hero.title} onChange={(e) => onPatchStore({ hero: { ...store.hero, title: e.target.value } })} className="cms-input" placeholder="Başlık" />
        <textarea value={store.hero.description} onChange={(e) => onPatchStore({ hero: { ...store.hero, description: e.target.value } })} rows={2} className="cms-textarea" placeholder="Açıklama" />
      </div>

      <div className="space-y-4 border-t pt-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Katalog Detayı</h3>
        <input value={selectedItem.title} onChange={(e) => onPatchItem({ title: e.target.value })} className="cms-input" placeholder="Katalog adı" />

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">PDF Dosyası</label>
          <div className="rounded-xl border-2 border-dashed border-border bg-muted/20 p-4 text-center" onDragOver={(event) => event.preventDefault()} onDrop={(event) => {
            event.preventDefault()
            if (event.dataTransfer.files?.length) {
              void onUploadPdf(event.dataTransfer.files)
            }
          }}>
            <FileText className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
            <p className="text-sm font-medium">{uploadingPdf ? 'PDF yükleniyor...' : 'PDF sürükleyip bırak veya seç'}</p>
            <div className="mt-3 flex justify-center gap-2">
              <button type="button" onClick={() => fileInputRef.current?.click()} className="cms-btn-secondary h-9 px-3 py-1.5 text-sm">Bilgisayardan Seç</button>
              <button type="button" onClick={onOpenMediaPicker} className="cms-btn-ghost h-9 px-3 py-1.5 text-sm">Medyadan Seç</button>
            </div>
            <input ref={fileInputRef} type="file" accept="application/pdf" className="hidden" onChange={(event) => {
              if (event.target.files) void onUploadPdf(event.target.files)
              event.currentTarget.value = ''
            }} />
          </div>

          {selectedItem.pdfUrl ? (
            <div className="overflow-hidden rounded-xl border bg-card">
              <iframe src={`${adminPreviewUrl(selectedItem.pdfUrl)}#toolbar=0&navpanes=0&page=1`} title={`${selectedItem.title} önizleme`} className="h-72 w-full" />
              <div className="flex items-center justify-between border-t px-3 py-2 text-xs">
                <span className="truncate text-muted-foreground">{selectedItem.pdfUrl}</span>
                <a href={adminPreviewUrl(selectedItem.pdfUrl)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary">
                  Aç
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">Henüz PDF seçilmedi.</p>
          )}
        </div>
      </div>

      <div className="border-t pt-4">
        <button onClick={onRequestDelete} className="cms-btn-ghost h-9 px-3 py-1.5 text-sm text-error">
          Bu Kataloğu Sil
        </button>
      </div>
    </div>
  )
}
