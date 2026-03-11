import { CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { SubmitPopup } from '@/components/contact/types'

type ContactResultPopupProps = {
  popup: SubmitPopup
  onClose: () => void
}

export function ContactResultPopup({ popup, onClose }: ContactResultPopupProps) {
  if (!popup) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/35 px-4">
      <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-2xl border border-border">
        <div className="flex items-start gap-3">
          {popup.type === 'success' ? (
            <CheckCircle2 className="mt-0.5 h-6 w-6 text-green-600" />
          ) : (
            <XCircle className="mt-0.5 h-6 w-6 text-red-600" />
          )}
          <div>
            <h4 className="text-lg font-semibold text-foreground">{popup.type === 'success' ? 'Başarılı' : 'Gönderim Hatası'}</h4>
            <p className="mt-1 text-sm text-muted-foreground">{popup.text}</p>
          </div>
        </div>
        <Button type="button" onClick={onClose} className="mt-5 h-10 w-full">
          Kapat
        </Button>
      </div>
    </div>
  )
}
