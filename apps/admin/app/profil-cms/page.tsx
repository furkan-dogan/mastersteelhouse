import { CmsEditor } from '@/components/cms-editor'

export default function ProfileProductsPage() {
  return <CmsEditor endpoint="/api/profile/products" mediaEndpoint="/api/profile/media" showCoverField={false} mode="profile" />
}
