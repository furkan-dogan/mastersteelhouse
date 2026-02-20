'use client'

import type { VideoItem } from '@/lib/videos-store'
import { isYouTubeShortUrl, toYouTubeThumbnailUrl } from '@/lib/youtube-utils'
import { CmsRowActions } from '@/components/ui/cms-row-actions'
import { TablePagination } from '@/components/ui/table'

type VideosCmsTableProps = {
  filteredItems: VideoItem[]
  pagedItems: VideoItem[]
  page: number
  totalPages: number
  pageSize: number
  onPageChange: (page: number) => void
  onOpenEditor: (id: string) => void
  onRequestDelete: (id: string, label: string) => void
}

export function VideosCmsTable({
  filteredItems,
  pagedItems,
  page,
  totalPages,
  pageSize,
  onPageChange,
  onOpenEditor,
  onRequestDelete,
}: VideosCmsTableProps) {
  return (
    <>
      <div className="cms-scroll overflow-x-auto">
        <table className="w-full table-fixed text-sm">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr>
              <th className="w-[58%] px-4 py-3 text-left font-medium">Video</th>
              <th className="hidden w-[14%] px-4 py-3 text-left font-medium md:table-cell">Format</th>
              <th className="hidden w-[18%] px-4 py-3 text-left font-medium lg:table-cell">Link</th>
              <th className="w-[120px] px-4 py-3 text-right font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  Video bulunamadı.
                </td>
              </tr>
            ) : (
              pagedItems.map((item) => {
                const thumbUrl = toYouTubeThumbnailUrl(item.youtubeUrl)
                const isPortrait = isYouTubeShortUrl(item.youtubeUrl)

                return (
                  <tr key={item.id} className="border-t align-middle hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md border bg-muted/40">
                          {thumbUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={thumbUrl} alt={`${item.title} küçük önizleme`} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">Yok</div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-foreground">{item.title}</p>
                          <p className="hidden truncate text-xs text-muted-foreground md:block">
                            {item.description || 'Açıklama girilmemiş'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 md:table-cell">
                      <span className="inline-flex rounded-md border bg-muted px-2 py-1 text-xs font-medium text-foreground">
                        {isPortrait ? 'Dikey' : 'Yatay'}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 text-xs text-muted-foreground lg:table-cell">
                      <span className="line-clamp-2 break-all">{item.youtubeUrl || '-'}</span>
                    </td>
                    <td className="px-4 py-3">
                      <CmsRowActions
                        onPreview={() => onOpenEditor(item.id)}
                        onEdit={() => onOpenEditor(item.id)}
                        onDelete={() => onRequestDelete(item.id, item.title)}
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
        totalItems={filteredItems.length}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </>
  )
}
