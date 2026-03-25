import { NextResponse } from 'next/server'
import { readReferenceStore } from '@/lib/references-store'

export async function GET() {
  try {
    const store = await readReferenceStore()
    return NextResponse.json(store)
  } catch (error) {
    console.error('Failed to read public references store', error)
    return NextResponse.json({ message: 'Veri okunamadi.' }, { status: 500 })
  }
}
