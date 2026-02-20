import { useCallback, useMemo, useState } from 'react'

export function usePagination<T>(items: T[], pageSize = 10) {
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const safePage = Math.min(page, totalPages)

  const pagedItems = useMemo(() => {
    const start = (safePage - 1) * pageSize
    return items.slice(start, start + pageSize)
  }, [items, safePage, pageSize])

  const setPageWithinBounds = useCallback(
    (nextPage: number) => {
      setPage(Math.max(1, Math.min(nextPage, totalPages)))
    },
    [totalPages]
  )

  const resetPage = useCallback(() => {
    setPage(1)
  }, [])

  return {
    page: safePage,
    totalPages,
    pagedItems,
    setPage: setPageWithinBounds,
    resetPage,
    pageSize,
  }
}
