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
}: ProductsCmsTableProps) {
  return (
    <>
      <div className="cms-scroll overflow-x-auto">
        <table className="w-full table-fixed text-sm">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr>
              <th className="hidden w-[140px] px-4 py-3 text-left font-medium md:table-cell">Onizleme</th>
              <th className="w-[62%] px-4 py-3 text-left font-medium">Urun</th>
              <th className="hidden w-[18%] px-4 py-3 text-left font-medium md:table-cell">Alan</th>
              <th className="w-[120px] px-4 py-3 text-right font-medium">Islemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  Urun bulunamadi.
                </td>
              </tr>
            ) : (
              pagedItems.map((product) => (
                <tr key={`${product.categorySlug}-${product.slug}`} className="border-t align-middle hover:bg-muted/30">
                  <td className="hidden px-4 py-3 md:table-cell">
                    <div className="h-16 w-24 overflow-hidden rounded-md border bg-muted/30">
                      {product.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={adminPreviewUrl(product.image)} alt={product.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">Gorsel yok</div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">{product.name}</p>
                      <p className="hidden truncate text-xs text-muted-foreground md:block">{product.description || 'Aciklama yok'}</p>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{product.area || '-'}</td>
                  <td className="px-4 py-3">
                    <CmsRowActions
                      onPreview={() => onOpenEditor(product.slug)}
                      onEdit={() => onOpenEditor(product.slug)}
                      onDelete={() => onRequestDelete(product.slug, product.name)}
                      previewTitle="Onizle"
                      editTitle="Duzenle"
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
        totalItems={filteredProducts.length}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </>
  )
}
