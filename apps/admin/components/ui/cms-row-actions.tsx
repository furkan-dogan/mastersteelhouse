'use client'

import { Eye, Pencil, Trash2 } from 'lucide-react'

type CmsRowActionsProps = {
  onPreview: () => void
  onEdit: () => void
  onDelete: () => void
  previewTitle?: string
  editTitle?: string
  deleteTitle?: string
}

export function CmsRowActions({
  onPreview,
  onEdit,
  onDelete,
  previewTitle = 'Önizle',
  editTitle = 'Düzenle',
  deleteTitle = 'Sil',
}: CmsRowActionsProps) {
  return (
    <div className="flex justify-end gap-1.5">
      <button
        onClick={onPreview}
        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:h-8 md:w-8"
        title={previewTitle}
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        onClick={onEdit}
        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:h-8 md:w-8"
        title={editTitle}
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        onClick={onDelete}
        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-red-300/60 bg-red-50 text-red-600 transition-colors hover:bg-red-100 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300 md:h-8 md:w-8"
        title={deleteTitle}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}
