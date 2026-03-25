import { NextResponse } from 'next/server'
import { readCatalogsStore } from '@/lib/catalogs-store'

export async function GET() {
  try {
    const store = await readCatalogsStore()
    return NextResponse.json(store)
  } catch (error) {
    console.error('Failed to read public catalogs store', error)
    return NextResponse.json({ message: 'Veri okunamadi.' }, { status: 500 })
  }
}
