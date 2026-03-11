export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function ensureUniqueSectionIds<T extends { id?: string; title: string }>(
  sections: T[] | undefined,
  fallbackPrefix = 'bolum'
): Array<T & { id: string }> {
  const seen = new Set<string>()
  return (sections ?? []).map((section, index) => {
    const rawId = section.id?.trim() || slugify(section.title) || `${fallbackPrefix}-${index + 1}`
    let id = rawId
    let suffix = 2
    while (seen.has(id)) {
      id = `${rawId}-${suffix}`
      suffix += 1
    }
    seen.add(id)
    return { ...section, id }
  })
}
