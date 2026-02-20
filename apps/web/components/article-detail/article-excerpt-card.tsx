type ArticleExcerptCardProps = {
  text: string
}

export function ArticleExcerptCard({ text }: ArticleExcerptCardProps) {
  return (
    <div className="mb-10 p-8 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/5 border-l-4 border-accent">
      <p className="text-xl leading-relaxed text-foreground font-medium">{text}</p>
    </div>
  )
}
