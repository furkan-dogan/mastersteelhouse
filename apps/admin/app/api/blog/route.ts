import { NextResponse } from 'next/server'
import { readBlogStore, writeBlogStore, type BlogStore } from '@/lib/blog-store'

export async function GET() {
  try {
    const store = await readBlogStore()
    return NextResponse.json(store)
  } catch (error) {
    console.error('Failed to read blog store', error)
    return NextResponse.json({ message: 'Veri okunamadi.' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as BlogStore
    if (!Array.isArray(body.posts)) {
      return NextResponse.json({ message: 'Gecersiz veri formati.' }, { status: 400 })
    }
    await writeBlogStore(body)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to write blog store', error)
    return NextResponse.json({ message: 'Kayit basarisiz.' }, { status: 500 })
  }
}
