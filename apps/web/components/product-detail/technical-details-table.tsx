type TechnicalDetailsTableProps = {
  details: Record<string, string>
}

export function TechnicalDetailsTable({ details }: TechnicalDetailsTableProps) {
  return (
    <div className="bg-card rounded-3xl border border-border overflow-hidden">
      <div className="divide-y divide-border">
        {Object.entries(details).map(([key, value]) => (
          <div key={key} className="grid md:grid-cols-2 gap-4 p-6 hover:bg-muted/50 transition-colors">
            <div className="font-semibold text-foreground">{key}</div>
            <div className="text-muted-foreground">{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
