'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import type { NewsPost, NewsSection } from '@/lib/news-store'
import { adminPreviewUrl } from '@/lib/media-preview-url'
import { MediaUploadDropzone } from '@/components/media-upload-dropzone'
import { MediaPlacementEditor } from '@/components/media-placement-editor'
import { normalizeMediaPlacement, placementToObjectPosition } from '@/lib/media-placement'

type NewsPostEditorFormProps = {
  selectedPost: NewsPost
  sections: NewsSection[]
  onPatchPost: (update: Partial<NewsPost>) => void
  onRenameSlug: (value: string) => void
  onAddSection: () => void
  onRemoveSection: (sectionId: string) => void
  onUpdateSection: (sectionId: string, patch: Partial<NewsSection>) => void
  onOpenCoverPicker: () => void
  onOpenGalleryPicker: () => void
  onOpenSectionPicker: (sectionId: string) => void
  onRemoveGalleryImage: (index: number) => void
  onRequestDelete: () => void
  onError: (message: string | null) => void
}

export function NewsPostEditorForm({
  selectedPost,
  sections,
  onPatchPost,
  onRenameSlug,
  onAddSection,
  onRemoveSection,
  onUpdateSection,
  onOpenCoverPicker,
  onOpenGalleryPicker,
  onOpenSectionPicker,
  onRemoveGalleryImage,
  onRequestDelete,
  onError,
}: NewsPostEditorFormProps) {
  const [coverPlacementMode, setCoverPlacementMode] = useState<'card' | 'hero'>('card')

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Temel Bilgiler</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Başlık</label>
            <input value={selectedPost.title} onChange={(e) => onPatchPost({ title: e.target.value })} className="cms-input" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Slug</label>
            <input value={selectedPost.slug} onChange={(event) => onRenameSlug(event.target.value)} className="cms-input" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Tarih</label>
            <input value={selectedPost.date} onChange={(e) => onPatchPost({ date: e.target.value })} className="cms-input" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Konum</label>
            <input value={selectedPost.location} onChange={(e) => onPatchPost({ location: e.target.value })} className="cms-input" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Yazar</label>
            <input value={selectedPost.author} onChange={(e) => onPatchPost({ author: e.target.value })} className="cms-input" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Kategori</label>
            <input value={selectedPost.category} onChange={(e) => onPatchPost({ category: e.target.value })} className="cms-input" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Okuma Süresi</label>
            <input value={selectedPost.readTime} onChange={(e) => onPatchPost({ readTime: e.target.value })} className="cms-input" />
          </div>
          <label className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={selectedPost.featured}
              onChange={(event) => onPatchPost({ featured: event.target.checked })}
            />
            Öne Çıkan Haber
          </label>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-xs font-medium text-muted-foreground">Kapak Görseli</label>
            {selectedPost.image && (
              <button onClick={() => onPatchPost({ image: '' })} className="cms-btn-ghost h-7 px-2 py-1 text-xs text-error">
                Kaldır
              </button>
            )}
          </div>
          <MediaUploadDropzone
            onUploaded={(urls) => {
              const nextUrl = urls[0]
              if (!nextUrl) return
              onPatchPost({
                image: nextUrl,
                imagePlacement: normalizeMediaPlacement(selectedPost.imagePlacement, selectedPost.imagePosition),
              })
            }}
            onPickFromMedia={onOpenCoverPicker}
            onError={onError}
          />
          {selectedPost.image && (
            <div className="mt-3">
              <div className="mb-2 inline-flex rounded-lg border bg-card p-1">
                <button
                  type="button"
                  onClick={() => setCoverPlacementMode('card')}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    coverPlacementMode === 'card' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  Haber Kartı
                </button>
                <button
                  type="button"
                  onClick={() => setCoverPlacementMode('hero')}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    coverPlacementMode === 'hero' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  Haber Detay Hero
                </button>
              </div>
              <MediaPlacementEditor
                src={selectedPost.image}
                value={normalizeMediaPlacement(
                  coverPlacementMode === 'card'
                    ? selectedPost.imagePlacementCard ?? selectedPost.imagePlacement
                    : selectedPost.imagePlacementHero ?? selectedPost.imagePlacement,
                  selectedPost.imagePosition
                )}
                onChange={(nextPlacement) => {
                  if (coverPlacementMode === 'card') {
                    onPatchPost({
                      imagePlacementCard: nextPlacement,
                      imagePosition: placementToObjectPosition(nextPlacement),
                    })
                    return
                  }
                  onPatchPost({
                    imagePlacementHero: nextPlacement,
                    imagePosition: placementToObjectPosition(nextPlacement),
                  })
                }}
                variants={
                  coverPlacementMode === 'card'
                    ? [{ label: 'Haber Kartı (16:9)', aspect: '16 / 9' }]
                    : [{ label: 'Haber Detay Hero (16:7)', aspect: '16 / 7' }]
                }
              />
            </div>
          )}
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Özet</label>
          <textarea
            rows={3}
            value={selectedPost.excerpt}
            onChange={(e) => onPatchPost({ excerpt: e.target.value })}
            className="cms-textarea"
          />
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-xs font-medium text-muted-foreground">Galeri Görselleri</label>
          </div>
          <MediaUploadDropzone
            multiple
            helperText="PNG, JPG, GIF, WEBP (maks. 20MB)"
            galleryButtonLabel="Medyadan ekle"
            onUploaded={(urls) => onPatchPost({ gallery: [...(selectedPost.gallery ?? []), ...urls] })}
            onPickFromMedia={onOpenGalleryPicker}
            onError={onError}
          />
          {(selectedPost.gallery ?? []).length > 0 && (
            <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
              {(selectedPost.gallery ?? []).map((img, index) => (
                <div key={`${img}-${index}`} className="overflow-hidden rounded-lg border border-border bg-muted/20">
                  <div className="relative aspect-square">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={adminPreviewUrl(img)} alt={`Galeri ${index + 1}`} className="h-full w-full object-cover" />
                    <button
                      onClick={() => onRemoveGalleryImage(index)}
                      className="absolute right-2 top-2 rounded-md bg-black/55 px-2 py-1 text-xs text-white hover:bg-black/70"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {(selectedPost.gallery ?? []).length === 0 && (
            <p className="text-xs text-muted-foreground">Galeri boş. Medyadan görsel ekleyebilirsin.</p>
          )}
        </div>
      </div>

      <div className="space-y-3 border-t pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">İçerikler (Section)</h3>
          <button onClick={onAddSection} className="cms-btn-ghost h-8 px-2 py-1 text-xs">
            <Plus className="h-3.5 w-3.5" />
            Bölüm Ekle
          </button>
        </div>

        <div className="space-y-3">
          {sections.map((section, index) => (
            <div key={section.id ?? `${section.title}-${index}`} className="space-y-2 rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-muted-foreground">Bölüm {index + 1}</p>
                <button
                  onClick={() => {
                    if (!section.id) return
                    onRemoveSection(section.id)
                  }}
                  className="cms-btn-ghost h-7 px-2 py-1 text-xs text-error"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Sil
                </button>
              </div>

              <input
                value={section.title}
                onChange={(e) => {
                  if (!section.id) return
                  onUpdateSection(section.id, { title: e.target.value })
                }}
                className="cms-input"
                placeholder="Başlık"
              />
              <textarea
                rows={5}
                value={section.content}
                onChange={(e) => {
                  if (!section.id) return
                  onUpdateSection(section.id, { content: e.target.value })
                }}
                className="cms-textarea"
                placeholder="İçerik metni"
              />
              {section.image && section.imagePlacement && (
                <div className="max-h-[140px] max-w-[320px] overflow-hidden rounded-lg border border-border bg-muted/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={adminPreviewUrl(section.image)}
                    alt={`Bölüm ${index + 1} görsel önizleme`}
                    className="h-full w-full object-cover"
                    style={{
                      objectPosition: `${section.imagePlacement.x}% ${section.imagePlacement.y}%`,
                      objectFit: section.imagePlacement.fit,
                      transform: `scale(${section.imagePlacement.zoom / 100})`,
                      transformOrigin: `${section.imagePlacement.x}% ${section.imagePlacement.y}%`,
                    }}
                  />
                </div>
              )}

              <div className="space-y-2">
                <MediaUploadDropzone
                  compact
                  onUploaded={(urls) => {
                    const nextUrl = urls[0]
                    if (!nextUrl || !section.id) return
                    onUpdateSection(section.id, {
                      image: nextUrl,
                      imagePlacement: normalizeMediaPlacement(undefined),
                    })
                  }}
                  onPickFromMedia={() => {
                    if (!section.id) return
                    onOpenSectionPicker(section.id)
                  }}
                  onError={onError}
                />
                {section.image && (
                  <button
                    onClick={() => {
                      if (!section.id) return
                      onUpdateSection(section.id, { image: '' })
                    }}
                    className="cms-btn-ghost h-7 px-2 py-1 text-xs text-error"
                  >
                    Görseli Kaldır
                  </button>
                )}
              </div>
              {section.image && section.imagePlacement && (
                <MediaPlacementEditor
                  src={section.image}
                  value={section.imagePlacement}
                  onChange={(nextPlacement) => {
                    if (!section.id) return
                    onUpdateSection(section.id, { imagePlacement: nextPlacement })
                  }}
                  variants={[{ label: 'Bölüm Görseli (896/340)', aspect: '896 / 340' }]}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <button onClick={onRequestDelete} className="cms-btn-ghost h-9 px-3 py-1.5 text-sm text-error">
          <Trash2 className="h-4 w-4" />
          Bu Haberi Sil
        </button>
      </div>
    </div>
  )
}
