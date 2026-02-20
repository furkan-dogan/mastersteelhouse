'use client'

import { Plus, RefreshCw, Save } from 'lucide-react'

type CmsPageActionsProps = {
  saving: boolean
  createLabel: string
  onRefresh: () => void
  onSave: () => void
  onCreate: () => void
}

export function CmsPageActions({
  saving,
  createLabel,
  onRefresh,
  onSave,
  onCreate,
}: CmsPageActionsProps) {
  return (
    <>
      <button onClick={onRefresh} className="cms-btn-secondary h-9 px-3 py-1.5 text-sm">
        <RefreshCw className="h-4 w-4" />
        Yenile
      </button>
      <button onClick={onSave} disabled={saving} className="cms-btn-primary h-9 px-3 py-1.5 text-sm disabled:opacity-60">
        <Save className="h-4 w-4" />
        {saving ? 'Kaydediliyor...' : 'Kaydet'}
      </button>
      <button onClick={onCreate} className="cms-btn-primary h-9 px-3 py-1.5 text-sm">
        <Plus className="h-4 w-4" />
        {createLabel}
      </button>
    </>
  )
}
