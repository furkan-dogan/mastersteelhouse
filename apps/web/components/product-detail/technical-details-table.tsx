type TechnicalDetailsTableProps = {
  details: Record<string, string>
}

export function TechnicalDetailsTable({ details }: TechnicalDetailsTableProps) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="divide-y divide-border">
        {Object.entries(details).map(([key, value]) => (
          <div key={key} className="grid gap-2 p-4 transition-colors hover:bg-muted/50 sm:gap-4 sm:p-6 md:grid-cols-2">
            <div className="font-semibold text-foreground">{key}</div>
            <div className="break-words text-muted-foreground">{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
