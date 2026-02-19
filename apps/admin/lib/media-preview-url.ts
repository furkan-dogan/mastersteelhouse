export function adminPreviewUrl(input: string) {
  if (!input) return ''
  if (input.startsWith('http://') || input.startsWith('https://')) return input
  return `/api/media/file?path=${encodeURIComponent(input)}`
}
