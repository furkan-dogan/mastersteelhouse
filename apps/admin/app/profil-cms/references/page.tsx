import { ReferencesCmsEditor } from '@/components/references-cms-editor'

export default function ProfileReferencesPage() {
  return <ReferencesCmsEditor endpoint="/api/profile/references" mediaEndpoint="/api/profile/media" simplified />
}
