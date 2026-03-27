import { NextResponse } from 'next/server'
import { readBlogStore } from '@/lib/profile-blog-store'

export async function GET() {
  try {
    const store = await readBlogStore()
    return NextResponse.json(store)
  } catch (error) {
    console.error('Failed to read public profile blog store', error)
    return NextResponse.json({ message: 'Veri okunamadi.' }, { status: 500 })
  }
}
