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
  simplified?: boolean
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
  simplified = false,
}: ReferencesCmsTableProps) {
  return (
    <>
      <div className="cms-scroll overflow-x-auto">
        <table className="w-full table-fixed text-sm">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-medium">{simplified ? 'Firma' : 'Proje'}</th>
              {!simplified ? <th className="hidden w-[16%] px-4 py-3 text-left font-medium md:table-cell">Konum</th> : null}
              {!simplified ? <th className="hidden w-[16%] px-4 py-3 text-left font-medium lg:table-cell">Kategori</th> : null}
              <th className="w-[120px] px-4 py-3 text-right font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={simplified ? 2 : 4} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  Referans bulunamadı.
                </td>
              </tr>
            ) : (
              pagedItems.map((item) => (
                <tr key={item.id} className="border-t align-middle hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <button type="button" className="w-full text-left" onClick={() => onOpenEditor(item.id)}>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md border bg-muted/40">
                          {item.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={adminPreviewUrl(item.image)} alt={item.title} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">Logo</div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-foreground hover:underline">{item.title}</p>
                          {!simplified ? (
                            <p className="hidden truncate text-xs text-muted-foreground md:block">{item.area || 'Adet bilgisi yok'}</p>
                          ) : null}
                        </div>
                      </div>
                    </button>
                  </td>
                  {!simplified ? <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{item.location}</td> : null}
                  {!simplified ? (
                    <td className="hidden px-4 py-3 lg:table-cell">
                      <span className="inline-flex rounded-md border bg-muted px-2 py-1 text-xs font-medium text-foreground">
                        {item.categories[0] ?? 'Genel'}
                      </span>
                    </td>
                  ) : null}
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
