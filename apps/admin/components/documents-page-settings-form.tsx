'use client'

import type { DocumentsStore } from '@/lib/documents-store'

function splitLines(value: string) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

type DocumentsPageSettingsFormProps = {
  store: DocumentsStore
  onPatchStore: (update: Partial<DocumentsStore>) => void
}

export function DocumentsPageSettingsForm({ store, onPatchStore }: DocumentsPageSettingsFormProps) {
  return (
    <section className="cms-card mb-4 p-5">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-foreground">Sayfa İçeriği</h2>
        <p className="text-xs text-muted-foreground">Belgeler sayfasında ortak görünen başlık ve açıklamaları buradan yönetin.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Hero Alanı</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={store.hero.badge}
              onChange={(e) => onPatchStore({ hero: { ...store.hero, badge: e.target.value } })}
              className="cms-input"
              placeholder="Badge"
            />
            <input
              value={store.hero.title}
              onChange={(e) => onPatchStore({ hero: { ...store.hero, title: e.target.value } })}
              className="cms-input"
              placeholder="Başlık"
            />
            <input
              value={store.hero.titleAccent}
              onChange={(e) => onPatchStore({ hero: { ...store.hero, titleAccent: e.target.value } })}
              className="cms-input"
              placeholder="Vurgulu Başlık"
            />
          </div>
          <textarea
            value={store.hero.description}
            onChange={(e) => onPatchStore({ hero: { ...store.hero, description: e.target.value } })}
            rows={3}
            className="cms-textarea"
            placeholder="Açıklama"
          />
        </div>

        <div className="space-y-3 border-t pt-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Alt Bilgi</h3>
          <textarea
            value={store.features.join('\n')}
            onChange={(e) => onPatchStore({ features: splitLines(e.target.value) })}
            rows={6}
            className="cms-textarea"
            placeholder="Özellikler (satır satır)"
          />
          <textarea
            value={store.footerNote}
            onChange={(e) => onPatchStore({ footerNote: e.target.value })}
            rows={2}
            className="cms-textarea"
            placeholder="Alt not"
          />
        </div>
      </div>
    </section>
  )
}
