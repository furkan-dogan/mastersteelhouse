import { NextResponse } from 'next/server'
import { readProfileFaqStore } from '@/lib/profile-faq-store'

export async function GET() {
  try {
    const store = await readProfileFaqStore()
    return NextResponse.json(store)
  } catch (error) {
    console.error('Failed to read public profile faqs store', error)
    return NextResponse.json({ message: 'Veri okunamadi.' }, { status: 500 })
  }
}
