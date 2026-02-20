'use client'

import { Search } from 'lucide-react'
import type { ReactNode } from 'react'

type ToolbarFilterOption = {
  value: string
  label: string
}

type CmsListToolbarProps = {
  searchValue: string
  searchPlaceholder: string
  onSearchChange: (value: string) => void
  filterValue?: string
  filterOptions?: ToolbarFilterOption[]
  onFilterChange?: (value: string) => void
  className?: string
  children?: ReactNode
}

export function CmsListToolbar({
  searchValue,
  searchPlaceholder,
  onSearchChange,
  filterValue,
  filterOptions,
  onFilterChange,
  className,
  children,
}: CmsListToolbarProps) {
  const hasFilter = Boolean(filterOptions && filterOptions.length > 0 && filterValue !== undefined && onFilterChange)

  return (
    <div className={`border-b px-4 py-3 ${className ?? ''}`.trim()}>
      {children}
      <div className={hasFilter ? 'grid gap-3 md:grid-cols-[1fr_220px]' : ''}>
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
            className="cms-input !pl-10"
          />
        </label>
        {hasFilter ? (
          <select value={filterValue} onChange={(event) => onFilterChange?.(event.target.value)} className="cms-input">
            {filterOptions?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : null}
      </div>
    </div>
  )
}
