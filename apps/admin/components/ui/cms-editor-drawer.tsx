'use client'

import type { ReactNode } from 'react'
import { Save, X } from 'lucide-react'

type CmsEditorDrawerProps = {
  open: boolean
  title: string
  subtitle?: string
  saving?: boolean
  saveLabel?: string
  widthClassName?: string
  onClose: () => void
  onSave: () => void
  children: ReactNode
}

export function CmsEditorDrawer({
  open,
  title,
  subtitle,
  saving = false,
  saveLabel = 'Kaydet',
  widthClassName = 'max-w-3xl',
  onClose,
  onSave,
  children,
}: CmsEditorDrawerProps) {
  if (!open) return null

  return (
    <>
      <button
        type="button"
        aria-label="Editörü kapat"
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
      />
      <aside className={`fixed inset-y-0 right-0 z-50 w-full border-l bg-background shadow-2xl ${widthClassName}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-5 py-3">
            <div>
              {subtitle ? <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{subtitle}</p> : null}
              <h2 className="text-base font-semibold text-foreground">{title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={onSave} disabled={saving} className="cms-btn-primary h-9 px-3 py-1.5 text-sm disabled:opacity-60">
                <Save className="h-4 w-4" />
                {saving ? 'Kaydediliyor...' : saveLabel}
              </button>
              <button onClick={onClose} className="cms-btn-ghost h-9 w-9 p-0" aria-label="Kapat">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="cms-scroll flex-1 overflow-y-auto p-5">{children}</div>
        </div>
      </aside>
    </>
  )
}
