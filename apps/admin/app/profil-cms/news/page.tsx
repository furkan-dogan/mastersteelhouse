import { NewsCmsEditor } from '@/components/news-cms-editor'

export default function ProfileNewsPage() {
  return (
    <NewsCmsEditor
      endpoint="/api/profile/news"
      mediaEndpoint="/api/profile/media"
      allowSlugEdit={false}
      showDate={false}
      showLocation={false}
      showAuthor={false}
      showReadTime={false}
    />
  )
}
