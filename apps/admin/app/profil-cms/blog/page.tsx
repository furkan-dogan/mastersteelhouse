import { BlogCmsEditor } from '@/components/blog-cms-editor'

export default function ProfileBlogPage() {
  return <BlogCmsEditor endpoint="/api/profile/blog" mediaEndpoint="/api/profile/media" allowSlugEdit={false} showAuthor={false} showDate={false} showReadTime={false} />
}
