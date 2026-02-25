import { DocumentsCmsEditor } from '@/components/documents-cms-editor'

export default function ProfileDocumentsPage() {
  return <DocumentsCmsEditor endpoint="/api/profile/documents" mediaEndpoint="/api/profile/media" />
}
