import { ChevronDown, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

type ArticleSharePanelProps = {
  title: string
  description: string
}

export function ArticleSharePanel({ title, description }: ArticleSharePanelProps) {
  return (
    <div className="mt-16 pt-8 border-t-2 border-border">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8 rounded-3xl bg-gradient-to-br from-muted to-muted/50">
        <div>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Button
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-accent/30 transition-all"
        >
          <Share2 className="w-5 h-5 mr-2" />
          Paylaş
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
