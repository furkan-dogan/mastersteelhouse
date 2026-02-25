import { VideosCmsEditor } from '@/components/videos-cms-editor'

export default function ProfileVideosPage() {
  return <VideosCmsEditor endpoint="/api/profile/videos" />
}
