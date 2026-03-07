export function adminPreviewUrl(input: string) {
  if (!input) return ''

  const isProfileScope =
    typeof window !== 'undefined' && window.location.pathname.startsWith('/profil-cms')

  const proxyPath = isProfileScope ? '/api/profile/media/file' : '/api/media/file'

  if (input.startsWith('http://') || input.startsWith('https://')) {
    return `${proxyPath}?url=${encodeURIComponent(input)}`
  }

  return `${proxyPath}?path=${encodeURIComponent(input)}`
}
