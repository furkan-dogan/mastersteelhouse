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
      className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent/80 text-accent-foreground shadow-xl shadow-accent/30 flex items-center justify-center hover:scale-110 transition-all duration-300 z-50 group animate-in fade-in slide-in-from-bottom-4"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
    </button>
  )
}
