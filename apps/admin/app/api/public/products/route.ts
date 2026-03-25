import { NextResponse } from 'next/server'
import { readProductStore } from '@/lib/products-store'

export async function GET() {
  try {
    const store = await readProductStore()
    return NextResponse.json(store)
  } catch (error) {
    console.error('Failed to read public products store', error)
    return NextResponse.json({ message: 'Veri okunamadi.' }, { status: 500 })
  }
}
