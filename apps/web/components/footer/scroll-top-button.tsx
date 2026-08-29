import { ArrowUp } from 'lucide-react'

type ScrollTopButtonProps = {
  visible: boolean
  onClick: () => void
}

export function ScrollTopButton({ visible, onClick }: ScrollTopButtonProps) {
  if (!visible) return null

  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-colors duration-300 hover:bg-primary/90 z-50 group animate-in fade-in slide-in-from-bottom-4"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
    </button>
  )
}
