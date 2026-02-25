export function adminPreviewUrl(input: string) {
  if (!input) return ''
  if (input.startsWith('http://') || input.startsWith('https://')) return input

  const isProfileScope =
    typeof window !== 'undefined' && window.location.pathname.startsWith('/profil-cms')

  const proxyPath = isProfileScope ? '/api/profile/media/file' : '/api/media/file'
  return `${proxyPath}?path=${encodeURIComponent(input)}`
}
