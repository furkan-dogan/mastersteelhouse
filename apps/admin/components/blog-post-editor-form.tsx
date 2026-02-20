'use client'

import { Plus, Trash2 } from 'lucide-react'
import type { BlogPost, BlogSection } from '@/lib/blog-store'
import { adminPreviewUrl } from '@/lib/media-preview-url'
import { MediaUploadDropzone } from '@/components/media-upload-dropzone'
import { MediaPlacementEditor } from '@/components/media-placement-editor'
import { normalizeMediaPlacement, placementToObjectPosition } from '@/lib/media-placement'

type BlogPostEditorFormProps = {
  selectedPost: BlogPost
  sections: BlogSection[]
  onPatchPost: (update: Partial<BlogPost>) => void
  onRenameSlug: (value: string) => void
  onAddSection: () => void
  onRemoveSection: (sectionId: string) => void
  onUpdateSection: (sectionId: string, patch: Partial<BlogSection>) => void
  onOpenCoverPicker: () => void
  onOpenSectionPicker: (sectionId: string) => void
  onRequestDelete: () => void
  onError: (message: string | null) => void
}

export function BlogPostEditorForm({
  selectedPost,
  sections,
  onPatchPost,
  onRenameSlug,
  onAddSection,
  onRemoveSection,
  onUpdateSection,
  onOpenCoverPicker,
  onOpenSectionPicker,
  onRequestDelete,
  onError,
}: BlogPostEditorFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Temel Bilgiler</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Başlık</label>
            <input value={selectedPost.title} onChange={(event) => onPatchPost({ title: event.target.value })} className="cms-input" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Slug</label>
            <input value={selectedPost.slug} onChange={(event) => onRenameSlug(event.target.value)} className="cms-input" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Tarih</label>
            <input value={selectedPost.date} onChange={(event) => onPatchPost({ date: event.target.value })} className="cms-input" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Yazar</label>
            <input value={selectedPost.author} onChange={(event) => onPatchPost({ author: event.target.value })} className="cms-input" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Kategori</label>
            <input value={selectedPost.category} onChange={(event) => onPatchPost({ category: event.target.value })} className="cms-input" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Okuma Süresi</label>
            <input value={selectedPost.readTime} onChange={(event) => onPatchPost({ readTime: event.target.value })} className="cms-input" />
          </div>
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
              <MediaPlacementEditor
                src={selectedPost.image}
                value={normalizeMediaPlacement(selectedPost.imagePlacement, selectedPost.imagePosition)}
                onChange={(nextPlacement) =>
                  onPatchPost({
                    imagePlacement: nextPlacement,
                    imagePosition: placementToObjectPosition(nextPlacement),
                  })
                }
                variants={[
                  { label: 'Blog Kartı (16:9)', aspect: '16 / 9' },
                  { label: 'Blog Detay Hero (16:7)', aspect: '16 / 7' },
                ]}
              />
            </div>
          )}
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Özet</label>
          <textarea
            rows={3}
            value={selectedPost.excerpt}
            onChange={(event) => onPatchPost({ excerpt: event.target.value })}
            className="cms-textarea"
          />
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
                onChange={(event) => {
                  if (!section.id) return
                  onUpdateSection(section.id, { title: event.target.value })
                }}
                className="cms-input"
                placeholder="Başlık"
              />
              <textarea
                rows={5}
                value={section.content}
                onChange={(event) => {
                  if (!section.id) return
                  onUpdateSection(section.id, { content: event.target.value })
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
          Bu Yazıyı Sil
        </button>
      </div>
    </div>
  )
}
