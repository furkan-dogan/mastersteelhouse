'use client'

import type { ProductItem } from '@/lib/products-store'
import { adminPreviewUrl } from '@/lib/media-preview-url'
import { CmsRowActions } from '@/components/ui/cms-row-actions'
import { TablePagination } from '@/components/ui/table'

type ProductsCmsTableProps = {
  filteredProducts: ProductItem[]
  pagedItems: ProductItem[]
  page: number
  totalPages: number
  pageSize: number
  onPageChange: (page: number) => void
  onOpenEditor: (slug: string) => void
  onRequestDelete: (slug: string, label: string) => void
  showAreaColumn?: boolean
}

export function ProductsCmsTable({
  filteredProducts,
  pagedItems,
  page,
  totalPages,
  pageSize,
  onPageChange,
  onOpenEditor,
  onRequestDelete,
  showAreaColumn = true,
}: ProductsCmsTableProps) {
  return (
    <>
      <div className="cms-scroll overflow-x-auto">
        <table className="w-full table-fixed text-sm">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr>
              <th className="hidden w-[140px] px-4 py-3 text-left font-medium md:table-cell">Önizleme</th>
              <th className={`px-4 py-3 text-left font-medium ${showAreaColumn ? 'w-[62%]' : 'w-[72%]'}`}>Ürün</th>
              {showAreaColumn ? (
                <th className="hidden w-[18%] px-4 py-3 text-left font-medium md:table-cell">Alan</th>
              ) : null}
              <th className="w-[120px] px-4 py-3 text-right font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={showAreaColumn ? 4 : 3} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  Ürün bulunamadı.
                </td>
              </tr>
            ) : (
              pagedItems.map((product) => {
                const previewSrc = product.cardImage || product.image || product.gallery?.[0] || ''

                return (
                  <tr key={`${product.categorySlug}-${product.slug}`} className="border-t align-middle hover:bg-muted/30">
                    <td className="hidden px-4 py-3 md:table-cell">
                      <div className="h-16 w-24 overflow-hidden rounded-md border bg-muted/30">
                        {previewSrc ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={adminPreviewUrl(previewSrc)} alt={product.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">Görsel yok</div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">{product.name}</p>
                        <p className="hidden truncate text-xs text-muted-foreground md:block">{product.detailDescription || product.description || 'Açıklama yok'}</p>
                      </div>
                    </td>
                    {showAreaColumn ? (
                      <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{product.area || '-'}</td>
                    ) : null}
                    <td className="px-4 py-3">
                      <CmsRowActions
                        onPreview={() => onOpenEditor(product.slug)}
                        onEdit={() => onOpenEditor(product.slug)}
                        onDelete={() => onRequestDelete(product.slug, product.name)}
                        previewTitle="Önizle"
                        editTitle="Düzenle"
                      />
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <TablePagination
        page={page}
        totalPages={totalPages}
        totalItems={filteredProducts.length}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </>
  )
}
