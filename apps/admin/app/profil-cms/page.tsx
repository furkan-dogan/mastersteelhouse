import { Suspense } from 'react'
import { CmsEditor } from '@/components/cms-editor'

export default function ProfileProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">CMS yükleniyor...</p>
          </div>
        </div>
      }
    >
      <CmsEditor endpoint="/api/profile/products" mediaEndpoint="/api/profile/media" showCoverField={false} mode="profile" />
    </Suspense>
  )
}
