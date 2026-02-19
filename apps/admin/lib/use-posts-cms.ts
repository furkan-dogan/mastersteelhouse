'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { createEditorRowId } from '@/lib/editor-utils'
import { normalizeMediaPlacement, placementToObjectPosition, type MediaPlacement } from '@/lib/media-placement'

type CmsSectionLike = {
  title: string
  content: string
  image?: string
  imagePosition?: string
  imagePlacement?: Partial<MediaPlacement>
}

type CmsPostLike = {
  slug: string
  sections: CmsSectionLike[]
}

type CmsStoreLike<TPost extends CmsPostLike> = {
  posts: TPost[]
}

export type CmsSectionRow = {
  id: string
  title: string
  content: string
  image: string
  imagePlacement: MediaPlacement
}

type UsePostsCmsOptions<TPost extends CmsPostLike> = {
  endpoint: string
  emptyPost: TPost
  slugBase: string
  loadErrorMessage: string
  saveSuccessMessage: string
}

function createRow<TPost extends CmsPostLike>(section?: TPost['sections'][number]): CmsSectionRow {
  return {
    id: createEditorRowId('section'),
    title: section?.title ?? '',
    content: section?.content ?? '',
    image: section?.image ?? '',
    imagePlacement: normalizeMediaPlacement(section?.imagePlacement, section?.imagePosition),
  }
}

export function usePostsCms<TPost extends CmsPostLike, TStore extends CmsStoreLike<TPost>>({
  endpoint,
  emptyPost,
  slugBase,
  loadErrorMessage,
  saveSuccessMessage,
}: UsePostsCmsOptions<TPost>) {
  const [store, setStore] = useState<TStore | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const [selectedSlug, setSelectedSlug] = useState('')
  const [sections, setSections] = useState<CmsSectionRow[]>([])

  const loadStore = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(endpoint, { cache: 'no-store' })
      if (!response.ok) {
        throw new Error(loadErrorMessage)
      }
      const nextStore = (await response.json()) as TStore
      setStore(nextStore)
      setSelectedSlug(nextStore.posts[0]?.slug ?? '')
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Beklenmeyen hata')
    } finally {
      setLoading(false)
    }
  }, [endpoint, loadErrorMessage])

  useEffect(() => {
    void loadStore()
  }, [loadStore])

  useEffect(() => {
    if (!store || !selectedSlug) {
      setSections([])
      return
    }
    const post = store.posts.find((item) => item.slug === selectedSlug)
    if (!post) {
      setSections([])
      return
    }
    setSections(post.sections.map((section) => createRow<TPost>(section)))
  }, [store, selectedSlug])

  const selectedPost = useMemo(() => {
    return store?.posts.find((item) => item.slug === selectedSlug) ?? null
  }, [store, selectedSlug])

  function patchPost(update: Partial<TPost>) {
    if (!store || !selectedPost) return
    setStore({
      ...store,
      posts: store.posts.map((post) => (post.slug === selectedPost.slug ? { ...post, ...update } : post)),
    })
  }

  function renameSelectedPostSlug(nextSlug: string) {
    if (!store || !selectedPost) return
    const previousSlug = selectedPost.slug
    setStore({
      ...store,
      posts: store.posts.map((post) => (post.slug === previousSlug ? { ...post, slug: nextSlug } : post)),
    })
    setSelectedSlug(nextSlug)
  }

  function addPost() {
    if (!store) return
    let index = store.posts.length + 1
    let nextSlug = `${slugBase}-${index}`
    while (store.posts.some((post) => post.slug === nextSlug)) {
      index += 1
      nextSlug = `${slugBase}-${index}`
    }

    const nextPost = { ...emptyPost, slug: nextSlug } as TPost
    setStore({
      ...store,
      posts: [...store.posts, nextPost],
    })
    setSelectedSlug(nextSlug)
  }

  function removePost() {
    if (!store || !selectedPost) return
    const filtered = store.posts.filter((post) => post.slug !== selectedPost.slug)
    setStore({ ...store, posts: filtered })
    setSelectedSlug(filtered[0]?.slug ?? '')
  }

  function syncSections(nextRows: CmsSectionRow[]) {
    setSections(nextRows)
    const nextSections = nextRows
      .map((row) => ({
        title: row.title.trim(),
        content: row.content.trim(),
        image: row.image.trim() || undefined,
        imagePlacement: normalizeMediaPlacement(row.imagePlacement),
        imagePosition: placementToObjectPosition(row.imagePlacement),
      }))
      .filter((row) => row.title && row.content) as TPost['sections']

    patchPost({ sections: nextSections } as Partial<TPost>)
  }

  function updateSection(rowId: string, patch: Partial<CmsSectionRow>) {
    syncSections(sections.map((row) => (row.id === rowId ? { ...row, ...patch } : row)))
  }

  function addSection() {
    syncSections([...sections, createRow<TPost>()])
  }

  function removeSection(rowId: string) {
    const nextRows = sections.filter((row) => row.id !== rowId)
    syncSections(nextRows.length > 0 ? nextRows : [createRow<TPost>()])
  }

  async function saveStore() {
    if (!store) return

    try {
      setSaving(true)
      setMessage(null)
      setError(null)
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(store),
      })
      if (!response.ok) {
        throw new Error('Kaydetme başarısız')
      }
      setMessage(saveSuccessMessage)
      setTimeout(() => setMessage(null), 3000)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Beklenmeyen hata')
      setTimeout(() => setError(null), 5000)
    } finally {
      setSaving(false)
    }
  }

  return {
    store,
    setStore,
    loading,
    saving,
    error,
    setError,
    message,
    selectedSlug,
    setSelectedSlug,
    selectedPost,
    sections,
    loadStore,
    saveStore,
    patchPost,
    renameSelectedPostSlug,
    addPost,
    removePost,
    updateSection,
    addSection,
    removeSection,
  }
}
