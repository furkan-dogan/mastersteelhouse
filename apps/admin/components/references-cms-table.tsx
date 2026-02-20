'use client'

import type { ReferenceItem } from '@/lib/references-store'
import { adminPreviewUrl } from '@/lib/media-preview-url'
import { CmsRowActions } from '@/components/ui/cms-row-actions'
import { TablePagination } from '@/components/ui/table'

type ReferencesCmsTableProps = {
  filteredItems: ReferenceItem[]
  pagedItems: ReferenceItem[]
  page: number
  totalPages: number
  pageSize: number
  onPageChange: (page: number) => void
  onOpenEditor: (id: string) => void
  onRequestDelete: (id: string, label: string) => void
}

export function ReferencesCmsTable({
  filteredItems,
  pagedItems,
  page,
  totalPages,
  pageSize,
  onPageChange,
  onOpenEditor,
  onRequestDelete,
}: ReferencesCmsTableProps) {
  return (
    <>
      <div className="cms-scroll overflow-x-auto">
        <table className="w-full table-fixed text-sm">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr>
              <th className="w-[58%] px-4 py-3 text-left font-medium">Proje</th>
              <th className="hidden w-[16%] px-4 py-3 text-left font-medium md:table-cell">Konum</th>
              <th className="hidden w-[16%] px-4 py-3 text-left font-medium lg:table-cell">Kategori</th>
              <th className="w-[120px] px-4 py-3 text-right font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  Referans bulunamadı.
                </td>
              </tr>
            ) : (
              pagedItems.map((item) => (
                <tr key={item.id} className="border-t align-middle hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md border bg-muted/40">
                        {item.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={adminPreviewUrl(item.image)} alt={item.title} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">Yok</div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">{item.title}</p>
                        <p className="hidden truncate text-xs text-muted-foreground md:block">{item.area || 'Alan bilgisi yok'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{item.location}</td>
                  <td className="hidden px-4 py-3 lg:table-cell">
                    <span className="inline-flex rounded-md border bg-muted px-2 py-1 text-xs font-medium text-foreground">
                      {item.categories[0] ?? 'Genel'}
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
