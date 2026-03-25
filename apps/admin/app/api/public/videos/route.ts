import { NextResponse } from 'next/server'
import { readVideosStore } from '@/lib/videos-store'

export async function GET() {
  try {
    const store = await readVideosStore()
    return NextResponse.json(store)
  } catch (error) {
    console.error('Failed to read public videos store', error)
    return NextResponse.json({ message: 'Veri okunamadi.' }, { status: 500 })
  }
}
