import { NextResponse } from 'next/server'
import { readVideosStore, writeVideosStore, type VideosStore } from '@/lib/videos-store'
import { assertR2ConfiguredForProduction } from '@/lib/r2-storage'
import { revalidateWebSite } from '@/lib/web-revalidate'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const store = await readVideosStore()
    return NextResponse.json(store)
  } catch (error) {
    console.error('Failed to read videos store', error)
    return NextResponse.json({ message: 'Video verisi okunamadi.' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    assertR2ConfiguredForProduction()
    const body = (await request.json()) as VideosStore
    await writeVideosStore(body)
    await revalidateWebSite()
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to write videos store', error)
    return NextResponse.json({ message: 'Video kaydedilemedi.' }, { status: 500 })
  }
}
