import { NextResponse } from 'next/server'
import { readDocumentsStore } from '@/lib/documents-store'

export async function GET() {
  try {
    const store = await readDocumentsStore()
    return NextResponse.json(store)
  } catch (error) {
    console.error('Failed to read public documents store', error)
    return NextResponse.json({ message: 'Veri okunamadi.' }, { status: 500 })
  }
}
