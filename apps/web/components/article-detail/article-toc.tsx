import { List } from 'lucide-react'

type TocItem = {
  id: string
  title: string
}

type ArticleTocProps = {
  items: TocItem[]
  title?: string
}

export function ArticleToc({ items, title = 'İçerikler' }: ArticleTocProps) {
  if (items.length === 0) return null

  return (
    <nav className="mb-12 rounded-2xl border bg-card p-6">
      <div className="mb-4 flex items-center gap-2 text-base font-semibold">
        <List className="h-4 w-4 text-accent" />
        {title}
      </div>
      <ol className="grid gap-2 sm:grid-cols-2">
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {index + 1}. {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
