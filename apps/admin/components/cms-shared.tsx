'use client'

import { Plus, RefreshCw, Save, Trash2 } from 'lucide-react'

type IconProps = {
  className?: string
}

type CmsTopActionsProps = {
  onRefresh: () => void
  onSave: () => void
  saving?: boolean
  saveText?: string
  savingText?: string
}

export function CmsTopActions({
  onRefresh,
  onSave,
  saving = false,
  saveText = 'Kaydet',
  savingText = 'Kaydediliyor...',
}: CmsTopActionsProps) {
  return (
    <>
      <button onClick={onRefresh} className="cms-btn-secondary h-9 px-3 py-1.5 text-sm">
        <RefreshCw className="h-4 w-4" />
        Yenile
      </button>
      <button onClick={onSave} disabled={saving} className="cms-btn-primary h-9 px-3 py-1.5 text-sm disabled:opacity-60">
        <Save className="h-4 w-4" />
        {saving ? savingText : saveText}
      </button>
    </>
  )
}

type CmsTwoColumnLayoutProps = {
  children: React.ReactNode
  sidebarWidthClass?: string
}

export function CmsTwoColumnLayout({ children, sidebarWidthClass = 'lg:grid-cols-[260px_1fr]' }: CmsTwoColumnLayoutProps) {
  return <div className={`grid gap-4 ${sidebarWidthClass}`}>{children}</div>
}

type CmsListPanelProps = {
  title: string
  icon?: React.ComponentType<IconProps>
  addLabel?: string
  onAdd: () => void
  children: React.ReactNode
}

export function CmsListPanel({ title, icon: Icon, addLabel = 'Yeni', onAdd, children }: CmsListPanelProps) {
  return (
    <section className="cms-card flex flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          {Icon ? <Icon className="h-4 w-4 text-muted-foreground" /> : null}
          {title}
        </h2>
        <button onClick={onAdd} className="cms-btn-ghost h-8 px-2 py-1 text-xs">
          <Plus className="h-3.5 w-3.5" />
          {addLabel}
        </button>
      </div>
      <div className="cms-scroll flex-1 space-y-1 overflow-y-auto p-3">{children}</div>
    </section>
  )
}

type CmsDetailPanelProps = {
  title: string
  onRemove?: () => void
  removeLabel?: string
  children: React.ReactNode
}

export function CmsDetailPanel({ title, onRemove, removeLabel = 'Sil', children }: CmsDetailPanelProps) {
  return (
    <section className="cms-card flex flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        {onRemove ? (
          <button onClick={onRemove} className="cms-btn-ghost h-8 px-2 py-1 text-xs text-error">
            <Trash2 className="h-3.5 w-3.5" />
            {removeLabel}
          </button>
        ) : null}
      </div>
      <div className="cms-scroll flex-1 overflow-y-auto p-4">{children}</div>
    </section>
  )
}

type CmsSelectableListItem = {
  id: string
  label: string
}

type CmsSelectableListProps = {
  items: CmsSelectableListItem[]
  selectedId: string
  onSelect: (id: string) => void
}

export function CmsSelectableList({ items, selectedId, onSelect }: CmsSelectableListProps) {
  return (
    <>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
            item.id === selectedId ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
          }`}
        >
          {item.label}
        </button>
      ))}
    </>
  )
}

type CmsStatusToastProps = {
  error?: string | null
  message?: string | null
  icon?: React.ComponentType<IconProps>
}

export function CmsStatusToast({ error, message, icon: Icon }: CmsStatusToastProps) {
  if (!error && !message) return null

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 rounded-lg border px-4 py-3 shadow-lg ${
        error ? 'border-error/30 bg-error/10' : 'border-[var(--success)]/30 bg-[var(--success)]/10'
      }`}
    >
      <div className="flex items-center gap-2 text-sm">
        {Icon ? <Icon className={`h-4 w-4 ${error ? 'text-error' : 'text-[var(--success)]'}`} /> : null}
        {error ? (
          <p className="font-medium text-error">{error}</p>
        ) : (
          <p className="font-medium text-[var(--success)]">{message}</p>
        )}
      </div>
    </div>
  )
}
