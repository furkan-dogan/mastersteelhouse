import { useCallback, useState } from 'react'

type DeleteTarget<TId extends string> = {
  id: TId
  label: string
}

export function useConfirmDelete<TId extends string>(onDelete: (id: TId) => void) {
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget<TId> | null>(null)

  const requestDelete = useCallback((id: TId, label: string) => {
    setDeleteTarget({ id, label })
  }, [])

  const closeDeleteDialog = useCallback(() => {
    setDeleteTarget(null)
  }, [])

  const confirmDelete = useCallback(() => {
    if (!deleteTarget) return
    onDelete(deleteTarget.id)
    setDeleteTarget(null)
  }, [deleteTarget, onDelete])

  return {
    deleteTarget,
    requestDelete,
    closeDeleteDialog,
    confirmDelete,
  }
}
