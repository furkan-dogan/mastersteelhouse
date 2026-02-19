'use client'

type CmsLoadingStateProps = {
  message: string
}

export function CmsLoadingState({ message }: CmsLoadingStateProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}

type CmsErrorStateProps = {
  message?: string
  onRetry: () => void
}

export function CmsErrorState({ message = 'Veri yüklenemedi.', onRetry }: CmsErrorStateProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="rounded-xl border border-error/30 bg-error/5 px-8 py-6 text-center">
        <p className="font-medium text-error">{message}</p>
        <button onClick={onRetry} className="mt-4 cms-btn-primary text-sm">
          Tekrar Dene
        </button>
      </div>
    </div>
  )
}

