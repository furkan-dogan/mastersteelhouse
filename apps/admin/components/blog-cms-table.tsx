'use client'

import type { BlogPost } from '@/lib/blog-store'
import { adminPreviewUrl } from '@/lib/media-preview-url'
import { CmsRowActions } from '@/components/ui/cms-row-actions'
import { TablePagination } from '@/components/ui/table'

type BlogCmsTableProps = {
  filteredPosts: BlogPost[]
  pagedItems: BlogPost[]
  page: number
  totalPages: number
  pageSize: number
  onPageChange: (page: number) => void
  onOpenEditor: (slug: string) => void
  onRequestDelete: (slug: string, label: string) => void
}

export function BlogCmsTable({
  filteredPosts,
  pagedItems,
  page,
  totalPages,
  pageSize,
  onPageChange,
  onOpenEditor,
  onRequestDelete,
}: BlogCmsTableProps) {
  return (
    <>
      <div className="cms-scroll overflow-x-auto">
        <table className="w-full table-fixed text-sm">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr>
              <th className="w-[60%] px-4 py-3 text-left font-medium">Başlık</th>
              <th className="hidden w-[16%] px-4 py-3 text-left font-medium md:table-cell">Kategori</th>
              <th className="hidden w-[14%] px-4 py-3 text-left font-medium xl:table-cell">Yazar</th>
              <th className="hidden w-[10%] px-4 py-3 text-left font-medium xl:table-cell">Tarih</th>
              <th className="w-[120px] px-4 py-3 text-right font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  Yazı bulunamadı.
                </td>
              </tr>
            ) : (
              pagedItems.map((post) => (
                <tr key={post.slug} className="border-t align-middle hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md border bg-muted/40">
                        {post.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={adminPreviewUrl(post.image)} alt={post.title} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">Yok</div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">{post.title}</p>
                        <p className="hidden truncate text-xs text-muted-foreground md:block">{post.excerpt || 'Özet girilmemiş'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <span className="inline-flex rounded-md border bg-muted px-2 py-1 text-xs font-medium text-foreground">
                      {post.category || 'Genel'}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground xl:table-cell">{post.author || 'Editör'}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground xl:table-cell">{post.date || '-'}</td>
                  <td className="px-4 py-3">
                    <CmsRowActions
                      onPreview={() => onOpenEditor(post.slug)}
                      onEdit={() => onOpenEditor(post.slug)}
                      onDelete={() => onRequestDelete(post.slug, post.title)}
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
        totalItems={filteredPosts.length}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </>
  )
}
