import {
  DeleteObjectCommand,
  GetObjectCommand,
  NoSuchKey,
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from '@aws-sdk/client-s3'

let cachedClient: S3Client | null = null

type R2Env = {
  accountId: string
  accessKeyId: string
  secretAccessKey: string
  bucketName: string
  publicBaseUrl: string
}

function readR2Env(): R2Env {
  const accountId = process.env.R2_ACCOUNT_ID?.trim() ?? ''
  const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim() ?? ''
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim() ?? ''
  const bucketName = process.env.R2_BUCKET_NAME?.trim() ?? ''
  const publicBaseUrl = (process.env.R2_PUBLIC_BASE_URL?.trim() ?? '').replace(/\/$/, '')

  if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !publicBaseUrl) {
    throw new Error('R2 env değişkenleri eksik. R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_BASE_URL gerekli.')
  }

  return { accountId, accessKeyId, secretAccessKey, bucketName, publicBaseUrl }
}

export function isR2Configured() {
  return Boolean(
    process.env.R2_ACCOUNT_ID?.trim() &&
      process.env.R2_ACCESS_KEY_ID?.trim() &&
      process.env.R2_SECRET_ACCESS_KEY?.trim() &&
      process.env.R2_BUCKET_NAME?.trim() &&
      process.env.R2_PUBLIC_BASE_URL?.trim()
  )
}

function getClient() {
  if (cachedClient) return cachedClient

  const env = readR2Env()
  cachedClient = new S3Client({
    region: 'auto',
    endpoint: `https://${env.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: env.accessKeyId,
      secretAccessKey: env.secretAccessKey,
    },
  })

  return cachedClient
}

export function buildR2Key(scope: 'web' | 'profil', fileName: string) {
  return `${scope}/${fileName}`
}

export function buildPublicMediaUrl(key: string) {
  const env = readR2Env()
  const cleanKey = key.replace(/^\/+/, '')
  return `${env.publicBaseUrl}/${cleanKey}`
}

export function extractR2KeyFromPublicUrl(url: string) {
  const env = readR2Env()
  if (!url.startsWith(env.publicBaseUrl)) return null

  const suffix = url.slice(env.publicBaseUrl.length)
  const key = suffix.replace(/^\/+/, '')
  return key || null
}

export async function uploadToR2(params: {
  scope: 'web' | 'profil'
  fileName: string
  bytes: Uint8Array
  contentType: string
}) {
  const env = readR2Env()
  const client = getClient()
  const key = buildR2Key(params.scope, params.fileName)

  await client.send(
    new PutObjectCommand({
      Bucket: env.bucketName,
      Key: key,
      Body: params.bytes,
      ContentType: params.contentType || 'application/octet-stream',
      CacheControl: 'public, max-age=31536000, immutable',
    })
  )

  return {
    key,
    url: buildPublicMediaUrl(key),
  }
}

export async function deleteFromR2PublicUrl(url: string) {
  const key = extractR2KeyFromPublicUrl(url)
  if (!key) return false

  const env = readR2Env()
  const client = getClient()

  await client.send(
    new DeleteObjectCommand({
      Bucket: env.bucketName,
      Key: key,
    })
  )

  return true
}

export async function readJsonFromR2<T>(key: string): Promise<T | null> {
  const env = readR2Env()
  const client = getClient()

  try {
    const result = await client.send(
      new GetObjectCommand({
        Bucket: env.bucketName,
        Key: key,
      })
    )

    if (!result.Body) return null
    const raw = await result.Body.transformToString()
    return JSON.parse(raw) as T
  } catch (error) {
    if (error instanceof NoSuchKey) return null
    if (error instanceof S3ServiceException && error.name === 'NoSuchKey') return null
    throw error
  }
}

export async function writeJsonToR2(key: string, value: unknown) {
  const env = readR2Env()
  const client = getClient()

  await client.send(
    new PutObjectCommand({
      Bucket: env.bucketName,
      Key: key,
      Body: Buffer.from(`${JSON.stringify(value, null, 2)}\n`, 'utf8'),
      ContentType: 'application/json; charset=utf-8',
      CacheControl: 'no-store',
    })
  )
}
