'use client'

import { useState } from 'react'
import { MoreHorizontal } from 'lucide-react'

export function DataTable({
  columns,
  data,
  stickyHeader = true,
  rowActions,
  emptyMessage = 'Veri bulunamadı',
}: {
  columns: { key: string; label: string; className?: string }[]
  data: Record<string, React.ReactNode>[]
  stickyHeader?: boolean
  rowActions?: (row: Record<string, React.ReactNode>, index: number) => React.ReactNode
  emptyMessage?: string
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[600px] text-sm">
        <thead
          className={
            stickyHeader
              ? 'sticky top-0 z-10 border-b border-border bg-muted/80 backdrop-blur-sm'
              : 'border-b border-border bg-muted/50'
          }
        >
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 text-left text-xs font-medium text-muted-foreground ${col.className ?? ''}`}
              >
                {col.label}
              </th>
            ))}
            {rowActions && <th className="w-12 px-2 py-3" />}
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-card">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (rowActions ? 1 : 0)}
                className="px-4 py-12 text-center text-sm text-muted-foreground"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={index}
                className="transition-colors hover:bg-muted/50"
              >
                {columns.map((col) => (
                  <td key={col.key} className={`px-4 py-3 text-foreground ${col.className ?? ''}`}>
                    {row[col.key]}
                  </td>
                ))}
                {rowActions && (
                  <td className="w-12 px-2 py-3">
                    <RowActionsDropdown>{rowActions(row, index)}</RowActionsDropdown>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

function RowActionsDropdown({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="İşlemler"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-1 flex min-w-[140px] flex-col rounded-lg border border-border bg-card py-1 shadow-lg">
            {children}
          </div>
        </>
      )}
    </div>
  )
}

export function TableRowAction({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function TablePagination({
  page,
  totalPages,
  onPageChange,
  totalItems,
  pageSize = 10,
}: {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems?: number
  pageSize?: number
}) {
  const hasItems = totalItems == null ? true : totalItems > 0
  const start = hasItems ? (page - 1) * pageSize + 1 : 0
  const end = hasItems ? Math.min(page * pageSize, totalItems ?? page * pageSize) : 0

  return (
    <div className="flex items-center justify-between border-t border-border px-4 py-3">
      <p className="text-sm text-muted-foreground">
        {totalItems != null
          ? `${start}-${end} / ${totalItems} kayıt`
          : `Sayfa ${page} / ${totalPages}`}
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="cms-btn-ghost h-8 px-2 text-sm disabled:opacity-50"
        >
          Önceki
        </button>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="cms-btn-ghost h-8 px-2 text-sm disabled:opacity-50"
        >
          Sonraki
        </button>
      </div>
    </div>
  )
}
