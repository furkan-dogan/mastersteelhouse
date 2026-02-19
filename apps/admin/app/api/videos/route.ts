import { NextResponse } from 'next/server'
import { readVideosStore, writeVideosStore, type VideosStore } from '@/lib/videos-store'

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
    const body = (await request.json()) as VideosStore
    await writeVideosStore(body)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to write videos store', error)
    return NextResponse.json({ message: 'Video kaydedilemedi.' }, { status: 500 })
  }
}

