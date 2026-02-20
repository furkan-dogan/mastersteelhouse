'use client'

import type { CatalogItem } from '@/lib/catalogs-store'
import { adminPreviewUrl } from '@/lib/media-preview-url'
import { CmsRowActions } from '@/components/ui/cms-row-actions'
import { TablePagination } from '@/components/ui/table'

type CatalogsCmsTableProps = {
  filteredItems: CatalogItem[]
  pagedItems: CatalogItem[]
  page: number
  totalPages: number
  pageSize: number
  onPageChange: (page: number) => void
  onOpenEditor: (id: string) => void
  onRequestDelete: (id: string, label: string) => void
}

export function CatalogsCmsTable({
  filteredItems,
  pagedItems,
  page,
  totalPages,
  pageSize,
  onPageChange,
  onOpenEditor,
  onRequestDelete,
}: CatalogsCmsTableProps) {
  return (
    <>
      <div className="cms-scroll overflow-x-auto">
        <table className="w-full table-fixed text-sm">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr>
              <th className="hidden w-[140px] px-4 py-3 text-left font-medium md:table-cell">Önizleme</th>
              <th className="w-[66%] px-4 py-3 text-left font-medium">Katalog</th>
              <th className="hidden w-[14%] px-4 py-3 text-left font-medium lg:table-cell">Durum</th>
              <th className="w-[120px] px-4 py-3 text-right font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  Katalog bulunamadı.
                </td>
              </tr>
            ) : (
              pagedItems.map((item) => (
                <tr key={item.id} className="border-t align-middle hover:bg-muted/30">
                  <td className="hidden px-4 py-3 md:table-cell">
                    <div className="h-16 w-24 overflow-hidden rounded-md border bg-card">
                      {item.pdfUrl ? (
                        <iframe
                          src={`${adminPreviewUrl(item.pdfUrl)}#toolbar=0&navpanes=0&page=1`}
                          title={`${item.title} mini önizleme`}
                          className="h-full w-full"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                          PDF yok
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="truncate font-medium text-foreground">{item.title}</p>
                  </td>
                  <td className="hidden px-4 py-3 lg:table-cell">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${item.pdfUrl ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300'}`}>
                      {item.pdfUrl ? 'Hazır' : 'Eksik'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <CmsRowActions
                      onPreview={() => onOpenEditor(item.id)}
                      onEdit={() => onOpenEditor(item.id)}
                      onDelete={() => onRequestDelete(item.id, item.title)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <TablePagination
        page={page}
        totalPages={totalPages}
        totalItems={filteredItems.length}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </>
  )
}
