import assert from 'node:assert/strict'
import test from 'node:test'
import { buildPageMetadata, trimForMeta, toAbsoluteUrl } from './seo.ts'

test('buildPageMetadata creates canonical and social fields', () => {
  const metadata = buildPageMetadata({
    title: 'Test Başlık',
    description: 'Test açıklama',
    path: '/ornek-sayfa',
    image: '/og-image.jpg',
  })

  assert.equal(metadata.title, 'Test Başlık')
  assert.equal(metadata.description, 'Test açıklama')
  assert.equal(metadata.alternates?.canonical, '/ornek-sayfa')
  assert.equal(metadata.openGraph?.url, '/ornek-sayfa')
  assert.equal(metadata.openGraph?.type, 'website')
  assert.deepEqual(metadata.twitter?.images, [toAbsoluteUrl('/og-image.jpg')])
})

test('trimForMeta shortens long text and appends ellipsis', () => {
  const text = 'a'.repeat(220)
  const trimmed = trimForMeta(text, 160)

  assert.equal(trimmed.length, 160)
  assert.equal(trimmed.endsWith('…'), true)
})

test('toAbsoluteUrl normalizes relative paths', () => {
  const result = toAbsoluteUrl('medya/blog')
  assert.equal(result.endsWith('/medya/blog'), true)
})
