import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const mediaServerUrl = (process.env.MEDIA_SERVER_URL || "http://185.231.111.126:8080").replace(/\/$/, "")

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filename = encodeURIComponent(params.id)
    const res = await fetch(`${mediaServerUrl}/media/${filename}`, { method: "DELETE" })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      return NextResponse.json({ ok: false, error: data.error || "Silme başarısız" }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: "Silme başarısız" }, { status: 502 })
  }
}
