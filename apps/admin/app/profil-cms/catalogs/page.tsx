import { CatalogsCmsEditor } from '@/components/catalogs-cms-editor'

export default function ProfileCatalogsPage() {
  return <CatalogsCmsEditor endpoint="/api/profile/catalogs" mediaEndpoint="/api/profile/media" />
}
