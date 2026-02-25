import { NextResponse } from 'next/server'
import { readVideosStore, writeVideosStore, type VideosStore } from '@/lib/profile-videos-store'

export async function GET() {
  try {
    const store = await readVideosStore()
    return NextResponse.json(store)
  } catch (error) {
    console.error('Failed to read profile videos store', error)
    return NextResponse.json({ message: 'Video verisi okunamadi.' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as VideosStore
    if (!Array.isArray(body.items)) {
      return NextResponse.json({ message: 'Gecersiz veri formati.' }, { status: 400 })
    }

    await writeVideosStore(body)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to write profile videos store', error)
    return NextResponse.json({ message: 'Kayit basarisiz.' }, { status: 500 })
  }
}
