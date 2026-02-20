'use client'

type ConfirmDialogProps = {
  open: boolean
  title: string
  description: React.ReactNode
  confirmLabel?: string
  cancelLabel?: string
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Evet, Sil',
  cancelLabel = 'Vazgeç',
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4" onClick={onCancel}>
      <div
        className="w-full max-w-md rounded-xl border border-border bg-card p-5 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="cms-btn-secondary h-9 px-3 py-1.5 text-sm" disabled={loading}>
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="cms-btn-primary h-9 px-3 py-1.5 text-sm !bg-error !text-white hover:!bg-error/90"
            disabled={loading}
          >
            {loading ? 'Siliniyor...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
