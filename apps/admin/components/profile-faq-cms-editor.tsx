'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { MessageSquare, Plus } from 'lucide-react'
import { AdminLayout } from '@/components/admin-layout'
import { CmsPageActions } from '@/components/ui/cms-page-actions'
import { CmsStatusToast } from '@/components/cms-shared'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { useConfirmDelete } from '@/lib/use-confirm-delete'
import type { ProfileFaqStore } from '@/lib/profile-faq-store'

function createFaqId() {
  return `faq-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

type Props = {
  endpoint?: string
}

export function ProfileFaqCmsEditor({ endpoint = '/api/profile/faqs' }: Props) {
  const [store, setStore] = useState<ProfileFaqStore | null>(null)
  const [selectedId, setSelectedId] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const loadStore = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(endpoint, { cache: 'no-store' })
      if (!response.ok) throw new Error('SSS verisi alinamadi')

      const nextStore = (await response.json()) as ProfileFaqStore
      setStore(nextStore)
      setSelectedId((prev) => prev || nextStore.items[0]?.id || '')
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Beklenmeyen hata')
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  useEffect(() => {
    void loadStore()
  }, [loadStore])

  const filteredItems = useMemo(() => {
    if (!store) return []
    const q = search.trim().toLowerCase()
    if (!q) return store.items
    return store.items.filter((item) => item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q))
  }, [store, search])

  const selectedItem = useMemo(() => {
    return store?.items.find((item) => item.id === selectedId) ?? null
  }, [store, selectedId])

  function patchSelectedItem(patch: Partial<{ question: string; answer: string }>) {
    if (!store || !selectedItem) return
    setStore({
      ...store,
      items: store.items.map((item) => (item.id === selectedItem.id ? { ...item, ...patch } : item)),
    })
  }

  function addItem(position: 'top' | 'afterSelected' = 'top') {
    if (!store) return
    const nextId = createFaqId()
    const nextItem = {
      id: nextId,
      question: 'Yeni Soru',
      answer: 'Cevap metnini buraya yazın.',
    }

    if (position === 'afterSelected' && selectedItem) {
      const selectedIndex = store.items.findIndex((item) => item.id === selectedItem.id)
      if (selectedIndex >= 0) {
        const nextItems = [...store.items]
        nextItems.splice(selectedIndex + 1, 0, nextItem)
        setStore({ ...store, items: nextItems })
        setSelectedId(nextId)
        return
      }
    }

    setStore({ ...store, items: [nextItem, ...store.items] })
    setSelectedId(nextId)
  }

  function deleteItem(id: string) {
    if (!store) return
    const nextItems = store.items.filter((item) => item.id !== id)
    setStore({ ...store, items: nextItems })
    if (selectedId === id) {
      setSelectedId(nextItems[0]?.id ?? '')
    }
  }

  const { deleteTarget, requestDelete, closeDeleteDialog, confirmDelete } = useConfirmDelete<string>(deleteItem)

  async function saveStore() {
    if (!store) return
    try {
      setSaving(true)
      setError(null)
      setMessage(null)

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(store),
      })

      if (!response.ok) throw new Error('Kaydetme basarisiz')

      setMessage('SSS içerikleri kaydedildi.')
      setTimeout(() => setMessage(null), 2500)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Beklenmeyen hata')
      setTimeout(() => setError(null), 4000)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">SSS CMS yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!store) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="rounded-xl border border-error/30 bg-error/5 px-8 py-6 text-center">
          <p className="font-medium text-error">Veri yüklenemedi.</p>
          <button onClick={() => void loadStore()} className="mt-4 cms-btn-primary text-sm">
            Tekrar Dene
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <AdminLayout
        title="SSS"
        subtitle={`${store.items.length} soru bulundu`}
        actions={
          <CmsPageActions
            saving={saving}
            createLabel="Yeni Soru"
            onRefresh={() => void loadStore()}
            onSave={() => void saveStore()}
            onCreate={addItem}
          />
        }
      >
        <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
          <section className="cms-card overflow-hidden">
            <div className="border-b p-3">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="cms-input"
                placeholder="Soru ara..."
              />
            </div>
            <div className="cms-scroll max-h-[70vh] space-y-1 overflow-y-auto p-3">
              {filteredItems.length === 0 ? (
                <p className="px-2 py-6 text-sm text-muted-foreground">Soru bulunamadı.</p>
              ) : (
                filteredItems.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full rounded-lg border px-3 py-2 text-left transition ${
                      selectedId === item.id
                        ? 'border-primary/50 bg-primary/10'
                        : 'border-border hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-muted px-1 text-[11px] font-semibold text-muted-foreground">
                        {index + 1}
                      </span>
                      <p className="truncate text-sm font-medium text-foreground">{item.question}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </section>

          <section className="cms-card overflow-hidden">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                Soru İçeriği
              </h2>
              {selectedItem ? (
                <button
                  type="button"
                  onClick={() => requestDelete(selectedItem.id, selectedItem.question)}
                  className="cms-btn-ghost h-8 px-2 py-1 text-xs text-error"
                >
                  Sil
                </button>
              ) : null}
            </div>

            <div className="space-y-4 p-4">
              {!selectedItem ? (
                <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                  Düzenlemek için soldan bir soru seçin veya yeni soru ekleyin.
                </div>
              ) : (
                <>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">Soru</label>
                    <input
                      value={selectedItem.question}
                      onChange={(event) => patchSelectedItem({ question: event.target.value })}
                      className="cms-input"
                      placeholder="Soru metni"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">Cevap</label>
                    <textarea
                      value={selectedItem.answer}
                      onChange={(event) => patchSelectedItem({ answer: event.target.value })}
                      rows={10}
                      className="cms-textarea"
                      placeholder="Cevap metni"
                    />
                  </div>
                  <button type="button" onClick={() => addItem('afterSelected')} className="cms-btn-secondary h-9 px-3 py-1.5 text-sm">
                    <Plus className="h-4 w-4" />
                    Altına Yeni Soru Ekle
                  </button>
                </>
              )}
            </div>
          </section>
        </div>
      </AdminLayout>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Soru Silinsin mi?"
        description={
          <>
            <span className="font-medium text-foreground">{deleteTarget?.label}</span> sorusunu kalıcı olarak silmek istediğinize emin misiniz?
          </>
        }
        confirmLabel="Soruyu Sil"
        cancelLabel="Vazgeç"
        onCancel={closeDeleteDialog}
        onConfirm={confirmDelete}
      />

      <CmsStatusToast error={error} message={message} />
    </>
  )
}
